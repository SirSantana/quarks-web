import styles from '@/styles/HomeSection.module.css'


export default function HomeSection() {
  return (
    <section className={styles.container}>
      <img src='./Croquis3.png' className={styles.image} />
      <div className={styles.containerText}>
        <h2 className={styles.title}>Que hacemos?</h2>
        <h3 className={styles.subtitle}>Unimos a usuarios como tú que buscan un repuesto, con
          almacenes en toda Colombia, seguros y confiables. Te ofrecemos diferentes precios del mercado con nuestra red de mas de 50 almacenes.</h3>

        <div className={styles.cardContainer}>
          <div className={styles.card}>
          <h4 className={styles.titleWhite}>510</h4>
          <h4 className={styles.textCard}>Usuarios</h4>
          </div>

          <div className={styles.card}>
          <h4 className={styles.titleWhite}>610</h4>
          <h4 className={styles.textCard}>Cotizaciones</h4>
          </div>

          <div className={styles.card}>
          <h4 className={styles.titleWhite}>+50</h4>
          <h4 className={styles.textCard}>Almacenes</h4>
          </div>
        </div>
      </div>
    </section>
  )
}