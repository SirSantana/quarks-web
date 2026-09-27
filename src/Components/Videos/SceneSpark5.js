'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SceneSpark5() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const maxSteps = 4;

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev < maxSteps ? prev + 1 : 0));
  };

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
      }, 2600);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (currentStep === maxSteps && !isPlaying) setCurrentStep(0);
    setIsPlaying(!isPlaying);
  };

  // Valores según el paso
  const getValues = () => {
    switch (currentStep) {
      case 0:
        return { nickel: 0, platinum: 0, iridium: 0, showWarning: false };
      case 1:
        return { nickel: 30000, platinum: 40000, iridium: 50000, showWarning: false };
      case 2:
        return { nickel: 30000, platinum: 80000, iridium: 90000, showWarning: true };
      case 3:
        return { nickel: 30000, platinum: 100000, iridium: 120000, showWarning: true };
      case 4:
        return { nickel: 30000, platinum: 100000, iridium: 120000, showWarning: true };
      default:
        return { nickel: 0, platinum: 0, iridium: 0, showWarning: false };
    }
  };

  const values = getValues();

  // Porcentaje de barra (máximo visual = 120.000 km)
  const maxKm = 120000;
  const nickelWidth = (values.nickel / maxKm) * 220;
  const platinumWidth = (values.platinum / maxKm) * 220;
  const iridiumWidth = (values.iridium / maxKm) * 220;

  return (
    <div className="w-full min-h-[600px] flex flex-col items-center justify-center relative p-4 bg-white">
      {/* CONTROLES */}
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

              <button
                onClick={() => {
                  setIsPlaying(false);
                  handleNextStep();
                }}
                className="text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                Siguiente →
              </button>

              <div className="flex items-center gap-1.5 ml-1">
                {Array.from({ length: maxSteps + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStep(i);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      currentStep === i ? 'bg-blue-500 w-4' : 'bg-slate-600 hover:bg-slate-500 w-2'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

       <svg
  viewBox="80 20 300 310"
  className="w-full h-auto max-w-[900px] drop-shadow-md overflow-visible"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
    {/* ========================================================= */}
    {/* DEFINICIONES */}
    {/* ========================================================= */}

    <defs>
      <linearGradient
        id="metalGradVoltage"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="50%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>

      <filter
        id="voltageGlow"
        x="-100%"
        y="-100%"
        width="300%"
        height="300%"
      >
        <feGaussianBlur stdDeviation="3" result="blur" />

        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* ========================================================= */}
    {/* TÍTULO */}
    {/* ========================================================= */}

    <motion.g
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <text
        x="200"
        y="34"
        textAnchor="middle"
        fill="#0f172a"
        fontSize="18"
        fontWeight="700"
      >
        UN GAP MAYOR EXIGE MÁS VOLTAJE
      </text>

      <line
        x1="120"
        y1="47"
        x2="280"
        y2="47"
        stroke="#cbd5e1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.g>

    {/* ========================================================= */}
    {/* INDICADOR DE PROCESO */}
    {/* ========================================================= */}

    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Línea base */}
      <line
        x1="85"
        y1="82"
        x2="315"
        y2="82"
        stroke="#e2e8f0"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Línea de progreso */}
      <motion.line
        x1="85"
        y1="82"
        y2="82"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeLinecap="round"
        animate={{
          x2:
            currentStep === 0
              ? 85
              : currentStep === 1
              ? 200
              : 315
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
      />

      {/* ===================================================== */}
      {/* PASO 1 */}
      {/* ===================================================== */}

      {currentStep === 0 && (
        <motion.circle
          cx="85"
          cy="82"
          r="13"
          fill="#3b82f6"
          animate={{
            r: [10, 15, 10],
            opacity: [0.1, 0.22, 0.1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        />
      )}

      <motion.circle
        cx="85"
        cy="82"
        animate={{
          r: currentStep === 0 ? 8 : 5,
          fill: currentStep === 0 ? "#2563eb" : "#cbd5e1",
          opacity: currentStep === 0 ? 1 : 0.55
        }}
      />

      {/* ===================================================== */}
      {/* PASO 2 */}
      {/* ===================================================== */}

      {currentStep === 1 && (
        <motion.circle
          cx="200"
          cy="82"
          r="13"
          fill="#3b82f6"
          animate={{
            r: [10, 15, 10],
            opacity: [0.1, 0.22, 0.1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        />
      )}

      <motion.circle
        cx="200"
        cy="82"
        animate={{
          r: currentStep === 1 ? 8 : 5,
          fill: currentStep === 1 ? "#2563eb" : "#cbd5e1",
          opacity: currentStep === 1 ? 1 : 0.55
        }}
      />

      {/* ===================================================== */}
      {/* PASO 3 */}
      {/* ===================================================== */}

      {currentStep === 2 && (
        <motion.circle
          cx="315"
          cy="82"
          r="13"
          fill="#3b82f6"
          animate={{
            r: [10, 15, 10],
            opacity: [0.1, 0.22, 0.1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        />
      )}

      <motion.circle
        cx="315"
        cy="82"
        animate={{
          r: currentStep === 2 ? 8 : 5,
          fill: currentStep === 2 ? "#2563eb" : "#cbd5e1",
          opacity: currentStep === 2 ? 1 : 0.55
        }}
      />

      {/* ETIQUETAS */}

      <motion.text
        x="85"
        y="110"
        textAnchor="middle"
        animate={{
          fill: currentStep === 0 ? "#0f172a" : "#94a3b8",
          opacity: currentStep === 0 ? 1 : 0.5
        }}
        fontSize={currentStep === 0 ? 13 : 11}
        fontWeight={currentStep === 0 ? 700 : 500}
      >
        GAP NORMAL
      </motion.text>

      <motion.text
        x="200"
        y="110"
        textAnchor="middle"
        animate={{
          fill: currentStep === 1 ? "#0f172a" : "#94a3b8",
          opacity: currentStep === 1 ? 1 : 0.5
        }}
        fontSize={currentStep === 1 ? 13 : 11}
        fontWeight={currentStep === 1 ? 700 : 500}
      >
        GAP MAYOR
      </motion.text>

      <motion.text
        x="315"
        y="110"
        textAnchor="middle"
        animate={{
          fill: currentStep === 2 ? "#0f172a" : "#94a3b8",
          opacity: currentStep === 2 ? 1 : 0.5
        }}
        fontSize={currentStep === 2 ? 13 : 11}
        fontWeight={currentStep === 2 ? 700 : 500}
      >
        MÁS VOLTAJE
      </motion.text>
    </motion.g>

    {/* ========================================================= */}
    {/* BOBINA */}
    {/* ========================================================= */}

    <motion.g
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cuerpo */}
      <rect
        x="65"
        y="155"
        width="80"
        height="85"
        rx="10"
        fill="#f8fafc"
        stroke="#64748b"
        strokeWidth="1.5"
      />

      {/* Bobinado */}
      <line x1="82" y1="170" x2="82" y2="220" stroke="#94a3b8" strokeWidth="3" />
      <line x1="92" y1="165" x2="92" y2="225" stroke="#94a3b8" strokeWidth="3" />
      <line x1="102" y1="165" x2="102" y2="225" stroke="#94a3b8" strokeWidth="3" />
      <line x1="112" y1="165" x2="112" y2="225" stroke="#94a3b8" strokeWidth="3" />
      <line x1="122" y1="170" x2="122" y2="220" stroke="#94a3b8" strokeWidth="3" />

      {/* Etiqueta */}
      <text
        x="105"
        y="265"
        textAnchor="middle"
        fill="#334155"
        fontSize="13"
        fontWeight="600"
      >
        BOBINA
      </text>

      {/* Pulso interno */}
      {currentStep >= 1 && (
        <motion.rect
          x="72"
          y="150"
          width="66"
          height="95"
          rx="12"
          fill="#3b82f6"
          animate={{
            opacity:
              currentStep === 1
                ? [0.03, 0.12, 0.03]
                : [0.08, 0.28, 0.08]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity
          }}
        />
      )}
    </motion.g>

    {/* ========================================================= */}
    {/* FLUJO DE ENERGÍA */}
    {/* ========================================================= */}

    <line
      x1="150"
      y1="197"
      x2="245"
      y2="197"
      stroke="#e2e8f0"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {currentStep >= 1 && (
      <motion.circle
        cy="197"
        r={currentStep === 2 ? 7 : 5}
        fill="#3b82f6"
        filter="url(#voltageGlow)"
        animate={{
          cx: [150, 245],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: currentStep === 2 ? 0.5 : 0.9,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    )}

    {/* ========================================================= */}
    {/* BUJÍA */}
    {/* ========================================================= */}

    <motion.g
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cuerpo */}
      <rect
        x="255"
        y="145"
        width="32"
        height="80"
        rx="4"
        fill="url(#metalGradVoltage)"
        stroke="#475569"
        strokeWidth="1.2"
      />

      {/* Punta */}
      <motion.path
        animate={{
          d:
            currentStep === 0
              ? "M 255 225 L 287 225 L 282 235 L 260 235 Z"
              : currentStep === 1
              ? "M 255 225 L 287 225 L 284 235 Q 271 240 258 235 Z"
              : "M 255 225 L 287 225 L 286 236 Q 271 243 256 236 Z"
        }}
        transition={{
          duration: 0.5
        }}
        fill="url(#metalGradVoltage)"
        stroke="#475569"
        strokeWidth="1.2"
      />

      {/* Electrodo de masa */}
      <path
        d="M 245 285 L 245 260"
        stroke="url(#metalGradVoltage)"
        strokeWidth="8"
      />

      <motion.path
        stroke="url(#metalGradVoltage)"
        strokeWidth="8"
        animate={{
          d:
            currentStep === 0
              ? "M 245 245 L 265 245"
              : currentStep === 1
              ? "M 245 258 L 265 258"
              : "M 245 275 L 265 275"
        }}
        transition={{
          duration: 0.5
        }}
      />

      {/* Chispa */}
      {currentStep >= 1 && (
        <motion.path
          d={
            currentStep === 1
              ? "M 271 235 L 266 244 L 274 250 L 270 258"
              : "M 271 236 L 264 248 L 277 258 L 266 267 L 271 275"
          }
          stroke="#2563eb"
          strokeWidth={currentStep === 2 ? 3 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#voltageGlow)"
          animate={{
            opacity: [0.2, 1, 0.2]
          }}
          transition={{
            duration: 0.35,
            repeat: Infinity
          }}
        />
      )}

      <text
        x="271"
        y="305"
        textAnchor="middle"
        fill="#334155"
        fontSize="13"
        fontWeight="600"
      >
        BUJÍA
      </text>
    </motion.g>

    {/* ========================================================= */}
    {/* MEDIDOR DE VOLTAJE */}
    {/* ========================================================= */}

    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <text
        x="200"
        y="290"
        textAnchor="middle"
        fill="#64748b"
        fontSize="12"
        fontWeight="600"
      >
        VOLTAJE NECESARIO
      </text>

      {/* Barra */}
      <rect
        x="135"
        y="305"
        width="130"
        height="8"
        rx="4"
        fill="#e2e8f0"
      />

      {/* Nivel */}
      <motion.rect
        x="135"
        y="305"
        height="8"
        rx="4"
        fill="#3b82f6"
        animate={{
          width:
            currentStep === 0
              ? 40
              : currentStep === 1
              ? 78
              : 130
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
      />

      {/* Etiqueta */}
      <motion.text
        x="200"
        y="337"
        textAnchor="middle"
        animate={{
          fill: currentStep === 2 ? "#2563eb" : "#334155",
          opacity: currentStep === 2 ? 1 : 0.75
        }}
        fontSize="15"
        fontWeight="700"
      >
        {currentStep === 0 && "REQUERIMIENTO NORMAL"}
        {currentStep === 1 && "LA DEMANDA AUMENTA"}
        {currentStep === 2 && "LA BOBINA DEBE TRABAJAR MÁS"}
      </motion.text>
    </motion.g>
  </svg>  
    </div>
  );
}