import Layout from "@/src/Components/Layout";
import styles from '@/styles/Articulos.module.css'
import HeaderArticulo from "@/src/Components/Articulos/HeaderArticulo";
import BottomHeaderInfo from "@/src/Components/Articulos/BottomHeaderInfo";
import SeccionPrincipalArticulo from "@/src/Components/Articulos/Secciones/SeccionPrincipalArticulo";
import SeccionDos from "@/src/Components/Articulos/Secciones/SeccionDos";
import SeccionTres from "@/src/Components/Articulos/Secciones/SeccionTres";
import BottomArticulo from "@/src/Components/Articulos/BottomArticulo";
import ArticulosRelacionados from "@/src/Components/Articulos/ArticulosRelacionados";
import { client } from "@/client";
import { GET_ARTICULO, } from "@/graphql/queries";
import {  useMutation } from "@apollo/client";
import { CREATE_VISTA_ARTICULO } from "@/graphql/mutations";
import { useEffect } from "react";



export default function Articulo({data}) {
  
  return (
    data &&
    <Layout title={data?.tituloPrincipal} description={data?.descripcion} keywords={data?.keywords} type='article' fecha={data?.fecha} image={data?.imgPrincipal} tags={data?.palabrasClave}>
      <div className={styles.container}>
        <HeaderArticulo autor={data?.autor} tema={data?.tema} fecha={data?.fecha}/>
        <section>
          <h1 className={styles.title}>{data?.tituloPrincipal}</h1>

          <BottomHeaderInfo tiempo={data?.tiempoLectura} id={data?.id}/>

          <SeccionPrincipalArticulo titulo={data?.tituloPrincipal} img={data?.imgPrincipal}tituloParrafo={data.tituloParrafoUno} parrafoUno={data?.parrafoUno} parrafoDos={data?.parrafoUnoDos}/>


          <SeccionDos img={data?.imgParrafoDos} tituloParrafo={data.tituloParrafoDos} parrafoUno={data?.parrafoDos} parrafoDos={data?.parrafoDosDos} />

          <SeccionTres tituloParrafo={data.tituloParrafoTres} parrafoUno={data?.parrafoTres} parrafoDos={data?.parrafoTresDos}/>

          <ArticulosRelacionados />
          <BottomArticulo palabras={data?.palabrasClave}/>

          

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
      mutation:CREATE_VISTA_ARTICULO,
      variables:{id:id}
    }
  )

  return {
    props: {
      data: data?.getArticulo,
    },
  };
}