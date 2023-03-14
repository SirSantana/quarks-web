import styles from '@/styles/HomeSection.module.css'


export default function HomeSection() {
  return (
    <div className={styles.container}>
      <img src='./Croquis3.png' className={styles.image} />
      <div className={styles.containerText}>
        <h2 className={styles.title}>Que hacemos?</h2>
        <h3 className={styles.subtitle}>En Quarks, no somos vendedores directos. Unimos a usuarios como tú que buscan un repuesto, con
          vendedores en toda Colombia, seguros y confiables. Para que puedan cerrar la comprar por otros medios. <b>Sin comisiones, pero con seguridad.</b> </h3>

        <div className={styles.cardContainer}>
          <div className={styles.card}>
          <h4 className={styles.titleWhite}>+230</h4>
          <h4 className={styles.textCard}>Preguntas</h4>
          </div>

          <div className={styles.card}>
          <h4 className={styles.titleWhite}>+310</h4>
          <h4 className={styles.textCard}>Cotizaciones</h4>
          </div>

          <div className={styles.card}>
          <h4 className={styles.titleWhite}>+10</h4>
          <h4 className={styles.textCard}>Vendedores</h4>
          </div>
        </div>
      </div>
    </div>
  )
}