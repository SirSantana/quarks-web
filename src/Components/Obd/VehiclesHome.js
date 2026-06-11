"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import {
  Cpu, ChevronRight, Search, Car, AlertTriangle,
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

// ─── Design tokens ────────────────────────────────────────────────────────────
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

// ─── Tech grid ────────────────────────────────────────────────────────────────
function TechGrid() {
  return (
    <svg
      aria-hidden="true"
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
function SevBar({ high, medium, low }) {
  const total = high + medium + low || 1;
  return (
    <div className="flex h-0.5 rounded-full overflow-hidden w-full" style={{ background: C.subtle }}>
      {high   > 0 && <div style={{ width: `${(high   / total) * 100}%`, background: C.fire }} />}
      {medium > 0 && <div style={{ width: `${(medium / total) * 100}%`, background: C.warn }} />}
      {low    > 0 && <div style={{ width: `${(low    / total) * 100}%`, background: C.ok   }} />}
    </div>
  );
}

// ─── Severity legend dots ─────────────────────────────────────────────────────
function SevLegend({ high, medium, low }) {
  const items = [
    { count: high,   color: C.fire, label: "alta"  },
    { count: medium, color: C.warn, label: "media" },
    { count: low,    color: C.ok,   label: "baja"  },
  ].filter((i) => i.count > 0);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {items.map(({ count, color, label }) => (
        <span key={label} className="flex items-center gap-1.5">
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, display: "inline-block" }} />
          <span style={{ fontFamily: MONO, fontSize: 9, color: C.ghost, letterSpacing: "0.5px", textTransform: "uppercase" }}>
            {count} {label}
          </span>
        </span>
      ))}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav
      className="flex items-center justify-between px-4 md:px-12 py-5 sticky top-0 z-50"
      style={{ borderBottom: `1px solid ${C.line}`, background: "rgba(248,248,246,0.92)", backdropFilter: "blur(12px)" }}
    >
      <Link href="/" className="flex items-center gap-2.5 no-underline"
        style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px", color: C.ink }}
      >
        <Cpu size={18} />
        OBD<span style={{ color: C.fire }}>.</span>guide
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.fire }} />
      </Link>

      <ul className="hidden md:flex items-center gap-9 list-none m-0 p-0">
        {["Explorar códigos", "Sistemas", "Protocolos"].map((l) => (
          <li key={l}>
            <Link href="#" className="no-underline transition-colors duration-150"
              style={{ fontFamily: MONO, fontSize: 12, color: C.muted, letterSpacing: "0.3px" }}
            >
              {l}
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/obd2"
        className="no-underline px-4 py-2 rounded-md transition-all duration-150 hover:-translate-y-px"
        style={{ fontSize: 12, fontWeight: 600, background: C.ink, color: C.base, fontFamily: MONO, letterSpacing: "0.5px" }}
      >
        Buscar código
      </Link>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ totalMakes, totalModels, totalCodes }) {
  return (
    <header className="relative overflow-hidden max-w-[1200px] mx-auto px-4 md:px-12 pt-14 pb-0">
      <TechGrid />

      {/* Left accent — fire color like CodePage */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-sm z-10"
        style={{ background: C.fire }} />

      <div className="relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center flex-wrap gap-2 mb-8 uppercase"
          style={{ fontFamily: MONO, fontSize: 11, color: C.ghost, letterSpacing: "0.8px" }}
        >
          OBD.guide <ChevronRight size={12} />
          <span style={{ color: C.ink, fontWeight: 700 }}>Vehículos</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-end pb-10"
          style={{ borderBottom: `1px solid ${C.line}` }}
        >
          <div>
            <p className="m-0 mb-3 uppercase"
              style={{ fontFamily: MONO, fontSize: 11, color: C.ghost, letterSpacing: "2px" }}
            >
              Base de datos
            </p>
            <h1 className="m-0 mb-4 font-bold leading-none"
              style={{ fontFamily: MONO, fontSize: "clamp(44px,7vw,88px)", letterSpacing: "-3px", color: "#FF3B00" }}
            >
              Vehículos
            </h1>
            <p className="m-0"
              style={{ fontFamily: MONO, fontSize: 12, color: C.ghost, letterSpacing: "1px" }}
            >
              Encuentra los códigos OBD-II más frecuentes por marca y modelo
            </p>
          </div>

          {/* Stats panel — matches CodePage severity panel style */}
          <div className="grid grid-cols-3 gap-6 md:gap-10 p-6 rounded-[10px] border w-full md:w-auto"
            style={{ background: C.white, borderColor: C.line }}
          >
            {[
              { value: totalMakes,  label: "Marcas"  },
              { value: totalModels, label: "Modelos" },
              { value: totalCodes,  label: "Códigos" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <span className="font-bold leading-none mb-1.5"
                  style={{ fontFamily: DISPLAY, fontSize: 36, letterSpacing: "-1.5px", color: C.ink }}
                >
                  {value}
                </span>
                <span className="uppercase"
                  style={{ fontFamily: MONO, fontSize: 10, color: C.ghost, letterSpacing: "1.5px" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Model chip ───────────────────────────────────────────────────────────────
function ModelChip({ makeSlug, modelSlug, model, codeCount, high, medium, low }) {
  return (
    <Link
      href={`/vehicles/${makeSlug}/${modelSlug}`}
      className="group flex flex-col gap-3 p-4 rounded-[10px] border no-underline transition-all duration-150 hover:-translate-y-px"
      style={{ borderColor: C.line, background: C.white, color: C.ink }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = C.ink;
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = C.line;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Model name + arrow */}
      <div className="flex items-start justify-between gap-2">
        <span className="font-semibold leading-snug"
          style={{ fontFamily: DISPLAY, fontSize: 14, letterSpacing: "-0.3px", color: C.ink }}
        >
          {model}
        </span>
        <ChevronRight size={13}
          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5"
          style={{ color: C.fire }}
        />
      </div>

      {/* Severity bar */}
      <SevBar high={high} medium={medium} low={low} />

      {/* Bottom row: code count + severity legend */}
      <div className="flex items-center justify-between gap-2">
        <span style={{ fontFamily: MONO, fontSize: 9, color: C.ghost, letterSpacing: "1px", textTransform: "uppercase" }}>
          {codeCount} código{codeCount !== 1 ? "s" : ""}
        </span>
        <SevLegend high={high} medium={medium} low={low} />
      </div>
    </Link>
  );
}

// ─── Make section ─────────────────────────────────────────────────────────────
function MakeSection({ make, makeSlug, models, totalCodes, modelCount, index}) {
  const [expanded, setExpanded] = useState(true);
  const visible = expanded ? models : models.slice(0, 6);

  return (
    <div style={{ paddingBottom: 48, marginBottom: 0 }}>

      {/* Divider with make name — Option B style */}
      <div className="flex items-center gap-3" style={{ margin: "0 0 28px" }}>
        {/* Make avatar */}
         <span className="font-bold leading-none shrink-0 select-none"
            style={{
              fontFamily:    MONO,
              fontSize:      "clamp(36px,4vw,56px)",
              letterSpacing: "-2px",
              color:         C.ghost,
              lineHeight:    1,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

        {/* Make name as eyebrow */}
        <div className="flex flex-col gap-0.5">
          <span style={{ fontFamily: DISPLAY, fontSize: "clamp(18px,2vw,24px)", fontWeight: 700, letterSpacing: "-0.6px", color: C.ink, lineHeight: 1.1 }}>
            {make}
          </span>
          <span style={{ fontFamily: MONO, fontSize: 10, color: C.ghost, letterSpacing: "1.5px", textTransform: "uppercase" }}>
            {modelCount} modelo{modelCount !== 1 ? "s" : ""} · {totalCodes} código{totalCodes !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Rule */}
        <div className="flex-1 ml-2" style={{ height: 1, background: C.line }} />

        {/* Expand / collapse */}
        {models.length > 6 && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer shrink-0 transition-colors duration-150"
            style={{ fontFamily: MONO, fontSize: 10, color: C.ghost, letterSpacing: "0.5px", textTransform: "uppercase" }}
          >
            {expanded ? "Ver menos" : `Ver todos (${models.length})`}
            <ChevronRight size={12}
              style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", color: C.ghost }}
            />
          </button>
        )}
      </div>

      {/* Model grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pb-10"
        style={{ borderBottom: `1px solid ${C.line}` }}
      >
        {visible.map((m) => (
          <ModelChip key={m.modelSlug} makeSlug={makeSlug} {...m} />
        ))}
      </div>

    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <Car size={36} style={{ color: C.faint }} />
      <p className="m-0 font-semibold"
        style={{ fontFamily: DISPLAY, fontSize: 18, color: C.ghost }}
      >
        Sin resultados para "{query}"
      </p>
      <p className="m-0"
        style={{ fontFamily: MONO, fontSize: 12, color: C.faint }}
      >
        Intenta con otra marca o modelo
      </p>
    </div>
  );
}

// ─── VehiclesPage ─────────────────────────────────────────────────────────────
export default function VehiclesPage({ makes }) {
  const [search, setSearch] = useState("");

  const totalMakes  = makes.length;
  const totalModels = makes.reduce((s, m) => s + m.modelCount, 0);
  const totalCodes  = makes.reduce((s, m) => s + m.totalCodes, 0);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return makes;
    return makes
      .map((make) => {
        if (make.make.toLowerCase().includes(q)) return make;
        const models = make.models.filter((m) => m.model.toLowerCase().includes(q));
        if (models.length === 0) return null;
        return { ...make, models };
      })
      .filter(Boolean);
  }, [makes, search]);

  return (
    <div
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} min-h-screen`}
      style={{ background: C.base, color: C.ink, fontFamily: DISPLAY }}
    >
      <Navbar />
      <Hero totalMakes={totalMakes} totalModels={totalModels} totalCodes={totalCodes} />

      <div className="max-w-[1200px] mx-auto px-4 md:px-12 pb-24">

        {/* Search bar */}
        <div className="flex items-center gap-6 py-8" style={{ borderBottom: `1px solid ${C.line}` }}>
          <div className="flex items-center gap-3 flex-1 max-w-md px-4 py-2.5 rounded-lg border transition-all duration-150"
            style={{ borderColor: C.line, background: C.white }}
            onFocusCapture={(e) => e.currentTarget.style.borderColor = C.ink}
            onBlurCapture={(e) => e.currentTarget.style.borderColor = C.line}
          >
            <Search size={13} style={{ color: C.ghost, flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Buscar marca o modelo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none"
              style={{ fontFamily: MONO, fontSize: 12, color: C.ink }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="bg-transparent border-none cursor-pointer flex items-center justify-center transition-colors duration-150"
                style={{ fontFamily: MONO, fontSize: 14, color: C.ghost, lineHeight: 1 }}
              >
                ×
              </button>
            )}
          </div>

          {search && (
            <span style={{ fontFamily: MONO, fontSize: 11, color: C.ghost, letterSpacing: "0.5px" }}>
              {filtered.reduce((s, m) => s + m.models.length, 0)} modelo{filtered.reduce((s, m) => s + m.models.length, 0) !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Makes list */}
        <div className="pt-10">
          {filtered.length > 0
            ? filtered.map((make, i) => <MakeSection key={make.makeSlug} {...make} index={i}/>)
            : <EmptyState query={search} />
          }
        </div>

      </div>

      {/* Footer */}
      <footer
        className="flex flex-col md:flex-row items-center justify-between gap-3 px-4 md:px-12 py-8"
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