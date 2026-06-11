"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import {
  Cpu, ArrowLeft, ChevronRight, AlertTriangle,
  Car, Search, Filter, Share2,
} from "lucide-react";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  base:       "#F8F8F6",
  white:      "#FFFFFF",
  subtle:     "#F0F0EE",
  ink:        "#0F0F0F",
  muted:      "#6B6B6B",
  ghost:      "#9B9B96",
  faint:      "#C4C4BE",
  line:       "#E4E4E0",
  fire:       "#FF3B00",
  fireBg:     "#FFF1EE",
  fireBorder: "#FFD5CC",
  warn:       "#F59E0B",
  warnBg:     "#FFFBEB",
  ok:         "#10B981",
  okBg:       "#ECFDF5",
  body:       "#3A3A3A",
};

const SEV_CONFIG = {
  high:   { label: "Alta",  color: C.fire, bg: C.fireBg },
  medium: { label: "Media", color: C.warn, bg: C.warnBg },
  low:    { label: "Baja",  color: C.ok,   bg: C.okBg   },
};

const MONO    = "var(--font-jetbrains-mono,'JetBrains Mono',monospace)";
const DISPLAY = "var(--font-space-grotesk,'Space Grotesk',sans-serif)";

// ─── Tech grid background ─────────────────────────────────────────────────────
function TechGrid() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      preserveAspectRatio="none"
    >
      {Array.from({ length: 13 }, (_, i) => (
        <line
          key={`v${i}`}
          x1={`${(i / 12) * 100}%`} y1="0%"
          x2={`${(i / 12) * 100}%`} y2="100%"
          stroke={C.line} strokeWidth="1" opacity="0.8"
        />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <line
          key={`h${i}`}
          x1="0%" y1={`${(i / 6) * 100}%`}
          x2="100%" y2={`${(i / 6) * 100}%`}
          stroke={C.line} strokeWidth="1" opacity="0.8"
        />
      ))}
    </svg>
  );
}

// ─── Severity dot ─────────────────────────────────────────────────────────────
function SevDot({ level }) {
  const color = SEV_CONFIG[level]?.color ?? C.ghost;
  return (
    <span
      className="inline-block rounded-full shrink-0"
      style={{ width: 7, height: 7, background: color, }}
    />
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ value, label, color }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span
        className="font-bold leading-none mb-1"
        style={{ fontFamily: DISPLAY, fontSize: 40, letterSpacing: "-1.5px", color: color ?? C.ink }}
      >
        {value}
      </span>
      <span
        className="uppercase"
        style={{ fontFamily: MONO, fontSize: 10, color: C.ghost, letterSpacing: "1.5px" }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const router = useRouter();
  return (
    <nav
      className="flex items-center justify-between px-4 md:px-12 py-5 sticky top-0 z-50"
      style={{
        borderBottom: `1px solid ${C.line}`,
        background: "rgba(248,248,246,0.92)",
        backdropFilter: "blur(12px)",
      }}
    >
      <a
        href="/"
        className="flex items-center gap-2.5 no-underline"
        style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px", color: C.ink }}
      >
        <Cpu size={18} />
        OBD<span style={{ color: C.fire }}>.</span>guide
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.fire }} />
      </a>

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 bg-transparent border-none cursor-pointer"
        style={{ fontFamily: MONO, fontSize: 13, fontWeight: 500, color: C.muted }}
      >
        <ArrowLeft size={14} /> Volver
      </button>

      <button
        className="w-9 h-9 flex items-center justify-center rounded-lg border bg-transparent cursor-pointer"
        style={{ borderColor: C.line, color: C.muted }}
        title="Compartir"
      >
        <Share2 size={15} />
      </button>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ make, model, stats }) {
  return (
    <header className="relative overflow-hidden max-w-[1200px] mx-auto px-4 md:px-12 pt-14 pb-0">

      <TechGrid />

      {/* Left accent strip */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-r-sm z-10"
        style={{ background: C.ink }}
      />

      <div className="relative z-10">

        {/* Breadcrumb */}
        <div
          className="flex items-center flex-wrap gap-2 mb-8 uppercase"
          style={{ fontFamily: MONO, fontSize: 11, color: C.ghost, letterSpacing: "0.8px" }}
        >
          Vehículos <ChevronRight size={12} />
          <span style={{ color: C.muted }}>{make}</span> <ChevronRight size={12} />
          <span style={{ color: C.ink, fontWeight: 700 }}>{model}</span>
        </div>

        {/* Hero content */}
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-end pb-10"
          style={{ borderBottom: `1px solid ${C.line}` }}
        >
          {/* Left — title */}
          <div>
            <p
              className="uppercase m-0 mb-3"
              style={{ fontFamily: MONO, fontSize: 11, color: C.ghost, letterSpacing: "2px" }}
            >
              Códigos frecuentes
            </p>

            <p
              className="m-0 mb-1 font-semibold"
              style={{ fontFamily: DISPLAY, fontSize: "clamp(15px,1.5vw,18px)", color: C.muted, letterSpacing: "-0.2px" }}
            >
              {make}
            </p>

            <h1
              className="m-0 mb-4 font-bold leading-none"
              style={{ fontFamily: MONO, fontSize: "clamp(44px,7vw,88px)", letterSpacing: "-3px", color:"#FF3B00" }}
            >
              {model}
            </h1>

            <p style={{ fontFamily: MONO, fontSize: 12, color: C.ghost, letterSpacing: "1px", margin: 0 }}>
              {stats.total} código{stats.total !== 1 ? "s" : ""} OBD-II documentados
            </p>
          </div>

          {/* Right — stats */}
          <div
            className="grid grid-cols-3 gap-8 md:gap-10 p-6 rounded-[10px] border w-full md:w-auto"
            style={{ background: C.white, borderColor: C.line }}
          >
            <StatCard value={stats.high}   label="Alta"  color={C.fire} />
            <StatCard value={stats.medium} label="Media" color={C.warn} />
            <StatCard value={stats.low}    label="Baja"  color={C.ok}   />
          </div>
        </div>

      </div>
    </header>
  );
}

// ─── Code row ─────────────────────────────────────────────────────────────────
function CodeRow({ code, title, severity, category, note }) {
  const sev = SEV_CONFIG[severity] ?? SEV_CONFIG.medium;
  return (
    <Link
      href={`/obd2/${code}`}
      className="grid items-center gap-4 py-5 no-underline group transition-all duration-200 hover:pl-2"
      style={{
        gridTemplateColumns: "90px 1fr auto",
        borderBottom: `1px solid ${C.line}`,
        color: C.ink,
      }}
    >
      <span
        className="font-bold"
        style={{ fontFamily: MONO, fontSize: 16, color: C.fire, letterSpacing: "1px" }}
      >
        {code}
      </span>

      <div className="min-w-0">
        <p className="m-0 text-sm font-medium truncate" style={{ color: C.ink, fontFamily: DISPLAY }}>{title}</p>
        {note && (
          <p
            className="m-0 mt-1 text-xs leading-snug line-clamp-1"
            style={{ color: C.ghost, fontFamily: MONO }}
          >
            {note}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <SevDot level={severity} />
        <span
          className="hidden md:block uppercase"
          style={{ fontFamily: MONO, fontSize: 10, color: C.ghost, letterSpacing: "0.5px" }}
        >
          {sev.label}
        </span>
        <ChevronRight
          size={14}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: C.ghost }}
        />
      </div>
    </Link>
  );
}

// ─── Filter bar ───────────────────────────────────────────────────────────────
const FILTERS = ["Todos", "Alta", "Media", "Baja"];
const filterMap = { Todos: null, Alta: "high", Media: "medium", Baja: "low" };

function FilterBar({ active, onChange, search, onSearch }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-0 pt-10">
      <div className="flex items-center gap-1.5 flex-wrap">
        {FILTERS.map((f) => {
          const isActive = active === filterMap[f];
          const sev = f !== "Todos" ? SEV_CONFIG[filterMap[f]] : null;
          return (
            <button
              key={f}
              onClick={() => onChange(filterMap[f])}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all duration-150"
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.5px",
                background: isActive ? (sev?.color ?? C.ink) : "transparent",
                color: isActive ? C.white : C.muted,
                borderColor: isActive ? (sev?.color ?? C.ink) : C.line,
              }}
            >
              {sev && <SevDot level={filterMap[f]} />}
              {f}
            </button>
          );
        })}
      </div>

      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg border w-full sm:w-56"
        style={{ borderColor: C.line, background: C.white }}
      >
        <Search size={13} style={{ color: C.ghost }} />
        <input
          type="text"
          placeholder="Buscar código o descripción..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-xs"
          style={{ fontFamily: MONO, color: C.ink, fontSize: 12 }}
        />
      </div>
    </div>
  );
}

// ─── VehiclePage ──────────────────────────────────────────────────────────────
export default function VehiclePage({ make, model, codes, stats }) {
  const [sevFilter, setSevFilter] = useState(null);
  const [search,    setSearch   ] = useState("");

  const filtered = codes.filter((c) => {
    const matchSev = sevFilter ? c.severity === sevFilter : true;
    const q        = search.toLowerCase();
    const matchQ   = q
      ? c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q)
      : true;
    return matchSev && matchQ;
  });

  return (
    <div
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} min-h-screen`}
      style={{ background: C.base, color: C.ink, fontFamily: DISPLAY }}
    >
      <Navbar />
      <Hero make={make} model={model} stats={stats} />

      <div className="max-w-[1200px] mx-auto px-4 md:px-12 pb-24">

        <FilterBar
          active={sevFilter}
          onChange={setSevFilter}
          search={search}
          onSearch={setSearch}
        />

        <div
          className="flex items-center justify-between py-4 mb-0"
          style={{ borderBottom: `1px solid ${C.line}` }}
        >
          <span style={{ fontFamily: MONO, fontSize: 11, color: C.ghost, letterSpacing: "1px" }}>
            {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          </span>
          {(sevFilter || search) && (
            <button
              onClick={() => { setSevFilter(null); setSearch(""); }}
              className="flex items-center gap-1 text-xs cursor-pointer bg-transparent border-none"
              style={{ fontFamily: MONO, color: C.fire }}
            >
              Limpiar filtros ×
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div>
            {filtered.map((c) => (
              <CodeRow key={c.code} {...c} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Search size={32} style={{ color: C.faint }} />
            <p style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 600, color: C.ghost, margin: 0 }}>
              Sin resultados
            </p>
            <p style={{ fontFamily: MONO, fontSize: 12, color: C.faint, margin: 0 }}>
              Intenta con otro código o descripción
            </p>
          </div>
        )}

        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: `1px solid ${C.line}` }}
        >
          <div>
            <p
              className="m-0 mb-1 uppercase"
              style={{ fontFamily: MONO, fontSize: 10, color: C.ghost, letterSpacing: "2px" }}
            >
              Explorar más
            </p>
            <p
              className="m-0 font-semibold"
              style={{ fontFamily: DISPLAY, fontSize: 18, letterSpacing: "-0.4px" }}
            >
              ¿Otro vehículo?
            </p>
          </div>
          <Link
            href="/vehicles"
            className="flex items-center gap-2 no-underline px-5 py-3 rounded-lg transition-all duration-150 hover:-translate-y-px"
            style={{ background: C.ink, color: C.base, fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.5px" }}
          >
            Ver todos los vehículos <ChevronRight size={14} />
          </Link>
        </div>

      </div>

      <footer
        className="flex flex-col md:flex-row items-center justify-between gap-3 px-4 md:px-12 py-8"
        style={{ borderTop: `1px solid ${C.line}` }}
      >
        <div
          className="flex items-center gap-2 font-bold"
          style={{ fontFamily: DISPLAY, fontSize: 15 }}
        >
          <Cpu size={15} /> OBD<span style={{ color: C.fire }}>.</span>guide
        </div>
        <span style={{ fontFamily: MONO, fontSize: 12, color: C.ghost }}>
          Referencia técnica · SAE J1979 · ISO 15031
        </span>
        <span style={{ fontFamily: MONO, fontSize: 12, color: C.faint }}>
          v2.4.1 · 2026
        </span>
      </footer>

    </div>
  );
}