import { CREATE_SUGERENCIA } from "@/graphql/mutations";
import Button, { ButtonVariant } from "@/src/Components/Button/Button";
import Layout from "@/src/Components/Layout";
import styles from '@/styles/Articulos.module.css'
import { ModalLoading, ModalSuccessfull } from "@/utils/Modales";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const initialData = {
  diametro: '80.5',
  carrera: '79.5',
  cilindros: 4
};
let description = 'Enter the data and get the displacement or volume of your cylinder quickly and easily. The online tool to calculate the displacement of vehicle engines, calculate displacement of a motorcycle, calculate displacement of a car, calculate cc of a cylinder, cc calculator. '
export default function EngineDisplacementCalculator() {
  const [calcular, setCalcular] = useState(initialData);
  const router = useRouter()

  const [position, setPosition] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(5);
  const [cilindrajeTotal, setCilindrajeTotal] = useState(0)
  const pistonHeight = 0.2;

  const cylinderWidth = calcular.diametro;
  const cylinderHeight = calcular.carrera;
  const maxPosition = cylinderHeight - pistonHeight;

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
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        router.reload()
      }, 3000)
    }
  }, [data])
  return (
    <Layout title={'Engine Displacement Calculator'} description={description} image={'https://azurequarks.blob.core.windows.net/avatares/calculadora de cilindraje.png'} keywords={'Calculadora de cilindrada,calcular cc de un cilindro, calculador de cilindrada,calcular cilindrada, calculadora cilindrada, calculadora cc,calculadora cilindraje, cilindrada, motor, volumen cilindros, calculadora volumen cilindros,calculadora area cilindro, formula de volumen de un cilindro, formula para calcular el volumen de un cilindro, volumen de un cilindro con diámetro,calcular cilindrada de una moto, '} url={router?.asPath} visibleNavbar={false}>
      <div style={{ marginTop: '32px' }} className={styles.container}>
        <h1 className={styles.title} style={{ color: '#373737', fontWeight: '600', marginTop: '5%' }}>Displacement Engine Calculator</h1>

        <p className={styles.response}>Calculate the displacement of your motorcycle, car or engine.  <br />Enter your data in millimeters with a comma (80.5).</p>
        <div className={styles.containerCalculadora}>

          <div className={styles.containerInputs}>
            <div style={{ display: 'flex', flexDirection: 'column', }}>
              <label style={{ fontSize: "16px" }}>Engine displacement(cubic inches)</label>
              <h3 className={styles.textCilindraje}>{cilindrajeTotal}</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "14px", fontWeight: '600' }}>Bore size</label>
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
                <label style={{ fontSize: "14px", fontWeight: '600' }}>Crankshaft stroke length </label>
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
                <label style={{ fontSize: "14px", fontWeight: '600' }}>Quantity Cylinders</label>
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

        <article style={{ display: 'flex', marginTop: '40px', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '500px' }}>
          <label htmlFor="sugerencia">Do you have any suggestions? It is to improve ✌🏼</label>
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
            placeholder="Write your suggestion / change / improvement / problem here...."
          ></textarea>
          <Button onClick={handleSendSugerencia} fullWidth variant={ButtonVariant.secondary} size='sm'>
            Send
          </Button>
        </article>


        <div style={{ marginTop: '96px' }}>
          <section style={{ marginBottom: '32px' }}>
            <h2>What is Vehicle Displacement?</h2>
            <br />
            <p style={{ lineHeight: '1.8' }}>The <span style={{ fontWeight: '600' }}>calculate the displacement</span>is an important measurement that tells us how much space there is inside the engine cylinders. Now, imagine the cylinders as the cores of the engine.<br /><br /> These cylinders are like rooms where the magic of combustion happens, which makes the engine run and the vehicle move. So, in essence, the displacement tells us how much "power" the engine can generate. With the cc calculator, you can easily calculate the displacement of your engine, car or motor.</p>
            {/* <a style={{ marginTop: '32px' }} href='https://www.quarks.com.co/articulos/Cilindrada-de-un-vehiculo-:-Todo-lo-que-tienes-que-saber-64860ae7bf99b4c49795114b'>
          Conoce todo sobre la cilindrada Aqui!
        </a> */}
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2>Engine displacement formula</h2>
            <br />
            <p style={{ lineHeight: '1.8' }}>The formula for the volume of a cylinder is not as difficult as it might seem. It is basic mathematics.<br /><br /> <span style={{ fontWeight: '600' }}>The formula for piston displacement (V) of a cylinder is V=πr2h</span>, where π represents the constant pi, approximately 3.14159. Here, r denotes the radius of the base of the cylinder, and ℎ h denotes the height of the cylinder. This painstaking calculation provides us with a volume value expressed in cubic units, such as cubic centimeters (cm³) or cubic meters (m³).
          </p>
          </section>
        </div>

      </div >
      {loading &&
        <ModalLoading title={'Enviando Sugerencia ... '} />
      }
      {data &&
        <ModalSuccessfull title={'Gracias'} subtitle={'Por compartir tu opinion, la tendremos en cuenta para mejorar!'} />
      }
    </Layout >
  )
}