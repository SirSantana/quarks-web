'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gauge, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Wind, 
  Flame, 
  Compass, 
  Zap 
} from 'lucide-react';

// Configuración de las 4 fases del ciclo de 4 tiempos del pistón
const PISTON_STEPS = [
  {
    id: 1,
    title: "1. ADMISIÓN (BADAJA DEL PISTÓN)",
    subtitle: "Válvula de Admisión Abierta",
    badge: "MEZCLA: Aire + Gasolina",
    badgeIcon: Wind,
    color: "text-blue-500",
    description: "El pistón desciende hacia el Punto Muerto Inferior (PMI), creando vacío. La válvula de admisión se abre e ingresa la mezcla fresca de aire y combustible.",
    technicalData: "Presión: < 1 bar (Vacío)"
  },
  {
    id: 2,
    title: "2. COMPRESIÓN (SUBIDA)",
    subtitle: "Válvulas Cerradas • PMS",
    badge: "PRESIÓN: High PSI",
    badgeIcon: Gauge,
    color: "text-blue-600",
    description: "Ambas válvulas se cierran. El pistón asciende hacia el Punto Muerto Superior (PMS), comprimiendo la mezcla para aumentar su temperatura y reactividad.",
    technicalData: "Relación de Compresión 10:1"
  },
  {
    id: 3,
    title: "3. EXPLOSIÓN / EXPANSIÓN",
    subtitle: "Carrera de Potencia",
    badge: "TEMP: ~2,000 °C",
    badgeIcon: Flame,
    color: "text-orange-500",
    description: "La bujía genera la chispa. La violenta expansión de los gases empuja el pistón con fuerza hacia abajo, transmitiendo energía mecánica al cigüeñal.",
    technicalData: "Fuerza de Empuje: Máxima"
  },
  {
    id: 4,
    title: "4. ESCAPE (LIMPIEZA)",
    subtitle: "Válvula de Escape Abierta",
    badge: "GASES: Evacuación",
    badgeIcon: Zap,
    color: "text-slate-600",
    description: "La válvula de escape se abre. El pistón sube nuevamente expulsando los gases quemados hacia el múltiple de escape, dejando el cilindro listo para repetir el ciclo.",
    technicalData: "Escape Abierto: 100%"
  }
];

export default function PistonExplainer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Intervalo para auto-play (pantalla vertical 9:16)
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % PISTON_STEPS.length);
      }, 3600);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % PISTON_STEPS.length);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev - 1 + PISTON_STEPS.length) % PISTON_STEPS.length);
  };

  const activeData = PISTON_STEPS[currentStep];
  const BadgeIcon = activeData.badgeIcon;

  // Cinemática dinámica basada en la fase del motor
  // Paso 0: Admisión -> Pistón abajo (Y alto), cigüeñal a 180°
  // Paso 1: Compresión -> Pistón arriba (Y bajo), cigüeñal a 0°
  // Paso 2: Explosión -> Pistón abajo (Y alto), cigüeñal a 180°
  // Paso 3: Escape -> Pistón arriba (Y bajo), cigüeñal a 360°
  const pistonY = (currentStep === 0 || currentStep === 2) ? 65 : 0;
  const crankRotation = currentStep * 180;

  return (
    <main className="w-full min-h-screen bg-slate-900 flex items-center justify-center p-2 md:p-4 font-sans select-none">
      {/* Contenedor principal 9:16 optimizado para vista vertical */}
      <div className="w-full max-w-[420px] h-[860px] bg-white rounded-[32px] shadow-2xl border border-slate-200/80 flex flex-col justify-between p-6 relative overflow-hidden">
        
        {/* HEADER */}
        <header className="flex flex-col items-center text-center space-y-1 z-10 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] font-bold tracking-widest text-slate-600 uppercase">
              Mecánica Automotriz
            </span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase pt-1">
            ¿Cómo Funciona un Pistón?
          </h1>

          <p className="text-xs font-semibold text-slate-400 tracking-wide">
            EL CICLO DE 4 TIEMPOS DEL MOTOR
          </p>
        </header>

        {/* ÁREA DE ANIMACIÓN PRINCIPAL (CORE VISUAL) */}
        <div className="relative flex-1 flex flex-col items-center justify-center my-2 bg-slate-50 rounded-2xl border border-slate-100 p-4 overflow-hidden">
          
          {/* Badge Técnico Flotante */}
          <div className="absolute top-3 left-3 z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white shadow-md border border-slate-200/80"
              >
                <BadgeIcon className={`w-3.5 h-3.5 ${activeData.color}`} />
                <span className="text-[11px] font-extrabold text-slate-800 tracking-wider">
                  {activeData.badge}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* SVG INTERACTIVO DEL PISTÓN Y CILINDRO */}
          <div className="w-full h-full max-h-[370px] flex items-center justify-center relative">
            <svg
              viewBox="0 0 220 340"
              className="w-full h-full drop-shadow-sm"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Degradados metálicos técnicos */}
                <linearGradient id="pistonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#94a3b8" />
                  <stop offset="50%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>

                <linearGradient id="rodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="50%" stopColor="#64748b" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>

                <linearGradient id="cylinderWall" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#f1f5f9" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.4" />
                </linearGradient>

                <filter id="glowFire" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 1. PAREDES DEL CILINDRO Y CÁMARA */}
              <rect x="40" y="40" width="140" height="200" fill="url(#cylinderWall)" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4" />
              <path d="M 30 40 L 190 40 L 190 30 L 30 30 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />

              {/* 2. VÁLVULAS DE CABEZA */}
              {/* Válvula de Admisión (Izquierda) */}
              <motion.g
                animate={{ y: currentStep === 0 ? 10 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <rect x="62" y="15" width="6" height="30" fill="#64748b" />
                <path d="M 52 45 L 78 45 L 72 40 L 58 40 Z" fill="#475569" />
              </motion.g>

              {/* Válvula de Escape (Derecha) */}
              <motion.g
                animate={{ y: currentStep === 3 ? 10 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <rect x="152" y="15" width="6" height="30" fill="#64748b" />
                <path d="M 142 45 L 168 45 L 162 40 L 148 40 Z" fill="#475569" />
              </motion.g>

              {/* Bujía Central Superior */}
              <rect x="106" y="10" width="8" height="32" fill="#334155" />
              <rect x="104" y="20" width="12" height="15" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="0.5" />
              <rect x="108" y="42" width="4" height="4" fill="#f59e0b" />

              {/* 3. EFECTOS DINÁMICOS DENTRO DE LA CÁMARA */}
              
              {/* Paso 1: Entrada de Aire/Combustible (Admisión) */}
              {currentStep === 0 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <path d="M 55 42 Q 65 60 75 75" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
                  <motion.circle cx="65" cy="65" r="15" fill="#60a5fa" opacity="0.25" filter="url(#glowFire)" />
                </motion.g>
              )}

              {/* Paso 2: Mezcla Comprimida */}
              {currentStep === 1 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <rect x="42" y="42" width="136" height="25" fill="#93c5fd" opacity="0.3" />
                </motion.g>
              )}

              {/* Paso 3: Explosión e Ignición */}
              {currentStep === 2 && (
                <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                  {/* Chispa en Bujía */}
                  <circle cx="110" cy="45" r="8" fill="#ffffff" filter="url(#glowFire)" />
                  {/* Fuego de combustión expansivo */}
                  <path
                    d="M 42 42 L 178 42 L 178 105 L 42 105 Z"
                    fill="#f97316"
                    opacity="0.65"
                    filter="url(#glowFire)"
                  />
                  <path
                    d="M 60 42 L 160 42 L 140 85 L 80 85 Z"
                    fill="#eab308"
                    opacity="0.8"
                    filter="url(#glowFire)"
                  />
                </motion.g>
              )}

              {/* Paso 4: Evacuación de Escape */}
              {currentStep === 3 && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <path d="M 145 70 Q 155 55 165 42" stroke="#64748b" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
                  <rect x="42" y="42" width="136" height="25" fill="#94a3b8" opacity="0.2" />
                </motion.g>
              )}

              {/* 4. CONJUNTO PISTÓN, BIELA Y CIGÜEÑAL (ANIMADOS) */}
              <motion.g
                id="piston-assembly"
                animate={{ y: pistonY }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
              >
                {/* Cuerpo del Pistón */}
                <rect x="44" y="65" width="132" height="65" rx="4" fill="url(#pistonGrad)" stroke="#475569" strokeWidth="1.5" />
                
                {/* Anillos de Compresión (Rings) */}
                <line x1="44" y1="73" x2="176" y2="73" stroke="#334155" strokeWidth="1.5" />
                <line x1="44" y1="80" x2="176" y2="80" stroke="#334155" strokeWidth="1.5" />
                <line x1="44" y1="87" x2="176" y2="87" stroke="#334155" strokeWidth="1.5" />

                {/* Bulón del Pistón (Piston Pin) */}
                <circle cx="110" cy="98" r="9" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
                <circle cx="110" cy="98" r="4" fill="#475569" />

                {/* Biela (Connecting Rod) */}
                <path d="M 104 98 L 106 200 L 114 200 L 116 98 Z" fill="url(#rodGrad)" stroke="#1e293b" strokeWidth="1" />
              </motion.g>

              {/* 5. CIGÜEÑAL (CRANKSHAFT ROTATIVO) */}
              <g id="crankshaft" transform="translate(110, 265)">
                {/* Eje Central Fijo */}
                <circle cx="0" cy="0" r="28" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
                
                {/* Contrapeso Rotativo */}
                <motion.g
                  animate={{ rotate: crankRotation }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                >
                  <path d="M -22 -5 A 25 25 0 0 0 22 -5 Z" fill="#64748b" stroke="#334155" strokeWidth="1" />
                  {/* Muñón de biela en el cigüeñal */}
                  <circle cx="0" cy="-15" r="7" fill="#cbd5e1" stroke="#1e293b" strokeWidth="1.5" />
                </motion.g>
              </g>

            </svg>
          </div>

          {/* Etiqueta Técnica Inferior */}
          <div className="absolute bottom-2 text-center">
            <span className="text-[10px] font-mono font-bold text-slate-500 bg-white/90 px-2.5 py-1 rounded-full border border-slate-200 shadow-sm uppercase tracking-wider">
              {activeData.technicalData}
            </span>
          </div>
        </div>

        {/* TARJETA DE TEXTO EDUCATIVA */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 min-h-[125px] flex flex-col justify-between relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-1"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900 tracking-wide">
                  {activeData.title}
                </h3>
                <span className="text-[10px] font-bold text-slate-400">
                  {activeData.id} / {PISTON_STEPS.length}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">
                {activeData.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Indicador de progreso (Dots) */}
          <div className="flex justify-center gap-1.5 pt-3">
            {PISTON_STEPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? "w-6 bg-blue-600"
                    : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Ir al paso ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CONTROLES DE NAVEGACIÓN Y REPRODUCCIÓN */}
        <footer className="pt-3 flex items-center justify-between gap-2">
          {/* Botones de Paso Manual */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 transition-all shadow-sm text-slate-700"
              title="Paso Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 transition-all shadow-sm text-slate-700"
              title="Siguiente Paso"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Botón de Reproducción Automática para Grabar */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-sm active:scale-95 ${
              isPlaying
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pausar Demo</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Auto Demo</span>
              </>
            )}
          </button>

          {/* Reiniciar */}
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentStep(0);
            }}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 transition-all shadow-sm text-slate-400 hover:text-slate-700"
            title="Reiniciar"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </footer>

      </div>
</ main>
  );
}