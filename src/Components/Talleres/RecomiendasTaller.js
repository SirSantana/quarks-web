import Divider from "../Box/Divider";
import Icon, { IconCatalog } from "../Icon/Icon";
import styles from '@/styles/ServiciosAutomotriz.module.css'



export default function RecomiendasTaller({onClick, nombre}) {
  return (
    <div onClick={onClick} className={styles.containerHeaderCalendario} style={{ flexDirection: 'row', backgroundColor: '#FFFCE4', alignItems: 'center', gap: '16px', borderColor: '#FBBC04' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', }}>
        <Icon size='sm' name={IconCatalog.star} style={{ color: '#FBBC04', fontSize: '24px' }} />
        <Divider backgroundColor={'#FBBC04'} />
        <div style={{ display: 'flex', flexDirection: 'column', }}>
          <p style={{ fontSize: '16px', fontWeight: '600' }}>Recomiendas a {nombre}?</p>
          <p style={{ fontSize: '12px', fontWeight: '400' }}>Comparte tu experiencia con la comunidad</p>
        </div>
      </div>
    </div>
  )
}