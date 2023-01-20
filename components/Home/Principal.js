import styles from './styles.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Principal({ mainRef }) {
  const [busqueda, setBusqueda] = useState(null);
  const [submit, setSubmit] = useState(false);
  const router = useRouter()


  const handleSubmit = (e) => {
    e.preventDefault()
    setBusqueda(busqueda)
    setSubmit(true)
  }
  const handleScroll = (ref) => {
    console.log(ref);
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (busqueda) {
      router.push({ pathname: '/cotizaciones', query: { query: busqueda } })
    }
  }, [submit])

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', }}>
      <h1 className={styles.titleBlue}>Encuentra tu repuesto </h1>
      <div className={styles.box}>
        <div className={styles.container1}>
          <span className={styles.icon}><i className="fa fa-search"></i></span>
          <form onSubmit={handleSubmit}>
            <input onChange={(e) => setBusqueda(e.target.value)} className={styles.input} type="search" id="search" placeholder={'¿Que repuesto estas buscando?'} />
          </form>
        </div>
      </div>
      <button onClick={() => { handleScroll(mainRef) }} className={styles.button}>Cotiza manualmente</button>
    </div>
  )
}
