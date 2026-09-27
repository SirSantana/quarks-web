'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Scene5Engine() {
  const CYCLE_DURATION = 1.6;

  return (
    <motion.div 
      className="w-full h-full flex items-center justify-center relative bg-white p-4  overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <svg 
        viewBox="0 0 300 320" 
        className="w-full h-full max-w-[340px] max-h-[340px] select-none"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Filtro de resplandor optimizado para fondo claro */}
          <filter id="explosion-glow-light" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradiente de las paredes metálicas del cilindro (Light Mode) */}
          <linearGradient id="cylinder-wall-light" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="30%" stopColor="#f1f5f9" />
            <stop offset="70%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Gradiente metálico del pistón */}
          <linearGradient id="piston-metal-light" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="25%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="75%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Gradiente de Biela */}
          <linearGradient id="rod-grad-light" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Gradientes Térmicos y Fuego (Ajustados para alto contraste sobre claro) */}
          <radialGradient id="plasma-core-light" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#facc15" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="85%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#c2410c" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="heat-wave-light" cx="50%" cy="20%" r="80%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#f97316" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* Clip interior exacto del cilindro */}
          <clipPath id="cylinder-chamber-light">
            <path d="M 62 55 Q 150 30 238 55 L 238 275 L 62 275 Z" />
          </clipPath>
        </defs>

        {/* --- GRID TÁCTICO DE FONDO (Gris tenue sobre blanco) --- */}
        <g opacity="0.3">
          <line x1="150" y1="10" x2="150" y2="310" stroke="#0284c7" strokeWidth="0.75" strokeDasharray="4 4" />
          <line x1="20" y1="160" x2="280" y2="160" stroke="#0284c7" strokeWidth="0.75" strokeDasharray="4 4" />
          <circle cx="150" cy="160" r="110" stroke="#0284c7" strokeWidth="0.5" strokeDasharray="2 4" />
        </g>

        {/* --- 1. BLOQUE Y CULATA DEL MOTOR --- */}
        <g id="engine-block">
          {/* Bloque Exterior Sólido */}
          <rect x="42" y="45" width="216" height="235" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />

          {/* Paredes Gruesas del Cilindro (Camisa de Hierro/Aluminio) */}
          <rect x="48" y="50" width="16" height="225" fill="url(#cylinder-wall-light)" stroke="#94a3b8" strokeWidth="1" />
          <rect x="236" y="50" width="16" height="225" fill="url(#cylinder-wall-light)" stroke="#94a3b8" strokeWidth="1" />

          {/* Puertos de Válvulas / Diseño de la Cámara */}
          <path d="M 64 50 Q 150 25 236 50" stroke="#64748b" strokeWidth="4" fill="none" />
          <path d="M 80 48 L 105 20 M 220 48 L 195 20" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
        </g>

        {/* --- 2. CÁMARA DE COMBUSTIÓN (INTERIOR ANIMADO) --- */}
        <g id="combustion-chamber" clipPath="url(#cylinder-chamber-light)">
          
          {/* Glow de Radiación Térmica */}
          <motion.circle
            cx="150"
            cy="55"
            r="110"
            fill="url(#heat-wave-light)"
            animate={{
              scale: [0.1, 1.4, 0.3, 0.1],
              opacity: [0, 0.95, 0, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: CYCLE_DURATION,
              times: [0, 0.28, 0.55, 1],
              ease: "easeOut"
            }}
          />

          {/* Frente de Llama / Expansión de Plasma */}
          <motion.path
            d="M 150 55 C 190 75, 220 110, 236 150 C 180 140, 120 140, 64 150 C 80 110, 110 75, 150 55 Z"
            fill="url(#plasma-core-light)"
            filter="url(#explosion-glow-light)"
            style={{ originX: "150px", originY: "55px" }}
            animate={{
              scale: [0.05, 1.35, 0.2, 0.05],
              opacity: [0, 1, 0, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: CYCLE_DURATION,
              times: [0, 0.22, 0.48, 1],
              ease: "easeOut"
            }}
          />

          {/* Ondas de Choque Directivas */}
          <motion.path
            d="M 100 85 Q 150 115 200 85"
            stroke="#eab308"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            animate={{
              opacity: [0, 0.9, 0],
              y: [-10, 45, 60]
            }}
            transition={{
              repeat: Infinity,
              duration: CYCLE_DURATION,
              times: [0, 0.18, 0.38],
              ease: "easeOut"
            }}
          />
        </g>

        {/* --- 3. MONTAJE DE BUJÍA --- */}
        <g id="spark-plug-assembly">
          {/* Rosca Metal */}
          <rect x="142" y="25" width="16" height="25" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
          <line x1="142" y1="32" x2="158" y2="32" stroke="#334155" strokeWidth="1.5" />
          <line x1="142" y1="38" x2="158" y2="38" stroke="#334155" strokeWidth="1.5" />

          {/* Cerámica y Electrodo */}
          <rect x="145" y="10" width="10" height="20" rx="1" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="148.5" y="50" width="3" height="7" fill="#0284c7" />
          
          {/* Gancho de Tierra */}
          <path d="M 141 59 L 147 59 L 147 55" stroke="#475569" strokeWidth="2" strokeLinecap="square" fill="none" />

          {/* Destello de Chispa Inicial */}
          <motion.circle
            cx="148"
            cy="53"
            r="8"
            fill="#0284c7"
            filter="url(#explosion-glow-light)"
            animate={{
              scale: [0, 2.2, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: CYCLE_DURATION,
              times: [0, 0.08, 0.16],
              ease: "easeOut"
            }}
          />
        </g>

        {/* --- 4. ENSAMBLE DE PISTÓN Y BIELA --- */}
        <motion.g
          id="piston-assembly"
          animate={{ y: [0, 65, 0] }}
          transition={{
            repeat: Infinity,
            duration: CYCLE_DURATION,
            times: [0, 0.42, 1],
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          {/* Cabeza del Pistón */}
          <rect x="64" y="105" width="172" height="65" rx="5" fill="url(#piston-metal-light)" stroke="#475569" strokeWidth="2" />
          
          {/* Ranuras y Anillos de Compresión */}
          <rect x="64" y="113" width="172" height="3" fill="#475569" />
          <rect x="64" y="120" width="172" height="3" fill="#475569" />
          <rect x="64" y="127" width="172" height="3" fill="#475569" />

          {/* Detalle de Cavidades */}
          <rect x="80" y="145" width="30" height="20" rx="2" fill="#cbd5e1" opacity="0.8" />
          <rect x="190" y="145" width="30" height="20" rx="2" fill="#cbd5e1" opacity="0.8" />

          {/* Bulón / Pasador Central */}
          <circle cx="150" cy="142" r="12" fill="url(#cylinder-wall-light)" stroke="#475569" strokeWidth="2" />
          <circle cx="150" cy="142" r="6" fill="#334155" />

          {/* Biela Articulada */}
          <motion.g
            style={{ originX: "150px", originY: "142px" }}
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: CYCLE_DURATION,
              times: [0, 0.25, 0.75, 1],
              ease: "easeInOut"
            }}
          >
            <path d="M 142 150 L 144 240 L 156 240 L 158 150 Z" fill="url(#rod-grad-light)" stroke="#334155" strokeWidth="1.5" />
            <circle cx="150" cy="240" r="14" fill="url(#rod-grad-light)" stroke="#334155" strokeWidth="2" />
            <circle cx="150" cy="240" r="7" fill="#f8fafc" />
          </motion.g>
        </motion.g>

        {/* --- 5. TELEMETRÍA Y HUD (Light Theme) --- */}
        <g id="hud-elements">
          {/* Lectura de Temperatura */}
          <rect x="180" y="282" width="105" height="22" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
          <circle cx="192" cy="293" r="3" fill="#dc2626" />
          <text x="202" y="296" className="text-[10px] font-mono font-extrabold fill-red-600 tracking-wider select-none">
            2,500°C
          </text>

          {/* Lectura de Presión */}
          <rect x="15" y="282" width="105" height="22" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
          <circle cx="27" cy="293" r="3" fill="#0284c7" />
          <text x="37" y="296" className="text-[10px] font-mono font-extrabold fill-sky-700 tracking-wider select-none">
            60 BAR
          </text>
        </g>
      </svg>
    </motion.div>
  );
}