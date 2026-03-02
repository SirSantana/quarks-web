import { useRouter } from 'next/router';
import { useState } from 'react';

const CALCULADORAS = [
  {
    grupo: 'Rendimiento',
    items: [
      {
        label: 'Consumo de combustible',
        sublabel: 'km/gal · ltr/100km',
        href: '/calculadora-combustible',
        icon: '⛽',
      },
      {
        label: 'Cilindrada del motor',
        sublabel: 'cc · litros · compresión',
        href: '/calculadora-cilindrada',
        icon: '🔧',
      },
      {
        label: 'Relación de transmisión',
        sublabel: 'engranajes · velocidad · torque',
        href: '/calculadora-transmision',
        icon: '⚙️',
      },
    ],
  },
];

// Icono de cierre / hamburger
function IconMenu() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconChevron({ open }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
      style={{ transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function CalculadorasSidebar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [gruposOpen, setGruposOpen] = useState({ Rendimiento: true });

  const toggleGrupo = (grupo) =>
    setGruposOpen((prev) => ({ ...prev, [grupo]: !prev[grupo] }));

  const isActive = (href) => router.pathname === href || router.asPath === href;

  const handleNav = (href) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <style>{`

        .calc-sidebar * { font-family: 'Inter', sans-serif; box-sizing: border-box; }

        /* ── Desktop sidebar ── */
        .calc-sidebar-desktop {
          width: 220px;
          min-width: 220px;
          background: white;
          border-right: 1px solid #ebebeb;
          min-height: 100vh;
          padding: 28px 0 40px;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }

        /* ── Mobile toggle button ── */
        .calc-sidebar-toggle {
          display: none;
          position: fixed;
          bottom: 24px;
          right: 20px;
          z-index: 200;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: #407BFF;
          color: white;
          border: none;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(64,123,255,0.35);
        }

        /* ── Mobile drawer ── */
        .calc-sidebar-drawer {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 150;
        }
        .calc-sidebar-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.3);
        }
        .calc-sidebar-panel {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 260px;
          background: white;
          padding: 24px 0 40px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          box-shadow: 4px 0 24px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .calc-sidebar-desktop { display: none !important; }
          .calc-sidebar-toggle  { display: flex !important; }
          .calc-sidebar-drawer  { display: block !important; }
        }

        /* ── Nav item ── */
        .calc-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 16px;
          margin: 1px 8px;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          border: 1px solid transparent;
          transition: background 0.12s, border-color 0.12s;
        }
        .calc-nav-item:hover {
          background: #f5f7ff;
        }
        .calc-nav-item.active {
          background: #eef2ff;
          border-color: #c7d7ff;
        }
        .calc-nav-item.active .calc-nav-label {
          color: #407BFF !important;
        }
        .calc-nav-item.active .calc-nav-sub {
          color: #93aeff !important;
        }
      `}</style>

      {/* ════════════════ DESKTOP SIDEBAR ════════════════ */}
      <aside className="calc-sidebar calc-sidebar-desktop">
        <SidebarContent
          gruposOpen={gruposOpen}
          toggleGrupo={toggleGrupo}
          isActive={isActive}
          onNav={handleNav}
        />
      </aside>

      {/* ════════════════ MOBILE TOGGLE ════════════════ */}
      <button
        className="calc-sidebar-toggle"
        onClick={() => setOpen(true)}
        aria-label="Abrir calculadoras"
      >
        <IconMenu />
      </button>

      {/* ════════════════ MOBILE DRAWER ════════════════ */}
      {open && (
        <div className="calc-sidebar calc-sidebar-drawer">
          <div className="calc-sidebar-overlay" onClick={() => setOpen(false)} />
          <div className="calc-sidebar-panel">
            {/* Header del drawer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', marginBottom: '20px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#111' }}>Calculadoras</span>
              <button
                onClick={() => setOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: '4px', display: 'flex', alignItems: 'center' }}
              >
                <IconClose />
              </button>
            </div>
            <SidebarContent
              gruposOpen={gruposOpen}
              toggleGrupo={toggleGrupo}
              isActive={isActive}
              onNav={handleNav}
            />
          </div>
        </div>
      )}
    </>
  );
}

// ── Contenido compartido del sidebar ──────────────────────────────────────────
function SidebarContent({ gruposOpen, toggleGrupo, isActive, onNav }) {
  return (
    <nav style={{ flex: 1 }}>
      {/* Logo / título */}
      <div style={{ padding: '0 16px', marginBottom: '24px' }}>
        <p style={{ fontSize: '13px', fontWeight: '600', color: '#111', margin: '0 0 2px' }}>
          Calculadoras
        </p>
        <p style={{ fontSize: '11px', color: '#ccc', margin: 0 }}>Herramientas para tu vehículo</p>
      </div>

      {CALCULADORAS.map(({ grupo, items }) => (
        <div key={grupo} style={{ marginBottom: '8px' }}>

          {/* Grupo header */}
          <button
            onClick={() => toggleGrupo(grupo)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '6px 16px', background: 'none', border: 'none', cursor: 'pointer',
              marginBottom: '4px',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: '500', color: '#bbb', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              {grupo}
            </span>
            <span style={{ color: '#ccc' }}>
              <IconChevron open={gruposOpen[grupo]} />
            </span>
          </button>

          {/* Items */}
          {gruposOpen[grupo] && items.map(({ label, sublabel, href, icon }) => (
            <div
              key={href}
              className={`calc-nav-item${isActive(href) ? ' active' : ''}`}
              onClick={() => onNav(href)}
            >
              <span style={{ fontSize: '18px', lineHeight: 1, flexShrink: 0 }}>{icon}</span>
              <div style={{ minWidth: 0 }}>
                <p className="calc-nav-label" style={{
                  fontSize: '13px', fontWeight: '500',
                  color: isActive(href) ? '#407BFF' : '#333',
                  margin: '0 0 1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {label}
                </p>
                <p className="calc-nav-sub" style={{
                  fontSize: '11px',
                  color: isActive(href) ? '#93aeff' : '#bbb',
                  margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Divider + footer */}
      <div style={{ margin: '20px 16px 0', borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}>
        <p style={{ fontSize: '11px', color: '#ddd', margin: 0, lineHeight: 1.6 }}>
          Más calculadoras próximamente.
        </p>
      </div>
    </nav>
  );
}