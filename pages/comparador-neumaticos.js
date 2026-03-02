import CalculadoraComparadorNeumaticosComponent from "@/src/Components/Calculator/CalculadoraComparadorNeumaticos";
import Head from "next/head";



export default function ComparadorNeumaticos() {


  return (
    <>
      <Head>
        <title>Comparador de Neumáticos — Dimensiones y Compatibilidad</title>
        <meta name="description" content="Compara dos neumáticos: diámetro, circunferencia, flanco, velocímetro y compatibilidad. Herramienta gratuita." />
       
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