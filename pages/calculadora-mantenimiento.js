import { CREATE_SUGERENCIA } from "@/graphql/mutations";
import { OTHER_CALCULATORS } from "@/pages/calculadora-de-combustible";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// ── Datos de mantenimiento ──────────────────────────────────────────────────

const ITEMS_MANTENIMIENTO = [
  {
    id: "aceite",
    categoria: "Motor",
    label: "Aceite y filtro de aceite",
    desc: "Verifica el nivel semanalmente. Cambia según el intervalo del fabricante.",
    intervalo: "Cada 5.000–10.000 km / 6 meses",
    prioridad: "alta",
  },
  {
    id: "filtro_aire",
    categoria: "Motor",
    label: "Filtro de aire",
    desc: "Inspecciona anualmente. Reemplaza si está sucio o tapado.",
    intervalo: "Cada 15.000–30.000 km",
    prioridad: "media",
  },
  {
    id: "bujias",
    categoria: "Motor",
    label: "Bujías",
    desc: "Las bujías desgastadas reducen el rendimiento y el consumo de combustible.",
    intervalo: "Cada 30.000–100.000 km",
    prioridad: "media",
  },
  {
    id: "refrigerante",
    categoria: "Motor",
    label: "Refrigerante / Anticongelante",
    desc: "Verifica nivel y estado. Realiza cambio según sea necesario.",
    intervalo: "Cada 40.000 km / 2 años",
    prioridad: "media",
  },
  {
    id: "correa_distribucion",
    categoria: "Motor",
    label: "Correa / Cadena de distribución",
    desc: "Crítico — su rotura puede causar daños graves al motor.",
    intervalo: "Cada 60.000–120.000 km",
    prioridad: "alta",
  },
  {
    id: "correa_accesorios",
    categoria: "Motor",
    label: "Correa de accesorios (poly-V)",
    desc: "Mueve alternador, bomba de agua y compresor del A/C.",
    intervalo: "Cada 60.000–80.000 km",
    prioridad: "media",
  },
  {
    id: "pastillas_freno",
    categoria: "Frenos",
    label: "Pastillas y discos de freno",
    desc: "Inspecciona el espesor y desgaste. Reemplaza si están al mínimo.",
    intervalo: "Cada 30.000–60.000 km",
    prioridad: "alta",
  },
  {
    id: "liquido_frenos",
    categoria: "Frenos",
    label: "Líquido de frenos",
    desc: "La absorción de humedad reduce la eficacia del frenado.",
    intervalo: "Cada 2 años o 40.000 km",
    prioridad: "alta",
  },
  {
    id: "rotacion_neumaticos",
    categoria: "Neumáticos y ruedas",
    label: "Rotación y balanceo de neumáticos",
    desc: "Distribuye el desgaste uniformemente y mejora la conducción.",
    intervalo: "Cada 10.000–15.000 km",
    prioridad: "media",
  },
  {
    id: "presion_neumaticos",
    categoria: "Neumáticos y ruedas",
    label: "Presión de neumáticos",
    desc: "Revisa mensualmente. La presión incorrecta afecta seguridad y consumo.",
    intervalo: "Mensualmente / antes de viajes largos",
    prioridad: "alta",
  },
  {
    id: "alineacion",
    categoria: "Neumáticos y ruedas",
    label: "Alineación de ruedas",
    desc: "Evita el desgaste irregular y la desviación en la conducción.",
    intervalo: "Cada 20.000 km o al año",
    prioridad: "baja",
  },
  {
    id: "transmision",
    categoria: "Transmisión",
    label: "Aceite de transmisión / caja de cambios",
    desc: "El fluido degradado causa resbalones y sobrecalentamiento.",
    intervalo: "Cada 40.000–80.000 km",
    prioridad: "media",
  },
  {
    id: "embrague",
    categoria: "Transmisión",
    label: "Kit de embrague (manual)",
    desc: "Inspecciona el juego del pedal y el desgaste del disco.",
    intervalo: "Cada 80.000–150.000 km",
    prioridad: "media",
  },
  {
    id: "bateria",
    categoria: "Eléctrico",
    label: "Batería y bornes",
    desc: "Prueba la carga y revisa la corrosión en los terminales.",
    intervalo: "Cada 3–5 años",
    prioridad: "alta",
  },
  {
    id: "alternador",
    categoria: "Eléctrico",
    label: "Alternador y sistema de carga",
    desc: "Verifica la tensión de salida y el estado de la correa.",
    intervalo: "Inspección cada 80.000 km",
    prioridad: "baja",
  },
  {
    id: "filtro_habitaculo",
    categoria: "Confort y seguridad",
    label: "Filtro de habitáculo / polen",
    desc: "Afecta el caudal de aire del climatizador y la calidad del aire.",
    intervalo: "Cada 15.000–25.000 km / al año",
    prioridad: "baja",
  },
  {
    id: "escobillas",
    categoria: "Confort y seguridad",
    label: "Escobillas limpiaparabrisas",
    desc: "Reemplaza cuando aparezcan rayas o ruido al limpiar.",
    intervalo: "Cada 6–12 meses",
    prioridad: "baja",
  },
  {
    id: "luces",
    categoria: "Confort y seguridad",
    label: "Luces y faros",
    desc: "Verifica luces delanteras, traseras, intermitentes y de freno.",
    intervalo: "Revisión mensual",
    prioridad: "alta",
  },
  {
    id: "direccion",
    categoria: "Dirección y suspensión",
    label: "Líquido de dirección asistida",
    desc: "Revisa el nivel y el estado regularmente.",
    intervalo: "Cada 60.000 km o según necesidad",
    prioridad: "baja",
  },
  {
    id: "amortiguadores",
    categoria: "Dirección y suspensión",
    label: "Amortiguadores y muelles",
    desc: "Los amortiguadores gastados aumentan la distancia de frenado.",
    intervalo: "Cada 60.000–80.000 km",
    prioridad: "media",
  },
  {
    id: "rotulas",
    categoria: "Dirección y suspensión",
    label: "Rótulas y brazos de suspensión",
    desc: "Ruido o vibración al girar puede indicar desgaste.",
    intervalo: "Inspección cada 40.000 km",
    prioridad: "media",
  },
  {
    id: "filtro_combustible",
    categoria: "Sistema de combustible",
    label: "Filtro de combustible",
    desc: "Un filtro tapado reduce el rendimiento y el consumo.",
    intervalo: "Cada 30.000–60.000 km",
    prioridad: "media",
  },
  {
    id: "escape",
    categoria: "Escape",
    label: "Sistema de escape",
    desc: "Inspecciona óxido, fugas o ruidos anormales.",
    intervalo: "Anualmente",
    prioridad: "baja",
  },
];

const CATEGORIAS = [...new Set(ITEMS_MANTENIMIENTO.map((i) => i.categoria))];

const PRIORIDAD_COLOR = {
  alta: "#ef4444",
  media: "#f59e0b",
  baja: "#10b981",
};

const PRIORIDAD_BG = {
  alta: "#fef2f2",
  media: "#fffbeb",
  baja: "#f0fdf4",
};

// ── Sub-componentes ─────────────────────────────────────────────────────────

function SectionLabel({ children, mt = false }) {
  return (
    <p
      className={`text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-2 ${mt ? "mt-6" : ""}`}
    >
      {children}
    </p>
  );
}

function CalcSelect({ label, value, onChange, children, disabled = false }) {
  return (
    <div className="flex-1">
      <label className="block text-[11px] font-medium text-gray-300 tracking-[0.4px] uppercase mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full py-2 pl-3 pr-7 text-[13px] font-medium border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-pointer focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {children}
      </select>
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder }) {
  return (
    <div className="flex-1">
      <label className="block text-[11px] font-medium text-gray-300 tracking-[0.4px] uppercase mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full py-2 px-3 text-[13px] font-medium border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none placeholder:text-gray-300"
      />
    </div>
  );
}

function CheckItem({ item, checked, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-150 select-none
        ${checked
          ? "bg-gray-50 border-gray-100 opacity-50"
          : "bg-white border-gray-200 hover:border-[#407BFF]/40 hover:shadow-[0_2px_8px_rgba(64,123,255,0.07)]"
        }`}
    >
      <div
        className={`mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all duration-150
          ${checked ? "bg-[#407BFF] border-[#407BFF]" : "border-gray-300 bg-white"}`}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-[13px] font-medium ${checked ? "line-through text-gray-400" : "text-gray-800"}`}
          >
            {item.label}
          </span>
          <span
            className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
            style={{
              color: PRIORIDAD_COLOR[item.prioridad],
              background: PRIORIDAD_BG[item.prioridad],
            }}
          >
            {item.prioridad}
          </span>
        </div>
        <p className="text-[11px] text-gray-400 mt-0.5 mb-0 leading-snug">
          {item.desc}
        </p>
        <p className="text-[11px] text-[#407BFF] mt-1 mb-0 font-medium">
          {item.intervalo}
        </p>
      </div>
    </div>
  );
}

function ProgressRing({ pct }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width="72" height="72" className="-rotate-90">
      <circle cx="36" cy="36" r={r} strokeWidth="5" stroke="#e5e7eb" fill="none" />
      <circle
        cx="36"
        cy="36"
        r={r}
        strokeWidth="5"
        stroke="#407BFF"
        fill="none"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.4s ease" }}
      />
    </svg>
  );
}

// ── Datos del formulario ────────────────────────────────────────────────────

const ANIOS = Array.from({ length: 35 }, (_, i) => 2025 - i);

const MARCAS = [
  "Alfa Romeo", "Audi", "BMW", "Chevrolet", "Chrysler", "Citroën",
  "Dacia", "Fiat", "Ford", "Honda", "Hyundai", "Jeep", "Kia",
  "Land Rover", "Mazda", "Mercedes-Benz", "Mitsubishi", "Nissan",
  "Opel", "Peugeot", "Renault", "SEAT", "Skoda", "Subaru",
  "Suzuki", "Toyota", "Volkswagen", "Volvo",
];

// ── Componente principal ────────────────────────────────────────────────────

export default function RegistroMantenimientoComponent() {
  const router = useRouter();

  const [anio, setAnio] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [kilometraje, setKilometraje] = useState("");
  const [generado, setGenerado] = useState(false);
  const [checked, setChecked] = useState({});
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [sugerencia, setSugerencia] = useState("");

  const [createSugerencia, { data, loading }] = useMutation(CREATE_SUGERENCIA);
  useEffect(() => {
    if (data) setTimeout(() => router.reload(), 3000);
  }, [data]);

  const puedeGenerar = anio && marca && modelo.trim().length > 0;

  const handleGenerar = () => {
    if (!puedeGenerar) return;
    setChecked({});
    setGenerado(true);
    setCategoriaActiva("Todas");
  };

  const toggle = (id) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const reiniciar = () => setChecked({});

  const totalItems = ITEMS_MANTENIMIENTO.length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((checkedCount / totalItems) * 100);

  const filtrados =
    categoriaActiva === "Todas"
      ? ITEMS_MANTENIMIENTO
      : ITEMS_MANTENIMIENTO.filter((i) => i.categoria === categoriaActiva);

  const altaPrioridad = ITEMS_MANTENIMIENTO.filter(
    (i) => i.prioridad === "alta" && !checked[i.id]
  );

  return (
    <div className="min-h-screen bg-[#f4f4f2] px-8 py-14 max-sm:px-4 max-sm:py-7">
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="mb-9">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight mb-1">
            Registro de mantenimiento del vehículo
          </h1>
          <p className="text-[13px] text-gray-400 m-0">
            Ingresa los datos de tu vehículo y obtén una lista de revisión
            personalizada — aceite, frenos, bujías y mucho más.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-[340px_1fr] max-[880px]:grid-cols-1">

            {/* ── IZQUIERDA: Formulario ── */}
            <div className="p-8 border-r border-gray-200 max-[880px]:border-r-0 max-[880px]:border-b max-sm:p-6">
              <SectionLabel>Tu vehículo</SectionLabel>

              <div className="flex gap-3 mb-4">
                <CalcSelect label="Año" value={anio} onChange={setAnio}>
                  <option value="">Seleccionar</option>
                  {ANIOS.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </CalcSelect>
                <CalcSelect label="Marca" value={marca} onChange={setMarca}>
                  <option value="">Seleccionar</option>
                  {MARCAS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </CalcSelect>
              </div>

              <div className="mb-4">
                <TextInput
                  label="Modelo"
                  value={modelo}
                  onChange={setModelo}
                  placeholder="ej. Corolla, Gol, Clio, 308"
                />
              </div>

              <div className="mb-8">
                <TextInput
                  label="Kilometraje actual (opcional)"
                  value={kilometraje}
                  onChange={setKilometraje}
                  placeholder="ej. 85.000"
                />
              </div>

              <button
                onClick={handleGenerar}
                disabled={!puedeGenerar}
                className="w-full py-2.5 bg-[#407BFF] text-white text-[13px] font-medium rounded-lg border-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                Generar lista de revisión
              </button>

              {/* Progreso */}
              {generado && (
                <div className="mt-8">
                  <SectionLabel>Progreso</SectionLabel>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="relative flex-shrink-0">
                      <ProgressRing pct={pct} />
                      <span className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-gray-800">
                        {pct}%
                      </span>
                    </div>
                    <div>
                      <p className="text-[22px] font-semibold font-mono text-gray-900 leading-none m-0">
                        {checkedCount}
                        <span className="text-[15px] font-normal text-gray-300 ml-1">
                          / {totalItems}
                        </span>
                      </p>
                      <p className="text-[12px] text-gray-400 mt-1 mb-0">
                        ítems revisados
                      </p>
                    </div>
                    {checkedCount > 0 && (
                      <button
                        onClick={reiniciar}
                        className="ml-auto text-[11px] text-gray-300 hover:text-gray-500 transition-colors border-none bg-transparent cursor-pointer p-0 underline"
                      >
                        Reiniciar
                      </button>
                    )}
                  </div>

                  {/* Alta prioridad pendiente */}
                  {altaPrioridad.length > 0 && (
                    <div className="mt-4 p-3.5 bg-red-50 border border-red-100 rounded-xl">
                      <p className="text-[11px] font-semibold text-red-500 uppercase tracking-[0.4px] mb-1.5">
                        ⚠ Prioridad alta pendiente
                      </p>
                      {altaPrioridad.map((i) => (
                        <p key={i.id} className="text-[12px] text-red-400 m-0 leading-snug">
                          · {i.label}
                        </p>
                      ))}
                    </div>
                  )}

                  {checkedCount === totalItems && (
                    <div className="mt-4 p-3.5 bg-green-50 border border-green-100 rounded-xl">
                      <p className="text-[12px] font-semibold text-green-600 m-0">
                        ✓ ¡Todos los ítems revisados — excelente trabajo!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── DERECHA: Checklist ── */}
            <div className="p-8 max-sm:p-6">
              {!generado ? (
                <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                    </svg>
                  </div>
                  <p className="text-[13px] text-gray-300 m-0">
                    Ingresa los datos de tu vehículo y presiona<br />
                    <span className="font-medium text-gray-400">Generar lista de revisión</span> para comenzar.
                  </p>
                </div>
              ) : (
                <>
                  {/* Título del vehículo */}
                  <div className="mb-6 pb-5 border-b border-gray-100">
                    <p className="text-[11px] font-medium text-gray-300 tracking-[0.5px] uppercase mb-1">
                      Lista de revisión para
                    </p>
                    <p className="text-[22px] font-semibold text-gray-900 m-0 tracking-tight">
                      {anio} {marca} {modelo}
                    </p>
                    {kilometraje && (
                      <p className="text-[13px] text-gray-400 mt-0.5 mb-0">
                        Kilometraje actual: {kilometraje} km
                      </p>
                    )}
                  </div>

                  {/* Filtro por categoría */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {["Todas", ...CATEGORIAS].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategoriaActiva(cat)}
                        className={`px-3 py-1 text-[11px] font-medium rounded-full border transition-all duration-150 cursor-pointer
                          ${categoriaActiva === cat
                            ? "bg-[#407BFF] border-[#407BFF] text-white"
                            : "bg-white border-gray-200 text-gray-500 hover:border-[#407BFF]/40"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Ítems */}
                  <div className="flex flex-col gap-2">
                    {categoriaActiva === "Todas"
                      ? CATEGORIAS.map((cat) => {
                          const items = ITEMS_MANTENIMIENTO.filter(
                            (i) => i.categoria === cat
                          );
                          return (
                            <div key={cat}>
                              <SectionLabel mt>{cat}</SectionLabel>
                              <div className="flex flex-col gap-2">
                                {items.map((item) => (
                                  <CheckItem
                                    key={item.id}
                                    item={item}
                                    checked={!!checked[item.id]}
                                    onToggle={() => toggle(item.id)}
                                  />
                                ))}
                              </div>
                            </div>
                          );
                        })
                      : filtrados.map((item) => (
                          <CheckItem
                            key={item.id}
                            item={item}
                            checked={!!checked[item.id]}
                            onToggle={() => toggle(item.id)}
                          />
                        ))}
                  </div>
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

        {/* Sugerencia */}
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
                  tipo: "registro-mantenimiento-vehiculo",
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