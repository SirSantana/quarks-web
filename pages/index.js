import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Navbar from '@/src/Components/Navbar/Navbar'
import Main from '@/src/Components/Main/Main'
import HomeSection from '@/src/Components/Home/Home'
import PasosCotizacion from '@/src/Components/Home/PasosCotizacion'
import Beneficios from '@/src/Components/Home/Beneficios'
import Footer from '@/src/Components/Footer/Footer'


export default function Home() {
  let description = 'Repuestos automotores para tu carro en colombia, encuentra los repuestos para tu vehiculo, cotiza con decenas de vendedores tus partes.Repuestos de carros en bogota.Repuestos para chevrolet en bogota. Repuestos para carros en colombia Cotiza ya!'
  return (
    <>
      <Head>
        <title>Quarks - Cotiza tus repuestos</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.png" />
        <meta property="og:title" content={'Repuestos de carro'} key="title" />
        <meta property='og:description' content={'Cotiza tus autopartes para tu vehiculo'} />
        <meta property='og:site_name' content='Quarks' />
        <meta property='og:url' content='https://quarks.com.co' />
        <meta name="keywords" content={'Repuestos para vehiculos. Almacenes de repuestos en bogota. Repuestos bogota. Repuestos para chevrolet. Repuestos de Renault. Autopartes para carros. Cientos de cotizaciones de autopartes para carros. Cotizar repuestos Colombia. Repuestos chevrolet colombia. Repuestos chevrolet renault. Repuestos chevrolet mazda. Repuestos chevrolet ford'} />
        
        <meta name="google-site-verification" content="O_W8kGCJz8lwIupFfTJjUS4z3M7xEh24pXVJQAyvVw0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <Main />
        <HomeSection />
        <PasosCotizacion />
        <Beneficios />
        <Footer />
      </main>
    </>
  )
}
