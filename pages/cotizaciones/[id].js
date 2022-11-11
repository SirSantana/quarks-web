import {useRouter} from 'next/router'
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Talleres.module.css'
import { Theme } from '../../styles/Theme';
import Link from 'next/link'
import Card from '../../components/Lugares/Card/Card';
import CardPregunta from '../../components/Cotizaciones/Cards/CardPregunta';

export const GET_ONE_PREGUNTA = gql`
  query getOnePregunta($id:ID){
    getOnePregunta(id:$id){
      titulo
    marca
    referencia
    }

  }
`
export default function Almacen(){
  const [getPregunta,{ data, loading, error }] = useLazyQuery(GET_ONE_PREGUNTA);

   

    const {query} = useRouter()
    useEffect(() => {
        if(query){
            getPregunta({variables:{id:query?.id}})
        }
    },[query])
    return(
        <Layout title={data?.getOnePregunta?.nombre}>
            <div className={styles.container}>

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
            </div>

            {loading && <h2 className={styles.title2}>Cargando...</h2>
}
            {data && 
              <CardPregunta data={data?.getOnePregunta}/>
            }
            
            </div>

        </Layout>
    )
}