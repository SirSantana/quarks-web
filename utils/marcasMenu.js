import styles from '../styles/Talleres.module.css'

export default function MarcasMenu({handleMarca, marca}){
return(
    <div className={styles.dropdown}>
             <button style={{width:'200px', height:'30px',border:'none',borderRadius:'10px',fontSize:'16px', backgroundColor:'#f50057', color:'white'}}>{marca}</button>
             <div className={styles.dropdownContent}>
             <a onClick={()=>handleMarca('Chevrolet')} >Chevrolet</a>
             <a onClick={()=>handleMarca('Mazda')}>Mazda</a>
             <a onClick={()=>handleMarca('Ford')}>Ford</a>
             <a onClick={()=>handleMarca('Renault')}>Renault</a>
             </div>
           </div>
)
}