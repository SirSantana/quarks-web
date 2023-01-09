import Marcas from "../../Lugares/marcas";
import styles from '../../../styles/Talleres.module.css'
import { timeSince } from "../../../utils/dateEs";



export default function CardsPreguntas({ el }) {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width:'100%'}}>
          {el?.imagen && <img alt={el.titulo} src={el?.imagen} style={{ width: 'fit-content', height: '300px', marginBottom: '10px' }} />}
        </div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width:'100%',alignItems:'center'}}>
          <div>
            <h4
              style={{
                fontSize: "20px",
                fontWeight: 700,
                margin: 0,
                color: "#1b333d",
                lineHeight: '20px'
              }}
            >
              {el.marca} {el?.referencia}
            </h4>
            <h6 style={{ color: 'gray', margin: 0, fontWeight: 400, fontSize: '14px' }}>hace {timeSince(el?.fecha)}</h6>
          </div>
          <Marcas marca={el.marca} />

        </div>

      </div>


      <h4
        style={{
          fontSize: "18px",
          fontWeight: 400,
          margin: '20px 0',
          color: "black",
          lineHeight: '20px'
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