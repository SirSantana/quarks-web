import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ── SVG ILUSTRACIONES TÉCNICAS ── */

function IllustrationDashboard() {
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 280 }}>
      <style>{`
        .dl { stroke-dasharray: 600; stroke-dashoffset: 600; animation: dl 2.4s ease forwards; }
        .dl2 { stroke-dasharray: 400; stroke-dashoffset: 400; animation: dl 2s ease 0.3s forwards; }
        .dl3 { stroke-dasharray: 200; stroke-dashoffset: 200; animation: dl 1.6s ease 0.6s forwards; }
        .fade { opacity:0; animation: fi 0.5s ease 1.5s forwards; }
        @keyframes dl { to { stroke-dashoffset: 0; } }
        @keyframes fi { to { opacity: 1; } }
      `}</style>
      {/* Marco cuadro de mandos */}
      <rect className="dl" x="20" y="20" width="280" height="160" rx="8" stroke="#C75B1A" strokeWidth="1"/>
      {/* Velocímetro grande centro-izq */}
      <circle className="dl" cx="110" cy="105" r="58" stroke="#C75B1A" strokeWidth="1"/>
      <circle className="dl2" cx="110" cy="105" r="44" stroke="#C75B1A" strokeWidth="0.6" strokeDasharray="4 3"/>
      <circle cx="110" cy="105" r="4" fill="#C75B1A" className="fade"/>
      {/* Aguja velocímetro */}
      <line className="dl3" x1="110" y1="105" x2="138" y2="70" stroke="#C75B1A" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Marcas velocímetro */}
      {[0,30,60,90,120,150,180,210,240].map((deg,i) => {
        const r = Math.PI * deg / 180;
        const x1 = 110 + 52 * Math.cos(r - Math.PI*0.8);
        const y1 = 105 + 52 * Math.sin(r - Math.PI*0.8);
        const x2 = 110 + 44 * Math.cos(r - Math.PI*0.8);
        const y2 = 105 + 44 * Math.sin(r - Math.PI*0.8);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C75B1A" strokeWidth="0.8" className="fade"/>;
      })}
      {/* RPM pequeño der */}
      <circle className="dl2" cx="220" cy="90" r="36" stroke="#C75B1A" strokeWidth="0.8"/>
      <circle className="dl3" cx="220" cy="90" r="26" stroke="#C75B1A" strokeWidth="0.5" strokeDasharray="3 3"/>
      <line className="dl3" x1="220" y1="90" x2="238" y2="72" stroke="#C75B1A" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="220" cy="90" r="3" fill="#C75B1A" className="fade"/>
      {/* Indicadores pequeños abajo */}
      <rect className="dl3" x="180" y="135" width="22" height="14" rx="3" stroke="#C75B1A" strokeWidth="0.7"/>
      <rect className="dl3" x="210" y="135" width="22" height="14" rx="3" stroke="#C75B1A" strokeWidth="0.7"/>
      <rect className="dl3" x="240" y="135" width="22" height="14" rx="3" stroke="#C75B1A" strokeWidth="0.7"/>
      {/* Check engine encendido */}
      <rect className="dl2" x="240" y="135" width="22" height="14" rx="3" fill="#FEE9D6" stroke="#C75B1A" strokeWidth="0.7"/>
      {/* Etiquetas */}
      <text className="fade" x="110" y="148" textAnchor="middle" fontSize="7" fill="#C75B1A" fontFamily="monospace" letterSpacing="1">KM/H</text>
      <text className="fade" x="220" y="122" textAnchor="middle" fontSize="6" fill="#C75B1A" fontFamily="monospace">RPM</text>
      <text className="fade" x="110" y="35" textAnchor="middle" fontSize="6" fill="#C75B1A" fontFamily="monospace" opacity="0.5">FIG. 01 — INSTRUMENT CLUSTER</text>
    </svg>
  );
}

function IllustrationTire() {
  return (
    <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 180 }}>
      <style>{`
        .tl { stroke-dasharray: 800; stroke-dashoffset: 800; animation: dl 2.6s ease forwards; }
        .tl2 { stroke-dasharray: 400; stroke-dashoffset: 400; animation: dl 2s ease 0.4s forwards; }
        .tf { opacity:0; animation: fi 0.4s ease 1.8s forwards; }
        @keyframes dl { to { stroke-dashoffset: 0; } }
        @keyframes fi { to { opacity: 1; } }
      `}</style>
      <circle className="tl" cx="110" cy="110" r="88" stroke="#C75B1A" strokeWidth="1.2"/>
      <circle className="tl" cx="110" cy="110" r="68" stroke="#C75B1A" strokeWidth="0.7"/>
      <circle className="tl2" cx="110" cy="110" r="38" stroke="#C75B1A" strokeWidth="1"/>
      <circle className="tl2" cx="110" cy="110" r="28" stroke="#C75B1A" strokeWidth="0.6" strokeDasharray="3 2"/>
      {/* Rayos llanta */}
      {[0,60,120,180,240,300].map((deg,i) => {
        const r = Math.PI * deg / 180;
        return <line key={i} className="tl2"
          x1={110 + 38*Math.cos(r)} y1={110 + 38*Math.sin(r)}
          x2={110 + 68*Math.cos(r)} y2={110 + 68*Math.sin(r)}
          stroke="#C75B1A" strokeWidth="2.5" strokeLinecap="round"/>;
      })}
      {/* Dibujo banda rodadura */}
      {[15,45,75,105,135,165,195,225,255,285,315,345].map((deg,i) => {
        const r = Math.PI * deg / 180;
        const x1 = 110 + 72*Math.cos(r); const y1 = 110 + 72*Math.sin(r);
        const x2 = 110 + 84*Math.cos(r); const y2 = 110 + 84*Math.sin(r);
        return <line key={i} className="tl" x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C75B1A" strokeWidth="3" strokeLinecap="round"/>;
      })}
      {/* Medidas técnicas */}
      <line className="tf" x1="110" y1="16" x2="110" y2="6" stroke="#C75B1A" strokeWidth="0.6"/>
      <line className="tf" x1="110" y1="214" x2="110" y2="204" stroke="#C75B1A" strokeWidth="0.6"/>
      <line className="tf" x1="105" y1="6" x2="115" y2="6" stroke="#C75B1A" strokeWidth="0.6"/>
      <line className="tf" x1="105" y1="214" x2="115" y2="214" stroke="#C75B1A" strokeWidth="0.6"/>
      <line className="tf" x1="110" y1="6" x2="110" y2="214" stroke="#C75B1A" strokeWidth="0.3" strokeDasharray="2 4"/>
      <text className="tf" x="116" y="112" fontSize="7" fill="#C75B1A" fontFamily="monospace">Ø 220mm</text>
      <text className="tf" x="110" y="205" textAnchor="middle" fontSize="6" fill="#C75B1A" fontFamily="monospace" opacity="0.5">FIG. 02 — TIRE CROSS SECTION</text>
    </svg>
  );
}

function IllustrationSpark() {
  return (
    <svg viewBox="0 0 160 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 130 }}>
      <style>{`
        .sl { stroke-dasharray: 600; stroke-dashoffset: 600; animation: dl 2.2s ease forwards; }
        .sl2 { stroke-dasharray: 300; stroke-dashoffset: 300; animation: dl 1.8s ease 0.5s forwards; }
        .sf { opacity:0; animation: fi 0.4s ease 1.6s forwards; }
        @keyframes dl { to { stroke-dashoffset: 0; } }
        @keyframes fi { to { opacity: 1; } }
      `}</style>
      {/* Conector superior */}
      <rect className="sl" x="55" y="20" width="50" height="30" rx="4" stroke="#C75B1A" strokeWidth="1"/>
      <rect className="sl2" x="62" y="26" width="36" height="18" rx="2" stroke="#C75B1A" strokeWidth="0.6"/>
      {/* Rosca hexagonal */}
      <rect className="sl" x="50" y="58" width="60" height="45" rx="3" stroke="#C75B1A" strokeWidth="1"/>
      {[66,74,82,90,98].map((y,i)=>(
        <line key={i} className="sl2" x1="50" y1={y} x2="110" y2={y} stroke="#C75B1A" strokeWidth="0.5" strokeDasharray="3 2"/>
      ))}
      {/* Cuerpo bujía */}
      <line className="sl" x1="80" y1="103" x2="80" y2="200" stroke="#C75B1A" strokeWidth="12" strokeLinecap="round"/>
      <line className="sl" x1="80" y1="103" x2="80" y2="200" stroke="white" strokeWidth="8" strokeLinecap="round"/>
      <line className="sl2" x1="80" y1="103" x2="80" y2="200" stroke="#C75B1A" strokeWidth="1"/>
      {/* Electrodo */}
      <line className="sl" x1="80" y1="200" x2="80" y2="240" stroke="#C75B1A" strokeWidth="2" strokeLinecap="round"/>
      <line className="sl2" x1="65" y1="240" x2="80" y2="240" stroke="#C75B1A" strokeWidth="2" strokeLinecap="round"/>
      {/* Chispa */}
      <path className="sf" d="M78 236 L72 248 L78 246 L74 258" stroke="#C75B1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Cotas */}
      <line className="sf" x1="45" y1="58" x2="35" y2="58" stroke="#C75B1A" strokeWidth="0.6"/>
      <line className="sf" x1="45" y1="103" x2="35" y2="103" stroke="#C75B1A" strokeWidth="0.6"/>
      <line className="sf" x1="38" y1="58" x2="38" y2="103" stroke="#C75B1A" strokeWidth="0.6"/>
      <line className="sf" x1="34" y1="60" x2="42" y2="60" stroke="#C75B1A" strokeWidth="0.6"/>
      <line className="sf" x1="34" y1="101" x2="42" y2="101" stroke="#C75B1A" strokeWidth="0.6"/>
      <text className="sf" x="18" y="84" fontSize="6" fill="#C75B1A" fontFamily="monospace">HEX</text>
      <text className="sf" x="80" y="272" textAnchor="middle" fontSize="6" fill="#C75B1A" fontFamily="monospace" opacity="0.5">FIG. 03 — SPARK PLUG</text>
    </svg>
  );
}

function IllustrationFilter() {
  return (
    <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 160 }}>
      <style>{`
        .fl { stroke-dasharray: 700; stroke-dashoffset: 700; animation: dl 2.4s ease forwards; }
        .fl2 { stroke-dasharray: 350; stroke-dashoffset: 350; animation: dl 2s ease 0.35s forwards; }
        .ff { opacity:0; animation: fi 0.4s ease 1.8s forwards; }
        @keyframes dl { to { stroke-dashoffset: 0; } }
        @keyframes fi { to { opacity: 1; } }
      `}</style>
      {/* Cilindro filtro exterior */}
      <ellipse className="fl" cx="100" cy="45" rx="65" ry="16" stroke="#C75B1A" strokeWidth="1"/>
      <line className="fl" x1="35" y1="45" x2="35" y2="165" stroke="#C75B1A" strokeWidth="1"/>
      <line className="fl" x1="165" y1="45" x2="165" y2="165" stroke="#C75B1A" strokeWidth="1"/>
      <ellipse className="fl" cx="100" cy="165" rx="65" ry="16" stroke="#C75B1A" strokeWidth="1"/>
      {/* Interior pliegues filtro */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12].map((i)=>{
        const x = 45 + i*10;
        return <line key={i} className="fl2" x1={x} y1="45" x2={x} y2="165" stroke="#C75B1A" strokeWidth="0.5" strokeDasharray="4 4"/>;
      })}
      {/* Roscas superior */}
      {[36,42,48].map((y,i)=>(
        <ellipse key={i} className="fl2" cx="100" cy={y} rx="65" ry="16" stroke="#C75B1A" strokeWidth="0.4" strokeDasharray="4 3"/>
      ))}
      {/* Tapón centro superior */}
      <ellipse className="fl" cx="100" cy="45" rx="20" ry="5" stroke="#C75B1A" strokeWidth="1"/>
      {/* Tapón centro inferior */}
      <ellipse className="ff" cx="100" cy="165" rx="20" ry="5" stroke="#C75B1A" strokeWidth="1"/>
      {/* Flecha flujo */}
      <line className="ff" x1="100" y1="15" x2="100" y2="30" stroke="#C75B1A" strokeWidth="0.8" markerEnd="url(#arr2)"/>
      <defs>
        <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#C75B1A" strokeWidth="1.5" strokeLinecap="round"/>
        </marker>
      </defs>
      <text className="ff" x="110" y="24" fontSize="6" fill="#C75B1A" fontFamily="monospace">FLOW</text>
      <text className="ff" x="100" y="205" textAnchor="middle" fontSize="6" fill="#C75B1A" fontFamily="monospace" opacity="0.5">FIG. 04 — OIL FILTER</text>
    </svg>
  );
}

function IllustrationCar() {
  return (
    <svg viewBox="0 0 480 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 440 }}>
      <style>{`
        .cl { stroke-dasharray: 1400; stroke-dashoffset: 1400; animation: dl 3.5s ease forwards; }
        .cl2 { stroke-dasharray: 700; stroke-dashoffset: 700; animation: dl 2.8s ease 0.5s forwards; }
        .cl3 { stroke-dasharray: 300; stroke-dashoffset: 300; animation: dl 2s ease 1s forwards; }
        .cf { opacity:0; animation: fi 0.5s ease 2.5s forwards; }
        @keyframes dl { to { stroke-dashoffset: 0; } }
        @keyframes fi { to { opacity: 1; } }
      `}</style>
      {/* Carrocería exterior */}
      <path className="cl" d="M 60 130 L 60 100 Q 100 55 170 50 L 300 50 Q 360 52 400 80 L 430 100 L 430 130 Z" stroke="#C75B1A" strokeWidth="1.2" strokeLinejoin="round"/>
      {/* Techo y ventanas */}
      <path className="cl2" d="M 140 100 Q 160 60 200 58 L 310 58 Q 350 60 370 90 L 140 100 Z" stroke="#C75B1A" strokeWidth="0.8"/>
      {/* División ventanas */}
      <line className="cl2" x1="255" y1="58" x2="248" y2="100" stroke="#C75B1A" strokeWidth="0.7"/>
      {/* Rueda delantera */}
      <circle className="cl" cx="130" cy="138" r="28" stroke="#C75B1A" strokeWidth="1"/>
      <circle className="cl2" cx="130" cy="138" r="18" stroke="#C75B1A" strokeWidth="0.7"/>
      <circle className="cl3" cx="130" cy="138" r="9" stroke="#C75B1A" strokeWidth="0.8" strokeDasharray="3 2"/>
      {[0,72,144,216,288].map((deg,i)=>{
        const r=Math.PI*deg/180;
        return <line key={i} className="cl3"
          x1={130+9*Math.cos(r)} y1={138+9*Math.sin(r)}
          x2={130+18*Math.cos(r)} y2={138+18*Math.sin(r)}
          stroke="#C75B1A" strokeWidth="2" strokeLinecap="round"/>;
      })}
      {/* Rueda trasera */}
      <circle className="cl" cx="360" cy="138" r="28" stroke="#C75B1A" strokeWidth="1"/>
      <circle className="cl2" cx="360" cy="138" r="18" stroke="#C75B1A" strokeWidth="0.7"/>
      <circle className="cl3" cx="360" cy="138" r="9" stroke="#C75B1A" strokeWidth="0.8" strokeDasharray="3 2"/>
      {[0,72,144,216,288].map((deg,i)=>{
        const r=Math.PI*deg/180;
        return <line key={i} className="cl3"
          x1={360+9*Math.cos(r)} y1={138+9*Math.sin(r)}
          x2={360+18*Math.cos(r)} y2={138+18*Math.sin(r)}
          stroke="#C75B1A" strokeWidth="2" strokeLinecap="round"/>;
      })}
      {/* Detalles frontales */}
      <line className="cl2" x1="430" y1="90" x2="445" y2="90" stroke="#C75B1A" strokeWidth="0.7"/>
      <rect className="cl2" x="445" y="85" width="12" height="10" rx="1" stroke="#C75B1A" strokeWidth="0.7"/>
      {/* Parachoques */}
      <path className="cl2" d="M 60 115 Q 42 118 38 128 L 38 138" stroke="#C75B1A" strokeWidth="0.7" strokeLinecap="round"/>
      {/* Línea suelo */}
      <line className="cf" x1="20" y1="166" x2="460" y2="166" stroke="#C75B1A" strokeWidth="0.5" strokeDasharray="6 4"/>
      {/* Cotas altura */}
      <line className="cf" x1="20" y1="50" x2="20" y2="166" stroke="#C75B1A" strokeWidth="0.5"/>
      <line className="cf" x1="16" y1="50" x2="24" y2="50" stroke="#C75B1A" strokeWidth="0.5"/>
      <line className="cf" x1="16" y1="166" x2="24" y2="166" stroke="#C75B1A" strokeWidth="0.5"/>
      <text className="cf" x="8" y="112" fontSize="6" fill="#C75B1A" fontFamily="monospace" textAnchor="middle">H</text>
      {/* Cota longitud */}
      <line className="cf" x1="60" y1="182" x2="430" y2="182" stroke="#C75B1A" strokeWidth="0.5"/>
      <line className="cf" x1="60" y1="178" x2="60" y2="186" stroke="#C75B1A" strokeWidth="0.5"/>
      <line className="cf" x1="430" y1="178" x2="430" y2="186" stroke="#C75B1A" strokeWidth="0.5"/>
      <text className="cf" x="245" y="195" fontSize="6" fill="#C75B1A" fontFamily="monospace" textAnchor="middle">LONGITUD TOTAL</text>
      <text className="cf" x="240" y="26" textAnchor="middle" fontSize="7" fill="#C75B1A" fontFamily="monospace" opacity="0.5" letterSpacing="2">FIG. 00 — LATERAL VIEW — SCALE 1:50</text>
    </svg>
  );
}

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const accent = "#C75B1A";
  const accentLight = "#FEE9D6";
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
        body {
          background: ${bg};
          color: ${text};
          font-family: 'Outfit', sans-serif;
          font-weight: 300;
          -webkit-font-smoothing: antialiased;
        }
        .serif { font-family: 'Libre Baskerville', serif; }
        .mono { font-family: 'DM Mono', monospace; font-size: 0.68rem; letter-spacing: 0.12em; color: ${accent}; text-transform: uppercase; }
        .btn-main {
          display: inline-flex; align-items: center; gap: 8px;
          background: ${accent}; color: ${bg};
          font-family: 'Outfit', sans-serif; font-weight: 500;
          font-size: 0.88rem; letter-spacing: 0.04em;
          padding: 14px 28px; border: none; cursor: pointer;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .btn-main:hover { background: #A84A13; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(199,91,26,0.22); }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: ${textMid};
          font-family: 'Outfit', sans-serif; font-weight: 400;
          font-size: 0.88rem; letter-spacing: 0.04em;
          padding: 13px 24px; border: 1px solid rgba(28,23,18,0.18); cursor: pointer;
          transition: border-color 0.2s, color 0.2s; text-decoration: none;
        }
        .btn-ghost:hover { border-color: ${accent}; color: ${accent}; }
        .rule { width: 100%; height: 1px; background: rgba(28,23,18,0.08); }
        .grid-paper {
          background-image:
            linear-gradient(rgba(199,91,26,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(199,91,26,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>

      <div style={{ minHeight: "100vh", overflowX: "hidden" }}>

        {/* NAV */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: "rgba(250,248,245,0.88)", backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${border}`,
        }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="mono" style={{ color: text, opacity: 0.5, letterSpacing: "0.2em" }}>MOTORWISE</span>
            <a href="#cta" className="btn-main" style={{ padding: "9px 20px", fontSize: "0.8rem" }}>Obtener Manual →</a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="grid-paper" style={{ paddingTop: 100, paddingBottom: 80, paddingLeft: 40, paddingRight: 40, background: bg, minHeight: "100vh", display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", width: "100%" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

              {/* Texto */}
              <div>
                <div className="mono" style={{
                  marginBottom: 24, opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s"
                }}>◆ &nbsp;Edición 2025 — Guía técnica esencial</div>

                <h1 className="serif" style={{
                  fontSize: "clamp(2.6rem, 5vw, 4.4rem)", lineHeight: 1.1,
                  color: text, letterSpacing: "-0.02em", marginBottom: 24,
                  opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(18px)",
                  transition: "opacity 0.65s ease 0.2s, transform 0.65s ease 0.2s"
                }}>
                  100 cosas que tu<br />
                  <em style={{ color: accent }}>mecánico</em><br />
                  no te cuenta.
                </h1>

                <p style={{
                  fontSize: "1rem", lineHeight: 1.8, color: textMid, maxWidth: 440, marginBottom: 36,
                  opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(14px)",
                  transition: "opacity 0.65s ease 0.35s, transform 0.65s ease 0.35s"
                }}>
                  El manual que tu auto desearía que leyeras. Ahorra miles de dólares y prolonga la vida de tu inversión con conocimiento técnico directo, sin rodeos.
                </p>

                <div style={{
                  display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48,
                  opacity: heroVisible ? 1 : 0, transition: "opacity 0.6s ease 0.48s"
                }}>
                  <a href="#cta" className="btn-main">Obtener mi Manual →</a>
                  <a href="#valor" className="btn-ghost">Ver contenido</a>
                </div>

                {/* Stats */}
                <div style={{
                  display: "flex", gap: 0,
                  opacity: heroVisible ? 1 : 0, transition: "opacity 0.6s ease 0.62s"
                }}>
                  {[["200K","Lectores"],["100","Secretos"],["$0","Cap. gratuito"]].map(([val, lbl], i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center" }}>
                      {i > 0 && <div style={{ width: 1, height: 36, background: "rgba(28,23,18,0.1)", margin: "0 28px" }}/>}
                      <div>
                        <div className="serif" style={{ fontSize: "1.8rem", color: accent, lineHeight: 1 }}>{val}</div>
                        <div className="mono" style={{ color: textLight, marginTop: 4, fontSize: "0.62rem" }}>{lbl}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ilustración auto */}
              <div style={{
                opacity: heroVisible ? 1 : 0, transform: heroVisible ? "scale(1)" : "scale(0.97)",
                transition: "opacity 0.9s ease 0.55s, transform 0.9s ease 0.55s"
              }}>
                <div style={{
                  border: `1px solid ${border}`, borderRadius: 4, padding: 32,
                  background: accentLight, position: "relative"
                }}>
                  <span className="mono" style={{ position: "absolute", top: 10, left: 16, fontSize: "0.58rem", opacity: 0.5 }}>FIG. 00 — VEHICLE OVERVIEW</span>
                  <IllustrationCar />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="rule"/>

        {/* ── PROBLEMA ── */}
        <section style={{ padding: "100px 40px", background: bg }} id="problema">
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <FadeUp>
              <p className="mono" style={{ marginBottom: 16 }}>01 — El Problema</p>
              <h2 className="serif" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: text, letterSpacing: "-0.02em", lineHeight: 1.15, maxWidth: 520, marginBottom: 64 }}>
                Por qué necesitas<br />este libro.
              </h2>
            </FadeUp>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, borderTop: `1px solid rgba(28,23,18,0.1)` }}>
              {[
                {
                  num: "01", fig: <IllustrationDashboard />,
                  title: "Asimetría de Información",
                  body: "El mecánico sabe más que tú, y eso le da el poder sobre tu bolsillo. La ignorancia tiene precio, y lo pagas en cada visita al taller."
                },
                {
                  num: "02", fig: <IllustrationTire />,
                  title: "Mantenimiento Incorrecto",
                  body: "Usar los fluidos equivocados o ignorar sensores puede destruir tu motor en meses. Errores evitables con consecuencias irreversibles."
                },
                {
                  num: "03", fig: <IllustrationSpark />,
                  title: "Mitos Costosos",
                  body: "El 80% de lo que te dicen sobre gasolina y aditivos es falso. Información diseñada para venderte, no para protegerte."
                },
              ].map((item, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div style={{
                    padding: "48px 40px 48px 0",
                    paddingLeft: i > 0 ? 40 : 0,
                    borderLeft: i > 0 ? `1px solid rgba(28,23,18,0.1)` : "none",
                  }}>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 32, minHeight: 180, alignItems: "center" }}>
                      {item.fig}
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 14 }}>
                      <span className="mono" style={{ opacity: 0.35 }}>{item.num}</span>
                      <h3 className="serif" style={{ fontSize: "1.15rem", color: text, letterSpacing: "-0.01em" }}>{item.title}</h3>
                    </div>
                    <p style={{ fontSize: "0.88rem", color: textMid, lineHeight: 1.8 }}>{item.body}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <div className="rule"/>

        {/* ── VALOR ── */}
        <section className="grid-paper" style={{ padding: "100px 40px", background: bgAlt }} id="valor">
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <FadeUp>
              <p className="mono" style={{ marginBottom: 16 }}>02 — El Valor</p>
              <h2 className="serif" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: text, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 12 }}>
                Lo que obtienes.
              </h2>
              <p style={{ color: textLight, maxWidth: 440, lineHeight: 1.8, fontSize: "0.9rem", marginBottom: 56 }}>
                No teoría genérica. Cada punto es accionable, específico y con respaldo técnico.
              </p>
            </FadeUp>

            <div style={{ borderTop: `1px solid rgba(28,23,18,0.1)` }}>
              {[
                { num: "001", text: "Cuándo un aceite de transmisión realmente se cambia (pista: no es para siempre)." },
                { num: "017", text: "Cómo limpiar sensores críticos por $5 USD en lugar de cambiarlos por $300 USD." },
                { num: "034", text: "El check-list de compra de auto usado: 22 puntos que los vendedores odian." },
                { num: "052", text: "Por qué el intervalo del fabricante es diferente al que te dice el taller." },
                { num: "063", text: "Los 5 códigos OBD-II que puedes resolver tú mismo con menos de $20 USD." },
                { num: "081", text: "Gasolina Premium: cuándo vale la pena y cuándo es dinero tirado a la basura." },
                { num: "099", text: "Cómo negociar con un mecánico sin saber nada de mecánica." },
              ].map((item, i) => (
                <FadeUp key={item.num} delay={i * 0.06}>
                  <div style={{
                    display: "flex", alignItems: "flex-start", gap: 24, padding: "22px 0",
                    borderBottom: "1px solid rgba(28,23,18,0.08)",
                    transition: "background 0.2s",
                  }}>
                    <span className="mono" style={{ opacity: 0.28, flexShrink: 0, width: 36, paddingTop: 2 }}>{item.num}</span>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12, flex: 1 }}>
                      <span style={{ color: accent, fontSize: "0.7rem", flexShrink: 0 }}>◆</span>
                      <p style={{ color: text, fontSize: "0.95rem", lineHeight: 1.75 }}>{item.text}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.1}>
              <p className="mono" style={{ opacity: 0.3, marginTop: 20 }}>+ 93 puntos más dentro del manual.</p>
            </FadeUp>
          </div>
        </section>

        <div className="rule"/>

        {/* ── APÉNDICE ── */}
        <section style={{ padding: "100px 40px", background: bg }} id="apendice">
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

              <FadeUp>
                <p className="mono" style={{ marginBottom: 16 }}>03 — Apéndice Premium</p>
                <h2 className="serif" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: text, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 20 }}>
                  Mantenimiento por<br />
                  <em style={{ color: accent }}>edad del vehículo.</em>
                </h2>
                <p style={{ color: textMid, lineHeight: 1.8, fontSize: "0.9rem", maxWidth: 380, marginBottom: 32 }}>
                  Protocolos específicos desde autos nuevos hasta los que superan los 15 años. No genérico: cada rango tiene su propio plan.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <IllustrationFilter />
                  <p className="mono" style={{ fontSize: "0.6rem", opacity: 0.35, lineHeight: 1.8 }}>
                    Cambio de filtros<br />por kilometraje<br />y antigüedad
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div style={{ border: `1px solid ${border}`, borderRadius: 4, overflow: "hidden" }}>
                  {[
                    { rango: "0–2 años", label: "Garantía intacta", tip: "Qué nunca hacer para no perder la garantía." },
                    { rango: "3–5 años", label: "Mantenimiento preventivo", tip: "El período de mayor ahorro posible." },
                    { rango: "6–10 años", label: "Desgaste medio", tip: "Componentes que debes inspeccionar ya." },
                    { rango: "11–15 años", label: "Mantenimiento mayor", tip: "Fluidos, sellos y sensores prioritarios." },
                    { rango: "15+ años", label: "Prolongación de vida útil", tip: "Cómo hacer que dure 50K km más." },
                  ].map((row, i) => (
                    <div key={row.rango} style={{
                      display: "flex", alignItems: "flex-start", gap: 20, padding: "18px 24px",
                      borderBottom: i < 4 ? `1px solid ${border}` : "none",
                      background: i % 2 === 0 ? accentLight : bg,
                    }}>
                      <span className="mono" style={{ color: accent, flexShrink: 0, width: 60, paddingTop: 1 }}>{row.rango}</span>
                      <div>
                        <div style={{ color: text, fontSize: "0.88rem", fontWeight: 500, marginBottom: 2 }}>{row.label}</div>
                        <div style={{ color: textLight, fontSize: "0.78rem" }}>{row.tip}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        <div className="rule"/>

        {/* ── TESTIMONIOS ── */}
        <section style={{ padding: "100px 40px", background: bgAlt }} id="comunidad">
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <FadeUp>
              <p className="mono" style={{ marginBottom: 16 }}>04 — La Comunidad</p>
              <p className="serif" style={{
                fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", color: textLight,
                letterSpacing: "-0.01em", maxWidth: 600, lineHeight: 1.45, marginBottom: 72
              }}>
                De la comunidad de{" "}
                <span style={{ color: text }}>200,000</span>{" "}
                apasionados de los autos que ya leen diferente.
              </p>
            </FadeUp>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
              {[
                { quote: "Cambié mi forma de hablar con el mecánico. Ahorré $800 en una revisión que me querían cobrar $1,400.", author: "Rodrigo M.", location: "Ciudad de México" },
                { quote: "El capítulo de sensores me pagó el libro 40 veces. Limpié el MAF yo mismo y desapareció el código P0101.", author: "Carolina V.", location: "Bogotá" },
                { quote: "Usé el check-list de compra y detecté un problema de transmisión que el vendedor quería ocultar.", author: "Andrés P.", location: "Buenos Aires" },
              ].map((t, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div style={{ borderTop: `2px solid ${accent}`, paddingTop: 24 }}>
                    <p style={{ color: textMid, lineHeight: 1.8, fontSize: "0.9rem", marginBottom: 20 }}>"{t.quote}"</p>
                    <div style={{ color: text, fontSize: "0.85rem", fontWeight: 500 }}>{t.author}</div>
                    <div className="mono" style={{ color: textLight, marginTop: 4, fontSize: "0.6rem" }}>{t.location}</div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <div className="rule"/>

        {/* ── CTA ── */}
        <section style={{ padding: "120px 40px", background: bg, position: "relative", overflow: "hidden" }} id="cta">
          {/* Mancha decorativa */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `radial-gradient(ellipse 55% 55% at 50% 50%, ${accentLight} 0%, transparent 70%)`
          }}/>
          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <FadeUp>
              <p className="mono" style={{ marginBottom: 20 }}>◆ &nbsp;Oferta de Lanzamiento — Tiempo limitado</p>
              <h2 className="serif" style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)", color: text,
                letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 20
              }}>
                El conocimiento que<br />
                <em style={{ color: accent }}>te pertenece.</em>
              </h2>
              <p style={{ color: textMid, lineHeight: 1.8, fontSize: "1rem", maxWidth: 400, margin: "0 auto 36px" }}>
                Accede a las 100 cosas, el Apéndice por Edad y un capítulo gratuito de prueba sin compromiso.
              </p>

              {/* Precio */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 36 }}>
                <span style={{ fontSize: "1rem", color: textLight, textDecoration: "line-through" }}>$29 USD</span>
                <span className="serif" style={{ fontSize: "2.4rem", color: accent, letterSpacing: "-0.02em" }}>$14 USD</span>
                <span className="mono" style={{ color: accent, background: accentLight, padding: "4px 10px" }}>–52%</span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                <a href="#" className="btn-main" style={{ padding: "16px 36px", fontSize: "0.92rem" }}>Obtener mi Manual →</a>
                <a href="#" className="btn-ghost" style={{ padding: "15px 28px" }}>Descargar cap. gratuito</a>
              </div>

              <p style={{ marginTop: 28, color: textLight, fontSize: "0.75rem", letterSpacing: "0.06em" }}>
                Pago único · Acceso de por vida · Sin suscripciones
              </p>
            </FadeUp>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: `1px solid rgba(28,23,18,0.08)`, padding: "32px 40px" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <span className="mono" style={{ color: textLight, fontSize: "0.62rem" }}>MOTORWISE © 2025 — 100 Cosas que tu mecánico no te cuenta.</span>
            <div style={{ display: "flex", gap: 32 }}>
              {["Privacidad", "Términos", "Contacto"].map((l) => (
                <a key={l} href="#" style={{ color: textLight, fontSize: "0.72rem", letterSpacing: "0.08em", textDecoration: "none", textTransform: "uppercase" }}>{l}</a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}