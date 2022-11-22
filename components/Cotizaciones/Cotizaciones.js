import styles from "../../styles/Talleres.module.css";
import { Theme } from "../../styles/Theme";
import { useQuery, gql } from "@apollo/client";
import Link from 'next/link'
import LayoutPostCharge from "../Lugares/LayoutPosts";
import Cards from "../Lugares/Card/Cards";
import { useEffect, useState } from "react";
import CardPregunta from "./Cards/CardsPreguntas";




export default function CotizacionesRender({busqueda, dataBusqueda,}) {

const [filtrado, setFiltrado] = useState([])


  // useEffect(()=>{
  //   if(data?.getPreguntas && busqueda){
  //     let negocios = data?.getPreguntas.filter(el=>el.titulo.toLowerCase().indexOf(busqueda.toLowerCase())>=0 ||
  //     el.marca.toLowerCase().indexOf(busqueda.toLowerCase())>=0)
  //     setFiltrado(negocios)
  //   }
  // },[busqueda])
return (
  <>
  <div className={styles.gridCotizaciones}>
  
    
      {/* {filtrado &&!dataBusqueda &&
      filtrado?.map((el) => (
        <Link href={`/cotizaciones/${el.id}`} className={styles.card}>
          <CardPregunta el={el}/>
        </Link>
      ))} */}
      {dataBusqueda &&
      dataBusqueda?.map((el) => (
        <Link href={`/cotizaciones/${el.id} ${el.titulo}`} className={styles.card}>
          <CardPregunta el={el}/>
        </Link>
      ))
      }
      </div>

  </>
);
}