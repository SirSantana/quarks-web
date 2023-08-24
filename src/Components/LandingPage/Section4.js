import styles from '@/styles/Landing.module.css'
import Link from 'next/link'




export default function SectionPasos() {
  return (
    <section className={styles.containerListTalleres}>
      <div className={styles.containerVariedadTalleres}>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column' }}>
          <h2 className={styles.title2}>Encuentra el mejor taller para tu auto</h2>
          <Link className={styles.button} href={'/'} style={{ textDecoration: 'none', fontSize: '14px', color: 'white' }}>
            Buscar ahora
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', alignItems: 'center' }}>
          <div className={styles.containerPasos}>
            <div className={styles.containerIcon}>
              <ion-icon style={{ fontSize: '20px', color: '#f50057' }} name="search-outline"></ion-icon>
            </div>
            <h4 className={styles.subtitle3}>
              Explora los perfiles de los talleres y descubre toda la información que necesitas para tomar una decisión .
            </h4>
          </div>
          <div className={styles.containerPasos}>
            <div className={styles.containerIcon}>
              <ion-icon style={{ fontSize: '20px', color: '#f50057' }} name="filter-outline"></ion-icon>
            </div>
            <h4 className={styles.subtitle3}>
              Utiliza nuestros filtros de búsqueda. Filtra por ubicación, servicios ofrecidos, valoraciones de otros clientes y más.
            </h4>
          </div>
          <div className={styles.containerPasos}>
            <div className={styles.containerIcon}>
              <ion-icon style={{ fontSize: '20px', color: '#f50057' }} name="call-outline"></ion-icon>
            </div>
            <h4 className={styles.subtitle3}>
              Una vez que encuentres el taller que te interesa, comunícate con ellos directamente con el boton de contacto.
            </h4>
          </div>
        </div>

      </div>

    </section>

  )
}