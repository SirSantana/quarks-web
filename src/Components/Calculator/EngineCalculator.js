import { CREATE_SUGERENCIA } from "@/graphql/mutations";
import { OTHER_CALCULATORS } from "@/pages/engine-displacement-calculator";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

const fmt = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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
    const move = (e) =>
      onChange(getVal(e.touches ? e.touches[0].clientX : e.clientX));
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", up);
  };

  return (
    <div
      ref={trackRef}
      onMouseDown={(e) => startDrag(e.clientX)}
      onTouchStart={(e) => startDrag(e.touches[0].clientX)}
      className="relative h-7 flex items-center cursor-pointer select-none"
    >
      <div className="absolute w-full h-1 bg-gray-200 rounded-full" />
      <div
        className="absolute h-1 rounded-full bg-[#407BFF]"
        style={{ width: `${pct}%` }}
      />
      <div
        className="absolute w-5 h-5 rounded-full bg-[#407BFF] border-[3px] border-white shadow-[0_1px_8px_rgba(64,123,255,0.35)] z-10 -translate-x-1/2"
        style={{ left: `${pct}%` }}
      />
    </div>
  );
}

function Row({ label, value, large = false, sublabel = null }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
      <div>
        <span className="text-[13px] text-gray-400 block">{label}</span>
        {sublabel && (
          <span className="text-[11px] text-gray-300">{sublabel}</span>
        )}
      </div>
      <span
        className={`${large ? "text-[22px] font-semibold font-mono  tracking-tight" : "text-[15px] font-medium font-mono "} text-gray-900 text-right`}
      >
        {value}
      </span>
    </div>
  );
}

function SectionLabel({ children, mt = false }) {
  return (
    <p
      className={`text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-0.5 ${mt ? "mt-5" : ""}`}
    >
      {children}
    </p>
  );
}

function NumberInput({
  value,
  onChange,
  suffix,
  wide = false,
  step = 0.001,
  min = 0,
  max,
}) {
  return (
    <div className="flex items-baseline gap-0.5">
      <input
        type="number"
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={(e) =>
          onChange(
            Math.min(
              max ?? Infinity,
              Math.max(min, parseFloat(e.target.value) || 0),
            ),
          )
        }
        className={`${wide ? "w-20" : "w-[78px]"} text-right text-[22px] font-semibold bg-transparent border-none text-gray-900 p-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
      />
      {suffix && <span className="text-[13px] text-gray-300">{suffix}</span>}
    </div>
  );
}

function SliderField({ label, sublabel, input, minLabel, maxLabel, children }) {
  return (
    <div className="mb-7">
      <div className="flex justify-between items-center mb-3.5">
        <div>
          <span className="text-[13px] font-medium text-gray-500 block">
            {label}
          </span>
          {sublabel && (
            <span className="text-[11px] text-gray-300">{sublabel}</span>
          )}
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

function getEngineType(stroke, bore) {
  if (!stroke || !bore) return null;
  const ratio = stroke / bore;
  if (Math.abs(ratio - 1) < 0.02)
    return {
      label: "Square engine",
      desc: "Stroke = Bore. Balanced power and torque output.",
      color: "#407BFF",
    };
  if (ratio < 1)
    return {
      label: "Oversquare engine",
      desc: "Stroke < Bore. Higher power at high RPM (short-stroke).",
      color: "#10b981",
    };
  return {
    label: "Undersquare engine",
    desc: "Stroke > Bore. More torque at low RPM (long-stroke).",
    color: "#f59e0b",
  };
}

function getCRRating(cr, engineType) {
  if (!cr) return null;
  if (engineType === "diesel") {
    if (cr >= 16 && cr <= 24)
      return { label: "Normal diesel range", color: "#10b981" };
    if (cr < 16)
      return { label: "Below typical diesel range", color: "#f59e0b" };
    return { label: "Above typical diesel range", color: "#ef4444" };
  }
  if (cr >= 8 && cr <= 11)
    return { label: "Normal range (regular fuel)", color: "#10b981" };
  if (cr > 11 && cr <= 13)
    return { label: "High performance (premium fuel)", color: "#407BFF" };
  if (cr > 13) return { label: "Racing / forced induction", color: "#8b5cf6" };
  return { label: "Low compression", color: "#f59e0b" };
}

export default function EngineDisplacementCalculatorComponent() {
  const router = useRouter();

  // US defaults: inches, V8
  const [unitSystem, setUnitSystem] = useState("in");
  const [engineType, setEngineType] = useState("gasoline");
  const [numCylinders, setNumCylinders] = useState(4);
  const [bore, setBore] = useState(4.0); // inches
  const [stroke, setStroke] = useState(3.48); // inches
  const [chamberVol, setChamberVol] = useState(2.32); // cc (always cc)
  const [rpm, setRpm] = useState(5500);
  const [feedback, setFeedback] = useState("");

  const [createSugerencia, { data, loading }] = useMutation(CREATE_SUGERENCIA);
  useEffect(() => {
    if (data) setTimeout(() => router.reload(), 3000);
  }, [data]);

  // ── Unit ranges ──────────────────────────────────────────────────────────
  const maxBore = unitSystem === "in" ? 6.0 : 150;
  const maxStroke = unitSystem === "in" ? 6.0 : 150;
  const minBore = unitSystem === "in" ? 1.5 : 0;
  const minStroke = unitSystem === "in" ? 1.5 : 0;
  const sliderStep = unitSystem === "in" ? 0.001 : 0.5;
  const inputStep = unitSystem === "in" ? 0.001 : 0.1;
  const unitLabel = unitSystem === "in" ? "in" : "mm";

  // Switch unit and convert values
  const switchUnit = (newUnit) => {
    if (newUnit === unitSystem) return;
    if (newUnit === "mm") {
      setBore(parseFloat((bore * 25.4).toFixed(2)));
      setStroke(parseFloat((stroke * 25.4).toFixed(2)));
    } else {
      setBore(parseFloat((bore / 25.4).toFixed(3)));
      setStroke(parseFloat((stroke / 25.4).toFixed(3)));
    }
    setUnitSystem(newUnit);
  };

  // ── Calculations (always in mm / cc internally) ──────────────────────────
  const boreMM = unitSystem === "in" ? bore * 25.4 : bore;
  const strokeMM = unitSystem === "in" ? stroke * 25.4 : stroke;
  const strokeIn = unitSystem === "in" ? stroke : stroke / 25.4;

  const dispPerCyl = ((Math.PI / 4) * Math.pow(boreMM, 2) * strokeMM) / 1000;
  const dispTotal = dispPerCyl * numCylinders;
  const dispLiters = dispTotal / 1000;
  const dispCuIn = dispTotal / 16.387;

  const cr = chamberVol > 0 ? 1 + dispPerCyl / chamberVol : 0;
  const volBDC = dispPerCyl + chamberVol;

  const meanPistonSpeedFtMin = (2 * strokeIn * rpm) / 12;
  const meanPistonSpeedMs = (2 * strokeMM * rpm) / 60000;

  const geomType = getEngineType(strokeMM, boreMM);
  const crRating = getCRRating(cr, engineType);

  const hpRefMin = engineType === "diesel" ? 35 : 45;
  const hpRefMax = engineType === "diesel" ? 70 : 90;
  const hpEstMin = dispLiters * hpRefMin;
  const hpEstMax = dispLiters * hpRefMax;

  const valid = bore > 0 && stroke > 0 && numCylinders > 0;

  return (
    <div className="min-h-screen bg-[#f4f4f2] px-8 py-14 max-sm:px-4 max-sm:py-7">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="mb-9">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">
            Engine Displacement Calculator
          </h1>
          <p className="text-[13px] text-gray-400 m-0">
            Enter bore, stroke, and cylinder count to calculate displacement,
            compression ratio, and more.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-[440px_1fr] max-[880px]:grid-cols-1">
            {/* ── LEFT: Form ── */}
            <div className="p-8 border-r border-gray-200 max-[880px]:border-r-0 max-[880px]:border-b max-sm:p-6">
              {/* Engine type + cylinders */}
              <div className="flex gap-3 mb-4">
                <CalcSelect
                  label="Engine Type"
                  value={engineType}
                  onChange={setEngineType}
                >
                  <option value="gasoline">Gasoline</option>
                  <option value="diesel">Diesel</option>
                </CalcSelect>
                <CalcSelect
                  label="Cylinders"
                  value={numCylinders}
                  onChange={(v) => setNumCylinders(Number(v))}
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((n) => (
                    <option key={n} value={n}>
                      {n} cyl
                    </option>
                  ))}
                </CalcSelect>
              </div>

              {/* Measurement units */}
              <div className="mb-8">
                <CalcSelect
                  label="Measurement Units"
                  value={unitSystem}
                  onChange={switchUnit}
                >
                  <option value="in">Inches (in) — US Standard</option>
                  <option value="mm">Millimeters (mm) — Metric</option>
                </CalcSelect>
              </div>

              {/* Bore */}
              <SliderField
                label="Bore"
                sublabel="Cylinder diameter"
                minLabel={`${minBore} ${unitLabel}`}
                maxLabel={`${maxBore} ${unitLabel}`}
                input={
                  <NumberInput
                    value={bore}
                    onChange={setBore}
                    suffix={unitLabel}
                    step={inputStep}
                    min={minBore}
                    max={maxBore}
                  />
                }
              >
                <CustomSlider
                  min={minBore}
                  max={maxBore}
                  step={sliderStep}
                  value={bore}
                  onChange={setBore}
                />
              </SliderField>

              {/* Stroke */}
              <SliderField
                label="Stroke"
                sublabel="TDC → BDC distance"
                minLabel={`${minStroke} ${unitLabel}`}
                maxLabel={`${maxStroke} ${unitLabel}`}
                input={
                  <NumberInput
                    value={stroke}
                    onChange={setStroke}
                    suffix={unitLabel}
                    step={inputStep}
                    min={minStroke}
                    max={maxStroke}
                  />
                }
              >
                <CustomSlider
                  min={minStroke}
                  max={maxStroke}
                  step={sliderStep}
                  value={stroke}
                  onChange={setStroke}
                />
              </SliderField>

              {/* Chamber volume */}
              <SliderField
                label="Chamber Volume"
                sublabel="Combustion chamber at TDC (cc)"
                minLabel="0.5 cc"
                maxLabel="120 cc"
                input={
                  <NumberInput
                    value={chamberVol}
                    onChange={setChamberVol}
                    suffix="cc"
                    step={0.01}
                    min={0.5}
                    max={200}
                  />
                }
              >
                <CustomSlider
                  min={0.5}
                  max={120}
                  step={0.5}
                  value={chamberVol}
                  onChange={setChamberVol}
                />
              </SliderField>

              {/* RPM */}
              <SliderField
                label="Engine Speed"
                sublabel="For mean piston speed calculation"
                minLabel="500 rpm"
                maxLabel="10,000 rpm"
                input={
                  <NumberInput
                    value={rpm}
                    onChange={setRpm}
                    suffix="rpm"
                    step={100}
                    min={500}
                    max={12000}
                    wide
                  />
                }
              >
                <CustomSlider
                  min={500}
                  max={10000}
                  step={100}
                  value={rpm}
                  onChange={setRpm}
                />
              </SliderField>
            </div>

            {/* ── RIGHT: Results ── */}
            <div className="p-8 max-sm:p-6">
              {!valid ? (
                <div className="flex items-center justify-center min-h-[200px]">
                  <p className="text-[13px] text-gray-300 text-center">
                    Enter bore, stroke, and cylinders to see your results.
                  </p>
                </div>
              ) : (
                <>
                  {/* Primary — cubic inches (US standard) */}
                  <div className="mb-7">
                    <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-1.5">
                      Total displacement
                    </p>
                    <p className="text-[60px] font-semibold leading-none tracking-[-2px] text-[#407BFF] m-0">
                      {dispCuIn.toFixed(1)}
                      <span className="text-lg font-normal text-gray-300 ml-2 tracking-normal">
                        cu in
                      </span>
                    </p>
                    <p className="text-sm text-gray-300 mt-1.5 mb-0">
                      {dispLiters.toFixed(3)} L · {fmt(Math.round(dispTotal))}{" "}
                      cc · {numCylinders} cyl
                    </p>
                  </div>

                  {/* Geometry badge */}
                  {geomType && (
                    <div
                      className="mb-5 px-3.5 py-3 bg-gray-50 rounded-xl"
                      style={{ borderLeft: `3px solid ${geomType.color}` }}
                    >
                      <p
                        className="text-[13px] font-semibold m-0 mb-0.5"
                        style={{ color: geomType.color }}
                      >
                        {geomType.label}
                      </p>
                      <p className="text-[12px] text-gray-400 m-0">
                        {geomType.desc}
                      </p>
                    </div>
                  )}

                  {/* Displacement */}
                  <SectionLabel>Displacement</SectionLabel>
                  <Row
                    label="Per cylinder"
                    sublabel="Single cylinder volume"
                    value={`${(dispPerCyl / 16.387).toFixed(3)} cu in`}
                    large
                  />
                  <Row
                    label="Total (cubic inches)"
                    value={`${dispCuIn.toFixed(2)} cu in`}
                  />
                  <Row
                    label="Total (liters)"
                    value={`${dispLiters.toFixed(4)} L`}
                  />
                  <Row
                    label="Total (cc)"
                    value={`${fmt(Math.round(dispTotal))} cc`}
                  />

                  {/* Compression ratio */}
                  <SectionLabel mt>Compression Ratio</SectionLabel>
                  <Row
                    label="Compression ratio (CR)"
                    value={`${cr.toFixed(2)} : 1`}
                    large
                  />
                  <Row
                    label="Volume at BDC"
                    sublabel="Piston at bottom"
                    value={`${(volBDC / 16.387).toFixed(3)} cu in · ${volBDC.toFixed(2)} cc`}
                  />
                  <Row
                    label="Chamber vol. at TDC"
                    value={`${(chamberVol / 16.387).toFixed(3)} cu in · ${chamberVol.toFixed(2)} cc`}
                  />

                  {/* CR badge */}
                  {crRating && (
                    <div className="inline-flex items-center gap-1.5 mt-2 mb-4 px-3 py-2 bg-gray-50 rounded-lg">
                      <span
                        className="w-[7px] h-[7px] rounded-full shrink-0"
                        style={{ background: crRating.color }}
                      />
                      <span className="text-[12px] text-gray-500">
                        {crRating.label}
                      </span>
                    </div>
                  )}

                  {/* Piston dynamics */}
                  <SectionLabel>Piston Dynamics</SectionLabel>
                  <Row
                    label="Mean piston speed"
                    sublabel={`At ${fmt(rpm)} rpm`}
                    value={`${fmt(Math.round(meanPistonSpeedFtMin))} ft/min`}
                    large
                  />
                  <Row
                    label="Mean piston speed (metric)"
                    value={`${meanPistonSpeedMs.toFixed(2)} m/s`}
                  />
                  <Row
                    label="Stroke / Bore ratio"
                    value={`${(strokeMM / boreMM).toFixed(3)}`}
                  />
                  <Row
                    label="Bore area"
                    value={`${((Math.PI / 4) * Math.pow(strokeIn, 2)).toFixed(4)} in²`}
                  />

                  {/* Estimated HP */}
                  <SectionLabel mt>
                    Estimated Power (naturally aspirated)
                  </SectionLabel>
                  <Row
                    label={`${engineType === "diesel" ? "Diesel" : "Gasoline"} engine reference`}
                    sublabel="Rough estimate only"
                    value={`${Math.round(hpEstMin)}–${Math.round(hpEstMax)} hp`}
                    large
                  />
                  <Row
                    label="Specific output reference"
                    value={`${hpRefMin}–${hpRefMax} hp/L`}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-3">
            Other tools
          </p>
          <div className="grid grid-cols-4 gap-3 max-[860px]:grid-cols-2 max-sm:grid-cols-1">
            {OTHER_CALCULATORS.map(({ label, desc, href, icon }) => {
              const isActive = router.pathname === href;
              return (
                <a
                  key={href}
                  href={href}
                  className={`group flex items-start gap-3 p-4 rounded-xl border transition-all duration-150 no-underline
                            ${
                              isActive
                                ? "bg-[#407BFF]/5 border-[#407BFF]/25 cursor-default pointer-events-none"
                                : "bg-white border-gray-200 hover:border-[#407BFF]/40 hover:shadow-[0_2px_12px_rgba(64,123,255,0.08)]"
                            }`}
                >
                  <span
                    className={`mt-0.5 flex-shrink-0 transition-colors ${isActive ? "text-[#407BFF]" : "text-gray-300 group-hover:text-[#407BFF]"}`}
                  >
                    {icon}
                  </span>
                  <div>
                    <span
                      className={`block text-[13px] font-medium leading-snug ${isActive ? "text-[#407BFF]" : "text-gray-700"}`}
                    >
                      {label}
                    </span>
                    <span
                      className={`block text-[11px] mt-0.5 leading-snug ${isActive ? "text-gray-600" : "text-gray-400"}`}
                    >
                      {desc}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Feedback */}
        <div className="mt-5 max-w-[400px]">
          <p className="text-[13px] font-medium text-gray-400 mb-2">
            Have a suggestion?
          </p>
          <textarea
            value={feedback}
            onChange={(e) =>
              setFeedback(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ""))
            }
            placeholder="Share your feedback here..."
            rows={3}
            className="w-full px-3 py-2.5 text-[13px] text-gray-700 border border-gray-200 rounded-lg resize-none focus:outline-none leading-relaxed bg-white"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (feedback.trim().length <= 10)
                return alert("Please share a bit more detail.");
              createSugerencia({
                variables: {
                  sugerencia: feedback.trim(),
                  tipo: "engine-displacement-calculator",
                },
              });
            }}
            disabled={loading}
            className="mt-2 px-5 py-2 bg-[#407BFF] text-white text-[13px] font-medium rounded-lg border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {loading ? "Sending..." : "Send"}
          </button>
          {data && (
            <p className="text-[12px] text-[#407BFF] mt-2">
              Thanks for your feedback!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
