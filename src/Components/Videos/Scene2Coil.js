'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Scene2Coil() {
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
          <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.08" />
          </filter>

          <linearGradient id="ironCore" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* --- RETÍCULA Y GUÍAS DE INGENIERÍA --- */}
        <g opacity="0.4">
          <line x1="170" y1="10" x2="170" y2="330" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="10" y1="170" x2="330" y2="170" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3 3" />
          <circle cx="170" cy="170" r="140" stroke="#f1f5f9" strokeWidth="1" />
        </g>

        {/* --- 1. ENTRADA DE BAJO VOLTAJE (12V) --- */}
        <path d="M 25 80 L 115 80" stroke="#e2e8f0" strokeWidth="3" />
        <motion.path 
          d="M 25 80 L 115 80" 
          stroke="#2563eb" 
          strokeWidth="3" 
          strokeDasharray="8 8"
          animate={{ strokeDashoffset: [32, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        />
        <circle cx="25" cy="80" r="4" fill="#2563eb" filter="url(#glowBlue)" />

        {/* --- 2. CAMPO ELECTROMAGNÉTICO PULSANTE --- */}
        <motion.rect
          x="100"
          y="42"
          width="140"
          height="216"
          rx="18"
          stroke="#60a5fa"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="6 6"
          style={{ transformOrigin: '170px 150px' }}
          animate={{ opacity: [0.15, 0.7, 0.15], scale: [0.97, 1.03, 0.97] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        />

        {/* --- 3. NÚCLEO Y DEVANADOS --- */}
        {/* Blindaje Exterior */}
        <rect x="110" y="50" width="120" height="200" rx="12" stroke="#0f172a" strokeWidth="2.5" fill="#ffffff" filter="url(#softShadow)" />

        {/* Núcleo de Hierro Central */}
        <rect x="162" y="58" width="16" height="184" rx="3" fill="url(#ironCore)" />

        {/* Devanado Primario (Rojo - Pocas Vueltas) */}
        <g id="primary-winding" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round">
          {[75, 95, 115, 135, 155, 175, 195, 215].map((y) => (
            <path key={`pri-${y}`} d={`M 130 ${y} C 138 ${y-6}, 156 ${y-6}, 162 ${y}`} />
          ))}
        </g>

        {/* Devanado Secundario (Azul - Muchas Vueltas) */}
        <g id="secondary-winding" stroke="#2563eb" strokeWidth="2" fill="none" strokeLinecap="round">
          {[68, 78, 88, 98, 108, 118, 128, 138, 148, 158, 168, 178, 188, 198, 208, 218, 228].map((y) => (
            <path key={`sec-${y}`} d={`M 178 ${y} C 184 ${y-4}, 200 ${y-4}, 208 ${y}`} />
          ))}
        </g>

        {/* --- 4. SALIDA DE ALTA TENSIÓN (25,000V) --- */}
        <path d="M 170 250 L 170 290 L 305 290" stroke="#e2e8f0" strokeWidth="4" fill="none" />
        
        {/* Pulso de Inducción */}
        <motion.path 
          d="M 170 250 L 170 290 L 305 290" 
          stroke="#3b82f6" 
          strokeWidth="4" 
          strokeLinecap="round"
          fill="none"
          strokeDasharray="20 80"
          animate={{ strokeDashoffset: [100, 0] }}
          transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
          filter="url(#glowBlue)"
        />

        {/* --- 5. BADGES TÉCNICOS FLOTANTES --- */}
        {/* Badge Entrada */}
        <g id="input-badge" transform="translate(15, 35)">
          <rect x="0" y="0" width="90" height="28" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" filter="url(#softShadow)" />
          <text x="10" y="12" className="text-[7px] font-black fill-slate-400 uppercase tracking-wider">Entrada</text>
          <text x="10" y="22" className="text-[9px] font-bold fill-blue-600">12V Primario</text>
        </g>

        {/* Badge Salida Alta Tensión */}
        <g id="output-badge" transform="translate(195, 295)">
          <rect x="0" y="0" width="125" height="32" rx="6" fill="#0f172a" filter="url(#softShadow)" />
          <text x="10" y="13" className="text-[7px] font-bold fill-slate-400 uppercase tracking-wider">Inducción Salida</text>
          <text x="10" y="24" className="text-[10px] font-black fill-blue-400 tracking-tight">25,000V SECUNDARIO</text>
        </g>

        {/* Rotulado interno de devanados */}
        <text x="145" y="238" textAnchor="middle" className="text-[7px] font-black fill-red-500 uppercase">PRI</text>
        <text x="195" y="238" textAnchor="middle" className="text-[7px] font-black fill-blue-500 uppercase">SEC</text>
      </svg>
    </motion.div>
  );
}