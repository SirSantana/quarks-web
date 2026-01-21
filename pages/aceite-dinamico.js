import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function TiposAceite() {
  const [tipo, setTipo] = useState("sintetico");
  const [modoAnimacion, setModoAnimacion] = useState(false);

  const aceites = {
    mineral: {
      nombre: "MINERAL",
      color: "#92400E",
      durabilidad: 3000,
      proteccion: 60,
      precio: "$",
      descripcion: "Base natural, menor refinamiento"
    },
    semisintetico: {
      nombre: "SEMI-SINTÉTICO",
      color: "#F59E0B",
      durabilidad: 5000,
      proteccion: 80,
      precio: "$$",
      descripcion: "Mezcla de mineral y sintético"
    },
    sintetico: {
      nombre: "SINTÉTICO",
      color: "#3B82F6",
      durabilidad: 10000,
      proteccion: 100,
      precio: "$$$",
      descripcion: "Máxima tecnología y rendimiento"
    }
  };

  const cambiarTipo = () => {
    const tipos = Object.keys(aceites);
    const currentIndex = tipos.indexOf(tipo);
    const nextIndex = (currentIndex + 1) % tipos.length;
    setTipo(tipos[nextIndex]);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center justify-center gap-16 relative overflow-hidden">
      
      {/* Grid pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Gradientes */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: aceites[tipo].color }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: aceites[tipo].color }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.12, 0.08, 0.12],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      {/* BOTÓN DE MODO */}
      <button
        onClick={() => setModoAnimacion(!modoAnimacion)}
        className="fixed top-8 right-8 z-50 px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-gray-700 transition-all shadow-2xl hover:scale-105 border-2 border-white"
      >
        {modoAnimacion ? "📊 Ver Todo" : "🎬 Solo Animación"}
      </button>

      {/* FLECHAS DE NAVEGACIÓN */}
      <div className="fixed bottom-8 right-8 z-50 flex gap-4">
        <button
          onClick={() => {
            const tipos = Object.keys(aceites);
            const currentIndex = tipos.indexOf(tipo);
            const prevIndex = currentIndex === 0 ? tipos.length - 1 : currentIndex - 1;
            setTipo(tipos[prevIndex]);
          }}
          className="w-16 h-16 bg-gray-900 text-white rounded-full font-bold text-3xl hover:bg-gray-700 transition-all shadow-2xl hover:scale-110 border-2 border-white flex items-center justify-center"
        >
          ←
        </button>
        <button
          onClick={() => {
            const tipos = Object.keys(aceites);
            const currentIndex = tipos.indexOf(tipo);
            const nextIndex = (currentIndex + 1) % tipos.length;
            setTipo(tipos[nextIndex]);
          }}
          className="w-16 h-16 bg-gray-900 text-white rounded-full font-bold text-3xl hover:bg-gray-700 transition-all shadow-2xl hover:scale-110 border-2 border-white flex items-center justify-center"
        >
          →
        </button>
      </div>
      
      <div className="relative z-10 flex flex-col items-center gap-16">

      {/* Título */}
      {!modoAnimacion && (
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-8xl font-black text-gray-900 tracking-tight"
        >
          TIPOS DE ACEITE
        </motion.h1>
      )}

      {/* Selector */}
      {!modoAnimacion && (
        <div className="flex gap-12">
          {Object.keys(aceites).map((t, idx) => (
            <motion.button
              key={t}
              onClick={() => setTipo(t)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: tipo === t ? 1 : 0.4,
                scale: tipo === t ? 1.1 : 1,
              }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: tipo === t ? 1.1 : 1.05 }}
              className="px-12 py-6 rounded-2xl font-black text-3xl transition-all duration-300"
              style={{
                background: tipo === t ? aceites[t].color : "white",
                border: `3px solid ${aceites[t].color}`,
                color: tipo === t ? "white" : aceites[t].color,
                boxShadow: tipo === t ? `0 0 40px ${aceites[t].color}60` : "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {aceites[t].nombre}
            </motion.button>
          ))}
        </div>
      )}

      {/* Animación Central */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tipo}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: modoAnimacion ? 1.5 : 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex items-center gap-32"
        >
          {/* Molécula */}
          <div 
            className="relative cursor-pointer"
            style={{
              width: modoAnimacion ? '600px' : '320px',
              height: modoAnimacion ? '600px' : '320px',
            }}
            onClick={cambiarTipo}
          >
            {/* Partículas según tipo */}
            {tipo === "mineral" && (
              <>
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: 40 + Math.random() * 30,
                      height: 40 + Math.random() * 30,
                      background: aceites[tipo].color,
                      left: `${Math.random() * 80}%`,
                      top: `${Math.random() * 80}%`,
                    }}
                    animate={{
                      x: [0, Math.random() * 20 - 10, 0],
                      y: [0, Math.random() * 20 - 10, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </>
            )}

            {tipo === "semisintetico" && (
              <>
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: i % 2 === 0 ? 50 : 25,
                      height: i % 2 === 0 ? 50 : 25,
                      background: i % 2 === 0 ? aceites[tipo].color : "#FCD34D",
                      left: `${20 + (i % 4) * 20}%`,
                      top: `${20 + Math.floor(i / 4) * 20}%`,
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </>
            )}

            {tipo === "sintetico" && (
              <>
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: 20,
                      height: 20,
                      background: aceites[tipo].color,
                      left: "50%",
                      top: "50%",
                    }}
                    animate={{
                      x: Math.cos((i / 20) * Math.PI * 2) * (modoAnimacion ? 200 : 120),
                      y: Math.sin((i / 20) * Math.PI * 2) * (modoAnimacion ? 200 : 120),
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </>
            )}
          </div>

          {/* Estadísticas */}
          {!modoAnimacion && (
          <div className="space-y-10">
            <div>
              <p className="text-gray-600 text-xl mb-3">DURABILIDAD</p>
              <div className="w-96 h-8 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(aceites[tipo].durabilidad / 10000) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: aceites[tipo].color }}
                />
              </div>
              <p className="text-gray-900 text-2xl font-bold mt-2">
                {aceites[tipo].durabilidad.toLocaleString()} km
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-xl mb-3">PROTECCIÓN</p>
              <div className="w-96 h-8 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${aceites[tipo].proteccion}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="h-full rounded-full"
                  style={{ background: aceites[tipo].color }}
                />
              </div>
              <p className="text-gray-900 text-2xl font-bold mt-2">
                {aceites[tipo].proteccion}%
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-xl mb-3">PRECIO</p>
              <p 
                className="text-6xl font-black"
                style={{ color: aceites[tipo].color }}
              >
                {aceites[tipo].precio}
              </p>
            </div>
          </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Descripción */}
      {!modoAnimacion && (
      <AnimatePresence mode="wait">
        <motion.p
          key={tipo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-gray-600 text-2xl text-center max-w-2xl"
        >
          {aceites[tipo].descripcion}
        </motion.p>
      </AnimatePresence>
      )}
      </div>
    </div>
  );
}