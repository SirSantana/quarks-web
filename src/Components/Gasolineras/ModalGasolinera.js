


import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useEffect, useState } from 'react'
import Icon, { IconCatalog } from '../Icon/Icon'
import Button, { ButtonVariant } from '../Button/Button'
import PriceFormat from '@/utils/priceFormat'
import ModalCalcularAhorro from './ModalCalcularAhorro'
import ModalCrearReportePrecio from './ModalCrearReportePrecio'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_REPORTS_PRICE } from '@/graphql/queries'
import { timeSince } from '@/utils/dateEs'


export default function ModalGasolinera({ data, setVisibleModal, precioAlto, precioAltoExtra }) {
  const [combustible, setCombustible] = useState({ nombre: 'Corriente', index: 1 })
  const [visibleModalAhorro, setVisibleModalAhorro] = useState(false)
  const [visibleModalReportePrecio, setVisibleModalReportePrecio] = useState(false)

  const { data: reportesPrice, loading, error } = useQuery(GET_REPORTS_PRICE, { variables: { gasolinera: data?.nombre } })
  let priceCombustible = combustible.index === 1 ? data?.price?.toString() : combustible.index == 2 ? data?.priceDos?.toString() : data?.priceTres?.toString()

  return (
    <div onClick={() => setVisibleModal(false)} className={styles.modal} >
      <div onClick={(e) => e.stopPropagation()} className={styles.modalContainer} style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <p style={{ margin: '0', textAlign: 'center', flex: 1, fontSize: '18px', fontWeight: '600' }}>{data?.nombre}</p>
          <Icon onClick={() => setVisibleModal(false)} name={IconCatalog.closeOutline} />
        </div>

        <div style={{ margin: '32px 0 16px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <p style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>Ubicacion</p>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <p style={{ margin: '0', fontSize: '14px' }}>{data?.direccion}. <span style={{ fontWeight: '500' }}>{data?.ciudad}</span></p>
          </div>
        </div>

        <div style={{ margin: '16px 0 16px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <p style={{ margin: '0', fontSize: '16px', fontWeight: '600', color: 'black' }}>Precios</p>
            <p onClick={() => setVisibleModalReportePrecio(true)} style={{ margin: '0', fontSize: '12px', fontWeight: '500', color: '#f50057', textDecoration: 'underline', cursor: 'pointer' }}>Reportar cambio</p>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <p style={{ margin: '0', fontSize: '14px', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontWeight: '600' }}>Gasolina Corriente <p style={{ margin: '0', fontSize: '14px', fontWeight: '500' }}>$ {data?.price ? PriceFormat({ price: data?.price.toString() }) : 'Precio desconocido'}<span style={{ fontSize: '12px', fontWeight: '400' }}> / 1gl</span></p></p>
              {reportesPrice?.getReportsPrice[0] &&
                <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', marginTop: '8px' }}>
                  <Icon name={IconCatalog.alertCircle} size='sm' style={{ color: '#ffA500', marginTop: '4px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#ffA500' }}>{reportesPrice.getReportsPrice[0].nombre}<span style={{ marginLeft: '4px', color: '#5c5c5c', fontSize: '10px' }}>hace {timeSince(reportesPrice.getReportsPrice[0].fecha)}</span></p>
                    <p style={{ fontSize: '14px', fontWeight: '400', color: '#464646' }}>Reportó un cambio de precio a <span style={{fontWeight:'500'}}>${PriceFormat({price: reportesPrice.getReportsPrice[0].precio})}</span></p>
                  </div>
                </div>
              }
            </div>


          </div>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <p style={{ margin: '0', fontSize: '14px', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontWeight: '600' }}>Gasolina Extra <p style={{ margin: '0', fontSize: '14px', fontWeight: '500' }}>$ {data?.priceDos ? PriceFormat({ price: data?.priceDos.toString() }) : 'Precio desconocido'}<span style={{ fontSize: '12px', fontWeight: '400' }}> / 1gl</span></p></p>
              {reportesPrice?.getReportsPrice[1] &&
                <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', marginTop: '8px' }}>
                  <Icon name={IconCatalog.alertCircle} size='sm' style={{ color: '#ffA500', marginTop: '4px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: '12px', fontWeight: '500', color: '#ffA500' }}>{reportesPrice.getReportsPrice[1].nombre}<span style={{ marginLeft: '4px', color: '#5c5c5c', fontSize: '10px' }}>hace {timeSince(reportesPrice.getReportsPrice[1].fecha)}</span></p>
                    <p style={{ fontSize: '14px', fontWeight: '400', color: '#464646' }}>Reportó un cambio de precio a <span style={{fontWeight:'500'}}>${PriceFormat({price: reportesPrice.getReportsPrice[1].precio})}</span></p>
                  </div>
                </div>
              }
            </div>
          </div>
          <Button onClick={() => setVisibleModalAhorro(true)} style={{ alignSelf: 'flex-end', margin: 0, marginTop: '16px', borderColor: '#373737' }} size='sm' variant={ButtonVariant.outlined} >
            Calcular ahorro
          </Button>

        </div>

        {/* <div style={{ margin: '32px 0 16px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <p style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>Calificaciones</p>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <p style={{ margin: '0', fontSize: '14px' }}>Gasolina Corriente</p>
            <p style={{ margin: '0', fontSize: '14px', fontWeight: '500' }}>$ {data?.price ? PriceFormat({ price: data?.price.toString() }) : 'Precio desconocido'}<span style={{ fontSize: '12px', fontWeight: '400' }}> / 1gl</span></p>

          </div>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <p style={{ margin: '0', fontSize: '14px' }}>Gasolina Extra</p>
            <p style={{ margin: '0', fontSize: '14px', fontWeight: '500' }}>$ {data?.priceDos ? PriceFormat({ price: data?.priceDos?.toString() }) : 'Precio desconocido'}<span style={{ fontSize: '12px', fontWeight: '400' }}> / 1gl</span></p>

          </div>
          <Button style={{alignSelf:'flex-end', margin:0, marginTop:'16px'}} size='sm' variant={ButtonVariant.outlined} >
            Calcular ahorro
          </Button>

        </div> */}

        {visibleModalAhorro && <ModalCalcularAhorro data={data} setVisibleModal={setVisibleModalAhorro} precioAlto={precioAlto} precioAltoExtra={precioAltoExtra} />}
        {visibleModalReportePrecio && <ModalCrearReportePrecio priceUno={data?.price} priceDos={data?.priceDos} gasolinera={data?.nombre} setVisibleModalReportePrecio={setVisibleModalReportePrecio}setVisibleModal={setVisibleModal} />}

      </div>

    </div>

  )
}