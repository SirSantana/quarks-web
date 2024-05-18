import Layout from "@/src/Components/Layout";
import { useRouter } from "next/router";
import talleres from './talleres.json'
import { options } from "@/src/Components/Main/Main";
import dynamic from "next/dynamic";
import { categorias } from "@/src/Components/LandingPage/SliderTiposTalleres";
import { useState } from "react";
import Button, { ButtonSize, ButtonVariant } from "@/src/Components/Button/Button";
import { IconCatalog } from "@/src/Components/Icon/Icon";
import styles from '@/styles/Home.module.css'
import HomeMarch from "@/src/Components/LandingPage/HomeMarch";

const SliderTalleresSugeridos = dynamic(() => import('@/src/Components/Talleres/SliderTalleresSugeridos'),
  { ssr: false })
const SectionCreateTaller = dynamic(() => import('@/src/Components/Talleres/SectionCreateTaller'),
  { ssr: false })

const tagsFix = [
  'talleres abiertos hoy cerca de mi',
  'taller mecánico 24 horas cerca de mi',
  'paginas web de talleres mecanicos',
  'taller automotriz a domicilio'
]

const Map = dynamic(
  () => import('@/src/Components/LandingPage/Mapa'), // replace '@components/map' with your component's location
  { ssr: false, loading: () => <div className={styles.skeleton} /> } // This line is important. It's what prevents server-side render
)
export default function ServicioAutomotriz({ initialQuery, }) {
  const router = useRouter()
  const [mode, setMode] = useState('Lista')
  const [iconImg, setIconImg] = useState(null);

  const handleClick = () => {
    // Desplázate hacia arriba cuando se hace clic en el botón
    setMode(mode === 'Lista' ? 'Mapa' : 'Lista')
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <Layout title={`Talleres de  ${router?.query?.id.replace(/-/g, ' ')} cerca a mi en Bogota, Colombia`} 
    // icon={iconImg?.img ?`/${iconImg?.img}.png`:data[0].fotoperfil} image={iconImg?.img ? `./${iconImg?.img}.png` : data[0].fotoperfil}
    icon={iconImg?.img && `/${iconImg?.img}.png`} image={iconImg?.img && `./${iconImg?.img}.png`}

    description={`Talleres de carros para ${router?.query?.id.replace(/-/g, ' ')} en Bogota, Colombia, encuentra el taller ideal para tu carro, conoce horarios, calificaciones, contacto y mas informacion util para ti y tu vehiculo.`} url={router?.asPath} keywords={`Talleres de carros en bogota,  ${options.map(el => " taller de " + el.value + " en " + " Bogota, Colombia")}`} visibleNavbar={false} visibleSlider={false}>
      {/* {mode
        ?
        <SectonFilters data={data.reverse()} />
        :
        <>
          <Map talleres={data} />
          <SectonFilters data={data.reverse()} />
        </>
      } */}
      <HomeMarch initialQuery={initialQuery} mode={mode} setIconImg={setIconImg} />
      <section style={{ display: 'flex', margin: '0 auto', marginBottom: '64px', maxWidth: '600px', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
        <SectionCreateTaller />
      </section>
      <div style={{ height: '1px', backgroundColor: '#c5c5c5', maxWidth: '1200px', width: '90%', margin: '32px auto' }} />

      <section style={{ display: 'flex', maxWidth: '600px', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
        <SliderTalleresSugeridos />
      </section>
      <section style={{ display: 'flex', margin: '0 auto', marginBottom: '64px', maxWidth: '600px', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
        <SectionCreateTaller />
      </section>
      <section style={{ display: 'flex', margin: '0 auto', marginBottom: '64px', maxWidth: '600px', gap: '8px', width: '100%', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center' }}>
        {tagsFix.concat(iconImg?.tags).map(tag => (
          <p key={tag} style={{ fontSize: '14px', fontWeight: '500', padding: '4px 12px', border: '1px solid #c5c5c5', borderRadius: '16px', backgroundColor: 'white' }}>{tag}</p>
        ))}
      </section>
      
      <div className={styles.divBtnFooter}>
        <Button onClick={handleClick} size={ButtonSize.sm} variant={ButtonVariant.secondary} icon={mode==='Lista' ? IconCatalog.mapa : IconCatalog.lista}>
          Mostrar  {mode === 'Lista' ? 'Mapa' : 'Lista'}
        </Button>
      </div>
    </Layout>
  )
}


export async function getServerSideProps({ query }) {
  return {
    props: {
      initialQuery: query,
    },
  };
}