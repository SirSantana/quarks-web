import styles from '@/styles/Dashboard.module.css'
import { ModalChooseDate } from '@/utils/Modales'
import { useState } from 'react'
import SliderTiposGasto from './AnalitycsComponents/SliderTiposGasto'
import { GraphBar } from './Graphs/GraphBar'


let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 2023]

export default function CardPremium({gastos}) {
  const [visibleModalDate, setVisibleModalDate] = useState(false) 
  const [date, setDate] = useState(12)
  return (
    <div className={styles.premium}>
      <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <h2 className={styles.subtitle2}>Gastos</h2>
        <div onClick={()=> setVisibleModalDate(true)}  style={{ padding: '8px 16px', cursor: 'pointer', borderRadius:'8px', border: '1px solid #5B0221', display: 'flex', flexDirection: 'row', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '12px', color: '#5B0221' }}>{months[date]}</p>
          <ion-icon style={{ color: '#5B0221', fontSize: '16px' }} name="chevron-down-outline"></ion-icon>
        </div>
      </div>
      <SliderTiposGasto gastos={gastos} date={date}/>
      {
        visibleModalDate &&
        <ModalChooseDate setVisibleModalDate={setVisibleModalDate} date={date} setDate={setDate}/>
      }
    </div>
  )
}