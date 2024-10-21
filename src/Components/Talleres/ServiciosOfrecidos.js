
import styles from '@/styles/ServiciosAutomotriz.module.css'
import Icon, { IconCatalog } from '../Icon/Icon';
import SliderServiciosTaller from './SliderServiciosTaller';
import { categorias } from '@/src/data/Categorias';

export default function ServidosOfrecidos({ data, }) {
  let { conImagen, sinImagen } = data?.categorias?.reduce((result, el) => {
    const categoriaActual = categorias.find(cat => el.toLowerCase() === cat.db.toLowerCase());
    if (categoriaActual) {
      result.conImagen.push(categoriaActual);
    } else {
      result.sinImagen.push(el);
    }
    return result;
  }, { conImagen: [], sinImagen: [] })
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600', display: 'flex', gap: '16px' }} className={styles.titleNegocio}><Icon size='lg' name={IconCatalog.colorWandOutline} /> {data?.tipo !== 'Almacen' ? "Servicios Ofrecidos" : "Repuestos Manejados"} </h2>
      <SliderServiciosTaller categorias={conImagen} id={data?.id}/>
      {sinImagen.length>0 &&
        <>
          <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600', display: 'flex', gap: '16px' }} className={styles.titleNegocio}><Icon size='lg' name={IconCatalog.colorWandOutline} />Otros servicios </h2>
          <div className={styles.containerHeaderCalendario} style={{ flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {sinImagen?.map(category => (
              <div key={category} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '0.5px', height: '100%', backgroundColor: '#c5c5c5', alignSelf: 'center' }}></div>
                </div>
                <p style={{ fontSize: '14px', flex: 1 }}>{category}</p>
              </div>
            )
            )}
          </div >
        </>
      }
    </>
  )
}


