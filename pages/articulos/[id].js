import Layout from "@/src/Components/Layout";
import styles from '@/styles/Articulos.module.css'
import HeaderArticulo from "@/src/Components/Articulos/HeaderArticulo";
import BottomHeaderInfo from "@/src/Components/Articulos/BottomHeaderInfo";
import SeccionPrincipalArticulo from "@/src/Components/Articulos/Secciones/SeccionPrincipalArticulo";
import BottomArticulo from "@/src/Components/Articulos/BottomArticulo";
import ArticulosRelacionados from "@/src/Components/Articulos/ArticulosRelacionados";
import { client } from "@/client";
import { GET_ARTICULO, } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import { CREATE_VISTA_ARTICULO } from "@/graphql/mutations";
import { useEffect } from "react";
import SeccionSecundaria from "@/src/Components/Articulos/Secciones/SeccionSecundaria";
import OtrosArticulos from "@/src/Components/Articulos/OtrosArticulos";
import { useRouter } from "next/router";
import HeaderHome from "@/src/Components/Index/HeaderHome";



export default function Articulo({ data }) {
  const router = useRouter()
  return (
    data &&
    <Layout title={data?.tituloPrincipal} description={data?.descripcion} keywords={data?.keywords} type='article' fecha={data?.fecha} image={data?.imgPrincipal} tags={data?.palabrasClave} url={router?.asPath}>
      <div className={styles.container}>
      <HeaderHome />

        <HeaderArticulo autor={data?.autor} tema={data?.tema} fecha={data?.fecha} />
        <section>
          <h1 className={styles.title}>{data?.tituloPrincipal}</h1>

          <BottomHeaderInfo tiempo={data?.tiempoLectura} id={data?.id} />

          <SeccionPrincipalArticulo titulo={data?.tituloPrincipal} img={data?.imgPrincipal} tituloParrafo={data.tituloParrafoUno} parrafoUno={data?.parrafoUno} parrafoDos={data?.parrafoUnoDos} parrafoTres={data?.parrafoUnoTres} video={data?.videoUrlUno} />

          {data?.tituloParrafoDos && <SeccionSecundaria img={data?.imgParrafoDos} tituloParrafo={data.tituloParrafoDos} parrafoUno={data?.parrafoDos} parrafoDos={data?.parrafoDosDos} parrafoTres={data?.parrafoDosTres} video={data?.videoUrlDos} />}

          {data?.tituloParrafoTres && <SeccionSecundaria img={data?.imgParrafoTres} tituloParrafo={data.tituloParrafoTres} parrafoUno={data?.parrafoTres} parrafoDos={data?.parrafoTresDos} parrafoTres={data?.parrafoTresTres} video={data?.videoUrlTres} />}

          {data?.tituloParrafoCuatro && <SeccionSecundaria img={data?.imgParrafo} tituloParrafo={data.tituloParrafoCuatro} parrafoUno={data?.parrafoCuatro} parrafoDos={data?.parrafoCuatroDos} parrafoTres={data?.parrafoCuatroTres} video={data?.videoUrlCuatro} />}

          {data?.tituloParrafoCinco && <SeccionSecundaria img={data?.imgParrafoCinco} tituloParrafo={data.tituloParrafoCinco} parrafoUno={data?.parrafoCinco} parrafoDos={data?.parrafoCincoDos} parrafoTres={data?.parrafoCincoTres} video={data?.videoUrlCinco} />}

          {data?.tituloParrafoSeis && <SeccionSecundaria img={data?.imgParrafoSeis} tituloParrafo={data.tituloParrafoSeis} parrafoUno={data?.parrafoSeis} parrafoDos={data?.parrafoSeisDos} parrafoTres={data?.parrafoSeisTres} video={data?.videoUrlSeis} />}

          <ArticulosRelacionados />
          <BottomArticulo palabras={data?.palabrasClave} />
          <OtrosArticulos img={data?.imgPrincipal}/>



        </section >
      </div >
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const parts = query?.id?.split('-');
  const id = parts[parts.length - 1];
  const { data } = await client.query(
    {
      query: GET_ARTICULO,
      variables: { id: id }
    }
  )
  const result = await client.mutate(
    {
      mutation: CREATE_VISTA_ARTICULO,
      variables: { id: id }
    }
  )

  return {
    props: {
      data: data?.getArticulo,
    },
  };
}