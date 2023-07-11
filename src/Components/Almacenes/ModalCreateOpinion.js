import { CREATE_OPINION } from '@/graphql/mutations'
import { GET_CALIFICACION_OPINIONES, GET_OPINIONES } from '@/graphql/queries'
import styles from '@/styles/Almacenes.module.css'
import { ModalError, ModalLoading } from '@/utils/Modales'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


const Star = ({ index, form }) => {
  return (
    <img src={form.calificacion < index + 1 ? `../../star-outline.svg` : `../../star.svg`} style={{ height: '24px', width: '24px' }} />
  )
}
let estrellas = [1, 2, 3, 4, 5]
let initialForm = {
  email: '',
  descripcion: '',
  calificacion: 4,
  almacen: '',

}

export default function ModalCreateOpinion({ setVisibleOpinion, setCalificated }) {
  const [form, setForm] = useState(initialForm)
  const router = useRouter()
  const [email, setEmail] = useState(null)
  const id = router.query.id
  let query = id?.substring(0, id?.indexOf('-'))

  const [createOpinion, { loading, data, error }] = useMutation(CREATE_OPINION, { refetchQueries: [{ query: GET_OPINIONES, variables: { id: query } }, { query: GET_CALIFICACION_OPINIONES, variables: { id: query } }] })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })

  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValidEmail = (email) => {
    return emailRegex.test(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    const validEmail = isValidEmail(form.email)
    if (!validEmail) {
      return alert('Debes colocar un email valido')
    }
    if (!form?.almacen) {
      setForm({ ...form, almacen: query })
    }
    createOpinion({ variables: form })
    setCalificated(true)
  }

  useEffect(() => {
    setForm({ ...form, almacen: query, email: localStorage.getItem('email') })
    setEmail(localStorage.getItem('email'))
  }, [query])

  useEffect(() => {
    if (data) {
      localStorage.setItem('email', data?.createOpinion.email)
      setVisibleOpinion(false)
    }
  }, [data])


  return (
    <div className={styles.modalContent} style={{ width: '300px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {estrellas.map((el, index) => (
          <div style={{ marginRight: '8px', cursor: 'pointer' }} onClick={() => setForm({ ...form, calificacion: index + 1 })} >
            <Star index={index} form={form} />
          </div>
        ))}
      </div>
      <textarea required onChange={handleChange} name='descripcion' rows="3" style={{ width: '100%', margin: '32px 0px 16px 0', resize: 'none' }} type={'text'} placeholder={'Comparte detalles de tu experiencia en este almacen'} className={styles.input} />
      {
        !email &&
        <input required onChange={handleChange} style={{ width: '100%' }} name='email' type={'email'} placeholder={'Coloca tu correo'} className={styles.input} />
      }
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', margin: '32px 0 16px 0', gap: '16px' }}>
        <button disabled={loading} onClick={handleSubmit} style={{ width: '100%', fontSize: '14px', }} className={styles.button}>Publicar</button>
        <button onClick={() => { setVisibleOpinion(false), setForm(initialForm) }} style={{ width: '100%', fontSize: '14px', backgroundColor: 'white', border: '1px solid #f50057', color: '#f50057', }} className={styles.button}>Regresar</button>
      </div>
      {loading &&
        <ModalLoading title={'Publicando...'} />}
      {error &&
        <ModalError title={'Ha ocurrido un error'} subtitle={error?.message} />
      }
    </div>
  )
}