import { client } from "@/client";
import { GET_ONE_NEGOCIOVDOS } from "@/graphql/queries";
import useAuth from "@/hooks/useAuth";
import Layout from "@/src/Components/Layout";
import MapaUbicacion from "@/src/Components/Talleres/MapaUbicacion";
import RedesSociales from "@/src/Components/Talleres/RedesSociales";
import ServidosOfrecidos from "@/src/Components/Talleres/ServiciosOfrecidos";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import styles from '@/styles/ServiciosAutomotriz.module.css'
import ButtonsFooter from "@/src/Components/Talleres/ButtonsFooter";
import CardNegocioVDos from "@/src/Components/Talleres/CardNegocioVDos";
import Image from "next/image";
import dynamic from "next/dynamic";
import HorarioDias from "@/src/Components/Talleres/HorarioDias";
import CalificacionWidget from "@/src/Components/Talleres/CalificacionWidget";
import ButtonsHeader from "@/src/Components/Talleres/ButtonsHeader";
import RecomiendasTaller from "@/src/Components/Talleres/RecomiendasTaller";

const Reseñas = dynamic(() => import('@/src/Components/Talleres/Reseñas'),
  { ssr: false })
const SectionCreateTaller = dynamic(() => import('@/src/Components/Talleres/SectionCreateTaller'),
  { ssr: false })
const SliderTalleresSugeridos = dynamic(() => import('@/src/Components/Talleres/SliderTalleresSugeridos'),
  { ssr: false })
// const MapaUbicacion = dynamic(()=> import('@/src/Components/Talleres/MapaUbicacion'))
// const RedesSociales = dynamic(()=> import('@/src/Components/Talleres/RedesSociales'))

export default function NegocioVDos({ data }) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(true)
  const reseñasSectionRef = useRef(null);
  const [editModeHiddenButtons, setEditModeHiddenButtons] = useState(false)
  let descripcionTaller = `Taller ubicado en ${data?.direccion}. ${data?.localidad}, ${data?.ciudad}. Consulta disponibilidad aqui o al ${data?.telefono} - ${data?.whatsapp}. Taller especializado en${data?.categorias?.map(el => " " + el)}. Horario ${data?.horario}.`
  let descripcionAlmacen = `Almacen de repuestos especializado en${data?.marcasAutos?.map(el => " " + el)}. Estamos ubicados en la ${data?.direccion}. ${data?.localidad}, ${data?.ciudad}. Consulta disponibilidad aqui o al ${data?.telefono} - ${data?.whatsapp}`
  const horariosSeparados = data?.horario?.split(',');
  const handleClickReseñasSection = () => {
    // Hacer scroll hasta el section de Reseñas
    reseñasSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <Layout title={`${data?.nombre} - ${data?.ciudad}`} description={data?.tipo === 'Almacen' ? descripcionAlmacen : descripcionTaller} image={data?.fotoperfil ? data?.fotoperfil : 'https://azurequarks.blob.core.windows.net/negocios/fotostoredefault.png'} url={router?.asPath} keywords={`${data?.categorias?.map(el => " Talleres de " + el + " en " + data?.ciudad) + ", " + data?.nombre}`} tags={data?.categorias} icon={data?.fotoperfil} visibleSlider={false} visibleNavbar={false}>
      <Image
        sizes="100vw"
        width={500}
        height={300}
        className={styles.imgFotoPortada}
        src={data?.fotoperfil}
        priority={true}
        loading="eager"
        alt={`Taller mecanico ${data?.nombre} Bogota`}
      />
      
      <ButtonsHeader />
      <CardNegocioVDos data={data} user={user} setEditModeHiddenButtons={setEditModeHiddenButtons} onClick={handleClickReseñasSection}/>

      <div className={styles.containerMobile} >
        <RecomiendasTaller onClick={handleClickReseñasSection}/>
        {/* {data?.horario && <Horario horariosSeparados={horariosSeparados} handleVisibleHorario={handleVisibleHorario} visibleFullHorario={visibleFullHorario} handleScroll={handleScroll} />}
        <DatosImportantes data={data} ref={reff} setVisibleModalTelefono={setVisibleModalTelefono} /> */}
        {data?.categorias &&
          <section style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
            <ServidosOfrecidos  data={data} user={user} setEditModeHiddenButtons={setEditModeHiddenButtons} />
          </section>
        }




        {/* <Redes /> */}



        {(data?.facebook || data?.instagram || data?.paginaweb || user?.userName === router?.query?.id) &&
          <section style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
            <RedesSociales data={data} user={user} />
          </section>

        }
        {data?.horario &&
          <section style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
            <HorarioDias horariosSeparados={horariosSeparados} />
          </section>
        }

        {data?.urltallermaps &&
          <section style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
            <MapaUbicacion ubicacion={data?.urltallermaps} username={data?.userName} />
          </section>

        }
        <section style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
          <SliderTalleresSugeridos />
        </section>
        <section style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
          <SectionCreateTaller />
        </section>
        {data?.promediocalificacionesmaps &&
          <section ref={reseñasSectionRef} style={{ display: 'flex', gap: '32px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
            <Reseñas id={data?.id} ctdCalificaciones={data?.numerocalificacionesmaps} />
          </section>
        }

        {!editModeHiddenButtons &&
          <ButtonsFooter data={data} user={user} />
        }

      </div>

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
  // const result = await client.mutate(
  //   {
  //     mutation: CREATE_VISITA_ALMACEN,
  //     variables: { id: parts }
  //   }
  // )
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

  return {
    props: {
      data: data?.getOneNegocioVDos,

    },
  };
}