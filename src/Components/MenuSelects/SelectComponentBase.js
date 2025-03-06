import { useRouter } from 'next/router';
import { useState } from 'react';
import Select from 'react-select';

export const customStylesSelect = ({ width = '100%', fontSize = '16px', fontWeight = '500' }) => ({
  control: (provided) => ({
    ...provided,
    border: '1px solid #EDEDF2',
    boxShadow: '0 1px 2px rgba(0, 0, 0, .04)',
    flex:1,
    fontSize,
    fontWeight,
    width: width, 
    minWidth: '300px',
    maxWidth: '100%',
    cursor: 'pointer',
  }),
  menu: (provided) => ({ ...provided, borderRadius: '8px', minWidth: '100%',
    maxWidth: '100%', width }),
  menuList: (provided) => ({ ...provided, padding: '12px', borderRadius: '8px' }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#EDEDF2' : 'white',
    color: state.isSelected ? 'black' : '#5c5c5c',
    ':hover': { backgroundColor: '#EDEDF2', color: 'black' },
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '8px',
  }),
});

export default function SelectComponentBase({ options, setIsLoading, width, defaultInitial = 'Todos',setForm, form, value }) {
  const [selectedOption, setSelectedOption] = useState(options.find(el => el.value.toLowerCase() === value?.toLowerCase()) || { value: 'Colombia', label: 'Colombia' });

  const handleChange = (selected) => {
    setSelectedOption(selected);
    setForm({...form, pais:selected.value})
  };

  return (
    <Select
      isSearchable={false}
      onChange={handleChange}
      options={options}
      styles={customStylesSelect({ width:'100%' })}
      menuPosition='fixed'
      placeholder={selectedOption.value}
      value={selectedOption}
    />
  );
}
