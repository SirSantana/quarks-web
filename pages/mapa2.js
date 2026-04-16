"use client";

import { useState, useRef, useCallback } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_IDEA = {
  title: "El Futuro del Auto Eléctrico",
  idea: "Exploramos cómo los vehículos eléctricos están redefiniendo la industria automotriz latinoamericana — desde la infraestructura de carga hasta el impacto cultural en el conductor moderno.",
  hook: "¿Qué pasaría si tu próximo auto pudiera cargarse mientras duermes y costarte menos que un tanque de gasolina?",
};

const MOCK_SCRIPT = {
  title: "YouTube Script: El Auto Eléctrico que Cambió Todo",
  script: `[INTRO — 0:00]
Bienvenidos al canal. Hoy vamos a hablar del tema que está dividiendo a la comunidad automotriz: ¿Vale la pena pasarse al eléctrico en 2025?

[CONTEXTO — 0:45]
El mercado de vehículos eléctricos creció un 340% en Latinoamérica el año pasado. No es un experimento. Es una revolución silenciosa que ya llegó a tu ciudad.

Manejé el Tesla Model 3, el BYD Seal y el Chevrolet Equinox EV durante 30 días. Hice más de 4,000 kilómetros. Y lo que descubrí va a sorprenderte.

[DESARROLLO — 3:20]
Primero, hablemos del mito del rango. Todo el mundo tiene miedo de quedarse sin batería. Pero después de un mes, cargué solo en casa, en la noche. El 94% de mis trayectos no superaron los 80 km.

La infraestructura de carga pública está creciendo más rápido de lo que pensamos. En Ciudad de México ya hay más de 1,200 puntos de carga públicos. En Bogotá, más de 400.

[COSTOS — 8:15]
Aquí viene lo más impactante. Gastar en electricidad lo equivalente a gasolina me costaría un 70% menos. En un año, el ahorro cubre prácticamente el mantenimiento completo.

[CONCLUSIÓN — 14:30]
¿Mi veredicto? Si vives en ciudad, si tienes dónde cargar en casa o en el trabajo... el eléctrico no es el futuro. Ya es el presente. Y es mejor de lo que te imaginas.

Déjame tu opinión en los comentarios. ¿Cambiarías tu auto de gasolina por uno eléctrico hoy?`,
};

const MOCK_CLIPS = {
  title: "3 Shorts / Reels Virales",
  clips: [
    `[CLIP 1 — "El Shock del Costo"]\n🎬 HOOK: "Gasté $8 dólares para manejar 400 kilómetros. Te muestro el recibo."\n\nAbre con plano del panel de carga. Voz en off rápida: "Esto es lo que pagué para manejar de Bogotá a Medellín en eléctrico." Corte al recibo. Reacción. CTA: "Sígueme para más pruebas reales."`,
    `[CLIP 2 — "La Carga Nocturna"]\n🎬 HOOK: "Nunca más voy a una gasolinera. Aquí te explico por qué."\n\nTime-lapse de auto conectado en garage mientras duerme. Amanece con batería llena. Voz: "Yo cargo mi auto como cargo mi teléfono. Y cambió mi vida." CTA al final.`,
    `[CLIP 3 — "El Mito del Rango"]\n🎬 HOOK: "¿Miedo a quedarte sin batería? Yo también lo tenía. Hasta que vi esto."\n\nMapa en pantalla. Rutas trazadas en 30 días. 97% bajo 100km. Estadística en pantalla. Cierre con: "El miedo es el único obstáculo real."`,
  ],
};

const MOCK_FACEBOOK = {
  title: "Facebook Post",
  postHook: "Manejé 4,000 km en eléctrico. Lo que nadie te dice 👇",
  paragraphs: [
    "Durante 30 días, cambié mi auto de gasolina por tres vehículos eléctricos distintos. Y no, no fue un experimento cómodo desde el principio. Tuve miedos. Tuve dudas. Y también tuve sorpresas que no esperaba.",
    "La más grande: el costo. En un mes, gasté el equivalente a lo que normalmente uso en gasolina en una semana. La matemática es brutal, y está a favor del eléctrico. Además, cero visitas al taller para cambio de aceite, frenos que duran el doble, y un silencio al manejar que literalmente cambia tu estado de ánimo.",
    "¿Lo mejor? Cargar en casa por las noches. Es como tener una gasolinera privada que nunca cierra. Si estás pensando en hacer el cambio, el momento es ahora. La tecnología llegó. La infraestructura está creciendo. Y los precios están bajando.",
  ],
  cta: "¿Ya manejas eléctrico o estás considerándolo? Cuéntame en los comentarios. 👇 Y si te fue útil esta experiencia, comparte para que más personas tomen la mejor decisión.",
  hashtags: ["#AutoEléctrico", "#ElectricVehicle", "#Tesla", "#BYD", "#AutosEléctricos", "#Sostenibilidad", "#Latinoamérica", "#TechAutomotriz"],
};

const MOCK_TRANSLATION = (type) => ({
  title: `English Version — ${type.charAt(0).toUpperCase() + type.slice(1)}`,
  originalType: type,
  translatedText:
    type === "idea"
      ? `IDEA: We explore how electric vehicles are redefining the Latin American automotive industry — from charging infrastructure to the cultural impact on the modern driver.\n\nHOOK: What if your next car could charge while you sleep and cost you less than a tank of gas?`
      : type === "script"
      ? `[INTRO — 0:00]\nWelcome to the channel. Today we're talking about the topic dividing the automotive community: Is it worth switching to electric in 2025?\n\n[CONTEXT — 0:45]\nThe electric vehicle market grew 340% in Latin America last year. This isn't an experiment. It's a silent revolution that has already reached your city.\n\nI drove the Tesla Model 3, BYD Seal, and Chevrolet Equinox EV for 30 days. Over 2,500 miles. And what I found will surprise you.\n\n[COSTS — 8:15]\nHere's the most impactful part. Spending the electricity equivalent of gasoline would cost me 70% less. In one year, the savings practically cover full maintenance.\n\n[CONCLUSION — 14:30]\nMy verdict? If you live in a city, if you have somewhere to charge at home or work... electric isn't the future. It's already the present. And it's better than you imagine.`
      : type === "clips"
      ? `CLIP 1 HOOK: "I spent $8 to drive 250 miles. Here's the receipt."\n\nCLIP 2 HOOK: "I'll never go to a gas station again. Here's why."\n\nCLIP 3 HOOK: "Afraid of running out of battery? I was too. Until I saw this."`
      : `I drove 2,500 miles on electric. What nobody tells you 👇\n\nFor 30 days, I swapped my gas car for three different electric vehicles. And no, it wasn't comfortable from the start. I had fears. I had doubts. And I also had surprises I didn't expect.\n\nThe biggest one: cost. In one month, I spent the equivalent of what I normally use in gas in one week. The math is brutal, and it's in favor of electric.\n\nAre you already driving electric or considering it? Tell me in the comments. 👇`,
});

// ─── Constants ────────────────────────────────────────────────────────────────

let nodeCounter = 0;
const uid = () => `node-${Date.now()}-${nodeCounter++}`;

const INPUT_SCREEN_X = 36;
const INPUT_SCREEN_Y = 72;
const INPUT_W = 376;

const NODE_META = {
  idea:        { accent: "#a78bfa", label: "IDEA",        bg: "#110f24", border: "#a78bfa50" },
  script:      { accent: "#34d399", label: "SCRIPT",      bg: "#081a13", border: "#34d39950" },
  clips:       { accent: "#fbbf24", label: "CLIPS",       bg: "#191008", border: "#fbbf2450" },
  facebook:    { accent: "#60a5fa", label: "FACEBOOK",    bg: "#080f1e", border: "#60a5fa50" },
  translation: { accent: "#e879f9", label: "TRANSLATION", bg: "#160b18", border: "#e879f950" },
};

// ─── Reusable small bits ──────────────────────────────────────────────────────

function TagBadge({ text, accent }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 8px", borderRadius: 4,
      fontSize: 11, fontFamily: "monospace", letterSpacing: "0.04em",
      color: accent, border: `1px solid ${accent}44`, background: `${accent}18`,
      marginRight: 6, marginBottom: 4,
    }}>{text}</span>
  );
}

function Btn({ label, accent, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={e => { e.stopPropagation(); onClick(); }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "5px 11px", borderRadius: 6, fontSize: 11,
        fontFamily: "monospace", fontWeight: 500, cursor: "pointer",
        border: `1px solid ${hov ? accent : accent + "44"}`,
        background: hov ? `${accent}22` : "transparent",
        color: hov ? accent : `${accent}bb`,
        transition: "all .15s", marginRight: 6, marginBottom: 6, whiteSpace: "nowrap",
      }}
    ><span style={{ fontSize: 9 }}>▶</span>{label}</button>
  );
}

// ─── Node content renderers ───────────────────────────────────────────────────

function IdeaContent({ node, onGen }) {
  const { accent } = NODE_META.idea;
  const c = node.content;
  return (
    <>
      <p style={{ fontSize: 11, color: "#666", marginBottom: 8, fontFamily: "monospace" }}>💡 CONCEPTO</p>
      <p style={{ fontSize: 13, color: "#ccc", lineHeight: 1.65, marginBottom: 12 }}>{c.idea}</p>
      <div style={{ borderLeft: `2px solid ${accent}`, background: `${accent}0d`, padding: "10px 12px", borderRadius: "0 6px 6px 0", marginBottom: 14 }}>
        <p style={{ fontSize: 10, color: `${accent}88`, marginBottom: 4, fontFamily: "monospace", letterSpacing: "0.08em" }}>HOOK</p>
        <p style={{ fontSize: 13, color: "#e5e5e5", lineHeight: 1.6, fontStyle: "italic" }}>"{c.hook}"</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Btn label="Generate Script" accent={accent} onClick={() => onGen("script", node.id)} />
        <Btn label="Translate to English" accent={accent} onClick={() => onGen("translation", node.id)} />
      </div>
    </>
  );
}

function ScriptContent({ node, onGen }) {
  const { accent } = NODE_META.script;
  const [expanded, setExpanded] = useState(false);
  const lines = (node.content.script || "").split("\n");
  const preview = lines.slice(0, 6).join("\n");
  return (
    <>
      <p style={{ fontSize: 11, color: "#666", marginBottom: 8, fontFamily: "monospace" }}>🎬 GUIÓN YOUTUBE</p>
      <div style={{
        background: "#030303", borderRadius: 6, padding: 12, marginBottom: 8,
        border: "1px solid #1c1c1c", maxHeight: expanded ? 300 : 130,
        overflowY: "auto", fontSize: 12, lineHeight: 1.75, color: "#999",
        fontFamily: "monospace", whiteSpace: "pre-wrap", transition: "max-height .3s ease",
      }}>{expanded ? node.content.script : preview + "\n..."}</div>
      <button onClick={e => { e.stopPropagation(); setExpanded(!expanded); }}
        style={{ fontSize: 11, color: `${accent}77`, background: "none", border: "none", cursor: "pointer", marginBottom: 10, fontFamily: "monospace" }}>
        {expanded ? "▲ Collapse" : "▼ Read full script"}
      </button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Btn label="Generate Shorts" accent={accent} onClick={() => onGen("clips", node.id)} />
        <Btn label="Facebook Post" accent={accent} onClick={() => onGen("facebook", node.id)} />
        <Btn label="Translate" accent={accent} onClick={() => onGen("translation", node.id)} />
      </div>
    </>
  );
}

function ClipsContent({ node, onGen }) {
  const { accent } = NODE_META.clips;
  return (
    <>
      <p style={{ fontSize: 11, color: "#666", marginBottom: 8, fontFamily: "monospace" }}>📱 SHORTS / REELS</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {(node.content.clips || []).map((clip, i) => (
          <div key={i} style={{ background: "#030303", border: `1px solid ${accent}28`, borderRadius: 6, padding: "10px 12px" }}>
            <div style={{ fontSize: 10, color: accent, fontFamily: "monospace", marginBottom: 5, letterSpacing: "0.1em" }}>CLIP {i + 1}</div>
            <p style={{ fontSize: 12, color: "#999", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{clip}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Btn label="Regenerate" accent={accent} onClick={() => {}} />
        <Btn label="Translate" accent={accent} onClick={() => onGen("translation", node.id)} />
      </div>
    </>
  );
}

function FacebookContent({ node, onGen }) {
  const { accent } = NODE_META.facebook;
  const c = node.content;
  return (
    <>
      <p style={{ fontSize: 11, color: "#666", marginBottom: 8, fontFamily: "monospace" }}>📘 FACEBOOK POST</p>
      <div style={{ borderLeft: `2px solid ${accent}`, background: `${accent}0d`, padding: "10px 12px", borderRadius: "0 6px 6px 0", marginBottom: 12 }}>
        <p style={{ fontSize: 14, color: "#f0f0f0", fontWeight: 600, lineHeight: 1.5 }}>{c.postHook}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
        {(c.paragraphs || []).map((p, i) => (
          <p key={i} style={{ fontSize: 12, color: "#aaa", lineHeight: 1.7 }}>{p}</p>
        ))}
      </div>
      <div style={{ background: `${accent}11`, border: `1px solid ${accent}33`, borderRadius: 6, padding: "8px 12px", marginBottom: 12 }}>
        <p style={{ fontSize: 12, color: "#ddd", lineHeight: 1.6 }}>{c.cta}</p>
      </div>
      <div style={{ marginBottom: 14 }}>
        {(c.hashtags || []).map(h => <TagBadge key={h} text={h} accent={accent} />)}
      </div>
      <Btn label="Translate to English" accent={accent} onClick={() => onGen("translation", node.id)} />
    </>
  );
}

function TranslationContent({ node }) {
  const { accent } = NODE_META.translation;
  const c = node.content;
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <p style={{ fontSize: 11, color: "#666", fontFamily: "monospace" }}>🌐 ENGLISH VERSION</p>
        {c.originalType && (
          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, fontFamily: "monospace", background: `${NODE_META[c.originalType].accent}22`, color: NODE_META[c.originalType].accent }}>
            from {c.originalType.toUpperCase()}
          </span>
        )}
      </div>
      <div style={{ background: "#030303", border: `1px solid ${accent}33`, borderRadius: 6, padding: 14, fontSize: 12, lineHeight: 1.8, color: "#999", whiteSpace: "pre-wrap", maxHeight: 260, overflowY: "auto" }}>
        {c.translatedText}
      </div>
    </>
  );
}

// ─── NodeCard ─────────────────────────────────────────────────────────────────

function NodeCard({ node, onUpdatePos, onBringToFront, onClose, onGen, zIndex }) {
  const { accent, label, bg, border } = NODE_META[node.type];
  const dragging = useRef(false);
  const origin = useRef({ mx: 0, my: 0, nx: 0, ny: 0 });
  const [hoverClose, setHoverClose] = useState(false);

  const onMouseDown = useCallback((e) => {
    if (e.target.closest("button")) return;
    e.preventDefault();
    dragging.current = true;
    origin.current = { mx: e.clientX, my: e.clientY, nx: node.position.x, ny: node.position.y };
    onBringToFront(node.id);
    const move = (ev) => {
      if (!dragging.current) return;
      onUpdatePos(node.id, { x: origin.current.nx + ev.clientX - origin.current.mx, y: origin.current.ny + ev.clientY - origin.current.my });
    };
    const up = () => { dragging.current = false; window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  }, [node.id, node.position, onUpdatePos, onBringToFront]);

  return (
    <div onMouseDown={onMouseDown} style={{
      position: "absolute", left: node.position.x, top: node.position.y,
      width: 340, background: bg, border: `1px solid ${border}`,
      borderRadius: 14, boxShadow: `0 0 0 1px ${accent}14, 0 28px 70px rgba(0,0,0,0.75)`,
      cursor: "grab", userSelect: "none", zIndex,
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8, padding: "9px 14px",
        borderBottom: `1px solid ${accent}18`, background: `${accent}09`, borderRadius: "14px 14px 0 0",
      }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: accent, boxShadow: `0 0 7px ${accent}` }} />
        <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.15em", color: accent, fontWeight: 700 }}>{label}</span>
        {node.content.title && (
          <span style={{ fontSize: 11, color: "#444", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center" }}>
            {node.content.title}
          </span>
        )}
        <button
          onMouseEnter={() => setHoverClose(true)}
          onMouseLeave={() => setHoverClose(false)}
          onClick={e => { e.stopPropagation(); onClose(node.id); }}
          style={{
            marginLeft: "auto", width: 20, height: 20, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: `1px solid ${hoverClose ? "#ff444488" : "#2a2a2a"}`,
            background: hoverClose ? "#ff444420" : "transparent",
            cursor: "pointer", fontSize: 10,
            color: hoverClose ? "#ff6666" : "#383838",
            transition: "all .15s", flexShrink: 0,
          }}
        >✕</button>
      </div>
      <div style={{ padding: 16, cursor: "auto" }}>
        {node.type === "idea"        && <IdeaContent node={node} onGen={onGen} />}
        {node.type === "script"      && <ScriptContent node={node} onGen={onGen} />}
        {node.type === "clips"       && <ClipsContent node={node} onGen={onGen} />}
        {node.type === "facebook"    && <FacebookContent node={node} onGen={onGen} />}
        {node.type === "translation" && <TranslationContent node={node} />}
      </div>
    </div>
  );
}

// ─── Connection Lines ─────────────────────────────────────────────────────────

function ConnectionLines({ nodes }) {
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  const inputPortX = INPUT_SCREEN_X + INPUT_W;
  const inputPortY = INPUT_SCREEN_Y + 260;

  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}>
      <defs>
        <filter id="lg" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {nodes.map(n => {
        let x1, y1;
        if (!n.parentId) {
          x1 = inputPortX;
          y1 = inputPortY;
        } else {
          const parent = nodeMap.get(n.parentId);
          if (!parent) return null;
          x1 = parent.position.x + 340;
          y1 = parent.position.y + 60;
        }
        const x2 = n.position.x;
        const y2 = n.position.y + 60;
        const dx = Math.abs(x2 - x1) * 0.45;
        const cx1 = x1 + dx;
        const cx2 = x2 - dx;
        const accent = NODE_META[n.type].accent;
        return (
          <g key={n.id}>
            <path d={`M${x1},${y1} C${cx1},${y1} ${cx2},${y2} ${x2},${y2}`}
              fill="none" stroke={accent} strokeWidth="4" strokeOpacity="0.15" filter="url(#lg)" />
            <path d={`M${x1},${y1} C${cx1},${y1} ${cx2},${y2} ${x2},${y2}`}
              fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="5 4" />
            <circle cx={x1} cy={y1} r="3.5" fill={accent} opacity="0.5" />
            <circle cx={x2} cy={y2} r="3.5" fill={accent} opacity="0.8" />
          </g>
        );
      })}
    </svg>
  );
}

// ─── Input Card ───────────────────────────────────────────────────────────────

function InputCard({ onCreateNode }) {
  const [topic, setTopic] = useState("Vehículos eléctricos en Latinoamérica");
  const [tone, setTone] = useState("educativo");
  const [lang, setLang] = useState("español");

  const fLabel = (t) => (
    <label style={{ display: "block", fontSize: 10, fontFamily: "monospace", color: "#4a4a4a", letterSpacing: "0.12em", marginBottom: 5, textTransform: "uppercase" }}>{t}</label>
  );
  const inputSt = {
    width: "100%", background: "#080808", border: "1px solid #232323",
    borderRadius: 7, color: "#d4d4d4", padding: "9px 12px", fontSize: 12,
    fontFamily: "monospace", outline: "none", boxSizing: "border-box",
  };
  const selectSt = {
    width: "100%", background: "#080808", border: "1px solid #232323",
    borderRadius: 7, color: "#888", padding: "8px 10px", fontSize: 12,
    fontFamily: "monospace", outline: "none", cursor: "pointer", appearance: "none",
  };

  const actions = [
    { label: "YouTube Script",  type: "script",   accent: "#34d399", icon: "▶", desc: "Guión largo con segmentos y hooks" },
    { label: "Facebook Post",   type: "facebook", accent: "#60a5fa", icon: "📘", desc: "Post con hashtags, párrafos y CTA" },
    { label: "Idea + Hook",     type: "idea",     accent: "#a78bfa", icon: "💡", desc: "Concepto central con hook viral" },
  ];

  return (
    <div style={{
      position: "fixed", left: INPUT_SCREEN_X, top: INPUT_SCREEN_Y, width: INPUT_W,
      background: "#0b0b0b", border: "1px solid #222", borderRadius: 16,
      boxShadow: "0 0 0 1px #ffffff06, 0 40px 90px rgba(0,0,0,0.9)", zIndex: 300, overflow: "hidden",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "12px 16px", borderBottom: "1px solid #181818", background: "#0e0e0e" }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 8px #34d399" }} />
        <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "0.2em", color: "#34d399", fontWeight: 700 }}>CONTENT STUDIO</span>
        <span style={{ marginLeft: "auto", fontSize: 10, fontFamily: "monospace", color: "#333" }}>AUTOMOTIVE</span>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ marginBottom: 12 }}>
          {fLabel("Topic")}
          <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter topic..." style={inputSt} />
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>{fLabel("Tone")}<select value={tone} onChange={e => setTone(e.target.value)} style={selectSt}>
            <option value="educativo">Educativo</option>
            <option value="entretenido">Entretenido</option>
            <option value="persuasivo">Persuasivo</option>
            <option value="informativo">Informativo</option>
            <option value="controversial">Controversial</option>
          </select></div>
          <div style={{ flex: 1 }}>{fLabel("Language")}<select value={lang} onChange={e => setLang(e.target.value)} style={selectSt}>
            <option value="español">Español</option>
            <option value="english">English</option>
            <option value="português">Português</option>
          </select></div>
        </div>
        <div style={{ fontSize: 10, fontFamily: "monospace", color: "#2e2e2e", letterSpacing: "0.1em", marginBottom: 10 }}>
          ── CREATE NODE ──────────────
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {actions.map(a => {
            const [hov, setHov] = useState(false);
            return (
              <button key={a.type}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                onClick={() => onCreateNode(a.type)}
                style={{
                  display: "flex", alignItems: "center", gap: 11,
                  padding: "10px 14px", borderRadius: 9, cursor: "pointer", textAlign: "left",
                  border: `1px solid ${hov ? a.accent + "60" : "#1e1e1e"}`,
                  background: hov ? `${a.accent}10` : "#070707",
                  transition: "all .15s",
                }}>
                <span style={{ fontSize: 14 }}>{a.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: hov ? a.accent : "#b0b0b0", transition: "color .15s", marginBottom: 1 }}>{a.label}</p>
                  <p style={{ fontSize: 10, color: "#424242", fontFamily: "monospace" }}>{a.desc}</p>
                </div>
                <span style={{ fontSize: 13, color: hov ? a.accent : "#252525", transition: "color .15s" }}>→</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Canvas ───────────────────────────────────────────────────────────────────

function Canvas({ nodes, setNodes }) {
  const [zOrders, setZOrders] = useState({});
  const maxZ = useRef(10);

  const bringToFront = useCallback((id) => {
    maxZ.current += 1;
    setZOrders(z => ({ ...z, [id]: maxZ.current }));
  }, []);

  const updatePos = useCallback((id, pos) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, position: pos } : n));
  }, [setNodes]);

  const closeNode = useCallback((id) => {
    setNodes(prev => {
      const toRemove = new Set();
      const q = [id];
      while (q.length) {
        const cur = q.shift();
        toRemove.add(cur);
        prev.filter(n => n.parentId === cur).forEach(n => q.push(n.id));
      }
      return prev.filter(n => !toRemove.has(n.id));
    });
  }, [setNodes]);

  const genChild = useCallback((type, parentId) => {
    const parent = nodes.find(n => n.id === parentId);
    if (!parent) return;
    let content;
    if (type === "translation") content = MOCK_TRANSLATION(parent.type);
    else if (type === "script") content = MOCK_SCRIPT;
    else if (type === "clips") content = MOCK_CLIPS;
    else if (type === "facebook") content = MOCK_FACEBOOK;
    else content = MOCK_IDEA;
    const newNode = {
      id: uid(), type, content,
      position: { x: parent.position.x + 370, y: parent.position.y + (Math.random() * 60 - 30) },
      parentId,
    };
    maxZ.current += 1;
    setZOrders(z => ({ ...z, [newNode.id]: maxZ.current }));
    setNodes(prev => [...prev, newNode]);
  }, [nodes, setNodes]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, #ffffff08 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />
      <ConnectionLines nodes={nodes} />
      {nodes.map(node => (
        <NodeCard key={node.id} node={node}
          onUpdatePos={updatePos} onBringToFront={bringToFront}
          onClose={closeNode} onGen={genChild}
          zIndex={zOrders[node.id] || 10}
        />
      ))}
      {nodes.length === 0 && (
        <div style={{
          position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          fontSize: 11, fontFamily: "monospace", color: "#252525", letterSpacing: "0.12em", pointerEvents: "none",
        }}>
          SELECCIONA UN TIPO DE CONTENIDO PARA COMENZAR →
        </div>
      )}
    </div>
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function Toolbar({ nodeCount }) {
  return (
    <div style={{
      position: "fixed", top: 14, right: 20, zIndex: 400,
      display: "flex", alignItems: "center", gap: 10,
      background: "#0b0b0b", border: "1px solid #1e1e1e", borderRadius: 10,
      padding: "6px 14px", boxShadow: "0 8px 28px rgba(0,0,0,0.7)",
    }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 5px #34d399" }} />
      <span style={{ fontSize: 11, fontFamily: "monospace", color: "#444", letterSpacing: "0.06em" }}>
        {nodeCount} node{nodeCount !== 1 ? "s" : ""}
      </span>
      <span style={{ fontSize: 10, color: "#222", fontFamily: "monospace" }}>│</span>
      <span style={{ fontSize: 10, color: "#2e2e2e", fontFamily: "monospace" }}>drag · ✕ close</span>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AutomotiveStudio() {
  const [nodes, setNodes] = useState([]);

  const handleCreateNode = useCallback((type) => {
    let content;
    if (type === "script") content = MOCK_SCRIPT;
    else if (type === "facebook") content = MOCK_FACEBOOK;
    else if (type === "clips") content = MOCK_CLIPS;
    else content = MOCK_IDEA;

    const rootCount = nodes.filter(n => n.parentId === null).length;
    const newNode = {
      id: uid(), type, content,
      position: {
        x: INPUT_SCREEN_X + INPUT_W + 70 + rootCount * 20,
        y: INPUT_SCREEN_Y + rootCount * 70,
      },
      parentId: null,
    };
    setNodes(prev => [...prev, newNode]);
  }, [nodes]);

  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;}
        body{overflow:hidden;background:#080808;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:#222;border-radius:4px;}
      `}</style>
      <div style={{ width: "100vw", height: "100vh", background: "#080808", position: "relative", fontFamily: "system-ui,sans-serif" }}>
        <Toolbar nodeCount={nodes.length} />
        <InputCard onCreateNode={handleCreateNode} />
        <Canvas nodes={nodes} setNodes={setNodes} />
      </div>
    </>
  );
}