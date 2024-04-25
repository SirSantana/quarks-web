
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'


export default function ModalEditTaller({ setVisibleEditModal, signOut, setVisibleShareArticulo }) {
  const [section, setSection] = useState(0)
  const router = useRouter()

  const handleChange =(e, callback)=>{
    e.stopPropagation()
    callback()
  }
  return (
    <div onClick={()=> setVisibleEditModal(false)} className={styles.modal}>
      <div className={styles.modalContainer}>
        {section === 0
          ?
          <>
            <button onClick={(e)=>handleChange(e, ()=>setSection(1))} className={styles.modalButton}>Editar perfil</button>
            <button onClick={() => setVisibleShareArticulo(true)} className={styles.modalButton}>Compartir Perfil</button>
            <button onClick={() => signOut()} className={styles.modalButton}>Cerrar Sesión</button>
          </>
          :
          <div style={{display:'flex', width:'100%', flexDirection:'column'}}>
            <p style={{fontSize:'18px', fontWeight: '600', marginBottom: '16px' }}> Editar perfil</p>
            <button onClick={(e)=>handleChange(e, ()=>router.push(`${router.asPath}/editar-perfil?section=datosimportantes`))}  className={styles.modalButton}>Datos Importantes</button>
            <button onClick={(e)=>handleChange(e, ()=>router.push(`${router.asPath}/editar-perfil?section=servicios`))}  className={styles.modalButton}>Servicios</button>
            <button style={{color:'#373737'}} onClick={(e)=>handleChange(e, ()=>router.push(`${router.asPath}/editar-perfil?section=redes`))}  className={styles.modalButton}>Redes Sociales</button>
            {/* <button onClick={(e)=>handleChange(e, ()=>setSection(1))}  style={{color:'#373737'}} className={styles.modalButton}>Acerca de</button> */}
          </div>
        }
      </div>

    </div>

  )
}