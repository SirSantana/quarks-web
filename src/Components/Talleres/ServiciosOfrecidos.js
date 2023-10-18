
import styles from '@/styles/ServiciosAutomotriz.module.css'

const categorias = [
  { nombre: 'Accesorios y Lujos', img: 'Accesorios', url: 'lujos', db: "Servicio de Lujos" },
  { nombre: 'Aire acondicionado', img: 'Refrigeracion', url: 'Aire acondicionado', db: 'Servicio de Aire acondicionado' },
  { nombre: 'Alineación y balanceo', img: 'Rueda', url: 'Alineación y balanceo', db: 'Alineación y balanceo' },
  { nombre: 'Baterias', img: 'Baterias', url: 'Baterias', db: 'Servicio de Baterias' },
  { nombre: 'Caja y transmisión', img: 'Caja y Transmision', url: 'Cajas', db: 'Servicio de Caja' },
  { nombre: 'Cambio de aceite', img: 'Filtros', url: 'Cambio de aceite', db: 'Cambio de Aceite' },
  { nombre: 'Clutch', img: 'Clutch', url: 'Clutch', db: 'Servicio de Clutch' },
  { nombre: 'Correas', img: 'Correas', url: 'Motor', db: 'Servicio de Motor' },
  { nombre: 'Direccion y suspension', img: 'Direccion y suspension', url: 'Suspensión', db: 'Servicio de Suspensión' },
  { nombre: 'Eléctricos', img: 'Electricos', url: 'Eléctricos', db: 'Servicio de Eléctricos' },
  { nombre: 'Frenos', img: 'Frenado', url: 'Frenos', db: 'Servicio de Frenos' },
  { nombre: 'Inyeccion', img: 'inyeccion', url: 'Inyeccion', db: 'Servicio Inyeccion' },
  { nombre: 'Latonería y pintura', img: 'Carroceria', url: 'Latoneria y pintura', db: 'Servicio de Latonería y pintura' },
  { nombre: 'Mecanico a domicilio', img: 'mecanico', url: 'Mecanico a Domicilio', db: '' },
  { nombre: 'Motor', img: 'Motor', url: 'Motor', db: 'Servicio de Motor' },
  { nombre: 'Peritaje', img: 'peritaje', url: 'Peritaje', db: 'Peritaje' },
  { nombre: 'Sincronización', img: 'Sincronizacion', url: 'Sincronizacion', db: 'Sincronizacion' },
  { nombre: 'Tecnico mecánica', img: 'tecnicomecanica', url: 'Tecnico mecanica', db: '' },
];
const categorias2 = [
  { nombre: 'Accesorios y Lujos', img: 'servicio-lujos', url: 'lujos', db: "Servicio de Lujos" },
  { nombre: 'Aire acondicionado', img: 'servicio-aire', url: 'Aire acondicionado', db: 'Servicio de Aire acondicionado' },
  { nombre: 'Alineación y balanceo', img: 'servicio-llantas', url: 'Alineación y balanceo', db: 'Alineación y balanceo' },
  { nombre: 'Baterias', img: 'servicio-bateria', url: 'bateria', db: 'Servicio de Baterias' },
  { nombre: 'Caja y transmisión', img: 'servicio-cajas', url: 'Cajas', db: 'Servicio de Cajas' },
  { nombre: 'Cambio de aceite', img: 'servicio-cambio-aceite', url: 'Cambio de aceite', db: 'Cambio de aceite' },
  { nombre: 'Clutch', img: 'servicio-clutch', url: 'Clutch', db: 'Servicio de Clutch' },
  { nombre: 'Correas', img: 'servicio-motor', url: 'Motor', db: 'Servicio de Motor' },
  { nombre: 'Direccion y suspension', img: 'servicio-suspension', url: 'Suspensión', db: 'Servicio de Suspensión' },
  { nombre: 'Eléctricos', img: 'servicio-electrico', url: 'Eléctricos', db: 'Servicio de Eléctricos' },
  { nombre: 'Electronica', img: 'servicio-electronico', url: 'Electronica', db: 'Servicio de Electronica' },
  { nombre: 'Frenos', img: 'servicio-frenos', url: 'Frenos', db: 'Servicio de Frenos' },
  { nombre: 'Inyeccion', img: 'servicio-inyeccion', url: 'Inyeccion', db: 'Servicio Inyeccion' },
  { nombre: 'Latonería y pintura', img: 'servicio-carroceria', url: 'Latoneria y pintura', db: 'Servicio de Latonería y pintura' },
  { nombre: 'Mecanico a domicilio', img: 'mecanico', url: 'Mecanico a Domicilio', db: 'Mecanico a Domicilio' },
  { nombre: 'Motor', img: 'servicio-motor', url: 'Motor', db: 'Servicio de Motor',  },
  { nombre: 'Peritaje', img: 'peritaje', url: 'Peritaje', db: 'Peritaje' },
  { nombre: 'Sincronización', img: 'Sincronizacion', url: 'Sincronizacion', db: 'Sincronizacion' },
  { nombre: 'Tecnico mecánica', img: 'tecnicomecanica', url: 'Tecnico mecanica', db: '' },
  { nombre: 'Taller Mecanico', img: 'taller-mecanico', url: '', db: 'Taller mecanico' },
  { nombre: 'Mecanica Basica', img: 'mecanica-basica', url: '', db: 'Mecanica Basica' },
  { nombre: 'Mecanica Avanzada', img: 'mecanica-avanzada', url: '', db: 'Mecanica Avanzada' },


];
export default function ServidosOfrecidos({ data }) {

  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600' }} className={styles.titleNegocio}>{data?.tipo !== 'Almacen' ?"Servicios Ofrecidos":"Repuestos Manejados"} </h2>
      <div style={{ backgroundColor: 'white', border: '1px solid #d6d6d6', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', boxSizing: 'border-box', gap: '20px', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px', justifyContent: 'space-between' }}>
        {data?.categorias.map(el => {
          const category = categorias2?.find(cat => cat.db == el)
          
          return (
            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems:'center' }}>
              <div style={{border:'1px solid #c5c5c5', borderRadius:'10px', width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                {category?.img ? <img src={`./${category?.img}.png`} style={{ width: '30px', height: '30px' }} /> : <ion-icon name="settings-outline" style={{ fontSize: '20px' }}></ion-icon>}
              </div>
              <p style={{ fontSize: '14px' }}>{data?.tipo === 'Almacen' ?category.nombre :el}</p>
            </div>
          )
        })}

      </div>
    </>
  )
}