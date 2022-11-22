import styles from '../../../styles/Talleres.module.css'



export default function CardCotizacion({setPrice, data, userId, celularVendedor, pregunta, idPregunta}){
    let fecha = new Date(data?.fecha)
    const sendMessage=()=>{
        let url = `https://api.whatsapp.com/send?phone=57${3138562763}`;
            url += `&text=${encodeURI(`😁 Hola, quiero saber si tienen disponibilidad de la cotizacion N°${data.id} \n ✍️ Descripcion:${pregunta} \n 📌 Link de la pregunta: https://www.quarks.com.co/cotizaciones/${idPregunta}`)}&app_absent=0`
            window.open(url);
    }
    setPrice(data?.precio)
    return(
        <div style={{width:'100%'}} className={styles.containerCotizaciones2}>

            <img src ="/file-pen-solid.svg" alt="Cotizacion icon" style={{width:'30px', height:'30px', margin:'5px'}}/>
            <h3 style={{color:'black', margin:' 0', fontWeight:500}}>Cotizacion</h3>

            <div style={{backgroundColor:'#f1f1f1',padding:'20px',width:'100%', boxShadow: "rgba(0, 0, 0, 0.40) 0px 3px 8px"}}>
            {/* <h2 style={{color:'black', margin:'5px 0',fontSize:'18px', fontWeight:400}}>{data.titulo} {data.marca} {data.referencia}</h2> */}
            {data?.imagen && <img src={data?.imagen} alt={pregunta} style={{width:'100%', height:'250px', margin:'5px'}}/>}
            
            <div style={{display:'flex', flexDirection:'column',margin:'5px 0'}}>
            <h3 style={{color:'black', fontSize:'24px', margin:0,fontWeight:700}}>$ {data.precio}</h3>
            <h6 style={{color:'#f50057', fontSize:'14px',margin:0, fontWeight:400}}>Precio sujeto a cambios en el tiempo</h6>
            </div>
            <h3 style={{color:'gray', margin:'5px 0',fontSize:'16px', fontWeight:400}}>Marca / origen: {data.marca}</h3>
            <h3 style={{color:'gray', margin:'5px 0',fontSize:'16px', fontWeight:400}}>Garantia: {data.garantia} mes(es)</h3>


            <h3 style={{color:'gray', margin:'5px 0 10px 0',fontSize:'16px', fontWeight:400}}>Fecha y hora : {fecha.toLocaleString()}</h3>

            {userId === data?.user 
            ?<button className={styles.button}>Tu cotizacion</button>
            :<button onClick={sendMessage} className={styles.button}>Contactar disponibilidad</button>
            }
            

            </div>
            
            </div>
    )
}