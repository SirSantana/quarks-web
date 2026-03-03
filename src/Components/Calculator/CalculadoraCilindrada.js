import { CREATE_SUGERENCIA } from "@/graphql/mutations";
import { OTHER_CALCULATORS } from "@/pages/calculadora-de-combustible";
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
        className={`${large ? "text-[22px] font-semibold font-mono tracking-tight" : "text-[15px] font-medium font-mono"} text-gray-900 text-right`}
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
  step = 0.1,
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
        className={`${wide ? "w-20" : "w-[70px]"} text-right text-[22px] font-semibold bg-transparent border-none text-gray-900 p-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
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
          <span className="text-[13px] font-medium  text-gray-500 block">
            {label}
          </span>
          {sublabel && (
            <span className="text-[11px] text-gray-300">{sublabel}</span>
          )}
        </div>
        {input}
      </div>
      {children}
      <div className="flex justify-between mt-1.5 text-[11px] text-gray-300 ">
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

function getMotorTipo(carrera, diametro) {
  if (!carrera || !diametro) return null;
  const ratio = carrera / diametro;
  if (Math.abs(ratio - 1) < 0.02)
    return {
      label: "Motor cuadrado",
      desc: "Carrera = Diámetro. Balance entre potencia y torque.",
      color: "#407BFF",
    };
  if (ratio < 1)
    return {
      label: "Motor supercuadrado",
      desc: "Carrera < Diámetro. Mayor potencia a altas RPM.",
      color: "#10b981",
    };
  return {
    label: "Motor alargado",
    desc: "Carrera > Diámetro. Mayor torque a bajas RPM.",
    color: "#f59e0b",
  };
}

function getRCRating(rc, tipoMotor) {
  if (!rc) return null;
  if (tipoMotor === "diesel") {
    if (rc >= 16 && rc <= 24)
      return { label: "Rango normal diésel", color: "#10b981" };
    if (rc < 16)
      return { label: "Por debajo del rango diésel", color: "#f59e0b" };
    return { label: "Por encima del rango diésel", color: "#ef4444" };
  }
  if (rc >= 8 && rc <= 13)
    return { label: "Rango normal gasolina", color: "#10b981" };
  if (rc < 8) return { label: "Compresión baja", color: "#f59e0b" };
  return { label: "Compresión alta (alto rendimiento)", color: "#407BFF" };
}

export default function CalculadoraCilindradaComponent() {
  const router = useRouter();

  const [diametro, setDiametro] = useState(84);
  const [carrera, setCarrera] = useState(90);
  const [numCilindros, setNumCilindros] = useState(4);
  const [volCamara, setVolCamara] = useState(38);
  const [tipoMotor, setTipoMotor] = useState("gasolina");
  const [rpm, setRpm] = useState(6000);
  const [sugerencia, setSugerencia] = useState("");

  const [createSugerencia, { data, loading }] = useMutation(CREATE_SUGERENCIA);
  useEffect(() => {
    if (data) setTimeout(() => router.reload(), 3000);
  }, [data]);

  const cilUnitaria = ((Math.PI / 4) * Math.pow(diametro, 2) * carrera) / 1000;
  const cilTotal = cilUnitaria * numCilindros;
  const cilTotalLitros = cilTotal / 1000;
  const rc = volCamara > 0 ? 1 + cilUnitaria / volCamara : 0;
  const volPMI = cilUnitaria + volCamara;
  const velPiston = (2 * carrera * rpm) / 60000;
  const tipoGeometria = getMotorTipo(carrera, diametro);
  const rcRating = getRCRating(rc, tipoMotor);
  const potRefMin = tipoMotor === "diesel" ? 40 : 50;
  const potRefMax = tipoMotor === "diesel" ? 80 : 100;
  const potEstMin = cilTotalLitros * potRefMin;
  const potEstMax = cilTotalLitros * potRefMax;
  const valid = diametro > 0 && carrera > 0 && numCilindros > 0;

  return (
    <div className="min-h-screen bg-[#f4f4f2] px-8 py-14 max-sm:px-4 max-sm:py-7">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="mb-9">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">
            Calculadora de cilindrada
          </h1>
          <p className="text-[13px] text-gray-400 m-0">
            Ingresa las medidas del motor para calcular la cilindrada, relación
            de compresión y otros parámetros clave.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-[440px_1fr] max-[880px]:grid-cols-1 ">
            {/* ── LEFT: Form ── */}
            <div className="p-8 border-r border-gray-200 max-[880px]:border-r-0 max-[880px]:border-b max-sm:p-6 ">
              <div className="flex gap-3 mb-8">
                <CalcSelect
                  label="Tipo de motor"
                  value={tipoMotor}
                  onChange={setTipoMotor}
                >
                  <option value="gasolina">Gasolina</option>
                  <option value="diesel">Diésel</option>
                </CalcSelect>
                <CalcSelect
                  label="N° de cilindros"
                  value={numCilindros}
                  onChange={(v) => setNumCilindros(Number(v))}
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((n) => (
                    <option key={n} value={n}>
                      {n} cilindro{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </CalcSelect>
              </div>

              <SliderField
                label="Diámetro del cilindro"
                sublabel="Calibre (bore)"
                minLabel="40 mm"
                maxLabel="150 mm"
                input={
                  <NumberInput
                    value={diametro}
                    onChange={setDiametro}
                    suffix="mm"
                    step={0.1}
                    min={0}
                    max={200}
                  />
                }
              >
                <CustomSlider
                  min={40}
                  max={150}
                  step={0.5}
                  value={diametro}
                  onChange={setDiametro}
                />
              </SliderField>

              <SliderField
                label="Carrera del pistón"
                sublabel="PMS → PMI (stroke)"
                minLabel="40 mm"
                maxLabel="150 mm"
                input={
                  <NumberInput
                    value={carrera}
                    onChange={setCarrera}
                    suffix="mm"
                    step={0.1}
                    min={0}
                    max={200}
                  />
                }
              >
                <CustomSlider
                  min={40}
                  max={150}
                  step={0.5}
                  value={carrera}
                  onChange={setCarrera}
                />
              </SliderField>

              <SliderField
                label="Cámara de combustión"
                sublabel="Volumen en PMS (cc)"
                minLabel="1 cc"
                maxLabel="120 cc"
                input={
                  <NumberInput
                    value={volCamara}
                    onChange={setVolCamara}
                    suffix="cc"
                    step={0.5}
                    min={1}
                    max={200}
                  />
                }
              >
                <CustomSlider
                  min={1}
                  max={120}
                  step={0.5}
                  value={volCamara}
                  onChange={setVolCamara}
                />
              </SliderField>

              <SliderField
                label="Régimen del motor"
                sublabel="Para calcular velocidad del pistón"
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
                    Ingresa las medidas del motor para ver los resultados.
                  </p>
                </div>
              ) : (
                <>
                  {/* Primary */}
                  <div className="mb-7">
                    <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-1.5">
                      Cilindrada total
                    </p>
                    <p className="text-[60px] font-semibold font-mono leading-none tracking-[-2px] text-[#407BFF] m-0">
                      {fmt(Math.round(cilTotal))}
                      <span className="text-lg font-normal  text-gray-300 ml-2 tracking-normal">
                        cc
                      </span>
                    </p>
                    <p className="text-sm text-gray-300 mt-1.5 mb-0">
                      {cilTotalLitros.toFixed(3)} litros · {numCilindros}{" "}
                      cilindro{numCilindros > 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* Geometry badge */}
                  {tipoGeometria && (
                    <div
                      className="mb-5 px-3.5 py-3 bg-gray-50 rounded-xl"
                      style={{ borderLeft: `3px solid ${tipoGeometria.color}` }}
                    >
                      <p
                        className="text-[13px] font-semibold m-0 mb-0.5"
                        style={{ color: tipoGeometria.color }}
                      >
                        {tipoGeometria.label}
                      </p>
                      <p className="text-[12px] text-gray-400 m-0">
                        {tipoGeometria.desc}
                      </p>
                    </div>
                  )}

                  <SectionLabel>Cilindrada</SectionLabel>
                  <Row
                    label="Cilindrada unitaria"
                    sublabel="Por cilindro"
                    value={`${cilUnitaria.toFixed(2)} cc`}
                    large
                  />
                  <Row
                    label="Cilindrada total"
                    value={`${cilTotal.toFixed(2)} cc`}
                  />
                  <Row
                    label="En litros"
                    value={`${cilTotalLitros.toFixed(4)} L`}
                  />
                  <Row
                    label="En pulgadas³"
                    value={`${(cilTotal / 16.387).toFixed(2)} in³`}
                  />

                  <SectionLabel mt>Relación de compresión</SectionLabel>
                  <Row
                    label="Relación de compresión (RC)"
                    value={`${rc.toFixed(2)} : 1`}
                    large
                  />
                  <Row
                    label="Volumen en PMI"
                    sublabel="Pistón abajo"
                    value={`${volPMI.toFixed(2)} cc`}
                  />
                  <Row
                    label="Volumen en PMS"
                    sublabel="Cámara de combustión"
                    value={`${volCamara.toFixed(2)} cc`}
                  />

                  {rcRating && (
                    <div className="inline-flex items-center gap-1.5 mt-2 mb-4 px-3 py-2 bg-gray-50 rounded-lg">
                      <span
                        className="w-[7px] h-[7px] rounded-full shrink-0"
                        style={{ background: rcRating.color }}
                      />
                      <span className="text-[12px] text-gray-500">
                        {rcRating.label}
                      </span>
                    </div>
                  )}

                  <SectionLabel>Dinámica del pistón</SectionLabel>
                  <Row
                    label="Velocidad media del pistón"
                    sublabel={`A ${fmt(rpm)} rpm`}
                    value={`${velPiston.toFixed(2)} m/s`}
                    large
                  />
                  <Row
                    label="Carrera / Diámetro"
                    value={`${(carrera / diametro).toFixed(3)}`}
                  />
                  <Row
                    label="Área del pistón"
                    value={`${((Math.PI / 4) * Math.pow(diametro, 2)).toFixed(2)} mm²`}
                  />

                  <SectionLabel mt>
                    Potencia estimada (referencial)
                  </SectionLabel>
                  <Row
                    label={`Motor ${tipoMotor} atmosférico`}
                    sublabel="Estimación orientativa"
                    value={`${Math.round(potEstMin)}–${Math.round(potEstMax)} cv`}
                    large
                  />
                  <Row
                    label="Potencia específica (referencia)"
                    value={`${potRefMin}–${potRefMax} cv/L`}
                  />
                </>
              )}
            </div>
          </div>
        </div>
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
                  tipo: "calculadora-cilindrada",
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
