import { GET_VISTAS_ARTICULO } from '@/graphql/queries'
import styles from '@/styles/Articulos.module.css'
import { useQuery } from '@apollo/client'



export default function BottomHeaderInfo({tiempo, id,}) {
  const {loading, data, error} = useQuery(GET_VISTAS_ARTICULO, {variables:{id:id}})
  return (
    <section  className={styles.containerBottomHeaderInfo}>
      <div className={styles.divHeaderText}>
        <div className={styles.divIconHeader}>
          <ion-icon name="eye-outline"></ion-icon>
        </div>
        <p className={styles.subtitleHeader}>{loading && '-'}{data?.getVistasArticulo} vistas</p>
      </div>
      <div className={styles.divHeaderText}>
        <div className={styles.divIconHeader}>
          <ion-icon name="book-outline"></ion-icon>
        </div>
        <p className={styles.subtitleHeader}>{tiempo} min lectura</p>
      </div>
      <div className={styles.divIconHeader}>
        <ion-icon name="arrow-redo-outline"></ion-icon>
      </div>
    </section>
  )
}