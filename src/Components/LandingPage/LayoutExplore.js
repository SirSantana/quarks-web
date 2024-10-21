import Head from "next/head";
import SectionFixedServicios from "./SectionFixedServicios";
import FixedHeaderExplore from "./FixedHeaderExplore";
import MenuSelectsFilter from "./MenuSelectsFilter";


export default function LayoutExplore({ children, footer = true, title, description, type, price, keywords, fecha, image, tags, url, icon, visibleSlider, visibleNavbar = true, productoMarcado, lastModified = false, style, picoyplacaStructured, categoria, vehiculo, servicio, ciudad }) {
  return (
    <>
      <Head>
        <title>
          {categoria !== 'mecanicos'
            ? `Encuentra los mejores ${categoria.charAt(0).toUpperCase() + categoria.slice(1)} de ${servicio} para ${vehiculo} en ${ciudad}`
            : `Mecánicos a domicilio para ${servicio} de ${vehiculo} en ${ciudad}`
          }
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        {keywords ?
          <meta name="keywords" content={keywords} />
          :
          <meta name="keywords" content={'Mundo automotriz'} />
        }
        <meta name='robots' content='follow, index, max-image-preview:large' />
        <meta name='bingbot' content='follow, index' />
        <meta name='GOOGLEBOT' content='follow, index' />
        <meta name='language' content='spanish' />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@quarks-automotriz" />
        <meta name="twitter:creator" content="@quarks-automotriz" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={image} />
        <meta name="url" content={`https://www.quarks.com.co${url}`} />
        <meta property="url" content={`https://www.quarks.com.co${url}`} />

        <meta property="twitter:description" content={description} />
        <meta property="og:title" content={title} key="title" />
        <meta property="og:image" content={image} />
        <meta property="og:image:url" content={image} />
        <meta property='og:description' content={description} />
        <meta property='og:url' content={`https://www.quarks.com.co${url}`} />
        {type &&
          <meta property='og:type' content={type} />
        }
        <meta property='og:locale' content='es_CO' />
        <meta property='og:locale:alternate' content='es_CO' />
        <meta property='og:site_name' content='Quarks' />
        <meta property="og:image:width" content='200' />
        <meta property="og:image:height" content='200' />
        <meta property="og:image:type" content='image/png' />
        {lastModified &&
          <meta http-equiv="Last-Modified" content={lastModified} />
        }
        {tags?.map(tag => <meta key={tag} property='article:tag' content={tag} />)}
        {fecha &&
          <>
            <meta property='article:published_time' content={fecha} />
            <meta property='article:modified_time' content={fecha} />
            <meta property='date' content={fecha} />
          </>}
        {price &&
          <>
            <meta property="product:price:amount" content={price} />
            <meta property="product:price:currency" content="COP" />
          </>}

        <meta name="google-site-verification" content="O_W8kGCJz8lwIupFfTJjUS4z3M7xEh24pXVJQAyvVw0" />
        <link rel="icon" href={icon ? icon : "/logoquarks200623.png"} />
        <link rel="canonical" href={`https://www.quarks.com.co${url}`} />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1233996863721897"
          crossorigin="anonymous"></script>

        {productoMarcado &&
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(marcadoEstructurado) }}
          />}
        {picoyplacaStructured &&
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(picoyplacaStructured) }}
          />}
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

      <main  >
        <FixedHeaderExplore categoria={categoria} vehiculo={vehiculo} servicio={servicio} ciudad={ciudad} />
        <section style={{ paddingTop: '24px', backgroundColor: '#EDEDF2', maxWidth: '100%', width: '100vw', marginTop: '0px' }}>
          {children}
        </section>
        {/* {footer && <Footer />} */}

      </main>


    </>
  )
}