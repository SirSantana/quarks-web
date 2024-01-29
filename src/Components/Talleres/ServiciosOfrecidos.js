
import styles from '@/styles/ServiciosAutomotriz.module.css'
import Image from 'next/image';
import Icon, { IconCatalog } from '../Icon/Icon';

export const categorias2 = [
  { nombre: 'Accesorios y Lujos', img: 'servicio-lujos', url: 'lujos', db: "Servicio de Accesorios y Lujos" },
  { nombre: 'Aire acondicionado', img: 'servicio-aire', url: 'Aire acondicionado', db: 'Servicio de Aire acondicionado' },
  { nombre: 'Alineación y balanceo', img: 'servicio-llantas', url: 'Alineación y balanceo', db: 'Alineación y balanceo' },
  { nombre: 'Baterias', img: 'servicio-bateria', url: 'bateria', db: 'Servicio de Baterias' },
  { nombre: 'Caja y transmisión', img: 'servicio-cajas', url: 'Cajas', db: 'Servicio de Cajas' },
  { nombre: 'Cambio de aceite', img: 'servicio-cambio-aceite', url: 'Cambio de aceite', db: 'Cambio de Aceite' },
  { nombre: 'Clutch', img: 'servicio-clutch', url: 'Clutch', db: 'Servicio de Clutch' },
  { nombre: 'Correas', img: 'servicio-motor', url: 'Motor', db: 'Servicio de Correas' },
  { nombre: 'Direccion y suspension', img: 'servicio-suspension', url: 'Suspensión', db: 'Servicio de Suspensión' },
  { nombre: 'Eléctricos', img: 'servicio-electrico', url: 'Eléctricos', db: 'Servicio de Eléctricos' },
  { nombre: 'Electronica', img: 'servicio-electronico', url: 'Electronica', db: 'Servicio de Electronica' },
  { nombre: 'Frenos', img: 'servicio-frenos', url: 'Frenos', db: 'Servicio de Frenos' },
  { nombre: 'Inyeccion', img: 'servicio-inyeccion', url: 'Inyeccion', db: 'Servicio Inyeccion' },
  { nombre: 'Latonería y pintura', img: 'servicio-carroceria', url: 'Latoneria y pintura', db: 'Servicio de Latonería y pintura' },
  { nombre: 'Mecanico a domicilio', img: 'mecanico', url: 'Mecanico a Domicilio', db: 'Mecanico a Domicilio' },
  { nombre: 'Motor', img: 'servicio-motor', url: 'Motor', db: 'Servicio de Motor', },
  { nombre: 'Peritaje', img: 'peritaje', url: 'Peritaje', db: 'Peritaje' },
  { nombre: 'Sincronización', img: 'Sincronizacion', url: 'Sincronizacion', db: 'Sincronizacion' },
  { nombre: 'Tecnico mecánica', img: 'tecnicomecanica', url: 'Tecnico mecanica', db: '' },
  { nombre: 'Taller Mecanico', img: 'taller-mecanico', url: '', db: 'Taller mecanico' },
  { nombre: 'Mecanica Basica', img: 'mecanica-basica', url: '', db: 'Mecanica Basica' },
  { nombre: 'Mecanica Avanzada', img: 'mecanica-avanzada', url: '', db: 'Mecanica Avanzada' },
];
export default function ServidosOfrecidos({ data,  }) {

  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600',display:'flex', gap:'16px' }} className={styles.titleNegocio}><Icon size='lg' name={IconCatalog.colorWandOutline}/> {data?.tipo !== 'Almacen' ? "Servicios Ofrecidos" : "Repuestos Manejados"} </h2>
      <div className={styles.containerHeaderCalendario} style={{ flexDirection: 'column', alignItems: 'center', gap:0}}>
        {data?.categorias.map(el => {
          const category = categorias2?.find(cat => cat.db.toLocaleLowerCase() == el.toLocaleLowerCase())
          return (
            <div key={el} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
              {category?.img
                ?
                <div style={{ borderRadius: '10px', width: '40px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center',  }}>
                  <Image width={30} height={30} alt={`Taller de ${category ? category?.nombre : el} de autos`} src={`/${category?.img}.png`}/>
                </div>
                :
                <div style={{ position: 'relative', width: '40px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '0.5px', height: '100%', backgroundColor: '#c5c5c5', alignSelf: 'center' }}></div>
                </div>
              }
              
              <p style={{ fontSize: '14px', flex: 1 }}>{category ? category?.nombre : el}</p>
            </div>
          )
        })}
      </div >
    </>
  )
}


