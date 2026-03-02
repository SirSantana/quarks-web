import { OTHER_CALCULATORS } from "@/pages/calculadora-de-combustible";
import { useRouter } from "next/router";
import { useState } from "react";

// ── Parsing & calculations ─────────────────────────────────────────────────
function parseTire(ancho, perfil, aro) {
  const a = parseFloat(ancho);
  const p = parseFloat(perfil);
  const r = parseFloat(aro);
  if (!a || !p || !r) return null;

  const flancoMM = a * (p / 100);
  const diam_mm = r * 25.4 + flancoMM * 2;
  const diam_cm = diam_mm / 10;
  const circunf_mm = Math.PI * diam_mm;
  const circunf_cm = circunf_mm / 10;
  const revKm = 1000000 / circunf_mm;
  const radio_mm = diam_mm / 2;

  return { ancho: a, perfil: p, aro: r, flancoMM, diam_mm, diam_cm, circunf_mm, circunf_cm, revKm, radio_mm };
}

function velReal(velIndicada, revOrig, revNuevo) {
  if (!revOrig || !revNuevo) return null;
  return velIndicada * (revNuevo / revOrig);
}

function fmt2(n) { return isNaN(n) ? "—" : n.toFixed(2); }
function fmt1(n) { return isNaN(n) ? "—" : n.toFixed(1); }
function fmt0(n) { return isNaN(n) ? "—" : Math.round(n).toString(); }

// ── DiffBadge ─────────────────────────────────────────────────────────────
function DiffBadge({ a, b, unit = "", higherIsBetter = true }) {
  if (!a || !b) return null;
  const diff = b - a;
  const pct = (diff / a) * 100;
  if (Math.abs(pct) < 0.05) return <span className="text-[11px] text-gray-300">igual</span>;
  const positive = diff > 0;
  const good = positive ? higherIsBetter : !higherIsBetter;
  const colorClass = good ? "text-emerald-600 bg-emerald-50" : "text-red-500 bg-red-50";
  const sign = diff > 0 ? "+" : "";
  return (
    <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${colorClass}`}>
      {sign}{diff.toFixed(1)}{unit} ({sign}{pct.toFixed(1)}%)
    </span>
  );
}

// ── TireVisual ────────────────────────────────────────────────────────────
function TireVisual({ tire, color, label }) {
  if (!tire) return null;
  const maxDiam = 800;
  const scale = 120 / maxDiam;
  const outerR = (tire.diam_mm / 2) * scale;
  const innerR = ((tire.aro * 25.4) / 2) * scale;
  const cx = 70, cy = 70;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <ellipse cx={cx} cy={cy} rx={outerR + 2} ry={outerR + 2} fill="rgba(0,0,0,0.04)" />
        <circle cx={cx} cy={cy} r={outerR} fill={color + "18"} stroke={color} strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={innerR + (outerR - innerR) * 0.15} fill="white" stroke={color + "40"} strokeWidth="1" strokeDasharray="3 3" />
        <circle cx={cx} cy={cy} r={innerR} fill="white" stroke={color} strokeWidth="2" />
        <circle cx={cx} cy={cy} r={4} fill={color} />
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line key={deg}
              x1={cx + innerR * Math.cos(rad)} y1={cy + innerR * Math.sin(rad)}
              x2={cx + (innerR + (outerR - innerR) * 0.6) * Math.cos(rad)}
              y2={cy + (innerR + (outerR - innerR) * 0.6) * Math.sin(rad)}
              stroke={color + "50"} strokeWidth="1"
            />
          );
        })}
      </svg>
      <span className="text-[12px] font-semibold" style={{ color }}>{label}</span>
      <span className="text-[11px] text-gray-300">Ø {fmt1(tire.diam_cm)} cm</span>
    </div>
  );
}

// ── Select ────────────────────────────────────────────────────────────────
function TireSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-gray-300 tracking-[0.4px] uppercase mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2 pl-3 pr-7 text-[13px] font-medium border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-pointer focus:outline-none"
      >
        <option value="">—</option>
        {options.map((v) => <option key={v} value={v}>{v}</option>)}
      </select>
    </div>
  );
}

// ── TireInputs ────────────────────────────────────────────────────────────
const ANCHO_OPTS = [135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335,345,355];
const PERFIL_OPTS = [25,30,35,40,45,50,55,60,65,70,75,80];
const ARO_OPTS = [13,14,15,16,17,18,19,20,21,22,23,24];

function TireInputs({ values, onChange, color, title }) {
  const { ancho, perfil, aro } = values;
  const borderColor = color + "30";
  return (
    <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor }}>
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100">
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
        <span className="text-[13px] font-semibold text-gray-800">{title}</span>
        <span className="text-[12px] text-gray-300 ml-auto">
          {ancho && perfil && aro ? `${ancho}/${perfil} R${aro}` : "Sin configurar"}
        </span>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-3 gap-2.5">
          <TireSelect label="Ancho (mm)" value={ancho} onChange={(v) => onChange({ ...values, ancho: v })} options={ANCHO_OPTS} />
          <TireSelect label="Perfil (%)" value={perfil} onChange={(v) => onChange({ ...values, perfil: v })} options={PERFIL_OPTS} />
          <TireSelect label='Aro (")' value={aro} onChange={(v) => onChange({ ...values, aro: v })} options={ARO_OPTS} />
        </div>
      </div>
    </div>
  );
}

// ── CompRow ───────────────────────────────────────────────────────────────
function CompRow({ label, valA, valB, unit = "", diffB, sublabel }) {
  return (
    <div className="grid grid-cols-[1fr_160px_1fr] gap-2 items-center py-2.5 border-b border-gray-50">
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

// ── SectionLabel ──────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-4">
      {children}
    </p>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function CalculadoraComparadorNeumaticosComponent() {
  const [tireA, setTireA] = useState({ ancho: "205", perfil: "55", aro: "16" });
  const [tireB, setTireB] = useState({ ancho: "215", perfil: "50", aro: "17" });
  const [velIndicada, setVelIndicada] = useState(120);
  const router = useRouter();

  const dataA = parseTire(tireA.ancho, tireA.perfil, tireA.aro);
  const dataB = parseTire(tireB.ancho, tireB.perfil, tireB.aro);
  const valid = dataA && dataB;

  const velRealB = valid ? velReal(velIndicada, dataA.revKm, dataB.revKm) : null;
  const difVel = valid ? velRealB - velIndicada : null;
  const difDiam = valid ? dataB.diam_mm - dataA.diam_mm : null;
  const pctDiam = valid ? (difDiam / dataA.diam_mm) * 100 : null;

  function getCompat(pct) {
    if (!pct) return null;
    const abs = Math.abs(pct);
    if (abs <= 1.5) return { label: "Compatible", desc: "Diferencia mínima. Sin impacto en velocímetro ni odómetro.", color: "#10b981" };
    if (abs <= 3) return { label: "Aceptable", desc: "Diferencia leve. El velocímetro puede desviarse 1–3%.", color: "#f59e0b" };
    if (abs <= 5) return { label: "Precaución", desc: "Diferencia notable. Puede afectar velocímetro, ABS y TPMS.", color: "#ef4444" };
    return { label: "No recomendado", desc: "Diferencia excesiva. Incompatible con la mayoría de vehículos.", color: "#dc2626" };
  }

  const compat = valid ? getCompat(pctDiam) : null;

  // Velocimeter color helper
  const velColor = (abs) => abs <= 2 ? "#10b981" : abs <= 5 ? "#f59e0b" : "#ef4444";
  const velBg = (abs) => abs <= 2 ? "#f0fdf4" : abs <= 5 ? "#fffbeb" : "#fef2f2";

  return (
    <div className="min-h-screen bg-[#f4f4f2] px-8 py-14 max-sm:px-4 max-sm:py-7">
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="mb-9">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">
            Comparador de neumáticos
          </h1>
          <p className="text-[13px] text-gray-400 m-0">
            Selecciona dos medidas de neumático y compara dimensiones, compatibilidad y desviación del velocímetro.
          </p>
        </div>

        {/* Tire inputs */}
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 mb-3">
          <TireInputs values={tireA} onChange={setTireA} color="#407BFF" title="Neumático A — Original" />
          <TireInputs values={tireB} onChange={setTireB} color="#f59e0b" title="Neumático B — Alternativo" />
        </div>

        {/* Velocímetro input */}
        <div className="bg-white rounded-2xl border border-gray-200 px-5 py-4 mb-5 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-[13px] font-medium text-gray-500 mb-0.5">Velocidad indicada en el velocímetro</p>
            <p className="text-[11px] text-gray-300 m-0">Para calcular la desviación con el neumático B</p>
          </div>
          <div className="flex items-baseline gap-1">
            <input
              type="number"
              min="10"
              max="350"
              step="1"
              value={velIndicada}
              onChange={(e) => setVelIndicada(Math.max(10, Math.min(350, parseInt(e.target.value) || 10)))}
              className="w-[72px] text-right text-[22px] font-semibold bg-transparent border-none text-gray-900 p-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[13px] text-gray-300">km/h</span>
          </div>
        </div>

        {/* ── RESULTS ── */}
        {!valid ? (
          <div className="bg-white rounded-2xl border border-gray-200 py-12 text-center">
            <p className="text-[13px] text-gray-300">Selecciona ambos neumáticos para ver la comparación.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">

            {/* Visual comparison */}
            <div className="bg-white rounded-2xl border border-gray-200 p-7">
              <SectionLabel>Comparación visual</SectionLabel>
              <div className="flex items-center justify-center gap-10 flex-wrap">
                <TireVisual tire={dataA} color="#407BFF" label={`${tireA.ancho}/${tireA.perfil} R${tireA.aro}`} />
                <div className="text-center">
                  <p className="text-[11px] text-gray-300 mb-1">Diferencia Ø</p>
                  <p className={`text-[22px] font-semibold m-0 tracking-tight ${Math.abs(pctDiam) <= 3 ? "text-emerald-500" : "text-red-500"}`}>
                    {difDiam > 0 ? "+" : ""}{fmt1(difDiam)} mm
                  </p>
                  <p className="text-[11px] text-gray-300 mt-0.5">
                    {difDiam > 0 ? "+" : ""}{fmt2(pctDiam)}%
                  </p>
                </div>
                <TireVisual tire={dataB} color="#f59e0b" label={`${tireB.ancho}/${tireB.perfil} R${tireB.aro}`} />
              </div>
            </div>

            {/* Compatibilidad badge */}
            {compat && (
              <div className="bg-white rounded-2xl border px-5 py-4 flex items-center gap-3.5" style={{ borderColor: compat.color + "30" }}>
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: compat.color }} />
                <div>
                  <p className="text-[13px] font-semibold m-0 mb-0.5" style={{ color: compat.color }}>{compat.label}</p>
                  <p className="text-[12px] text-gray-400 m-0">{compat.desc}</p>
                </div>
              </div>
            )}

            {/* Comparison table */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#407BFF]" />
                  <span className="text-[13px] font-semibold text-[#407BFF]">{tireA.ancho}/{tireA.perfil} R{tireA.aro}</span>
                </div>
                <SectionLabel>Dimensiones</SectionLabel>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-[#f59e0b]">{tireB.ancho}/{tireB.perfil} R{tireB.aro}</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                </div>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[400px]">
                  <CompRow label="Ancho" sublabel="mm" valA={fmt0(dataA.ancho)} valB={fmt0(dataB.ancho)} unit=" mm"
                    diffB={<DiffBadge a={dataA.ancho} b={dataB.ancho} unit=" mm" higherIsBetter={false} />} />
                  <CompRow label="Altura del flanco" sublabel="mm" valA={fmt1(dataA.flancoMM)} valB={fmt1(dataB.flancoMM)} unit=" mm"
                    diffB={<DiffBadge a={dataA.flancoMM} b={dataB.flancoMM} unit=" mm" />} />
                  <CompRow label="Diámetro total" sublabel="mm" valA={fmt1(dataA.diam_mm)} valB={fmt1(dataB.diam_mm)} unit=" mm"
                    diffB={<DiffBadge a={dataA.diam_mm} b={dataB.diam_mm} unit=" mm" />} />
                  <CompRow label="Diámetro total" sublabel='pulgadas' valA={fmt2(dataA.diam_mm / 25.4)} valB={fmt2(dataB.diam_mm / 25.4)} unit='"' />
                  <CompRow label="Radio de carga" sublabel="mm" valA={fmt1(dataA.radio_mm)} valB={fmt1(dataB.radio_mm)} unit=" mm" />
                  <CompRow label="Circunferencia" sublabel="cm" valA={fmt1(dataA.circunf_cm)} valB={fmt1(dataB.circunf_cm)} unit=" cm"
                    diffB={<DiffBadge a={dataA.circunf_cm} b={dataB.circunf_cm} unit=" cm" />} />
                  <CompRow label="Revoluciones/km" sublabel="rev/km" valA={fmt1(dataA.revKm)} valB={fmt1(dataB.revKm)}
                    diffB={<DiffBadge a={dataA.revKm} b={dataB.revKm} higherIsBetter={false} />} />
                </div>
              </div>
            </div>

            {/* Velocímetro */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <SectionLabel>Desviación del velocímetro</SectionLabel>

              <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center mb-5">
                {/* Velocímetro A */}
                <div className="bg-[#f5f7ff] rounded-xl p-4 text-center">
                  <p className="text-[11px] text-[#407BFF] font-medium mb-1">Velocímetro indica</p>
                  <p className="text-[28px] font-semibold text-[#407BFF] m-0 tracking-tight">
                    {velIndicada}<span className="text-[13px] font-normal ml-0.5">km/h</span>
                  </p>
                </div>
                <p className="text-[20px] text-gray-200">→</p>
                {/* Velocidad real */}
                <div className="rounded-xl p-4 text-center" style={{ background: velBg(Math.abs(difVel)) }}>
                  <p className="text-[11px] text-gray-500 font-medium mb-1">Velocidad real con B</p>
                  <p className="text-[28px] font-semibold m-0 tracking-tight" style={{ color: velColor(Math.abs(difVel)) }}>
                    {fmt1(velRealB)}<span className="text-[13px] font-normal ml-0.5">km/h</span>
                  </p>
                </div>
              </div>

              {/* Detail rows */}
              <div>
                {[
                  { label: "Velocidad indicada (A)", value: `${velIndicada} km/h` },
                  { label: "Velocidad real con B", value: `${fmt1(velRealB)} km/h` },
                  { label: "Diferencia absoluta", value: `${difVel > 0 ? "+" : ""}${fmt1(difVel)} km/h` },
                  { label: "Desviación porcentual", value: `${difVel > 0 ? "+" : ""}${fmt2((difVel / velIndicada) * 100)}%` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2.5 border-b border-gray-50">
                    <span className="text-[13px] text-gray-400">{label}</span>
                    <span className="text-[14px] font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3.5 p-3.5 bg-gray-50 rounded-lg">
                <p className="text-[12px] text-gray-400 m-0 leading-relaxed">
                  Una diferencia de diámetro superior al <strong className="text-gray-600">3%</strong> puede afectar el ABS, control de tracción, TPMS y el odómetro además del velocímetro. Se recomienda no superar el <strong className="text-gray-600">±2%</strong> en vehículos con sistemas electrónicos avanzados.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Other calculators */}
        <div className="mt-10">
          <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-3">
            Otras herramientas
          </p>
          <div className="grid grid-cols-4 gap-3 max-[860px]:grid-cols-2 max-sm:grid-cols-1">
            {OTHER_CALCULATORS.map(({ label, desc, href, icon }) => {
              const isActive = router.pathname === href;
              return (
                <a
                  key={href}
                  href={href}
                  className={`group flex items-start gap-3 p-4 rounded-xl border transition-all duration-150 no-underline
                    ${isActive
                      ? "bg-[#407BFF]/5 border-[#407BFF]/25 cursor-default pointer-events-none"
                      : "bg-white border-gray-200 hover:border-[#407BFF]/40 hover:shadow-[0_2px_12px_rgba(64,123,255,0.08)]"
                    }`}
                >
                  <span className={`mt-0.5 flex-shrink-0 transition-colors ${isActive ? "text-[#407BFF]" : "text-gray-300 group-hover:text-[#407BFF]"}`}>
                    {icon}
                  </span>
                  <div>
                    <span className={`block text-[13px] font-medium leading-snug ${isActive ? "text-[#407BFF]" : "text-gray-700"}`}>
                      {label}
                    </span>
                    <span className={`block text-[11px] mt-0.5 leading-snug ${isActive ? "text-gray-600" : "text-gray-400"}`}>
                      {desc}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}