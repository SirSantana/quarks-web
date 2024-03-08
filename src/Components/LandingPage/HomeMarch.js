import Image from "next/image";
import styles2 from '@/styles/Home.module.css'
import styles from '@/styles/HomeMarch.module.css'

import CategoriasSlider from "./CategoriasSlider";
import { categorias } from "./SliderTiposTalleres";
const Map = dynamic(
  () => import('@/src/Components/LandingPage/Mapa'), // replace '@components/map' with your component's location
  { ssr: false, loading: () => <div className={styles2.skeleton} /> } // This line is important. It's what prevents server-side render
)
import dynamic from "next/dynamic";
import CardNewTaller from "./CardNewTaller";
import { useRouter } from "next/router";
import { useRef } from "react";
import Link from "next/link";



export default function HomeMarch({ data, mode }) {
  const router = useRouter()
  const ref = useRef(null)

  const handleClickMapSection = () => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <div className={styles.containerImageNavBar} >
        <div className={styles.containerNav}>
          <Link style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }} href={'/'}>
            <Image alt={'Cotiza tus repuestos logo'} width={32} height={32} src={'/logoquarks200623.png'} />
            <h3 style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none' }} className={styles.titleNav}>Quarks Talleres</h3>
          </Link>
          <nav style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            {/* <p style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>Servicios</p> */}
            <Link style={{ textDecoration: 'none', color: 'white', fontSize: '12px', fontWeight: '600' }} href={'/acceso'}>Tienes un Taller?</Link>
            {/* <p style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>Tienes un taller?</p> */}
          </nav>
        </div>
        <Image
          sizes="100vw"
          width={100}
          height={100}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          src={'/img-back-taller2.webp'}
          priority={true}
          loading="eager"
          alt={`Taller mecanico Bogota`}
        />

        <div style={{ position: 'absolute', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', zIndex: '1', width: '80%', }}>
          <h1 className={styles.title}>{router?.pathname !== '/' ? `Talleres de ${router?.query?.id ? router?.query?.id.replace(/-/g, ' ') : router.query.busqueda} en Bogotá` : 'Encuentra el mejor taller para tu carro'}</h1>
          {/* <p style={{marginTop:'16px',maxWidth:'40ch', fontSize:'14px', color:'white'}}>Los mejores talleres, con calificaciones, reseñas y todos sus datos en un solo lugar.</p> */}
        </div>
      </div>

      <div className={styles.containerSlider}>
        <CategoriasSlider categorias={categorias} type='Taller' onClick={handleClickMapSection} />
      </div>

      <div  className={`${styles.containerMapList} ${mode === 'Lista' ? `${styles.listMode}` :`${styles.mapaMode}`}`}  ref={ref} >
        <div className={styles.listTalleres} style={{gap:'32px'}}>
          <div style={{ width: '100%', marginBottom: '16px' }}>
            <h2 className={styles.title2}>Taller automotriz de {router?.query?.id ? router?.query?.id.replace(/-/g, ' ') : router.query.busqueda} cerca de mi</h2>
            <h4 className={styles.title3}>Se encontraron {data?.length} talleres mecanicos de {router?.query?.id ? router?.query?.id.replace(/-/g, ' ') : router.query.busqueda} cerca a mi en Bogota</h4>
          </div>
          {data.reverse()?.map(el => (
            <CardNewTaller key={el.nombre} taller={el} />
          ))}

        </div>
        <div className={styles.map}>
          <Map talleres={data} />
        </div>
      </div>
    </>
  )
}