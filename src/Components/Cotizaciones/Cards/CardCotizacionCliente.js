import useAuth from '@/hooks/useAuth'
import styles from '@/styles/Cotizaciones.module.css'
import { timeSince } from "@/utils/dateEs";
import Marcas from "@/utils/marcas";
import { useRouter } from 'next/router';
import { useState } from 'react';
import FormCotizar from '../FormCotizar';



export default function CardCotizacionCliente({ el }) {
  const { user } = useAuth()
  const router = useRouter()
  const { id } = router?.query

  const handleCotizar=()=>{
    if(id){
      return setFormCotizacion(true)
    }
  }
  const [formCotizacion, setFormCotizacion] = useState(false)
  return (

    <div style={{ height: '100%' }} className={styles.containerCotizaciones2}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end', marginBottom: '8px', }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
          {el?.imagen && <img alt={el?.titulo} src={el?.imagen} style={{ width: '100%', objectFit: 'contain', height: 'auto', maxHeight: '400px', marginBottom: '8px' }} />}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div>
            <h1 className={styles.title2}>{el?.referencia}</h1>
            <h6 style={{ color: 'gray', margin: 0, fontWeight: 400, fontSize: '13px' }}>hace {timeSince(el?.fecha)}</h6>
          </div>
          <Marcas marca={el?.marca} />
        </div>
      </div>
      <h4 className={styles.subtitle}>{el?.titulo}</h4>
      {user?.role === 'Vendedor' ? <button onClick={handleCotizar} className={styles.button}>Cotizar</button>
        : <button className={styles.button}>Ver cotizaciones</button>
      }
      {formCotizacion &&
          <FormCotizar setFormCotizacion={setFormCotizacion} celular={el?.celular}/>
      }
    </div>

  )
}