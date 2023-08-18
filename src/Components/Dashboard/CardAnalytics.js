import { GET_ALL_GASTOS } from '@/graphql/queries'
import styles from '@/styles/Dashboard.module.css'
import { options } from '@/utils/dateEs'
import PriceFormat from '@/utils/priceFormat'
import { useLazyQuery } from '@apollo/client'
import { useEffect, useLayoutEffect, useState } from 'react'
import SelectGraph from './AnalitycsComponents/SelectGraph'
import SelectTipo from './AnalitycsComponents/SelectTipo'
import { GraphLines } from './Graphs/GraphLines'
import { GraphTorta } from './Graphs/GraphTorta'

export default function CardAnalytics({ idCar, gastosArray, setSelectTipoGasto, selectTipoGasto, gastos, totalGastadoAño }) {
  const [tipoGrafico, setTipoGrafico] = useState(0)
  let porcentaje = 0
  let totalTipoGasto = 0
  if (gastos) {
    for (let i = 0; i <= 11; i++) {
      totalTipoGasto += gastos[i]?.total
    }
    porcentaje =  (totalTipoGasto *100) / totalGastadoAño
  }
  return (
    <div className={styles.estadisticas}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
          <h2 className={styles.subtitle2}>Estadisticas</h2>
          {/* <SelectGraph setTipoGrafico={setTipoGrafico} tipoGrafico={tipoGrafico}/> */}
        </div>
        <div onClick={() => setVisibleModalGasto(true)} style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '8px', display: 'flex', flexDirection: 'row', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
          <p className={styles.subtitle2}>Ver detalle</p>
          <img alt={'Cotiza tus repuestos logo'} src={'/arrowDown.svg'} style={{ width: '16px', transform: "rotate(270deg)", }} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', gap: '32px', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '16px 0' }}>
          <h2 style={{ lineHeight: '32px' }} className={styles.textPrice}>$ {PriceFormat({ price: totalGastadoAño?.toString() })}</h2>
          <p style={{ fontSize: '10px', color: '#5B0221', margin: 0, alignSelf: 'flex-start' }}>Total gastado año</p>
        </div> */}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', margin: '16px 0' }}>
          <h2 style={{ lineHeight: '32px', alignSelf: 'flex-start'  }} className={styles.textPrice}>$ {PriceFormat({ price: totalTipoGasto?.toString() })}
          <b style={{fontSize:'14px', marginLeft:'8px', color:'#f50057'}}>{Math.round(porcentaje)}%</b>
          </h2>
          <p style={{ fontSize: '10px', color: '#5B0221', margin: 0, alignSelf: 'flex-start' }}>Total gastado {selectTipoGasto}</p>
        </div>
        <SelectTipo setSelectTipoGasto={setSelectTipoGasto} selectTipoGasto={selectTipoGasto} />

      </div>

      <div style={{ height: '200px', margin: '16px 0 32px 0' }}>
        <GraphLines monthData={gastos} tipoGrafico={tipoGrafico} />
      </div>

      <div>
        <h2 className={styles.subtitle2}>Registro de Tanqueadas</h2>
        {gastosArray?.map((el, index) => (
          index <= 4 &&
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', margin: '16px 0' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#FFD4DA', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img alt={'Cotiza tus repuestos logo'} src={'/car-wrench.svg'} style={{ height: '24px', width: '24px' }} />
            </div>
            <div>
              <p style={{ fontSize: '16px', fontWeight: '600' }} className={styles.parrafo}>${PriceFormat({ price: el.dineroGastado })}</p>
              <p className={styles.parrafo}>{new Date(el?.fecha).toLocaleDateString('es-ES', options)}</p>
            </div>
          </div>

        ))}
        {gastosArray?.length > 3 && <p className={styles.parrafo}>+ {gastosArray?.length - 4} gastos</p>}

      </div>

      {/* <GraphTorta/> */}

    </div>
  )
}