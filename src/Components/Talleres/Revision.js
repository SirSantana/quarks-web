import { timeSince } from "@/utils/dateEs";
import { categorias2 } from "./ServiciosOfrecidos";
import Icon, { IconCatalog } from "../Icon/Icon";



export default function Revision({ data }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>

      <p style={{ fontSize: '16px', fontWeight: '600' }}>{data?.marca} {data?.referencia}</p>
      <div style={{ width: 'fitContent', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '8px' }}>
        {data?.servicios?.map(el => {
          let image = categorias2.find(category => category.nombre == el)
          return (
            <div style={{ borderRadius: '4px', padding: '4px 12px', border: '1px solid #c5c5c5', width: 'fitContent', display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
              <img style={{ width: '20px', height: '20px', borderRadius: '50%' }} src={`../${image?.img}.png`} alt={`Servicio de ${el}`} />
              <p style={{ fontSize: '12px', color: '#5c5c5c', fontWeight: '500' }}>
                {el}
              </p>
            </div>
          )
        })}
      </div>
      <div>
        <p style={{ fontSize: '14px', fontWeight: '600' }}>
          Problema
        </p>
        <p style={{ fontSize: '14px', }}>
          {data?.descripcion}
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <p style={{ fontSize: '12px', lineHeight: '22px', color: '#969595' }}>
          hace · {timeSince(data?.fecha)}
        </p>
        {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', }}>
          Respondido
        </div> */}
        <div
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: '#25d366', // Color de fondo de WhatsApp
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para resaltar el botón
            transition: 'background-color 0.3s ease', // Agregar transición para suavizar el cambio de color al pasar el mouse
          }}
        >
          <Icon name={IconCatalog.logoWhatsapp} style={{ fontSize: '16px', color: 'white' }} />
        </div>

      </div>
    </div>
  )
}