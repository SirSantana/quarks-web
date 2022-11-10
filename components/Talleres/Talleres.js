import styles from "../../styles/Talleres.module.css";
import { Theme } from "../../styles/Theme";
import { useQuery, gql } from "@apollo/client";
import Link from 'next/link'
import Marcas from "../Lugares/marcas";
import Cards from "../Lugares/Card/Cards";
import LayoutPostCharge from "../Lugares/LayoutPosts";
import { useEffect, useState } from "react";

const GET_TALLERES = gql`
  query getTalleres {
    getTalleres {
      nombre
      marcas
      tipo
      ciudad
      pais
      id
      direccion
      celular
      repuestos
    }
  }
`;
export default function TalleresRender({busqueda}) {
  const { data, loading, error } = useQuery(GET_TALLERES);
  const [filtrado, setFiltrado] = useState([])



  useEffect(()=>{
    if(data?.getTalleres && busqueda){
      let negocios = data?.getTalleres.filter(el=>el.nombre.toLowerCase().indexOf(busqueda.toLowerCase())>=0)
      setFiltrado(negocios)
    }
  },[busqueda])
  
  return (
    <>
    <div className={styles.grid}>
    {error && <h2 style={Theme.texts.title}>Ha ocurrido un error, revise su conexion</h2>}
      {loading && <LayoutPostCharge/>}
      {data &&filtrado.length===0 &&
        data?.getTalleres.map((el) => (
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
  );
}
