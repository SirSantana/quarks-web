import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import CotizacionesRender from "../../components/Cotizaciones/Cotizaciones";
import HeaderTalleresAlmacenes from "../../components/HeaderTalleresAlmacenes";
import Layout from "../../components/Layout";
import LayoutPostCharge from "../../components/Lugares/LayoutPosts";
import ProductosRender from "../../components/Productos/Productos";
import styles from "../../styles/Talleres.module.css";
import { Theme } from "../../styles/Theme";
import Link from 'next/link'
import { GET_PREGUNTAS, GET_PREV_PREGUNTAS } from "../../graphql/queries";
import { useRouter } from "next/router";




export default function ProductosPage(){
  const [busqueda, setBusqueda] = useState(null);
  const [submit, setSubmit] = useState(false);
  const reff = useRef(null)
  const refMore = useRef(null)

  const [marca, setMarca] = useState('Chevrolet')
  const [split, setSplit] = useState(8)
  const router = useRouter()
  
  const {query} = router.query

  const [getBusquedaPreguntas, {loading, data, error}] = useLazyQuery(GET_PREGUNTAS)
  const [getPrevPreguntas, result] = useLazyQuery(GET_PREV_PREGUNTAS)

  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };
  useEffect(()=>{
    if(marca && !submit){
      if(query){
        getBusquedaPreguntas({variables:{word:query}})
      }else{
        getPrevPreguntas({variables:{marca:marca, limit:split}})
        setBusqueda(null)
        handleScroll(refMore.current)
      }
      
    }else{
      getBusquedaPreguntas({variables:{word:busqueda}})
    }
    setSubmit(false)
    handleScroll(reff.current)
  },[submit, marca, split, router])

    return(
        <Layout title={'Cotizaciones | Quarks'} type='website'  description={'Busca y encuentra tus repuestos para tu carro en Colombia facil y rapido'}>
            <HeaderTalleresAlmacenes
        tipo={"Cotizaciones"}
        setBusqueda={setBusqueda}
        busqueda={busqueda}
        setSubmit={setSubmit}
        setMarca={setMarca}
        marca={marca}
      />
      
      <section ref={reff} className={styles.grid}>
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

        {result?.data?.getPreguntas && marca
        ?<CotizacionesRender busqueda={busqueda} dataBusqueda={result?.data?.getPreguntas}/>
      :<CotizacionesRender busqueda={busqueda} dataBusqueda={data?.getBusquedaPreguntas}/>
       }
        
      </section>
      {split <=result?.data?.getPreguntas.length && <button onClick={()=>setSplit(split + 8)}className={styles.button} style={{justifyContent:'center', display:'flex', flexDirection:'row', alignItems:'center', margin:'10px auto',cursor:'pointer', backgroundColor:'white', color:'#f50057', border:'1px solid #f50057', maxWidth:'300px'}}>Cargar mas resultados</button>}
         <Link href={'/cotizar'}><button ref={refMore}  className={styles.button} style={{justifyContent:'center', display:'flex', flexDirection:'row', alignItems:'center', margin:'0 auto', cursor:'pointer', maxWidth:'300px', height:'50px'}}>No encontraste tu repuesto? Cotiza manualmente</button></Link>
        </Layout>
    )
}