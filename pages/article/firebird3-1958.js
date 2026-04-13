"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Layout from "@/src/Components/Layout";

const timeline = [
  {
    year: "1953",
    text: "Emmett Conklin lidera el proyecto del Firebird I en el GM Desert Proving Ground.",
  },
  {
    year: "1956",
    text: "El Firebird II introduce el sistema de comunicación por radio para autopistas inteligentes.",
  },
  {
    year: "1958",
    text: "Debut triunfal en el Motorama como el 'laboratorio de ingeniería' más avanzado del mundo.",
  },
  {
    year: "1959",
    text: "Pruebas de estabilidad en la pista de alta velocidad de Mesa, Arizona.",
  },
  {
    year: "2000s",
    text: "Restauración completa por el equipo de GM Heritage Center.",
  },
];

const stats = [
  { num: "225", label: "HP — Potencia de la turbina Whirlfire" },
  { num: "33,000", label: "RPM — Régimen de giro del motor principal" },
  { num: "7", label: "Superficies de control aerodinámico" },
];

export default function Page() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <Layout
      title="General Motors Firebird III: El Futuro que Volaba Bajo"
      image="https://res.cloudinary.com/db3veuotr/image/upload/v1776039295/image_4_n9fddz.jpg"
      description="Descubre cómo GM intentó reemplazar el volante y los pistones con tecnología de cazas militares."
      footer={false}
      visibleNavbar={false}
      icon="https://res.cloudinary.com/db3veuotr/image/upload/v1776039295/image_4_n9fddz.jpg"
    >
      <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-orange-100 selection:text-orange-900">
        {/* NAV */}
        <nav
          className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-zinc-50/95 backdrop-blur border-b border-zinc-200" : "bg-transparent"}`}
        >
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <span className="text-base font-bold tracking-tight">
              Truck<span className="text-orange-600">Lore</span>
            </span>
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <a
                href="#"
                className="hover:text-zinc-900 transition-colors hidden sm:block font-medium"
              >
                Investigación
              </a>
            </div>
          </div>
        </nav>

        {/* HERO IMAGE CONTAINER */}
        <div className="max-w-5xl mx-auto px-0 sm:px-6 pt-20 md:pt-24">
          <div className="relative w-full h-[45vh] min-h-[320px] max-h-[440px] overflow-hidden sm:rounded-3xl shadow-xl shadow-zinc-200/50">
            <Image
              src="https://res.cloudinary.com/db3veuotr/image/upload/v1776039295/image_4_n9fddz.jpg"
              alt="General Motors Firebird III en la pista"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="bg-white/90 backdrop-blur text-zinc-800 text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-lg border border-white/50 shadow-sm">
                GM Firebird III · Motorama 1958
              </span>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <header className="max-w-5xl mx-auto px-6 pt-12 pb-14">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-orange-600 text-white text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-md">
              Ingeniería Histórica
            </span>
            <span className="text-xs font-medium text-zinc-400">
              8 min de lectura
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 leading-[1.1] mb-8 max-w-4xl tracking-tight">
            El auto que eliminó el volante en favor de{" "}
            <span className="text-orange-600 italic">
              un joystick espacial - Firebird III
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-3xl mb-8 font-light">
            No era un vehículo, era un avión sin alas. Con dos motores y siete
            aletas estabilizadoras, el Firebird III fue el intento más audaz de
            General Motors por conquistar la era del jet.
          </p>

          <div className="flex items-center gap-4 text-sm text-zinc-400 border-t border-zinc-200 pt-8">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold border-2 border-white shadow-sm">
              TL
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-900 font-bold">
                TruckLore Editorial
              </span>
              <span>Publicado el 12 de abril, 2026</span>
            </div>
          </div>
        </header>

        {/* BODY */}
        <main className="max-w-5xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16 items-start">
            <article className="space-y-10 text-zinc-700 text-[17px] leading-[1.8]">
              <p className="text-lg md:text-xl text-zinc-600 leading-relaxed font-medium italic border-l-4 border-zinc-200 pl-6">
                A finales de los años 50, Detroit no miraba a Europa, miraba al
                cielo. El Firebird III es la prueba física de una obsesión por
                la propulsión a chorro y la automatización analógica.
              </p>

              <section className="space-y-4">
                <span className="block text-[11px] font-black tracking-[0.25em] uppercase text-orange-600">
                  Dos motores, un propósito
                </span>
                <h2 className="text-3xl font-bold text-zinc-900 tracking-tight leading-tight">
                  Whirlfire GT-305: Calor, ruido y eficiencia
                </h2>
                <p>
                  A diferencia de cualquier auto moderno, el Firebird III
                  utilizaba dos motores distintos. El principal era una turbina
                  de gas Whirlfire GT-305 de 225 hp encargada de mover las
                  ruedas traseras. Pero las turbinas son ineficientes para
                  alimentar accesorios; por eso, en la nariz llevaba un motor de
                  2 cilindros y 10 hp que funcionaba exclusivamente para generar
                  electricidad y presión hidráulica.
                </p>
                <p>
                  La carrocería de fibra de vidrio no solo era ligera, sino que
                  escondía un sistema de frenado ultrasónico y superficies
                  aerodinámicas activas que se desplegaban para ayudar a detener
                  el vehículo a altas velocidades.
                </p>
              </section>

              {/* TIKTOK SECTION STYLE */}
              <section className="space-y-8 flex flex-col items-center my-16">
                <div className="w-full text-center">
                  <span className="block text-[11px] font-black tracking-[0.3em] uppercase text-orange-600 mb-2">
                    Contenido Viral
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
                    ¿Cómo se ve en la vida real?
                  </h2>
                </div>

                {/* TARJETA DE TIKTOK (Optimizado para Clics/Monetización) */}
                <div className="group relative w-full max-w-[340px] aspect-[9/16] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-[10px] border-zinc-900 bg-black">
                  {/* Imagen de Miniatura (Thumbnail) */}
                  <Image
                    src="https://res.cloudinary.com/db3veuotr/image/upload/v1776039295/image_4_n9fddz.jpg"
                    alt="Preview TikTok Firebrid 3"
                    fill
                    className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                  />

                  {/* Overlay de Gradiente estilo TikTok */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

                  {/* Botón Central de Play con Branding de TikTok */}
                  <a
                    href="https://vm.tiktok.com/ZGduoFpLC/" // REEMPLAZA CON TU LINK
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex flex-col items-center justify-center group/btn"
                  >
                    <div className="relative w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-xl transition-transform group-hover/btn:scale-110 active:scale-95">
                      {/* El logo de play con un pequeño glitch estilo TikTok */}
                      <div className="text-zinc-900 text-3xl ml-1">▶</div>
                      <div className="absolute inset-0 rounded-full border-2 border-[#00f2ea] animate-ping opacity-40" />
                      <div className="absolute inset-0 rounded-full border-2 border-[#ff0050] animate-ping opacity-40 [animation-delay:0.5s]" />
                    </div>

                    <span className="mt-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold tracking-widest uppercase group-hover:bg-orange-600 transition-colors">
                      Ver en TikTok
                    </span>
                  </a>

                  {/* Interfaz Simulada (Solo visual) */}
                  <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center opacity-70">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xs">
                      ❤️
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xs">
                      💬
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xs">
                      🔗
                    </div>
                  </div>

                  {/* Info del Creador (Branding) */}
                  <div className="absolute bottom-8 left-6 right-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/20 overflow-hidden font-bold text-[10px] flex items-center justify-center text-white">
                        TV
                      </div>
                      <span className="text-white font-bold text-sm">
                        @LlantaPinchadaTV
                      </span>
                    </div>
                    <p className="text-white/80 text-[11px] leading-snug line-clamp-2">
                      El Steinwinter Supercargo en acción. ¿Te atreverías a
                      conducir así? 🚛 #Ingenieria #Trucks #Steinwinter
                    </p>
                  </div>
                </div>

                {/* Footer de la sección */}
                <div className="text-center space-y-3">
                  <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">
                    Disponible en nuestra comunidad vertical
                  </p>
                  <div className="flex justify-center gap-4">
                    <div className="h-1 w-12 bg-zinc-200 rounded-full" />
                    <div className="h-1 w-12 bg-orange-500 rounded-full" />
                    <div className="h-1 w-12 bg-zinc-200 rounded-full" />
                  </div>
                </div>
              </section>

              <div className="py-6 border-y border-zinc-100">
                <blockquote className="text-2xl md:text-3xl font-bold text-zinc-800 leading-tight text-center px-4">
                  "No hay volante. No hay pedales. Solo un palanca y el{" "}
                  <span className="text-orange-600">siseo constante</span> de
                  una turbina de gas."
                </blockquote>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
                {stats.map(({ num, label }) => (
                  <div
                    key={label}
                    className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm"
                  >
                    <span className="block text-3xl font-black text-orange-600 mb-1">
                      {num}
                    </span>
                    <span className="block text-xs font-bold text-zinc-500 uppercase tracking-wider leading-snug">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <section className="space-y-4">
                <span className="block text-[11px] font-black tracking-[0.25em] uppercase text-orange-600">
                  Interfaz Hombre-Máquina
                </span>
                <h2 className="text-3xl font-bold text-zinc-900 tracking-tight leading-tight">
                  Unicontrol: El antepasado del 'Drive-by-Wire'
                </h2>
                <p>
                  Ubicado en la consola central entre las dos burbujas
                  acrílicas, el sistema Unicontrol era una palanca tipo joystick
                  que reemplazaba todas las funciones de conducción. Al moverla
                  a los lados, el auto giraba; hacia adelante, aceleraba; y al
                  tirar hacia atrás, se activaban los frenos de disco de
                  aleación.
                </p>
                <p>
                  Este sistema estaba conectado a una computadora analógica que
                  ajustaba la sensibilidad de la dirección según la velocidad
                  del auto, una tecnología que no veríamos en autos de
                  producción hasta décadas después.
                </p>
              </section>

              <aside className="bg-zinc-900 text-zinc-100 rounded-3xl p-8 md:p-10 relative overflow-hidden group">
                <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase bg-orange-600 px-3 py-1 rounded mb-6">
                  Innovación Olvidada
                </span>
                <p className="text-lg md:text-xl font-light leading-relaxed">
                  El Firebird III poseía una 'clave' electrónica magnética,
                  eliminando la ranura física. Fue el primer vehículo con
                  sistema de entrada sin llave funcional, diseñado para que las
                  burbujas se levantaran automáticamente al acercarse el
                  conductor.
                </p>
              </aside>

              <footer className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-zinc-100">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-100 transition-colors cursor-pointer">
                    <div className="w-4 h-4 bg-zinc-400 rounded-sm" />
                  </div>
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-zinc-900 border-2 border-zinc-900 rounded-full px-8 py-3 hover:bg-zinc-900 hover:text-white transition-all">
                  Guardar investigación técnica
                </button>
              </footer>
            </article>

            {/* SIDEBAR */}
            <aside className="lg:sticky lg:top-24 space-y-8">
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-black tracking-widest uppercase text-zinc-400 mb-6">
                  Cronología GM Jet
                </h3>
                <div className="space-y-6">
                  {timeline.map(({ year, text }) => (
                    <div
                      key={year}
                      className="relative pl-6 border-l border-zinc-100 pb-1 last:pb-0"
                    >
                      <span className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-orange-600 border-2 border-white" />
                      <span className="block text-xs font-black text-zinc-900 mb-1">
                        {year}
                      </span>
                      <p className="text-[13px] text-zinc-500 leading-snug">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-100/50 rounded-2xl p-6">
                <h3 className="text-xs font-black tracking-widest uppercase text-zinc-400 mb-5">
                  Ficha Técnica
                </h3>
                <div className="space-y-4">
                  {[
                    ["Transmisión", "Hydra-Matic 2 vel."],
                    ["Longitud", "6.30 metros"],
                    ["Combustible", "Kerosene / Diesel"],
                    ["Aletas", "7 estabilizadores"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between items-center text-[13px]"
                    >
                      <span className="text-zinc-500 font-medium">{k}</span>
                      <span className="font-bold text-zinc-900">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-600 rounded-2xl p-6 text-white shadow-lg">
                <h3 className="text-lg font-bold mb-2">TruckLore Lab</h3>
                <p className="text-sm opacity-90 mb-6 leading-relaxed">
                  Suscríbete para recibir análisis sobre la ingeniería que el
                  tiempo dejó atrás.
                </p>
                <button className="w-full bg-white text-orange-600 font-bold py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-zinc-100 transition-colors shadow-sm">
                  Unirme
                </button>
              </div>
            </aside>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="border-t border-zinc-200 bg-white py-12">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <span className="text-xl font-black">
                Truck<span className="text-orange-600">Lore</span>
              </span>
              <p className="text-xs text-zinc-400 uppercase tracking-widest">
                Historias de metal y visión
              </p>
            </div>
            <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-[0.2em]">
              © 2026 · BOGOTÁ, COLOMBIA
            </p>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
