import { optionsServicios } from "@/src/data/Categorias";
import { useRouter } from "next/router";
import Select from 'react-select';
import { customStylesSelectServicio } from "./SelectServicio";
import { useState } from "react";


export default function SelectServicioProfile({width, defaultInitial = 'Todos', handleChange = null, form=null }) {
  const [servicio, setServicio] = useState( { value: 'electricos', label: 'Electricos', index: 1 });

  const handleChangeServicio = (e) => {
    setServicio({ value: e.index, index: e.index, label: e.label });
    handleChange(e)
  };
  
  const formatOptionLabel = ({ label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: value === servicio.value || label.toLowerCase() === form?.servicios[0].toLowerCase() ? '#407BFF' : '#CFD5E1',
          marginRight: '8px',
        }}
      />
      <span style={{ flex: 1 }}>{label}</span>
    </div>
  );


  return (
    <Select
      isSearchable={false}
      onChange={handleChangeServicio}
      options={optionsServicios}
      styles={customStylesSelectServicio({width:width, fontSize:'14px', fontWeight:'400'})}
      placeholder={servicio.label}
      value={form?.servicios.length>0?optionsServicios.find(option => option.label.toLowerCase() === form.servicios[0].toLowerCase()):optionsServicios.find(option => option.value === servicio.value.toLowerCase())}
      formatOptionLabel={formatOptionLabel}
    />
  );
}