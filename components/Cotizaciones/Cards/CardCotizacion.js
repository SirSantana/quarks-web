import styles from '../../../styles/Talleres.module.css'
import { useRouter } from 'next/router'
import {useLazyQuery} from '@apollo/client'
import { useEffect } from 'react'
import { GET_AVATAR_USER } from '../../../graphql/queries'
import Avatar from './HeaderCotizaciones'
import HeaderCotizacion from './HeaderCotizaciones'
import HeaderCotizaciones from './HeaderCotizaciones'


export default function CardCotizacion({setPrice, data, userId, celularVendedor, pregunta, idPregunta}){
    const router = useRouter()
    const urlPregunta = `https://www.quarks.com.co${router.asPath}`
    const sendMessage=()=>{
        let url = `https://api.whatsapp.com/send?phone=57${celularVendedor}`;
            url += `&text=${encodeURI(`😁 Hola, quiero saber si tienen disponibilidad de la cotizacion N°${data.id} \n ✍️ Descripcion:${pregunta} \n 📌 Link de la pregunta:${urlPregunta}`)}&app_absent=0`
            window.open(url);
    }
    // setPrice(data?.precio)
    return(
        <div style={{width:'100%'}} className={styles.containerCotizaciones2}>
            
            
            <div style={{backgroundColor:'#fbfbfb',padding:'20px',width:'100%', boxShadow: "rgba(0, 0, 0, 0.20) 0px 3px 8px"}}>
            {/* <h2 style={{color:'black', margin:'5px 0',fontSize:'18px', fontWeight:400}}>{data.titulo} {data.marca} {data.referencia}</h2> */}
            {/* {data?.imagen && <img src={data?.imagen} alt={pregunta} style={{width:'100%', height:'250px', margin:'5px'}}/>} */}
            <HeaderCotizaciones id={data?.user}/>
            <div style={{height:'1px', backgroundColor:'gray', margin:'10px 0'}}/>
            <div style={{display:'flex', flexDirection:'column',margin:'5px 0'}}>
                <div style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'20px'}}>
                
                <h3 style={{color:'black', fontSize:'24px', margin:0,fontWeight:700}}>$ {data.precio}</h3>
            {data?.envio &&<h4 style={{color:'green', fontSize:'18px',margin:0, marginLeft:'10px', fontWeight:600}}>Envio Gratis!</h4>}
                </div>
           

            <h6 style={{color:'#f50057', fontSize:'14px',margin:0, fontWeight:400}}>Precio sujeto a cambios en el tiempo</h6>

            </div>
            <h3 style={{color:'gray', margin:'15px 0 5px 0',fontSize:'14px', fontWeight:400}}><b>Marca / origen:</b> {data.marca}</h3>
            <h3 style={{color:'gray', margin:'5px 0',fontSize:'14px', fontWeight:400}}><b>Garantia:</b> {data.garantia} mes(es)</h3>
            
            {data?.estado && <h3 style={{color:'gray', margin:'5px 0',fontSize:'14px', fontWeight:400}}><b>Estado:</b> {data.estado}</h3>}

            {data?.stock &&<h3 style={{color:'gray', margin:'5px 0',fontSize:'16px', fontWeight:400}}>Stock : {data?.stock} Und(s)</h3>}

            {/* <h3 style={{color:'gray', margin:'5px 0 10px 0',fontSize:'16px', fontWeight:400}}>Fecha y hora : {fecha.toLocaleString()}</h3> */}

            {userId === data?.user 
            ?<button className={styles.button}>Tu cotizacion</button>
            :<button style={{marginTop:'15px'}} onClick={sendMessage} className={styles.button}>Contactar disponibilidad</button>
            }
            

            </div>
            
            </div>
    )
}