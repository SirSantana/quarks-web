import { useState } from "react"
import styles from '@/styles/Articulos.module.css'
import parse from 'html-react-parser';

let text = `La cilindrada o desplazamiento del motor, <b>es el volumen total de los pistones dentro de los cilindros de un motor </b>. Es una medida importante que determina la capacidad del motor para generar potencia, torque y la eficiencia del combustible. Comunmente se expresa en centímetros cúbicos (cc) o litros (L).`
export default function SeccionPrincipalArticulo({titulo, img,tituloParrafo, parrafoUno, parrafoDos}) {
  const [visibleInfo, setVisibleInfo] = useState(true)


  return (
    <>
      <img alt={titulo} src={img} className={styles.imgPrincipal} />

      <article style={{ margin: '24px 0' }}>
        <div onClick={() => setVisibleInfo(()=> visibleInfo ? false : true )} style={{ flexDirection: 'row', display: 'flex', cursor: 'pointer', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
          <h2 className={styles.question}>{tituloParrafo}</h2>
          <img src={visibleInfo? '../remove-sharp.svg' : '../add-sharp.svg'} className={styles.icon} />
        </div>
        {visibleInfo && (
          <>
            <p className={styles.response}>{parse(parrafoUno)}</p>
            <p className={styles.response}>
            {parse(parrafoDos)}
            </p>
          </>
        )}
      </article>
    </>
  )
}