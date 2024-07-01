import styles2 from '@/styles/Landing.module.css'
import talleres from '@/pages/servicios-automotriz/talleres.json';
import CardNewTaller from "./CardNewTaller";
import Icon, { IconCatalog } from "../Icon/Icon";
import SectionFixedServicios from "./SectionFixedServicios";


export default function BasicHome() {
 
  
  return (
    <>
      <SectionFixedServicios home={true}/>
      
      <section style={{paddingTop:'48px'}} className={styles2.containerListTalleres} >
        <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <p>Se encontraron +100 talleres mecanicos cerca a mi en Bogota</p>
          <div>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '8px 12px', width: 'fit-content', alignItems: 'center', gap: '8px', border: '1px solid #D5D5D5', borderRadius: '4px' }}>
              <Icon name={IconCatalog.optionsOutline} />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Filtrar</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start', justifyContent: 'space-between' }} >
          {talleres.talleres.slice(0, 12).reverse().map((taller, index) => (
            <CardNewTaller key={taller.nombre} taller={taller} />
          ))}
        </div>
      </section>
    </>

  )
}