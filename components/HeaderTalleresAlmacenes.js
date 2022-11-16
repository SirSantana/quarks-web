import styles from '../styles/Talleres.module.css'
import MarcasMenu from '../utils/marcasMenu';


export default function HeaderTalleresAlmacenes({tipo, setBusqueda, busqueda, setSubmit, setMarca, marca}){


    let mensaje;
    let placeholder;
    if(tipo=== 'Talleres'){
        mensaje = "Encuentra tu taller!"
        placeholder = 'Coloca tu marca de auto'
    }else if(tipo==='Almacenes'){
        mensaje = "Encuentra tu almacen!"
        placeholder = 'Coloca tu marca de auto'
    }else if(tipo==='Cotizaciones'){
        mensaje = "Encuentra tus repuestos"
        placeholder = 'Que repuesto buscas? Es probable que alguien ya lo haya preguntado'
    }else{
        mensaje = "Encuentra tus repuestos!"
        placeholder = '¿Que repuesto estas buscando?'
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        setBusqueda(busqueda)
        setSubmit(true)
        setMarca(null)
    }
    const handleMarca=(marca)=>{
        setBusqueda('')
        setMarca(marca)
    }

    return(
        <div className={styles.container}>
            <h2 className={styles.title}>{mensaje} </h2>

            <div className={styles.box}>
                <div className={styles.container1}>
                <span className={styles.icon}><i className="fa fa-search"></i></span>
                <form onSubmit={handleSubmit}>
                <input onChange={(e)=>setBusqueda(e.target.value)}  className={styles.input} type="search" id="search" placeholder={placeholder} />
                </form>
                </div>
            </div>
            {tipo === 'Cotizaciones' &&
             <MarcasMenu handleMarca={handleMarca} marca={marca}/>
                  
            }     
            {busqueda&& tipo !== 'Cotizaciones' &&<h4 style={{fontSize:'16px',fontWeight:500, color:'#f50057', margin:0}}>Resultados con "{busqueda}"</h4>}
            {tipo === 'Cotizaciones' && <h4 style={{fontSize:'16px',fontWeight:500, color:'#f50057', margin:0}}>Resultados</h4>}
            
            </div>
    )
}