import styles from "../../styles/Talleres.module.css";
import { Theme } from "../../styles/Theme";
import { useQuery, gql } from "@apollo/client";
import Link from 'next/link'
import Marcas from "../Lugares/marcas";
import Cards from "../Lugares/Card/Cards";
import LayoutPostCharge from "../Lugares/LayoutPosts";
import { useEffect, useState } from "react";


const GET_PRODUCTOS = gql`
query getProductos {
getProductos {
    titulo
    descripcion
    precio
    id
    user
    garantia
  }
}
`;
export default function ProductosRender(){
    const { data, loading, error } = useQuery(GET_PRODUCTOS);
    const [filtrado, setFiltrado] = useState([])

    return(
        <>
    <div className={styles.grid}>
    {error && <h2 style={Theme.texts.title}>Ha ocurrido un error, revise su conexion</h2>}
      {loading && <LayoutPostCharge/>}
      {data &&filtrado.length===0 &&
        data?.getProductos.map((el) => (
          <Link href={`/talleres/${el.id}`} className={styles.card}>
            <Cards el={el}/>
          </Link>
        ))}
      {filtrado &&
      filtrado?.map((el) => (
        <Link href={`/talleres/${el.id}`} className={styles.card}>
          <Cards el={el}/>
        </Link>
      ))}
      
      </div>

    </>
    )
}