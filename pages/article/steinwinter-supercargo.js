"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Layout from "@/src/Components/Layout";

const timeline = [
  {
    year: "1983",
    text: "Hartmut Ütescher diseña el concepto en Alemania Occidental",
  },
  { year: "1986", text: "Se presenta el prototipo funcional al público" },
  { year: "1987", text: "Pruebas en carretera — resultados prometedores" },
  { year: "1989", text: "El proyecto pierde financiamiento y se congela" },
  { year: "2000s", text: "Redescubierto por entusiastas en foros de internet" },
];

const stats = [
  { num: "0.35", label: "Cd aerodinámico — nivel supercar" },
  { num: "20%", label: "menos consumo vs camión tradicional" },
  { num: "1", label: "único prototipo construido" },
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
      title="El Impresionante Camion Steinwinter Supercargo"
      image="https://res.cloudinary.com/db3veuotr/image/upload/v1775921344/image_1_qyaisg.jpg"
      description="¿Sabes cómo funciona realmente tu motor? Pon a prueba tus conocimientos con TruckLore."
      footer={false}
      visibleNavbar={false}
      icon="https://res.cloudinary.com/db3veuotr/image/upload/v1775921344/image_1_qyaisg.jpg"
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
                Artículos
              </a>
              {/* <a
                href="#"
                className="bg-zinc-900 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-orange-600 transition-all active:scale-95"
              >
                Suscribirse
              </a> */}
            </div>
          </div>
        </nav>

        {/* HERO IMAGE CONTAINER - Limitado en ancho para proteger la resolución */}
        <div className="max-w-5xl mx-auto px-0 sm:px-6 pt-20 md:pt-24">
          <div className="relative w-full h-[45vh] min-h-[320px] max-h-[440px] overflow-hidden sm:rounded-3xl shadow-xl shadow-zinc-200/50">
            <Image
              src="https://res.cloudinary.com/db3veuotr/image/upload/v1775921344/image_1_qyaisg.jpg"
              alt="Steinwinter Supercargo, el camión con cabina bajo el semirremolque"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Capas de gradiente para suavizar bordes y mejorar lectura del tag */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="bg-white/90 backdrop-blur text-zinc-800 text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-lg border border-white/50 shadow-sm">
                Steinwinter Supercargo 26/30 · 1983
              </span>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <header className="max-w-5xl mx-auto px-6 pt-12 pb-14">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-orange-600 text-white text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-md">
              Ingeniería Curiosa
            </span>
            <span className="text-xs font-medium text-zinc-400">
              6 min de lectura
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 leading-[1.1] mb-8 max-w-4xl tracking-tight">
            El camión que el conductor manejaba{" "}
            <span className="text-orange-600 italic">
              desde debajo de la carga - Steinwinter Supercargo
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-3xl mb-8 font-light">
            En 1983, un ingeniero alemán construyó un camión donde la cabina
            estaba tan baja que el conductor casi iba al ras del suelo. No era
            una locura — era física aplicada.
          </p>

          <div className="flex items-center gap-4 text-sm text-zinc-400 border-t border-zinc-200 pt-8">
            <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden shrink-0 border-2 border-white shadow-sm">
              <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                TL
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-900 font-bold">
                TruckLore Editorial
              </span>
              <span>Publicado el 11 de abril, 2026</span>
            </div>
          </div>
        </header>

        {/* BODY */}
        <main className="max-w-5xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16 items-start">
            {/* ARTICLE CONTENT */}
            <article className="space-y-10 text-zinc-700 text-[17px] leading-[1.8]">
              <p className="text-lg md:text-xl text-zinc-600 leading-relaxed font-medium italic border-l-4 border-zinc-200 pl-6">
                Imagina conducir un camión de 26 toneladas desde una cabina
                completamente por debajo del nivel del semirremolque. Sin capó,
                sin motor enfrente, sin nada entre tú y el asfalto más que unos
                pocos centímetros de chasis.
              </p>

              {/* Section 1 */}
              <section className="space-y-4">
                <span className="block text-[11px] font-black tracking-[0.25em] uppercase text-orange-600">
                  El concepto radical
                </span>
                <h2 className="text-3xl font-bold text-zinc-900 tracking-tight leading-tight">
                  Europa tiene límites de longitud. La física, no.
                </h2>
                <p>
                  En los años 80, las regulaciones europeas limitaban la
                  longitud total de un conjunto camión-semirremolque. Cada
                  centímetro de cabina era un centímetro menos de carga útil.
                  Hartmut Ütescher se hizo una pregunta: ¿y si la cabina no
                  ocupara espacio longitudinal en absoluto?
                </p>
                <p>
                  La solución fue hundirla bajo el semirremolque. El conductor
                  se sentaba a solo 55 cm del suelo, con el motor detrás de él y
                  el remolque pasando literalmente sobre su cabeza. La longitud
                  de carga quedaba maximizada al 100%.
                </p>
              </section>

              {/* <section className="space-y-6 flex flex-col items-center">
                <div className="w-full text-left">
                  <span className="block text-[11px] font-black tracking-[0.25em] uppercase text-orange-600">
                    Documental Visual
                  </span>
                  <h2 className="text-3xl font-bold text-zinc-900 tracking-tight leading-tight">
                    El Supercargo en movimiento
                  </h2>
                </div>

                <div className="relative w-full max-w-[360px] bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-orange-900/20 border-[8px] border-zinc-900 group">
                  <div className="aspect-[9/16] w-full bg-black">
                    <iframe
                      src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1743921193258375%2F&show_text=false&width=357&t=0"
                      className="absolute top-0 left-0 w-full h-full border-none"
                      scrolling="no"
                      frameBorder="0"
                      allowFullScreen={true}
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                  </div>

                  <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 flex justify-center items-end pb-1">
                    <div className="w-12 h-1 bg-zinc-800 rounded-full" />
                  </div>

                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                          Archivo Vertical HD
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        REF: 83-REEL
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-zinc-500 italic text-center max-w-sm px-6 leading-relaxed">
                  Registro original del Steinwinter Supercargo. El formato
                  vertical nos permite apreciar la bajísima altura del chasis
                  respecto al suelo.
                </p>
              </section> */}

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
                    src="https://res.cloudinary.com/db3veuotr/image/upload/v1775921344/image_1_qyaisg.jpg"
                    alt="Preview TikTok Steinwinter"
                    fill
                    className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                  />

                  {/* Overlay de Gradiente estilo TikTok */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

                  {/* Botón Central de Play con Branding de TikTok */}
                  <a
                    href="https://vm.tiktok.com/ZGduKhXNK/" // REEMPLAZA CON TU LINK
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

              {/* Pull quote decorada */}
              <div className="py-6 border-y border-zinc-100">
                <blockquote className="text-2xl md:text-3xl font-bold text-zinc-800 leading-tight text-center px-4">
                  "El conductor no iba adelante del camión. Iba{" "}
                  <span className="text-orange-600">debajo</span> de la carga."
                </blockquote>
              </div>

              {/* Stats Grid con más separación */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
                {stats.map(({ num, label }) => (
                  <div
                    key={label}
                    className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
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

              {/* Section 2 */}
              <section className="space-y-4">
                <span className="block text-[11px] font-black tracking-[0.25em] uppercase text-orange-600">
                  Eficiencia Pura
                </span>
                <h2 className="text-3xl font-bold text-zinc-900 tracking-tight leading-tight">
                  Aerodinámica de superdeportivo
                </h2>
                <p>
                  Sin una cabina cuadrada sobresaliendo al frente, el Supercargo
                  presentaba un perfil de cuña limpio. El coeficiente de
                  arrastre de 0.35 era extraordinario; los camiones
                  convencionales de la época rondaban el 0.7. Menos resistencia
                  significaba un ahorro del 20% en combustible.
                </p>
              </section>

              {/* Fact box destacado */}
              <aside className="bg-zinc-900 text-zinc-100 rounded-3xl p-8 md:p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-orange-600/20 transition-colors" />
                <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase bg-orange-600 px-3 py-1 rounded mb-6">
                  Detalle Técnico
                </span>
                <p className="text-lg md:text-xl font-light leading-relaxed relative z-10">
                  El motor estaba montado detrás de la cabina, entre los ejes.
                  El conductor debía agacharse para entrar, pero a cambio, la
                  visibilidad era absoluta: veía el asfalto directamente frente
                  a sus pies.
                </p>
              </aside>

              {/* Section 3 */}
              <section className="space-y-4 pb-10">
                <span className="block text-[11px] font-black tracking-[0.25em] uppercase text-orange-600">
                  El Legado
                </span>
                <h2 className="text-3xl font-bold text-zinc-900 tracking-tight leading-tight">
                  ¿Por qué falló el futuro?
                </h2>
                <p>
                  Conducir a ras del suelo con toneladas de carga sobre la
                  cabeza era psicológicamente difícil de aceptar para los
                  transportistas. Además, las normas de seguridad contra
                  colisiones no sabían cómo clasificar este diseño. El proyecto
                  se quedó sin fondos en 1989.
                </p>
              </section>

              <div className="h-px bg-zinc-200" />

              {/* Footer de Artículo */}
              <footer className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                <div className="flex gap-3">
                  {["Twitter", "LinkedIn", "Facebook"].map((platform) => (
                    <button
                      key={platform}
                      className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-100 transition-colors cursor-pointer"
                    >
                      <span className="sr-only">{platform}</span>
                      <div className="w-4 h-4 bg-zinc-400 rounded-sm" />
                    </button>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-zinc-900 border-2 border-zinc-900 rounded-full px-8 py-3 hover:bg-zinc-900 hover:text-white transition-all cursor-pointer">
                  Guardar lectura para después
                </button>
              </footer>
            </article>

            {/* SIDEBAR - Sticky */}
            <aside className="lg:sticky lg:top-24 space-y-8">
              {/* Cronología */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xs font-black tracking-widest uppercase text-zinc-400 mb-6">
                  Cronología
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

              {/* Specs Table */}
              <div className="bg-zinc-100/50 rounded-2xl p-6">
                <h3 className="text-xs font-black tracking-widest uppercase text-zinc-400 mb-5">
                  Ficha técnica
                </h3>
                <div className="space-y-4">
                  {[
                    ["País", "Alemania Occ."],
                    ["Peso", "26.000 kg"],
                    ["Altura", "55 cm (suelo)"],
                    ["Motor", "OM 422 ADE"],
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

              {/* Newsletter CTA */}
              <div className="bg-orange-600 rounded-2xl p-6 text-white shadow-lg shadow-orange-200">
                <h3 className="text-lg font-bold mb-2 leading-tight">
                  ¿Ingeniería olvidada?
                </h3>
                <p className="text-sm opacity-90 mb-6 leading-relaxed">
                  Recibe cada domingo una historia sobre máquinas que el tiempo
                  dejó atrás.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Tu email..."
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm placeholder:text-white/60 outline-none focus:bg-white/20 transition-all"
                  />
                  <button className="w-full bg-white text-orange-600 font-bold py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-zinc-100 transition-colors shadow-sm">
                    Unirme a la lista
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="border-t border-zinc-200 bg-white py-12">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-xl font-black">
                Truck<span className="text-orange-600">Lore</span>
              </span>
              <p className="text-xs text-zinc-400 uppercase tracking-widest">
                Historias de metal y visión
              </p>
            </div>
            <div className="flex gap-8 text-xs font-bold text-zinc-500 uppercase tracking-widest">
              <a href="#" className="hover:text-orange-600 transition-colors">
                Archivo
              </a>
              <a href="#" className="hover:text-orange-600 transition-colors">
                Sobre nosotros
              </a>
              <a href="#" className="hover:text-orange-600 transition-colors">
                Contacto
              </a>
            </div>
            <p className="text-[10px] text-zinc-400 font-medium">
              © 2026 · BOGOTÁ, COLOMBIA
            </p>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
