import Layout from "@/src/Components/Layout";
import { useRouter } from "next/router";
import talleres from './talleres.json'
import { options } from "@/src/Components/Main/Main";
import SectonFilters from "@/src/Components/LandingPage/SectionFilters";
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
export default function ServicioAutomotriz({ data, iconImg, }) {
  const router = useRouter()
  const [mode, setMode] = useState('Lista')
  const handleClick = () => {
    // Desplázate hacia arriba cuando se hace clic en el botón
    setMode(mode === 'Lista' ? 'Mapa' : 'Lista')
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <Layout title={`Talleres de  ${router?.query?.id.replace(/-/g, ' ')} cerca a mi en Bogota, Colombia`} description={`Talleres de carros para ${router?.query?.id.replace(/-/g, ' ')} en Bogota, Colombia, encuentra el taller ideal para tu carro, conoce horarios, calificaciones, contacto y mas informacion util para ti y tu vehiculo.`} icon={iconImg?.img && `/${iconImg?.img}.png`} image={iconImg?.img ? `./${iconImg?.img}.png` : 'https://azurequarks.blob.core.windows.net/negocios/bannertalleresquarks.png'} url={router?.asPath} keywords={`Talleres de carros en bogota,  ${options.map(el => " taller de " + el.value + " en " + " Bogota, Colombia")}`} visibleNavbar={false} visibleSlider={false}>
      {/* {mode
        ?
        <SectonFilters data={data.reverse()} />
        :
        <>
          <Map talleres={data} />
          <SectonFilters data={data.reverse()} />
        </>
      } */}
      <HomeMarch data={data} mode={mode} />

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
  let categoria = query?.id;
  if (categoria.includes('Bogota')) {
    categoria = categoria.replace('-Bogota, Colombia', '').trim()
  }
  const levenshteinDistance = (s1, s2) => {
    const m = s1.length;
    const n = s2.length;

    // Inicializar una matriz m × n con 0
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Llenar la matriz con los valores de distancia
    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        if (i === 0) {
          dp[i][j] = j;
        } else if (j === 0) {
          dp[i][j] = i;
        } else if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }
    }

    return dp[m][n];
  };

  let filter;
  const talleresFilter = talleres?.talleres.filter(taller => taller?.lat&& taller.userName !== 'corsa-motors')

  if (categoria) {
    let categoriaNormalized = normalizeString(categoria.replace(/-/g, ' ').toLowerCase())
    filter = talleresFilter.filter(taller => taller?.categorias?.some(categoriaa =>
      categoriaa.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(categoriaNormalized.toLowerCase())) ||
      levenshteinDistance(taller.nombre.toLowerCase(), categoriaNormalized.toLowerCase()) < 10)

  }
  function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const resultados2 = shuffleArray(filter);


  const iconImg = categorias?.find(cat => cat.url?.replace(/-/g, ' ').normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase() == categoria?.replace(/-/g, ' ').toLocaleLowerCase())
  return {
    props: {
      data: resultados2,
      iconImg: iconImg ? iconImg : null,
    },
  };
}