import LayoutExplore from "@/src/Components/LandingPage/LayoutExplore";
import { client } from "@/client";
import { GET_NEGOCIOSVDOS_BY_SERVICIO } from "@/graphql/queries";
import getSeoCategorias from "@/src/data/SeoCategorias";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useMemo } from "react";
import CardTaller from "@/src/Components/LandingPage/CardTaller";
import Link from "next/link";
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
  SlidersHorizontal,
} from "lucide-react";

const SectionSeoServicios = dynamic(
  () => import("@/src/Components/LandingPage/SectionSeoServicios"),
  { ssr: false },
);
const MapTalleresHome = dynamic(
  () => import("@/src/Components/LandingPage/MapTalleresHome"),
  { ssr: false },
);
const SERVICIOS_SLUGS = [
  { slug: 'cambio-de-aceite',     label: 'Cambio de Aceite' },
  { slug: 'baterias',             label: 'Baterías' },
  { slug: 'aire-acondicionado',   label: 'Aire Acondicionado' },
  { slug: 'frenos',               label: 'Frenos' },
  { slug: 'motor',                label: 'Motor' },
  { slug: 'clutch',               label: 'Clutch' },
  { slug: 'alineacion-y-balanceo',label: 'Alineación y Balanceo' },
  { slug: 'cajas',                label: 'Cajas de Dirección' },
  { slug: 'suspension',           label: 'Suspensión' },
  { slug: 'latoneria-y-pintura',  label: 'Carrocería y Pintura' },
  { slug: 'inyeccion',            label: 'Inyección' },
  { slug: 'electronica',          label: 'Electrónica' },
  { slug: 'sincronizacion',       label: 'Sincronización' },
  { slug: 'electricos',           label: 'Eléctricos' },
  { slug: 'lujos',                label: 'Lujos y Accesorios' },
  { slug: 'cda',                  label: 'CDA' },
];
export default function CiudadPage({
  title,
  query,
  description,
  talleresData,
}) {
  const [mapa, setMapa] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");

  // Servicios únicos extraídos de los talleres de esta página
  const allServicios = useMemo(
    () => [...new Set(talleresData?.flatMap((t) => t.categorias || []))].sort(),
    [talleresData],
  );

  // Filtrado por servicio seleccionado en el dropdown
  const talleresFiltrados = useMemo(() => {
    if (!servicioSeleccionado) return talleresData || [];
    return (talleresData || []).filter((t) =>
      t.categorias?.some(
        (c) => c.toLowerCase() === servicioSeleccionado.toLowerCase(),
      ),
    );
  }, [servicioSeleccionado, talleresData]);

  const ciudadLabel = query.ciudad
    ? query.ciudad.charAt(0).toUpperCase() + query.ciudad.slice(1)
    : "Colombia";

  const servicioLabel = query.servicio
    ? query.servicio.replace(/-/g, " ")
    : "Todos los servicios";

  return (
    <LayoutExplore
      title={title}
      query={query}
      description={description?.description}
      url={`/explore/${query.categoria || ""}/${query.vehiculo || ""}/${query.servicio?.replaceAll(/ /g, "-") || ""}/${query.ciudad || ""}`}
      keywords={`Talleres de ${query.categoria} en ${query.ciudad} para ${query.vehiculo} en ${query.servicio}, ${description?.tags}`}
      tags={description?.tags}
      image={"mecanico-pic.webp"}
      visibleSlider={false}
      visibleNavbar={false}
    >
      {/* ══════════════════════════════════════════
          LAYOUT PRINCIPAL — igual que HomeSep
      ══════════════════════════════════════════ */}
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
            {/* ── Filtros superiores ── */}
            <div className="px-5 pt-5 pb-4 border-b border-gray-200 bg-white">
              {/* Inputs ubicación + servicio */}
              <div className="flex gap-2 mb-3">
                {/* Ubicación — viene del query */}
                <div className="flex-1 flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5 bg-white">
                  <MapPin size={15} className="text-[#007BFF] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] text-gray-400 block leading-none mb-0.5">
                      Ubicación
                    </span>
                    <span className="text-sm font-semibold text-gray-800 block truncate">
                      {ciudadLabel}, Colombia
                    </span>
                  </div>
                </div>

                {/* Select servicio */}
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
                        {SERVICIOS_SLUGS.find(
                          (s) => s.slug === query.servicio?.replace(/ /g, "-"),
                        )?.label || servicioLabel}
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
                        href={`/explore/talleres/carro/${query.servicio?.replace(/ /g, "-")}/${query.ciudad || "bogota"}`}
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

              {/* Vehículo del query */}
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <Car size={15} className="text-gray-400" />
                  <div>
                    <span className="text-[11px] text-gray-400 block leading-none">
                      Tu vehículo
                    </span>
                    <span className="text-sm font-semibold text-gray-800 capitalize">
                      {query.vehiculo || "Selecciona tu vehículo"}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/explore/${query.categoria || ""}/${query.vehiculo || ""}`}
                  className="text-[#007BFF] text-xs font-semibold hover:underline"
                >
                  Cambiar
                </Link>
              </div>
            </div>

            {/* ── Contador + chips ── */}
            <div className="px-5 py-3 border-b border-gray-100 bg-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-gray-800">
                    {talleresFiltrados.length} resultado
                    {talleresFiltrados.length !== 1 ? "s" : ""}
                  </span>
                  {servicioSeleccionado && (
                    <>
                      <span className="text-gray-400 text-sm font-normal">
                        para "{servicioSeleccionado}"
                      </span>
                      <button
                        onClick={() => setServicioSeleccionado("")}
                        className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-semibold transition-colors"
                      >
                        <X size={12} /> Limpiar
                      </button>
                    </>
                  )}
                </div>
                <button className="flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-blue-500 transition-colors whitespace-nowrap">
                  Recomendados <ChevronDown size={13} />
                </button>
              </div>

              {/* Chips */}
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

            {/* ── Cards ── */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#e2e8f0 transparent",
              }}
            >
              {talleresFiltrados.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <Wrench size={24} className="text-gray-400" />
                  </div>
                  <p className="text-sm font-bold text-gray-700 mb-1">
                    Sin resultados
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    No hay talleres con "{servicioSeleccionado}" en{" "}
                    {ciudadLabel}
                  </p>
                  <button
                    onClick={() => setServicioSeleccionado("")}
                    className="text-xs font-bold text-[#007BFF] hover:underline"
                  >
                    Ver todos los talleres
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {talleresFiltrados.map((taller, index) => (
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
            <MapTalleresHome data={talleresFiltrados} />
          </div>
        </div>

        {/* Toggle mobile */}
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

      {/* ══════════════════════════════════════════
          SECCIÓN SEO — fuera del layout split
      ══════════════════════════════════════════ */}
      {description && (
        <div className="w-full bg-white my-12 py-12">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="flex flex-col gap-6 flex-1">
                {description?.preguntas?.importancia && (
                  <article>
                    <h3 className="text-base font-bold text-gray-900 mb-2">
                      {description.preguntas.importancia}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {description.importancia}
                    </p>
                  </article>
                )}
                {description?.preguntas?.duracion && (
                  <article>
                    <h3 className="text-base font-bold text-gray-900 mb-2">
                      {description.preguntas.duracion}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {description.duracion}
                    </p>
                  </article>
                )}
                {description?.preguntas?.frecuencia && (
                  <article>
                    <h3 className="text-base font-bold text-gray-900 mb-2">
                      {description.preguntas.frecuencia}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {description.frecuencia}
                    </p>
                  </article>
                )}
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="/mecanico-pic.webp"
                  alt={`Talleres de ${query?.servicio?.replaceAll(/-/g, " ") || ""} en ${query?.ciudad}`}
                  width={280}
                  height={280}
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tags SEO */}
      {description?.tags?.length > 0 && (
        <div className="w-full bg-white py-8">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-wrap gap-2">
              {description.tags.map((el) => (
                <div
                  key={el}
                  className="flex items-center bg-[#FCFDFF] border border-[#CFD5E1] rounded-lg px-3 py-1.5"
                >
                  <h2 className="text-xs text-gray-500 font-medium">{el}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <SectionSeoServicios
        data={talleresData}
        categoria={query.categoria}
        vehiculo={query.vehiculo}
        servicio={query.servicio}
      />
    </LayoutExplore>
  );
}

export async function getStaticProps(context) {
  const { categoria, vehiculo, servicio, ciudad } = context.params;
  const tipoServicio = servicio ? servicio.replace(/-/g, " ") : null;
  const servicioSeo = getSeoCategorias({ servicio, ciudad, vehiculo });

  const { data } = await client.query({
    query: GET_NEGOCIOSVDOS_BY_SERVICIO,
    variables: { tipo: tipoServicio },
  });

  return {
    props: {
      title: `Encuentra los mejores ${categoria} de ${tipoServicio} para ${vehiculo} en ${ciudad}`,
      query: { categoria, vehiculo, ciudad, servicio: tipoServicio },
      description: servicioSeo || null,
      talleresData: data?.getNegociosVDosByServicio || [],
    },
    revalidate: 56800,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
