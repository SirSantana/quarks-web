// pages/obd2/[slug].jsx

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import CodePage from "@/src/Components/Obd/ObdMd";
import Head from "next/head";

const CONTENT_DIR = path.join(process.cwd(), "utils/content/codes");

// ─── SSG ─────────────────────────────────────────────────────────────────────
export async function getStaticPaths() {
  // Crea la carpeta si no existe (evita crash en primer build)
  if (!fs.existsSync(CONTENT_DIR)) {
    return { paths: [], fallback: false };
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  return {
    paths: files.map((f) => ({
      params: { slug: f.replace(".md", "") }, // "P0300" → /obd2/P0300
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(CONTENT_DIR, `${params.slug.toUpperCase()}.md`);

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(raw);

  return {
    props: { frontmatter, content },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function OBD2CodePage({ frontmatter, content }) {
  const { code, title, severity, relatedCodes = [], faqs = [] } = frontmatter;
  const pageTitle = `Código ${code}: Síntomas, Causas, Soluciones y Costo de Reparación`;
  const description = `Guía completa del código de falla OBD-II ${code}. Conoce los síntomas, causas, diagnóstico, procedimientos de reparación, costos y si es seguro conducir con el código ${code}.`;
  // const pageTitle = `${code} Code: Symptoms, Causes, Fixes & Repair Cost`;

  // const description = `${code} OBD-II trouble code guide. Learn the symptoms, causes, diagnostics, repair procedures, costs and whether it is safe to drive with a ${code} code.`;

  const canonical = `https://www.quarks.com.co/obd2/${code.toLowerCase()}`;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <meta name="description" content={description} />

        <meta
          name="keywords"
          content={`${code}, ${code} code, ${code} obd2, ${code} symptoms, ${code} causes, ${code} repair, ${code} fix`}
        />

        <link rel="canonical" href={canonical} />

        <meta name="robots" content="index,follow,max-image-preview:large" />

        <meta property="og:type" content="article" />

        <meta property="og:title" content={pageTitle} />

        <meta property="og:description" content={description} />

        <meta property="og:url" content={canonical} />

        <meta
          property="og:image"
          content={`https://www.quarks.com.co/api/og/obd2/${frontmatter.code}`}
        />

        <meta
          name="twitter:image"
          content={`https://www.quarks.com.co/api/og/obd2/${frontmatter.code}`}
        />

        <meta name="twitter:card" content="summary_large_image" />

        <meta name="twitter:title" content={pageTitle} />

        <meta name="twitter:description" content={description} />
        <link rel="icon" href="/icon-obd.jpg" />

        {process.env.NODE_ENV === "production" && ads && (
          <>
            <link
              rel="preconnect"
              href="https://pagead2.googlesyndication.com"
              crossorigin
            />
            <link
              rel="preconnect"
              href="https://googleads.g.doubleclick.net"
              crossorigin
            />
          </>
        )}
        <link rel="preconnect" href="https://www.clarity.ms" crossorigin />
      </Head>

      <CodePage frontmatter={frontmatter} content={content} />
    </>
  );
}
