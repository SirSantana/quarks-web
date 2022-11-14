import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import CotizacionesRender from "../../components/Cotizaciones/Cotizaciones";
import HeaderTalleresAlmacenes from "../../components/HeaderTalleresAlmacenes";
import Layout from "../../components/Layout";
import ProductosRender from "../../components/Productos/Productos";
import styles from "../../styles/Talleres.module.css";


const GET_PREGUNTAS = gql`
query getBusquedaPreguntas($word:String) {
  getBusquedaPreguntas(word:$word) {
   titulo
   marca
   userName
   referencia
   id
   fecha
  }
}
`;


export default function ProductosPage(){
  const [busqueda, setBusqueda] = useState(null);
  const [submit, setSubmit] = useState(null);

  

  const [getBusquedaPreguntas, {loading, data, error}] = useLazyQuery(GET_PREGUNTAS)
  useEffect(()=>{
    console.log('hola');
    getBusquedaPreguntas({variables:{word:submit}})
  },[submit])

  
    return(
        <Layout title={'Cotizaciones'}>
            <HeaderTalleresAlmacenes
        tipo={"Cotizaciones"}
        setBusqueda={setBusqueda}
        busqueda={busqueda}
        setSubmit={setSubmit}
      />
      
      <div className={styles.grid}>
        <CotizacionesRender busqueda={busqueda} dataBusqueda={data?.getBusquedaPreguntas}/>
        {/* <ProductosRender busqueda={busqueda}/> */}
      </div>
        </Layout>
    )
}