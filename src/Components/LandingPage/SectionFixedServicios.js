import Link from "next/link";
import BuscadorBasico from "./BuscadorBasico";
import styles2 from '@/styles/Landing.module.css'
import TitleHomeAnimation from "./TitleHomeAnimation";
import Image from "next/image";
import SectionTagsSearch from "./SectionTagsSearch";

export default function SectionFixedServicios() {
  return (
    <section className={styles2.containerListTalleres}>
      <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '16px', margin: '0 auto' }}>
        <Link style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }} href={'/'}>
          {/* <Image alt={'Cotiza tus repuestos logo'} width={32} height={32} src={'/logoquarks200623.png'} /> */}
          <h3 style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none', color: '#373737', fontSize: '16px', fontWeight: '600' }} className={styles2.titleNav}>Quarks</h3>
        </Link>
        <nav style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          {/* <p style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>Servicios</p> */}
          <Link style={{ textDecoration: 'none', color: '#373737', fontSize: '12px', fontWeight: '600' }} href={'/signup'}>Tienes un Taller?</Link>
          {/* <p style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>Tienes un taller?</p> */}
        </nav>
      </div>
      <section style={{ display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: 'center', alignItems: 'center', margin: '0 auto', width: '100%', maxWidth: '800px', marginTop: '48px' }}>
        <div style={{ width: '40px', height: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', border: '1px solid #CFD5E1', borderRadius: '8px' }}>
          <img alt="Talleres de frenos" width="32" height="32" src="/servicio-frenos.webp" />
        </div>
        <div style={{ width: '40px', height: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', border: '1px solid #CFD5E1', borderRadius: '8px' }}>
          <img alt="Talleres de motor" width="32" height="32" src="/servicio-motor.webp" />
        </div>
        <div style={{ width: '40px', height: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', border: '1px solid #CFD5E1', borderRadius: '8px' }}>
          <img alt="Talleres de baterías" width="32" height="32" src="/servicio-bateria.webp" />
        </div>
        <div style={{ width: '40px', height: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', border: '1px solid #CFD5E1', borderRadius: '8px' }}>
          <img alt="Talleres de lujos" width="32" height="32" src="/servicio-lujos.webp" />
        </div>
      </section>
      <TitleHomeAnimation />
      <BuscadorBasico />
      <SectionTagsSearch/>
    </section>
  )
}