import Layout from "@/src/Components/Layout";
import { useRouter } from "next/router";
import talleres from '@/pages/servicios-automotriz/talleres.json'
import { options, options2 } from "@/src/Components/Main/Main";
import SectonFilters from "@/src/Components/LandingPage/SectionFilters";


export default function ServicioAutomotriz({ data }) {
  const router = useRouter()
  const {busqueda} = router?.query;
  return (
    <Layout title={`Talleres mecanicos de ${busqueda}`} description={`Talleres de carros para ${busqueda}, encuentra el taller ideal para tu carro, conoce horarios, calificaciones, contacto y mas informacion util para ti y tu vehiculo.`} image={'https://azurequarks.blob.core.windows.net/negocios/bannertalleresquarks.png'} url={router?.asPath} keywords={`Talleres de carros en bogota,  ${options.map(el => " taller de " + el.value + " en Bogota" )}`} visibleSlider={true}>
      <div style={{ marginTop: '8%' }}>
        <SectonFilters data={data} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const busqueda = query.busqueda
  let talleresFilter;
  if (busqueda) {
     talleresFilter = talleres.talleres.filter((taller) => {
      // Filtrar por referencia, aplicaciones o marcas
      return (
        taller.servicio == busqueda ||
        taller.categorias.some((app) => app.toLowerCase().includes(busqueda)) ||
        taller.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    });
  }
  return {
    props: {
      data: talleresFilter
    },
  };
}