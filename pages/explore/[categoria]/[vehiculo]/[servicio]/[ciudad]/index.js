import LayoutExplore from '@/src/Components/LandingPage/LayoutExplore';
import { useRouter } from 'next/router';
import styles2 from '@/styles/Landing.module.css';
import { useRef, useState } from 'react';
import CardTallerV2 from '@/src/Components/LandingPage/CardTallerV2';
import { GET_NEGOCIOSVDOS_BY_SERVICIO } from '@/graphql/queries';
import { client } from '@/client';
import getSeoCategorias from '@/src/data/SeoCategorias';
import { useQuery } from '@apollo/client';
import SectionSeoServicios from '@/src/Components/LandingPage/SectionSeoServicios';

export default function CiudadPage({ categoria, vehiculo, servicio, ciudad, description, talleresData }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const {data, loading, error} = useQuery(GET_NEGOCIOSVDOS_BY_SERVICIO, {variables:{tipo:router.query.servicio.replace(/-/g, ' ')}})
  // let talleresData = data?.getNegociosVDosByServicio;
  // console.log(data);
  
  return (
    <LayoutExplore  categoria={categoria} vehiculo={vehiculo} servicio={servicio} ciudad={ciudad} description={description?.description}url={`/explore/${categoria}/${vehiculo}/${servicio.replaceAll(/ /g,'-' )}/${ciudad}`} keywords={`Talleres de ${categoria} en ${ciudad} para ${vehiculo} en ${servicio}`} tags={description?.tags} icon={description?.fotoperfil} visibleSlider={false} visibleNavbar={false}>
      {/* <MenuSelectsFilter setIsLoading={setIsLoading} /> */}
      <div className={styles2.containerListTalleres}>
        <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <p>
            {servicio
              ? `Se encontraron ${talleresData?.length || 0} talleres mecánicos de ${servicio.replace(/-/g, ' ')} cerca de mí en Bogotá`
              : 'Se encontraron +100 talleres en Bogotá'}
          </p>
        </div>

        {isLoading ? (
          <div
            style={{
              width: '90%',
              maxWidth: '1200px',
              border: '1px solid #CFD5E1',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              backgroundColor: '#f3f3f3',
              margin: '32px auto',
              position: 'relative',
              height: '70vh',
            }}
          />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
              alignItems: 'flex-start',
            }}
          >
            {talleresData?.map((taller, index) => (
              <CardTallerV2 key={taller.nombre} taller={taller} />
            ))}
          </div>
        )}
      </div>
      {description &&
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', backgroundColor: 'white', margin: '48px 0 48px 0', padding: '48px 0', }} >
          <section style={{display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1100px', width: '90%',  margin: '0 auto' }}>
            <article>
              <h2>{description?.preguntas?.importancia}</h2>
              <p>{description?.importancia}</p>
            </article>
            <article>
              <h2>{description?.preguntas?.duracion}</h2>
              <p>{description.duracion}</p>
            </article>
            <article>
              <h2>{description?.preguntas?.frecuencia}</h2>
              <p>{description.frecuencia}</p>
            </article>
          </section>

        </div>
      }
      <SectionSeoServicios data={talleresData} categoria={categoria} vehiculo={vehiculo} servicio={servicio}/>

    </LayoutExplore>
  );
};

// Consulta GraphQL en el servidor
export async function getServerSideProps(context) {
  const { categoria, vehiculo, servicio, ciudad } = context.query;

  let talleresData = [];

  if (servicio) {
    // Llamada al servidor GraphQL usando Apollo Client
    try {
      const { data } = await client.query({
        query: GET_NEGOCIOSVDOS_BY_SERVICIO,
        variables: { tipo: servicio.replace(/-/g, ' ') },
        fetchPolicy: 'cache-first'
      });
      talleresData = data?.getNegociosVDosByServicio || [];
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const servicioSeo = getSeoCategorias({ servicio: servicio, ciudad: ciudad, vehiculo: vehiculo });
  return {
    props: {
      categoria: categoria || null,
      vehiculo: vehiculo || null,
      servicio: servicio.replaceAll(/-/g, ' ') || null,
      ciudad: ciudad || null,
      description: servicioSeo || null,
      talleresData
    },
  };
}