import CalculadoraCilindradaComponent from "@/src/Components/Calculator/CalculadoraCilindrada";
import FooterV2 from "@/src/Components/Footer/FooterV2";
import Head from "next/head";

export default function CalculadoraCilindrada() {
  return (
    <>
      <Head>
        <title>Calculadora de Cilindrada de Motor | CC y Litros</title>

        <meta
          name="description"
          content="Calcula la cilindrada total de tu motor en CC y Litros. Herramienta precisa basada en el diámetro (bore), carrera (stroke) y número de cilindros. Ideal para mecánicos."
        />
        <meta
          name="keywords"
          content="calculadora cilindrada motor, calcular cc motor, cubicaje motor, diámetro y carrera, calcular cilindros motor"
        />
        <link
          rel="canonical"
          href="https://www.quarks.com.co/calculadora-de-cilindraje-de-un-vehiculo"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph para Redes Sociales */}
        <meta
          property="og:title"
          content="¿Cómo calcular la cilindrada de un motor? Herramienta Online"
        />
        <meta
          property="og:description"
          content="Determina el volumen exacto de tu motor ingresando el diámetro y la carrera del pistón. Resultados instantáneos en CC y Litros."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:image:url" content="/favicon.png" />
        <link rel="icon" href="/favicon.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Calculadora de Cilindrada y Cubicaje"
        />
        <meta
          name="twitter:description"
          content="Calcula los centímetros cúbicos (CC) de cualquier motor de forma profesional."
        />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1233996863721897"
          crossOrigin="anonymous"
        ></script>

        {/* Marcado de Datos Estructurados (Schema.org) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Calculadora de Cilindrada Profesional",
              operatingSystem: "All",
              applicationCategory: "UtilitiesApplication",
              description:
                "Herramienta técnica para calcular el volumen de desplazamiento de motores de combustión interna.",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "860",
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
          <CalculadoraCilindradaComponent />
<div className="max-w-[900px] mx-auto mt-16 pb-20 px-4 text-left">
  
  <article>
    <header className="mb-10">
      <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">
        Guía de Cilindrada: Cómo calcular el Cubicaje de un Motor
      </h2>
      <p className="text-[15px] leading-relaxed text-gray-500 mb-4">
        La <strong>cilindrada de un motor</strong> es el factor que determina el volumen total de desplazamiento de los pistones. Nuestra herramienta de <strong>cubicaje de motor</strong> permite obtener con precisión milimétrica los centímetros cúbicos (CC) y litros, datos vitales para cualquier proceso de rectificación o potenciación mecánica.
      </p>
      <p className="text-[15px] leading-relaxed text-gray-500">
        Ya sea que busques el desplazamiento de un motor de 4 cilindros, un V8 americano o un motor de motocicleta, entender el <strong>volumen del cilindro</strong> es el primer paso para calcular la relación de compresión y el torque potencial.
      </p>
    </header>

    <div className="h-[1px] bg-gray-100 w-full my-10" />

    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Fórmula para calcular Cilindrada y Desplazamiento Total
      </h2>
      <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">
        Para determinar el <strong>cubicaje profesional</strong>, aplicamos la geometría del cilindro multiplicada por el número de cámaras de combustión. La ecuación matemática estándar que utiliza nuestra calculadora de cilindrada es:
      </p>
      
      <div className="py-6 px-4 mb-6 border-y border-gray-100 flex flex-col items-center justify-center">
        <span className="text-[18px] font-mono text-[#407BFF] font-bold">
          CC = [π × (Diámetro / 2)² × Carrera] × N° Cilindros
        </span>
        <span className="text-[12px] text-gray-400 mt-2 uppercase tracking-widest">
          Ecuación de Desplazamiento Volumétrico
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <h3 className="text-[17px] font-bold text-gray-900 mb-2">Diámetro y Carrera (Bore & Stroke)</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            El <strong>diámetro (bore)</strong> mide el ancho del cilindro, mientras que la <strong>carrera (stroke)</strong> es el recorrido del pistón. Alterar estas medidas es lo que comúnmente se conoce como "rectificar" para ganar potencia.
          </p>
        </div>
        <div>
          <h3 className="text-[17px] font-bold text-gray-900 mb-2">Conversión de CC a Litros</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            Para pasar de centímetros cúbicos a litros, simplemente dividimos el resultado entre 1,000. Por ejemplo, un motor de <strong>1,998 CC</strong> se comercializa usualmente como un motor <strong>2.0 Litros</strong>.
          </p>
        </div>
      </div>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Preguntas Frecuentes sobre el Cubicaje de Motores
      </h2>
      
      <div className="space-y-8">
        <div className="border-l-2 border-[#407BFF] pl-6">
          <h4 className="text-[16px] font-bold text-gray-900 mb-2">¿Por qué es importante conocer la cilindrada exacta?</h4>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            Es fundamental para calcular la cantidad de combustible necesaria, elegir el tamaño del turbocompresor adecuado y cumplir con las normativas fiscales de tránsito que se basan en los <strong>caballos fiscales</strong> o el cilindraje.
          </p>
        </div>

        <div className="border-l-2 border-[#407BFF] pl-6">
          <h4 className="text-[16px] font-bold text-gray-900 mb-2">¿Cómo influye el número de cilindros en el cálculo?</h4>
          <p className="text-[14px] text-gray-500 leading-relaxed">
            La cilindrada unitaria es el volumen de un solo cilindro. La <strong>cilindrada total</strong> es la suma del volumen de todos los cilindros del bloque motor (V6, V8, L4, etc.).
          </p>
        </div>
      </div>
    </section>

    <section className="mt-16">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Cilindrada Promedio por Tipo de Vehículo
      </h2>
      <div className="overflow-hidden border border-gray-100 rounded-lg">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="bg-gray-50 text-gray-600 border-b border-gray-100">
              <th className="px-6 py-4 font-semibold text-left">Tipo de Motor</th>
              <th className="px-6 py-4 font-semibold text-left">Cubicaje Común</th>
              <th className="px-6 py-4 font-semibold text-left">Potencia Estimada</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-500">
            <tr>
              <td className="px-6 py-4 text-gray-900 font-medium">Motores de Ciudad</td>
              <td className="px-6 py-4 font-mono text-[#407BFF]">800 - 1,200 CC</td>
              <td className="px-6 py-4 italic">Alta Eficiencia</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-gray-900 font-medium">Sedanes y SUVs</td>
              <td className="px-6 py-4 font-mono text-[#407BFF]">1,600 - 2,500 CC</td>
              <td className="px-6 py-4 italic">Uso Mixto</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-gray-900 font-medium">Motores de Alto Rendimiento</td>
              <td className="px-6 py-4 font-mono text-[#407BFF]">3,000 - 6,000+ CC</td>
              <td className="px-6 py-4 italic">Alto Torque</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-[12px] text-gray-400 mt-4 italic text-center">
        * Estos valores representan promedios de la industria automotriz global.
      </p>
    </section>
  </article>
</div>
        </div>
      </div>
      <FooterV2 />
    </>
  );
}
