
import { useRouter } from 'next/router';
import CategoriasSlider from './CategoriasSlider';
import styles from '@/styles/Landing.module.css'

export const categorias = [
  { nombre: 'Accesorios y Lujos', img: 'servicio-lujos', url: 'lujos', cantidad:9, },
  { nombre: 'Aire acondicionado', img: 'servicio-aire-acondicionado', url: 'Aire acondicionado', cantidad:6, tags:['ac taller automotriz', 'taller aire acondicionado coche','taller mecánico de aire acondicionado','talleres reparacion aire acondicionado coches','taller especializado aire acondicionado coche','taller de ac automotriz', 'taller mecanico aire acondicionado', 'talleres de aire acondicionado para carros', 'taller especializado en aire acondicionado coche'] },
  { nombre: 'Alineación y balanceo', img: 'servicio-llantas', url: 'Alineación y balanceo', cantidad:5 },
  { nombre: 'Baterias', img: 'servicio-bateria', url: 'Baterias' , cantidad:10},
  { nombre: 'Caja y transmisión', img: 'servicio-cajas', url: 'Cajas', cantidad:9 },
  { nombre: 'Cambio de aceite', img: 'servicio-cambio-aceite', url: 'Cambio de aceite', cantidad:13, tags:['taller mecanico cambio de aceite'] },
  { nombre: 'Clutch', img: 'servicio-clutch', url: 'Clutch', cantidad:11, tags:['taller cambio embrague', 'taller cambio de embrague', 'taller de reparación de embrague']},
  { nombre: 'Correas', img: 'Correas', url: 'Motor' , cantidad:8},
  { nombre: 'Direccion y suspension', img: 'servicio-suspension', url: 'Suspensión', cantidad:14, tags:['taller suspensión automotriz','taller de suspensión automotriz']},
  { nombre: 'Eléctricos', img: 'servicio-electrico', url: 'Eléctricos', cantidad:4, tags:['taller electrico automotriz','electricidad coches talleres','taller de electronica automotriz','taller mecanico de electricidad automovil','talleres electricidad automovil','taller electromecanico cerca de mi','taller de electromecanica','taller electronica automotriz', 'taller de electricidad automotriz','taller electrico de carros','talleres de electricidad de coches', 'taller electromecanico automotriz', 'taller mecánico electrico cerca de mi', 'taller electricidad coche', 'taller mecanico electrico', 'taller electronica coche', 'taller de electricidad de autos', 'taller mecanico electrico automotriz','taller de electricidad del automóvil'] },
  { nombre: 'Frenos', img: 'servicio-frenos', url: 'Frenos' , cantidad:12},
  { nombre: 'Inyeccion', img: 'servicio-inyeccion', url: 'Inyeccion', cantidad:7 },
  { nombre: 'Latonería y pintura', img: 'servicio-carroceria', url: 'Latoneria y pintura', cantidad:8, tags:['talleres de pintura de coches','mecanico chapa y pintura', 'pintura de taller automotriz','pintura taller mecanico'] },
  { nombre: 'Mecanico a domicilio', img: 'mecanico', url: 'Mecanico a Domicilio', cantidad:3, tags:['buen mecanico cerca de mi','buenos mecanicos', 'taller mecanico a domicilio cerca de mi', 'un mecanico cerca de mi','mecanico cerca de mi ubicacion']},
  { nombre: 'Motor', img: 'servicio-motor', url: 'Motor', cantidad:12 },
  { nombre: 'Peritaje', img: 'peritaje', url: 'Peritaje' , cantidad:3},
  { nombre: 'Sincronización', img: 'mecanica-basica', url: 'Sincronizacion' , cantidad:7},
  { nombre: 'Tecnico mecánica', img: 'mecanica-avanzada', url: 'Tecnico mecanica', cantidad:4 },
];
export default function SliderTiposTalleres({ quantity, mode }) {
  const router = useRouter()

  return (
    <nav className={styles.sectionSliderShow} style={{width:'100%',marginTop:'16px'}}>
      <CategoriasSlider categorias={categorias} mode={mode}/>
    </nav>


  )
}