
import { useRouter } from 'next/router';
import CategoriasSlider from './CategoriasSlider';
import styles from '@/styles/Landing.module.css'

export const categorias = [
  { nombre: 'Accesorios y Lujos', img: 'servicio-lujos', url: 'lujos', cantidad:9},
  { nombre: 'Aire acondicionado', img: 'servicio-aire-acondicionado', url: 'Aire acondicionado', cantidad:6 },
  { nombre: 'Alineación y balanceo', img: 'servicio-llantas', url: 'Alineación y balanceo', cantidad:5 },
  { nombre: 'Baterias', img: 'servicio-bateria', url: 'Baterias' , cantidad:10},
  { nombre: 'Caja y transmisión', img: 'servicio-cajas', url: 'Cajas', cantidad:9 },
  { nombre: 'Cambio de aceite', img: 'servicio-cambio-aceite', url: 'Cambio de aceite', cantidad:13 },
  { nombre: 'Clutch', img: 'servicio-clutch', url: 'Clutch', cantidad:11 },
  { nombre: 'Correas', img: 'Correas', url: 'Motor' , cantidad:8},
  { nombre: 'Direccion y suspension', img: 'servicio-suspension', url: 'Suspensión', cantidad:14 },
  { nombre: 'Eléctricos', img: 'servicio-electrico', url: 'Eléctricos', cantidad:4 },
  { nombre: 'Frenos', img: 'servicio-frenos', url: 'Frenos' , cantidad:12},
  { nombre: 'Inyeccion', img: 'servicio-inyeccion', url: 'Inyeccion', cantidad:7 },
  { nombre: 'Latonería y pintura', img: 'servicio-carroceria', url: 'Latoneria y pintura', cantidad:8 },
  { nombre: 'Mecanico a domicilio', img: 'mecanico', url: 'Mecanico a Domicilio', cantidad:3 },
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