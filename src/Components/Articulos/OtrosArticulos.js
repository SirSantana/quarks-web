import styles from '@/styles/Articulos.module.css'



export default function OtrosArticulos({ img }) {
  return (
    <article style={{ marginTop: '32px' }}>
      <h2 className={styles.question}>Otros Articulos</h2>

      <section className={styles.gridContainer}>

        <div>
          <img src={img}  className={styles.imgOtroArticulos} />
          <h3 className={styles.response} style={{ color: '#5B0221', fontWeight: '700', margin: 0 }}>Cuidado</h3>
          <h4 className={styles.response} style={{ margin: 0, lineHeight:'20px' }}>La importancia del cuidado del chasis</h4>
        </div>

        <div>
          <img src={img} className={styles.imgOtroArticulos} />
          <h3 className={styles.response} style={{ color: '#5B0221', fontWeight: '700', margin: 0 }}>Cuidado</h3>
          <h4 className={styles.response} style={{ margin: 0, lineHeight:'20px' }}>La importancia del cuidado del chasis</h4>
        </div>

        <div>
          <img src={img}  className={styles.imgOtroArticulos} />
          <h3 className={styles.response} style={{ color: '#5B0221', fontWeight: '700', margin: 0 }}>Cuidado</h3>
          <h4 className={styles.response} style={{ margin: 0, lineHeight:'20px' }}>La importancia del cuidado del chasis</h4>
        </div>

        <div>
          <img src={img}  className={styles.imgOtroArticulos} />
          <h3 className={styles.response} style={{ color: '#5B0221', fontWeight: '700', margin: 0 }}>Cuidado</h3>
          <h4 className={styles.response} style={{ margin: 0, lineHeight:'20px' }}>La importancia del cuidado del chasis</h4>
        </div>

      </section>
      <div style={{ width: '100%', backgroundColor: '#bababa', height: '1px' }} />
    </article>
  )
}