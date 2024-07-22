import Link from "next/link";
import BuscadorBasico from "./BuscadorBasico";
import Image from "next/image";
import Text, { TextAlignment, TextAs, TextWeight } from "../Text/Text";
import styles2 from '@/styles/Landing.module.css'
import { useRouter } from "next/router";



export default function SectionFixedServicios({ home = false }) {
  const router = useRouter()
  console.log(router.query.id)
  return (
    <section  className={styles2.containerListTalleres}>
      <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '16px', margin: '0 auto' }}>
        <Link style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }} href={'/'}>
          <Image alt={'Cotiza tus repuestos logo'} width={32} height={32} src={'/logoquarks200623.png'} />
          <h3 style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none', color: '#373737', fontSize: '16px', fontWeight: '600' }}>Quarks</h3>
        </Link>
        <nav style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          {/* <p style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>Servicios</p> */}
          <Link style={{ textDecoration: 'none', color: '#373737', fontSize: '12px', fontWeight: '600' }} href={'/signup'}>Tienes un Taller?</Link>
          {/* <p style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>Tienes un taller?</p> */}
        </nav>
      </div>
      {!home && <BuscadorBasico />}

      <div style={{ margin: '32px 0' }}>
        <h1 className={styles2.title2} style={{ maxWidth: '700px', lineHeight: '1.2', margin: '0 auto', fontWeight: '600', textAlign: 'center' }}  >
          {!router.query.id
            ? ' Encuentra el mejor taller para tu carro'
            :
            router.query.id === 'cda'
              ?`Mejores CDA cerca a mi en Bogotá`
              :`Mejores talleres de ${router.query.id.replace(/-/g, ' ')} cerca a mi en Bogotá`
          }
        </h1>

      </div>
      {home && <BuscadorBasico />}


    </section>
  )
}