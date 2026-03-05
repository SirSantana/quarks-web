import Layout from "@/src/Components/Layout";
import picoyplaca from "@/pages/picoyplaca.json";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const BuscadorBasico = dynamic(
  () => import("@/src/Components/LandingPage/BuscadorBasico"),
  { ssr: false },
);

let horariosCiudades = {
  medellin: {
    dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    horarios: ["05:00", "20:00"],
  },
  bogota: {
    dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
    horarios: ["06:00", "21:00"],
  },
  bucaramanga: {
    dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    horarios: ["06:00", "20:00"],
  },
};

let ciudades = {
  bogota: "Bogotá",
  medellin: "Medellín",
  bucaramanga: "Bucaramanga",
};
const meses = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
const diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

// ── Time helpers ──────────────────────────────────────────────────────────────

function parseHHMM(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + (m || 0);
}

function nowMinutes() {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
}

function fmtMins(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h > 0 && m > 0) return `${h}h ${m}min`;
  if (h > 0) return `${h}h`;
  return `${m}min`;
}

function getRestrictionStatus(horariosCiudad, placas, horario, especial) {
  const now = new Date();
  const nowMins = nowMinutes();
  const dayName = diasSemana[now.getDay()];
  const isDiaHabil = horariosCiudad?.dias.includes(dayName);
  const noAplica = placas === "NO APLICA";

  if (!isDiaHabil || noAplica) {
    return {
      active: false,
      finished: false,
      upcoming: false,
      noRestriccion: true,
      minutesLeft: 0,
      minutesUntil: 0,
      horaInicio: null,
      horaFin: null,
    };
  }

  const horasCiudad = horariosCiudad?.horarios ?? [];
  const start = parseHHMM(horasCiudad[0]);
  const end = parseHHMM(horasCiudad[1]);

  const active = nowMins >= start && nowMins < end;
  const upcoming = !active && nowMins < start;
  const finished = !active && nowMins >= end;

  return {
    active,
    upcoming,
    finished,
    noRestriccion: false,
    minutesLeft: active ? end - nowMins : 0,
    minutesUntil: upcoming ? start - nowMins : 0,
    horaInicio: horasCiudad[0],
    horaFin: horasCiudad[1],
  };
}

// ── Shared UI ─────────────────────────────────────────────────────────────────

function SectionLabel({ children, mt = false }) {
  return (
    <p
      className={`text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-0.5 ${mt ? "mt-5" : ""}`}
    >
      {children}
    </p>
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

function PlacaChip({ digit }) {
  return (
    <div
      className="flex items-center justify-center w-14 h-14 rounded-xl border border-[#407BFF]/20"
      style={{ background: "rgba(64,123,255,0.06)" }}
    >
      <span className="text-[26px] font-semibold font-mono text-[#407BFF] leading-none">
        {digit}
      </span>
    </div>
  );
}

// ── Live Status Badge ─────────────────────────────────────────────────────────
// Replaces the old static "Restricción activa · 02 de Marzo" badge.
// Shows real-time countdown / status inline, refreshes every 30s.

function LiveStatusBadge({
  horariosCiudad,
  placas,
  horario,
  especial,
  fechaLegible,
}) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const update = () =>
      setStatus(
        getRestrictionStatus(horariosCiudad, placas, horario, especial),
      );
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  // While hydrating on server, render a neutral placeholder
  if (!status) {
    const noAplica = placas === "NO APLICA";
    return (
      <span
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium"
        style={{
          background: noAplica ? "#d1fae5" : "#fee2e2",
          color: noAplica ? "#065f46" : "#991b1b",
        }}
      >
        <span
          className="w-[7px] h-[7px] rounded-full shrink-0"
          style={{ background: noAplica ? "#10b981" : "#ef4444" }}
        />
        {noAplica ? "Sin restricción hoy" : "Restricción activa"}
        {fechaLegible && (
          <span className="opacity-60 ml-1 font-mono">{fechaLegible}</span>
        )}
      </span>
    );
  }

  let bg, textColor, dotColor, label, sublabel, pulse;

  if (status.noRestriccion) {
    bg = "#d1fae5";
    textColor = "#065f46";
    dotColor = "#10b981";
    pulse = false;
    label = "Sin restricción hoy";
    sublabel = null;
  } else if (status.active) {
    bg = "#fee2e2";
    textColor = "#991b1b";
    dotColor = "#ef4444";
    pulse = true;
    label = "Restricción activa ahora";
    sublabel = `Termina en ${fmtMins(status.minutesLeft)} · hasta las ${status.horaFin}`;
  } else if (status.upcoming) {
    bg = "#fef3c7";
    textColor = "#92400e";
    dotColor = "#f59e0b";
    pulse = false;
    label = "Restricción próxima";
    sublabel = `Comienza en ${fmtMins(status.minutesUntil)} · a las ${status.horaInicio}`;
  } else {
    bg = "#d1fae5";
    textColor = "#065f46";
    dotColor = "#10b981";
    pulse = false;
    label = "Restricción finalizada";
    sublabel = `El pico y placa de hoy ya terminó (${status.horaFin})`;
  }

  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium"
      style={{ background: bg, color: textColor }}
    >
      {/* dot with optional pulse */}
      <span className="relative flex-shrink-0 w-3 h-3 flex items-center justify-center">
        <span
          className="block w-[7px] h-[7px] rounded-full"
          style={{ background: dotColor }}
        />
        {pulse && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-50"
            style={{ background: dotColor }}
          />
        )}
      </span>

      <span className="flex flex-col leading-tight">
        <span>
          {label}
          {fechaLegible && (
            <span className="opacity-50 font-mono ml-2 text-[10px]">
              {fechaLegible}
            </span>
          )}
        </span>
        {sublabel && (
          <span
            className="text-[10px] font-normal mt-0.5"
            style={{ opacity: 0.8 }}
          >
            {sublabel}
          </span>
        )}
      </span>
    </span>
  );
}

// ── Digit checker ─────────────────────────────────────────────────────────────

function DigitChecker({ placas, horario, especial, horariosCiudad }) {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setStatus(getRestrictionStatus(horariosCiudad, placas, horario, especial));
  }, []);

  const lastDigit = input.replace(/\D/g, "").slice(-1);

  function isRestricted(digit) {
    if (!digit) return null;
    if (placas === "NO APLICA") return false;
    if (Array.isArray(placas))
      return placas.some((p) => p.toString().includes(digit));
    return placas.toString().includes(digit);
  }

  const restricted = isRestricted(lastDigit);

  let resultBg, resultBorder, resultTitle, resultSub;

  if (restricted === null) {
    // no input yet — nothing shown
  } else if (!restricted || status?.noRestriccion) {
    resultBg = "#d1fae5";
    resultBorder = "#10b981";
    resultTitle =
      "Tu placa NO tiene restricción hoy. Puedes circular libremente.";
    resultSub = null;
  } else if (status?.active) {
    resultBg = "#fee2e2";
    resultBorder = "#ef4444";
    resultTitle = "⚠ Tu placa está restringida AHORA";
    resultSub = `No puedes circular hasta las ${status.horaFin}`;
  } else if (status?.upcoming) {
    resultBg = "#fef3c7";
    resultBorder = "#f59e0b";
    resultTitle = "Tu placa tiene restricción hoy, pero aún no inicia";
    resultSub = `Comienza en ${fmtMins(status.minutesUntil)} (${status.horaInicio})`;
  } else {
    resultBg = "#d1fae5";
    resultBorder = "#10b981";
    resultTitle = "La restricción de tu placa ya terminó por hoy";
    resultSub = "Puedes circular con normalidad.";
  }

  return (
    <div className="mb-7">
      <div className="mb-3.5">
        <span className="text-[13px] font-medium text-gray-500 block">
          ¿Tengo pico y placa hoy?
        </span>
        <span className="text-[11px] text-gray-300">
          Ingresa tu número de placa
        </span>
      </div>
      <div className="relative">
        <input
          type="text"
          maxLength={8}
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
          placeholder="Ej: ABC123"
          className="w-full py-3 pl-4 pr-28 text-[15px] font-mono border border-gray-200 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:border-[#407BFF] transition-colors"
        />
        {lastDigit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-300">
            último dígito:{" "}
            <span className="font-mono font-semibold text-gray-600">
              {lastDigit}
            </span>
          </span>
        )}
      </div>

      {lastDigit && restricted !== null && (
        <div
          className="mt-3 px-3.5 py-3 rounded-xl"
          style={{
            background: resultBg,
            borderLeft: `3px solid ${resultBorder}`,
          }}
        >
          <p
            className="text-[13px] font-semibold m-0 mb-0.5"
            style={{ color: resultBorder }}
          >
            {resultTitle}
          </p>
          {resultSub && (
            <p className="text-[12px] text-gray-500 m-0">{resultSub}</p>
          )}
        </div>
      )}
    </div>
  );
}

// ── Canvas image generator ────────────────────────────────────────────────────

// ── Main page ─────────────────────────────────────────────────────────────────

export default function PicoYPlacaHoy({ data, allMonthData }) {
  const router = useRouter();
  const ciudad = router.query.ciudad;
  const nombreCiudad = ciudades[ciudad] ?? ciudad;
  const horariosCiudad = horariosCiudades[ciudad];
  const numeroMes = meses.indexOf(router.query.mes?.split("-")[0]);

  const placas = data?.placas;
  const horario = data?.horario;
  const especial = data?.especial;
  const noAplica = placas === "NO APLICA";
  const fechaLegible = data?.fechaFormat?.replaceAll("-", " ");

  const digitArray = noAplica
    ? []
    : especial
      ? [
          ...new Set([
            ...placas[0].toString().split(""),
            ...placas[1].toString().split(""),
          ]),
        ]
      : placas
          ?.toString()
          .split("")
          .filter((c) => /\d/.test(c));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["WebPage", "NewsArticle"],
    headline: `Pico y Placa ${nombreCiudad} Hoy ${data?.titulo?.replaceAll("-", " ")}: Placas con Restricción y Horarios`,
    name: `Pico y Placa ${nombreCiudad} ${data?.titulo?.replaceAll("-", " ")}`,
    description: `Consulta el Pico y Placa en ${nombreCiudad} hoy ${data?.titulo?.replaceAll("-", " ")}. Horarios, restricciones en tiempo real y verificador de placa.`,
    url: `https://quarks.com.co/pico-y-placa-hoy/${ciudad?.toLowerCase()}/${router.query.mes?.toLowerCase()}/${data?.fechaFormat?.toLowerCase()}`,
    datePublished: `${new Date(data?.fecha).toISOString()}`,
    dateModified: `${new Date().toISOString()}`,
    author: { "@type": "Organization", name: "Quarks Automotriz" },
    publisher: { "@type": "Organization", name: "Quarks Automotriz" },
  };

  return (
    <Layout
      picoyplacaStructured={structuredData}
      title={`Pico y Placa ${nombreCiudad} Hoy ${data?.titulo?.replaceAll("-", " ")}`}
      url={`${router.asPath}`}
      icon={"/pico-y-placa.png"}
      image={"./pico-y-placa.png"}
      description={`Pico y Placa ${nombreCiudad} hoy, ${data?.titulo?.replaceAll("-", " ")}. Restricciones en tiempo real y verificador de placa.`}
      fecha={new Date(data?.fecha).toISOString()}
      lastModified={new Date(data?.fecha).toGMTString()}
    >
      <div className="min-h-screen bg-[#f4f4f2] px-8 py-14 max-sm:px-4 max-sm:py-7">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-9">
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">
              Pico y Placa  {data?.titulo?.replaceAll("-", " ")} en {nombreCiudad}
            </h1>
            <p className="text-[13px] text-gray-400 m-0">
              Información actualizada con validación en tiempo real para{" "}
              {nombreCiudad}.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-[440px_1fr] max-[880px]:grid-cols-1">
              {/* LEFT */}
              <div className="p-8 border-r border-gray-200 max-[880px]:border-r-0 max-[880px]:border-b max-sm:p-6">
                <div className="flex gap-2 mb-8 flex-wrap">
                  {Object.entries(ciudades).map(([key, nombre]) => (
                    <button
                      key={key}
                      onClick={() =>
                        router.push(
                          `/pico-y-placa-hoy/${key}/${router.query.mes}/${router.query.dia}`,
                        )
                      }
                      className={`px-4 py-1.5 rounded-lg text-[12px] font-medium border transition-all cursor-pointer ${
                        ciudad === key
                          ? "bg-[#407BFF] text-white border-[#407BFF]"
                          : "bg-gray-50 text-gray-500 border-gray-200 hover:border-[#407BFF]/40"
                      }`}
                    >
                      {nombre}
                    </button>
                  ))}
                </div>

                <DigitChecker
                  placas={placas}
                  horario={horario}
                  especial={especial}
                  horariosCiudad={horariosCiudad}
                />

                <div>
                  <SectionLabel>Calendario del mes</SectionLabel>
                  <button
                    onClick={() =>
                      router.push(
                        `/pico-y-placa-hoy/${ciudad}/${router.query.mes}`,
                      )
                    }
                    className="mt-2 w-full py-2.5 text-[13px] font-medium text-[#407BFF] border border-[#407BFF]/30 rounded-xl bg-[#407BFF]/5 hover:bg-[#407BFF]/10 transition-colors cursor-pointer"
                  >
                    Ver calendario de {router.query.mes?.replaceAll("-", " ")} →
                  </button>
                </div>
              </div>

              {/* RIGHT */}
              <div className="p-8 max-sm:p-6">
                <div className="mb-7">
                  <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-1.5">
                    Dígitos con restricción
                  </p>

                  {noAplica ? (
                    <p className="text-[52px] font-semibold font-mono leading-none tracking-[-2px] text-[#10b981] m-0">
                      Libre
                      <span className="text-lg font-normal text-gray-300 ml-3 tracking-normal">
                        sin restricción
                      </span>
                    </p>
                  ) : especial ? (
                    <div className="space-y-3">
                      {[0, 1].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                          <p className="text-[40px] font-semibold font-mono leading-none tracking-[-1px] text-[#407BFF] m-0 min-w-[80px]">
                            {placas[i]}
                          </p>
                          <span className="text-[12px] text-gray-300 font-mono">
                            {horario[i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[60px] font-semibold font-mono leading-none tracking-[-2px] text-[#407BFF] m-0">
                      {placas}
                    </p>
                  )}

                  {/* ── LIVE BADGE — replaces old static StatusBadge ── */}
                  <div className="mt-2">
                    <LiveStatusBadge
                      horariosCiudad={horariosCiudad}
                      placas={placas}
                      horario={horario}
                      especial={especial}
                      fechaLegible={fechaLegible}
                    />
                  </div>
                </div>

                {digitArray?.length > 0 && (
                  <div
                    className="mb-5 px-3.5 py-3 bg-gray-50 rounded-xl"
                    style={{ borderLeft: "3px solid #407BFF" }}
                  >
                    <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-2">
                      Últimos dígitos restringidos
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {digitArray.map((d, i) => (
                        <PlacaChip key={i} digit={d} />
                      ))}
                    </div>
                  </div>
                )}

                <SectionLabel>Detalles de la restricción</SectionLabel>
                <Row label="Ciudad" value={nombreCiudad} large />
                <Row
                  label="Dígitos restringidos"
                  value={
                    noAplica
                      ? "Ninguno"
                      : Array.isArray(placas)
                        ? placas.join(" / ")
                        : placas
                  }
                />
                <Row
                  label="Horario de restricción"
                  sublabel="Vehículos particulares"
                  value={
                    noAplica
                      ? "No aplica"
                      : Array.isArray(horario)
                        ? horario.join(" / ")
                        : horario
                  }
                />
                <Row
                  label="Días de restricción"
                  value={horariosCiudad?.dias.join(", ")}
                />
                <Row
                  label="Ventana horaria oficial"
                  sublabel="Apertura → Cierre"
                  value={
                    horariosCiudad
                      ? `${horariosCiudad.horarios[0]} – ${horariosCiudad.horarios[1]}`
                      : "—"
                  }
                />

                <SectionLabel mt>Sanciones e información legal</SectionLabel>
                <Row label="Infracción (CNTT)" value="C14" />
                <Row label="Consecuencia" value="Multa + inmovilización" />
                <Row
                  label="Excepciones"
                  value="Híbridos · Eléctricos · Pico Solidario"
                />

                <SectionLabel mt>Próxima consulta</SectionLabel>
                <Row
                  label="Mes vigente"
                  value={meses[numeroMes] ?? router.query.mes}
                />
              </div>
            </div>
          </div>

          {/* Info cards */}
          <div className="mt-8 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-3">
                ¿Cómo funciona?
              </p>
              <p className="text-[13px] text-gray-500 leading-relaxed m-0">
                El Pico y Placa restringe la circulación según el{" "}
                <span className="font-semibold text-gray-700">
                  último dígito
                </span>{" "}
                de la placa. Hoy los dígitos restringidos son{" "}
                <span className="font-mono font-semibold text-[#407BFF]">
                  {noAplica
                    ? "ninguno"
                    : Array.isArray(placas)
                      ? placas.join(" / ")
                      : placas}
                </span>{" "}
                {!noAplica &&
                  `de ${Array.isArray(horario) ? horario.join(" / ") : horario}`}
                .
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-3">
                Excepciones
              </p>
              <ul className="text-[13px] text-gray-500 leading-relaxed m-0 space-y-1 list-none p-0">
                {[
                  "Vehículos híbridos y eléctricos",
                  "Pico y Placa Solidario (Bogotá)",
                  "Motocicletas (verificar decreto)",
                  "Vehículos de emergencia",
                  "Permisos especiales vigentes",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-[5px] h-[5px] rounded-full bg-[#407BFF] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-3">
                Multas y sanciones
              </p>
              <p className="text-[13px] text-gray-500 leading-relaxed m-0">
                Circular en horario de restricción con placa inhabilitada es la
                infracción{" "}
                <span className="font-mono font-semibold text-gray-700">
                  C14
                </span>{" "}
                del CNTT. Sanción: multa económica e inmovilización del
                vehículo.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-3">
                Consejo del día
              </p>
              <p className="text-[13px] text-gray-500 leading-relaxed m-0">
                Planifica con el{" "}
                <button
                  onClick={() =>
                    router.push(
                      `/pico-y-placa-hoy/${ciudad}/${router.query.mes}`,
                    )
                  }
                  className="text-[#407BFF] font-medium cursor-pointer bg-transparent border-none p-0"
                >
                  calendario mensual
                </button>
                . El horario en {nombreCiudad} es de{" "}
                <span className="font-mono font-semibold text-gray-700">
                  {horariosCiudad?.horarios[0]} a {horariosCiudad?.horarios[1]}
                </span>
                .
              </p>
            </div>
          </div>

          {/* Banner */}
          <div className="mt-6 rounded-2xl overflow-hidden border border-gray-200">
            <Image
              loading="lazy"
              src={"/pico y placa banner.jpg"}
              alt={`Pico y placa ${nombreCiudad} ${data?.titulo?.replaceAll("-", " ")}`}
              width={1100}
              height={400}
              className="w-full h-auto"
            />
          </div>

          {/* SEO */}
          <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-8 max-sm:p-6 space-y-6">
            <div>
              <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-3">
                Pico y Placa {nombreCiudad} — Información detallada
              </p>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                Para el día{" "}
                <span className="font-semibold text-gray-700">
                  {data?.titulo?.replaceAll("-", " ")}
                </span>
                , la restricción en {nombreCiudad} aplica de{" "}
                <span className="font-mono font-semibold text-gray-700">
                  {horariosCiudad?.horarios[0]} a {horariosCiudad?.horarios[1]}
                </span>{" "}
                de lunes a viernes. Vehículos con placa terminada en{" "}
                <span className="font-mono font-semibold text-[#407BFF]">
                  {noAplica
                    ? "ningún dígito hoy"
                    : Array.isArray(placas)
                      ? placas.join(" o ")
                      : placas}
                </span>{" "}
                {noAplica
                  ? "pueden circular sin restricción."
                  : "no podrán circular en ese horario."}
              </p>
            </div>
            <div className="border-t border-gray-100 pt-6">
              <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-3">
                Mañana en {nombreCiudad}
              </p>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                Consulta el{" "}
                <button
                  onClick={() =>
                    router.push(
                      `/pico-y-placa-hoy/${ciudad}/${router.query.mes}`,
                    )
                  }
                  className="text-[#407BFF] font-medium cursor-pointer bg-transparent border-none p-0 text-[13px]"
                >
                  calendario completo de {meses[numeroMes]}
                </button>{" "}
                para ver la rotación de placas y horarios de todo el mes.
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto mt-12">
          <article className="mt-12 mb-10">
            <header className="mb-5">
              <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-3">
                Pico y Placa {nombreCiudad} Hoy {fechaLegible}: qué carros
                tienen restricción
              </h2>

              <p className="text-[14px] text-gray-500 leading-relaxed">
                Si estás buscando{" "}
                <strong>pico y placa hoy en {nombreCiudad}</strong>, aquí puedes
                consultar en tiempo real qué vehículos tienen restricción este{" "}
                {fechaLegible}. El sistema de{" "}
                <strong>pico y placa {nombreCiudad}</strong> limita la
                circulación de vehículos particulares según el último número de
                la placa, con el objetivo de reducir el tráfico y mejorar la
                movilidad en la ciudad.
              </p>

              <p className="text-[14px] text-gray-500 leading-relaxed mt-3">
                En esta página puedes verificar{" "}
                <strong>qué placas tienen pico y placa hoy</strong>, los{" "}
                <strong>horarios de restricción</strong> y comprobar rápidamente
                si{" "}
                <strong>
                  tu carro tiene pico y placa hoy en {nombreCiudad}
                </strong>{" "}
                ingresando el número de tu placa en el verificador.
              </p>
            </header>

            <section className="mb-6">
              <h3 className="text-[17px] font-semibold text-gray-800 mb-3">
                Qué carros tienen pico y placa hoy en {nombreCiudad}
              </h3>

              <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                El <strong>pico y placa hoy en {nombreCiudad}</strong> aplica
                únicamente a vehículos particulares cuyos últimos números de
                placa coincidan con los dígitos restringidos del día. Las
                autoridades de movilidad publican diariamente qué números no
                pueden circular durante la jornada.
              </p>

              <div className="space-y-3">
                {[
                  `Consultar el pico y placa hoy en ${nombreCiudad}`,
                  `Ver qué placas tienen restricción hoy`,
                  `Revisar si tu vehículo tiene pico y placa hoy`,
                  `Conocer el horario del pico y placa del día`,
                  `Evitar multas por circular en horario restringido`,
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#407BFF] mt-[8px]" />
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-6">
              <h3 className="text-[17px] font-semibold text-gray-800 mb-3">
                Horario del pico y placa hoy en {nombreCiudad}
              </h3>

              <p className="text-[14px] text-gray-500 leading-relaxed">
                El horario del{" "}
                <strong>pico y placa hoy en {nombreCiudad}</strong> para
                vehículos particulares comienza a las{" "}
                <strong>{horariosCiudad?.horarios[0]}</strong> y finaliza a las{" "}
                <strong>{horariosCiudad?.horarios[1]}</strong>. Durante este
                período, los vehículos con los números restringidos no pueden
                circular dentro de la ciudad.
              </p>

              <p className="text-[14px] text-gray-500 leading-relaxed mt-3">
                Si necesitas confirmar si puedes manejar hoy, utiliza el{" "}
                <strong>verificador de placa</strong> de esta página. Solo debes
                ingresar tu placa y el sistema te indicará inmediatamente si{" "}
                <strong>tienes pico y placa hoy en {nombreCiudad}</strong>.
              </p>
            </section>

            <section className="mb-6">
              <div className="bg-[#f0f5ff] border-l-4 border-[#407BFF] rounded-lg p-4">
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  💡 <strong>Tip:</strong> Muchos conductores buscan{" "}
                  <strong>"pico y placa hoy {nombreCiudad}"</strong> o
                  <strong>"qué placas tienen pico y placa hoy"</strong> justo
                  antes de salir de casa. Guardar esta página en favoritos te
                  permitirá consultar la restricción del día rápidamente y
                  evitar sanciones de tránsito.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-[17px] font-semibold text-gray-800 mb-4">
                Preguntas frecuentes sobre el pico y placa hoy en {nombreCiudad}
              </h3>

              <div className="space-y-4">
                <div className="border-b border-gray-100 py-4">
                  <h4 className="text-[14px] font-semibold text-[#407BFF] mb-2">
                    ¿Cómo saber si mi carro tiene pico y placa hoy en{" "}
                    {nombreCiudad}?
                  </h4>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    Debes revisar el último número de tu placa y compararlo con
                    los dígitos restringidos del día. También puedes usar el
                    verificador de placa de esta página para saber
                    inmediatamente si tu vehículo tiene{" "}
                    <strong>pico y placa hoy</strong>.
                  </p>
                </div>

                <div className="border-b border-gray-100 py-4">
                  <h4 className="text-[14px] font-semibold text-[#407BFF] mb-2">
                    ¿A qué hora empieza el pico y placa hoy en {nombreCiudad}?
                  </h4>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    El <strong>pico y placa hoy en {nombreCiudad}</strong>{" "}
                    inicia a las {horariosCiudad?.horarios[0]} y finaliza a las{" "}
                    {horariosCiudad?.horarios[1]}. Durante ese horario los
                    vehículos con los números restringidos no pueden circular en
                    la ciudad.
                  </p>
                </div>

                <div className="border-b border-gray-100 py-4">
                  <h4 className="text-[14px] font-semibold text-[#407BFF] mb-2">
                    ¿Qué pasa si circulo con pico y placa hoy?
                  </h4>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    Circular con <strong>pico y placa hoy</strong> puede generar
                    una multa de tránsito y la inmovilización del vehículo según
                    el Código Nacional de Tránsito. Por eso es importante
                    verificar diariamente qué placas tienen restricción antes de
                    salir.
                  </p>
                </div>
              </div>
            </section>
            
          </article>
          {/* Reglas y Horarios */}
<div className="max-w-[1100px] mx-auto mt-12">
  <article className="mt-12 mb-10">

    <header className="mb-5">
      <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-3">
        Reglas y Horarios del Pico y Placa en {ciudades[router.query.ciudad]}
      </h2>
      <p className="text-[14px] text-gray-500 leading-relaxed">
        La medida de <strong>Pico y Placa</strong> en {ciudades[router.query.ciudad]} busca mejorar
        la movilidad urbana y reducir la congestión vehicular en horas de mayor tráfico. Conocer
        las reglas te permitirá evitar multas y planificar mejor tus desplazamientos.
      </p>
    </header>

    {/* Horario */}
    <section className="mb-6">
      <h3 className="text-[17px] font-semibold text-gray-800 mb-3">
        ¿Cuál es el horario del Pico y Placa hoy en {ciudades[router.query.ciudad]}?
      </h3>
      <p className="text-[14px] text-gray-500 leading-relaxed">
        Para el día <strong>{data?.titulo?.replaceAll('-', ' ')}</strong>, la restricción aplica
        desde <strong>{horariosCiudades[router.query.ciudad]?.horarios[0]}</strong> hasta{" "}
        <strong>{horariosCiudades[router.query.ciudad]?.horarios[1]}</strong>. Los vehículos con
        placas terminadas en <strong>{data?.placas}</strong> deberán respetar esta restricción.
      </p>
    </section>

    {/* Multas */}
    <section className="mb-6">
      <h3 className="text-[17px] font-semibold text-gray-800 mb-3">
        Multas por incumplir el Pico y Placa
      </h3>
      <p className="text-[14px] text-gray-500 leading-relaxed">
        Circular durante el horario de restricción puede generar sanciones económicas según el
        Código Nacional de Tránsito (infracción <strong>C14</strong>). Además de la multa, en
        algunos casos el vehículo puede ser inmovilizado.
      </p>
    </section>

    {/* Excepciones */}
    <section className="mb-6">
      <h3 className="text-[17px] font-semibold text-gray-800 mb-3">
        Excepciones al Pico y Placa
      </h3>
      <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
        Algunos vehículos pueden circular sin restricción. Entre ellos:
      </p>
      <div className="space-y-3">
        {[
          'Vehículos eléctricos e híbridos',
          'Vehículos con permisos especiales vigentes',
          `Vehículos con Pico y Placa Solidario en ciudades donde esté habilitado`,
          'Vehículos de emergencia y servicios esenciales',
        ].map((text, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-[#407BFF] mt-[8px]" />
            <p className="text-[14px] text-gray-500 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Tip */}
    <section className="mb-6">
      <div className="bg-[#f0f5ff] border-l-4 border-[#407BFF] rounded-lg p-4">
        <p className="text-[14px] text-gray-700 leading-relaxed">
          💡 <strong>Tip:</strong> La rotación de placas cambia diariamente. Consulta el calendario
          del mes de <strong>{meses[numeroMes]}</strong> para saber qué vehículos tendrán
          restricción mañana en <strong>{ciudades[router.query.ciudad]}</strong> y así evitar
          inconvenientes.
        </p>
      </div>
    </section>

    {/* Hora Pico */}
    <section className="mb-6">
      <h3 className="text-[17px] font-semibold text-gray-800 mb-3">
        Hora del Pico y Placa en {ciudades[router.query.ciudad]}
      </h3>
      <p className="text-[14px] text-gray-500 leading-relaxed">
        {data?.placas === 'NO APLICA' ? (
          'Hoy no aplica Pico y Placa.'
        ) : (
          <>
            Vehículos con restricción deberán respetar el horario{' '}
            <strong>{data?.horario}</strong>.
          </>
        )}
      </p>
    </section>

    {/* Pico y Placa Hoy */}
    <section className="mb-6">
      <h3 className="text-[17px] font-semibold text-gray-800 mb-3">
        Pico y Placa {ciudades[router.query.ciudad]} hoy
      </h3>
      <p className="text-[14px] text-gray-500 leading-relaxed">
        {data?.placas === 'NO APLICA' ? (
          'Hoy no aplica restricción vehicular.'
        ) : (
          <>
            Los vehículos con placas terminadas en <strong>{data?.placas}</strong> tienen
            restricción en el horario <strong>{data?.horario}</strong>.
          </>
        )}
      </p>
    </section>

    {/* FAQ */}
    <section>
      <h3 className="text-[17px] font-semibold text-gray-800 mb-4">
        Preguntas frecuentes sobre el Pico y Placa en {ciudades[router.query.ciudad]}
      </h3>

      <div className="space-y-4">
        <div className="border-b border-gray-100 py-4">
          <h4 className="text-[14px] font-semibold text-[#407BFF] mb-2">
            ¿Qué placas tienen Pico y Placa hoy en {ciudades[router.query.ciudad]}?
          </h4>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            {data?.placas === 'NO APLICA'
              ? 'Hoy no aplica restricción vehicular.'
              : <>Los vehículos con placas terminadas en <strong>{data?.placas}</strong> tienen restricción en el horario <strong>{data?.horario}</strong>.</>
            }
          </p>
        </div>

        <div className="border-b border-gray-100 py-4">
          <h4 className="text-[14px] font-semibold text-[#407BFF] mb-2">
            ¿Qué pasa si circulo en horario de Pico y Placa?
          </h4>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            Circular con <strong>Pico y Placa</strong> activo puede generar una multa de tránsito
            y la inmovilización del vehículo según el Código Nacional de Tránsito (infracción C14).
          </p>
        </div>

        <div className="border-b border-gray-100 py-4">
          <h4 className="text-[14px] font-semibold text-[#407BFF] mb-2">
            ¿Cuándo aplica el Pico y Placa en {ciudades[router.query.ciudad]}?
          </h4>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            El <strong>Pico y Placa en {ciudades[router.query.ciudad]}</strong> aplica de{' '}
            <strong>{horariosCiudades[router.query.ciudad]?.horarios[0]}</strong> a{' '}
            <strong>{horariosCiudades[router.query.ciudad]?.horarios[1]}</strong> en días hábiles,
            según la rotación diaria de placas establecida por las autoridades de movilidad.
          </p>
        </div>
      </div>
    </section>

  </article>
</div>
        </div>
      </div>
    </Layout>
  );
}

// ── Data fetching ─────────────────────────────────────────────────────────────

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const yearQuery = params.mes.split("-")[1];
  const monthQuery = params.mes.split("-")[0];
  const mesIndex = meses.indexOf(monthQuery);

  if (!picoyplaca?.picoyplaca[yearQuery]?.[mesIndex]) return { notFound: true };

  let picoYplacaHoy;
  let allMonthData = [];

  if (params.ciudad.toLowerCase() === "bogota") {
    const monthArr = picoyplaca.picoyplaca[yearQuery][mesIndex].filter(
      (el) => !el.ciudad,
    );
    picoYplacaHoy = monthArr.find(
      (el) => el.fechaFormat.toLowerCase() === String(params.dia).toLowerCase(),
    );
    allMonthData = monthArr;
  } else {
    const filteredByCity = picoyplaca.picoyplaca[yearQuery][mesIndex]?.filter(
      (el) =>
        el.ciudad && el.ciudad.toLowerCase() === params.ciudad.toLowerCase(),
    );
    picoYplacaHoy = filteredByCity?.find(
      (el) => el.fechaFormat.toLowerCase() === String(params.dia).toLowerCase(),
    );
    allMonthData = filteredByCity ?? [];
  }

  if (!picoYplacaHoy) {
    return {
      redirect: {
        destination: `/pico-y-placa-hoy/${params.ciudad}/${params.mes}`,
        permanent: false,
      },
    };
  }

  return { props: { data: picoYplacaHoy, allMonthData }, revalidate: 1000000 };
}
