
import styles from '@/styles/HomeArticulos.module.css'


export default function DiccionarioHome() {
  return (
    <section className={styles.containerRepuestos} style={{ marginBottom: '32px' }}>
      <article className={styles.flexItemRepuesto}>
        <img src='https://azurequarks.blob.core.windows.net/repuestos/cilindrada15062023.jpg' style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
        <div>
          <h4 className={styles.question} style={{ margin: 0, lineHeight: '20px', fontSize: '14px', color: '#5b0221' }}>Amortiguador</h4>
          <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}>La cilindrada, también conocida como desplazamiento del motor.</p>
        </div>
      </article>
      <article className={styles.flexItemRepuesto}>
        <img src='https://azurequarks.blob.core.windows.net/repuestos/cilindrada15062023.jpg' style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
        <div>
          <h4 className={styles.question} style={{ margin: 0, lineHeight: '20px', fontSize: '14px', color: '#5b0221' }}>Amortiguador</h4>
          <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}>La cilindrada, también conocida como desplazamiento del motor.</p>
        </div>
      </article>
      <article className={styles.flexItemRepuesto}>
        <img src='https://azurequarks.blob.core.windows.net/repuestos/cilindrada15062023.jpg' style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
        <div>
          <h4 className={styles.question} style={{ margin: 0, lineHeight: '20px', fontSize: '14px', color: '#5b0221' }}>Amortiguador</h4>
          <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}>La cilindrada, también conocida como desplazamiento del motor.</p>
        </div>
      </article>
      <article className={styles.flexMoreRepuestos}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', alignItems: 'center', padding: '16px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
            <h3 style={{ margin: 0, fontSize: '22px', width: '60%' }} className={styles.triviaTitle}>Ver más</h3>
            <ion-icon style={{ fontSize: '32px', color: 'white' }} name="arrow-forward-circle-sharp"></ion-icon>
          </div>
        </div>
      </article>
    </section>
  )
}