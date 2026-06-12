"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import ReactMarkdown from "react-markdown";
import {
  Cpu, ChevronRight, ChevronLeft, BookOpen, AlertTriangle,
  Car, Activity, Search, Wrench, DollarSign, Wind,
  Code2, HelpCircle, Play, Pause, ArrowLeft, CheckCircle2, Zap,
} from "lucide-react";
import Link from "next/link";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

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
  fireDeep:   "#7A3A30",
  warn:       "#F59E0B",
  warnBg:     "#FFFBEB",
  warnBorder: "#FDE68A",
  warnDeep:   "#78350F",
  ok:         "#10B981",
  okBg:       "#ECFDF5",
  body:       "#3A3A3A",
};

const SEV = {
  high:   { label: "Alta",  color: C.fire, bg: C.fireBg, barW: "100%" },
  medium: { label: "Media", color: C.warn, bg: C.warnBg, barW: "60%"  },
  low:    { label: "Baja",  color: C.ok,   bg: C.okBg,   barW: "25%"  },
};

const PROB = {
  alta:  { color: C.fire, w: "85%" },
  media: { color: C.warn, w: "52%" },
  baja:  { color: C.ok,   w: "22%" },
};

const DIFF = {
  básico:     { color: C.ok,   label: "Básico"     },
  intermedio: { color: C.warn, label: "Intermedio" },
  avanzado:   { color: C.fire, label: "Avanzado"   },
};

const SECTION_META = {
  meaning:   { eyebrow: "SIGNIFICADO",  icon: BookOpen,      question: "¿Qué significa este código?",  color: C.ink  },
  serious:   { eyebrow: "RIESGO",       icon: AlertTriangle, question: "¿Qué tan grave es?",           color: C.fire },
  drive:     { eyebrow: "CONDUCCIÓN",   icon: Car,           question: "¿Es seguro conducir?",         color: C.warn },
  symptoms:  { eyebrow: "SÍNTOMAS",     icon: Activity,      question: "¿Qué síntomas notarás?",       color: C.ink  },
  causes:    { eyebrow: "CAUSAS",       icon: Search,        question: "¿Por qué ocurre?",             color: C.fire },
  diagnosis: { eyebrow: "DIAGNÓSTICO",  icon: Cpu,           question: "¿Cómo diagnosticarlo?",        color: C.ink  },
  repairs:   { eyebrow: "REPARACIÓN",   icon: Wrench,        question: "¿Cómo se repara?",             color: C.ok   },
  costs:     { eyebrow: "COSTOS",       icon: DollarSign,    question: "¿Cuánto cuesta repararlo?",    color: C.warn },
  vehicles:  { eyebrow: "VEHÍCULOS",    icon: Car,           question: "¿Qué autos afecta?",           color: C.ink  },
  emissions: { eyebrow: "EMISIONES",    icon: Wind,          question: "¿Afecta las emisiones?",       color: C.ok   },
  related:   { eyebrow: "RELACIONADOS", icon: Code2,         question: "¿Códigos similares?",          color: C.fire },
  faq:       { eyebrow: "FAQ",          icon: HelpCircle,    question: "Preguntas frecuentes",         color: C.ink  },
};

// ─── Parse sections from markdown ─────────────────────────────────────────────
function parseMarkdownSections(content) {
  const sections = [];
  const regex = /##\s+(.*?)\s*\{#(\w+)\}([\s\S]*?)(?=##\s|\$)/g;
  let match;
  while ((match = regex.exec(content + "$")) !== null) {
    const body = match[3].trim();
    // Extract first bullet points / paragraphs as "key points" (max 4)
    const lines = body.split("\n").filter(Boolean);
    const keyPoints = [];
    for (const l of lines) {
      const stripped = l.replace(/^[-*]\s+/, "").replace(/\*\*/g, "").trim();
      if (stripped && !stripped.startsWith("#") && !stripped.startsWith("```") && keyPoints.length < 4) {
        keyPoints.push(stripped.length > 90 ? stripped.slice(0, 88) + "…" : stripped);
      }
    }
    sections.push({ id: match[2], heading: match[1].trim(), body, keyPoints });
  }
  return sections;
}

// ─── Minimal markdown for content slides ─────────────────────────────────────
function buildSlideComponents() {
  return {
    h3: ({ children }) => (
      <h3 style={{ fontFamily: "var(--font-space-grotesk,'Space Grotesk',sans-serif)", fontSize: "clamp(18px,2.2vw,26px)", fontWeight: 700, color: C.ink, marginTop: 24, marginBottom: 10, letterSpacing: "-0.5px" }}>{children}</h3>
    ),
    p: ({ children }) => (
      <p style={{ fontSize: "clamp(15px,1.8vw,20px)", lineHeight: 1.7, color: C.body, marginBottom: 16 }}>{children}</p>
    ),
    strong: ({ children }) => <strong style={{ fontWeight: 700, color: C.ink }}>{children}</strong>,
    ul: ({ children }) => <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>{children}</ul>,
    ol: ({ children }) => <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>{children}</ol>,
    li: ({ children }) => (
      <li style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "12px 0", borderBottom: `1px solid ${C.subtle}`, fontSize: "clamp(14px,1.7vw,18px)", color: C.body, lineHeight: 1.5 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.fire, flexShrink: 0, marginTop: 7 }} />
        <span>{children}</span>
      </li>
    ),
    blockquote: ({ children }) => (
      <div style={{ display: "flex", gap: 14, padding: "16px 20px", borderRadius: 10, background: C.fireBg, border: `1px solid ${C.fireBorder}`, margin: "16px 0" }}>
        <AlertTriangle size={16} style={{ color: C.fire, flexShrink: 0, marginTop: 2 }} />
        <div style={{ fontSize: "clamp(14px,1.6vw,17px)", lineHeight: 1.65, color: C.fireDeep }}>{children}</div>
      </div>
    ),
    code: ({ inline, className, children }) => {
      if (inline) return <code style={{ background: C.subtle, color: C.ink, fontSize: "0.9em", padding: "2px 8px", borderRadius: 5, fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)" }}>{children}</code>;
      const lang = (className || "").replace("language-", "");

      if (lang === "cause") {
        const lines = String(children).trim().split("\n").map((l) => {
          const [title, probability, ...rest] = l.split("|").map((s) => s.trim());
          return { title, probability: probability || "baja", detail: rest.join("|").trim() };
        });
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {lines.map((c, i) => {
              const p = PROB[c.probability] ?? PROB.baja;
              return (
                <div key={i} style={{ padding: "16px 0", borderBottom: i < lines.length - 1 ? `1px solid ${C.subtle}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontFamily: "var(--font-space-grotesk,'Space Grotesk',sans-serif)", fontSize: "clamp(14px,1.7vw,18px)", fontWeight: 600, color: C.ink }}>{c.title}</span>
                    <span style={{ fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 11, textTransform: "uppercase", fontWeight: 700, color: p.color }}>{c.probability}</span>
                  </div>
                  <div style={{ height: 4, background: C.subtle, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: p.w, background: p.color, borderRadius: 2 }} />
                  </div>
                </div>
              );
            })}
          </div>
        );
      }

      if (lang === "repair") {
        const text = Array.isArray(children) ? children.join("") : String(children);
        const blocks = text.trim().split(/\n\s*\n/).filter(Boolean);
        return (
          <div>
            {blocks.map((block, i) => {
              const lines = block.split(/\r?\n/).filter(Boolean);
              const [title, time, difficulty] = (lines[0] || "").split("|").map((s) => s.trim());
              const d = DIFF[difficulty] ?? DIFF["básico"];
              return (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "14px 0", borderBottom: i < blocks.length - 1 ? `1px solid ${C.subtle}` : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.ink, color: C.base, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "var(--font-space-grotesk,'Space Grotesk',sans-serif)", fontSize: "clamp(14px,1.7vw,17px)", fontWeight: 600, color: C.ink, margin: "0 0 4px" }}>{title}</p>
                    <div style={{ display: "flex", gap: 10 }}>
                      {time && <span style={{ fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 10, color: C.ghost, textTransform: "uppercase" }}>{time}</span>}
                      {difficulty && <span style={{ fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 10, fontWeight: 700, color: d.color, textTransform: "uppercase" }}>{d.label}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }

      if (lang === "cost") {
        const rows = String(children).trim().split("\n").map((l) => {
          const [item, min, max, note] = l.split("|").map((s) => s.trim());
          return { item, min, max, note };
        });
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {rows.map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < rows.length - 1 ? `1px solid ${C.subtle}` : "none" }}>
                <span style={{ fontSize: "clamp(14px,1.7vw,17px)", color: C.body }}>{r.item}</span>
                <span style={{ fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontWeight: 700, fontSize: "clamp(15px,1.8vw,19px)", color: C.ink }}>${r.min}–${r.max}</span>
              </div>
            ))}
          </div>
        );
      }

      if (lang === "diagnosis") {
        const steps = String(children).trim().split("\n").filter(Boolean);
        return (
          <div>
            {steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 16, padding: "12px 0", borderBottom: i < steps.length - 1 ? `1px solid ${C.subtle}` : "none" }}>
                <span style={{ fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 12, fontWeight: 700, color: C.fire, flexShrink: 0, minWidth: 28 }}>0{i + 1}</span>
                <span style={{ fontSize: "clamp(14px,1.6vw,17px)", lineHeight: 1.6, color: C.body }}>{step}</span>
              </div>
            ))}
          </div>
        );
      }

      if (lang === "callout" || lang === "warn") {
        const isWarn = lang === "warn";
        return (
          <div style={{ display: "flex", gap: 14, padding: "16px 20px", borderRadius: 10, background: isWarn ? C.warnBg : C.fireBg, border: `1px solid ${isWarn ? C.warnBorder : C.fireBorder}`, margin: "12px 0" }}>
            <AlertTriangle size={16} style={{ color: isWarn ? C.warn : C.fire, flexShrink: 0, marginTop: 2 }} />
            <p style={{ margin: 0, fontSize: "clamp(13px,1.5vw,16px)", lineHeight: 1.65, color: isWarn ? C.warnDeep : C.fireDeep }}>{String(children).trim()}</p>
          </div>
        );
      }

      if (lang === "related") {
        const codes = String(children).trim().split(/\s+/);
        return (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
            {codes.map((rc) => (
              <Link key={rc} href={`/obd2/${rc}`} style={{ padding: "10px 20px", border: `1px solid ${C.line}`, borderRadius: 8, fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: "clamp(14px,1.6vw,18px)", fontWeight: 700, color: C.fire, textDecoration: "none" }}>{rc}</Link>
            ))}
          </div>
        );
      }

      return <pre style={{ background: C.subtle, borderRadius: 8, padding: 14, fontSize: 13, fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", color: C.ink, overflowX: "auto" }}><code>{children}</code></pre>;
    },
  };
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimCounter({ to, duration = 800, suffix = "" }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [to, duration]);
  return <>{val}{suffix}</>;
}

// ─── Global CSS keyframes ─────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @keyframes pulse    { 0%,100%{opacity:1}          50%{opacity:.3}         }
  @keyframes fadeUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn   { from{opacity:0}              to{opacity:1}           }
  @keyframes slideInL { from{opacity:0;transform:translateX(-48px)} to{opacity:1;transform:translateX(0)} }
  @keyframes slideInR { from{opacity:0;transform:translateX(48px)}  to{opacity:1;transform:translateX(0)} }
  @keyframes scaleIn  { from{opacity:0;transform:scale(0.88)}       to{opacity:1;transform:scale(1)}      }
  @keyframes barGrow  { from{width:0} to{width:var(--bar-w)}        }
  @keyframes scanline { 0%{top:-10%} 100%{top:110%}                 }
  @keyframes ticker   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  ::-webkit-scrollbar { display:none; }
`;

// ─── Decorative grid ──────────────────────────────────────────────────────────
function Grid({ cols = 16, rows = 9, color = C.line, opacity = 1 }) {
  return (
    <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity }} preserveAspectRatio="none">
      {Array.from({ length: cols + 1 }, (_, i) => (
        <line key={`v${i}`} x1={`${(i / cols) * 100}%`} y1="0%" x2={`${(i / cols) * 100}%`} y2="100%" stroke={color} strokeWidth="0.5" />
      ))}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <line key={`h${i}`} x1="0%" y1={`${(i / rows) * 100}%`} x2="100%" y2={`${(i / rows) * 100}%`} stroke={color} strokeWidth="0.5" />
      ))}
    </svg>
  );
}

// ─── Scanline overlay ─────────────────────────────────────────────────────────
function Scanline() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 2 }}>
      <div style={{ position: "absolute", left: 0, right: 0, height: "20%", background: "linear-gradient(to bottom, transparent, rgba(255,59,0,0.03), transparent)", animation: "scanline 4s linear infinite" }} />
    </div>
  );
}

// ─── Ticker tape ─────────────────────────────────────────────────────────────
function Ticker({ code, sections }) {
  const items = sections.map((s) => {
    const m = SECTION_META[s.id];
    return m?.eyebrow ?? s.id.toUpperCase();
  });
  const full = [...items, ...items].join("  ·  ");
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, background: C.subtle, height: 28, display: "flex", alignItems: "center" }}>
      <span style={{ display: "inline-block", animation: "ticker 30s linear infinite", fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 10, letterSpacing: "2px", color: C.ghost, textTransform: "uppercase" }}>
        {full}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{full}
      </span>
    </div>
  );
}

// ─── SLIDE 0: Cover ───────────────────────────────────────────────────────────
function SlideCover({ frontmatter, active }) {
  const { code, title, category, severity } = frontmatter;
  const sev = SEV[severity] ?? SEV.medium;
  if (!active) return null;

  return (
    <div style={{ position: "absolute", inset: 0, background: C.base, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      <Grid cols={20} rows={12} color={C.line} opacity={0.8} />

      {/* Accent stripes */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: C.fire }} />
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: C.fire }} />

      {/* Corner marks */}
      {[
        { k: "tl", style: { top: 20, left: 20, borderTop: `2px solid ${C.fire}`, borderLeft: `2px solid ${C.fire}` } },
        { k: "tr", style: { top: 20, right: 20, borderTop: `2px solid ${C.fire}`, borderRight: `2px solid ${C.fire}` } },
        { k: "bl", style: { bottom: 20, left: 20, borderBottom: `2px solid ${C.fire}`, borderLeft: `2px solid ${C.fire}` } },
        { k: "br", style: { bottom: 20, right: 20, borderBottom: `2px solid ${C.fire}`, borderRight: `2px solid ${C.fire}` } },
      ].map(({ k, style }) => (
        <div key={k} style={{ position: "absolute", width: 24, height: 24, opacity: 0.5, ...style }} />
      ))}

      {/* Brand top */}
      <div style={{ position: "absolute", top: 20, left: 0, right: 0, display: "flex", justifyContent: "center", animation: "fadeIn 0.6s ease both" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-space-grotesk,'Space Grotesk',sans-serif)", fontWeight: 700, fontSize: 14, color: C.muted }}>
          <Cpu size={14} style={{ color: C.fire }} />
          OBD<span style={{ color: C.fire }}>.</span>guide
        </div>
      </div>

      {/* Main content */}
      <div style={{ textAlign: "center", padding: "0 clamp(32px,8vw,120px)", position: "relative", zIndex: 3, maxWidth: 760, width: "100%" }}>

        {/* Eyebrow */}
        <div style={{ animation: "fadeUp 0.5s ease both", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ height: 1, width: 40, background: C.fire, opacity: 0.4 }} />
          <span style={{ fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", color: C.ghost }}>
            Código OBD-II · {category}
          </span>
          <div style={{ height: 1, width: 40, background: C.fire, opacity: 0.4 }} />
        </div>

        {/* Giant code */}
        <div style={{
          fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
          fontSize: "clamp(80px,18vw,180px)",
          fontWeight: 700,
          color: C.ink,
          letterSpacing: "-4px",
          lineHeight: 0.9,
          marginBottom: 24,
          animation: "scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both",
        }}>
          {code.split("").map((ch, i) => (
            <span key={i} style={{ color: /\d/.test(ch) ? C.fire : C.ink }}>{ch}</span>
          ))}
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "var(--font-space-grotesk,'Space Grotesk',sans-serif)",
          fontSize: "clamp(17px,3vw,34px)",
          fontWeight: 700,
          letterSpacing: "-1px",
          lineHeight: 1.25,
          color: C.ink,
          margin: "0 auto 32px",
          maxWidth: 560,
          animation: "fadeUp 0.6s ease 0.25s both",
        }}>
          {title}
        </h1>

        {/* Severity pill */}
        <div style={{ animation: "fadeUp 0.6s ease 0.4s both", display: "inline-flex", alignItems: "center", gap: 12, padding: "10px 24px", borderRadius: 100, border: `1px solid ${sev.color}44`, background: sev.bg }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: sev.color, animation: "pulse 2s infinite", display: "inline-block" }} />
          <span style={{ fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", color: sev.color, fontWeight: 700 }}>
            Severidad {sev.label}
          </span>
        </div>
      </div>

      {/* Bottom hint */}
      <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, display: "flex", justifyContent: "center", animation: "fadeIn 1s ease 0.8s both" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: C.faint }}>
          <ChevronRight size={12} style={{ color: C.fire }} />
          Presiona para continuar
          <ChevronRight size={12} style={{ color: C.fire }} />
        </div>
      </div>
    </div>
  );
}

// ─── SLIDE: Question card ─────────────────────────────────────────────────────
function SlideQuestion({ section, meta, active, code }) {
  if (!active) return null;
  const Icon = meta?.icon ?? BookOpen;
  const accent = meta?.color ?? C.fire;

  return (
    <div style={{ position: "absolute", inset: 0, background: C.base, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      <Grid cols={16} rows={9} color={C.line} opacity={0.8} />

      {/* Accent bar */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: accent }} />

      {/* Giant background eyebrow */}
      <div style={{
        position: "absolute",
        fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
        fontSize: "clamp(80px,15vw,180px)",
        fontWeight: 700,
        color: C.subtle,
        letterSpacing: "-4px",
        bottom: -20,
        right: -10,
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        animation: "fadeIn 0.4s ease both",
      }}>
        {meta?.eyebrow?.replace(/\s/g, "")}
      </div>

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 clamp(48px,10vw,140px)", maxWidth: 680, width: "100%" }}>

        {/* Icon chip */}
        <div style={{ animation: "scaleIn 0.45s cubic-bezier(0.22,1,0.36,1) both", display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 20px", borderRadius: 100, background: C.white, border: `1px solid ${C.line}`, marginBottom: 28 }}>
          <Icon size={16} style={{ color: accent }} />
          <span style={{ fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", color: C.ghost }}>
            {meta?.eyebrow ?? section.id}
          </span>
        </div>

        {/* Question */}
        <h2 style={{
          fontFamily: "var(--font-space-grotesk,'Space Grotesk',sans-serif)",
          fontSize: "clamp(28px,5vw,58px)",
          fontWeight: 700,
          letterSpacing: "-2px",
          lineHeight: 1.1,
          color: C.ink,
          margin: "0 0 24px",
          overflowWrap: "break-word",
          wordBreak: "break-word",
          animation: "fadeUp 0.5s ease 0.1s both",
        }}>
          {meta?.question ?? section.heading}
        </h2>

        {/* Code tag */}
        <div style={{ animation: "fadeIn 0.5s ease 0.3s both" }}>
          <span style={{ fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 13, fontWeight: 700, color: accent, letterSpacing: "1px", padding: "4px 12px", borderRadius: 6, background: `${accent}15`, border: `1px solid ${accent}30` }}>
            {code}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── SLIDE: Content ───────────────────────────────────────────────────────────
function SlideContent({ section, meta, active, slideNum, total }) {
  if (!active) return null;
  const Icon = meta?.icon ?? BookOpen;
  const accent = meta?.color ?? C.fire;
  const mdComponents = buildSlideComponents();

  return (
    <div style={{ position: "absolute", inset: 0, background: C.white, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Grid cols={16} rows={9} color={C.line} opacity={0.5} />
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: accent }} />

      {/* Header */}
      <div style={{ padding: "clamp(20px,3vw,36px) clamp(24px,4vw,56px) 0 clamp(32px,4vw,64px)", flexShrink: 0, position: "relative", zIndex: 2, animation: "slideInL 0.45s ease both", maxWidth: 820 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: C.base, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={15} style={{ color: accent }} />
          </div>
          <span style={{ fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: C.ghost }}>
            {meta?.eyebrow}
          </span>
          <div style={{ flex: 1, height: 1, background: C.line }} />
          <span style={{ fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 10, color: C.faint, flexShrink: 0 }}>
            {String(slideNum).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <h2 style={{ fontFamily: "var(--font-space-grotesk,'Space Grotesk',sans-serif)", fontSize: "clamp(22px,3.5vw,42px)", fontWeight: 700, letterSpacing: "-1.5px", lineHeight: 1.1, color: C.ink, margin: 0, overflowWrap: "break-word", wordBreak: "break-word" }}>
          {section.heading}
        </h2>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "clamp(16px,2vw,24px) clamp(24px,4vw,56px) clamp(24px,3vw,40px) clamp(32px,4vw,64px)", position: "relative", zIndex: 2, animation: "fadeUp 0.5s ease 0.12s both", scrollbarWidth: "none", maxWidth: 820 }}>
        <ReactMarkdown components={mdComponents}>{section.body}</ReactMarkdown>
      </div>
    </div>
  );
}

// ─── SLIDE: Stats card ────────────────────────────────────────────────────────
function SlideStats({ frontmatter, active }) {
  if (!active) return null;
  const { code, severity } = frontmatter;
  const sev = SEV[severity] ?? SEV.medium;

  return (
    <div style={{ position: "absolute", inset: 0, background: C.base, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      <Grid cols={20} rows={11} color={C.line} opacity={0.8} />
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: C.fire }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: C.fire }} />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 clamp(40px,8vw,100px)", maxWidth: 700, width: "100%" }}>
        <div style={{ animation: "fadeUp 0.4s ease both", marginBottom: 12 }}>
          <span style={{ fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: C.ghost }}>
            En resumen
          </span>
        </div>

        <div style={{ animation: "scaleIn 0.5s ease 0.1s both", fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: "clamp(56px,12vw,120px)", fontWeight: 700, letterSpacing: "-3px", lineHeight: 1, marginBottom: 32 }}>
          {code.split("").map((ch, i) => (
            <span key={i} style={{ color: /\d/.test(ch) ? C.fire : C.ink }}>{ch}</span>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px,5vw,64px)", flexWrap: "wrap" }}>
          {[
            { label: "Protocolo", value: "SAE J1979", color: C.ink },
            { label: "Severidad", value: sev.label,  color: sev.color },
            { label: "MIL",       value: "Activo",   color: C.fire },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center", animation: `fadeUp 0.5s ease ${0.2 + i * 0.1}s both` }}>
              <div style={{ fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: "clamp(18px,3vw,32px)", fontWeight: 700, color: item.color, marginBottom: 8 }}>
                {item.value}
              </div>
              <div style={{ fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: C.ghost }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SLIDE: End ───────────────────────────────────────────────────────────────
function SlideEnd({ frontmatter, active }) {
  if (!active) return null;
  const { code, title } = frontmatter;

  return (
    <div style={{ position: "absolute", inset: 0, background: C.base, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      <Grid cols={20} rows={12} color={C.line} opacity={0.8} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: C.fire }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 5, background: C.fire }} />
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: C.fire }} />

      {/* Corner marks */}
      {[
        { k: "tl", style: { top: 20, left: 20, borderTop: `2px solid ${C.fire}`, borderLeft: `2px solid ${C.fire}` } },
        { k: "tr", style: { top: 20, right: 20, borderTop: `2px solid ${C.fire}`, borderRight: `2px solid ${C.fire}` } },
        { k: "bl", style: { bottom: 20, left: 20, borderBottom: `2px solid ${C.fire}`, borderLeft: `2px solid ${C.fire}` } },
        { k: "br", style: { bottom: 20, right: 20, borderBottom: `2px solid ${C.fire}`, borderRight: `2px solid ${C.fire}` } },
      ].map(({ k, style }) => (
        <div key={k} style={{ position: "absolute", width: 24, height: 24, opacity: 0.45, ...style }} />
      ))}

      <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 clamp(32px,8vw,120px)", maxWidth: 680, width: "100%" }}>
        <div style={{ animation: "scaleIn 0.5s ease both", width: 64, height: 64, borderRadius: "50%", border: `2px solid ${C.ok}`, background: C.okBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
          <CheckCircle2 size={28} style={{ color: C.ok }} />
        </div>

        <p style={{ animation: "fadeIn 0.4s ease 0.1s both", fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", color: C.ghost, margin: "0 0 16px" }}>
          Guía completa
        </p>

        <div style={{ animation: "scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) 0.15s both", fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: "clamp(56px,12vw,130px)", fontWeight: 700, letterSpacing: "-4px", lineHeight: 0.9, marginBottom: 20 }}>
          {code.split("").map((ch, i) => (
            <span key={i} style={{ color: /\d/.test(ch) ? C.fire : C.ink }}>{ch}</span>
          ))}
        </div>

        <p style={{ animation: "fadeUp 0.5s ease 0.3s both", fontFamily: "var(--font-space-grotesk,'Space Grotesk',sans-serif)", fontSize: "clamp(15px,2vw,22px)", fontWeight: 600, color: C.muted, margin: "0 0 36px", letterSpacing: "-0.5px", lineHeight: 1.3, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          {title}
        </p>

        <div style={{ animation: "fadeIn 0.6s ease 0.5s both", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "var(--font-space-grotesk,'Space Grotesk',sans-serif)", fontWeight: 700, fontSize: 18, color: C.ink }}>
          <Cpu size={18} style={{ color: C.fire }} />
          OBD<span style={{ color: C.fire }}>.</span>guide
        </div>

        <p style={{ animation: "fadeIn 0.6s ease 0.7s both", fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 11, color: C.faint, marginTop: 8, letterSpacing: "1px" }}>
          obd.guide/obd2/{code.toLowerCase()}
        </p>
      </div>
    </div>
  );
}

// ─── Nav bar ─────────────────────────────────────────────────────────────────
function NavBar({ code, current, total, onPrev, onNext, onGoto, isPlaying, onTogglePlay }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div style={{ flexShrink: 0 }}>
      {/* Progress */}
      <div style={{ height: 3, background: C.subtle, position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, background: C.fire, transition: "width 0.4s ease", width: `${pct}%` }} />
      </div>

      {/* Controls */}
      <div style={{ height: 56, borderTop: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(12px,3vw,36px)", background: "rgba(248,248,246,0.97)", backdropFilter: "blur(12px)" }}>

        {/* Left — back link */}
        <Link href={`/obd2/${code}`} style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: C.muted, fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 10, letterSpacing: "0.5px", textTransform: "uppercase" }}>
          <ArrowLeft size={12} /> {code}
        </Link>

        {/* Center — prev / dots / next */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onPrev} disabled={current === 0} style={{ width: 32, height: 32, border: `1px solid ${C.line}`, borderRadius: 7, background: "transparent", cursor: current === 0 ? "default" : "pointer", color: current === 0 ? C.faint : C.ink, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
            <ChevronLeft size={14} />
          </button>

          {/* Segment dots */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {Array.from({ length: Math.min(total, 14) }, (_, i) => {
              const idx = total > 14 ? Math.floor((i / 13) * (total - 1)) : i;
              const isActive = total > 14 ? (current >= Math.floor((i / 13) * (total - 1)) && current < Math.floor(((i + 1) / 13) * (total - 1))) : current === i;
              return (
                <button key={i} onClick={() => onGoto(idx)} style={{ width: isActive ? 18 : 6, height: 6, borderRadius: 3, background: isActive ? C.fire : C.line, border: "none", padding: 0, cursor: "pointer", transition: "all 0.2s ease" }} />
              );
            })}
          </div>

          <button onClick={onNext} disabled={current === total - 1} style={{ width: 32, height: 32, border: `1px solid ${current === total - 1 ? C.line : C.fire}`, borderRadius: 7, background: current === total - 1 ? "transparent" : C.fire, cursor: current === total - 1 ? "default" : "pointer", color: current === total - 1 ? C.faint : C.white, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Right — slide count + autoplay */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 10, color: C.ghost }}>
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button onClick={onTogglePlay} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", border: `1px solid ${C.line}`, borderRadius: 7, background: "transparent", cursor: "pointer", fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 10, letterSpacing: "1px", textTransform: "uppercase", color: isPlaying ? C.fire : C.muted, transition: "all 0.15s" }}>
            {isPlaying ? <Pause size={11} /> : <Play size={11} />}
            {isPlaying ? "Pausar" : "Auto"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CodePresentation({ frontmatter, content }) {
  const sections = parseMarkdownSections(content);

  // Slide plan:
  // 0          = Cover (dark)
  // 1          = Stats recap (dark)  ← new
  // 2..2N-1    = for each section: Question slide + Content slide (pairs)
  // last       = End (dark)
  const sectionSlides = sections.flatMap((s) => [
    { type: "question", section: s },
    { type: "content",  section: s },
  ]);
  const slides = [
    { type: "cover"  },
    { type: "stats"  },
    ...sectionSlides,
    { type: "end"    },
  ];
  const total = slides.length;

  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const navigate = useCallback((next) => {
    if (next < 0 || next >= total) return;
    setCurrent(next);
    setAnimKey((k) => k + 1);
  }, [total]);

  useEffect(() => {
    if (!isPlaying) return;
    const delay = slides[current]?.type === "question" ? 3500 : 7000;
    const id = setTimeout(() => {
      if (current < total - 1) navigate(current + 1);
      else setIsPlaying(false);
    }, delay);
    return () => clearTimeout(id);
  }, [isPlaying, current, navigate, total]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); navigate(current + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); navigate(current - 1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, navigate]);

  const slide = slides[current];

  // Section index for content/question slides
  const getSectionMeta = (s) => SECTION_META[s?.id] ?? null;

  // Content slide numbering (skip cover/stats/end)
  const contentSlides = slides.filter((s) => s.type === "content");
  const contentIdx = slide.type === "content" ? contentSlides.indexOf(slide) + 1 : 0;

  return (
    <div
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "var(--font-space-grotesk,'Space Grotesk',sans-serif)" }}
    >
      <style>{GLOBAL_CSS}</style>

      {/* Top bar */}
      <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(16px,3vw,40px)", background: C.white, borderBottom: `1px solid ${C.line}`, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-space-grotesk,'Space Grotesk',sans-serif)", fontWeight: 700, fontSize: 14, color: C.ink }}>
          <Cpu size={14} style={{ color: C.fire }} />
          OBD<span style={{ color: C.fire }}>.</span>guide
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.fire, display: "inline-block", animation: "pulse 2s infinite" }} />
        </div>
        <Ticker code={frontmatter.code} sections={sections} />
        <span style={{ fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)", fontSize: 11, fontWeight: 700, color: C.fire, letterSpacing: "1px" }}>
          {frontmatter.code}
        </span>
      </div>

      {/* Slide stage */}
      <div key={animKey} style={{ flex: 1, position: "relative", overflow: "hidden", minHeight: 0 }}>
        <SlideCover    frontmatter={frontmatter} active={slide.type === "cover"}    />
        <SlideStats    frontmatter={frontmatter} active={slide.type === "stats"}    />
        <SlideEnd      frontmatter={frontmatter} active={slide.type === "end"}      />

        {slide.type === "question" && (
          <SlideQuestion
            key={slide.section.id + "-q"}
            section={slide.section}
            meta={getSectionMeta(slide.section)}
            active
            code={frontmatter.code}
          />
        )}
        {slide.type === "content" && (
          <SlideContent
            key={slide.section.id + "-c"}
            section={slide.section}
            meta={getSectionMeta(slide.section)}
            active
            slideNum={contentIdx}
            total={contentSlides.length}
          />
        )}
      </div>

      {/* Nav */}
      <NavBar
        code={frontmatter.code}
        current={current}
        total={total}
        onPrev={() => navigate(current - 1)}
        onNext={() => navigate(current + 1)}
        onGoto={navigate}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying((p) => !p)}
      />
    </div>
  );
}