'use client';
import Head from 'next/head';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  FileText,
  ArrowRight,
  Clock,
  Share2,
  Bookmark,
  User
} from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';


const MarkdownViewer = ({ content, meta }) => {
  const articleFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": meta?.faqs?.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  
  // Convertir a cadena JSON
  const articleFaqSchemaString = JSON.stringify(articleFaqSchema);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleFaqSchemaString }}
      />
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="author" content={meta.author} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Quarks" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />  
        <link rel="icon" href={'/favicon.png'} />


      </Head>
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-auto">


          {/* Tabla de contenido si existe */}
          {meta.showToc && (
            <div className="bg-secondary/10 rounded-xl p-6 mb-8 max-w-prose mx-auto">
              <h2 className="text-lg font-bold mb-4 text-primary">Contenido del artículo</h2>
              {/* Aquí renderizarías la tabla de contenido dinámicamente */}
              <ul className="space-y-2">
                <li>
                  <a href="#seccion1" className="text-terciary hover:text-primary flex items-center gap-1">
                    <ArrowRight className="w-4 h-4" />
                    <span>Sección 1</span>
                  </a>
                </li>
                <li>
                  <a href="#seccion2" className="text-terciary hover:text-primary flex items-center gap-1">
                    <ArrowRight className="w-4 h-4" />
                    <span>Sección 2</span>
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Renderizado de Markdown */}
          <article className=" prose  prose-headings:text-primary prose-a:text-terciary prose-a:no-underline hover:prose-a:text-primary prose-a:transition-colors prose-a:duration-300 prose-strong:text-primary prose-blockquote:border-accent prose-blockquote:bg-secondary/20 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-img:rounded-xl prose-img:shadow-md">
            <MarkdownRenderer content={content} />
          </article>


        </main>
    </>
  );
};

export default MarkdownViewer;