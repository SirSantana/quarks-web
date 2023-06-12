import Layout from "@/src/Components/Layout";
import styles from '@/styles/Articulos.module.css'
import { useEffect, useState } from "react";

const initialData = {
  diametro: '80.5',
  carrera: '79.5',
  cilindros: 4
};
let description = 'Calcula tu cilindraje facil, rapido y sencillo aqui. Obten la cilindrada de tu moto aqui'
export default function Cilindraje() {
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
    <Layout title={'Calculadora de cilindrada de un motor | Quarks'} description={description} >
      <div className={styles.container}>
        <article style={{ margin: '16px 0' }}>
          <div style={{ flexDirection: 'row', display: 'flex', cursor: 'pointer', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            <h1 className={styles.title}>Calculadora de cilindrada</h1>
          </div>
          <p className={styles.response}>Calcula la cilindrada de tu moto, carro o motor. <br/>Ingresa tus datos en milimetros con una coma (80,5).</p>
          <div className={styles.containerCalculadora}>

            <div className={styles.containerInputs}>
              <div style={{ display: 'flex', flexDirection: 'column', }}>
                <label style={{ fontSize: "16px" }}>Cilindrada Total</label>
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
        </article>
        <a style={{marginTop:'32px'}} href='https://www.quarks.com.co/articulos/Cilindrada-de-un-vehiculo-:-Todo-lo-que-tienes-que-saber-64860ae7bf99b4c49795114b'>
          Conoce todo sobre la cilindrada Aqui!
        </a>
      </div >
    </Layout >
  )
}