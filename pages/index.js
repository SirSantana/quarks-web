import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { options } from '@/src/Components/Main/Main'
import Footer from '@/src/Components/Footer/Footer'
import ListTalleresLanding from '@/src/Components/LandingPage/ListTalleresLanding'
import SectionVariedadTalleres from '@/src/Components/LandingPage/Section1'
import SectionCotizaciones from '@/src/Components/LandingPage/Section2'
import SectionGlosario from '@/src/Components/LandingPage/Section3'
import SectionPasos from '@/src/Components/LandingPage/Section4'
import NewNavbarWithSearch from '@/src/Components/Navbar/NewNavbar2'
import dynamic from 'next/dynamic'
import talleres from '@/pages/servicios-automotriz/talleres.json'
import { useState } from 'react'
import SectionTalleresServicios from '@/src/Components/LandingPage/SectionTalleresServicios'
import SectonFilters from '@/src/Components/LandingPage/SectionFilters'

import Button, { ButtonSize, ButtonVariant } from '@/src/Components/Button/Button'
import { IconCatalog } from '@/src/Components/Icon/Icon'
import Text, { TextAs, TextTone, TextWeight } from '@/src/Components/Text/Text'
import { useRouter } from 'next/router'
import { categorias } from '@/src/Components/LandingPage/SliderTiposTalleres'

// const SectonFilters = dynamic(() => import('@/src/Components/LandingPage/SectionFilters'),
//   { ssr: false })
const SectionGrowthTaller = dynamic(() => import('@/src/Components/LandingPage/SectionGrowthTaller'),
  { ssr: false })
const SectionCalculadoraCombustible = dynamic(() => import('@/src/Components/LandingPage/Section5'),
  { ssr: false })
const ActividadReciente = dynamic(() => import('@/src/Components/LandingPage/ActividadReciente'),
  { ssr: false })
const Map = dynamic(
  () => import('@/src/Components/LandingPage/Mapa'), // replace '@components/map' with your component's location
  { ssr: false, loading: () => <div className={styles.skeleton} /> } // This line is important. It's what prevents server-side render
)
const tagsFix = [
  'talleres abiertos hoy cerca de mi',
  'taller mecánico 24 horas cerca de mi',
  'paginas web de talleres mecanicos',
  'taller mecanicos cerca de mi',
  'taller de reparacion de automoviles',
  'talleres de carro',
  'mecanico cerca de mi',
  'taller automotriz cerca de mi',
  'talleres abiertos hoy cerca de mi',
  'taller de coches cerca de mi',
  'mecanico cerca',
  'taller de coches',
  'talleres abiertos hoy',
  'talleres de carros cerca de mi',
  'taller coche',
  'talleres de autos cerca de mi',
  'taller coches cerca de mi',
  'taller mecanico cerca',
  'servicio mecanico cerca de mi',
  'talleres mecánicos cerca de mi',
  'taller hispano cerca de mí',
  'taller mecanico abierto cerca de mi',
  'taller de mantenimiento automotriz',
  'taller mecanico chevrolet',
  'talleres automotrices cerca de mi',
  'talleres de carro cerca de mi',
  'mejor taller mecanico cerca de mi',
  'talleres cerca de mi abiertos',
  'taller de servicio automotriz',
  'talleres abiertos cerca de mí',
  'taller automotor',
  'taller mecanico cerca de mi abierto hoy',
  'un mecanico cerca de mi',
  'taller automotriz 24 horas',
  'taller mecanico abierto',
  'taller mantenimiento automotriz',
  'talleres abiertos los domingos',
  'paginas de talleres mecanicos',
  'talleres mecánicos abiertos hoy',
  'mecanico cerca de mi ubicacion',
  'buenos mecanicos',
  'el mejor taller mecanico',
  'empresas de talleres mecánicos',
  'los mejores talleres mecanicos',
  'mecanicos abiertos cerca de mi',
  'mecánicos cerca de aquí',
  'mejor taller automotriz',
  'promociones de talleres automotrices',
  'promociones en talleres mecanicos',
  'promociones de taller mecanico',
  'promociones taller mecanico',
  'servicio taller mecanico',
  'taller automecanica',
  'taller automotriz cerca',
  'taller automotriz chevrolet',
  'taller coches abierto hoy',
  'taller de carros 24 horas',
  'taller de coche abierto hoy',
  'taller de coches cerca',
  'taller de coches más cercano',
  'taller de diagnostico automotriz',
  'taller de reparacion automotriz',
  'taller de reparación de coches',
  'taller diagnostico automotriz',
]
export default function Home({ data, iconImg }) {
  const [mode, setMode] = useState(0)
  const { query } = useRouter()
  // const iconImg = categorias?.find(cat => cat.nombre?.replace(/-/g, ' ').normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase() == query?.servicio?.replace(/-/g, ' ').toLocaleLowerCase())
  let title = query?.servicio ? `Talleres de clutch en Bogota` : 'Talleres mecanicos automotrices de Bogotá'
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`Encuentra los mejores talleres de carros con reseñas de usuarios y recomendaciones en Bogota. Taller automotriz de Servicios de ${options?.map(el => " " + el.value)}`} />
        <meta name="keywords" content={"talleres de carros, reparación de automóviles, mantenimiento vehicular, servicio automotriz, mecánica automotriz, taller especializado, mecánico de confianza, repuestos y accesorios, diagnóstico automotriz, servicio de frenos, cambio de aceite, alineación y balanceo, sistema de suspensión, electricidad automotriz, servicio de carrocería, taller de chapa y pintura, cambio de llantas, sistema de escape, servicio de aire acondicionado, talleres en bogota, bogota, colombia, taller carro, talleres de carros"} />
        <meta name='robots' content='follow, index, max-image-preview:large' />
        <meta name='bingbot' content='follow, index' />
        <meta name='GOOGLEBOT' content='follow, index' />
        <meta name='language' content='es' />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@quarks-automotriz" />
        <meta name="twitter:creator" content="@quarks-automotriz" />
        <meta name="twitter:title" content={"Directorio de Talleres de carros en Bogotá "} />
        <meta name="twitter:image" content={'https://azurequarks.blob.core.windows.net/negocios/bannertalleresquarks.png'} />
        <meta name="url" content={`https://www.quarks.com.co/`} />
        <meta property="url" content={`https://www.quarks.com.co/`} />

        <meta property="twitter:description" content={`Encuentra los mejores talleres con reseñas de usuarios y recomendaciones en Bogota. Servicios de ${options?.map(el => " " + el.value)}`} />
        <meta property="og:title" content={"Los mejores Talleres mecanicos de carros en Bogotá "} key="title" />
        <meta property="og:image" content={'https://azurequarks.blob.core.windows.net/negocios/bannertalleresquarks.png'} />
        <meta property="og:image:url" content={'https://azurequarks.blob.core.windows.net/negocios/bannertalleresquarks.png'} />
        <meta property='og:description' content={`Encuentra los mejores talleres con reseñas de usuarios y recomendaciones en Bogota. Servicios de ${options?.map(el => " " + el.value)}`} />
        <meta property='og:url' content={`https://www.quarks.com.co/`} />


        <meta property='og:locale' content='es_CO' />
        <meta property='og:locale:alternate' content='es_CO' />
        <meta property='og:site_name' content='Quarks' />
        <meta property="og:image:width" content='1080' />
        <meta property="og:image:height" content='1080' />
        <meta property="og:image:type" content='image/png' />

        <meta name="google-site-verification" content="O_W8kGCJz8lwIupFfTJjUS4z3M7xEh24pXVJQAyvVw0" />
        <link rel="icon" href={'/logoquarks200623.png'} />

        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1233996863721897"
          crossorigin="anonymous"></script>

        <script
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
      </Head>
      <main className={styles.main}>
        <NewNavbarWithSearch mode={mode} visibleSlider={true} />

        {mode
          ?
          <SectonFilters data={data.reverse()} />
          :
          <Map talleres={data} />
        }
        <SectionTalleresServicios />
        <ListTalleresLanding />

        <ActividadReciente />
        <SectionCotizaciones />
        <SectionVariedadTalleres />
        <SectionPasos />
        <SectionGrowthTaller />
        <SectionCalculadoraCombustible />
        <section  style={{ display: 'flex', margin: '0 auto', marginBottom: '64px', maxWidth: '900px', gap: '8px', width: '90%', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center' }}>
          {tagsFix.map(tag => (
            <p key={tag} style={{ fontSize: '14px', fontWeight: '500', padding: '4px 12px', border: '1px solid #c5c5c5', borderRadius: '16px', backgroundColor: 'white' }}>{tag}</p>
          ))}
        </section>
        <Button style={{
          zIndex: '1000',
          position: 'fixed',
          bottom: '50px', // Puedes ajustar esta propiedad para controlar la distancia desde la parte inferior
          left: '50%',
          transform: 'translateX(-50%)', // Centrar horizontalmente
        }} onClick={() => setMode(mode === 0 ? 1 : 0)} size={ButtonSize.sm} variant={ButtonVariant.secondary} icon={mode ? IconCatalog.mapa : IconCatalog.lista}>
          Mostrar {mode ? 'Mapa' : 'Lista'}
        </Button>

      </main>
      <Footer />

    </>
  )
}
export async function getServerSideProps({ query }) {
  const levenshteinDistance = (s1, s2) => {
    const m = s1.length;
    const n = s2.length;

    // Inicializar una matriz m × n con 0
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Llenar la matriz con los valores de distancia
    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        if (i === 0) {
          dp[i][j] = j;
        } else if (j === 0) {
          dp[i][j] = i;
        } else if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }
    }

    return dp[m][n];
  };
  const talleresFilter = talleres?.talleres.filter(taller => taller?.lat)
  let filter;
  if (query.servicio) {
    let categoriaNormalized = normalizeString(query.servicio.replace(/-/g, ' ').toLowerCase())
    filter = talleresFilter.filter(taller => taller?.categorias?.some(categoriaa =>
      categoriaa.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(categoriaNormalized.toLowerCase())) ||
      levenshteinDistance(taller.nombre.toLowerCase(), categoriaNormalized.toLowerCase()) < 10)
    const iconImg = categorias?.find(cat => cat.nombre?.replace(/-/g, ' ').normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase() == query?.servicio?.replace(/-/g, ' ').toLocaleLowerCase())
    return {
      props: {
        data: filter,
        iconImg: iconImg
      }
    }
  }
  function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  return {
    props: {
      data: talleresFilter,
    },
  }

}