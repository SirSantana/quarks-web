import CalculadoraRelacionTransmisionComponent from '@/src/Components/Calculator/CalculadoraRelacionTransmision';
import Head from 'next/head';


export default function CalculadoraRelacionTransmision() {

  return (
    <>
      <Head>
        <title>Calculadora de Relación de Transmisión</title>
        <meta name="description" content="Calcula la relación de transmisión, velocidad del vehículo, multiplicación de torque y más parámetros de la caja de cambios." />
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
          <div style={{ flex: 1, minWidth: 0 }}>
            <CalculadoraRelacionTransmisionComponent/>
          </div>
        </div>
     
      
    </>
  );
}