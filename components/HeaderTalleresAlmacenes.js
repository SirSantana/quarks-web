import styles from '../styles/Talleres.module.css'
import {useRouter} from 'next/router'
import { useState } from 'react'
import { Theme } from '../styles/Theme'


export default function HeaderTalleresAlmacenes({tipo, setBusqueda, busqueda}){
    const router = useRouter()

    let mensaje;
    let placeholder;
    if(tipo=== 'Talleres'){
        mensaje = "Encuentra tu taller!"
        placeholder = 'Coloca tu marca de auto'
    }else if(tipo==='Almacenes'){
        mensaje = "Encuentra tu almacen!"
        placeholder = 'Coloca tu marca de auto'
    }else{
        mensaje = "Encuentra tus repuestos!"
        placeholder = '¿Que repuesto estas buscando?'
    }
    
    return(
        <div className={styles.container}>
            <h2 className={styles.title}>{mensaje} </h2>

            <div className={styles.box}>
                <div className={styles.container1}>
                <span className={styles.icon}><i className="fa fa-search"></i></span>
                <input  onChange={(e)=>setBusqueda(e.target.value)}  className={styles.input} type="search" id="search" placeholder={placeholder} />
                </div>
            </div>
            {busqueda&&<h4 style={{fontSize:'16px',fontWeight:500, color:'#f50057', margin:0}}>Resultados con "{busqueda}"</h4>}
            </div>
    )
}