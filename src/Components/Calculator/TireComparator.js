import { useState } from 'react';

// ── Calculations ───────────────────────────────────────────────────────────
// Format: 205/55 R16 → width=205mm, aspect=55%, rim=16"
function parseTire(width, aspect, rim) {
  const w = parseFloat(width);
  const a = parseFloat(aspect);
  const r = parseFloat(rim);
  if (!w || !a || !r) return null;

  const sidewallMM  = w * (a / 100);
  const diam_mm     = r * 25.4 + sidewallMM * 2;
  const diam_in     = diam_mm / 25.4;
  const circumf_mm  = Math.PI * diam_mm;
  const circumf_in  = circumf_mm / 25.4;
  const revMile     = 63360 / circumf_in;   // revolutions per mile
  const radius_mm   = diam_mm / 2;

  return { width: w, aspect: a, rim: r, sidewallMM, diam_mm, diam_in, circumf_mm, circumf_in, revMile, radius_mm };
}

function actualSpeed(indicated, revOrig, revNew) {
  if (!revOrig || !revNew) return null;
  return indicated * (revNew / revOrig);
}

const fmt2 = (n) => isNaN(n) ? '—' : n.toFixed(2);
const fmt1 = (n) => isNaN(n) ? '—' : n.toFixed(1);
const fmt0 = (n) => isNaN(n) ? '—' : Math.round(n).toString();

// ── Diff badge ─────────────────────────────────────────────────────────────
function DiffBadge({ a, b, unit = '', higherIsBetter = true }) {
  if (!a || !b) return null;
  const diff = b - a;
  const pct  = (diff / a) * 100;
  if (Math.abs(pct) < 0.05) return <span className="text-[11px] text-gray-300">same</span>;
  const positive = diff > 0;
  const good  = positive ? higherIsBetter : !higherIsBetter;
  const color = good ? '#10b981' : '#ef4444';
  const sign  = diff > 0 ? '+' : '';
  return (
    <span
      className="text-[11px] font-semibold px-1.5 py-0.5 rounded"
      style={{ color, background: color + '15' }}
    >
      {sign}{diff.toFixed(1)}{unit} ({sign}{pct.toFixed(1)}%)
    </span>
  );
}

// ── Tire SVG visual ────────────────────────────────────────────────────────
function TireVisual({ tire, color, label }) {
  if (!tire) return null;
  const scale  = 120 / 800;
  const outerR = (tire.diam_mm / 2) * scale;
  const innerR = (tire.rim * 25.4 / 2) * scale;
  const cx = 70, cy = 70;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <ellipse cx={cx} cy={cy} rx={outerR + 2} ry={outerR + 2} fill="rgba(0,0,0,0.04)" />
        <circle cx={cx} cy={cy} r={outerR} fill={color + '18'} stroke={color} strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={innerR + (outerR - innerR) * 0.15} fill="white" stroke={color + '40'} strokeWidth="1" strokeDasharray="3 3" />
        <circle cx={cx} cy={cy} r={innerR} fill="white" stroke={color} strokeWidth="2" />
        <circle cx={cx} cy={cy} r={4} fill={color} />
        {[0, 60, 120, 180, 240, 300].map(deg => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line key={deg}
              x1={cx + innerR * Math.cos(rad)} y1={cy + innerR * Math.sin(rad)}
              x2={cx + (innerR + (outerR - innerR) * 0.6) * Math.cos(rad)}
              y2={cy + (innerR + (outerR - innerR) * 0.6) * Math.sin(rad)}
              stroke={color + '50'} strokeWidth="1"
            />
          );
        })}
      </svg>
      <span className="text-[12px] font-semibold" style={{ color }}>{label}</span>
      <span className="text-[11px] text-gray-400">Ø {fmt1(tire.diam_in)}"</span>
    </div>
  );
}

// ── Tire input panel ───────────────────────────────────────────────────────
function TireInputs({ values, onChange, color, title }) {
  const { width, aspect, rim } = values;

  const widthOpts  = [135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335,345,355];
  const aspectOpts = [25,30,35,40,45,50,55,60,65,70,75,80];
  const rimOpts    = [13,14,15,16,17,18,19,20,21,22,23,24];

  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ border: `1px solid ${color}30` }}>
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
        <span className="text-[13px] font-semibold text-gray-700">{title}</span>
        <span className="text-[12px] text-gray-300 ml-auto">
          {width && aspect && rim ? `${width}/${aspect} R${rim}` : 'Not configured'}
        </span>
      </div>
      <div className="px-5 py-4">
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { label: 'Width (mm)', key: 'width',  opts: widthOpts  },
            { label: 'Aspect (%)', key: 'aspect', opts: aspectOpts },
            { label: 'Rim (")',    key: 'rim',    opts: rimOpts    },
          ].map(({ label, key, opts }) => (
            <div key={key}>
              <label className="block text-[11px] font-medium text-gray-300 tracking-[0.4px] uppercase mb-1.5">
                {label}
              </label>
              <select
                value={values[key]}
                onChange={(e) => onChange({ ...values, [key]: e.target.value })}
                className="w-full py-2 pl-3 pr-7 text-[13px] font-medium border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-pointer focus:outline-none"
              >
                <option value="">—</option>
                {opts.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Comparison row ─────────────────────────────────────────────────────────
function CompRow({ label, valA, valB, unit = '', diffB, sublabel }) {
  return (
    <div className="grid gap-2 items-center py-2.5 border-b border-gray-50" style={{ gridTemplateColumns: '1fr 160px 1fr' }}>
      <div className="text-right">
        <span className="text-[14px] font-medium text-gray-900">{valA}{unit}</span>
      </div>
      <div className="text-center">
        <span className="text-[11px] text-gray-300 block">{label}</span>
        {sublabel && <span className="text-[10px] text-gray-200">{sublabel}</span>}
      </div>
      <div className="text-left">
        <span className="text-[14px] font-medium text-gray-900">{valB}{unit}</span>
        {diffB && <div className="mt-0.5">{diffB}</div>}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function TireComparatorComponent() {
  const [tireA, setTireA] = useState({ width: '225', aspect: '45', rim: '17' });
  const [tireB, setTireB] = useState({ width: '235', aspect: '40', rim: '18' });
  const [speedIndicated, setSpeedIndicated] = useState(65); // mph default

  const dataA = parseTire(tireA.width, tireA.aspect, tireA.rim);
  const dataB = parseTire(tireB.width, tireB.aspect, tireB.rim);
  const valid = dataA && dataB;

  const actualSpeedB = valid ? actualSpeed(speedIndicated, dataA.revMile, dataB.revMile) : null;
  const speedDiff    = valid ? actualSpeedB - speedIndicated : null;

  const diamDiffMM  = valid ? dataB.diam_mm  - dataA.diam_mm  : null;
  const diamDiffIn  = valid ? dataB.diam_in  - dataA.diam_in  : null;
  const pctDiam     = valid ? (diamDiffMM / dataA.diam_mm) * 100 : null;

  function getCompat(pct) {
    if (pct === null) return null;
    const abs = Math.abs(pct);
    if (abs <= 1.5) return { label: 'Compatible',       desc: 'Minimal difference. No impact on speedometer or odometer.',          color: '#10b981' };
    if (abs <= 3)   return { label: 'Acceptable',       desc: 'Minor difference. Speedometer may read off by 1–3%.',               color: '#f59e0b' };
    if (abs <= 5)   return { label: 'Caution',          desc: 'Notable difference. May affect speedometer, ABS, and TPMS.',        color: '#ef4444' };
    return                  { label: 'Not recommended', desc: 'Excessive difference. Incompatible with most vehicle electronics.',  color: '#dc2626' };
  }

  const compat = valid ? getCompat(pctDiam) : null;

  return (
    <div className="min-h-screen bg-[#f4f4f2] px-8 py-14 max-sm:px-4 max-sm:py-7">
      <div className="max-w-[860px] mx-auto">

        {/* Header */}
        <div className="mb-9">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">
            Tire Size Comparator
          </h1>
          <p className="text-[13px] text-gray-400 m-0">
            Select two tire sizes to compare dimensions, compatibility, and speedometer deviation.
          </p>
        </div>

        {/* Tire inputs */}
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 mb-3">
          <TireInputs values={tireA} onChange={setTireA} color="#407BFF" title="Tire A — Original" />
          <TireInputs values={tireB} onChange={setTireB} color="#f59e0b" title="Tire B — Alternative" />
        </div>

        {/* Speedometer input */}
        <div className="bg-white rounded-2xl border border-gray-200 px-5 py-4 mb-5 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-[13px] font-medium text-gray-500 mb-0.5">Indicated speedometer speed</p>
            <p className="text-[11px] text-gray-300 m-0">To calculate deviation with Tire B</p>
          </div>
          <div className="flex items-baseline gap-1">
            <input
              type="number" min="5" max="200" step="1"
              value={speedIndicated}
              onChange={(e) => setSpeedIndicated(Math.max(5, Math.min(200, parseInt(e.target.value) || 5)))}
              className="w-[72px] text-right text-[22px] font-semibold bg-transparent border-none text-gray-900 p-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[13px] text-gray-300">mph</span>
          </div>
        </div>

        {/* ── Results ── */}
        {!valid ? (
          <div className="bg-white rounded-2xl border border-gray-200 px-6 py-12 text-center">
            <p className="text-[13px] text-gray-300 m-0">Select both tires to see the comparison.</p>
          </div>
        ) : (
          <>
            {/* Visual comparison */}
            <div className="bg-white rounded-2xl border border-gray-200 px-6 py-7 mb-3">
              <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-6">Visual comparison</p>
              <div className="flex items-center justify-center gap-10 flex-wrap">
                <TireVisual tire={dataA} color="#407BFF" label={`${tireA.width}/${tireA.aspect} R${tireA.rim}`} />
                <div className="text-center">
                  <p className="text-[11px] text-gray-300 mb-1">Ø Difference</p>
                  <p
                    className="text-[22px] font-semibold m-0 tracking-tight"
                    style={{ color: Math.abs(pctDiam) <= 3 ? '#10b981' : '#ef4444' }}
                  >
                    {diamDiffIn > 0 ? '+' : ''}{fmt2(diamDiffIn)}"
                  </p>
                  <p className="text-[11px] text-gray-300 mt-0.5">
                    {diamDiffMM > 0 ? '+' : ''}{fmt1(diamDiffMM)} mm ({diamDiffMM > 0 ? '+' : ''}{fmt2(pctDiam)}%)
                  </p>
                </div>
                <TireVisual tire={dataB} color="#f59e0b" label={`${tireB.width}/${tireB.aspect} R${tireB.rim}`} />
              </div>
            </div>

            {/* Compatibility badge */}
            {compat && (
              <div
                className="bg-white rounded-2xl px-5 py-4 mb-3 flex items-center gap-3.5"
                style={{ border: `1px solid ${compat.color}30` }}
              >
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: compat.color }} />
                <div>
                  <p className="text-[13px] font-semibold m-0 mb-0.5" style={{ color: compat.color }}>{compat.label}</p>
                  <p className="text-[12px] text-gray-400 m-0">{compat.desc}</p>
                </div>
              </div>
            )}

            {/* Dimensions table */}
            <div className="bg-white rounded-2xl border border-gray-200 px-6 py-6 mb-3">
              {/* Table header */}
              <div className="flex justify-between items-center mb-4 max-sm:flex-col max-sm:gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#407BFF]" />
                  <span className="text-[13px] font-semibold text-[#407BFF]">{tireA.width}/{tireA.aspect} R{tireA.rim}</span>
                </div>
                <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase m-0">Dimensions</p>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-[#f59e0b]">{tireB.width}/{tireB.aspect} R{tireB.rim}</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                </div>
              </div>

              <CompRow label="Width" sublabel="mm"
                valA={fmt0(dataA.width)} valB={fmt0(dataB.width)} unit=" mm"
                diffB={<DiffBadge a={dataA.width} b={dataB.width} unit=" mm" higherIsBetter={false} />}
              />
              <CompRow label="Sidewall height" sublabel="mm"
                valA={fmt1(dataA.sidewallMM)} valB={fmt1(dataB.sidewallMM)} unit=" mm"
                diffB={<DiffBadge a={dataA.sidewallMM} b={dataB.sidewallMM} unit=" mm" />}
              />
              <CompRow label="Overall diameter" sublabel="inches"
                valA={fmt2(dataA.diam_in)} valB={fmt2(dataB.diam_in)} unit='"'
                diffB={<DiffBadge a={dataA.diam_in} b={dataB.diam_in} unit='"' />}
              />
              <CompRow label="Overall diameter" sublabel="mm"
                valA={fmt1(dataA.diam_mm)} valB={fmt1(dataB.diam_mm)} unit=" mm"
              />
              <CompRow label="Loaded radius" sublabel="mm"
                valA={fmt1(dataA.radius_mm)} valB={fmt1(dataB.radius_mm)} unit=" mm"
              />
              <CompRow label="Circumference" sublabel="inches"
                valA={fmt1(dataA.circumf_in)} valB={fmt1(dataB.circumf_in)} unit='"'
                diffB={<DiffBadge a={dataA.circumf_in} b={dataB.circumf_in} unit='"' />}
              />
              <CompRow label="Revolutions per mile" sublabel="rev/mi"
                valA={fmt1(dataA.revMile)} valB={fmt1(dataB.revMile)}
                diffB={<DiffBadge a={dataA.revMile} b={dataB.revMile} higherIsBetter={false} />}
              />
            </div>

            {/* Speedometer deviation */}
            <div className="bg-white rounded-2xl border border-gray-200 px-6 py-6">
              <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-4">
                Speedometer deviation
              </p>

              {/* Speed cards */}
              <div className="grid gap-3 mb-5" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
                <div className="bg-[#f5f7ff] rounded-xl px-4 py-3.5 text-center">
                  <p className="text-[11px] font-medium text-[#407BFF] mb-1">Speedometer reads</p>
                  <p className="text-[28px] font-semibold text-[#407BFF] m-0 tracking-tight">
                    {speedIndicated}
                    <span className="text-[13px] font-normal ml-1">mph</span>
                  </p>
                </div>
                <div className="flex items-center text-gray-300 text-xl">→</div>
                <div
                  className="rounded-xl px-4 py-3.5 text-center"
                  style={{ background: Math.abs(speedDiff) <= 2 ? '#f0fdf4' : Math.abs(speedDiff) <= 5 ? '#fffbeb' : '#fef2f2' }}
                >
                  <p className="text-[11px] font-medium text-gray-500 mb-1">Actual speed with B</p>
                  <p
                    className="text-[28px] font-semibold m-0 tracking-tight"
                    style={{ color: Math.abs(speedDiff) <= 2 ? '#10b981' : Math.abs(speedDiff) <= 5 ? '#f59e0b' : '#ef4444' }}
                  >
                    {fmt1(actualSpeedB)}
                    <span className="text-[13px] font-normal ml-1">mph</span>
                  </p>
                </div>
              </div>

              {/* Detail rows */}
              {[
                { label: 'Indicated speed (A)',   value: `${speedIndicated} mph` },
                { label: 'Actual speed with B',   value: `${fmt1(actualSpeedB)} mph` },
                { label: 'Absolute difference',   value: `${speedDiff > 0 ? '+' : ''}${fmt1(speedDiff)} mph` },
                { label: 'Percentage deviation',  value: `${speedDiff > 0 ? '+' : ''}${fmt2((speedDiff / speedIndicated) * 100)}%` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2.5 border-b border-gray-50">
                  <span className="text-[13px] text-gray-400">{label}</span>
                  <span className="text-[14px] font-medium text-gray-900">{value}</span>
                </div>
              ))}

              {/* Note */}
              <div className="mt-3.5 px-3.5 py-3 bg-gray-50 rounded-lg">
                <p className="text-[12px] text-gray-400 m-0 leading-relaxed">
                  A diameter difference greater than <strong className="text-gray-600">3%</strong> can affect ABS, traction control, TPMS, and your odometer in addition to the speedometer. It is recommended to stay within <strong className="text-gray-600">±2%</strong> on vehicles with advanced electronic systems.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}