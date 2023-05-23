import styles from '@/styles/Almacenes.module.css'
import Link from "next/link";
import Almacen from "./Almacen";
import { GET_ALMACENES_BY_CATEGORIA } from "@/graphql/queries";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";


export default function AlmacenesByCategoria({categoria}) {
  const [getAlmacenesByCategoria,{ loading, data, error }] = useLazyQuery(GET_ALMACENES_BY_CATEGORIA)
  const handleChangePestaña = (almacen) => {
    window.open(`/almacenes/${almacen?.id}-${almacen?.nombre?.split(" ").join('-')}`);
  }
  useEffect(()=>{
    getAlmacenesByCategoria({variables:{categoria:categoria}})
  },[categoria])
  return (
    <h2>Hola</h2>
    // <Slider className={styles.slider} {...settings}>
    //   {data?.getAlmacenesByCategoria?.map(almacen => (
    //     <Link style={{textDecoration:'none'}} href={'#'} onClick={() => handleChangePestaña(almacen)} >
    //       <div style={{margin:'16px 8px'}} className={styles.card}>
    //         <Almacen almacen={almacen} />
    //       </div>
    //     </Link>
    //   ))}
    // </Slider>
  )
}