import Head from "next/head";
import CalculadoraCombustible from "@/src/Components/Calculator/CalculadoraCombustible";
import FooterV2 from "@/src/Components/Footer/FooterV2";

export const OTHER_CALCULATORS = [
  {
    label: "Calculadora de cilindrada",
    desc: "Calcula el volumen total del motor",
    href: "/calculadora-de-cilindraje-de-un-vehiculo",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
      </svg>
    ),
  },
  {
    label: "Comparador de neumáticos",
    desc: "Compara dimensiones y diferencias",
    href: "/comparador-neumaticos",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    ),
  },
  {
    label: "Relación de transmisión",
    desc: "Calcula RPM, velocidad y relaciones",
    href: "/calculadora-relacion-transmision",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="7" cy="17" r="3" />
        <circle cx="17" cy="7" r="3" />
        <path d="M7 14V7a5 5 0 0 1 10 0v10" />
      </svg>
    ),
  },
  {
    label: "Calculadora de combustible",
    desc: "Rendimiento y costo por viaje",
    href: "/calculadora-de-combustible",
    active: true,
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 22V8l9-6 9 6v14H3z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
];
export default function CalculadoraDeCombustible() {
  return (
    <>
      <Head>
        <title>
          Calculadora de Consumo de Combustible | Gasto por Kilómetro y Viaje
        </title>

        <meta
          name="description"
          content="Calcula cuánto gasta tu coche en gasolina o diesel. Herramienta gratuita para medir el consumo por km, costo total de viaje y eficiencia de combustible."
        />
        <meta
          name="keywords"
          content="calculadora combustible, gasto gasolina viaje, consumo combustible km, calcular costo gasolina"
        />
        <link
          rel="canonical"
          href="https://www.quarks.com.co/calculadora-de-combustible"
        />
        <meta name="robots" content="index, follow" />
        {/* Open Graph para Facebook/WhatsApp */}
        <meta
          property="og:title"
          content="¿Cuánto cuesta tu viaje? Calculadora de Combustible Online"
        />
        <meta
          property="og:description"
          content="Calcula el consumo real de tu vehículo y ahorra dinero en tu próximo viaje."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/favicon.png" />

        <meta property="og:image:url" content="/favicon.png" />
        <link rel="icon" href="/favicon.png" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Calculadora de Gasto de Combustible"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1233996863721897"
          crossorigin="anonymous"
        ></script>
         {process.env.NODE_ENV === "production" && (
          <script
            async
            defer
            dangerouslySetInnerHTML={{
              __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "jh3neqgrnc");
        `,
            }}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Calculadora de Combustible Profesional",
              operatingSystem: "All",
              applicationCategory: "FinanceApplication",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "1250",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </Head>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <CalculadoraCombustible />
          <div className="max-w-[1100px] mx-auto mt-16  px-8 pb-20 max-sm:px-4 ">
            {/* ── Article 1: Main intro + FAQ ───────────────────────────────────── */}
            <article className="mb-10">
              <header className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-3">
                  Calculadora de Consumo de Combustible: Ahorra en Gasolina y
                  Diésel
                </h2>
                <p className="text-[15px] text-gray-500 leading-relaxed">
                  Nuestra{" "}
                  <strong className="text-gray-700 font-medium">
                    calculadora de combustible online
                  </strong>{" "}
                  es la herramienta definitiva para conductores que buscan
                  optimizar sus gastos. Ya sea para planificar un viaje largo o
                  auditar el consumo mensual de tu vehículo, calcular el{" "}
                  <strong className="text-gray-700 font-medium">
                    gasto de gasolina
                  </strong>{" "}
                  exacto te permite tomar mejores decisiones financieras y
                  reducir tu impacto ambiental.
                </p>
              </header>

              {/* How it works */}
              <section className="mb-8">
                <h3 className="text-[17px] font-semibold text-gray-800 mb-3">
                  ¿Cómo calcular cuánto gasta mi carro en combustible?
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                  Para obtener un resultado preciso en nuestra herramienta,
                  procesamos tres variables fundamentales que definen la
                  eficiencia energética:
                </p>
                <div className="flex flex-col gap-2.5 mb-5">
                  {[
                    {
                      label: "Distancia del recorrido",
                      desc: "Los kilómetros totales (ida y vuelta) que vas a recorrer.",
                    },
                    {
                      label: "Eficiencia o Consumo promedio",
                      desc: "Generalmente expresado en litros por cada 100 km (L/100km) o km por litro (km/L).",
                    },
                    {
                      label: "Precio local del combustible",
                      desc: "El costo actual por litro de gasolina o diésel en tu estación de servicio preferida.",
                    },
                  ].map(({ label, desc }) => (
                    <div key={label} className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#407BFF] mt-2 shrink-0" />
                      <p className="text-[14px] text-gray-500 leading-relaxed m-0">
                        <strong className="text-gray-700 font-medium">
                          {label}:
                        </strong>{" "}
                        {desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tip callout */}
                <div className="flex gap-3 items-start bg-[#f0f5ff] border-l-4 border-[#407BFF] rounded-lg px-4 py-3.5">
                  <span className="text-lg leading-none mt-0.5">💡</span>
                  <p className="text-[13px] text-gray-600 leading-relaxed m-0">
                    <strong className="text-gray-700">Tip de experto:</strong>{" "}
                    Mantener la presión correcta en los neumáticos según el
                    manual del fabricante puede reducir el consumo de
                    combustible hasta en un{" "}
                    <strong className="text-gray-700">3%</strong>.
                  </p>
                </div>
              </section>

              {/* Formula */}
              <section className="mb-8">
                <h3 className="text-[17px] font-semibold text-gray-800 mb-3">
                  Fórmula para calcular el gasto de gasolina manualmente
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                  Si prefieres realizar el análisis de forma manual, la ecuación
                  estándar de logística vehicular es:
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 text-center mb-4">
                  <p className="text-[14px] font-semibold text-gray-800 m-0">
                    Costo Total = (Distancia / 100) × Consumo promedio × Precio
                    por Litro
                  </p>
                </div>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Nuestra calculadora automatiza este proceso para evitar
                  errores de cálculo y ofrecerte un presupuesto instantáneo para
                  tu viaje.
                </p>
              </section>

              {/* FAQ */}
              <section>
                <h3 className="text-[17px] font-semibold text-gray-800 mb-5">
                  Preguntas Frecuentes sobre Consumo Vehicular (FAQ)
                </h3>
                <div className="flex flex-col gap-0">
                  {[
                    {
                      q: "¿Qué factores afectan el consumo de gasolina real?",
                      a: "No solo depende del motor. La velocidad constante, el uso excesivo del aire acondicionado, la carga aerodinámica (como portaequipajes) y el estado de los filtros de aire influyen directamente en la eficiencia de cada litro.",
                    },
                    {
                      q: "¿Es mejor calcular el costo por kilómetro o por viaje?",
                      a: "Depende de tu objetivo. Calcular el costo por kilómetro es ideal para determinar la rentabilidad si trabajas con tu vehículo, mientras que el costo por viaje es esencial para la planificación de presupuestos familiares o logística de vacaciones.",
                    },
                    {
                      q: "¿Cómo influye el tipo de combustible en el rendimiento?",
                      a: "Motores diésel suelen ofrecer mayor autonomía en carretera, mientras que los motores a gasolina o híbridos pueden variar su eficiencia dependiendo de si el ciclo de conducción es urbano o extraurbano.",
                    },
                  ].map(({ q, a }, i) => (
                    <div
                      key={i}
                      className="py-4 border-b border-gray-100 last:border-0"
                    >
                      <h4 className="text-[14px] font-semibold text-[#407BFF] mb-1.5">
                        {q}
                      </h4>
                      <p className="text-[14px] text-gray-500 leading-relaxed m-0">
                        {a}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </article>

            {/* ── Article 2: Factors ────────────────────────────────────────────── */}
            <article className="mb-10">
              <header className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-3">
                  Factores que afectan el consumo de gasolina de tu vehículo
                </h2>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Muchos conductores se preguntan por qué su coche gasta más de
                  lo que indica el fabricante. La realidad es que el{" "}
                  <strong className="text-gray-700 font-medium">
                    consumo de combustible
                  </strong>{" "}
                  no es una cifra estática. Depende de variables externas y
                  hábitos de conducción que pueden variar el gasto hasta en un
                  30%.
                </p>
              </header>

              <div className="flex flex-col gap-0">
                {[
                  {
                    num: "1",
                    title: "Resistencia aerodinámica y peso",
                    body: "Llevar portaequipajes en el techo o las ventanas abiertas a altas velocidades aumenta la resistencia al aire. Esto obliga al motor a trabajar más, elevando el consumo. Por cada 100 kg de carga adicional, el gasto de combustible sube aproximadamente un 5% en vehículos promedio.",
                  },
                  {
                    num: "2",
                    title: "El estado de la mecánica",
                    body: "Un motor con filtros de aire sucios o bujías en mal estado no realiza una combustión eficiente. Nuestra calculadora de combustible te ayuda a detectar estos problemas: si notas que el costo por kilómetro sube repentinamente en los mismos trayectos, es hora de una revisión técnica.",
                  },
                ].map(({ num, title, body }) => (
                  <div
                    key={num}
                    className="py-5 border-b border-gray-100 last:border-0 flex gap-4 items-start"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#407BFF] text-white text-[12px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {num}
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-gray-800 mb-1.5">
                        {title}
                      </h3>
                      <p className="text-[14px] text-gray-500 leading-relaxed m-0">
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* ── Article 3: Eco tips grid ──────────────────────────────────────── */}
            <article className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-6">
                Guía Práctica: ¿Cómo reducir el gasto de combustible?
              </h2>
              <div className="grid grid-cols-3 gap-3 max-[700px]:grid-cols-1">
                {[
                  {
                    title: "Conducción Ecológica (Eco-Driving)",
                    body: "Evita acelerones bruscos. Mantener una velocidad uniforme ayuda a que el sistema de inyección trabaje en su rango óptimo.",
                  },
                  {
                    title: "Uso del Aire Acondicionado",
                    body: "A bajas velocidades es mejor bajar las ventanillas, pero a más de 80 km/h el aire acondicionado es más eficiente que la resistencia del aire de las ventanas abiertas.",
                  },
                  {
                    title: "Presión de Neumáticos",
                    body: "Circular con 0.5 bares menos de la presión recomendada aumenta el consumo un 2% en ciudad y un 4% en carretera.",
                  },
                ].map(({ title, body }) => (
                  <div
                    key={title}
                    className="bg-white border border-gray-200 rounded-xl p-5 border-l-4 border-l-[#10b981]"
                  >
                    <h4 className="text-[14px] font-semibold text-gray-800 mb-2">
                      {title}
                    </h4>
                    <p className="text-[13px] text-gray-500 leading-relaxed m-0">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            {/* ── Article 4: Comparison table ──────────────────────────────────── */}
            <article>
              <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-3">
                Gasolina, Diésel o Híbrido: ¿Cuál rinde más por kilómetro?
              </h2>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-5">
                Al utilizar una{" "}
                <strong className="text-gray-700 font-medium">
                  calculadora de costo de viaje
                </strong>
                , notarás que los precios varían drásticamente según el tipo de
                energía:
              </p>

              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-3 bg-[#407BFF] px-5 py-3">
                  {["Tipo de Motor", "Eficiencia Media", "Uso Ideal"].map(
                    (h) => (
                      <span
                        key={h}
                        className="text-[12px] font-semibold text-white uppercase tracking-[0.4px]"
                      >
                        {h}
                      </span>
                    ),
                  )}
                </div>
                {/* Rows */}
                {[
                  {
                    tipo: "Gasolina Atmosférico",
                    eficiencia: "7 – 9 L/100km",
                    uso: "Uso mixto / Diario",
                  },
                  {
                    tipo: "Diésel Turbo",
                    eficiencia: "4 – 6 L/100km",
                    uso: "Largas distancias",
                  },
                  {
                    tipo: "Híbrido (HEV)",
                    eficiencia: "3.5 – 5 L/100km",
                    uso: "Tráfico Urbano",
                  },
                ].map(({ tipo, eficiencia, uso }, i) => (
                  <div
                    key={tipo}
                    className={`grid grid-cols-3 px-5 py-3.5 border-b border-gray-100 last:border-0 ${i % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <span className="text-[13px] font-medium text-gray-700">
                      {tipo}
                    </span>
                    <span className="text-[13px] text-gray-500">
                      {eficiencia}
                    </span>
                    <span className="text-[13px] text-gray-500">{uso}</span>
                  </div>
                ))}
              </div>

              <p className="text-[12px] text-gray-400 italic mt-3">
                Nota: Estos valores son referenciales. Usa nuestra herramienta
                superior para calcular el gasto real según tu modelo específico.
              </p>
            </article>
             
        </div>
          
        </div>
       
      </div>
      <FooterV2 />
    </>
  );
}
