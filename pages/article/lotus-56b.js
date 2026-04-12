"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Layout from "@/src/Components/Layout";

const timeline = [
  {
    year: "1968",
    text: "Lotus 56 casi gana Indy 500; la turbina domina hasta que falla un eje a 10 vueltas del final.",
  },
  { year: "1971", text: "Adaptación al chasis 56B para F1; debut en la Race of Champions de Brands Hatch." },
  { year: "1971", text: "GP de Holanda: Dave Walker remonta 12 posiciones bajo lluvia extrema en solo 5 vueltas." },
  { year: "1971", text: "GP de Italia: Emerson Fittipaldi termina 8º; primer 'turbine-car' en completar un GP." },
  { year: "1972", text: "El proyecto se cancela por el consumo prohibitivo y la prohibición del 4WD." },
];

const stats = [
  { num: "35.000", label: "RPM de operación de la turbina ST6N" },
  { num: "280L", label: "Capacidad de Queroseno necesaria" },
  { num: "0", label: "Marchas (Transmisión Directa Ferguson)" },
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
      title="Lotus 56B: El F1 con motor de avión"
      image="https://res.cloudinary.com/db3veuotr/image/upload/v1775948576/image_2_jrnreo.jpg"
      description="¿Es posible ganar en F1 sin pistones? La historia técnica del Pratt & Whitney ST6N."
      footer={false}
      visibleNavbar={false}
      icon="https://res.cloudinary.com/db3veuotr/image/upload/v1775948576/image_2_jrnreo.jpg"
    >
      <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-orange-100 selection:text-orange-900">
        {/* NAV - Idéntico a tu diseño */}
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
            </div>
          </div>
        </nav>

        {/* HERO IMAGE CONTAINER - Tu diseño de ancho limitado y rounded-3xl */}
        <div className="max-w-5xl mx-auto px-0 sm:px-6 pt-20 md:pt-24">
          <div className="relative w-full h-[45vh] min-h-[320px] max-h-[440px] overflow-hidden sm:rounded-3xl shadow-xl shadow-zinc-200/50">
            <Image
              src="https://res.cloudinary.com/db3veuotr/image/upload/v1775948576/image_2_jrnreo.jpg"
              alt="Lotus 56B monoplaza con motor de turbina"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="bg-white/90 backdrop-blur text-zinc-800 text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-lg border border-white/50 shadow-sm">
                Lotus 56B Pratt & Whitney · 1971
              </span>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <header className="max-w-5xl mx-auto px-6 pt-12 pb-14">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-orange-600 text-white text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-md">
              Ingeniería Extrema
            </span>
            <span className="text-xs font-medium text-zinc-400">
              8 min de lectura
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 leading-[1.1] mb-8 max-w-4xl tracking-tight">
            El monoplaza con turbina de avion{" "}
            <span className="text-orange-600 italic">
              sin pistones ni marchas - Lotus 56B
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-3xl mb-8 font-light">
            En 1971, Lotus llevó una turbina de avión Pratt & Whitney a la Fórmula 1. 
            No rugía, siseaba, y entregaba 600 caballos de forma constante a las cuatro ruedas.
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
                Imagina estar en la parrilla de salida y no escuchar explosiones, sino el sonido de un avión jet preparándose para despegar. Sin caja de cambios que romper, el Lotus 56B era el futuro, hasta que chocó con la realidad.
              </p>

              {/* Section 1 */}
              <section className="space-y-4">
                <span className="block text-[11px] font-black tracking-[0.25em] uppercase text-orange-600">
                  La turbina Pratt & Whitney
                </span>
                <h2 className="text-3xl font-bold text-zinc-900 tracking-tight leading-tight">
                  Un motor de 227kg contra la combustión tradicional
                </h2>
                <p>
                  El corazón del 56B era la turbina ST6N. Al eliminar pistones, bielas y cigüeñal, Colin Chapman logró un motor extremadamente ligero y compacto. La turbina giraba a 35.000 RPM, entregando un torque masivo que se repartía a las cuatro ruedas mediante un sistema de tracción integral Ferguson.
                </p>
                <p>
                  Sin embargo, esta ventaja técnica escondía un defecto fatal: el retraso de la turbina. Desde que el piloto pisaba el pedal hasta que la turbina generaba empuje, pasaban casi 3 segundos. Esto obligaba a frenar con el pie izquierdo mientras se mantenía el acelerador a fondo para no perder presión.
                </p>
              </section>

              {/* TIKTOK SECTION - Tu componente viral */}
              <section className="space-y-8 flex flex-col items-center my-16">
                <div className="w-full text-center">
                  <span className="block text-[11px] font-black tracking-[0.3em] uppercase text-orange-600 mb-2">
                    Archivo Histórico
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
                    ¿Cómo sonaba en pista?
                  </h2>
                </div>

                <div className="group relative w-full max-w-[340px] aspect-[9/16] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-[10px] border-zinc-900 bg-black">
                  <Image
                    src="https://res.cloudinary.com/db3veuotr/image/upload/v1775948576/image_2_jrnreo.jpg"
                    alt="Preview TikTok Lotus 56B"
                    fill
                    className="object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

                  <a
                    href="https://vm.tiktok.com/ZGduKGkvW/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex flex-col items-center justify-center group/btn"
                  >
                    <div className="relative w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-xl transition-transform group-hover/btn:scale-110 active:scale-95">
                      <div className="text-zinc-900 text-3xl ml-1">▶</div>
                      <div className="absolute inset-0 rounded-full border-2 border-[#00f2ea] animate-ping opacity-40" />
                      <div className="absolute inset-0 rounded-full border-2 border-[#ff0050] animate-ping opacity-40 [animation-delay:0.5s]" />
                    </div>
                    <span className="mt-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-bold tracking-widest uppercase group-hover:bg-orange-600 transition-colors">
                      Ver en TikTok
                    </span>
                  </a>

                  <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center opacity-70">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xs">❤️</div>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xs">💬</div>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xs">🔗</div>
                  </div>

                  <div className="absolute bottom-8 left-6 right-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/20 overflow-hidden font-bold text-[10px] flex items-center justify-center text-white">TL</div>
                      <span className="text-white font-bold text-sm">@TruckLore</span>
                    </div>
                    <p className="text-white/80 text-[11px] leading-snug line-clamp-2">
                      El Lotus 56B acelerando en Monza. El único F1 que no necesitaba cambios. 🏎️💨 #F1 #Lotus #Engineering
                    </p>
                  </div>
                </div>
              </section>

              {/* Pull quote decorada */}
              <div className="py-6 border-y border-zinc-100">
                <blockquote className="text-2xl md:text-3xl font-bold text-zinc-800 leading-tight text-center px-4">
                  "En lluvia, el 56B era imbatible. Dave Walker adelantaba autos como si fueran{" "}
                  <span className="text-orange-600">estáticos</span> en Zandvoort."
                </blockquote>
              </div>

              {/* Stats Grid */}
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
                  El Talón de Aquiles
                </span>
                <h2 className="text-3xl font-bold text-zinc-900 tracking-tight leading-tight">
                  Frenos al rojo vivo y 280 litros de queroseno
                </h2>
                <p>
                  Al no tener caja de cambios, el Lotus 56B carecía de freno motor. Toda la fuerza necesaria para detener 600kg a 300km/h recaía en los discos de freno. En circuitos de alta velocidad como Monza, los frenos llegaban a fundirse por el calor acumulado.
                </p>
                <p>
                  Además, la turbina era ineficiente en términos de consumo. Para terminar una carrera, el auto debía cargar casi 300 litros de combustible JP-4 (queroseno de aviación), lo que lo hacía extremadamente pesado y difícil de manejar al inicio de los Grandes Premios.
                </p>
              </section>

              {/* Fact box destacado */}
              <aside className="bg-zinc-900 text-zinc-100 rounded-3xl p-8 md:p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-orange-600/20 transition-colors" />
                <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase bg-orange-600 px-3 py-1 rounded mb-6">
                  Detalle Técnico
                </span>
                <p className="text-lg md:text-xl font-light leading-relaxed relative z-10">
                  El escape de la turbina estaba situado justo detrás del piloto. Los gases salían a temperaturas tan altas que Lotus tuvo que instalar pantallas térmicas para evitar que el alerón trasero se derritiera durante la carrera.
                </p>
              </aside>

              <div className="h-px bg-zinc-200" />

              {/* Footer de Artículo */}
              <footer className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                <div className="flex gap-3">
                  {["Twitter", "LinkedIn", "Facebook"].map((platform) => (
                    <button
                      key={platform}
                      className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-100 transition-colors cursor-pointer"
                    >
                      <div className="w-4 h-4 bg-zinc-400 rounded-sm" />
                    </button>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-zinc-900 border-2 border-zinc-900 rounded-full px-8 py-3 hover:bg-zinc-900 hover:text-white transition-all cursor-pointer">
                  Guardar investigación
                </button>
              </footer>
            </article>

            {/* SIDEBAR - Tu diseño Sticky */}
            <aside className="lg:sticky lg:top-24 space-y-8">
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

              <div className="bg-zinc-100/50 rounded-2xl p-6">
                <h3 className="text-xs font-black tracking-widest uppercase text-zinc-400 mb-5">
                  Ficha técnica
                </h3>
                <div className="space-y-4">
                  {[
                    ["Motor", "P&W ST6N (Turbina)"],
                    ["Potencia", "600 CV"],
                    ["Combustible", "Queroseno JP-4"],
                    ["Tracción", "4WD Ferguson"],
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

              <div className="bg-orange-600 rounded-2xl p-6 text-white shadow-lg shadow-orange-200">
                <h3 className="text-lg font-bold mb-2 leading-tight">
                  ¿Ingeniería olvidada?
                </h3>
                <p className="text-sm opacity-90 mb-6 leading-relaxed">
                  Recibe cada domingo una historia sobre máquinas que el tiempo dejó atrás.
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

        {/* FOOTER - Tu firma de Bogotá */}
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
            <p className="text-[10px] text-zinc-400 font-medium uppercase">
              © 2026 · BOGOTÁ, COLOMBIA
            </p>
          </div>
        </footer>
      </div>
    </Layout>
  );
}