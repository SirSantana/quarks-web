
import styles from '@/styles/Main.module.css'
import Link from 'next/link';

const categorias = [
  { imagen: 'Clutch', servicio: 'Servicio de Clutch' },
  { imagen: 'Caja y Transmision', servicio: 'Servicio de Cajas' },
  { imagen: 'Carroceria', servicio: 'Servicio de Latonería y pintura' },
  { imagen: 'Direccion y suspension', servicio: 'Servicio de Amortiguadores' },
  { imagen: 'Filtros', servicio: 'Cambio de aceite' },
  { imagen: 'Electricos', servicio: 'Servicio de Eléctricos' },
  { imagen: 'Frenado', servicio: 'Servicio de Frenos' },
  { imagen: 'Motor', servicio: 'Servicio de Motor' }
];
export default function ServiciosPopulares() {
  return (
    <div className={styles.containerServicios}>
      <h2 className={styles.titleSections}>Servicios Populares</h2>

      <div className={styles.containerPopulares}>
        {categorias.map((el, index) => {
          const className = `popular${index + 1}`;
          return (
            <Link style={{textDecoration:'none', color:'#373737'}} href={`/servicios-automotriz/${el?.servicio}-Bogota, Colombia`} key={index} className={styles[className]}>
              <img src={`./${el.imagen}.png`} style={{ height: '40px', width: '40px' }} />
              <div>
                <h6 style={{ fontSize: '14px', fontWeight: '700' }}>{el.servicio}</h6>
                <p style={{ fontSize: '12px' }}>Ver negocios</p>
              </div>
            </Link>
          )
        })
        }


      </div>

    </div>
  )
}