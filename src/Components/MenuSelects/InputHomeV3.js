import CreatableSelect from "react-select/creatable";
import {  useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/V3.module.css";
import { categorias } from "@/src/data/Categorias";

export const customStyles = {
  control: (provided) => ({
    ...provided,
    border: 'none', // Quitar el borde
    boxShadow: 'none',
    fontWeight: '500',
    color: '#929292',
    width: '100%',
    flex: 1,
    backgroundColor: '#EDEDF2',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    zIndex: 5,
    // border: '1px solid #CFD5E1',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    maxHeight: '300px', // Límite de altura para que el scroll se active
    overflow: 'hidden', // Oculta el scroll inicialmente
    ':hover': {
      overflowY: 'auto', // Muestra el scroll al hacer hover
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: 'none', // Ocultar el icono de flecha
  }),
  indicatorSeparator: () => ({
    display: 'none', // Ocultar la línea horizontal
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#EDEDF2' : 'white',
    color: state.isSelected ? 'black' : '#5c5c5c',
    ':hover': {
      backgroundColor: '#EDEDF2',
      color: 'black',
    },
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    fontWeight: '500',
    alignItems: 'center', // Alinear ícono y texto en el centro verticalmente
    paddingLeft: '8px', // Añadir espacio a la izquierda para el ícono
  }),
};
const servicioWithOptions = categorias.map((servicio) => {
  return ({
    value: servicio.nombre,
    label: (
      <div  style={{ display: 'flex', cursor: 'pointer', flexDirection: 'row', alignItems: 'center', gap: '8px', padding: '4px 0', justifyContent: 'space-between', }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', }}>
          <img src={`/${servicio.img}`} alt={servicio.nombre} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
          <p style={{ fontSize: '16px', fontWeight: '500', color:'#5c5c5c' }}>{servicio.nombre}</p>
        </div>
      </div>
    ),
    index: servicio.url,
  })
});
const placeholders = [
  'Busca talleres por marca o servicio',
  'Encuentra el mejor taller cerca de ti',
  'Busca por tipo de servicio o nombre',
  'Encuentra mecánicos especializados',
  'Busca y compara talleres'
];


export default function InputHomeV3({ handleChange, inputValue, onInputChange }) {
  const router = useRouter()
  const formatCreateLabel = (inputValue) => `Buscar por "${inputValue}"`;
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(router.query.id?router.query.id.replaceAll('-', ' '):placeholders[0]);
  
 
  // useEffect(() => {
  //   let currentIndex = 0;
  //   const targetPlaceholder = placeholders[placeholderIndex];

  //   if(!router.query.id || !inputValue){
  //     const typingInterval = setInterval(() => {
  //       if (currentIndex <= targetPlaceholder.length) {
  //         setCurrentPlaceholder(targetPlaceholder.slice(0, currentIndex));
  //         currentIndex++;
  //       } else {
  //         clearInterval(typingInterval);
  //         setTimeout(() => {
  //           setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
  //         }, 1000); // Espera 1 segundo antes de cambiar al siguiente placeholder
  //       }
  //     }, 100); // Ajusta este valor para cambiar la velocidad de "escritura"
  
  //     return () => clearInterval(typingInterval);
  //   }
  // }, [placeholderIndex]);
  
  return (
    <CreatableSelect
      onChange={handleChange}
      options={servicioWithOptions}
      styles={customStyles}
      placeholder={currentPlaceholder}
      formatCreateLabel={formatCreateLabel}
      isSearchable
      isClearable
      className={styles.control}
      inputValue={inputValue}
      // defaultInputValue={router.query.id?router.query.id.replaceAll('-', ' '):inputValue}
      onInputChange={onInputChange}
      noOptionsMessage={() => null}
      closeMenuOnSelect={false}
    />
  )
}