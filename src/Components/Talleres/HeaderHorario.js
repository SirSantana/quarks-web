
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { ModalEditHorario } from '@/utils/Modales';
import { useRouter } from 'next/router';
import { useState } from 'react';


export default function HeaderHorario({ handleScroll, setVisibleFullHorario, visibleFullHorario, horario }) {
  const numeroDia = new Date().getDay();
  const indiceDia = numeroDia !== 0 ? numeroDia - 1 : 6;
  const horariosSeparados = horario.split(',');
  const [editMode, setEditMode] = useState(false)

  const handleClick = () => {
    handleScroll()
    setVisibleFullHorario(!visibleFullHorario)
  }

  return (
    <>
      <div onClick={handleClick} className={styles.containerHeaderCalendario}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%' }}>
          <ion-icon style={{ fontSize: '20px' }} name="calendar-number-outline"></ion-icon>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', }}>
              <p style={{ color: '#373737', fontSize: '14px' }}>Hoy <span style={{ fontWeight: '600' }}>{horariosSeparados?.[indiceDia]}</span></p>
            </div>
            <ion-icon style={{ fontSize: '16px', color: '#757A7E' }} name={"chevron-down-outline"}></ion-icon>
          </div>
        </div>

      </div>
    </>
  )
}

