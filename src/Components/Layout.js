import Head from 'next/head'
import Footer from './Footer/Footer'
import NewNavbarWithSearch2 from './Navbar/NewNavbar'
import Nav from './Navbar/Nav'
function generarMarcadoEstructurado(articulo) {
  if (articulo) {
    return  {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": articulo.titulo,
      "image": [
        articulo.image
       ],
       "url":articulo.url,
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
export default function Layout({ children, title, description, type, price, keywords, fecha, image, tags, url, icon, visibleSlider, visibleNavbar=true, productoMarcado }) {
  const marcadoEstructurado = generarMarcadoEstructurado(productoMarcado);
  return (
    <>
      <Head>
        <title>{title}</title>
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

        {tags?.map(tag => <meta property='article:tag' content={tag} />)}
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
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" type="text/css"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1233996863721897"
          crossorigin="anonymous"></script>
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        {productoMarcado &&
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(marcadoEstructurado) }}
          />}
      </Head>

      <main >
        {/* <Nav /> */}
        {/* <NewNavbar/> */}
        {visibleNavbar &&<Nav/>}
        {children}
        <Footer />

      </main>


    </>
  )
}