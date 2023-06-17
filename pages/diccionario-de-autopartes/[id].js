import { client } from "@/client";
import { CREATE_VISTA_ARTICULO } from "@/graphql/mutations";
import { GET_ARTICULO } from "@/graphql/queries";
import BottomHeaderInfo from "@/src/Components/Articulos/BottomHeaderInfo";
import SeccionPrincipalArticulo from "@/src/Components/Articulos/Secciones/SeccionPrincipalArticulo";
import SeccionSecundaria from "@/src/Components/Articulos/Secciones/SeccionSecundaria";
import HeaderHome from "@/src/Components/Index/HeaderHome";
import Layout from "@/src/Components/Layout";


import styles from '@/styles/Diccionario.module.css'
import data from '@/utils/repuestos.json'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Repuesto({ data }) {
  console.log(data);
  return (
    <Layout>

      <div className={styles.container}>
        <HeaderHome />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
            <header className={styles.containerHeader}>
              <p className={styles.subtitleCategory}>{data?.tema}</p>
              <h1 className={styles.title2}>{data?.tituloPrincipal}</h1>
            </header>
            <BottomHeaderInfo tiempo={data?.tiempoLectura} id={data?.id} />
          </div>
          <img src={data?.imgPrincipal} className={styles.icon} style={{ height: '100px' }} />

        </div>
        <div style={{ width: '100%', backgroundColor: '#bababa', height: '1px', margin: '0' }} />
        <SeccionPrincipalArticulo titulo={data?.tituloPrincipal}  tituloParrafo={data.tituloParrafoUno} parrafoUno={data?.parrafoUno} parrafoDos={data?.parrafoUnoDos} parrafoTres={data?.parrafoUnoTres} video={data?.videoUrlUno} />

        {data?.tituloParrafoDos && <SeccionSecundaria img={data?.imgParrafoDos} tituloParrafo={data.tituloParrafoDos} parrafoUno={data?.parrafoDos} parrafoDos={data?.parrafoDosDos} parrafoTres={data?.parrafoDosTres} video={data?.videoUrlDos} />}

        {data?.tituloParrafoTres && <SeccionSecundaria img={data?.imgParrafoTres} tituloParrafo={data.tituloParrafoTres} parrafoUno={data?.parrafoTres} parrafoDos={data?.parrafoTresDos} parrafoTres={data?.parrafoTresTres} video={data?.videoUrlTres} />}

        {data?.tituloParrafoCuatro && <SeccionSecundaria img={data?.imgParrafo} tituloParrafo={data.tituloParrafoCuatro} parrafoUno={data?.parrafoCuatro} parrafoDos={data?.parrafoCuatroDos} parrafoTres={data?.parrafoCuatroTres} video={data?.videoUrlCuatro} />}

        {data?.tituloParrafoCinco && <SeccionSecundaria img={data?.imgParrafoCinco} tituloParrafo={data.tituloParrafoCinco} parrafoUno={data?.parrafoCinco} parrafoDos={data?.parrafoCincoDos} parrafoTres={data?.parrafoCincoTres} video={data?.videoUrlCinco} />}

        {data?.tituloParrafoSeis && <SeccionSecundaria img={data?.imgParrafoSeis} tituloParrafo={data.tituloParrafoSeis} parrafoUno={data?.parrafoSeis} parrafoDos={data?.parrafoSeisDos} parrafoTres={data?.parrafoSeisTres} video={data?.videoUrlSeis} />}

        {/* <ArticulosRelacionados />
        <BottomArticulo palabras={data?.palabrasClave} />
        <OtrosArticulos img={data?.imgPrincipal} /> */}
      </div>
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