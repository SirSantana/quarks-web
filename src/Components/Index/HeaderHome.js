import styles from '@/styles/HomeArticulos.module.css'


export default function HeaderHome() {
  return (
    <article className={styles.containerCardTrivia}>
      <h2 className={styles.triviaTitle}>¿Qué empresa creó el primer auto de la historia?</h2>
      <section className={styles.triviaContainerAnswers}>
        <div className={styles.aswersContaninerCircle}>
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
        </div>
      </section>
    </article>
  )
}