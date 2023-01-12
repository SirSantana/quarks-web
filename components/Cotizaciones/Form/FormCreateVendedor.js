import { useMutation } from '@apollo/client'
import { useRef, useState } from 'react'
import { CREATE_VENDEDOR } from '../../../graphql/mutations'
import styles from '../../../styles/Cotizar.module.css'
import ModalCargando from '../../../utils/modalCargando'
import ModalError from '../../../utils/modalError'
import ModalSuccesfull from '../../../utils/modalSuccesfull'

let marcas = ['Chevrolet', 'Mazda', 'Ford', 'Renault']

const initialForm = {
  celular: '',
  marcas: [],
  name: '',
  almacen: '',
  direccion: '',
  email: '',
  ciudad: '',
  verified:false,
  password:''
}
export default function FormCreateVendedor() {
  const [form, setForm] = useState(initialForm)
  const validation = form.name=== initialForm.name|| form.ciudad === initialForm.ciudad || form.password === initialForm.password ||form.direccion === initialForm.direccion ||form.almacen === initialForm.almacen || form.celular === initialForm.celular || form.email === initialForm.email
  const [visibleModal, setVisibleModal] = useState(true)
  const [checkedState, setCheckedState] = useState(new Array(marcas.length).fill(false));
  const [createVendedor, {loading, data, error}] = useMutation(CREATE_VENDEDOR)
  const handleChecked = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    )
    setCheckedState(updatedCheckedState);
    setForm({...form,marcas:updatedCheckedState})
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setForm(initialForm)
    setVisibleModal(true)
    createVendedor({variables:form})
    setCheckedState(new Array(marcas.length).fill(false))
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <div onClick={() => setVisibleModal(false)} className={styles.container4}  >
      <h1 className={styles.title2}>Registrate</h1>
      <h3 className={styles.subtitle}>Completa los campos, y envia el formulario.</h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginTop: '40px', gap: '10px' }}>
        <label htmlFor="celular" className={styles.label}>Marcas Comercializadas</label>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin:0}}>
          {marcas.map((el, index) => {
            return (
              <div >
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={el}
                  value={el}
                  checked={checkedState[index]}
                  onChange={() => handleChecked(index)}
                  className={styles.checkInput}
                />
                <label style={{ color: '#1b333d' }} htmlFor={index}>{el}</label>
              </div>
            );
          })}
        </div>
        <label htmlFor="name" className={styles.label}>Tú nombre </label>
        <input value={form.name} required onChange={handleChange} name='name' id='name' className={styles.input} type={'text'} />

        <label htmlFor="almacen" className={styles.label}>Nombre del Almacen</label>
        <input value={form.almacen} required onChange={handleChange} name='almacen' id='almacen' className={styles.input} type={'text'} />

        <label htmlFor="direccion" className={styles.label}>Direccion</label>
        <input value={form.direccion} required onChange={handleChange} id='direccion' name='direccion' className={styles.input} type={'text'} />

        <label htmlFor="ciudad" className={styles.label} >Ciudad</label>
        <input value={form.ciudad} required onChange={handleChange} id='ciudad' name='ciudad' className={styles.input} type={'text'} />

        <label htmlFor="celular" className={styles.label}>Celular</label>
        <input value={form.celular} required onChange={handleChange} id='celular' name='celular' className={styles.input} type={'number'} />
        
        <label htmlFor="email" className={styles.label}>Correo</label>
        <input value={form.email} required onChange={handleChange} id='email' name='email' className={styles.input} type={'email'} />

        <label htmlFor="password" className={styles.label}>Contraseña</label>
        <input value={form.password} required onChange={handleChange}  id='password' name='password' className={styles.input} type={'password'} />
        {/* BASE64 */}
        {/* <input onChange={(e) => handleFileUpload(e).then(res=> setForm({...form, imagen:res}))} accept="image/*" id='imagen' name='imagen' style={{color:'gray'}} type={'file'}  /> */}

        <input style={{ backgroundColor: validation ? 'gray' : '#f50057', cursor: 'pointer' }} className={styles.button} type={'submit'} value='Registrarse' />
      </form>
      {loading &&
        <ModalCargando mensaje={'Enviando Datos...'} description={'Espera un momento'} />
      }
      {data && visibleModal &&
        <ModalSuccesfull mensaje={'Solicitud Enviada!'} description={'Te avisaremos por correo y whatsapp la validacion de tu cuenta de vendedor'} />
      }
      {error && visibleModal &&
        <ModalError mensaje={'Ha ocurrido un error'} description={error?.mensaje} />}
    </div>

  )
}