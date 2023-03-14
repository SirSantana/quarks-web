import styles from '@/styles/PasosCotizacion.module.css'


export default function Beneficios() {
  return (
    <div style={{ backgroundColor: '#f6f6f6', padding: '32px 0px' }}>
      <div className={styles.containerBeneficios}>
        <div className={styles.containerBeneficios2}>
        <h2 className={styles.title1}>Beneficios</h2>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  }}>
            <div className={styles.containerIcon}>
              <img src='./home-sharp.svg' width={'24px'} height={'24px'} />
            </div>
            <p className={styles.subtitle}>Cotiza en un solo lugar sin salir de casa</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className={styles.containerIcon}>
              <img src='./call-sharp.svg' width={'24px'} height={'24px'} />
            </div>
            <p className={styles.subtitle}>Tu eliges que vendedor contactar.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className={styles.containerIcon}>
              <img src='./people-sharp.svg' width={'24px'} height={'24px'} />
            </div>
            <p className={styles.subtitle}>Vendedores seguros y confiables.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className={styles.containerIcon}>
              <img src='./cash-sharp.svg' width={'24px'} height={'24px'} />
            </div>
            <p className={styles.subtitle}>No manejamos comisiones.</p>
          </div>
          

        </div>
        <img className={styles.image} src='./Repuestos.png' />
      </div>
    </div>

  )
}