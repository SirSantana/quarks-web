"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ─── DATA (Colores actualizados para modo claro/azul) ────────────────────────
const BLUE_CONTRAST = "#2563eb"; // Tailwind blue-600

const SYSTEMS = [
  { id: "all",      label: "🔧 Todo el auto",   color: BLUE_CONTRAST },
  { id: "engine",   label: "🔥 Motor",           color: "#dc2626" }, // red-600
  { id: "electric", label: "⚡ Eléctrico",       color: "#0891b2" }, // cyan-600
  { id: "brakes",   label: "🔴 Frenos",          color: "#e11d48" }, // rose-600
  { id: "fuel",     label: "⛽ Combustible",     color: "#16a34a" }, // green-600
  { id: "tires",    label: "🛞 Neumáticos",      color: "#7c3aed" }, // violet-600
];

const SYSTEM_INFO = {
  all:      { icon: "🚗", text: "Modo completo: preguntas de todos los sistemas del vehículo. Ideal para el examen final." },
  engine:   { icon: "🔥", text: "Motor: pistones, válvulas, árbol de levas, aceite, temperatura y más. El corazón del auto." },
  electric: { icon: "⚡", text: "Sistema eléctrico: batería, alternador, motor de arranque y circuitos del vehículo." },
  brakes:   { icon: "🔴", text: "Frenos: discos, pastillas, líquido de frenos, ABS y distancias de frenado." },
  fuel:     { icon: "⛽", text: "Combustible: octanaje, inyección, carburador, filtros y economía de gasolina." },
  tires:    { icon: "🛞", text: "Neumáticos: presión, desgaste, rotación, perfil y tipos de neumáticos." },
};

const HIGHLIGHT_MAP = {
  engine:   ["hl-engine"],
  electric: ["hl-battery"],
  fuel:     ["hl-fuel"],
  brakes:   ["hl-brake-r", "hl-brake-f"],
  tires:    ["hl-tire-r", "hl-tire-f"],
  all:      [],
};

const HOTSPOTS = [
  { id: "hp-engine",   label: "🔥 Motor",        sys: "engine",   style: { top: "28%", left: "69%" } },
  { id: "hp-battery",  label: "⚡ Batería",      sys: "electric", style: { top: "42%", left: "64%" } },
  { id: "hp-fuel",     label: "⛽ Combustible",  sys: "fuel",     style: { top: "60%", left: "24%" } },
  { id: "hp-brake-r",  label: "🔴 Frenos",        sys: "brakes",   style: { top: "72%", left: "14%" } },
  { id: "hp-brake-f",  label: "🔴 Disco",         sys: "brakes",   style: { top: "72%", left: "72%" } },
  { id: "hp-tire",     label: "🛞 Neumático",    sys: "tires",    style: { top: "72%", left: "55%" } },
];

const STATS = [
  { num: "8",   lbl: "SISTEMAS" },
  { num: "48+", lbl: "PREGUNTAS" },
  { num: "3",   lbl: "NIVELES" },
  { num: "XP",  lbl: "SISTEMA" },
];

// ─── WHEEL SVG ───────────────────────────────────────────────────────────────
function Wheel({ cx, cy, spinning = true }) {
  const spokes = [0, 1, 2, 3, 4];
  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Neumático más claro */}
      <circle r="44" fill="#1f2937" stroke="#374151" strokeWidth="3" />
      {/* Llanta gris claro */}
      <circle r="38" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1.5" />
      <g className={spinning ? "animate-wheelSpin" : ""}>
        {spokes.map((i) => (
          <line
            key={i}
            x1="0" y1="0"
            x2={Math.cos((i * 72 * Math.PI) / 180) * 26}
            y2={Math.sin((i * 72 * Math.PI) / 180) * 26}
            stroke="#9ca3af" strokeWidth="5" strokeLinecap="round"
          />
        ))}
      </g>
      <circle r="10" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2" />
      {/* Centro azul */}
      <circle r="4" fill={BLUE_CONTRAST} />
      <path d="M -32 -18 A 38 38 0 0 1 18 -34" fill="none" stroke="rgba(0,0,0,.04)" strokeWidth="5" />
    </g>
  );
}

// ─── ANIMATED CAR SVG (Colores adaptados a tono claro) ───────────────────────
function AnimatedCar({ activeSystem }) {
  const highlights = HIGHLIGHT_MAP[activeSystem] ?? [];
  const hlOpacity = (id) => (highlights.includes(id) ? "0.6" : "0"); // Mayor opacidad para modo claro

  // Obtener color del sistema activo para los overlays
  const getHlColor = (id) => {
    if (!highlights.includes(id)) return "transparent";
    // Mapeo inverso sutil para obtener el color del sistema
    if (id === "hl-engine") return SYSTEMS.find(s => s.id === "engine").color;
    if (id === "hl-battery") return SYSTEMS.find(s => s.id === "electric").color;
    if (id === "hl-fuel") return SYSTEMS.find(s => s.id === "fuel").color;
    if (id.includes("brake")) return SYSTEMS.find(s => s.id === "brakes").color;
    if (id.includes("tire")) return SYSTEMS.find(s => s.id === "tires").color;
    return BLUE_CONTRAST;
  };

  return (
    <svg
      viewBox="0 0 820 300"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full block"
    >
      <defs>
        {/* Carrocería gris plateada */}
        <radialGradient id="bodyGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f3f4f6" />
          <stop offset="100%" stopColor="#d1d5db" />
        </radialGradient>
        {/* Cristales azul claro sutiles */}
        <radialGradient id="glassGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#bfdbfe" stopOpacity=".6" />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity=".8" />
        </radialGradient>
        {/* Haz de luz azulado */}
        <linearGradient id="beamGrad" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity=".6" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </linearGradient>
        <filter id="glowF">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Road (Gris muy claro) */}
      <rect x="0" y="240" width="820" height="60" fill="#f9fafb" />
      <rect x="0" y="240" width="820" height="2" fill="#e5e7eb" />
      <g className="animate-roadScroll">
        {[0,80,160,240,320,400,480,560,640,720].map((x) => (
          <rect key={x} x={x} y="267" width="50" height="4" rx="2" fill="#d1d5db" />
        ))}
      </g>

      {/* Exhaust puffs (Más claros) */}
      {[0, 0.5, 1].map((delay, i) => (
        <circle
          key={i}
          cx={112 - i * 3} cy={220 - i * 2}
          r={9 + i * 4}
          fill="#d1d5db"
          opacity="0"
          className="animate-exhaustPuff"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      <rect x="108" y="218" width="28" height="6" rx="3" fill="#9ca3af" />

      {/* Headlight beam */}
      <polygon
        points="700,160 820,100 820,200 700,190"
        fill="url(#beamGrad)"
        opacity=".4"
        className="animate-beamPulse"
      />

      {/* ── CAR BODY (floating) ── */}
      <g className="animate-carFloat">
        {/* Shadow (Más suave) */}
        <ellipse cx="410" cy="246" rx="250" ry="12" fill="#000" opacity=".1" />

        {/* Body */}
        <path d="M 90 205 L 115 145 L 195 115 L 315 96 L 455 96 L 535 112 L 625 140 L 705 172 L 720 205 Z"
          fill="url(#bodyGrad)" stroke="#9ca3af" strokeWidth="1.5" />
        <path d="M 200 110 L 320 94 L 450 94 L 530 108" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="2" />

        {/* Hood */}
        <path d="M 455 96 L 540 114 L 620 140 L 700 168 L 705 172 L 625 140 L 535 112 Z"
          fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />

        {/* Windshield */}
        <path d="M 450 97 L 530 114 L 520 160 L 440 160 Z" fill="url(#glassGrad)" stroke="#60a5fa" strokeWidth="1" />

        {/* Rear window */}
        <path d="M 200 112 L 260 98 L 320 97 L 350 160 L 240 160 Z" fill="url(#glassGrad)" stroke="#60a5fa" strokeWidth="1" />

        {/* Roof */}
        <path d="M 260 98 L 440 96 L 440 162 L 350 162 Z" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1" />

        {/* Panel details */}
        <line x1="350" y1="160" x2="380" y2="205" stroke="#9ca3af" strokeWidth="1.5" />
        <rect x="470" y="172" width="28" height="6" rx="3" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1" />
        <rect x="290" y="172" width="28" height="6" rx="3" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1" />
        <path d="M 148 205 L 680 205 L 690 215 L 138 215 Z" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />

        {/* Bumper & grille */}
        <path d="M 680 200 L 720 205 L 722 220 L 672 220 Z" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1" />
        <rect x="694" y="188" width="28" height="14" rx="3" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1" />
        {[0,1,2].map((i) => (
          <line key={i} x1="694" y1={193 + i * 4} x2="722" y2={193 + i * 4} stroke="#d1d5db" strokeWidth=".5" />
        ))}

        {/* Headlight (Azulado) */}
        <path d="M 692 175 L 718 180 L 716 192 L 690 188 Z" fill="#60a5fa" opacity=".9" filter="url(#glowF)" />
        <path d="M 695 178 L 714 182 L 713 189 L 693 186 Z" fill="#eff6ff" opacity=".8" />

        {/* Rear lights */}
        <rect x="118" y="182" width="30" height="14" rx="3" fill="#ef4444" opacity=".8" />
        <rect x="120" y="184" width="10" height="10" rx="2" fill="#fca5a5" opacity=".9" />

        {/* Hood scoop */}
        <ellipse cx="590" cy="128" rx="36" ry="10" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />
        <ellipse cx="590" cy="126" rx="22" ry="6" fill="#f3f4f6" />

        {/* Fuel cap */}
        <circle cx="190" cy="158" r="10" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.5" />
        <circle cx="190" cy="158" r="5" fill="#d1d5db" />

        {/* Dashboard */}
        <path d="M 430 162 L 520 162 L 516 198 L 434 198 Z" fill="#f9fafb" stroke="#d1d5db" strokeWidth="1" />
        {[
          { cx: 462, color: BLUE_CONTRAST, delay: "0s" },
          { cx: 486, color: "#0891b2", delay: "-1.5s" },
          { cx: 508, color: "#e11d48", delay: "-3s" },
        ].map(({ cx, color, delay }) => (
          <circle key={cx} cx={cx} cy="178" r="8" fill="none" stroke={color} strokeWidth="2"
            className="animate-pulse" style={{ animationDuration: '4s', animationDelay: delay }} />
        ))}

        {/* HIGHLIGHT OVERLAYS (Colores del sistema con opacidad para fondo claro) */}
        <rect id="hl-engine"  x="555" y="112" width="95" height="58" rx="5"
          fill={getHlColor("hl-engine")} opacity={hlOpacity("hl-engine")}
          className="transition-opacity duration-400 ease-in-out pointer-events-none" />
        <rect id="hl-battery" x="518" y="128" width="58" height="38" rx="4"
          fill={getHlColor("hl-battery")} opacity={hlOpacity("hl-battery")}
          className="transition-opacity duration-400 ease-in-out pointer-events-none" />
        <rect id="hl-fuel"    x="158" y="118" width="68" height="52" rx="4"
          fill={getHlColor("hl-fuel")} opacity={hlOpacity("hl-fuel")}
          className="transition-opacity duration-400 ease-in-out pointer-events-none" />
      </g>

      {/* REAR WHEEL */}
      <g transform="translate(205,220)">
        <Wheel cx={0} cy={0} />
        <circle id="hl-brake-r" r="22" fill={getHlColor("hl-brake-r")}
          opacity={hlOpacity("hl-brake-r")}
          className="transition-opacity duration-400 ease-in-out pointer-events-none" />
        <circle id="hl-tire-r" r="38" fill={getHlColor("hl-tire-r")}
          opacity={hlOpacity("hl-tire-r")}
          className="transition-opacity duration-400 ease-in-out pointer-events-none" />
      </g>

      {/* FRONT WHEEL */}
      <g transform="translate(617,220)">
        <Wheel cx={0} cy={0} />
        <circle id="hl-brake-f" r="22" fill={getHlColor("hl-brake-f")}
          opacity={hlOpacity("hl-brake-f")}
          className="transition-opacity duration-400 ease-in-out pointer-events-none" />
        <circle id="hl-tire-f" r="38" fill={getHlColor("hl-tire-f")}
          opacity={hlOpacity("hl-tire-f")}
          className="transition-opacity duration-400 ease-in-out pointer-events-none" />
      </g>
    </svg>
  );
}

// ─── HOME PAGE (Light & Blue Version) ────────────────────────────────────────
export default function HomePage() {
  const router = useRouter();
  const [activeSystem, setActiveSystem] = useState("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const info = SYSTEM_INFO[activeSystem] ?? SYSTEM_INFO.all;
  // Color del sistema o azul por defecto para elementos UI
  const sysColor = SYSTEMS.find((s) => s.id === activeSystem)?.color ?? BLUE_CONTRAST;

  const handleSystem = (sys) => setActiveSystem(sys);
  const handleHotspot = (sys) => setActiveSystem(sys);
  const handlePlay = () => router.push(`/game?system=${activeSystem}`);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans relative overflow-x-hidden">
      
      {/* Grid BG (Muy sutil en modo claro) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60" 
           style={{ backgroundImage: "linear-gradient(rgba(37,99,235,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.03) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
      
      {/* Glow (Azul muy tenue) */}
      <div className="fixed inset-0 z-0 pointer-events-none"
           style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%,rgba(37,99,235,.04),transparent)" }} />

      <div className="relative z-10 flex flex-col items-center px-5">

        {/* ── HEADER ── */}
        <header className="w-full max-w-4xl flex items-center justify-between py-6 border-b border-gray-100 mb-4">
          <div className={`font-bold text-2xl tracking-[3px] flex items-center gap-2 font-rajdhani`} style={{ color: BLUE_CONTRAST }}>
            <div className={`w-2 h-2 rounded-full animate-logoPulse`} style={{ backgroundColor: BLUE_CONTRAST }} />
            AUTIQ
          </div>
          <div className="font-mono text-xs text-gray-500 border border-gray-200 bg-gray-50 rounded-full px-3.5 py-1.5 tracking-wider uppercase">
            v1.0 • BETA
          </div>
        </header>

        {/* ── HERO ── */}
        <section className="w-full max-w-4xl text-center py-10 md:py-14">
          <p className={`font-mono text-xs tracking-[3px] mb-[18px] animate-fadeUp [animation-delay:200ms]`} style={{ color: BLUE_CONTRAST }}>
            CONOCIMIENTO AUTOMOTRIZ INTERACTIVO
          </p>
          <h1 className="font-rajdhani text-[clamp(42px,7vw,80px)] font-bold leading-[0.95] tracking-tighter mb-6 animate-fadeUp [animation-delay:350ms] text-gray-950">
            APRENDE<br />
            <span style={{ color: BLUE_CONTRAST }}>TU AUTO.</span>
          </h1>
          <p className="text-lg font-normal text-gray-600 max-w-lg mx-auto mb-10 leading-relaxed animate-fadeUp [animation-delay:500ms]">
            Explora los sistemas de tu vehículo, haz clic en cada parte y pon a prueba tu conocimiento mecánico.
          </p>

          {/* System pills */}
          <p className="font-mono text-[11px] tracking-[2px] text-gray-400 mb-4 animate-fadeUp [animation-delay:650ms]">
            SELECCIONA UN SISTEMA PARA EXPLORAR
          </p>
          <div className="flex gap-2.5 justify-center flex-wrap mb-12 animate-fadeUp [animation-delay:750ms]">
            {SYSTEMS.map((sys) => {
              const isActive = activeSystem === sys.id;
              return (
                <button
                  key={sys.id}
                  onClick={() => handleSystem(sys.id)}
                  className={`font-mono text-xs px-[18px] py-2 rounded-full border transition-all duration-200 whitespace-nowrap cursor-pointer shadow-sm
                    ${isActive 
                      ? 'border-current shadow-md' 
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                  style={{ 
                    borderColor: isActive ? sys.color : undefined,
                    backgroundColor: isActive ? `${sys.color}08` : undefined, // Fondo muy tenue del color
                    color: isActive ? sys.color : undefined
                  }}
                >
                  {sys.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── CAR STAGE (Contenedor claro) ── */}
        <div className="w-full max-w-[820px] animate-fadeUp [animation-delay:900ms]">
          <div className="relative rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 pt-10 px-5 pb-5 shadow-inner">

            <AnimatedCar activeSystem={activeSystem} />

            {/* HOTSPOTS (Actualizados a azul y fondo oscuro para contraste) */}
            {mounted && HOTSPOTS.map((hs) => {
              const visible = activeSystem === "all" || hs.sys === activeSystem;
              return (
                <div
                  key={hs.id}
                  className="group absolute z-10 transition-opacity duration-300 cursor-pointer"
                  onClick={() => handleHotspot(hs.sys)}
                  style={{
                    opacity: visible ? 1 : 0.15,
                    pointerEvents: visible ? "auto" : "none",
                    ...hs.style,
                  }}
                >
                  {/* Tooltip (Fondo oscuro para legibilidad en stage claro) */}
                  <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-mono text-[11px] bg-gray-900 text-white rounded-md px-2.5 py-1 -top-[34px] left-1/2 -translate-x-1/2 pointer-events-none tracking-tighter shadow-lg">
                    {hs.label}
                  </div>
                  {/* Ring (Siempre azul para hotspot UI) */}
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center animate-ringPulse transition-all duration-200 bg-white/80 shadow-sm"
                       style={{ borderColor: BLUE_CONTRAST }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: BLUE_CONTRAST }} />
                  </div>
                </div>
              );
            })}

            <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-10 rounded-full" />
          </div>

          {/* INFO PANEL (Estilo tarjeta clara) ── */}
          <div className="mt-4 px-5 py-4 rounded-2xl bg-white border border-gray-100 flex items-center gap-4 min-h-[68px] transition-all duration-300 animate-fadeUp [animation-delay:1400ms] shadow-sm">
            <span className="text-2xl flex-shrink-0">{info.icon}</span>
            <span className="text-sm text-gray-700 leading-relaxed flex-1">
              <strong className="text-gray-950 font-semibold">{info.text.split(":")[0]}:</strong>
              {info.text.includes(":") ? info.text.slice(info.text.indexOf(":") + 1) : ""}
            </span>
            <button
              onClick={handlePlay}
              className="font-mono text-[11px] text-white rounded-full px-4 py-1.5 cursor-pointer font-medium flex-shrink-0 transition-all tracking-tighter shadow hover:opacity-90 active:scale-95"
              style={{ background: sysColor }} // Botón toma color del sistema o azul
            >
              JUGAR →
            </button>
          </div>
        </div>

        {/* ── CTA (Botón principal azul) ── */}
        <div className="mt-10 flex gap-4 justify-center flex-wrap animate-fadeUp [animation-delay:1500ms]">
          <button
            onClick={handlePlay}
            className={`font-rajdhani text-xl font-bold tracking-widest text-white rounded-xl px-10 py-4 cursor-pointer transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2.5`}
            style={{ backgroundColor: BLUE_CONTRAST }}
          >
            <span>▶</span> EMPEZAR A JUGAR
          </button>
          <button
            onClick={() => router.push("/leaderboard")}
            className="font-rajdhani text-lg font-semibold tracking-wide bg-white text-gray-800 border border-gray-200 rounded-xl px-7 py-4 cursor-pointer transition-all shadow-sm hover:border-gray-300 hover:bg-gray-50 hover:text-gray-950"
          >
            RANKING 🏆
          </button>
        </div>

        {/* ── STATS (Panel claro) ── */}
        <div className="flex mt-14 mb-14 border border-gray-100 rounded-2xl overflow-hidden bg-gray-50 max-w-4xl w-full animate-fadeUp [animation-delay:1600ms] shadow-inner">
          {STATS.map((s, i) => (
            <div key={i} className={`flex-1 text-center py-6 px-6 ${i < STATS.length - 1 ? 'border-r border-gray-100' : ''}`}>
              <span className="font-rajdhani text-3xl font-bold block mb-1" style={{ color: BLUE_CONTRAST }}>{s.num}</span>
              <span className="text-[12px] text-gray-500 font-mono tracking-tight uppercase">{s.lbl}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}