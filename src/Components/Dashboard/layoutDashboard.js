import MenuHeader from "@/src/Components/Dashboard/MenuHeader";
import Footer from "@/src/Components/Footer/Footer";
import Head from "next/head";
import styles from '@/styles/Dashboard.module.css'


export default function LayoutDashboard({ children, title, description, type, price, keywords }) {
  return (
    <>

      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta name="keywords" content={'Repuestos para vehiculos. Almacenes de repuestos en bogota. Repuestos bogota. Repuestos para chevrolet. Repuestos de Renault. Autopartes para carros. Cientos de cotizaciones de autopartes para carros. Cotizar repuestos Colombia. Repuestos chevrolet colombia. Repuestos chevrolet renault. Repuestos chevrolet mazda. Repuestos chevrolet ford'} />
        <meta property="og:title" content={title} key="title" />
        <meta property='og:description' content={description} />
        <meta property='og:type' content={type} />
        <meta property='og:site_name' content='Quarks' />
        <meta property='og:url' content='https://quarks.com.co' />
        <meta property="product:price:currency" content="COP" />
        <meta name="google-site-verification" content="O_W8kGCJz8lwIupFfTJjUS4z3M7xEh24pXVJQAyvVw0" />
        <link rel="icon" href="/Logo.png" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" type="text/css"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet" />
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/gsap.min.js"></script>
      </Head>
      <main >
        <div className={styles.containerHeaderChildren}>
          <MenuHeader />
          {children}
        </div>

        <Footer />
      </main>
    </>

  )
}