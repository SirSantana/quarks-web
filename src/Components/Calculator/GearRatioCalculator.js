import { CREATE_SUGERENCIA } from '@/graphql/mutations';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';

const fmt = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// ─── Custom Slider ─────────────────────────────────────────────────────────
function CustomSlider({ min, max, step = 1, value, onChange }) {
  const trackRef = useRef(null);
  const clamp = (v) => Math.min(max, Math.max(min, v));
  const pct = ((value - min) / (max - min)) * 100;

  const getVal = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    return clamp(Math.round((min + ratio * (max - min)) / step) * step);
  };

  const startDrag = (clientX) => {
    onChange(getVal(clientX));
    const move = (e) => onChange(getVal(e.touches ? e.touches[0].clientX : e.clientX));
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move);
    window.addEventListener('touchend', up);
  };

  return (
    <div
      ref={trackRef}
      onMouseDown={(e) => startDrag(e.clientX)}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      className="relative h-7 flex items-center cursor-pointer select-none"
    >
      <div className="absolute w-full h-1 bg-gray-200 rounded-full" />
      <div className="absolute h-1 rounded-full bg-[#407BFF]" style={{ width: `${pct}%` }} />
      <div
        className="absolute w-5 h-5 rounded-full bg-[#407BFF] border-[3px] border-white shadow-[0_1px_8px_rgba(64,123,255,0.35)] z-10 -translate-x-1/2"
        style={{ left: `${pct}%` }}
      />
    </div>
  );
}

// ─── Row ───────────────────────────────────────────────────────────────────
function Row({ label, value, large = false, sublabel = null }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
      <div>
        <span className="text-[13px] text-gray-400 block">{label}</span>
        {sublabel && <span className="text-[11px] text-gray-300">{sublabel}</span>}
      </div>
      <span className={`${large ? 'text-[22px] font-semibold tracking-tight' : 'text-[15px] font-medium'} text-gray-900 text-right`}>
        {value}
      </span>
    </div>
  );
}

// ─── Section label ─────────────────────────────────────────────────────────
function SectionLabel({ children, mt = false }) {
  return (
    <p className={`text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-0.5 ${mt ? 'mt-5' : ''}`}>
      {children}
    </p>
  );
}

// ─── Number input ──────────────────────────────────────────────────────────
function NumberInput({ value, onChange, suffix, wide = false, step = 1, min = 1, max }) {
  return (
    <div className="flex items-baseline gap-0.5">
      <input
        type="number" step={step} min={min} max={max}
        value={value}
        onChange={(e) => onChange(Math.min(max ?? Infinity, Math.max(min, parseFloat(e.target.value) || min)))}
        className={`${wide ? 'w-20' : 'w-[64px]'} text-right text-[22px] font-semibold bg-transparent border-none text-gray-900 p-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
      />
      {suffix && <span className="text-[13px] text-gray-300">{suffix}</span>}
    </div>
  );
}

// ─── Slider field ──────────────────────────────────────────────────────────
function SliderField({ label, sublabel, input, minLabel, maxLabel, children }) {
  return (
    <div className="mb-7">
      <div className="flex justify-between items-center mb-3.5">
        <div>
          <span className="text-[13px] font-medium text-gray-500 block">{label}</span>
          {sublabel && <span className="text-[11px] text-gray-300">{sublabel}</span>}
        </div>
        {input}
      </div>
      {children}
      <div className="flex justify-between mt-1.5 text-[11px] text-gray-300">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

// ─── Select ────────────────────────────────────────────────────────────────
function CalcSelect({ label, value, onChange, children }) {
  return (
    <div className="flex-1">
      <label className="block text-[11px] font-medium text-gray-300 tracking-[0.4px] uppercase mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2 pl-3 pr-7 text-[13px] font-medium border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-pointer focus:outline-none"
      >
        {children}
      </select>
    </div>
  );
}

// ─── Ratio classification ──────────────────────────────────────────────────
function getRatioType(ratio) {
  if (ratio > 3.5)  return { label: 'Low gear (high torque)',  desc: 'Maximum pulling force. Best for launches, hills, or heavy loads.',    color: '#f59e0b' };
  if (ratio >= 2.5) return { label: 'Mid gear',               desc: 'Balanced acceleration and speed. General city driving.',               color: '#10b981' };
  if (ratio >= 1.5) return { label: 'High gear',              desc: 'Lower RPM, higher speed. Best for highway cruising.',                 color: '#407BFF' };
  return                   { label: 'Overdrive',              desc: 'Engine RPM lower than output shaft. Maximum fuel efficiency.',        color: '#8b5cf6' };
}

// ─── Reference gear tables ─────────────────────────────────────────────────
const GEAR_TABLES = {
  manual5: { label: '5-Speed Manual',     ratios: [3.76, 2.05, 1.35, 1.03, 0.81] },
  manual6: { label: '6-Speed Manual',     ratios: [3.82, 2.20, 1.52, 1.15, 0.91, 0.74] },
  auto6:   { label: '6-Speed Automatic',  ratios: [4.17, 2.34, 1.52, 1.14, 0.87, 0.69] },
  auto8:   { label: '8-Speed Automatic',  ratios: [4.17, 2.34, 1.52, 1.14, 0.87, 0.69, 0.55, 0.45] },
};

const GEAR_ORDINALS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

// ─── Main component ────────────────────────────────────────────────────────
export default function GearRatioCalculatorComponent() {
  const router = useRouter();

  const [mode,          setMode]          = useState('teeth');    // 'teeth' | 'speed'
  const [drivingTeeth,  setDrivingTeeth]  = useState(13);         // pinion (driver gear)
  const [drivenTeeth,   setDrivenTeeth]   = useState(40);         // ring (driven gear)
  const [rpm,           setRpm]           = useState(3000);
  const [wheelDiam,     setWheelDiam]     = useState(25.6);       // inches (≈ 65 cm)
  const [speed,         setSpeed]         = useState(75);         // mph
  const [finalDrive,    setFinalDrive]    = useState(3.73);
  const [transType,     setTransType]     = useState('manual6');
  const [feedback,      setFeedback]      = useState('');

  const [createSugerencia, { data, loading }] = useMutation(CREATE_SUGERENCIA);
  useEffect(() => { if (data) setTimeout(() => router.reload(), 3000); }, [data]);

  // ── Calculations (imperial-first) ─────────────────────────────────────────
  // Wheel diameter in feet for speed formula
  const wheelDiamFt = wheelDiam / 12;

  // Gear ratio from teeth count OR back-calculate from speed/RPM
  // speed formula: v (ft/min) = RPM × π × D(ft) / ratio
  // mph = ft/min × 60 / 5280
  const boxRatio = mode === 'teeth'
    ? drivenTeeth / drivingTeeth
    : (rpm * Math.PI * wheelDiamFt) / ((speed * 5280 / 60));

  const totalRatio = boxRatio * finalDrive;

  // Vehicle speed at given RPM (mph)
  const speedFtMin   = (rpm * Math.PI * wheelDiamFt) / totalRatio;
  const speedMph     = speedFtMin * 60 / 5280;

  // Output shaft RPM
  const outputRpm    = rpm / boxRatio;
  const wheelRpm     = rpm / totalRatio;

  // Torque multiplication
  const torqueMult   = totalRatio;
  const efficiency   = 97;

  const valid      = boxRatio > 0 && finalDrive > 0;
  const ratioType  = valid ? getRatioType(boxRatio) : null;
  const gearTable  = GEAR_TABLES[transType];

  return (
    <div className="min-h-screen bg-[#f4f4f2] px-8 py-14 max-sm:px-4 max-sm:py-7">
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="mb-9">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">
            Gear Ratio Calculator
          </h1>
          <p className="text-[13px] text-gray-400 m-0">
            Calculate transmission ratio, vehicle speed, torque multiplication, and more.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-[440px_1fr] max-[880px]:grid-cols-1">

            {/* ── LEFT: Form ── */}
            <div className="p-8 border-r border-gray-200 max-[880px]:border-r-0 max-[880px]:border-b max-sm:p-6">

              {/* Mode + reference transmission */}
              <div className="flex gap-3 mb-8">
                <CalcSelect label="Calculate from" value={mode} onChange={setMode}>
                  <option value="teeth">Tooth count</option>
                  <option value="speed">Speed & RPM</option>
                </CalcSelect>
                <CalcSelect label="Reference trans." value={transType} onChange={setTransType}>
                  <option value="manual5">5-Speed Manual</option>
                  <option value="manual6">6-Speed Manual</option>
                  <option value="auto6">6-Speed Auto</option>
                  <option value="auto8">8-Speed Auto</option>
                </CalcSelect>
              </div>

              {/* ── MODE: Teeth ── */}
              {mode === 'teeth' && (
                <>
                  <SliderField
                    label="Driving gear teeth (pinion)" sublabel="Input / driver gear"
                    minLabel="6 t" maxLabel="80 t"
                    input={<NumberInput value={drivingTeeth} onChange={setDrivingTeeth} suffix="t" step={1} min={6} max={120} />}
                  >
                    <CustomSlider min={6} max={80} step={1} value={drivingTeeth} onChange={setDrivingTeeth} />
                  </SliderField>

                  <SliderField
                    label="Driven gear teeth (ring)" sublabel="Output / driven gear"
                    minLabel="6 t" maxLabel="160 t"
                    input={<NumberInput value={drivenTeeth} onChange={setDrivenTeeth} suffix="t" step={1} min={6} max={200} />}
                  >
                    <CustomSlider min={6} max={160} step={1} value={drivenTeeth} onChange={setDrivenTeeth} />
                  </SliderField>
                </>
              )}

              {/* ── MODE: Speed ── */}
              {mode === 'speed' && (
                <SliderField
                  label="Vehicle speed" sublabel="At this gear"
                  minLabel="1 mph" maxLabel="200 mph"
                  input={<NumberInput value={speed} onChange={setSpeed} suffix="mph" step={1} min={1} max={250} wide />}
                >
                  <CustomSlider min={1} max={200} step={1} value={speed} onChange={setSpeed} />
                </SliderField>
              )}

              {/* Engine RPM (both modes) */}
              <SliderField
                label="Engine speed" sublabel="Input RPM"
                minLabel="500 rpm" maxLabel="8,000 rpm"
                input={<NumberInput value={rpm} onChange={setRpm} suffix="rpm" step={100} min={500} max={10000} wide />}
              >
                <CustomSlider min={500} max={8000} step={100} value={rpm} onChange={setRpm} />
              </SliderField>

              {/* Wheel diameter */}
              <SliderField
                label="Wheel diameter" sublabel="Total tire outer diameter"
                minLabel='16"' maxLabel='36"'
                input={<NumberInput value={wheelDiam} onChange={setWheelDiam} suffix='"' step={0.1} min={14} max={40} />}
              >
                <CustomSlider min={16} max={36} step={0.1} value={wheelDiam} onChange={setWheelDiam} />
              </SliderField>

              {/* Final drive ratio */}
              <SliderField
                label="Axle / final drive ratio" sublabel="Differential ratio"
                minLabel="1.00" maxLabel="5.50"
                input={<NumberInput value={finalDrive} onChange={setFinalDrive} suffix=":1" step={0.01} min={1} max={6} />}
              >
                <CustomSlider min={1.00} max={5.50} step={0.01} value={finalDrive} onChange={setFinalDrive} />
              </SliderField>
            </div>

            {/* ── RIGHT: Results ── */}
            <div className="p-8 max-sm:p-6">
              {!valid ? (
                <div className="flex items-center justify-center min-h-[200px]">
                  <p className="text-[13px] text-gray-300 text-center">
                    Enter transmission data to see your results.
                  </p>
                </div>
              ) : (
                <>
                  {/* Primary */}
                  <div className="mb-7">
                    <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-1.5">
                      Gear ratio
                    </p>
                    <p className="text-[60px] font-semibold leading-none tracking-[-2px] text-[#407BFF] m-0">
                      {boxRatio.toFixed(3)}
                      <span className="text-lg font-normal text-gray-300 ml-2 tracking-normal">: 1</span>
                    </p>
                    <p className="text-sm text-gray-300 mt-1.5 mb-0">
                      Overall ratio with axle: <strong className="text-gray-500">{totalRatio.toFixed(3)} : 1</strong>
                    </p>
                  </div>

                  {/* Gear type badge */}
                  {ratioType && (
                    <div
                      className="mb-5 px-3.5 py-3 bg-gray-50 rounded-xl"
                      style={{ borderLeft: `3px solid ${ratioType.color}` }}
                    >
                      <p className="text-[13px] font-semibold m-0 mb-0.5" style={{ color: ratioType.color }}>
                        {ratioType.label}
                      </p>
                      <p className="text-[12px] text-gray-400 m-0">{ratioType.desc}</p>
                    </div>
                  )}

                  {/* Ratios */}
                  <SectionLabel>Gear Ratios</SectionLabel>
                  <Row label="Transmission ratio"    value={`${boxRatio.toFixed(4)} : 1`} large />
                  <Row label="Final drive ratio"     value={`${finalDrive.toFixed(2)} : 1`} />
                  <Row label="Overall ratio"         value={`${totalRatio.toFixed(4)} : 1`} />
                  <Row label="Step-up ratio (inverse)" value={`${(1 / boxRatio).toFixed(4)}`} />

                  {/* Speed & RPM */}
                  <SectionLabel mt>Speed & RPM</SectionLabel>
                  <Row
                    label="Vehicle speed"
                    sublabel={`At ${fmt(rpm)} engine RPM`}
                    value={`${speedMph.toFixed(1)} mph`}
                    large
                  />
                  <Row label="Speed (km/h)"              value={`${(speedMph * 1.60934).toFixed(1)} km/h`} />
                  <Row label="Output shaft RPM"          value={`${fmt(Math.round(outputRpm))} rpm`} />
                  <Row label="Wheel RPM (with axle)"     value={`${fmt(Math.round(wheelRpm))} rpm`} />

                  {/* Torque */}
                  <SectionLabel mt>Torque Multiplication</SectionLabel>
                  <Row
                    label="Multiplication factor"
                    sublabel="Transmission + axle combined"
                    value={`× ${torqueMult.toFixed(2)}`}
                    large
                  />
                  <Row label="Transmission only"            value={`× ${boxRatio.toFixed(3)}`} />
                  <Row label="Estimated drivetrain efficiency" value={`${efficiency}%`} />
                  <Row
                    label="Effective torque (if engine = 100 lb-ft)"
                    value={`${(100 * torqueMult * efficiency / 100).toFixed(0)} lb-ft`}
                  />

                  {/* Reference gear table */}
                  <SectionLabel mt>Reference — {gearTable.label}</SectionLabel>
                  <div className="flex flex-col gap-0.5">
                    {gearTable.ratios.map((r, i) => {
                      const gearSpeedFtMin = (rpm * Math.PI * wheelDiamFt) / (r * finalDrive);
                      const gearSpeedMph   = gearSpeedFtMin * 60 / 5280;
                      const isActive       = Math.abs(r - boxRatio) < 0.15;
                      return (
                        <div
                          key={i}
                          className={`flex justify-between items-center px-2.5 py-2 rounded-lg ${isActive ? 'bg-[#eef2ff] border border-[#c7d7ff]' : 'border border-transparent'}`}
                        >
                          <span className={`text-[13px] ${isActive ? 'text-[#407BFF] font-semibold' : 'text-gray-300'}`}>
                            {GEAR_ORDINALS[i]}
                          </span>
                          <span className={`text-[13px] ${isActive ? 'text-[#407BFF] font-semibold' : 'text-gray-300'}`}>
                            {r.toFixed(2)} : 1
                          </span>
                          <span className={`text-[13px] ${isActive ? 'text-[#407BFF] font-semibold' : 'text-gray-300'}`}>
                            {gearSpeedMph.toFixed(0)} mph
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

          </div>
        </div>

        {/* Feedback */}
        <div className="mt-5 max-w-[400px]">
          <p className="text-[13px] font-medium text-gray-400 mb-2">Have a suggestion?</p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''))}
            placeholder="Share your feedback here..."
            rows={3}
            className="w-full px-3 py-2.5 text-[13px] text-gray-700 border border-gray-200 rounded-lg resize-none focus:outline-none leading-relaxed bg-white"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (feedback.trim().length <= 10) return alert('Please share a bit more detail.');
              createSugerencia({ variables: { sugerencia: feedback.trim(), tipo: 'gear-ratio-calculator' } });
            }}
            disabled={loading}
            className="mt-2 px-5 py-2 bg-[#407BFF] text-white text-[13px] font-medium rounded-lg border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
          {data && <p className="text-[12px] text-[#407BFF] mt-2">Thanks for your feedback!</p>}
        </div>

      </div>
    </div>
  );
}