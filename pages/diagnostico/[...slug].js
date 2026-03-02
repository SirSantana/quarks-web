import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  ArrowLeft,
  Car,
  MapPin,
  DollarSign,
  Wrench,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronRight,
  Loader2,
  Menu,
  X,
} from "lucide-react";
import Head from "next/head";
import FooterV2 from "@/src/Components/Footer/FooterV2";
import Header from "@/src/Components/LandingPage/HeaderDiagnostico";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  try {
    const BASE_URL =
      process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";

    const res = await fetch(`${BASE_URL}/api/diagnostico/${slug}`);

    if (!res.ok) {
      return {
        props: {
          diagnosticoData: null,
          slug,
        },
        revalidate: 10,
      };
    }

    const data = await res.json();

    if (data.status === "pending" || data.status === "processing") {
      return {
        props: {
          diagnosticoData: data,
          slug,
        },
        revalidate: 5,
      };
    }

    return {
      props: {
        diagnosticoData: data,
        slug,
      },
      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    return {
      props: {
        diagnosticoData: null,
        slug,
      },
      revalidate: 10,
    };
  }
}

export default function ResultadosPage({ diagnosticoData: initialData, slug }) {
  const router = useRouter();
  const [diagnosticoData, setDiagnosticoData] = useState(initialData);
  const [isPolling, setIsPolling] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileNavOpen(false);
    }
  };

  // Crear array de secciones disponibles
  const getSections = () => {
    if (!diagnosticoData || diagnosticoData.status !== "done") return [];

    const sections = [
      { id: "sintoma", label: "Síntoma" },
      { id: "diagnostico", label: "Diagnóstico" },
    ];

    if (diagnosticoData?.causas?.length > 0) {
      sections.push({ id: "causas", label: "Causas" });
    }

    if (diagnosticoData?.soluciones?.length > 0) {
      sections.push({ id: "soluciones", label: "Soluciones" });
    }

    if (diagnosticoData?.faqs?.length > 0) {
      sections.push({ id: "faqs", label: "Preguntas" });
    }

    // Asegúrate de que tienePreciosValidos esté calculado antes
    const hasPrices =
      diagnosticoData?.precios &&
      Array.isArray(diagnosticoData.precios) &&
      diagnosticoData.precios.length > 0;
    if (hasPrices) {
      sections.push({ id: "precios", label: "Precios" });
    }

    return sections;
  };

  // ... (loaders, parseo de precios, etc.)

  const sections = getSections();
  useEffect(() => {
    // Si no hay slug, no hacer nada
    if (!slug) return;

    // Determinar si necesitamos hacer polling
    const needsPolling =
      !diagnosticoData ||
      diagnosticoData.status === "pending" ||
      diagnosticoData.status === "processing";

    if (!needsPolling) {
      setIsPolling(false);
      return;
    }

    console.log("🔄 Iniciando polling para slug:", slug);
    setIsPolling(true);

    const interval = setInterval(async () => {
      console.log("📡 Haciendo polling...");

      try {
        const res = await fetch(`/api/diagnostico/${slug}`);

        if (!res.ok) {
          console.error("❌ Error en polling:", res.status);
          return;
        }

        const data = await res.json();
        console.log("✅ Datos recibidos:", data.status);

        // Actualizar el estado con los nuevos datos
        setDiagnosticoData(data);

        if (data.status === "done") {
          console.log("✅ Diagnóstico completado");
          setIsPolling(false);
          clearInterval(interval);
        } else if (data.status === "error") {
          console.log("❌ Error en diagnóstico");
          setIsPolling(false);
          clearInterval(interval);
          alert("Error generando el diagnóstico");
          router.push("/diagnostico");
        } else {
          console.log("⏳ Diagnóstico en proceso:", data.status);
        }
      } catch (err) {
        console.error("❌ Error en polling:", err);
      }
    }, 3000);

    // Cleanup
    return () => {
      console.log("🛑 Deteniendo polling");
      clearInterval(interval);
    };
  }, [slug, diagnosticoData?.status]); // ← Dependencias importantes

  // Mostrar loader mientras carga SSG
  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Cargando diagnóstico...</p>
        </div>
      </div>
    );
  }

  // Mostrar loader mientras está en pending/processing
  if (
    !diagnosticoData ||
    diagnosticoData.status === "pending" ||
    diagnosticoData.status === "processing"
  ) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Analizando tu vehículo
            </h2>
            <p className="text-gray-600 mb-4">
              Estamos generando el diagnóstico, esto puede tardar unos
              segundos...
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                {diagnosticoData?.mensaje_usuario ||
                  "Procesando información..."}
              </p>
            </div>

            {/* Indicador de estado */}
            <div className="mt-4 text-xs text-gray-500">
              Estado: {diagnosticoData?.status || "cargando"}
              {isPolling && " (actualizando...)"}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Si hay error o no hay datos
  if (diagnosticoData.status === "error") {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Error en el diagnóstico
            </h2>
            <p className="text-gray-600 mb-6">
              Ocurrió un error al generar el diagnóstico. Por favor, intenta
              nuevamente.
            </p>
            <button
              onClick={() => router.push("/diagnostico")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Realizar nuevo diagnóstico
            </button>
          </div>
        </div>
      </>
    );
  }

  // ========== RESTO DEL CÓDIGO ORIGINAL (solo cuando status === "done") ==========

  const problema = diagnosticoData.mensaje_usuario?.replace(/["']/g, "");
const title = problema
  .replaceAll(diagnosticoData.car_make, '')
  .replaceAll(diagnosticoData.car_model, '')
  .replaceAll(diagnosticoData.car_year, '')
  .trim();
  const description = `${problema}. Descubre causas, diagnóstico profesional y costos de reparación para tu ${diagnosticoData.car_make} ${diagnosticoData.car_model} ${diagnosticoData.car_year} en ${diagnosticoData.country || "Colombia"}.`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}/diagnostico/${slug}`;

  // Parse precios - manejar array de objetos
  let itemsPrecios = [];
  let precioTotalMin = 0;
  let precioTotalMax = 0;
  let precioPromedio = 0;
  let tienePreciosValidos = false;

  const parsePrecio = (valor) => {
    if (!valor) return null;
    return parseInt(valor.replace(/[^\d]/g, ""), 10);
  };

  if (diagnosticoData.precios && Array.isArray(diagnosticoData.precios)) {
    itemsPrecios = diagnosticoData.precios
      .map((item) => {
        console.log(item);

        const precioMatch = item.precio?.match(/(\d[\d.,]*)\s*-\s*(\d[\d.,]*)/);

        if (precioMatch) {
          const min = parsePrecio(precioMatch[1]);
          const max = parsePrecio(precioMatch[2]);

          if (min !== null && max !== null) {
            return {
              item: item.item,
              precioMin: min,
              precioMax: max,
              precioOriginal: item.precio,
            };
          }
        }

        return null;
      })
      .filter(Boolean);

    if (itemsPrecios.length > 0) {
      precioTotalMin = itemsPrecios.reduce(
        (sum, item) => sum + item.precioMin,
        0,
      );
      precioTotalMax = itemsPrecios.reduce(
        (sum, item) => sum + item.precioMax,
        0,
      );
      precioPromedio = Math.round((precioTotalMin + precioTotalMax) / 2);
      tienePreciosValidos = true;
    }
  }

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
        {/* Header */}
        <Header />

        {/* Main Layout with 3 columns */}
        <div className="py-4 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Sidebar - Pegado a la izquierda */}
            {/* <aside className="lg:col-span-3 order-2 lg:order-1 bg-gray-50 lg:min-h-screen lg:fixed lg:left-0 lg:top-0 lg:w-[280px] lg:pt-32 lg:pb-8 lg:px-6 px-4 py-6">
              <nav className="lg:sticky lg:top-32">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Otros problemas comunes
                </h3>
                <ul className="space-y-1">
                  {problemasRelacionados.map((item) => (
                    <li key={item.slug}>
                      <button
                        onClick={() => router.push(`/diagnostico/${item.slug}`)}
                        className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white transition-colors group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm text-gray-700 group-hover:text-blue-600 leading-snug">
                            {item.title}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0 mt-0.5" />
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {item.categoria}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside> */}

            {/* Main Content with Right Sidebar */}
            <div className="lg:col-span-9 lg:col-start-4 order-1 lg:order-2">
              <header className="border-b border-gray-100">
                <div className="max-w-6xl  px-4 sm:px-6 py-4 sm:py-6">
                  <button
                    onClick={() => router.push("/diagnosticos")}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Volver
                  </button>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                    {problema}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="inline-flex items-center gap-2 text-gray-700">
                      <Car className="w-4 h-4" />
                      <strong>
                        {diagnosticoData.car_make} {diagnosticoData.car_model}
                      </strong>
                      <span className="text-gray-500">
                        ({diagnosticoData.car_year})
                      </span>
                    </span>

                    {diagnosticoData.city && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="inline-flex items-center gap-1.5 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {diagnosticoData.city}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </header>
              <div className="max-w-6xl  px-4 sm:px-6 mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 ">
                  {/* Main Content */}

                  <article className="relative lg:col-span-8 space-y-20 ">
                    {diagnosticoData?.status === "done" &&
                      sections.length > 0 && (
                        <div className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200">
                          <div className="w-full max-w-6xl mx-auto">
                            <nav className="flex items-center gap-1 overflow-x-auto py-3 px-4 sm:px-6 scrollbar-hide">
                              {sections.map((section) => (
                                <a
                                  key={section.id}
                                  href={`#${section.id}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(section.id);
                                  }}
                                  className="px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-colors 
                       text-gray-600 hover:text-gray-900 hover:bg-gray-100 
                       bg-gray-50 lg:bg-transparent border border-gray-100 lg:border-none"
                                >
                                  {section.label}
                                </a>
                              ))}
                              {/* Espaciador final para que el último item no quede pegado al borde al scrollear */}
                              <div className="min-w-[16px] h-1 lg:hidden" />
                            </nav>
                          </div>

                          {/* Indicador visual de scroll (opcional) */}
                          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/40 to-transparent pointer-events-none lg:hidden" />
                        </div>
                      )}
                    {/* Síntoma */}
                    <section id="sintoma">
                      <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3">
                        Síntoma reportado
                      </h2>
                      <blockquote className="text-lg text-gray-800 leading-relaxed border-l-4 border-blue-600 pl-5 italic">
                        {diagnosticoData.mensaje_usuario}
                      </blockquote>
                    </section>

                    {/* Diagnóstico */}
                    <section id="diagnostico">
                      <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">
                          Diagnóstico {diagnosticoData.car_make}{" "}
                          {diagnosticoData.car_model} {diagnosticoData.car_year}
                        </h2>
                      </div>

                      <p className="text-gray-700 leading-relaxed text-base">
                        {diagnosticoData.diagnostico}
                      </p>
                      <div className="prose prose-gray max-w-none mt-8">
                        <ul className="space-y-3">
                          {itemsPrecios.map((item, index) => (
                            <li
                              key={index}
                              className="text-gray-700 leading-relaxed"
                            >
                              <span>{item.item}</span> generalmente cuesta entre{" "}
                              <span className="text-gray-700">
                                ${item.precioMin.toLocaleString()} y $
                                {item.precioMax.toLocaleString()} COP
                              </span>{" "}
                              en {diagnosticoData.city || "Colombia"}.
                            </li>
                          ))}
                        </ul>
                      </div>
                    </section>

                    {/* ================= CAUSAS ================= */}
                    {diagnosticoData.causas.length > 0 && (
                      <section id="causas" className="scroll-mt-20">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          Causas probables del problema
                        </h2>

                        <div className="space-y-3">
                          {diagnosticoData.causas.map((item, index) => (
                            <div
                              key={index}
                              className="flex gap-3 text-gray-700 leading-relaxed"
                            >
                              <span className="text-blue-600 font-medium flex-shrink-0">
                                •
                              </span>
                              <p>{item}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* ================= SOLUCIONES ================= */}
                    {diagnosticoData.soluciones.length > 0 && (
                      <section id="soluciones" className="scroll-mt-20">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          Soluciones recomendadas
                        </h2>

                        <div className="space-y-4">
                          {diagnosticoData.soluciones.map((item, index) => (
                            <div
                              key={index}
                              className="flex gap-3 text-gray-700 leading-relaxed"
                            >
                              <span className="text-gray-400 font-medium flex-shrink-0">
                                {index + 1}.
                              </span>
                              <p>{item}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* ================= FAQ ================= */}
                    {diagnosticoData.faqs.length > 0 && (
                      <section id="faqs" className="scroll-mt-20">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          Preguntas frecuentes
                        </h2>

                        <div className="space-y-6">
                          {diagnosticoData.faqs.map((item, index) => (
                            <div
                              key={index}
                              className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0"
                            >
                              <h3 className="font-semibold text-gray-900 mb-2 leading-relaxed">
                                {item.q}
                              </h3>
                              <p className="text-gray-700 leading-relaxed">
                                {item.a}
                              </p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                    {/* Precios */}
                    {tienePreciosValidos && (
                      <section id="precios">
                        <div className="flex items-center gap-2 mb-4">
                          <h2 className="text-xl font-semibold text-gray-900">
                            Costo estimado reparacion {diagnosticoData.car_make}{" "}
                            {diagnosticoData.car_model}{" "}
                            {diagnosticoData.car_year}:
                          </h2>
                        </div>

                        <div className="space-y-3 mb-6">
                          {itemsPrecios.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-start py-3 border-b border-gray-100 last:border-b-0"
                            >
                              <div className="flex-1 pr-4">
                                <h3 className=" text-gray-900 leading-relaxed">
                                  {item.item}
                                </h3>
                              </div>
                              <div className="text-right">
                                <p className=" text-gray-900 whitespace-nowrap  font-semibold">
                                  ${item.precioMin.toLocaleString()} - $
                                  {item.precioMax.toLocaleString()}
                                </p>
                                <div className="text-xs text-gray-500">COP</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-4 border-t-2 border-gray-200">
                          <div className="text-center py-3">
                            <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-medium">
                              Mínimo
                            </div>
                            <div className="text-xl font-bold text-gray-900">
                              ${precioTotalMin.toLocaleString()}
                            </div>
                          </div>
                          <div className="text-center py-3 bg-blue-50 rounded-lg">
                            <div className="text-xs text-blue-600 mb-1 font-semibold uppercase tracking-wide">
                              Promedio
                            </div>
                            <div className="text-xl font-bold text-blue-600">
                              ${precioPromedio.toLocaleString()}
                            </div>
                          </div>
                          <div className="text-center py-3">
                            <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-medium">
                              Máximo
                            </div>
                            <div className="text-xl font-bold text-gray-900">
                              ${precioTotalMax.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 text-xs text-gray-600 bg-gray-50 px-4 py-3 rounded-lg mt-4">
                          <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <p className="leading-relaxed">
                            Los precios son referenciales y pueden variar según
                            el taller y la ubicación.
                          </p>
                        </div>
                      </section>
                    )}

                    {/* Recomendación */}
                    <aside className="border-l-4 border-amber-400 bg-amber-50 px-5 py-4 rounded-r-lg ">
                      <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            Recomendación importante
                          </h3>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            Este diagnóstico es orientativo. Para mayor
                            precisión, visita un taller especializado.
                          </p>
                        </div>
                      </div>
                    </aside>
                  </article>

                  {/* Right Sidebar */}
                  <aside className="lg:col-span-4 order-3">
                    <div className="lg:sticky lg:top-6 space-y-6">
                      {/* Información del vehículo */}
                      <div className="bg-white rounded-xl p-5 border border-gray-200 overflow-hidden">
                        {/* Logo de la marca */}
                        <div className="flex justify-center mb-5 pb-5 border-b border-gray-100">
                          <div className="relative w-20 h-20 flex items-center justify-center">
                            <img
                              src={`/${diagnosticoData.car_make}.webp`}
                              alt={`Logo de ${diagnosticoData.car_make} ${diagnosticoData.car_model}`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>

                        <h3 className="text-sm font-semibold text-gray-900 mb-4">
                          Información del vehículo
                        </h3>
                        <dl className="space-y-3 text-sm">
                          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                            <dt className="text-gray-600">Marca</dt>
                            <dd className="text-gray-900 font-semibold">
                              {diagnosticoData.car_make}
                            </dd>
                          </div>
                          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                            <dt className="text-gray-600">Modelo</dt>
                            <dd className="text-gray-900 font-semibold">
                              {diagnosticoData.car_model}
                            </dd>
                          </div>
                          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                            <dt className="text-gray-600">Año</dt>
                            <dd className="text-gray-900 font-semibold">
                              {diagnosticoData.car_year}
                            </dd>
                          </div>
                          {diagnosticoData.city && (
                            <div className="flex justify-between items-center ">
                              <dt className="text-gray-600">Ubicación</dt>
                              <dd className="text-gray-900 font-semibold">
                                {diagnosticoData.city}
                              </dd>
                            </div>
                          )}
                        </dl>
                        {diagnosticoData.servicios &&
                          diagnosticoData.servicios.length > 0 && (
                            <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-3">
                              {diagnosticoData.servicios.map(
                                (servicio, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100 hover:bg-blue-100 transition-colors"
                                  >
                                    {servicio}
                                  </span>
                                ),
                              )}
                            </div>
                          )}
                      </div>

                      {/* CTA Talleres */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Clock className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">
                              ¿Necesitas un taller?
                            </h3>
                            <p className="text-xs text-gray-700 leading-relaxed">
                              Encuentra talleres especializados cerca de ti.
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => router.push("/talleres")}
                          className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Buscar talleres
                        </button>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterV2 />
    </>
  );
}
