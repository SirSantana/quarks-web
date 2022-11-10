import styles from "../../styles/Talleres.module.css";
import { Theme } from "../../styles/Theme";
import { useQuery, gql } from "@apollo/client";
import Link from 'next/link'
import Marcas from "../Lugares/marcas";
import Cards from "../Lugares/Card/Cards";
import LayoutPostCharge from "../Lugares/LayoutPosts";
import { useEffect, useState } from "react";
import ProductsCard from "../Lugares/Card/Products";


const GET_PRODUCTOS = gql`
query getProductos {
getProductos {
    titulo
    precio
    id
    imagen
  }
}
`;
export default function ProductosRender({busqueda}){
    const { data, loading, error } = useQuery(GET_PRODUCTOS);
    const [filtrado, setFiltrado] = useState([])

    useEffect(()=>{
      if(data?.getProductos && busqueda){
        let negocios = data?.getProductos.filter(el=>el.titulo.toLowerCase().indexOf(busqueda.toLowerCase())>=0)
        setFiltrado(negocios)
      }
    },[busqueda])
    return(
        <>
    <div className={styles.gridProducts}>
    {error && <h2 style={Theme.texts.title}>Ha ocurrido un error, revise su conexion</h2>}
      {loading && <LayoutPostCharge/>}
      {data &&filtrado.length===0 &&
        data?.getProductos.map((el) => (
          <Link href={`/productos/${el.id}`} className={styles.cardProduct}>
            <ProductsCard el={el}/>
          </Link>
        ))}
      {filtrado &&
      filtrado?.map((el) => (
        <Link href={`/productos/${el.id}`} className={styles.cardProduct}>
          <ProductsCard el={el}/>
        </Link>
      ))}
      
      </div>

    </>
    )
}