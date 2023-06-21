import styles from '@/styles/Articulos.module.css'
import { ModalShareArticulo } from '@/utils/Modales'
import { useRouter } from 'next/router'
import { useState } from 'react'


export default function BottomArticulo({palabras}) {
  const [visibleShareArticulo, setVisibleShareArticulo] = useState(false)
  const router = useRouter()
  return (
    <article style={{ marginTop: '0px' }}>
      <section className={styles.sectionBottomArticulo}>
        {palabras.map(palabra=> (
          <div key={palabra} className={styles.containerTags}>
          <p className={styles.subtitleBottomArticulo}>{palabra}</p>
        </div>
        ))}
        
        <div onClick={()=> setVisibleShareArticulo(true)}  className={styles.divIconHeader} style={{  height: '40px', width: '40px', marginLeft:'16px', cursor:'pointer'}}>
          <ion-icon style={{fontSize:'20px'}} name="arrow-redo-outline"></ion-icon>
        </div>
      </section>
      <div style={{width:'100%', backgroundColor:'#bababa', height:'1px'}}/>
      {visibleShareArticulo && <ModalShareArticulo setVisibleShareArticulo={setVisibleShareArticulo} url={`https://www.quarks.com.co${router?.asPath}`}/>}

    </article>
  )
}