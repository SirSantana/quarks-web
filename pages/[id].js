import { client } from "@/client";
import { CREATE_VISITA_ALMACEN } from "@/graphql/mutations";
import { GET_ONE_NEGOCIOVDOS } from "@/graphql/queries";
import useAuth from "@/hooks/useAuth";
import Layout from "@/src/Components/Layout";
import DatosImportantes from "@/src/Components/Talleres/DatosImportantes";
import HeaderHorario from "@/src/Components/Talleres/HeaderHorario";
import Horario from "@/src/Components/Talleres/Horario";
import MapaUbicacion from "@/src/Components/Talleres/MapaUbicacion";
import RedesSociales from "@/src/Components/Talleres/RedesSociales";
import ServidosOfrecidos from "@/src/Components/Talleres/ServiciosOfrecidos";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import styles from '@/styles/ServiciosAutomotriz.module.css'
import ButtonsFooter from "@/src/Components/Talleres/ButtonsFooter";
import Icon, { IconCatalog } from "@/src/Components/Icon/Icon";
import WidgetIcon from "@/src/Components/Icon/WidgetIcon";
import CardNegocioVDos from "@/src/Components/Talleres/CardNegocioVDos";




export default function NegocioVDos({ data }) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [taller, setTaller] = useState(null)

  
  let descripcionTaller = `Taller especializado en${data?.categorias?.map(el => " " + el)}. Estamos ubicados en la ${data?.direccion}. ${data?.localidad}, ${data?.ciudad}. Consulta disponibilidad aqui o al ${data?.telefono} - ${data?.whatsapp}`
  let descripcionAlmacen = `Almacen de repuestos especializado en${data?.marcasAutos?.map(el => " " + el)}. Estamos ubicados en la ${data?.direccion}. ${data?.localidad}, ${data?.ciudad}. Consulta disponibilidad aqui o al ${data?.telefono} - ${data?.whatsapp}`
  return (
    <Layout title={`${data?.nombre} `} description={data?.tipo === 'Almacen' ? descripcionAlmacen : descripcionTaller} image={data?.fotoperfil ? data?.fotoperfil : 'https://azurequarks.blob.core.windows.net/negocios/fotostoredefault.png'} url={router?.asPath} keywords={`${data?.categorias?.map(el => " Talleres de " + el + " en " + data?.ciudad)}`} tags={data?.categorias} icon={data?.fotoperfil} visibleSlider={false} visibleNavbar={false}>
      <img
        style={{ width: '100%', height: '30vh', objectFit: 'cover' }}
        src="https://www.propartes.com/wp-content/uploads/2021/05/Tullanta116.jpg"
      />
      <CardNegocioVDos data={data} user={user}/>
      <div className={styles.containerMobile} >

        {/* {data?.horario && <Horario horariosSeparados={horariosSeparados} handleVisibleHorario={handleVisibleHorario} visibleFullHorario={visibleFullHorario} handleScroll={handleScroll} />}
        <DatosImportantes data={data} ref={reff} setVisibleModalTelefono={setVisibleModalTelefono} /> */}

        {data?.categorias && <ServidosOfrecidos data={data} user={user} />}



        {data?.facebook && <RedesSociales data={data} />}
        {data?.ubicacion && <MapaUbicacion taller={taller} />}
        <ButtonsFooter data={data} user={user} />
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
      variables: { id: parts }
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