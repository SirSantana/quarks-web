import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  ChevronRight,
  Wrench,
  X,
  SlidersHorizontal,
} from "lucide-react";
import Head from "next/head";
import Header from "@/src/Components/LandingPage/HeaderDiagnostico";
import FooterV2 from "@/src/Components/Footer/FooterV2";

export async function getStaticProps() {
  const BASE_URL =
    process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${BASE_URL}/api/diagnosticos/publicos?page=1`);
    if (!res.ok) throw new Error("Error al cargar diagnósticos");
    const json = await res.json();
    return {
      props: {
        initialDiagnostics: json.data || [],
        initialTotalPages: json.totalPages || 1,
      },
      revalidate: 3600,
    };
  } catch {
    return {
      props: { initialDiagnostics: [], initialTotalPages: 1 },
      revalidate: 60,
    };
  }
}

export default function DiagnosticosPage({
  initialDiagnostics,
  initialTotalPages,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [diagnostics, setDiagnostics] = useState(initialDiagnostics);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);

  const marcas = [...new Set(diagnostics.map((d) => d.car_make))]
    .filter(Boolean)
    .sort();
  const years = [...new Set(diagnostics.map((d) => d.car_year))]
    .filter(Boolean)
    .sort((a, b) => b - a);

  const hasActiveFilters = searchTerm || selectedMake || selectedYear;

  const filtered = diagnostics.filter((d) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      !q ||
      d.mensaje_usuario?.toLowerCase().includes(q) ||
      d.car_make?.toLowerCase().includes(q) ||
      d.car_model?.toLowerCase().includes(q);
    return (
      matchSearch &&
      (!selectedMake || d.car_make === selectedMake) &&
      (!selectedYear || d.car_year === selectedYear)
    );
  });

  useEffect(() => {
    if (page === 1) {
      setDiagnostics(initialDiagnostics);
      setTotalPages(initialTotalPages);
      return;
    }
    const fetchDiagnostics = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/diagnosticos/publicos?page=${page}`);
        const json = await res.json();
        setDiagnostics(json.data);
        setTotalPages(json.totalPages);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    fetchDiagnostics();
  }, [page, initialDiagnostics, initialTotalPages]);

  return (
    <>
      <Head>
        <title>Fallas de autos comunes</title>
        <meta
          name="description"
          content="Conoce las fallas de autos mas comunes y como resolverlos"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.quarks.com.co/diagnosticos`} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Fallas de autos comunes" />
        <meta
          property="og:description"
          content="Conoce las fallas de autos mas comunes y como resolverlos"
        />
        <meta
          property="og:url"
          content={`https://www.quarks.com.co/diagnosticos`}
        />
        <meta property="og:image" content="/favicon.png" />

        <meta property="og:image:url" content="/favicon.png" />
        <meta
          property="og:site_name"
          content="Quarks - Diagnóstico Automotriz"
        />
        <link rel="icon" href="/favicon.png" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={"Fallas de autos comunes"} />
        <meta
          name="twitter:description"
          content={"Conoce las fallas de autos mas comunes y como resolverlos"}
        />
        <meta name="twitter:image" content="/favicon.png" />
        <meta name="url" content={`https://www.quarks.com.co/diagnosticos`} />
        <meta
          property="url"
          content={`https://www.quarks.com.co/diagnosticos`}
        />
        {/* Schema.org - FAQPage */}

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1233996863721897"
          crossorigin="anonymous"
        ></script>

        {process.env.NODE_ENV === "production" && (
          <script
            async
            defer
            dangerouslySetInnerHTML={{
              __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "jh3neqgrnc");
        `,
            }}
          />
        )}
      </Head>

      <div className="min-h-screen bg-white">
        <Header />

        {/* ── PAGE HEADER ───────────────────────────────────────────────── */}
        <div className="border-b border-gray-100">
          <div className="max-w-[1100px] mx-auto px-6 pt-10 pb-8 max-sm:px-4">
            <p className="text-[11px] font-semibold uppercase tracking-[1px] text-[#407BFF] mb-3">
              Base de conocimiento
            </p>
            <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
              <div>
                <h1 className="text-[28px] sm:text-[34px] font-bold text-gray-950 leading-[1.2] tracking-tight">
                  Diagnósticos realizados
                </h1>
                <p className="text-[15px] text-gray-400 mt-1.5">
                  Explora problemas comunes y encuentra soluciones para tu
                  vehículo.
                </p>
              </div>
              <button
                onClick={() => (window.location.href = "/diagnostico")}
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-[#407BFF] text-white text-[13px] font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                <Wrench className="w-4 h-4" />
                Nuevo diagnóstico
              </button>
            </div>

            {/* Search + filters */}
            <div className="flex gap-2 items-center">
              <div className="relative flex-1 max-w-[500px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por problema, marca o modelo…"
                  className="w-full pl-9 pr-4 py-2.5 text-[14px] border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-[#407BFF] outline-none transition-colors"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 text-[13px] font-medium rounded-lg border transition-colors ${
                  showFilters || hasActiveFilters
                    ? "border-[#407BFF] text-[#407BFF] bg-[#eef2ff]"
                    : "border-gray-200 text-gray-500 bg-gray-50 hover:bg-white"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
                {hasActiveFilters && (
                  <span className="w-1.5 h-1.5 bg-[#407BFF] rounded-full" />
                )}
              </button>
            </div>

            {/* Filter dropdowns */}
            {showFilters && (
              <div className="flex flex-wrap gap-3 mt-3 items-center">
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="text-[13px] py-2 pl-3 pr-7 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 focus:outline-none focus:border-[#407BFF]"
                >
                  <option value="">Todas las marcas</option>
                  {marcas.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="text-[13px] py-2 pl-3 pr-7 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 focus:outline-none focus:border-[#407BFF]"
                >
                  <option value="">Todos los años</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedMake("");
                      setSelectedYear("");
                    }}
                    className="inline-flex items-center gap-1 text-[12px] text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" /> Limpiar
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── CONTENT ───────────────────────────────────────────────────── */}
        <div className="max-w-[1100px] mx-auto px-6 max-sm:px-4">
          {/* Result count */}
          <div className="py-5 border-b border-gray-100">
            <p className="text-[13px] text-gray-400">
              <span className="font-semibold text-gray-800">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1
                ? "diagnóstico encontrado"
                : "diagnósticos encontrados"}
            </p>
          </div>

          {/* List */}
          {loading ? (
            <div className="py-24 text-center">
              <div className="w-6 h-6 border-2 border-[#407BFF] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-[15px] font-semibold text-gray-800 mb-1">
                Sin resultados
              </p>
              <p className="text-[13px] text-gray-400 mb-6">
                Intenta con otros términos o ajusta los filtros.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedMake("");
                    setSelectedYear("");
                  }}
                  className="text-[13px] text-[#407BFF] font-medium"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          ) : (
            <div>
              {filtered.map((d, i) => (
                <a
                  key={d.id || i}
                  href={`/diagnostico/${d.slug}`}
                  className="group flex items-start gap-5 py-6 border-b border-gray-100 hover:bg-gray-50 -mx-6 px-6 max-sm:-mx-4 max-sm:px-4 transition-colors"
                >
                  {/* Brand logo */}
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center mt-0.5">
                    <img
                      src={`/${d.car_make}.webp`}
                      alt={d.car_make}
                      className="w-10 h-10 object-contain opacity-60 group-hover:opacity-90 transition-opacity"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-[16px] font-bold text-gray-900 leading-snug mb-1.5 group-hover:text-[#407BFF] transition-colors">
                      {d.mensaje_usuario}
                    </h2>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2.5">
                      <span className="text-[12px] font-semibold text-gray-600">
                        {d.car_make} {d.car_model} {d.car_year}
                      </span>
                      {d.city && (
                        <span className="inline-flex items-center gap-1 text-[12px] text-gray-400">
                          <MapPin className="w-3 h-3" />
                          {d.city}
                        </span>
                      )}
                      {d.fecha && (
                        <span className="inline-flex items-center gap-1 text-[12px] text-gray-400">
                          <Clock className="w-3 h-3" />
                          {new Date(d.fecha).toLocaleDateString("es-CO", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      )}
                    </div>

                    {/* Excerpt */}
                    <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">
                      {d.diagnostico}
                    </p>

                    {/* Tags */}
                    {d.servicios?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {d.servicios.map((s, j) => (
                          <span
                            key={j}
                            className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[11px] font-medium rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="shrink-0 w-4 h-4 text-gray-300 group-hover:text-[#407BFF] mt-1 transition-colors max-sm:hidden" />
                </a>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 py-10">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 text-[13px] font-medium text-gray-500 border border-gray-200 rounded-lg disabled:opacity-40 hover:border-gray-300 transition-colors"
              >
                ← Anterior
              </button>
              <span className="text-[13px] text-gray-400">
                Página{" "}
                <span className="font-semibold text-gray-700">{page}</span> de{" "}
                {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 text-[13px] font-medium text-gray-500 border border-gray-200 rounded-lg disabled:opacity-40 hover:border-gray-300 transition-colors"
              >
                Siguiente →
              </button>
            </div>
          )}

          {/* ── CTA BANNER ────────────────────────────────────────────── */}
          <div className="my-10 pt-10 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[1px] text-gray-400 mb-2">
                  ¿No encontraste tu problema?
                </p>
                <h2 className="text-[22px] font-bold text-gray-950 tracking-tight leading-snug mb-1">
                  Obtén un diagnóstico personalizado
                </h2>
                <p className="text-[14px] text-gray-400 leading-relaxed max-w-md">
                  Describe el problema de tu vehículo y recibe causas,
                  soluciones y costos estimados en menos de 2 minutos.
                </p>
              </div>
              <button
                onClick={() => (window.location.href = "/diagnostico/nuevo")}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-[#407BFF] text-white text-[14px] font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                <Wrench className="w-4 h-4" />
                Crear diagnóstico
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterV2 />
    </>
  );
}
