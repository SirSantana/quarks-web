"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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

    // ```label → etiqueta naranja pequeña (igual al <span> del original)
    if (lang === "label") {
      return (
        <span className="block text-[11px] font-black tracking-[0.25em] uppercase text-orange-600">
          {String(children).trim()}
        </span>
      );
    }

    // ```callout → fact box oscuro igual al original
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

    // ```tiktok → tarjeta TikTok completa, idéntica al original
    // línea 1: url del video
    // línea 2: handle (@LlantaPinchadaTV)
    // línea 3: caption del video
    // línea 4 (opcional): url de thumbnail
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
                  <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
                    ¿Cómo se ve en la vida real?
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

            {/* Botones laterales simulados */}
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

            {/* Info del creador */}
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
            className="flex justify-between items-center text-[13px]"
          >
            <span className="text-zinc-500 font-medium">{k}</span>
            <span className="font-bold text-zinc-900">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ArticlePage({ frontmatter, content }) {
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
                href="#"
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
        <main className="max-w-5xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-16 items-start">
            {/* ARTICLE */}
            <article className="min-w-0 space-y-10 text-zinc-700 text-[17px] leading-[1.8] font-Poppins">
              {/* Lead italic */}
              {lead && (
                <p className="text-lg md:text-xl text-zinc-600 leading-relaxed font-medium italic border-l-4 border-zinc-200 pl-6">
                  {lead}
                </p>
              )}

              {/* Markdown body */}
              <ReactMarkdown components={mdComponents}>{content}</ReactMarkdown>

              {/* Stats grid — del frontmatter, aparece al final del contenido */}
              <StatsGrid stats={stats} />

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
        </main>

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
