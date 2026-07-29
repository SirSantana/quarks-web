'use client';

import AerosaniDirectorCanvas from '@/src/Components/Cars/AeroCarCanvas';
import VehicleTimeline from '@/src/Components/Cars/Timeline';
import { useEffect, useMemo, useRef, useState } from 'react';

/* ============================================================
   ARCHIVO DE MOVILIDAD BÉLICA
   Ficha de inteligencia interactiva sobre vehículos y sistemas
   de movilidad usados a lo largo de los conflictos de la historia.
   ============================================================ */

const DOMAINS = [
  { id: 'todos', label: 'Todos', code: '—' },
  { id: 'tierra', label: 'Tierra', code: 'TR' },
  { id: 'aire', label: 'Aire', code: 'AR' },
  { id: 'mar', label: 'Mar', code: 'MR' },
  { id: 'mecanico', label: 'Mecánico', code: 'MC' },
];

const VEHICLES = [
  {
    id: 'carro-guerra',
    name: 'Carro de guerra egipcio',
    domain: 'tierra',
    era: 'Antigüedad',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    year: -1300,
    yearLabel: 'c. 1300 a.C.',
    conflict: 'Guerras del Bronce Tardío',
    origin: 'Egipto / Hititas',
    desc: 'Plataforma de madera ligera sobre dos ruedas de radios, tirada por caballos. Su velocidad rompió la lógica de la infantería masiva y creó la primera arma de choque móvil de la historia.',
    specs: [
      ['Tripulación', '2 (auriga + arquero)'],
      ['Tracción', '2 caballos'],
      ['Velocidad', '~38 km/h en carga'],
      ['Función', 'Choque / tiro con arco'],
    ],
    tag: 'ORIGEN DE LA MOVILIDAD MILITAR',
  },
  {
    id: 'elefante-guerra',
    name: 'Elefante de guerra',
    domain: 'tierra',
    era: 'Antigüedad',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    year: -218,
    yearLabel: '218 a.C.',
    conflict: 'Segunda Guerra Púnica',
    origin: 'Cartago (Aníbal)',
    desc: 'Usado como tanque biológico: rompía líneas de infantería y sembraba pánico en la caballería enemiga, que no reconocía su olor ni su forma. Aníbal cruzó los Alpes con 37 de ellos.',
    specs: [
      ['Tripulación', '1 cornaca + guerreros'],
      ['Peso', '4 – 6 toneladas'],
      ['Velocidad', '~25 km/h en carga'],
      ['Función', 'Ruptura de línea / terror'],
    ],
    tag: 'ARMA PSICOLÓGICA',
  },
  {
    id: 'trirreme',
    name: 'Trirreme griego',
    domain: 'mar',
    era: 'Antigüedad',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    year: -480,
    yearLabel: '480 a.C.',
    conflict: 'Guerras Médicas — Salamina',
    origin: 'Grecia clásica',
    desc: 'Nave de guerra de tres filas de remeros y espolón de bronce en la proa. Decidió el destino de Grecia frente a Persia gracias a su maniobrabilidad, no a su tamaño.',
    specs: [
      ['Tripulación', '~170 remeros + 30 marinos'],
      ['Propulsión', 'Remo + vela auxiliar'],
      ['Velocidad', '~9-10 nudos en punta'],
      ['Función', 'Embestida / abordaje'],
    ],
    tag: 'DOMINIO NAVAL TEMPRANO',
  },
  {
    id: 'torre-asedio',
    name: 'Torre de asedio',
    domain: 'mecanico',
    era: 'Medieval',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    year: 1097,
    yearLabel: 'c. 1097',
    conflict: 'Primera Cruzada',
    origin: 'Europa / Oriente Próximo',
    desc: 'Estructura móvil de madera, montada sobre ruedas o rodillos, que se empujaba hasta las murallas para volcar la ventaja de la altura a favor del atacante. Mitad vehículo, mitad edificio.',
    specs: [
      ['Tripulación', '20-200 soldados'],
      ['Propulsión', 'Fuerza humana'],
      ['Altura', 'Igual o mayor a la muralla'],
      ['Función', 'Escalada de fortificaciones'],
    ],
    tag: 'INGENIERÍA DE ASEDIO',
  },
  {
    id: 'trebuchet',
    name: 'Trabuquete de contrapeso',
    domain: 'mecanico',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    era: 'Medieval',
    year: 1200,
    yearLabel: 'c. 1200',
    conflict: 'Guerras de asedio europeas',
    origin: 'Europa medieval',
    desc: 'Sistema de lanzamiento por contrapeso capaz de arrojar proyectiles de más de 100 kg. No transporta tropas, pero proyecta fuerza a distancia: el primer "vehículo" de la artillería moderna.',
    specs: [
      ['Alcance', 'Hasta 300 m'],
      ['Carga', '90 – 150 kg'],
      ['Tripulación', '5-10 operarios'],
      ['Función', 'Artillería de asedio'],
    ],
    tag: 'PRECURSOR DE LA ARTILLERÍA',
  },
  {
    id: 'galeon',
    name: 'Galeón de línea',
    domain: 'mar',
    era: 'Edad Moderna',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    year: 1571,
    yearLabel: 'c. 1571',
    conflict: 'Batalla de Lepanto / Imperios coloniales',
    origin: 'España / Europa atlántica',
    desc: 'Buque de casco alto y múltiples cubiertas de cañones que convirtió el océano en un tablero estratégico global. Sin él no existe la idea de "potencia naval" tal como la conocemos.',
    specs: [
      ['Tripulación', '200 – 500 hombres'],
      ['Armamento', '30 – 60 cañones'],
      ['Propulsión', 'Vela (3-4 mástiles)'],
      ['Función', 'Combate naval / transporte'],
    ],
    tag: 'PODER NAVAL GLOBAL',
  },
  {
    id: 'globo-observacion',
    name: 'Globo de observación',
    domain: 'aire',
    era: 'Edad Moderna',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    year: 1794,
    yearLabel: '1794',
    conflict: 'Guerras Revolucionarias Francesas',
    origin: 'Francia',
    desc: 'Globo cautivo de aire caliente usado en la batalla de Fleurus para observar el campo enemigo desde el aire. El primer paso de la humanidad hacia la guerra en la tercera dimensión.',
    specs: [
      ['Altura', 'Hasta 500 m (cautivo)'],
      ['Tripulación', '1-2 observadores'],
      ['Función', 'Reconocimiento aéreo'],
      ['Autonomía', 'Limitada por cable'],
    ],
    tag: 'PRIMERA GUERRA AÉREA',
  },
  {
    id: 'ferrocarril-militar',
    name: 'Ferrocarril militar',
    domain: 'tierra',
    era: 'Edad Moderna',
    year: 1862,
    yearLabel: '1862',
    conflict: 'Guerra de Secesión',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    origin: 'Estados Unidos',
    desc: 'El tren convirtió la logística en la nueva arma decisiva: mover ejércitos enteros, cañones y suministros a velocidades antes inimaginables cambió para siempre la escala de las guerras.',
    specs: [
      ['Capacidad', 'Miles de hombres/día'],
      ['Velocidad', '30 – 40 km/h'],
      ['Función', 'Logística / movilización masiva'],
      ['Impacto', 'Redefinió la estrategia'],
    ],
    tag: 'REVOLUCIÓN LOGÍSTICA',
  },
  {
    id: 'mark-i',
    name: 'Tanque Mark I',
    domain: 'tierra',
    era: 'Primera Guerra Mundial',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    year: 1916,
    yearLabel: '1916',
    conflict: 'Batalla del Somme',
    origin: 'Reino Unido',
    desc: 'Primer tanque de combate de la historia. Diseñado para cruzar trincheras y alambradas, su forma romboidal y orugas envolventes nacieron directamente del estancamiento del frente occidental.',
    specs: [
      ['Tripulación', '8'],
      ['Velocidad', '6 km/h'],
      ['Blindaje', '6 – 12 mm'],
      ['Función', 'Ruptura de trincheras'],
    ],
    tag: 'NACE EL TANQUE',
  },
  {
    id: 'fokker-dr1',
    name: 'Fokker Dr.I',
    domain: 'aire',
    era: 'Primera Guerra Mundial',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    year: 1917,
    yearLabel: '1917',
    conflict: 'Frente Occidental',
    origin: 'Imperio Alemán',
    desc: 'Triplano de caza pilotado por el Barón Rojo. La guerra aérea pasó de la observación al combate directo, y con ella nació el mito moderno del piloto de caza.',
    specs: [
      ['Velocidad máx.', '185 km/h'],
      ['Techo', '6.000 m'],
      ['Armamento', '2 ametralladoras'],
      ['Función', 'Caza / superioridad aérea'],
    ],
    tag: 'GUERRA EN EL AIRE',
  },
  {
    id: 'u-boot',
    name: 'U-Boot tipo U-31',
    domain: 'mar',
    era: 'Primera Guerra Mundial',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    year: 1914,
    yearLabel: '1914',
    conflict: 'Guerra submarina del Atlántico',
    origin: 'Imperio Alemán',
    desc: 'Submarino diseñado para el bloqueo naval y la guerra de desgaste comercial. Introdujo la idea de la guerra invisible: un enemigo que ataca desde donde no se le puede ver venir.',
    specs: [
      ['Tripulación', '~35'],
      ['Velocidad', '16 nudos (superficie)'],
      ['Autonomía', '~11.400 km'],
      ['Función', 'Guerra submarina / bloqueo'],
    ],
    tag: 'GUERRA INVISIBLE',
  },
  {
    id: 'panzer-iv',
    name: 'Panzer IV',
    domain: 'tierra',
    era: 'Segunda Guerra Mundial',
    year: 1939,
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1778601995/image_39_efvy5t.jpg',
    yearLabel: '1939 – 1945',
    conflict: 'Segunda Guerra Mundial',
    origin: 'Alemania',
    desc: 'Columna vertebral de la Blitzkrieg alemana. Su producción masiva y adaptabilidad constante lo convirtieron en el tanque más longevo del conflicto, evolucionando de principio a fin de la guerra.',
    specs: [
      ['Tripulación', '5'],
      ['Velocidad', '42 km/h'],
      ['Blindaje', 'Hasta 80 mm'],
      ['Función', 'Guerra de movimiento / Blitzkrieg'],
    ],
    tag: 'GUERRA RELÁMPAGO',
  },
  {
    id: 'jeep-willys',
    name: 'Jeep Willys MB',
    domain: 'tierra',
    era: 'Segunda Guerra Mundial',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1778715025/image_40_wcifjt.jpg',
    year: 1941,
    yearLabel: '1941',
    conflict: 'Segunda Guerra Mundial',
    origin: 'Estados Unidos',
    desc: 'Vehículo ligero todoterreno producido en masa para reconocimiento, transporte y logística. Su simplicidad mecánica y versatilidad lo volvieron indispensable en todos los frentes aliados.',
    specs: [
      ['Tripulación', '2 + 2 pasajeros'],
      ['Velocidad', '105 km/h'],
      ['Peso', '~1.000 kg'],
      ['Función', 'Reconocimiento / transporte ligero'],
    ],
    tag: 'MOVILIDAD DE INFANTERÍA',
  },
  {
    id: 'spitfire',
    name: 'Supermarine Spitfire',
    domain: 'aire',
    era: 'Segunda Guerra Mundial',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    year: 1938,
    yearLabel: '1938',
    conflict: 'Batalla de Inglaterra',
    origin: 'Reino Unido',
    desc: 'Caza monoplaza de ala elíptica que defendió el cielo británico. Su combinación de velocidad y maniobrabilidad lo convirtió en símbolo de resistencia tanto como en máquina de guerra.',
    specs: [
      ['Velocidad máx.', '594 km/h'],
      ['Techo', '11.000 m'],
      ['Armamento', '8 ametralladoras'],
      ['Función', 'Caza / defensa aérea'],
    ],
    tag: 'SÍMBOLO DE RESISTENCIA',
  },
  {
    id: 'higgins-boat',
    name: 'Higgins Boat (LCVP)',
    domain: 'mar',
    era: 'Segunda Guerra Mundial',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    year: 1942,
    yearLabel: '1942',
    conflict: 'Desembarco de Normandía',
    origin: 'Estados Unidos',
    desc: 'Lancha de desembarco de fondo plano y rampa frontal. Eisenhower afirmó que sin ella la guerra anfibia aliada habría sido imposible: llevó a los soldados de barco a playa en segundos.',
    specs: [
      ['Capacidad', '36 soldados'],
      ['Velocidad', '12 nudos'],
      ['Material', 'Madera contrachapada'],
      ['Función', 'Desembarco anfibio'],
    ],
    tag: 'GUERRA ANFIBIA',
  },
  {
    id: 'v2',
    name: 'Cohete V-2',
    domain: 'aire',
    era: 'Segunda Guerra Mundial',
    year: 1944,
    yearLabel: '1944',
    conflict: 'Bombardeo de Londres',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1779564957/image_45_1_spavn7.jpg',
    origin: 'Alemania',
    desc: 'Primer misil balístico operativo de la historia. No transportaba tropas: transportaba la guerra misma, sin piloto y sin posibilidad de intercepción. El origen directo de la era espacial y de los misiles modernos.',
    specs: [
      ['Alcance', '~320 km'],
      ['Velocidad', '~5.760 km/h'],
      ['Altitud máx.', '~206 km'],
      ['Función', 'Misil balístico'],
    ],
    tag: 'NACE EL MISIL',
  },
  {
    id: 'uh-1-huey',
    name: 'Bell UH-1 "Huey"',
    domain: 'aire',
    era: 'Guerra Fría',
    year: 1959,
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1779997316/image_46_mt2zjy.jpg',
    yearLabel: '1959',
    conflict: 'Guerra de Vietnam',
    origin: 'Estados Unidos',
    desc: 'El helicóptero que redefinió la movilidad de combate: tropas insertadas y evacuadas en minutos, en terrenos donde ningún vehículo terrestre podía llegar. Símbolo visual de toda una guerra.',
    specs: [
      ['Tripulación', '2 + 11-14 pasajeros'],
      ['Velocidad', '204 km/h'],
      ['Autonomía', '~510 km'],
      ['Función', 'Asalto aéreo / evacuación'],
    ],
    tag: 'MOVILIDAD VERTICAL',
  },
  {
    id: 'portaaviones-nimitz',
    name: 'Portaaviones clase Nimitz',
    domain: 'mar',
    era: 'Guerra Fría',
    year: 1975,
    yearLabel: '1975',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    conflict: 'Proyección de poder global',
    origin: 'Estados Unidos',
    desc: 'Una base aérea flotante de propulsión nuclear capaz de operar décadas sin repostar. Convierte el concepto de "frontera" en algo obsoleto: el poder militar ya no necesita territorio, solo océano.',
    specs: [
      ['Tripulación', '~5.000'],
      ['Aeronaves', '~90'],
      ['Propulsión', 'Nuclear'],
      ['Función', 'Proyección de poder aéreo'],
    ],
    tag: 'PODER SIN FRONTERAS',
  },
  {
    id: 'blackbird',
    name: 'Lockheed SR-71 Blackbird',
    domain: 'aire',
    era: 'Guerra Fría',
    year: 1966,
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    yearLabel: '1966',
    conflict: 'Reconocimiento estratégico',
    origin: 'Estados Unidos',
    desc: 'Avión de reconocimiento tan rápido que su mejor defense era simplemente acelerar y escapar de cualquier misil. Voló más alto y más rápido que cualquier otro avión operativo de su época.',
    specs: [
      ['Velocidad', 'Mach 3.3+'],
      ['Techo', '25.900 m'],
      ['Tripulación', '2'],
      ['Función', 'Reconocimiento estratégico'],
    ],
    tag: 'VELOCIDAD COMO ESCUDO',
  },
  {
    id: 'humvee',
    name: 'HMMWV "Humvee"',
    domain: 'tierra',
    era: 'Guerra Fría',
    year: 1984,
    yearLabel: '1984',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    conflict: 'Guerra del Golfo y posteriores',
    origin: 'Estados Unidos',
    desc: 'Vehículo multipropósito de altísima movilidad que sustituyó al Jeep. Su chasis modular permitió adaptarlo a decenas de roles: transporte, ambulancia, lanzamisiles, puesto de mando.',
    specs: [
      ['Tripulación', '2-4'],
      ['Velocidad', '113 km/h'],
      ['Peso', '~2.500 kg'],
      ['Función', 'Transporte táctico multipropósito'],
    ],
    tag: 'PLATAFORMA MODULAR',
  },
  {
    id: 'mq-9-reaper',
    name: 'MQ-9 Reaper',
    domain: 'aire',
    era: 'Contemporánea',
    year: 2001,
    yearLabel: '2001',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    conflict: 'Guerras asimétricas del s. XXI',
    origin: 'Estados Unidos',
    desc: 'Dron de combate no tripulado operado a distancia, a veces desde otro continente. La guerra deja de requerir presencia física del combatiente: nace la era del conflicto remoto.',
    specs: [
      ['Tripulación', '0 (control remoto)'],
      ['Autonomía', '~1.900 km'],
      ['Techo', '15.000 m'],
      ['Función', 'Vigilancia / ataque de precisión'],
    ],
    tag: 'GUERRA REMOTA',
  },
  {
    id: 'exoesqueleto',
    name: 'Exoesqueleto táctico (TALOS)',
    domain: 'mecanico',
    era: 'Contemporánea',
    year: 2018,
    yearLabel: 'En desarrollo',
    img:'https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png',
    conflict: 'Doctrinas de infantería del futuro',
    origin: 'Estados Unidos (prototipo)',
    desc: 'Sistema motorizado que un soldado viste como una segunda piel: aumenta fuerza, protección y resistencia. El vehículo ya no transporta al combatiente, se funde con él.',
    specs: [
      ['Tripulación', '1 (integrado)'],
      ['Función', 'Aumento de fuerza y blindaje'],
      ['Estado', 'Prototipo / desarrollo activo'],
      ['Autonomía', 'Limitada por batería'],
    ],
    tag: 'EL SOLDADO COMO VEHÍCULO',
  },
];

const ERA_ORDER = [
  'Antigüedad',
  'Medieval',
  'Edad Moderna',
  'Primera Guerra Mundial',
  'Segunda Guerra Mundial',
  'Guerra Fría',
  'Contemporánea',
];

export default function Home() {
  const [activeDomain, setActiveDomain] = useState('todos');
  const [activeEra, setActiveEra] = useState('todas');
  const [selected, setSelected] = useState(null);
  const [scanY, setScanY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    let raf;
    const tick = () => {
      setScanY((y) => (y + 0.15) % 100);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const filtered = useMemo(() => {
    return VEHICLES.filter((v) => {
      const domainOk = activeDomain === 'todos' || v.domain === activeDomain;
      const eraOk = activeEra === 'todas' || v.era === activeEra;
      return domainOk && eraOk;
    }).sort((a, b) => a.year - b.year);
  }, [activeDomain, activeEra]);

  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach((v) => {
      if (!map.has(v.era)) map.set(v.era, []);
      map.get(v.era).push(v);
    });
    return ERA_ORDER.filter((e) => map.has(e)).map((e) => [e, map.get(e)]);
  }, [filtered]);

  const scrollToEra = (era) => {
    const el = document.getElementById(`era-${era.replace(/\s+/g, '-')}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getDomainBadgeStyle = (domain) => {
    switch (domain) {
      case 'tierra': return 'border-[#b98b4f] text-[#cfa06a]';
      case 'aire': return 'border-[#6b9a9e] text-[#8fbdc1]';
      case 'mar': return 'border-[#5a7fa6] text-[#86a8cc]';
      case 'mecanico': return 'border-[#a86b5a] text-[#cf8f7c]';
      default: return 'border-[var(--accent-cyan)] text-[var(--accent-cyan)]';
    }
  };

  return (
    <div className="font-['Public_Sans',sans-serif] bg-[var(--bg)] text-[var(--ink)] min-h-screen">
      {/* ---------------- STYLES GLOBALES PARA VARIABLES EXACTAS ---------------- */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Public+Sans:wght@400;500;600&display=swap');

        :root {
          --bg: #12140f;
          --bg-panel: #191c14;
          --bg-card: #1e2118;
          --paper: #d8d2b8;
          --ink: #ece7d6;
          --ink-dim: #8d9078;
          --accent-rust: #c1440e;
          --accent-cyan: #6b9a9e;
          --line: rgba(216, 210, 184, 0.12);
          --line-strong: rgba(216, 210, 184, 0.28);
        }

        * {
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          padding: 0;
          background: var(--bg);
          color: var(--ink);
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.001ms !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>

      {/* ---------------- HERO ---------------- */}
      <header className="relative overflow-hidden pt-[clamp(72px,14vw,140px)] px-[clamp(20px,6vw,72px)] pb-[clamp(48px,8vw,88px)] border-b border-[var(--line-strong)] bg-[radial-gradient(ellipse_at_20%_0%,#1b1f14_0%,var(--bg)_60%)]" ref={heroRef}>
        <div className="absolute inset-0 opacity-90" aria-hidden="true">
          <svg width="100%" height="100%" preserveAspectRatio="none">
            <defs>
              <pattern id="blueprint" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--line)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint)" />
          </svg>
          <div className="absolute left-0 right-0 h-[140px] bg-[linear-gradient(to_bottom,transparent_0%,rgba(107,154,158,0.08)_45%,rgba(107,154,158,0.16)_50%,rgba(107,154,158,0.08)_55%,transparent_100%)] pointer-events-none" style={{ top: `${scanY}%` }} />
        </div>

        <div className="relative z-10 max-w-[860px]">
          <div className="inline-block font-['IBM_Plex_Mono',monospace] text-[11px] tracking-[0.18em] text-[var(--accent-rust)] border border-[var(--accent-rust)] py-[5px] px-[10px] -rotate-2 mb-[22px]">EXPEDIENTE DESCLASIFICADO</div>
          <h1 className="font-['Oswald',sans-serif] font-bold uppercase text-[clamp(2.4rem,7vw,5rem)] line-height-[0.98] tracking-[0.01em] m-0 mb-[22px] text-[var(--paper)]">
            ARCHIVO DE
            <br />
            MOVILIDAD BÉLICA
          </h1>
          <p className="text-[clamp(0.95rem,1.6vw,1.1rem)] line-height-[1.6] text-[var(--ink-dim)] max-w-[620px] m-0 mb-[28px]">
            Una ficha de intelligence sobre los vehículos, máquinas y sistemas de transporte
            que han cambiado el curso de los conflictos humanos — de la rueda de guerra
            egipcia al exoesqueleto de combate.
          </p>
          <div className="font-['IBM_Plex_Mono',monospace] text-[12px] tracking-[0.06em] text-[var(--accent-cyan)] flex flex-wrap gap-2">
            <span>{VEHICLES.length} UNIDADES REGISTRADAS</span>
            <span className="text-[var(--line-strong)]">/</span>
            <span>{ERA_ORDER.length} PERÍODOS</span>
            <span className="text-[var(--line-strong)]">/</span>
            <span>c. 1300 a.C. — presente</span>
          </div>
        </div>
      </header>

      {/* ---------------- CONTROLES ---------------- */}
      {/* <nav className="sticky top-0 z-20 bg-[rgba(18,20,15,0.92)] backdrop-blur-[8px] border-b border-[var(--line-strong)] py-[14px] px-[clamp(20px,6vw,72px)] flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <span className="font-['IBM_Plex_Mono',monospace] text-[10px] tracking-[0.14em] text-[var(--ink-dim)] shrink-0 w-[64px]">DOMINIO</span>
          <div className="flex flex-wrap gap-2">
            {DOMAINS.map((d) => (
              <button
                key={d.id}
                className={`font-['IBM_Plex_Mono',monospace] text-[11.5px] tracking-[0.04em] whitespace-nowrap bg-transparent border py-[7px] px-[12px] cursor-pointer inline-flex items-center gap-[6px] transition-all duration-150 ${
                  activeDomain === d.id 
                    ? 'bg-[var(--accent-rust)] border-[var(--accent-rust)] text-[#12140f] font-semibold' 
                    : 'border-[var(--line-strong)] text-[var(--ink-dim)] hover:border-[var(--accent-cyan)] hover:text-[var(--ink)]'
                }`}
                onClick={() => setActiveDomain(d.id)}
              >
                <span className="text-[9px] opacity-60">{d.code}</span>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 overflow-hidden">
          <span className="font-['IBM_Plex_Mono',monospace] text-[10px] tracking-[0.14em] text-[var(--ink-dim)] shrink-0 w-[64px]">PERÍODO</span>
          <div className="flex gap-2 overflow-x-auto pb-[2px] scrollbar-thin whitespace-nowrap">
            <button
              className={`font-['IBM_Plex_Mono',monospace] text-[11.5px] tracking-[0.04em] whitespace-nowrap bg-transparent border py-[7px] px-[12px] cursor-pointer inline-flex items-center gap-[6px] transition-all duration-150 ${
                activeEra === 'todas' 
                  ? 'border-[var(--accent-cyan)] text-[var(--accent-cyan)]' 
                  : 'border-[var(--line-strong)] text-[var(--ink-dim)] hover:border-[var(--accent-cyan)] hover:text-[var(--ink)]'
              }`}
              onClick={() => setActiveEra('todas')}
            >
              Todos
            </button>
            {ERA_ORDER.map((era) => (
              <button
                key={era}
                className={`font-['IBM_Plex_Mono',monospace] text-[11.5px] tracking-[0.04em] whitespace-nowrap bg-transparent border py-[7px] px-[12px] cursor-pointer inline-flex items-center gap-[6px] transition-all duration-150 ${
                  activeEra === era 
                    ? 'border-[var(--accent-cyan)] text-[var(--accent-cyan)]' 
                    : 'border-[var(--line-strong)] text-[var(--ink-dim)] hover:border-[var(--accent-cyan)] hover:text-[var(--ink)]'
                }`}
                onClick={() => {
                  setActiveEra(era);
                  scrollToEra(era);
                }}
              >
                {era}
              </button>
            ))}
          </div>
        </div>
      </nav> */}

      {/* ---------------- RESULTADOS ---------------- */}
      <main className="py-[40px] px-[clamp(20px,6vw,72px)] pb-[80px] max-w-[1400px] mx-auto">
        {grouped.length === 0 && (
          <p className="text-[var(--ink-dim)] font-['IBM_Plex_Mono',monospace] py-[60px] text-center">No hay unidades registradas con estos filtros.</p>
        )}

        {grouped.map(([era, items]) => (
          <section key={era} id={`era-${era.replace(/\s+/g, '-')}`} className="mb-[56px] scroll-mt-[120px]">
            <div className="flex items-baseline gap-[14px] border-b border-[var(--line-strong)] pb-[10px] mb-[20px]">
              <h2 className="font-['Oswald',sans-serif] uppercase text-[clamp(1.3rem,2.6vw,1.9rem)] font-semibold text-[var(--paper)] m-0">{era}</h2>
              <span className="font-['IBM_Plex_Mono',monospace] text-[11px] text-[var(--accent-cyan)]">
                {String(items.length).padStart(2, '0')} unidad{items.length !== 1 ? 'es' : ''}
              </span>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
              {items.map((v) => (
                <button 
                  key={v.id} 
                  className="text-left bg-[var(--bg-card)] border border-[var(--line)] p-[18px] cursor-pointer text-[var(--ink)] font-inherit flex flex-col gap-[10px] transition-all duration-180 relative hover:border-[var(--accent-rust)] hover:-translate-y-[2px] hover:bg-[#22261a]" 
                  onClick={() => setSelected(v)}
                >
                  <div className="flex justify-between items-center">
                    <span className={`font-['IBM_Plex_Mono',monospace] text-[10px] tracking-[0.08em] py-[3px] px-[7px] border ${getDomainBadgeStyle(v.domain)}`}>
                      {DOMAINS.find((d) => d.id === v.domain)?.code}
                    </span>
                    <span className="font-['IBM_Plex_Mono',monospace] text-[11px] text-[var(--ink-dim)]">{v.yearLabel}</span>
                  </div>
                  <h3 className="font-['Oswald',sans-serif] text-[1.15rem] font-semibold m-0 text-[var(--paper)] line-height-[1.2]">{v.name}</h3>
                  <p className="font-['IBM_Plex_Mono',monospace] text-[10.5px] tracking-[0.08em] text-[var(--accent-rust)] m-0 -mt-1">{v.tag}</p>
                  <p className="text-[13.5px] line-height-[1.55] text-[var(--ink-dim)] m-0 flex-grow">{v.desc}</p>
                  <div className="flex justify-between items-center font-['IBM_Plex_Mono',monospace] text-[10.5px] text-[var(--ink-dim)] border-t border-[var(--line)] pt-[10px]">
                    <span>{v.origin}</span>
                    <span className="text-[var(--accent-cyan)] tracking-[0.04em] font-semibold">VER FICHA →</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </main>
        <VehicleTimeline vehicles={filtered} />
        <AerosaniDirectorCanvas />

      <footer className="border-t border-[var(--line)] py-[32px] px-[clamp(20px,6vw,72px)] text-center font-['IBM_Plex_Mono',monospace] text-[11px] tracking-[0.06em] text-[var(--ink-dim)] flex flex-wrap justify-center gap-2">
        <span>ARCHIVO DE MOVILIDAD BÉLICA</span>
        <span className="text-[var(--line-strong)]">/</span>
        <span>Documento con fines educativos e históricos</span>
      </footer>

      {/* ---------------- MODAL DE FICHA ---------------- */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-[rgba(12,14,15,0.84)] backdrop-blur-[6px] flex items-center justify-center p-4 transition-opacity duration-200" onClick={() => setSelected(null)}>
          <div className="relative bg-[var(--bg-panel)] border-2 border-[var(--line-strong)] w-full max-w-[540px] p-[28px] flex flex-col gap-[18px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-[16px] right-[16px] bg-transparent border-0 text-[var(--ink-dim)] text-[18px] cursor-pointer p-[6px] hover:text-[var(--ink)] transition-colors duration-150" onClick={() => setSelected(null)} aria-label="Cerrar">
              ✕
            </button>
            <div className="font-['IBM_Plex_Mono',monospace] text-[10px] tracking-[0.2em] text-[var(--accent-rust)] font-semibold border-b border-[var(--line)] pb-2">CLASIFICADO — NIVEL HISTÓRICO</div>
            <div>
              <span className={`font-['IBM_Plex_Mono',monospace] tracking-[0.08em] font-['IBM_Plex_Mono',monospace] text-[11px] padding-[4px_10px] border ${getDomainBadgeStyle(selected.domain)}`}>
                {DOMAINS.find((d) => d.id === selected.domain)?.label}
              </span>
            </div>
            <h2 className="font-['Oswald',sans-serif] uppercase text-[clamp(1.6rem,4vw,2.4rem)] font-bold text-[var(--paper)] m-0 line-height-[1.05]">{selected.name}</h2>
            <p className="font-['IBM_Plex_Mono',monospace] text-[11.5px] tracking-[0.08em] text-[var(--accent-rust)] m-0 -mt-2 font-medium">{selected.tag}</p>
            <p className="text-[14.5px] line-height-[1.6] text-[var(--ink)] opacity-90 m-0">{selected.desc}</p>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-4 bg-[var(--bg-card)] border border-[var(--line)] p-[14px]">
              <div className="flex flex-col gap-1">
                <span className="font-['IBM_Plex_Mono',monospace] text-[10px] text-[var(--ink-dim)] tracking-[0.04em] uppercase">Conflicto</span>
                <span className="text-[13.5px] font-medium">{selected.conflict}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-['IBM_Plex_Mono',monospace] text-[10px] text-[var(--ink-dim)] tracking-[0.04em] uppercase">Origen</span>
                <span className="text-[13.5px] font-medium">{selected.origin}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-['IBM_Plex_Mono',monospace] text-[10px] text-[var(--ink-dim)] tracking-[0.04em] uppercase">Fecha</span>
                <span className="text-[13.5px] font-medium font-['IBM_Plex_Mono',monospace] text-[var(--accent-cyan)]">{selected.yearLabel}</span>
              </div>
            </div>

            <div className="flex flex-col border-t border-[var(--line-strong)] pt-2">
              {selected.specs.map(([k, v]) => (
                <div key={k} className="flex justify-between items-baseline py-2 border-b border-[var(--line)] last:border-0 gap-4">
                  <span className="font-['IBM_Plex_Mono',monospace] text-[11px] text-[var(--ink-dim)] shrink-0">{k}</span>
                  <span className="text-[13.5px] text-right font-medium text-[var(--paper)]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}