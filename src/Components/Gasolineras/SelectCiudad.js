import { useRouter } from 'next/router';
import { useState } from 'react';
import Select from 'react-select';

const optionsCombustibles = [
  { value: 'bogota d.c.', label: 'Bogotá D.C.', index: 1 },
  { value: 'cota', label: 'Cota', index: 2 },
  { value: 'chia', label: 'Chía', index: 3 },
  { value: 'medellin', label: 'Medellín', index: 4 },
  { value: 'bucaramanga', label: 'Bucaramanga', index: 5 },
  { value: 'santander', label: 'Santander', index: 6 },
  { value: 'cucuta', label: 'Cúcuta', index: 7 },
];

export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: '1px solid #EDEDF2',
    boxShadow: '0 1px 2px rgba(0, 0, 0, .04)',
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
    position:'relative',
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
    border:'none',
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
    backgroundColor:  '#EDEDF2', // Cambia el color de la línea separadora del dropdown
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

export default function SelectCiudad() {
  const router = useRouter();
  const slug = router.query.slug ? router.query.slug[0] : 'bogota d.c.';
  const initialOption = optionsCombustibles.find(el => el.value === slug) || { value: 'bogota d.c.', label: 'Bogotá D.C.', index: 1 };

  const [combustible, setCombustible] = useState(initialOption);
  
  let ciudad = router?.query?.slug?.length > 0 ? optionsCombustibles.find(el=> el.value ==router?.query?.slug?.[0])?.label   : 'Bogota D.C.';

  const handleChangeCiudad = (e) => {
    router.push(`/gasolineras/${e.value}?combustible=${router.query.combustible? router.query.combustible : 'Corriente'}`);
    setCombustible({ value: e.value, index: e.index, label: e.label });
  };
  
  const formatOptionLabel = ({ label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: value === combustible.value ? '#407BFF' : '#CFD5E1',
          marginRight: '8px',
        }}
      />
      <span>{label}</span>
    </div>
  );

  return (
    <Select
      isSearchable={false}
      onChange={(e) => handleChangeCiudad(e)}
      options={optionsCombustibles}
      styles={customStyles}
      menuPosition='fixed'
      placeholder={combustible.label}
      value={combustible}
      formatOptionLabel={formatOptionLabel}
    />
  );
}