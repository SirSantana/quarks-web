import LayoutExplore from '@/src/Components/LandingPage/LayoutExplore';
import SectionFixedServicios from '@/src/Components/LandingPage/SectionFixedServicios';
import { useRouter } from 'next/router';
import styles2 from '@/styles/Landing.module.css';
import { useRef, useState } from 'react';
import CardTallerV2 from '@/src/Components/LandingPage/CardTallerV2';
import MenuSelectsFilter from '@/src/Components/LandingPage/MenuSelectsFilter';
import { GET_NEGOCIOSVDOS_BY_SERVICIO } from '@/graphql/queries';
import { client } from '@/client';

const CiudadPage = ({ categoria, vehiculo, servicio, ciudad, talleresData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const resultsRef = useRef(null);

  return (
    <LayoutExplore categoria={categoria} vehiculo={vehiculo} servicio={servicio} ciudad={ciudad}>
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
    </LayoutExplore>
  );
};

export default CiudadPage;

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
      });
      talleresData = data?.getNegociosVDosByServicio || [];
      console.log(data, 'data');
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return {
    props: {
      categoria: categoria || null,
      vehiculo: vehiculo || null,
      servicio: servicio || null,
      ciudad: ciudad || null,
      talleresData,  // Pasamos los datos de los talleres obtenidos desde el servidor
    },
  };
}