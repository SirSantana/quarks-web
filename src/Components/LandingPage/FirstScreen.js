
import styles from '@/styles/Landing.module.css'
import { customStyles, options, options2 } from '../Main/Main'
import { useState } from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { useRouter } from 'next/router'

const initialForm = {
  servicio: 'Taller mecanico',
  localidad: 'Bogota, Colombia'
}

export default function FirstScreen() {
  const [form, setForm] = useState(initialForm)
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault()

    router.push(`/servicios-automotriz/${form.servicio}-${form.localidad}`)
  }
  const handleWha =(e)=>{
    let url = `https://api.whatsapp.com/send?phone=573125972054`;
    url += `&text=${encodeURI(`Buenos dia, vi su negocio en https://quarks.com.co${router?.asPath}, estoy interesado en...`)}&app_absent=0`
    window.open(url);
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerParent}>
        <div className={styles.containerChildUno}>
          <h1 className={styles.title}>Talleres mecanicos de Bogotá</h1>
          <h4 className={styles.subtitle}>Mas de <b>100 lugares</b> al servicio automotriz. Encuentra tu taller</h4>
          <form onSubmit={handleSubmit} className={styles.homeCard}>
            <div className={styles.select1}>
              <CreatableSelect isClearable options={options}
                styles={customStyles}
                placeholder="Buscar..."
                onChange={(e) => setForm({ ...form, servicio: e?.value })}
              />
            </div>
            <div className={styles.separador} />
            <div className={styles.select2}>
              <Select onChange={(e) => setForm({ ...form, localidad: e.value })} options={options2} styles={customStyles} defaultValue={options2[0]} />
            </div>
            <div onClick={handleSubmit}  style={{ cursor: 'pointer' }}   className={styles.buttonSearch}>
              <ion-icon style={{ color: 'white', fontSize: '24px' }} name="search-outline"></ion-icon>
            </div>
            <input type='submit' className={styles.buttonPrimary} value={'Buscar'} />

          </form>
        </div>
        <div className={styles.containerChildDos}>
          <img src={'./fotostoredefault.png'} className={styles.imgPrincipal} />
          {/* <button onClick={handleWha}>Whatsapp</button> */}
        </div>
      </div>
    </div>
  )
}