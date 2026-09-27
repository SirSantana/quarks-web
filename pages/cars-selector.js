"use client";

import { useState, useEffect, useCallback, useRef } from "react";

/* ============================================================
   DATOS DE AUTOS
   Reemplaza este arreglo con tus artículos reales.
   "image" debe apuntar a un PNG con fondo transparente
   (por ejemplo en /public/cars/nombre.png -> "/cars/nombre.png")
   ============================================================ */
const CARS = [
  {
    name: "APEX R",
    tagline: "Pura tracción, cero excusas",
    image: "/image 2490.png",
    power: "620 hp",
    topSpeed: "312 km/h",
    accel: "2.9 s",
    price: "$1,850,000",
    color: "#FF5A1F",
  },
  {
    name: "SOLSTICE GT",
    tagline: "Elegancia que rompe el viento",
    image: "/image 2491.png",
    power: "480 hp",
    topSpeed: "290 km/h",
    accel: "3.4 s",
    price: "$1,320,000",
    color: "#3EC7E0",
  },
  {
    name: "RAPTOR X",
    tagline: "Hecho para el asfalto salvaje",
    image: "/image 2491.png",
    power: "710 hp",
    topSpeed: "320 km/h",
    accel: "2.6 s",
    price: "$2,140,000",
    color: "#FFD23F",
  },
  {
    name: "NEBULA S",
    tagline: "Silencio eléctrico, furia instantánea",
    image: "/cars/nebula-s.png",
    power: "590 hp",
    topSpeed: "260 km/h",
    accel: "3.1 s",
    price: "$1,610,000",
    color: "#8B5CF6",
  },
  {
    name: "TITAN V8",
    tagline: "El rugido que precede a la leyenda",
    image: "/cars/titan-v8.png",
    power: "650 hp",
    topSpeed: "305 km/h",
    accel: "3.0 s",
    price: "$1,980,000",
    color: "#EF4444",
  },
];

/* Iconos simples en SVG, sin dependencias externas */
function IconGauge(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
      <path d="M12 12 16 8" strokeLinecap="round" />
      <path d="M3 12h1.5M12 3v1.5M20.5 12H19M12 21v-1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconSpeed(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M3 13a9 9 0 0 1 18 0" strokeLinecap="round" />
      <path d="M3 13h18" strokeLinecap="round" />
      <circle cx="12" cy="13" r="1.4" fill="currentColor" stroke="none" />
      <path d="M12 13 16.5 8.5" strokeLinecap="round" />
    </svg>
  );
}
function IconClock(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" strokeLinecap="round" />
    </svg>
  );
}
function IconTag(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M3 12 12 3h6a3 3 0 0 1 3 3v6l-9 9a2 2 0 0 1-2.8 0L3 14.8a2 2 0 0 1 0-2.8Z" />
      <circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconChevron({ dir = "right", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path
        d={dir === "right" ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CarSelectorPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 izquierda, 1 derecha
  const [animKey, setAnimKey] = useState(0);
  const [flash, setFlash] = useState(0);
  const touchStartX = useRef(null);

  const total = CARS.length;
  const car = CARS[index];
  const prevCar = CARS[(index - 1 + total) % total];
  const nextCar = CARS[(index + 1) % total];

  const goTo = useCallback(
    (newIndex) => {
      if (newIndex === index) return;
      setDirection(newIndex > index ? 1 : -1);
      setIndex((newIndex + total) % total);
      setAnimKey((k) => k + 1);
      setFlash((f) => f + 1);
    },
    [index, total]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) prev();
    else if (delta < -50) next();
    touchStartX.current = null;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0A0D12] text-[#F5F6F8] selection:bg-[#FF5A1F] selection:text-black">
      {/* Fuentes: Rajdhani para display estilo automotriz, Inter para UI */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap");

        html,
        body {
          background: #0a0d12;
          font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
        }
        .font-display {
          font-family: "Rajdhani", "Inter", sans-serif;
        }

        /* Auto central entrando */
        @keyframes car-in-right {
          from {
            opacity: 0;
            transform: translateX(10%) scale(0.85) rotate(2deg);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1) rotate(0deg);
            filter: blur(0);
          }
        }
        @keyframes car-in-left {
          from {
            opacity: 0;
            transform: translateX(-10%) scale(0.85) rotate(-2deg);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1) rotate(0deg);
            filter: blur(0);
          }
        }
        .anim-car-right {
          animation: car-in-right 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .anim-car-left {
          animation: car-in-left 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Título entrando con leve rebote y brillo de encendido */
        @keyframes title-in {
          0% {
            opacity: 0;
            transform: translateY(-14px) scale(0.94);
            letter-spacing: 0.02em;
          }
          60% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .anim-title {
          animation: title-in 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Anillo de energía girando detrás del auto */
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .spin-slow {
          animation: spin-slow 14s linear infinite;
        }

        /* Halo de piso respirando, como motor en ralentí */
        @keyframes idle-glow {
          0%,
          100% {
            opacity: 0.45;
            transform: scaleX(1);
          }
          50% {
            opacity: 0.8;
            transform: scaleX(1.08);
          }
        }
        .idle-glow {
          animation: idle-glow 3s ease-in-out infinite;
        }

        /* Destello de velocidad al cambiar de auto */
        @keyframes speed-flash {
          0% {
            opacity: 0;
            transform: scaleX(0.3);
          }
          15% {
            opacity: 0.9;
          }
          100% {
            opacity: 0;
            transform: scaleX(1.4);
          }
        }
        .speed-line {
          animation: speed-flash 0.5s ease-out forwards;
        }

        /* Marcos de esquina pulsando, tipo HUD de selección */
        @keyframes bracket-pulse {
          0%,
          100% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.9;
          }
        }
        .bracket-pulse {
          animation: bracket-pulse 2.4s ease-in-out infinite;
        }

        @keyframes float-y {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .float-y {
          animation: float-y 3.4s ease-in-out infinite;
        }
      `}</style>

      {/* Textura de fondo: rejilla sutil + viñeta de garage */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 90%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,0,0,0.75), transparent 60%)",
        }}
      />

      {/* Destellos de velocidad al cambiar de auto */}
      <div key={`flash-${flash}`} className="pointer-events-none absolute inset-0 z-30">
        <div className="speed-line absolute left-0 top-[38%] h-[2px] w-full bg-white/70" />
        <div className="speed-line absolute left-0 top-[50%] h-[1px] w-full bg-white/40" style={{ animationDelay: "0.03s" }} />
        <div className="speed-line absolute left-0 top-[62%] h-[2px] w-full bg-white/60" style={{ animationDelay: "0.06s" }} />
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#FF5A1F]" />
          <span className="font-display text-lg font-semibold tracking-[0.25em] text-white/80">
            SHOWROOM
          </span>
        </div>
        <div className="font-display text-sm tracking-[0.3em] text-white/50">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </header>

      {/* Nombre gigante, elevado y siempre completo en pantalla */}
      <div className="relative z-10 mt-2 flex justify-center px-4 sm:mt-4">
        <h1
          key={`title-${animKey}`}
          className="anim-title font-display select-none text-center font-bold uppercase leading-[0.9] tracking-tighter"
          style={{
            fontSize: "clamp(2.75rem, 11vw, 8rem)",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.16)",
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.01))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            textShadow: `0 0 40px ${car.color}33`,
          }}
        >
          {car.name}
        </h1>
      </div>

      {/* Escenario: selector con autos laterales visibles */}
      <main
        className="relative z-10 mx-auto -mt-4 flex h-[52vh] max-w-6xl select-none items-center justify-center sm:h-[54vh]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Anillo de energía girando */}
        <div
          className="spin-slow pointer-events-none absolute h-[60%] w-[60%] max-w-sm rounded-full opacity-30"
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, ${car.color} 8%, transparent 20%, transparent 50%, ${car.color} 58%, transparent 70%)`,
            filter: "blur(2px)",
          }}
        />

        {/* Halo de piso */}
        <div
          className="idle-glow pointer-events-none absolute bottom-[6%] h-14 w-[46%] max-w-xs rounded-[100%] blur-2xl"
          style={{ backgroundColor: car.color, opacity: 0.4 }}
        />
        <div className="pointer-events-none absolute bottom-[5%] h-3 w-[38%] max-w-[15rem] rounded-[100%] bg-black/70 blur-md" />

        {/* Marcos de esquina, estilo HUD de selección */}
        <Corner className="left-[6%] top-[4%] sm:left-[14%]" rotate={0} color={car.color} />
        <Corner className="right-[6%] top-[4%] sm:right-[14%]" rotate={90} color={car.color} />
        <Corner className="bottom-[8%] left-[6%] sm:left-[14%]" rotate={270} color={car.color} />
        <Corner className="bottom-[8%] right-[6%] sm:right-[14%]" rotate={180} color={car.color} />

        {/* Auto anterior, visible del lado izquierdo */}
        <button
          onClick={prev}
          aria-label={`Ver ${prevCar.name}`}
          className="group absolute left-[-2%] top-1/2 z-10 w-[30%] -translate-y-1/2 opacity-40 grayscale transition-all duration-300 hover:opacity-70 hover:grayscale-0 sm:left-[6%] sm:w-[24%]"
        >
          <img
            src={prevCar.image}
            alt={prevCar.name}
            className="w-full scale-90 object-contain blur-[1px] transition group-hover:blur-0"
            draggable={false}
          />
        </button>

        {/* Auto siguiente, visible del lado derecho */}
        <button
          onClick={next}
          aria-label={`Ver ${nextCar.name}`}
          className="group absolute right-[-2%] top-1/2 z-10 w-[30%] -translate-y-1/2 scale-x-[-1] opacity-40 grayscale transition-all duration-300 hover:opacity-70 hover:grayscale-0 sm:right-[6%] sm:w-[24%]"
        >
          <img
            src={nextCar.image}
            alt={nextCar.name}
            className="w-full scale-90 object-contain blur-[1px] transition group-hover:blur-0"
            draggable={false}
          />
        </button>

        {/* Auto central */}
        <img
          key={`img-${animKey}`}
          src={car.image}
          alt={car.name}
          className={`float-y relative z-20 w-[62%] max-w-lg select-none object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] sm:w-[46%] ${
            direction === -1 ? "anim-car-left" : "anim-car-right"
          }`}
          draggable={false}
        />

        {/* Botón anterior */}
        <button
          onClick={prev}
          aria-label="Auto anterior"
          className="group absolute left-0 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur transition hover:scale-110 hover:border-[#FF5A1F]/70 hover:bg-[#FF5A1F]/10 active:scale-95 sm:h-16 sm:w-16"
        >
          <IconChevron
            dir="left"
            className="h-6 w-6 text-white/60 transition group-hover:text-[#FF5A1F]"
          />
        </button>

        {/* Botón siguiente */}
        <button
          onClick={next}
          aria-label="Siguiente auto"
          className="group absolute right-0 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur transition hover:scale-110 hover:border-[#FF5A1F]/70 hover:bg-[#FF5A1F]/10 active:scale-95 sm:h-16 sm:w-16"
        >
          <IconChevron
            dir="right"
            className="h-6 w-6 text-white/60 transition group-hover:text-[#FF5A1F]"
          />
        </button>
      </main>

      {/* Tagline + specs + CTA */}
      <section className="relative z-20 mx-auto max-w-3xl px-6 pb-6 text-center sm:px-10">
        <p key={`tag-${animKey}`} className="anim-title font-display text-sm uppercase tracking-[0.35em] text-white/50">
          {car.tagline}
        </p>

        <div className="mx-auto mt-5 grid max-w-xl grid-cols-4 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur sm:gap-6 sm:p-5">
          <Stat icon={<IconGauge className="h-5 w-5" />} label="Potencia" value={car.power} />
          <Stat icon={<IconSpeed className="h-5 w-5" />} label="Vel. máx" value={car.topSpeed} />
          <Stat icon={<IconClock className="h-5 w-5" />} label="0–100" value={car.accel} />
          <Stat icon={<IconTag className="h-5 w-5" />} label="Precio" value={car.price} />
        </div>

        <button
          className="font-display mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:brightness-110 active:scale-95"
          style={{ backgroundColor: car.color, boxShadow: `0 0 30px ${car.color}55` }}
        >
          Ver ficha completa
        </button>
      </section>

      {/* Franja de miniaturas */}
      <footer className="relative z-20 flex justify-center gap-3 pb-8">
        {CARS.map((c, i) => (
          <button
            key={c.name}
            onClick={() => goTo(i)}
            aria-label={`Seleccionar ${c.name}`}
            className={`relative h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-white" : "w-4 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </footer>
    </div>
  );
}

function Corner({ className = "", rotate = 0, color = "#FF5A1F" }) {
  return (
    <div
      className={`bracket-pulse pointer-events-none absolute z-30 h-6 w-6 sm:h-8 sm:w-8 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        className="absolute left-0 top-0 h-full w-[2px]"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute left-0 top-0 h-[2px] w-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="text-white/40">{icon}</div>
      <div className="font-display text-base font-semibold text-white sm:text-lg">{value}</div>
      <div className="text-[10px] uppercase tracking-[0.15em] text-white/35">{label}</div>
    </div>
  );
}