import { GET_VISTAS_ARTICULO } from '@/graphql/queries'
import styles from '@/styles/Articulos.module.css'
import { ModalShareArticulo } from '@/utils/Modales';
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';


export default function BottomHeaderInfo({ tiempo, id, }) {
  const { loading, data, error } = useQuery(GET_VISTAS_ARTICULO, { variables: { id: id } })
  const [visibleShareArticulo, setVisibleShareArticulo] = useState(false)
  const router = useRouter()
  
  return (
    <section className={styles.containerBottomHeaderInfo}>
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
      <div style={{cursor:'pointer'}} onClick={()=> setVisibleShareArticulo(true)}  className={styles.divIconHeader}>
          <ion-icon name="arrow-redo-outline">
          </ion-icon>
      </div>
      {visibleShareArticulo && <ModalShareArticulo setVisibleShareArticulo={setVisibleShareArticulo} url={`https://www.quarks.com.co${router?.asPath}`}/>}

    </section>
  )
}