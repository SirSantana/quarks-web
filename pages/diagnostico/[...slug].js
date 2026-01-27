import { useState } from "react";
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
} from "lucide-react";
import Head from "next/head";
import FooterV2 from "@/src/Components/Footer/FooterV2";
import Header from "@/src/Components/LandingPage/HeaderDiagnostico";

/* =======================
   STATIC GENERATION
======================= */

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
        notFound: true,
      };
    }

    const data = await res.json();

    return {
      props: {
        diagnosticoData: data,
      },
      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

/* =======================
   PAGE COMPONENT
======================= */

export default function ResultadosPage({ diagnosticoData }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-gray-500">Cargando diagnóstico...</p>
        </div>
      </div>
    );
  }

  const problema = diagnosticoData.mensaje_usuario?.replace(/["']/g, "");
  const title = `${problema} `;
  const description = ` ${problema}. Descubre causas, diagnóstico profesional y costos de reparación para tu ${diagnosticoData.car_make} ${diagnosticoData.car_model} ${diagnosticoData.car_year} en ${diagnosticoData.country || "Colombia"}.`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}/diagnostico/${router.query.slug}`;

  const problemasRelacionados = [
    {
      slug: "mi-carro-no-arranca-en-frio",
      title: "Mi carro no arranca en frío",
    },
    {
      slug: "el-motor-vibra-al-ralenti",
      title: "El motor vibra al ralentí",
    },
    {
      slug: "frenos-hacen-ruido-al-frenar",
      title: "Los frenos hacen ruido al frenar",
    },
    {
      slug: "bateria-se-descarga-rapido",
      title: "La batería se descarga rápido",
    },
  ];

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

  console.log(diagnosticoData);

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
        <meta
          property="og:site_name"
          content="Quarks - Diagnóstico Automotriz"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        {/* Schema.org - FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: {
                "@type": "Question",
                name: problema,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: diagnosticoData.diagnostico,
                },
              },
            }),
          }}
        />
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
                    onClick={() => router.push('/diagnosticos')}
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
                  <article className="lg:col-span-8 space-y-20 ">
                    {/* Síntoma */}
                    <section>
                      <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-3">
                        Síntoma reportado
                      </h2>
                      <blockquote className="text-lg text-gray-800 leading-relaxed border-l-4 border-blue-600 pl-5 italic">
                        {diagnosticoData.mensaje_usuario}
                      </blockquote>
                    </section>

                    {/* Diagnóstico */}
                    <section>
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

                    {/* Precios */}
                    {tienePreciosValidos && (
                      <section>
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
