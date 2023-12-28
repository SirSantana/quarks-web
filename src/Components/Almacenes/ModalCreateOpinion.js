import { CREATE_OPINION } from '@/graphql/mutations'
import { GET_CALIFICACION_OPINIONES, GET_OPINIONES } from '@/graphql/queries'
import styles from '@/styles/Almacenes.module.css'
import { ModalError, ModalLoading } from '@/utils/Modales'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ModalLoginFacebook from './ModalLoginFacebook'
import { signOut, useSession } from 'next-auth/react'
import Select from 'react-select';
import { categorias2 } from '../Talleres/ServiciosOfrecidos'


export const customStyles = {
  control: (provided) => ({
    ...provided,
    border: '1px solid #f1f1f1', // Quitar el borde
    boxShadow: 'none',
    fontSize: '14px',
    width: '100%',
    height:'48px'
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#f1f1f1' : 'white', // Cambiar el color de fondo de la opción seleccionada
    color: state.isSelected ? 'white' : 'black', // Cambiar el color de texto de la opción seleccionada
    ':hover': {
      backgroundColor: '#f1f1f1', // Cambiar el color de fondo cuando se realiza un hover
      color: 'black', // Cambiar el color de texto cuando se realiza un hover
    },
    fontSize: '14px',
    color: '#5c5c5c',
    zIndex: '999'
  }),
};

const formatOptionLabel = ({ value, index, label }, { selectValue }) => {

  const isValueSelected = selectValue.some(item => item.value === value);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', justifyContent: 'space-between', width: '100%' }}>
      {
        isValueSelected
          ?
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <img src={`./${categorias2[index].img}.png`} style={{ width: '30px', height: '30px' }} alt={categorias2[index].img} />
          </div>
          :
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <img src={`./${categorias2[index].img}.png`} style={{ width: '30px', height: '30px' }} alt={categorias2[index].img} />
            <p style={{ fontSize: '12px', }}>{categorias2[index].nombre}</p>
          </div>
      }
    </div>
  );
}

const repuestosWithOptions = categorias2.map((categoria, index) => ({
  value: categoria.db,
  label: categoria.nombre,
  index: index,
}));

const Star = ({ index, form }) => {
  return (
    <img src={form.calificacion < index + 1 ? `../../star-outline.svg` : `../../star.svg`} style={{ height: '16px', width: '16px', }} />
  )
}
let estrellas = [1, 2, 3, 4, 5]
let initialForm = {
  email: '',
  descripcion: '',
  calificacion: 4,
  almacen: '',
  nombre: '',
  foto: '',
  servicios: []
}

export default function ModalCreateOpinion({ setVisibleOpinion, setCalificated, setVisibleModalLogin }) {
  const [form, setForm] = useState(initialForm)
  const router = useRouter()
  const [email, setEmail] = useState(null)
  const id = router.query.id
  let query = id?.substring(0, id?.indexOf('-'))
  const { data: session } = useSession()
  const [createOpinion, { loading, data, error }] = useMutation(CREATE_OPINION, { refetchQueries: [{ query: GET_OPINIONES, variables: { id: query } }, { query: GET_CALIFICACION_OPINIONES, variables: { id: query } }] })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })

  }
  const handleChangeServices = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);

    // Actualizar el estado con el nuevo array de servicios
    setForm({ ...form, servicios: selectedValues });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValidEmail = (email) => {
    return emailRegex.test(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!session) {
      return setVisibleModalLogin(true)
    }
    if (form.descripcion.length < 12) {
      return alert('Cuentanos mas sobre tu experiencia en este lugar!')
    }
    // const validEmail = isValidEmail(form.email)
    // if (!validEmail) {
    //   return alert('Debes colocar un email valido')
    // }
    if (!form?.almacen) {
      setForm({ ...form, almacen: query })
    }
    setForm({ ...form, nombre: session?.user?.name, foto: session?.user?.image, email: session?.user?.email })

    if (form.email !== '') {
      createOpinion({ variables: form })
      setCalificated(true)
    } else {
      return alert('Completa los campos')
    }

  }
  // useEffect(() => {
  //   setForm({ ...form, almacen: query, email: localStorage.getItem('email') })
  //   setEmail(localStorage.getItem('email'))
  // }, [query])
  useEffect(() => {
    if (session) {
      setForm({ ...form, almacen: query, nombre: session?.user?.name, foto: session?.user?.image, email: session?.user?.email })
    }
  }, [session])

  useEffect(() => {
    if (data) {
      localStorage.setItem('email', data?.createOpinion.email)
      setVisibleOpinion(false)
    }
  }, [data])


  return (
    <div className={styles.modalContent} style={{ width: '90%',boxSizing:'border-box', gap:'20px' }}>

      <header style={{ display: 'flex', marginBottom: '16px', flexDirection: 'column', gap: '10px', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
          <p style={{ flex: 1, fontWeight: '500', alignSelf: 'center', textAlign: 'center', fontSize: '14px' }}>Comparte tu experiencia</p>
          <ion-icon onClick={() => setVisibleOpinion(false)} style={{ fontSize: '24px', alignSelf: 'flex-end', cursor: 'pointer' }} name="close-outline"></ion-icon>
        </div>
        <div style={{ width: '100%', backgroundColor: '#f1f1f1', height: '1px' }} />
      </header>

      <div style={{ width: '100%', gap: '8px',  display: 'flex', flexDirection: 'column' }}>
        <h4 style={{ fontSize: '16px', color: '#373737', fontWeight: '700' }}>¿Que servicios tomaste?</h4>
        <Select formatOptionLabel={formatOptionLabel} isMulti onChange={handleChangeServices} options={repuestosWithOptions} styles={customStyles} placeholder='Seleccionar servicio' noOptionsMessage={() => 'No se encontro ningun repuesto'} />

      </div>


      <div style={{ width: '100%', gap: '8px', display: 'flex', flexDirection: 'column' }}>
        <h4 style={{ fontSize: '16px', color: '#373737', fontWeight: '700' }}>Tú vehículo</h4>
        <Select formatOptionLabel={formatOptionLabel} isMulti onChange={handleChangeServices} options={repuestosWithOptions} styles={customStyles} placeholder='Seleccionar servicio' noOptionsMessage={() => 'No se encontro ningun repuesto'} />

      </div>

      <div style={{ width: '100%', gap: '8px', display: 'flex', flexDirection: 'column' }}>

      <h4 style={{ fontSize: '16px', color: '#373737', fontWeight: '700' }}>Tú experiencia</h4>

      <div style={{ border: '1px solid #d9d9d9', borderRadius: '8px', width: '100%', boxSizing: 'border-box', padding: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'flex-start', marginBottom: '8px' }}>
          {estrellas.map((el, index) => (
            <div style={{ marginRight: '8px', cursor: 'pointer' }} onClick={() => setForm({ ...form, calificacion: index + 1 })} >
              <Star index={index} form={form} />
            </div>
          ))}
          <p className={styles.subtitle2}>{form.calificacion == 1 && 'Malo'} {form.calificacion == 2 && 'Regular'}{form.calificacion == 3 && 'Aceptable'} {form.calificacion == 4 && 'Bueno'}{form.calificacion == 5 && 'Excelente'}</p>
        </div>
        <textarea required onChange={handleChange} name='descripcion' rows="3" style={{ width: '100%', border: 'none', outline: 'none', padding: '0', resize: 'none' }} type={'text'} placeholder={'Comparte detalles de tu experiencia en este almacen'} className={styles.input} />
      </div>
      </div>











      {/* {session && <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'flex-start', margin: '16px 0 32px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', }}>
          <img style={{ borderRadius: '25px', width: '36px', height: '36px' }} src={session?.user?.image} />
          <h3 className={styles.subtitle}>{session?.user?.name}</h3>
        </div>
        <ion-icon onClick={() => signOut()} style={{ fontSize: '24px', cursor: 'pointer' }} name="log-out-outline"></ion-icon>
      </div>}
      <div style={{ border: '1px solid #d9d9d9', borderRadius: '8px', width: '100%', boxSizing: 'border-box', padding: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'flex-start', marginBottom: '8px' }}>
          {estrellas.map((el, index) => (
            <div style={{ marginRight: '8px', cursor: 'pointer' }} onClick={() => setForm({ ...form, calificacion: index + 1 })} >
              <Star index={index} form={form} />
            </div>
          ))}
          <p className={styles.subtitle2}>{form.calificacion == 1 && 'Malo'} {form.calificacion == 2 && 'Regular'}{form.calificacion == 3 && 'Aceptable'} {form.calificacion == 4 && 'Bueno'}{form.calificacion == 5 && 'Excelente'}</p>
        </div>
        <textarea required onChange={handleChange} name='descripcion' rows="3" style={{ width: '100%', border: 'none', outline: 'none', padding: '0', resize: 'none' }} type={'text'} placeholder={'Comparte detalles de tu experiencia en este almacen'} className={styles.input} />
      </div> */}

      {/* {
        !email &&
        <input required onChange={handleChange} style={{ width: '100%' }} name='email' type={'email'} placeholder={'Coloca tu correo'} className={styles.input} />
      } */}
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