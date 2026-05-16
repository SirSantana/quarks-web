"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Layout from "@/src/Components/Layout";

// ─── Markdown renderers ───────────────────────────────────────────────────────
const mdComponents = {
  h2: ({ children }) => (
    <h2 className="text-3xl font-bold text-zinc-900 tracking-tight leading-tight ">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-bold text-zinc-900 tracking-tight leading-tight">
      {children}
    </h3>
  ),
  p: ({ children }) => <p>{children}</p>,
  blockquote: ({ children }) => (
    <div className="py-6 border-y border-zinc-100">
      <blockquote className="text-2xl md:text-3xl font-bold text-zinc-800 leading-tight text-center px-4">
        {children}
      </blockquote>
    </div>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-2">{children}</ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => (
    <strong className="font-bold text-zinc-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  hr: () => <div className="h-px bg-zinc-200" />,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-orange-600 underline underline-offset-2 hover:text-orange-700 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  code: ({ inline, className, children }) => {
    if (inline) {
      return (
        <code className="bg-zinc-100 text-zinc-800 text-sm px-1.5 py-0.5 rounded font-mono">
          {children}
        </code>
      );
    }
    const lang = (className || "").replace("language-", "");

    if (lang === "label") {
      return (
        <span className="block text-[11px] font-black tracking-[0.25em] uppercase text-orange-600">
          {String(children).trim()}
        </span>
      );
    }

    if (lang === "callout") {
      return (
        <aside className="bg-zinc-900 text-zinc-100 rounded-3xl p-8 md:p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-orange-600/20 transition-colors" />
          <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase bg-orange-600 px-3 py-1 rounded mb-6">
            Detalle Técnico
          </span>
          <p className="text-lg md:text-xl font-light leading-relaxed relative z-10 whitespace-pre-line">
            {String(children).trim()}
          </p>
        </aside>
      );
    }

    if (lang === "affiliate") {
  const items = String(children).trim().split("\n---\n").map(block => {
    const lines = block.trim().split("\n");
    return {
      url:   lines[0]?.trim() || "#",
      name:  lines[1]?.trim() || "",
      desc:  lines[2]?.trim() || "",
      price: lines[3]?.trim() || "",
      rating: lines[4]?.trim() || "",
      image: lines[5]?.trim() || "",
    };
  });

  const stars = (r) => {
    const n = Math.round(parseFloat(r));
    return "★".repeat(n) + "☆".repeat(5 - n);
  };

  return (
    <section className="my-10 space-y-3">
      <span className="block text-[11px] font-black tracking-[0.25em] uppercase text-orange-600">
        Lo que usamos
      </span>

      <div className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-white px-3 py-3 hover:border-zinc-200 transition-colors no-underline"
          >
            <div className="w-14 h-14 rounded-lg bg-zinc-100 flex-shrink-0 overflow-hidden flex items-center justify-center text-zinc-300">
              {item.image
                ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              }
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-900 truncate m-0">{item.name}</p>
              <p className="text-xs text-zinc-400 truncate m-0">
                <span className="text-amber-400">{stars(item.rating)}</span>
                {" "}{item.rating} · {item.desc}
              </p>
            </div>

            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className="text-[15px] font-black tracking-tight text-zinc-900">{item.price}</span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 flex items-center gap-1">
                Amazon ↗
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

    if (lang === "tiktok") {
      const lines = String(children).trim().split("\n");
      const url = lines[0]?.trim() || "#";
      const handle = lines[1]?.trim() || "@TruckLore";
      const caption = lines[2]?.trim() || "";
      const thumbnail = lines[3]?.trim() || "";

      return (
        <section className="space-y-8 flex flex-col items-center my-16 text-inherit">
          <div className="w-full text-center">
            <span className="block text-[11px] font-black tracking-[0.3em] uppercase text-orange-600 mb-2">
              Contenido Viral
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 ">
              ¿Cómo se ve en la <br className="md:hidden" />vida real?
            </h2>
          </div>

          <div className="group relative w-full max-w-[340px] aspect-[9/16] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-[10px] border-zinc-900 bg-black">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt="Preview TikTok"
                fill
                className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
              />
            ) : (
              <div className="absolute inset-0 bg-zinc-800" />
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex flex-col items-center justify-center group/btn"
            >
              <div className="relative w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-xl transition-transform group-hover/btn:scale-110 active:scale-95">
                <div className="text-zinc-900 text-3xl ml-1">▶</div>
                <div className="absolute inset-0 rounded-full border-2 border-[#00f2ea] animate-ping opacity-40" />
                <div className="absolute inset-0 rounded-full border-2 border-[#ff0050] animate-ping opacity-40 [animation-delay:0.5s]" />
              </div>
              <span className="mt-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold tracking-widest uppercase group-hover:bg-orange-600 transition-colors">
                Ver en TikTok
              </span>
            </a>

            <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center opacity-70">
              {["❤️", "💬", "🔗"].map((icon) => (
                <div
                  key={icon}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xs"
                >
                  {icon}
                </div>
              ))}
            </div>

            <div className="absolute bottom-8 left-6 right-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/20 overflow-hidden font-bold text-[10px] flex items-center justify-center text-white">
                  TV
                </div>
                <span className="text-white font-bold text-sm">{handle}</span>
              </div>
              {caption && (
                <p className="text-white/80 text-[11px] leading-snug line-clamp-2">
                  {caption}
                </p>
              )}
            </div>
          </div>

          <div className="text-center space-y-3">
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">
              Disponible en nuestra comunidad vertical
            </p>
            <div className="flex justify-center gap-4">
              <div className="h-1 w-12 bg-zinc-200 rounded-full" />
              <div className="h-1 w-12 bg-orange-500 rounded-full" />
              <div className="h-1 w-12 bg-zinc-200 rounded-full" />
            </div>
          </div>
        </section>
      );
    }

    return (
      <pre className="bg-zinc-100 rounded-xl p-4 overflow-x-auto text-sm font-mono text-zinc-800">
        <code>{children}</code>
      </pre>
    );
  },
};

// ─── Stats grid ───────────────────────────────────────────────────────────────
function StatsGrid({ stats }) {
  if (!stats?.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
      {stats.map(({ num, label }) => (
        <div
          key={label}
          className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="block text-3xl font-black text-orange-600 mb-1">
            {num}
          </span>
          <span className="block text-xs font-bold text-zinc-500 uppercase tracking-wider leading-snug">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
function Timeline({ items }) {
  if (!items?.length) return null;
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xs font-black tracking-widest uppercase text-zinc-400 mb-6">
        Cronología
      </h3>
      <div className="space-y-6">
        {items.map(({ year, text }) => (
          <div
            key={year}
            className="relative pl-6 border-l border-zinc-100 pb-1 last:pb-0"
          >
            <span className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-orange-600 border-2 border-white" />
            <span className="block text-xs font-black text-zinc-900 mb-1">
              {year}
            </span>
            <p className="text-[13px] text-zinc-500 leading-snug">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Specs ────────────────────────────────────────────────────────────────────
function Specs({ items }) {
  if (!items?.length) return null;

  return (
    <div className="bg-zinc-100/50 rounded-2xl p-6">
      <h3 className="text-xs font-black tracking-widest uppercase text-zinc-400 mb-5">
        Ficha técnica
      </h3>

      <div className="space-y-4">
        {items.map(([k, v]) => (
          <div
            key={k}
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 items-start text-[13px]"
          >
            <span className="text-zinc-500 font-medium">
              {k}
            </span>

            <span className="font-bold text-zinc-900 text-right break-words max-w-[180px]">
              {v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
// ─── Related Articles ─────────────────────────────────────────────────────────
function RelatedArticles({ articles }) {
  if (!articles?.length) return null;

  return (
    <section className="border-t border-zinc-200 pt-20 pb-4">
      {/* Section header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <span className="block text-[11px] font-black tracking-[0.3em] uppercase text-orange-600 mb-2">
            Seguir leyendo
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight">
            También te puede interesar
          </h2>
        </div>
        <Link
          href="/posts"
          className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 transition-colors group"
        >
          Ver todos
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, i) => (
          <RelatedCard key={article.slug} article={article} featured={i === 0} />
        ))}
      </div>

      {/* Mobile "ver todos" */}
      <div className="flex justify-center mt-10 sm:hidden">
        <Link
          href="/posts"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors border border-zinc-200 rounded-full px-6 py-3"
        >
          Ver todos los artículos →
        </Link>
      </div>
    </section>
  );
}

function RelatedCard({ article, featured }) {
  const { slug, title, subtitle, badge, readTime, publishDate, image, imageAlt } =
    article;

  return (
    <Link
      href={`/posts/${slug}`}
      className={`group relative flex flex-col bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
        featured ? "sm:col-span-2 lg:col-span-1" : ""
      }`}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-zinc-100"
           style={{ paddingTop: "56.25%" /* 16:9 */ }}>
        {image ? (
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Placeholder when no image */
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center">
            <span className="text-4xl font-black text-zinc-400 select-none">
              TL
            </span>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge pill over image */}
        {badge && (
          <div className="absolute top-4 left-4">
            <span className="bg-orange-600 text-white text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-md shadow">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        {/* Meta row */}
        <div className="flex items-center gap-3 text-[11px] font-medium text-zinc-400 uppercase tracking-widest">
          {readTime && <span>{readTime} min</span>}
          {readTime && publishDate && (
            <span className="w-1 h-1 rounded-full bg-zinc-300" />
          )}
          {publishDate && <span>{publishDate}</span>}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-zinc-900 leading-snug tracking-tight group-hover:text-orange-600 transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-[13px] text-zinc-500 leading-relaxed line-clamp-2 flex-1">
            {subtitle}
          </p>
        )}

        {/* CTA row */}
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-zinc-100">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
            TruckLore Editorial
          </span>
          <span className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:bg-orange-600 group-hover:border-orange-600 group-hover:text-white transition-all duration-200 text-xs">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ArticlePage({ frontmatter, content, relatedArticles = [] }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const {
    title,
    subtitle,
    lead,
    badge,
    readTime,
    publishDate,
    image,
    imageAlt,
    imageLabel,
    stats,
    timeline,
    specs,
    newsletter,
  } = frontmatter;

  return (
    <Layout
      title={title}
      image={image}
      description={subtitle}
      footer={false}
      visibleNavbar={false}
      icon={image}
    >
      <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-orange-100 selection:text-orange-900">
        {/* NAV */}
        <nav
          className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
            scrolled
              ? "bg-zinc-50/95 backdrop-blur border-b border-zinc-200"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <span className="text-base font-bold tracking-tight">
              Truck<span className="text-orange-600">Lore</span>
            </span>
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <a
                href="/posts"
                className="hover:text-zinc-900 transition-colors hidden sm:block font-medium"
              >
                Artículos
              </a>
            </div>
          </div>
        </nav>

        {/* HERO IMAGE */}
        <div className="max-w-5xl mx-auto px-0 sm:px-6 pt-20 md:pt-24">
          <div className="relative w-full h-[45vh] min-h-[320px] max-h-[440px] overflow-hidden sm:rounded-3xl shadow-xl shadow-zinc-200/50">
            <Image
              src={image}
              alt={imageAlt || title}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            {imageLabel && (
              <div className="absolute bottom-6 left-6">
                <span className="bg-white/90 backdrop-blur text-zinc-800 text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-lg border border-white/50 shadow-sm">
                  {imageLabel}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* HEADER */}
        <header className="max-w-5xl mx-auto px-6 pt-12 pb-14">
          <div className="flex items-center gap-4 mb-6">
            {badge && (
              <span className="bg-orange-600 text-white text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-md">
                {badge}
              </span>
            )}
            {readTime && (
              <span className="text-xs font-medium text-zinc-400">
                {readTime} min de lectura
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 leading-[1.1] mb-8 max-w-4xl tracking-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-3xl mb-8 font-light">
              {subtitle}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-zinc-400 border-t border-zinc-200 pt-8">
            <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden shrink-0 border-2 border-white shadow-sm">
              <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                TL
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-900 font-bold">
                TruckLore Editorial
              </span>
              {publishDate && <span>Publicado el {publishDate}</span>}
            </div>
          </div>
        </header>

        {/* BODY */}
        <div className="max-w-5xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-16 items-start">
            {/* ARTICLE */}
            <article className="min-w-0 space-y-10 text-zinc-700 text-[17px] leading-[1.8] font-Poppins">
              {lead && (
                <p className="text-lg md:text-xl text-zinc-600 leading-relaxed font-medium italic border-l-4 border-zinc-200 pl-6">
                  {lead}
                </p>
              )}
              <StatsGrid stats={stats} />

              <ReactMarkdown components={mdComponents}>{content}</ReactMarkdown>

              <div className="h-px bg-zinc-200" />

              <footer className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                <div className="flex gap-3">
                  {["Twitter", "LinkedIn", "Facebook"].map((platform) => (
                    <button
                      key={platform}
                      className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-100 transition-colors cursor-pointer"
                    >
                      <span className="sr-only">{platform}</span>
                      <div className="w-4 h-4 bg-zinc-400 rounded-sm" />
                    </button>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-zinc-900 border-2 border-zinc-900 rounded-full px-8 py-3 hover:bg-zinc-900 hover:text-white transition-all cursor-pointer">
                  Guardar lectura para después
                </button>
              </footer>
            </article>

            {/* SIDEBAR */}
            <aside className="lg:sticky lg:top-24 space-y-8">
              <Timeline items={timeline} />
              <Specs items={specs} />

              {newsletter !== false && (
                <div className="bg-orange-600 rounded-2xl p-6 text-white shadow-lg shadow-orange-200">
                  <h3 className="text-lg font-bold mb-2 leading-tight">
                    {newsletter?.title || "¿Ingeniería olvidada?"}
                  </h3>
                  <p className="text-sm opacity-90 mb-6 leading-relaxed">
                    {newsletter?.body ||
                      "Recibe cada domingo una historia sobre máquinas que el tiempo dejó atrás."}
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Tu email..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm placeholder:text-white/60 outline-none focus:bg-white/20 transition-all"
                    />
                    <button className="w-full bg-white text-orange-600 font-bold py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-zinc-100 transition-colors shadow-sm">
                      Unirme a la lista
                    </button>
                  </form>
                </div>
              )}
            </aside>
          </div>

          {/* ── RELATED ARTICLES ─────────────────────────────────────────── */}
          <div className="mt-24">
            <RelatedArticles articles={relatedArticles} />
          </div>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-zinc-200 bg-white py-12">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-xl font-black">
                Truck<span className="text-orange-600">Lore</span>
              </span>
              <p className="text-xs text-zinc-400 uppercase tracking-widest">
                Historias de metal y visión
              </p>
            </div>
            <div className="flex gap-8 text-xs font-bold text-zinc-500 uppercase tracking-widest">
              <a href="#" className="hover:text-orange-600 transition-colors">
                Archivo
              </a>
              <a href="#" className="hover:text-orange-600 transition-colors">
                Sobre nosotros
              </a>
              <a href="#" className="hover:text-orange-600 transition-colors">
                Contacto
              </a>
            </div>
            <p className="text-[10px] text-zinc-400 font-medium">
              © 2026 · BOGOTÁ, COLOMBIA
            </p>
          </div>
        </footer>
      </div>
    </Layout>
  );
}