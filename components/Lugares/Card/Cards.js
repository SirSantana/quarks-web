import { Theme } from "../../../styles/Theme";
import Marcas from "../marcas";
import styles from '../../../styles/Talleres.module.css'



export default function Cards({el}){
    const handleSubmit=()=>{
      let url = `https://api.whatsapp.com/send?phone=${el.celular}`;
      url += `&text=${encodeURI('Buen dia, encontre su anuncio en Quarks, estoy interesado en:')}&app_absent=0`
      window.open(url);
      }
    return(
        <>
        {el?.marcas?.map((ele) => (
            <Marcas marca={ele}/>
          ))}
          <h4
            style={{
              fontSize: "22px",
              fontWeight: 600,
              margin: 0,
              color: "#1b333d",
            }}
          >
            {el.nombre}
          </h4>
          {el?.celular &&
          <div style={{display:'flex', flexDirection:'row', gap:'10px', alignItems:'center', margin:0}}>
          <img src ="/whatsapp.svg" alt="My Happy SVG" style={{width:'20px', height:'20px'}}/>
          <h4 style={Theme.texts.subtitle}>{el?.celular?.slice(2,el?.celular.length)}</h4>
          </div>
          }
          <div style={{display:'flex', flexDirection:'row', gap:'10px', alignItems:'center', margin:0}}>
          <img src ="/location-dot-solid.svg" alt="My Happy SVG" style={{width:'20px', height:'20px'}}/>
          <h4 style={Theme.texts.subtitle}>
            {el.direccion}. {el?.ciudad}, {el.pais}
          </h4>

          </div>
          {el.celular && 
          <button onClick={ handleSubmit} className={styles.button}>Enviar Mensaje</button>
          }
          </>
    )
}