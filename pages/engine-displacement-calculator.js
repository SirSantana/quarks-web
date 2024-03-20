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
  rpm:500
};
let description = 'Enter the data and get the displacement or volume of your cylinder quickly and easily. The online tool to calculate the displacement of vehicle engines, calculate displacement of a motorcycle, calculate displacement of a car, calculate cc of a cylinder, cc calculator. '
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
    if (!isNaN(newValue) && (newValue < 2 || newValue > 300)) {
      e.preventDefault();
    } else {
      setCalcular({ ...calcular, carrera: e.target.value });
    }
  }
  const onChangeBoreSize = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && (newValue < 2 || newValue > 300)) {
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
    <Layout title={'Engine Displacement Calculator'} description={description} image={'https://azurequarks.blob.core.windows.net/avatares/calculadora de cilindraje.png'} keywords={'Cylinder displacement calculator,cylinder displacement calculator,cylinder displacement calculator,cylinder displacement calculator,cylinder displacement calculator,cylinder displacement calculator,cylinder displacement calculator,cylinder volume calculator,cylinder volume calculator,cylinder area calculator,cylinder volume formula,formula to calculate the volume of a cylinder,cylinder volume with diameter,calculate cylinder displacement of a motorcycle'} url={router?.asPath} visibleNavbar={false}>
      <div style={{ marginTop: '32px', width: '95%', maxWidth: '1100px', backgroundColor: 'white' }} className={styles.container}>
        <h1 className={styles.title} style={{ color: '#373737', fontWeight: '600', marginTop: '2%' }}>Displacement Engine Calculator</h1>
        <p className={styles.response}>Calculate the displacement of your motorcycle, car or engine. Enter your data in millimeters with a comma (80.5).</p>
        
        <div className={styles.containerCc}>
          <div className={styles.containerInputsCc}>
            <div style={{ display: 'flex', width: '100%', height: '180px', flexDirection: 'column', justifyContent: 'space-between', gap: '8px', backgroundColor: '#373737', borderRadius: '12px', padding: '16px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#ABABAB' }}>Engine Displacement</h2>
              <p style={{ fontSize: '64px', fontWeight: '700', textAlign: 'center', color: 'white' }}>{cilindrajeTotal}</p>
              <p style={{ fontSize: '14px', color: '#ABABAB', textAlign: 'end' }}>Cubic Inches</p>
            </div>
            <div style={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'space-between', gap: '8px', backgroundColor: '#f1f1f1', borderRadius: '12px', padding: '16px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '24px' }}>Measures</h2>
              <label style={{ fontSize: '14px' }}>Bore Size</label>
              <div  style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row', height: '48px', alignItems: 'center', gap: '8px', backgroundColor: 'white', width: '100%', padding: '8px 12px', borderRadius: '8px' }}>

                <input onKeyPress={(e) => {
                  const charCode = e.which ? e.which : e.keyCode;
                  if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
                    e.preventDefault();
                  }
                }} step="0.01" type="number"
                  onChange={onChangeBoreSize}
                  value={calcular.diametro}
                  style={{ border: 'none', width: '100%', fontSize: '16px', fontWeight: '500' }} />
                <div style={{ height: '100%', backgroundColor: '#d9d9d9', width: '1px' }} />
                <span style={{ fontSize: '14px', fontWeight: '500' }}>mm</span>
              </div>

              <label style={{ fontSize: '14px' }}>Crankshaft stroke length</label>
              <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row', height: '48px', alignItems: 'center', gap: '8px', backgroundColor: 'white', width: '100%', padding: '8px 12px', borderRadius: '8px' }}>
                <input
                  min={20}
                  max={200}
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

              <label style={{ fontSize: '14px' }}>Quantity Cylinders</label>
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
                <h2 style={{ fontSize: '14px', fontWeight: '600', }}>Animation / Ilustration</h2>
                {/* <div style={{margin:'0 auto',marginTop:'32px', backgroundColor:'#373737', height:'1px', width:`${cylinderWidth+ 'px'}`}}/> */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Button style={{ alignSelf: 'flex-end', margin: 0 }} onClick={handlePlayPause} variant={ButtonVariant.primary} size='base'>
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <div ref={ref} style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                    <label style={{ fontSize: '14px' }}>RPM</label>

                    <input max={14000} onKeyPress={(e) => {
                      const charCode = e.which ? e.which : e.keyCode;
                      if (charCode !== 44 && (charCode < 48 || charCode > 57)) {
                        e.preventDefault();
                      }
                    }} type="number" onChange={onChangeRpm} value={calcular.rpm}
                      style={{ padding:'4px 8px', textAlign:'end', border: 'none', width: '80px', fontSize: '16px', fontWeight: '500' }} />
                  </div>
                </div>
              </div>
              <AnimationCalculator calcular={calcular} cylinderHeight={cylinderHeight} cylinderWidth={cylinderWidth} pistonHeight={pistonHeight} setCilindrajeTotal={setCilindrajeTotal} cilindrajeTotal={cilindrajeTotal} isPlaying={isPlaying} />
              <div style={{ margin: '32px 0 48px 0', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
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
                <Button onClick={handleSendSugerencia} variant={ButtonVariant.secondary} size='sm'>
                  Send
                </Button>
              </article>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '96px' }}>
          <section style={{ marginBottom: '32px' }}>
            <h2>What is Vehicle Displacement?</h2>
            <br />
            <p style={{ lineHeight: '1.8' }}>The <span style={{ fontWeight: '600' }}>calculate the displacement</span>is an important measurement that tells us how much space there is inside the engine cylinders. Now, imagine the cylinders as the cores of the engine.<br /><br /> These cylinders are like rooms where the magic of combustion happens, which makes the engine run and the vehicle move. So, in essence, the displacement tells us how much "power" the engine can generate. With the cc calculator, you can easily calculate the displacement of your engine, car or motor.</p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2>Engine displacement formula</h2>
            <br />
            <p style={{ lineHeight: '1.8' }}>The formula for the volume of a cylinder is not as difficult as it might seem. It is basic mathematics.<br /><br /> <span style={{ fontWeight: '600' }}>The formula for piston displacement (V) of a cylinder is V=πr2h</span>, where π represents the constant pi, approximately 3.14159. Here, r denotes the radius of the base of the cylinder, and ℎ h denotes the height of the cylinder. This painstaking calculation provides us with a volume value expressed in cubic units, such as cubic centimeters (cm³) or cubic meters (m³).
            </p>
          </section>
        </div>
      </div>
      {loading &&
        <ModalLoading title={'Sending Suggestion ... '} />
      }
      {data &&
        <ModalSuccessfull title={'Thanks!'} subtitle={'For sharing your opinion, we will take it into account to improve!'} />
      }
    </Layout >
  )
}