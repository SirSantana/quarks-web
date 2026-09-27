'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SceneGapVoltage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const maxSteps = 3; // 0: Gap pequeño, 1: Medio, 2: Grande, 3: Conclusión

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev < maxSteps ? prev + 1 : 0));
  };

  // Autoplay
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
      }, 2800);
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
    <div className="w-full h-full max-h-[420px] flex items-center justify-center relative">

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
        id="metalGrad"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="50%" stopColor="#f1f5f9" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>

      <filter
        id="electricGlow"
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
      {/* <text
        x="200"
        y="38"
        textAnchor="middle"
        fill="#0f172a"
        fontSize="18"
        fontWeight="700"
      >
        EL SALTO DE LA CHISPA
      </text> */}

      <line
        x1="145"
        y1="50"
        x2="255"
        y2="50"
        stroke="#cbd5e1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.g>

    {/* ========================================================= */}
    {/* ETIQUETA SUPERIOR */}
    {/* ========================================================= */}

    {/* <motion.text
      x="200"
      y="82"
      textAnchor="middle"
      fill="#334155"
      fontSize="14"
      fontWeight="600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      MISMO GAP · DIFERENTE ELECTRODO
    </motion.text> */}

    {/* ========================================================= */}
    {/* COLUMNA 1 — ELECTRODO GRUESO */}
    {/* ========================================================= */}

    <motion.g
      initial={{ opacity: 0, x: -15 }}
      animate={{
        opacity: currentStep >= 0 ? 1 : 0,
        x: currentStep >= 0 ? 0 : -15
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
    >
      {/* Etiqueta */}
      <text
        x="105"
        y="120"
        textAnchor="middle"
        fill="#0f172a"
        fontSize="16"
        fontWeight="700"
      >
        ELECTRODO GRUESO
      </text>

      {/* Electrodo central */}
      <rect
        x="82"
        y="145"
        width="46"
        height="85"
        rx="6"
        fill="url(#metalGrad)"
        stroke="#475569"
        strokeWidth="1.2"
      />

      {/* Brillo */}
      <rect
        x="96"
        y="150"
        width="8"
        height="75"
        rx="4"
        fill="#ffffff"
        opacity="0.3"
      />

      {/* Electrodo de masa */}
      <path
        d="M 60 270
           L 60 245
           L 90 245"
        stroke="url(#metalGrad)"
        strokeWidth="8"
        strokeLinecap="square"
      />

      {/* GAP */}
      <line
        x1="105"
        y1="230"
        x2="105"
        y2="245"
        stroke="#94a3b8"
        strokeWidth="1"
        strokeDasharray="3 3"
      />

      {/* Campo eléctrico difuso */}
      {currentStep === 0 && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.path
            d="M 88 230 Q 78 238 88 245"
            stroke="#60a5fa"
            strokeWidth="1.5"
            fill="none"
            opacity="0.35"
            animate={{
              opacity: [0.15, 0.5, 0.15]
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity
            }}
          />

          <motion.path
            d="M 105 230 Q 95 238 105 245"
            stroke="#60a5fa"
            strokeWidth="1.5"
            fill="none"
            opacity="0.35"
            animate={{
              opacity: [0.15, 0.5, 0.15]
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: 0.2
            }}
          />

          <motion.path
            d="M 122 230 Q 132 238 122 245"
            stroke="#60a5fa"
            strokeWidth="1.5"
            fill="none"
            opacity="0.35"
            animate={{
              opacity: [0.15, 0.5, 0.15]
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: 0.4
            }}
          />
        </motion.g>
      )}

      {/* Indicador inferior */}
      <text
        x="105"
        y="310"
        textAnchor="middle"
        fill="#334155"
        fontSize="13"
        fontWeight="600"
      >
        MÁS VOLTAJE
      </text>

      <line
        x1="62"
        y1="322"
        x2="148"
        y2="322"
        stroke="#94a3b8"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <line
        x1="62"
        y1="322"
        x2="148"
        y2="322"
        stroke="#64748b"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.g>

    {/* ========================================================= */}
    {/* SEPARADOR */}
    {/* ========================================================= */}

    <line
      x1="200"
      y1="110"
      x2="200"
      y2="330"
      stroke="#e2e8f0"
      strokeWidth="1.5"
    />

    {/* ========================================================= */}
    {/* COLUMNA 2 — ELECTRODO FINO */}
    {/* ========================================================= */}

    <motion.g
      initial={{ opacity: 0, x: 15 }}
      animate={{
        opacity: currentStep >= 1 ? 1 : 0,
        x: currentStep >= 1 ? 0 : 15
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
    >
      {/* Etiqueta */}
      <text
        x="295"
        y="120"
        textAnchor="middle"
        fill="#0f172a"
        fontSize="16"
        fontWeight="700"
      >
        ELECTRODO FINO
      </text>

      {/* Electrodo central */}
      <rect
        x="291"
        y="145"
        width="8"
        height="85"
        rx="4"
        fill="url(#metalGrad)"
        stroke="#475569"
        strokeWidth="1"
      />

      {/* Electrodo de masa */}
      <path
        d="M 250 270
           L 250 245
           L 282 245"
        stroke="url(#metalGrad)"
        strokeWidth="8"
        strokeLinecap="square"
      />

      {/* GAP */}
      <line
        x1="295"
        y1="230"
        x2="295"
        y2="245"
        stroke="#94a3b8"
        strokeWidth="1"
        strokeDasharray="3 3"
      />

      {/* CAMPO ELÉCTRICO CONCENTRADO */}
      {currentStep === 1 && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Resplandor */}
          <motion.circle
            cx="295"
            cy="238"
            r="13"
            fill="#3b82f6"
            opacity="0.12"
            filter="url(#electricGlow)"
            animate={{
              r: [9, 15, 9],
              opacity: [0.08, 0.25, 0.08]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity
            }}
          />

          {/* Líneas concentradas */}
          <motion.path
            d="M 292 230 L 292 245"
            stroke="#2563eb"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity
            }}
          />

          <motion.path
            d="M 295 230 L 295 245"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
            filter="url(#electricGlow)"
            animate={{
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: 0.1
            }}
          />

          <motion.path
            d="M 298 230 L 298 245"
            stroke="#2563eb"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: 0.2
            }}
          />
        </motion.g>
      )}

      {/* Indicador inferior */}
      <text
        x="295"
        y="310"
        textAnchor="middle"
        fill="#2563eb"
        fontSize="13"
        fontWeight="700"
      >
        MENOS VOLTAJE
      </text>

      <line
        x1="267"
        y1="322"
        x2="323"
        y2="322"
        stroke="#2563eb"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </motion.g>

    {/* ========================================================= */}
    {/* CONCLUSIÓN */}
    {/* ========================================================= */}

    {currentStep === 2 && (
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <rect
          x="85"
          y="335"
          width="230"
          height="1"
          fill="#e2e8f0"
        />

        <text
          x="200"
          y="354"
          textAnchor="middle"
          fill="#0f172a"
          fontSize="13"
          fontWeight="600"
        >
          EL ELECTRODO FINO CONCENTRA EL CAMPO ELÉCTRICO
        </text>
      </motion.g>
    )}
  </svg>
</div>
  );
}