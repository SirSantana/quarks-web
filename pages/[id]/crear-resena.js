import { CREATE_OPINION } from '@/graphql/mutations'
import { GET_CALIFICACION_OPINIONES, GET_OPINIONES } from '@/graphql/queries'
import styles from '@/styles/Almacenes.module.css'
import { ModalError, ModalLoading, ModalSuccessfull } from '@/utils/Modales'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Select from 'react-select';
import { categorias2 } from '@/src/Components/Talleres/ServiciosOfrecidos'
import Layout from '@/src/Components/Layout'
import ModalLoginFacebook from '@/src/Components/Almacenes/ModalLoginFacebook'


export const marcas = [
  { value: 'Chevrolet', label: 'Chevrolet', img: '../Chevrolet.png' },
  { value: 'Renault', label: 'Renault', img: '../Renault.png' },
  { value: 'Nissan', label: 'Nissan', img: '../Nissan.png' },
  { value: 'Mazda', label: 'Mazda', img: '../Mazda.png' },
  { value: 'Toyota', label: 'Toyota', img: '../Toyota.png' },
  { value: 'Ford', label: 'Ford', img: '../Ford.png' },
  { value: 'Kia', label: 'Kia', img: '../Kia.png' },
  { value: 'Hyundai', label: 'Hyundai', img: '../Hyundai.png' },
  { value: 'Volkswagen', label: 'Volkswagen', img: '../Volkswagen.png' },
  { value: 'Honda', label: 'Honda', img: '../Honda.png' },
  { value: 'BMW', label: 'BMW', img: '../BMW.png' },
  { value: 'Mercedes-Benz', label: 'Mercedes-Benz', img: '../MercedesBenz.png' },
  { value: 'Audi', label: 'Audi', img: '../Audi.png' },
  { value: 'Jeep', label: 'Jeep', img: '../Jeep.png' },
  { value: 'Suzuki', label: 'Suzuki', img: '../Suzuki.png' },
  { value: 'Peugeot', label: 'Peugeot', img: '../Peugeot.png' },
  { value: 'Fiat', label: 'Fiat', img: '../Fiat.png' },
  { value: 'Volvo', label: 'Volvo', img: '../Volvo.png' },
  { value: 'Mitsubishi', label: 'Mitsubishi', img: '../Mitsubishi.png' },
];
export const customStyles = {
  control: (provided) => ({
    ...provided,
    border: '1px solid #d9d9d9', // Quitar el borde
    boxShadow: 'none',
    fontSize: '14px',
    width: '100%',
    height: '48px',

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
    zIndex: '999',
  }),
};
export const customStyles2 = {
  control: (provided) => ({
    ...provided,
    border: '1px solid #d9d9d9', // Quitar el borde
    boxShadow: 'none',
    fontSize: '14px',
    width: '90px',
    height: '48px'
  }),
  menu: (provided) => ({
    ...provided,
    width: '90px',  // Ajusta este valor según tus necesidades
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: 'flex', // Ocultar el icono de flecha
  }),
  indicatorSeparator: () => ({
    display: 'none', // Ocultar la línea horizontal
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
    zIndex: '999',
    display: 'flex', // Hacer que el contenedor sea un flexbox
    alignItems: 'center', // Centrar verticalmente
    justifyContent: 'center',
  }),
};
export const formatOptionLabel = ({ value, index, label }, { selectValue }) => {

  const isValueSelected = selectValue.some(item => item.value === value);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', justifyContent: 'space-between', width: '100%' }}>
      {
        isValueSelected
          ?
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <img src={`../${categorias2[index].img}.png`} style={{ width: '30px', height: '30px' }} alt={categorias2[index].img} />
          </div>
          :
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <img src={`../${categorias2[index].img}.png`} style={{ width: '30px', height: '30px' }} alt={categorias2[index].img} />
            <p style={{ fontSize: '12px', }}>{categorias2[index].nombre}</p>
          </div>
      }
    </div>
  );
}
export const marcasWithOptions = marcas.map((marca, index) => ({
  value: marca.value,
  label: (
    <img src={marca.img} alt={marca.label} style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
  ),
  index: index
}));

export const repuestosWithOptions = categorias2.map((categoria, index) => ({
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
  servicios: [],
  marca: 'Chevrolet',
  referencia: ''
}


export default function CreateReseña({ setVisibleOpinion, setCalificated, }) {
  const [form, setForm] = useState(initialForm)
  const router = useRouter()
  const [email, setEmail] = useState(null)
  const { id, ide } = router.query
  const [visibleModalLogin, setVisibleModalLogin] = useState(false)
  const { data: session } = useSession()
  const [createOpinion, { data, error, loading }] = useMutation(CREATE_OPINION,  {
    update: (cache, result) => {
      // Intentar leer los datos de la cache
      const existingOpinions = cache.readQuery({
        query: GET_OPINIONES,
        variables: { id: ide },
      });
      // Verificar si los datos existen y tienen la propiedad 'getOpiniones'
      if (existingOpinions && existingOpinions.getOpiniones) {
        const newOpinion = result?.data.createOpinion;

        // Actualizar la cache
        cache.writeQuery({
          query: GET_OPINIONES,
          variables: { id: ide },
          data: {
            getOpiniones: [newOpinion, ...existingOpinions.getOpiniones],
          },
        });
      }
    },
    refetchQueries:[{query:GET_CALIFICACION_OPINIONES, variables:{id:ide}}]
  }, );
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    
  }
  const handleChangeServices = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.label);
    // Actualizar el estado con el nuevo array de servicios
    setForm({ ...form, servicios: selectedValues });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!session) {
      return setVisibleModalLogin(true)
    }
    if (form.descripcion.length < 12) {
      return alert('Cuentanos mas sobre tu experiencia en este lugar!')
    }
    setForm({ ...form, almacen: ide, nombre: session?.user?.name, foto: session?.user?.image, email: session?.user?.email })
    if (form.email !== '' && form.descripcion!== '' && form.referencia !== '' && form.servicios.length> 0) {
      createOpinion({ variables: form })
      // setCalificated(true)
    } else {
      return alert('Completa los campos')
    }

  }

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        router.push(`/${id}`)
      }, 2000)
    }
  }, [data])
  useEffect(() => {
    if(!session){
      return setVisibleModalLogin(true)
    }
    setVisibleModalLogin(false)
    setForm({ ...form, almacen: ide, nombre: session?.user?.name, foto: session?.user?.image, email: session?.user?.email })
  }, [session]);
  return (
    <Layout title={'Crear reseña'} visibleNavbar={false}>

      <div style={{ maxWidth: '400px', width: '90%', margin: '0 auto', display: 'flex', flexDirection: 'column', padding: '16px 0', boxSizing: 'border-box', gap: '40px' }}>

        <header style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
            <p style={{ flex: 1, fontWeight: '500', alignSelf: 'center', textAlign: 'center', fontSize: '14px' }}>Comparte tu experiencia</p>
            <ion-icon onClick={() => router.push(`/${id}`)} style={{ fontSize: '24px', alignSelf: 'flex-end', cursor: 'pointer' }} name="close-outline"></ion-icon>
          </div>
          <div style={{ width: '100%', backgroundColor: '#f1f1f1', height: '1px' }} />
        </header>

        <div style={{ width: '100%', gap: '8px', height: 'fitContent', display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ fontSize: '16px', color: '#373737', fontWeight: '700' }}>¿Que servicios tomaste?</h4>
          <Select isSearchable={false} formatOptionLabel={formatOptionLabel} isMulti onChange={handleChangeServices} options={repuestosWithOptions} styles={customStyles} placeholder='Seleccionar servicio' noOptionsMessage={() => 'No se encontro ningun repuesto'} />
        </div>


        <div style={{ width: '100%', gap: '8px', display: 'flex', flexDirection: 'column', }}>
          <h4 style={{ fontSize: '16px', color: '#373737', fontWeight: '700' }}>Tú vehículo</h4>
          <div style={{ display: 'flex', width: '100%', gap: '8px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Select onChange={(e) => setForm({ ...form, marca: e.value })} options={marcasWithOptions} isSearchable={false} styles={customStyles2} placeholder={<img src={marcas[0].img} style={{ width: '30px', height: '30px', marginTop: '4px' }} />} defaultValue={marcas[0].img} />
            <input required id="referencia" type='text' onChange={handleChange} name='referencia' value={form.referencia} className={styles.inputChooseMarca} placeholder='Modelo - Cilindraje - Año' />
          </div>
        </div>

        <div style={{ width: '100%', gap: '8px', display: 'flex', flexDirection: 'column' }}>

          <h4 style={{ fontSize: '16px', color: '#373737', fontWeight: '700' }}>Tú experiencia</h4>

          <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px', width: '100%', boxSizing: 'border-box', padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignSelf: 'flex-start', marginBottom: '8px' }}>
              {estrellas.map((el, index) => (
                <div style={{ marginRight: '8px', cursor: 'pointer' }} onClick={() => setForm({ ...form, calificacion: index + 1 })} >
                  <Star index={index} form={form} />
                </div>
              ))}
              <p className={styles.subtitle2}>{form.calificacion == 1 && 'Malo'} {form.calificacion == 2 && 'Regular'}{form.calificacion == 3 && 'Aceptable'} {form.calificacion == 4 && 'Bueno'}{form.calificacion == 5 && 'Excelente'}</p>
            </div>
            <textarea required onChange={handleChange} name='descripcion' rows="5" value={form?.descripcion} style={{ width: '100%', fontSize: '14px', border: 'none', outline: 'none', padding: '0', resize: 'none', margin: 0 }} type={'text'} placeholder={'Comparte detalles de tu experiencia'} className={styles.input} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', margin: '32px 0 16px 0', gap: '16px' }}>
          <button disabled={loading} onClick={handleSubmit} style={{ width: '100%', fontSize: '14px', }} className={styles.button}>Publicar</button>
          <button onClick={() => { setVisibleOpinion(false), setForm(initialForm) }} style={{ width: '100%', fontSize: '14px', backgroundColor: 'white', border: '1px solid #f50057', color: '#f50057', }} className={styles.button}>Regresar</button>
        </div>
        {loading &&
          <ModalLoading title={'Publicando...'} />}
        {data &&
          <ModalSuccessfull title={'Reseña compartida!'} />}
        {error &&
          <ModalError title={'Ha ocurrido un error'} subtitle={error?.message} />
        }
        {visibleModalLogin &&
          <div className={styles.modal}>
            <ModalLoginFacebook setVisibleModalLogin={setVisibleModalLogin} />
          </div>
        }

      </div>
    </Layout>

  )
}