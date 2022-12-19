import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import CotizacionesRender from "../../../components/Cotizaciones/Cotizaciones";
import HeaderTalleresAlmacenes from "../../../components/HeaderTalleresAlmacenes";
import Layout from "../../../components/Layout";
import LayoutPostCharge from "../../../components/Lugares/LayoutPosts";
import { GET_PREGUNTAS, GET_PREV_PREGUNTAS } from "../../../graphql/queries";
import styles from "../../../styles/Talleres.module.css";
import { Theme } from "../../../styles/Theme";


export default function CotizacionesFilterMarca(){
    const router = useRouter()
    const [getPrevPreguntas, result] = useLazyQuery(GET_PREV_PREGUNTAS)
    const [split, setSplit] = useState(10)
    const [busqueda, setBusqueda] = useState(null);
    const [submit, setSubmit] = useState(false);
    const [getBusquedaPreguntas, {loading, data, error}] = useLazyQuery(GET_PREGUNTAS)
    const [preguntasFiltradas, setPreguntasFiltradas] = useState([])
    
    let visibleTextWithResults=false
    useEffect(()=>{
        if(router.query.id){
            getPrevPreguntas({variables:{marca:router.query.id, limit:split}})
        }
    },[router.query.id, split])
    useEffect(()=>{
        if(busqueda){
      getBusquedaPreguntas({variables:{word:busqueda}})
        }
    setSubmit(false)

    },[submit])
    useEffect(()=>{
        if(data){
            setPreguntasFiltradas(data?.getBusquedaPreguntas.filter(el=> el.marca === router.query.id))
        }
    },[data])
    
    return(
        <Layout title={`Repuestos automotores para ${router.query.id}`}>
            <HeaderTalleresAlmacenes 
            tipo={'Marcas'}
            setBusqueda={setBusqueda}
            busqueda={busqueda} 
            setSubmit={setSubmit}
            setMarca={()=>null}
            visibleTextWithResults={visibleTextWithResults} />

            {result?.data?.getPreguntas && !busqueda
            ?<CotizacionesRender  dataBusqueda={result?.data?.getPreguntas}/>
            :<CotizacionesRender busqueda={busqueda} dataBusqueda={preguntasFiltradas}/>
            }
            
        {split <=result?.data?.getPreguntas.length && <button  onClick={()=>setSplit(split + 10)}className={styles.button} style={{justifyContent:'center', display:'flex', flexDirection:'row', alignItems:'center', margin:'10px auto',cursor:'pointer', backgroundColor:'white', color:'#f50057', border:'1px solid #f50057', maxWidth:'300px'}}>Cargar mas resultados</button>}
         <Link href={'/cotizar'}><button   className={styles.button} style={{justifyContent:'center', display:'flex', flexDirection:'row', alignItems:'center', margin:'0 auto', cursor:'pointer', maxWidth:'300px', height:'50px'}}>No encontraste tu repuesto? Cotiza manualmente</button></Link>
        
         {result?.error || result?.loading&&
        <div className={styles.gridCotizaciones}>
          {result?.error&& <h2 style={Theme.texts.title}>Ha ocurrido un error, revise su conexion</h2>}
          {result?.loading&& <LayoutPostCharge/>}
        </div>
        }

         {error || loading&&
        <div className={styles.gridCotizaciones}>
          {error&& <h2 style={Theme.texts.title}>Ha ocurrido un error, revise su conexion</h2>}
          {loading&& <LayoutPostCharge/>}
        </div>
        }
        
        </Layout>
    )
}