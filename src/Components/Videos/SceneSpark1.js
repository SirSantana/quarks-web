'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SceneSpark1() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const maxSteps = 2; // 0: Núcleo de cobre, 1: Punta de níquel, 2: Conclusión

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
    <div className="max-w-[500px] min-h-[520px] flex flex-col items-center justify-center relative p-4">
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

      {/* SVG limpia sin cajas de fondo en los textos */}
  <svg
  viewBox="80 20 200 310"
  className="w-full h-auto max-w-[1200px] drop-shadow-md overflow-visible"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
    <defs>
      <filter
        id="cardShadow"
        x="-30%"
        y="-30%"
        width="160%"
        height="160%"
      >
        <feDropShadow
          dx="0"
          dy="3"
          stdDeviation="5"
          floodColor="#0f172a"
          floodOpacity="0.1"
        />
      </filter>

      <filter
        id="activeGlow"
        x="-40%"
        y="-40%"
        width="180%"
        height="180%"
      >
        <feDropShadow
          dx="0"
          dy="2"
          stdDeviation="5"
          floodColor="#2563eb"
          floodOpacity="0.16"
        />
      </filter>
    </defs>

    {/* ================================ */}
    {/* TÍTULO */}
    {/* ================================ */}

  
    {/* ================================ */}
    {/* MOTOR CENTRAL */}
    {/* ================================ */}

    

    {/* ================================ */}
    {/* CONECTOR */}
    {/* ================================ */}

    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      <motion.line
        x1="200"
        y1="103"
        x2="200"
        y2="125"
        stroke="#cbd5e1"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3 }}
      />

      <motion.line
        x1="70"
        y1="125"
        x2="330"
        y2="125"
        stroke="#cbd5e1"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      />

      {[90, 200, 310].map((x, index) => (
        <motion.line
          key={x}
          x1={x}
          y1="125"
          x2={x}
          y2="145"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            delay: 0.8 + index * 0.12,
            duration: 0.25
          }}
        />
      ))}
    </motion.g>

    {/* ================================ */}
    {/* COBRE */}
    {/* ================================ */}

    <motion.g
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: currentStep === 0 ? 1 : 0.32,
        y: 0,
        scale: currentStep === 0 ? 1.02 : 1
      }}
      transition={{
        delay: 1.1,
        duration: 0.35
      }}
    >
      <rect
        x="40"
        y="145"
        width="100"
        height="82"
        rx="12"
        fill={currentStep === 0 ? "#fffbeb" : "#ffffff"}
        stroke={currentStep === 0 ? "#d97706" : "#e2e8f0"}
        strokeWidth={currentStep === 0 ? "2" : "1.2"}
        filter={
          currentStep === 0
            ? "url(#activeGlow)"
            : "url(#cardShadow)"
        }
      />

      {/* Indicador */}

      <circle
        cx="55"
        cy="160"
        r="4"
        fill={currentStep === 0 ? "#d97706" : "#94a3b8"}
      />

      <text
        x="65"
        y="163"
        fill="#94a3b8"
        fontSize="7"
        fontWeight="800"
      >
        ANTIGUO
      </text>

      <text
        x="90"
        y="188"
        textAnchor="middle"
        fill="#0f172a"
        fontSize="13"
        fontWeight="800"
      >
        COBRE
      </text>

      <line
        x1="60"
        y1="199"
        x2="120"
        y2="199"
        stroke={currentStep === 0 ? "#d97706" : "#e2e8f0"}
        strokeWidth="1"
      />

      <text
        x="90"
        y="215"
        textAnchor="middle"
        fill="#64748b"
        fontSize="7"
        fontWeight="600"
      >
        CARBURADOR
      </text>
    </motion.g>

    {/* ================================ */}
    {/* PLATINO */}
    {/* ================================ */}

    <motion.g
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: currentStep === 1 ? 1 : 0.32,
        y: 0,
        scale: currentStep === 1 ? 1.02 : 1
      }}
      transition={{
        delay: 1.25,
        duration: 0.35
      }}
    >
      <rect
        x="150"
        y="145"
        width="100"
        height="82"
        rx="12"
        fill={currentStep === 1 ? "#f8fafc" : "#ffffff"}
        stroke={currentStep === 1 ? "#475569" : "#e2e8f0"}
        strokeWidth={currentStep === 1 ? "2" : "1.2"}
        filter={
          currentStep === 1
            ? "url(#activeGlow)"
            : "url(#cardShadow)"
        }
      />

      <circle
        cx="165"
        cy="160"
        r="4"
        fill={currentStep === 1 ? "#475569" : "#94a3b8"}
      />

      <text
        x="175"
        y="163"
        fill="#94a3b8"
        fontSize="7"
        fontWeight="800"
      >
        90s — 2000s
      </text>

      <text
        x="200"
        y="188"
        textAnchor="middle"
        fill="#0f172a"
        fontSize="13"
        fontWeight="800"
      >
        PLATINO
      </text>

      <line
        x1="170"
        y1="199"
        x2="230"
        y2="199"
        stroke={currentStep === 1 ? "#475569" : "#e2e8f0"}
        strokeWidth="1"
      />

      <text
        x="200"
        y="215"
        textAnchor="middle"
        fill="#64748b"
        fontSize="7"
        fontWeight="600"
      >
        INYECCIÓN
      </text>
    </motion.g>

    {/* ================================ */}
    {/* IRIDIO */}
    {/* ================================ */}

    <motion.g
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: currentStep === 2 ? 1 : 0.32,
        y: 0,
        scale: currentStep === 2 ? 1.02 : 1
      }}
      transition={{
        delay: 1.4,
        duration: 0.35
      }}
    >
      <rect
        x="260"
        y="145"
        width="100"
        height="82"
        rx="12"
        fill={currentStep === 2 ? "#eff6ff" : "#ffffff"}
        stroke={currentStep === 2 ? "#2563eb" : "#e2e8f0"}
        strokeWidth={currentStep === 2 ? "2" : "1.2"}
        filter={
          currentStep === 2
            ? "url(#activeGlow)"
            : "url(#cardShadow)"
        }
      />

      <circle
        cx="275"
        cy="160"
        r="4"
        fill={currentStep === 2 ? "#2563eb" : "#94a3b8"}
      />

      <text
        x="285"
        y="163"
        fill="#94a3b8"
        fontSize="7"
        fontWeight="800"
      >
        MODERNO
      </text>

      <text
        x="310"
        y="188"
        textAnchor="middle"
        fill="#0f172a"
        fontSize="13"
        fontWeight="800"
      >
        IRIDIO
      </text>

      <line
        x1="280"
        y1="199"
        x2="340"
        y2="199"
        stroke={currentStep === 2 ? "#2563eb" : "#e2e8f0"}
        strokeWidth="1"
      />

      <text
        x="310"
        y="215"
        textAnchor="middle"
        fill="#64748b"
        fontSize="7"
        fontWeight="600"
      >
        INYECCIÓN DI
      </text>
    </motion.g>

    {/* ================================ */}
    {/* RUTENIO */}
    {/* ================================ */}

    <motion.g
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: currentStep === 3 ? 1 : 0.32,
        y: 0
      }}
      transition={{
        delay: 1.6,
        duration: 0.35
      }}
    >
      {/* Línea de separación */}

      <line
        x1="100"
        y1="255"
        x2="300"
        y2="255"
        stroke="#e2e8f0"
        strokeWidth="1"
      />

      {/* Ruta especial */}

      <rect
        x="105"
        y="268"
        width="190"
        height="36"
        rx="10"
        fill={currentStep === 3 ? "#eff6ff" : "#ffffff"}
        stroke={currentStep === 3 ? "#2563eb" : "#e2e8f0"}
        strokeWidth={currentStep === 3 ? "1.8" : "1.2"}
        filter={
          currentStep === 3
            ? "url(#activeGlow)"
            : "url(#cardShadow)"
        }
      />

      <circle
        cx="122"
        cy="286"
        r="4"
        fill={currentStep === 3 ? "#2563eb" : "#94a3b8"}
      />

      <text
        x="135"
        y="289"
        fill="#64748b"
        fontSize="8"
        fontWeight="700"
      >
        TURBO / ALTA EXIGENCIA
      </text>

      <text
        x="280"
        y="289"
        textAnchor="end"
        fill={currentStep === 3 ? "#1d4ed8" : "#64748b"}
        fontSize="11"
        fontWeight="800"
      >
        RUTENIO
      </text>
    </motion.g>
  </svg>
    </div>
  );
}