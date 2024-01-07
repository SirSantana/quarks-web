
import { useRouter } from 'next/router';
import CategoriasSlider from './CategoriasSlider';
import styles from '@/styles/Landing.module.css'

export const categorias = [
  { nombre: 'Accesorios y Lujos', img: 'servicio-lujos', url: 'lujos',},
  { nombre: 'Aire acondicionado', img: 'servicio-aire-acondicionado', url: 'Aire acondicionado' },
  { nombre: 'Alineación y balanceo', img: 'servicio-llantas', url: 'Alineación y balanceo' },
  { nombre: 'Baterias', img: 'servicio-bateria', url: 'Baterias' },
  { nombre: 'Caja y transmisión', img: 'servicio-cajas', url: 'Cajas' },
  { nombre: 'Cambio de aceite', img: 'servicio-cambio-aceite', url: 'Cambio de aceite' },
  { nombre: 'Clutch', img: 'servicio-clutch', url: 'Clutch' },
  { nombre: 'Correas', img: 'Correas', url: 'Motor' },
  { nombre: 'Direccion y suspension', img: 'servicio-suspension', url: 'Suspensión' },
  { nombre: 'Eléctricos', img: 'servicio-electrico', url: 'Eléctricos' },
  { nombre: 'Frenos', img: 'servicio-frenos', url: 'Frenos' },
  { nombre: 'Inyeccion', img: 'servicio-inyeccion', url: 'Inyeccion' },
  { nombre: 'Latonería y pintura', img: 'servicio-carroceria', url: 'Latoneria y pintura' },
  { nombre: 'Mecanico a domicilio', img: 'mecanico', url: 'Mecanico a Domicilio' },
  { nombre: 'Motor', img: 'servicio-motor', url: 'Motor' },
  { nombre: 'Peritaje', img: 'peritaje', url: 'Peritaje' },
  { nombre: 'Sincronización', img: 'mecanica-basica', url: 'Sincronizacion' },
  { nombre: 'Tecnico mecánica', img: 'mecanica-avanzada', url: 'Tecnico mecanica' },
];
export default function SliderTiposTalleres({ quantity, mode }) {
  const router = useRouter()

  return (
    <section className={styles.sectionSliderShow} style={{width:router?.pathname === '/'?'100%': '95%',marginTop:router?.pathname === '/'?'16px': '90px'}}>
      <CategoriasSlider categorias={categorias} mode={mode}/>
    </section>


  )
}