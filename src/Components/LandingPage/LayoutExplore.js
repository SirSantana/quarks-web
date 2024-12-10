import Head from "next/head";
import FixedHeaderExplore from "./FixedHeaderExplore";
import dynamic from "next/dynamic";

const FooterV2 = dynamic(() => import('@/src/Components/Footer/FooterV2'),
{ ssr: false })
export default function LayoutExplore({ children, title, description, query, price, keywords, fecha, image, tags, url, lastModified = false, }) {
  return (
    <>
      <Head>
        {/* Page title */}
        <title>{title}</title>

        {/* Essential Meta Tags */}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords || "Mundo automotriz, talleres en Bogotá, mecánicos"} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="bingbot" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="es" />


        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@quarks-automotriz" />
        <meta name="twitter:creator" content="@quarks-automotriz" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:url" content={image} />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:url" content={`https://www.quarks.com.co${url}`} />
        <meta property="og:locale" content="es_CO" />
        {/* <meta property="og:site_name" content="Quarks" /> */}

        {/* SEO Enhancements */}
        <meta name="url" content={`https://www.quarks.com.co${url}`} />
        <meta property="url" content={`https://www.quarks.com.co${url}`} />

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
            <meta property="product:price:amount" content={180.000} />
            <meta property="product:price:currency" content="COP" />
          </>}

        {/* Site Verification */}
        <meta name="google-site-verification" content="O_W8kGCJz8lwIupFfTJjUS4z3M7xEh24pXVJQAyvVw0" />

        {/* Favicon and Canonical Link */}
        <link rel="icon" href="/logo-back-white.svg" />
        <link rel="canonical" href={`https://www.quarks.com.co${url}`} />

        {/* Preconnect for Ads and Clarity */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="true" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossOrigin="true" />
        <link rel="preconnect" href="https://www.clarity.ms" crossOrigin="true" />

        {/* Etiquetas de geolocalización para Bogotá */}
        <meta name="geo.region" content="CO-DC" />
        <meta name="geo.placename" content="Bogotá, Colombia" />
        <meta name="geo.position" content="4.60971;-74.08175" />
        <meta name="ICBM" content="4.60971, -74.08175" />

        {/* Datos estructurados para servicio específico */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": query.servicio,
              "provider": {
                "@type": "LocalBusiness",
                "name": "Quarks Automotriz",
                "areaServed": {
                  "@type": "Place",
                  "name": "Bogotá, Colombia"
                },
                "url": `https://www.quarks.com.co${url}`,
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.7",
                  "bestRating": "5",
                  "ratingCount": "71"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "Customer Service",
                  "telephone": "+57-314-355-1942",
                  "areaServed": "CO"
                }
              },
              "serviceOutput": `${query.servicio} para ${query.vehiculo} en ${query.ciudad}`,
            }),
          }}
        />

        {/* BreadCumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Inicio",
                  "item": "https://www.quarks.com.co/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": query.categoria,
                  "item": `https://www.quarks.com.co/explore/${query.categoria}`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": query.vehiculo,
                  "item": `https://www.quarks.com.co/explore/${query.categoria}/${query.vehiculo}`
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": query?.servicio?.replaceAll(' ', '-'),
                  "item": `https://www.quarks.com.co/explore/${query.categoria}/${query.vehiculo}/${query?.servicio?.replaceAll(' ', '-')}`
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": query?.ciudad,
                  "item": `https://www.quarks.com.co/explore/${query.categoria}/${query.vehiculo}/${query?.servicio?.replaceAll(' ', '-')}/${query.ciudad}`
                }
              ]
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "4.7",
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": "Juan Pérez"
              },
              "reviewBody": "Gracias, encontré talleres confiables y de calidad. ¡Muchas gracias!",
              "itemReviewed": {
                "@type": "LocalBusiness",
                "name": "Taller Automotriz Bogota",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Bogotá",
                  "addressRegion": "Cundinamarca",
                  "addressCountry": "CO"
                },
                "telephone": "+57 314 355 1942",
                "url": `https://www.quarks.com.co${url}`
              }
            }),
          }}
        />
        {/* Google Ads Script */}
        {process.env.NODE_ENV === "production" && (
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

      <main>
        <FixedHeaderExplore categoria={query.categoria} vehiculo={query.vehiculo} servicio={query.servicio} ciudad={query.ciudad} />
        <section style={{ paddingTop: '24px', backgroundColor: '#EDEDF2', maxWidth: '100%', width: '100vw', marginTop: '0px' }}>
          {children}
        </section>
        {/* {footer && <Footer />} */}
      </main>
      <FooterV2 />
    </>
  )
}