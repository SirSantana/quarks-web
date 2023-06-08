import Layout from "@/src/Components/Layout";
import styles from '@/styles/Articulos.module.css'
import { useEffect, useState } from "react";

const initialData = {
  diametro: '80.5',
  carrera: '79.5',
  cilindros: 4
};
let keyWords= ['Cilindraje', '']
let description = 'Aprende qué es el cilindraje de un vehículo, cómo se calcula y su importancia en el rendimiento del motor. Descubre cómo calcular la cilindrada y su relación con la potencia y eficiencia del automóvil.'
export default function Cilindraje() {
  const [visibleResponse, setVisibleResponse] = useState({ question1: true, question2: true, question3: true })
  const [calcular, setCalcular] = useState(initialData);

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
    <Layout title={'¿Como calcular el cilindraje de un vehiculo? | Quarks'} description={description} >
      <div className={styles.container}>
        <header className={styles.containerHeader}>
          <p className={styles.subtitleCategory}>Motor</p>
          <p className={styles.subtitleHeader}>16 Junio 2023 · por Miguel Salazar</p>
        </header>


        <section>
          <h1 className={styles.title}>¿Como calcular el cilindraje de un vehiculo?</h1>
          <section style={{ display: 'flex', flexDirection: 'row', gap: '32px', margin: '16px 0 32px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
              <div style={{ borderRadius: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '32px', width: '32px', border: '1px solid #bababa' }}>
                <ion-icon name="eye-outline"></ion-icon>
              </div>
              <p className={styles.subtitleHeader}>210 vistas</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
              <div style={{ borderRadius: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '32px', width: '32px', border: '1px solid #bababa' }}>
                <ion-icon name="book-outline"></ion-icon>
              </div>
              <p className={styles.subtitleHeader}>6 min lectura</p>
            </div>
            <div style={{ borderRadius: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '32px', width: '32px', border: '1px solid #bababa' }}>
              <ion-icon name="share-outline"></ion-icon>
            </div>
          </section>

          <img alt={'Que es el cilindraje en un auto?'} src={'https://azurequarks.blob.core.windows.net/repuestos/calcularcilindrajedeunvehiculomotor.png'} className={styles.imgPrincipal} />


          <article style={{ margin: '16px 0' }}>
            <div onClick={() => setVisibleResponse({ ...visibleResponse, question1: visibleResponse.question1 ? false : true })} style={{ flexDirection: 'row', display: 'flex', cursor: 'pointer', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
              <h2 className={styles.question}>¿Qué es la cilindrada de un auto?</h2>
              <img src={visibleResponse.question1 ? './remove-sharp.svg' : './add-sharp.svg'} className={styles.icon} />
            </div>
            {visibleResponse.question1 && (
              <p className={styles.response}>La cilindrada o desplazamiento del motor, es el volumen total de los pistones dentro de los cilindros de un motor. Esto influye en la potencia del motor y la eficiencia del combustible.</p>
            )}
          </article>


          <article style={{ margin: '16px 0' }}>
            <div onClick={() => setVisibleResponse({ ...visibleResponse, question2: visibleResponse.question2 ? false : true })} style={{ flexDirection: 'row', display: 'flex', cursor: 'pointer', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
              <h2 className={styles.question}>¿Cómo se calcula la cilindrada de un auto?</h2>
              <img src={visibleResponse.question2 ? './remove-sharp.svg' : './add-sharp.svg'} className={styles.icon} />
            </div>

            {visibleResponse.question2 && (
              <div>
                <p className={styles.response}>La cilindrada total se obtiene con la siguiente fórmula: π x (diámetro del cilindro²/4) multiplicado por la altura del recorrido total o carrera del pistón y por el número de pistones con los que cuenta el motor.</p>
                <img src={'https://azurequarks.blob.core.windows.net/repuestos/formulacalcularcilindrajedeunauto.png'} className={styles.imgFormula} alt="Fórmula para calcular la cilindrada de un auto" />
              </div>
            )}
          </article>


          <article style={{ margin: '16px 0' }}>
            <div onClick={() => setVisibleResponse({ ...visibleResponse, question3: visibleResponse.question3 ? false : true })} style={{ flexDirection: 'row', display: 'flex', cursor: 'pointer', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
              <h2 className={styles.question}>Calculadora de cilindraje</h2>
              <img src={visibleResponse.question3 ? './remove-sharp.svg' : './add-sharp.svg'} className={styles.icon} />
            </div>
            {visibleResponse.question3 &&
              <>
                <p className={styles.response}>Ingresa tus datos en milimetros con una coma (80,5).</p>

                <div className={styles.containerCalculadora}>

                  <div className={styles.containerInputs}>
                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                      <label style={{ fontSize: "16px" }}>Cilindraje Total</label>
                      <label className={styles.textCilindraje}>{cilindrajeTotal} CC</label>
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
              </>
            }
          </article>
        </section >
      </div >
    </Layout >
  )
}