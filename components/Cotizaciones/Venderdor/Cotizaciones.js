import { useRouter } from "next/router"
import useAuth from "../../../hooks/useAuth"
import { useLazyQuery } from '@apollo/client'
import { GET_COTIZACIONES_USER, GET_ONE_PREGUNTA } from "../../../graphql/queries";
import { useEffect, useRef, useState } from "react";
import CardCotizacion from "../Cards/CardCotizacion";
import CardsPreguntas from "../Cards/CardsPreguntas";
import styles from '../../Home/styles.module.css'
import ModalCargando from "../../../utils/modalCargando";
import ModalError from "../../../utils/modalError";
import { Loader } from "../../../utils/loader";
import Link from "next/link";

export default function CotizacionesVendedor({user}) {
  const router = useRouter()
  const [getCotizacionesUser, { loading, data, error }] = useLazyQuery(GET_COTIZACIONES_USER)
  const [split, setSplit] = useState(10)
  const refMore = useRef(null)

  const [getPregunta, result] = useLazyQuery(GET_ONE_PREGUNTA)
  const handleVisiblePregunta=(id)=>{
    getPregunta({variables:{id:id}})
  }
  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (router.query) {
      getCotizacionesUser({ variables: { id: router.query.id, limit: split } })
      handleScroll(refMore.current)
    }
  }, [router.query, split])
  
  return (
        <>
        {data && data?.getCotizacionesUser.map(el => (
          <>
          <div className={styles.containerCotizacionesVendedor}>
          <div className={styles.cardCotizacion}>
          <CardCotizacion data={el} userId={user?.id} />
          </div>
          <div className={styles.cardPregunta}>
          <img src ="/user-solid-blue.svg" alt="User icon" style={{width:'30px', height:'30px', margin:'5px'}}/>
            <h3 style={{color:'black', margin:'0 0 10px 0', fontWeight:500}}>Pregunta</h3>

            {result?.data && el.pregunta === result?.data?.getOnePregunta?.id ?
            <div style={{border:'1px solid lightGray', padding:'20px'}}>
              <CardsPreguntas el={result?.data?.getOnePregunta}/>
            </div>
            :
            <button className={styles.button} onClick={()=>handleVisiblePregunta(el.pregunta)}>Ver Pregunta</button>
          }
          </div>
          </div>
          <div style={{height:'1px', width:'100%', backgroundColor:'lightGray', margin:'20px 10px'}}/>
          </>

        ))}
      {split <=data?.getCotizacionesUser.length&&  <button onClick={()=>setSplit(split + 8)}className={styles.button} style={{justifyContent:'center', display:'flex', flexDirection:'row', alignItems:'center', margin:'10px auto',cursor:'pointer', backgroundColor:'white', color:'#f50057', border:'1px solid #f50057', maxWidth:'300px'}}>Cargar mas resultados</button>}

      <Link href={'/cotizaciones'}><button ref={refMore}  className={styles.button} style={{justifyContent:'center', display:'flex', flexDirection:'row', alignItems:'center', margin:'0 auto', cursor:'pointer', maxWidth:'300px', height:'50px'}}>Ir a cotizar</button></Link>
      {loading &&
        <Loader  />
      }
      {error &&
        <ModalError mensaje={'Ha ocurrido un error'} description={error?.mensaje} />}
        </>
  )
}