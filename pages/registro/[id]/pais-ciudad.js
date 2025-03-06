import Input from "@/src/Components/Input/Input";
import SelectComponentBase from "@/src/Components/MenuSelects/SelectComponentBase";
import SelectServicio from "@/src/Components/MenuSelects/SelectServicio";
import LayoutRegister from "@/src/Components/Register/LayoutRegister";
import { Countries } from "@/src/data/Categorias";

import styles from "@/styles/Registro.module.css"; // Importamos los estilos
import { useEffect, useState } from "react";

export default function AddCountryCity() {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    whatsapp: "",
    email: "",
    pais: 'Colombia',
    ciudad: '',
    lat: '',
    lng: '',
    tipoServicio: "",
    servicios: [],
    horarios: "",
    indicativo: "+57", // Se actualizará dinámicamente
  });

  const handleChangePage = (e) => {
    if(formData.pais === '' || formData.ciudad === '') {
      alert('Por favor selecciona un país y una ciudad');
      return 'Error'
    }else{
      localStorage.setItem("registroTaller", JSON.stringify(formData));
    }
  };

  useEffect(() => {
    const savedData = localStorage.getItem("registroTaller");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
    }
  }, []);
  
  return (
    <LayoutRegister handleChangePage={handleChangePage}>
      <div style={{
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Centrado vertical
        gap: "16px",
        margin: "0 auto",
        maxWidth: "800px",
        height: "90vh",
      }}>

        <h1 style={{ textAlign: 'start' }} className={styles.title}>Donde te encuentras?</h1>
        <label style={{color:'#6C788E', marginTop:'32px'}}>Selecciona tu país y ciudad</label>

        <div style={{width:'100%'}} className={styles.formContainerPaisCiudad}>
          <SelectComponentBase options={Countries} width={'100%'} defaultInitial={Countries[3]} form={formData} value={formData.pais} setForm={setFormData} />
          <Input
            style={{ width: "100%",  }}
            stylesInput={{ paddingLeft: "16px",}}
            type="text"
            value={formData.ciudad}
            onChange={(e)=> setFormData({...formData, ciudad: e.target.value})}
            placeholder="Ciudad"
            name="Ciudad"
          />
        </div>
<label style={{color:'#6C788E', marginTop:'32px'}}>Direccion del taller</label>
          <Input
            style={{ width: "100%" }}
            stylesInput={{ paddingLeft: "16px" }}
            type="text"
            value={formData.direccion}
            onChange={(e)=> setFormData({...formData, direccion: e.target.value})}
            name="direccion"
            placeholder={'Direccion del taller'}
          />
      </div>
    </LayoutRegister>
  )
}