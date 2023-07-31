import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Navbar from '@/src/Components/Navbar/Navbar'
import Main, { options } from '@/src/Components/Main/Main'
import HomeSection from '@/src/Components/Home/Home'
import PasosCotizacion from '@/src/Components/Home/PasosCotizacion'
import Beneficios from '@/src/Components/Home/Beneficios'
import Footer from '@/src/Components/Footer/Footer'
import { useEffect, useState } from 'react'
import HomeArticulos from '@/src/Components/Index/Home'
import NewNavbar from '@/src/Components/Navbar/NewNavbar'
import ServiciosPopulares from '@/src/Components/Main/ServiciosPopulares'
import TalleresRecomendados from '@/src/Components/Main/TalleresRecomendados'
import Link from 'next/link'
import SwiperAutopartes from '@/src/Components/Home/SwiperAutopartes'
import FirstScreen from '@/src/Components/LandingPage/FirstScreen'
import ListTalleresLanding from '@/src/Components/LandingPage/ListTalleresLanding'
import SectionVariedadTalleres from '@/src/Components/LandingPage/Section1'
import SectionCotizaciones from '@/src/Components/LandingPage/Section2'
import SectionGlosario from '@/src/Components/LandingPage/Section3'
import SectionGrowthTaller from '@/src/Components/LandingPage/SectionGrowthTaller'
import SectionPasos from '@/src/Components/LandingPage/Section4'
import ActividadReciente from '@/src/Components/LandingPage/ActividadReciente'



export default function Home() {
  const [limit, setLimit] = useState(0)

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     window.open('https://www.youtube.com/watch?v=8_pUpi4Ndcs')
  //     setLimit(limit +1)
  //     console.log(new Date().toLocaleTimeString())
  //   },720000)
  // },[limit])
  return (
    <>
      <Head>
        <title>Directorio de Talleres de carros en Bogotá </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`Encuentra los mejores talleres mecanicos con reseñas de usuarios y recomendaciones en Bogota. Servicios de ${options?.map(el=> " " + el.value)}`} />
        <meta name="keywords" content={"talleres de carros, reparación de automóviles, mantenimiento vehicular, servicio automotriz, mecánica automotriz, taller especializado, mecánico de confianza, repuestos y accesorios, diagnóstico automotriz, servicio de frenos, cambio de aceite, alineación y balanceo, sistema de suspensión, electricidad automotriz, servicio de carrocería, taller de chapa y pintura, cambio de llantas, sistema de escape, servicio de aire acondicionado, talleres en bogota, bogota, colombia"} />
        <meta name='robots' content='follow, index, max-image-preview:large' />
        <meta name='bingbot' content='follow, index' />
        <meta name='GOOGLEBOT' content='follow, index' />
        <meta name='language' content='spanish' />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@quarks-automotriz" />
        <meta name="twitter:creator" content="@quarks-automotriz" />
        <meta name="twitter:title" content={"Directorio de Talleres de carros en Bogotá "} />
        <meta name="twitter:image" content={"https://azurequarks.blob.core.windows.net/negocios/bannertalleresquarks.png"} />
        <meta name="url" content={`https://quarks.com.co`} />
        <meta property="url" content={`https://quarks.com.co`} />

        <meta property="twitter:description" content={`Encuentra los mejores talleres con reseñas de usuarios y recomendaciones en Bogota. Servicios de ${options?.map(el=> " " + el.value)}`} />
        <meta property="og:title" content={"Los mejores Talleres mecanicos de carros en Bogotá "} key="title" />
        <meta property="og:image" content={"https://azurequarks.blob.core.windows.net/negocios/bannertalleresquarks.png"} />
        <meta property="og:image:url" content={"https://azurequarks.blob.core.windows.net/negocios/bannertalleresquarks.png"} />
        <meta property='og:description' content={`Encuentra los mejores talleres con reseñas de usuarios y recomendaciones en Bogota. Servicios de ${options?.map(el=> " " + el.value)}`} />
        <meta property='og:url' content={`https://quarks.com.co/`} />

        <meta property='og:locale' content='es_CO' />
        <meta property='og:locale:alternate' content='es_CO' />
        <meta property='og:site_name' content='Quarks' />
        <meta property="og:image:width" content='1080' />
        <meta property="og:image:height" content='1080' />
        <meta property="og:image:type" content='image/png' />

        <meta name="google-site-verification" content="O_W8kGCJz8lwIupFfTJjUS4z3M7xEh24pXVJQAyvVw0" />
        <link rel="icon" href="/logoquarks200623.png" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" type="text/css"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1233996863721897"
          crossorigin="anonymous"></script>
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
      </Head>

      <main className={styles.main}>
        <Navbar />
        {/* <NewNavbar/> */}
        {/* <Main /> */}
        {/* <HomeSection /> */}
        {/* <PasosCotizacion /> */}
        {/* <Beneficios /> */}

        {/* <HomeArticulos/> */}
        <FirstScreen/>
        <ListTalleresLanding/>
        <ActividadReciente/>
        <SectionCotizaciones/>
        <SectionVariedadTalleres/>
        <SectionPasos/>
        <SectionGrowthTaller/>
        <SectionGlosario/>

        {/* <Main />
        <ServiciosPopulares /> */}

        {/* <TalleresRecomendados /> */}


        {/* <TalleresRecomendados/> */}



        <Footer />

      </main>
    </>
  )
}
