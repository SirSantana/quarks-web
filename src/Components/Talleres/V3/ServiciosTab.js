import Image from "next/image";
import { categorias2 } from "../ServiciosOfrecidos";
import Icon, { IconCatalog } from "../../Icon/Icon";
import { useState } from "react";
import styles from '@/styles/Faq.module.css'
import { GET_WHATSAPP_NEGOCIO } from "@/graphql/queries";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";


export default function ServiciosTab({ categorias, tipo, id }) {
  const [visibleOtrosServicios, setVisibleOtrosServicios] = useState(true)
  const result = useQuery(GET_WHATSAPP_NEGOCIO, { variables: { id: id } })
  const router = useRouter()
  let { conImagen, sinImagen } = categorias?.reduce((result, el) => {
    const categoriaActual = categorias2.find(cat => el.toLowerCase() === cat.db.toLowerCase());
    if (categoriaActual) {
      result.conImagen.push(categoriaActual);
    } else {
      result.sinImagen.push(el);
    }
    return result;
  }, { conImagen: [], sinImagen: [] })
  const whatsapp = result?.data?.getWhatsappNegocio

  const handleSolicitarServicio = ({ servicio }) => {
    const message = `
    ¡Hola! Estoy interesado en sus servicios.
        🛠️  *Servicio:* ${servicio} 
        🚗  *Marca del Vehículo:* ...
    Perfil del Taller: https://www.quarks.com.co/${router.query?.id}
    Quedo atento a tu pronta respuesta. ¡Gracias! 👍`;
    let url = `https://api.whatsapp.com/send?phone=57${whatsapp?.replace(/\s/g, '')}`;

    url += `&text=${encodeURIComponent(message)}&app_absent=0`;
    window.open(url);
  }
  return (
    <>
      <h2 style={{ fontSize: '18px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '16px' }} >{tipo !== 'Almacen' ? "Servicios Ofrecidos" : "Repuestos Manejados"} </h2>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', gap: '16px', justifyContent: 'space-between' }}>
        {conImagen.map(servicio => (
          <div onClick={() => handleSolicitarServicio({ servicio: servicio.nombre })} className={styles.containerServiceTab} >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#373737' }}>{servicio.nombre}</h3>
                {servicio.descripcion && <p style={{ fontSize: '12px', color: '#5C5C5C', maxWidth: '90%', lineHeight:'1.5' }}>{servicio.descripcion?.slice(0, 60) + '...'}</p>}
                {/* <p style={{ fontSize: '14px', fontWeight: '600' }}>Desde $-</p> */}
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
            {/* <div style={{ width: '90%', margin: '0 auto', backgroundColor: '#EFEFEF', height: '1px' }} /> */}
          </div>
        ))}
      </div>
      {sinImagen.length > 0 &&
        <>
          <div onClick={() => setVisibleOtrosServicios(!visibleOtrosServicios)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between', margin: '32px 0 16px 0' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Otros servicios </h2>
            <Icon  name={visibleOtrosServicios ? IconCatalog.chevronUpOutline : IconCatalog.chevronDownOutline} />
          </div>
          <div style={{ display: 'flex',  flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            {visibleOtrosServicios &&
              sinImagen?.map(el => (
                <div key={el} style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', backgroundColor: '#f3f3f3', borderRadius: '8px', padding: '4px 12px',  }}>
                  <p style={{ margin: 0, fontSize: '14px', color: '#464646', fontWeight: '500' }}>{el}</p>
                </div>
              ))}
          </div>

          {/* <div style={{ flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {sinImagen?.map(category => (
              <div key={category} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '0.5px', height: '100%', backgroundColor: '#c5c5c5', alignSelf: 'center' }}></div>
                </div>
                <p style={{ fontSize: '14px', flex: 1 }}>{category}</p>
              </div>
            )
            )}
          </div > */}

        </>
      }
    </>
  )
}