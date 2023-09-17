import styles from '@/styles/ServiciosAutomotriz.module.css'
import CardNewTaller from '../LandingPage/CardNewTaller'

export default function AlmacenesSugeridos({ talleresSimilares }) {

  return (
    <>
      <h2 className={styles.titleLugar}>Otros talleres sugeridos</h2>
      <div style={{display:'flex', flexDirection:'column', gap:'16px', marginTop:'32px'}}>
        {talleresSimilares.map(el => (
          <CardNewTaller taller={el} />
        ))}
      </div>
    </>
  )
}
