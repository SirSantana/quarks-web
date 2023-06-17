import styles from '@/styles/Articulos.module.css'



export default function ArticulosRecomendados({ img }) {
  return (
    <article style={{ width: '150px', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', }}>
      <h2 style={{fontSize:'16px'}} className={styles.question}> Articulos recomendados</h2>

      <section className={styles.gridContainer2}>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={img} style={{height:'50px', width:'50px', objectFit:'contain'}} />
          <div>
            <h3 className={styles.response} style={{ color: '#5B0221', fontWeight: '700', margin: 0, fontSize:'12px'}}>Cuidado</h3>
            <h4 className={styles.response} style={{ margin: 0, lineHeight: '20px', fontSize:'12px' }}>La importancia del cuidado del chasis</h4>
          </div>
        </div>

        <div>
          <img src={img} className={styles.imgOtroArticulos} />
          <h3 className={styles.response} style={{ color: '#5B0221', fontWeight: '700', margin: 0 }}>Cuidado</h3>
          <h4 className={styles.response} style={{ margin: 0, lineHeight: '20px' }}>La importancia del cuidado del chasis</h4>
        </div>

        <div>
          <img src={img} className={styles.imgOtroArticulos} />
          <h3 className={styles.response} style={{ color: '#5B0221', fontWeight: '700', margin: 0 }}>Cuidado</h3>
          <h4 className={styles.response} style={{ margin: 0, lineHeight: '20px' }}>La importancia del cuidado del chasis</h4>
        </div>

        <div>
          <img src={img} className={styles.imgOtroArticulos} />
          <h3 className={styles.response} style={{ color: '#5B0221', fontWeight: '700', margin: 0 }}>Cuidado</h3>
          <h4 className={styles.response} style={{ margin: 0, lineHeight: '20px' }}>La importancia del cuidado del chasis</h4>
        </div>

      </section>
      <div style={{ width: '100%', backgroundColor: '#bababa', height: '1px' }} />
    </article>
  )
}