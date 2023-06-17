import Buscador from "@/src/Components/Buscador/Buscador";
import CotizacionesRender from "@/src/Components/Cotizaciones/Cotizaciones";
import Layout from "@/src/Components/Layout";
import styles from '@/styles/Cotizaciones.module.css'
import { useRouter } from "next/router";
import { useState } from "react";



const marcas = ['Mazda', 'Chevrolet', 'Renault', 'Ford']

export default function CotizacionesPage() {
  const router = useRouter()
  const [busqueda, setBusqueda] = useState(null)
  const [visibleMarca, setVisibleMarca] = useState(false)
  const [marca, setMarca] = useState('Chevrolet')

  const handleMarca = (marca) => {
    setBusqueda('')
    setMarca(marca)
  }

  return (
    <Layout title={'Cotizaciones | Quarks'} type='website' description={'Busca y encuentra tus repuestos para tu carro en Colombia facil y rapido'}>
      <div className={styles.container}>
        <h1 className={styles.title}>Encuentra tus repuestos</h1>
        <Buscador busqueda={busqueda} setBusqueda={setBusqueda} placeholder={'Que repuestos buscas? Es probable que alguien ya lo haya preguntado'} marca={marca} />

        <div onClick={() => setVisibleMarca(true)} style={{ display: 'flex', width: '80px', margin: '16px 0', flexDirection: 'row', backgroundColor: 'white', boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 8px", borderRadius: '10px', cursor: 'pointer', padding: '4px 16px', justifyContent: 'space-between' }}>
          <img src={`./${marca}.png`} style={{ height: '40px', width: '40px' }} />
          <img src='/arrowDown.svg' style={{ width: '25px', width: '25px' }} />
        </div>

      </div>
      {visibleMarca &&
        <div onClick={() => setVisibleMarca(visibleMarca ? false : true)} className={styles.modal}>
          <div className={styles.modalContent}>
            {marcas.map(el => (<img key={el} onClick={() => handleMarca(el)} style={{ height: '40px', width: '40px', cursor: 'pointer' }} src={`./${el}.png`} />))}
          </div>
        </div>
      }

      <CotizacionesRender busqueda={busqueda} marca={marca} />

    </Layout>
  )
}
