import { useRouter } from 'next/router';
import { useState } from 'react';
import Select from 'react-select'
const optionsCombustibles = [
    { value: 'bogota d.c.', label: 'Bogotá D.C.', index: 1 },
    { value: 'cota', label: 'Cota', index: 2 },
    { value: 'chia', label: 'Chía', index: 3 },
    { value: 'medellin', label: 'Medellín', index: 4 },
  ]
  export const customStyles = {
    control: (provided) => ({
      ...provided,
      border: '1px solid #d9d9d9', // Quitar el borde
      boxShadow: 'none',
      fontSize: '14px',
      width: '140px',
      height: '32px',
      ':hover': {
        borderColor: '#373737', // Cambiar el color de fondo cuando se realiza un hover
      },
      cursor:'pointer'
    }),
    menu: (provided) => ({
      ...provided,
      width: '140px',  // Ajusta este valor según tus necesidades
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: 'flex', // Ocultar el icono de flecha
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
    }),
  };

export default function SelectCiudad() {
  const router = useRouter()
  const [combustible, setCombustible] = useState({nombre:'Bogota D.C.', index:1})

  const handleChangeCiudad = (e)=>{
    router.push(`/gasolineras/${e.value}`)
    setCombustible({nombre:e.value, index:e.index})

  }

    return (
        <Select isSearchable={false} onChange={(e) => handleChangeCiudad(e)} options={optionsCombustibles} styles={customStyles} placeholder={router?.query?.slug?.length>0?optionsCombustibles.find(el=> el.value===router?.query?.slug?.[0]).label:'Bogota'} value={combustible.nombre} />

    )
}