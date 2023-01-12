import styles from '../../../styles/Cotizar.module.css'
import MarcasMenu from '../../../utils/marcasMenu'
import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_COTIZACION } from '../../../graphql/mutations'
import { useRouter } from 'next/router'
import ModalCargando from '../../../utils/modalCargando'
import ModalSuccesfull from '../../../utils/modalSuccesfull'
import ModalError from '../../../utils/modalError'
import useAuth from '../../../hooks/useAuth'


const initialForm = {
  garantia: '1',
  marca: '',
  pregunta: '',
  precio: '',
  descripcion: '',
  // stock: '1',
  envio: false,
  celular: '',
  estado: 'Nuevo'
}
export default function FormCotizar({ celular }) {
  const [form, setForm] = useState(initialForm)
  const validation = form.marca === initialForm.marca || form.precio === initialForm.precio
  const [visibleModal, setVisibleModal] = useState(false)
  const [createCotizacion, { data, loading, error }] = useMutation(CREATE_COTIZACION)
  const router = useRouter()
  const {user} = useAuth()
  const { asPath } = router
  const { id } = router?.query
  let idPregunta = id.split(" ")

  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value })

  }
  useEffect(() => {
    setForm({ ...form, pregunta: idPregunta[0], })
  }, [id])

  const handleSendMessage = () => {
    let link = `https://www.quarks.com.co${asPath}`
      let url = `https://api.whatsapp.com/send?phone=57${celular}`;
      url += `&text=${encodeURI(`😁 Hola, ya tienes cotizacion(es) para el repuesto de tú vehículo! \n🚘 Cotización N° ${idPregunta[0]} \n✍️ Para ver la cotización en la pagina ve al siguiente link. `+link)}&app_absent=0`
      window.open(url);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (id) {
      createCotizacion({ variables: form })
      setForm(initialForm)
      setVisibleModal(true)
    }
  }
  const handleVisibleModal = () => {
    if (visibleModal) {
      setVisibleModal(false)
      router.reload()
    }
  }
  return (
    <div onClick={handleVisibleModal} className={styles.container4} style={{ margin: 0, width: '90%' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', gap: '10px' }}>

        <label htmlFor="descripcion" className={styles.label}>Detalle de cotizacion</label>
        <input value={form.descripcion} onChange={handleChange} name='descripcion' id='descripcion' className={styles.input} type={'text'} placeholder='Coloca un mensaje de soporte de cotizacion' />


        <label htmlFor="marca" className={styles.label}>Marca / Origen</label>
        <input value={form.marca} required onChange={handleChange} id='marca' name='marca' className={styles.input} type={'text'} placeholder='General Motor' />

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <section style={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
            <label htmlFor="precio" className={styles.label}>Precio</label>
            <input value={form.precio} required onChange={handleChange} id='precio' name='precio' className={styles.input} type={'number'} placeholder='Precio' />
          </section>

          <section style={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
            <label htmlFor="garantia" className={styles.label}>Garantia en meses</label>
            <input value={form.garantia} onChange={handleChange} id='garantia' name='garantia' className={styles.input} type={'number'} placeholder='Garantia del producto' min="1" max="24" />
          </section>

        </div>



        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* <section style={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
            <label htmlFor="garantia" className={styles.label}>Stock</label>
            <input value={form.stock} onChange={handleChange} id='stock' name='stock' className={styles.input} type={'number'} placeholder='3' min="1" max="100" />
          </section> */}
          <section style={{ display: 'flex', flexDirection: 'column', width: '45%', justifyContent: 'space-between' }}>
            <label htmlFor="envio" className={styles.label}>Envio Gratis</label>
            <label className={styles.toggle}>
              <input onChange={(e) => setForm({ ...form, envio: form.envio === false ? true : false })} id='envio' name='envio' className={styles.toggleCheckbox} type="checkbox" />
              <div className={styles.toggleSwitch}></div>
            </label>

          </section>
          <section style={{ display: 'flex', flexDirection: 'column', width: '45%', justifyContent: 'space-between' }}>
            <label className={styles.label}>
              Estado
            </label>

              <select className={styles.input} style={{ width: '100px', height: '40px',  border: 'none', color:'#1b333d' }} name='estado' onChange={handleChange}>
                <option id='estado' value="Nuevo">Nuevo</option>
                <option id='estado' value="Segunda">Segunda</option>
                <option id='estado' value="Reparado">Reparado</option>
              </select>

          </section>

        </div>

        <input style={{ backgroundColor: validation ? 'gray' : '#f50057', cursor: 'pointer' }} className={styles.button} type={'submit'} value='Enviar Cotizacion' />
      </form>
      {user?.email === process.env.NEXT_PUBLIC_EMAIL && <button onClick={handleSendMessage}>Enviar mensaje</button>}

      {loading &&
        <ModalCargando mensaje={'Enviando Cotizacion...'} description={'Espera un momento'} />
      }
      {data && visibleModal &&
        <ModalSuccesfull mensaje={'Cotizacion enviada'} description={'Espera a que el comprador te contacte'} />
      }
      {error && visibleModal &&
        <ModalError mensaje={'Ha ocurrido un error'} description={error?.mensaje} />}
    </div>
  )
}