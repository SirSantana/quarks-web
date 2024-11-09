
import Link from "next/link";
import styles2 from '@/styles/Landing.module.css';

export default function FixedHeaderExplore({ categoria, vehiculo, servicio, ciudad }) {

  return (
    <header className={styles2.containerListTalleres}>
      <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '16px', margin: '0 auto' }}>
        <Link style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }} href={'/'}>
          <h3 style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none', color: '#373737', fontSize: '16px', fontWeight: '600' }} className={styles2.titleNav}>Quarks</h3>
        </Link>
        <nav style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <Link style={{ textDecoration: 'none', color: '#373737', fontSize: '12px', fontWeight: '600' }} href={'/signup'}>Tienes un Taller?</Link>
        </nav>
      </div>
      {/* <section style={{ display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'center', alignItems: 'center', margin: '0 auto', width: '100%', maxWidth: '800px', marginTop: '48px' }}>
        <div style={{ width: '40px', height: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', border: '1px solid #CFD5E1', borderRadius: '8px' }}>
          <Image alt={'Talleres de frenos'} width={32} height={32} src={'/servicio-frenos.png'} />
        </div>
        <div style={{ width: '40px', height: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', border: '1px solid #CFD5E1', borderRadius: '8px' }}>
          <Image alt={'Talleres de motor'} width={32} height={32} src={'/servicio-motor.png'} />
        </div>
        <div style={{ width: '40px', height: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', border: '1px solid #CFD5E1', borderRadius: '8px' }}>
          <Image alt={'Talleres de baterias'} width={32} height={32} src={'/servicio-bateria.png'} />
        </div>
        <div style={{ width: '40px', height: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', border: '1px solid #CFD5E1', borderRadius: '8px' }}>
          <Image alt={'Talleres de lujos'} width={32} height={32} src={'/servicio-lujos.png'} />
        </div>
      </section> */}
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

// Esto se ejecuta en el servidor antes de que la página se renderice
