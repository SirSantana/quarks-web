/**
 * ATLAS — Mundial de Vehículos Extraordinarios
 * -------------------------------------------------
 * Next.js (Pages Router) · JavaScript puro · Tailwind CSS
 * Framer Motion (UI) + react-globe.gl (globo 3D interactivo)
 *
 * Instalación:
 *   npm install framer-motion react-globe.gl three
 *
 * ARQUITECTURA (v3 — globo a pantalla completa):
 * - Ya no hay header tradicional ni secciones con scroll: la app es un
 *   único viewport fijo (100dvh) donde el globo ES el fondo, y toda la
 *   interfaz (logo, buscador, categorías, stats, ficha, timeline,
 *   destacados) flota encima en tarjetas de vidrio (`glass-panel`).
 * - `vehicles` sigue siendo la única fuente de datos.
 * - `filteredVehicles` (useMemo) alimenta el globo, las sugerencias del
 *   buscador y la franja de destacados. Búsqueda + categoría + línea de
 *   tiempo comparten ese único filtro.
 * - El panel de ficha es flotante en desktop (arriba a la derecha) y se
 *   convierte en un "bottom sheet" en móvil, para no competir por
 *   espacio horizontal en pantallas angostas.
 * - El globo se carga con next/dynamic ({ ssr:false }) porque usa WebGL.
 */

import Head from "next/head";
import dynamic from "next/dynamic";
import { useMemo, useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

/* ============================================================
   1) CONSTANTES DE DISEÑO
   ============================================================ */
const CATEGORIES = [
  { key: "Todos", label: "Todos", icon: "🌐" },
  { key: "Camiones", label: "Camiones", icon: "🚚" },
  { key: "Deportivos", label: "Deportivos", icon: "🏎️" },
  { key: "Conceptos", label: "Conceptos", icon: "💡" },
  { key: "Buses", label: "Buses", icon: "🚌" },
  { key: "Tractores", label: "Tractores", icon: "🚜" },
  { key: "Motores", label: "Motores", icon: "⚙️" },
];

const CATEGORY_SINGULAR = {
  Camiones: "Camión",
  Deportivos: "Deportivo",
  Conceptos: "Concepto",
  Buses: "Bus",
  Tractores: "Tractor",
  Motores: "Motor",
};

const SPEC_ICON_MAP = {
  Motor: "🔧",
  Potencia: "⚡",
  Torque: "🔩",
  Peso: "⚖️",
  Producción: "🏭",
  Tracción: "🧭",
  Combustible: "⛽",
  Capacidad: "👥",
  Asientos: "🪑",
  Puertas: "🚪",
  Carrocería: "🧱",
  Altura: "📏",
  Acceso: "🔑",
  Ruedas: "⚙️",
  Propulsión: "☢️",
  Longitud: "📏",
  Concepto: "💡",
  Aletas: "🪽",
};

function iconForSpec(key) {
  if (SPEC_ICON_MAP[key]) return SPEC_ICON_MAP[key];
  if (key.toLowerCase().includes("velocidad")) return "💨";
  if (key.toLowerCase().includes("autonomía")) return "🔋";
  return "▪️";
}

const CURRENT_YEAR = new Date().getFullYear();
const TIMELINE_MIN_YEAR = 1890;

// Estilo por tipo de marcador: color, tamaño y "personalidad" de pulso.
const TYPE_META = {
  legendario: {
    label: "Legendario",
    emoji: "⭐",
    color: "#FFD65A",
    radius: 0.55,
    markerSize: 46,
    ringMax: 5,
    ringSpeed: 1.1,
    ringPeriod: 2400,
  },
  nuevo: {
    label: "Nuevo",
    emoji: "✨",
    color: "#22D3EE",
    radius: 0.42,
    markerSize: 40,
    ringMax: 4,
    ringSpeed: 2.6,
    ringPeriod: 900,
  },
  normal: {
    label: "Normal",
    emoji: "",
    color: "#FF5A1F",
    radius: 0.34,
    markerSize: 32,
    ringMax: 3,
    ringSpeed: 1.8,
    ringPeriod: 1500,
  },
};

function typeMeta(type) {
  return TYPE_META[type] || TYPE_META.normal;
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ---- Utilidades para animar la cámara del globo a mano (ver GlobeHero) ----
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Interpola longitud por el camino más corto (evita cruzar el mundo entero
// cuando el destino está "al otro lado" de la línea ±180°).
function lerpLng(a, b, t) {
  let diff = b - a;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return a + diff * t;
}

const FONT_DISPLAY = { fontFamily: "'Space Grotesk', sans-serif" };
const FONT_MONO = { fontFamily: "'JetBrains Mono', monospace" };

/* ============================================================
   2) DATOS — reemplazar esto por una fuente real (DB/API) luego
   ============================================================ */
const vehicles = [
  {
    id: 1,
    name: "Ford Big Red",
    country: "Estados Unidos",
    flag: "🇺🇸",
    year: 1964,
    category: "Camiones",
    manufacturer: "Ford",
    type: "legendario",
    description:
      "Uno de los camiones conceptuales más audaces jamás construidos: casi 27 metros de largo pensados para demostrar el poderío técnico de Ford en la era espacial.",
    specs: {
      Motor: "Turbina de gas",
      Potencia: "600 hp",
      Torque: "2,034 Nm",
      Peso: "31,750 kg",
    },
    image: "https://picsum.photos/seed/atlas1/800/560",
    lat: 39.5,
    lng: -98.35,
    relatedIds: [13, 14, 15],
  },
  {
    id: 2,
    name: "Chevrolet Turbo Titan III",
    country: "Estados Unidos",
    flag: "🇺🇸",
    year: 1963,
    category: "Camiones",
    manufacturer: "Chevrolet",
    type: "normal",
    description:
      "Impulsado por una turbina de gas, este concepto futurista imaginaba un transporte de carga propulsado como un avión, con cabina de mando digna de una nave.",
    specs: {
      Motor: "Turbina Whirlfire",
      Potencia: "280 hp",
      Producción: "Prototipo único",
    },
    image: "https://picsum.photos/seed/atlas2/800/560",
    lat: 37.09,
    lng: -95.71,
    relatedIds: [],
  },
  {
    id: 3,
    name: "Mercedes-Benz T80",
    country: "Alemania",
    flag: "🇩🇪",
    year: 1939,
    category: "Deportivos",
    manufacturer: "Mercedes-Benz",
    type: "legendario",
    description:
      "Diseñado para romper el récord mundial de velocidad terrestre con un motor de avión de 44.5 litros. La Segunda Guerra Mundial impidió que corriera jamás.",
    specs: {
      Motor: "V12 aeronáutico DB 603",
      Potencia: "3,000 hp",
      "Velocidad objetivo": "750 km/h",
    },
    image: "https://picsum.photos/seed/atlas3/800/560",
    lat: 51.16,
    lng: 10.45,
    relatedIds: [],
  },
  {
    id: 4,
    name: "Toyota EX-7",
    country: "Japón",
    flag: "🇯🇵",
    year: 1970,
    category: "Conceptos",
    manufacturer: "Toyota",
    type: "normal",
    description:
      "Un concepto deportivo de líneas afiladas que anticipó el lenguaje de diseño futurista japonés de los años setenta, con cúpula de cristal tipo cabina de caza.",
    specs: {
      Carrocería: "Fibra de vidrio",
      Producción: "Unidad de exhibición",
    },
    image: "https://picsum.photos/seed/atlas4/800/560",
    lat: 36.2,
    lng: 138.25,
    relatedIds: [],
  },
  {
    id: 5,
    name: "Mazda Furai",
    country: "Japón",
    flag: "🇯🇵",
    year: 2008,
    category: "Deportivos",
    manufacturer: "Mazda",
    type: "legendario",
    description:
      "Un prototipo funcional propulsado por rotor y biocombustible, esculpido para canalizar el aire como un avión de combate. Uno de los concept cars más veloces jamás creados.",
    specs: {
      Motor: "Rotor R20B (3 rotores)",
      Potencia: "450 hp",
      Combustible: "Etanol E100",
    },
    image: "https://picsum.photos/seed/atlas5/800/560",
    lat: 35.0,
    lng: 135.75,
    relatedIds: [],
  },
  {
    id: 6,
    name: "GM Firebird III",
    country: "Estados Unidos",
    flag: "🇺🇸",
    year: 1958,
    category: "Conceptos",
    manufacturer: "General Motors",
    type: "normal",
    description:
      "Con nueve aletas y propulsión de turbina, el Firebird III fue el punto máximo del optimismo de la era espacial en el diseño automotriz estadounidense.",
    specs: {
      Motor: "Turbina Whirlfire GT-305",
      Potencia: "225 hp",
      Aletas: "9 aletas de control",
    },
    image: "https://picsum.photos/seed/atlas6/800/560",
    lat: 42.33,
    lng: -83.05,
    relatedIds: [],
  },
  {
    id: 7,
    name: "Dymaxion Car",
    country: "Estados Unidos",
    flag: "🇺🇸",
    year: 1933,
    category: "Deportivos",
    manufacturer: "Buckminster Fuller",
    type: "legendario",
    description:
      "Con forma de gota y tracción trasera, este vehículo de tres ruedas prometía una eficiencia radical décadas antes de que la aerodinámica fuera una prioridad de diseño.",
    specs: {
      Motor: "Ford V8 trasero",
      Ruedas: "3 ruedas",
      Capacidad: "11 pasajeros",
    },
    image: "https://picsum.photos/seed/atlas7/800/560",
    lat: 41.31,
    lng: -72.93,
    relatedIds: [],
  },
  {
    id: 8,
    name: "Lancia Stratos Zero",
    country: "Italia",
    flag: "🇮🇹",
    year: 1970,
    category: "Conceptos",
    manufacturer: "Lancia (Bertone)",
    type: "legendario",
    description:
      "Tan bajo que se entraba por el parabrisas. Una cuña pura diseñada por Bertone que redefinió lo que un automóvil deportivo podía parecer.",
    specs: {
      Altura: "84 cm",
      Acceso: "Por el parabrisas",
      Motor: "Lancia Fulvia V4",
    },
    image: "https://picsum.photos/seed/atlas8/800/560",
    lat: 45.46,
    lng: 9.19,
    relatedIds: [],
  },
  {
    id: 9,
    name: "Nissan MID4-II",
    country: "Japón",
    flag: "🇯🇵",
    year: 1987,
    category: "Deportivos",
    manufacturer: "Nissan",
    type: "normal",
    description:
      "Un prototipo de motor central y tracción integral que sirvió como laboratorio rodante para la tecnología que definiría al GT-R de la década siguiente.",
    specs: {
      Motor: "V6 biturbo 3.0L",
      Tracción: "Integral",
      Potencia: "330 hp",
    },
    image: "https://picsum.photos/seed/atlas9/800/560",
    lat: 35.68,
    lng: 139.69,
    relatedIds: [],
  },
  {
    id: 10,
    name: "Brubaker Box",
    country: "Estados Unidos",
    flag: "🇺🇸",
    year: 1972,
    category: "Deportivos",
    manufacturer: "Brubaker",
    type: "normal",
    description:
      "Considerada una de las primeras vans deportivas del mundo, con parabrisas panorámico y una silueta que parecía sacada de una estación espacial.",
    specs: {
      Motor: "Basado en plataforma VW",
      Carrocería: "Fibra de vidrio",
      Asientos: "4",
    },
    image: "https://picsum.photos/seed/atlas10/800/560",
    lat: 34.05,
    lng: -118.24,
    relatedIds: [],
  },
  {
    id: 11,
    name: "Phantom Corsair",
    country: "Estados Unidos",
    flag: "🇺🇸",
    year: 1938,
    category: "Deportivos",
    manufacturer: "Independiente",
    type: "normal",
    description:
      "Apodado 'el auto del futuro' en su época, este sedán de seis plazas con puertas eléctricas y carrocería envolvente se adelantó cuarenta años a su tiempo.",
    specs: {
      Motor: "Lycoming V8",
      Puertas: "Eléctricas",
      Asientos: "6",
    },
    image: "https://picsum.photos/seed/atlas11/800/560",
    lat: 41.88,
    lng: -87.63,
    relatedIds: [],
  },
  {
    id: 12,
    name: "Bugatti Aérolithe",
    country: "Francia",
    flag: "🇫🇷",
    year: 1935,
    category: "Deportivos",
    manufacturer: "Bugatti",
    type: "legendario",
    description:
      "Con paneles de magnesio unidos por remaches visibles, el Aérolithe fue el ancestro directo del icónico Type 57SC Atlantic.",
    specs: {
      Carrocería: "Magnesio remachado",
      Motor: "Recto-8 3.3L",
      Producción: "Unidad única",
    },
    image: "https://picsum.photos/seed/atlas12/800/560",
    lat: 48.58,
    lng: 7.75,
    relatedIds: [],
  },
  {
    id: 13,
    name: "Ford GT90",
    country: "Estados Unidos",
    flag: "🇺🇸",
    year: 1995,
    category: "Deportivos",
    manufacturer: "Ford",
    type: "nuevo",
    description:
      "Un supercar conceptual con carrocería de titanio y un V12 cuádruple turbo, pensado como sucesor espiritual del GT40 para los años noventa.",
    specs: {
      Motor: "V12 quad-turbo",
      Potencia: "720 hp",
      "Velocidad estimada": "377 km/h",
    },
    image: "https://picsum.photos/seed/atlas13/800/560",
    lat: 42.3,
    lng: -83.1,
    relatedIds: [1, 14, 15],
  },
  {
    id: 14,
    name: "Ford Nucleon",
    country: "Estados Unidos",
    flag: "🇺🇸",
    year: 1958,
    category: "Motores",
    manufacturer: "Ford",
    type: "nuevo",
    description:
      "Un concepto a escala que imaginaba un automóvil propulsado por un reactor nuclear compacto, con autonomía de miles de kilómetros sin recargar.",
    specs: {
      Propulsión: "Reactor nuclear (concepto)",
      "Autonomía teórica": "8,000 km",
      Motor: "Sin motor de combustión",
    },
    image: "https://picsum.photos/seed/atlas14/800/560",
    lat: 42.28,
    lng: -83.2,
    relatedIds: [1, 13, 15],
  },
  {
    id: 15,
    name: "Ford Model T",
    country: "Estados Unidos",
    flag: "🇺🇸",
    year: 1908,
    category: "Deportivos",
    manufacturer: "Ford",
    type: "legendario",
    description:
      "El vehículo que democratizó el automóvil gracias a la producción en cadena, cambiando para siempre la manera en que el mundo se mueve.",
    specs: {
      Motor: "4 cilindros 2.9L",
      Potencia: "20 hp",
      Producción: "+15 millones de unidades",
    },
    image: "https://picsum.photos/seed/atlas15/800/560",
    lat: 42.33,
    lng: -83.05,
    relatedIds: [1, 13, 14],
  },
  {
    id: 16,
    name: "Neoplan Jumbocruiser",
    country: "Alemania",
    flag: "🇩🇪",
    year: 1975,
    category: "Buses",
    manufacturer: "Neoplan",
    type: "nuevo",
    description:
      "Un autobús articulado de dos pisos, gigantesco para su época, que llevó el transporte de pasajeros a una escala nunca antes vista en carretera.",
    specs: {
      Motor: "Diésel MAN",
      Capacidad: "2 pisos, 90 pasajeros",
      Longitud: "15 m",
    },
    image: "https://picsum.photos/seed/atlas16/800/560",
    lat: 48.78,
    lng: 9.18,
    relatedIds: [],
  },
  {
    id: 17,
    name: "Doe Triple D",
    country: "Reino Unido",
    flag: "🇬🇧",
    year: 1958,
    category: "Tractores",
    manufacturer: "Doe",
    type: "normal",
    description:
      "Un tractor articulado formado por dos unidades unidas, diseñado para duplicar la potencia disponible en el campo sin construir un motor nuevo desde cero.",
    specs: {
      Motor: "2× diésel Ford County",
      Tracción: "4x4 articulado",
      Concepto: "Doble tractor combinado",
    },
    image: "https://picsum.photos/seed/atlas17/800/560",
    lat: 52.6,
    lng: 1.3,
    relatedIds: [],
  },
];

/* ============================================================
   3) UTILIDADES / HOOKS
   ============================================================ */

function useCountUp(target, durationMs = 1000, start = false) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    function tick(now) {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [start, target, durationMs]);

  return value;
}

// Estrellas de fondo generadas una sola vez (deterministas), visibles en
// el espacio negativo alrededor de la esfera del globo.
function useStarField(count) {
  return useMemo(() => {
    let seed = 42;
    function rand() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: rand() * 100,
      left: rand() * 100,
      size: rand() * 1.6 + 0.4,
      delay: rand() * 6,
      duration: 3 + rand() * 4,
    }));
  }, [count]);
}

/**
 * Construye el marcador HTML que se ancla sobre cada vehículo en el globo:
 * la miniatura del auto (en vez de un simple punto de color), con un halo
 * pulsante detrás y un tooltip que aparece al pasar el mouse. Se llama UNA
 * sola vez por vehículo (el dataset que le pasamos a `htmlElementsData` es
 * fijo: siempre los 17, nunca cambia de referencia), así que el filtrado y
 * la selección se controlan después, a mano, con clases CSS — ver el efecto
 * `useEffect` que sincroniza `.atlas-marker--hidden` / `--selected` más abajo.
 */
function buildMarkerElement(d) {
  const meta = typeMeta(d.type);

  const el = document.createElement("div");
  el.className = "atlas-marker";
  el.dataset.vehicleId = String(d.id);
  el.style.setProperty("--marker-color", meta.color);
  el.style.setProperty("--marker-size", `${meta.markerSize}px`);
  el.style.setProperty("--marker-pulse-duration", `${meta.ringPeriod}ms`);

  el.innerHTML = `
    <div class="atlas-marker__pulse"></div>
    <button type="button" class="atlas-marker__thumb" aria-label="${d.flag} ${d.name}">
      <img src="${d.image}" alt="${d.name}" loading="lazy" />
    </button>
    <div class="atlas-marker__tooltip">
      <img src="${d.image}" alt="" />
      <div class="atlas-marker__tooltip-text">
        <p class="atlas-marker__tooltip-title">${d.flag} ${d.name}</p>
        <p class="atlas-marker__tooltip-sub">${d.year} · ${d.manufacturer}</p>
      </div>
    </div>
  `;

  return el;
}

/* ============================================================
   4) COMPONENTE PRINCIPAL
   ============================================================ */
export default function Home() {
  const [selected, setSelected] = useState(vehicles[0]);
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [category, setCategory] = useState("Todos");
  const [yearFilter, setYearFilter] = useState(CURRENT_YEAR);
  const [statsReady, setStatsReady] = useState(false);
  const [discoveriesOpen, setDiscoveriesOpen] = useState(false);
  const globeApiRef = useRef({ resetView: () => {}, zoomBy: () => {}, toggleRotate: () => {} });

  // ---------- Presentation Mode ----------
  // Modo pensado para grabación: oculta toda la interfaz "de trabajo" y
  // deja solo el globo + lo esencial, controlable 100% por teclado.
  const [presentationMode, setPresentationMode] = useState(false);
  const [pShowPanel, setPShowPanel] = useState(false);
  const [pShowLabels, setPShowLabels] = useState(false);
  const [pShowStats, setPShowStats] = useState(false);
  const [pShowTimeline, setPShowTimeline] = useState(false);
  const [pCinematic, setPCinematic] = useState(false);
  const [pShowHint, setPShowHint] = useState(false);
  const [presentationSearchOpen, setPresentationSearchOpen] = useState(false);
  const presentationSearchInputRef = useRef(null);

  const enterPresentationMode = useCallback(() => {
    setPresentationMode(true);
    // Al entrar siempre arranca "limpio": solo globo, nada de chrome.
    setPShowPanel(false);
    setPShowLabels(false);
    setPShowStats(false);
    setPShowTimeline(false);
    setPCinematic(false);
    setDiscoveriesOpen(false);
    setPresentationSearchOpen(false);
    setPShowHint(true);
  }, []);

  const exitPresentationMode = useCallback(() => {
    setPresentationMode(false);
    setPresentationSearchOpen(false);
    setPShowHint(false);
  }, []);

  useEffect(() => {
    if (!pShowHint) return;
    const t = setTimeout(() => setPShowHint(false), 5000);
    return () => clearTimeout(t);
  }, [pShowHint]);

  useEffect(() => {
    if (presentationSearchOpen) {
      const t = setTimeout(() => presentationSearchInputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [presentationSearchOpen]);

  // Atajos de teclado del Presentation Mode.
  useEffect(() => {
    function onKeyDown(e) {
      const target = e.target;
      const isTyping =
        target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      // Ctrl/Cmd+F: buscar (solo tiene sentido activo en Presentation Mode).
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "f" && presentationMode) {
        e.preventDefault();
        setPresentationSearchOpen(true);
        return;
      }

      if (isTyping) return;

      // P: activar/desactivar Presentation Mode desde cualquier lugar.
      if (e.key.toLowerCase() === "p" && !e.ctrlKey && !e.metaKey) {
        if (presentationMode) exitPresentationMode();
        else enterPresentationMode();
        return;
      }

      if (e.key === "Escape") {
        if (presentationSearchOpen) setPresentationSearchOpen(false);
        else if (presentationMode) exitPresentationMode();
        return;
      }

      if (!presentationMode) return;

      switch (e.key) {
        case "1":
          setPShowPanel((v) => !v);
          break;
        case "2":
          setPShowLabels((v) => !v);
          break;
        case "3":
          setPShowStats((v) => !v);
          break;
        case "4":
          setPShowTimeline((v) => !v);
          break;
        case "5":
          setPCinematic((v) => !v);
          break;
        case " ":
          e.preventDefault();
          globeApiRef.current.toggleRotate();
          break;
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          stepVehicle(1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          stepVehicle(-1);
          break;
        default:
          break;
      }
    }

    // eslint-disable-next-line no-use-before-define
    function stepVehicle(direction) {
      const list = filteredVehiclesRef.current;
      if (!list.length) return;
      const currentIndex = list.findIndex((v) => v.id === selectedRef.current?.id);
      const nextIndex =
        currentIndex === -1 ? 0 : (currentIndex + direction + list.length) % list.length;
      setSelected(list[nextIndex]);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [presentationMode, presentationSearchOpen, enterPresentationMode, exitPresentationMode]);

  useEffect(() => {
    const t = setTimeout(() => setStatsReady(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Única fuente de verdad: búsqueda + categoría + línea de tiempo.
  const filteredVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();
    return vehicles.filter((v) => {
      const matchesSearch =
        !query ||
        v.name.toLowerCase().includes(query) ||
        v.manufacturer.toLowerCase().includes(query) ||
        v.country.toLowerCase().includes(query);
      const matchesCategory = category === "Todos" || v.category === category;
      const matchesYear = v.year <= yearFilter;
      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [search, category, yearFilter]);

  // Refs "espejo" para leer valores frescos dentro del listener de teclado
  // sin tener que re-suscribirlo en cada render (evita listeners duplicados).
  const filteredVehiclesRef = useRef(filteredVehicles);
  const selectedRef = useRef(selected);
  useEffect(() => {
    filteredVehiclesRef.current = filteredVehicles;
  }, [filteredVehicles]);
  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  const suggestions = useMemo(() => {
    if (!search.trim()) return [];
    return filteredVehicles.slice(0, 5);
  }, [search, filteredVehicles]);

  const totalStats = useMemo(
    () => ({
      vehicles: vehicles.length,
      countries: new Set(vehicles.map((v) => v.country)).size,
      manufacturers: new Set(vehicles.map((v) => v.manufacturer)).size,
      yearsSpan: `${TIMELINE_MIN_YEAR}–${CURRENT_YEAR}`,
    }),
    []
  );

  const featured = useMemo(
    () => vehicles.filter((v) => v.type === "legendario" || v.type === "nuevo"),
    []
  );

  const vehiclesCount = useCountUp(totalStats.vehicles, 900, statsReady);
  const countriesCount = useCountUp(totalStats.countries, 900, statsReady);
  const manufacturersCount = useCountUp(totalStats.manufacturers, 900, statsReady);

  const handleSelectVehicle = useCallback((v) => {
    setSelected(v);
  }, []);

  const handleSelectSuggestion = useCallback((v) => {
    setSelected(v);
    setSearch("");
    setSearchFocused(false);
    setPresentationSearchOpen(false);
  }, []);

  const stars = useStarField(140);

  return (
    <>
      <Head>
        <title>ATLAS — Mundial de Vehículos Extraordinarios</title>
        <meta
          name="description"
          content="Explora los vehículos más extraños, revolucionarios y legendarios jamás construidos, en un globo interactivo."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* App de un único viewport fijo: el globo es el fondo, todo lo demás flota. */}
      <main
        className="fixed inset-0 h-[100dvh] w-screen overflow-hidden bg-[#05070B] text-white"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <CinematicBackground stars={stars} cinematic={presentationMode && pCinematic} />

        <GlobeHero
          onSelect={handleSelectVehicle}
          selectedVehicle={selected}
          vehicles={filteredVehicles}
          apiRef={globeApiRef}
          labelsEnabled={!presentationMode || pShowLabels}
          cinematic={presentationMode && pCinematic}
          showMouseHint={!presentationMode}
        />

        {/* ============ BARRA SUPERIOR FLOTANTE: logo + buscador ============ */}
        <AnimatePresence>
          {!presentationMode && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="pointer-events-none absolute inset-x-0 top-0 z-30 flex flex-col gap-3 p-3 sm:p-5"
            >
              <div className="pointer-events-auto flex items-center justify-between gap-3">
                <div className="glass-panel flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5">
                  <span className="text-[#FF5A1F] text-base leading-none">🧭</span>
                  <span
                    className="text-sm sm:text-base tracking-[0.3em] font-semibold"
                    style={FONT_DISPLAY}
                  >
                    ATLAS
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <GlobalSearch
                    value={search}
                    onChange={setSearch}
                    suggestions={suggestions}
                    focused={searchFocused}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    onSelectSuggestion={handleSelectSuggestion}
                  />
                  <PresentationToggleButton onClick={enterPresentationMode} />
                </div>
              </div>

              <div className="pointer-events-auto -mx-3 sm:mx-0 flex gap-2 overflow-x-auto px-3 sm:px-0 pb-1 no-scrollbar">
                {CATEGORIES.map((c) => (
                  <CategoryPill
                    key={c.key}
                    icon={c.icon}
                    label={c.label}
                    active={category === c.key}
                    onClick={() => setCategory(c.key)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============ STATS FLOTANTES ============ */}
        <AnimatePresence>
          {(!presentationMode || pShowStats) && (
            <StatsFloating
              key="stats"
              stats={{
                vehicles: vehiclesCount,
                countries: countriesCount,
                manufacturers: manufacturersCount,
                yearsSpan: totalStats.yearsSpan,
              }}
              compact={presentationMode}
            />
          )}
        </AnimatePresence>

        {/* ============ FICHA DE VEHÍCULO (panel flotante / bottom sheet) ============ */}
        <AnimatePresence>
          {selected && (!presentationMode || pShowPanel) && (
            <VehicleFloatingPanel
              key={selected.id}
              vehicle={selected}
              onClose={() => setSelected(null)}
              onSelectRelated={handleSelectVehicle}
              minimal={presentationMode}
            />
          )}
        </AnimatePresence>

        {/* ============ CAPTION ESENCIAL (lower-third) — atajo 2 ============ */}
        <AnimatePresence>
          {presentationMode && pShowLabels && selected && !pShowPanel && (
            <PresentationCaption key={selected.id} vehicle={selected} />
          )}
        </AnimatePresence>

        {/* ============ CONTROLES DEL GLOBO ============ */}
        <AnimatePresence>
          {!presentationMode && (
            <GlobeControls key="controls" vehiclePanelOpen={!!selected} apiRef={globeApiRef} />
          )}
        </AnimatePresence>

        {/* ============ BARRA INFERIOR FLOTANTE: timeline + destacados ============ */}
        <AnimatePresence>
          {(!presentationMode || pShowTimeline) && (
            <motion.div
              key="bottom-bar"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35 }}
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-3 sm:p-5"
            >
              <div
                className={`pointer-events-auto mx-auto flex max-w-3xl flex-col gap-2 ${
                  presentationMode ? "" : "lg:mr-[400px]"
                }`}
              >
                {!presentationMode && (
                  <DiscoveriesStrip
                    vehicles={featured}
                    onSelect={handleSelectVehicle}
                    open={discoveriesOpen}
                    onToggle={() => setDiscoveriesOpen((o) => !o)}
                  />
                )}
                <TimelineBar year={yearFilter} onChange={setYearFilter} minimal={presentationMode} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============ MODO CINEMATOGRÁFICO — atajo 5 ============ */}
        <AnimatePresence>{presentationMode && pCinematic && <CinematicLetterbox key="letterbox" />}</AnimatePresence>

        {/* ============ BUSCADOR DE Presentation Mode — Ctrl/Cmd+F ============ */}
        <AnimatePresence>
          {presentationMode && presentationSearchOpen && (
            <PresentationSearchOverlay
              key="p-search"
              inputRef={presentationSearchInputRef}
              value={search}
              onChange={setSearch}
              suggestions={suggestions}
              onSelect={handleSelectSuggestion}
              onClose={() => setPresentationSearchOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* ============ HINT DE ATAJOS (aparece 5s al entrar) ============ */}
        <AnimatePresence>
          {presentationMode && pShowHint && <PresentationHint key="hint" onDismiss={() => setPShowHint(false)} />}
        </AnimatePresence>

        {/* ============ INDICADOR MÍNIMO DE MODO ACTIVO ============ */}
        <AnimatePresence>
          {presentationMode && !pShowHint && <PresentationBadge key="badge" onExit={exitPresentationMode} />}
        </AnimatePresence>
      </main>
    </>
  );
}

/* ============================================================
   5) SUBCOMPONENTES DE UI
   ============================================================ */

/** Buscador flotante del top bar: filtra + sugerencias en vivo (sin clic). */
function GlobalSearch({
  value,
  onChange,
  suggestions,
  focused,
  onFocus,
  onBlur,
  onSelectSuggestion,
}) {
  return (
    <div className="relative w-40 sm:w-56 md:w-64 shrink-0">
      <div className="glass-panel flex items-center rounded-full px-3.5 py-2.5">
        <span className="text-gray-400 text-sm pointer-events-none shrink-0">🔍</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={() => setTimeout(onBlur, 120)}
          placeholder="Buscar..."
          className="w-full bg-transparent pl-2 text-sm placeholder-gray-500 outline-none"
        />
      </div>
      <AnimatePresence>
        {focused && value.trim() && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="glass-panel absolute top-full mt-2 w-full overflow-hidden rounded-2xl shadow-2xl"
          >
            {suggestions.map((v) => (
              <li key={v.id}>
                <button
                  onMouseDown={() => onSelectSuggestion(v)}
                  className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left hover:bg-white/5 transition-colors"
                >
                  <img
                    src={v.image}
                    alt={v.name}
                    className="h-7 w-9 shrink-0 rounded object-cover"
                  />
                  <span className="truncate text-sm">
                    {v.flag} {v.name}
                  </span>
                  <span className="ml-auto shrink-0 text-xs text-gray-500">{v.year}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

const CategoryPill = memo(function CategoryPill({ icon, label, active, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`glass-panel shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
        active ? "!bg-[#FF5A1F] !border-[#FF5A1F] text-black" : "text-gray-300 hover:text-white"
      }`}
    >
      <span>{icon}</span>
      {label}
    </motion.button>
  );
});

/** Fila de chips con las cifras globales del atlas, flotando abajo-izquierda. */
function StatsFloating({ stats, compact = false }) {
  const items = [
    { icon: "🚗", value: stats.vehicles, label: "Vehículos" },
    { icon: "🌎", value: stats.countries, label: "Países" },
    { icon: "🏭", value: stats.manufacturers, label: "Fabricantes", hideOnMobile: true },
    { icon: "📅", value: stats.yearsSpan, label: "Historia", hideOnMobile: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ delay: compact ? 0 : 0.3, duration: 0.4 }}
      className={`glass-panel pointer-events-auto absolute left-3 sm:left-5 z-20 flex gap-1 rounded-2xl p-1.5 ${
        compact ? "top-3 sm:top-5" : "top-[104px] sm:top-[124px]"
      }`}
    >
      {items.map((it) => (
        <div
          key={it.label}
          className={`flex flex-col items-center rounded-xl px-2.5 sm:px-3 py-2 ${
            it.hideOnMobile ? "hidden sm:flex" : "flex"
          }`}
        >
          <span className="text-sm mb-0.5">{it.icon}</span>
          <span className="text-sm font-semibold text-[#FF5A1F] leading-tight" style={FONT_DISPLAY}>
            {it.value}
          </span>
          <span className="text-[9px] text-gray-500 whitespace-nowrap">{it.label}</span>
        </div>
      ))}
    </motion.div>
  );
}

const FeaturedCard = memo(function FeaturedCard({ vehicle, onSelect }) {
  const meta = typeMeta(vehicle.type);
  return (
    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(vehicle)}
      className="glass-panel snap-start shrink-0 w-36 sm:w-40 text-left overflow-hidden rounded-xl"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img src={vehicle.image} alt={vehicle.name} loading="lazy" className="w-full h-full object-cover" />
        <span
          className="absolute top-1.5 left-1.5 text-[9px] px-1.5 py-0.5 rounded-full font-medium"
          style={{
            backgroundColor: hexToRgba(meta.color, 0.2),
            color: meta.color,
            border: `1px solid ${hexToRgba(meta.color, 0.4)}`,
          }}
        >
          {meta.emoji} {meta.label}
        </span>
      </div>
      <div className="p-2.5">
        <h3 className="text-xs font-medium mb-0.5 truncate">
          {vehicle.flag} {vehicle.name}
        </h3>
        <p className="text-[10px] text-gray-500 truncate">
          {vehicle.year} · {vehicle.country}
        </p>
      </div>
    </motion.button>
  );
});

/** Franja de destacados colapsable, flotando sobre la línea de tiempo. */
function DiscoveriesStrip({ vehicles: list, onSelect, open, onToggle }) {
  return (
    <div className="glass-panel rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-2.5 text-left"
      >
        <span
          className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-gray-400"
          style={FONT_MONO}
        >
          🚀 DESTACADOS
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 text-xs"
        >
          ▲
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex gap-2.5 overflow-x-auto px-3 pb-3 snap-x snap-mandatory no-scrollbar">
              {list.map((v) => (
                <FeaturedCard key={v.id} vehicle={v} onSelect={onSelect} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Ficha de vehículo: panel flotante en desktop, bottom sheet en móvil. */
function VehicleFloatingPanel({ vehicle, onClose, onSelectRelated, minimal = false }) {
  const specsRef = useRef(null);
  const relatedRef = useRef(null);

  const related = (vehicle.relatedIds || [])
    .map((id) => vehicles.find((v) => v.id === id))
    .filter(Boolean);
  const meta = typeMeta(vehicle.type);
  const specEntries = vehicle.specs ? Object.entries(vehicle.specs) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.25 }}
      className={`glass-panel pointer-events-auto fixed inset-x-3 bottom-3 z-30 max-h-[62vh] overflow-y-auto rounded-3xl
                 sm:inset-x-5 sm:bottom-5
                 lg:inset-x-auto lg:right-5 lg:bottom-5 lg:w-[360px] lg:max-h-none ${
                   minimal ? "lg:top-5" : "lg:top-24"
                 }`}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-black/40 text-gray-300 hover:text-white transition-colors z-10"
        aria-label="Cerrar ficha"
      >
        ✕
      </button>

      <div className="aspect-[16/9] sm:aspect-[16/8]">
        <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3 gap-2">
          <span className="flex items-center gap-2 text-sm text-[#FF5A1F] font-medium min-w-0">
            <span className="text-base leading-none shrink-0">{vehicle.flag}</span>
            <span className="truncate">{vehicle.country}</span>
          </span>
          {meta.emoji && (
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium shrink-0"
              style={{
                backgroundColor: hexToRgba(meta.color, 0.15),
                color: meta.color,
                border: `1px solid ${hexToRgba(meta.color, 0.4)}`,
              }}
            >
              {meta.emoji} {meta.label}
            </span>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-semibold mb-3" style={FONT_DISPLAY}>
          {vehicle.name}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {[vehicle.year, vehicle.manufacturer, CATEGORY_SINGULAR[vehicle.category] || vehicle.category].map(
            (t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-lg bg-black/30 border border-white/10 text-gray-300"
              >
                {t}
              </span>
            )
          )}
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-6">{vehicle.description}</p>

        {specEntries.length > 0 && (
          <div ref={specsRef} className="mb-6">
            <p className="text-[10px] tracking-[0.2em] text-gray-500 mb-3" style={FONT_MONO}>
              ESPECIFICACIONES
            </p>
            <div className="grid grid-cols-2 gap-2">
              {specEntries.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-start gap-2 bg-black/30 rounded-xl p-3 border border-white/10"
                >
                  <span className="text-base leading-none">{iconForSpec(k)}</span>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-500 truncate">{k}</p>
                    <p className="text-sm font-medium text-white truncate">{v}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div ref={relatedRef} className="mb-2">
            <p className="text-[10px] tracking-[0.2em] text-gray-500 mb-3" style={FONT_MONO}>
              VEHÍCULOS RELACIONADOS
            </p>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onSelectRelated(r)}
                  className="text-xs rounded-full border border-white/10 px-3 py-1.5 hover:border-[#FF5A1F]/60 hover:text-[#FF5A1F] transition-colors"
                >
                  {r.flag} {r.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/** Línea de tiempo flotante: marcas cada 5 años, chip con el año activo. */
function TimelineBar({ year, onChange, minimal = false }) {
  const totalSpan = CURRENT_YEAR - TIMELINE_MIN_YEAR;
  const progress = ((year - TIMELINE_MIN_YEAR) / totalSpan) * 100;

  const fineTicks = useMemo(() => {
    const ticks = [];
    for (let y = TIMELINE_MIN_YEAR; y <= CURRENT_YEAR; y += 5) ticks.push(y);
    return ticks;
  }, []);

  return (
    <div className="glass-panel rounded-2xl px-4 sm:px-5 py-3">
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="hidden sm:inline text-xs text-gray-400 shrink-0" style={FONT_MONO}>
          📅
        </span>

        <div className="relative flex-1 pt-6 pb-1">
          <div
            className="absolute -top-1 -translate-x-1/2 rounded-lg bg-[#0A0D13] border border-[#FF5A1F]/60 px-2 py-0.5 text-[11px] font-medium text-[#FF5A1F] shadow-lg"
            style={{ left: `${progress}%` }}
          >
            {year}
          </div>

          <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 pointer-events-none">
            {fineTicks.map((t) => (
              <span
                key={t}
                className="absolute top-0 w-px h-full bg-[#FF5A1F]/20"
                style={{ left: `${((t - TIMELINE_MIN_YEAR) / totalSpan) * 100}%` }}
              />
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-y-1/2 left-0 right-0 h-[3px] -translate-y-1/2 bg-white/10 rounded-full" />
            <div
              className="absolute inset-y-1/2 left-0 h-[3px] -translate-y-1/2 bg-[#FF5A1F] rounded-full transition-[width] duration-150"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min={TIMELINE_MIN_YEAR}
              max={CURRENT_YEAR}
              value={year}
              onChange={(e) => onChange(Number(e.target.value))}
              className="relative w-full h-4 appearance-none bg-transparent cursor-pointer accent-[#FF5A1F]"
            />
          </div>
        </div>

        {!minimal && (
          <button
            onClick={() => onChange(CURRENT_YEAR)}
            disabled={year === CURRENT_YEAR}
            className="shrink-0 text-[11px] rounded-full border border-white/10 px-3 py-1.5 text-gray-300 hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors disabled:opacity-30 disabled:pointer-events-none"
          >
            Todos
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Fondo cinematográfico: nebulosas muy sutiles, estrellas, ruido de
 * grano y viñeta. Vive detrás del globo y se ve en el espacio negativo
 * alrededor de la esfera.
 */
function CinematicBackground({ stars, cinematic = false }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute -top-40 left-1/3 h-[560px] w-[560px] rounded-full bg-[#FF5A1F]/[0.05] blur-[140px]" />
      <div className="absolute top-1/2 -right-40 h-[520px] w-[520px] rounded-full bg-[#2563EB]/[0.05] blur-[140px]" />

      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: 0.35,
            animation: `atlas-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      <svg className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-overlay">
        <filter id="atlasNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#atlasNoise)" />
      </svg>

      <div
        className="absolute inset-0 transition-[background] duration-700"
        style={{
          background: cinematic
            ? "radial-gradient(ellipse at center, transparent 30%, rgba(5,7,11,0.85) 100%)"
            : "radial-gradient(ellipse at center, transparent 45%, rgba(5,7,11,0.55) 100%)",
        }}
      />

      <style jsx global>{`
        html,
        body {
          overflow: hidden;
          overscroll-behavior: none;
        }
        .glass-panel {
          background: rgba(16, 20, 29, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* ---- Marcadores de vehículos sobre el globo (ver buildMarkerElement) ---- */
        .atlas-marker {
          position: relative;
          width: var(--marker-size, 34px);
          height: var(--marker-size, 34px);
          transform: translate(-50%, -50%);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .atlas-marker--hidden {
          opacity: 0;
          pointer-events: none;
          transform: translate(-50%, -50%) scale(0.35);
        }
        .atlas-marker__pulse {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: var(--marker-color, #ff5a1f);
          opacity: 0.5;
          pointer-events: none;
          animation: atlas-marker-pulse var(--marker-pulse-duration, 1800ms) ease-out infinite;
        }
        @keyframes atlas-marker-pulse {
          0% {
            transform: scale(0.75);
            opacity: 0.5;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }
        .atlas-marker__thumb {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          padding: 0;
          border-radius: 9999px;
          overflow: hidden;
          background: #10141d;
          border: 2px solid var(--marker-color, #ff5a1f);
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.55), 0 4px 14px rgba(0, 0, 0, 0.5);
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .atlas-marker__thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
        }
        .atlas-marker:hover .atlas-marker__thumb {
          transform: scale(1.18);
        }
        .atlas-marker--selected .atlas-marker__thumb {
          transform: scale(1.4);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.85), 0 0 22px var(--marker-color, #ff5a1f);
        }
        .atlas-marker__tooltip {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          display: flex;
          align-items: center;
          gap: 8px;
          width: 176px;
          padding: 8px;
          border-radius: 12px;
          background: rgba(16, 20, 29, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
          z-index: 5;
        }
        .atlas-marker__tooltip img {
          width: 44px;
          height: 32px;
          object-fit: cover;
          border-radius: 6px;
          flex-shrink: 0;
        }
        .atlas-marker__tooltip-title {
          font-size: 12px;
          font-weight: 600;
          line-height: 1.3;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .atlas-marker__tooltip-sub {
          font-size: 10.5px;
          color: #9ca3af;
          margin-top: 2px;
          white-space: nowrap;
        }
        .atlas-marker:hover .atlas-marker__tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .atlas-marker--no-tooltip .atlas-marker__tooltip {
          display: none;
        }
        @keyframes atlas-twinkle {
          0%,
          100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.6;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          .atlas-marker__pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

/** Botón circular de control del globo (zoom, centrar, girar). */
function GlobeControlButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className="glass-panel h-9 w-9 rounded-full flex items-center justify-center text-white hover:text-[#FF5A1F] hover:border-[#FF5A1F]/60 transition-colors text-sm"
    >
      {icon}
    </button>
  );
}

/** Cluster de controles del globo, flotando a la derecha, evitando la ficha en desktop. */
function GlobeControls({ vehiclePanelOpen, apiRef }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`pointer-events-auto absolute z-20 flex flex-col gap-2 right-3 sm:right-5 transition-[bottom] duration-200 ${
        vehiclePanelOpen ? "bottom-[68vh] sm:bottom-[40vh] lg:bottom-40" : "bottom-40"
      }`}
    >
      <GlobeControlButton icon="🎯" label="Centrar vista" onClick={() => apiRef.current.resetView()} />
      <GlobeControlButton icon="+" label="Acercar" onClick={() => apiRef.current.zoomBy(-0.3)} />
      <GlobeControlButton icon="–" label="Alejar" onClick={() => apiRef.current.zoomBy(0.3)} />
      <GlobeControlButton icon="🌐" label="Girar / detener" onClick={() => apiRef.current.toggleRotate()} />
    </motion.div>
  );
}

/**
 * Globo terráqueo 3D interactivo — ahora ocupa el 100% del viewport.
 * - react-globe.gl (three.js + d3), cargado vía next/dynamic.
 * - Cada vehículo se marca con su FOTO (no un punto de color), con un halo
 *   pulsante detrás y tooltip al pasar el mouse — ver `buildMarkerElement`.
 * - El vuelo de cámara al enfocar un vehículo es 100% manual (requestAnimationFrame
 *   + easing propio), en vez de depender del parámetro `duration` interno de
 *   la librería: así garantizamos que el zoom cinemático se vea siempre igual,
 *   sin importar la versión de react-globe.gl instalada.
 */
function GlobeHero({
  onSelect,
  selectedVehicle,
  vehicles: vehiclesForGlobe,
  apiRef,
  labelsEnabled = true,
  cinematic = false,
  showMouseHint = true,
}) {
  const globeEl = useRef();
  const wrapperRef = useRef(); // contiene el canvas + los marcadores HTML
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [globeReady, setGlobeReady] = useState(false);

  const handleGlobeRef = (instance) => {
    globeEl.current = instance;
    if (instance && typeof instance.pointOfView === "function") {
      setGlobeReady(true);
    }
  };

  useEffect(() => {
    function updateDims() {
      setDims({ width: window.innerWidth, height: window.innerHeight });
    }
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  // Registro propio de la posición de cámara: la cinemática (abajo) la lee
  // y escribe directamente, sin depender de "leer" el pointOfView actual
  // desde la instancia del globo.
  const cameraStateRef = useRef({ lat: 20, lng: 10, altitude: 2.3 });

  useEffect(() => {
    if (!globeReady || !globeEl.current) return;
    const controls = globeEl.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = cinematic ? 0.12 : 0.3;
    controls.enableZoom = true;
    controls.minDistance = 120;
    controls.maxDistance = 520;
    const initialPov = selectedVehicle
      ? { lat: selectedVehicle.lat, lng: selectedVehicle.lng, altitude: 1.6 }
      : { lat: 20, lng: 10, altitude: 2.3 };
    globeEl.current.pointOfView(initialPov, 0);
    cameraStateRef.current = initialPov;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globeReady]);

  // Ajusta la velocidad de rotación en caliente al alternar el modo cinematográfico.
  useEffect(() => {
    if (!globeReady || !globeEl.current) return;
    globeEl.current.controls().autoRotateSpeed = cinematic ? 0.12 : 0.3;
  }, [cinematic, globeReady]);

  // `hasDoneInitialSyncRef`: evita "volar" en el primer render (ya se
  // posicionó sin animación arriba). `flightTokenRef`: identifica el vuelo
  // en curso, para poder cancelarlo si el usuario cambia de auto a mitad
  // de la animación (las flechas del Presentation Mode, por ejemplo).
  const hasDoneInitialSyncRef = useRef(false);
  const flightTokenRef = useRef(0);

  /**
   * Anima la cámara de `from` a `to` en `durationMs`, a mano, con
   * requestAnimationFrame + easing cúbico. Actualiza `cameraStateRef` en
   * cada frame y se auto-cancela si `flightTokenRef` cambia (vuelo
   * superado por uno más nuevo) o si el globo se desmonta.
   */
  const tweenCamera = useCallback((from, to, durationMs, token) => {
    return new Promise((resolve) => {
      if (!globeEl.current || flightTokenRef.current !== token) {
        resolve();
        return;
      }
      if (durationMs <= 0) {
        globeEl.current.pointOfView(to, 0);
        cameraStateRef.current = to;
        resolve();
        return;
      }
      const start = performance.now();
      function step(now) {
        if (!globeEl.current || flightTokenRef.current !== token) {
          resolve();
          return;
        }
        const t = Math.min(1, (now - start) / durationMs);
        const eased = easeInOutCubic(t);
        const pov = {
          lat: lerp(from.lat, to.lat, eased),
          lng: lerpLng(from.lng, to.lng, eased),
          altitude: lerp(from.altitude, to.altitude, eased),
        };
        globeEl.current.pointOfView(pov, 0);
        cameraStateRef.current = pov;
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      }
      requestAnimationFrame(step);
    });
  }, []);

  /**
   * Vuelo de cámara cinemático al enfocar un vehículo, en tres actos:
   *   1) Retirada — la cámara se aleja primero (toma impulso).
   *   2) Barrido — cruza el globo en plano general hasta quedar sobre el objetivo.
   *   3) Acercamiento — empuje final, lento, hasta el encuadre definitivo.
   * En modo cinematográfico (atajo 5) el vuelo es más largo y pausado.
   * Sin selección, hace un regreso suave a la vista general.
   */
  useEffect(() => {
    if (!globeReady || !globeEl.current) return;
    const controls = globeEl.current.controls();

    if (!hasDoneInitialSyncRef.current) {
      hasDoneInitialSyncRef.current = true;
      controls.autoRotate = !selectedVehicle;
      return;
    }

    flightTokenRef.current += 1;
    const token = flightTokenRef.current;

    const pullMs = cinematic ? 700 : 500;
    const sweepMs = cinematic ? 1400 : 1000;
    const pushMs = cinematic ? 2200 : 1500;

    async function fly() {
      const from = cameraStateRef.current;

      if (selectedVehicle) {
        controls.autoRotate = false;
        const target = { lat: selectedVehicle.lat, lng: selectedVehicle.lng };
        // Altitud de "plano general": suficiente para ver el arco del
        // viaje, sin alejarse tanto que se pierda la sensación de escala.
        const wideAltitude = Math.min(2.6, Math.max(from.altitude, 2.1));

        await tweenCamera(from, { lat: from.lat, lng: from.lng, altitude: wideAltitude }, pullMs, token);
        if (flightTokenRef.current !== token) return;

        await tweenCamera(cameraStateRef.current, { ...target, altitude: wideAltitude }, sweepMs, token);
        if (flightTokenRef.current !== token) return;

        await tweenCamera(cameraStateRef.current, { ...target, altitude: 1.5 }, pushMs, token);
      } else {
        const home = { lat: 20, lng: 10, altitude: 2.3 };
        await tweenCamera(from, home, pullMs + sweepMs + pushMs, token);
        if (flightTokenRef.current === token && globeEl.current) {
          globeEl.current.controls().autoRotate = true;
        }
      }
    }

    fly();

    return () => {
      // Invalida el vuelo en curso; los `await` pendientes se resuelven
      // en el próximo frame sin seguir moviendo la cámara.
      flightTokenRef.current += 1;
    };
  }, [selectedVehicle, globeReady, cinematic, tweenCamera]);

  const zoomBy = useCallback((delta) => {
    if (!globeEl.current) return;
    const pov = cameraStateRef.current;
    const altitude = Math.max(0.5, Math.min(3.5, pov.altitude + delta));
    const nextPov = { ...pov, altitude };
    globeEl.current.pointOfView(nextPov, 300);
    cameraStateRef.current = nextPov;
  }, []);

  const resetView = useCallback(() => {
    if (!globeEl.current) return;
    const home = { lat: 20, lng: 10, altitude: 2.3 };
    globeEl.current.pointOfView(home, 1000);
    cameraStateRef.current = home;
  }, []);

  const toggleRotate = useCallback(() => {
    if (!globeEl.current) return;
    const controls = globeEl.current.controls();
    controls.autoRotate = !controls.autoRotate;
  }, []);

  // Publica los controles imperativos para el cluster flotante GlobeControls.
  useEffect(() => {
    apiRef.current = { resetView, zoomBy, toggleRotate };
  }, [apiRef, resetView, zoomBy, toggleRotate]);

  const arcsData = useMemo(() => {
    if (!selectedVehicle?.relatedIds?.length) return [];
    return selectedVehicle.relatedIds
      .map((rid) => vehicles.find((v) => v.id === rid))
      .filter(Boolean)
      .map((target) => ({
        startLat: selectedVehicle.lat,
        startLng: selectedVehicle.lng,
        endLat: target.lat,
        endLng: target.lng,
      }));
  }, [selectedVehicle]);

  // Clic en un marcador: delegado en el contenedor (los marcadores son DOM
  // real, no objetos de Three.js), así que buscamos el ancestro con
  // data-vehicle-id y resolvemos el vehículo por id — siempre contra la
  // lista completa, nunca contra un closure que podría quedar obsoleto.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    function handleClick(e) {
      const marker = e.target.closest("[data-vehicle-id]");
      if (!marker) return;
      const id = Number(marker.dataset.vehicleId);
      const vehicle = vehicles.find((v) => v.id === id);
      if (vehicle) onSelect(vehicle);
    }
    wrapper.addEventListener("click", handleClick);
    return () => wrapper.removeEventListener("click", handleClick);
  }, [onSelect]);

  // Los marcadores se crean UNA vez por vehículo (dataset fijo, ver abajo);
  // el filtrado, la selección y el toggle de etiquetas se reflejan después,
  // a mano, con clases CSS sobre los nodos ya existentes.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const visibleIds = new Set(vehiclesForGlobe.map((v) => v.id));
    wrapper.querySelectorAll(".atlas-marker").forEach((el) => {
      const id = Number(el.dataset.vehicleId);
      el.classList.toggle("atlas-marker--hidden", !visibleIds.has(id));
      el.classList.toggle("atlas-marker--selected", selectedVehicle?.id === id);
      el.classList.toggle("atlas-marker--no-tooltip", !labelsEnabled);
    });
  }, [vehiclesForGlobe, selectedVehicle, labelsEnabled]);

  return (
    <div ref={wrapperRef} className="absolute inset-0 z-10">
      {dims.width > 0 && (
        <Globe
          ref={handleGlobeRef}
          width={dims.width}
          height={dims.height}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          atmosphereColor="#3B82F6"
          atmosphereAltitude={cinematic ? 0.3 : 0.22}
          htmlElementsData={vehicles}
          htmlLat="lat"
          htmlLng="lng"
          htmlAltitude={0.02}
          htmlElement={buildMarkerElement}
          arcsData={arcsData}
          arcColor={() => ["#FF5A1F", "rgba(255,90,31,0.1)"]}
          arcDashLength={0.4}
          arcDashGap={0.3}
          arcDashAnimateTime={2200}
          arcStroke={0.5}
          arcAltitude={0.3}
        />
      )}

      {showMouseHint && (
        <p
          className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-10 text-[11px] text-gray-500 hidden lg:block"
          style={FONT_MONO}
        >
          🖱️ Arrastra para rotar · Scroll para zoom
        </p>
      )}
    </div>
  );
}

/* ============================================================
   6) PRESENTATION MODE — componentes de UI
   ============================================================ */

/** Botón para activar el Presentation Mode desde la barra superior normal. */
function PresentationToggleButton({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      title="Presentation Mode (atajo: P)"
      className="glass-panel flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-xs font-medium text-gray-200 hover:text-[#FF5A1F] transition-colors shrink-0"
    >
      <span className="text-sm leading-none">🎬</span>
      <span className="hidden sm:inline">Presentación</span>
    </motion.button>
  );
}

/** Lower-third minimalista con el nombre del vehículo — atajo 2 (etiquetas). */
function PresentationCaption({ vehicle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pointer-events-none absolute inset-x-0 bottom-10 sm:bottom-14 z-20 flex justify-center px-4"
    >
      <div className="flex items-center gap-3 rounded-full bg-black/40 backdrop-blur-md px-5 py-2.5 border border-white/10">
        <span className="text-lg leading-none">{vehicle.flag}</span>
        <div className="text-left leading-tight">
          <p className="text-sm font-medium" style={FONT_DISPLAY}>
            {vehicle.name}
          </p>
          <p className="text-[11px] text-gray-400">
            {vehicle.year} · {vehicle.country}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/** Barras tipo cine (letterbox) + viñeta extra — atajo 5, modo cinematográfico. */
function CinematicLetterbox() {
  return (
    <>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "9vh" }}
        exit={{ height: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-0 top-0 z-40 bg-black"
      />
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "9vh" }}
        exit={{ height: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-40 bg-black"
      />
    </>
  );
}

/** Buscador centrado que aparece con Ctrl/Cmd+F dentro del Presentation Mode. */
function PresentationSearchOverlay({ inputRef, value, onChange, suggestions, onSelect, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-auto absolute inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-[18vh] px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-panel w-full max-w-md rounded-2xl overflow-hidden"
      >
        <div className="flex items-center gap-2 px-4 py-3.5 border-b border-white/10">
          <span className="text-gray-400">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Buscar vehículo…"
            className="w-full bg-transparent text-sm placeholder-gray-500 outline-none"
          />
          <span className="shrink-0 text-[10px] text-gray-500 border border-white/10 rounded px-1.5 py-0.5">
            ESC
          </span>
        </div>
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((v) => (
              <li key={v.id}>
                <button
                  onClick={() => onSelect(v)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5 transition-colors"
                >
                  <img src={v.image} alt={v.name} className="h-7 w-9 shrink-0 rounded object-cover" />
                  <span className="truncate text-sm">
                    {v.flag} {v.name}
                  </span>
                  <span className="ml-auto shrink-0 text-xs text-gray-500">{v.year}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
}

/** Ficha de atajos que aparece unos segundos al entrar en Presentation Mode. */
function PresentationHint({ onDismiss }) {
  const shortcuts = [
    ["1", "Panel lateral"],
    ["2", "Etiquetas"],
    ["3", "Estadísticas"],
    ["4", "Timeline"],
    ["5", "Cinematográfico"],
    ["Espacio", "Pausar rotación"],
    ["◀ ▶", "Cambiar vehículo"],
    ["Ctrl+F", "Buscar"],
    ["P / Esc", "Salir"],
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4 }}
      onClick={onDismiss}
      className="pointer-events-auto absolute left-1/2 top-5 z-50 w-[min(92vw,420px)] -translate-x-1/2 cursor-pointer rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 px-5 py-4"
    >
      <p
        className="mb-3 flex items-center gap-2 text-[11px] tracking-[0.2em] text-[#FF5A1F]"
        style={FONT_MONO}
      >
        🎬 PRESENTATION MODE
      </p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        {shortcuts.map(([key, label]) => (
          <div key={label} className="flex items-center gap-2 text-xs text-gray-300">
            <span className="shrink-0 rounded border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px] text-gray-200">
              {key}
            </span>
            <span className="truncate text-gray-400">{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/** Indicador mínimo persistente (tras el hint) para saber que el modo sigue activo. */
function PresentationBadge({ onExit }) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.35 }}
      exit={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      onClick={onExit}
      title="Salir de Presentation Mode (P / Esc)"
      className="pointer-events-auto absolute right-3 sm:right-5 bottom-3 sm:bottom-5 z-50 rounded-full bg-black/50 px-3 py-1.5 text-[10px] text-gray-300"
      style={FONT_MONO}
    >
      🎬 REC
    </motion.button>
  );
}