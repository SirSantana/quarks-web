import styles from '@/styles/HomeArticulos.module.css'
import Link from 'next/link'


export default function HeaderHome() {
  return (
    <Link style={{textDecoration:'none'}} href={'/glosario-de-autopartes'}>
    <article className={styles.containerCardTrivia}>
      <h2 className={styles.triviaTitle}>¿Sabes para que sirve esta parte de tu vehiculo?</h2>
      <section className={styles.triviaContainerAnswers}>
        <img src={'https://azurequarks.blob.core.windows.net/repuestos/bateriasrepuestos17052023.jpg'} className={styles.imgRepuesto} />

        {/* <div className={styles.aswersContaninerCircle}>
          <div className={styles.answersCircle}>A</div>
          <p style={{ color: 'white', fontSize: '14px' }}>Audi</p>
        </div>
        <div className={styles.aswersContaninerCircle}>
          <div className={styles.answersCircle}>B</div>
          <p style={{ color: 'white', fontSize: '14px' }}>BMW</p>
        </div>
        <div className={styles.aswersContaninerCircle}>
          <div className={styles.answersCircle}>C</div>
          <p style={{ color: 'white', fontSize: '14px' }}>Mercedes Benz</p>
        </div> */}
      </section>
    </article>
    </Link>

  )
}