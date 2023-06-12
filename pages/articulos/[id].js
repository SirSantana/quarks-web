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


let description = 'La cilindrada o desplazamiento del motor, es el volumen total de los pistones dentro de los cilindros de un motor. La fórmula para calcular el cilindraje es: π x (diámetro del cilindro²/4) multiplicado por la altura del recorrido total o carrera del pistón y por el número de pistones con los que cuenta el motor. Descubre cómo calcular la cilindrada, su relación con la potencia y la eficiencia en un motor.'

export default function Articulo({data}) {
  
  return (
    <Layout title={'¿Como calcular el cilindraje de un vehiculo? | Quarks'} description={description}>
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