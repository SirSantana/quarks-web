import { client } from "@/client";
import { GET_ONE_NEGOCIOVDOS } from "@/graphql/queries";
import Layout from "@/src/Components/Layout";
import RedesSociales from "@/src/Components/Talleres/RedesSociales";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import styles from '@/styles/ServiciosAutomotriz.module.css'
import Image from "next/image";
import dynamic from "next/dynamic";
import ButtonsHeader from "@/src/Components/Talleres/ButtonsHeader";
import SectionAcercaDe from "@/src/Components/Talleres/SectionAcercaDe";
import { CREATE_ACCION } from "@/graphql/mutations";
import { ModalImagePerfil } from "@/utils/Modales";
import SectionDataSeo from "@/src/Components/Talleres/V3/SectionDataSeo";
import SectionPreguntasFrecuentes from "@/src/Components/Talleres/V3/SectionPreguntasFrecuentes";
import SectionDescription from "@/src/Components/Talleres/V3/SectionDescription";
import ServiciosTab from "@/src/Components/Talleres/V3/ServiciosTab";
import ModalButtonsContacto from "@/src/Components/Talleres/ModalButtonsContacto";

const DataTaller = dynamic(() => import('@/src/Components/Talleres/V3/DataTaller'),
  { ssr: false })
const RecomiendasTaller = dynamic(() => import('@/src/Components/Talleres/RecomiendasTaller'),
  { ssr: false })
const WidgetMenu = dynamic(() => import('@/src/Components/Talleres/V3/WidgetMenu'),
  { ssr: false })

const SliderTab = dynamic(() => import('@/src/Components/Talleres/V3/SliderTab'),
  { ssr: false })
const Horario = dynamic(() => import('@/src/Components/Talleres/V3/Horario'),
  { ssr: false })
const Reseñas = dynamic(() => import('@/src/Components/Talleres/Reseñas'),
  { ssr: false })
const BogotaMap = dynamic(() => import('@/src/Components/Talleres/MapaBogotaCobertura'),
  { ssr: false })
const MapaUbicacion = dynamic(() => import('@/src/Components/Talleres/MapaUbicacion'),
  { ssr: false })
const FooterSectionFixed = dynamic(() => import('@/src/Components/Talleres/FooterSectionFixed'),
  { ssr: false })
const ButtonsFooter = dynamic(() => import('@/src/Components/Talleres/ButtonsFooter'),
  { ssr: false })
const ButtonTestWhatsapp = dynamic(() => import('@/src/Components/Talleres/ButtonTestWhatsapp'),
  { ssr: false })

export default function NegocioVDos({ data }) {
  const router = useRouter()
  const [visibleModalImage, setVisibleModalImage] = useState(false)
  const [visibleModalButtons, setVisibleModalButtons] = useState(false)
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
  return (
    <Layout title={`${data?.nombre} - ${data?.ciudad}`} description={data?.tipo === 'Almacen' ? descripcionAlmacen : data?.tipo === 'Mecanico a Domicilio' ? descripcionMecanico : descripcionTaller} image={data?.fotoperfil ? data?.fotoperfil : 'https://azurequarks.blob.core.windows.net/negocios/fotostoredefault.png'} url={router?.asPath} keywords={`${data?.categorias?.map(el => " Talleres de " + el + " en " + data?.ciudad) + ", " + data?.nombre}`} tags={data?.categorias} icon={data?.fotoperfil} visibleSlider={false} visibleNavbar={false}>
      <div className={styles.containerAlmacen}>
        <div className={styles.containerSticky}>
          <div className={styles.divDesktopCard}>
            <Image
              sizes="100vw"
              width={400}
              height={500}
              className={styles.imgFotoPortada2}
              src={data?.fotoperfil}
              priority={true}
              loading="eager"
              onClick={() => setVisibleModalImage(true)}
              alt={`Taller mecanico ${data?.nombre} Bogota`}
            />
            <div
              className={styles.opacityImg}
            />
            <div className={styles.cardDataDesktop} >
              <DataTaller data={data} mobile={true} />
            </div>
            <ButtonsHeader data={data} />
          </div>
        </div>

        <div className={styles.containerSectionsTaller}>
          
        <DataTaller data={data} sizes={true}/>

          <div style={{ marginBottom: '16px' }} className={styles.containerMobile} >
            <SliderTab handleChangeSection={handleChangeSection} refs={{
              mapSectionRef,
              refServicios,
              refHorarios,
              refReseñas,
              refAcercaDe,
              refRedes
            }} desktop={true} />
            <WidgetMenu data={data} onClick={handleClickReseñasSection} handleChangeSection={handleChangeSection} mapSectionRef={mapSectionRef} refReseñas={refReseñas} indicativo={data?.indicativo} />
            {data?.userName === 'multiservicios_ismael_sanchez'
              ?
              <FooterSectionFixed data={data} />
              : data?.userName === 'optra_club_colombia'
                ? <ButtonTestWhatsapp whatsapp={data?.whatsapp} id={data?.id} />
                :
                <ButtonsFooter data={data} setVisibleModalButtons={setVisibleModalButtons} />
            }
          </div>
          <SliderTab handleChangeSection={handleChangeSection} refs={{
            mapSectionRef,
            refServicios,
            refHorarios,
            refReseñas,
            refAcercaDe,
            refRedes
          }} desktop={false} />
          <div className={styles.containerMobile} >
            <section ref={refServicios} style={{ display: 'flex', gap: '8px', width: '90%', flexDirection: 'column', alignItems: 'center' }}>
              <ServiciosTab categorias={data?.categorias} tipo={data?.tipo} id={data?.id} />
            </section>
            <RecomiendasTaller onClick={handleClickReseñasSection} nombre={data?.nombre} />
            {(data?.urltallermaps || data?.coordenadas?.length > 0 !== (data?.tipo === 'Mecanico a Domicilio' || data?.tipo === 'Mecanico')) &&
              <section ref={mapSectionRef} style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                <MapaUbicacion ubicacion={data?.urltallermaps} username={data?.userName} idNegocio={data?.id} nombre={data?.nombre} direccion={data
                  ? `${data.direccion || ''} ${data.localidad ? data.localidad + ' ' : ''}${data.ciudad || ''}. ${data.pais || ''}`
                  : ''} coordenadas={data?.coordenadas} img={data?.fotoperfil} />
              </section>
            }
            {(data?.tipo === 'Mecanico a Domicilio' || data?.tipo === 'Mecanico') &&
              <section ref={mapSectionRef} style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                <BogotaMap coordenadas={data?.coordenadas} img={data?.fotoperfil} direccion={data
                  ? `${data.direccion || ''} ${data.localidad ? data.localidad + ' ' : ''}${data.ciudad || ''}. ${data.pais || ''}`
                  : ''} nombre={data?.nombre}/>
              </section>
            }
            <section style={{ display: 'flex', gap: '8px', width: '90%', flexDirection: 'column', alignItems: 'center' }}>
              <SectionDataSeo data={data} />
            </section>
            <section ref={refHorarios} style={{ display: 'flex', gap: '8px', width: '90%', flexDirection: 'column', alignItems: 'center' }}>
              <Horario horariosSeparados={horariosSeparados} />
            </section>

            {(data?.facebook || data?.instagram || data?.whatsapp || data?.paginaweb) &&
              <section ref={refRedes} style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                <RedesSociales data={data} />
              </section>

            }
            {data?.acercanegocio &&
              <section ref={refAcercaDe} style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                <SectionAcercaDe nombre={data?.nombre} texto={data?.acercanegocio} />
              </section>
            }

            <section ref={refReseñas} style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
              <Reseñas id={data?.id} ctdCalificaciones={data?.numerocalificacionesmaps} urlMaps={data.urltallermaps} nombre={data?.nombre} promCalificacion={data?.promediocalificacionesmaps}/>
            </section>
            <section style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
              <SectionPreguntasFrecuentes data={data} />
            </section>
            <section style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
              <SectionDescription data={data} />
            </section>
          </div>
        </div>
      </div>
      {visibleModalImage &&
        <ModalImagePerfil img={data?.fotoperfil} setVisibleModalImage={setVisibleModalImage} />}
      {visibleModalButtons && <ModalButtonsContacto data={data} setVisibleModalButtons={setVisibleModalButtons} />}

    </Layout>


  )
}

export async function getServerSideProps({ query, res }) {
  const parts = query?.id;
  const { data, error, loading } = await client.query(
    {
      query: GET_ONE_NEGOCIOVDOS,
      variables: { userName: parts.replace(/&/g, '') }
    }
  )


  if (parts == 's&i_master_paint') {
    res.setHeader('Location', '/si_master_paint');
    res.statusCode = 302; // Código de estado 302 para redirección temporal
    res.end();
    return {
      props: {
        data: data?.getOneNegocioVDos,

      },
    };
  }

  if (!data?.getOneNegocioVDos) {
    res.setHeader('Location', '/404'); // Cambia '/nueva-ruta' a la ruta deseada
    res.statusCode = 302; // Código de estado 302 para redirección temporal
    res.end();
    return { props: {} };
  }
  if (process.env.NODE_ENV === 'production' && data) {
    await client.mutate(
      {
        mutation: CREATE_ACCION,
        variables: { almacen: data?.getOneNegocioVDos?.id, tipo: 'visita-perfil', estado: 'production' }
      }
    )
  }
  return {
    props: {
      data: data?.getOneNegocioVDos,

    },
  };
}

