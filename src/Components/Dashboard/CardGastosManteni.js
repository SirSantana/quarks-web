

import { GET_RECORDATORIOS } from '@/graphql/queries'
import styles from '@/styles/Dashboard.module.css'
import { options } from '@/utils/dateEs';
import PriceFormat from '@/utils/priceFormat';
import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useLayoutEffect } from 'react';

export default function CardGastosManteni({ idCar }) {
  const [getRecordatorios,{ loading, data, error }] = useLazyQuery(GET_RECORDATORIOS )
  useLayoutEffect(()=>{
    if(idCar){
      getRecordatorios({ variables: { id: idCar } })
    }
  },[idCar])

  let recordatorios = [[], [], [], [], [], []]
  if (data) {
    data?.getRecordatorios.map(el => {
      if (el.tipo === 'Revision tecnico mecanica') recordatorios[0].push(el)
      if (el.tipo === 'Seguro') recordatorios[1].push(el)
      if (el.tipo === 'Impuestos') recordatorios[2].push(el)
      if (el.tipo === 'Cambio de aceite') recordatorios[3].push(el)
      if (el.tipo === 'Recarga Extintor') recordatorios[4].push(el)
      if (el.tipo === 'Rotacion Llantas') recordatorios[5].push(el)
    })
  }
  function Dias(el) {
    let fecha = new Date(el?.fechaFinal)
    const dateActual = new Date()
    let diasFaltantes = fecha.getTime() - dateActual.getTime()
    let dias = Math.round(diasFaltantes / (1000 * 60 * 60 * 24))
    return dias
  }

  useEffect(() => {
    if (loading) {
      <h2>Cargando...</h2>
    }
  }, [loading])
  useEffect(() => {
    if (error) {
      if (error?.message === 'Network request failed') {
        alert('Ha ocurrido un error', 'Revisa tu conexion a internet')
      } else {
        alert('Ha ocurrido un error', error?.message)
      }
    }
  }, [error])
  return (
    <div className={styles.gastosmanteni}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 className={styles.subtitle2}>Mantenimientos y pagos</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '24px', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#FFD4DA', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img alt={'Cotiza tus repuestos logo'} src={'/car-wrench.svg'} style={{ height: '24px', width: '24px' }} />
            </div>
            <div>
              {recordatorios[3].length > 0
                ?
                <div>
                  <h4 className={styles.subtitle3}>Cambio aceite</h4>
                  <p className={styles.parrafo}>A los {PriceFormat({ price: recordatorios[3][0]?.kilometrajeFinal })} km</p>
                </div>
                :
                <div>
                  <h4 className={styles.subtitle3}>Cambio aceite</h4>
                  <p className={styles.parrafo}>Agregar</p>

                </div>
              }
            </div>
          </div>
          {recordatorios[3].length > 0
            ?
            <div>
              <img alt={'Cotiza tus repuestos logo'} src={'/create-outline.svg'} style={{ height: '20px', width: '20px' }} />
              <img alt={'Cotiza tus repuestos logo'} src={'/trash-outline.svg'} style={{ height: '20px', width: '20px' }} />
            </div>
            :
            <img alt={'Cotiza tus repuestos logo'} src={'/add-sharp.svg'} style={{ height: '20px', width: '20px' }} />
          }
        </div>



        {/* <div style={{ width: '90%', height: '2px', margin: '16px 0', backgroundColor: '#f1f1f1' }} />


        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#FFD4DA', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img alt={'Cotiza tus repuestos logo'} src={'/car-wrench.svg'} style={{ height: '24px', width: '24px' }} />
            </div>
            <div>
              {recordatorios[0].length > 0
                ?
                <div>
                  <h4 className={styles.subtitle3}>Revision Tec. Mecanica</h4>
                  <p  className={styles.parrafo}>El {new Date(recordatorios[0][0]?.fechaFinal).toLocaleDateString('es-ES', options)}</p>
                  <p className={styles.parrafo} style={{ color: Dias(recordatorios[0][0]) < 10 ? '#f50057' : "green",  fontSize: 14 }}>Faltan {Dias(recordatorios[0][0])} Días</p>

                </div>
                :
                <div>
                  <h4 className={styles.subtitle3}>Revision Tec. Mecanica</h4>
                  <p className={styles.parrafo}>Agregar</p>

                </div>
              }
            </div>
          </div>
          {recordatorios[0].length > 0
            ?
            <div>
              <img alt={'Cotiza tus repuestos logo'} src={'/create-outline.svg'} style={{ height: '20px', width: '20px' }} />
              <img alt={'Cotiza tus repuestos logo'} src={'/trash-outline.svg'} style={{ height: '20px', width: '20px' }} />
            </div>
            :
            <img alt={'Cotiza tus repuestos logo'} src={'/add-sharp.svg'} style={{ height: '20px', width: '20px' }} />
          }
        </div> */}

        {/* <div style={{ width: '90%', height: '2px', margin: '16px 0', backgroundColor: '#f1f1f1' }} />

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#FFD4DA', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img alt={'Cotiza tus repuestos logo'} src={'/car-wrench.svg'} style={{ height: '24px', width: '24px' }} />
            </div>
            <div>
              {recordatorios[2].length > 0
                ?
                <div>
                  <h4 className={styles.subtitle3}>Pago Impuestos</h4>
                  <p className={styles.parrafo}>El {new Date(recordatorios[2][0]?.fechaFinal).toLocaleDateString('es-ES', options)}</p>
                  <p className={styles.parrafo} style={{ color: Dias(recordatorios[2][0]) < 10 ? '#f50057' : "green",  fontSize: 14 }}>Faltan {Dias(recordatorios[2][0])} Días</p>

                </div>
                :
                <div>
                  <h4 className={styles.subtitle3}>Pago Impuestos</h4>
                  <p className={styles.parrafo}>Agregar</p>

                </div>
              }
            </div>
          </div>
          {recordatorios[2].length > 0
            ?
            <div>
              <img alt={'Cotiza tus repuestos logo'} src={'/create-outline.svg'} style={{ height: '20px', width: '20px' }} />
              <img alt={'Cotiza tus repuestos logo'} src={'/trash-outline.svg'} style={{ height: '20px', width: '20px' }} />
            </div>
            :
            <img alt={'Cotiza tus repuestos logo'} src={'/add-sharp.svg'} style={{ height: '20px', width: '20px' }} />
          }
        </div>



        <div style={{ width: '90%', height: '2px', margin: '16px 0', backgroundColor: '#f1f1f1' }} />

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#FFD4DA', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img alt={'Cotiza tus repuestos logo'} src={'/car-wrench.svg'} style={{ height: '24px', width: '24px' }} />
            </div>
            <div>
              {recordatorios[1].length > 0
                ?
                <div>
                  <h4 className={styles.subtitle3}>Pago Seguro</h4>
                  <p className={styles.parrafo}>El {new Date(recordatorios[1][0]?.fechaFinal).toLocaleDateString('es-ES', options)}</p>
                  <p className={styles.parrafo} style={{ color: Dias(recordatorios[1][0]) < 10 ? '#f50057' : "green",  fontSize: 14 }}>Faltan {Dias(recordatorios[1][0])} Días</p>

                </div>
                :
                <div>
                  <h4 className={styles.subtitle3}>Pago Seguro</h4>
                  <p className={styles.parrafo}>Agregar</p>

                </div>
              }
            </div>
          </div>
          {recordatorios[1].length > 0
            ?
            <div>
              <img alt={'Cotiza tus repuestos logo'} src={'/create-outline.svg'} style={{ height: '20px', width: '20px' }} />
              <img alt={'Cotiza tus repuestos logo'} src={'/trash-outline.svg'} style={{ height: '20px', width: '20px' }} />
            </div>
            :
            <img alt={'Cotiza tus repuestos logo'} src={'/add-sharp.svg'} style={{ height: '20px', width: '20px' }} />
          }
        </div>


        <div style={{ width: '90%', height: '2px', margin: '16px 0', backgroundColor: '#f1f1f1' }} />

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#FFD4DA', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img alt={'Cotiza tus repuestos logo'} src={'/car-wrench.svg'} style={{ height: '24px', width: '24px' }} />
            </div>
            <div>
              {recordatorios[5].length > 0
                ?
                <div>
                  <h4 className={styles.subtitle3}>Rotacion Llantas</h4>
                  <p className={styles.parrafo}>El {new Date(recordatorios[5][0]?.fechaFinal).toLocaleDateString('es-ES', options)}</p>
                  <p className={styles.parrafo} style={{ color: Dias(recordatorios[5][0]) < 10 ? '#f50057' : "green", fontWeight: '600', fontSize: 16 }}>Faltan {Dias(recordatorios[5][0])} Días</p>

                </div>
                :
                <div>
                  <h4 className={styles.subtitle3}>Rotacion Llantas</h4>
                  <p className={styles.parrafo}>Agregar</p>

                </div>
              }
            </div>
          </div>
          {recordatorios[5].length > 0
            ?
            <div>
              <img alt={'Cotiza tus repuestos logo'} src={'/create-outline.svg'} style={{ height: '20px', width: '20px' }} />
              <img alt={'Cotiza tus repuestos logo'} src={'/trash-outline.svg'} style={{ height: '20px', width: '20px' }} />
            </div>
            :
            <img alt={'Cotiza tus repuestos logo'} src={'/add-sharp.svg'} style={{ height: '20px', width: '20px' }} />
          }
        </div>


        <div style={{ width: '90%', height: '2px', margin: '16px 0', backgroundColor: '#f1f1f1' }} />

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#FFD4DA', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img alt={'Cotiza tus repuestos logo'} src={'/car-wrench.svg'} style={{ height: '24px', width: '24px' }} />
            </div>
            <div>
              {recordatorios[4].length > 0
                ?
                <div>
                  <h4 className={styles.subtitle3}>Recarga Extintor</h4>
                  <p className={styles.parrafo}>El {new Date(recordatorios[4][0]?.fechaFinal).toLocaleDateString('es-ES', options)}</p>
                  <p className={styles.parrafo} style={{ color: Dias(recordatorios[4][0]) < 10 ? '#f50057' : "green", fontSize: 14 }}>Faltan {Dias(recordatorios[4][0])} Días</p>

                </div>
                :
                <div>
                  <h4 className={styles.subtitle3}>Recarga Extintor</h4>
                  <p className={styles.parrafo}>Agregar</p>

                </div>
              }
            </div>
          </div>
          {recordatorios[4].length > 0
            ?
            <div>
              <img alt={'Cotiza tus repuestos logo'} src={'/create-outline.svg'} style={{ height: '20px', width: '20px' }} />
              <img alt={'Cotiza tus repuestos logo'} src={'/trash-outline.svg'} style={{ height: '20px', width: '20px' }} />
            </div>
            :
            <img alt={'Cotiza tus repuestos logo'} src={'/add-sharp.svg'} style={{ height: '20px', width: '20px' }} />
          }
        </div> */}
       
      </div>
    </div>
  )
}