import CalculadoraComparadorNeumaticosComponent from "@/src/Components/Calculator/CalculadoraComparadorNeumaticos";
import Head from "next/head";



export default function ComparadorNeumaticos() {


  return (
    <>
      <Head>
        <title>Comparador de Neumáticos — Dimensiones y Compatibilidad</title>
        <meta name="description" content="Compara dos neumáticos: diámetro, circunferencia, flanco, velocímetro y compatibilidad. Herramienta gratuita." />
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
      </Head>
     <div style={{ display: 'flex' }}>
          {/* <CalculadorasSidebar /> */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <CalculadoraComparadorNeumaticosComponent />
          </div>
        </div>
     
    </>
  );
}