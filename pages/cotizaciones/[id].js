import {useRouter} from 'next/router'
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Talleres.module.css'
import { Theme } from '../../styles/Theme';
import Link from 'next/link'
import Card from '../../components/Lugares/Card/Card';
import CardPregunta from '../../components/Cotizaciones/Cards/CardPregunta';
import { Loader } from '../../utils/loader';
import { GET_ONE_PREGUNTA } from '../../graphql/queries';
import ModalError from '../../utils/modalError';


export default function Almacen(){
  const [getPregunta,{ data, loading, error }] = useLazyQuery(GET_ONE_PREGUNTA);
  const [price, setPrice] = useState('')
  const [width, setWidth] = useState(null)
  const isMobile = width < 600
    const router = useRouter()
    const id = router.query.id
    let query = id?.substring(0, id?.indexOf(' '))
    useEffect(() => {
        if(query){
            getPregunta({variables:{id:query}})
        }
       
    },[query,])
    useEffect(() => {
      if (typeof window !== 'undefined') {
        setWidth(window.screen.width)
    }
    }, []);
    return(
        <Layout title={data?.getOnePregunta?.titulo} type='product' price={price} description={`${data?.getOnePregunta?.marca} ${data?.getOnePregunta?.referencia} ${data?.getOnePregunta?.titulo}`}>
            <section className={styles.container}>

            {!isMobile && 
            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            <Link href={'/'} style={Theme.texts.subtitle}>
              Inicio
            </Link>
            <img src ="/arrow-right-solid.svg" alt="My Happy SVG" style={{width:'12px', height:'12px', margin:'5px'}}/>

            <Link href={'/cotizaciones'} style={Theme.texts.subtitle}>
              Cotizaciones
            </Link>
            <img src ="/arrow-right-solid.svg" alt="My Happy SVG" style={{width:'12px', height:'12px', margin:'5px'}}/>

            <Link href={'#'} style={Theme.texts.subtitle}>
              {data?.getOnePregunta?.titulo}
            </Link>
            </div>}

            {loading && <Loader/>}
            {data && 
              <CardPregunta data={data?.getOnePregunta} setPrice={setPrice}/>
            }
            {error &&<ModalError mensaje={'Ha ocurrido un error'} description={error?.mensaje} />}
            
            </section>

        </Layout>
    )
}