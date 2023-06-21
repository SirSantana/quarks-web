import styles from '@/styles/HomeArticulos.module.css'
import Link from 'next/link'



export default function ArticulosSecundarios() {
  return (
    <article className={styles.articuloGrid}>
      <section className={styles.gridContainer2}>
        <Link href={'/calculadora-de-cilindraje-de-un-vehiculo'} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', cursor: 'pointer', gap: '8px', marginBottom: '16px', textDecoration: 'none' }}>
          <img src='https://azurequarks.blob.core.windows.net/repuestos/cilindrada15062023.jpg' style={{ height: '150px', width: '100%', objectFit: 'cover' }} />
          <div>
            <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}><b style={{ color: '#5B0221', fontWeight: '700' }}>Motor</b> 10 de Junio 2023</p>
            <h4 className={styles.question} style={{ margin: 0, lineHeight: '20px', fontSize: '14px' }}>Calcula tu cilindrada Gratis</h4>
          </div>
        </Link>
        <div style={{ width: '100%', backgroundColor: '#bababa', height: '1px' }} />

        <Link href={'/articulos/El-gas-que-no-se-puede-ver-ni-oler,-pero-que-puede-causar-la-muerte-6489f451d31505dfe78f61b7'} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', cursor: 'pointer', gap: '16px', textDecoration: 'none' }}>
          <img src='https://azurequarks.blob.core.windows.net/repuestos/monoxidodecarbono14062023.jpg' style={{ height: '100px', width: '120px', objectFit: 'contain' }} />
          <div>
            <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}><b style={{ color: '#5B0221', fontWeight: '700' }}>Motor</b> 10 de Junio 2023</p>
            <h4 className={styles.question} style={{ margin: 0, lineHeight: '18px', fontSize: '14px' }}>El gas inoloro e incoloro que puede causar la muerte</h4>
          </div>
        </Link>
        <div style={{ width: '100%', backgroundColor: '#bababa', height: '1px' }} />

        <Link href={'/glosario-de-autopartes/Árbol-de-levas-648df299821d58598a34a5c1'} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', cursor: 'pointer', gap: '16px', textDecoration: 'none' }}>
          <img src='https://azurequarks.blob.core.windows.net/repuestos/arboldelevasrepuestos17062023.png' style={{ height: '100px', width: '120px', objectFit: 'contain' }} />
          <div>
            <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}><b style={{ color: '#5B0221', fontWeight: '700' }}>Motor</b> 10 de Junio 2023</p>
            <h4 className={styles.question} style={{ margin: 0, lineHeight: '20px', fontSize: '14px' }}>Si tienes un auto debes conocer esta pieza</h4>
          </div>
        </Link>
      </section>
    </article>
  )
}