// import { CREATE_SUGERENCIA } from "@/graphql/mutations";
// import Button, { ButtonVariant } from "@/src/Components/Button/Button";
// import Layout from "@/src/Components/Layout";
// import styles from '@/styles/Articulos.module.css'
// import { ModalLoading, ModalSuccessfull } from "@/utils/Modales";
// import { useMutation } from "@apollo/client";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// const initialData = {
//   diametro: '80.5',
//   carrera: '79.5',
//   cilindros: 4
// };
// let description = 'Ingresa los datos y obtén la cilindrada o el volumen de tu cilindro de manera rápida y fácil. La herramienta en línea para calcular la cilindrada de motores de vehículos, calcular cilindrada de una moto, calcular cilindrada de un auto, calcular cc de un cilindro, calculadora cc. '
// export default function Cilindraje() {
//   const [calcular, setCalcular] = useState(initialData);
//   const router = useRouter()

//   const [position, setPosition] = useState(0);
//   const [animationSpeed, setAnimationSpeed] = useState(5);
//   const [cilindrajeTotal, setCilindrajeTotal] = useState(0)
//   const pistonHeight = 0.2;

//   const cylinderWidth = calcular.diametro;
//   const cylinderHeight = calcular.carrera;
//   const maxPosition = cylinderHeight - pistonHeight;

//   const [createSugerencia, { data, loading }] = useMutation(CREATE_SUGERENCIA)
//   const [sugerencia, setSugerencia] = useState('')

//   const handleSugerenciaChange = (e) => {
//     const cleanedValue = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
//     setSugerencia(cleanedValue);
//   };
//   const handleSendSugerencia = (e) => {
//     e.preventDefault()
//     if (sugerencia.length <= 10) {
//       return alert('Cuentanos la sugerencia que tienes!')
//     }
//     createSugerencia({ variables: { sugerencia: sugerencia.trim(), tipo: 'calculadora-cilindrada' } })
//   }


//   function agregarPunto(numero) {
//     return numero.toLocaleString(undefined, { minimumFractionDigits: 0 });
//   }
//   useEffect(() => {
//     let cilindraje;
//     let animationFrameId;


//     let piTotal = (Math.PI * (calcular.diametro * calcular.diametro)) / 4;
//     cilindraje = Math.round(piTotal) * calcular.carrera * calcular.cilindros

//     const totalCilindraje = agregarPunto(Math.round(cilindraje / 1000));
//     setCilindrajeTotal(totalCilindraje)


//     const animate = () => {
//       setPosition((prevPosition) => {
//         if (prevPosition >= maxPosition && animationSpeed > 0) {
//           setAnimationSpeed(-animationSpeed);
//         } else if (prevPosition <= 0 && animationSpeed < 0) {
//           setAnimationSpeed(-animationSpeed);
//         }
//         return prevPosition + animationSpeed;
//       });

//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animationFrameId = requestAnimationFrame(animate);

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [animationSpeed, maxPosition, calcular]);
//   useEffect(() => {
//     if (data) {
//       setTimeout(() => {
//         router.reload()
//       }, 3000)
//     }
//   }, [data])
//   return (
//     <Layout title={'Calculadora de volumen de un cilindro'} description={description} image={'https://azurequarks.blob.core.windows.net/avatares/calculadora de cilindraje.png'} keywords={'Calculadora de cilindrada,calcular cc de un cilindro, calculador de cilindrada,calcular cilindrada, calculadora cilindrada, calculadora cc,calculadora cilindraje, cilindrada, motor, volumen cilindros, calculadora volumen cilindros,calculadora area cilindro, formula de volumen de un cilindro, formula para calcular el volumen de un cilindro, volumen de un cilindro con diámetro,calcular cilindrada de una moto, '} url={router?.asPath} >
//       <div style={{ marginTop: '32px' }} className={styles.container}>
//         <h1 className={styles.title} style={{ color: '#373737', fontWeight: '600', marginTop: '15%' }}>Calculadora de cilindrada</h1>

//         <p className={styles.response}>Calcular cilindrada de tu moto, carro o motor. Calcular cc de un cilindro. <br />Ingresa tus datos en milimetros con una coma (80,5).</p>
//         <div className={styles.containerCalculadora}>

//           <div className={styles.containerInputs}>
//             <div style={{ display: 'flex', flexDirection: 'column', }}>
//               <label style={{ fontSize: "16px" }}>Cilindrada Total</label>
//               <h3 className={styles.textCilindraje}>{cilindrajeTotal} CC</h3>
//             </div>
//             <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
//               <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                 <label style={{ fontSize: "14px", fontWeight: '600' }}>Diametro cilindro</label>
//                 <div>
//                   <input onKeyPress={(e) => {
//                     const charCode = e.which ? e.which : e.keyCode;
//                     if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
//                       e.preventDefault();
//                     }
//                   }} step="0.01" style={{ width: "50px" }} type="number"
//                     onChange={(e) =>
//                       setCalcular({ ...calcular, diametro: e.target.value })
//                     }
//                     value={calcular.diametro} />
//                   <label style={{ fontSize: "14px", marginLeft: "4px" }}>mm</label>
//                 </div>
//               </div>
//               <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                 <label style={{ fontSize: "14px", fontWeight: '600' }}>Carrera piston</label>
//                 <div>
//                   <input onKeyPress={(e) => {
//                     const charCode = e.which ? e.which : e.keyCode;
//                     if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
//                       e.preventDefault();
//                     }
//                   }} step="0.01" style={{ width: "50px" }} type="number" onChange={(e) => setCalcular({ ...calcular, carrera: e.target.value })} value={calcular.carrera} />
//                   <label style={{ fontSize: "14px", marginLeft: "4px" }}>mm</label>
//                 </div>
//               </div>
//               <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                 <label style={{ fontSize: "14px", fontWeight: '600' }}>Cantidad cilindros</label>
//                 <div>
//                   <input style={{ width: "50px" }} type="number" onChange={(e) => setCalcular({ ...calcular, cilindros: parseInt(e.target.value) })} value={calcular.cilindros} />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <svg width={cylinderWidth} height={cylinderHeight - 2}>
//             <rect
//               x={0}
//               y={cylinderHeight - pistonHeight * cylinderHeight - position}
//               width={cylinderWidth}
//               height={pistonHeight * cylinderHeight}
//               fill="#969595"
//               stroke="black"
//               strokeWidth="4"
//             />
//             <rect
//               x={0}
//               y={0}
//               width={cylinderWidth}
//               height={cylinderHeight}
//               stroke="black"
//               strokeWidth="4"
//               fill="none"
//             />
//           </svg>
//         </div>

//         <div style={{ display: 'flex', marginTop: '40px', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '500px' }}>
//           <label htmlFor="sugerencia">Tienes alguna sugerencia? Es para mejorar ✌🏼</label>
//           <textarea
//             onChange={handleSugerenciaChange}
//             style={{
//               width: '100%',
//               padding: '10px',
//               fontSize: '14px',
//               border: '1px solid #ccc',
//               borderRadius: '4px',
//               resize: 'none',
//               height: '100px'
//             }}
//             id="sugerencia"
//             name="sugerencia"
//             rows="4"
//             cols="50"
//             value={sugerencia}
//             placeholder="Escribe tu sugerencia / cambio / mejora / problema aquí..."
//           ></textarea>
//           <Button onClick={handleSendSugerencia} fullWidth variant={ButtonVariant.secondary} size='sm'>
//             Enviar
//           </Button>
//         </div>


//         <div style={{ marginTop: '96px' }}>
//           <section style={{ marginBottom: '32px' }}>
//             <h2>¿Qué es la Cilindrada de un Vehículo?</h2>
//             <br />
//             <p style={{ lineHeight: '1.8' }}>El <span style={{ fontWeight: '600' }}>calcular la cilindrada</span> es una medida importante que nos dice cuánto espacio hay dentro de los cilindros del motor. Ahora, imagina los cilindros como los corazones del motor.<br /><br /> Estos cilindros son como habitaciones donde ocurre la magia de la combustión, lo que hace que el motor funcione y el vehículo se mueva. Así que, en esencia, el cilindraje nos dice cuánta "potencia" puede generar el motor. Con la calculadora cc, podras calcular la cilindrada de forma sencilla de tu motor, carro o motor.</p>
//             {/* <a style={{ marginTop: '32px' }} href='https://www.quarks.com.co/articulos/Cilindrada-de-un-vehiculo-:-Todo-lo-que-tienes-que-saber-64860ae7bf99b4c49795114b'>
//           Conoce todo sobre la cilindrada Aqui!
//         </a> */}
//           </section>

//           <section style={{ marginBottom: '32px' }}>
//             <h2>Calculo de cilindrada</h2>
//             <br />
//             <p style={{ lineHeight: '1.8' }}>La formula del volumen de un cilindro no es tan difícil como podría parecer. Se trata de matemáticas básicas. <br /><br /> <span style={{ fontWeight: '600' }}>La fórmula para el volumen (V) de un cilindro es V=πr2h</span>, donde π representa la constante pi, aproximadamente 3.14159. Aquí, r denota el radio de la base del cilindro, y ℎ h indica la altura del mismo. Este cálculo meticuloso nos proporciona un valor de volumen expresado en unidades cúbicas, tales como centímetros cúbicos (cm³) o metros cúbicos (m³).
//               <br /><br />En otras palabras, al sumergirnos en la fórmula, desentrañamos la esencia cuantitativa del cilindro, permitiéndonos entender y cuantificar el espacio que ocupa en el mundo tridimensional. Este conocimiento no solo es fundamental en términos teóricos, sino que también tiene aplicaciones prácticas en el diseño y análisis de componentes mecánicos clave.<br /><br /><b>V = πr2h</b></p>
//           </section>

//           <section style={{ marginBottom: '32px' }}>
//             <h2>Problemas a la Hora de calcular cc de un cilindro</h2>
//             <br />
//             <p style={{ lineHeight: '1.8' }}> A veces, el calculo de cilindrada no es tan sencillo. <br /><br />Puede haber problemas que dificulten la precisión de la medición. Uno de los desafíos comunes es la variación en la forma de los cilindros. <br /><br />Si un cilindro no es perfectamente circular, los cálculos se vuelven más complejos. Además, si los cilindros no tienen la misma forma o tamaño, el cálculo se complica aún más.</p>
//           </section>
//         </div>

//       </div >
//       {loading &&
//         <ModalLoading title={'Enviando Sugerencia ... '} />
//       }
//       {data &&
//         <ModalSuccessfull title={'Gracias'} subtitle={'Por compartir tu opinion, la tendremos en cuenta para mejorar!'} />
//       }
//     </Layout >
//   )
// }


import { CREATE_SUGERENCIA } from "@/graphql/mutations";
import AnimationCalculator from "@/src/Components/Articulos/AnimationCalculator";
import Button, { ButtonVariant } from "@/src/Components/Button/Button";
import Layout from "@/src/Components/Layout";
import styles from '@/styles/Articulos.module.css'
import { ModalLoading, ModalSuccessfull } from "@/utils/Modales";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const initialData = {
  diametro: '80.5',
  carrera: '79.5',
  cilindros: 4,
  rpm: 500
};

let description = 'Ingresa los datos y obtén la cilindrada o el volumen de tu cilindro de manera rápida y fácil. La herramienta en línea para calcular la cilindrada de motores de vehículos, calcular cilindrada de una moto, calcular cilindrada de un auto, calcular cc de un cilindro, calculadora cc. '
export default function EngineDisplacementCalculator() {
  const [calcular, setCalcular] = useState(initialData);
  const router = useRouter()
  const ref = useRef()
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const [cilindrajeTotal, setCilindrajeTotal] = useState(0)
  const pistonHeight = 0.2;

  const cylinderWidth = calcular.diametro;
  const cylinderHeight = calcular.carrera;

  const [createSugerencia, { data, loading }] = useMutation(CREATE_SUGERENCIA)
  const [sugerencia, setSugerencia] = useState('')

  const handleSugerenciaChange = (e) => {
    const cleanedValue = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
    setSugerencia(cleanedValue);
  };
  const handleSendSugerencia = (e) => {
    e.preventDefault()
    if (sugerencia.length <= 10) {
      return alert('Cuentanos la sugerencia que tienes!')
    }
    createSugerencia({ variables: { sugerencia: sugerencia.trim(), tipo: 'calculadora-cilindrada' } })
  }

  const onChangeCrankShaft = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && (newValue < 1 || newValue > 300)) {
      e.preventDefault();
    } else {
      setCalcular({ ...calcular, carrera: e.target.value });
    }
  }
  const onChangeBoreSize = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && (newValue < 1 || newValue > 300)) {
      e.preventDefault();
    } else {
      setCalcular({ ...calcular, diametro: e.target.value });
    }
  }
  const onChangeQuantity = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && (newValue < 1 || newValue > 12)) {
      e.preventDefault();
    } else {
      setCalcular({ ...calcular, cilindros: e.target.value });
    }
  }

  const onChangeRpm = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && (newValue < 1 || newValue > 14000)) {
      e.preventDefault();
    } else {
      setCalcular({ ...calcular, rpm: e.target.value });
    }
  }

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        router.reload()
      }, 3000)
    }
  }, [data])
  return (
    <Layout visibleNavbar={false} title={'Calculadora de volumen de un cilindro'} description={description} image={'https://azurequarks.blob.core.windows.net/avatares/calculadora de cilindraje.png'} keywords={'Calculadora de cilindrada,calcular cc de un cilindro, calculador de cilindrada,calcular cilindrada, calculadora cilindrada, calculadora cc,calculadora cilindraje, cilindrada, motor, volumen cilindros, calculadora volumen cilindros,calculadora area cilindro, formula de volumen de un cilindro, formula para calcular el volumen de un cilindro, volumen de un cilindro con diámetro,calcular cilindrada de una moto, '} url={router?.asPath}>
      <div style={{ marginTop: '32px', width: '95%', maxWidth: '1100px', backgroundColor: 'white' }} className={styles.container}>
        <h1 className={styles.title} style={{ color: '#373737', fontWeight: '600', marginTop: '2%' }}>Calculadora de cilindrada</h1>
        <p className={styles.response}>Calcular cilindrada de tu moto, carro o motor. Calcular cc de un cilindro. Ingresa tus datos en milimetros con una coma (80,5).</p>

        <div className={styles.containerCc}>
          <div className={styles.containerInputsCc}>
            <div style={{ display: 'flex', width: '100%', height: '180px', flexDirection: 'column', justifyContent: 'space-between', gap: '8px', backgroundColor: '#373737', borderRadius: '12px', padding: '16px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#ABABAB' }}>Cilindrada Total</h2>
              <p style={{ fontSize: '64px', fontWeight: '700', textAlign: 'center', color: 'white' }}>{cilindrajeTotal}</p>
              <p style={{ fontSize: '14px', color: '#ABABAB', textAlign: 'end' }}>Centimetros cubicos</p>
            </div>
            <div style={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'space-between', gap: '8px', backgroundColor: '#f1f1f1', borderRadius: '12px', padding: '16px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '24px' }}>Medidas</h2>
              <label style={{ fontSize: '14px' }}>Diametro cilindro</label>
              <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row', height: '48px', alignItems: 'center', gap: '8px', backgroundColor: 'white', width: '100%', padding: '8px 12px', borderRadius: '8px' }}>

                <input onKeyPress={(e) => {
                  const charCode = e.which ? e.which : e.keyCode;
                  if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
                    e.preventDefault();
                  }
                }} step="0.01" type="number"
                  onChange={onChangeBoreSize}
                  value={calcular.diametro}
                  min={10}
                  max={300}
                  style={{ border: 'none', width: '100%', fontSize: '16px', fontWeight: '500' }} />
                <div style={{ height: '100%', backgroundColor: '#d9d9d9', width: '1px' }} />
                <span style={{ fontSize: '14px', fontWeight: '500' }}>mm</span>
              </div>

              <label style={{ fontSize: '14px' }}>Carrera piston</label>
              <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row', height: '48px', alignItems: 'center', gap: '8px', backgroundColor: 'white', width: '100%', padding: '8px 12px', borderRadius: '8px' }}>
                <input
                  min={10}
                  max={300}
                  onKeyPress={(e) => {
                    const charCode = e.which ? e.which : e.keyCode;
                    if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
                      e.preventDefault();
                    }
                  }} step="0.01" type="number" onChange={onChangeCrankShaft} value={calcular.carrera}
                  style={{ border: 'none', width: '100%', fontSize: '16px', fontWeight: '500' }} />
                <div style={{ height: '100%', backgroundColor: '#d9d9d9', width: '1px' }} />
                <span style={{ fontSize: '14px', fontWeight: '500' }}>mm</span>
              </div>

              <label style={{ fontSize: '14px' }}>Cantidad cilindros</label>
              <div style={{ display: 'flex', flexDirection: 'row', height: '48px', alignItems: 'center', gap: '8px', backgroundColor: 'white', width: '100%', padding: '8px 12px', borderRadius: '8px' }}>
                <input max={12} onKeyPress={(e) => {
                  const charCode = e.which ? e.which : e.keyCode;
                  if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
                    e.preventDefault();
                  }
                }} type="number" onChange={onChangeQuantity} value={calcular.cilindros}
                  style={{ border: 'none', width: '100%', fontSize: '16px', fontWeight: '500' }} />
              </div>
            </div>
          </div>

          <div className={styles.containerAnimation}>
            <div style={{ display: 'flex', width: '100%', flexDirection: 'column', gap: '8px', backgroundColor: '#f1f1f1', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <h2 style={{ fontSize: '14px', fontWeight: '600', }}>Animación / Ilustración</h2>
                {/* <div style={{margin:'0 auto',marginTop:'32px', backgroundColor:'#373737', height:'1px', width:`${cylinderWidth+ 'px'}`}}/> */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Button style={{ alignSelf: 'flex-end', margin: 0 }} onClick={handlePlayPause} variant={ButtonVariant.primary} size='base'>
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <div ref={ref}  style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <label style={{ fontSize: '14px' }}>RPM</label>

                    <input max={14000} onKeyPress={(e) => {
                      const charCode = e.which ? e.which : e.keyCode;
                      if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
                        e.preventDefault();
                      }
                    }} type="number" onChange={onChangeRpm} value={calcular.rpm}
                      style={{ padding: '4px 8px', textAlign: 'end', border: 'none', width: '80px', fontSize: '16px', fontWeight: '500' }} />
                  </div>
                </div>
              </div>
              <AnimationCalculator  calcular={calcular} cylinderHeight={cylinderHeight} cylinderWidth={cylinderWidth} pistonHeight={pistonHeight} setCilindrajeTotal={setCilindrajeTotal} cilindrajeTotal={cilindrajeTotal} isPlaying={isPlaying} />
              <div  style={{ margin: '32px 0 48px 0', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                {Array.from({ length: calcular.cilindros }, (_, index) => (
                  <AnimationCalculator
                    key={index}
                    calcular={calcular}
                    cylinderHeight={cylinderHeight}
                    cylinderWidth={cylinderWidth}
                    pistonHeight={pistonHeight}
                    setCilindrajeTotal={setCilindrajeTotal}
                    middle={true}
                    isPlaying={isPlaying}
                  />
                ))}
              </div>
              <article style={{ display: 'flex', marginTop: '40px', flexDirection: 'column', gap: '16px', width: '100%', }}>
                <label htmlFor="sugerencia">Tienes alguna sugerencia? Es para mejorar ✌🏼</label>
                <textarea
                  onChange={handleSugerenciaChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '14px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    resize: 'none',
                    height: '100px'
                  }}
                  id="sugerencia"
                  name="sugerencia"
                  rows="4"
                  cols="50"
                  value={sugerencia}
                  placeholder="Escribe tu sugerencia / cambio / mejora / problema aquí..."
                ></textarea>
                <Button onClick={handleSendSugerencia} variant={ButtonVariant.secondary} size='sm'>
                  Enviar
                </Button>
              </article>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '96px' }}>
          <section style={{ marginBottom: '32px' }}>
            <h2>¿Qué es la Cilindrada de un Vehículo?</h2>
            <br />
            <p style={{ lineHeight: '1.8' }}>El <span style={{ fontWeight: '600' }}>calcular la cilindrada</span> es una medida importante que nos dice cuánto espacio hay dentro de los cilindros del motor. Ahora, imagina los cilindros como los corazones del motor.<br /><br /> Estos cilindros son como habitaciones donde ocurre la magia de la combustión, lo que hace que el motor funcione y el vehículo se mueva. Así que, en esencia, el cilindraje nos dice cuánta "potencia" puede generar el motor. Con la calculadora cc, podras calcular la cilindrada de forma sencilla de tu motor, carro o motor.</p>
            {/* <a style={{ marginTop: '32px' }} href='https://www.quarks.com.co/articulos/Cilindrada-de-un-vehiculo-:-Todo-lo-que-tienes-que-saber-64860ae7bf99b4c49795114b'>
           Conoce todo sobre la cilindrada Aqui!
         </a> */}
          </section>
          <section style={{ marginBottom: '32px' }}>
            <h2>Calculo de cilindrada</h2>
            <br />
            <p style={{ lineHeight: '1.8' }}>La formula del volumen de un cilindro no es tan difícil como podría parecer. Se trata de matemáticas básicas. <br /><br /> <span style={{ fontWeight: '600' }}>La fórmula para el volumen (V) de un cilindro es V=πr2h</span>, donde π representa la constante pi, aproximadamente 3.14159. Aquí, r denota el radio de la base del cilindro, y ℎ h indica la altura del mismo. Este cálculo meticuloso nos proporciona un valor de volumen expresado en unidades cúbicas, tales como centímetros cúbicos (cm³) o metros cúbicos (m³)./               <br /><br />En otras palabras, al sumergirnos en la fórmula, desentrañamos la esencia cuantitativa del cilindro, permitiéndonos entender y cuantificar el espacio que ocupa en el mundo tridimensional. Este conocimiento no solo es fundamental en términos teóricos, sino que también tiene aplicaciones prácticas en el diseño y análisis de componentes mecánicos clave.<br /><br /><b>V = πr2h</b></p>
          </section>
          <section style={{ marginBottom: '32px' }}>
            <h2>Problemas a la Hora de calcular cc de un cilindro</h2>
            <br />
            <p style={{ lineHeight: '1.8' }}> A veces, el calculo de cilindrada no es tan sencillo. <br /><br />Puede haber problemas que dificulten la precisión de la medición. Uno de los desafíos comunes es la variación en la forma de los cilindros. <br /><br />Si un cilindro no es perfectamente circular, los cálculos se vuelven más complejos. Además, si los cilindros no tienen la misma forma o tamaño, el cálculo se complica aún más.</p>
          </section>
        </div>
      </div>
      {loading &&
        <ModalLoading title={'Enviando Sugerencia ... '} />
      }
      {data &&
        <ModalSuccessfull title={'Gracias'} subtitle={'Por compartir tu opinion, la tendremos en cuenta para mejorar!'} />
      }
    </Layout >
  )
}