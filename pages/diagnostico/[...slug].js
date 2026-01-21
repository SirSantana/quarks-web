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
  TrendingUp,
  Info,
} from "lucide-react";
import Head from "next/head";

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
  const title = `${problema} - ${diagnosticoData.car_make} ${diagnosticoData.car_model} ${diagnosticoData.car_year} | Diagnóstico Automotriz`;
  const description = `Diagnóstico completo: ${problema}. Conoce las causas, costo estimado y recomendaciones para tu ${diagnosticoData.car_make} ${diagnosticoData.car_model} ${diagnosticoData.car_year}.`;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/diagnostico/${router.query.slug}`;

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

  if (diagnosticoData.precios && Array.isArray(diagnosticoData.precios)) {
    itemsPrecios = diagnosticoData.precios.map(item => {
      // Extraer números del string de precio usando regex
      const precioMatch = item.precio?.match(/(\d[\d,]*)\s*-\s*(\d[\d,]*)/);
      if (precioMatch) {
        const min = parseInt(precioMatch[1].replace(/,/g, ''));
        const max = parseInt(precioMatch[2].replace(/,/g, ''));
        return {
          item: item.item,
          precioMin: min,
          precioMax: max,
          precioOriginal: item.precio
        };
      }
      return null;
    }).filter(Boolean);

    // Calcular totales
    if (itemsPrecios.length > 0) {
      precioTotalMin = itemsPrecios.reduce((sum, item) => sum + item.precioMin, 0);
      precioTotalMax = itemsPrecios.reduce((sum, item) => sum + item.precioMax, 0);
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
        <meta property="og:site_name" content="Quarks - Diagnóstico Automotriz" />

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
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1233996863721897"
     crossorigin="anonymous"></script>
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
        <header className="border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <button
              onClick={() => router.back()}
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
                <strong>{diagnosticoData.car_make} {diagnosticoData.car_model}</strong>
                <span className="text-gray-500">({diagnosticoData.car_year})</span>
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

        {/* Main Layout */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Main Content - 2 columns */}
            <article className="lg:col-span-2 space-y-16">
              {/* Síntoma */}
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-4">
                  Síntoma reportado
                </h2>
                <blockquote className="text-lg sm:text-xl text-gray-800 leading-relaxed border-l-4 border-blue-600 pl-6">
                  {diagnosticoData.mensaje_usuario}
                </blockquote>
              </section>

              {/* Diagnóstico */}
              <section>
                <div className="flex items-center gap-2 mb-5">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Diagnóstico
                  </h2>
                </div>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {diagnosticoData.diagnostico}
                  </p>
                </div>
              </section>

              {/* Precios */}
              {tienePreciosValidos && (
                <section>
                  <div className="flex items-center gap-2 mb-5">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Costo estimado de reparación
                    </h2>
                  </div>

                  {/* Desglose de items */}
                  <div className="space-y-4 mb-8">
                    {itemsPrecios.map((item, index) => (
                      <div key={index} className="flex justify-between items-start py-4 border-b border-gray-100 last:border-b-0">
                        <div className="flex-1 pr-4">
                          <h3 className="text-sm font-medium text-gray-900 leading-relaxed">{item.item}</h3>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                            ${item.precioMin.toLocaleString()} - ${item.precioMax.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">COP</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totales */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 border-t-2 border-gray-200">
                    <div className="text-center py-4">
                      <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-medium">Total Mínimo</div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">
                        ${precioTotalMin.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center py-4 bg-blue-50 rounded-xl">
                      <div className="text-xs text-blue-600 mb-2 font-semibold uppercase tracking-wide">Promedio</div>
                      <div className="text-xl sm:text-2xl font-bold text-blue-600">
                        ${precioPromedio.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center py-4">
                      <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-medium">Total Máximo</div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">
                        ${precioTotalMax.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-gray-600 bg-gray-50 px-5 py-4 rounded-lg mt-6">
                    <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="leading-relaxed">
                      Los precios son estimados y pueden variar según el taller, 
                      la ubicación y las condiciones específicas del vehículo.
                    </p>
                  </div>
                </section>
              )}

              {/* Recomendación */}
              <aside className="border-l-4 border-amber-400 bg-amber-50 px-6 py-5 rounded-r-lg">
                <div className="flex gap-4">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Recomendación importante
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Este diagnóstico es orientativo basado en los síntomas descritos. 
                      Para una evaluación precisa, te recomendamos visitar un taller 
                      especializado que pueda inspeccionar tu vehículo directamente.
                    </p>
                  </div>
                </div>
              </aside>
            </article>

            {/* Sidebar - 1 column */}
            <aside className="space-y-8">
              {/* Problemas relacionados */}
              <nav className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
                  <Wrench className="w-4 h-4" />
                  Problemas relacionados
                </h3>
                <ul className="space-y-4">
                  {problemasRelacionados.map((item) => (
                    <li key={item.slug}>
                      <button
                        onClick={() => router.push(`/diagnostico/${item.slug}`)}
                        className="w-full text-left text-sm text-gray-700 hover:text-blue-600 transition-colors flex items-start gap-2 group"
                      >
                        <span className="text-gray-400 group-hover:text-blue-600 transition-colors mt-0.5">→</span>
                        <span className="leading-relaxed">{item.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Ayuda profesional */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      ¿Necesitas un taller?
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Encuentra talleres especializados cerca de ti y compara precios.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/talleres')}
                  className="w-full bg-blue-600 text-white text-sm font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Buscar talleres
                </button>
              </div>

              {/* Stats */}
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-5">
                  Sobre este diagnóstico
                </h3>
                <dl className="space-y-4 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <dt className="text-gray-600">Vehículo</dt>
                    <dd className="text-gray-900 font-medium">
                      {diagnosticoData.car_make}
                    </dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <dt className="text-gray-600">Modelo</dt>
                    <dd className="text-gray-900 font-medium">
                      {diagnosticoData.car_model}
                    </dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <dt className="text-gray-600">Año</dt>
                    <dd className="text-gray-900 font-medium">
                      {diagnosticoData.car_year}
                    </dd>
                  </div>
                  {diagnosticoData.city && (
                    <div className="flex justify-between py-2">
                      <dt className="text-gray-600">Ubicación</dt>
                      <dd className="text-gray-900 font-medium">
                        {diagnosticoData.city}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}