'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';

/* ============================================================
   LÍNEA DE TIEMPO — ARCHIVO DE MOVILIDAD BÉLICA (FULL VISUAL IMMERSION)
   Ocupa exactamente el 100% del viewport (screen height), eliminando
   márgenes externos para un enfoque inmersivo puro estilo Apple UI.
   ============================================================ */

const DOMAIN_META = {
  tierra: { label: 'Tierra', color: '#cfa06a' },
  aire: { label: 'Aire', color: '#8fbdc1' },
  mar: { label: 'Mar', color: '#86a8cc' },
  mecanico: { label: 'Mecánico', color: '#cf8f7c' },
};

const TIMELINE_VEHICLES = [
  { id: 'carro-guerra', name: 'Carro de guerra egipcio', domain: 'tierra', yearLabel: 'c. 1300 a.C.', year: -1300, era: 'Antigüedad', desc: 'Plataforma ligera de choque tirada por caballos. La primera arma de movilidad de la historia.', image: '/vehicles/carro-guerra.png' },
  { id: 'trirreme', name: 'Trirreme griego', domain: 'mar', yearLabel: '480 a.C.', year: -480, era: 'Antigüedad', desc: 'Nave de espolón y tres filas de remeros que decidió Salamina por maniobrabilidad, no por tamaño.', image: '/vehicles/trirreme.png' },
  { id: 'trebuchet', name: 'Trabuquete de contrapeso', domain: 'mecanico', yearLabel: 'c. 1200', year: 1200, era: 'Medieval', desc: 'Sistema de lanzamiento por contrapeso, precursor directo de la artillería moderna.', image: '/vehicles/trebuchet.png' },
  { id: 'galeon', name: 'Galeón de línea', domain: 'mar', yearLabel: 'c. 1571', year: 1571, era: 'Edad Moderna', desc: 'Casco alto y decenas de cañones: convirtió el océano en tablero estratégico global.', image: '/vehicles/galeon.png' },
  { id: 'globo-observacion', name: 'Globo de observación', domain: 'aire', yearLabel: '1794', year: 1794, era: 'Edad Moderna', desc: 'El primer paso humano hacia la guerra en la tercera dimensión.', image: '/vehicles/globo-observacion.png' },
  { id: 'mark-i', name: 'Tanque Mark I', domain: 'tierra', yearLabel: '1916', year: 1916, era: 'Primera Guerra Mundial', desc: 'Primer tanque de combate de la historia, nacido del estancamiento de las trincheras.', image: '/vehicles/mark-i.png' },
  { id: 'fokker-dr1', name: 'Fokker Dr.I', domain: 'aire', yearLabel: '1917', year: 1917, era: 'Primera Guerra Mundial', desc: 'Triplano del Barón Rojo. La guerra aérea pasó de observar a combatir.', image: '/vehicles/fokker-dr1.png' },
  { id: 'u-boot', name: 'U-Boot tipo U-31', domain: 'mar', yearLabel: '1914', year: 1914, era: 'Primera Guerra Mundial', desc: 'Guerra submarina: el enemigo ataca desde donde no se le puede ver venir.', image: '/vehicles/u-boot.png' },
  { id: 'panzer-iv', name: 'Panzer IV', domain: 'tierra', yearLabel: '1939', year: 1939, era: 'Segunda Guerra Mundial', desc: 'Columna vertebral de la Blitzkrieg, el tanque más longevo del conflicto.', image: '/vehicles/panzer-iv.png' },
  { id: 'spitfire', name: 'Supermarine Spitfire', domain: 'aire', yearLabel: '1938', year: 1938, era: 'Segunda Guerra Mundial', desc: 'Ala elíptica que defendió el cielo británico en la Batalla de Inglaterra.', image: '/vehicles/spitfire.png' },
  { id: 'higgins-boat', name: 'Higgins Boat (LCVP)', domain: 'mar', yearLabel: '1942', year: 1942, era: 'Segunda Guerra Mundial', desc: 'Llevó a los soldados de barco a playa en segundos. Clave en Normandía.', image: '/vehicles/higgins-boat.png' },
  { id: 'v2', name: 'Cohete V-2', domain: 'aire', yearLabel: '1944', year: 1944, era: 'Segunda Guerra Mundial', desc: 'Primer misil balístico operativo: la guerra sin piloto y sin intercepción posible.', image: '/vehicles/v2.png' },
  { id: 'uh-1-huey', name: 'Bell UH-1 "Huey"', domain: 'aire', yearLabel: '1959', year: 1959, era: 'Guerra Fría', desc: 'Tropas insertadas y evacuadas en minutos. Símbolo visual de Vietnam.', image: '/vehicles/uh-1-huey.png' },
  { id: 'blackbird', name: 'Lockheed SR-71 Blackbird', domain: 'aire', yearLabel: '1966', year: 1966, era: 'Guerra Fría', desc: 'Su mejor defensa era acelerar a Mach 3 y escapar de cualquier misil.', image: '/vehicles/blackbird.png' },
  { id: 'portaaviones-nimitz', name: 'Portaaviones clase Nimitz', domain: 'mar', yearLabel: '1975', year: 1975, era: 'Guerra Fría', desc: 'Una base aérea flotante nuclear: el poder militar ya no necesita territorio.', image: '/vehicles/portaaviones-nimitz.png' },
  { id: 'humvee', name: 'HMMWV "Humvee"', domain: 'tierra', yearLabel: '1984', year: 1984, era: 'Guerra Fría', desc: 'Chasis modular adaptable a decenas de roles tácticos distintos.', image: '/vehicles/humvee.png' },
  { id: 'mq-9-reaper', name: 'MQ-9 Reaper', domain: 'aire', yearLabel: '2001', year: 2001, era: 'Contemporánea', desc: 'Dron de combate operado a distancia: nace la era del conflicto remoto.', image: '/vehicles/mq-9-reaper.png' },
  { id: 'exoesqueleto', name: 'Exoesqueleto táctico', domain: 'mecanico', yearLabel: 'En desarrollo', year: 2018, era: 'Contemporánea', desc: 'El vehículo ya no transporta al combatiente: se funde con él.', image: '/vehicles/exoesqueleto.png' },
];

function SchematicFallback({ domain }) {
  const stroke = DOMAIN_META[domain]?.color || '#6b9a9e';
  return (
    <svg viewBox="0 0 120 100" className="w-[50%] h-[50%] opacity-40 animate-pulse" preserveAspectRatio="xMidYMid meet">
      <rect x="0.5" y="0.5" width="119" height="99" fill="none" stroke={stroke} strokeWidth="1" />
      <line x1="0" y1="0" x2="120" y2="100" stroke={stroke} strokeWidth="0.5" strokeDasharray="4" />
      <line x1="120" y1="0" x2="0" y2="100" stroke={stroke} strokeWidth="0.5" strokeDasharray="4" />
    </svg>
  );
}

function VehicleImage({ image, domain, name, focused }) {
  const [failed, setFailed] = useState(false);

  if (failed || !image) {
    return <SchematicFallback domain={domain} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt={name}
      className={`w-full h-full object-contain block transition-all duration-700 ease-out will-change-transform ${
        focused 
          ? 'scale-110 drop-shadow-[0_25px_35px_rgba(0,0,0,0.75)] filter saturate-[1.05]' 
          : 'scale-95 drop-shadow-[0_8px_15px_rgba(0,0,0,0.4)] opacity-40 blur-[1px]'
      }`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function VehicleTimeline({ vehicles = TIMELINE_VEHICLES }) {
  const railRef = useRef(null);
  const itemRefs = useRef({});
  const [focusedId, setFocusedId] = useState(vehicles[0]?.id ?? null);

  const sorted = useMemo(() => [...vehicles].sort((a, b) => a.year - b.year), [vehicles]);

  const updateFocus = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const railRect = rail.getBoundingClientRect();
    const center = railRect.left + railRect.width / 2;

    let closestId = null;
    let closestDist = Infinity;
    Object.entries(itemRefs.current).forEach(([id, el]) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const itemCenter = r.left + r.width / 2;
      const dist = Math.abs(itemCenter - center);
      if (dist < closestDist) {
        closestDist = dist;
        closestId = id;
      }
    });
    if (closestId) setFocusedId(closestId);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let raf = null;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateFocus);
    };
    rail.addEventListener('scroll', onScroll, { passive: true });
    updateFocus();
    window.addEventListener('resize', onScroll);
    return () => {
      rail.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [updateFocus]);

  const scrollToItem = (id) => {
    const el = itemRefs.current[id];
    const rail = railRef.current;
    if (!el || !rail) return;
    const railRect = rail.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const offset = elRect.left - railRect.left - (railRect.width - elRect.width) / 2;
    rail.scrollBy({ left: offset, behavior: 'smooth' });
  };

  let lastEra = null;

  return (
    <section className="bg-[var(--bg)] text-[var(--ink)] font-['Public_Sans',sans-serif] w-full h-screen min-h-screen overflow-hidden flex flex-col justify-between relative select-none">
      
      {/* HEADER INTEGRADO TIPO DASHBOARD MINIMALISTA */}
      <header className="w-full px-[clamp(24px,6vw,80px)] pt-[40px] flex justify-between items-baseline shrink-0 z-20">
        <div>
          <span className="font-['IBM_Plex_Mono',monospace] text-[10px] tracking-[0.25em] text-[var(--accent-rust)] font-bold uppercase">ARCHIVOS DE MOVILIDAD</span>
          <h2 className="font-['Oswald',sans-serif] uppercase font-bold text-[clamp(1.8rem,4vw,2.5rem)] text-[var(--paper)] mt-[4px] m-0 tracking-tight leading-none">EVOLUCIÓN TÁCTICA</h2>
        </div>
        <div className="hidden sm:block text-right">
          <span className="font-['IBM_Plex_Mono',monospace] text-[11px] text-[var(--ink-dim)] font-light">SCROLL HORIZONTAL PARA NAVEGAR</span>
        </div>
      </header>

      {/* ÁREA CENTRAL MAXIMALISTA (100% DISPONIBLE PARA EL RIEL) */}
      <div className="relative flex-grow flex items-center w-full h-full overflow-hidden">
        
        {/* EL RIEL QUE SE ADAPTA AL HEIGHT COMPLETO */}
        <div 
          className="w-full h-full flex gap-0 overflow-x-auto snap-x snap-mandatory scroll-smooth px-[clamp(20px,35vw,42vw)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [@media(prefers-reduced-motion:reduce)]:scroll-auto items-center relative z-10" 
          ref={railRef}
        >
          {/* EJE DEL COMPONENT CONTINUO */}
          <div className="absolute left-0 right-0 top-[35%] h-[1px] bg-[var(--line-strong)] z-0 pointer-events-none opacity-60" aria-hidden="true" />
          
          {sorted.map((v) => {
            const showEra = v.era !== lastEra;
            lastEra = v.era;
            const focused = focusedId === v.id;
            const meta = DOMAIN_META[v.domain];
            return (
              <article
                key={v.id}
                ref={(el) => (itemRefs.current[v.id] = el)}
                className={`snap-center shrink-0 w-[80vw] sm:w-[500px] md:w-[600px] h-[75vh] px-[32px] flex flex-col justify-between cursor-pointer outline-none transition-all duration-700 ease-out z-10 ${
                  focused ? 'opacity-100 scale-100' : 'opacity-15 scale-[0.88]'
                }`}
                onClick={() => scrollToItem(v.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') scrollToItem(v.id);
                }}
              >
                {/* Bloque Superior: Línea de tiempo + Era */}
                <div className="w-full flex flex-col items-center justify-start h-[60px] shrink-0">
                  <div className={`font-['IBM_Plex_Mono',monospace] text-[11px] tracking-[0.16em] uppercase transition-colors duration-300 ${focused ? 'text-[var(--accent-rust)] font-semibold' : 'text-[var(--ink-dim)]'}`}>
                    {showEra ? v.era : '\u00A0'}
                  </div>
                  {/* Nodo Intersección Fijo en el Eje */}
                  <div className="mt-[12px] relative flex flex-col items-center">
                    <span 
                      className="w-[10px] h-[10px] rounded-full box-border transition-all duration-500" 
                      style={{ 
                        backgroundColor: focused ? 'var(--accent-rust)' : 'var(--line-strong)',
                        transform: focused ? 'scale(1.5)' : 'scale(1)',
                        boxShadow: focused ? `0 0 16px ${meta.color}, 0 0 0 4px var(--bg)` : 'none'
                      }} 
                    />
                  </div>
                </div>

                {/* Bloque Central: Contenedor Inmersivo del PNG */}
                <div className="w-full flex-grow flex items-center justify-center relative overflow-visible max-h-[40vh] my-4">
                  <VehicleImage image={v.img} domain={v.domain} name={v.name} focused={focused} />
                  
                  {/* Categoría Flotante de Referencia */}
                  <span className={`absolute top-0 right-4 font-['IBM_Plex_Mono',monospace] text-[9px] tracking-[0.1em] py-[3px] px-[8px] bg-[rgba(18,20,15,0.8)] border transition-all duration-500 ${focused ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'}`} style={{ borderColor: meta.color, color: meta.color }}>
                    {meta.label}
                  </span>
                </div>

                {/* Bloque Inferior: Tipografía Limpia y Ficha descriptiva */}
                <div className="w-full text-left pt-4 shrink-0 flex flex-col justify-end min-h-[220px]">
                  <span className={`font-['IBM_Plex_Mono',monospace] text-[14px] tracking-wide transition-colors duration-300 ${focused ? 'text-[var(--accent-rust)] font-bold' : 'text-[var(--accent-cyan)]'}`}>
                    {v.yearLabel}
                  </span>
                  
                  <h3 className="font-['Oswald',sans-serif] text-[1.8rem] sm:text-[2.2rem] font-bold text-[var(--paper)] mt-[2px] mx-0 mb-[10px] leading-[1.1] tracking-tight uppercase">
                    {v.name}
                  </h3>
                  
                  {/* El texto colapsa fluidamente sin romper el alto general */}
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${focused ? 'max-h-[120px] opacity-100 transform translate-y-0' : 'max-h-0 opacity-0 transform translate-y-4'}`}>
                    <p className="text-[13.5px] leading-[1.6] text-[var(--ink-dim)] m-0 font-light max-w-[520px]">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* FOOTER DEL COMPONENTE */}
      <footer className="w-full px-[clamp(24px,6vw,80px)] pb-[32px] shrink-0 z-20 flex justify-between items-center border-t border-[rgba(255,255,255,0.03)] pt-[16px]">
        <span className="font-['IBM_Plex_Mono',monospace] text-[10px] text-[var(--ink-dim)] opacity-40">© LORE SYSTEM DECK</span>
        <span className="font-['IBM_Plex_Mono',monospace] text-[10px] text-[var(--accent-cyan)] uppercase tracking-wider font-medium">INDEX REEVALUADO V3</span>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=IBM+Plex+Mono:wght@300;400;500;600&family=Public+Sans:wght@300;400;500&display=swap');
      `}</style>
    </section>
  );
}