
import { useRouter } from 'next/router';
import CategoriasSlider from './CategoriasSlider';

const categorias = [
  { nombre: 'Accesorios y Lujos', img: 'Accesorios', url: 'lujos' },
  { nombre: 'Aire acondicionado', img: 'Refrigeracion', url: 'Aire acondicionado' },
  { nombre: 'Alineación y balanceo', img: 'Rueda', url: 'Alineación y balanceo' },
  { nombre: 'Baterias', img: 'Baterias', url: 'Baterias' },
  { nombre: 'Caja y transmisión', img: 'Caja y Transmision', url: 'Cajas' },
  { nombre: 'Cambio de aceite', img: 'Filtros', url: 'Cambio de aceite' },
  { nombre: 'Clutch', img: 'Clutch', url: 'Clutch' },
  { nombre: 'Correas', img: 'Correas', url: 'Motor' },
  { nombre: 'Direccion y suspension', img: 'Direccion y suspension', url: 'Suspensión' },
  { nombre: 'Eléctricos', img: 'Electricos', url: 'Eléctricos' },
  { nombre: 'Frenos', img: 'Frenado', url: 'Frenos' },
  { nombre: 'Inyeccion', img: 'inyeccion', url: 'Inyeccion' },
  { nombre: 'Latonería y pintura', img: 'Carroceria', url: 'Latoneria y pintura' },
  { nombre: 'Mecanico a domicilio', img: 'mecanico', url: 'Mecanico a Domicilio' },
  { nombre: 'Motor', img: 'Motor', url: 'Motor' },
  { nombre: 'Peritaje', img: 'peritaje', url: 'Peritaje' },
  { nombre: 'Sincronización', img: 'Sincronizacion', url: 'Sincronizacion' },
  { nombre: 'Tecnico mecánica', img: 'tecnicomecanica', url: 'Tecnico mecanica' },
];
export default function SliderTiposTalleres({ quantity }) {
  const router = useRouter()

  return (
    <div style={{ width:router?.pathname === '/'?'100%': '95%',padding:'0',marginRight:' auto',marginLeft:'auto', marginTop:router?.pathname === '/'?'16px': '90px'}}>
      <CategoriasSlider categorias={categorias} />
    </div>


  )
}