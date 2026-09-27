'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';

export default function UIContainer({ 
  currentStep, 
  totalSteps, 
  stepData, 
  onNext, 
  onPrev, 
  onSelectStep, 
  isPlaying, 
  onTogglePlay, 
  children 
}) {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white text-slate-900 font-sans p-6 select-none overflow-hidden">
      
  

      {/* 2. Área Central Visual (Sin boxes, sin borders, fondo limpio) */}
      <main className="relative w-full max-w-sm h-[380px] my-auto flex items-center justify-center">
        {children}


      </main>

      {/* 3. Bloque de Texto Tipográfico Limpio (Estilo TikTok Educativo) */}
      <footer className="w-full max-w-sm flex flex-col items-center text-center z-10 pb-4">
        
        

        {/* Botones de Control Sutiles */}
        <div className="flex items-center justify-between w-full px-8 mt-2">
      

          <button
            onClick={onTogglePlay}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold tracking-wider uppercase shadow-sm active:scale-95 transition"
          >
            {isPlaying ? <RotateCcw size={13} /> : <Play size={13} />}
            <span>{isPlaying ? 'Pausa' : 'Demo'}</span>
          </button>

          
        </div>

      </footer>

    </div>
  );
}







// 'use client';

// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Play, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';

// export default function UIContainer({ 
//   currentStep, 
//   totalSteps, 
//   stepData, 
//   onNext, 
//   onPrev, 
//   onSelectStep, 
//   isPlaying, 
//   onTogglePlay, 
//   children 
// }) {
//   return (
//     <div className="flex flex-col items-center justify-between min-h-screen bg-white text-slate-900 font-sans p-6 select-none overflow-hidden">
      
//       {/* 1. Header Minimalista */}
//       <header className="w-full max-w-sm pt-4 flex flex-col items-center text-center z-10">
//         <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-1">
//           MECÁNICA AUTOMOTRIZ
//         </span>
//         <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
//           ¿Cómo funciona tu <span className="text-blue-600">auto</span>?
//         </h1>
//         <div className="w-8 h-[2px] bg-slate-100 my-2" />
//       </header>

//       {/* 2. Área Central Visual (Sin boxes, sin borders, fondo limpio) */}
//       <main className="relative w-full max-w-sm h-[380px] my-auto flex items-center justify-center">
//         {children}
//       </main>

//       {/* 3. Bloque de Texto Tipográfico Limpio (Estilo TikTok Educativo) */}
//       <footer className="w-full max-w-sm flex flex-col items-center text-center z-10 pb-4">
        
//         {/* Etiqueta de Datos / Métrica Flotante */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={`tag-${currentStep}`}
//             initial={{ opacity: 0, y: 5 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -5 }}
//             className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-mono font-bold tracking-wider mb-3 uppercase"
//           >
//             {stepData.dataTag}
//           </motion.div>
//         </AnimatePresence>

//         {/* Título y Descripción Flotando en el Fondo Blanco */}
//         <div className="h-28 flex flex-col items-center justify-start">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentStep}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.25 }}
//               className="flex flex-col items-center"
//             >
//               <h2 className="text-xl font-black text-slate-900 tracking-tight">
//                 {stepData.title}
//               </h2>
//               <p className="text-xs font-medium text-slate-500 leading-relaxed mt-1.5 max-w-[280px]">
//                 {stepData.description}
//               </p>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Indicadores Minimalistas de Pasos */}
//         <div className="flex gap-2 my-4">
//           {Array.from({ length: totalSteps }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => onSelectStep(index)}
//               className={`h-1.5 rounded-full transition-all duration-300 ${
//                 currentStep === index ? 'w-8 bg-blue-600' : 'w-1.5 bg-slate-200'
//               }`}
//             />
//           ))}
//         </div>

//         {/* Botones de Control Sutiles */}
//         <div className="flex items-center justify-between w-full px-8 mt-2">
//           <button
//             onClick={onPrev}
//             className="p-2 text-slate-400 hover:text-slate-800 transition active:scale-95"
//           >
//             <ChevronLeft size={20} />
//           </button>

//           <button
//             onClick={onTogglePlay}
//             className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold tracking-wider uppercase shadow-sm active:scale-95 transition"
//           >
//             {isPlaying ? <RotateCcw size={13} /> : <Play size={13} />}
//             <span>{isPlaying ? 'Pausa' : 'Demo'}</span>
//           </button>

//           <button
//             onClick={onNext}
//             className="p-2 text-slate-400 hover:text-slate-800 transition active:scale-95"
//           >
//             <ChevronRight size={20} />
//           </button>
//         </div>

//       </footer>

//     </div>
//   );
// }