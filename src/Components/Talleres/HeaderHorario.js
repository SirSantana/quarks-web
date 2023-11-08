
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { ModalEditHorario } from '@/utils/Modales';
import { useRouter } from 'next/router';
import { useState } from 'react';


export default function HeaderHorario({ handleScroll, setVisibleFullHorario, visibleFullHorario, horario, user }) {
  const numeroDia = new Date().getDay();
  const [visibleModalEditHorario, setVisibleModalEditHorario] = useState(false)
  const indiceDia = numeroDia !== 0 ? numeroDia - 1 : 6;
  const horariosSeparados = horario.split(',');
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)

  const handleClick = () => {
    if (user?.userName === router?.query?.id) {
      return setEditMode(!editMode)
    }
    handleScroll()
    setVisibleFullHorario(!visibleFullHorario)
  }

  return (
    <>
      <div onClick={handleClick} className={`${styles.containerHeaderCalendario} ${editMode ? styles.active : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%' }}>
          <ion-icon style={{ fontSize: '20px' }} name="calendar-number-outline"></ion-icon>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%' }}>
              <p style={{ color: '#373737', fontSize: '14px' }}>Hoy <span style={{ fontWeight: '600' }}>{horariosSeparados?.[indiceDia]}</span></p>
            </div>
            <ion-icon style={{ fontSize: '16px', color: '#757A7E' }} name={"chevron-down-outline"}></ion-icon>
          </div>
        </div>

        {editMode && (
          <button onClick={()=>{setVisibleModalEditHorario(true),setEditMode(false)}} className={styles.editIcon}>
            <ion-icon
              style={{ fontSize: '16px', color: 'white' }}
              name="pencil-outline"
            ></ion-icon>
          </button>
        )}

      </div>
      {visibleModalEditHorario &&
        <ModalEditHorario setVisibleModalEditHorario={setVisibleModalEditHorario} horarioActual={horario} />
      }
    </>
  )
}

