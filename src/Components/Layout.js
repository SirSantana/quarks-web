import Head from 'next/head'
import FooterV2 from './Footer/FooterV2';
import Navbar from './Navbar/Navbar';

function generarMarcadoEstructurado(articulo) {
  if (articulo) {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": articulo.titulo,
      "image": [
        articulo.image
      ],
      "url": articulo.url,
      "datePublished": articulo?.fecha,
      "dateModified": articulo?.fecha,
      "author": [{
        "@type": "Person",
        "name": "Miguel Salazar",
        "url": "https://scontent.fbog4-2.fna.fbcdn.net/v/t1.6435-9/118200733_104636334698420_6059036456657205315_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=2be8e3&_nc_ohc=JlxtUCVL6iMAX-V2mU7&_nc_oc=AQk0DHIhyaER-NyXkFMhauXNynNSMDkMDDdkIrv0NwoMNcMS2S1xpel-d0VZDoJgxec&_nc_ht=scontent.fbog4-2.fna&oh=00_AfA3DyUAGymCxzo0gzHFBXH_EccrnPpEriqXWY9FWM3Anw&oe=65BBF572"
      }]
    }
  }
}

export default function Layout({index=true, children, footer = true, title, description, type, price, keywords, fecha, image, tags, url, ads = true, icon, visibleSlider, visibleNavbar = true, productoMarcado, lastModified = false, style, picoyplacaStructured, negocio = false }) {
  const marcadoEstructurado = generarMarcadoEstructurado(productoMarcado);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content={description} />
        {keywords ?
          <meta name="keywords" content={keywords} />
          :
          <meta name="keywords" content={'Mundo automotriz'} />
        }
       
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
        {index 
        ?
        <>
        <meta name='robots' content='follow, index, max-image-preview:large' />
        <meta name='bingbot' content='follow, index' />
        <meta name='GOOGLEBOT' content='follow, index' />
        </>
        :<meta name="robots" content="noindex, follow" />
      }

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

        {!negocio && <meta name="google-site-verification" content="O_W8kGCJz8lwIupFfTJjUS4z3M7xEh24pXVJQAyvVw0" />}

        <link rel="icon" href='/favicon.webp'/>
        <link rel="canonical" href={`https://www.quarks.com.co${url}`} />
        {process.env.NODE_ENV === "production" && ads &&(
          <>
            <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossorigin />
            <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossorigin />
          </>
        )}
        <link rel="preconnect" href="https://www.clarity.ms" crossorigin />
        {/* <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" /> */}

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
        {process.env.NODE_ENV === "production"&&ads && (
          <script
            async
            defer
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1233996863721897"
            crossOrigin="anonymous"
          ></script>
        )}

        {process.env.NODE_ENV === "production" && (
          <script
            async
            defer
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
        )}
      </Head>

      <main  >
        {/* <Nav /> */}
        {/* <NewNavbar/> */}
        {visibleNavbar && <Navbar />}
        {children}

      </main>
      {footer && <FooterV2 />}


    </>
  )
}