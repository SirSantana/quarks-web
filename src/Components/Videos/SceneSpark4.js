'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SceneErosion() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const maxSteps = 4;
  const mileage = ['0 KM', '20.000 KM', '40.000 KM', '70.000 KM', '100.000 KM'];

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev < maxSteps ? prev + 1 : 0));
  };

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= maxSteps) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (currentStep === maxSteps && !isPlaying) setCurrentStep(0);
    setIsPlaying(!isPlaying);
  };

  // Progreso de 0 a 1
  const p = currentStep / 4;

  // Valores de erosión (exagerados para que se note claramente)
  const nickel = {
    tipY: 160 + p * 48,      // se acorta mucho
    tipH: 90 - p * 48,
    gap: 10 + p * 42,        // gap crece mucho
    round: 3 + p * 8,
  };

  const platinum = {
    tipY: 160 + p * 22,
    tipH: 90 - p * 22,
    gap: 10 + p * 18,
    round: 3 + p * 4,
  };

  const iridium = {
    tipY: 160 + p * 5,
    tipH: 90 - p * 5,
    gap: 10 + p * 4,
    round: 3 + p * 1.5,
  };

  return (
    <div className="w-full min-h-[620px] flex flex-col items-center justify-center relative p-4 bg-white">
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
        id="electrodeGrad"
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
        id="sparkGlow"
        x="-100%"
        y="-100%"
        width="300%"
        height="300%"
      >
        <feGaussianBlur stdDeviation="2.5" result="blur" />
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
        y="38"
        textAnchor="middle"
        fill="#0f172a"
        fontSize="18"
        fontWeight="700"
      >
        EL DESGASTE DEL ELECTRODO
      </text>

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
    {/* LÍNEA DE TIEMPO */}
    {/* ========================================================= */}

    <motion.g
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2 }}
>
  {/* Línea base */}
  <line
    x1="80"
    y1="88"
    x2="320"
    y2="88"
    stroke="#e2e8f0"
    strokeWidth="3"
    strokeLinecap="round"
  />

  {/* Línea de progreso */}
  <motion.line
    x1="80"
    y1="88"
    x2={
      currentStep === 0
        ? 80
        : currentStep === 1
        ? 200
        : 320
    }
    y2="88"
    stroke="#3b82f6"
    strokeWidth="3"
    strokeLinecap="round"
    initial={{ pathLength: 0 }}
    animate={{
      x2:
        currentStep === 0
          ? 80
          : currentStep === 1
          ? 200
          : 320
    }}
    transition={{
      duration: 0.5,
      ease: "easeInOut"
    }}
  />

  {/* ========================================================= */}
  {/* PUNTO 1 — NUEVA */}
  {/* ========================================================= */}

  {currentStep === 0 && (
    <motion.circle
      cx="80"
      cy="88"
      r="13"
      fill="#3b82f6"
      opacity="0.15"
      animate={{
        r: [10, 15, 10],
        opacity: [0.1, 0.22, 0.1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )}

  <motion.circle
    cx="80"
    cy="88"
    animate={{
      r: currentStep === 0 ? 8 : 5,
      fill: currentStep === 0 ? "#2563eb" : "#cbd5e1",
      opacity: currentStep === 0 ? 1 : 0.6
    }}
    transition={{ duration: 0.3 }}
  />

  {/* ========================================================= */}
  {/* PUNTO 2 — USO */}
  {/* ========================================================= */}

  {currentStep === 1 && (
    <motion.circle
      cx="200"
      cy="88"
      r="13"
      fill="#3b82f6"
      opacity="0.15"
      animate={{
        r: [10, 15, 10],
        opacity: [0.1, 0.22, 0.1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )}

  <motion.circle
    cx="200"
    cy="88"
    animate={{
      r: currentStep === 1 ? 8 : 5,
      fill: currentStep === 1 ? "#2563eb" : "#cbd5e1",
      opacity: currentStep === 1 ? 1 : 0.6
    }}
    transition={{ duration: 0.3 }}
  />

  {/* ========================================================= */}
  {/* PUNTO 3 — DESGASTE */}
  {/* ========================================================= */}

  {currentStep === 2 && (
    <motion.circle
      cx="320"
      cy="88"
      r="13"
      fill="#3b82f6"
      opacity="0.15"
      animate={{
        r: [10, 15, 10],
        opacity: [0.1, 0.22, 0.1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )}

  <motion.circle
    cx="320"
    cy="88"
    animate={{
      r: currentStep === 2 ? 8 : 5,
      fill: currentStep === 2 ? "#2563eb" : "#cbd5e1",
      opacity: currentStep === 2 ? 1 : 0.6
    }}
    transition={{ duration: 0.3 }}
  />

  {/* ========================================================= */}
  {/* ETIQUETAS */}
  {/* ========================================================= */}

  <motion.text
    x="80"
    y="118"
    textAnchor="middle"
    animate={{
      fill: currentStep === 0 ? "#0f172a" : "#94a3b8",
      opacity: currentStep === 0 ? 1 : 0.55
    }}
    transition={{ duration: 0.3 }}
    fontSize={currentStep === 0 ? 14 : 12}
    fontWeight={currentStep === 0 ? 700 : 500}
  >
    NUEVA
  </motion.text>

  <motion.text
    x="200"
    y="118"
    textAnchor="middle"
    animate={{
      fill: currentStep === 1 ? "#0f172a" : "#94a3b8",
      opacity: currentStep === 1 ? 1 : 0.55
    }}
    transition={{ duration: 0.3 }}
    fontSize={currentStep === 1 ? 14 : 12}
    fontWeight={currentStep === 1 ? 700 : 500}
  >
    USO
  </motion.text>

  <motion.text
    x="320"
    y="118"
    textAnchor="middle"
    animate={{
      fill: currentStep === 2 ? "#0f172a" : "#94a3b8",
      opacity: currentStep === 2 ? 1 : 0.55
    }}
    transition={{ duration: 0.3 }}
    fontSize={currentStep === 2 ? 14 : 12}
    fontWeight={currentStep === 2 ? 700 : 500}
  >
    DESGASTE
  </motion.text>
</motion.g>

    {/* ========================================================= */}
    {/* ELECTRODO CENTRAL */}
    {/* ========================================================= */}

    <motion.g
      initial={{ opacity: 0, y: 15 }}
      animate={{
        opacity: currentStep >= 0 ? 1 : 0,
        y: currentStep >= 0 ? 0 : 15
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut"
      }}
    >
      {/* Cuerpo del electrodo */}
      <rect
        x="178"
        y="145"
        width="44"
        height="120"
        rx="5"
        fill="url(#electrodeGrad)"
        stroke="#475569"
        strokeWidth="1.2"
      />

      {/* Reflejo */}
      <rect
        x="190"
        y="150"
        width="8"
        height="108"
        rx="4"
        fill="#ffffff"
        opacity="0.35"
      />

      {/* ===================================================== */}
      {/* PASO 0 — PUNTA NUEVA */}
      {/* ===================================================== */}

      {currentStep === 0 && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <path
            d="M 178 265
               L 222 265
               L 211 282
               L 189 282
               Z"
            fill="url(#electrodeGrad)"
            stroke="#475569"
            strokeWidth="1.2"
          />

          {/* Indicador */}
          <line
            x1="150"
            y1="275"
            x2="183"
            y2="275"
            stroke="#64748b"
            strokeWidth="1.5"
          />

          <text
            x="142"
            y="279"
            textAnchor="end"
            fill="#334155"
            fontSize="13"
            fontWeight="600"
          >
            PUNTA DEFINIDA
          </text>
        </motion.g>
      )}

      {/* ===================================================== */}
      {/* PASO 1 — DESGASTE INICIAL */}
      {/* ===================================================== */}

      {currentStep === 1 && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <path
            d="M 178 265
               L 222 265
               L 216 280
               Q 200 287 184 280
               Z"
            fill="url(#electrodeGrad)"
            stroke="#475569"
            strokeWidth="1.2"
          />

          {/* Partículas mínimas */}
          <motion.circle
            cx="230"
            cy="278"
            r="2"
            fill="#94a3b8"
            animate={{
              opacity: [0, 1, 0],
              x: [0, 10, 18],
              y: [0, -4, -8]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity
            }}
          />

          <motion.circle
            cx="225"
            cy="284"
            r="1.5"
            fill="#94a3b8"
            animate={{
              opacity: [0, 1, 0],
              x: [0, 8, 15],
              y: [0, 4, 8]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: 0.4
            }}
          />

          <text
            x="200"
            y="315"
            textAnchor="middle"
            fill="#334155"
            fontSize="14"
            fontWeight="600"
          >
            LA PUNTA COMIENZA A REDONDEARSE
          </text>
        </motion.g>
      )}

      {/* ===================================================== */}
      {/* PASO 2 — ELECTRODO DESGASTADO */}
      {/* ===================================================== */}

      {currentStep === 2 && (
        <motion.g
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
        >
          {/* Punta redondeada */}
          <path
            d="M 178 265
               L 222 265
               L 220 279
               Q 200 292 180 279
               Z"
            fill="url(#electrodeGrad)"
            stroke="#475569"
            strokeWidth="1.2"
          />

          {/* Indicador */}
          <line
            x1="225"
            y1="280"
            x2="265"
            y2="280"
            stroke="#64748b"
            strokeWidth="1.5"
          />

          <text
            x="272"
            y="284"
            fill="#334155"
            fontSize="13"
            fontWeight="600"
          >
            DESGASTADA
          </text>
        </motion.g>
      )}
    </motion.g>

    {/* ========================================================= */}
    {/* DESCARGAS ELÉCTRICAS */}
    {/* ========================================================= */}

    {currentStep >= 1 && (
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.path
          d="M 200 132
             L 195 145
             L 204 153
             L 198 162"
          stroke="#2563eb"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#sparkGlow)"
          animate={{
            opacity: [0.2, 1, 0.2]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity
          }}
        />

        <motion.path
          d="M 202 132
             L 207 145
             L 198 153
             L 204 162"
          stroke="#60a5fa"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            opacity: [0.1, 0.8, 0.1]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: 0.1
          }}
        />
      </motion.g>
    )}

    {/* ========================================================= */}
    {/* CONCLUSIÓN FINAL */}
    {/* ========================================================= */}

    {currentStep === 3 && (
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <line
          x1="90"
          y1="335"
          x2="310"
          y2="335"
          stroke="#e2e8f0"
          strokeWidth="1.5"
        />

        <text
          x="200"
          y="355"
          textAnchor="middle"
          fill="#0f172a"
          fontSize="14"
          fontWeight="600"
        >
          CADA CHISPA CONTRIBUYE AL DESGASTE
        </text>
      </motion.g>
    )}
  </svg>
    </div>
  );
}