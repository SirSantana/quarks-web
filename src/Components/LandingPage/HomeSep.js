import SectionFixedServicios from "./SectionFixedServicios";
import talleres from "@/src/data/talleres.json";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import CardTaller from "./CardTaller";
import {
  MapPin,
  Wrench,
  Car,
  ChevronDown,
  Map,
  List,
  CalendarCheck,
  Tag,
  Bus,
  Clock,
  X,
} from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";

const MapTalleresHome = dynamic(
  () => import("@/src/Components/LandingPage/MapTalleresHome"),
  {
    ssr: false,
    loading: () => <div className="flex-1 h-full bg-gray-200 animate-pulse" />,
  },
);

// Extraer todos los servicios únicos del JSON
const allTalleres = talleres.talleres.slice(20, 70).reverse();

const allServicios = [
  ...new Set(allTalleres.flatMap((t) => t.categorias || [])),
].sort();

const SERVICIOS_SLUGS = [
  { slug: "cambio-de-aceite", label: "Cambio de Aceite" },
  { slug: "baterias", label: "Baterías" },
  { slug: "aire-acondicionado", label: "Aire Acondicionado" },
  { slug: "frenos", label: "Frenos" },
  { slug: "motor", label: "Motor" },
  { slug: "clutch", label: "Clutch" },
  { slug: "alineación-y-balanceo", label: "Alineación y Balanceo" },
  { slug: "cajas", label: "Cajas de Dirección" },
  { slug: "suspensión", label: "Suspensión" },
  { slug: "latoneria-y-pintura", label: "Carrocería y Pintura" },
  { slug: "inyeccion", label: "Inyección" },
  { slug: "electronica", label: "Electrónica" },
  { slug: "sincronizacion", label: "Sincronización" },
  { slug: "eléctricos", label: "Eléctricos" },
  { slug: "lujos", label: "Lujos y Accesorios" },
  { slug: "cda", label: "CDA" },
];

export default function HomeSep() {
  const [mapa, setMapa] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);
  const { query } = useRouter();

  // Filtrar talleres según servicio seleccionado
  const talleresFiltrados = useMemo(() => {
    const base = allTalleres;
    if (!servicioSeleccionado) return base;
    return base.filter((t) =>
      t.categorias?.some(
        (c) => c.toLowerCase() === servicioSeleccionado.toLowerCase(),
      ),
    );
  }, [servicioSeleccionado]);

  const listaTalleres = talleresFiltrados.slice(0, 12);

  return (
    <>
      <SectionFixedServicios home={true} />

      <section
        className="w-screen max-w-full bg-white"
        style={{
          height: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="flex flex-1 overflow-hidden">
          {/* ════════ PANEL IZQUIERDO ════════ */}
          <div
            className={`
      ${mapa ? "hidden" : "flex"} lg:flex
      flex-col w-full lg:w-[580px] xl:w-[620px] flex-shrink-0
      border-r border-gray-200 bg-white overflow-hidden
    `}
          >
            {/* Filtros superiores */}
            <div className="px-5 pt-5 pb-4 border-b border-gray-200 bg-white">
              <div className="flex gap-2 mb-3">
                {/* Ubicación */}
                <div className="flex-1 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 bg-white">
                  <MapPin size={15} className="text-[#007BFF] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] text-gray-400 block leading-none mb-0.5">
                      Ubicación
                    </span>
                    <span className="text-sm font-semibold text-gray-700 block truncate">
                      Bogotá, Colombia
                    </span>
                  </div>
                </div>

                {/* Select de Servicio */}
                <div className="flex-1 relative">
                  <button
                    onClick={() => setSelectOpen(!selectOpen)}
                    className="w-full flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 bg-white hover:border-blue-400 transition-colors text-left"
                  >
                    <Wrench size={15} className="text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] text-gray-400 block leading-none mb-0.5">
                        Servicio
                      </span>
                      <span className="text-sm font-semibold text-gray-800 block truncate">
  {SERVICIOS_SLUGS.find(s => s.slug === query.servicio?.replace(/ /g, '-'))?.label || 'Selecciona un servicio'}
</span>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`text-gray-400 flex-shrink-0 transition-transform ${selectOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {selectOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto">
                      {/* Opción "Todos" — vuelve al servicio base del query sin filtro adicional */}
                      <Link
                        href={`/explore/talleres/carro/${query.servicio?.replace(/ /g, "-")}/${query.ciudad}`}
                        onClick={() => setSelectOpen(false)}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors flex items-center justify-between
          ${!servicioSeleccionado ? "font-bold text-[#007BFF] bg-blue-50/50" : "text-gray-700"}`}
                      >
                      </Link>

                      <div className="h-px bg-gray-100 mx-3" />

                      {/* Lista de servicios con Link directo */}
                      {SERVICIOS_SLUGS.map((servicio) => {
                        const isActive =
                          query.servicio?.replace(/ /g, "-") === servicio.slug;
                        return (
                          <Link
                            key={servicio.slug}
                            href={`/explore/talleres/carro/${servicio.slug}/${query.ciudad || "bogota"}`}
                            onClick={() => setSelectOpen(false)}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors flex items-center justify-between
              ${isActive ? "font-bold text-[#007BFF] bg-blue-50/50" : "text-gray-700"}`}
                          >
                            {servicio.label}
                            {isActive && (
                              <span className="w-2 h-2 rounded-full bg-[#007BFF]" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Vehículo */}
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <Car size={15} className="text-gray-400" />
                  <div>
                    <span className="text-[11px] text-gray-400 block leading-none">
                      Tu vehículo
                    </span>
                    <span className="text-sm font-semibold text-gray-600">
                      Selecciona tu vehículo
                    </span>
                  </div>
                </div>
                <button className="text-[#007BFF] text-xs font-semibold hover:underline">
                  Cambiar
                </button>
              </div>
            </div>

            {/* Contador + chips */}
            <div className="px-5 py-3 border-b border-gray-100 bg-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-800">
                    {talleresFiltrados.length} resultado
                    {talleresFiltrados.length !== 1 ? "s" : ""}
                    {servicioSeleccionado && (
                      <span className="ml-1 text-gray-400 font-normal">
                        para "{servicioSeleccionado}"
                      </span>
                    )}
                  </span>
                  {servicioSeleccionado && (
                    <button
                      onClick={() => setServicioSeleccionado("")}
                      className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-semibold transition-colors"
                    >
                      <X size={12} /> Limpiar
                    </button>
                  )}
                </div>
                <button className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-blue-500 transition-colors">
                  Recomendados <ChevronDown size={13} />
                </button>
              </div>

              {/* Chips de filtro rápido */}
              <div
                className="flex gap-2 overflow-x-auto"
                style={{ scrollbarWidth: "none" }}
              >
                {[
                  {
                    icon: <CalendarCheck size={12} />,
                    label: "Disponibilidad",
                  },
                  { icon: <Tag size={12} />, label: "Ofertas activas" },
                  { icon: <Bus size={12} />, label: "Transporte" },
                  { icon: <Clock size={12} />, label: "Entrega temprana" },
                ].map((chip) => (
                  <button
                    key={chip.label}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-300 rounded-full hover:border-blue-400 hover:text-blue-500 transition-all whitespace-nowrap"
                  >
                    {chip.icon}
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lista cards */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#e2e8f0 transparent",
              }}
            >
              {listaTalleres.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <Wrench size={24} className="text-gray-400" />
                  </div>
                  <p className="text-sm font-bold text-gray-700 mb-1">
                    Sin resultados
                  </p>
                  <p className="text-xs text-gray-400">
                    No hay talleres con el servicio "{servicioSeleccionado}"
                  </p>
                  <button
                    onClick={() => setServicioSeleccionado("")}
                    className="mt-4 text-xs font-bold text-[#007BFF] hover:underline"
                  >
                    Ver todos los talleres
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {listaTalleres.map((taller, index) => (
                    <CardTaller
                      key={taller.nombre}
                      taller={taller}
                      index={index + 1}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ════════ MAPA ════════ */}
          <div
            className={`
      ${mapa ? "fixed inset-0 z-40 flex" : "hidden"}
      lg:relative lg:flex lg:inset-auto lg:z-auto flex-1 overflow-hidden
    `}
          >
            <MapTalleresHome
              data={talleresFiltrados}
              servicioFiltrado={servicioSeleccionado}
            />
          </div>
        </div>

        {/* Toggle mobile flotante */}
        <button
          onClick={() => setMapa(!mapa)}
          className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-gray-900 rounded-full shadow-2xl hover:bg-gray-800 transition-all"
        >
          {mapa ? (
            <>
              <List size={15} /> Ver listado
            </>
          ) : (
            <>
              <Map size={15} /> Ver mapa
            </>
          )}
        </button>
      </section>
    </>
  );
}
