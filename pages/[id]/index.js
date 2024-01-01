import { client } from "@/client";
import { CREATE_VISITA_ALMACEN } from "@/graphql/mutations";
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
import Reseñas from "@/src/Components/Talleres/Reseñas";




export default function NegocioVDos({ data }) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [editModeHiddenButtons, setEditModeHiddenButtons] = useState(false)
  let descripcionTaller = `Taller ubicado en ${data?.direccion}. ${data?.localidad}, ${data?.ciudad}. Consulta disponibilidad aqui o al ${data?.telefono} - ${data?.whatsapp}. Taller especializado en${data?.categorias?.map(el => " " + el)}. Horario ${data?.horario}.`
  let descripcionAlmacen = `Almacen de repuestos especializado en${data?.marcasAutos?.map(el => " " + el)}. Estamos ubicados en la ${data?.direccion}. ${data?.localidad}, ${data?.ciudad}. Consulta disponibilidad aqui o al ${data?.telefono} - ${data?.whatsapp}`
  
  return (
    <Layout title={`${data?.nombre} - ${data?.ciudad}`} description={data?.tipo === 'Almacen' ? descripcionAlmacen : descripcionTaller} image={data?.fotoperfil ? data?.fotoperfil : 'https://azurequarks.blob.core.windows.net/negocios/fotostoredefault.png'} url={router?.asPath} keywords={`${data?.categorias?.map(el => " Talleres de " + el + " en " + data?.ciudad )+ ", "+ data?.nombre}`} tags={data?.categorias} icon={data?.fotoperfil} visibleSlider={false} visibleNavbar={false}>
      <img
        className={styles.imgFotoPortada}
        src={data?.fotoperfil}
        alt={`Taller mecanico ${data?.nombre} Bogota`}
      />
      <CardNegocioVDos data={data} user={user} setEditModeHiddenButtons={setEditModeHiddenButtons} />
      <div className={styles.containerMobile} >

        {/* {data?.horario && <Horario horariosSeparados={horariosSeparados} handleVisibleHorario={handleVisibleHorario} visibleFullHorario={visibleFullHorario} handleScroll={handleScroll} />}
        <DatosImportantes data={data} ref={reff} setVisibleModalTelefono={setVisibleModalTelefono} /> */}
        {data?.categorias && <ServidosOfrecidos data={data} user={user} setEditModeHiddenButtons={setEditModeHiddenButtons} />}

        {data?.urltallermaps && <MapaUbicacion ubicacion={data?.urltallermaps}  username={data?.userName}/>}

        {/* <Redes /> */}



        {(data?.facebook || data?.instagram || data?.paginaweb || user?.userName === router?.query?.id) &&
          <RedesSociales data={data} user={user} />
        }
        <Reseñas id={data?.id} />

        {!editModeHiddenButtons &&
          <ButtonsFooter data={data} user={user} />
        }
        {/* {data?.horario && <HeaderHorario handleScroll={handleScroll} visibleFullHorario={visibleFullHorario} setVisibleFullHorario={setVisibleFullHorario} horario={data?.horario} user={user} />} */}

      </div>

    </Layout>


  )
}

export async function getServerSideProps({ query, res }) {
  const parts = query?.id;
  const { data } = await client.query(
    {
      query: GET_ONE_NEGOCIOVDOS,
      variables: { userName: parts }
    }
  )
  const result = await client.mutate(
    {
      mutation: CREATE_VISITA_ALMACEN,
      variables: { id: parts }
    }
  )

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