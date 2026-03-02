import CalculadoraRelacionTransmisionComponent from '@/src/Components/Calculator/CalculadoraRelacionTransmision';
import Head from 'next/head';


export default function CalculadoraRelacionTransmision() {

  return (
    <>
      <Head>
        <title>Calculadora de Relación de Transmisión</title>
        <meta name="description" content="Calcula la relación de transmisión, velocidad del vehículo, multiplicación de torque y más parámetros de la caja de cambios." />
      </Head>
  <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <CalculadoraRelacionTransmisionComponent/>
          </div>
        </div>
     
      
    </>
  );
}