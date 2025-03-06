import { optionsServicios } from '@/src/data/Categorias';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Select from 'react-select';


export const customStylesSelectServicio = ({width='180px', fontSize='16px', fontWeight='500'}) => ({
  control: (provided, state) => ({
    ...provided,
    border: '1px solid #EDEDF2',
    boxShadow: '0 1px 2px rgba(0, 0, 0, .04)',
    fontSize: fontSize,
    fontWeight: fontWeight,
    width: width ,  // Usa el valor de width o 180px como valor predeterminado
    ':hover': {
      borderColor: '#CFD5E1',
    },
    ':active': {
      borderColor: '#CFD5E1',
    },
    position: 'relative',
    cursor: 'pointer',
    flex: 1
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    width: width,  // Usa el valor de width también aquí
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
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
});

export default function SelectServicio({setIsLoading, width, defaultInitial='Todos'}) {
  const router = useRouter();
  const servicioUrl = router.query.servicio ? router.query.servicio : defaultInitial;
  const [servicio, setServicio] = useState(optionsServicios.find(el => el.value.toLowerCase() === servicioUrl.replaceAll('-', ' ').toLowerCase()) || { value: 'Todos', label: 'Todos', index: 1 });
  
  const handleChangeCiudad = (e) => {
    setIsLoading(true);
    router.push(`/explore/talleres/carro/${e.value.replaceAll(' ', '-')}/Bogota`).finally(() => setIsLoading(false));
    setServicio({ value: e.value, index: e.index, label: e.label });
  };

  const formatOptionLabel = ({ label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: value === servicio.value ? '#407BFF' : '#CFD5E1',
          marginRight: '8px',
        }}
      />
      <span style={{flex:1}}>{label}</span>
    </div>
  );


  return (
      <Select
        isSearchable={false}
        onChange={(e) => handleChangeCiudad(e)}
        options={optionsServicios}
        styles={customStylesSelectServicio({width})} 
        menuPosition='fixed'
        placeholder={servicio.label}
        value={servicio}
        formatOptionLabel={formatOptionLabel}
      />
  );
}