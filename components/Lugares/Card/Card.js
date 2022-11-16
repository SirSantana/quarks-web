import { Theme } from "../../../styles/Theme";
import styles from '../../../styles/Talleres.module.css'
import Marcas from "../marcas";



export default function Card({data}){
    const handleSubmit=()=>{
        let url = `https://api.whatsapp.com/send?phone=${data.celular}`;
        url += `&text=${encodeURI('Buen dia, encontre su anuncio en Quarks, estoy interesado en:')}&app_absent=0`
        window.open(url);
    }
    return(
        <div style={{width:'100%', margin:'0 auto'}}>
            <h2 className={styles.title2}>{data?.nombre}</h2>
            {data?.marcas?.map((ele) => (
              <Marcas marca={ele}/>
            ))}
            <div style={{display:'flex', flexDirection:'row', gap:'10px', alignItems:'center', margin:0}}>
            <img src ="/location-dot-solid.svg" alt="My Happy SVG" style={{width:'20px', height:'20px'}}/>
            <h4 style={Theme.texts.subtitle}>
              {data?.direccion}. {data?.ciudad}, {data?.pais}
            </h4>
            </div>
            {data?.celular &&
            <button onClick={handleSubmit} className={styles.button}>Enviar Mensaje</button>
            }
            
            </div>
    )
}