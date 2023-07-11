import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Navbar from '@/src/Components/Navbar/Navbar'
import Main from '@/src/Components/Main/Main'
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
        <title>Mundo automotriz | Quarks automotriz</title>
        <meta name="description" content={"Articulos referentes al mundo automotriz, explicado de una manera clara y sencilla para todos"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />        <link rel="icon" href="/Logo.png" />
        <meta property="og:title" content='Mundo automotriz | Quarks automotriz' key="title" />
        <meta property='og:description' content={"Articulos referentes al mundo automotriz, explicado de una manera clara y sencilla para todos"} />
        <meta property='og:site_name' content='Quarks' />
        <meta property='og:url' content='https://quarks.com.co' />
        {/* <meta name="keywords" content='repuestos de carros en bogota, repuestos de carros en colombia, donde cotizar repuestos para carro, repuestos de carros 7 de agosto, partes de carros en bogota, amortiguadores para carro en bogota, suspension de carros en bogota, suspension de carros en colombia,suspension para carros en colombia, partes de motor para carros en bogota, ' /> */}
        <link rel="icon" href="/logoquarks200623.png" />

        <meta name="google-site-verification" content="O_W8kGCJz8lwIupFfTJjUS4z3M7xEh24pXVJQAyvVw0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1233996863721897"
          crossorigin="anonymous"></script>
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
        <Main />
        <ServiciosPopulares />
        
        <TalleresRecomendados/>
        
        
        {/* <TalleresRecomendados/> */}



        <Footer />

      </main>
    </>
  )
}
