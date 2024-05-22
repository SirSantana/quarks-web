import { useRouter } from "next/router"
import Button, { ButtonVariant } from "../Button/Button"
import SelectCiudad from "./SelectCiudad"
import { useState } from "react"
import { IconCatalog } from "../Icon/Icon"
import PriceFormat from "@/utils/priceFormat"



let tagsFix = ['Gasolineras', 'Estaciones de Servicio', 'gasolineras cerca', 'bombas de gasolina', 'gasolinera cerca de mi', 'estación de servicio más cercana', 'bombas de gasolina cerca', 'bombas de gasolina cerca de mi', 'bombas gasolina cerca', 'gasolinera terpel']

export default function DrawerGasolineras({ setVisibleModalFiltros, filtros, filteredData, setVisibleModal, res, setEstacionCheck, filteredDataExtra }) {
  const [visibleData, setVisibleData] = useState(false)

  const router = useRouter()
  const queryString2 = router?.query?.ordernar || '';
  const cerca = queryString2.includes('cerca');

  return (
    <div onClick={() => visibleData && setVisibleData(false)} style={{ zIndex: 1, position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', height: visibleData ? '300px' : '160px', transition: 'height 0.3s ease' }}>
      <div onClick={() => setVisibleData(!visibleData)} style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px 12px 0 0', paddingTop:'16px', border: '1px solid #d9d9d9', maxWidth: '820px', minWidth: '300px', width: '100%', margin: '0 auto', height: visibleData ? '300px' : '160px', scrollBehavior: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#ccc transparent', overflowY: 'auto' }}>
        <h1>Gasolineras {router.query?.slug?.[0]}</h1>
        <h2 style={{ fontSize: '14px', fontWeight: '400' }}>Gasolineras cerca a mi {router.query?.slug?.[0]}</h2>
        <div onClick={(e) => { e.stopPropagation(), setVisibleData(true) }} style={{ display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'flex-end', gap: '16px', margin: '16px 0 32px 0', }}>
          <SelectCiudad />
          <Button onClick={(e) => { e.stopPropagation(), setVisibleModalFiltros(true), setVisibleData(true) }} variant={ButtonVariant.secondary} size='sm' style={{ marginRight: '0', fontSize: '14px', padding: '4px 8px', borderRadius: '4px', backgroundColor: '#373737', marginTop: '8px', color: 'white', fontWeight: '500', alignSelf: 'end' }} sizeIcon='sm' icon={IconCatalog.optionsOutline}>
            Filtrar
          </Button>
        </div>
        {visibleData
          &&
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', }}>
              {(filtros?.includes('corriente') || filtros === undefined) && (cerca ?
                res?.map(el => (
                  <div key={el.nombre} onClick={() => { setEstacionCheck(el.nombre), setVisibleModal(true) }} style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontWeight: '600', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>{el.empresa}<span style={{ fontSize: '18px', fontWeight: '600', margin: '8px 0', textAlign: 'center' }}>{cerca && `A ${el.distancia} kms`}</span></p>
                      <p style={{ fontSize: '14px', color: '#333333' }}>{el.direccion} {el.ciudad} </p>
                    </div>
                    <div style={{ marginTop: '16px' }}>
                      <p style={{ margin: '0', fontSize: '14px', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontWeight: '600', alignItems: 'center' }}>Corriente {el.price ? <><span style={{ padding: '4px 8px', backgroundColor: '#D3FFD7', margin: '4px 0 0 0', borderRadius: '12px', fontSize: '14px', color: '#2D6600', fontWeight: '700' }}>${PriceFormat({ price: el?.price?.toString() })}<span style={{ fontSize: '12px', fontWeight: '400' }}> / 1gl</span></span></> : <span>Precio desconocido</span>}</p>
                      <p style={{ margin: '0', fontSize: '14px', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontWeight: '600', alignItems: 'center' }}>Extra {el.priceDos ? <><span style={{ padding: '4px 8px', backgroundColor: '#D3FFD7', margin: '4px 0 0 0', borderRadius: '12px', fontSize: '14px', color: '#2D6600', fontWeight: '700' }}>${PriceFormat({ price: el?.priceDos?.toString() })}<span style={{ fontSize: '12px', fontWeight: '400' }}> / 1gl</span></span></> : <span>Precio desconocido</span>}</p>
                    </div>
                    <div style={{ backgroundColor: '#f1f1f1', height: '1px', width: '100%', margin: '24px 0 16px 0' }} />
                  </div>
                ))
                :
                filteredData?.map(el => (
                  <div key={el.nombre} onClick={() => { setEstacionCheck(el.nombre), setVisibleModal(true) }} style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontWeight: '600', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>{el.empresa}<span style={{ fontSize: '18px', fontWeight: '600', margin: '8px 0', textAlign: 'center' }}>{cerca && `A ${el.distancia} kms`}</span></p>
                      <p style={{ fontSize: '14px', color: '#333333' }}>{el.direccion} {el.ciudad} </p>
                    </div>
                    <div style={{ marginTop: '16px' }}>
                      <p style={{ margin: '0', fontSize: '14px', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontWeight: '600', alignItems: 'center' }}>Corriente {el.price ? <><span style={{ padding: '4px 8px', backgroundColor: '#D3FFD7', margin: '4px 0 0 0', borderRadius: '12px', fontSize: '14px', color: '#2D6600', fontWeight: '700' }}>${PriceFormat({ price: el?.price?.toString() })}<span style={{ fontSize: '12px', fontWeight: '400' }}> / 1gl</span></span></> : <span>Precio desconocido</span>}</p>
                      <p style={{ margin: '0', fontSize: '14px', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontWeight: '600', alignItems: 'center' }}>Extra {el.priceDos ? <><span style={{ padding: '4px 8px', backgroundColor: '#D3FFD7', margin: '4px 0 0 0', borderRadius: '12px', fontSize: '14px', color: '#2D6600', fontWeight: '700' }}>${PriceFormat({ price: el?.priceDos?.toString() })}<span style={{ fontSize: '12px', fontWeight: '400' }}> / 1gl</span></span></> : <span>Precio desconocido</span>}</p>
                    </div>
                    <div style={{ backgroundColor: '#f1f1f1', height: '1px', width: '100%', margin: '24px 0 16px 0' }} />
                  </div>
                ))
              )
              }
              {filtros?.includes('extra') && filteredDataExtra?.map(el => (
                <div key={el.nombre} onClick={() => { setEstacionCheck(el.nombre), setVisibleModal(true) }} style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontWeight: '600', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>{el.empresa}<span style={{ fontSize: '18px', fontWeight: '600', margin: '8px 0', textAlign: 'center' }}>{cerca && `A ${el.distancia} kms`}</span></p>
                    <p style={{ fontSize: '14px', color: '#333333' }}>{el.direccion} {el.ciudad} </p>
                  </div>
                  <div style={{ marginTop: '16px' }}>
                    {/* <p style={{ margin: '0', fontSize: '14px', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontWeight: '600', alignItems: 'center' }}>Corriente {el.price ? <><span style={{ padding: '4px 8px', backgroundColor: '#D3FFD7', margin: '4px 0 0 0', borderRadius: '12px', fontSize: '14px', color: '#2D6600', fontWeight: '700' }}>${PriceFormat({ price: el?.price?.toString() })}<span style={{ fontSize: '12px', fontWeight: '400' }}> / 1gl</span></span></> : <span>Precio desconocido</span>}</p> */}
                    <p style={{ margin: '0', fontSize: '14px', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontWeight: '600', alignItems: 'center' }}>Extra {el.priceDos ? <><span style={{ padding: '4px 8px', backgroundColor: '#D3FFD7', margin: '4px 0 0 0', borderRadius: '12px', fontSize: '14px', color: '#2D6600', fontWeight: '700' }}>${PriceFormat({ price: el?.priceDos?.toString() })}<span style={{ fontSize: '12px', fontWeight: '400' }}> / 1gl</span></span></> : <span>Precio desconocido</span>}</p>
                  </div>
                  <div style={{ backgroundColor: '#f1f1f1', height: '1px', width: '100%', margin: '24px 0 16px 0' }} />
                </div>

              ))
              }
              <section style={{ display: 'flex', margin: '0 auto', marginBottom: '64px', maxWidth: '900px', gap: '8px', width: '90%', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center' }}>
                {tagsFix.map(tag => (
                  <h3 key={tag} style={{ fontSize: '14px', fontWeight: '500', padding: '4px 12px', border: '1px solid #c5c5c5', borderRadius: '16px', backgroundColor: 'white' }}>{tag}</h3>
                ))}
              </section>
            </div>
          </div>
        }
      </div>
    </div>
  )
}