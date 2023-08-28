import styles2 from '@/styles/Landing.module.css'
import Link from 'next/link'
import styles from '@/styles/Faq.module.css'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { CREATE_CONSUMO } from '@/graphql/mutations';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';



export default function SectionCalculadoraCombustible() {
  const [kilometros, setKilometros] = useState(200);
  const [galones, setGalones] = useState(12);
  const [consumo, setConsumo] = useState()
  const [galon, setGalon] = useState()
  const [registros, setRegistros] = useState([]);
  const [check, setCheck] = useState(false)
  const [createConsumo, result] = useMutation(CREATE_CONSUMO)
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
  return (
    <section className={styles2.containerListTalleres}>
      <h2 style={{ marginBottom: '32px' }} className={styles2.title2}>Calcula el consumo de tu vehiculo</h2>
      <div style={{ width: '100%' }} className={styles.containerContent}>
        <div className={styles.containerInputs2}>
          <div className={styles.containerInput}>
            <h5 className={styles.h4}>Distancia Recorrida</h5>
            <h4 className={styles.h3}>{kilometros} Kms</h4>
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
            <h5 className={styles.h4}>Galones Consumidos</h5>
            <h4 className={styles.h3}>{galones} Gl</h4>
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
            <h3 className={styles.bigTitle}> {consumo?.toFixed(2)}<b style={{ fontSize: '18px', fontWeight: '400' }}>/ gl</b></h3>
          </div>
          <div>
            <p style={{ fontSize: '14px', color: 'white' }}>Rendimiento por galon </p>
            <h3 className={styles.bigTitle}> {galon?.toFixed(2)}<b style={{ fontSize: '18px', fontWeight: '400' }}>/ kms</b></h3>
          </div>
          <Link href={'/calculadora-de-combustible'} style={{ color: '#373737', outline: 'none' }}>
            <button className={styles.button}>
              Calcular consumo
            </button>
          </Link>

        </div>

      </div>

    </section>
  )
}