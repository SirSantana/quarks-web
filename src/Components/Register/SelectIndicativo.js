import { useEffect, useState } from 'react';
import Select from 'react-select'

export const customStyles = {
  control: (provided) => ({
    ...provided,
    border: 'none', // Quitar el borde
    boxShadow: 'none',
    fontSize: '16px',
    width: '220px',
    border: '1px solid #d9d9d9',
    height: '48px',
    borderRadius: '8px',
    paddingLeft: '8px',
    ':hover': {
      borderColor: '#373737', // Cambiar el color de fondo cuando se realiza un hover
    },
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#f1f1f1' : 'white', // Cambiar el color de fondo de la opción seleccionada
    color: state.isSelected ? 'white' : 'black', // Cambiar el color de texto de la opción seleccionada
    ':hover': {
      backgroundColor: '#f1f1f1', // Cambiar el color de fondo cuando se realiza un hover
      color: 'black', // Cambiar el color de texto cuando se realiza un hover
    },
    fontSize: '16px',
    color: '#5c5c5c',
    zIndex: '999',
    width: '100%'
  }),
};
let indicativos = {
  Colombia: "+57",
  "Estados Unidos": "+1",
  México: "+52",
  España: "+34",
  Argentina: "+54",
  Brasil: "+55",
  Canadá: "+1",
  Chile: "+56",
  Perú: "+51",
  Ecuador: "+593",
  Venezuela: "+58",
  Panamá: "+507",
  "Costa Rica": "+506",
  Uruguay: "+598",
  Bolivia: "+591",
  Paraguay: "+595",
  Guatemala: "+502",
  Honduras: "+504",
  Nicaragua: "+505",
  "El Salvador": "+503"
};

const options = Object.entries(indicativos).map(([pais, indicativo]) => ({
  value: indicativo,
  label: (
    <div style={{ width: '50%', display: 'flex', cursor: 'pointer', flexDirection: 'row', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
      <p style={{ fontSize: '16px', whiteSpace: 'nowrap' }}>{pais}</p>
      <p style={{ fontSize: '16px', fontWeight: '500' }}>({indicativo})</p>
    </div>
  ),
  index: 'indicativo',
  country: pais
}));
const options2 = Object.keys(indicativos).map((pais) => ({
  value: pais,
  label: (
    <div style={{ width: '50%', display: 'flex', cursor: 'pointer', flexDirection: 'row', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
      <p style={{ fontSize: '16px', whiteSpace: 'nowrap' }}>{pais}</p>
    </div>
  ),
  index: 'pais',
  country: pais
}));

export default function SelectIndicativo({ handleChange, name, value, setDataImportante, dataImportante }) {
  const [defaultValueOption, setDefaultValueOption] = useState(null);
  const [defaultValueOption2, setDefaultValueOption2] = useState(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(response => {
        let defaultOption = options.find(option => option.country === response.country_name);
        let defaultOption2 = options2.find(option => option.country === response.country_name);
        setDefaultValueOption(defaultOption);
        setDefaultValueOption2(defaultOption2);
        setDataImportante({ ...dataImportante, indicativo: dataImportante.indicativo ? dataImportante.indicativo : defaultOption.value, pais: dataImportante.pais ? dataImportante.pais : defaultOption2.country });
      })
      .catch((error) => {
        console.log('Request failed:', error);
      });
  }, [name]);

  return (
    <>
      {name === 'indicativo'
        ?
        <Select isSearchable={false} onChange={handleChange} options={options} styles={customStyles} name={name} value={value ? options.find(option => option.value === value) : defaultValueOption} />
        :
        <Select isSearchable={false} onChange={handleChange} options={options2} styles={customStyles} name={name} value={value ? options2.find(option => option.country === value) : defaultValueOption2} />
      }
    </>
  );
}