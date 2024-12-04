

import { marcasAuto } from '@/src/data/Marcas';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Select from 'react-select';


  export const customStyles = (width) => ({
    control: (provided) => ({
      ...provided,
      fontFamily: 'Poppins',
      border: 'none',  // Sin borde aquí, se aplicará al contenedor externo
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
    indicatorSeparator: () => ({
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: '0 8px 0 0',  // Cambiar el padding del icono (puedes ajustar este valor)
    }),
    singleValue: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
  });
export const marcasWithOptions = marcasAuto.map((marca, index) => ({
  value: marca.value,
  label: (
    <img src={`/${marca.img}`} alt={marca.label} style={{ width: '30px', height: '30px',}} />
  ),
  index: index
}));
export default function SelectBrand({ setIsLoading, width, defaultInitial = 'Chevrolet', handleChange, handleChangeModelo, form }) {
  const router = useRouter();
  const servicioUrl = router.query.servicio || defaultInitial;

  // Estado inicial para la marca seleccionada
  const [servicio, setServicio] = useState(marcasAuto.find(el => el.value.toLowerCase() === servicioUrl.toLowerCase()) || marcas[0]);

  // Estado para la referencia o modelo del auto
  const [modelo, setModelo] = useState('');

  const handleChangeCiudad = (e) => {
    setServicio({ value: e.value, index: e.index, label: e.label });
    handleChange(e);
  };

  const handleModeloChange = (e) => {
    handleChangeModelo(e)
    setModelo(e.target.value)
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
        width: '100%',  // Ajustar según lo necesario
      }}
    >
      {/* Componente Select para la marca */}
      <div >
        <Select
          isSearchable={false}
          onChange={(e) => handleChangeCiudad(e)}
          options={marcasWithOptions}
          styles={customStyles(width)}
          menuPosition="fixed"
          placeholder={servicio.value}  // Mostrar Chevrolet como valor por defecto
          value={form?.marca?marcasWithOptions.find(option => option.value === form.marca):marcasWithOptions.find(option => option.value === servicio.value)}  // Mantener el valor seleccionado
        />
      </div>

      {/* Input para la referencia o modelo del auto */}
      <input
        type="text"
        value={form.referencia}

        onChange={handleModeloChange}
        placeholder="Modelo del auto"
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