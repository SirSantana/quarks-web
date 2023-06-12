

import { useState } from "react"
import styles from '@/styles/Articulos.module.css'

import parse from 'html-react-parser';

export default function SeccionTres({tituloParrafo, parrafoUno, parrafoDos}) {
  const [visibleInfo, setVisibleInfo] = useState(true)

  return (
    <article style={{ margin: '24px 0' }}>
      <div onClick={() => setVisibleInfo(() => visibleInfo ? false : true)} style={{ flexDirection: 'row', display: 'flex', cursor: 'pointer', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
        <h2 className={styles.question}>{tituloParrafo}</h2>
        <img src={visibleInfo ? '../remove-sharp.svg' : '../add-sharp.svg'} className={styles.icon} />
      </div>

      {visibleInfo && (
        <div >
          <p className={styles.response}>
            {parse(parrafoUno)}
          </p>
        </div>
      )}
    </article>
  )
}