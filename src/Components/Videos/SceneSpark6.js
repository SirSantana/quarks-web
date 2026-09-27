'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SceneSpark6() {
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
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (currentStep === maxSteps && !isPlaying) setCurrentStep(0);
    setIsPlaying(!isPlaying);
  };

  // Progreso de erosión (solo afecta al platino simple)
  const erosion = Math.min(currentStep / 3, 1); // 0 → 1

  return (
    <div className="w-full min-h-[580px] flex flex-col items-center justify-center relative p-4 bg-white">
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
        id="metalOdometer"
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
        id="blueGlowLife"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
      >
        <feGaussianBlur stdDeviation="4" result="blur" />

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
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <text
        x="250"
        y="42"
        textAnchor="middle"
        fill="#0f172a"
        fontSize="22"
        fontWeight="700"
      >
        ¿CUÁNTO DURA CADA BUJÍA?
      </text>

      <line
        x1="175"
        y1="58"
        x2="325"
        y2="58"
        stroke="#cbd5e1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.g>

    {/* ========================================================= */}
    {/* AUTO 1 — NÍQUEL */}
    {/* ========================================================= */}

    <motion.g
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: currentStep === 0 ? 1 : 0.4,
        x: 0
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Fondo fila */}
      <rect
        x="35"
        y="85"
        width="430"
        height="85"
        rx="12"
        fill={currentStep === 0 ? "#f8fafc" : "#ffffff"}
        stroke={currentStep === 0 ? "#bfdbfe" : "#e2e8f0"}
        strokeWidth="1.5"
      />

      {/* Auto */}
      <g transform="translate(55 105)">
        <path
          d="M 5 32
             L 10 18
             Q 12 13 22 13
             L 48 13
             Q 55 13 60 20
             L 68 32
             Z"
          fill="url(#metalOdometer)"
          stroke="#475569"
          strokeWidth="1.5"
        />

        <rect
          x="2"
          y="28"
          width="70"
          height="14"
          rx="4"
          fill="url(#metalOdometer)"
          stroke="#475569"
          strokeWidth="1.5"
        />

        <circle cx="17" cy="43" r="7" fill="#334155" />
        <circle cx="58" cy="43" r="7" fill="#334155" />

        <circle cx="17" cy="43" r="3" fill="#cbd5e1" />
        <circle cx="58" cy="43" r="3" fill="#cbd5e1" />
      </g>

      {/* Nombre */}
      <text
        x="155"
        y="112"
        fill={currentStep === 0 ? "#0f172a" : "#64748b"}
        fontSize="17"
        fontWeight="700"
      >
        NÍQUEL
      </text>

      {/* Odómetro */}
      <rect
        x="155"
        y="123"
        width="130"
        height="30"
        rx="5"
        fill="#0f172a"
      />

      <text
        x="220"
        y="145"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="17"
        fontWeight="700"
        fontFamily="monospace"
      >
        {currentStep === 0 ? "30.000 KM" : "20–30K KM"}
      </text>

      {/* Barra base */}
      <rect
        x="305"
        y="128"
        width="120"
        height="12"
        rx="6"
        fill="#e2e8f0"
      />

      {/* Barra vida útil */}
      <motion.rect
        x="305"
        y="128"
        height="12"
        rx="6"
        fill="#3b82f6"
        animate={{
          width:
            currentStep === 0
              ? 30
              : 30
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut"
        }}
      />

      {/* Cambio */}
      {currentStep === 0 && (
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 1, 1],
            scale: [0.8, 1.08, 1]
          }}
          transition={{
            delay: 1,
            duration: 0.4
          }}
        >
          <rect
            x="330"
            y="145"
            width="85"
            height="20"
            rx="10"
            fill="#eff6ff"
          />

          <text
            x="372"
            y="159"
            textAnchor="middle"
            fill="#2563eb"
            fontSize="11"
            fontWeight="700"
          >
            ⚠ CAMBIO
          </text>
        </motion.g>
      )}
    </motion.g>

    {/* ========================================================= */}
    {/* AUTO 2 — PLATINO */}
    {/* ========================================================= */}

    <motion.g
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: currentStep === 1 ? 1 : 0.4,
        x: 0
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Fondo */}
      <rect
        x="35"
        y="185"
        width="430"
        height="85"
        rx="12"
        fill={currentStep === 1 ? "#f8fafc" : "#ffffff"}
        stroke={currentStep === 1 ? "#bfdbfe" : "#e2e8f0"}
        strokeWidth="1.5"
      />

      {/* Auto */}
      <g transform="translate(55 205)">
        <path
          d="M 5 32
             L 10 18
             Q 12 13 22 13
             L 48 13
             Q 55 13 60 20
             L 68 32
             Z"
          fill="url(#metalOdometer)"
          stroke="#475569"
          strokeWidth="1.5"
        />

        <rect
          x="2"
          y="28"
          width="70"
          height="14"
          rx="4"
          fill="url(#metalOdometer)"
          stroke="#475569"
          strokeWidth="1.5"
        />

        <circle cx="17" cy="43" r="7" fill="#334155" />
        <circle cx="58" cy="43" r="7" fill="#334155" />

        <circle cx="17" cy="43" r="3" fill="#cbd5e1" />
        <circle cx="58" cy="43" r="3" fill="#cbd5e1" />
      </g>

      {/* Nombre */}
      <text
        x="155"
        y="212"
        fill={currentStep === 1 ? "#0f172a" : "#64748b"}
        fontSize="17"
        fontWeight="700"
      >
        PLATINO
      </text>

      {/* Odómetro */}
      <rect
        x="155"
        y="223"
        width="130"
        height="30"
        rx="5"
        fill="#0f172a"
      />

      <text
        x="220"
        y="245"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="17"
        fontWeight="700"
        fontFamily="monospace"
      >
        {currentStep === 1 ? "100.000 KM" : "60–100K KM"}
      </text>

      {/* Barra */}
      <rect
        x="305"
        y="228"
        width="120"
        height="12"
        rx="6"
        fill="#e2e8f0"
      />

      <motion.rect
        x="305"
        y="228"
        height="12"
        rx="6"
        fill="#3b82f6"
        animate={{
          width: currentStep === 1 ? 80 : 80
        }}
        transition={{
          duration: 1.5,
          ease: "easeOut"
        }}
      />
    </motion.g>

    {/* ========================================================= */}
    {/* AUTO 3 — IRIDIO */}
    {/* ========================================================= */}

    <motion.g
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: currentStep === 2 ? 1 : 0.4,
        x: 0
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Fondo */}
      <rect
        x="35"
        y="285"
        width="430"
        height="85"
        rx="12"
        fill={currentStep === 2 ? "#f8fafc" : "#ffffff"}
        stroke={currentStep === 2 ? "#bfdbfe" : "#e2e8f0"}
        strokeWidth="1.5"
      />

      {/* Auto */}
      <g transform="translate(55 305)">
        <path
          d="M 5 32
             L 10 18
             Q 12 13 22 13
             L 48 13
             Q 55 13 60 20
             L 68 32
             Z"
          fill="url(#metalOdometer)"
          stroke="#475569"
          strokeWidth="1.5"
        />

        <rect
          x="2"
          y="28"
          width="70"
          height="14"
          rx="4"
          fill="url(#metalOdometer)"
          stroke="#475569"
          strokeWidth="1.5"
        />

        <circle cx="17" cy="43" r="7" fill="#334155" />
        <circle cx="58" cy="43" r="7" fill="#334155" />

        <circle cx="17" cy="43" r="3" fill="#cbd5e1" />
        <circle cx="58" cy="43" r="3" fill="#cbd5e1" />
      </g>

      {/* Nombre */}
      <text
        x="155"
        y="312"
        fill={currentStep === 2 ? "#0f172a" : "#64748b"}
        fontSize="17"
        fontWeight="700"
      >
        IRIDIO
      </text>

      {/* Odómetro */}
      <rect
        x="155"
        y="323"
        width="130"
        height="30"
        rx="5"
        fill="#0f172a"
      />

      <text
        x="220"
        y="345"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="17"
        fontWeight="700"
        fontFamily="monospace"
      >
        {currentStep === 2 ? "120.000 KM" : "100–120K KM"}
      </text>

      {/* Barra */}
      <rect
        x="305"
        y="328"
        width="120"
        height="12"
        rx="6"
        fill="#e2e8f0"
      />

      <motion.rect
        x="305"
        y="328"
        height="12"
        rx="6"
        fill="#3b82f6"
        animate={{
          width: currentStep === 2 ? 120 : 120
        }}
        transition={{
          duration: 1.8,
          ease: "easeOut"
        }}
      />
    </motion.g>

    {/* ========================================================= */}
    {/* CONCLUSIÓN */}
    {/* ========================================================= */}

    {currentStep === 3 && (
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <rect
          x="130"
          y="385"
          width="240"
          height="1"
          fill="#e2e8f0"
        />

        <text
          x="250"
          y="408"
          textAnchor="middle"
          fill="#0f172a"
          fontSize="15"
          fontWeight="700"
        >
          MAYOR DURABILIDAD, MAYOR VIDA ÚTIL
        </text>
      </motion.g>
    )}
  </svg>
</div>
  );
}