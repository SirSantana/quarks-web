import styles2 from '@/styles/Landing.module.css'
import Link from 'next/link'
import styles from '@/styles/Faq.module.css'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { CREATE_CONSUMO } from '@/graphql/mutations';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import  { useRouter } from 'next/router';



export default function SectionCalculadoraCombustible() {
  const [kilometros, setKilometros] = useState(200);
  const [galones, setGalones] = useState(12);
  const [consumo, setConsumo] = useState()
  const [galon, setGalon] = useState()
  const router = useRouter()

  useEffect(() => {
    setConsumo((galones / kilometros) * 100)
    setGalon(kilometros / galones)
  }, [galones, kilometros])
  return (
    <section className={styles2.containerListTalleres}>
      <h2 style={{ marginBottom: '32px' }} className={styles2.title2}>Calcula el consumo de tu vehiculo</h2>
      <div style={{ width: '100%' }} className={styles.containerContent}>
        <div className={styles.containerInputs2}>
          <div className={styles.containerInput}>
            <p className={styles.h4}>Distancia Recorrida</p>
            <p className={styles.h3}>{kilometros} Kms</p>
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
            <p className={styles.h4}>Galones Consumidos</p>
            <p className={styles.h3}>{galones} Gl</p>
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
            <p className={styles.bigTitle}> {consumo?.toFixed(2)}<b style={{ fontSize: '18px', fontWeight: '400' }}>/ gl</b></p>
          </div>
          <div>
            <p style={{ fontSize: '14px', color: 'white' }}>Rendimiento por galon </p>
            <p className={styles.bigTitle}> {galon?.toFixed(2)}<b style={{ fontSize: '18px', fontWeight: '400' }}>/ kms</b></p>
          </div>
          <Link href={'/calculadora-de-combustible'} style={{ color: '#373737', outline: 'none' }}>
            <button className={styles.button}>
              Calcular consumo
            </button>
          </Link>
        </div>

      </div>
      <Link href={'/calculadora-de-cilindraje-de-un-vehiculo'} style={{ marginTop: '36px', color: '#373737', textDecoration: 'none', outline: 'none' }}>
        <button style={{ cursor: 'pointer' }} className={styles2.button}>
          Calcular cilindrada
        </button>
      </Link>
      <div onClick={()=> router.push('/pico-y-placa-hoy-bogota')} style={{cursor:'pointer', textDecoration: 'none', color: '#373737', width: '400px', borderRadius: '10px', padding: '8px', margin: '32px 0', backgroundColor: '#FFC003', height: '100px' }} >
        <div style={{ border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
          <h4 style={{ fontSize: '32px', fontFamily: 'fantasy', letterSpacing: '6px', fontWeight: '100' }}>PICO Y PLACA</h4>
        </div>
      </div>
    </section>
  )
}