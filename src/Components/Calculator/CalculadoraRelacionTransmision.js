import { CREATE_SUGERENCIA } from "@/graphql/mutations";
import { OTHER_CALCULATORS } from "@/pages/calculadora-de-combustible";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

const fmt = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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

// ─── Row ───────────────────────────────────────────────────────────────────
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
        className={`${large ? "text-[22px] font-semibold tracking-tight" : "text-[15px] font-medium"} text-gray-900 text-right`}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Section label ─────────────────────────────────────────────────────────
function SectionLabel({ children, mt = false }) {
  return (
    <p
      className={`text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-0.5 ${mt ? "mt-5" : ""}`}
    >
      {children}
    </p>
  );
}

// ─── Number input ──────────────────────────────────────────────────────────
function NumberInput({
  value,
  onChange,
  suffix,
  wide = false,
  step = 1,
  min = 1,
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
              Math.max(min, parseFloat(e.target.value) || min),
            ),
          )
        }
        className={`${wide ? "w-20" : "w-[64px]"} text-right text-[22px] font-semibold bg-transparent border-none text-gray-900 p-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
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
function getRatioTipo(ratio) {
  if (ratio > 3.5)
    return {
      label: "Relación alta (baja velocidad)",
      desc: "Mayor fuerza de tracción. Ideal para salidas, subidas o carga pesada.",
      color: "#f59e0b",
    };
  if (ratio >= 2.5)
    return {
      label: "Relación media",
      desc: "Balance entre aceleración y velocidad. Uso general en ciudad.",
      color: "#10b981",
    };
  if (ratio >= 1.5)
    return {
      label: "Relación larga (alta velocidad)",
      desc: "Menor consumo y mayor velocidad. Ideal para autopista.",
      color: "#407BFF",
    };
  return {
    label: "Sobremarcha (overdrive)",
    desc: "RPM del motor menores que las del eje. Máxima eficiencia en ruta.",
    color: "#8b5cf6",
  };
}

const MARCHAS_TIPICAS = {
  manual5: {
    label: "Manual 5 velocidades",
    ratios: [3.76, 2.05, 1.35, 1.03, 0.81],
  },
  manual6: {
    label: "Manual 6 velocidades",
    ratios: [3.82, 2.2, 1.52, 1.15, 0.91, 0.74],
  },
  auto6: {
    label: "Automática 6 vel.",
    ratios: [4.17, 2.34, 1.52, 1.14, 0.87, 0.69],
  },
  auto8: {
    label: "Automática 8 vel.",
    ratios: [4.17, 2.34, 1.52, 1.14, 0.87, 0.69, 0.55, 0.45],
  },
};

// ─── Main component ────────────────────────────────────────────────────────
export default function CalculadoraRelacionTransmisionComponent() {
  const router = useRouter();

  const [modo, setModo] = useState("dientes");
  const [dientesMotriz, setDientesMotriz] = useState(13);
  const [dientesConduc, setDientesConduc] = useState(40);
  const [rpm, setRpm] = useState(3000);
  const [diametroRueda, setDiametroRueda] = useState(65);
  const [velocidad, setVelocidad] = useState(120);
  const [relacionFinal, setRelacionFinal] = useState(3.73);
  const [tipoTransmision, setTipoTransmision] = useState("manual6");
  const [sugerencia, setSugerencia] = useState("");

  const [createSugerencia, { data, loading }] = useMutation(CREATE_SUGERENCIA);
  useEffect(() => {
    if (data) setTimeout(() => router.reload(), 3000);
  }, [data]);

  // ── Calculations ──────────────────────────────────────────────────────────
  const relacionCaja =
    modo === "dientes"
      ? dientesConduc / dientesMotriz
      : (rpm * Math.PI * (diametroRueda / 100)) / ((velocidad / 3.6) * 60);

  const relacionTotal = relacionCaja * relacionFinal;
  const velVehiculo =
    (rpm * Math.PI * (diametroRueda / 100)) / (relacionTotal * 60);
  const velVehiculoKmh = velVehiculo * 3.6;
  const multiplicacionTorque = relacionTotal;
  const rpmEje = rpm / relacionTotal;
  const eficienciaPct = 97;

  const valid = relacionCaja > 0 && relacionFinal > 0;
  const tipoCaja = valid ? getRatioTipo(relacionCaja) : null;
  const marchasRef = MARCHAS_TIPICAS[tipoTransmision];

  return (
    <div className="min-h-screen bg-[#f4f4f2] px-8 py-14 max-sm:px-4 max-sm:py-7">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="mb-9">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">
            Calculadora de relación de transmisión
          </h1>
          <p className="text-[13px] text-gray-400 m-0">
            Calcula la relación de engranajes, velocidad del vehículo,
            multiplicación de torque y más.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-[440px_1fr] max-[880px]:grid-cols-1">
            {/* ── LEFT: Form ── */}
            <div className="p-8 border-r border-gray-200 max-[880px]:border-r-0 max-[880px]:border-b max-sm:p-6">
              {/* Mode + transmission type */}
              <div className="flex gap-3 mb-8">
                <CalcSelect
                  label="Calcular desde"
                  value={modo}
                  onChange={setModo}
                >
                  <option value="dientes">N° de dientes</option>
                  <option value="velocidad">Velocidad y RPM</option>
                </CalcSelect>
                <CalcSelect
                  label="Transmisión ref."
                  value={tipoTransmision}
                  onChange={setTipoTransmision}
                >
                  <option value="manual5">Manual 5 vel.</option>
                  <option value="manual6">Manual 6 vel.</option>
                  <option value="auto6">Automática 6 vel.</option>
                  <option value="auto8">Automática 8 vel.</option>
                </CalcSelect>
              </div>

              {/* ── MODE: Teeth ── */}
              {modo === "dientes" && (
                <>
                  <SliderField
                    label="Dientes del piñón (motriz)"
                    sublabel="Engranaje conductor"
                    minLabel="6 d"
                    maxLabel="80 d"
                    input={
                      <NumberInput
                        value={dientesMotriz}
                        onChange={setDientesMotriz}
                        suffix="d"
                        step={1}
                        min={6}
                        max={120}
                      />
                    }
                  >
                    <CustomSlider
                      min={6}
                      max={80}
                      step={1}
                      value={dientesMotriz}
                      onChange={setDientesMotriz}
                    />
                  </SliderField>

                  <SliderField
                    label="Dientes de la corona (conducida)"
                    sublabel="Engranaje conducido"
                    minLabel="6 d"
                    maxLabel="160 d"
                    input={
                      <NumberInput
                        value={dientesConduc}
                        onChange={setDientesConduc}
                        suffix="d"
                        step={1}
                        min={6}
                        max={200}
                      />
                    }
                  >
                    <CustomSlider
                      min={6}
                      max={160}
                      step={1}
                      value={dientesConduc}
                      onChange={setDientesConduc}
                    />
                  </SliderField>
                </>
              )}

              {/* ── MODE: Speed ── */}
              {modo === "velocidad" && (
                <>
                  <SliderField
                    label="Velocidad del vehículo"
                    sublabel="En esa marcha"
                    minLabel="1 km/h"
                    maxLabel="300 km/h"
                    input={
                      <NumberInput
                        value={velocidad}
                        onChange={setVelocidad}
                        suffix="km/h"
                        step={1}
                        min={1}
                        max={350}
                        wide
                      />
                    }
                  >
                    <CustomSlider
                      min={1}
                      max={300}
                      step={1}
                      value={velocidad}
                      onChange={setVelocidad}
                    />
                  </SliderField>
                </>
              )}

              {/* RPM (both modes) */}
              <SliderField
                label="Régimen del motor"
                sublabel="RPM de entrada"
                minLabel="500 rpm"
                maxLabel="8,000 rpm"
                input={
                  <NumberInput
                    value={rpm}
                    onChange={setRpm}
                    suffix="rpm"
                    step={100}
                    min={500}
                    max={10000}
                    wide
                  />
                }
              >
                <CustomSlider
                  min={500}
                  max={8000}
                  step={100}
                  value={rpm}
                  onChange={setRpm}
                />
              </SliderField>

              {/* Wheel diameter (both modes) */}
              <SliderField
                label="Diámetro de la rueda"
                sublabel="Diámetro total del neumático"
                minLabel="40 cm"
                maxLabel="90 cm"
                input={
                  <NumberInput
                    value={diametroRueda}
                    onChange={setDiametroRueda}
                    suffix="cm"
                    step={0.5}
                    min={30}
                    max={100}
                  />
                }
              >
                <CustomSlider
                  min={40}
                  max={90}
                  step={0.5}
                  value={diametroRueda}
                  onChange={setDiametroRueda}
                />
              </SliderField>

              {/* Final drive ratio */}
              <SliderField
                label="Relación del diferencial"
                sublabel="Relación del eje final"
                minLabel="1.00"
                maxLabel="5.50"
                input={
                  <NumberInput
                    value={relacionFinal}
                    onChange={setRelacionFinal}
                    suffix=":1"
                    step={0.01}
                    min={1}
                    max={6}
                  />
                }
              >
                <CustomSlider
                  min={1.0}
                  max={5.5}
                  step={0.01}
                  value={relacionFinal}
                  onChange={setRelacionFinal}
                />
              </SliderField>
            </div>

            {/* ── RIGHT: Results ── */}
            <div className="p-8 max-sm:p-6">
              {!valid ? (
                <div className="flex items-center justify-center min-h-[200px]">
                  <p className="text-[13px] text-gray-300 text-center">
                    Ingresa los datos de la transmisión para ver los resultados.
                  </p>
                </div>
              ) : (
                <>
                  {/* Primary — gear ratio */}
                  <div className="mb-7">
                    <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-1.5">
                      Relación de transmisión
                    </p>
                    <p className="text-[60px] font-semibold leading-none tracking-[-2px] text-[#407BFF] m-0">
                      {relacionCaja.toFixed(3)}
                      <span className="text-lg font-normal text-gray-300 ml-2 tracking-normal">
                        : 1
                      </span>
                    </p>
                    <p className="text-sm text-gray-300 mt-1.5 mb-0">
                      Relación total con diferencial:{" "}
                      <strong className="text-gray-500">
                        {relacionTotal.toFixed(3)} : 1
                      </strong>
                    </p>
                  </div>

                  {/* Ratio type badge */}
                  {tipoCaja && (
                    <div
                      className="mb-5 px-3.5 py-3 bg-gray-50 rounded-xl"
                      style={{ borderLeft: `3px solid ${tipoCaja.color}` }}
                    >
                      <p
                        className="text-[13px] font-semibold m-0 mb-0.5"
                        style={{ color: tipoCaja.color }}
                      >
                        {tipoCaja.label}
                      </p>
                      <p className="text-[12px] text-gray-400 m-0">
                        {tipoCaja.desc}
                      </p>
                    </div>
                  )}

                  {/* Ratios */}
                  <SectionLabel>Relaciones de transmisión</SectionLabel>
                  <Row
                    label="Relación de caja"
                    value={`${relacionCaja.toFixed(4)} : 1`}
                    large
                  />
                  <Row
                    label="Relación del diferencial"
                    value={`${relacionFinal.toFixed(2)} : 1`}
                  />
                  <Row
                    label="Relación total"
                    value={`${relacionTotal.toFixed(4)} : 1`}
                  />
                  <Row
                    label="Relación inversa (paso)"
                    value={`${(1 / relacionCaja).toFixed(4)}`}
                  />

                  {/* Speed & RPM */}
                  <SectionLabel mt>Velocidad y RPM</SectionLabel>
                  <Row
                    label="Velocidad del vehículo"
                    sublabel={`A ${fmt(rpm)} rpm del motor`}
                    value={`${velVehiculoKmh.toFixed(1)} km/h`}
                    large
                  />
                  <Row
                    label="RPM en el eje de salida"
                    value={`${fmt(Math.round(rpm / relacionCaja))} rpm`}
                  />
                  <Row
                    label="RPM en las ruedas (con dif.)"
                    value={`${fmt(Math.round(rpmEje))} rpm`}
                  />
                  <Row
                    label="Velocidad en m/s"
                    value={`${velVehiculo.toFixed(2)} m/s`}
                  />

                  {/* Torque */}
                  <SectionLabel mt>Multiplicación de torque</SectionLabel>
                  <Row
                    label="Factor de multiplicación"
                    sublabel="Relación total caja + diferencial"
                    value={`× ${multiplicacionTorque.toFixed(2)}`}
                    large
                  />
                  <Row
                    label="Solo caja de cambios"
                    value={`× ${relacionCaja.toFixed(3)}`}
                  />
                  <Row
                    label="Eficiencia mecánica est."
                    value={`${eficienciaPct}%`}
                  />
                  <Row
                    label="Torque efectivo (si motor = 100 Nm)"
                    value={`${((100 * multiplicacionTorque * eficienciaPct) / 100).toFixed(0)} Nm`}
                  />

                  {/* Reference gear table */}
                  <SectionLabel mt>
                    Referencia — {marchasRef.label}
                  </SectionLabel>
                  <div className="flex flex-col gap-0.5">
                    {marchasRef.ratios.map((r, i) => {
                      const velRef =
                        ((rpm * Math.PI * (diametroRueda / 100)) /
                          (r * relacionFinal * 60)) *
                        3.6;
                      const isActive = Math.abs(r - relacionCaja) < 0.15;
                      return (
                        <div
                          key={i}
                          className={`flex justify-between items-center px-2.5 py-2 rounded-lg ${isActive ? "bg-[#eef2ff] border border-[#c7d7ff]" : "border border-transparent"}`}
                        >
                          <span
                            className={`text-[13px] ${isActive ? "text-[#407BFF] font-semibold" : "text-gray-300 font-normal"}`}
                          >
                            {i + 1}ª marcha
                          </span>
                          <span
                            className={`text-[13px] ${isActive ? "text-[#407BFF] font-semibold" : "text-gray-300"}`}
                          >
                            {r.toFixed(2)} : 1
                          </span>
                          <span
                            className={`text-[13px] ${isActive ? "text-[#407BFF] font-semibold" : "text-gray-300"}`}
                          >
                            {velRef.toFixed(0)} km/h
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
        <div className="mt-10">
          <p className="text-[11px] font-medium text-gray-500 tracking-[0.5px] uppercase mb-3">
            Otras herramientas
          </p>
        <div className=" grid grid-cols-4 gap-3 max-[860px]:grid-cols-2 max-sm:grid-cols-1">
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
                  className={`mt-0.5 flex-shrink-0 transition-colors ${
                    isActive
                      ? "text-[#407BFF]"
                      : "text-gray-300 group-hover:text-[#407BFF]"
                  }`}
                >
                  {icon}
                </span>

                <div>
                  <span
                    className={`block text-[13px] font-medium leading-snug ${
                      isActive ? "text-[#407BFF]" : "text-gray-700"
                    }`}
                  >
                    {label}
                  </span>

                  <span
                    className={`block text-[11px] mt-0.5 leading-snug ${
                      isActive ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {desc}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
        </div>
        {/* Suggestion */}
        <div className="mt-5 max-w-[400px]">
          <p className="text-[13px] font-medium text-gray-400 mb-2">
            ¿Tienes alguna sugerencia?
          </p>
          <textarea
            value={sugerencia}
            onChange={(e) =>
              setSugerencia(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ""))
            }
            placeholder="Escríbela aquí..."
            rows={3}
            className="w-full px-3 py-2.5 text-[13px] text-gray-700 border border-gray-200 rounded-lg resize-none focus:outline-none leading-relaxed bg-white"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (sugerencia.trim().length <= 10)
                return alert("Cuentanos más.");
              createSugerencia({
                variables: {
                  sugerencia: sugerencia.trim(),
                  tipo: "calculadora-transmision",
                },
              });
            }}
            disabled={loading}
            className="mt-2 px-5 py-2 bg-[#407BFF] text-white text-[13px] font-medium rounded-lg border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
          {data && (
            <p className="text-[12px] text-[#407BFF] mt-2">
              ¡Gracias por tu sugerencia!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
