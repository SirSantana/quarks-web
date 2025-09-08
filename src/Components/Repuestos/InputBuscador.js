import CreatableSelect from "react-select/creatable";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/V3.module.css";
import autopartes from '@/src/data/catalogo_autopartes.json';

export const customStyles = {
  control: (provided) => ({
    ...provided,
    border: 'none', // Quitar el borde
    boxShadow: 'none',
    fontWeight: '500',
    color: '#929292',
    maxWidth: '90%',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis', // Agregar
    overflow: 'hidden', 
    backgroundColor: '#EDEDF2',
    flex:1,
    padding: '0px'
  }),
  
  placeholder: (provided) => ({
    ...provided,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    zIndex: 5,
    maxWidth: '90%',
    // border: '1px solid #CFD5E1',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    maxWidth: '100%',
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

const repuestosWithOptions = autopartes.map((repuesto) => {
  return ({
    value: repuesto.titulo,
    label: (
      <div style={{ display: 'flex', cursor: 'pointer', flexDirection: 'row', alignItems: 'center', gap: '8px', padding: '4px 0', justifyContent: 'space-between', }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', }}>
          {repuesto.images && repuesto.images[0] ? (
            <img src={repuesto.images[0]} alt={repuesto.Nombre} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
          ) : (
            <div style={{ width: '24px', height: '24px', backgroundColor: '#EDEDF2', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>🔧</div>
          )}
          <p style={{ fontSize: '16px', fontWeight: '500', color:'#5c5c5c' }}>{repuesto.Nombre}</p>
        </div>
      </div>
    ),
    index: repuesto.titulo,
  })
});

const placeholders = [
  'Busca repuestos por nombre o código',
  'Encuentra el repuesto que necesitas',
  'Busca por referencia o modelo',
  'Encuentra repuestos para tu vehículo',
  'Busca y compara repuestos'
];

export default function InputBuscador({ handleChange, inputValue, onInputChange }) {
  const router = useRouter();
  const formatCreateLabel = (inputValue) => `Buscar por "${inputValue}"`;
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(router.query.id ? router.query.id.replaceAll('-', ' ') : placeholders[0]);
  
  return (
    <CreatableSelect
      onChange={handleChange}
      options={repuestosWithOptions}
      styles={customStyles}
      placeholder={currentPlaceholder}
      formatCreateLabel={formatCreateLabel}
      isSearchable
      isClearable
      className={styles.control}
      inputValue={inputValue}
      onInputChange={onInputChange}
      noOptionsMessage={() => null}
      closeMenuOnSelect={false}
    />
  )
}