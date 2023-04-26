import styles from '@/styles/Cotizaciones.module.css'
import closeIcon from '@/public/close-outline.svg'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CREATE_COTIZACION } from '@/graphql/mutations'
import { useLazyQuery, useMutation } from '@apollo/client'
import useAuth from '@/hooks/useAuth'
import { ModalError, ModalLoading, ModalSuccessfull } from '@/utils/Modales'
import sendMessage from '@/utils/fetching'
import { GET_AVATAR_USER } from '@/graphql/queries'

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
export default function FormCotizar({ setFormCotizacion, celular, long, dataVendedor }) {
  const [form, setForm] = useState(initialForm)
  const [colorBack, setColorBack] = useState('#80FF1C')
  const { user } = useAuth()
  const router = useRouter()
  const [createCotizacion, { data, loading, error }] = useMutation(CREATE_COTIZACION)

  const [visibleCotizado, setVisibleCotizado] = useState(false)

  const { asPath } = router
  const { id } = router?.query
  let link = `quarks.com.co${asPath}`

  let idPregunta = id.split("-")
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (e.target.name === 'estado') {
      if (e.target.value === 'Nuevo') {
        setColorBack('#80FF1C')
      } else if (e.target.value === 'Segunda') {
        setColorBack('#f50057')
      } else {
        setColorBack('#FFBB56')
      }
    }
  }
  const handleSendMessage = () => {
    let url = `https://api.whatsapp.com/send?phone=57${celular}`;
    url += `&text=${encodeURI(`😁 Hola, ya tienes cotizacion(es) para el repuesto de tú vehículo! \n🚘 Cotización N° ${idPregunta[0]} \n✍️ Para ver la(s) cotización en la pagina ve al siguiente link. ` + link)}&app_absent=0`
    window.open(url);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    form.precio = form.precio.replace(new RegExp(/[^\d]/, 'ig'), "")

    if (id) {
      createCotizacion({ variables: form })
      setForm(initialForm)
    }
  }
  useEffect(() => {
    setForm({ ...form, pregunta: idPregunta[0], })
  }, [id])
  useEffect(() => {
    // let total = (Number(data?.createCotizacion?.precio)+ Number(data?.createCotizacion?.precio * 0.10)).toString()

    if (data) {
      setVisibleCotizado(true)
      setTimeout(() => {
        setVisibleCotizado(false)
        router.reload()
      }, 2000)

      if (long == undefined && data ) {
        let frase = `😁¡Nueva Cotizacion! de Almacen ${dataVendedor?.almacen} \n🧑 Precio: $ ${data?.createCotizacion?.precio}. Marca / Origen: ${data?.createCotizacion?.marca}\n 📍Ubicacion: ${dataVendedor?.direccion}. ${dataVendedor?.ciudad}\n✍️ Para ver la(s) cotización al detalle ve al siguiente link: \n` + link
        sendMessage({ titulo: frase, number: `57${celular}` })
      } else {
        let frase = `😁¡Nueva Cotizacion! de Almacen ${dataVendedor?.almacen} \n🧑 Precio: $ ${data?.createCotizacion?.precio}. Marca / Origen: ${data?.createCotizacion?.marca}\n 📍Ubicacion: ${dataVendedor?.direccion}. ${dataVendedor?.ciudad} \n✍️ Para ver la(s) cotización al detalle ve al link en la parte de arriba`
        sendMessage({ titulo: frase, number: `57${celular}` })
      }
    }
  }, [data])
  return (
    <div className={styles.modal} >
      <div style={{ width: '300px', backgroundColor: 'white', padding: '16px', borderRadius: '8px' }} className={styles.modalContent}>
        <img onClick={() => setFormCotizacion(false)} src={closeIcon.src} style={{ width: '26px', height: '26px', alignSelf: 'flex-end', cursor: 'pointer' }} />

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginTop: '8px', gap: '10px', width: '100%' }}>

          <label htmlFor="descripcion" className={styles.label}>Detalle de cotizacion</label>
          <input value={form.descripcion} onChange={handleChange} name='descripcion' id='descripcion' className={styles.input} type={'text'} placeholder='Coloca un mensaje de soporte de cotizacion' />


          <label htmlFor="marca" className={styles.label}>Marca / Origen</label>
          <input value={form.marca} required onChange={handleChange} id='marca' name='marca' className={styles.input} type={'text'} placeholder='General Motor' />

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <section style={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
              <label htmlFor="precio" style={{ marginBottom: '8px' }} className={styles.label}>Precio</label>
              <input value={form.precio} required onChange={handleChange} id='precio' name='precio' className={styles.input} type={'number'} placeholder='Precio' />
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
              <label htmlFor="garantia" style={{ marginBottom: '8px' }} className={styles.label}>Garantia en meses</label>
              <input value={form.garantia} onChange={handleChange} id='garantia' name='garantia' className={styles.input} type={'number'} placeholder='Garantia del producto' min="1" max="24" />
            </section>

          </div>



          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

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

              <select className={styles.input} style={{ backgroundColor: colorBack, width: '100px', padding: '4px', height: '40px', border: 'none', color: '#1b333d' }} name='estado' onChange={handleChange}>
                <option style={{ backgroundColor: '#80FF1C', color: '#3E8C00' }} id='estado' value="Nuevo">Nuevo</option>
                <option style={{ backgroundColor: '#f50057', color: '#5B0221' }} id='estado' value="Segunda">Segunda</option>
                <option style={{ backgroundColor: '#FFBB56', color: '#945E0D' }} id='estado' value="Reparado">Reparado</option>
              </select>

            </section>

          </div>

          <input disabled={loading} className={styles.button} type={'submit'} value='Enviar Cotizacion' />
          {user?.email === process.env.NEXT_PUBLIC_EMAIL && <button onClick={handleSendMessage}>Enviar mensaje</button>}

        </form>
      </div>
      {visibleCotizado &&
        <ModalSuccessfull title={'Tu cotización ha sido enviada!'} subtitle={'Espera a que el cliente te contacte'} />
      }
      {loading &&
        <ModalLoading title={'Enviando Cotizacion ... '} />
      }
      {error &&
        <ModalError title={'Ha ocurrido un error'} subtitle={error?.message} />
      }
    </div>

  )
}