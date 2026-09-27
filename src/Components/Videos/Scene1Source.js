"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  "Cómo funciona tu auto" — Día 2: La ECU (11 Escenas Detalladas)   */
/*  Un solo archivo, Next.js (App Router) + Tailwind CSS              */
/*  Estilo: Manual técnico minimalista de alta precisión              */
/* ------------------------------------------------------------------ */

/* ---------------------------- UI Base ------------------------------ */

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-neutral-950 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white anim-pop">
      {children}
    </span>
  );
}

function SceneWrapper({ fig, title, children, callouts }) {
  return (
    <div className="flex h-[480px] w-full flex-col items-center justify-between py-2">
      <div className="relative flex w-full max-w-[280px] flex-1 flex-col items-center justify-center">
        <span className="absolute top-0 left-0 text-[9px] font-bold uppercase tracking-[0.14em] text-neutral-400 anim-fade-up">
          {fig} — {title}
        </span>
        <div className="h-full w-full pt-6 flex items-center justify-center">
          {children}
        </div>
      </div>

      {callouts && callouts.length > 0 && (
        <div className="mt-2 grid w-full max-w-[280px] grid-cols-2 gap-x-3 gap-y-1.5 border-t border-neutral-100 pt-3">
          {callouts.map((c, i) => (
            <div
              key={c.n}
              className="anim-fade-up flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-neutral-500"
              style={{ animationDelay: `${500 + i * 80}ms` }}
            >
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-neutral-900 text-[8px] font-bold text-white">
                {c.n}
              </span>
              <span className="truncate">{c.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================ ESCENAS =============================== */

/* 1. Introducción al cerebro del motor */
function Scene1_Intro() {
  const callouts = [
    { n: "1", label: "Disipador de Al" },
    { n: "2", label: "Microprocesador 32-bit" },
    { n: "3", label: "Memoria Flash EEPROM" },
    { n: "4", label: "Carcasa IP67" },
    { n: "5", label: "Conector 121 Pines" },
  ];
  return (
    <SceneWrapper fig="Fig. 2.1" title="Arquitectura Hardware" callouts={callouts}>
      <svg viewBox="0 0 220 260" className="h-full w-full drop-shadow-sm">
        <defs>
          <linearGradient id="metal1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <linearGradient id="pcb1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#12603c" />
            <stop offset="100%" stopColor="#0a3823" />
          </linearGradient>
        </defs>

        <line x1="110" y1="10" x2="110" y2="250" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 4" />

        {/* Carcasa exterior y aletas */}
        <motion.g initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <rect x="40" y="20" width="140" height="36" rx="4" fill="url(#metal1)" stroke="#475569" strokeWidth="1" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <line key={i} x1={50 + i * 17} y1="20" x2={50 + i * 17} y2="10" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </motion.g>

        {/* Placa PCB + Procesador */}
        <motion.g initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.15 }}>
          <rect x="30" y="70" width="160" height="90" rx="3" fill="url(#pcb1)" stroke="#052e16" strokeWidth="1" />
          <path d="M 40 85 H 85 M 40 95 H 70 M 135 85 H 180 M 135 140 H 180" stroke="#4ade80" strokeWidth="1" opacity="0.4" fill="none" />
          <rect x="80" y="88" width="60" height="54" rx="2" fill="#18181b" stroke="#000" strokeWidth="1" />
          <text x="110" y="118" textAnchor="middle" fontSize="8" fontWeight="800" fill="#a1a1aa">ECU-32</text>
          {[...Array(8)].map((_, i) => (
            <rect key={`p${i}`} x={84 + i * 7} y="82" width="3" height="6" fill="#cbd5e1" />
          ))}
          {[...Array(8)].map((_, i) => (
            <rect key={`q${i}`} x={84 + i * 7} y="142" width="3" height="6" fill="#cbd5e1" />
          ))}
          <rect x="150" y="95" width="26" height="18" rx="1" fill="#27272a" stroke="#000" strokeWidth="0.8" />
        </motion.g>

        {/* Conector */}
        <motion.g initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <rect x="60" y="180" width="100" height="40" rx="3" fill="url(#metal1)" stroke="#334155" strokeWidth="1" />
          {[...Array(10)].map((_, i) => (
            <rect key={i} x={68 + i * 9} y="190" width="4" height="20" fill="#d97706" />
          ))}
        </motion.g>
      </svg>
    </SceneWrapper>
  );
}

/* 2. La llegada de datos desde sensores */
function Scene2_Sensors() {
  const callouts = [
    { n: "1", label: "Sensor Posición (CKP)" },
    { n: "2", label: "Presión Múltiple (MAP)" },
    { n: "3", label: "Temperatura (ECT)" },
    { n: "4", label: "Módulo ADC / Filtro" },
  ];

  return (
    <SceneWrapper fig="Fig. 2.2" title="Entrada Analógica / Digital" callouts={callouts}>
      <svg viewBox="0 0 220 240" className="h-full w-full">
        {/* ECU Central */}
        <rect x="85" y="90" width="50" height="60" rx="3" fill="#09090b" stroke="#27272a" strokeWidth="1" />
        <text x="110" y="123" textAnchor="middle" fontSize="8" fontWeight="800" fill="#fff">ADC</text>

        {/* Sensores Izquierda */}
        {[
          { y: 30, label: "CKP", wave: "M 15 30 L 30 30 L 30 20 L 45 20 L 45 30 L 60 30" },
          { y: 110, label: "MAP", wave: "M 15 110 Q 37.5 95 60 110" },
          { y: 190, label: "ECT", wave: "M 15 190 L 30 182 L 45 198 L 60 190" },
        ].map((s, i) => (
          <g key={i}>
            <rect x="10" y={s.y - 18} width="55" height="36" rx="2" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <path d={s.wave} fill="none" stroke="#175CFF" strokeWidth="1.2" />
            <text x="37" y={s.y + 13} textAnchor="middle" fontSize="7" fontWeight="800" fill="#0f172a">{s.label}</text>
            
            {/* Bus de datos con pulsos */}
            <path d={`M 65 ${s.y} L 85 ${100 + i * 20}`} fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="75" cy={(s.y + 100 + i * 20) / 2} r="2" fill="#175CFF">
              <animate attributeName="cx" values="65;85" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="cy" values={`${s.y};${100 + i * 20}`} dur="1.2s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
    </SceneWrapper>
  );
}

/* 3. Procesamiento central en milisegundos */
function Scene3_Processing() {
  const callouts = [
    { n: "1", label: "Reloj (40 MHz)" },
    { n: "2", label: "Unidad Lógica (ALU)" },
    { n: "3", label: "Registros de Ajuste" },
    { n: "4", label: "Latencia < 2.0 ms" },
  ];

  return (
    <SceneWrapper fig="Fig. 2.3" title="Ciclo de Cómputo Real-Time" callouts={callouts}>
      <svg viewBox="0 0 220 240" className="h-full w-full">
        {/* Núcleo CPU */}
        <rect x="50" y="40" width="120" height="120" rx="4" fill="#18181b" stroke="#000" strokeWidth="1.5" />
        <rect x="65" y="55" width="90" height="90" rx="2" fill="#27272a" />
        <text x="110" y="95" textAnchor="middle" fontSize="10" fontWeight="900" fill="#4ade80">MCU 32-BIT</text>
        <text x="110" y="112" textAnchor="middle" fontSize="8" fontMonospace fill="#a1a1aa">40,000 OPS/MS</text>

        {/* Reloj de Pulso */}
        <circle cx="110" cy="185" r="22" fill="none" stroke="#175CFF" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 110 185 L 110 168" stroke="#175CFF" strokeWidth="1.5" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 110 185" to="360 110 185" dur="1s" repeatCount="indefinite" />
        </path>
        <text x="110" y="222" textAnchor="middle" fontSize="8" fontWeight="800" fill="#175CFF">40 MHz FREQ</text>
      </svg>
    </SceneWrapper>
  );
}

/* 4. Cálculo de mezcla aire-combustible */
function Scene4_AirFuelMap() {
  const callouts = [
    { n: "1", label: "Eje X: Carga Motor (MAP)" },
    { n: "2", label: "Eje Y: RPM Motor" },
    { n: "3", label: "Celda Estequiométrica" },
    { n: "4", label: "AFR Target 14.7:1" },
  ];

  return (
    <SceneWrapper fig="Fig. 2.4" title="Matriz de Inyección 3D" callouts={callouts}>
      <svg viewBox="0 0 220 240" className="h-full w-full">
        {/* Mapeo 3D / Tabla de Grilla */}
        <g transform="translate(30, 40)">
          {[0, 1, 2, 3, 4].map((r) =>
            [0, 1, 2, 3, 4].map((c) => {
              const isTarget = r === 2 && c === 3;
              return (
                <rect
                  key={`${r}-${c}`}
                  x={c * 32}
                  y={r * 26}
                  width="28"
                  height="22"
                  rx="2"
                  fill={isTarget ? "#175CFF" : "#f1f5f9"}
                  stroke={isTarget ? "#1d4ed8" : "#cbd5e1"}
                  strokeWidth="1"
                />
              );
            })
          )}
          {/* Etiquetas interna valores */}
          <text x="110" y="66" textAnchor="middle" fontSize="8" fontWeight="900" fill="#fff">14.7</text>
        </g>
        
        {/* Ejes */}
        <text x="110" y="22" textAnchor="middle" fontSize="8" fontWeight="800" fill="#64748b">CARGA MOTOR (% MAP) →</text>
        <text x="12" y="110" textAnchor="middle" fontSize="8" fontWeight="800" fill="#64748b" transform="rotate(-90 12 110)">RPM MOTOR →</text>
      </svg>
    </SceneWrapper>
  );
}

/* 5. Ajuste del tiempo de inyección */
function Scene5_InjectionPulse() {
  const callouts = [
    { n: "1", label: "Señal PWM (5V)" },
    { n: "2", label: "Ancho de Pulso (Ti)" },
    { n: "3", label: "Solenoide Inyector" },
    { n: "4", label: "Spray Atomizado" },
  ];

  return (
    <SceneWrapper fig="Fig. 2.5" title="Control de Inyector (Pulse Width)" callouts={callouts}>
      <svg viewBox="0 0 220 240" className="h-full w-full">
        {/* Señal cuadrada PWM */}
        <path d="M 20 60 H 50 V 20 H 110 V 60 H 200" fill="none" stroke="#0A0A0A" strokeWidth="1.5" />
        <line x1="50" y1="72" x2="110" y2="72" stroke="#FF5A1F" strokeWidth="1.5" />
        <text x="80" y="86" textAnchor="middle" fontSize="8" fontWeight="800" fill="#FF5A1F">Ti = 2.45 ms</text>

        {/* Inyector físico */}
        <g transform="translate(80, 100)">
          <rect x="20" y="10" width="20" height="50" rx="2" fill="#3f3f46" stroke="#000" strokeWidth="1" />
          <path d="M 25 60 L 15 90 L 45 90 L 35 60 Z" fill="#71717a" stroke="#000" strokeWidth="1" />
          {/* Pulverización de combustible */}
          <path d="M 20 92 L 5 125 M 30 92 L 30 130 M 40 92 L 55 125" stroke="#FF5A1F" strokeWidth="1.2" strokeDasharray="2 2">
            <animate attributeName="stroke-dashoffset" values="10;0" dur="0.3s" repeatCount="indefinite" />
          </path>
        </g>
      </svg>
    </SceneWrapper>
  );
}

/* 6. Sincronización precisa de la chispa */
function Scene6_SparkSync() {
  const callouts = [
    { n: "1", label: "Pistón en Compresión" },
    { n: "2", label: "Punto Muerto Sup. (PMS)" },
    { n: "3", label: "Avance de Chispa (°BTDC)" },
    { n: "4", label: "Arco Eléctrico (25kV)" },
  ];

  return (
    <SceneWrapper fig="Fig. 2.6" title="Avance de Encendido Óptimo" callouts={callouts}>
      <svg viewBox="0 0 220 240" className="h-full w-full">
        {/* Cilindro */}
        <rect x="65" y="40" width="90" height="130" fill="none" stroke="#0A0A0A" strokeWidth="1.5" />
        
        {/* Pistón */}
        <rect x="68" y="90" width="84" height="60" rx="2" fill="#94a3b8" stroke="#334155" strokeWidth="1" />
        
        {/* Bujía */}
        <rect x="103" y="15" width="14" height="30" fill="#e2e8f0" stroke="#000" strokeWidth="1" />
        <line x1="110" y1="45" x2="110" y2="52" stroke="#000" strokeWidth="1.5" />

        {/* Chispa viva */}
        <path d="M 110 52 L 107 57 L 113 60 L 110 66" fill="none" stroke="#FF5A1F" strokeWidth="2" strokeLinecap="round">
          <animate attributeName="opacity" values="1;0;1" dur="0.15s" repeatCount="indefinite" />
        </path>

        {/* Indicador PMS */}
        <line x1="45" y1="80" x2="175" y2="80" stroke="#FF5A1F" strokeWidth="1" strokeDasharray="2 2" />
        <text x="180" y="83" textAnchor="start" fontSize="7" fontWeight="800" fill="#FF5A1F">12° BTDC</text>
      </svg>
    </SceneWrapper>
  );
}

/* 7. Monitoreo constante de emisiones */
function Scene7_Emissions() {
  const callouts = [
    { n: "1", label: "Gases de Escape" },
    { n: "2", label: "Sonda Lambda (O₂)" },
    { n: "3", label: "Lazo Cerrado (Closed Loop)" },
    { n: "4", label: "Eficiencia Catalítica" },
  ];

  return (
    <SceneWrapper fig="Fig. 2.7" title="Retroalimentación de O₂" callouts={callouts}>
      <svg viewBox="0 0 220 240" className="h-full w-full">
        {/* Tubería de escape */}
        <path d="M 20 120 H 200" stroke="#64748b" strokeWidth="24" strokeLinecap="round" fill="none" />
        <path d="M 20 120 H 200" stroke="#f8fafc" strokeWidth="18" strokeLinecap="round" fill="none" />

        {/* Sensor de Oxígeno */}
        <rect x="100" y="65" width="20" height="40" rx="2" fill="#1e293b" stroke="#000" strokeWidth="1" />
        <path d="M 110 105 L 110 120" stroke="#FF5A1F" strokeWidth="2" />

        {/* Bucle de señal cerrado */}
        <path d="M 110 65 V 35 H 170 V 160 H 110 V 135" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3">
          <animate attributeName="stroke-dashoffset" values="12;0" dur="1s" repeatCount="indefinite" />
        </path>
        <text x="175" y="100" textAnchor="start" fontSize="7" fontWeight="800" fill="#10B981">LAMBDA = 1.00</text>
      </svg>
    </SceneWrapper>
  );
}

/* 8. Adaptación a condiciones de manejo */
function Scene8_Adaptation() {
  const callouts = [
    { n: "1", label: "Ajuste Corto Plazo (STFT)" },
    { n: "2", label: "Ajuste Largo Plazo (LTFT)" },
    { n: "3", label: "Compensación de Altitud" },
    { n: "4", label: "Margen de Corrección" },
  ];

  return (
    <SceneWrapper fig="Fig. 2.8" title="Auto-Aprendizaje y Corrección" callouts={callouts}>
      <svg viewBox="0 0 220 240" className="h-full w-full">
        {/* Gráfico de barras de compensación STFT / LTFT */}
        <line x1="30" y1="110" x2="190" y2="110" stroke="#0A0A0A" strokeWidth="1" />
        <text x="195" y="113" textAnchor="start" fontSize="7" fontWeight="800" fill="#0A0A0A">0%</text>

        {/* STFT */}
        <rect x="60" y="70" width="35" height="40" fill="#175CFF" rx="2" />
        <text x="77.5" y="62" textAnchor="middle" fontSize="8" fontWeight="800" fill="#175CFF">+3.2%</text>
        <text x="77.5" y="128" textAnchor="middle" fontSize="8" fontWeight="800" fill="#64748b">STFT</text>

        {/* LTFT */}
        <rect x="125" y="85" width="35" height="25" fill="#0A0A0A" rx="2" />
        <text x="142.5" y="77" textAnchor="middle" fontSize="8" fontWeight="800" fill="#0A0A0A">+1.8%</text>
        <text x="142.5" y="128" textAnchor="middle" fontSize="8" fontWeight="800" fill="#64748b">LTFT</text>
      </svg>
    </SceneWrapper>
  );
}

/* 9. Diagnóstico y detección de fallas */
function Scene9_Diagnostics() {
  const callouts = [
    { n: "1", label: "Monitoreo de Misfire" },
    { n: "2", label: "Registro Código DTC" },
    { n: "3", label: "Memoria No Volátil" },
    { n: "4", label: "Puerto OBD-II SAE J1962" },
  ];

  return (
    <SceneWrapper fig="Fig. 2.9" title="Detección de Fallas en Memoria" callouts={callouts}>
      <svg viewBox="0 0 220 240" className="h-full w-full">
        {/* Cuadro de Alerta / Código */}
        <rect x="35" y="40" width="150" height="70" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="110" y="70" textAnchor="middle" fontSize="14" fontWeight="900" fill="#dc2626">DTC P0300</text>
        <text x="110" y="90" textAnchor="middle" fontSize="7" fontWeight="700" fill="#991b1b">MISFIRE MULTIPLE DETECTADO</text>

        {/* Conector OBD2 */}
        <g transform="translate(50, 140)">
          <rect x="0" y="0" width="120" height="40" rx="3" fill="#18181b" stroke="#000" strokeWidth="1" />
          {[...Array(8)].map((_, i) => (
            <rect key={i} x={12 + i * 13} y="10" width="5" height="8" fill="#e2e8f0" />
          ))}
          {[...Array(8)].map((_, i) => (
            <rect key={`b${i}`} x={12 + i * 13} y="22" width="5" height="8" fill="#e2e8f0" />
          ))}
        </g>
      </svg>
    </SceneWrapper>
  );
}

/* 10. Activación de alertas de mantenimiento */
function Scene10_Alerts() {
  const callouts = [
    { n: "1", label: "Testigo MIL (Check Engine)" },
    { n: "2", label: "Modo Protegido (Limp Mode)" },
    { n: "3", label: "Límite RPM Seguro (2500)" },
    { n: "4", label: "Protección Mecánica" },
  ];

  return (
    <SceneWrapper fig="Fig. 2.10" title="Protección y Alerta MIL" callouts={callouts}>
      <svg viewBox="0 0 220 240" className="h-full w-full">
        {/* Ícono Check Engine MIL */}
        <g transform="translate(60, 45)">
          <path
            d="M 20 20 H 30 V 10 H 70 V 20 H 80 L 90 35 V 70 H 80 V 80 H 70 V 70 H 30 V 80 H 20 V 70 H 10 V 35 Z"
            fill="#f59e0b"
            stroke="#b45309"
            strokeWidth="2"
          >
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
          </path>
          <text x="50" y="48" textAnchor="middle" fontSize="9" fontWeight="900" fill="#000">CHECK</text>
        </g>

        {/* Banner Limp Mode */}
        <rect x="35" y="155" width="150" height="30" rx="3" fill="#09090b" />
        <text x="110" y="174" textAnchor="middle" fontSize="8" fontWeight="800" fill="#f59e0b" letterSpacing="0.1em">
          MODO LIMP HOME ACTIVO
        </text>
      </svg>
    </SceneWrapper>
  );
}

/* 11. Resumen final y llamada a la acción */
function Scene11_SummaryCTA() {
  const [rate, setRate] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / 1200);
      setRate(Math.round(1000 * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const callouts = [
    { n: "1", label: "Sensado" },
    { n: "2", label: "Cálculo" },
    { n: "3", label: "Actuación" },
    { n: "4", label: "Monitoreo" },
  ];

  return (
    <SceneWrapper fig="Fig. 2.11" title="Ciclo Continuo de Control" callouts={callouts}>
      <svg viewBox="0 0 220 240" className="h-full w-full">
        {/* Círculo del Proceso Infinita */}
        <circle cx="110" cy="100" r="55" fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
        
        <g transform="translate(110, 100)">
          <circle r="55" fill="none" stroke="#175CFF" strokeWidth="2.5" strokeDasharray="80 260">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Contador Central */}
        <text x="110" y="96" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0A0A0A">{rate}</text>
        <text x="110" y="112" textAnchor="middle" fontSize="7" fontWeight="800" fill="#64748b">Cálculos / seg</text>

        {/* CTA abajo */}
        <rect x="40" y="180" width="140" height="34" rx="17" fill="#0A0A0A" />
        <text x="110" y="201" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" letterSpacing="0.12em">
          SÍGUENOS PARA EL DÍA 3
        </text>
      </svg>
    </SceneWrapper>
  );
}

/* --------------------------- Configuración 11 Escenas -------------------------------- */

const SCENES = [
  { eyebrow: "DÍA 2 · 1/11", badge: "El Cerebro", word: "gobierna", Diagram: Scene1_Intro, duration: 5500 },
  { eyebrow: "DÍA 2 · 2/11", badge: "Sensores", word: "escucha", Diagram: Scene2_Sensors, duration: 4800 },
  { eyebrow: "DÍA 2 · 3/11", badge: "Procesador", word: "analiza", Diagram: Scene3_Processing, duration: 4800 },
  { eyebrow: "DÍA 2 · 4/11", badge: "Mezcla Aire-Fuel", word: "calcula", Diagram: Scene4_AirFuelMap, duration: 4800 },
  { eyebrow: "DÍA 2 · 5/11", badge: "Inyección", word: "dosifica", Diagram: Scene5_InjectionPulse, duration: 4800 },
  { eyebrow: "DÍA 2 · 6/11", badge: "Encendido", word: "sincroniza", Diagram: Scene6_SparkSync, duration: 4800 },
  { eyebrow: "DÍA 2 · 7/11", badge: "Emisiones", word: "monitorea", Diagram: Scene7_Emissions, duration: 4800 },
  { eyebrow: "DÍA 2 · 8/11", badge: "Adaptación", word: "ajusta", Diagram: Scene8_Adaptation, duration: 4800 },
  { eyebrow: "DÍA 2 · 9/11", badge: "Diagnóstico", word: "detecta", Diagram: Scene9_Diagnostics, duration: 4800 },
  { eyebrow: "DÍA 2 · 10/11", badge: "Alertas", word: "protege", Diagram: Scene10_Alerts, duration: 4800 },
  { eyebrow: "DÍA 2 · 11/11", badge: "Ciclo Continuo", word: "síguenos", Diagram: Scene11_SummaryCTA, duration: 5600 },
];

/* ------------------------------ App Principal ---------------------------------- */

export default function Page() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [chrome, setChrome] = useState(true);
  const startRef = useRef(Date.now());
  const scene = SCENES[step];
  const Diagram = scene.Diagram;

  useEffect(() => {
    setProgress(0);
    startRef.current = Date.now();
  }, [step]);

  useEffect(() => {
    if (!playing) return;
    let raf;
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min(100, (elapsed / scene.duration) * 100);
      setProgress(pct);
      if (pct >= 100) {
        setStep((s) => (s + 1) % SCENES.length);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, step, scene.duration]);

  const next = useCallback(() => setStep((s) => (s + 1) % SCENES.length), []);
  const prev = useCallback(() => setStep((s) => (s - 1 + SCENES.length) % SCENES.length), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.code === "Space") {
        e.preventDefault();
        setPlaying((p) => !p);
      } else if (e.key.toLowerCase() === "f") {
        setChrome((c) => !c);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-neutral-200 p-6 font-sans">
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px);} to { opacity:1; transform:translateY(0);} }
        @keyframes popIn { from { opacity:0; transform:scale(.92);} to { opacity:1; transform:scale(1);} }
        .anim-fade-up { animation: fadeUp .5s ease both; }
        .anim-pop { animation: popIn .45s cubic-bezier(.2,.8,.2,1) both; }
      `}</style>

      {/* Canvas 9:16 para Reels / Shorts */}
      <div
        className="relative overflow-hidden bg-white shadow-2xl rounded-2xl"
        style={{ aspectRatio: "9 / 16", height: "min(86vh, 900px)" }}
      >
        <div key={step} className="absolute inset-0 flex flex-col justify-between">
          <div className="flex items-center justify-between px-8 pt-8 anim-fade-up">
            <span className="text-[10px] font-bold tracking-[0.22em] text-neutral-300">{scene.eyebrow}</span>
            <span className="text-[10px] font-bold tracking-[0.22em] text-neutral-300">AUTO 101</span>
          </div>

          <div className="mt-2 flex justify-center">
            <Pill>{scene.badge}</Pill>
          </div>

          <div className="flex flex-1 items-center justify-center px-4">
            <Diagram />
          </div>

          <div className="pb-12 pt-2 text-center">
            <h2
              className="text-5xl font-black tracking-tight text-neutral-950 anim-pop"
              style={{ animationDelay: "180ms" }}
            >
              {scene.word}
            </h2>
          </div>

          {/* Barra de progreso de 11 pasos */}
          <div className="absolute bottom-0 left-0 right-0 flex gap-1 px-3 pb-3">
            {SCENES.map((_, i) => (
              <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full bg-neutral-900"
                  style={{
                    width: i < step ? "100%" : i === step ? `${progress}%` : "0%",
                    transition: i === step ? "width 60ms linear" : "none",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controles del reproductor */}
      {chrome ? (
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-full bg-neutral-900 px-5 py-3 text-white shadow-xl">
          <button onClick={prev} className="rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-white/10" aria-label="Anterior">
            ‹
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold hover:bg-white/20"
          >
            {playing ? "Pausar" : "Reproducir"}
          </button>
          <button onClick={next} className="rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-white/10" aria-label="Siguiente">
            ›
          </button>

          <div className="mx-1 flex items-center gap-1.5">
            {SCENES.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`h-1.5 rounded-full transition-all ${i === step ? "w-5 bg-white" : "w-1.5 bg-white/30"}`}
                aria-label={`Escena ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setChrome(false)}
            className="rounded-full px-3 py-1.5 text-xs font-semibold text-white/60 hover:bg-white/10 hover:text-white"
          >
            Ocultar (F)
          </button>
        </div>
      ) : (
        <button
          onClick={() => setChrome(true)}
          className="fixed bottom-5 right-5 rounded-full bg-neutral-900/80 px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-neutral-900"
        >
          Mostrar controles (F)
        </button>
      )}
    </div>
  );
}