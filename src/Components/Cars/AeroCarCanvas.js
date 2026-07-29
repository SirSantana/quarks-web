"use client";

import React, { useState, useEffect } from 'react';

// Orden de las escenas para la navegación con flechas
const ESCENAS = ['GENERAL', 'ESPECIFICACIONES', 'MECANICA', 'HISTORIA'];

export default function CanvasDirectorTeclado() {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [engineActive, setEngineActive] = useState(false);

  // Telemetría para video
  const [rpm, setRpm] = useState(0);
  const [speed, setSpeed] = useState(0);

  const cameraView = ESCENAS[currentSceneIdx];

  // Efecto para controlar la física simulada del motor
  useEffect(() => {
    let interval;
    if (engineActive) {
      setRpm(1450);
      interval = setInterval(() => {
        setSpeed((prev) => (prev < 60 ? +(prev + 2.0).toFixed(1) : 60));
      }, 50);
    } else {
      setRpm(0);
      interval = setInterval(() => {
        setSpeed((prev) => (prev > 0 ? +(prev - 3.0).toFixed(1) : 0));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [engineActive]);

  // Capturador de eventos del teclado (Flechas y Espacio)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        setCurrentSceneIdx((prev) => (prev + 1) % ESCENAS.length);
      } else if (event.key === 'ArrowLeft') {
        setCurrentSceneIdx((prev) => (prev - 1 + ESCENAS.length) % ESCENAS.length);
      } else if (event.key === ' ' || event.code === 'Space') {
        event.preventDefault(); // Evita el scroll de página al presionar espacio
        setEngineActive((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cinemática de la cámara: Desplazamientos sutiles para pantallas divididas
  const getCameraStyles = () => {
    switch (cameraView) {
      case 'ESPECIFICACIONES':
        return 'scale-90 translate-x-[25%] translate-y-0';
      case 'MECANICA':
        return 'scale-[1.12] -translate-x-[25%] translate-y-[3%]';
      case 'HISTORIA':
        return 'scale-85 translate-x-0 -translate-y-[18%]';
      default:
        return 'scale-100 translate-x-0 translate-y-0';
    }
  };

  return (
    <div className="relative w-screen h-screen bg-[#07162c] text-white font-mono overflow-hidden flex items-center justify-center select-none">
      
      {/* =========================================================
          MALLA TÉCNICA DOBLE (BLUEPRINT GRID COMPUESTO)
          ========================================================= */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(#00f2fe 1px, transparent 1px), 
            linear-gradient(90deg, #00f2fe 1px, transparent 1px),
            linear-gradient(#00f2fe 0.5px, transparent 0.5px), 
            linear-gradient(90deg, #00f2fe 0.5px, transparent 0.5px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px'
        }}
      />

      {/* Identificador superior izquierdo fijo */}
      <div className="absolute top-8 left-8 z-30 pointer-events-none border-l-2 border-[#00f2fe] pl-4 py-1">
        <span className="text-[#00f2fe] text-xs tracking-widest block font-bold">MILITARY ENGINE ARCHIVE // SCALE 1:15</span>
        <h1 className="text-2xl font-black tracking-tight text-white uppercase">AEROSANI NKL-26 // BLUEPRINT</h1>
      </div>

      {/* Indicador sutil de guía de controles en pantalla (Ideal para acordarte al grabar) */}
      <div className="absolute top-8 right-8 z-30 pointer-events-none opacity-20 text-[9px] tracking-wider text-right text-cyan-400">
        CONTROLES EN VIVO:<br />
        [← / →] CAMBIAR ESCENA // [ESPACIO] MOTOR
      </div>

      {/* =========================================================
          1. LIENZO DEL VEHÍCULO (TRANSLACIONES CINEMÁTICAS)
          ========================================================= */}
      <div className="absolute inset-0 flex items-center justify-center p-12 z-10 pointer-events-none">
        <div className={`w-full h-full flex items-center justify-center transition-all duration-[1200ms] ease-in-out transform ${getCameraStyles()}`}>
          <img 
            src="https://res.cloudinary.com/db3veuotr/image/upload/v1783706828/image_2432_cya6xr.png" 
            alt="Plano Técnico" 
            className="max-w-[80%] max-h-[80%] object-contain opacity-95 contrast-110 brightness-100 transition-all duration-500"
          />
        </div>
      </div>

      {/* =========================================================
          2. BLOQUES INFOGRÁFICOS INDUSTRIALES (ALTA VISIBILIDAD)
          ========================================================= */}
      
      {/* BLOQUE A: ESPECIFICACIONES (LADO IZQUIERDO) */}
      <div className={`absolute left-12 top-0 bottom-0 w-[32rem] z-20 flex flex-col justify-center transition-all duration-700 ${
        cameraView === 'ESPECIFICACIONES' ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-20 pointer-events-none'
      }`}>
        <div className="space-y-8 p-6 border border-[#00f2fe]/20 bg-[#07162c]/90 backdrop-blur-md rounded shadow-2xl">
          <div className="text-[#00f2fe] text-xs tracking-widest font-bold">// DIMENSIONS & STRUCTURAL DATA</div>
          
          <div className="grid grid-cols-2 gap-y-8 gap-x-4">
            <div>
              <span className="text-[11px] text-cyan-400/60 block uppercase tracking-wider">MASA TOTAL</span>
              <span className="text-5xl font-black tracking-tight text-white">1,400 <span className="text-xl font-medium text-cyan-400">KG</span></span>
            </div>
            <div>
              <span className="text-[11px] text-cyan-400/60 block uppercase tracking-wider">ARMOR MAX</span>
              <span className="text-5xl font-black tracking-tight text-white">10 <span className="text-xl font-medium text-cyan-400">MM</span></span>
            </div>
            <div>
              <span className="text-[11px] text-cyan-400/60 block uppercase tracking-wider">CREW CAP</span>
              <span className="text-5xl font-black tracking-tight text-white">02 <span className="text-xl font-medium text-cyan-400">OP</span></span>
            </div>
            <div>
              <span className="text-[11px] text-cyan-400/60 block uppercase tracking-wider">WEAPON MOD</span>
              <span className="text-4xl font-black tracking-tight text-[#00f2fe] uppercase">DT 7.62</span>
            </div>
          </div>
        </div>
      </div>

      {/* BLOQUE B: TELEMETRÍA MECÁNICA (LADO DERECHO) */}
      <div className={`absolute right-12 top-0 bottom-0 w-[30rem] z-20 flex flex-col justify-center transition-all duration-700 ${
        cameraView === 'MECANICA' ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-20 pointer-events-none'
      }`}>
        <div className="space-y-8 p-6 border border-[#00f2fe]/20 bg-[#07162c]/90 backdrop-blur-md rounded shadow-2xl">
          <div className="text-[#00f2fe] text-xs tracking-widest font-bold">// DYNAMIC SYSTEMS / LIVE TELEMETRY</div>
          
          <div className="space-y-6">
            <div>
              <span className="text-[11px] text-cyan-400/60 block uppercase tracking-wider">CALCULATED VELOCITY</span>
              <span className="text-6xl font-black tracking-tighter text-white">{speed} <span className="text-2xl font-bold text-[#00f2fe]">KM/H</span></span>
            </div>
            <div>
              <span className="text-[11px] text-cyan-400/60 block uppercase tracking-wider">ENGINE PROPULSION RATE</span>
              <span className="text-5xl font-black tracking-tighter text-white">{rpm} <span className="text-xl font-medium text-cyan-400/50">RPM</span></span>
            </div>
            <div className="pt-4 border-t border-[#00f2fe]/10">
              <span className="text-[11px] text-cyan-400 block uppercase mb-1">PLANT SPECIFICATIONS</span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Motor Shvetsov M-11 de cinco cilindros en estrella montado en la popa. Transmite empuje directo mediante hélice bipalas de madera, anulando fricción por tren de engranajes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BLOQUE C: CONTEXTO HISTÓRICO (INFERIOR) */}
      <div className={`absolute bottom-12 left-12 right-12 h-36 z-20 transition-all duration-700 ${
        cameraView === 'HISTORIA' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-20 pointer-events-none'
      }`}>
        <div className="grid grid-cols-4 gap-6 items-center h-full max-w-6xl mx-auto p-6 border border-[#00f2fe]/20 bg-[#07162c]/90 backdrop-blur-md rounded shadow-2xl">
          <div className="col-span-1 border-r border-[#00f2fe]/20 pr-4">
            <span className="text-6xl font-black tracking-tighter text-[#00f2fe] block">1942</span>
            <span className="text-[10px] text-cyan-400/50 uppercase tracking-widest block mt-1">OPERATIONAL RECORD</span>
          </div>
          <div className="col-span-3">
            <span className="text-[11px] text-cyan-400 font-mono block uppercase mb-1">// SYSTEM LOGISTICS</span>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Organizados en Batallones Autónomos de Combate de Aerosanis. Proporcionaban alta maniobrabilidad táctica en reconocimiento avanzado y flanqueo rápido sobre capas de nieve espesa y hielo ártico inestable.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}