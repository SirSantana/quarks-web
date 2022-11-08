import styles from '../../styles/Talleres.module.css'
import { Theme } from '../../styles/Theme';
import {useQuery, gql} from '@apollo/client'

const GET_NEGOCIOS = gql`
query getNegocios{
    getNegocios{
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
`
export default function TalleresRender({}){
    const { data, loading, error } = useQuery(GET_NEGOCIOS);
    
    return(
        <>
        {loading && <h2 style={{color:'black'}}>Cargando</h2>}
        {data&& data?.getNegocios.map(el=>
            <div className={styles.card}>
            
                {el?.marcas?.map(ele=> <img src={`/${ele}.png`} alt="marca ele" style={{width:"30px" ,height:"30px"}} />)}
                 <h2 style={{fontSize:'22px', fontWeight:600, margin:0, color:'#1b333d'}}>{el.nombre}</h2>
                 <h2 style={Theme.texts.subtitle}>{el?.celular}</h2>
                 <h2 style={Theme.texts.subtitle}>{el?.ciudad}, {el.pais}</h2>
                 <h2 style={Theme.texts.subtitle}>{el?.celular}</h2>

            </div>

            )}
    </>
    )
}
