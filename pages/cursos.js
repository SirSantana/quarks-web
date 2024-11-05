import Button, { ButtonVariant } from "@/src/Components/Button/Button";
import Head from "next/head";
import Link from "next/link";


let title = 'Los mejores Cursos de Mecánica para motos y autos';
let description = 'Cursos de Mecanica para motos y autos, con los mejores profesionales de la industria, al mejor precio. Que esperas para aprender mecanica?';

let courses = [
  {
    title: 'Curso de Mecánica para motos',
    description: 'Un programa completo con más de 200 lecciones en formato de video FULL HD apoyado por imágenes ilustrativas y animaciones en 3D. ',
    image: 'https://static-media.hotmart.com/v5RuFfm21s91W4I8FHNWuvHcxv0=/300x300/smart/filters:format(webp):background_color(white)/hotmart/product_pictures/850c0f1b-7960-480d-96c9-e6e6c2f8228f/Mastersello20210325T113857768.jpg?w=920',
    url: 'https://go.hotmart.com/X96380501D?dp=1',
    calificacion:'4.4',
    cantidadReseñas:'105'
  },
  {
    title: 'Curso Osciloscopio Automotriz Completo',
    description: 'Más de 25 lecciones paso a paso que te convertirán en el técnico que domina esta herramienta clave para el diagnóstico automotriz moderno.  ',
    image: 'https://static-media.hotmart.com/t3UpTf0XbWDXw6AFWUUSMWQcJGo=/295x165/smart/filters:quality(100)/hotmart/product_pictures/5448745e-e53d-419c-938d-22fca56106bc/CajitaOsciloscopio.png',
    url: 'https://automotrizenvideo.com/osciloscopio?ref=H96421460R',
    calificacion:'4.5',
    cantidadReseñas:'6'
  },

]
export default function Cursos() {
  return (
    <>
      <Head>
        <title>
          {title}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta name="keywords" content={'Mundo automotriz, Cursos de Mecanica, Cursos de Ingenieria, Cursos de Electricidad, Cursos de Electronica, Automotriz, Cursos de mecanica para motos, cursos de mecanica para autos'} />
        <meta name='robots' content='follow, index, max-image-preview:large' />
        <meta name='bingbot' content='follow, index' />
        <meta name='GOOGLEBOT' content='follow, index' />
        <meta name='language' content='spanish' />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@quarks-automotriz" />
        <meta name="twitter:creator" content="@quarks-automotriz" />
        <meta name="twitter:title" content={title} />
        {/* <meta name="twitter:image" content={image} /> */}
        {/* <meta name="url" content={`https://www.quarks.com.co${url}`} /> */}
        {/* <meta property="url" content={`https://www.quarks.com.co${url}`} /> */}

        <meta property="twitter:description" content={description} />
        <meta property="og:title" content={title} key="title" />
        {/* <meta property="og:image" content={image} /> */}
        {/* <meta property="og:image:url" content={image} /> */}
        <meta property='og:description' content={description} />
        {/* <meta property='og:url' content={`https://www.quarks.com.co${url}`} /> */}

        <meta property='og:locale' content='es_CO' />
        <meta property='og:locale:alternate' content='es_CO' />
        {/* <meta property='og:site_name' content='Quarks' /> */}
        <meta property="og:image:width" content='200' />
        <meta property="og:image:height" content='200' />
        <meta property="og:image:type" content='image/png' />
        <meta name="google-site-verification" content="O_W8kGCJz8lwIupFfTJjUS4z3M7xEh24pXVJQAyvVw0" />
        <link rel="icon" href='/logo-background-quarks.svg' />
        {/* <link rel="canonical" href={`https://www.quarks.com.co${url}`} /> */}

      </Head>
      <main  >
        <div style={{
          background: 'linear-gradient(to bottom, white 60%, #EDEDF2 40%)',
          width: '100%',
          boxSizing: 'border-box',
          minHeight: '100vh',
          padding: '64px 0',
          height: '100%' // o el alto que necesites
        }}>
          <div style={{ width: '90%', margin: 'auto', maxWidth: '1000px' }}>
            <p style={{backgroundColor:'#407BFF', color:'white', padding:'6px 12px', borderRadius:'24px', width:'fit-content', fontSize:'14px', fontWeight:'500', marginBottom:'8px'}}>+5000 Estudiantes</p>
            <h1 style={{ maxWidth: '400px', lineHeight: '1.2', color: '#182537' }}>Cursos de Mecanica Automotriz</h1>
            <p style={{ lineHeight: '1.1', color: '#6C788E', marginTop: '8px' }}>Descubre los mejores cursos de mecanica de motos y autos al mejor precio.</p>
          </div>
          <section style={{ width: '90%', margin: 'auto', maxWidth: '1000px', marginTop: '96px', display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: '48px', }}>
            {courses.map(el => (
              <Link href={el.url} key={el.title} style={{ textDecoration: 'none', color: '#182537', height: 'fit-content', height: '100%', maxWidth: '380px', width: '100%', }}>
                <article style={{ border: '1px solid #CFD5E1', borderRadius: '16px', position: 'relative', padding: '24px', backgroundColor: 'white', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                  <img style={{
                    position: 'absolute',
                    top: '-30px', // Ajusta el valor para sobresalir en Y
                    left: '50%', // Centra en el eje X
                    transform: 'translateX(-50%)', // Ajusta para centrar perfectamente
                    objectFit: 'cover',
                    width: '200px',
                    height:'200px',
                    borderRadius: '16px'
                  }} src={el.image} alt={el.title} />
                  <div style={{ flexGrow: 1, marginTop: '180px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', lineHeight: '1.1' }}>{el.title}</h2>
                    <p style={{ lineHeight: '1.2', color: '#6C788E', marginTop: '8px', fontSize: '14px' }}>{el.description.split(" ").slice(0, 10).join(" ") + (el.description.split(" ").length > 10 ? "..." : "")}</p>
                  </div>
                  <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Button variant={ButtonVariant.primary} size='sm' style={{ backgroundColor: '#E1EAFF', color: '#407BFF', fontSize: '12px',  margin: 0, borderRadius: '4px' }}>
                      Detalle
                    </Button>
                    <div style={{  display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <svg width="16" height="16" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.05859 0.601562L3.78906 3.19922L0.917969 3.60938C0.410156 3.6875 0.214844 4.3125 0.585938 4.68359L2.63672 6.69531L2.14844 9.52734C2.07031 10.0352 2.61719 10.4258 3.06641 10.1914L5.625 8.84375L8.16406 10.1914C8.61328 10.4258 9.16016 10.0352 9.08203 9.52734L8.59375 6.69531L10.6445 4.68359C11.0156 4.3125 10.8203 3.6875 10.3125 3.60938L7.46094 3.19922L6.17188 0.601562C5.95703 0.152344 5.29297 0.132812 5.05859 0.601562Z" fill="#EFBA0F" />
                      </svg>
                      <p style={{ lineHeight: '1.2', marginLeft:'4px', fontSize: '14px', fontWeight:'500' }}>{el.calificacion}<span style={{ color: '#6C788E', marginLeft: '4px', fontWeight:'400' }}>({el.cantidadReseñas})</span></p>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </section>
        </div >

      </main>
    </>
  )
}