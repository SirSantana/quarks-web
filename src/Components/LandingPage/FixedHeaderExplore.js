
import Link from "next/link";
import styles2 from '@/styles/Landing.module.css';

export default function FixedHeaderExplore({ categoria, vehiculo, servicio, ciudad }) {

  return (
    <header className={styles2.containerListTalleres}>
      <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '16px', margin: '0 auto' }}>
        <Link style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }} href={'/'}>
          <h3 style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none', color: '#373737', fontSize: '16px', fontWeight: '600' }} className={styles2.titleNav}>Quarks</h3>
        </Link>
       
      </div>
      <div style={{ margin: '0 0 0px 0' }}>
        <h1 className={styles2.title2} >
          {categoria !== 'mecanicos'
            ? (
              <>
                Mejores <span style={{ color: '#007bff' }}>{categoria.charAt(0).toUpperCase() + categoria.slice(1)} </span> de <span style={{ color: '#007bff' }}>{servicio.charAt(0).toUpperCase() + servicio.slice(1).replaceAll('-', ' ')}</span>  en Bogotá
              </>
            ) : (
              <>
                Mecánicos a domicilio de <span style={{ color: '#007bff' }}>{servicio}</span> en Bogotá
              </>
            )
          }
        </h1>
      </div>
    </header>
  )
}

