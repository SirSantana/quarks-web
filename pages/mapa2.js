"use client";

import { useState, useRef, useCallback, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_IDEA = {
  title: "El Futuro del Auto Eléctrico",
  idea:
    "Exploramos cómo los vehículos eléctricos están redefiniendo la industria automotriz latinoamericana — desde la infraestructura de carga hasta el impacto cultural en el conductor moderno.",
  hook:
    "¿Qué pasaría si tu próximo auto pudiera cargarse mientras duermes y costarte menos que un tanque de gasolina?",
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
¿Mi veredicto? Si vives en ciudad, si tienes dónde cargar en casa o en el trabajo... el eléctrico no es el futuro. Ya es el presente. En es mejor de lo que te imaginas.

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
  hashtags: [
    "#AutoEléctrico",
    "#ElectricVehicle",
    "#Tesla",
    "#BYD",
    "#AutosEléctricos",
    "#Sostenibilidad",
    "#Latinoamérica",
    "#TechAutomotriz",
  ],
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

// ─── Utility ──────────────────────────────────────────────────────────────────

let nodeCounter = 0;
const uid = () => `node-${Date.now()}-${nodeCounter++}`;

const NODE_COLORS = {
  idea: { bg: "bg-[#1a1a2e]", accent: "#7c6af7", border: "border-[#7c6af7]/40", accentBg: "bg-[#7c6af7]/10", accentText: "text-[#7c6af7]", label: "IDEA" },
  script: { bg: "bg-[#0f1f1a]", accent: "#2adf8e", border: "border-[#2adf8e]/40", accentBg: "bg-[#2adf8e]/10", accentText: "text-[#2adf8e]", label: "SCRIPT" },
  clips: { bg: "bg-[#1f150e]", accent: "#f59e2a", border: "border-[#f59e2a]/40", accentBg: "bg-[#f59e2a]/10", accentText: "text-[#f59e2a]", label: "CLIPS" },
  facebook: { bg: "bg-[#0e1520]", accent: "#3b82f6", border: "border-[#3b82f6]/40", accentBg: "bg-[#3b82f6]/10", accentText: "text-[#3b82f6]", label: "FACEBOOK" },
  translation: { bg: "bg-[#1a0f1a]", accent: "#e040fb", border: "border-[#e040fb]/40", accentBg: "bg-[#e040fb]/10", accentText: "text-[#e040fb]", label: "TRANSLATION" },
};

// ─── Components ───────────────────────────────────────────────────────────────

function TagBadge({ text, accent }) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-[11px] font-mono tracking-wider mr-1.5 mb-1"
      style={{
        color: accent,
        border: `1px solid ${accent}33`,
        background: `${accent}11`,
      }}
    >
      {text}
    </span>
  );
}

function NodeButton({
  label,
  onClick,
  accent,
  small,
}) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`inline-flex items-center gap-1.5 rounded-md font-medium font-mono tracking-tight cursor-pointer transition-all duration-150 mr-1.5 mb-1.5 whitespace-nowrap border
        ${small ? "px-2.5 py-1 text-[11px]" : "px-3.5 py-1.5 text-[12px]"}
      `}
      style={{
        borderColor: hover ? accent : `${accent}55`,
        background: hover ? `${accent}22` : "transparent",
        color: hover ? accent : `${accent}cc`,
      }}
    >
      <span className="text-[10px]">▶</span>
      {label}
    </button>
  );
}

// ─── IdeaNode ─────────────────────────────────────────────────────────────────

function IdeaNode({
  node,
  onGenerate,
}) {
  const { accent } = NODE_COLORS.idea;
  const c = node.content;
  return (
    <div>
      <p className="text-[12px] text-gray-500 mb-2.5 font-mono">💡 CONCEPTO</p>
      <p className="text-[14px] text-gray-300 leading-relaxed mb-3.5">{c.idea}</p>
      <div
        className="border-l-2 pl-3 mb-[18px] py-2.5 rounded-r-md"
        style={{
          borderLeftColor: accent,
          background: `${accent}08`,
        }}
      >
        <p className="text-[11px] mb-1 font-mono" style={{ color: `${accent}aa` }}>
          HOOK
        </p>
        <p className="text-[13px] text-gray-100 leading-relaxed italic">
          "{c.hook}"
        </p>
      </div>
      <div className="flex flex-wrap">
        <NodeButton
          label="Generate Script"
          accent={accent}
          onClick={() => onGenerate("script", node.id)}
        />
        <NodeButton
          label="Translate to English"
          accent={accent}
          onClick={() => onGenerate("translation", node.id)}
        />
      </div>
    </div>
  );
}

// ─── ScriptNode ───────────────────────────────────────────────────────────────

function ScriptNode({
  node,
  onGenerate,
}) {
  const { accent } = NODE_COLORS.script;
  const [expanded, setExpanded] = useState(false);
  const lines = (node.content.script || "").split("\n");
  const preview = lines.slice(0, 6).join("\n");

  return (
    <div>
      <p className="text-[12px] text-gray-500 mb-2.5 font-mono">🎬 GUIÓN YOUTUBE</p>
      <div
        className={`bg-black rounded-md p-3 mb-3.5 border border-[#222] overflow-y-auto transition-[max-height] duration-300 text-[12px] leading-[1.7] text-gray-400 font-mono whitespace-pre-wrap ${
          expanded ? "max-h-[320px]" : "max-h-[140px]"
        }`}
      >
        {expanded ? node.content.script : preview + "\n..."}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setExpanded(!expanded);
        }}
        className="text-[11px] bg-transparent border-none cursor-pointer mb-3 font-mono"
        style={{ color: `${accent}99` }}
      >
        {expanded ? "▲ Collapse" : "▼ Read full script"}
      </button>
      <div className="flex flex-wrap">
        <NodeButton
          label="Generate Shorts"
          accent={accent}
          onClick={() => onGenerate("clips", node.id)}
        />
        <NodeButton
          label="Create Facebook Post"
          accent={accent}
          onClick={() => onGenerate("facebook", node.id)}
        />
        <NodeButton
          label="Translate to English"
          accent={accent}
          onClick={() => onGenerate("translation", node.id)}
        />
      </div>
    </div>
  );
}

// ─── ClipsNode ────────────────────────────────────────────────────────────────

function ClipsNode({
  node,
  onGenerate,
}) {
  const { accent } = NODE_COLORS.clips;
  const clips = node.content.clips || [];
  return (
    <div>
      <p className="text-[12px] text-gray-500 mb-2.5 font-mono">📱 SHORTS / REELS</p>
      <div className="flex flex-col gap-2.5 mb-3.5">
        {clips.map((clip, i) => (
          <div
            key={i}
            className="bg-black border rounded-md p-2.5"
            style={{ borderColor: `${accent}33` }}
          >
            <div
              className="text-[10px] font-mono mb-1.5 tracking-widest"
              style={{ color: accent }}
            >
              CLIP {i + 1}
            </div>
            <p className="text-[12px] text-gray-400 leading-relaxed whitespace-pre-wrap">
              {clip}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap">
        <NodeButton
          label="Regenerate"
          accent={accent}
          onClick={() => {}}
        />
        <NodeButton
          label="Translate to English"
          accent={accent}
          onClick={() => onGenerate("translation", node.id)}
        />
      </div>
    </div>
  );
}

// ─── FacebookNode ─────────────────────────────────────────────────────────────

function FacebookNode({
  node,
  onGenerate,
}) {
  const { accent } = NODE_COLORS.facebook;
  const c = node.content;
  return (
    <div>
      <p className="text-[12px] text-gray-500 mb-2.5 font-mono">📘 FACEBOOK POST</p>
      <div
        className="border-l-2 pl-3 mb-3.5 py-2.5 rounded-r-md"
        style={{
          borderLeftColor: accent,
          background: `${accent}08`,
        }}
      >
        <p className="text-[14px] text-gray-100 font-semibold leading-relaxed">
          {c.postHook}
        </p>
      </div>
      <div className="flex flex-col gap-2 mb-3">
        {(c.paragraphs || []).map((p, i) => (
          <p key={i} className="text-[12px] text-gray-400 leading-relaxed">
            {p}
          </p>
        ))}
      </div>
      <div
        className="border rounded-md p-2 mb-3"
        style={{
          background: `${accent}11`,
          borderColor: `${accent}33`,
        }}
      >
        <p className="text-[12px] text-gray-200 leading-relaxed">{c.cta}</p>
      </div>
      <div className="mb-3.5">
        {(c.hashtags || []).map((h) => (
          <TagBadge key={h} text={h} accent={accent} />
        ))}
      </div>
      <NodeButton
        label="Translate to English"
        accent={accent}
        onClick={() => onGenerate("translation", node.id)}
      />
    </div>
  );
}

// ─── TranslationNode ──────────────────────────────────────────────────────────

function TranslationNode({ node }) {
  const { accent } = NODE_COLORS.translation;
  const c = node.content;
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <p className="text-[12px] text-gray-500 font-mono">🌐 ENGLISH VERSION</p>
        {c.originalType && (
          <span
            className="text-[10px] px-2 py-0.5 rounded font-mono"
            style={{
              background: `${NODE_COLORS[c.originalType].accent}22`,
              color: NODE_COLORS[c.originalType].accent,
            }}
          >
            from {c.originalType.toUpperCase()}
          </span>
        )}
      </div>
      <div
        className="bg-black border rounded-md p-3.5 text-[12px] leading-[1.8] text-gray-400 whitespace-pre-wrap max-h-[260px] overflow-y-auto"
        style={{ borderColor: `${accent}33` }}
      >
        {c.translatedText}
      </div>
    </div>
  );
}

// ─── NodeWrapper (Draggable) ──────────────────────────────────────────────────

function NodeWrapper({
  node,
  onUpdatePosition,
  children,
  onBringToFront,
  zIndex,
}) {
  const { accent, label, bg } = NODE_COLORS[node.type];
  const dragging = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, nx: 0, ny: 0 });

  const onMouseDown = useCallback(
    (e) => {
      if (e.target.closest("button")) return;
      e.preventDefault();
      dragging.current = true;
      dragStart.current = {
        mx: e.clientX,
        my: e.clientY,
        nx: node.position.x,
        ny: node.position.y,
      };
      onBringToFront(node.id);

      const onMove = (ev) => {
        if (!dragging.current) return;
        onUpdatePosition(node.id, {
          x: dragStart.current.nx + ev.clientX - dragStart.current.mx,
          y: dragStart.current.ny + ev.clientY - dragStart.current.my,
        });
      };
      const onUp = () => {
        dragging.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [node.id, node.position, onUpdatePosition, onBringToFront]
  );

  return (
    <div
      onMouseDown={onMouseDown}
      className={`absolute w-[340px] border rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] cursor-grab select-none transition-shadow duration-200 ${bg}`}
      style={{
        left: node.position.x,
        top: node.position.y,
        borderColor: `${accent}44`,
        boxShadow: `0 0 0 1px ${accent}22, 0 20px 60px rgba(0,0,0,0.6)`,
        zIndex,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3.5 py-2.5 border-b rounded-t-xl"
        style={{
          borderBottomColor: `${accent}22`,
          background: `${accent}0a`,
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: accent,
              boxShadow: `0 0 6px ${accent}`,
            }}
          />
          <span
            className="text-[10px] font-mono tracking-widest font-bold"
            style={{ color: accent }}
          >
            {label}
          </span>
        </div>
        {node.content.title && (
          <span className="text-[11px] text-gray-500 max-w-[180px] overflow-hidden truncate whitespace-nowrap">
            {node.content.title}
          </span>
        )}
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-[#333]" />
          <div className="w-2 h-2 rounded-full bg-[#333]" />
        </div>
      </div>

      {/* Body */}
      <div className="p-4 cursor-auto">{children}</div>
    </div>
  );
}

// ─── Connection Lines (SVG) ───────────────────────────────────────────────────

function ConnectionLines({ nodes }) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {nodes
        .filter((n) => n.parentId)
        .map((n) => {
          const parent = nodeMap.get(n.parentId);
          if (!parent) return null;
          const x1 = parent.position.x + 170;
          const y1 = parent.position.y + 60;
          const x2 = n.position.x + 170;
          const y2 = n.position.y + 60;
          const cx = (x1 + x2) / 2;
          const accent = NODE_COLORS[n.type].accent;
          return (
            <path
              key={n.id}
              d={`M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`}
              fill="none"
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.3"
              strokeDasharray="4 4"
              filter="url(#glow)"
            />
          );
        })}
    </svg>
  );
}

// ─── Canvas ───────────────────────────────────────────────────────────────────

function Canvas({
  nodes,
  setNodes,
}) {
  const [zOrders, setZOrders] = useState({});
  const maxZ = useRef(10);

  const bringToFront = useCallback((id) => {
    maxZ.current += 1;
    setZOrders((z) => ({ ...z, [id]: maxZ.current }));
  }, []);

  const updatePosition = useCallback((id, pos) => {
    setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, position: pos } : n)));
  }, [setNodes]);

  const generateChild = useCallback(
    (type, parentId) => {
      const parent = nodes.find((n) => n.id === parentId);
      if (!parent) return;

      let content;
      if (type === "translation") {
        content = MOCK_TRANSLATION(parent.type);
      } else if (type === "script") {
        content = MOCK_SCRIPT;
      } else if (type === "clips") {
        content = MOCK_CLIPS;
      } else if (type === "facebook") {
        content = MOCK_FACEBOOK;
      } else {
        content = MOCK_IDEA;
      }

      const newNode = {
        id: uid(),
        type,
        content,
        position: {
          x: parent.position.x + 380,
          y: parent.position.y + Math.random() * 40 - 20,
        },
        parentId,
      };
      setNodes((prev) => [...prev, newNode]);
    },
    [nodes, setNodes]
  );

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <ConnectionLines nodes={nodes} />

      {nodes.map((node) => (
        <NodeWrapper
          key={node.id}
          node={node}
          onUpdatePosition={updatePosition}
          onBringToFront={bringToFront}
          zIndex={zOrders[node.id] || 10}
        >
          {node.type === "idea" && (
            <IdeaNode node={node} onGenerate={generateChild} />
          )}
          {node.type === "script" && (
            <ScriptNode node={node} onGenerate={generateChild} />
          )}
          {node.type === "clips" && (
            <ClipsNode node={node} onGenerate={generateChild} />
          )}
          {node.type === "facebook" && (
            <FacebookNode node={node} onGenerate={generateChild} />
          )}
          {node.type === "translation" && <TranslationNode node={node} />}
        </NodeWrapper>
      ))}
    </div>
  );
}

// ─── InputCenter ──────────────────────────────────────────────────────────────

function InputCenter({
  onCreateNode,
  visible,
}) {
  const [topic, setTopic] = useState("Vehículos eléctricos en Latinoamérica");
  const [tone, setTone] = useState("educativo");
  const [lang, setLang] = useState("español");

  const inputClass = "bg-[#111] border border-[#333] rounded-lg text-gray-200 px-3.5 py-2.5 text-[13px] font-mono outline-none w-full transition-colors focus:border-gray-500";
  const selectClass = "bg-[#111] border border-[#333] rounded-lg text-gray-400 px-3 py-2 text-[12px] font-mono outline-none cursor-pointer flex-1 appearance-none";

  const actions = [
    { label: "YouTube Script", type: "script", accent: "#2adf8e", icon: "▶" },
    { label: "Facebook Post", type: "facebook", accent: "#3b82f6", icon: "📘" },
    { label: "Idea + Hook", type: "idea", accent: "#7c6af7", icon: "💡" },
  ];

  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] z-[100] transition-all duration-500 cubic-bezier(0.34,1.56,0.64,1)
        ${visible ? "scale-100 opacity-100 pointer-events-auto" : "scale-75 opacity-0 pointer-events-none"}
      `}
    >
      {/* Brand */}
      <div className="text-center mb-7">
        <p className="text-[11px] font-mono tracking-[0.3em] text-gray-600 mb-2">
          AUTOMOTIVE CONTENT STUDIO
        </p>
        <h1 className="text-[26px] font-light text-gray-100 tracking-tight font-sans">
          Create. Deploy. Dominate.
        </h1>
      </div>

      {/* Card */}
      <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-6 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
        {/* Topic Input */}
        <div className="mb-3.5">
          <label className="block text-[10px] font-mono text-gray-600 tracking-wider mb-1.5 uppercase">
            Topic
          </label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic..."
            className={inputClass}
          />
        </div>

        {/* Selects */}
        <div className="flex gap-2.5 mb-6">
          <div className="flex-1">
            <label className="block text-[10px] font-mono text-gray-600 tracking-wider mb-1.5 uppercase">
              Tone
            </label>
            <select value={tone} onChange={(e) => setTone(e.target.value)} className={selectClass}>
              <option value="educativo">Educativo</option>
              <option value="entretenido">Entretenido</option>
              <option value="persuasivo">Persuasivo</option>
              <option value="informativo">Informativo</option>
              <option value="controversial">Controversial</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-[10px] font-mono text-gray-600 tracking-wider mb-1.5 uppercase">
              Language
            </label>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className={selectClass}>
              <option value="español">Español</option>
              <option value="english">English</option>
              <option value="português">Português</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-[10px] font-mono text-gray-600 tracking-wider mb-2.5 uppercase">
          Create Node
        </div>
        <div className="flex flex-col gap-2">
          {actions.map((a) => {
            const [hover, setHover] = useState(false);
            return (
              <button
                key={a.type}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => onCreateNode(a.type, topic, tone, lang)}
                className="flex items-center gap-3 p-3 rounded-lg border bg-[#0a0a0a] cursor-pointer transition-all duration-150 text-left"
                style={{
                  borderColor: hover ? `${a.accent}88` : "#2a2a2a",
                  background: hover ? `${a.accent}14` : "#0a0a0a",
                }}
              >
                <span className="text-base">{a.icon}</span>
                <div>
                  <p
                    className="text-[13px] font-medium font-sans transition-colors duration-150"
                    style={{ color: hover ? a.accent : "#ccc" }}
                  >
                    Create {a.label}
                  </p>
                  <p className="text-[11px] text-gray-600 font-mono">
                    {a.type === "script"
                      ? "Long-form content with hooks & segments"
                      : a.type === "facebook"
                      ? "Engagement post with hashtags & CTA"
                      : "Core concept with viral hook"}
                  </p>
                </div>
                <span
                  className="ml-auto text-base transition-colors duration-150"
                  style={{ color: hover ? a.accent : "#333" }}
                >
                  →
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

function Toolbar({
  nodeCount,
  onToggleInput,
  showInput,
}) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-2 pr-3 border-r border-[#2a2a2a]">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[11px] text-gray-400 font-mono uppercase tracking-tighter">
          Studio Active
        </span>
      </div>
      <div className="text-[11px] text-gray-500 font-mono">
        Nodes: <span className="text-gray-200">{nodeCount}</span>
      </div>
      <button
        onClick={onToggleInput}
        className={`px-3 py-1 rounded-md text-[11px] font-bold font-mono transition-all duration-200 uppercase tracking-wider cursor-pointer ${
          showInput
            ? "bg-red-500/10 text-red-500 border border-red-500/50"
            : "bg-white text-black hover:bg-gray-200"
        }`}
      >
        {showInput ? "Cancel" : "New Project"}
      </button>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function AutomotiveStudio() {
  const [nodes, setNodes] = useState([
    {
      id: "root-1",
      type: "idea",
      content: MOCK_IDEA,
      position: { x: 100, y: 200 },
      parentId: null,
    },
  ]);
  const [showInput, setShowInput] = useState(false);

  const handleCreateNode = (type, topic) => {
    const newNode = {
      id: uid(),
      type,
      content: type === "script" ? MOCK_SCRIPT : type === "facebook" ? MOCK_FACEBOOK : MOCK_IDEA,
      position: { x: 400 + Math.random() * 50, y: 200 + Math.random() * 50 },
      parentId: null,
    };
    setNodes((prev) => [...prev, newNode]);
    setShowInput(false);
  };

  return (
    <div className="w-full h-screen bg-[#050505] text-white overflow-hidden font-sans">
      <Toolbar
        nodeCount={nodes.length}
        showInput={showInput}
        onToggleInput={() => setShowInput(!showInput)}
      />
      
      <Canvas nodes={nodes} setNodes={setNodes} />
      
      <InputCenter
        visible={showInput}
        onCreateNode={handleCreateNode}
      />
    </div>
  );
}