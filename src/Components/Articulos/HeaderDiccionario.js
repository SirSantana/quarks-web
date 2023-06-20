import styles from '@/styles/Diccionario.module.css'

import BottomHeaderInfo from './BottomHeaderInfo';


export default function HeaderDiccionario({  tema,  tiempo, id, img, titulo }) {

  return (
    <div className={styles.containerHeaderDiccionario}>
      <div style={{alignItems:'center', justifyContent:'center', width:'100%'}} className={styles.containerHeaderDiccionario2}>
        <header style={{alignItems:'center', marginBottom:'8px'}} className={styles.containerHeader}>
          <p style={{textAlign:'center'}} className={styles.subtitleCategory}>{tema}</p>
          <h1 style={{textAlign:'center', width:'100%'}} className={styles.title2}>{titulo}</h1>
        </header>
        <BottomHeaderInfo tiempo={tiempo} id={id} />
      </div>
      {/* <img src={img} alt={titulo} className={styles.icon} style={{ height: '100px' }} /> */}

    </div>
  )
}