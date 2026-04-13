"use client";

import { useEffect, useRef } from "react";

const TICKER_ITEMS = [
  "El Pozo de Kola",
  "Melaza en Boston",
  "Ciudad de los Muertos",
  "Lluvias de animales",
  "Triángulo de las Bermudas",
  "Mary Celeste",
  "Incidente Vela 1979",
  "Zumbido de Taos",
];

export default function Page() {
  const tickerRef = useRef(null);

  useEffect(() => {
    const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
    if (tickerRef.current) {
      tickerRef.current.innerHTML = doubled
        .map(
          (i) =>
            `<span class="ticker-item text-sm text-stone-500 whitespace-nowrap cursor-pointer hover:text-stone-900 transition-colors">${i}<span class="text-purple-300 ml-10">·</span></span>`
        )
        .join("");
    }
  }, []);

  return (
    <>
      <style>{`
        :root {
          --purple: #534AB7;
          --purple-dark: #3C3489;
          --purple-darkest: #26215C;
          --purple-mid: #AFA9EC;
          --purple-light: #CECBF6;
          --purple-bg: #EEEDFE;
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ticker-track {
          display: flex;
          gap: 2.5rem;
          width: max-content;
          animation: ticker 36s linear infinite;
        }
        .ticker-track:hover { animation-play-state: paused; }
        .hero-title { animation: fadeUp 0.5s 0.1s ease both; }
        .drop::first-letter {
          font-size: 4.5rem;
          font-weight: 500;
          float: left;
          line-height: 0.82;
          margin-right: 0.6rem;
          margin-top: 0.5rem;
          color: #1c1917;
          font-family: Georgia, serif;
        }
        .related-card:hover .related-img { transform: scale(1.03); }
      `}</style>

      <div className="bg-stone-50 min-h-screen w-full">
        <div className="max-w-[1040px] mx-auto px-10 py-12 bg-stone-50 min-h-screen">

          {/* Nav */}
          <nav className="flex items-center justify-between py-6 border-b border-black/10 mb-6">
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-stone-500">
              Anomalía · Archivo
            </span>
            <div className="hidden sm:flex gap-8">
              {["Historia", "Ciencia", "Misterios", "Geografía", "Archivo"].map((l) => (
                <a key={l} href="#" className="text-[13px] text-stone-500 tracking-wide hover:text-stone-900 transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </nav>

          {/* Ticker */}
          <div className="flex items-center gap-5 py-4 border-b border-black/10 mb-14 overflow-hidden">
            <span className="text-[10px] font-medium tracking-[0.14em] uppercase px-3 py-1 rounded bg-[var(--purple-bg)] text-[var(--purple-dark)] shrink-0">
              En portada
            </span>
            <div className="overflow-hidden flex-1 min-w-0">
              <div ref={tickerRef} className="ticker-track flex gap-10" />
            </div>
          </div>

          {/* Hero */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 items-start">
            <div>
              <span className="text-[10px] font-medium tracking-[0.14em] uppercase px-3 py-1 rounded bg-[var(--purple-bg)] text-[var(--purple-dark)]">
                Guerra Fría · U.R.S.S.
              </span>
              <h1 className="hero-title font-serif text-4xl md:text-[3rem] font-medium leading-[1.1] mt-5 mb-6 text-stone-900">
                El radar que{" "}
                <em className="font-normal text-stone-500">perturbó</em>{" "}
                las ondas de todo el planeta
              </h1>
              <div className="flex items-center gap-4 text-[12px] text-stone-500 tracking-wide mb-6 flex-wrap">
                <span>12 abril, 2026</span>
                <span className="text-black/20">|</span>
                <span>Lectura: 8 min</span>
                <span className="text-black/20">|</span>
                <span>Por Elena Vassilieva</span>
              </div>
              <p className="text-[17px] leading-[1.85] text-stone-500 mb-6">
                Durante más de una década, operadores de radio en Europa, América y Asia escuchaban un misterioso golpeteo rítmico que nadie sabía explicar. Era el Duga-3, una antena soviética de 150 metros oculta en los bosques de Ucrania — uno de los secretos mejor guardados de la Guerra Fría.
              </p>
              <a href="#articulo" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--purple)] hover:text-[var(--purple-dark)] transition-colors">
                Leer el artículo completo{" "}
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <div>
              <div className="relative">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Duga_Radar_Array.jpg/1280px-Duga_Radar_Array.jpg"
                  alt="Antena Duga-3"
                  className="w-full aspect-[4/3] object-cover rounded-xl block shadow-sm"
                />
                <span className="absolute bottom-4 left-4 bg-white/90 text-[10px] text-stone-900 px-3 py-1 rounded tracking-wide backdrop-blur-sm">
                  Duga-3 · Chernobyl-2, Ucrania · ca. 1980
                </span>
              </div>
              <p className="text-[11px] text-stone-400 text-center mt-3">
                Fotografía aérea — archivo declasificado
              </p>
            </div>
          </section>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {[
              { num: "150", unit: "m", label: "Altura de la antena principal", accent: true },
              { num: "700", unit: "m", label: "Longitud del receptor", accent: true },
              { num: "1976", unit: "", label: "Año de activación", accent: false },
              { num: "10", unit: "+", label: "Años en operación secreta", accent: true },
            ].map((m, i) => (
              <div key={i} className="bg-stone-100/80 rounded-xl p-5">
                <div className="flex items-baseline gap-0.5">
                  <span className={`text-[2rem] font-medium leading-none ${m.accent ? "text-[var(--purple)]" : "text-stone-900"}`}>
                    {m.num}
                  </span>
                  {m.unit && (
                    <span className={`text-[1rem] font-medium ${m.accent ? "text-[var(--purple)]" : "text-stone-900"}`}>
                      {m.unit}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 mt-2 leading-tight tracking-wide">{m.label}</p>
              </div>
            ))}
          </div>

          <Divider label="El artículo" />

          {/* Article */}
          <div id="articulo" className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-14 mb-4">
            <div>
              <p className="drop text-[17px] leading-[1.85] text-stone-500 mb-6">
                Desde 1976, los radioaficionados del mundo empezaron a reportar una interferencia extraña: un pulso rítmico, entre 10 y 40 veces por segundo, que irrumpía en las frecuencias de onda corta como si alguien hubiera conectado un metrónomo al éter. Lo llamaron el Pájaro Carpintero Ruso.
              </p>
              <p className="text-[17px] leading-[1.85] text-stone-500 mb-6">
                La señal era tan intensa que cortaba transmisiones de aviación, conversaciones transatlánticas y emisoras de radio. Nadie fuera del bloque soviético sabía de dónde venía. La OTAN especulaba, los ingenieros de la BBC se quejaban, y los conspiranoicos construían teorías sobre control mental y experimentos electromagnéticos.
              </p>
              <div className="border-l-2 border-[var(--purple)] pl-6 my-10">
                <p className="italic text-[1.2rem] leading-[1.7] text-stone-900">
                  "Era como si el planeta tuviera un latido. Uno muy irritante que nadie podía apagar."
                </p>
              </div>
              <h3 className="font-serif text-[1.5rem] font-medium text-stone-900 mt-10 mb-4">
                Un muro de metal en el bosque
              </h3>
              <p className="text-[17px] leading-[1.85] text-stone-500 mb-6">
                La respuesta estaba en las afueras de Chernobyl: el Duga-3, una instalación de radar de horizonte extendido diseñada para detectar lanzamientos de misiles balísticos antes de que cruzaran el Atlántico. La antena principal medía 150 metros de altura y 700 metros de longitud — en esencia, un muro de acero capaz de ver más allá del horizonte.
              </p>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Duga-3_radar_antennas.jpg/1280px-Duga-3_radar_antennas.jpg"
                alt="Antenas Duga-3"
                className="w-full aspect-video object-cover rounded-xl my-6"
              />
              <p className="text-[11px] text-stone-400 text-center mb-6">
                Vista lateral de las antenas receptoras del Duga-3
              </p>
              <h3 className="font-serif text-[1.5rem] font-medium text-stone-900 mt-10 mb-4">
                La dependencia nuclear
              </h3>
              <p className="text-[17px] leading-[1.85] text-stone-500 mb-6">
                La instalación consumía tanta electricidad que los soviéticos construyeron una línea directa desde la planta nuclear de Chernobyl. Era una de las instalaciones más caras de la historia militar soviética, con un costo estimado de más de mil millones de rublos de la época.
              </p>
              <p className="text-[17px] leading-[1.85] text-stone-500 mb-6">
                Cuando el reactor número cuatro explotó el 26 de abril de 1986, el Duga quedó sin energía y fue evacuado en pocas horas. El Pájaro Carpintero dejó de golpear sin que Occidente recibiera nunca una explicación oficial.
              </p>
              <h3 className="font-serif text-[1.5rem] font-medium text-stone-900 mt-10 mb-4">
                El legado abandonado
              </h3>
              <p className="text-[17px] leading-[1.85] text-stone-500 mb-6">
                Hoy, las estructuras del Duga-3 siguen en pie dentro de la Zona de Exclusión. Son visitables como parte de los tours a la zona, y se han convertido en uno de los sitios de turismo oscuro más fotografiados del mundo. La ironía es que ahora son más famosas como atracción turística que como arma de guerra.
              </p>
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6 pt-1">
              <div className="bg-stone-100 rounded-[12px] p-5 border border-black/5">
                <p className="text-[10px] tracking-[0.14em] uppercase text-stone-400 mb-4">Datos clave</p>
                {[
                  { num: "150m", text: "Altura, visible a decenas de kilómetros a la redonda" },
                  { num: "10–40", text: "Pulsos por segundo que interferían frecuencias globales" },
                  { num: "1976", text: "Año de activación en las afueras de Chernobyl" },
                  { num: "700m", text: "Longitud de la antena receptora, como siete cuadras" },
                  { num: "1986", text: "Año de cierre tras el desastre de Chernobyl" },
                ].map((f, i) => (
                  <div key={i} className={`flex gap-4 items-start py-3.5 ${i > 0 ? "border-t border-black/5" : ""}`}>
                    <span className="text-[1.1rem] font-medium text-[var(--purple)] min-w-[50px] leading-none pt-0.5 shrink-0">
                      {f.num}
                    </span>
                    <span className="text-[13px] leading-[1.6] text-stone-500">{f.text}</span>
                  </div>
                ))}
              </div>
              <div className="bg-stone-100 rounded-[12px] p-5 border border-black/5">
                <p className="text-[10px] tracking-[0.14em] uppercase text-stone-400 mb-4">Ubicación</p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Duga_Radar_Array.jpg/1280px-Duga_Radar_Array.jpg"
                  alt="Duga"
                  className="w-full aspect-[4/3] object-cover rounded-lg"
                />
                <p className="text-[11px] text-stone-400 text-center mt-3">
                  Zona de exclusión · Chernobyl, Ucrania
                </p>
              </div>
              <div className="bg-stone-100 rounded-[12px] p-5 border border-black/5">
                <p className="text-[10px] tracking-[0.14em] uppercase text-stone-400 mb-4">Clasificación técnica</p>
                {[
                  { label: "Tipo", val: "OTH-B Radar", accent: false },
                  { label: "Frecuencia", val: "7–19 MHz", accent: false },
                  { label: "Rango", val: "900–3000 km", accent: false },
                  { label: "Estado", val: "Abandonado", accent: true },
                ].map((s, i) => (
                  <div key={i} className={`flex justify-between items-center text-[13px] py-2.5 ${i > 0 ? "border-t border-black/5" : ""}`}>
                    <span className="text-stone-500">{s.label}</span>
                    <span className={`font-medium ${s.accent ? "text-[var(--purple-dark)]" : "text-stone-900"}`}>
                      {s.val}
                    </span>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <Divider label="Línea de tiempo" />

          {/* Timeline */}
          <div className="mb-4 max-w-[800px] mx-auto">
            {[
              { year: "1968", title: "Inicio del proyecto", desc: "La URSS aprueba el desarrollo de un radar de horizonte extendido para detección temprana de misiles ICBM." },
              { year: "1976", title: "Primera emisión del «Pájaro Carpintero»", desc: "Radioaficionados de todo el mundo comienzan a reportar la misteriosa interferencia en ondas cortas." },
              { year: "1978", title: "La OTAN confirma la señal", desc: "Agencias de inteligencia occidentales localizan la fuente en territorio soviético sin identificar el propósito." },
              { year: "1986", title: "Chernobyl apaga el Duga", desc: "El desastre nuclear corta el suministro eléctrico. La señal desaparece del éter de forma abrupta y permanente." },
              { year: "2011", title: "Apertura al turismo oscuro", desc: "Las antenas del Duga-3 se abren al público dentro de los tours a la Zona de Exclusión de Chernobyl." },
            ].map((item, i) => (
              <div key={i} className="flex gap-7 pb-9 last:pb-0">
                <div className="w-16 text-right shrink-0 pt-0.5 font-mono text-[14px] font-medium text-[var(--purple)]">
                  {item.year}
                </div>
                <div className="w-px bg-black/10 relative shrink-0">
                  <div className="w-2.5 h-2.5 bg-[var(--purple)] rounded-full absolute top-1 -left-[5px]" />
                </div>
                <div>
                  <p className="text-[16px] font-medium text-stone-900 mb-2">{item.title}</p>
                  <p className="text-[14px] leading-[1.7] text-stone-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Divider label="Relacionado" />

          {/* Banner */}
          <div className="rounded-2xl p-8 mb-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 items-center bg-[var(--purple-bg)]">
            <div>
              <p className="text-[10px] tracking-[0.14em] uppercase text-[var(--purple)] mb-2">
                Archivo relacionado
              </p>
              <h3 className="font-serif text-[1.25rem] font-medium text-[var(--purple-darkest)] mb-2.5">
                ¿Conoces el Proyecto HAARP?
              </h3>
              <p className="text-[14px] leading-[1.65] text-[var(--purple)]">
                El sucesor espiritual del Duga — un programa de la USAF acusado de manipular el clima y las frecuencias cerebrales.
              </p>
            </div>
            <button className="text-[13px] font-medium text-[var(--purple)] border border-[var(--purple-mid)] rounded-xl px-6 py-3 bg-transparent cursor-pointer whitespace-nowrap hover:bg-[var(--purple-light)] transition-colors">
              Leer más ↗
            </button>
          </div>

          <Divider label="Más anomalías" />

          {/* Related Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
            {[
              {
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/The_Great_Molasses_Flood.jpg/800px-The_Great_Molasses_Flood.jpg",
                tag: "Desastres",
                title: "El día que Boston fue inundado por una ola gigante de melaza",
                date: "Boston, 1919",
              },
              {
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Kola_superdeep_borehole_site.JPG/800px-Kola_superdeep_borehole_site.JPG",
                tag: "Ciencia extrema",
                title: "El Pozo de Kola: el agujero que intentó perforar la Tierra",
                date: "Rusia, 1970–1994",
              },
              {
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Frog_in_pond.jpg/800px-Frog_in_pond.jpg",
                tag: "Fenómenos",
                title: "Cuando el cielo llovió peces, ranas y otros animales",
                date: "Desde 1578",
              },
            ].map((c, i) => (
              <article key={i} className="related-card rounded-[12px] overflow-hidden border border-black/5 bg-white cursor-pointer hover:border-black/20 transition-all shadow-sm">
                <div className="overflow-hidden">
                  <img src={c.img} alt={c.title} className="related-img w-full aspect-video object-cover block transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <p className="text-[10px] tracking-[0.12em] uppercase text-[var(--purple)] mb-2">{c.tag}</p>
                  <h3 className="font-serif text-[15px] font-medium leading-[1.45] text-stone-900 mb-3">{c.title}</h3>
                  <p className="text-[11px] text-stone-400">{c.date}</p>
                </div>
              </article>
            ))}
          </div>

          <Divider label="Para seguir leyendo" />

          {/* Further */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[
              { n: "01", title: "El Mary Celeste, el barco fantasma", sub: "Encontrado a la deriva en 1872, con la tripulación desaparecida y la cena aún servida." },
              { n: "02", title: "El incidente Vela de 1979", sub: "Un satélite detectó un destello nuclear en el Atlántico Sur. Nunca se supo quién lo detonó." },
              { n: "03", title: "El Zumbido de Taos", sub: "Miles de residentes de Nuevo México escuchan un zumbido que los científicos no han podido explicar." },
              { n: "04", title: "La Ciudad de los Muertos, El Cairo", sub: "Un cementerio medieval donde más de 500,000 personas viven entre tumbas, con electricidad y tiendas." },
            ].map((f, i) => (
              <div key={i} className="flex gap-5 p-5 border border-black/5 bg-white rounded-[12px] cursor-pointer hover:border-black/20 transition-colors">
                <span className="font-serif text-[2.5rem] font-medium shrink-0 leading-none text-[var(--purple-light)]">
                  {f.n}
                </span>
                <div>
                  <p className="text-[14px] font-medium text-stone-900 mb-1.5">{f.title}</p>
                  <p className="text-[12px] leading-[1.65] text-stone-500">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <Divider label="El autor" />

          {/* Author */}
          <div className="flex items-start gap-6 py-8 border-t border-b border-black/5 mb-10">
            <div className="w-14 h-14 rounded-full bg-[var(--purple-bg)] flex items-center justify-center text-sm font-medium text-[var(--purple-dark)] shrink-0 shadow-inner">
              EV
            </div>
            <div>
              <p className="text-[15px] font-medium text-stone-900 mb-2">Elena Vassilieva</p>
              <p className="text-[13px] leading-[1.7] text-stone-500">
                Historiadora especializada en tecnología de la Guerra Fría y arquitectura soviética abandonada. Ha documentado más de 40 sitios clasificados en Rusia y Ucrania.
              </p>
              <div className="flex gap-2 flex-wrap mt-4">
                {["Guerra Fría", "Arquitectura abandonada", "Historia soviética"].map((t) => (
                  <span key={t} className="text-[10px] px-3.5 py-1.5 rounded-full bg-[var(--purple-bg)] text-[var(--purple)] cursor-pointer tracking-wide font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-stone-400 mb-4">Etiquetas</p>
          <div className="flex gap-2.5 flex-wrap mb-12">
            {["Guerra Fría", "U.R.S.S.", "Chernobyl", "Tecnología militar", "Abandono", "Turismo oscuro"].map((t) => (
              <span key={t} className="text-[11px] text-stone-500 border border-black/10 px-4 py-1.5 rounded-full cursor-pointer hover:border-black/20 hover:text-stone-900 transition-colors">
                {t}
              </span>
            ))}
          </div>

          {/* Footer */}
          <footer className="flex items-center justify-between py-8 border-t border-black/10 flex-wrap gap-6">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-stone-500">
              Anomalía · Archivo © 2026
            </span>
            <nav className="flex gap-8">
              {["Acerca de", "Privacidad", "Contacto", "Newsletter"].map((l) => (
                <a key={l} href="#" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
                  {l}
                </a>
              ))}
            </nav>
          </footer>

        </div>
      </div>
    </>
  );
}

function Divider({ label }) {
  return (
    <div className="flex items-center gap-6 my-14">
      <div className="flex-1 h-px bg-black/10" />
      <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400">{label}</span>
      <div className="flex-1 h-px bg-black/10" />
    </div>
  );
}