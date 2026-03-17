import Layout from "@/src/Components/Layout";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
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
        {/* ── Hero with title overlay ──────────────────────────────── */}
       {post.image && (
  <div className="w-full">

    {/* Imagen centrada y contenida */}
    <div className="w-full flex justify-center overflow-hidden" style={{ height: 'clamp(200px, 28vh, 380px)' }}>
      <img
        src={post.image}
        alt={post.title}
        className="h-full object-contain"
        style={{ width: '100%', maxWidth: '720px', objectPosition: 'center' }}
        loading="eager"
      />
    </div>

    {/* Contenido debajo de la imagen */}
    <div className="px-6 pt-7 pb-8 border-b border-gray-200">
      <div className="max-w-[800px] mx-auto">
        <Link
          href="/article"
          className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-700 transition-colors mb-5"
          style={{ textDecoration: 'none' }}
        >
          <ArrowLeft className="w-3 h-3" />
          All articles
        </Link>
        <p className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#407BFF] mb-3">
          Quarks · Blog
        </p>
        <h1 className="text-[24px] sm:text-[32px] font-bold text-gray-900 tracking-tight leading-snug mb-4 max-w-[680px]">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-[13px] text-gray-400 flex-wrap">
          {post.date && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.date)}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {minutes} min read
          </span>
        </div>
      </div>
    </div>

  </div>
)}

        {/* ── Header fallback (no image) ───────────────────────────── */}
        {!post.image && (
          <div className="border-b border-gray-100">
            <div className="max-w-[800px] mx-auto px-6 pt-12 pb-10 max-sm:px-4">
              <Link
                href="/article"
                className="inline-flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-[#407BFF] transition-colors mb-6"
                style={{ textDecoration: "none" }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All articles
              </Link>
              <p className="text-[12px] font-bold uppercase tracking-[1px] text-[#407BFF] mb-3">
                Quarks · Blog
              </p>
              <h1 className="text-[28px] sm:text-[40px] font-bold text-gray-950 tracking-tight leading-snug mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-[13px] text-gray-400 flex-wrap">
                {post.date && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(post.date)}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {minutes} min read
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── Article body ─────────────────────────────────────────── */}
        <div className="max-w-[800px] mx-auto px-6 max-sm:px-4">
          {/* Lead description */}
          {post.description && (
            <p className="text-[18px] text-gray-500 leading-relaxed pt-10 pb-8 border-b border-gray-100 font-light">
              {post.description}
            </p>
          )}

          <article
            className="prose-article pt-10 pb-4"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Footer */}
          <div className="border-t border-gray-100 py-10 mb-10">
            <Link
              href="/article"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#407BFF] hover:underline"
              style={{ textDecoration: "none" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ── Base ──────────────────────────────────────────────────── */
        .prose-article {
          font-size: 16.5px;
          line-height: 1.85;
          color: #6b7280;
        }

        /* ── Headings ──────────────────────────────────────────────── */
        .prose-article h1,
        .prose-article h2,
        .prose-article h3,
        .prose-article h4,
        .prose-article h5 {
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
          font-size: 1.4rem;
          margin-top: 3rem;
          margin-bottom: 1rem;
          padding-bottom: 0.7rem;
          border-bottom: 1px solid #f3f4f6;
        }
        .prose-article h3 {
          font-size: 1.1rem;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: #111827;
        }
        .prose-article h4 {
          font-size: 0.85rem;
          margin-top: 1.75rem;
          margin-bottom: 0.6rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          font-weight: 700;
        }

        /* ── Paragraphs ────────────────────────────────────────────── */
        .prose-article p {
          margin-bottom: 1.5rem;
        }
        .prose-article strong {
          color: #111827;
          font-weight: 600;
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

        /* ── Blockquote ────────────────────────────────────────────── */
        .prose-article blockquote {
          border-left: 3px solid #407bff;
          padding: 1rem 1.5rem;
          margin: 2.5rem 0;
          background: #f8faff;
          border-radius: 0 16px 16px 0;
        }
        .prose-article blockquote p {
          margin: 0;
          color: #374151;
          font-size: 15px;
          font-style: normal;
        }
        .prose-article blockquote strong {
          color: #407bff;
        }

        /* ── Images — hide duplicate hero image ────────────────────── */
        .prose-article > p:first-child > img:first-child {
          display: none;
        }
        .prose-article img {
          width: 100%;
          border-radius: 16px;
          margin: 2rem 0;
          border: 1px solid #f3f4f6;
          display: block;
        }

        /* ── Code ──────────────────────────────────────────────────── */
        .prose-article code {
          background: #f3f4f6;
          padding: 2px 7px;
          border-radius: 6px;
          font-size: 13.5px;
          color: #407bff;
          font-family: "Menlo", "Monaco", monospace;
        }
        .prose-article pre {
          background: #f9fafb;
          border: 1px solid #f3f4f6;
          border-radius: 14px;
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
          border: 1px solid #f3f4f6;
          border-radius: 16px;
          -webkit-overflow-scrolling: touch;
          box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.04);
        }
        .prose-article .prose-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13.5px;
          min-width: 520px;
        }
        .prose-article .prose-table thead {
          background: #f9fafb;
          border-bottom: 1px solid #f3f4f6;
        }
        .prose-article .prose-table thead th {
          padding: 12px 18px;
          text-align: left;
          font-size: 10.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9ca3af;
          white-space: nowrap;
        }
        .prose-article .prose-table tbody tr {
          transition: background 0.1s;
        }
        .prose-article .prose-table tbody tr:hover {
          background: #fafafa;
        }
        .prose-article .prose-table tbody tr:not(:last-child) td {
          border-bottom: 1px solid #f3f4f6;
        }
        .prose-article .prose-table td {
          padding: 14px 18px;
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
