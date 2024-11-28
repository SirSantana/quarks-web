import SectionFixedServicios from "@/src/Components/LandingPage/SectionFixedServicios";
import Layout from "@/src/Components/Layout";
import { useRouter } from "next/router";
import styles2 from '@/styles/Landing.module.css';
import Icon, { IconCatalog } from "@/src/Components/Icon/Icon";
import { GET_NEGOCIOSVDOS_BY_SERVICIO, GET_SEARCH } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useRef } from "react";
import SectionPreguntasServicio from "@/src/Components/LandingPage/SectionPreguntasServicio";
import SectionSeoServicios from "@/src/Components/LandingPage/SectionSeoServicios";
import CardTallerV2 from "@/src/Components/LandingPage/CardTallerV2";
import getSeoCategorias from "@/src/data/SeoCategorias";
import CardTaller from "@/src/Components/LandingPage/CardTaller";

// Función getServerSideProps para renderizado del lado del servidor
export async function getServerSideProps(context) {
  const { id } = context.query;

  let pageTitle = '';

  if (!id) {
    pageTitle = 'Encuentra los mejores talleres en Bogotá';
  } else if (id === 'cda') {
    pageTitle = 'Revisión técnico mecánica en Bogotá';
  } else {
    const formattedTitle = id.replace(/-/g, ' ').charAt(0).toUpperCase() + id.replace(/-/g, ' ').slice(1);
    pageTitle = `Talleres de ${formattedTitle} en Bogotá`;
  }
  const servicioSeo = getSeoCategorias({ servicio:id, ciudad:'Bogotá', vehiculo:'Carro' });

  return {
    props: {
      pageTitle,
      description:servicioSeo || null,
    },
  };
}

export default function Servicio({ pageTitle, description }) {
  const router = useRouter();
  const resultsRef = useRef(null);
  const { loading, data } = useQuery(GET_SEARCH, {
    variables: { text: router?.query?.id?.replace(/-/g, ' ') },
    onCompleted: () => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
  
  return (
    <Layout visibleNavbar={false} title={pageTitle}>
      <SectionFixedServicios />
      <section className={styles2.containerListTalleres}>
        <div ref={resultsRef} style={{ marginBottom: '32px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <p>{router?.query?.id ? `Se encontraron ${data ? data?.getSearch.length : '10'} talleres mecánicos de ${router.query.id.replace(/-/g, ' ')} cerca de mí en Bogotá` : 'Se encontraron +100 talleres en Bogotá'}</p>
          <div>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '8px 12px', width: 'fit-content', alignItems: 'center', gap: '8px', border: '1px solid #D5D5D5', borderRadius: '4px' }}>
              <Icon name={IconCatalog.optionsOutline} />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Filtrar</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          {loading ? (
            <>
              <div className={styles2.cardNewTallerSkeleton} />
              <div className={styles2.cardNewTallerSkeleton} />
              <div className={styles2.cardNewTallerSkeleton} />
              <div className={styles2.cardNewTallerSkeleton} />
            </>
          ) : 
            <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100%, 1fr))', // Cada tarjeta tiene al menos 300px de ancho, pero se adapta al tamaño de la pantalla.
              gap: '24px',
              alignItems: 'flex-start',
            }}
          >
            {data?.getSearch?.map((taller, index) => (
                <CardTaller key={taller.nombre} taller={taller} />
            ))}
          </div>
          }
        </div>
      </section>
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
      <SectionPreguntasServicio data={data?.getNegociosVDosByServicio} />
      <SectionSeoServicios data={data?.getNegociosVDosByServicio} vehiculo={'Carro'} servicio={router.query.id.replace(/-/g, ' ')}  />

    </Layout>
  );
}
