import styles from '../../../styles/Talleres.module.css'
import Link from 'next/link'

export default function Product({data}){
    return(
        <div className={styles.productContainer}>
            
          <img  src={`data:image/jpeg;base64,${data.imagen}`}  alt='Imagen repuesto' className={styles.productImage}/>
            <div style={{justifyContent:'center', display:'flex', flexDirection:'column'}}>
            <h2 className={styles.title2} style={{margin:'10px 0'}}>{data?.titulo}</h2>
            <h3 style={{color:'gray', fontSize:'22px', fontWeight:500, margin:0}}>$ {data?.precio}</h3>
            <h4 style={{color:'black', fontSize:'16px', fontWeight:400, margin:'20px 0'}}> {data?.descripcion}</h4>
            <h4 style={{color:'black', fontSize:'16px', fontWeight:400, margin:'20px 0'}}> Garantia {data?.garantia} meses</h4>
            <h4 style={{color:'black', fontSize:'16px', fontWeight:400, margin:'20px 0'}}> Cantidad 1 ({data?.unidades}disponibles)</h4>
            <Link href={data?.linkpago}><button  style={{cursor:'pointer', backgroundColor:'#f50057',fontSize:'16px',fontWeight:'500', width:'100%', height:'50px', border:'none', borderRadius:'10px', color:'white'}}>Comprar ahora</button></Link>
           


            </div>
        </div>
    )
}