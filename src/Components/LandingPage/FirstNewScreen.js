
import styles from '@/styles/Landing.module.css'
import SliderTiposTalleres from './SliderTiposTalleres'
import { useRouter } from 'next/router'



export default function FirstNewScreen({mode}) {
  return (
    <div className={styles.container} style={{ background: 'white' }}>
      <div style={{ flexDirection: 'column' }} className={styles.containerParent}>
        {/* <h1 style={{ color: '#373737' }} className={styles.title}>Talleres mecanicos de Bogotá</h1> */}
        <SliderTiposTalleres mode={mode} />
      </div>
    </div>
  )
}