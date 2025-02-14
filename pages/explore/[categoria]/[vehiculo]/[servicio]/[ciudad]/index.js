import LayoutExplore from '@/src/Components/LandingPage/LayoutExplore';
import { client } from "@/client";

import styles2 from '@/styles/Landing.module.css';
import { GET_NEGOCIOSVDOS_BY_SERVICIO } from '@/graphql/queries';
import getSeoCategorias from '@/src/data/SeoCategorias';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';
import { Loader } from '@/utils/loader';
import Button, { ButtonVariant } from '@/src/Components/Button/Button';
import CardTaller from '@/src/Components/LandingPage/CardTaller';

const SectionSeoServicios = dynamic(() => import('@/src/Components/LandingPage/SectionSeoServicios'),
  { ssr: false })
const MapTalleresHome = dynamic(() => import('@/src/Components/LandingPage/MapTalleresHome'),
  { ssr: false })

export default function CiudadPage({ title, query, description, talleresData }) {
  const [mapa, setMapa] = useState(false)
  
  
  return (
    <LayoutExplore title={title} query={query} description={description?.description} url={`/explore/${query.categoria || ''}/${query.vehiculo || ''}/${query.servicio?.replaceAll(/ /g, '-') || ''}/${query.ciudad || ''}`}
      keywords={`Talleres de ${query.categoria} en ${query.ciudad} para ${query.vehiculo} en ${query.servicio}, ${description?.tags}`} tags={description?.tags} image={'mecanico-pic.webp'} visibleSlider={false} visibleNavbar={false}>
      {/* <MenuSelectsFilter setIsLoading={setIsLoading} /> */}
      <div className={styles2.containerListTalleres}>
        <section style={{ marginBottom: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '16px'  }}>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#6C788E' }}>
            {query.servicio
              ? `Se encontraron ${talleresData?.length || 0} talleres mecánicos de ${query.servicio.replace(/-/g, ' ')} cerca de mi en ${query.ciudad}`
              : 'Se encontraron +100 talleres en Bogotá'}
          </p>
          <Button className={'mobileButton'} onClick={() => setMapa(!mapa === true)} variant={ButtonVariant.outlined} style={{ margin: 0 }} size="sm">{mapa ? 'Listado' : 'Mapa'}</Button>
        </section>

        {/* {loading ? (
        
          <div className={`${styles2.containerCardsAndMap} ${mapa ? styles2.containerMapMobile : ''}`}>
            <ul
              style={{
                display: mapa ? 'none' : 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100%, 1fr))', // Cada tarjeta tiene al menos 300px de ancho, pero se adapta al tamaño de la pantalla.
                gap: '24px',
                alignItems: 'flex-start',
                listStyle: 'none',
                width:'100%',
              }}
            >
              {Array(5).fill(null)?.map(( index) => (
                <li style={{height:'100%', width:'100%'}}>
                  <div className={styles2.cardNewTallerSkeleton} style={{width:'100%', height:'300px'}}/>
                </li>
              ))}
            </ul>
            <div className={styles2.containerMapHome}>
            <div className={styles2.cardNewTallerSkeleton} style={{position: 'relative', width: '100%', height: '90vh' }}/>
            </div>
          </div>
        ) : ( */}
          <div className={`${styles2.containerCardsAndMap} ${mapa ? styles2.containerMapMobile : ''}`}>
            <ul
              style={{
                display: mapa ? 'none' : 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(100%, 1fr))', // Cada tarjeta tiene al menos 300px de ancho, pero se adapta al tamaño de la pantalla.
                gap: '24px',
                alignItems: 'flex-start',
                listStyle: 'none',
              }}
            >
              {talleresData?.map((taller, index) => (
                <li style={{height:'100%'}}>
                  <CardTaller key={taller.nombre} taller={taller} />
                </li>
              ))}
            </ul>
            <div className={styles2.containerMapHome}>
              <MapTalleresHome data={talleresData} />
            </div>
          </div>
        {/* )} */}
      </div>
      {description &&
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', backgroundColor: 'white', margin: '48px 0 48px 0', padding: '48px 0', flexDirection: 'row' }} >
          <div className={styles2.containerQuestions} >
            <section style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', margin: '0 auto' }}>
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
            <Image src={'/mecanico-pic.webp'} alt={`Talleres de ${query?.servicio?.replaceAll(/-/g, ' ') || ''} en ${query?.ciudad}`} width={300} height={300} />
          </div>

        </div>
      }
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', backgroundColor: 'white', margin: '48px 0 48px 0', padding: '48px 0', }} >
        <section style={{ display: 'flex', flexDirection: 'row', gap: '16px', maxWidth: '1100px', width: '90%', margin: '0 auto', flexWrap: 'wrap', gap: '16px' }}>
          {description?.tags?.map(el => <div style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', backgroundColor: '#FCFDFF', border: '1px solid #CFD5E1', borderRadius: '8px', padding: '4px 8px', width: 'fit-content' }}><h2 style={{ fontSize: '14px', color: '#5C5C5C', fontWeight: '500' }}>{el}</h2></div>)}
        </section>
      </div>
      <SectionSeoServicios data={talleresData} categoria={query.categoria} vehiculo={query.vehiculo} servicio={query.servicio} />

    </LayoutExplore>
  );
};

// Consulta GraphQL en el servidor
export async function getStaticProps(context) {
  const { categoria, vehiculo, servicio, ciudad } = context.params;

  const tipoServicio = servicio ? servicio.replace(/-/g, ' ') : null;
  const servicioSeo = getSeoCategorias({ servicio, ciudad, vehiculo });

  const { data } = await client.query({
    query: GET_NEGOCIOSVDOS_BY_SERVICIO,
    variables: { tipo: tipoServicio }
  });

  return {
    props: {
      title: `Encuentra los mejores ${categoria} de ${tipoServicio} para ${vehiculo} en ${ciudad}`,
      query: { categoria, vehiculo, ciudad, servicio: tipoServicio },
      description: servicioSeo || null,
      talleresData: data?.getNegociosVDosByServicio || []
    },
    revalidate: 56800 // Se actualiza cada dia
  };
}
export async function getStaticPaths() {
  return {
    paths: [], // Opcional: Aquí podrías precargar algunas rutas populares
    fallback: 'blocking' // Genera la página bajo demanda si no está pre-renderizada
  };
}

// Función de ayuda para capitalizar la primera letra de una palabra
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}