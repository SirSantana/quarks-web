import LayoutExplore from '@/src/Components/LandingPage/LayoutExplore';
import styles2 from '@/styles/Landing.module.css';
import {  useState } from 'react';
import CardTallerV2 from '@/src/Components/LandingPage/CardTallerV2';
import { GET_NEGOCIOSVDOS_BY_SERVICIO } from '@/graphql/queries';
import { client } from '@/client';
import getSeoCategorias from '@/src/data/SeoCategorias';
import SectionSeoServicios from '@/src/Components/LandingPage/SectionSeoServicios';

export default function CiudadPage({ title, query,  description, talleresData }) {
  const [isLoading, setIsLoading] = useState(false);
  // const {data, loading, error} = useQuery(GET_NEGOCIOSVDOS_BY_SERVICIO, {variables:{tipo:router.query.servicio.replace(/-/g, ' ')}})
  // let talleresData = data?.getNegociosVDosByServicio;
  // console.log(data);
  console.log(description);
  
  return (
    <LayoutExplore  title={title} query={query}  description={description?.description} url={`/explore/${query.categoria || ''}/${query.vehiculo || ''}/${query.servicio?.replaceAll(/ /g, '-') || ''}/${query.ciudad || ''}`}
    keywords={`Talleres de ${query.categoria} en ${query.ciudad} para ${query.vehiculo} en ${query.servicio}, ${description.tags}`} tags={description?.tags} image={talleresData[0]?.fotoperfil} visibleSlider={false} visibleNavbar={false}>
      {/* <MenuSelectsFilter setIsLoading={setIsLoading} /> */}
      <div className={styles2.containerListTalleres}>
        <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <p>
            {query.servicio
              ? `Se encontraron ${talleresData?.length || 0} talleres mecánicos de ${query.servicio.replace(/-/g, ' ')} cerca de mi en ${query.ciudad}`
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
              <h3>{description?.preguntas?.importancia}</h3>
              <p>{description?.importancia}</p>
            </article>
            <article>
              <h3>{description?.preguntas?.duracion}</h3>
              <p>{description.duracion}</p>
            </article>
            <article>
              <h3>{description?.preguntas?.frecuencia}</h3>
              <p>{description.frecuencia}</p>
            </article>
          </section>
        </div>
      }
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', backgroundColor: 'white', margin: '48px 0 48px 0', padding: '48px 0', }} >
      <section style={{display: 'flex', flexDirection: 'row', gap: '16px', maxWidth: '1100px', width: '90%',  margin: '0 auto', flexWrap:'wrap', gap:'16px'}}>
        
        {description?.tags?.map(el=><div style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', backgroundColor: '#FCFDFF', border: '1px solid #CFD5E1', borderRadius: '8px', padding: '4px 8px', width:'fit-content'}}><h2 style={{fontSize:'14px', color:'#5C5C5C', fontWeight:'500'}}>{el}</h2></div>)}
      </section>
      </div>
      <SectionSeoServicios data={talleresData} categoria={query.categoria} vehiculo={query.vehiculo} servicio={query.servicio}/>
      
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
      // console.error('Error fetching data: HOLAAAAAA', error);
    }
  }
  const servicioSeo = getSeoCategorias({ servicio: servicio, ciudad: ciudad, vehiculo: vehiculo });
  let title = categoria !== 'mecanicos'
    ? `Encuentra los mejores ${categoria.charAt(0).toUpperCase() + categoria.slice(1)} de ${servicio.replaceAll(/-/g, ' ')} para ${vehiculo} en ${ciudad}`
    : `Mecánicos a domicilio para ${servicio} de ${vehiculo} en ${ciudad}`

  return {
    props: {
      title,
      query: { categoria:categoria?categoria:null, vehiculo:vehiculo?vehiculo:null, ciudad:ciudad?ciudad:null, servicio:servicio?servicio.replaceAll(/-/g, ' '):null },
      description: servicioSeo || null,
      talleresData
    },
  };
}