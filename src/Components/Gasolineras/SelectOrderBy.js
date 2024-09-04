import { useRouter } from 'next/router';
import { useState } from 'react';
import Select from 'react-select';

const optionsCombustibles = [
  { value: 'precio', label: 'Precio', index: 1 },
  { value: 'distancia', label: 'Distancia', index: 2 },
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
    border:'none'
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

export default function SelectOrderBy() {
  const router = useRouter();
  const slug = router.query.ordenar ? router.query.ordenar[0] : 'precio';
  const initialOption = optionsCombustibles.find(el => el.value === slug) || optionsCombustibles[0];

  const [combustible, setCombustible] = useState(initialOption);
  // const [combustible, setCombustible] = useState({ nombre: 'Bogota D.C.', index: 1 });

  const handleChangeCiudad = (e) => {
    router.push(`/gasolineras/${router.query.slug[0]}?combustible=${router.query.combustible}&ordenar=${e.value.toLowerCase()}`);
    setCombustible({ value: e.value, index: e.index, label: e.label });
  };

  const formatOptionLabel = ({ label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: value === combustible.value ? '#407BFF' : '#CFD5E1',
          marginRight: '8px',
        }}
      /> */}
      <span>{label}</span>
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