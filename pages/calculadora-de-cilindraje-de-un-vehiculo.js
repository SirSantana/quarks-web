import Layout from "@/src/Components/Layout";
import styles from '@/styles/Articulos.module.css'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const initialData = {
  diametro: '80.5',
  carrera: '79.5',
  cilindros: 4
};
let description = 'Ingresa los datos y obtén la cilindrada o el volumen de tu cilindro de manera rápida y fácil. La herramienta en línea para calcular la cilindrada de motores de vehículos. '
export default function Cilindraje() {
  const [calcular, setCalcular] = useState(initialData);
  const router = useRouter()

  const [position, setPosition] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(5);
  const [cilindrajeTotal, setCilindrajeTotal] = useState(0)
  const pistonHeight = 0.2;

  const cylinderWidth = calcular.diametro;
  const cylinderHeight = calcular.carrera;
  const maxPosition = cylinderHeight - pistonHeight;

  function agregarPunto(numero) {
    return numero.toLocaleString(undefined, { minimumFractionDigits: 0 });
  }
  useEffect(() => {
    let cilindraje;
    let animationFrameId;


    let piTotal = (Math.PI * (calcular.diametro * calcular.diametro)) / 4;
    cilindraje = Math.round(piTotal) * calcular.carrera * calcular.cilindros

    const totalCilindraje = agregarPunto(Math.round(cilindraje / 1000));
    setCilindrajeTotal(totalCilindraje)


    const animate = () => {
      setPosition((prevPosition) => {
        if (prevPosition >= maxPosition && animationSpeed > 0) {
          setAnimationSpeed(-animationSpeed);
        } else if (prevPosition <= 0 && animationSpeed < 0) {
          setAnimationSpeed(-animationSpeed);
        }
        return prevPosition + animationSpeed;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [animationSpeed, maxPosition, calcular]);

  return (
    <Layout title={'Calculadora de volumen de un cilindro'} description={description} image={'https://azurequarks.blob.core.windows.net/avatares/calculadora de cilindraje.png'} keywords={'Calculadora de cilindrada, calculador de cilindrada, calculadora cilindrada, calculadora cilindraje, cilindrada, motor, volumen cilindros, calculadora volumen cilindros,calculadora area cilindro, formula de volumen de un cilindro, formula para calcular el volumen de un cilindro, volumen de un cilindro con diámetro'} url={router?.asPath} >
      <div className={styles.container}>
        <article >
          <h1 className={styles.title} style={{ color: '#373737', fontWeight: '600', marginTop: '15%' }}>Calculadora de cilindrada</h1>

          <p className={styles.response}>Calcula la cilindrada de tu moto, carro o motor. <br />Ingresa tus datos en milimetros con una coma (80,5).</p>
          <div className={styles.containerCalculadora}>

            <div className={styles.containerInputs}>
              <div style={{ display: 'flex', flexDirection: 'column', }}>
                <label style={{ fontSize: "16px" }}>Cilindrada Total</label>
                <h3 className={styles.textCilindraje}>{cilindrajeTotal} CC</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: '600' }}>Diametro cilindro</label>
                  <div>
                    <input onKeyPress={(e) => {
                      const charCode = e.which ? e.which : e.keyCode;
                      if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
                        e.preventDefault();
                      }
                    }} step="0.01" style={{ width: "50px" }} type="number"
                      onChange={(e) =>
                        setCalcular({ ...calcular, diametro: e.target.value })
                      }
                      value={calcular.diametro} />
                    <label style={{ fontSize: "14px", marginLeft: "4px" }}>mm</label>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: '600' }}>Carrera piston</label>
                  <div>
                    <input onKeyPress={(e) => {
                      const charCode = e.which ? e.which : e.keyCode;
                      if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
                        e.preventDefault();
                      }
                    }} step="0.01" style={{ width: "50px" }} type="number" onChange={(e) => setCalcular({ ...calcular, carrera: e.target.value })} value={calcular.carrera} />
                    <label style={{ fontSize: "14px", marginLeft: "4px" }}>mm</label>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: '600' }}>Cantidad cilindros</label>
                  <div>
                    <input style={{ width: "50px" }} type="number" onChange={(e) => setCalcular({ ...calcular, cilindros: parseInt(e.target.value) })} value={calcular.cilindros} />
                  </div>
                </div>
              </div>
            </div>
            <svg width={cylinderWidth} height={cylinderHeight - 2}>
              <rect
                x={0}
                y={cylinderHeight - pistonHeight * cylinderHeight - position}
                width={cylinderWidth}
                height={pistonHeight * cylinderHeight}
                fill="#969595"
                stroke="black"
                strokeWidth="4"
              />
              <rect
                x={0}
                y={0}
                width={cylinderWidth}
                height={cylinderHeight}
                stroke="black"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </div>
        </article>
        <div style={{ marginTop: '96px' }}>
          <h2>¿Qué es el Cilindraje de un Vehículo?</h2>
          <br />
          <p style={{ lineHeight: '1.8' }}>La <b>cilindrada de un vehículo</b> es una medida importante que nos dice cuánto espacio hay dentro de los cilindros del motor. Ahora, imagina los cilindros como los corazones del motor.<br /><br /> Estos cilindros son como habitaciones donde ocurre la magia de la combustión, lo que hace que el motor funcione y el vehículo se mueva. Así que, en esencia, el cilindraje nos dice cuánta "potencia" puede generar el motor.</p>
          {/* <a style={{ marginTop: '32px' }} href='https://www.quarks.com.co/articulos/Cilindrada-de-un-vehiculo-:-Todo-lo-que-tienes-que-saber-64860ae7bf99b4c49795114b'>
          Conoce todo sobre la cilindrada Aqui!
        </a> */}
          <br /><br />

          <h2>¿Cual es la formula para calcular el volumen de un cilindro?</h2>
          <br />
          <p style={{ lineHeight: '1.8' }}>La formula del volumen de un cilindro no es tan difícil como podría parecer. Se trata de matemáticas básicas. <br /><br />La fórmula para el volumen (V) de un cilindro es V=πr2h, donde π representa la constante pi, aproximadamente 3.14159. Aquí, r denota el radio de la base del cilindro, y ℎ h indica la altura del mismo. Este cálculo meticuloso nos proporciona un valor de volumen expresado en unidades cúbicas, tales como centímetros cúbicos (cm³) o metros cúbicos (m³).
          <br /><br />En otras palabras, al sumergirnos en la fórmula, desentrañamos la esencia cuantitativa del cilindro, permitiéndonos entender y cuantificar el espacio que ocupa en el mundo tridimensional. Este conocimiento no solo es fundamental en términos teóricos, sino que también tiene aplicaciones prácticas en el diseño y análisis de componentes mecánicos clave.<br /><br /><b>V = πr2h</b></p>
          <br /><br />
          <h2>Problemas a la Hora de Calcular la cilindrada</h2>
          <br />
          <p style={{ lineHeight: '1.8' }}> A veces, calcular el cilindraje no es tan sencillo. <br /><br />Puede haber problemas que dificulten la precisión de la medición. Uno de los desafíos comunes es la variación en la forma de los cilindros. <br /><br />Si un cilindro no es perfectamente circular, los cálculos se vuelven más complejos. Además, si los cilindros no tienen la misma forma o tamaño, el cálculo se complica aún más.</p>
          <br></br>
        </div>

      </div >
    </Layout >
  )
}