import {useRouter} from 'next/router'
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Talleres.module.css'
import { Theme } from '../../styles/Theme';
import Link from 'next/link'
import Card from '../../components/Lugares/Card/Card';

export const GET_ONE_NEGOCIO = gql`
  query getOneNegocio($id:ID){
    getOneNegocio(id:$id){
      nombre
    marcas
    tipo
    ciudad
    pais
    celular
    direccion
    }

  }
`
export default function Almacen(){
  const [getNegocio,{ data, loading, error }] = useLazyQuery( GET_ONE_NEGOCIO);

   

    const {query} = useRouter()
    useEffect(() => {
        if(query){
            getNegocio({variables:{id:query?.id}})
        }
    },[query])
    return(
        <Layout title={data?.getOneNegocio?.nombre}>
            <div className={styles.container}>

            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            <Link href={'/'} style={Theme.texts.subtitle}>
              Inicio
            </Link>
            <img src ="/arrow-right-solid.svg" alt="My Happy SVG" style={{width:'12px', height:'12px', margin:'5px'}}/>

            <Link href={'/almacenes'} style={Theme.texts.subtitle}>
              Almacenes
            </Link>
            <img src ="/arrow-right-solid.svg" alt="My Happy SVG" style={{width:'12px', height:'12px', margin:'5px'}}/>

            <Link href={'#'} style={Theme.texts.subtitle}>
              {data?.getOneNegocio?.nombre}
            </Link>
            </div>

            {loading && <h2 className={styles.title2}>Cargando...</h2>
}
            {data && 
              <Card data={data?.getOneNegocio}/>
            }
            
            </div>

        </Layout>
    )
}