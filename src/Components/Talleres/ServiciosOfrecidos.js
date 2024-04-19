
import styles from '@/styles/ServiciosAutomotriz.module.css'
import Icon, { IconCatalog } from '../Icon/Icon';
import SliderServiciosTaller from './SliderServiciosTaller';

export const categorias2 = [
  { nombre: 'Accesorios y Lujos', img: 'servicio-lujos', url: 'lujos', db: "Servicio de Accesorios y Lujos", descripcion:'Ofrecemos una amplia gama de accesorios y lujos para personalizar y mejorar el aspecto de tu vehículo. Desde adornos interiores hasta detalles exteriores, tenemos todo lo que necesitas para hacer que tu vehículo se destaque' },
  { nombre: 'Aire acondicionado', img: 'servicio-aire', url: 'Aire acondicionado', db: 'Servicio de Aire acondicionado', descripcion:'Nuestro servicio de aire acondicionado garantiza un ambiente fresco y cómodo dentro de tu vehículo en todo momento. Realizamos mantenimiento, reparaciones y recargas de refrigerante para asegurarnos de que tu aire acondicionado funcione de manera óptima' },
  { nombre: 'Alineación y balanceo', img: 'servicio-llantas', url: 'Alineación y balanceo', db: 'Alineación y balanceo', descripcion:' Mantén tu vehículo en la dirección correcta y con un manejo suave y seguro con nuestro servicio de alineación y balanceo. Nos aseguramos de que tus llantas estén correctamente alineadas y balanceadas para evitar el desgaste irregular y mejorar la estabilidad del vehículo.'},
  { nombre: 'Baterias', img: 'servicio-bateria', url: 'bateria', db: 'Servicio de Baterias', descripcion: 'Contamos con una amplia selección de baterías de alta calidad para satisfacer las necesidades de tu vehículo. Realizamos pruebas, mantenimiento y reemplazo de baterías para garantizar un arranque confiable en todo momento.'},
  { nombre: 'Caja y transmisión', img: 'servicio-cajas', url: 'Cajas', db: 'Servicio de Cajas', descripcion: 'Nuestro servicio de caja y transmisión se encarga de mantener en óptimas condiciones la caja de cambios y el sistema de transmisión de tu vehículo. Realizamos reparaciones, ajustes y cambios de fluidos para garantizar un funcionamiento suave y eficiente.'},
  { nombre: 'Cambio de aceite', img: 'servicio-cambio-aceite', url: 'Cambio de aceite', db: 'Cambio de Aceite', descripcion: 'Mantén el motor de tu vehículo en buen estado con nuestro servicio de cambio de aceite. Utilizamos productos de alta calidad y técnicas profesionales para garantizar una lubricación adecuada y prolongar la vida útil del motor.'},
  { nombre: 'Clutch', img: 'servicio-clutch', url: 'Clutch', db: 'Servicio de Clutch', descripcion: 'Nuestro servicio de clutch se encarga de mantener en buen estado el sistema de embrague de tu vehículo. Realizamos ajustes, reparaciones y reemplazos para garantizar un funcionamiento suave y eficiente en todo momento.'},
  { nombre: 'Correas', img: 'servicio-motor', url: 'Motor', db: 'Servicio de Correas', descripcion:'Las correas son componentes vitales del motor de tu vehículo y deben ser inspeccionadas y reemplazadas regularmente para evitar averías. En nuestro servicio de correas, nos encargamos de realizar inspecciones y reemplazos para garantizar un funcionamiento seguro y confiable del motor.' },
  { nombre: 'Direccion y suspension', img: 'servicio-suspension', url: 'Suspensión', db: 'Servicio de Suspensión', descripcion: 'Mantén un manejo suave y confortable con nuestro servicio de dirección y suspensión. Realizamos inspecciones, ajustes y reparaciones para garantizar un manejo seguro y estable en todo momento.'},
  { nombre: 'Eléctricos', img: 'servicio-electrico', url: 'Eléctricos', db: 'Servicio de Eléctricos' , descripcion:' Los sistemas eléctricos son fundamentales para el funcionamiento de tu vehículo. En nuestro servicio eléctrico, nos encargamos de diagnosticar, reparar y mantener todos los componentes eléctricos para garantizar un funcionamiento óptimo del vehículo.'},
  { nombre: 'Electronica', img: 'servicio-electronico', url: 'Electronica', db: 'Servicio de Electronica', descripcion:' En nuestro servicio de electrónica, nos encargamos de diagnosticar y reparar los sistemas electrónicos de tu vehículo. Desde problemas con el sistema de encendido hasta fallas en los sistemas de entretenimiento, estamos equipados para solucionar cualquier problema electrónico que pueda surgir.' },
  { nombre: 'Frenos', img: 'servicio-frenos', url: 'Frenos', db: 'Servicio de Frenos', descripcion:'La seguridad es nuestra prioridad, por eso ofrecemos un servicio completo de frenos. Realizamos inspecciones, ajustes y reemplazos de pastillas, discos y líquido de frenos para garantizar un frenado seguro y confiable en todo momento.' },
  { nombre: 'Inyeccion', img: 'servicio-inyeccion', url: 'Inyeccion', db: 'Servicio Inyeccion', descripcion:'Nuestro servicio de inyección se encarga de mantener en óptimas condiciones el sistema de inyección de combustible de tu vehículo. Realizamos limpiezas, calibraciones y reparaciones para garantizar un rendimiento eficiente y económico del motor.' },
  { nombre: 'Latonería y pintura', img: 'servicio-carroceria', url: 'Latoneria y pintura', db: 'Servicio de Latonería y pintura', descripcion:'Recupera el aspecto original de tu vehículo con nuestro servicio de latonería y pintura. Realizamos reparaciones de golpes, abolladuras y rayones, así como pintura completa y detallado para dejar tu vehículo como nuevo.' },
  { nombre: 'Mecanico a domicilio', img: 'mecanico', url: 'Mecanico a Domicilio', db: 'Mecanico a Domicilio', descripcion:'¿Necesitas un servicio de mecánica pero no puedes venir a nuestro taller? No hay problema, ofrecemos un servicio de mecánica a domicilio para brindarte la asistencia que necesitas dondequiera que estés.' },
  { nombre: 'Motor', img: 'servicio-motor', url: 'Motor', db: 'Servicio de Motor', descripcion:'El motor es el corazón de tu vehículo, por eso ofrecemos un servicio completo de motor. Realizamos reparaciones, reconstrucciones y mantenimiento preventivo para garantizar un funcionamiento suave y confiable del motor en todo momento.' },
  { nombre: 'Peritaje', img: 'peritaje', url: 'Peritaje', db: 'Peritaje', descripcion:'Si has sufrido un accidente o necesitas un peritaje para tu vehículo, nosotros estamos aquí para ayudarte. Realizamos peritajes profesionales para determinar el estado y el valor de tu vehículo de manera precisa y confiable.' },
  { nombre: 'Sincronización', img: 'Sincronizacion', url: 'Sincronizacion', db: 'Sincronizacion', descripcion:'Mantén el motor de tu vehículo en perfecta sincronización con nuestro servicio especializado. Realizamos ajustes y calibraciones para garantizar un funcionamiento suave y eficiente del motor.' },
  { nombre: 'Tecnico mecánica', img: 'tecnicomecanica', url: 'Tecnico mecanica', db: ' Ofrecemos servicios de revisión y certificación técnico mecánica para garantizar que tu vehículo cumpla con los estándares de seguridad y emisiones establecidos por la ley.' },
  { nombre: 'Taller Mecanico', img: 'taller-mecanico', url: '', db: 'Taller mecanico' },
  { nombre: 'Mecanica Basica', img: 'mecanica-basica', url: '', db: 'Mecanica Basica' },
  { nombre: 'Mecanica Avanzada', img: 'mecanica-avanzada', url: '', db: 'Mecanica Avanzada' },
];
export default function ServidosOfrecidos({ data, }) {
  let { conImagen, sinImagen } = data?.categorias?.reduce((result, el) => {
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


