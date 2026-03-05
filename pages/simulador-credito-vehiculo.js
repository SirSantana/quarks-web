import { CREATE_SUGERENCIA } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { OTHER_CALCULATORS } from "./calculadora-de-combustible";

// ── Formatters ────────────────────────────────────────────────────────────────

const fmt = (n) =>
  n.toLocaleString("es-CO", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const fmtDec = (n) =>
  n.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ── Custom Slider ─────────────────────────────────────────────────────────────

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

// ── NumberInput ───────────────────────────────────────────────────────────────

function NumberInput({ value, onChange, prefix, suffix, wide = false, step = 1, min = 0, max }) {
  const [raw, setRaw] = useState(String(value));

  useEffect(() => { setRaw(String(value)); }, [value]);

  const handleChange = (e) => {
    const str = e.target.value;
    setRaw(str);
    const parsed = parseFloat(str);
    if (!isNaN(parsed)) {
      const clamped = Math.min(max ?? Infinity, Math.max(min, parsed));
      onChange(clamped);
    }
  };

  const handleBlur = () => {
    const parsed = parseFloat(raw);
    if (isNaN(parsed)) { setRaw(String(min)); onChange(min); }
    else {
      const clamped = Math.min(max ?? Infinity, Math.max(min, parsed));
      setRaw(String(clamped));
      onChange(clamped);
    }
  };

  return (
    <div className="flex items-baseline gap-0.5">
      {prefix && <span className="text-[15px] text-gray-400 mr-0.5">{prefix}</span>}
      <input
        type="number"
        step={step}
        min={min}
        max={max}
        value={raw}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${wide ? "w-28" : "w-[80px]"} text-right text-[22px] font-semibold bg-transparent border-none text-gray-900 p-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
      />
      {suffix && <span className="text-[13px] text-gray-300 ml-0.5">{suffix}</span>}
    </div>
  );
}

// ── SliderField ───────────────────────────────────────────────────────────────

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

// ── Row ───────────────────────────────────────────────────────────────────────

function Row({ label, value, large = false, sublabel = null, accent = false }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-gray-100">
      <div>
        <span className="text-[13px] text-gray-400 block">{label}</span>
        {sublabel && <span className="text-[11px] text-gray-300">{sublabel}</span>}
      </div>
      <span className={`${large ? "text-[22px] font-semibold font-mono tracking-tight" : "text-[15px] font-medium font-mono"} ${accent ? "text-[#407BFF]" : "text-gray-900"} text-right`}>
        {value}
      </span>
    </div>
  );
}

// ── SectionLabel ──────────────────────────────────────────────────────────────

function SectionLabel({ children, mt = false }) {
  return (
    <p className={`text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-0.5 ${mt ? "mt-5" : ""}`}>
      {children}
    </p>
  );
}

// ── CalcSelect ────────────────────────────────────────────────────────────────

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

// ── Gráfico de amortización anual ─────────────────────────────────────────────

function GraficoAmortizacion({ schedule }) {
  if (!schedule.length) return null;

  const anuales = [];
  for (let i = 0; i < schedule.length; i += 12) {
    const chunk = schedule.slice(i, i + 12);
    const capital = chunk.reduce((s, r) => s + r.capital, 0);
    const interes = chunk.reduce((s, r) => s + r.interes, 0);
    anuales.push({ capital, interes, saldo: chunk[chunk.length - 1].saldo });
  }
  const maxVal = Math.max(...anuales.map((y) => y.capital + y.interes));

  return (
    <div>
      <SectionLabel mt>Amortización anual</SectionLabel>
      <div className="flex items-end gap-1.5 h-20 mt-3">
        {anuales.map((y, i) => {
          const total = y.capital + y.interes;
          const h = (total / maxVal) * 100;
          const pPct = (y.capital / total) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col justify-end gap-0.5 group relative">
              <div
                className="w-full rounded-t-sm overflow-hidden flex flex-col justify-end"
                style={{ height: `${h}%` }}
              >
                <div className="w-full bg-[#407BFF]/20" style={{ height: `${100 - pPct}%` }} />
                <div className="w-full bg-[#407BFF]" style={{ height: `${pPct}%` }} />
              </div>
              <span className="text-[9px] text-gray-300 text-center block">A{i + 1}</span>
              {/* Tooltip */}
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-10">
                <div className="bg-gray-900 text-white text-[10px] rounded px-2 py-1 whitespace-nowrap">
                  <p className="m-0">Capital: ${fmt(y.capital)}</p>
                  <p className="m-0">Interés: ${fmt(y.interes)}</p>
                  <p className="m-0">Saldo: ${fmt(y.saldo)}</p>
                </div>
                <div className="w-1.5 h-1.5 bg-gray-900 rotate-45 -mt-0.5" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#407BFF]" />
          <span className="text-[11px] text-gray-400">Capital</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm bg-[#407BFF]/20" />
          <span className="text-[11px] text-gray-400">Interés</span>
        </div>
      </div>
    </div>
  );
}

// ── Configuraciones por país ──────────────────────────────────────────────────

const PAISES = {
  colombia: {
    nombre: "Colombia",
    moneda: "COP",
    simbolo: "$",
    precioMin: 30_000_000,
    precioMax: 500_000_000,
    precioDefault: 70_000_000,
    cuotaDefault: 14_000_000,
    step: 1_000_000,
    tasaDefault: 1.8,          // tasa mensual EM típica
    tasaTipo: "mensual",       // Colombia usa Efectivo Mensual
    tasaMin: 0.5,
    tasaMax: 4.5,
    tasaStep: 0.05,
    plazoOpciones: [12, 24, 36, 48, 60, 72, 84],
    plazoDefault: 60,
    aval: true,                // seguro de vida + aval
    avalPct: 1.5,              // % sobre el préstamo
    impuesto: false,
    minLabel: "$30M",
    maxLabel: "$500M",
    cuotaMin: 0,
    cuotaMax: 200_000_000,
  },
  mexico: {
    nombre: "México",
    moneda: "MXN",
    simbolo: "$",
    precioMin: 150_000,
    precioMax: 2_000_000,
    precioDefault: 400_000,
    cuotaDefault: 80_000,
    step: 5_000,
    tasaDefault: 14.5,         // TAE anual típica
    tasaTipo: "anual",
    tasaMin: 5,
    tasaMax: 35,
    tasaStep: 0.1,
    plazoOpciones: [12, 24, 36, 48, 60, 72],
    plazoDefault: 48,
    aval: false,
    impuesto: true,
    impuestoPct: 16,           // IVA
    minLabel: "$150K",
    maxLabel: "$2M",
    cuotaMin: 0,
    cuotaMax: 600_000,
  },
  chile: {
    nombre: "Chile",
    moneda: "CLP",
    simbolo: "$",
    precioMin: 5_000_000,
    precioMax: 80_000_000,
    precioDefault: 15_000_000,
    cuotaDefault: 3_000_000,
    step: 500_000,
    tasaDefault: 1.2,
    tasaTipo: "mensual",
    tasaMin: 0.3,
    tasaMax: 3.5,
    tasaStep: 0.05,
    plazoOpciones: [12, 24, 36, 48, 60, 72],
    plazoDefault: 48,
    aval: false,
    impuesto: false,
    minLabel: "$5M",
    maxLabel: "$80M",
    cuotaMin: 0,
    cuotaMax: 30_000_000,
  },
  argentina: {
    nombre: "Argentina",
    moneda: "ARS",
    simbolo: "$",
    precioMin: 5_000_000,
    precioMax: 200_000_000,
    precioDefault: 30_000_000,
    cuotaDefault: 6_000_000,
    step: 500_000,
    tasaDefault: 5.5,
    tasaTipo: "mensual",
    tasaMin: 2,
    tasaMax: 15,
    tasaStep: 0.1,
    plazoOpciones: [12, 24, 36, 48, 60],
    plazoDefault: 36,
    aval: false,
    impuesto: false,
    minLabel: "$5M",
    maxLabel: "$200M",
    cuotaMin: 0,
    cuotaMax: 80_000_000,
  },
  peru: {
    nombre: "Perú",
    moneda: "PEN",
    simbolo: "S/",
    precioMin: 20_000,
    precioMax: 500_000,
    precioDefault: 80_000,
    cuotaDefault: 16_000,
    step: 1_000,
    tasaDefault: 14.0,
    tasaTipo: "anual",
    tasaMin: 5,
    tasaMax: 35,
    tasaStep: 0.1,
    plazoOpciones: [12, 24, 36, 48, 60, 72],
    plazoDefault: 48,
    aval: false,
    impuesto: true,
    impuestoPct: 18,
    minLabel: "S/20K",
    maxLabel: "S/500K",
    cuotaMin: 0,
    cuotaMax: 200_000,
  },
};

// ── Helpers de rating ─────────────────────────────────────────────────────────

function getTasaRating(tasa, tipo) {
  const anual = tipo === "mensual" ? ((1 + tasa / 100) ** 12 - 1) * 100 : tasa;
  if (anual <= 10) return { label: "Tasa excelente", color: "#10b981" };
  if (anual <= 18) return { label: "Tasa buena", color: "#407BFF" };
  if (anual <= 28) return { label: "Tasa promedio del mercado", color: "#f59e0b" };
  return { label: "Tasa alta — negocia o mejora tu perfil crediticio", color: "#ef4444" };
}

function getCuotaRating(pct) {
  if (pct >= 30) return { label: "Cuota inicial sólida (≥30%)", color: "#10b981" };
  if (pct >= 20) return { label: "Cuota inicial adecuada", color: "#407BFF" };
  if (pct >= 10) return { label: "Cuota inicial mínima", color: "#f59e0b" };
  return { label: "Cuota inicial baja — mayor riesgo de saldo negativo", color: "#ef4444" };
}

// ── Componente principal ──────────────────────────────────────────────────────

export default function CalculadoraCreditoVehicularComponent() {
  const router = useRouter();

  const [paisKey, setPaisKey]       = useState("colombia");
  const pais = PAISES[paisKey];

  // Resetear valores al cambiar país
  const [precioVehiculo, setPrecioVehiculo] = useState(pais.precioDefault);
  const [cuotaInicial, setCuotaInicial]     = useState(pais.cuotaDefault);
  const [tasa, setTasa]                     = useState(pais.tasaDefault);
  const [plazo, setPlazo]                   = useState(pais.plazoDefault);

  useEffect(() => {
    setPrecioVehiculo(PAISES[paisKey].precioDefault);
    setCuotaInicial(PAISES[paisKey].cuotaDefault);
    setTasa(PAISES[paisKey].tasaDefault);
    setPlazo(PAISES[paisKey].plazoDefault);
  }, [paisKey]);

  const [sugerencia, setSugerencia] = useState("");
  const [createSugerencia, { data, loading }] = useMutation(CREATE_SUGERENCIA);
  useEffect(() => {
    if (data) setTimeout(() => router.reload(), 3000);
  }, [data]);

  // ── Cálculos ────────────────────────────────────────────────────────────────

  const impuesto    = pais.impuesto ? precioVehiculo * (pais.impuestoPct / 100) : 0;
  const costoTotal  = precioVehiculo + impuesto;
  const montoFinan  = Math.max(0, costoTotal - cuotaInicial);

  // Tasa mensual efectiva
  const tasaMensual = pais.tasaTipo === "mensual"
    ? tasa / 100
    : (1 + tasa / 100) ** (1 / 12) - 1;

  let cuotaMensual = 0;
  if (tasaMensual === 0) {
    cuotaMensual = montoFinan / plazo;
  } else {
    cuotaMensual =
      (montoFinan * tasaMensual * Math.pow(1 + tasaMensual, plazo)) /
      (Math.pow(1 + tasaMensual, plazo) - 1);
  }

  const totalPagado   = cuotaMensual * plazo;
  const totalInteres  = totalPagado - montoFinan;
  const costoAvales   = pais.aval ? montoFinan * (pais.avalPct / 100) : 0;
  const costoFinal    = cuotaInicial + totalPagado + costoAvales;

  // Tasa anual efectiva para mostrar
  const tasaAnualEfectiva = pais.tasaTipo === "mensual"
    ? ((1 + tasa / 100) ** 12 - 1) * 100
    : tasa;

  // Tabla de amortización
  const schedule = [];
  let saldo = montoFinan;
  for (let m = 1; m <= plazo; m++) {
    const interes  = saldo * tasaMensual;
    const capital  = cuotaMensual - interes;
    saldo = Math.max(0, saldo - capital);
    schedule.push({ mes: m, cuota: cuotaMensual, capital, interes, saldo });
  }

  const cuotaPct       = precioVehiculo > 0 ? (cuotaInicial / precioVehiculo) * 100 : 0;
  const tasaRating     = getTasaRating(tasa, pais.tasaTipo);
  const cuotaRating    = getCuotaRating(cuotaPct);
  const valid          = precioVehiculo > 0 && plazo > 0;
  const sym            = pais.simbolo;

  return (
    <div className="min-h-screen bg-[#f4f4f2] px-8 py-14 max-sm:px-4 max-sm:py-7">
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="mb-9">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">
            Calculadora de crédito vehicular
          </h1>
          <p className="text-[13px] text-gray-400 m-0">
            Calcula tu cuota mensual, intereses totales y costo real de tu vehículo financiado.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-[440px_1fr] max-[880px]:grid-cols-1">

            {/* ── LEFT: Inputs ── */}
            <div className="p-8 border-r border-gray-200 max-[880px]:border-r-0 max-[880px]:border-b max-sm:p-6">

              {/* País + Plazo */}
              <div className="flex gap-3 mb-8">
                <CalcSelect label="País" value={paisKey} onChange={(v) => setPaisKey(v)}>
                  {Object.entries(PAISES).map(([k, p]) => (
                    <option key={k} value={k}>{p.nombre} ({p.moneda})</option>
                  ))}
                </CalcSelect>
                <CalcSelect label="Plazo" value={plazo} onChange={(v) => setPlazo(Number(v))}>
                  {pais.plazoOpciones.map((m) => (
                    <option key={m} value={m}>{m} meses ({(m / 12).toFixed(1)} años)</option>
                  ))}
                </CalcSelect>
              </div>

              {/* Precio del vehículo */}
              <SliderField
                label="Precio del vehículo"
                sublabel="Precio de lista o negociado"
                minLabel={pais.minLabel}
                maxLabel={pais.maxLabel}
                input={
                  <NumberInput
                    value={precioVehiculo}
                    onChange={setPrecioVehiculo}
                    prefix={sym}
                    step={pais.step}
                    min={pais.precioMin}
                    max={pais.precioMax}
                    wide
                  />
                }
              >
                <CustomSlider
                  min={pais.precioMin}
                  max={pais.precioMax}
                  step={pais.step}
                  value={precioVehiculo}
                  onChange={setPrecioVehiculo}
                />
              </SliderField>

              {/* Cuota inicial */}
              <SliderField
                label="Cuota inicial / Enganche"
                sublabel={`${cuotaPct.toFixed(1)}% del precio del vehículo`}
                minLabel={`${sym}0`}
                maxLabel={`${sym}${fmt(pais.cuotaMax)}`}
                input={
                  <NumberInput
                    value={cuotaInicial}
                    onChange={setCuotaInicial}
                    prefix={sym}
                    step={pais.step}
                    min={pais.cuotaMin}
                    max={pais.cuotaMax}
                    wide
                  />
                }
              >
                <CustomSlider
                  min={pais.cuotaMin}
                  max={pais.cuotaMax}
                  step={pais.step}
                  value={cuotaInicial}
                  onChange={setCuotaInicial}
                />
              </SliderField>

              {/* Tasa de interés */}
              <SliderField
                label={`Tasa de interés (${pais.tasaTipo === "mensual" ? "% EM" : "% EA"})`}
                sublabel={
                  pais.tasaTipo === "mensual"
                    ? `Efectivo mensual — ${tasaAnualEfectiva.toFixed(2)}% EA`
                    : `Efectivo anual — ${(tasaMensual * 100).toFixed(3)}% EM`
                }
                minLabel={`${pais.tasaMin}%`}
                maxLabel={`${pais.tasaMax}%`}
                input={
                  <NumberInput
                    value={tasa}
                    onChange={setTasa}
                    suffix="%"
                    step={pais.tasaStep}
                    min={pais.tasaMin}
                    max={pais.tasaMax}
                  />
                }
              >
                <CustomSlider
                  min={pais.tasaMin}
                  max={pais.tasaMax}
                  step={pais.tasaStep}
                  value={tasa}
                  onChange={setTasa}
                />
              </SliderField>

              {/* Tasa rating badge */}
              <div className="inline-flex items-center gap-1.5 -mt-3 mb-2 px-3 py-2 bg-gray-50 rounded-lg">
                <span className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: tasaRating.color }} />
                <span className="text-[12px] text-gray-500">{tasaRating.label}</span>
              </div>
            </div>

            {/* ── RIGHT: Results ── */}
            <div className="p-8 max-sm:p-6">
              {!valid ? (
                <div className="flex items-center justify-center min-h-[200px]">
                  <p className="text-[13px] text-gray-300 text-center">
                    Ingresa los datos del vehículo para ver el desglose del crédito.
                  </p>
                </div>
              ) : (
                <>
                  {/* Hero */}
                  <div className="mb-7">
                    <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-1.5">
                      Cuota mensual estimada
                    </p>
                    <p className="text-[60px] font-semibold font-mono leading-none tracking-[-2px] text-[#407BFF] m-0">
                      {sym}{fmt(Math.round(cuotaMensual))}
                      <span className="text-lg font-normal text-gray-300 ml-2 tracking-normal">/mes</span>
                    </p>
                    <p className="text-sm text-gray-300 mt-1.5 mb-0">
                      {plazo} meses · {tasa}% {pais.tasaTipo} · {sym}{fmt(Math.round(montoFinan))} financiado
                    </p>
                  </div>

                  {/* Cuota inicial badge */}
                  <div className="mb-5 inline-flex items-center gap-1.5 px-3 py-2 bg-gray-50 rounded-lg">
                    <span className="w-[7px] h-[7px] rounded-full shrink-0" style={{ background: cuotaRating.color }} />
                    <span className="text-[12px] text-gray-500">{cuotaRating.label}</span>
                  </div>

                  {/* Desglose del crédito */}
                  <SectionLabel>Desglose del crédito</SectionLabel>
                  <Row label="Precio del vehículo" value={`${sym}${fmt(precioVehiculo)}`} />
                  {pais.impuesto && (
                    <Row
                      label={`${paisKey === "mexico" ? "IVA" : "Impuesto"} (${pais.impuestoPct}%)`}
                      sublabel="Sobre el precio del vehículo"
                      value={`${sym}${fmt(Math.round(impuesto))}`}
                    />
                  )}
                  {pais.impuesto && (
                    <Row label="Costo total con impuesto" value={`${sym}${fmt(Math.round(costoTotal))}`} />
                  )}
                  <Row label="Cuota inicial / Enganche" value={`− ${sym}${fmt(Math.round(cuotaInicial))}`} />
                  <Row label="Monto a financiar" value={`${sym}${fmt(Math.round(montoFinan))}`} large />

                  {/* Resumen del pago */}
                  <SectionLabel mt>Resumen del pago</SectionLabel>
                  <Row label="Cuota mensual" value={`${sym}${fmt(Math.round(cuotaMensual))}`} large accent />
                  <Row
                    label="Total de cuotas"
                    sublabel={`${plazo} × ${sym}${fmt(Math.round(cuotaMensual))}`}
                    value={`${sym}${fmt(Math.round(totalPagado))}`}
                  />
                  <Row label="Total de intereses" value={`${sym}${fmt(Math.round(totalInteres))}`} />
                  {pais.aval && (
                    <Row
                      label={`Aval + seguro vida (${pais.avalPct}%)`}
                      sublabel="Costo estimado sobre el monto financiado"
                      value={`${sym}${fmt(Math.round(costoAvales))}`}
                    />
                  )}
                  <Row
                    label="Costo total del vehículo"
                    sublabel="Cuota inicial + cuotas + seguros"
                    value={`${sym}${fmt(Math.round(costoFinal))}`}
                    large
                  />

                  {/* Tasa anual efectiva */}
                  <SectionLabel mt>Tasas de referencia</SectionLabel>
                  <Row label="Tasa mensual efectiva (EM)" value={`${(tasaMensual * 100).toFixed(3)}%`} />
                  <Row label="Tasa anual efectiva (EA)" value={`${tasaAnualEfectiva.toFixed(2)}%`} />

                  {/* Barra capital vs interés */}
                  {montoFinan > 0 && (
                    <div className="mt-4 mb-5">
                      <div className="flex justify-between text-[11px] text-gray-300 mb-1.5">
                        <span>Capital {sym}{fmt(Math.round(montoFinan))}</span>
                        <span>Intereses {sym}{fmt(Math.round(totalInteres))}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#407BFF] rounded-full"
                          style={{
                            width: `${(montoFinan / totalPagado) * 100}%`,
                            transition: "width 0.4s ease",
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-gray-300 mt-1">
                        <span>{((montoFinan / totalPagado) * 100).toFixed(1)}% capital</span>
                        <span>{((totalInteres / totalPagado) * 100).toFixed(1)}% intereses</span>
                      </div>
                    </div>
                  )}

                  {/* Gráfico amortización */}
                  <GraficoAmortizacion schedule={schedule} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Otras herramientas */}
        <div className="mt-10">
          <p className="text-[11px] font-medium text-gray-500 tracking-[0.5px] uppercase mb-3">
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

        {/* Sugerencia */}
        <div className="mt-5 max-w-[400px]">
          <p className="text-[13px] font-medium text-gray-400 mb-2">¿Tienes alguna sugerencia?</p>
          <textarea
            value={sugerencia}
            onChange={(e) => setSugerencia(e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]/g, ""))}
            placeholder="Escríbela aquí..."
            rows={3}
            className="w-full px-3 py-2.5 text-[13px] text-gray-700 border border-gray-200 rounded-lg resize-none focus:outline-none leading-relaxed bg-white"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (sugerencia.trim().length <= 10) return alert("Cuéntanos más.");
              createSugerencia({
                variables: { sugerencia: sugerencia.trim(), tipo: "calculadora-credito-vehicular" },
              });
            }}
            disabled={loading}
            className="mt-2 px-5 py-2 bg-[#407BFF] text-white text-[13px] font-medium rounded-lg border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
          {data && (
            <p className="text-[12px] text-[#407BFF] mt-2">¡Gracias por tu sugerencia!</p>
          )}
        </div>
      </div>
    </div>
  );
}