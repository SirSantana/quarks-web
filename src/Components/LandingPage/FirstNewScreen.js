
import styles from '@/styles/Landing.module.css'
import SliderTiposTalleres from './SliderTiposTalleres'



export default function FirstNewScreen() {
  return (
    <div className={styles.container} style={{ background: 'white', }}>
      <div style={{ flexDirection: 'column'}} className={styles.containerParent}>

        <h1 style={{ color: '#373737' }} className={styles.title}>Talleres mecanicos de Bogotá</h1>
          <SliderTiposTalleres />
      </div>

    </div>
  )
}