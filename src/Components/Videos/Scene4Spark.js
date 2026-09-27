"use client";

import React from "react";

import { motion } from "framer-motion";

export default function Scene4Spark() {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center relative"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full max-w-[320px] max-h-[320px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Guías de alineación tácticas de fondo */}

        <line
          x1="150"
          y1="20"
          x2="150"
          y2="280"
          stroke="#f1f5f9"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        <line
          x1="20"
          y1="150"
          x2="280"
          y2="150"
          stroke="#f1f5f9"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* --- 1. ELECTRODO CENTRAL (Arriba - Núcleo de Alto Voltaje) --- */}

        <g id="center-electrode">
          {/* Cuerpo Aislante Cerámico Exterior */}

          <rect
            x="110"
            y="20"
            width="80"
            height="90"
            rx="4"
            fill="#ffffff"
            stroke="#0f172a"
            strokeWidth="2.5"
          />

          {/* Núcleo Interior de Cobre/Iridio */}

          <rect
            x="138"
            y="20"
            width="24"
            height="110"
            rx="2"
            fill="#334155"
            stroke="#0f172a"
            strokeWidth="2"
          />

          {/* Punta Fina del Electrodo Central (Punta de Iridio) */}

          <rect x="144" y="130" width="12" height="18" fill="#2563eb" />
        </g>

        {/* --- 2. ELECTRODO DE TIERRA / GANCHO (Abajo - Conexión al Bloque) --- */}

        <g id="ground-electrode">
          {/* Base roscada metálica */}

          <rect
            x="80"
            y="230"
            width="140"
            height="30"
            rx="3"
            fill="#cbd5e1"
            stroke="#0f172a"
            strokeWidth="2.5"
          />

          {/* Gancho en "L" invertida */}

          <path
            d="M 90 230 L 90 185 L 135 185"
            stroke="#0f172a"
            strokeWidth="16"
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="none"
          />

          <path
            d="M 90 230 L 90 185 L 135 185"
            stroke="#475569"
            strokeWidth="10"
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="none"
          />
        </g>

        {/* --- 3. COTA DE MEDIDA DEL GAP (0.8mm) --- */}

        <g id="gap-dimension">
          <line
            x1="180"
            y1="148"
            x2="180"
            y2="185"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />

          <line
            x1="175"
            y1="148"
            x2="185"
            y2="148"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />

          <line
            x1="175"
            y1="185"
            x2="185"
            y2="185"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />

          <text
            x="192"
            y="170"
            className="text-[9px] font-black fill-blue-600 tracking-wider"
          >
            GAP: 0.8mm
          </text>
        </g>

        {/* --- 4. RUPTURA DIELÉCTRICA Y CHISPA DE PLASMA (Animación Macro) --- */}

        {/* Glow de ionización ambiental */}

        <motion.circle
          cx="150"
          cy="166"
          r="28"
          fill="#3b82f6"
          opacity="0.25"
          className="blur-md"
          animate={{ scale: [0.8, 1.4, 0.9], opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 0.08 }}
        />

        {/* Arco de plasma principal zapping */}

        <motion.path
          d="M 150 148 L 146 156 L 153 168 L 148 185"
          fill="none"
          stroke="#2563eb"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            d: [
              "M 150 148 L 146 156 L 153 168 L 148 185",

              "M 150 148 L 154 158 L 145 172 L 148 185",

              "M 150 148 L 148 160 L 152 170 L 148 185",
            ],

            opacity: [0.5, 1, 0.7],
          }}
          transition={{ repeat: Infinity, duration: 0.06 }}
        />

        {/* Núcleo blanco incandescente del arco eléctrico */}

        <motion.path
          d="M 150 148 L 146 156 L 153 168 L 148 185"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            d: [
              "M 150 148 L 146 156 L 153 168 L 148 185",

              "M 150 148 L 154 158 L 145 172 L 148 185",

              "M 150 148 L 148 160 L 152 170 L 148 185",
            ],
          }}
          transition={{ repeat: Infinity, duration: 0.06 }}
        />

        {/* Micro-chispas divergentes de alta temperatura */}

        <motion.circle
          cx="140"
          cy="160"
          r="1.5"
          fill="#60a5fa"
          animate={{ opacity: [0, 1, 0], x: [-5, -15], y: [0, -10] }}
          transition={{ repeat: Infinity, duration: 0.2 }}
        />

        <motion.circle
          cx="160"
          cy="170"
          r="1.5"
          fill="#60a5fa"
          animate={{ opacity: [0, 1, 0], x: [5, 15], y: [0, 10] }}
          transition={{ repeat: Infinity, duration: 0.18 }}
        />
      </svg>
    </motion.div>
  );
}
