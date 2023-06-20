import styles from '@/styles/Articulos.module.css'


export default function BottomArticulo({palabras}) {
  return (
    <article style={{ marginTop: '0px' }}>
      <section className={styles.sectionBottomArticulo}>
        {palabras.map(palabra=> (
          <div key={palabra} className={styles.containerTags}>
          <p className={styles.subtitleBottomArticulo}>{palabra}</p>
        </div>
        ))}
        
        <div className={styles.divIconHeader} style={{  height: '40px', width: '40px', marginLeft:'16px' }}>
          <ion-icon style={{fontSize:'20px'}} name="arrow-redo-outline"></ion-icon>
        </div>
      </section>
      <div style={{width:'100%', backgroundColor:'#bababa', height:'1px'}}/>
    </article>
  )
}