import styles from '@/styles/Aplicacion.module.css'
import Head from 'next/head'



export default function Aplicacion() {
  return (
    <>
      <Head>
        <title>Quarks - Aplicacion</title>
        <meta name="description"  />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.png" />
        <meta property="og:title" content='Cotiza tus repuestos | Quarks' key="title" />
        <meta property='og:description' />
        <meta property='og:site_name' content='Quarks' />
        <meta property='og:url' content='https://quarks.com.co' />
        <meta name="keywords" content={'Repuestos para vehiculos. Almacenes de repuestos en bogota. Repuestos bogota. Repuestos para chevrolet. Repuestos de Renault. Autopartes para carros. Cientos de cotizaciones de autopartes para carros. Cotizar repuestos Colombia. Repuestos chevrolet colombia. Repuestos chevrolet renault. Repuestos chevrolet mazda. Repuestos chevrolet ford'} />

        <meta name="google-site-verification" content="O_W8kGCJz8lwIupFfTJjUS4z3M7xEh24pXVJQAyvVw0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <main>
        <section className={styles.home}  >
          <div style={{ width: '70%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '400px' }}>
            <div style={{ width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', }}>
              {/* <div>
              <div style={{ width: '55%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className={styles.subtitle2}>Inicio</p>
                <p className={styles.subtitle2}>Gastos</p>
                <p className={styles.subtitle2}>Recordatorios</p>
                <p className={styles.subtitle2}>Premium</p>
              </div>
              <div style={{ width: '70%', height: '1px', backgroundColor: '#5B0221', margin: '10px 0 20px 0' }} />
            </div> */}
              <h1 className={styles.title}>Controla <br /> tus <b style={{ color: '#5B0221' }}>gastos y mantenimientos</b></h1>
              <p className={styles.subtitle}>Sabias que llevar un control de gastos y mantenimientos te ayuda a ahorrar hasta un 19%. No esperes mas y descarga la app gratis! </p>
              <a href='https://play.google.com/store/apps/details?id=com.quarks.vehiculo'>
                <img src='/playstore.png' style={{ width: '150px', height: '60px', cursor: 'pointer' }} />

              </a>

            </div>
            <img src='/app.png' style={{ width: '300px', height: '550px' }} />

          </div>

        </section>



      </main>


    </>

  )
}