import Icon, { IconCatalog } from "../../Icon/Icon";
import CalificacionWidget from "../CalificacionWidget";
import styles from '@/styles/ServiciosAutomotriz.module.css'



export default function WidgetMenu({data, onClick, handleChangeSection, mapSectionRef,refReseñas}) {
  
  return (
    <div style={{ width: '90%', border: '1px solid #EFEFEF', borderRadius: '8px', display: 'flex', flexDirection: 'row', padding: '10px', justifyContent: 'space-around', gap: '4px', backgroundColor:'white' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'center', alignItems: 'center', width:'33%' }}>
        <div onClick={()=> handleChangeSection({ref:mapSectionRef})} className={styles.btnMenuPerfil} >
          <Icon style={{color:'#5C5C5C'}} name={IconCatalog.compassOutline} />
        </div>
        <p style={{ fontSize: '12px', color:'#5C5C5C' }}>Mapa</p>
      </div>
      <CalificacionWidget onClick={()=>handleChangeSection({ref:refReseñas})} id={data?.id} ctdCalificaciones={data?.numerocalificacionesmaps} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'center', alignItems: 'center', width:'33%' }}>
        <a href={`tel:+57${data?.telefono}`} className={styles.btnMenuPerfil} >
          <Icon name={IconCatalog.callOutline} style={{color:'#5C5C5C'}} />
        </a>
        <p style={{ fontSize: '12px', color:'#5C5C5C' }}>Llamar</p>
      </div>
    </div>
  )
}