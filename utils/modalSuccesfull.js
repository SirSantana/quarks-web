import styles from '../styles/Cotizar.module.css'


export default function ModalSuccesfull({ mensaje, description }) {
  return (

    <div className={styles.darkBG}>
      <div className={styles.centered}>
        <div className={styles.modal}>
          <img src="/check.svg" alt="Exitoso" className={styles.icon} />
          <h2 style={{ color: '#1b333d', fontSize: '18px', margin: 0, textAlign: 'center' }}>{mensaje}</h2>
          <h4 style={{ textAlign: 'center' }} className={styles.subtitle}>{description}</h4>
        </div>
      </div>

    </div>
  )
}