"use client";

// pages/index.js

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "@/src/Components/Layout";

const ARTICLES_DIR = path.join(process.cwd(), "postsmd");

export async function getStaticProps() {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));

  const articles = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title || slug,
      subtitle: data.subtitle || "",
      badge: data.badge || null,
      readTime: data.readTime || null,
      publishDate: data.publishDate || null,
      image: data.image || null,
      imageAlt: data.imageAlt || data.title || slug,
    };
  });

  return { props: { articles } };
}

// ─── FEATURED: hero con imagen de fondo ───────────────────────────────────────
function FeaturedArticle({ article }) {
  const { slug, title, subtitle, badge, readTime, publishDate, image, imageAlt } = article;
  return (
    <Link href={`/posts/${slug}`} className="group block">
      <div className="relative w-full h-[56vh] min-h-[400px] max-h-[560px] overflow-hidden rounded-3xl shadow-xl shadow-zinc-200/50">
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-200" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
          <div className="flex items-center gap-3 mb-4">
            {badge && (
              <span className="bg-orange-600 text-white text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-md">
                {badge}
              </span>
            )}
            {readTime && (
              <span className="text-xs font-medium text-white/60">{readTime} min de lectura</span>
            )}
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-[1.15] tracking-tight mb-3 max-w-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-2xl line-clamp-2 font-light">
              {subtitle}
            </p>
          )}
          <div className="flex items-center gap-3 mt-5">
            <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-[10px] shrink-0">
              TL
            </div>
            <span className="text-xs text-white/50 font-medium">
              TruckLore Editorial{publishDate && <> · {publishDate}</>}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── FLAT GRID ITEM: imagen + texto, sin card ─────────────────────────────────
function FlatGridItem({ article }) {
  const { slug, title, subtitle, badge, readTime, publishDate, image, imageAlt } = article;
  return (
    <Link href={`/posts/${slug}`} className="group block">
      {/* Imagen */}
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-200 mb-4">
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-zinc-400 text-2xl font-black">TL</span>
          </div>
        )}
        {badge && (
          <div className="absolute top-3 left-3">
            <span className="bg-orange-600 text-white text-[9px] font-black tracking-[0.2em] uppercase px-2.5 py-1 rounded-md">
              {badge}
            </span>
          </div>
        )}
      </div>
      {/* Texto directo, sin caja */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
          {readTime && <span>{readTime} min</span>}
          {readTime && publishDate && <span>·</span>}
          {publishDate && <span>{publishDate}</span>}
        </div>
        <h3 className="text-base font-bold text-zinc-900 leading-snug tracking-tight group-hover:text-orange-600 transition-colors line-clamp-2">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">{subtitle}</p>
        )}
      </div>
    </Link>
  );
}

// ─── FLAT ROW ITEM: imagen pequeña + texto en fila ────────────────────────────
// Para la segunda sección, un layout diferente: fila horizontal sin card
function FlatRowItem({ article, index }) {
  const { slug, title, subtitle, badge, readTime, publishDate, image, imageAlt } = article;
  return (
    <Link href={`/posts/${slug}`} className="group block">
      <div className="flex gap-5 items-start py-6 border-b border-zinc-200 last:border-0">
        {/* Número */}
        <span className="text-[11px] text-zinc-300 font-black tabular-nums mt-0.5 shrink-0 w-5">
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* Imagen */}
        <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-zinc-200">
          {image ? (
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-zinc-400 text-xs font-black">TL</span>
            </div>
          )}
        </div>
        {/* Texto */}
        <div className="flex-1 min-w-0 space-y-1">
          {badge && (
            <span className="inline-block bg-orange-600 text-white text-[9px] font-black tracking-[0.18em] uppercase px-2 py-0.5 rounded">
              {badge}
            </span>
          )}
          <h3 className="text-sm font-bold text-zinc-900 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-zinc-500 line-clamp-1">{subtitle}</p>
          )}
          <div className="flex items-center gap-2 text-[10px] text-zinc-400 pt-0.5">
            {readTime && <span>{readTime} min</span>}
            {readTime && publishDate && <span>·</span>}
            {publishDate && <span>{publishDate}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Section divider ──────────────────────────────────────────────────────────
function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] shrink-0">
        {label}
      </span>
      <div className="h-px flex-1 bg-zinc-200" />
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function HomePage({ articles }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const featured = articles[0];
  const flatGrid = articles.slice(1, 4);   // 3 artículos → grid plano 3 col
  const flatRows = articles.slice(4);      // resto → filas planas con imagen pequeña

  return (
    <Layout
      title="TruckLore — Historias de metal y visión"
      description="Cada semana, una historia sobre ingeniería, camiones y las máquinas que el tiempo dejó atrás."
      footer={false}
      visibleNavbar={false}
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
              <a href="#" className="hover:text-zinc-900 transition-colors hidden sm:block font-medium">
                Artículos
              </a>
            </div>
          </div>
        </nav>

        {/* HERO HEADER */}
        <header className="max-w-5xl mx-auto px-6 pt-28 pb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="block text-[11px] font-black tracking-[0.3em] uppercase text-orange-600 mb-3">
                Archivo de artículos
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 leading-[1.0] tracking-tight">
                Historias de<br />
                <span className="text-orange-600 italic">metal y visión</span>
              </h1>
            </div>
            <p className="text-base text-zinc-500 leading-relaxed max-w-xs font-light md:text-right">
              Cada semana, una historia sobre ingeniería y las máquinas que el tiempo dejó atrás.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-10">
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">
              {articles.length} {articles.length === 1 ? "artículo" : "artículos"}
            </span>
            <div className="h-px flex-1 bg-zinc-200" />
          </div>
        </header>

        {/* CONTENT */}
        <main className="max-w-5xl mx-auto px-6 pb-32 space-y-16">

          {/* 1 — Destacado */}
          {featured && (
            <section>
              <SectionDivider label="Destacado" />
              <FeaturedArticle article={featured} />
            </section>
          )}

          {/* 2 — Grid plano 3 columnas, sin cards */}
          {flatGrid.length > 0 && (
            <section>
              <SectionDivider label="Recientes" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {flatGrid.map((article) => (
                  <FlatGridItem key={article.slug} article={article} />
                ))}
              </div>
            </section>
          )}

          {/* 3 — Lista de filas planas con imagen pequeña */}
          {flatRows.length > 0 && (
            <section>
              <SectionDivider label="Todos los artículos" />
              <div>
                {flatRows.map((article, i) => (
                  <FlatRowItem key={article.slug} article={article} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Estado vacío */}
          {articles.length === 0 && (
            <div className="text-center py-24">
              <span className="text-6xl font-black text-zinc-100">TL</span>
              <p className="mt-4 text-zinc-400 text-sm">Aún no hay artículos publicados.</p>
            </div>
          )}
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
              <a href="#" className="hover:text-orange-600 transition-colors">Archivo</a>
              <a href="#" className="hover:text-orange-600 transition-colors">Sobre nosotros</a>
              <a href="#" className="hover:text-orange-600 transition-colors">Contacto</a>
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