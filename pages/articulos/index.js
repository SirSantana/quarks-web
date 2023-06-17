
import { client } from "@/client";
import { GET_ALL_ARTICULOS } from "@/graphql/queries";
import { gql } from "@apollo/client";
import Link from "next/link";


let description = 'La cilindrada o desplazamiento del motor, es el volumen total de los pistones dentro de los cilindros de un motor. La fórmula para calcular el cilindraje es: π x (diámetro del cilindro²/4) multiplicado por la altura del recorrido total o carrera del pistón y por el número de pistones con los que cuenta el motor. Descubre cómo calcular la cilindrada, su relación con la potencia y la eficiencia en un motor.'

export default function Articulos({ data }) {
  
  return (
    <>
      {data?.map(el => (
        <>
        <Link key={el.id} href={`/articulos/${el.tituloPrincipal.split(" ").join('-')}-${el.id}`}>
        <h2>{el?.tituloPrincipal}</h2>
        </Link>
        </>
      ))}

    </>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_ALL_ARTICULOS
  });
  return {
    props: {
      data: data?.getAllArticulos,
    },
  };
}