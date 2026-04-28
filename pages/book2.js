import { useEffect, useRef, useState } from "react";

/* ── HOOK SCROLL ── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, y = 20, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>{children}</div>
  );
}

/* ── PROGRESS BAR ── */
function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "rgba(199,91,26,0.12)", zIndex: 200 }}>
      <div style={{ height: "100%", background: "#C75B1A", width: `${pct}%`, transition: "width 0.1s linear" }}/>
    </div>
  );
}

/* ── ILUSTRACIONES SVG ── */

function OilEngineIllustration() {
  return (
    <svg viewBox="0 0 420 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
      <style>{`
        .oi1{stroke-dasharray:900;stroke-dashoffset:900;animation:dr 3s ease forwards}
        .oi2{stroke-dasharray:500;stroke-dashoffset:500;animation:dr 2.4s ease .4s forwards}
        .oi3{stroke-dasharray:250;stroke-dashoffset:250;animation:dr 1.8s ease .8s forwards}
        .oif{opacity:0;animation:fa .5s ease 2s forwards}
        .oif2{opacity:0;animation:fa .5s ease 2.6s forwards}
        @keyframes dr{to{stroke-dashoffset:0}}
        @keyframes fa{to{opacity:1}}
      `}</style>
      {/* Bloque motor */}
      <rect className="oi1" x="80" y="80" width="260" height="120" rx="4" stroke="#C75B1A" strokeWidth="1.2"/>
      {/* Cárter inferior */}
      <path className="oi1" d="M 80 200 L 80 220 Q 80 228 88 228 L 332 228 Q 340 228 340 220 L 340 200" stroke="#C75B1A" strokeWidth="1.2"/>
      {/* Nivel máximo */}
      <line className="oi2" x1="88" y1="215" x2="332" y2="215" stroke="#C75B1A" strokeWidth="0.6" strokeDasharray="5 4"/>
      {/* Aceite (relleno) */}
      <rect className="oif" x="81" y="210" width="258" height="17" rx="2" fill="rgba(199,91,26,0.12)"/>
      {/* Pistones */}
      {[120,180,240,300].map((x,i)=>(
        <g key={i}>
          <rect className="oi2" x={x-16} y="90" width="32" height="55" rx="3" stroke="#C75B1A" strokeWidth="1"/>
          <line className="oi3" x1={x} y1="145" x2={x} y2="170" stroke="#C75B1A" strokeWidth="1.5" strokeLinecap="round"/>
          <ellipse className="oi3" cx={x} cy="175" rx="10" ry="6" stroke="#C75B1A" strokeWidth="0.8"/>
        </g>
      ))}
      {/* Tapón aceite */}
      <rect className="oi2" x="176" y="62" width="68" height="22" rx="10" stroke="#C75B1A" strokeWidth="1"/>
      <line className="oi3" x1="210" y1="84" x2="210" y2="92" stroke="#C75B1A" strokeWidth="0.8"/>
      {/* Varilla nivel */}
      <line className="oi1" x1="338" y1="60" x2="310" y2="215" stroke="#C75B1A" strokeWidth="1" strokeLinecap="round"/>
      <circle className="oif" cx="338" cy="56" r="5" stroke="#C75B1A" strokeWidth="1"/>
      {/* Etiquetas */}
      <text className="oif" x="354" y="64" fontSize="7" fill="#C75B1A" fontFamily="monospace">DIPSTICK</text>
      <text className="oif" x="174" y="57" fontSize="7" fill="#C75B1A" fontFamily="monospace" textAnchor="middle">OIL CAP</text>
      <text className="oif2" x="350" y="218" fontSize="7" fill="#C75B1A" fontFamily="monospace">MAX</text>
      <line className="oif2" x1="332" y1="215" x2="348" y2="215" stroke="#C75B1A" strokeWidth="0.6"/>
      <text className="oif2" x="210" y="248" fontSize="6.5" fill="#C75B1A" fontFamily="monospace" textAnchor="middle" opacity="0.5" letterSpacing="2">FIG. 01 — ENGINE OIL SYSTEM — CROSS SECTION</text>
    </svg>
  );
}

function ViscosityIllustration() {
  return (
    <svg viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
      <style>{`
        .vi1{stroke-dasharray:600;stroke-dashoffset:600;animation:dr 2.2s ease forwards}
        .vi2{stroke-dasharray:300;stroke-dashoffset:300;animation:dr 1.8s ease .3s forwards}
        .vif{opacity:0;animation:fa .5s ease 1.5s forwards}
        @keyframes dr{to{stroke-dashoffset:0}}
        @keyframes fa{to{opacity:1}}
      `}</style>
      {/* Tres frascos de aceite */}
      {[
        { x: 40, label: "5W-30", sub: "Multiclima", color: "rgba(199,91,26,0.15)", fill: 0.75 },
        { x: 155, label: "10W-40", sub: "Semi-sint.", color: "rgba(199,91,26,0.10)", fill: 0.6 },
        { x: 270, label: "20W-50", sub: "Mineral", color: "rgba(199,91,26,0.07)", fill: 0.45 },
      ].map((b, i) => (
        <g key={i}>
          {/* Frasco */}
          <rect className="vi1" x={b.x} y="30" width="72" height="130" rx="5" stroke="#C75B1A" strokeWidth="1"/>
          {/* Tapa */}
          <rect className="vi2" x={b.x+16} y="16" width="40" height="18" rx="4" stroke="#C75B1A" strokeWidth="0.8"/>
          {/* Líquido */}
          <rect className="vif" x={b.x+1} y={30 + 130*(1-b.fill)} width="70" height={130*b.fill - 1} rx="3" fill={b.color}/>
          {/* Nivel líquido */}
          <line className="vif" x1={b.x+1} y1={30 + 130*(1-b.fill)} x2={b.x+71} y2={30 + 130*(1-b.fill)} stroke="#C75B1A" strokeWidth="0.7" strokeDasharray="3 2"/>
          {/* Etiqueta producto */}
          <text className="vif" x={b.x+36} y="105" fontSize="9" fill="#C75B1A" fontFamily="monospace" textAnchor="middle" fontWeight="600">{b.label}</text>
          <text className="vif" x={b.x+36} y="119" fontSize="6.5" fill="#C75B1A" fontFamily="monospace" textAnchor="middle" opacity="0.6">{b.sub}</text>
          {/* Línea cota */}
          <line className="vif" x1={b.x+76} y1="30" x2={b.x+86} y2="30" stroke="#C75B1A" strokeWidth="0.5"/>
          <line className="vif" x1={b.x+76} y1="160" x2={b.x+86} y2="160" stroke="#C75B1A" strokeWidth="0.5"/>
          <line className="vif" x1={b.x+82} y1="30" x2={b.x+82} y2="160" stroke="#C75B1A" strokeWidth="0.5"/>
        </g>
      ))}
      <text className="vif" x="190" y="190" fontSize="6.5" fill="#C75B1A" fontFamily="monospace" textAnchor="middle" opacity="0.5" letterSpacing="2">FIG. 02 — VISCOSITY GRADES COMPARISON</text>
    </svg>
  );
}

function TemperatureGauge() {
  return (
    <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 180 }}>
      <style>{`
        .tg1{stroke-dasharray:500;stroke-dashoffset:500;animation:dr 2s ease forwards}
        .tg2{stroke-dasharray:250;stroke-dashoffset:250;animation:dr 1.6s ease .4s forwards}
        .tgf{opacity:0;animation:fa .4s ease 1.6s forwards}
        @keyframes dr{to{stroke-dashoffset:0}}
        @keyframes fa{to{opacity:1}}
      `}</style>
      {/* Arco termómetro */}
      <path className="tg1" d="M 30 130 A 70 70 0 0 1 170 130" stroke="#C75B1A" strokeWidth="1.2"/>
      {/* Zona verde - normal */}
      <path className="tgf" d="M 70 82 A 70 70 0 0 1 130 82" stroke="#2D7A3A" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
      {/* Marcas */}
      {[0,30,60,90,120,150,180].map((deg,i)=>{
        const r = Math.PI * (180+deg) / 180;
        const cx=100, cy=130;
        return <line key={i} className="tg2"
          x1={cx+62*Math.cos(r)} y1={cy+62*Math.sin(r)}
          x2={cx+70*Math.cos(r)} y2={cy+70*Math.sin(r)}
          stroke="#C75B1A" strokeWidth={i===0||i===6?"1.2":"0.7"}/>;
      })}
      {/* Aguja — apuntando a zona normal ~110° */}
      <line className="tgf" x1="100" y1="130" x2="47" y2="88" stroke="#C75B1A" strokeWidth="1.5" strokeLinecap="round"/>
      <circle className="tgf" cx="100" cy="130" r="5" fill="#C75B1A"/>
      {/* Labels temp */}
      <text className="tgf" x="24" y="150" fontSize="7" fill="#C75B1A" fontFamily="monospace">COLD</text>
      <text className="tgf" x="155" y="150" fontSize="7" fill="#C75B1A" fontFamily="monospace">HOT</text>
      <text className="tgf" x="100" y="118" fontSize="8" fill="#2D7A3A" fontFamily="monospace" textAnchor="middle">NORMAL</text>
      <text className="tgf" x="100" y="170" fontSize="6" fill="#C75B1A" fontFamily="monospace" textAnchor="middle" opacity="0.5">FIG. 03 — TEMP. GAUGE</text>
    </svg>
  );
}

function OilDropIllustration() {
  return (
    <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 90 }}>
      <style>{`
        .od1{stroke-dasharray:400;stroke-dashoffset:400;animation:dr 2s ease forwards}
        .odf{opacity:0;animation:fa .5s ease 1.6s forwards}
        @keyframes dr{to{stroke-dashoffset:0}}
        @keyframes fa{to{opacity:1}}
      `}</style>
      <path className="od1" d="M 60 20 Q 90 60 92 95 A 32 32 0 0 1 28 95 Q 30 60 60 20 Z" stroke="#C75B1A" strokeWidth="1.2"/>
      <path className="odf" d="M 60 28 Q 84 62 86 93 A 26 26 0 0 1 34 93 Q 36 62 60 28 Z" fill="rgba(199,91,26,0.1)"/>
      {/* Reflejo */}
      <path className="odf" d="M 48 55 Q 52 45 58 50" stroke="#C75B1A" strokeWidth="0.7" strokeLinecap="round" opacity="0.5"/>
      <text className="odf" x="60" y="140" fontSize="6" fill="#C75B1A" fontFamily="monospace" textAnchor="middle" opacity="0.5">FIG. 04</text>
    </svg>
  );
}

/* ── UI COMPONENTS ── */

function TipBox({ icon, label, children, variant = "tip" }) {
  const styles = {
    tip:     { border: "#C75B1A", bg: "rgba(199,91,26,0.06)", label: "#C75B1A" },
    warning: { border: "#B45309", bg: "rgba(180,83,9,0.06)",  label: "#B45309" },
    fact:    { border: "#1D6A5A", bg: "rgba(29,106,90,0.06)", label: "#1D6A5A" },
    myth:    { border: "#7C3AED", bg: "rgba(124,58,237,0.05)",label: "#7C3AED" },
  };
  const s = styles[variant];
  return (
    <div style={{
      borderLeft: `3px solid ${s.border}`, background: s.bg,
      padding: "20px 24px", borderRadius: "0 6px 6px 0", margin: "8px 0"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: "1rem" }}>{icon}</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.14em", color: s.label, textTransform: "uppercase" }}>{label}</span>
      </div>
      <div style={{ color: "#3D3025", lineHeight: 1.75, fontSize: "0.9rem" }}>{children}</div>
    </div>
  );
}

function Quote({ children, author }) {
  return (
    <div style={{ position: "relative", padding: "32px 40px", margin: "8px 0" }}>
      <div style={{ position: "absolute", top: 0, left: 0, fontFamily: "'Libre Baskerville', serif", fontSize: "6rem", color: "rgba(199,91,26,0.15)", lineHeight: 1 }}>"</div>
      <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "1.15rem", lineHeight: 1.7, color: "#1C1712", fontStyle: "italic", position: "relative", zIndex: 1 }}>
        {children}
      </p>
      {author && <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#9C8C7A", letterSpacing: "0.1em", marginTop: 16, textTransform: "uppercase" }}>— {author}</p>}
    </div>
  );
}

function SecretCard({ num, title, children, tag }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        border: "1px solid rgba(199,91,26,0.18)", borderRadius: 6,
        overflow: "hidden", cursor: "pointer",
        transition: "box-shadow 0.2s, border-color 0.2s",
        boxShadow: open ? "0 4px 20px rgba(199,91,26,0.1)" : "none",
        borderColor: open ? "rgba(199,91,26,0.4)" : "rgba(199,91,26,0.18)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", background: open ? "rgba(199,91,26,0.04)" : "white" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "rgba(199,91,26,0.4)", flexShrink: 0 }}>{num}</span>
        <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "0.95rem", color: "#1C1712", flex: 1, lineHeight: 1.4 }}>{title}</span>
        <span style={{ color: "#C75B1A", fontSize: "0.7rem", fontFamily: "'DM Mono', monospace", padding: "3px 8px", background: "rgba(199,91,26,0.08)", borderRadius: 3, flexShrink: 0 }}>{tag}</span>
        <span style={{ color: "#C75B1A", fontSize: "1rem", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>▾</span>
      </div>
      {open && (
        <div style={{ padding: "0 20px 20px 52px", borderTop: "1px solid rgba(199,91,26,0.1)", paddingTop: 16, background: "white" }}>
          <p style={{ color: "#5A4E40", lineHeight: 1.8, fontSize: "0.88rem" }}>{children}</p>
        </div>
      )}
    </div>
  );
}

function TableOfContents() {
  const sections = [
    { id: "intro", label: "Introducción" },
    { id: "s1", label: "¿Qué hace realmente el aceite?" },
    { id: "s2", label: "La etiqueta que nadie lee" },
    { id: "s3", label: "El gran mito del intervalo" },
    { id: "s4", label: "Cómo verificar el nivel" },
    { id: "s5", label: "Los 5 secretos del capítulo" },
    { id: "s6", label: "Señales de alarma" },
    { id: "checklist", label: "Checklist del capítulo" },
  ];
  return (
    <nav style={{ position: "sticky", top: 80, background: "#FAF8F5", border: "1px solid rgba(199,91,26,0.12)", borderRadius: 6, padding: "24px", minWidth: 200 }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.14em", color: "#C75B1A", textTransform: "uppercase", marginBottom: 16 }}>En este capítulo</p>
      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {sections.map((s, i) => (
          <li key={s.id}>
            <a href={`#${s.id}`} style={{
              display: "flex", alignItems: "baseline", gap: 10, padding: "7px 0",
              textDecoration: "none", borderBottom: i < sections.length - 1 ? "1px solid rgba(199,91,26,0.07)" : "none",
              color: "#9C8C7A", fontSize: "0.82rem", lineHeight: 1.4,
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#C75B1A"}
            onMouseLeave={e => e.currentTarget.style.color = "#9C8C7A"}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: "rgba(199,91,26,0.35)", flexShrink: 0, width: 18 }}>{String(i+1).padStart(2,"0")}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ChecklistItem({ children }) {
  const [done, setDone] = useState(false);
  return (
    <label style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "12px 0", borderBottom: "1px solid rgba(199,91,26,0.08)", cursor: "pointer" }}>
      <div onClick={() => setDone(d => !d)} style={{
        width: 20, height: 20, borderRadius: 4, border: `1.5px solid ${done ? "#C75B1A" : "rgba(199,91,26,0.3)"}`,
        background: done ? "#C75B1A" : "transparent", flexShrink: 0, marginTop: 2,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s", cursor: "pointer"
      }}>
        {done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      <span style={{
        color: done ? "#9C8C7A" : "#3D3025", fontSize: "0.88rem", lineHeight: 1.6,
        textDecoration: done ? "line-through" : "none", transition: "all 0.2s"
      }}>{children}</span>
    </label>
  );
}

function StatBadge({ value, label, detail }) {
  return (
    <div style={{ textAlign: "center", padding: "24px 20px", borderRadius: 6, border: "1px solid rgba(199,91,26,0.15)", background: "rgba(199,91,26,0.03)" }}>
      <div style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "2.4rem", color: "#C75B1A", lineHeight: 1, marginBottom: 6 }}>{value}</div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "#9C8C7A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      {detail && <div style={{ fontSize: "0.78rem", color: "#9C8C7A", lineHeight: 1.5 }}>{detail}</div>}
    </div>
  );
}

/* ── MAIN ── */
export default function Chapter1() {
  const accent = "#C75B1A";
  const bg = "#FAF8F5";
  const bgAlt = "#F3EFE8";
  const text = "#1C1712";
  const textMid = "#5A4E40";
  const textLight = "#9C8C7A";
  const border = "rgba(199,91,26,0.15)";

  return (
    <>
      <style global="true">{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400&family=Outfit:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${bg}; color: ${text}; font-family: 'Outfit', sans-serif; font-weight: 300; -webkit-font-smoothing: antialiased; }
        .serif { font-family: 'Libre Baskerville', serif; }
        .mono  { font-family: 'DM Mono', monospace; }
        .rule  { width:100%; height:1px; background:rgba(28,23,18,0.08); }
        p { margin-bottom: 1.2em; }
        p:last-child { margin-bottom: 0; }
      `}</style>

      <ReadingProgress />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(250,248,245,0.92)", backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${border}`, height: 60,
        display: "flex", alignItems: "center", padding: "0 40px",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="#" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", color: textLight, textDecoration: "none" }}>MOTORWISE</a>
          <span style={{ color: "rgba(28,23,18,0.15)" }}>·</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: accent, letterSpacing: "0.1em" }}>CAP. 01 — EL ACEITE DE MOTOR</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ background: "transparent", border: `1px solid ${border}`, padding: "7px 16px", fontSize: "0.78rem", color: textMid, cursor: "pointer", borderRadius: 3, fontFamily: "'Outfit', sans-serif" }}>← Índice</button>
          <button style={{ background: accent, border: "none", padding: "7px 16px", fontSize: "0.78rem", color: bg, cursor: "pointer", borderRadius: 3, fontFamily: "'Outfit', sans-serif" }}>Cap. 2 →</button>
        </div>
      </nav>

      {/* HERO CAPÍTULO */}
      <header style={{
        paddingTop: 120, paddingBottom: 80, paddingLeft: 40, paddingRight: 40,
        background: bgAlt,
        backgroundImage: "linear-gradient(rgba(199,91,26,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(199,91,26,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        borderBottom: `1px solid ${border}`
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <span className="mono" style={{ fontSize: "0.6rem", letterSpacing: "0.18em", color: "rgba(199,91,26,0.5)" }}>CAPÍTULO 01 DE 10</span>
            <div style={{ flex: 1, height: 1, background: `${border}` }}/>
            <span className="mono" style={{ fontSize: "0.6rem", color: textLight }}>~12 min lectura</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 60, alignItems: "center" }}>
            <div>
              <h1 className="serif" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", color: text, lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 24 }}>
                El aceite de motor:<br/>
                <em style={{ color: accent }}>la sangre que nadie cuida.</em>
              </h1>
              <p style={{ fontSize: "1.05rem", color: textMid, lineHeight: 1.8, maxWidth: 540, marginBottom: 0 }}>
                El 60% de los daños prematuros en motor son directamente atribuibles a un manejo incorrecto del aceite. No es el componente más caro — es el más ignorado.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <OilDropIllustration />
              <span className="mono" style={{ fontSize: "0.58rem", color: textLight, textAlign: "center" }}>Viscosidad<br/>SAE 5W-30</span>
            </div>
          </div>

          {/* Stats rápidas */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 48 }}>
            <StatBadge value="60%" label="Daños evitables" detail="causados por aceite incorrecto o sucio"/>
            <StatBadge value="3×" label="Vida útil" detail="que puede ganar tu motor con el aceite correcto"/>
            <StatBadge value="$480" label="Ahorro promedio/año" detail="siguiendo los protocolos de este capítulo"/>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL con sidebar */}
      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 230px", gap: 64, paddingTop: 72, paddingBottom: 80 }}>

          {/* ── ARTÍCULO ── */}
          <article style={{ minWidth: 0 }}>

            {/* INTRO */}
            <section id="intro">
              <Reveal>
                <p className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.14em", color: accent, marginBottom: 16 }}>01 — Introducción</p>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: textMid }}>
                  Cada vez que enciendes tu auto, decenas de piezas metálicas comienzan a moverse a miles de revoluciones por minuto. Sin lubricación, en segundos habrías destruido un motor que costó miles de dólares. El aceite no es solo un líquido: es un sistema de protección, refrigeración y limpieza en uno.
                </p>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: textMid }}>
                  Este capítulo te va a dar exactamente lo que ningún mecánico quiere que sepas: cómo elegirlo, cuándo cambiarlo y cómo detectar cuando algo está mal antes de que sea tarde.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <Quote author="Manual de Ingeniería Automotriz, SAE International">
                  Un motor bien lubricado no falla — simplemente se desgasta de forma controlada. La diferencia entre "desgaste" y "avería" es casi siempre el aceite.
                </Quote>
              </Reveal>
            </section>

            <div className="rule" style={{ margin: "48px 0" }}/>

            {/* S1: QUÉ HACE EL ACEITE */}
            <section id="s1">
              <Reveal>
                <p className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.14em", color: accent, marginBottom: 16 }}>02 — Función del aceite</p>
                <h2 className="serif" style={{ fontSize: "1.8rem", color: text, letterSpacing: "-0.02em", marginBottom: 24, lineHeight: 1.2 }}>
                  ¿Qué hace realmente el aceite?
                </h2>
                <p style={{ lineHeight: 1.85, color: textMid, fontSize: "0.95rem" }}>
                  La mayoría cree que el aceite solo "lubrica." Eso es como decir que los pulmones solo "respiran." El aceite cumple cinco funciones simultáneas que tu mecánico nunca te explica en detalle porque hacerlo haría que entendieras demasiado.
                </p>
              </Reveal>

              {/* Ilustración motor */}
              <Reveal delay={0.1}>
                <div style={{ border: `1px solid ${border}`, borderRadius: 6, padding: "32px 24px", background: bgAlt, margin: "32px 0", position: "relative" }}>
                  <span className="mono" style={{ position: "absolute", top: 12, left: 16, fontSize: "0.58rem", opacity: 0.4 }}>FIG. 01 — ENGINE OIL SYSTEM</span>
                  <OilEngineIllustration />
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "24px 0" }}>
                  {[
                    { icon: "○", n: "01", t: "Lubricación", d: "Crea una película entre superficies metálicas que evita el contacto directo y el desgaste por fricción." },
                    { icon: "○", n: "02", t: "Refrigeración", d: "Absorbe hasta un 40% del calor generado por la combustión, especialmente donde el agua no llega." },
                    { icon: "○", n: "03", t: "Limpieza", d: "Los detergentes del aceite moderno suspenden partículas metálicas y depósitos de carbón, llevándolos al filtro." },
                    { icon: "○", n: "04", t: "Sello de compresión", d: "El aceite en las paredes del cilindro ayuda a sellar la cámara de combustión, optimizando la potencia." },
                    { icon: "○", n: "05", t: "Anticorrosión", d: "Los aditivos inhibidores protegen las superficies del ácido que se forma naturalmente durante la combustión." },
                  ].map((f, i) => (
                    <div key={i} style={{ padding: "18px", border: `1px solid ${border}`, borderRadius: 6, background: "white", gridColumn: i === 4 ? "1 / -1" : "auto" }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 8 }}>
                        <span className="mono" style={{ fontSize: "0.58rem", color: "rgba(199,91,26,0.35)" }}>{f.n}</span>
                        <span style={{ fontWeight: 500, color: text, fontSize: "0.88rem" }}>{f.t}</span>
                      </div>
                      <p style={{ color: textMid, fontSize: "0.82rem", lineHeight: 1.7, margin: 0 }}>{f.d}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <TipBox icon="💡" label="Tip profesional" variant="tip">
                  Si tu aceite se pone negro rápidamente, no es señal de que sea malo — es señal de que está trabajando bien. El color oscuro indica que está cumpliendo su función de limpieza. Lo que sí debes vigilar es la <strong>textura</strong>: si al frotarlo entre los dedos sientes granos o huele a gasolina, es momento de cambiarlo.
                </TipBox>
              </Reveal>
            </section>

            <div className="rule" style={{ margin: "48px 0" }}/>

            {/* S2: LA ETIQUETA */}
            <section id="s2">
              <Reveal>
                <p className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.14em", color: accent, marginBottom: 16 }}>03 — Especificaciones</p>
                <h2 className="serif" style={{ fontSize: "1.8rem", color: text, letterSpacing: "-0.02em", marginBottom: 24, lineHeight: 1.2 }}>
                  La etiqueta que nadie lee.
                </h2>
                <p style={{ lineHeight: 1.85, color: textMid, fontSize: "0.95rem" }}>
                  En cada envase de aceite hay un código que parece jeroglífico: <strong>5W-30, 10W-40, 0W-20</strong>. Es el grado de viscosidad SAE y es probablemente la información más importante que ignoras cada vez que cambias el aceite.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div style={{ border: `1px solid ${border}`, borderRadius: 6, padding: "32px 24px", background: bgAlt, margin: "28px 0" }}>
                  <ViscosityIllustration />
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div style={{ background: "white", border: `1px solid ${border}`, borderRadius: 6, overflow: "hidden", margin: "24px 0" }}>
                  <div style={{ padding: "18px 24px", borderBottom: `1px solid ${border}`, background: bgAlt }}>
                    <span className="mono" style={{ fontSize: "0.62rem", color: accent }}>Cómo leer el código de viscosidad</span>
                  </div>
                  <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "auto auto 1fr", alignItems: "center", gap: "0 0" }}>
                    {[
                      ["5W", "Número invernal (W = Winter)", "Qué tan fluido es el aceite en frío. Menor número = fluye mejor al arrancar. Crítico en climas fríos."],
                      ["—", "Separador", ""],
                      ["30", "Viscosidad en caliente", "Qué tan grueso permanece el aceite a temperatura de operación (100°C). Mayor número = mayor protección en calor."],
                    ].map(([code, name, desc], i) => (
                      <div key={i} style={{ display: "contents" }}>
                        <div style={{ padding: "14px 16px 14px 0", borderBottom: i < 2 ? `1px solid ${border}` : "none", display: "flex", alignItems: "center" }}>
                          <span className="serif" style={{ fontSize: "1.4rem", color: accent, fontWeight: 700, minWidth: 40 }}>{code}</span>
                        </div>
                        <div style={{ padding: "14px 16px", borderBottom: i < 2 ? `1px solid ${border}` : "none", borderLeft: `1px solid ${border}`, borderRight: `1px solid ${border}` }}>
                          <span style={{ fontWeight: 500, fontSize: "0.85rem", color: text }}>{name}</span>
                        </div>
                        <div style={{ padding: "14px 0 14px 16px", borderBottom: i < 2 ? `1px solid ${border}` : "none" }}>
                          <span style={{ fontSize: "0.82rem", color: textMid, lineHeight: 1.6 }}>{desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <TipBox icon="⚠️" label="Advertencia" variant="warning">
                  <strong>Nunca uses un aceite con menor viscosidad en caliente de la recomendada por el fabricante</strong> para "ahorrar." Un motor diseñado para 5W-40 que recibe 5W-30 en climas calurosos puede sufrir pérdida de presión de aceite a altas temperaturas. El ahorro de $5 puede costarte $2,000 en reparaciones.
                </TipBox>
              </Reveal>

              <Reveal delay={0.1}>
                <TipBox icon="✓" label="Dato verificado" variant="fact">
                  El aceite recomendado por el fabricante siempre está en el tapón de aceite o en el manual de propietario. Si el taller te propone un grado diferente sin justificación técnica escrita, <strong>es una señal de alerta</strong>.
                </TipBox>
              </Reveal>
            </section>

            <div className="rule" style={{ margin: "48px 0" }}/>

            {/* S3: INTERVALO */}
            <section id="s3">
              <Reveal>
                <p className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.14em", color: accent, marginBottom: 16 }}>04 — El gran mito</p>
                <h2 className="serif" style={{ fontSize: "1.8rem", color: text, letterSpacing: "-0.02em", marginBottom: 24, lineHeight: 1.2 }}>
                  El intervalo de cambio: el negocio más grande del taller.
                </h2>
                <p style={{ lineHeight: 1.85, color: textMid, fontSize: "0.95rem" }}>
                  "Cada 5,000 km" es el mantra que repiten los mecánicos desde hace décadas. Pero ese número viene de la era de los aceites minerales de los años 70. Los aceites sintéticos modernos pueden durar entre 10,000 y 15,000 km sin perder sus propiedades — dependiendo del uso.
                </p>
                <p style={{ lineHeight: 1.85, color: textMid, fontSize: "0.95rem" }}>
                  Cambiar el aceite antes de tiempo no daña el motor — pero sí daña tu bolsillo y el medio ambiente. La clave está en entender <em>tu</em> tipo de conducción.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div style={{ margin: "28px 0", border: `1px solid ${border}`, borderRadius: 6, overflow: "hidden", background: "white" }}>
                  <div style={{ padding: "16px 24px", borderBottom: `1px solid ${border}`, background: bgAlt }}>
                    <span className="mono" style={{ fontSize: "0.62rem", color: accent }}>Intervalos reales por tipo de aceite y uso</span>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${border}`, background: "rgba(199,91,26,0.03)" }}>
                        {["Tipo de aceite","Uso normal","Uso severo","Lo que el taller te dice"].map((h,i)=>(
                          <th key={i} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: textLight, letterSpacing: "0.08em", fontWeight: 400, textTransform: "uppercase" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Mineral","5,000 km","3,500 km","5,000 km ✓"],
                        ["Semi-sintético","7,500 km","5,000 km","5,000 km ✗"],
                        ["Sintético total","12,000–15,000 km","8,000 km","5,000 km ✗✗"],
                      ].map((row, i) => (
                        <tr key={i} style={{ borderBottom: i < 2 ? `1px solid ${border}` : "none", background: i % 2 === 0 ? "white" : "rgba(199,91,26,0.015)" }}>
                          {row.map((cell, j) => (
                            <td key={j} style={{ padding: "14px 16px", fontSize: "0.85rem", color: j === 3 ? (cell.includes("✗✗") ? "#991B1B" : cell.includes("✗") ? "#B45309" : "#1D6A5A") : textMid, fontWeight: j === 0 ? 500 : 300, fontFamily: j === 0 ? "'Outfit', sans-serif" : "inherit" }}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ padding: "12px 16px", borderTop: `1px solid ${border}`, background: bgAlt }}>
                    <span style={{ fontSize: "0.75rem", color: textLight }}>* "Uso severo" = mucho tráfico urbano, distancias cortas frecuentes, climas extremos o remolque de cargas.</span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <TipBox icon="🔍" label="El mito" variant="myth">
                  <strong>"El aceite sintético daña los sellos de motores viejos."</strong> — Esto era parcialmente cierto antes de 1990. Los aceites sintéticos modernos son completamente compatibles con todos los elastómeros y sellos de goma. Si tienes un motor anterior a 1985, consulta al fabricante, pero en el 99% de los casos modernos es seguro.
                </TipBox>
              </Reveal>
            </section>

            <div className="rule" style={{ margin: "48px 0" }}/>

            {/* S4: VERIFICAR NIVEL */}
            <section id="s4">
              <Reveal>
                <p className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.14em", color: accent, marginBottom: 16 }}>05 — Práctica</p>
                <h2 className="serif" style={{ fontSize: "1.8rem", color: text, letterSpacing: "-0.02em", marginBottom: 24, lineHeight: 1.2 }}>
                  Cómo verificar el nivel en 2 minutos.
                </h2>
                <p style={{ lineHeight: 1.85, color: textMid, fontSize: "0.95rem" }}>
                  Esta es probablemente la habilidad más subestimada del automovilismo básico. Un motor puede consumir aceite silenciosamente hasta quedar sin nada. Aquí el procedimiento correcto, porque hacerlo mal da lecturas erróneas.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center", margin: "28px 0" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {[
                      { n: "01", t: "Motor frío o tibio", d: "Espera al menos 5 minutos después de apagar el motor para que el aceite baje al cárter. En caliente, la lectura será falsamente baja." },
                      { n: "02", t: "Auto en superficie plana", d: "Una inclinación de apenas 3° puede generar una diferencia de 500 ml en la lectura. Siempre en terreno nivelado." },
                      { n: "03", t: "Extrae y limpia la varilla", d: "Saca la varilla (dipstick), limpia con un trapo limpio, vuélvela a introducir completamente y espera 3 segundos antes de sacarla." },
                      { n: "04", t: "Lee entre las marcas", d: "El nivel debe estar entre MIN y MAX. Lo ideal es mantenerlo en el 75% superior. Agregar aceite solo si está por debajo del 50%." },
                      { n: "05", t: "Observa el color y textura", d: "Ambar claro = excelente. Marrón oscuro = normal. Negro con grumos = cambio urgente. Gris lechoso = posible contaminación de refrigerante." },
                    ].map((step, i) => (
                      <div key={i} style={{ display: "flex", gap: 16, padding: "18px 0", borderBottom: i < 4 ? `1px solid rgba(199,91,26,0.08)` : "none" }}>
                        <div style={{ width: 28, height: 28, background: accent, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                          <span className="mono" style={{ fontSize: "0.58rem", color: bg }}>{step.n}</span>
                        </div>
                        <div>
                          <div style={{ fontWeight: 500, color: text, fontSize: "0.9rem", marginBottom: 4 }}>{step.t}</div>
                          <div style={{ color: textMid, fontSize: "0.84rem", lineHeight: 1.7 }}>{step.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                    <TemperatureGauge />
                    <p className="mono" style={{ fontSize: "0.58rem", color: textLight, textAlign: "center", lineHeight: 1.6 }}>Motor tibio<br/>ideal para<br/>verificación</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <TipBox icon="💡" label="Truco pro" variant="tip">
                  Revisa el nivel <strong>cada dos semanas o cada 1,000 km</strong>, lo que ocurra primero. Un motor que consume más de 500 ml entre cambios tiene un problema que debes investigar — no ignorar agregando aceite.
                </TipBox>
              </Reveal>
            </section>

            <div className="rule" style={{ margin: "48px 0" }}/>

            {/* S5: SECRETOS */}
            <section id="s5">
              <Reveal>
                <p className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.14em", color: accent, marginBottom: 16 }}>06 — Los secretos</p>
                <h2 className="serif" style={{ fontSize: "1.8rem", color: text, letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.2 }}>
                  Los 5 secretos de este capítulo.
                </h2>
                <p style={{ color: textMid, fontSize: "0.88rem", lineHeight: 1.7, marginBottom: 24 }}>Toca cada uno para expandirlo.</p>
              </Reveal>

              <Reveal delay={0.1}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <SecretCard num="001" title="El aceite de transmisión automática también se cambia (y casi nadie lo hace)" tag="Transmisión">
                    La mayoría de los fabricantes especifican un intervalo de cambio entre 60,000 y 100,000 km. Sin embargo, muchos talleres omiten mencionarlo porque "el cliente no pregunta." Un ATF degradado es la causa más común de resbalones de caja y reparaciones de $3,000+. Si tu auto tiene más de 80,000 km y nunca le has cambiado el aceite de caja, es urgente.
                  </SecretCard>
                  <SecretCard num="002" title="El filtro de aceite barato puede costarte el motor" tag="Filtración">
                    Los filtros de aceite genéricos de bajo costo pueden colapsar internamente bajo presión, bloqueando el flujo de aceite por milisegundos durante el arranque en frío. Esos milisegundos son suficientes para causar desgaste en los cojinetes. La diferencia de precio entre un filtro genérico y uno OEM es de $4 a $8. La diferencia en protección es abismal.
                  </SecretCard>
                  <SecretCard num="003" title="Mezclar marcas de aceite sintético es completamente seguro" tag="Mito">
                    Todos los aceites sintéticos modernos deben cumplir los estándares API (American Petroleum Institute) o ACEA. Mientras el grado de viscosidad y la especificación API sean compatibles, mezclar marcas no daña absolutamente nada. Lo que no debes mezclar son aceites de diferente viscosidad o aceites convencionales con sintéticos en proporciones mayores al 20%.
                  </SecretCard>
                  <SecretCard num="004" title="El aceite 'para motor viejo' es en gran parte marketing" tag="Marketing">
                    Los aceites de mayor viscosidad (como 20W-50) se comercializan para "motores con muchas millas" pero en la mayoría de los casos, usar el aceite original del fabricante con aditivos de sellado es más efectivo. La viscosidad más alta puede en realidad reducir la eficiencia de lubricación en componentes modernos.
                  </SecretCard>
                  <SecretCard num="005" title="El aceite usado tiene más valor del que crees" tag="Diagnóstico">
                    Un análisis de aceite usado ($25-40 en cualquier laboratorio automotriz) puede revelar concentraciones de metales, nivel de contaminación por combustible, presencia de refrigerante y el estado real de tu motor — antes de que cualquier síntoma sea visible. Es el diagnóstico más barato y revelador que existe.
                  </SecretCard>
                </div>
              </Reveal>
            </section>

            <div className="rule" style={{ margin: "48px 0" }}/>

            {/* S6: SEÑALES */}
            <section id="s6">
              <Reveal>
                <p className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.14em", color: accent, marginBottom: 16 }}>07 — Señales de alarma</p>
                <h2 className="serif" style={{ fontSize: "1.8rem", color: text, letterSpacing: "-0.02em", marginBottom: 24, lineHeight: 1.2 }}>
                  Señales que no puedes ignorar.
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "8px 0" }}>
                  {[
                    { icon: "🔴", urgency: "URGENTE", signal: "Luz de presión de aceite encendida", action: "Detén el motor inmediatamente. Continuar puede destruir el motor en minutos." },
                    { icon: "🟠", urgency: "ALTA", signal: "Humo azuloso del escape", action: "El motor está quemando aceite. Indica desgaste en sellos o anillos. Requiere diagnóstico esta semana." },
                    { icon: "🟠", urgency: "ALTA", signal: "Olor a quemado bajo el capó", action: "Posible fuga de aceite sobre el colector de escape. Riesgo de incendio. Revisar hoy." },
                    { icon: "🟡", urgency: "MEDIA", signal: "Ruido de golpeteo al arrancar", action: "Los cojinetes no reciben aceite en el primer segundo. Revisar nivel y considerar aceite de mayor calidad." },
                    { icon: "🟡", urgency: "MEDIA", signal: "Consumo de más de 500ml por 1,000km", action: "Normal en algunos motores deportivos, anormal en la mayoría. Investigar origen de la pérdida." },
                    { icon: "🟢", urgency: "PREVENTIVA", signal: "Aceite con aspecto lechoso/grisáceo", action: "Posible contaminación de refrigerante. Diagnóstico de junta de culata antes de próximo viaje largo." },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: "18px", border: `1px solid ${border}`, borderRadius: 6, background: "white" }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                        <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                        <span className="mono" style={{ fontSize: "0.58rem", color: item.urgency === "URGENTE" ? "#991B1B" : item.urgency === "ALTA" ? "#B45309" : item.urgency === "MEDIA" ? "#92400E" : "#1D6A5A" }}>{item.urgency}</span>
                      </div>
                      <p style={{ fontWeight: 500, color: text, fontSize: "0.88rem", marginBottom: 6 }}>{item.signal}</p>
                      <p style={{ color: textMid, fontSize: "0.8rem", lineHeight: 1.65, margin: 0 }}>{item.action}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>

            <div className="rule" style={{ margin: "48px 0" }}/>

            {/* CHECKLIST */}
            <section id="checklist">
              <Reveal>
                <p className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.14em", color: accent, marginBottom: 16 }}>08 — Checklist</p>
                <h2 className="serif" style={{ fontSize: "1.8rem", color: text, letterSpacing: "-0.02em", marginBottom: 8, lineHeight: 1.2 }}>
                  Checklist del capítulo.
                </h2>
                <p style={{ color: textMid, fontSize: "0.88rem", marginBottom: 28 }}>Marca cada punto que ya tienes cubierto en tu auto.</p>
              </Reveal>

              <Reveal delay={0.1}>
                <div style={{ border: `1px solid ${border}`, borderRadius: 6, overflow: "hidden", background: "white" }}>
                  <div style={{ padding: "16px 24px", borderBottom: `1px solid ${border}`, background: bgAlt, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="mono" style={{ fontSize: "0.62rem", color: accent }}>Tu estado del aceite de motor</span>
                    <span style={{ fontSize: "0.75rem", color: textLight }}>Interactivo — toca para marcar</span>
                  </div>
                  <div style={{ padding: "8px 24px 16px" }}>
                    {[
                      "Sé el grado de viscosidad recomendado para mi motor (lo encontré en el tapón o manual).",
                      "Conozco la fecha y km del último cambio de aceite.",
                      "He verificado el nivel de aceite en los últimos 30 días con el procedimiento correcto.",
                      "El aceite que uso es de la especificación API correcta para mi motor.",
                      "Sé si mi auto tiene un monitor de vida de aceite o si debo llevar el registro manualmente.",
                      "He verificado que el filtro de aceite es de calidad OEM o equivalente certificado.",
                      "Conozco el intervalo de cambio correcto para mi tipo de aceite y conducción.",
                      "Sé identificar los signos visuales de alarma en mi aceite (color, textura, olor).",
                      "Tengo anotado el próximo cambio de aceite de transmisión automática (si aplica).",
                    ].map((item, i) => (
                      <ChecklistItem key={i}>{item}</ChecklistItem>
                    ))}
                  </div>
                </div>
              </Reveal>
            </section>

            {/* CIERRE */}
            <div className="rule" style={{ margin: "48px 0" }}/>

            <Reveal>
              <div style={{ padding: "40px", background: bgAlt, borderRadius: 6, border: `1px solid ${border}`, textAlign: "center" }}>
                <p className="mono" style={{ fontSize: "0.6rem", color: accent, marginBottom: 16 }}>Próximo capítulo</p>
                <h3 className="serif" style={{ fontSize: "1.5rem", color: text, marginBottom: 12, letterSpacing: "-0.02em" }}>
                  Cap. 02 — Los sensores que mienten.
                </h3>
                <p style={{ color: textMid, fontSize: "0.88rem", lineHeight: 1.7, maxWidth: 400, margin: "0 auto 24px" }}>
                  Cómo los sensores OBD-II generan falsos códigos, cuáles puedes resolver tú mismo por menos de $20, y cuáles son señales reales de problemas serios.
                </p>
                <button style={{ background: accent, border: "none", padding: "14px 28px", color: bg, fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: "0.88rem", cursor: "pointer", borderRadius: 3, letterSpacing: "0.03em" }}>
                  Continuar lectura →
                </button>
              </div>
            </Reveal>

          </article>

          {/* ── SIDEBAR ── */}
          <aside style={{ minWidth: 0 }}>
            <TableOfContents />
          </aside>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: "28px 40px", background: bgAlt }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span className="mono" style={{ fontSize: "0.6rem", color: textLight }}>MOTORWISE © 2025 — Capítulo 01 de 10</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["← Capítulo anterior","Índice general","Capítulo 02 →"].map((l, i) => (
              <a key={i} href="#" style={{ color: i === 2 ? accent : textLight, fontSize: "0.78rem", textDecoration: "none", letterSpacing: "0.04em", fontFamily: "'Outfit', sans-serif" }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>

    </>
  );
}