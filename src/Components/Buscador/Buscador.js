import styles from '@/styles/Buscador.module.css'
import { useEffect, useState } from 'react'

let initial = ''
export default function Buscador({ placeholder, setBusqueda, busqueda, marca }) {
  const [prevBusqueda, setPrevBusqueda] = useState(initial)
  const handleSubmit = (e) => {
    e.preventDefault()
    setBusqueda(prevBusqueda)
  }
  useEffect(()=>{
    setPrevBusqueda(initial)
  },[marca])
  return (
    <div className={styles.box}>
      <div className={styles.container1}>
        <span className={styles.icon}><i className="fa fa-search"></i></span>
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setPrevBusqueda(e.target.value)} className={styles.input} value={prevBusqueda} type="search" id="search" placeholder={placeholder} />
        </form>
      </div>
    </div>
  )
}