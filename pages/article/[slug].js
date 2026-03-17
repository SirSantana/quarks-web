import Layout from "@/src/Components/Layout";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Wrench } from "lucide-react";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

function readingTime(html) {
  const text = html.replace(/<[^>]+>/g, "");
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticlePage({ post }) {
  if (!post) return null;

  const minutes = readingTime(post.contentHtml);

  return (
    <Layout
      title={post.title}
      description={post.description}
      image={post.image}
      url={`/article/${post.slug}`}
      navbarRepuestos={false}
      visibleNavbar={false}
    >
      <div className="min-h-screen bg-white">
        {/* ── Header con imagen lateral ───────────────────────────── */}
        <div className="border-b border-gray-200 bg-[#f8f9fb]">
          <div className="max-w-[900px] mx-auto px-6 max-sm:px-4">
            <div className="flex flex-col sm:flex-row gap-0">
              {/* Columna izquierda: contenido */}
              <div className="flex-1 py-10 pr-0 sm:pr-10 flex flex-col justify-center">
                <Link
                  href="/article"
                  className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-[#407BFF] transition-colors mb-6"
                  style={{ textDecoration: "none" }}
                >
                  <ArrowLeft className="w-3 h-3" />
                  Todas las guías
                </Link>

                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 bg-[#407BFF]/8 text-[#407BFF] text-[10px] font-bold uppercase tracking-[1.8px] px-2.5 py-1 rounded-sm">
                    <Wrench className="w-2.5 h-2.5" />
                    Guía Automotriz
                  </span>
                </div>

                <h2 className="text-[24px] sm:text-[32px] font-bold text-gray-950 tracking-tight leading-snug mb-5">
                  {post.title}
                </h2>

                {post.description && (
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-6 font-light">
                    {post.description}
                  </p>
                )}

                <div className="flex items-center gap-5 text-[12px] text-gray-400 flex-wrap pt-4 border-t border-gray-200">
                  {post.date && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.date)}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {minutes} min de lectura
                  </span>
                </div>
              </div>

              {/* Columna derecha: imagen */}
              {post.image && (
                <div className="sm:w-[280px] md:w-[320px] flex-shrink-0 flex items-center justify-center border-t sm:border-t-0 sm:border-l border-gray-200 py-8 sm:py-0 sm:pl-10">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full object-contain"
                    style={{ maxHeight: "220px", maxWidth: "260px" }}
                    loading="eager"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Header sin imagen ────────────────────────────────────── */}
        {!post.image && (
          <div className="border-b border-gray-200">
            {/* Franja técnica superior */}
            <div className="w-full bg-[#f4f6f9] border-b border-gray-200 py-3 px-6">
              <div className="max-w-[800px] mx-auto">
                <Link
                  href="/article"
                  className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-[#407BFF] transition-colors"
                  style={{ textDecoration: "none" }}
                >
                  <ArrowLeft className="w-3 h-3" />
                  Todas las guías
                </Link>
              </div>
            </div>

            <div className="max-w-[800px] mx-auto px-6 pt-8 pb-8 max-sm:px-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 bg-[#407BFF]/8 text-[#407BFF] text-[10px] font-bold uppercase tracking-[1.8px] px-2.5 py-1 rounded-sm">
                  <Wrench className="w-2.5 h-2.5" />
                  Guía Automotriz
                </span>
              </div>

              <h2 className="text-[28px] sm:text-[38px] font-bold text-gray-950 tracking-tight leading-snug mb-4">
                {post.title}
              </h2>

              <div className="flex items-center gap-5 text-[12px] text-gray-400 flex-wrap">
                {post.date && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(post.date)}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {minutes} min de lectura
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── Cuerpo del artículo ──────────────────────────────────── */}
        <div className="max-w-[900px] mx-auto px-6 max-sm:px-4">
          <article
            className="prose-article pt-10 pb-4"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Footer */}
          <div className="border-t border-gray-100 py-10 mb-10 flex items-center justify-between flex-wrap gap-4">
            <Link
              href="/article"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#407BFF] hover:underline"
              style={{ textDecoration: "none" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Ver todas las guías
            </Link>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-300 uppercase tracking-[1.5px] font-semibold">
              <Wrench className="w-3 h-3" />
              Quarks · Guías
            </span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ── Base ──────────────────────────────────────────────────── */
        .prose-article {
          font-size: 16px;
          line-height: 1.9;
          color: #6b7280;
          font-family: "Georgia", "Times New Roman", serif;
        }

        /* ── Headings ──────────────────────────────────────────────── */
        .prose-article h1,
        .prose-article h2,
        .prose-article h3,
        .prose-article h4,
        .prose-article h5 {
          font-family:
            system-ui,
            -apple-system,
            sans-serif;
          color: #030712;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.25;
          scroll-margin-top: 28px;
        }
        .prose-article h1 {
          font-size: 2rem;
          margin-top: 0;
          margin-bottom: 1.2rem;
        }
        .prose-article h2 {
          font-size: 1.3rem;
          margin-top: 3rem;
          margin-bottom: 1rem;
          padding-bottom: 0.65rem;
          border-bottom: 2px solid #f3f4f6;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .prose-article h2::before {
          content: "";
          display: inline-block;
          width: 3px;
          height: 1.1em;
          background: #407bff;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .prose-article h3 {
          font-size: 1.05rem;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: #111827;
        }
        .prose-article h4 {
          font-size: 0.8rem;
          margin-top: 1.75rem;
          margin-bottom: 0.6rem;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 700;
        }

        /* ── Paragraphs ────────────────────────────────────────────── */
        .prose-article p {
          margin-bottom: 1.5rem;
        }
        .prose-article strong {
          color: #111827;
          font-weight: 600;
          font-family:
            system-ui,
            -apple-system,
            sans-serif;
        }
        .prose-article em {
          color: #374151;
        }
        .prose-article a {
          color: #407bff;
          text-underline-offset: 3px;
        }
        .prose-article a:hover {
          opacity: 0.75;
        }
        .prose-article hr {
          border: none;
          border-top: 1px solid #f3f4f6;
          margin: 3rem 0;
        }

        /* ── Lists ─────────────────────────────────────────────────── */
        .prose-article ul,
        .prose-article ol {
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
          font-family:
            system-ui,
            -apple-system,
            sans-serif;
          font-size: 15px;
        }
        .prose-article li {
          margin-bottom: 0.55rem;
          line-height: 1.75;
        }
        .prose-article li > strong {
          color: #111827;
        }
        .prose-article ul > li::marker {
          color: #407bff;
        }
        .prose-article ol > li::marker {
          color: #407bff;
          font-weight: 700;
        }
        .prose-article li > ul,
        .prose-article li > ol {
          margin-top: 0.4rem;
          margin-bottom: 0.4rem;
        }

        /* ── Blockquote — estilo "nota técnica" ────────────────────── */
        .prose-article blockquote {
          border-left: 3px solid #407bff;
          padding: 1rem 1.5rem;
          margin: 2.5rem 0;
          background: #f8faff;
          border-radius: 0 8px 8px 0;
          position: relative;
        }
        .prose-article blockquote::before {
          content: "NOTA TÉCNICA";
          display: block;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #407bff;
          font-family:
            system-ui,
            -apple-system,
            sans-serif;
          margin-bottom: 0.5rem;
        }
        .prose-article blockquote p {
          margin: 0;
          color: #374151;
          font-size: 14.5px;
          font-style: normal;
          font-family:
            system-ui,
            -apple-system,
            sans-serif;
          line-height: 1.7;
        }

        /* ── Imágenes ──────────────────────────────────────────────── */
        .prose-article > p:first-child > img:first-child {
          display: none;
        }
        .prose-article img {
          width: 100%;
          max-width: 560px;
          margin: 2rem auto;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          display: block;
        }

        /* ── Code ──────────────────────────────────────────────────── */
        .prose-article code {
          background: #f3f4f6;
          padding: 2px 7px;
          border-radius: 5px;
          font-size: 13px;
          color: #407bff;
          font-family: "Menlo", "Monaco", monospace;
        }
        .prose-article pre {
          background: #f9fafb;
          border: 1px solid #f3f4f6;
          border-radius: 10px;
          padding: 1.25rem 1.5rem;
          overflow-x: auto;
          margin: 1.75rem 0;
        }
        .prose-article pre code {
          background: none;
          padding: 0;
          color: #374151;
          font-size: 13px;
        }

        /* ── Tables ────────────────────────────────────────────────── */
        .prose-article .table-wrapper {
          width: 100%;
          overflow-x: auto;
          margin: 2.5rem 0;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          -webkit-overflow-scrolling: touch;
          box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.04);
        }
        .prose-article .prose-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13.5px;
          min-width: 520px;
          font-family:
            system-ui,
            -apple-system,
            sans-serif;
        }
        .prose-article .prose-table thead {
          background: #f4f6f9;
          border-bottom: 1px solid #e5e7eb;
        }
        .prose-article .prose-table thead th {
          padding: 11px 18px;
          text-align: left;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9ca3af;
          white-space: nowrap;
        }
        .prose-article .prose-table tbody tr {
          transition: background 0.1s;
        }
        .prose-article .prose-table tbody tr:hover {
          background: #fafbff;
        }
        .prose-article .prose-table tbody tr:not(:last-child) td {
          border-bottom: 1px solid #f3f4f6;
        }
        .prose-article .prose-table td {
          padding: 13px 18px;
          color: #6b7280;
          vertical-align: top;
          line-height: 1.6;
        }
        .prose-article .prose-table td:first-child {
          font-weight: 600;
          color: #374151;
          white-space: nowrap;
        }
        .prose-article .prose-table td strong,
        .prose-article .prose-table th strong {
          color: #111827;
          font-weight: 600;
        }
        .prose-article .prose-table th[align="center"],
        .prose-article .prose-table td[align="center"] {
          text-align: center;
        }
        .prose-article .prose-table th[align="right"],
        .prose-article .prose-table td[align="right"] {
          text-align: right;
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const post = await getPostBySlug(params.slug);
    return { props: { post } };
  } catch {
    return { notFound: true };
  }
}
