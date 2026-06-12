"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import {
  Cpu, ArrowLeft, ChevronRight, Search, Share2, Car,
} from "lucide-react";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"], variable: "--font-space-grotesk", display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap",
});

// ─── Tokens ───────────────────────────────────────────────────────────────────
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
};

const MONO    = "var(--font-jetbrains-mono,'JetBrains Mono',monospace)";
const DISPLAY = "var(--font-space-grotesk,'Space Grotesk',sans-serif)";

const SEV = {
  high:   { label: "Alta",  color: C.fire, bg: C.fireBg  },
  medium: { label: "Media", color: C.warn, bg: C.warnBg  },
  low:    { label: "Baja",  color: C.ok,   bg: C.okBg    },
};

// ─── Tech grid ────────────────────────────────────────────────────────────────
function TechGrid() {
  return (
    <svg aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      preserveAspectRatio="none"
    >
      {Array.from({ length: 13 }, (_, i) => (
        <line key={`v${i}`}
          x1={`${(i / 12) * 100}%`} y1="0%"
          x2={`${(i / 12) * 100}%`} y2="100%"
          stroke={C.line} strokeWidth="1" opacity="0.8"
        />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={`h${i}`}
          x1="0%" y1={`${(i / 6) * 100}%`}
          x2="100%" y2={`${(i / 6) * 100}%`}
          stroke={C.line} strokeWidth="1" opacity="0.8"
        />
      ))}
    </svg>
  );
}

// ─── Severity bar ─────────────────────────────────────────────────────────────
function SevBar({ high, medium, low, height = 3 }) {
  const total = high + medium + low || 1;
  return (
    <div className="flex overflow-hidden w-full rounded-full" style={{ height, background: C.subtle }}>
      {high   > 0 && <div style={{ width: `${(high   / total) * 100}%`, background: C.fire }} />}
      {medium > 0 && <div style={{ width: `${(medium / total) * 100}%`, background: C.warn }} />}
      {low    > 0 && <div style={{ width: `${(low    / total) * 100}%`, background: C.ok   }} />}
    </div>
  );
}

function SevDot({ level }) {
  return (
    <span className="inline-block rounded-full shrink-0"
      style={{ width: 7, height: 7, background: SEV[level]?.color ?? C.ghost }}
    />
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ value, label, color }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="font-bold leading-none mb-1"
        style={{ fontFamily: DISPLAY, fontSize: 40, letterSpacing: "-1.5px", color: color ?? C.ink }}
      >
        {value}
      </span>
      <span className="uppercase"
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
    <nav className="flex items-center justify-between px-4 md:px-12 py-5 sticky top-0 z-50"
      style={{ borderBottom: `1px solid ${C.line}`, background: "rgba(248,248,246,0.92)", backdropFilter: "blur(12px)" }}
    >
      <a href="/" className="flex items-center gap-2.5 no-underline"
        style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px", color: C.ink }}
      >
        <Cpu size={18} />
        OBD<span style={{ color: C.fire }}>.</span>guide
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.fire }} />
      </a>

      <button onClick={() => router.back()}
        className="flex items-center gap-2 bg-transparent border-none cursor-pointer"
        style={{ fontFamily: MONO, fontSize: 13, fontWeight: 500, color: C.muted }}
      >
        <ArrowLeft size={14} /> Volver
      </button>

      <button className="w-9 h-9 flex items-center justify-center rounded-lg border bg-transparent cursor-pointer"
        style={{ borderColor: C.line, color: C.muted }} title="Compartir"
      >
        <Share2 size={15} />
      </button>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ make, stats }) {
  return (
    <header className="relative overflow-hidden max-w-[1200px] mx-auto px-4 md:px-12 pt-14 pb-0">
      <TechGrid />

      {/* Left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-sm z-10"
        style={{ background: C.fire }}
      />

      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center flex-wrap gap-2 mb-8 uppercase"
          style={{ fontFamily: MONO, fontSize: 11, color: C.ghost, letterSpacing: "0.8px" }}
        >
          <Link href="/vehicles" className="no-underline hover:underline" style={{ color: C.ghost }}>
            Vehículos
          </Link>
          <ChevronRight size={12} />
          <span style={{ color: C.ink, fontWeight: 700 }}>{make}</span>
        </div>

        {/* Title + stats */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-end pb-10"
          style={{ borderBottom: `1px solid ${C.line}` }}
        >
          <div>
            <p className="uppercase m-0 mb-3"
              style={{ fontFamily: MONO, fontSize: 11, color: C.ghost, letterSpacing: "2px" }}
            >
              Marca · Vehículos
            </p>

            <h1 className="m-0 mb-4 font-bold leading-none"
              style={{ fontFamily: DISPLAY, fontSize: "clamp(44px,7vw,88px)", letterSpacing: "-3px", color: C.fire }}
            >
              {make}
            </h1>

            <p style={{ fontFamily: MONO, fontSize: 12, color: C.ghost, letterSpacing: "1px", margin: 0 }}>
              {stats.totalModels} modelo{stats.totalModels !== 1 ? "s" : ""} · {stats.totalCodes} código{stats.totalCodes !== 1 ? "s" : ""} OBD-II documentados
            </p>
          </div>

          {/* Stats panel */}
          <div className="grid grid-cols-3 gap-8 md:gap-10 p-6 rounded-[10px] border w-full md:w-auto"
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

// ─── Model card ───────────────────────────────────────────────────────────────
function ModelCard({ makeSlug, model, modelSlug, codeCount, high, medium, low, topCodes }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/vehicles/${makeSlug}/${modelSlug}`}
      className="group flex flex-col gap-4 p-5 no-underline transition-all duration-150"
      style={{
        border:       `1px solid ${hovered ? C.ink : C.line}`,
        borderRadius: 10,
        background:   C.white,
        color:        C.ink,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Model name + arrow */}
      <div className="flex items-start justify-between gap-3">
        <h2 className="m-0 font-bold leading-snug"
          style={{ fontFamily: DISPLAY, fontSize: "clamp(16px,2vw,20px)", letterSpacing: "-0.5px" }}
        >
          {model}
        </h2>
        <ChevronRight size={16}
          className="shrink-0 mt-0.5 transition-all duration-150"
          style={{ color: hovered ? C.fire : C.faint, transform: hovered ? "translateX(2px)" : "none" }}
        />
      </div>

      {/* Severity bar */}
      <SevBar high={high} medium={medium} low={low} height={4} />

      {/* Top code chips */}
      {topCodes.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {topCodes.map((c) => (
            <span key={c.code}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md"
              style={{
                fontFamily:  MONO,
                fontSize:    11,
                fontWeight:  700,
                color:       SEV[c.severity]?.color ?? C.ghost,
                background:  SEV[c.severity]?.bg    ?? C.subtle,
                letterSpacing: "0.5px",
              }}
            >
              <SevDot level={c.severity} />
              {c.code}
            </span>
          ))}
          {codeCount > 3 && (
            <span className="flex items-center px-2 py-1 rounded-md"
              style={{ fontFamily: MONO, fontSize: 11, color: C.ghost, background: C.subtle }}
            >
              +{codeCount - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2"
        style={{ borderTop: `1px solid ${C.subtle}` }}
      >
        <span style={{ fontFamily: MONO, fontSize: 10, color: C.ghost, letterSpacing: "1px" }}>
          {codeCount} código{codeCount !== 1 ? "s" : ""}
        </span>
        <div className="flex items-center gap-1.5">
          {high   > 0 && <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.fire }} />}
          {medium > 0 && <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.warn }} />}
          {low    > 0 && <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.ok   }} />}
        </div>
      </div>
    </Link>
  );
}

// ─── Search & filter bar ──────────────────────────────────────────────────────
const FILTERS  = ["Todos", "Alta", "Media", "Baja"];
const filterMap = { Todos: null, Alta: "high", Media: "medium", Baja: "low" };

function FilterBar({ search, onSearch, active, onChange, total }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-8"
      style={{ borderBottom: `1px solid ${C.line}` }}
    >
      {/* Search */}
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg border w-full sm:max-w-xs"
        style={{ borderColor: search ? C.ink : C.line, background: C.white, transition: "border-color 0.15s" }}
      >
        <Search size={13} style={{ color: search ? C.ink : C.ghost, flexShrink: 0 }} />
        <input type="text" placeholder="Buscar modelo..."
          value={search} onChange={(e) => onSearch(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none"
          style={{ fontFamily: MONO, fontSize: 13, color: C.ink }}
        />
        {search && (
          <button onClick={() => onSearch("")}
            className="bg-transparent border-none cursor-pointer"
            style={{ fontFamily: MONO, fontSize: 14, color: C.ghost, lineHeight: 1 }}
          >×</button>
        )}
      </div>

      {/* Severity pills + count */}
      <div className="flex items-center gap-2 flex-wrap">
        {FILTERS.map((f) => {
          const isActive = active === filterMap[f];
          const sev      = f !== "Todos" ? SEV[filterMap[f]] : null;
          return (
            <button key={f} onClick={() => onChange(filterMap[f])}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border cursor-pointer transition-all duration-150"
              style={{
                fontFamily:  MONO, fontSize: 11, letterSpacing: "0.5px",
                background:  isActive ? (sev?.color ?? C.ink) : "transparent",
                color:       isActive ? C.white : C.muted,
                borderColor: isActive ? (sev?.color ?? C.ink) : C.line,
              }}
            >
              {sev && <SevDot level={filterMap[f]} />}
              {f}
            </button>
          );
        })}
        <span style={{ fontFamily: MONO, fontSize: 11, color: C.ghost, marginLeft: 4 }}>
          {total} modelo{total !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="flex items-center justify-center w-14 h-14 rounded-xl" style={{ background: C.subtle }}>
        <Car size={22} style={{ color: C.faint }} />
      </div>
      <p className="m-0 font-semibold" style={{ fontFamily: DISPLAY, fontSize: 18, color: C.ghost }}>
        Sin resultados{query ? ` para "${query}"` : ""}
      </p>
      <p className="m-0" style={{ fontFamily: MONO, fontSize: 12, color: C.faint }}>
        Intenta con otro nombre de modelo
      </p>
    </div>
  );
}

// ─── MakePage ─────────────────────────────────────────────────────────────────
export default function MakePage({ make, makeSlug, models, stats }) {
  const [search,    setSearch]    = useState("");
  const [sevFilter, setSevFilter] = useState(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return models.filter((m) => {
      const matchQ   = q ? m.model.toLowerCase().includes(q) : true;
      const matchSev = sevFilter
        ? (sevFilter === "high"   && m.high   > 0) ||
          (sevFilter === "medium" && m.medium  > 0) ||
          (sevFilter === "low"    && m.low     > 0)
        : true;
      return matchQ && matchSev;
    });
  }, [models, search, sevFilter]);

  return (
    <div className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} min-h-screen`}
      style={{ background: C.base, color: C.ink, fontFamily: DISPLAY }}
    >
      <Navbar />
      <Hero make={make} stats={stats} />

      <div className="max-w-[1200px] mx-auto px-4 md:px-12 pb-24">

        <FilterBar
          search={search} onSearch={setSearch}
          active={sevFilter} onChange={setSevFilter}
          total={filtered.length}
        />

        {/* Model grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
            {filtered.map((m) => (
              <ModelCard key={m.modelSlug} makeSlug={makeSlug} {...m} />
            ))}
          </div>
        ) : (
          <EmptyState query={search} />
        )}

        {/* Bottom nav */}
        <div className="mt-16 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: `1px solid ${C.line}` }}
        >
          <div>
            <p className="m-0 mb-1 uppercase"
              style={{ fontFamily: MONO, fontSize: 10, color: C.ghost, letterSpacing: "2px" }}
            >
              Explorar más
            </p>
            <p className="m-0 font-semibold" style={{ fontFamily: DISPLAY, fontSize: 18, letterSpacing: "-0.4px" }}>
              ¿Otra marca?
            </p>
          </div>
          <Link href="/vehicles"
            className="flex items-center gap-2 no-underline px-5 py-3 rounded-lg transition-all duration-150 hover:-translate-y-px"
            style={{ background: C.ink, color: C.base, fontFamily: MONO, fontSize: 12, fontWeight: 600, letterSpacing: "0.5px" }}
          >
            Ver todas las marcas <ChevronRight size={14} />
          </Link>
        </div>

      </div>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row items-center justify-between gap-3 px-4 md:px-12 py-8"
        style={{ borderTop: `1px solid ${C.line}` }}
      >
        <div className="flex items-center gap-2 font-bold" style={{ fontFamily: DISPLAY, fontSize: 15 }}>
          <Cpu size={15} /> OBD<span style={{ color: C.fire }}>.</span>guide
        </div>
        <span style={{ fontFamily: MONO, fontSize: 12, color: C.ghost }}>
          Referencia técnica · SAE J1979 · ISO 15031
        </span>
        <span style={{ fontFamily: MONO, fontSize: 12, color: C.faint }}>v2.4.1 · 2026</span>
      </footer>

    </div>
  );
}