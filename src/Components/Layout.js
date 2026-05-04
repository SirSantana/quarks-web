import Head from "next/head";
import FooterV2 from "./Footer/FooterV2";
import Navbar from "./Navbar/Navbar";
import NavbarRepuestos from "./Navbar/NavbarRepuestos";

function generarMarcadoEstructurado(articulo) {
  if (!articulo) return null;

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: articulo.titulo,
    description: articulo.descripcion,
    image: [articulo.image],
    datePublished: articulo.fecha,
    dateModified: articulo.fecha,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articulo.url,
    },
    author: {
      "@type": "Person",
      name: "Miguel Salazar",
    },
    publisher: {
      "@type": "Organization",
      name: "Quarks",
      logo: {
        "@type": "ImageObject",
        url: "https://www.quarks.com.co/logo.png",
      },
    },
  };
}

export default function Layout({
  index = true,
  children,
  footer = true,
  navbarRepuestos = false,
  title,
  description,
  type,
  price,
  keywords,
  fecha,
  image,
  tags,
  url,
  ads = true,
  icon,
  visibleSlider,
  visibleNavbar = true,
  productoMarcado,
  lastModified = false,
  style,
  picoyplacaStructured,
  negocio = false,
  repuestos = [],
}) {
  const absoluteUrl = `https://www.quarks.com.co${url || ""}`;

  const absoluteImage = image?.startsWith("http")
    ? image
    : `https://www.quarks.com.co${image || "/default.jpg"}`;

  const marcadoEstructurado = generarMarcadoEstructurado(
    productoMarcado && {
      ...productoMarcado,
      image: absoluteImage,
      url: absoluteUrl,
    }
  );

  const jsonLdRepuestos = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Catálogo de Repuestos Quarks",
    description: "Venta de autopartes en Colombia",
    itemListElement: repuestos?.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.quarks.com.co/repuesto/${product.titulo}`,
      name: product.Nombre,
      image: product.images?.[0] || "",
    })),
  };

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />

        <meta name="description" content={description} />
        <meta
          name="keywords"
          content={keywords || "Mundo automotriz"}
        />

        <meta name="language" content="spanish" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={absoluteImage} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={absoluteImage} />
        <meta property="og:url" content={absoluteUrl} />
        <meta property="og:type" content={type || "article"} />
        <meta property="og:site_name" content="Quarks" />

        {/* 🔥 CLAVE PARA GOOGLE */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta property="og:locale" content="es_CO" />

        {/* SEO */}
        <link rel="canonical" href={absoluteUrl} />

        {index ? (
          <meta
            name="robots"
            content="index, follow, max-image-preview:large"
          />
        ) : (
          <meta name="robots" content="noindex, follow" />
        )}

        {/* Fechas */}
        {fecha && (
          <>
            <meta property="article:published_time" content={fecha} />
            <meta property="article:modified_time" content={fecha} />
          </>
        )}

        {/* Tags */}
        {tags?.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        {/* Precio */}
        {price && (
          <>
            <meta property="product:price:amount" content={price} />
            <meta property="product:price:currency" content="COP" />
          </>
        )}

        {/* Verificación */}
        {!negocio && (
          <meta
            name="google-site-verification"
            content="O_W8kGCJz8lwIupFfTJjUS4z3M7xEh24pXVJQAyvVw0"
          />
        )}

        <link rel="icon" href="/favicon.png" />

        {/* JSON-LD Artículo */}
        {marcadoEstructurado && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(marcadoEstructurado),
            }}
          />
        )}

        {/* JSON-LD Repuestos */}
        {repuestos.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLdRepuestos),
            }}
          />
        )}

        {/* Otros schemas */}
        {picoyplacaStructured && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(picoyplacaStructured),
            }}
          />
        )}

        {/* Ads */}
        {process.env.NODE_ENV === "production" && ads && (
          <>
            <link
              rel="preconnect"
              href="https://pagead2.googlesyndication.com"
              crossOrigin="anonymous"
            />
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1233996863721897"
              crossOrigin="anonymous"
            ></script>
          </>
        )}
      </Head>

      <main>
        {visibleNavbar && <Navbar />}
        {navbarRepuestos && <NavbarRepuestos />}

        {children}
      </main>

      {footer && <FooterV2 />}
    </>
  );
}