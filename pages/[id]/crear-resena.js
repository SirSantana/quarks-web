import { CREATE_OPINION } from '@/graphql/mutations'
import { GET_CALIFICACION_OPINIONES, GET_OPINIONES } from '@/graphql/queries'
import { ModalError, ModalLoading, ModalSuccessfull } from '@/utils/Modales'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Select from 'react-select';
import Layout from '@/src/Components/Layout'
import ModalLoginFacebook from '@/src/Components/Almacenes/ModalLoginFacebook'
import { categorias } from '@/src/data/Categorias'
import { marcasAuto } from '@/src/data/Marcas'



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
            <img src={`../${categorias[index].img}.png`} style={{ width: '30px', height: '30px' }} alt={categorias[index].img} />
          </div>
          :
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <img src={`../${categorias[index].img}.png`} style={{ width: '30px', height: '30px' }} alt={categorias[index].img} />
            <p style={{ fontSize: '12px', }}>{categorias[index].nombre}</p>
          </div>
      }
    </div>
  );
}
export const marcasWithOptions = marcasAuto.map((marca, index) => ({
  value: marca.value,
  label: (
    <img src={marca.img} alt={marca.label} style={{ width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
  ),
  index: index
}));

export const repuestosWithOptions = categorias.map((categoria, index) => ({
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
  const { data: session} = useSession()
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
    if (form.email !== '' && form.descripcion!== '' && form.referencia !== '' && form.servicios.length> 0 && form.almacen !== '') {
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
    setForm({ ...form,almacen: ide,  nombre: session?.user?.name, foto: session?.user?.image, email: session?.user?.email })
    setVisibleModalLogin(false)
  }, [session]);
  return (
   <p>Crear Reseña</p>

  )
}