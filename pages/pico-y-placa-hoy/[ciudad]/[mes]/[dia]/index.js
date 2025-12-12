import Layout from "@/src/Components/Layout";
import picoyplaca from '@/pages/picoyplaca.json'
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from '@/styles/PicoYPlaca.module.css'
const BuscadorBasico = dynamic(() => import("@/src/Components/LandingPage/BuscadorBasico"), { ssr: false });
const TitleHomeAnimation = dynamic(() => import("@/src/Components/LandingPage/TitleHomeAnimation"), { ssr: false });

let horariosCiudades = {
  "medellin": {
    dias: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    horarios: ['05:00', '20:00']
  },
  "bogota": {
    dias: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    horarios: ['06:00', '21:00']
  },
  "bucaramanga": {
    dias: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    horarios: ['06:00', '20:00']
  },
}

let ciudades = {
  'bogota': 'Bogotá',
  'medellin': 'Medellín',
  'bucaramanga': 'Bucaramanga',
}

const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

export default function PicoYPlaceHoyBogota({ data }) {
  const router = useRouter()
  const numeroMes = meses.indexOf(router.query.mes);
  let date = new Date(data?.fecha)
  console.log(numeroMes, router.query);
  
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["WebPage", "NewsArticle"],
    "headline": `Pico y Placa ${ciudades[router.query.ciudad]} Hoy ${data?.titulo?.replaceAll('-', ' ')}: Placas con Restricción y Horarios`,
    "name": `Pico y Placa ${ciudades[router.query.ciudad]} ${data?.titulo?.replaceAll('-', ' ')}`,
    "description": `Consulta la información oficial y actualizada sobre el Pico y Placa en ${ciudades[router.query.ciudad]} hoy ${data?.titulo?.replaceAll('-', ' ')}. Horarios, excepciones, multas y consejos para cumplir con la normativa.`,
    "url": `https://quarks.com.co/pico-y-placa-hoy/${router.query.ciudad?.toLowerCase()}/${router.query.mes?.toLowerCase()}/${data?.fechaFormat.toLowerCase()}`,
    "mainEntity": [{
      "@type": "HowTo",
      "name": `Cómo saber si tu vehiculo tiene restriccion de Pico y Placa en ${ciudades[router.query.ciudad]} el ${data?.titulo?.replaceAll('-', ' ').replace('Hoy', ' ')}`,
      "step": [{
        "@type": "HowToStep",
        "text": "Identifica el último dígito de tu placa"
      }, {
        "@type": "HowToStep",
        "text": "Consulta el calendario de restricciones"
      }, {
        "@type": "HowToStep",
        "text": "Verifica si tu vehículo está exento"
      }]
    }, {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `¿Cómo funciona el Pico y Placa en ${ciudades[router.query.ciudad]} hoy ${data.titulo?.replaceAll('-', ' ')}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `El Pico y Placa hoy ${data.titulo?.replaceAll('-', ' ')} funcionara de la siguiente manera: Los vehiculos particulares con placas terminadas en ${data.placas} podrán circular ${data.placas !== 'NO APLICA' && 'desde las ' + data.horario}. El pico y placa es una medida que restringe la circulación de vehículos según el último dígito de su placa en determinados días y horarios.`
          }
        },
        {
          "@type": "Question",
          "name": `Pico y Placa ${data.titulo?.replaceAll('-', ' ')} ${ciudades[router.query.ciudad]}`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Las restriccion de Pico y Placa para el dia ${data.titulo?.replaceAll('-', ' ')} en ${router.query.ciudad} seran: Vehiculo con placas terminadas en ${data.placas} podran circular. Consulta el calendario de restricciones para obtener la información actualizada.`
          }
        },
      ]
    }],
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [horariosCiudades[router.query.ciudad]?.dias],
      "opens": horariosCiudades[router.query.ciudad]?.horarios[0],
      "closes": horariosCiudades[router.query.ciudad]?.horarios[1],
    }],
    "datePublished": `${new Date(data.fecha).toISOString()}`,
    "dateModified": `${new Date().toISOString()}`,
    "author": {
      "@type": "Organization",
      "name": "Quarks Automotriz"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Quarks Automotriz",
    }
  };

  return (
    <Layout 
      picoyplacaStructured={structuredData} 
      title={`Pico y Placa ${ciudades[router.query.ciudad]} Hoy ${data?.titulo?.replaceAll('-', ' ')}`} 
      url={`${router.asPath}`} 
      icon={'/pico-y-placa.png'} 
      image={'./pico-y-placa.png'} 
      description={`Pico y Placa ${ciudades[router.query.ciudad]} hoy, ${data?.titulo?.replaceAll('-', ' ')}. Consulta el calendario, horario y las placas con restricción de carros particulares y taxis. Conoce las multas y excepciones de la medida. Información oficial y actualizada para planificar tu movilidad urbana en ${ciudades[router.query.ciudad]}.`}
      fecha={new Date(data?.fecha).toISOString()} 
      lastModified={new Date(data?.fecha).toGMTString()}
    >
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
             Pico y Placa {router.query.ciudad} Hoy {data?.titulo.replaceAll('-', ' ')}
            </h1>
            <div className="inline-flex flex-col items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
             
              <time 
                dateTime={new Date(data?.fecha).toISOString()} 
                className="text-sm text-gray-400"
              >
                {date.toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
          </div>
        </section>

        {/* Main Placa Card - Con fondo amarillo completo */}
        <section style={{alignSelf:'center', margin:'0 auto'}} className={styles.containerPlaca}>
          <div style={{ backgroundColor: 'transparent', border: '5px solid black', borderRadius: '10px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
            {/* {data?.placas !== 'NO APLICA'
              &&
              <p className={styles.textOne}>Pueden circular vehiculos con placas terminadas en:</p>
            } */}
            {data?.especial
              ?
              <div className={styles.containerPlacasEspecial}>
                <article style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <p className={styles.placas2}>{data?.placas[0]}</p>
                  <p className={styles.horario2}>{data?.horario[0]}</p>
                </article>
                <div style={{ height: '80%', backgroundColor: 'black', width: '5px', margin: '0 auto' }} />
                <article style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <p className={styles.placas2}>{data?.placas[1]}</p>
                  <p className={styles.horario2}>{data?.horario[1]}</p>
                </article>
              </div>
              :
              <>
                <p className={styles.placas}>{data?.placas} </p>
                {/* {data?.placas !== 'NO APLICA'
                  &&
                  <p className={styles.horario}>{data?.horario}</p>
                } */}
              </>

            }
          </div>
        </section>
        {/* Pico y Placa Hoy Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">Pico y Placa Hoy</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Pico y placa hoy {data?.fechaFormat.replaceAll('-', ' ')} en {ciudades[router.query.ciudad]}, {data?.ciudad ? 'NO ' : ''}podrán circular vehiculos con placas terminadas en <span className="font-semibold text-gray-900">{data?.placas}</span>{data?.placas !== 'NO APLICA' && ', desde las ' + data?.horario}.
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <TitleHomeAnimation />
            <div className="mt-8">
              <BuscadorBasico />
            </div>
          </div>
        </section>

        {/* Calendar Link with mini card */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Conoce el pico y placa del mes de {router.query.mes.replaceAll('-', ' ')}
            </h3>
            <div 
              onClick={() => router.push(`/pico-y-placa-hoy/${router.query.ciudad}/${router.query.mes}`)}
              className="inline-block cursor-pointer transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className="bg-gradient-to-br from-yellow-400 to-amber-400 rounded-2xl border-4 border-gray-900 p-8 w-80 shadow-lg">
                <h4 className="text-4xl font-black text-gray-900 tracking-wider text-center">
                  Pico y Placa
                </h4>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Image */}
        <section className="py-0 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                loading='lazy' 
                src={'/pico y placa banner.jpg'} 
                alt={`Pico y placa ${ciudades[router.query.ciudad]} ${data?.titulo.replaceAll('-', ' ')}`} 
                width={800} 
                height={400} 
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Pico y Placa Details */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">Pico y Placa</h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Conoce el Pico y Placa en {ciudades[router.query.ciudad]} para este {data?.titulo.replaceAll('-', ' ')}
            </p>
            
            <div className="bg-gray-50 rounded-3xl p-8 sm:p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Pico y Placa Carros Particulares:</h3>
              {data?.placas === 'NO APLICA' ? (
                <p className="text-xl text-gray-600">
                  Hoy {data?.fechaFormat.replaceAll('-', ' ')} <span className="font-semibold text-green-600">NO hay restricciones.</span>
                </p>
              ) : data?.especial ? (
                <p className="text-xl text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-900">{data?.ciudad ? 'NO ' : ''}Podrán</span> circular las placas terminadas en <span className="font-semibold text-gray-900">{data?.placas[0]}</span> de <span className="font-semibold text-gray-900">Horario:</span> {data?.horario[0]} y las placas terminadas en <span className="font-semibold text-gray-900">{data?.placas[1]}</span> de <span className="font-semibold text-gray-900">Horario:</span> {data?.horario[1]}
                </p>
              ) : (
                <p className="text-xl text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-900">{data?.ciudad ? 'NO ' : ''}Podrán</span> circular las placas terminadas en <span className="font-semibold text-gray-900">{data?.placas}</span> de <span className="font-semibold text-gray-900">Horario:</span> {data?.horario}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Reglas y Horarios Detallados */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-10">
              Reglas y Horarios Detallados del Pico y Placa en {ciudades[router.query.ciudad]}
            </h2>
            <p className="text-xl text-gray-600 mb-16 leading-relaxed">
              La medida de Pico y Placa en {ciudades[router.query.ciudad]} busca mejorar la <strong>movilidad urbana</strong> y reducir la congestión vehicular, especialmente en <strong>hora pico</strong>. Es crucial conocer las reglas para evitar sanciones.
            </p>

            <div className="space-y-16">
              <div className="relative pl-8 border-l-4 border-gray-200">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  ¿Cuál es el horario del Pico y Placa hoy en {ciudades[router.query.ciudad]}?
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Para el día de <strong>{data?.titulo?.replaceAll('-', ' ')}</strong>, la restricción aplica de <strong>{horariosCiudades[router.query.ciudad]?.horarios[0]} a {horariosCiudades[router.query.ciudad]?.horarios[1]}</strong>. Recuerda que este horario es fijo de lunes a viernes y aplica a vehículos particulares. Verifica las restricciones específicas para el último dígito de tu placa: <strong>{data?.placas}</strong>.
                </p>
              </div>

              <div className="relative pl-8 border-l-4 border-gray-200">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  Multas y Sanciones por Incumplimiento
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Si circulas en <strong>horario de Pico y Placa</strong> con un vehículo restringido, te expones a una sanción. El Código Nacional de Tránsito Terrestre (CNTT), en su artículo 131 (infracción <strong>C14</strong>), establece una multa económica por el incumplimiento de la restricción, además de la inmovilización del vehículo en algunos casos. Consulta el <strong>valor actualizado de la multa por Pico y Placa</strong> para {ciudades[router.query.ciudad]}.
                </p>
              </div>

              <div className="relative pl-8 border-l-4 border-gray-200">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  Excepciones y Permisos Especiales
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Existen algunas <strong>excepciones al Pico y Placa</strong> en {ciudades[router.query.ciudad]}. Los vehículos híbridos, eléctricos, o aquellos que hayan solicitado el <strong>Pico y Placa Solidario</strong> (en ciudades donde aplica como Bogotá) pueden circular sin restricción. Si tu vehículo tiene una placa terminada en <strong>{data?.placas}</strong> y necesitas circular, verifica si cumples con los requisitos para obtener un permiso especial y legal.
                </p>
              </div>

              <div className="relative pl-8 border-l-4 border-gray-200">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  Pico y Placa Mañana en {ciudades[router.query.ciudad]}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  ¿Quieres saber la restricción para el <strong>Pico y Placa mañana</strong> en {ciudades[router.query.ciudad]}? Planifica tu ruta con anticipación. Generalmente, el sistema de rotación es consecutivo. Te invitamos a consultar nuestro <strong>calendario completo del Pico y Placa del mes de {meses[numeroMes]}</strong> para ver la rotación de placas y horarios.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pico y Pl Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">Pico y Pl</h2>
            <div className="space-y-6">
              <p className="text-xl text-gray-600 leading-relaxed">
                Descubre todo sobre el Pico y Placa en {ciudades[router.query.ciudad]}: restricciones, horarios y consejos para evitar multas y mejorar tu movilidad.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                Infórmate sobre las reglas y restricciones del Pico y Placa en {ciudades[router.query.ciudad]}. Evita sanciones y optimiza tus desplazamientos en la ciudad.
              </p>
            </div>
          </div>
        </section>

        {/* Hora Pico y Placa */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
              hora pico y placa {ciudades[router.query.ciudad]}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {data?.placas === 'NO APLICA' ? (
                'NO APLICA'
              ) : (
                <>
                  {data?.ciudad ? 'NO ' : ''}Podrán circular vehículos con restricción en el horario: <span className="font-semibold text-gray-900">{data?.horario}</span>
                </>
              )}
            </p>
          </div>
        </section>

        {/* Pico y Placa Ciudad Hoy */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
              pico y placa {ciudades[router.query.ciudad]} hoy
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {data?.placas === 'NO APLICA' ? (
                'NO APLICA'
              ) : (
                <>
                  {data?.ciudad ? 'NO ' : ''}Podrán circular vehículos con restricción en el horario: <span className="font-semibold text-gray-900">{data?.horario}</span>
                </>
              )}
            </p>
          </div>
        </section>

        {/* Pico y Placa Fecha Específica */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
              Pico y Placa {data?.titulo.replace(/^[^\-]+\s*\-\s*/g, '').replace(/\-/g, ' ')}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Vehiculos particulares con placas terminadas en <span className="font-semibold text-gray-900">{data?.placas}</span> {data?.ciudad ? 'NO ' : ''}podrán circular{data?.placas !== 'NO APLICA' && ' desde las ' + data?.horario}.
            </p>
          </div>
        </section>

        {/* Final Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Pico y Placa {ciudades[router.query.ciudad]} {data?.titulo.replace(/^[^\-]+\s*\-\s*/g, '').replace(/\-/g, ' ')}
              </h2>
            </div>
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Pico y Placa {ciudades[router.query.ciudad]} {data?.titulo.replaceAll('-', ' ')}
              </h2>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  let picoYplacaHoy;
  let yearQuery = params.mes.split('-')[1];
  let monthQuery = params.mes.split('-')[0];
  const mesIndex = meses.indexOf(monthQuery);

  if (!picoyplaca?.picoyplaca[yearQuery]?.[mesIndex]) {
    return {
      notFound: true,
    };
  }

  if (params.ciudad.toLowerCase() === 'bogota') {
    picoYplacaHoy = picoyplaca.picoyplaca[yearQuery][mesIndex].find(
      el => el.fechaFormat.toLowerCase() === String(params.dia).toLowerCase()
    );
  } else {
    const filteredByCity = picoyplaca.picoyplaca[yearQuery][mesIndex]?.filter(
      el => el.ciudad && el.ciudad.toLowerCase() === params.ciudad.toLowerCase()
    );
    picoYplacaHoy = filteredByCity?.find(
      el => el.fechaFormat.toLowerCase() === String(params.dia).toLowerCase()
    );
  }

  if (!picoYplacaHoy) {
    return {
      redirect: {
        destination: `/pico-y-placa-hoy/${params.ciudad}/${params.mes}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: picoYplacaHoy,
    },
    revalidate: 1000000, 
  };
}