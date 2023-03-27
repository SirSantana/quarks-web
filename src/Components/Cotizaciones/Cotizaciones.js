import Link from 'next/link'
import { useEffect, useRef, useState } from "react";
import styles from '@/styles/Cotizaciones.module.css'
import { useLazyQuery } from '@apollo/client';
import { GET_PREGUNTAS, GET_PREV_PREGUNTAS } from '@/graphql/queries';
import CardCotizacionCliente from './Cards/CardCotizacionCliente';
import { Loader } from '@/utils/loader';
import { ModalError } from '@/utils/Modales';




export default function CotizacionesRender({ busqueda, marca, }) {
  const [filtrado, setFiltrado] = useState([])
  const [split, setSplit] = useState(8)
  const [getPrevPreguntas, { data, loading, error }] = useLazyQuery(GET_PREV_PREGUNTAS)
  const [getBusquedaPreguntas, result] = useLazyQuery(GET_PREGUNTAS)
  const reff = useRef(null)
  const refMore = useRef(null)
  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };
  // useEffect(()=>{
  //   if(data?.getPreguntas && busqueda){
  //     let negocios = data?.getPreguntas.filter(el=>el.titulo.toLowerCase().indexOf(busqueda.toLowerCase())>=0 ||
  //     el.marca.toLowerCase().indexOf(busqueda.toLowerCase())>=0)
  //     setFiltrado(negocios)
  //   }
  // },[busqueda])
  useEffect(() => {
    getPrevPreguntas({ variables: { marca: marca, limit: split } })
    handleScroll(refMore.current)
  }, [marca, split])
  useEffect(() => {
    if (busqueda) {
      getBusquedaPreguntas({ variables: { word: busqueda } })
    }
    handleScroll(reff.current)
    if (split === 8) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth", })
    }
  }, [busqueda])
  
  return (
    <>
      <div ref={reff} className={styles.gridCotizaciones}>
        {loading && <Loader />}
        {result?.loading && <Loader />}
        {result?.data?.getBusquedaPreguntas.length<=0 && <h2 style={{width:'100%'}} className={styles.subtitle}>No se han encontrado resultados</h2>}

        {!busqueda && data?.getPreguntas.map(el => (
          <Link href={`/cotizaciones/${el.id}-${el.titulo.split(" ").join('-')}`} className={styles.card}>
            <CardCotizacionCliente el={el}  />
          </Link>
        ))}

        {result?.data?.getBusquedaPreguntas.length > 0 &&
          result?.data?.getBusquedaPreguntas.map(el => (
            el.marca === marca &&
            <Link href={`/cotizaciones/${el.id}-${el.titulo.split(" ").join('-')}`} className={styles.card}>
              <CardCotizacionCliente el={el}  />
            </Link>
          ))
        }


      </div>
      {split <= data?.getPreguntas?.length &&
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '32px', }}>
          <button ref={refMore} style={{ width: '300px', backgroundColor: 'white', color: '#f50057', border: '1px solid #f50057' }} onClick={() => setSplit(split + 8)} className={styles.button} >Cargar mas resultados</button>
        </div>
      }
      {error &&
        <ModalError title={'Ha ocurrido un error'} subtitle={error?.message} />
      }
      {result?.error &&
        <ModalError title={'Ha ocurrido un error'} subtitle={error?.message} />
      }
    </>
  );
}