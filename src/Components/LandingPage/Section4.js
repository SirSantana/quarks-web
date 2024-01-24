import styles from '@/styles/Landing.module.css'
import Button, { ButtonSize, ButtonVariant } from '../Button/Button'


export default function SectionPasos() {
  return (
    <section className={styles.containerListTalleres}>
      <div className={styles.containerVariedadTalleres}>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column' }}>
          <h2 className={styles.title2}>Talleres de carro</h2>
          <Button link={true} href={'/'} variant={ButtonVariant.primary} size={ButtonSize.base} >
            Encuentra aqui
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', alignItems: 'center' }}>
          <div className={styles.containerPasos}>
            <div className={styles.containerIcon}>
              <ion-icon style={{ fontSize: '20px', color: '#f50057' }} name="search-outline"></ion-icon>
            </div>
            <p className={styles.subtitle3}>
              Explora los perfiles de los talleresmecanicos y descubre toda la información que necesitas para tomar una decisión .
            </p>
          </div>
          <div className={styles.containerPasos}>
            <div className={styles.containerIcon}>
              <ion-icon style={{ fontSize: '20px', color: '#f50057' }} name="filter-outline"></ion-icon>
            </div>
            <p className={styles.subtitle3}>
              Utiliza nuestros filtros de búsqueda. Filtra por ubicación, servicios ofrecidos, valoraciones de otros clientes y más.
            </p>
          </div>
          <div className={styles.containerPasos}>
            <div className={styles.containerIcon}>
              <ion-icon style={{ fontSize: '20px', color: '#f50057' }} name="call-outline"></ion-icon>
            </div>
            <p className={styles.subtitle3}>
              Una vez que encuentres el taller que te interesa, comunícate con ellos directamente con el boton de contacto.
            </p>
          </div>
        </div>
      </div>
    </section>

  )
}