'use client';


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SceneSpark2() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const maxSteps = 3; // 0: Níquel, 1: Platino, 2: Iridio, 3: Conclusión

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev < maxSteps ? prev + 1 : 0));
  };

  // Autoplay con temporizador
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= maxSteps) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (currentStep === maxSteps && !isPlaying) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full min-h-[520px] flex flex-col items-center justify-center relative p-4">
      {/* Botonera FIJA en la Esquina Superior Derecha de la Pantalla */}
      <div className="fixed top-6 right-6 z-50 flex flex-col items-end gap-2">
        <button
          onClick={() => setShowControls(!showControls)}
          className="text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 px-3 py-1.5 rounded-lg transition-all shadow-lg border border-slate-700"
        >
          {showControls ? 'Ocultar Controles' : 'Mostrar Controles'}
        </button>

        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -6 }}
              className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl border border-slate-700/80"
            >
              {/* Play / Pausa */}
              <button
                onClick={togglePlay}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-medium text-xs px-3.5 py-1.5 rounded-full transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  {isPlaying ? (
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  ) : currentStep === maxSteps ? (
                    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                  ) : (
                    <path d="M8 5v14l11-7z" />
                  )}
                </svg>
                {isPlaying ? 'Pausar' : currentStep === maxSteps ? 'Reiniciar' : 'Auto Play'}
              </button>

              {/* Siguiente */}
              <button
                onClick={() => {
                  setIsPlaying(false);
                  handleNextStep();
                }}
                className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                Siguiente →
              </button>

              {/* Indicadores de Paso */}
              <div className="flex items-center gap-1.5 ml-1">
                {Array.from({ length: maxSteps + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStep(index);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      currentStep === index
                        ? 'bg-blue-500 w-4'
                        : 'bg-slate-600 hover:bg-slate-500 w-2'
                    }`}
                    aria-label={`Paso ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Canvas SVG expandido y libre de cajas tras los textos */}
      <svg
  viewBox="80 20 300 310"
  className="w-full h-auto max-w-[900px] drop-shadow-md overflow-visible"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
        <defs>
          {/* Metal estándar */}
          <linearGradient id="nickelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="45%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Platino */}
          <linearGradient id="platinumGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* Iridio */}
          <linearGradient id="iridiumGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Glow para el iridio */}
          <filter id="iridiumGlow" x="-100%" y="-30%" width="300%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* TÍTULO (Limpio, sin recuadro) */}
        <motion.g
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <text
            x="220"
            y="36"
            textAnchor="middle"
            fill="#0f172a"
            fontSize="17"
            fontWeight="800"
            letterSpacing="0.5"
          >
            GROSOR DEL ELECTRODO
          </text>

          <line
            x1="170"
            y1="48"
            x2="270"
            y2="48"
            stroke="#cbd5e1"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.g>

        {/* ELECTRODO 1 — NÍQUEL */}
        <motion.g
          initial={{ opacity: 0, y: 25 }}
          animate={{
            opacity: currentStep >= 0 ? 1 : 0,
            y: currentStep >= 0 ? 0 : 25,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* MEDIDA */}
          <text
            x="90"
            y="95"
            textAnchor="middle"
            fill="#0f172a"
            fontSize="18"
            fontWeight="700"
          >
            2.5 mm
          </text>

          {/* Línea de medición */}
          <line x1="52" y1="110" x2="128" y2="110" stroke="#64748b" strokeWidth="1.5" />
          <line x1="52" y1="104" x2="52" y2="116" stroke="#64748b" strokeWidth="1.5" />
          <line x1="128" y1="104" x2="128" y2="116" stroke="#64748b" strokeWidth="1.5" />

          {/* ELECTRODO */}
          <rect
            x="58"
            y="130"
            width="64"
            height="135"
            rx="6"
            fill="url(#nickelGrad)"
            stroke="#475569"
            strokeWidth="1.2"
          />

          {/* Reflejo */}
          <rect
            x="76"
            y="135"
            width="10"
            height="125"
            rx="5"
            fill="#ffffff"
            opacity="0.25"
          />

          {/* Etiqueta flotante */}
          <text
            x="90"
            y="302"
            textAnchor="middle"
            fill="#334155"
            fontSize="15"
            fontWeight="800"
          >
            NÍQUEL
          </text>
        </motion.g>

        {/* ELECTRODO 2 — PLATINO */}
        <motion.g
          initial={{ opacity: 0, y: 25 }}
          animate={{
            opacity: currentStep >= 1 ? 1 : 0,
            y: currentStep >= 1 ? 0 : 25,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* MEDIDA */}
          <text
            x="220"
            y="95"
            textAnchor="middle"
            fill="#0f172a"
            fontSize="18"
            fontWeight="700"
          >
            1.1 mm
          </text>

          {/* Línea de medición */}
          <line x1="195" y1="110" x2="245" y2="110" stroke="#64748b" strokeWidth="1.5" />
          <line x1="195" y1="104" x2="195" y2="116" stroke="#64748b" strokeWidth="1.5" />
          <line x1="245" y1="104" x2="245" y2="116" stroke="#64748b" strokeWidth="1.5" />

          {/* ELECTRODO */}
          <rect
            x="202"
            y="150"
            width="36"
            height="115"
            rx="5"
            fill="url(#platinumGrad)"
            stroke="#64748b"
            strokeWidth="1.2"
          />

          {/* Reflejo */}
          <rect
            x="212"
            y="155"
            width="6"
            height="105"
            rx="3"
            fill="#ffffff"
            opacity="0.45"
          />

          {/* Etiqueta flotante */}
          <text
            x="220"
            y="302"
            textAnchor="middle"
            fill="#334155"
            fontSize="15"
            fontWeight="800"
          >
            PLATINO
          </text>
        </motion.g>

        {/* ELECTRODO 3 — IRIDIO */}
        <motion.g
          initial={{ opacity: 0, y: 25 }}
          animate={{
            opacity: currentStep >= 2 ? 1 : 0,
            y: currentStep >= 2 ? 0 : 25,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* MEDIDA */}
          <text
            x="350"
            y="95"
            textAnchor="middle"
            fill="#0f172a"
            fontSize="18"
            fontWeight="700"
          >
            0.6 mm
          </text>

          {/* Línea de medición */}
          <line x1="330" y1="110" x2="370" y2="110" stroke="#2563eb" strokeWidth="1.5" />
          <line x1="330" y1="104" x2="330" y2="116" stroke="#2563eb" strokeWidth="1.5" />
          <line x1="370" y1="104" x2="370" y2="116" stroke="#2563eb" strokeWidth="1.5" />

          {/* Glow sutil */}
          {currentStep >= 2 && (
            <motion.rect
              x="334"
              y="160"
              width="32"
              height="105"
              rx="16"
              fill="#3b82f6"
              opacity="0.12"
              filter="url(#iridiumGlow)"
              animate={{ opacity: [0.05, 0.18, 0.05] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* ELECTRODO FINO */}
          <rect
            x="346"
            y="175"
            width="8"
            height="90"
            rx="4"
            fill="url(#iridiumGrad)"
            stroke="#334155"
            strokeWidth="1"
          />

          {/* Reflejo */}
          <rect
            x="348.5"
            y="180"
            width="2"
            height="80"
            rx="1"
            fill="#ffffff"
            opacity="0.8"
          />

          {/* Etiqueta flotante */}
          <text
            x="350"
            y="302"
            textAnchor="middle"
            fill="#2563eb"
            fontSize="15"
            fontWeight="800"
          >
            IRIDIO
          </text>
        </motion.g>

        {/* CONCLUSIÓN (Limpia, flotante sin cuadro) */}
        {currentStep === 3 && (
          <motion.g
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <line x1="60" y1="326" x2="380" y2="326" stroke="#cbd5e1" strokeWidth="1" />

            <text
              x="220"
              y="348"
              textAnchor="middle"
              fill="#1e293b"
              fontSize="13"
              fontWeight="700"
            >
              MENOR GROSOR → MAYOR CONCENTRACIÓN DEL CAMPO ELÉCTRICO
            </text>
          </motion.g>
        )}
      </svg>
    </div>
  );
}