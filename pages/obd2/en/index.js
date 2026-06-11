
"use client";

import { useState, useEffect } from "react";
import {
  Cpu,
  Search,
  Zap,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Database,
  Code2,
  Gauge,
} from "lucide-react";
import { useRouter } from "next/router";

const DEMO_CODES = ["P0300", "P0171", "P0420", "B0001", "C0035", "U0100"];

const POPULAR_CODES = [
  {
    code: "P0300",
    label: "Random/Multiple Cylinder Misfire Detected",
    severity: "high",
    system: "Engine",
  },
  {
    code: "P0171",
    label: "System Too Lean — Bank 1",
    severity: "medium",
    system: "Fuel",
  },
  {
    code: "P0420",
    label: "Catalyst System Efficiency Below Threshold",
    severity: "medium",
    system: "Emissions",
  },
  {
    code: "P0101",
    label: "MAF Sensor Circuit Range/Performance",
    severity: "low",
    system: "Air",
  },
  {
    code: "P0500",
    label: "Vehicle Speed Sensor — Circuit Malfunction",
    severity: "low",
    system: "Transmission",
  },
  {
    code: "P0340",
    label: "Camshaft Position Sensor Circuit Malfunction",
    severity: "high",
    system: "Ignition",
  },
];

const FEATURES = [
  {
    icon: Database,
    title: "Comprehensive Database",
    desc: "Over 15,000 documented DTC codes, from P0001 to U3FFF.",
  },
  {
    icon: Activity,
    title: "Real-Time Diagnostics",
    desc: "Interpret vehicle data with technical context and probable causes.",
  },
  {
    icon: BookOpen,
    title: "Repair Guide",
    desc: "Step-by-step diagnostic procedures for each code found.",
  },
  {
    icon: Gauge,
    title: "Multi-System Coverage",
    desc: "Engine, transmission, body, chassis, and communication networks.",
  },
];

const SYSTEMS = [
  { prefix: "P", label: "Powertrain", count: "6,200+", color: "#FF3B00" },
  { prefix: "B", label: "Body", count: "3,100+", color: "#0F0F0F" },
  { prefix: "C", label: "Chassis", count: "2,800+", color: "#0F0F0F" },
  { prefix: "U", label: "Network", count: "2,900+", color: "#0F0F0F" },
];

function SeverityDot({ level }) {
  const colors = {
    high: "#FF3B00",
    medium: "#F59E0B",
    low: "#10B981",
  };
  return (
    <span
      style={{
        display: "inline-block",
        width: 7,
        height: 7,
        borderRadius: "50%",
        backgroundColor: colors[level],
        flexShrink: 0,
        marginTop: 6,
      }}
    />
  );
}

export default function Home() {
  const [currentCode, setCurrentCode] = useState(0);
  const [visible, setVisible] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [scanActive, setScanActive] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentCode((prev) => (prev + 1) % DEMO_CODES.length);
        setVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      setScanActive(true);
      setTimeout(() => setScanActive(false), 1500);
      router.push(`/obd2/en/${searchValue.toUpperCase()}`);
    }
  };

  return (
    <div className="obd-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .obd-root {
          font-family: 'Inter', sans-serif;
          background: #F8F8F6;
          color: #0F0F0F;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }

        /* NAV */
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px;
          border-bottom: 1px solid #E4E4E0;
          position: sticky;
          top: 0;
          background: rgba(248,248,246,0.92);
          backdrop-filter: blur(12px);
          z-index: 100;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 18px;
          letter-spacing: -0.3px;
          text-decoration: none;
          color: #0F0F0F;
        }
        .nav-logo-dot {
          width: 8px; height: 8px;
          background: #FF3B00;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .nav-links {
          display: flex;
          gap: 36px;
          list-style: none;
        }
        .nav-links a {
          font-size: 14px;
          font-weight: 400;
          color: #6B6B6B;
          text-decoration: none;
          transition: color 0.15s;
          letter-spacing: 0.1px;
        }
        .nav-links a:hover { color: #0F0F0F; }
        .nav-cta {
          background: #0F0F0F;
          color: #F8F8F6 !important;
          padding: 9px 20px;
          border-radius: 6px;
          font-weight: 500 !important;
          font-size: 13px !important;
          transition: background 0.15s !important;
        }
        .nav-cta:hover { background: #FF3B00 !important; color: #fff !important; }

        /* HERO */
        .hero {
          padding: 100px 48px 80px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          color: #FF3B00;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 28px;
        }
        .hero-eyebrow-line {
          width: 32px;
          height: 1px;
          background: #FF3B00;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .hero-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(42px, 5vw, 68px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -2px;
          margin-bottom: 24px;
        }
        .hero-title em {
          font-style: normal;
          color: #FF3B00;
        }
        .hero-subtitle {
          font-size: 17px;
          line-height: 1.65;
          color: #6B6B6B;
          margin-bottom: 40px;
          font-weight: 400;
          max-width: 420px;
        }
        .hero-search-wrap {
          display: flex;
          align-items: center;
          border-bottom: 2px solid #0F0F0F;
          padding-bottom: 12px;
          gap: 12px;
          transition: border-color 0.2s;
        }
        .hero-search-wrap:focus-within {
          border-color: #FF3B00;
        }
        .hero-search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 22px;
          font-weight: 500;
          color: #0F0F0F;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .hero-search-input::placeholder {
          color: #C4C4BE;
          text-transform: uppercase;
        }
        .hero-search-btn {
          background: #FF3B00;
          border: none;
          cursor: pointer;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s, background 0.15s;
          flex-shrink: 0;
        }
        .hero-search-btn:hover { transform: scale(1.08); background: #E03000; }
        .hero-search-btn.scanning { animation: scanPulse 0.5s ease-in-out 3; }
        @keyframes scanPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); background: #0F0F0F; }
        }
        .hero-hint {
          margin-top: 14px;
          font-size: 12px;
          color: #9B9B96;
          font-family: 'JetBrains Mono', monospace;
        }

        /* HERO SCANNER PANEL */
        .scanner-panel {
          border: 1px solid #E4E4E0;
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
        }
        .scanner-header {
          background: #0F0F0F;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .scanner-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #FF3B00;
          animation: pulse 1.5s infinite;
        }
        .scanner-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #888;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .scanner-body {
          padding: 32px 28px;
        }
        .scanner-live-code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 52px;
          font-weight: 700;
          color: #FF3B00;
          letter-spacing: 2px;
          line-height: 1;
          transition: opacity 0.3s;
          margin-bottom: 6px;
        }
        .scanner-live-code.hidden { opacity: 0; }
        .scanner-live-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #9B9B96;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 28px;
        }
        .scanner-divider {
          border: none;
          border-top: 1px solid #E4E4E0;
          margin-bottom: 20px;
        }
        .scanner-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin-bottom: 10px;
        }
        .scanner-row-label { color: #9B9B96; font-family: 'JetBrains Mono', monospace; }
        .scanner-row-val { font-weight: 500; color: #0F0F0F; }
        .scanner-row-val.ok { color: #10B981; }
        .scanner-row-val.warn { color: #FF3B00; }
        .scanner-bottom {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #E4E4E0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .scanner-status {
          font-size: 12px;
          color: #10B981;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
        }
        .scanner-proto {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #C4C4BE;
          letter-spacing: 0.5px;
        }

        /* STATS STRIP */
        .stats-strip {
          border-top: 1px solid #E4E4E0;
          border-bottom: 1px solid #E4E4E0;
          padding: 28px 48px;
          display: flex;
          justify-content: center;
          gap: 80px;
        }
        .stat-item { text-align: center; }
        .stat-number {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -1.5px;
          line-height: 1;
          margin-bottom: 4px;
        }
        .stat-number span { color: #FF3B00; }
        .stat-label {
          font-size: 12px;
          color: #9B9B96;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        /* SYSTEMS */
        .systems-section {
          padding: 80px 48px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 48px;
        }
        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #9B9B96;
          margin-bottom: 10px;
        }
        .section-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 700;
          letter-spacing: -1.2px;
          line-height: 1.1;
        }
        .section-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #6B6B6B;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.15s;
        }
        .section-link:hover { color: #FF3B00; }

        .systems-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: #E4E4E0;
          border: 1px solid #E4E4E0;
          border-radius: 10px;
          overflow: hidden;
        }
        .system-card {
          background: #F8F8F6;
          padding: 36px 28px;
          cursor: pointer;
          transition: background 0.15s;
          text-decoration: none;
          color: inherit;
        }
        .system-card:hover { background: #fff; }
        .system-card.active { background: #0F0F0F; }
        .system-prefix {
          font-family: 'JetBrains Mono', monospace;
          font-size: 42px;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 8px;
          letter-spacing: -1px;
        }
        .system-card.active .system-prefix { color: #FF3B00; }
        .system-card-label {
          font-size: 12px;
          color: #9B9B96;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 16px;
          font-weight: 500;
        }
        .system-card.active .system-card-label { color: #555; }
        .system-count {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .system-card.active .system-count { color: #fff; }
        .system-count-label {
          font-size: 11px;
          color: #9B9B96;
          margin-top: 2px;
        }
        .system-card.active .system-count-label { color: #555; }

        /* POPULAR CODES */
        .codes-section {
          padding: 0 48px 80px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .codes-list {
          border-top: 1px solid #E4E4E0;
        }
        .code-row {
          display: grid;
          grid-template-columns: 110px 1fr 100px 120px;
          align-items: center;
          gap: 20px;
          padding: 20px 0;
          border-bottom: 1px solid #E4E4E0;
          cursor: pointer;
          transition: padding-left 0.2s;
          text-decoration: none;
          color: inherit;
        }
        .code-row:hover { padding-left: 8px; }
        .code-dtc {
          font-family: 'JetBrains Mono', monospace;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #FF3B00;
        }
        .code-desc {
          font-size: 14px;
          color: #0F0F0F;
          font-weight: 400;
        }
        .code-system {
          font-size: 11px;
          color: #9B9B96;
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .code-severity {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #9B9B96;
          justify-content: flex-end;
        }
        .code-row-arrow {
          display: none;
          color: #9B9B96;
        }
        .code-row:hover .code-row-arrow { display: block; }
        .code-row:hover .code-system { display: none; }

        /* FEATURES */
        .features-section {
          background: #0F0F0F;
          padding: 80px 48px;
        }
        .features-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .features-section .section-title { color: #555; }
        .features-section .section-heading { color: #F8F8F6; }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
          margin-top: 56px;
          border-top: 1px solid #222;
          border-left: 1px solid #222;
        }
        .feature-item {
          padding: 40px 36px;
          border-bottom: 1px solid #222;
          border-right: 1px solid #222;
        }
        .feature-icon {
          width: 40px; height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: #FF3B00;
        }
        .feature-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #F8F8F6;
          margin-bottom: 10px;
          letter-spacing: -0.3px;
        }
        .feature-desc {
          font-size: 14px;
          line-height: 1.7;
          color: #666;
        }

        /* CTA */
        .cta-section {
          padding: 100px 48px;
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }
        .cta-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(36px, 4vw, 52px);
          font-weight: 700;
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin-bottom: 20px;
        }
        .cta-title em { font-style: normal; color: #FF3B00; }
        .cta-desc {
          font-size: 16px;
          color: #6B6B6B;
          margin-bottom: 40px;
          line-height: 1.6;
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #0F0F0F;
          color: #F8F8F6;
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 15px;
          transition: background 0.15s, transform 0.15s;
        }
        .cta-btn:hover { background: #FF3B00; transform: translateY(-1px); }

        /* FOOTER */
        .footer {
          border-top: 1px solid #E4E4E0;
          padding: 32px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .footer-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-dot { color: #FF3B00; }
        .footer-note {
          font-size: 12px;
          color: #9B9B96;
          font-family: 'JetBrains Mono', monospace;
        }
        .footer-proto {
          font-size: 12px;
          color: #C4C4BE;
          font-family: 'JetBrains Mono', monospace;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .nav { padding: 16px 24px; }
          .nav-links { display: none; }
          .hero { padding: 60px 24px 60px; }
          .hero-grid { grid-template-columns: 1fr; gap: 48px; }
          .stats-strip { padding: 24px; gap: 32px; flex-wrap: wrap; justify-content: center; }
          .systems-section, .codes-section { padding: 60px 24px; }
          .systems-grid { grid-template-columns: repeat(2, 1fr); }
          .features-section { padding: 60px 24px; }
          .features-grid { grid-template-columns: 1fr; }
          .code-row { grid-template-columns: 90px 1fr; gap: 12px; }
          .code-system, .code-severity { display: none; }
          .cta-section { padding: 60px 24px; }
          .footer { padding: 24px; flex-direction: column; gap: 12px; text-align: center; }
          .section-header { flex-direction: column; align-items: flex-start; gap: 16px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="#" className="nav-logo">
          <Cpu size={18} />
          OBD<span style={{ color: "#FF3B00" }}>.</span>guide
          <div className="nav-logo-dot" />
        </a>
        <ul className="nav-links">
          <li><a href="#">Explore Codes</a></li>
          <li><a href="#">Systems</a></li>
          <li><a href="#">Protocols</a></li>
          <li><a href="#">Documentation</a></li>
          <li><a href="#" className="nav-cta">Search Code</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-line" />
          Automotive Diagnostics · ISO 15765 Protocol
        </div>
        <div className="hero-grid">
          <div>
            <h1 className="hero-title">
              Decode<br />every<br /><em>DTC.</em>
            </h1>
            <p className="hero-subtitle">
              The most complete technical reference for OBD-II codes. Search, understand, and diagnose any fault with precision.
            </p>
            <form onSubmit={handleSearch}>
              <div className="hero-search-wrap">
                <Code2 size={20} style={{ color: "#9B9B96", flexShrink: 0 }} />
                <input
                  className="hero-search-input"
                  placeholder="P0300"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
                  maxLength={6}
                />
                <button
                  type="submit"
                  className={`hero-search-btn ${scanActive ? "scanning" : ""}`}
                >
                  <ArrowRight size={18} color="#fff" />
                </button>
              </div>
              <p className="hero-hint">
                E.g., P0300, B1234, C0035, U0100
              </p>
            </form>
          </div>

          {/* Scanner Panel */}
          <div className="scanner-panel">
            <div className="scanner-header">
              <div className="scanner-dot" />
              <span className="scanner-label">Live scanner · OBD-II v2.4</span>
            </div>
            <div className="scanner-body">
              <div className={`scanner-live-code ${!visible ? "hidden" : ""}`}>
                {DEMO_CODES[currentCode]}
              </div>
              <div className="scanner-live-tag">Live Code Detected</div>
              <hr className="scanner-divider" />
              <div className="scanner-row">
                <span className="scanner-row-label">Protocol</span>
                <span className="scanner-row-val">CAN ISO 15765-4</span>
              </div>
              <div className="scanner-row">
                <span className="scanner-row-label">System</span>
                <span className="scanner-row-val">Powertrain</span>
              </div>
              <div className="scanner-row">
                <span className="scanner-row-label">MIL Status</span>
                <span className="scanner-row-val warn">Activated</span>
              </div>
              <div className="scanner-row">
                <span className="scanner-row-label">Freeze Frame</span>
                <span className="scanner-row-val ok">Available</span>
              </div>
              <div className="scanner-row">
                <span className="scanner-row-label">Mode</span>
                <span className="scanner-row-val">$03 · Active DTCs</span>
              </div>
              <div className="scanner-bottom">
                <span className="scanner-status">
                  <CheckCircle2 size={13} /> Active Connection
                </span>
                <span className="scanner-proto">SAE J1979</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-strip">
        {[
          { number: "15", suffix: "K+", label: "DTC Codes" },
          { number: "4", suffix: " systems", label: "Covered" },
          { number: "98", suffix: "%", label: "1996+ Vehicles" },
          { number: "12", suffix: " modes", label: "OBD-II" },
        ].map((s) => (
          <div className="stat-item" key={s.label}>
            <div className="stat-number">
              {s.number}<span>{s.suffix}</span>
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* SYSTEMS */}
      <section className="systems-section">
        <div className="section-header">
          <div>
            <div className="section-title">Code Categories</div>
            <h2 className="section-heading">Four systems,<br />thousands of answers.</h2>
          </div>
          <a href="#" className="section-link">
            View all systems <ChevronRight size={14} />
          </a>
        </div>
        <div className="systems-grid">
          {SYSTEMS.map((sys, i) => (
            <div
              key={sys.prefix}
              className={`system-card${i === 0 ? " active" : ""}`}
            >
              <div className="system-prefix">{sys.prefix}</div>
              <div className="system-card-label">{sys.label}</div>
              <div className="system-count">{sys.count}</div>
              <div className="system-count-label">documented codes</div>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR CODES */}
      <section className="codes-section">
        <div className="section-header">
          <div>
            <div className="section-title">Quick Reference</div>
            <h2 className="section-heading">Most Frequent<br />Codes.</h2>
          </div>
          <a href="#" className="section-link">
            View full database <ChevronRight size={14} />
          </a>
        </div>
        <div className="codes-list">
          {POPULAR_CODES.map((c) => (
            <a href="#" className="code-row" key={c.code}>
              <span className="code-dtc">{c.code}</span>
              <span className="code-desc">{c.label}</span>
              <span className="code-system">{c.system}</span>
              <span className="code-severity">
                <SeverityDot level={c.severity} />
                {c.severity === "high" ? "High" : c.severity === "medium" ? "Medium" : "Low"}
                <ChevronRight size={13} className="code-row-arrow" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="features-inner">
          <div className="section-title">Why OBD.guide</div>
          <h2 className="section-heading" style={{ color: "#F8F8F6" }}>
            More than a code<br />list.
          </h2>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div className="feature-item" key={f.title}>
                <div className="feature-icon">
                  <f.icon size={24} />
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2 className="cta-title">
          Your vehicle<br />has the<br /><em>answer.</em>
        </h2>
        <p className="cta-desc">
          Stop guessing. Search any DTC code and get the full diagnostic report in seconds.
        </p>
        <a href="#" className="cta-btn">
          <Search size={16} />
          Start Diagnosis
          <ArrowRight size={16} />
        </a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">
          <Cpu size={15} />
          OBD<span className="footer-dot">.</span>guide
        </div>
        <span className="footer-note">
          Technical Reference · SAE J1979 · ISO 15031
        </span>
        <span className="footer-proto">
          v2.4.1 · 2026
        </span>
      </footer>
    </div>
  );
}

