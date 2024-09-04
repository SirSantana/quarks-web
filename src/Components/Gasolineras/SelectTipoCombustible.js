import { useRouter } from 'next/router';
import { useState } from 'react';
import Select from 'react-select';

const optionsCombustibles = [
  { value: 'corriente', label: 'Corriente', index: 1 },
  { value: 'extra', label: 'Extra', index: 2 },
  { value: 'diesel', label: 'Diesel', index: 3 },

];

export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: '1px solid #EDEDF2',
    boxShadow: '0 1px 2px rgba(0, 0, 0, .04);',
    fontSize: '16px',
    fontWeight: '500',
    width: '180px',
    height: '48px',
    ':hover': {
      borderColor: '#CFD5E1',
    },
    ':active': {
      borderColor: '#CFD5E1',
    },
    cursor: 'pointer',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    width: '180px',
    // border: '1px solid #CFD5E1',

  }),
  menuList: (provided) => ({
    ...provided,
    padding: '12px',
    borderRadius: '8px',
    border: 'none'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    ':hover': {
      color: '#CFD5E1',
    },
    color: '#EDEDF2',
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    ':hover': {
      color: '#CFD5E1',
    },
    backgroundColor: '#EDEDF2', // Cambia el color de la línea separadora del dropdown
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
    zIndex: '999',
    display: 'flex',
    fontWeight: '500',
    alignItems: 'center', // Alinear ícono y texto en el centro verticalmente
    paddingLeft: '8px', // Añadir espacio a la izquierda para el ícono
  }),
};

export default function SelectTipoCombustible() {
  const router = useRouter();
  const slug = router.query.combustible ? router.query.combustible : 'corriente';
  const initialOption = optionsCombustibles.find(el => el.value === slug) || { value: 'corriente', label: 'Corriente', index: 1 };
  const [combustible, setCombustible] = useState(initialOption);
  
  const handleChangeCiudad = (e) => {
    router.push(`/gasolineras/${router.query.slug?.[0]?router.query.slug[0]:''}?combustible=${e.value.toLowerCase()}`);
    setCombustible({ value: e.value, index: e.index, label: e.label });
  };

  
  const formatOptionLabel = ({ label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill={value === combustible.value ? '#407BFF' : '#A6AEC1'}
        viewBox="0 0 24 24" width={24} height={24}><path d="M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M12,10H6V5H12M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14C17,12.89 16.1,12 15,12H14V5C14,3.89 13.1,3 12,3H6C4.89,3 4,3.89 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23Z" /></svg>
      <span >{label}</span>
    </div>
  );
  
  return (
    <Select
      menuPosition='fixed'
      isSearchable={false}
      onChange={(e) => handleChangeCiudad(e)}
      options={optionsCombustibles}
      styles={customStyles}
      placeholder={combustible.label}
      value={combustible}
      formatOptionLabel={formatOptionLabel}
    />
  );
}