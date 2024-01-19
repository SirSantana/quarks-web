import Layout from "@/src/Components/Layout";
import { useRouter } from "next/router";
import talleres from './talleres.json'
import { options, options2 } from "@/src/Components/Main/Main";
import SectonFilters from "@/src/Components/LandingPage/SectionFilters";


export default function ServicioAutomotriz({ data }) {
  const router = useRouter()
  return (
    <Layout title={`Los mejores talleres mecanicos de ${router?.query?.id} cerca a mi en Bogota, Colombia`} description={`Talleres de carros para ${router?.query?.id} en Bogota, Colombia, encuentra el taller ideal para tu carro, conoce horarios, calificaciones, contacto y mas informacion util para ti y tu vehiculo.`} image={'https://azurequarks.blob.core.windows.net/negocios/bannertalleresquarks.png'} url={router?.asPath} keywords={`Talleres de carros en bogota,  ${options.map(el => " taller de " + el.value + " en " + " Bogota, Colombia")}`} visibleSlider={true}>
        <SectonFilters data={data} />
        <h4>Holaaa</h4>
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
  if (categoria) {
    let categoriaNormalized = normalizeString(categoria.replace(/-/g, ' ').toLowerCase())
    filter = talleres?.talleres.filter(taller => taller?.categorias?.some(categoriaa =>
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
  return {
    props: {
      data: resultados2
    },
  };
}