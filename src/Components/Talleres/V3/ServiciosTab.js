import Image from "next/image";
import { categorias2 } from "../ServiciosOfrecidos";
import Icon, { IconCatalog } from "../../Icon/Icon";
import { useState } from "react";


export default function ServiciosTab({ categorias, tipo }) {
  const [visibleOtrosServicios, setVisibleOtrosServicios] = useState(false)
  let { conImagen, sinImagen } = categorias?.reduce((result, el) => {
    const categoriaActual = categorias2.find(cat => el.toLowerCase() === cat.db.toLowerCase());
    if (categoriaActual) {
      result.conImagen.push(categoriaActual);
    } else {
      result.sinImagen.push(el);
    }
    return result;
  }, { conImagen: [], sinImagen: [] })

  return (
    <>
      <h2 style={{ fontSize: '18px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '16px' }} >{tipo !== 'Almacen' ? "Servicios Ofrecidos" : "Repuestos Manejados"} </h2>
      {conImagen.map(servicio => (
        <>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '16px 0' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '400', color: '#373737' }}>{servicio.nombre}</h3>
              <p style={{ fontSize: '12px', color: '#5C5C5C', maxWidth: '90%' }}>{servicio.descripcion?.slice(0, 60) + '...'}</p>
              <p style={{ fontSize: '14px', fontWeight: '600' }}>Desde $-</p>
            </div>
            <Image
              src={`/${servicio.img}.png`}
              width={80}
              height={80}
              style={{
                width: '80px',
              }}
              alt={`Talleres de ${servicio.nombre} cerca a mi en Bogotá`}
            />
          </div>
          <div style={{ width: '90%', margin: '0 auto', backgroundColor: '#EFEFEF', height: '1px' }} />
        </>
      ))}
      {sinImagen.length > 0 &&
        <>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', margin: '32px 0 16px 0' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Otros servicios </h2>
            <Icon onClick={() => setVisibleOtrosServicios(!visibleOtrosServicios)} name={visibleOtrosServicios?IconCatalog.chevronUpOutline:IconCatalog.chevronDownOutline} />
          </div>
          {visibleOtrosServicios &&
            <div style={{ flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              {sinImagen?.map(category => (
                <div key={category} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '0.5px', height: '100%', backgroundColor: '#c5c5c5', alignSelf: 'center' }}></div>
                  </div>
                  <p style={{ fontSize: '14px', flex: 1 }}>{category}</p>
                </div>
              )
              )}
            </div >}
        </>
      }
    </>
  )
}