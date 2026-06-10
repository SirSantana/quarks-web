"use client";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import {
  Cpu,
  ArrowLeft,
  ChevronRight,
  Activity,
  Share2,
  BookOpen,
  Code2,
  CheckCircle2,
  HelpCircle,
  Clock,
  AlertTriangle,
  ShieldAlert,
  Wrench,
  Search,
  Car,
  DollarSign,
  Wind,
  HelpCircleIcon,
} from "lucide-react";
import { useRouter } from "next/router";

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

const SECTION_META = {
  meaning: { eyebrow: "SIGNIFICADO DEL CÓDIGO", icon: BookOpen },
  serious: { eyebrow: "EVALUACIÓN DE RIESGO", icon: AlertTriangle },
  drive: { eyebrow: "¿ES SEGURO CONDUCIR?", icon: Car },
  symptoms: { eyebrow: "SÍNTOMAS", icon: Activity },
  causes: { eyebrow: "CAUSAS PROBABLES", icon: Search },
  diagnosis: { eyebrow: "DIAGNÓSTICO", icon: Cpu },
  repairs: { eyebrow: "REPARACIÓN", icon: Wrench },
  costs: { eyebrow: "COSTOS ESTIMADOS", icon: DollarSign },
  vehicles: { eyebrow: "VEHÍCULOS AFECTADOS", icon: Car },
  emissions: { eyebrow: "EMISIONES", icon: Wind },
  related: { eyebrow: "CÓDIGOS RELACIONADOS", icon: Code2 },
  faq: { eyebrow: "PREGUNTAS FRECUENTES", icon: HelpCircle },
};

const C = {
  base: "#F8F8F6",
  white: "#FFFFFF",
  subtle: "#F0F0EE",
  ink: "#0F0F0F",
  muted: "#6B6B6B",
  ghost: "#9B9B96",
  faint: "#C4C4BE",
  line: "#E4E4E0",
  fire: "#FF3B00",
  fireHover: "#E03000",
  fireBg: "#FFF1EE",
  fireBorder: "#FFD5CC",
  fireDeep: "#7A3A30",
  warn: "#F59E0B",
  warnBg: "#FFFBEB",
  warnBorder: "#FDE68A",
  warnDeep: "#78350F",
  ok: "#10B981",
  okBg: "#ECFDF5",
  body: "#3A3A3A",
};

const SEV = {
  high: { label: "Alta", color: C.fire, bg: C.fireBg, barW: "100%" },
  medium: { label: "Media", color: C.warn, bg: C.warnBg, barW: "60%" },
  low: { label: "Baja", color: C.ok, bg: C.okBg, barW: "25%" },
};
const PROB = {
  alta: { color: C.fire, w: "85%" },
  media: { color: C.warn, w: "52%" },
  baja: { color: C.ok, w: "22%" },
};
const DIFF = {
  básico: { color: C.ok, label: "Básico" },
  intermedio: { color: C.warn, label: "Intermedio" },
  avanzado: { color: C.fire, label: "Avanzado" },
};

const NAV_SECTIONS = [
  { id: "meaning", label: "Significado" },
  { id: "serious", label: "Severidad" },
  { id: "drive", label: "¿Puedes conducir?" },
  { id: "symptoms", label: "Síntomas" },
  { id: "causes", label: "Causas" },
  { id: "diagnosis", label: "Diagnóstico" },
  { id: "repairs", label: "Reparación" },
  { id: "costs", label: "Costos" },
  { id: "vehicles", label: "Vehículos" },
  { id: "emissions", label: "Emisiones" },
  { id: "related", label: "Relacionados" },
  { id: "faq", label: "FAQ" },
];

// ─── Micro-components ─────────────────────────────────────────────────────────
function Eyebrow({ children }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
        fontSize: 10,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: C.ghost,
        margin: 0,
        marginBottom: 6,
      }}
    >
      {children}
    </p>
  );
}

function SectionHeading({ children }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-space-grotesk,'Space Grotesk',sans-serif)",
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: "-0.6px",
        color: C.ink,
        margin: 0,
        marginBottom: 24,
      }}
    >
      {children}
    </h2>
  );
}

// ─── Divider B: icono + eyebrow + regla ───────────────────────────────────────
function Divider({ eyebrow, icon: Icon }) {
  return (
    <div className="flex items-center gap-3" style={{ margin: "80px 0 32px" }}>
      {Icon && (
        <div
          style={{
            width: 30,
            height: 30,
            border: `1px solid ${C.line}`,
            borderRadius: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: C.white,
          }}
        >
          <Icon size={13} style={{ color: C.fire }} />
        </div>
      )}
      {eyebrow && (
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
            fontSize: 10,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: C.ghost,
            whiteSpace: "nowrap",
          }}
        >
          {eyebrow}
        </span>
      )}
      <div style={{ flex: 1, height: 1, background: C.line }} />
    </div>
  );
}

function CalloutBox({ color, bg, border, children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        padding: "18px 20px",
        borderRadius: 8,
        background: bg,
        border: `1px solid ${border}`,
        margin: "20px 0",
      }}
    >
      <AlertTriangle size={15} style={{ color, flexShrink: 0, marginTop: 1 }} />
      <div style={{ fontSize: 13, lineHeight: 1.65, color: C.fireDeep }}>
        {children}
      </div>
    </div>
  );
}

// ─── Markdown renderers ───────────────────────────────────────────────────────
function buildMdComponents() {
  return {
    h2: ({ children }) => {
      const text = React.Children.toArray(children).join("");
      const match = text.match(/\{#([^}]+)\}$/);
      const id = match?.[1];
      const cleanText = text.replace(/\s*\{#[^}]+\}$/, "");
      const meta = SECTION_META[id];
      const Icon = meta?.icon;

      return (
        <div id={id} style={{ scrollMarginTop: 140 }}>
          {meta && <Divider eyebrow={meta.eyebrow} icon={Icon} />}
          <h2
            style={{
              fontFamily:
                "var(--font-space-grotesk,'Space Grotesk',sans-serif)",
              fontSize: "clamp(28px,5vw,42px)",
              fontWeight: 700,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              margin: 0,
              color: C.ink,
              marginBottom: 24,
            }}
          >
            {cleanText}
          </h2>
        </div>
      );
    },

    h3: ({ children }) => (
      <h3
        style={{
          fontFamily: "var(--font-space-grotesk,'Space Grotesk',sans-serif)",
          fontSize: 17,
          fontWeight: 600,
          letterSpacing: "-0.3px",
          color: C.ink,
          marginTop: 24,
          marginBottom: 12,
        }}
      >
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.78,
          color: C.body,
          marginBottom: 16,
        }}
      >
        {children}
      </p>
    ),

    strong: ({ children }) => (
      <strong style={{ fontWeight: 600, color: C.ink }}>{children}</strong>
    ),

    em: ({ children }) => <em style={{ fontStyle: "italic" }}>{children}</em>,

    hr: () => (
      <div style={{ height: 1, background: C.line, margin: "24px 0" }} />
    ),

    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: C.fire,
          textDecoration: "underline",
          textUnderlineOffset: 2,
        }}
      >
        {children}
      </a>
    ),

    ul: ({ children }) => (
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>{children}</ul>
    ),

    ol: ({ children }) => (
      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>{children}</ol>
    ),

    li: ({ children }) => (
      <li
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
          padding: "13px 0",
          borderBottom: `1px solid ${C.subtle}`,
          fontSize: 14,
          color: C.body,
          lineHeight: 1.55,
        }}
      >
        <Activity
          size={13}
          style={{ color: C.fire, flexShrink: 0, marginTop: 3 }}
        />
        <span>{children}</span>
      </li>
    ),

    blockquote: ({ children }) => (
      <CalloutBox color={C.fire} bg={C.fireBg} border={C.fireBorder}>
        {children}
      </CalloutBox>
    ),

    code: ({ inline, className, children }) => {
      if (inline) {
        return (
          <code
            style={{
              background: C.subtle,
              color: C.ink,
              fontSize: 13,
              padding: "2px 6px",
              borderRadius: 4,
              fontFamily:
                "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
            }}
          >
            {children}
          </code>
        );
      }

      const lang = (className || "").replace("language-", "");

      if (lang === "cause") {
        const lines = String(children)
          .trim()
          .split("\n")
          .map((l) => {
            const [title, probability, ...rest] = l
              .split("|")
              .map((s) => s.trim());
            return {
              title,
              probability: probability || "baja",
              detail: rest.join("|").trim(),
            };
          });
        return (
          <div>
            {lines.map((c, i) => {
              const p = PROB[c.probability] ?? PROB.baja;
              return (
                <div
                  key={i}
                  style={{
                    padding: "20px 0",
                    borderBottom:
                      i < lines.length - 1 ? `1px solid ${C.subtle}` : "none",
                  }}
                >
                  <div className="flex justify-between items-center gap-4 mb-2">
                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span
                        style={{
                          fontFamily:
                            "var(--font-space-grotesk,'Space Grotesk',sans-serif)",
                          fontSize: 15,
                          fontWeight: 600,
                          color: C.ink,
                          flex: 1,
                          minWidth: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.title}
                      </span>
                    </div>

                    <span
                      style={{
                        fontFamily:
                          "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
                        fontSize: 10,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        fontWeight: 700,
                        color: p.color,
                        flexShrink: 0,
                      }}
                    >
                      {c.probability}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 3,
                      background: C.subtle,
                      borderRadius: 2,
                      marginBottom: 10,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: p.w,
                        background: p.color,
                        borderRadius: 2,
                      }}
                    />
                  </div>
                  {c.detail && (
                    <p
                      style={{
                        fontSize: 13,
                        lineHeight: 1.68,
                        color: C.muted,
                        margin: 0,
                        maxWidth: "100%",
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {c.detail}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        );
      }

      if (lang === "repair") {
        const text = Array.isArray(children)
          ? children.join("")
          : String(children);
        const blocks = text
          .trim()
          .split(/\n\s*\n/)
          .filter(Boolean);
        return (
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 17,
                top: 36,
                bottom: 36,
                width: 1,
                background: C.line,
                zIndex: 0,
              }}
            />
            {blocks.map((block, i) => {
              const lines = block.split(/\r?\n/).filter(Boolean);
              const [title, time, difficulty] = (lines[0] || "")
                .split("|")
                .map((s) => s.trim());
              const detail = lines.slice(1).join(" ").trim();
              const d = DIFF[difficulty] ?? DIFF["básico"];
              return (
                <div
                  key={i}
                  className="flex gap-4 items-start py-5 relative"
                  style={{ zIndex: 1 }}
                >
                  <div
                    style={{
                      width: 36,
                      minWidth: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: C.ink,
                      color: C.base,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily:
                        "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3
                      style={{
                        fontFamily:
                          "var(--font-space-grotesk,'Space Grotesk',sans-serif)",
                        fontSize: 16,
                        fontWeight: 600,
                        letterSpacing: "-0.3px",
                        color: C.ink,
                        margin: 0,
                        marginBottom: 10,
                        lineHeight: 1.4,
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {title}
                    </h3>
                    {detail && (
                      <p
                        style={{
                          fontSize: 14,
                          lineHeight: 1.75,
                          color: C.muted,
                          margin: 0,
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                        }}
                      >
                        {detail}
                      </p>
                    )}
                    <div className="flex items-center gap-3 flex-wrap mt-2">
                      {time && (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            fontFamily:
                              "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
                            fontSize: 10,
                            color: C.ghost,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          <Clock size={10} />
                          {time}
                        </span>
                      )}
                      {difficulty && (
                        <span
                          style={{
                            fontFamily:
                              "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
                            fontSize: 10,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            fontWeight: 700,
                            color: d.color,
                          }}
                        >
                          {d.label}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }

      if (lang === "cost") {
        const rows = String(children)
          .trim()
          .split("\n")
          .map((l) => {
            const [item, min, max, note] = l.split("|").map((s) => s.trim());
            return { item, min, max, note };
          });
        return (
          <div className="overflow-x-auto">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.line}` }}>
                  {["Reparación", "Costo (USD)"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        paddingBottom: 10,
                        paddingRight: h === "Reparación" ? 32 : 0,
                        fontFamily:
                          "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
                        fontSize: 10,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: C.ghost,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom:
                        i < rows.length - 1 ? `1px solid ${C.subtle}` : "none",
                    }}
                  >
                    <td
                      style={{
                        padding: "14px 32px 14px 0",
                        fontSize: 14,
                        color: C.body,
                        verticalAlign: "top",
                      }}
                    >
                      {r.item}
                      {r.note && (
                        <div
                          style={{ fontSize: 11, color: C.ghost, marginTop: 2 }}
                        >
                          {r.note}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "14px 0", verticalAlign: "top" }}>
                      <span
                        style={{
                          fontFamily:
                            "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
                          fontWeight: 700,
                          fontSize: 13,
                          color: C.ink,
                          whiteSpace: "nowrap",
                        }}
                      >
                        ${r.min} – ${r.max}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      if (lang === "vehicle") {
        const rows = String(children)
          .trim()
          .split("\n")
          .map((l) => {
            const [make, rest = ""] = l.split("|").map((s) => s.trim());

            const match = rest.match(/^(.*?)\s*\((.*)\)$/);

            return {
              make,
              models: match ? match[1] : rest,
              note: match ? match[2] : "",
            };
          });

        return (
          <div>
            {rows.map((r, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 py-4"
                style={{
                  borderBottom:
                    i < rows.length - 1 ? `1px solid ${C.subtle}` : "none",
                  maxWidth: "100%",
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                  whiteSpace: "normal",
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-space-grotesk,'Space Grotesk',sans-serif)",
                    fontSize: 14,
                    fontWeight: 700,
                    color: C.ink,
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.make}
                </span>

                <div>
                  <p
                    style={{
                      fontSize: 13,
                      color: C.body,
                      lineHeight: 1.6,
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {r.models}
                  </p>

                  {r.note && (
                    <p
                      style={{
                        marginTop: 8,
                        paddingLeft: 10,
                        borderLeft: `2px solid ${C.line}`,
                        fontSize: 12,
                        lineHeight: 1.6,
                        color: C.ghost,
                      }}
                    >
                      {r.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      }

      if (lang === "related") {
        const codes = String(children).trim().split(/\s+/);
        return (
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            }}
          >
            {codes.map((rc) => (
              <Link
                key={rc}
                href={`/obd2/${rc}`}
                className="flex items-center justify-center transition-all duration-150"
                style={{
                  padding: "12px 8px",
                  border: `1px solid ${C.line}`,
                  borderRadius: 8,
                  fontFamily:
                    "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
                  fontSize: 14,
                  fontWeight: 700,
                  color: C.fire,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.fire;
                  e.currentTarget.style.background = C.fireBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.line;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {rc}
              </Link>
            ))}
          </div>
        );
      }

      if (lang === "diagnosis") {
        const steps = String(children).trim().split("\n").filter(Boolean);
        return (
          <div>
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-4"
                style={{
                  borderBottom:
                    i < steps.length - 1 ? `1px solid ${C.subtle}` : "none",
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.ghost,
                    flexShrink: 0,
                    paddingTop: 2,
                    minWidth: 24,
                  }}
                >
                  0{i + 1}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: C.body,
                    maxWidth: "100%",
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        );
      }

      if (lang === "callout") {
        return (
          <CalloutBox color={C.fire} bg={C.fireBg} border={C.fireBorder}>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                lineHeight: 1.65,
                color: C.fireDeep,
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
            >
              {String(children).trim()}
            </p>
          </CalloutBox>
        );
      }

      if (lang === "warn") {
        return (
          <div
            className="flex items-start gap-3 my-5"
            style={{
              padding: "18px 20px",
              borderRadius: 8,
              background: C.warnBg,
              border: `1px solid ${C.warnBorder}`,
            }}
          >
            <AlertTriangle
              size={15}
              style={{ color: C.warn, flexShrink: 0, marginTop: 1 }}
            />
            <p
              style={{
                margin: 0,
                fontSize: 13,
                lineHeight: 1.65,
                color: C.warnDeep,
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
            >
              {String(children).trim()}
            </p>
          </div>
        );
      }

      return (
        <pre
          style={{
            background: C.subtle,
            borderRadius: 8,
            padding: 16,
            overflowX: "auto",
            fontSize: 13,
            marginBottom: 16,
            fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
            color: C.ink,
          }}
        >
          <code>{children}</code>
        </pre>
      );
    },
  };
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({
  id,
  eyebrow,
  heading,
  icon: Icon,
  children,
  first = false,
}) {
  return (
    <section id={id} style={{ scrollMarginTop: 130 }}>
      {!first ? (
        <Divider eyebrow={eyebrow} icon={Icon} />
      ) : (
        <div className="flex items-center gap-2 mb-1.5">
          {Icon && <Icon size={13} style={{ color: C.fire }} />}
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <SectionHeading>{heading}</SectionHeading>
      {children}
    </section>
  );
}

const TERM_GLOSSARY = {
  Protocolo:
    "Estándar de comunicación usado entre el escáner OBD y la ECU del vehículo. SAE J1979 define los modos de diagnóstico y los PIDs universales.",
  "Modo OBD":
    "$03 recupera códigos de falla confirmados. $07 recupera códigos pendientes (detectados pero aún no confirmados por el monitor).",
  "MIL activo":
    "Malfunction Indicator Lamp — la luz «Check Engine». Se activa cuando la ECU detecta una falla que afecta las emisiones o la seguridad.",
  "Freeze frame":
    "Instantánea de los parámetros del motor (RPM, carga, temp.) registrada en el momento exacto en que se activó el código.",
  Tipo: "Los códigos genéricos SAE (P0xxx) son universales para todos los fabricantes. Los códigos de fabricante (P1xxx) son específicos de cada marca.",
  Código:
    "Identificador alfanumérico estándar OBD-II. La primera letra indica el sistema: P=Powertrain, B=Body, C=Chassis, U=Red.",
  Sistema:
    "Powertrain engloba motor, transmisión y sus sistemas de control y emisiones.",
  Causas:
    "Número de causas raíz identificadas para este código, ordenadas por probabilidad de ocurrencia.",
  Reparaciones:
    "Procedimientos de reparación disponibles con pasos detallados, tiempo estimado y nivel de dificultad.",
};

// ─── Tooltip ──────────────────────────────────────────────────────────────────
function Tooltip({ text }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <span
      ref={ref}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          color: open ? C.fire : C.faint,
          transition: "color 0.15s",
          marginLeft: 4,
        }}
        aria-label="Más información"
      >
        <HelpCircleIcon size={10} />
      </button>

      {open && (
        <span
          style={{
            position: "absolute",
            left: 0,
            bottom: "calc(100% + 8px)",
            width: 220,
            padding: "10px 12px",
            background: C.ink,
            borderRadius: 7,
            fontSize: 11,
            lineHeight: 1.65,
            color: "#E8E8E4",
            fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
            fontWeight: 400,
            letterSpacing: "0.2px",
            zIndex: 200,
            pointerEvents: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
          }}
        >
          {text}
          {/* Arrow */}
          <span
            style={{
              position: "absolute",
              bottom: -5,
              left: 10,
              width: 10,
              height: 10,
              background: C.ink,
              transform: "rotate(45deg)",
              borderRadius: 2,
            }}
          />
        </span>
      )}
    </span>
  );
}

// ─── Sidebar card ─────────────────────────────────────────────────────────────
function SideCard({ title, children }) {
  return (
    <div
      style={{
        border: `1px solid ${C.line}`,
        borderRadius: 10,
        overflow: "hidden",
        background: C.white,
        marginBottom: 14,
      }}
    >
      <div
        style={{
          padding: "13px 18px",
          borderBottom: `1px solid ${C.subtle}`,
          fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
          fontSize: 10,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: C.ghost,
        }}
      >
        {title}
      </div>
      <div style={{ padding: 18 }}>{children}</div>
    </div>
  );
}

function QFRow({ label, value, valueColor }) {
  const tip = TERM_GLOSSARY[label];
  return (
    <div
      className="flex justify-between py-2"
      style={{ fontSize: 12, borderBottom: `1px solid ${C.base}` }}
    >
      <span
        style={{
          fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
          fontSize: 10,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          color: C.ghost,
        }}
      >
        {label}
        {tip && <Tooltip text={tip} />}
      </span>
      <span
        style={{ fontWeight: 500, fontSize: 12, color: valueColor || C.ink }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ code, onCopy, copied }) {
  return (
    <nav
      className="flex items-center justify-between sticky top-0 z-[100]"
      style={{
        padding: "20px clamp(16px, 4vw, 48px)",
        borderBottom: `1px solid ${C.line}`,
        background: "rgba(248,248,246,0.92)",
        backdropFilter: "blur(12px)",
      }}
    >
      <a
        href="/"
        className="flex items-center gap-2 no-underline"
        style={{
          fontFamily: "var(--font-space-grotesk,'Space Grotesk',sans-serif)",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "-0.3px",
          color: C.ink,
        }}
      >
        <Cpu size={18} />
        <span className="hidden sm:inline">
          OBD<span style={{ color: C.fire }}>.</span>guide
        </span>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: C.fire,
            animation: "pulse 2s infinite",
            display: "inline-block",
          }}
        />
      </a>

      <Link
        href="/"
        className="flex items-center gap-2 no-underline"
        style={{ fontSize: 13, fontWeight: 500, color: C.muted }}
      >
        <ArrowLeft size={14} />
        <span className="hidden sm:inline">Volver a códigos</span>
      </Link>

      <div className="flex items-center gap-2">
        {[
          {
            icon: copied ? CheckCircle2 : Code2,
            label: copied ? "¡Copiado!" : "Copiar",
            onClick: onCopy,
            active: copied,
          },
          { icon: Share2, label: "Compartir", onClick: null, active: false },
          {
            icon: BookOpen,
            label: "Documentación",
            onClick: null,
            active: false,
          },
        ].map(({ icon: Icon, label, onClick, active }) => (
          <button
            key={label}
            onClick={onClick}
            title={label}
            style={{
              width: 36,
              height: 36,
              border: `1px solid ${active ? C.ok : C.line}`,
              background: "transparent",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: active ? C.ok : C.muted,
              transition: "all 0.15s",
            }}
          >
            <Icon size={15} />
          </button>
        ))}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }`}</style>
    </nav>
  );
}

// ─── Section TOC ──────────────────────────────────────────────────────────────
function SectionNav({ active, setActive }) {
  const buttonRefs = useRef({});

  const handleClick = (id) => {
    setActive(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    buttonRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <div
      className="sticky z-[90]"
      style={{
        top: 75,
        borderBottom: `1px solid ${C.line}`,
        background: "rgba(248,248,246,0.95)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="flex overflow-x-auto mx-auto"
        style={{
          maxWidth: 1200,
          padding: "0 clamp(16px,4vw,48px)",
          scrollbarWidth: "none",
        }}
      >
        {NAV_SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            ref={(el) => (buttonRefs.current[id] = el)}
            onClick={() => handleClick(id)}
            className="flex-shrink-0 transition-colors"
            style={{
              padding: "14px 16px",
              fontSize: 12,
              fontWeight: 500,
              whiteSpace: "nowrap",
              background: "none",
              border: "none",
              borderBottom: `2px solid ${active === id ? C.fire : "transparent"}`,
              color: active === id ? C.fire : C.ghost,
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Technical grid (inline SVG, position: absolute) ─────────────────────────
function TechGrid() {
  const vCount = 13;
  const hCount = 7;
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      preserveAspectRatio="none"
    >
      {Array.from({ length: vCount }, (_, i) => (
        <line
          key={`v${i}`}
          x1={`${(i / (vCount - 1)) * 100}%`}
          y1="0%"
          x2={`${(i / (vCount - 1)) * 100}%`}
          y2="100%"
          stroke="#E4E4E0"
          strokeWidth="1"
          opacity="0.8"
        />
      ))}
      {Array.from({ length: hCount }, (_, i) => (
        <line
          key={`h${i}`}
          x1="0%"
          y1={`${(i / (hCount - 1)) * 100}%`}
          x2="100%"
          y2={`${(i / (hCount - 1)) * 100}%`}
          stroke="#E4E4E0"
          strokeWidth="1"
          opacity="0.8"
        />
      ))}
    </svg>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ frontmatter }) {
  const { code, title, category, severity } = frontmatter;
  const sev = SEV[severity] ?? SEV.medium;
  const router = useRouter();

  return (
    <header
      className="mx-auto"
      style={{ maxWidth: 1200, padding: "52px clamp(16px,4vw,48px) 0" }}
    >
      <div
        className="flex items-center gap-2 mb-8"
        style={{
          fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
          fontSize: 11,
          color: C.ghost,
          letterSpacing: "0.8px",
          cursor: "pointer",
          textTransform: "uppercase",
        }}
        onClick={() => router.push("/obd2")}
      >
        Códigos OBD-II <ChevronRight size={12} />
        Powertrain <ChevronRight size={12} />
        <span style={{ color: C.fire }}>{code}</span>
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-12"
  style={{
    alignItems: "flex-start",
    paddingBottom: "40px",
    borderBottom: `1px solid ${C.line}`,
  }}
      >
        <div>
          <div
            style={{
              fontFamily:
                "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
              fontSize: "clamp(56px, 8vw, 96px)",
              fontWeight: 700,
              color: C.fire,
              letterSpacing: "-2px",
              lineHeight: 1,
              marginBottom: 10,
            }}
          >
            {code}
          </div>
          <h1
            style={{
              fontFamily:
                "var(--font-space-grotesk,'Space Grotesk',sans-serif)",
              fontSize: "clamp(17px, 2.2vw, 24px)",
              fontWeight: 600,
              letterSpacing: "-0.4px",
              lineHeight: 1.25,
              margin: 0,
              marginBottom: 10,
              maxWidth: 560,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontFamily:
                "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
              fontSize: 11,
              color: C.ghost,
              letterSpacing: "1px",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            {category}
          </p>
        </div>

        <div
          className="w-full md:min-w-[210px] p-6 border rounded-[10px]"
          style={{ borderColor: C.line, background: C.white }}
        >
          {/* Header row */}
          <div className="flex justify-between items-center mb-3">
            <span
              className="flex items-center"
              style={{
                fontFamily:
                  "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
                fontSize: 10,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                color: C.ghost,
              }}
            >
              Severidad
              <Tooltip text="Indica el nivel de urgencia del código: Alta puede causar daño inmediato al motor, Media requiere atención pronto, Baja puede ignorarse temporalmente." />
            </span>
            <span
              className="font-bold uppercase rounded"
              style={{
                fontFamily:
                  "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
                fontSize: 11,
                letterSpacing: "0.5px",
                padding: "3px 8px",
                color: sev.color,
                background: sev.bg,
              }}
            >
              {sev.label}
            </span>
          </div>

          {/* Bar */}
          <div
            className="h-1 rounded-full overflow-hidden mb-6"
            style={{ background: C.subtle }}
          >
            <div
              className="h-full rounded-full"
              style={{ width: sev.barW, background: sev.color }}
            />
          </div>

          {/* Meta rows */}
          {[
            ["Protocolo", "SAE J1979", null],
            ["Modo OBD", "$03 / $07", null],
            ["MIL activo", "Sí", C.fire],
            ["Freeze frame", "Disponible", C.ok],
            ["Tipo", "Genérico SAE", null],
          ].map(([k, v, vc]) => (
            <QFRow key={k} label={k} value={v} valueColor={vc} />
          ))}
        </div>
      </div>
    </header>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CodePage({ frontmatter, content }) {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("meaning");
  const [openFaq, setOpenFaq] = useState(null);

  const handleCopy = () => {
    navigator.clipboard?.writeText(frontmatter.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }),
      { rootMargin: "-30% 0px -65% 0px" },
    );
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const {
    code,
    relatedCodes = [],
    faqs = [],
    causes = [],
    repairs = [],
  } = frontmatter;
  const mdComponents = buildMdComponents();

  return (
    <div
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      style={{
        minHeight: "100vh",
        background: C.base,
        color: C.ink,
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Navbar code={code} onCopy={handleCopy} copied={copied} />
      <Hero frontmatter={frontmatter} />
      <SectionNav active={activeSection} setActive={setActiveSection} />

      <div
        className="mx-auto grid lg:grid-cols-[1fr_280px] grid-cols-1"
        style={{
          maxWidth: 1200,
          padding: "0 clamp(16px,4vw,48px) 96px",
          gap: "clamp(32px,5vw,72px)",
          alignItems: "start",
        }}
      >
        <main className="min-w-0 pt-12">
          <ReactMarkdown components={mdComponents}>{content}</ReactMarkdown>

          {faqs.length > 0 && (
            <section id="faq" style={{ scrollMarginTop: 130 }}>
              <Divider eyebrow="PREGUNTAS FRECUENTES" icon={HelpCircle} />
              <SectionHeading>Preguntas sobre el {code}</SectionHeading>

              {faqs.map((f, i) => (
                <div
                  key={i}
                  style={{
                    borderBottom: `1px solid ${C.line}`,
                    borderTop: i === 0 ? `1px solid ${C.line}` : "none",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left bg-transparent border-0 cursor-pointer"
                  >
                    <span
                      style={{
                        fontFamily:
                          "var(--font-space-grotesk,'Space Grotesk',sans-serif)",
                        fontSize: 15,
                        fontWeight: 600,
                        letterSpacing: "-0.2px",
                        color: C.ink,
                      }}
                    >
                      {f.q}
                    </span>
                    <ChevronRight
                      size={16}
                      style={{
                        flexShrink: 0,
                        color: openFaq === i ? C.fire : C.ghost,
                        transform:
                          openFaq === i ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "all 0.2s",
                      }}
                    />
                  </button>
                  <div
                    style={{
                      overflow: "hidden",
                      maxHeight: openFaq === i ? 300 : 0,
                      transition: "max-height 0.3s ease",
                      paddingBottom: openFaq === i ? 20 : 0,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.72,
                        color: C.muted,
                        margin: 0,
                      }}
                    >
                      {f.a}
                    </p>
                  </div>
                </div>
              ))}
            </section>
          )}

          <img
            src={`/api/og/obd2/${frontmatter.code}`}
            alt={`Código de falla OBD2 ${frontmatter.code} - ${frontmatter.title}, síntomas, causas y solución`}
            style={{
              width: "100%",
              display: "block",
              marginTop: 54,
            }}
          />
        </main>

        <aside
          className="lg:sticky pt-12 order-last lg:order-none"
          style={{ top: 140 }}
        >
          <SideCard title="Datos del código">
            {[
              ["Código", code, null],
              ["Tipo", "Genérico SAE", null],
              ["Sistema", "Powertrain", null],
              ["Protocolo", "SAE J1979", null],
              ["Modo OBD", "$03 / $07", null],
              ["Causas", `${causes.length} identificadas`, null],
              ["Reparaciones", `${repairs.length} procedimientos`, null],
            ].map(([k, v, vc]) => (
              <QFRow key={k} label={k} value={v} valueColor={vc} />
            ))}
          </SideCard>

          {relatedCodes.length > 0 && (
            <SideCard title="Códigos relacionados">
              {relatedCodes.map((rc) => (
                <div key={rc} style={{ borderRadius: 6, overflow: "hidden" }}>
                  <Link
                    href={`/obd2/${rc}`}
                    className="flex items-center justify-between py-2 px-2 no-underline transition-colors duration-150"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = C.base)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <span
                      style={{
                        fontFamily:
                          "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
                        fontSize: 14,
                        fontWeight: 700,
                        color: C.fire,
                        letterSpacing: "0.5px",
                      }}
                    >
                      {rc}
                    </span>
                    <ChevronRight size={13} style={{ color: C.faint }} />
                  </Link>
                </div>
              ))}
            </SideCard>
          )}

          {/* <div
            style={{
              padding: "18px 20px",
              borderRadius: 10,
              background: C.fireBg,
              border: `1px solid ${C.fireBorder}`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={13} style={{ color: C.fire }} />
              <span
                style={{
                  fontFamily:
                    "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
                  fontSize: 10,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: C.fire,
                  fontWeight: 700,
                }}
              >
                Nota técnica
              </span>
            </div>
            <p
              style={{
                fontSize: 12,
                lineHeight: 1.7,
                color: C.fireDeep,
                margin: 0,
              }}
            >
              MIL parpadeando = fallo activo en curso. Detén el vehículo. El
              catalizador puede destruirse en minutos de conducción continua.
            </p>
          </div> */}
        </aside>
      </div>

      <footer
        className="flex items-center justify-between flex-wrap gap-3"
        style={{
          borderTop: `1px solid ${C.line}`,
          padding: "32px clamp(16px,4vw,48px)",
        }}
      >
        <div
          className="flex items-center gap-2"
          style={{
            fontFamily: "var(--font-space-grotesk,'Space Grotesk',sans-serif)",
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          <Cpu size={15} /> OBD<span style={{ color: C.fire }}>.</span>guide
        </div>
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
            fontSize: 12,
            color: C.ghost,
          }}
        >
          Referencia técnica · SAE J1979 · ISO 15031
        </span>
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono,'JetBrains Mono',monospace)",
            fontSize: 12,
            color: C.faint,
          }}
        >
          v2.4.1 · 2026
        </span>
      </footer>

      <style>{`
        ::-webkit-scrollbar { display: none; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
      `}</style>
    </div>
  );
}
