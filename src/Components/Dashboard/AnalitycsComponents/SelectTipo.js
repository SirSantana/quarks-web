import { ModalChooseTipoGasto } from "@/utils/Modales"
import { useState } from "react"



export default function SelectTipo({setSelectTipoGasto,selectTipoGasto}) {
  const [visibleModalGasto, setVisibleModalGasto] = useState(false)
  return (
    <>
    <div onClick={()=> setVisibleModalGasto(true)} style={{ padding: '8px 16px',cursor:'pointer',borderRadius:'8px', border: '1px solid #5B0221', display: 'flex', flexDirection: 'row', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
      <p style={{ fontSize: '12px', color: '#5B0221' }}>{selectTipoGasto}</p>
      <img alt={'Cotiza tus repuestos logo'} src={'/arrowDown.svg'} style={{ width: '16px', }} />
    </div>
    {visibleModalGasto && <ModalChooseTipoGasto setVisibleModalGasto={setVisibleModalGasto} setSelectTipoGasto={setSelectTipoGasto} selectTipoGasto={selectTipoGasto}/> }
    </>
  )
}