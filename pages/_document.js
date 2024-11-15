import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* Carga de fuentes, si no lo haces en _app.js */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" />

        {/* Cargar Ionicons y otros scripts estáticos */}
        <Script
          type="module"
          strategy="afterInteractive"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        />

        {/* Google Analytics */}
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
        />
        <Script id="ga-script" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS}');
          `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
