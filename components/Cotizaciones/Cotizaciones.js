import styles from "../../styles/Talleres.module.css";
import { Theme } from "../../styles/Theme";
import { useQuery, gql } from "@apollo/client";
import Link from 'next/link'
import LayoutPostCharge from "../Lugares/LayoutPosts";
import Cards from "../Lugares/Card/Cards";
import { useEffect, useState } from "react";
import CardPregunta from "./Cards/CardsPreguntas";


const GET_COTIZACIONES = gql`
query getPreguntas {
  getPreguntas {
   titulo
   marca
   userName
   referencia
   id
   fecha
  }
}
`;

export default function CotizacionesRender({busqueda, dataBusqueda}) {
const { data, loading, error } = useQuery(GET_COTIZACIONES);

const [filtrado, setFiltrado] = useState([])


  useEffect(()=>{
    if(data?.getPreguntas && busqueda){
      let negocios = data?.getPreguntas.filter(el=>el.titulo.toLowerCase().indexOf(busqueda.toLowerCase())>=0 ||
      el.marca.toLowerCase().indexOf(busqueda.toLowerCase())>=0)
      setFiltrado(negocios)
    }
  },[busqueda])
console.log(dataBusqueda);
return (
  <>
  <div className={styles.gridCotizaciones}>
  {error && <h2 style={Theme.texts.title}>Ha ocurrido un error, revise su conexion</h2>}
    {loading && <LayoutPostCharge/>}
    {data && filtrado.length===0 && dataBusqueda.length===0 &&
      data?.getPreguntas.map((el) => (
        <Link href={`/cotizaciones/${el.id}`} className={styles.card}>
          <CardPregunta el={el}/>
          
        </Link>
      ))}
      {/* {filtrado &&!dataBusqueda &&
      filtrado?.map((el) => (
        <Link href={`/cotizaciones/${el.id}`} className={styles.card}>
          <CardPregunta el={el}/>
        </Link>
      ))} */}
      {dataBusqueda &&
      dataBusqueda?.map((el) => (
        <Link href={`/cotizaciones/${el.id}`} className={styles.card}>
          <CardPregunta el={el}/>
        </Link>
      ))
      }
      </div>

  </>
);
}