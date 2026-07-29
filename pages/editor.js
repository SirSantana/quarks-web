"use client";

import { useState, useMemo, useRef, useEffect, useCallback, useLayoutEffect } from "react";

/* -------------------------------------------------------------------- */
/* Utilidades                                                          */
/* -------------------------------------------------------------------- */
function seeded(seed) {
  const x = Math.sin(seed * 999.7) * 10000;
  return x - Math.floor(x);
}

function shuffle(arr, salt = 1) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(seeded((i + 1) * 13.7 * salt) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildSnakePath(cols, rows) {
  const path = [];
  for (let r = 0; r < rows; r++) {
    if (r % 2 === 0) {
      for (let c = 0; c < cols; c++) path.push({ row: r, col: c });
    } else {
      for (let c = cols - 1; c >= 0; c--) path.push({ row: r, col: c });
    }
  }
  return path;
}

function formatTimecode(ms) {
  const totalFrames = Math.floor(ms / (1000 / 24));
  const frames = totalFrames % 24;
  const totalSeconds = Math.floor(totalFrames / 24);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  const pad = (n, l = 2) => String(n).padStart(l, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}

/* -------------------------------------------------------------------- */
/* Componente Principal                                                */
/* -------------------------------------------------------------------- */
export default function UltimateCinematicWall() {
  const [images, setImages] = useState([]); 
  const [minCells, setMinCells] = useState(14); 
  const [depthPct, setDepthPct] = useState(45); 
  const [holdSec, setHoldSec] = useState(6.5); 
  const [grain, setGrain] = useState(true);
  const [mono, setMono] = useState(false);
  const [hideUI, setHideUI] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [step, setStep] = useState(0);
  
  // Modos de color cinematográfico (Estilo LUT de cámara)
  const [lutMode, setLutMode] = useState("normal"); // "normal" | "mono" | "warm"

  const startRef = useRef(Date.now());
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const [size, setSize] = useState({ w: 1280, h: 720 });

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const box = entries[0].contentRect;
      setSize({ w: box.width, h: box.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setElapsed(Date.now() - startRef.current), 1000 / 24);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === "h") setHideUI((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    return () => images.forEach((img) => URL.revokeObjectURL(img.url));
  }, [images]);

  /* ------------------------ construcción de la grilla ------------------------ */
  const grid = useMemo(() => {
    const count = Math.max(images.length, minCells);
    const cols = Math.max(3, Math.round(Math.sqrt((count * 16) / 9)));
    const rows = Math.max(3, Math.ceil(count / cols));
    const total = cols * rows;

    let cellImages = [];
    if (images.length) {
      const pool = shuffle(images, 3.1);
      for (let i = 0; i < total; i++) cellImages.push(pool[i % pool.length]);
      cellImages = shuffle(cellImages, 7.7);
    } else {
      cellImages = Array.from({ length: total }, () => null);
    }

    const path = buildSnakePath(cols, rows);
    return { cols, rows, total, cellImages, path };
  }, [images, minCells]);

  useEffect(() => setStep(0), [grid.cols, grid.rows]);

  useEffect(() => {
    if (!images.length) return;
    const id = setInterval(() => {
      setStep((s) => (s + 1) % grid.path.length);
    }, holdSec * 1000);
    return () => clearInterval(id);
  }, [images.length, holdSec, grid.path.length]);

  const active = grid.path[step % grid.path.length] || { row: 0, col: 0 };

  /* ------------------------------ geometría de cámara ------------------------------ */
  const gap = 120; 
  const cellW = Math.max(900, size.w * 0.85); 
  const cellH = Math.max(550, size.h * 0.8);
  const worldW = grid.cols * (cellW + gap) - gap;
  const worldH = grid.rows * (cellH + gap) - gap;

  // Curva bezier hiper-suave customizada para emular grúas mecánicas de cine (Inercia pesada)
  const cinematicTiming = "cubic-bezier(0.2, 0.9, 0.1, 1)";

  const offsetX = size.w / 2 - (active.col * (cellW + gap) + cellW / 2);
  const offsetY = size.h / 2 - (active.row * (cellH + gap) + cellH / 2);

  const depth = depthPct / 100;
  
  // Multiplicador de paralaje invertido para que la grilla técnica reaccione dinámicamente al fondo
  const gridPosX = active.col * -35; 
  const gridPosY = active.row * -35;

  /* ------------------------------ manejadores de estado ------------------------------ */
  const addFiles = useCallback((fileList) => {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;
    const next = files.map((f) => ({
      id: `${f.name}-${f.lastModified}-${Math.random().toString(36).slice(2)}`,
      url: URL.createObjectURL(f),
      name: f.name,
      title: "ARCHIVO CLASIFICADO",
      desc: "Evidencia fotográfica recuperada. Testimonios bajo registro indican anomalías persistentes en el eje de la captura.",
      layout: "right" 
    }));
    setImages((prev) => [...prev, ...next]);
  }, []);

  const updateImageField = (id, field, value) => {
    setImages((prev) => prev.map((img) => img.id === id ? { ...img, [field]: value } : img));
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((i) => i.id !== id);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  // Filtrado de color (Look Up Table analógica)
  const getFilterStyle = () => {
    if (lutMode === "mono") return "grayscale(1) contrast(1.2) brightness(0.85)";
    if (lutMode === "warm") return "sepia(0.25) contrast(1.05) saturate(1.1) brightness(0.95)";
    return "contrast(1.02) brightness(0.98)";
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#f0ede5] text-[#111111] font-mono select-none">
      
      {/* Blueprint técnico de fondo con transición orgánica */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '90px 90px',
          backgroundPosition: `${gridPosX}px ${gridPosY}px`,
          transition: `background-position 1.8s ${cinematicTiming}`
        }}
      />

      {/* ------------------------------------------------------------ */}
      {/* ESCENARIO CINEMÁTICO 3D                                     */}
      {/* ------------------------------------------------------------ */}
      <div ref={containerRef} className="absolute inset-0" style={{ perspective: "2400px", perspectiveOrigin: "50% 50%" }}>
        <div
          className="camera absolute left-0 top-0"
          style={{
            transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
            transformStyle: "preserve-3d",
            width: worldW,
            height: worldH,
            transition: `transform 1.8s ${cinematicTiming}`
          }}
        >
          {/* El sutil balanceo 'wobble' simula una cámara en mano o un soporte de grúa vivo */}
          <div className="wobble" style={{ transformStyle: "preserve-3d", width: "100%", height: "100%", position: "relative" }}>
            {grid.cellImages.map((img, i) => {
              const row = Math.floor(i / grid.cols);
              const col = i % grid.cols;
              const isActive = row === active.row && col === active.col;

              // Propiedades de transición basadas en lentes anamórficos (desenfoque de movimiento en los extremos)
              let opacity = isActive ? 1 : 0;
              let blur = isActive ? 0 : 20; 
              let z = isActive ? 180 * depth : -250 * depth;
              let scale = isActive ? 1 : 0.85;

              return (
                <div
                  key={i}
                  className="absolute overflow-hidden flex items-center justify-center w-full h-full p-4"
                  style={{
                    left: col * (cellW + gap),
                    top: row * (cellH + gap),
                    width: cellW,
                    height: cellH,
                    transform: `translateZ(${z}px) scale(${scale})`,
                    opacity: opacity,
                    filter: `blur(${blur}px)`,
                    // Transición asimétrica: Desenfoca rápido al salir, enfoca con elegancia al entrar
                    transition: `transform 1.8s ${cinematicTiming}, opacity 1.2s ease-in-out, filter 1.4s ease-in-out`,
                    transformStyle: "preserve-3d",
                    pointerEvents: isActive ? "auto" : "none"
                  }}
                >
                  {img && (
                    <div className="w-full h-full flex flex-row items-center justify-between gap-20 px-6">
                      
                      {/* DIRECCIÓN EDITORIAL: TEXTO A LA IZQUIERDA */}
                      {img.layout === "left" && (
                        <div className={`w-[42%] flex flex-col justify-center text-left transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.95] mb-5 text-neutral-950 font-sans">
                            {img.title}
                          </h2>
                          <p className="text-base leading-relaxed text-neutral-600 font-sans font-normal max-w-sm border-l-2 border-black/10 pl-4">
                            {img.desc}
                          </p>
                        </div>
                      )}

                      {/* CONTENEDOR DE LA IMAGEN (Con efecto Ken Burns de zoom continuo) */}
                      <div className={`relative h-full flex-1 max-h-[90%] drop-shadow-[0_35px_60px_rgba(0,0,0,0.12)] ${img.layout === 'none' ? 'w-full' : 'w-[58%]'}`}>
                        <div
                          className={`w-full h-full bg-contain bg-no-repeat bg-center ${isActive ? 'animate-ken-burns' : ''}`}
                          style={{
                            backgroundImage: `url(${img.url})`,
                            filter: getFilterStyle(),
                          }}
                        />
                        
                        {/* DIRECCIÓN EDITORIAL: SUBTÍTULO FLOTANTE INTEGRADO */}
                        {img.layout === "overlay" && (
                          <div className={`absolute inset-x-0 -bottom-10 text-center max-w-xl mx-auto transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <h2 className="text-lg font-bold tracking-tight mb-1 uppercase font-sans text-neutral-900">{img.title}</h2>
                            <p className="text-sm text-neutral-500 font-sans">{img.desc}</p>
                          </div>
                        )}
                      </div>

                      {/* DIRECCIÓN EDITORIAL: TEXTO A LA DERECHA */}
                      {img.layout === "right" && (
                        <div className={`w-[42%] flex flex-col justify-center text-left transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.95] mb-5 text-neutral-950 font-sans">
                            {img.title}
                          </h2>
                          <p className="text-base leading-relaxed text-neutral-600 font-sans font-normal max-w-sm border-l-2 border-black/10 pl-4">
                            {img.desc}
                          </p>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Viñeteado óptico degradado */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(17,17,17,0.06) 100%)" }} />
      {grain && <div className="grain pointer-events-none absolute inset-0 opacity-[0.04]" />}

      {/* Interfaz de Control de Cámara (HUD) */}
      {!hideUI && (
        <>
          <div className="pointer-events-none absolute left-8 top-8 flex items-center gap-3 text-xs tracking-widest text-neutral-900 font-bold">
            <span className="rec-dot h-2.5 w-2.5 rounded-full bg-[#d90429]" />
            RAW 24FPS · {formatTimecode(elapsed)}
          </div>
          <div className="pointer-events-none absolute right-8 top-8 text-xs tracking-widest text-neutral-400 font-medium">
            LUT_MODE: {lutMode.toUpperCase()} // TOTAL_NODES: {images.length.toString().padStart(2, "0")}
          </div>
        </>
      )}

      {/* Estado vacío / Dropzone */}
      {images.length === 0 && (
        <div onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={handleDrop} className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center z-10">
          <div className={`px-16 py-12 transition-all border ${dragOver ? "border-black bg-black/5" : "border-black/10 bg-white/40 backdrop-blur-md"}`}>
            <p className="text-xs tracking-widest font-bold text-neutral-800">FILM ARCHIVE // DROP CHANNELS</p>
            <p className="mt-2 text-[11px] tracking-wide text-neutral-400">Arrastra material gráfico para inicializar la secuencia</p>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------ */}
      {/* CONSOLA DE PRODUCCIÓN EDITORIAL                             */}
      {/* ------------------------------------------------------------ */}
      {!hideUI && (
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="mx-auto mb-6 w-[min(96%,1150px)] border border-black/10 bg-white/95 p-5 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.08)]">
            
            <div className="flex flex-wrap items-center gap-4 border-b border-black/5 pb-4">
              <button onClick={() => inputRef.current?.click()} className="border border-black px-5 py-2.5 text-xs font-bold tracking-widest text-white bg-black transition-colors hover:bg-neutral-800">
                IMPORTAR SECUENCIAS
              </button>
              <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
              
              {/* Filtro LUT de Color Filmitográfico */}
              <div className="flex items-center gap-1 border border-black/10 p-1 bg-neutral-50 text-xs">
                <span className="px-2 text-neutral-400 text-[10px] font-bold">FILM LUT //</span>
                {[
                  { id: "normal", label: "NATURAL" },
                  { id: "mono", label: "B/N MONO" },
                  { id: "warm", label: "CÁLIDO 35MM" }
                ].map((l) => (
                  <button key={l.id} onClick={() => setLutMode(l.id)} className={`px-2 py-1 font-bold ${lutMode === l.id ? "bg-black text-white" : "text-neutral-600 hover:bg-neutral-200"}`}>
                    {l.label}
                  </button>
                ))}
              </div>

              <div className="ml-auto flex flex-wrap items-center gap-3">
                <ToggleButton label="GRAIN TEXTURE" active={grain} onClick={() => setGrain((v) => !v)} />
                <button onClick={() => setHideUI(true)} className="border border-black/20 px-3 py-2 text-[11px] tracking-widest text-neutral-700 hover:border-black" title="Tecla H">
                  LIMPIAR ENCUADRE (H)
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3 border-b border-black/5 pb-4">
              <SliderField label="TAMAÑO CÁMARA (GRID)" value={minCells} min={6} max={40} onChange={setMinCells} />
              <SliderField label="PROFUNDIDAD EN LENTE (Z)" value={depthPct} min={0} max={100} onChange={setDepthPct} />
              <SliderField label="VELOCIDAD DE OBTURACIÓN (SEG)" value={holdSec} min={3} max={15} step={0.5} onChange={setHoldSec} />
            </div>

            {/* CRONOGRAMA DE TEXTOS */}
            {images.length > 0 && (
              <div className="mt-4 flex flex-col gap-3 max-h-40 overflow-y-auto pr-1">
                <span className="text-[10px] font-bold text-neutral-400 block tracking-wider">LÍNEA DE TIEMPO / METADATOS:</span>
                {images.map((img, idx) => (
                  <div key={img.id} className={`flex items-center gap-4 p-2 border text-xs bg-neutral-50/50 ${idx === (step % images.length) ? 'border-black bg-white shadow-md' : 'border-black/10'}`}>
                    <div className="h-10 w-10 shrink-0 border border-black/10 relative">
                      <img src={img.url} alt="" className="h-full w-full object-cover" />
                      <span className="absolute bottom-0 right-0 bg-black text-white text-[8px] px-1">{idx+1}</span>
                    </div>
                    
                    <input type="text" value={img.title} onChange={(e) => updateImageField(img.id, "title", e.target.value)} className="border border-black/10 px-2 py-1 font-bold text-neutral-800 w-52 bg-white uppercase" placeholder="Título Escena..." />
                    <input type="text" value={img.desc} onChange={(e) => updateImageField(img.id, "desc", e.target.value)} className="border border-black/10 px-2 py-1 text-neutral-600 flex-1 bg-white font-sans text-[11px]" placeholder="Bloque informativo..." />
                    
                    <div className="flex gap-1 border border-black/10 bg-white p-0.5">
                      {[
                        { id: "left", label: "Texto Izq" },
                        { id: "right", label: "Texto Der" },
                        { id: "overlay", label: "Subtítulo" },
                        { id: "none", label: "Solo Foto" }
                      ].map((l) => (
                        <button key={l.id} onClick={() => updateImageField(img.id, "layout", l.id)} className={`px-2 py-1 text-[10px] font-bold ${img.layout === l.id ? 'bg-black text-white' : 'text-neutral-500 hover:bg-neutral-100'}`}>
                          {l.label}
                        </button>
                      ))}
                    </div>

                    <button onClick={() => removeImage(img.id)} className="text-neutral-400 hover:text-red-500 font-bold px-2">✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {hideUI && (
        <button onClick={() => setHideUI(false)} className="absolute bottom-8 right-8 z-20 border border-black/20 bg-white/90 px-4 py-2 text-[10px] font-bold tracking-widest text-black backdrop-blur hover:bg-white shadow-sm">
          MONITOR ACTIVO (H)
        </button>
      )}

      {/* ------------------------------------------------------------ */}
      <style jsx>{`
        /* Sutil vibración orgánica de lente */
        .wobble {
          animation: wobble 28s ease-in-out infinite alternate;
        }
        @keyframes wobble {
          0% { transform: rotateX(0.4deg) rotateY(-0.5deg) translateZ(0); }
          50% { transform: rotateX(-0.2deg) rotateY(0.4deg) translateZ(1px); }
          100% { transform: rotateX(0.4deg) rotateY(-0.5deg) translateZ(0); }
        }

        /* EFECTO KEN BURNS CONTINUO: Evita que la foto activa se vea completamente estática */
        .animate-ken-burns {
          animation: kenburns 15s ease-out forwards;
        }
        @keyframes kenburns {
          0% { transform: scale(1.02) translate(0px, 0px); }
          100% { transform: scale(1.09) translate(2px, -1px); }
        }

        .rec-dot {
          animation: blink 1s steps(2, start) infinite;
        }
        @keyframes blink { 50% { opacity: 0.2; } }

        /* Textura de grano cinematográfico dinámico */
        .grain {
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n2'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n2)'/></svg>");
          animation: grain-shift 0.4s steps(4) infinite;
        }
        @keyframes grain-shift {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-1%, 1%); }
          50% { transform: translate(1%, -1%); }
          75% { transform: translate(-1%, -1%); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/* Componentes Auxiliares                                              */
/* -------------------------------------------------------------------- */
function ToggleButton({ label, active, onClick }) {
  return (
    <button onClick={onClick} className={`border px-3 py-2 text-[11px] font-bold tracking-widest transition-colors ${active ? "border-black bg-black text-white" : "border-black/20 text-neutral-600 hover:border-black/50"}`}>
      {label} · {active ? "ON" : "OFF"}
    </button>
  );
}

function SliderField({ label, value, min, max, step = 1, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-bold tracking-widest text-neutral-400">
        {label} // <span className="text-black">{value}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-black bg-neutral-200 h-1 appearance-none rounded-sm" />
    </label>
  );
}