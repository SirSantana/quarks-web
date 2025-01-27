import { indicativos } from '@/src/data/IndicativosPhoneNumber';
import { useEffect, useState } from 'react';
import Select from 'react-select';

// Estilos personalizados para el select
export const customStyles = (width) => ({
  control: (provided) => ({
    ...provided,
    border: 'none',
    boxShadow: 'none',
    fontSize: '16px',
    fontWeight: '500',
    width: width || '180px',
    height: '48px',
    cursor: 'pointer',
    ':hover': {
      borderColor: '#CFD5E1',
    },
    ':active': {
      borderColor: '#CFD5E1',
    },
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    width: width || '180px',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#EDEDF2' : 'white',
    color: state.isSelected ? 'black' : '#5c5c5c',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '8px',
  }),
  indicatorSeparator: () => ({}),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '0 8px 0 0',
  }),
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
  }),
});

// Crear opciones a partir de los datos de los indicativos
export const indicativosWithOptions = Object.entries(indicativos).map(([pais, indicativo]) => ({
  value: indicativo,
  label: (
    <div style={{ width: '50%', display: 'flex', cursor: 'pointer', flexDirection: 'row', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
      <p style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>{pais}</p>
      <p style={{ fontSize: '14px', fontWeight: '500' }}>({indicativo})</p>
    </div>
  ),
  country: pais,
}));

export default function SelectPhoneNumber({ width, handleChange, handlePhoneNumber, form, placeholder='Número de teléfono' }) {
  const [indicativo, setIndicativo] = useState(form.indicativo?form.indicativo:indicativosWithOptions[0]);  // Estado inicial del indicativo
  const [telefono, setTelefono] = useState(form.celular || form.whatsapp ?(form.celular || form.whatsapp) :'');  // Estado inicial del número de teléfono

  // useEffect para detectar el país del usuario automáticamente
  

  // Manejar cambios en el campo del indicativo
  const handleChangeIndicativo = (selectedOption) => {
    setIndicativo(selectedOption);
    handleChange(selectedOption);  // Ejecutar el callback del indicativo seleccionado
  };

  // Manejar cambios en el campo del número de teléfono
  const handlePhoneChange = (e) => {
    setTelefono(e.target.value);
    handlePhoneNumber(e);  // Ejecutar el callback del número de teléfono
  };
  
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        border: '1px solid #CFD5E1',  // Borde compartido
        borderRadius: '8px',
        overflow: 'hidden',
        width: '100%',  // Ajustar según sea necesario
      }}
    >
      {/* Componente Select para el indicativo */}
      <div >
        <Select
          isSearchable={false}
          onChange={handleChangeIndicativo}
          options={indicativosWithOptions}
          styles={customStyles(width)}
          menuPosition="fixed"
          placeholder={form.indicativo?form.indicativo:indicativo.label.props.children[0].props.children}  // Mostrar el país como valor por defecto
          value={indicativo}  // Mantener el valor seleccionado
        />
      </div>
      <input
        type="text"
        value={telefono}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        style={{
          flex: '1',
          height: '48px',
          fontSize: '14px',
          padding: '0 10px',
          border: 'none',
          borderLeft: '1px solid #CFD5E1',  // Borde entre el select y el input
          outline: 'none',  // Eliminar el borde del input
        }}
      />
    </div>
  );
}