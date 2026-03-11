import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  ArrowLeft,
  Car,
  MapPin,
  Clock,
  AlertCircle,
  Info,
  Loader2,
} from "lucide-react";
import Head from "next/head";
import FooterV2 from "@/src/Components/Footer/FooterV2";
import Header from "@/src/Components/LandingPage/HeaderDiagnostico";

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  try {
    const BASE_URL =
      process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
    const res = await fetch(`${BASE_URL}/api/diagnostico/${slug}`);
    if (!res.ok)
      return { props: { diagnosticoData: null, slug }, revalidate: 10 };
    const data = await res.json();
    return {
      props: { diagnosticoData: data, slug },
      revalidate:
        data.status === "pending" || data.status === "processing"
          ? 5
          : 60 * 60 * 24,
    };
  } catch {
    return { props: { diagnosticoData: null, slug }, revalidate: 10 };
  }
}

const parsePrecio = (v) => (v ? parseInt(v.replace(/[^\d]/g, ""), 10) : null);

// ─── Loading / Error ───────────────────────────────────────────────────────
function LoadingScreen({ mensaje }) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center">
          <Loader2 className="w-8 h-8 text-[#407BFF] animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Analizando tu vehículo
          </h2>
          <p className="text-base text-gray-400 leading-relaxed">
            {mensaje ||
              "Estamos generando el diagnóstico, esto puede tardar unos segundos…"}
          </p>
        </div>
      </div>
    </>
  );
}

function ErrorScreen({ onRetry }) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-sm w-full text-center">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Error en el diagnóstico
          </h2>
          <p className="text-base text-gray-400 mb-8 leading-relaxed">
            Ocurrió un error al generar el diagnóstico. Por favor, intenta
            nuevamente.
          </p>
          <button
            onClick={onRetry}
            className="px-6 py-2.5 bg-[#407BFF] text-white text-base font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Realizar nuevo diagnóstico
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────
export default function ResultadosPage({ diagnosticoData: initialData, slug }) {
  const router = useRouter();
  const [diagnosticoData, setDiagnosticoData] = useState(initialData);

  useEffect(() => {
    if (!slug) return;
    const needs =
      !diagnosticoData ||
      diagnosticoData.status === "pending" ||
      diagnosticoData.status === "processing";
    if (!needs) return;
    const iv = setInterval(async () => {
      try {
        const res = await fetch(`/api/diagnostico/${slug}`);
        if (!res.ok) return;
        const data = await res.json();
        setDiagnosticoData(data);
        if (data.status === "done" || data.status === "error") {
          clearInterval(iv);
          if (data.status === "error") router.push("/diagnostico");
        }
      } catch {}
    }, 3000);
    return () => clearInterval(iv);
  }, [slug, diagnosticoData?.status]);

  if (router.isFallback) return <LoadingScreen />;
  if (
    !diagnosticoData ||
    diagnosticoData.status === "pending" ||
    diagnosticoData.status === "processing"
  )
    return <LoadingScreen mensaje={diagnosticoData?.mensaje_usuario} />;
  if (diagnosticoData.status === "error")
    return <ErrorScreen onRetry={() => router.push("/diagnostico")} />;

  // ── Data prep ──────────────────────────────────────────────────────────
  const problema = diagnosticoData.mensaje_usuario?.replace(/["']/g, "");
  const title =  problema
  const description = `${problema}. Descubre causas, diagnóstico profesional y costos de reparación para tu ${diagnosticoData.car_make} ${diagnosticoData.car_model} ${diagnosticoData.car_year} en ${diagnosticoData.country || "Colombia"}.`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}diagnostico/${slug}`;

  let itemsPrecios = [],
    precioTotalMin = 0,
    precioTotalMax = 0,
    precioPromedio = 0,
    tienePreciosValidos = false;
  if (Array.isArray(diagnosticoData.precios)) {
    itemsPrecios = diagnosticoData.precios
      .map((item) => {
        const m = item.precio?.match(/(\d[\d.,]*)\s*-\s*(\d[\d.,]*)/);
        if (m) {
          const min = parsePrecio(m[1]),
            max = parsePrecio(m[2]);
          if (min && max)
            return { item: item.item, precioMin: min, precioMax: max };
        }
        return null;
      })
      .filter(Boolean);
    if (itemsPrecios.length > 0) {
      precioTotalMin = itemsPrecios.reduce((s, i) => s + i.precioMin, 0);
      precioTotalMax = itemsPrecios.reduce((s, i) => s + i.precioMax, 0);
      precioPromedio = Math.round((precioTotalMin + precioTotalMax) / 2);
      tienePreciosValidos = true;
    }
  }

  const sections = [
    { id: "sintoma", label: "Síntoma" },
    { id: "diagnostico", label: "Diagnóstico" },
    ...(diagnosticoData?.causas?.length > 0
      ? [{ id: "causas", label: "Causas" }]
      : []),
    ...(diagnosticoData?.soluciones?.length > 0
      ? [{ id: "soluciones", label: "Soluciones" }]
      : []),
    ...(diagnosticoData?.faqs?.length > 0
      ? [{ id: "faqs", label: "Preguntas" }]
      : []),
    ...(tienePreciosValidos ? [{ id: "precios", label: "Precios" }] : []),
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="/favicon.png" />

        <meta property="og:image:url" content="/favicon.png" />
        <meta
          property="og:site_name"
          content="Quarks - Diagnóstico Automotriz"
        />
        <link rel="icon" href="/favicon.png" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/favicon.png" />
        <meta name="url" content={canonicalUrl} />
        <meta property="url" content={canonicalUrl} />
        {/* Schema.org - FAQPage */}
        {diagnosticoData?.faqs?.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",

                mainEntity: [
                  // Pregunta principal (problema del usuario)
                  {
                    "@type": "Question",
                    name: problema,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: diagnosticoData.diagnostico,
                    },
                  },

                  // FAQs dinámicos
                  ...diagnosticoData.faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: f.a,
                    },
                  })),
                ],
              }),
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: problema,
              areaServed: "CO",
              provider: {
                "@type": "Organization",
                name: "Quarks",
              },
              offers: {
                "@type": "Offer",
                priceCurrency: "COP",
                lowPrice: precioTotalMin,
                highPrice: precioTotalMax,
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1233996863721897"
          crossorigin="anonymous"
        ></script>

        {/* Schema.org - Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: title,
              description: description,
              author: {
                "@type": "Organization",
                name: "Quarks",
              },
              publisher: {
                "@type": "Organization",
                name: "Quarks",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: title,
              description,
              image: `/${diagnosticoData.car_make}.webp`,
              datePublished: diagnosticoData.fecha,
              dateModified: diagnosticoData.fecha,

              author: {
                "@type": "Organization",
                name: "Quarks",
                url: "https://www.quarks.com.co",
              },

              publisher: {
                "@type": "Organization",
                name: "Quarks",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.quarks.com.co/favicon.png",
                },
              },

              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": canonicalUrl,
              },
            }),
          }}
        />

        {diagnosticoData?.soluciones?.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "HowTo",
                name: `Cómo solucionar: ${problema}`,
                description: diagnosticoData.diagnostico,

                step: diagnosticoData.soluciones.map((s, i) => ({
                  "@type": "HowToStep",
                  position: i + 1,
                  name: s,
                  text: s,
                })),
              }),
            }}
          />
        )}

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

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div className="border-b border-gray-100">
          <div className="max-w-[1100px] mx-auto px-6 pt-8 pb-0 max-sm:px-4">
            <button
              onClick={() => router.push("/diagnosticos")}
              className="inline-flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-[#407BFF] transition-colors mb-5"
            >
              <ArrowLeft className="w-4 h-4" /> Volver a diagnósticos
            </button>

            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0 max-w-[680px]">
                <p className="text-[12px] font-semibold uppercase tracking-[1px] text-[#407BFF] mb-3">
                  Diagnóstico automotriz
                </p>
                <h1 className="text-[32px] sm:text-[38px] font-bold text-gray-950 leading-[1.2] tracking-tight mb-4">
                  {problema}
                </h1>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mb-6">
                  <span className="inline-flex items-center gap-1.5 text-[15px] text-gray-500">
                    <Car className="w-4 h-4 text-gray-400" />
                    <strong className="font-semibold text-gray-800">
                      {diagnosticoData.car_make} {diagnosticoData.car_model}
                    </strong>
                    <span className="text-gray-400">
                      {diagnosticoData.car_year}
                    </span>
                  </span>
                  {diagnosticoData.city && (
                    <span className="inline-flex items-center gap-1 text-[14px] text-gray-400">
                      <MapPin className="w-4 h-4" /> {diagnosticoData.city}
                    </span>
                  )}
                  {tienePreciosValidos && (
                    <span className="text-[14px] text-gray-500 max-sm:hidden">
                      Reparación estimada:{" "}
                      <strong className="text-gray-800 font-semibold">
                        ${precioTotalMin.toLocaleString()} – $
                        {precioTotalMax.toLocaleString()} COP
                      </strong>
                    </span>
                  )}
                </div>
              </div>
              {/* Logo desktop */}
              <div className="shrink-0 max-sm:hidden mt-1">
                <img
                  src={`/${diagnosticoData.car_make}.webp`}
                  alt={diagnosticoData.car_make}
                  className="w-14 h-14 object-contain opacity-70"
                />
              </div>
            </div>

            {/* Section nav tabs */}
            <nav className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(s.id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="px-4 py-3 text-[13px] font-medium whitespace-nowrap text-gray-400 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-800 transition-all"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* ── BODY GRID ─────────────────────────────────────────────────── */}
        <div className="max-w-[1100px] mx-auto px-6 max-sm:px-4">
          <div className="grid grid-cols-[1fr_300px] gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-0">
            {/* ── MAIN ───────────────────────────────────────────────── */}
            <article className="py-12 max-sm:py-8 space-y-0 max-w-[640px]">
              {/* SÍNTOMA */}
              <section id="sintoma" className="scroll-mt-8 pb-12">
                <p className="text-[12px] font-semibold uppercase tracking-[1px] text-gray-400 mb-4">
                  Síntoma reportado
                </p>
                <blockquote className="text-[20px] text-gray-700 leading-[1.7] border-l-[3px] border-[#407BFF] pl-5 italic font-normal">
                  {diagnosticoData.mensaje_usuario}
                </blockquote>
              </section>

              {/* DIAGNÓSTICO */}
              <section
                id="diagnostico"
                className="scroll-mt-8 pt-10 pb-12 border-t border-gray-100"
              >
                <p className="text-[12px] font-semibold uppercase tracking-[1px] text-gray-400 mb-3">
                  Diagnóstico
                </p>
                <h2 className="text-[22px] font-bold text-gray-950 leading-snug tracking-tight mb-4">
                   {diagnosticoData.mensaje_usuario}
                </h2>
                <p className="text-[17px] text-gray-600 leading-[1.8]">
                  {diagnosticoData.diagnostico}
                </p>
                {itemsPrecios.length > 0 && (
                  <div className="mt-5">
                    {itemsPrecios.map((item, i) => (
                      <p
                        key={i}
                        className="text-[15px] text-gray-500 leading-relaxed py-2.5 border-b border-gray-100 last:border-0"
                      >
                        <span className="font-semibold text-gray-800">
                          {item.item}
                        </span>{" "}
                        generalmente cuesta entre{" "}
                        <span className="font-semibold text-gray-800">
                          ${item.precioMin.toLocaleString()} y $
                          {item.precioMax.toLocaleString()} COP
                        </span>{" "}
                        en {diagnosticoData.city || "Colombia"}.
                      </p>
                    ))}
                  </div>
                )}
              </section>

              {/* CAUSAS */}
              {diagnosticoData.causas?.length > 0 && (
                <section
                  id="causas"
                  className="scroll-mt-8 pt-10 pb-12 border-t border-gray-100"
                >
                  <p className="text-[12px] font-semibold uppercase tracking-[1px] text-gray-400 mb-3">
                    Causas probables
                  </p>
                  <h2 className="text-[22px] font-bold text-gray-950 leading-snug tracking-tight mb-6">
                    ¿Por qué ocurre este problema?
                  </h2>
                  <ol className="space-y-5">
                    {diagnosticoData.causas.map((item, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <span className="text-[13px] font-bold text-[#407BFF] tabular-nums mt-1 w-6 shrink-0 leading-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-[16px] text-gray-600 leading-[1.75] m-0">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* SOLUCIONES */}
              {diagnosticoData.soluciones?.length > 0 && (
                <section
                  id="soluciones"
                  className="scroll-mt-8 pt-10 pb-12 border-t border-gray-100"
                >
                  <p className="text-[12px] font-semibold uppercase tracking-[1px] text-gray-400 mb-3">
                    Soluciones recomendadas
                  </p>
                  <h2 className="text-[22px] font-bold text-gray-950 leading-snug tracking-tight mb-6">
                    ¿Cómo solucionar el problema?
                  </h2>
                  <ol className="space-y-5">
                    {diagnosticoData.soluciones.map((item, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <span className="text-[13px] font-bold text-[#407BFF] tabular-nums mt-1 w-6 shrink-0 leading-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-[16px] text-gray-600 leading-[1.75] m-0">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* FAQs */}
              {diagnosticoData.faqs?.length > 0 && (
                <section
                  id="faqs"
                  className="scroll-mt-8 pt-10 pb-12 border-t border-gray-100"
                >
                  <p className="text-[12px] font-semibold uppercase tracking-[1px] text-gray-400 mb-6">
                    Preguntas frecuentes
                  </p>
                  <dl className="space-y-8">
                    {diagnosticoData.faqs.map((item, i) => (
                      <div key={i}>
                        <dt className="text-[17px] font-bold text-gray-900 mb-2 leading-snug">
                          {item.q}
                        </dt>
                        <dd className="text-[15px] text-gray-500 leading-[1.8] m-0">
                          {item.a}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {/* PRECIOS */}
              {tienePreciosValidos && (
                <section
                  id="precios"
                  className="scroll-mt-8 pt-10 pb-12 border-t border-gray-100"
                >
                  <p className="text-[12px] font-semibold uppercase tracking-[1px] text-gray-400 mb-3">
                    Costos estimados
                  </p>
                  <h2 className="text-[22px] font-bold text-gray-950 leading-snug tracking-tight mb-6">
                    Reparación estimada: {diagnosticoData.mensaje_usuario}
                  </h2>
                  {/* Line items */}
                  <div className="mb-8">
                    {itemsPrecios.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-baseline py-3 border-b border-gray-100 last:border-0 gap-3 flex-wrap"
                      >
                        <span className="text-[15px] text-gray-600 flex-1 min-w-0">
                          {item.item}
                        </span>
                        <span className="text-[15px] font-semibold text-gray-900 shrink-0 whitespace-nowrap">
                          ${item.precioMin.toLocaleString()} – $
                          {item.precioMax.toLocaleString()}
                          <span className="text-[12px] font-normal text-gray-400 ml-1">
                            COP
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Summary — responsive sizes */}
                  <div className="flex items-end gap-6 sm:gap-10 py-5 border-y border-gray-200 mb-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[1px] text-gray-400 mb-1.5">
                        Mínimo
                      </p>
                      <p className="text-[20px] sm:text-[26px] font-bold text-gray-600 leading-none tracking-tight">
                        ${precioTotalMin.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[1px] text-[#407BFF] mb-1.5">
                        Promedio
                      </p>
                      <p className="text-[28px] sm:text-[38px] font-bold text-[#407BFF] leading-none tracking-tight">
                        ${precioPromedio.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[1px] text-gray-400 mb-1.5">
                        Máximo
                      </p>
                      <p className="text-[20px] sm:text-[26px] font-bold text-gray-600 leading-none tracking-tight">
                        ${precioTotalMax.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="flex items-center gap-2 text-[13px] text-gray-400">
                    <Info className="w-4 h-4 shrink-0" />
                    Los precios son referenciales y pueden variar según el
                    taller y la ubicación.
                  </p>
                </section>
              )}

              {/* DISCLAIMER */}
              <div className="flex gap-3 items-start pt-8 border-t border-gray-100">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  <span className="font-semibold text-gray-700">
                    Recomendación importante.{" "}
                  </span>
                  Este diagnóstico es orientativo. Para mayor precisión, visita
                  un taller especializado.
                </p>
              </div>
            </article>

            {/* ── SIDEBAR ────────────────────────────────────────────── */}
            <aside className="py-12 border-l border-gray-100 pl-10 max-[900px]:border-l-0 max-[900px]:border-t max-[900px]:border-gray-100 max-[900px]:pl-0 max-[900px]:pt-6 max-[900px]:pb-8">
              {/* Mobile: solo CTA */}
              <div className="hidden max-[900px]:block">
                <button
                  onClick={() => router.push("/talleres")}
                  className="w-full py-3 bg-[#407BFF] text-white text-[15px] font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  Buscar talleres cerca de ti
                </button>
              </div>

              {/* Desktop: vertical sticky */}
              <div className="sticky top-8 space-y-8 ">
                {/* Vehicle */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <img
                      src={`/${diagnosticoData.car_make}.webp`}
                      alt={problema}
                      className="w-11 h-11 object-contain opacity-70"
                    />
                    <div>
                      <p className="text-[15px] font-bold text-gray-900 leading-tight">
                        {diagnosticoData.car_make} {diagnosticoData.car_model}
                      </p>
                      <p className="text-[14px] text-gray-400">
                        {diagnosticoData.car_year}
                      </p>
                    </div>
                  </div>
                  {[
                    ["Marca", diagnosticoData.car_make],
                    ["Modelo", diagnosticoData.car_model],
                    ["Año", diagnosticoData.car_year],
                    ...(diagnosticoData.city
                      ? [["Ubicación", diagnosticoData.city]]
                      : []),
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between py-2.5 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-[14px] text-gray-400">{label}</span>
                      <span className="text-[14px] font-semibold text-gray-800">
                        {value}
                      </span>
                    </div>
                  ))}
                  {diagnosticoData.servicios?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {diagnosticoData.servicios.map((s, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-gray-100 text-gray-500 text-[12px] font-medium rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100" />

                {/* Price summary */}
                {tienePreciosValidos && (
                  <>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[1px] text-gray-400 mb-2">
                        Costo estimado
                      </p>
                      <p className="text-[34px] font-bold text-[#407BFF] leading-none tracking-tight mb-1">
                        ${precioPromedio.toLocaleString()}
                        <span className="text-[14px] font-normal text-gray-400 ml-1">
                          COP
                        </span>
                      </p>
                      <p className="text-[13px] text-gray-400">
                        ${precioTotalMin.toLocaleString()} – $
                        {precioTotalMax.toLocaleString()}
                      </p>
                    </div>
                    <div className="border-t border-gray-100" />
                  </>
                )}

                {/* CTA */}
                <div>
                  <p className="text-[15px] font-bold text-gray-900 mb-1.5">
                    ¿Necesitas un taller?
                  </p>
                  <p className="text-[14px] text-gray-400 leading-relaxed mb-4">
                    Encuentra talleres especializados cerca de ti y agenda tu
                    cita.
                  </p>
                  <button
                    onClick={() => router.push("/talleres")}
                    className="w-full py-2.5 px-4 bg-[#407BFF] text-white text-[15px] font-medium rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Buscar talleres
                  </button>
                </div>
              </div>
            </aside>
          </div>
          <FooterV2 />
        </div>
      </div>
    </>
  );
}