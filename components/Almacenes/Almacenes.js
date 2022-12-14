import styles from "../../styles/Talleres.module.css";
import { Theme } from "../../styles/Theme";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import Link from 'next/link'
import LayoutPostCharge from "../Lugares/LayoutPosts";
import Cards from "../Lugares/Card/Cards";
import { useEffect, useState } from "react";
import { GET_ALMACENES } from "../../graphql/queries";






export default function AlmacenesRender({busqueda, valueSplit}) {
const { data, loading, error } = useQuery(GET_ALMACENES);
// const [getAlmacens, {data, loading, error}] = useLazyQuery(GET_ALMACENS)

const [filtrado, setFiltrado] = useState([])


  useEffect(()=>{
    if(data?.getAlmacenes && busqueda){
      let negocios = data?.getAlmacenes.filter(el=>el.nombre.toLowerCase().indexOf(busqueda.toLowerCase())>=0 ||
      el.marcas.toString().toLowerCase().indexOf(busqueda.toLowerCase())>=0)
      setFiltrado(negocios)
    }
    // getAlmacens({variables:{split:valueSplit}})
  },[busqueda])

return (
  <>
  <div className={styles.grid}>
    {error && <h2 style={Theme.texts.title}>Ha ocurrido un error, revise su conexion</h2>}
    {loading && <LayoutPostCharge/>}
    {data && filtrado.length===0 &&
      data?.getAlmacenes.map((el) => (
        <Link href={`/almacenes/${el.id}`} className={styles.card}>
          <Cards el={el}/>
          
        </Link>
      ))}
      {filtrado &&
      filtrado?.map((el) => (
        <Link href={`/almacenes/${el.id}`} className={styles.card}>
          <Cards el={el}/>
        </Link>
      ))}

      </div>

  </>
);
}