import { timeSince } from "@/utils/dateEs";
import { categorias2 } from "./ServiciosOfrecidos";
import styles from '@/styles/Components.module.css'
import Icon, { IconCatalog } from "../Icon/Icon";

const Star = ({ index, stars, tamaño, }) => {
  return (
    // <img src={stars < index + 1 ? `../../star-outline.svg` : `../../star.svg`} style={{ height: `${tamaño}px`, width: `${tamaño}px` }} />
    <Icon size='sm' name={IconCatalog.star} style={{ color: stars < index + 1 ? '#c5c5c5' : '#FBBC04' }} />

  )
}
let estrellas = [1, 2, 3, 4, 5]


export default function Reseña({ reseña }) {
  return (
    <div className={styles.containerReseña}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
          <img style={{ width: '48px', height: '48px', borderRadius: '50%' }} src={reseña?.foto} alt={`Reseña de ${reseña?.nombre}`} />
          <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <p style={{ fontSize: '16px', fontWeight: '600' }}>{reseña?.nombre}</p>
            {reseña?.marca && (
              <p style={{ fontSize: '14px', fontWeight: '400', color: '#5c5c5c' }}>{reseña?.marca} · {reseña?.referencia}</p>
            )}
          </div>
          {!reseña?.email && !reseña?.pagina && <Icon name={IconCatalog.logoGoogle} style={{ color: '#EA4335' }} size="md" />}
          {reseña?.pagina === 'Facebook' && <Icon name={IconCatalog.logoFacebook} style={{ color: '#0080FF' }} size="md" />}

        </div>
        <p style={{ fontSize: '16px', lineHeight: '22px', }}>
          {reseña?.descripcion}
        </p>
        <div style={{ width: 'fitContent', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '8px' }}>
          {reseña?.servicios?.map(el => {
            let image = categorias2.find(category => category.nombre == el)
            return (
              <div style={{ borderRadius: '4px', padding: '4px 12px', border: '1px solid #c5c5c5', width: 'fitContent', display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
                <img style={{ width: '20px', height: '20px', borderRadius: '50%' }} src={`../${image?.img}.png`} alt={`Servicio de ${el}`} />
                <p style={{ fontSize: '12px', color: '#5c5c5c', fontWeight:'500' }}>
                  {el}
                </p>
              </div>

            )
          })}

        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '12px', lineHeight: '22px', color: '#969595' }}>
            hace · {timeSince(reseña?.fecha)}
          </p>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', }}>
            {estrellas.map((el, index) => (
              <Star key={el} index={index} stars={Math.round(reseña?.calificacion)} tamaño={'16'} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}