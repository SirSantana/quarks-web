import styles from '@/styles/Main.module.css'
import { ModalShareArticulo } from '@/utils/Modales';
import { useRouter } from 'next/router';
import { useState } from 'react';




export default function ModalCreateTaller({ data, loading, error }) {
  const url = `https://quarks.com.co/servicios-automotriz/negocio/${data?.createTaller?.id}-${data?.createTaller?.nombre}`
  const [visibleShareArticulo, setVisibleShareArticulo ] = useState(false)
  const router = useRouter()
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} style={{ maxWidth: '500px', borderRadius: '8px', width: '95%',boxSizing:'border-box', padding: '32px', background: " linear-gradient(180deg, rgba(2, 0, 36, 1) 0%, rgba(245, 0, 87, 1) 0%, rgba(134, 2, 49, 1) 100%)" }}>
      <ion-icon onClick={()=> router.push('/')} style={{fontSize:'24px', alignSelf:'flex-end', color:'white'}} name="close-outline"></ion-icon>
        <h1 style={{ textAlign: 'center', fontSize: '24px', lineHeight: '26px', marginBottom: '8px', width: '100%', color: 'white' }} className={styles.titleHeader}>{data && `¡Listo ${data?.createTaller?.nombre}!`}{loading && 'Espera un momento...'}{error && 'Ha habido un error, revisa tu conexion'}</h1>
        <h3 style={{ fontWeight: '400', color: 'white', margin: '16px 0px 32px 0' }} className={styles.textCategory}>
          {data && `Bienvenido Taller ${data?.createTaller.nombre} a la comunidad de los mejores talleres de Bogota, estaremos juntos en el crecimiento de tu negocio. Copia el link de tu taller y compartelo en tus redes!`}
          {loading && 'Estamos creando el anuncio de tu taller, falta poco...'}
        </h3>
        <img src="https://azurequarks.blob.core.windows.net/negocios/fotostoredefault.png" style={{ width: '250px', height: '280px', objectFit: 'cover' }} />
        {data && <button onClick={()=> setVisibleShareArticulo(true)} style={{ height: '50px', color: 'white', marginTop: '16px', width: '200px', border: 'none', backgroundColor: '#5B0221', padding: '8px 16px', borderRadius: '8px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <ion-icon style={{ color: 'white', fontSize: '24px' }} name="share-social-outline"></ion-icon>
          Copiar Link
        </button>}
      </div>
      {visibleShareArticulo && <ModalShareArticulo setVisibleShareArticulo={setVisibleShareArticulo} url={url} otherUrl={true}/>}

    </div>
  )
}