import {useRouter} from 'next/router'
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { useEffect } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Talleres.module.css'
import { Theme } from '../../styles/Theme';
import Link from 'next/link'
import Product from '../../components/Lugares/Card/Product';

export const GET_ONE_PRODUCT = gql`
  query getOneProducto($id:ID){
    getOneProducto(id:$id){
     titulo
     imagen
     precio
     id
     garantia
     user
     descripcion
     linkpago
    }

  }
`

export default function ProductPage(){
    const [getOneProduct,{ data, loading, error }] = useLazyQuery( GET_ONE_PRODUCT);
   
    const {query} = useRouter()
    useEffect(() => {
        if(query){
            getOneProduct({variables:{id:query?.id}})
        }
    },[query])
    return(
        <Layout>
            <div className={styles.container} style={{marginTop:'50px'}}>

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
  {data?.getOneProducto?.titulo}
</Link>
</div>

{loading && <h2 className={styles.title2}>Cargando...</h2>
}
{data && 
  <Product data={data?.getOneProducto}/>
}

</div>
        </Layout>
    )
}