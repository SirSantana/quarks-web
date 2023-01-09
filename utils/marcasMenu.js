import styles from '../styles/Talleres.module.css'

export default function MarcasMenu({handleMarca, marca}){
return(
    <div className={styles.dropdown}>
             <button style={{width:'200px',display:'flex', flexDirection:'row', justifyContent:'space-evenly',alignItems:'center', height:'30px',border:'none',borderRadius:'5px',fontSize:'16px', backgroundColor:'white',border:'2px solid #f50057', color:'#f50057', cursor:'pointer'}}>{marca}
            <img src={'./arrowDown.png'} style={{width:'20px', height:'20px'}}/>             
             </button>
             <div className={styles.dropdownContent}>
             <a onClick={()=>handleMarca('Chevrolet')} >Chevrolet</a>
             <a onClick={()=>handleMarca('Mazda')}>Mazda</a>
             <a onClick={()=>handleMarca('Ford')}>Ford</a>
             <a onClick={()=>handleMarca('Renault')}>Renault</a>
             </div>
           </div>
)
}