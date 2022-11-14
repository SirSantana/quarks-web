import Marcas from "../../Lugares/marcas";
import styles from '../../../styles/Talleres.module.css'
import { timeSince } from "../../../utils/dateEs";



export default function CardsPreguntas({el}){
  console.log(el?.fecha);
    return(
        <>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:'10px'}}>
        <div>
        <h4
            style={{
              fontSize: "20px",
              fontWeight: 700,
              margin: 0,
              color: "#1b333d",
              lineHeight:'20px'
            }}
          >
            {el.marca} {el?.referencia}
          </h4>
          <h6 style={{color:'gray', margin:0, fontWeight:400, fontSize:'14px'}}>hace {timeSince(el?.fecha)}</h6>
        </div>
        <Marcas marca={el.marca}/>

        </div>
        
      
          <h4
            style={{
              fontSize: "18px",
              fontWeight: 400,
              margin: '20px 0',
              color: "black",
              lineHeight:'20px'
            }}
          >
            {el.titulo}
          </h4>
          {/* <h4
            style={{
              fontSize: "16px",
              fontWeight: 400,
              margin: '5px 0',
              color: "gray",
            }}
          >
           Pregunta: {el.userName}
          </h4> */}
          <button className={styles.button}>Ver cotizaciones</button>

        </>
    )
}