import { timeSince } from "@/utils/dateEs";
import { categorias2 } from "./ServiciosOfrecidos";
import Icon, { IconCatalog } from "../Icon/Icon";
import { categorias } from "@/src/data/Categorias";



export default function Revision({ data }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
      <p style={{ fontSize: '16px', color:'#182537', fontWeight: '500' }}>{data?.marca} {data?.referencia}</p>
      <p style={{ fontSize: '12px', lineHeight: '22px', color: '#6C788E' }}>
          hace · {timeSince(data?.fecha)}
        </p>
      </div>
      
      <div style={{ width: 'fitContent', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '8px' }}>
        {data?.servicios?.map(el => {
          let image = categorias.find(category => category.nombre == el)
          return (
            <div key={el} style={{ borderRadius: '4px', padding: '4px 12px', border: '1px solid #c5c5c5', width: 'fitContent', display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
              <img style={{ width: '20px', height: '20px', borderRadius: '50%' }} src={`../${image?.img}`} alt={`Servicio de ${el}`} />
              <p style={{ fontSize: '12px', color: '#5c5c5c', fontWeight: '500' }}>
                {el}
              </p>
            </div>
          )
        })}
      </div>
      <div>
        <p style={{ fontSize: '14px', }}>
          {data?.descripcion}
        </p>
      </div>
    </div>
  )
}