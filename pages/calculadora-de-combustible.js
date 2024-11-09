
import { CREATE_CONSUMO, CREATE_SUGERENCIA } from '@/graphql/mutations';
import Button, { ButtonVariant } from '@/src/Components/Button/Button';
import Layout from '@/src/Components/Layout'
import styles from '@/styles/Faq.module.css'
import { ModalLoading, ModalSuccessfull } from '@/utils/Modales';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

let description = 'Calcula el consumo de combustible de tu vehiculo, rapido y sencillo aqui. Obten cuanto consume tu vehiculo, coloca la distancia recorrida y los galones consumidos'

export default function CalculadoraDeCombustible() {
  const router = useRouter()
  const [kilometros, setKilometros] = useState(200);
  const [galones, setGalones] = useState(12);
  const [consumo, setConsumo] = useState()
  const [galon, setGalon] = useState()
  const [registros, setRegistros] = useState([]);
  const [check, setCheck] = useState(false)
  const [createConsumo, result] = useMutation(CREATE_CONSUMO)
  // const { data, error, loading } = useQuery(GET_CONSUMOS)
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
    createSugerencia({ variables: { sugerencia: sugerencia.trim(), tipo: 'calculadora-combustible' } })
  }
  useEffect(() => {
    // Cargar registros desde el localStorage al montar el componente
    const savedRegistros = JSON.parse(localStorage.getItem('registros'));

    if (savedRegistros) {
      setRegistros(savedRegistros);
    }
  }, []);
  const handleGuardar = () => {
    if (check) {
      return alert('Ya guardaste este consumo')
    } else {
      const nuevoRegistro = {
        fecha: new Date().toLocaleString(),
        consumo: consumo.toFixed(2),
        galon: galon.toFixed(2),
      };
      setCheck(true)
      const nuevosRegistros = [...registros, nuevoRegistro];
      setRegistros(nuevosRegistros);
      localStorage.setItem('registros', JSON.stringify(nuevosRegistros));
      createConsumo({ variables: { fecha: nuevoRegistro.fecha, galon: String(nuevoRegistro.galon), consumo: String(nuevoRegistro.consumo) } })
      alert('Guardado correctamente')
    }
  };

  useEffect(() => {
    setConsumo((galones / kilometros) * 100)
    setGalon(kilometros / galones)
    setCheck(false)
  }, [galones, kilometros])
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        router.reload()
      }, 3000)
    }
  }, [data])
  return (
    <Layout title={'La mejor Calculadora de consumo de combustible'} description={description} image={'https://azurequarks.blob.core.windows.net/avatares/calculadoradecombustible.png'} keywords={'Calculadora de combustible, calculador de consumo de combustible, calculadora de rendimiento de combustible, calculadora combustible, calculador combustible,  '} url={router?.asPath}>
      <div className={styles.container}>
        <h1 className={styles.title} style={{ color: '#373737', fontWeight: '600' }}>Calculadora de Combustible</h1>
        <p className={styles.subtitle}>Ingresa la informacion y conoce el rendimiento del combustible </p>

        <div className={styles.containerContent}>
          <div className={styles.containerInputs2}>
            <div className={styles.containerInput}>
              <h4 className={styles.h4}>Distancia Recorrida</h4>
              <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:'100%'}}>
                <input className={styles.h3} step="0.1" style={{border:'none', width:'100px' }} type="number" onChange={(e) => setKilometros(e.target.value)} value={kilometros} />
                <label className={styles.h3}>Kms</label>
              </div>
              {/* <h3 className={styles.h3}>{kilometros} Kms</h3> */}

              <Slider
                min={0}
                max={600}
                defaultValue={kilometros}
                onChange={(value) => setKilometros(value)}

                trackStyle={[{ backgroundColor: '#f50057', height: '8px' }]}
                handleStyle={[
                  { backgroundColor: '#f50057', height: '18px', width: '18px' },
                ]}
              />
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className={styles.pSubtitle}>0 kms</p>
                <p className={styles.pSubtitle}>600 kms</p>
              </div>
            </div>
            <div className={styles.containerInput}>
              <h4 className={styles.h4}>Galones Consumidos</h4>
              <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:'100%'}}>
                <input className={styles.h3} step="0.1" style={{border:'none', width:'80px' }} type="number" onChange={(e) => setGalones(e.target.value)} value={galones} />
                <label className={styles.h3}>Gl</label>
              </div>
              <Slider
                min={0}
                max={20}
                step={0.1}
                defaultValue={galones}
                onChange={(value) => setGalones(value)}
                trackStyle={[{ backgroundColor: '#f50057', height: '8px' }, styles.sliderTrack]}
                handleStyle={[
                  { backgroundColor: '#f50057', height: '18px', width: '18px' },
                  styles.sliderHandle,
                ]}
                activeHandleStyle={[styles.sliderHandleFocus]}
              />
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <p className={styles.pSubtitle}>0 Gl</p>
                <p className={styles.pSubtitle}>20 Gl</p>
              </div>
            </div>
          </div>

          <div className={styles.containerCardRendimiento}>
            <div>
              <p style={{ fontSize: '14px', color: 'white' }}>Consumo cada 100 kms </p>
              <h2 className={styles.bigTitle}> {consumo?.toFixed(2)}<b style={{ fontSize: '18px', fontWeight: '400' }}>/ gl</b></h2>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: 'white' }}>Rendimiento por galon </p>
              <h2 className={styles.bigTitle}> {galon?.toFixed(2)}<b style={{ fontSize: '18px', fontWeight: '400' }}>/ kms</b></h2>
            </div>
            {/* <button onClick={handleGuardar} className={styles.button}>
              {check ? 'Guardado' : 'Guardar'}
              <ion-icon style={{ fontSize: '20px' }} name={check ? 'bookmark' : 'bookmark-outline'}></ion-icon>
            </button> */}
          </div>


        </div>
        <div style={{ display: 'flex', marginTop: '40px', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '500px' }}>
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
          <Button onClick={handleSendSugerencia} fullWidth variant={ButtonVariant.secondary} size='sm'>
            Enviar
          </Button>
        </div>


        <Tabs className={styles.tabs}>
          <TabList style={{ marginBottom: '32px' }}>
            {/* <Tab>Comunidad</Tab> */}
            <Tab>Mi actividad</Tab>
          </TabList>

          {/* <TabPanel>
            <div className={styles.gridContainer}>
              {data?.getConsumos.map(el => (
                <div className={styles.miniContainerCardRendimiento}>
                  <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '16px' }}>
                    <div>
                      <p style={{ fontSize: '14px', color: 'white' }}>100 kms </p>
                      <p style={{ fontSize: '28px', fontWeight: '600' }}>{el?.consumo}<b style={{ fontSize: '14px', fontWeight: '400' }}>/gl</b></p>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', color: 'white' }}>1 galon</p>
                      <p style={{ fontSize: '28px', fontWeight: '600' }}>{el?.galon}<b style={{ fontSize: '14px', fontWeight: '400' }}>/kms</b></p>
                    </div>
                  </div>
                  <p style={{ textAlign: 'end', fontSize: '12px' }}>{el?.fecha}</p>
                </div>
              ))}
            </div>

          </TabPanel> */}
          <TabPanel>
            <div className={styles.gridContainer}>
              {registros.map(el => (
                <div className={styles.miniContainerCardRendimiento}>
                  <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '16px' }}>
                    <div>
                      <p style={{ fontSize: '14px', color: 'white' }}>100 kms </p>
                      <p style={{ fontSize: '28px', fontWeight: '600' }}>{el?.consumo}<b style={{ fontSize: '14px', fontWeight: '400' }}>/gl</b></p>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', color: 'white' }}>1 galon</p>
                      <p style={{ fontSize: '28px', fontWeight: '600' }}>{el?.galon}<b style={{ fontSize: '14px', fontWeight: '400' }}>/kms</b></p>
                    </div>
                  </div>
                  <p style={{ textAlign: 'end', fontSize: '12px' }}>{el?.fecha}</p>
                </div>

              ))}
            </div>
          </TabPanel>
        </Tabs>

        <div>
          <h2 >Optimiza Tu Consumo de Combustible: Consejos para Ahorrar en cada Kilómetro</h2>
          <br />
          <p style={{ lineHeight: "1.8;" }}>¿Quieres reducir tus gastos en combustible y contribuir a un medio ambiente más limpio? ¡Estás en el lugar correcto! <br /><br />En esta guía, exploraremos todo lo relacionado con el consumo de combustible y te proporcionaremos consejos prácticos para maximizar la eficiencia de cada gota de combustible que quemes en tu motor.</p>
          <br /><br />
          <h2 >El Papel del Consumo de Combustible</h2>
          <br />
          <p style={{ lineHeight: "1.8;" }}>El consumo de combustible es uno de los aspectos más importantes a considerar al usar un vehículo.<br /><br /> Además de influir en tus gastos, también tiene un impacto directo en las emisiones de gases de efecto invernadero y la contaminación del aire. <br /><br />Cuanto más eficiente sea tu consumo de combustible, menos recursos gastarás y menos daño causarás al medio ambiente.</p>
          <br /><br />
          <h2 >Factores que Influyen en el Consumo de Combustible</h2>
          <br />
          <p style={{ lineHeight: "1.8;" }}>El consumo de combustible de tu vehículo no es estático; está influenciado por varios factores. Algunos de los más relevantes son:</p><br />
          <ul style={{ lineHeight: "1.8;" }}>
            <li>Tipo de Conducción: La forma en que manejas tiene un gran impacto en el consumo de combustible. Arranques bruscos, frenados fuertes y altas velocidades pueden aumentar drásticamente el consumo.</li><br />
            <li>Mantenimiento del Vehículo: Un vehículo bien mantenido, con neumáticos inflados correctamente, filtros limpios y un motor afinado, tiende a ser más eficiente en el uso de combustible.</li><br />
            <li>Peso y Carga: Cuanto más pesado sea el vehículo o mayor sea la carga que transporta, más esfuerzo requerirá el motor para moverlo y, por lo tanto, más combustible consumirá.</li><br />
            <li>Condiciones del Camino: Conducir en terrenos montañosos, carreteras con muchas curvas o en condiciones climáticas adversas puede afectar el consumo de combustible.</li>
          </ul>
          <br /><br />
          <h2 >Consejos para Ahorrar Combustible</h2>
          <br />
          <p style={{ lineHeight: "1.8;" }}>Ahora, la pregunta importante: ¿cómo puedes mejorar la eficiencia de tu consumo de combustible? Aquí hay algunos consejos prácticos:</p>
          <ol style={{ lineHeight: "1.8;" }}><br />
            <li>Mantén una Conducción Suave: Evita aceleraciones bruscas y frenados repentinos. Mantén una velocidad constante y anticipa las paradas para reducir la necesidad de frenar.</li><br />
            <li>Mantén tu Vehículo Afinado: Realiza un mantenimiento regular, como cambios de aceite, limpieza de filtros y ajustes de motor. Un vehículo en buen estado funciona de manera más eficiente.</li><br />
            <li>Evita el Exceso de Peso: No cargues tu vehículo innecesariamente. Cuanto más peso llevas, más combustible necesitarás para moverte.</li><br />
            <li>Infla los Neumáticos Correctamente: Neumáticos inflados correctamente reducen la resistencia al rodaje y mejoran la eficiencia del combustible.</li><br />
            <li>Planifica tus Viajes: Combina recados y planifica tus rutas para evitar conducir en momentos de tráfico intenso.</li><br />
            <li>Utiliza el Aire Acondicionado con Moderación: El uso excesivo del aire acondicionado puede aumentar el consumo de combustible. Úsalo solo cuando sea necesario.</li><br />
            <li>Usa la Velocidad Crucero: En carreteras abiertas, utilizar el control de velocidad crucero puede mantener una velocidad constante y ahorrar combustible.</li>
          </ol>
          <br /><br />
          <h2 >Calcula el rendimiento de tu auto</h2><br />
          <p style={{ lineHeight: "1.8;" }}>No olvides aprovechar nuestra calculadora de consumo de combustible en esta página. <br /><br />Ingresa la información sobre tu vehículo y tus hábitos de conducción para obtener una estimación personalizada de cuánto combustible estás utilizando. <br /><br />¡Es una herramienta práctica para monitorear y ajustar tu consumo!</p>
          <br /><br />
        </div>
      </div>
      {loading &&
        <ModalLoading title={'Enviando Sugerencia ... '} />
      }
      {data &&
        <ModalSuccessfull title={'Gracias'} subtitle={'Por compartir tu opinion, la tendremos en cuenta para mejorar!'} />
      }

    </Layout>

  )
}