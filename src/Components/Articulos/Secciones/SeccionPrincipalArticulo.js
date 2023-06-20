import { useState } from "react"
import styles from '@/styles/Articulos.module.css'
import parse from 'html-react-parser';

export default function SeccionPrincipalArticulo({ titulo, img, tituloParrafo, parrafoUno, parrafoDos, parrafoTres, video }) {
  const [visibleInfo, setVisibleInfo] = useState(true)

  return (
    <>
      {img && <img alt={titulo} src={img} className={styles.imgPrincipal} />}

      <article style={{ margin: '8px 0' }}>
        <div onClick={() => setVisibleInfo(() => visibleInfo ? false : true)} style={{ flexDirection: 'row', display: 'flex', cursor: 'pointer', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
          <h2 className={styles.question}>{tituloParrafo}</h2>
          <img src={visibleInfo ? '../remove-sharp.svg' : '../add-sharp.svg'} className={styles.icon} />
        </div>
        {visibleInfo && (
          <>
            <p className={styles.response}>{parse(parrafoUno)}</p>
            <p className={styles.response}>{parse(parrafoDos)}</p>
            <p className={styles.response}>{parse(parrafoTres)}</p>
            {video &&
            <iframe className={styles.imgPrincipal} style={{maxHeight:'315px', maxWidth:'560px'}} src={video} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          }
          </>
          
        )}
        
      </article>
    </>
  )
}