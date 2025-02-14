import { client } from "@/client";
import { GET_ONE_NEGOCIOVDOS } from "@/graphql/queries";
import Layout from "@/src/Components/Layout";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import styles from '@/styles/Negocio.module.css'
import Image from "next/image";
import dynamic from "next/dynamic";
import SectionDataSeo from "@/src/Components/Talleres/V3/SectionDataSeo";
import Button from "@/src/Components/Button/Button";
import { getLatLng } from "@/utils/scripts";
import { ModalImagePerfil } from "@/utils/Modales";
import renderStars from "@/utils/renderStars";

const RedesSociales = dynamic(() => import('@/src/Components/Talleres/RedesSociales'),
  { ssr: false })


const SectionPreguntasFrecuentes = dynamic(() => import('@/src/Components/Talleres/V3/SectionPreguntasFrecuentes'),
  { ssr: false })
const SectionDescription = dynamic(() => import('@/src/Components/Talleres/V3/SectionDescription'),
  { ssr: false })
const Revisiones = dynamic(() => import('@/src/Components/Talleres/Revisiones'),
  { ssr: false })

const SectionCategorias = dynamic(() => import('@/src/Components/Talleres/V3/SectionCategorias'),
  { ssr: false })
const CardSolicitarServicio = dynamic(() => import('@/src/Components/Talleres/V3/CardSolicitarServicio'),
  { ssr: false })

const RecomiendasTaller = dynamic(() => import('@/src/Components/Talleres/RecomiendasTaller'),
  { ssr: false })
const SliderTab = dynamic(() => import('@/src/Components/Talleres/V3/SliderTab'),
  { ssr: false, loading: () => <div className={styles.skeletonSlider} /> })
const Horario = dynamic(() => import('@/src/Components/Talleres/V3/Horario'),
  { ssr: false })
const Reseñas = dynamic(() => import('@/src/Components/Talleres/Reseñas'),
  { ssr: false })

const MapaUbicacion = dynamic(() => import('@/src/Components/Talleres/MapaUbicacion'),
  { ssr: false, loading: () => <div className={styles.skeletonMap} /> })
  const MapaCobertura = dynamic(() => import('@/src/Components/Talleres/MapaBogotaCobertura'),
  { ssr: false, loading: () => <div className={styles.skeletonMap} /> })


const servicios = [
  'Cambio de Aceite',
  'Alineación y Balanceo',
  'Revisión de frenos',
  'Cambio de filtros',
  'Reparación de suspensión',
  'Revisión de batería',
  'Diagnóstico electrónico',
  'Cambio de llantas',
];
export default function NegocioVDos({ data, loading }) {
  const router = useRouter()
  const [visibleModalImage, setVisibleModalImage] = useState(false)
  const [visibleModalSolicitarServicio, setVisibleModalSolicitarServicio] = useState(false)
  let descripcionTaller = `Taller ubicado en ${data?.direccion}. ${data?.localidad}, ${data?.ciudad}. Consulta disponibilidad aqui o al ${data?.telefono} - ${data?.whatsapp}. Taller especializado en${data?.categorias?.map(el => " " + el)}. Horario ${data?.horario}.`
  let descripcionMecanico = `Mecanico a domicilio, zona de cobertura Bogota y alrededores. Consulta disponibilidad aqui o al ${data?.telefono} - ${data?.whatsapp}. Servicio especializado en${data?.categorias?.map(el => " " + el)}. Horario ${data?.horario}.`
  let descripcionAlmacen = `Almacen de repuestos especializado en${data?.marcasAutos?.map(el => " " + el)}. Estamos ubicados en la ${data?.direccion}. ${data?.localidad}, ${data?.ciudad}. Consulta disponibilidad aqui o al ${data?.telefono} - ${data?.whatsapp}`

  const horariosSeparados = data?.horario?.split(',');
  const mapSectionRef = useRef(null);
  const refServicios = useRef(null)
  const refHorarios = useRef(null)
  const refReseñas = useRef(null)
  const refAcercaDe = useRef(null)
  const refRedes = useRef(null)

  const handleClickReseñasSection = () => {
    router.push(`${router.asPath}/crear-resena?ide=${data?.id}`);
  };
  const handleChangeSection = ({ ref }) => {
    if (!ref.current) {
      return
    }
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }
  const position = getLatLng({ data: data });
  const openModal = () => {
    router.push(`${router.asPath}?modalSolicitar=${data.id}`, undefined, { shallow: true, scroll: false });
    setVisibleModalSolicitarServicio(true);
  };
  
  // if(loading){return <h1>Cargando...</h1>}

  return (
    <Layout title={`${data?.nombre} - ${data?.ciudad}`} negocio={true} description={data?.tipo === 'Almacen' ? descripcionAlmacen : data?.tipo === 'Mecanico a Domicilio' ? descripcionMecanico : descripcionTaller} image={data?.fotoperfil ? data?.fotoperfil : 'https://azurequarks.blob.core.windows.net/negocios/fotostoredefault.png'} url={router?.asPath} keywords={`${data?.categorias?.map(el => " Talleres de " + el + " en " + data?.ciudad) + ", " + data?.nombre}`} tags={data?.categorias} icon={data?.fotoperfil} visibleSlider={false} visibleNavbar={false} ads={false}>
      <section className={styles.sectionMain}>
        <section
          className={styles.sectionMainImage}
          style={{
            backgroundImage: `url(${data?.fotoperfil})`,
          }} />
        <div className={styles.cardContainer} >
          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
            <Image
              width={120}
              height={120}
              className={styles.profileImage}
              src={data?.fotoperfil}
              priority={true}
              loading="eager"
              onClick={() => setVisibleModalImage(true)}
              alt={`Taller mecanico ${data?.nombre} Bogota`}
            />
            <div>
              {/* <h3 className={styles.headerDetails}>Centro de diagnóstico automotriz</h3> */}
              <h3 className={styles.headerDetails}>{data?.tipo == 'Almacen' ? "Almacén de Autopartes" : data?.tipo == 'Mecanico a Domicilio' ? "Mecánico a domicilio" : "Taller Mecánico"} de {data?.vehiculo ? data?.vehiculo : "Carros"}</h3>
              <h1 className={styles.headerTitle} style={{textAlign:'left'}}>{data?.nombre}</h1>
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#A6AEC1'}}>📍 {data.direccion}. {data?.ciudad}</p>

             
              {data?.promediocalificacionesmaps > 0 &&
            <span style={{  display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop:'8px', color: '#182537', fontSize: '14px', fontWeight: '500' }}>{renderStars(Number(data?.promediocalificacionesmaps))}{data?.promediocalificacionesmaps} ({data.numerocalificacionesmaps ? data.numerocalificacionesmaps : 1} reseñas)</span>
          }

              
            </div>
          </div>
          <Button onClick={openModal} style={{ alignSelf: 'flex-end', margin: '0', backgroundColor: '#407BFF', whiteSpace: 'noWrap' }} >Solicitar Revision</Button>
        </div>
      </section>

      <section className={styles.sectionContent}>
        <div ref={mapSectionRef} className={styles.contentContainer} >
          <SliderTab handleChangeSection={handleChangeSection} refs={{
            mapSectionRef,
            refServicios,
            refHorarios,
            refReseñas,
            refAcercaDe,
            refRedes
          }} desktop={true} />
          <section className={styles.sectionMainContent} >
            <div className={styles.mapSection} >
              <section >
                <h2 className={styles.sectionTitle}>Ubicacion de {data?.nombre}</h2>
                {/* <OnlyMap username={data?.userName} maxWidth="700px" nombre={data?.nombre} direccion={data
                  ? `${data.direccion || ''} ${data.localidad ? data.localidad + ' ' : ''}${data.ciudad || ''}. ${data.pais || ''}`
                  : ''} coordenadas={data?.coordenadas ? data?.coordenadas : position} img={data?.fotoperfil} /> */}
                {data.tipo === 'Mecanico a Domicilio'
                  ?
                  <MapaCobertura coordenadas={data?.coordenadas ? data?.coordenadas : position} img={data?.fotoperfil} direccion={data
                    ? `${data.direccion || ''} ${data.localidad ? data.localidad + ' ' : ''}${data.ciudad || ''}. ${data.pais || ''}`
                    : ''} nombre={data?.nombre} />
                  :
                  <MapaUbicacion ubicacion={data?.ubicacionmaps} username={data?.userName} idNegocio={data?.id} nombre={data?.nombre} direccion={data
                    ? `${data.direccion || ''} ${data.localidad ? data.localidad + ' ' : ''}${data.ciudad || ''}. ${data.pais || ''}`
                    : ''} coordenadas={data?.coordenadas ? data?.coordenadas : position} img={data?.fotoperfil} />
                }


                <div className={styles.containerFooterUbicacion} >
                  <div className={styles.containerFooterUbicacionDos} >
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexDirection: 'row' }}>
                      <span style={{ fontSize: '20px', width: '24px' }}>📍</span>
                      <div>
                        <p style={{ fontWeight: '500', color: '#182537', fontSize: '16px', lineHeight: '1.05' }}>{data?.direccion}</p>
                        <p style={{ color: '#6C788E', fontSize: '14px' }}>Ubicacion</p>
                      </div>
                    </div>
                    {/* <Link href={data?.urltallermaps}  className={styles.buttonIcon}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-corner-up-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 18v-6a3 3 0 0 1 3 -3h10l-4 -4m0 8l4 -4" /></svg></Link> */}
                  </div>
                </div>
              </section>

              <div ref={refServicios} style={{ width: '100%', backgroundColor: '#CFD5E1', height: '1px', margin: '16px 0 48px 0' }} />

              <SectionCategorias data={data} />
              <section className={styles.sectionCardContainer}>
                <div style={{ width: '100%', backgroundColor: '#CFD5E1', height: '1px', margin: '48px 0 48px 0' }} />
                <CardSolicitarServicio visibleModalSolicitarServicio={visibleModalSolicitarServicio} setVisibleModalSolicitarServicio={setVisibleModalSolicitarServicio} openModal={openModal} />
              </section>

              <div style={{ width: '100%', backgroundColor: '#CFD5E1', height: '1px', margin: '48px 0 48px 0' }} />

              <RecomiendasTaller onClick={handleClickReseñasSection} nombre={data?.nombre} />

              <section style={{ display: 'flex', gap: '8px', flexDirection: 'column', alignItems: 'center' }}>
                <SectionDataSeo data={data} />
              </section>

              <div ref={refHorarios} style={{ width: '100%', backgroundColor: '#CFD5E1', height: '1px', margin: '48px 0 48px 0' }} />
              <Horario horariosSeparados={horariosSeparados} />


              {(data?.facebook || data?.instagram || data?.whatsapp || data?.paginaweb) &&
                <>
                  <div ref={refRedes} style={{ width: '100%', backgroundColor: '#CFD5E1', height: '1px', margin: '48px 0' }} />
                  <RedesSociales data={data} />
                </>
              }

              <div style={{ width: '100%', backgroundColor: '#CFD5E1', height: '1px', margin: '48px 0 48px 0' }} />

              <section style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                <Revisiones id={data?.id} />
              </section>

              <div ref={refReseñas} style={{ width: '100%', backgroundColor: '#CFD5E1', height: '1px', margin: '48px 0 48px 0' }} />

              <section style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                <Reseñas id={data?.id} ctdCalificaciones={data?.numerocalificacionesmaps} urlMaps={data.urltallermaps} nombre={data?.nombre} promCalificacion={data?.promediocalificacionesmaps} />
              </section>

              <div style={{ width: '100%', backgroundColor: '#CFD5E1', height: '1px', margin: '48px 0 48px 0' }} />

              <section style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                <SectionPreguntasFrecuentes data={data} />
              </section>
              <section style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                <SectionDescription data={data} />
              </section>
            </div>
            <aside className={styles.stickyAside} >
              <CardSolicitarServicio visibleModalSolicitarServicio={visibleModalSolicitarServicio} setVisibleModalSolicitarServicio={setVisibleModalSolicitarServicio} openModal={openModal} />
            </aside>
          </section>
        </div>
        <section className={styles.containerButtonsMobile}>
          <Button onClick={openModal} className={'mobileButton'} >Solicitar Revision</Button>
        </section>
      </section>

      {visibleModalImage &&
        <ModalImagePerfil img={data?.fotoperfil} setVisibleModalImage={setVisibleModalImage} />}
      {/* {visibleModalSolicitarServicio && <ModalSolicitarServicio setVisibleModalSolicitarServicio={setVisibleModalSolicitarServicio} />} */}
    </Layout>
  )
}

export async function getStaticPaths() {
  // Si puedes obtener todas las rutas en build time, agrégalas aquí
  return {
    paths: [], // Puedes pre-generar algunas rutas si lo deseas
    fallback: "blocking", // Si no está pre-generado, intentará generarlo en la petición
  };
}

export async function getStaticProps({ params }) {
  const parts = params?.id?.replace(/&/g, "");

  try {
    const { data } = await client.query({
      query: GET_ONE_NEGOCIOVDOS,
      variables: { userName: parts },
      fetchPolicy: "network-only", // Para asegurar datos frescos en cada build
    });

    if (parts === "s&i_master_paint") {
      return {
        redirect: {
          destination: "/si_master_paint",
          permanent: false, // Se usa 302 en lugar de 301
        },
      };
    }

    if (!data?.getOneNegocioVDos) {
      return {
        notFound: true, // Muestra la página 404 de Next.js
      };
    }

    return {
      props: {
        data: data.getOneNegocioVDos,
      },
      revalidate: 100000000000000, 
    };
  } catch (error) {
    console.error("Error en getStaticProps:", error);
    return {
      notFound: true,
    };
  }
}
