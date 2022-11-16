import styles from '../../../styles/Talleres.module.css'
import Link from 'next/link'
import CardsPreguntas from './CardsPreguntas'

export default function CardPregunta({data}){
    return(
        <div className={styles.containerCotizaciones}>
            <div className={styles.containerCotizaciones2}>

            <img src ="/user-solid.svg" alt="User icon" style={{width:'30px', height:'30px', margin:'5px'}}/>
            <h3 style={{color:'black', margin:0, fontWeight:500}}>Pregunta</h3>
            
            <div style={{backgroundColor:'white',padding:'20px',  boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 8px"}}>
            <CardsPreguntas el={data}/>
            </div>
            </div>

            <div className={styles.containerCotizaciones2}>

            <img src ="/file-pen-solid.svg" alt="Cotizacion icon" style={{width:'30px', height:'30px', margin:'5px'}}/>
            <h3 style={{color:'black', margin:'10px 0', fontWeight:500}}>Cotizacion</h3>

            <div style={{backgroundColor:'#f1f1f1',padding:'20px',width:'100%', boxShadow: "rgba(0, 0, 0, 0.40) 0px 3px 8px"}}>
            <h2 style={{color:'black', margin:'5px 0',fontSize:'18px', fontWeight:400}}>{data.titulo} {data.marca} {data.referencia}</h2>
            <img src="https://imgur.com/QhuMkQ0.png" alt="Cotizacion icon" style={{width:'100%', height:'200px', margin:'5px'}}/>
            
            <div style={{display:'flex', flexDirection:'column',margin:'5px 0'}}>
            <h3 style={{color:'black', fontSize:'24px', margin:0,fontWeight:700}}>$ 130.000</h3>
            <h6 style={{color:'#f50057', fontSize:'14px',margin:0, fontWeight:400}}>Precio sujeto a cambios en el tiempo</h6>
            </div>
            <h3 style={{color:'gray', margin:'5px 0',fontSize:'16px', fontWeight:400}}>Marca / origen: Korea</h3>
            <h3 style={{color:'gray', margin:'5px 0',fontSize:'16px', fontWeight:400}}>Garantia: 1 mes</h3>


            <h3 style={{color:'gray', margin:'5px 0',fontSize:'16px', fontWeight:400}}>Cantidad: 1 unidad</h3>
            <h3 style={{color:'gray', margin:'5px 0 10px 0',fontSize:'16px', fontWeight:400}}>12 julio 2022</h3>

            <button className={styles.button}>Contactar disponibilidad</button>

            </div>

            </div>
        
        </div>
    )
}