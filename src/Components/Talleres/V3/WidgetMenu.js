import Icon, { IconCatalog } from "../../Icon/Icon";
import CalificacionWidget from "../CalificacionWidget";
import styles from '@/styles/ServiciosAutomotriz.module.css'



export default function WidgetMenu({data, onClick, handleChangeSection, mapSectionRef,refReseñas, indicativo}) {
  const handlePhoneLinkClick = () => {
    const phone = `${indicativo ? indicativo : '+57'}${data?.telefono}`;
    if (navigator.userAgent.match(/(iPad|iPhone|iPod|Android)/i)) {
      window.location.href = `tel:${phone}`;
    } else {
      navigator.clipboard.writeText(phone)
        .then(() => {
          alert('El número de teléfono ha sido copiado al portapapeles.');
        })
        .catch((err) => {
          console.error('Error al copiar el número de teléfono:', err);
          // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario.
        });
    }
  };
  return (
    <div style={{ width: '90%', border: '1px solid #EFEFEF', borderRadius: '8px', display: 'flex', flexDirection: 'row', padding: '10px', justifyContent: 'space-around', gap: '4px', backgroundColor:'white', marginTop:'16px', maxWidth:'440px'}}>
      <div style={{flex:1, display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{backgroundColor:'#f3f3f3'}} onClick={()=> handleChangeSection({ref:mapSectionRef})} className={styles.btnMenuPerfil} >
          <Icon style={{color:'#5C5C5C'}} name={IconCatalog.compassOutline} />
        </div>
        <p style={{ fontSize: '12px', color:'#5C5C5C' }}>Mapa</p>
      </div>
      <CalificacionWidget onClick={()=>handleChangeSection({ref:refReseñas})} id={data?.id} ctdCalificaciones={data?.numerocalificacionesmaps} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', justifyContent: 'center', alignItems: 'center', flex:1 }}>
        <button style={{ backgroundColor:'#25d366'}} onClick={handlePhoneLinkClick} className={styles.btnMenuPerfil} >
          <Icon name={IconCatalog.callOutline} style={{color:'white'}} />
        </button>

        <p style={{ fontSize: '12px', color:'#5C5C5C' }}>Llamar</p>
      </div>
    </div>
  )
}