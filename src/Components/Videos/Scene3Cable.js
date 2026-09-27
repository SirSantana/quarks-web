'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Scene3Cable() {
  return (
    <motion.div 
      className="w-full h-full flex flex-col items-center justify-center relative p-2"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <svg 
        viewBox="0 0 340 340" 
        className="w-full h-full max-w-[340px] max-h-[340px] drop-shadow-sm select-none"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Resplandor eléctrico (Glow) */}
          <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.08" />
          </filter>

          {/* Gradientes Metálicos y Cerámicos */}
          <linearGradient id="siliconeSheath" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="ceramicGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="30%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id="metalThread" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        {/* --- RETÍCULA Y GUÍAS DE INGENIERÍA --- */}
        <g opacity="0.4">
          <line x1="170" y1="10" x2="170" y2="330" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="10" y1="170" x2="330" y2="170" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3 3" />
          <circle cx="170" cy="170" r="140" stroke="#f1f5f9" strokeWidth="1" />
        </g>

        {/* --- 1. SECCIÓN ANATÓMICA: CORTE TRANSVERSAL DEL CABLE (TOP-LEFT) --- */}
        <g id="cable-cross-section" transform="translate(20, 25)">
          {/* Badge del corte */}
          <rect x="0" y="0" width="105" height="42" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" filter="url(#softShadow)" />
          <text x="10" y="15" className="text-[7px] font-black fill-slate-400 uppercase tracking-wider">Corte Transversal</text>
          
          {/* Capas concéntricas */}
          <circle cx="25" cy="28" r="10" fill="#0f172a" />
          <circle cx="25" cy="28" r="7" fill="#475569" />
          <circle cx="25" cy="28" r="4" fill="#ffffff" />
          <circle cx="25" cy="28" r="2" fill="#2563eb" />

          {/* Leyenda */}
          <text x="42" y="26" className="text-[8px] font-bold fill-slate-700">Funda Silicona</text>
          <text x="42" y="34" className="text-[7px] font-semibold fill-blue-600">Núcleo Cobre/Iridio</text>
        </g>

        {/* --- 2. TRAYECTORIA DEL CABLE ALTA TENSIÓN --- */}
        {/* Capa de Sombra Base */}
        <path 
          d="M 50 80 Q 170 80 170 160 L 170 195" 
          stroke="#e2e8f0" 
          strokeWidth="18" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* Cubierta Aislante Principal (Silicona) */}
        <path 
          d="M 50 80 Q 170 80 170 160 L 170 195" 
          stroke="url(#siliconeSheath)" 
          strokeWidth="12" 
          strokeLinecap="round" 
          fill="none" 
        />
        
        {/* Guía interna de flujo */}
        <path 
          d="M 50 80 Q 170 80 170 160 L 170 195" 
          stroke="#334155" 
          strokeWidth="3" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* Pulso Eléctrico Resplandeciente (Viajero) */}
        <motion.path 
          d="M 50 80 Q 170 80 170 160 L 170 195" 
          stroke="#3b82f6" 
          strokeWidth="5" 
          strokeLinecap="round" 
          fill="none"
          strokeDasharray="30 150"
          animate={{ strokeDashoffset: [180, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          filter="url(#glowBlue)"
        />

        <motion.path 
          d="M 50 80 Q 170 80 170 160 L 170 195" 
          stroke="#ffffff" 
          strokeWidth="2" 
          strokeLinecap="round" 
          fill="none"
          strokeDasharray="30 150"
          animate={{ strokeDashoffset: [180, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        />

        {/* --- 3. TERMINAL Y BUJÍA TÉCNICA --- */}
        <g id="spark-plug-assembly">
          {/* Capuchón de Goma/Terminal */}
          <rect x="148" y="185" width="44" height="28" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <rect x="156" y="190" width="28" height="4" rx="1" fill="#334155" />

          {/* Conector Metálico Superior */}
          <rect x="160" y="213" width="20" height="12" rx="2" fill="url(#metalThread)" stroke="#0f172a" strokeWidth="1" />

          {/* Cuerpo Cerámico con Costillas de Disipación */}
          <g id="ceramic-ribs">
            <rect x="150" y="225" width="40" height="9" rx="3" fill="url(#ceramicGrad)" stroke="#64748b" strokeWidth="0.8" />
            <rect x="153" y="234" width="34" height="8" rx="2" fill="url(#ceramicGrad)" stroke="#64748b" strokeWidth="0.8" />
            <rect x="150" y="242" width="40" height="9" rx="3" fill="url(#ceramicGrad)" stroke="#64748b" strokeWidth="0.8" />
            <rect x="155" y="251" width="30" height="18" fill="url(#ceramicGrad)" stroke="#64748b" strokeWidth="0.8" />
          </g>

          {/* Tuerca Hexagonal Metálica de Sujeción */}
          <path d="M 146 269 L 194 269 L 188 283 L 152 283 Z" fill="url(#metalThread)" stroke="#1e293b" strokeWidth="1" />

          {/* Canal Interno del Electrodo Central */}
          <rect x="168" y="213" width="4" height="70" fill="#2563eb" filter="url(#glowBlue)" />
          <rect x="169" y="213" width="2" height="70" fill="#ffffff" />
        </g>

        {/* --- 4. MICRO-DESTELLO DE CONTACTO EN BORNE --- */}
        <motion.g animate={{ scale: [0.9, 1.25, 0.9], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 0.3 }}>
          <circle cx="170" cy="213" r="8" fill="#3b82f6" filter="url(#glowBlue)" opacity="0.6" />
          <circle cx="170" cy="213" r="4" fill="#ffffff" />
        </motion.g>

        {/* --- 5. BADGES TÉCNICOS FLOTANTES --- */}
        {/* Badge de Alto Voltaje */}
        <g id="voltage-badge" transform="translate(200, 105)">
          <rect x="0" y="0" width="110" height="34" rx="8" fill="#ffffff" stroke="#2563eb" strokeWidth="1.5" filter="url(#softShadow)" />
          <circle cx="15" cy="17" r="4" fill="#2563eb" />
          <text x="26" y="15" className="text-[8px] font-black fill-slate-400 uppercase tracking-wider">Tensión Nominal</text>
          <text x="26" y="26" className="text-[11px] font-black fill-blue-600 tracking-tight">25,000 VOLTIOS</text>
        </g>

        {/* Badge de Aislamiento */}
        <g id="insulation-badge" transform="translate(45, 145)">
          <rect x="0" y="0" width="95" height="28" rx="6" fill="#0f172a" filter="url(#softShadow)" />
          <text x="10" y="12" className="text-[7px] font-bold fill-slate-400 uppercase tracking-wider">Aislamiento</text>
          <text x="10" y="22" className="text-[9px] font-extrabold fill-emerald-400 tracking-wide">DIELÉCTRICO High-Temp</text>
        </g>

        {/* Cota / Dimensión Técnica */}
        <g id="dimension-line" opacity="0.7">
          <line x1="135" y1="225" x2="135" y2="260" stroke="#64748b" strokeWidth="1" />
          <line x1="130" y1="225" x2="140" y2="225" stroke="#64748b" strokeWidth="1" />
          <line x1="130" y1="260" x2="140" y2="260" stroke="#64748b" strokeWidth="1" />
          <text x="126" y="246" className="text-[7px] font-mono font-bold fill-slate-500" transform="rotate(-90 126 246)">35mm</text>
        </g>
      </svg>
    </motion.div>
  );
}