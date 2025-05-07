import SelectComponentBase from "@/src/Components/MenuSelects/SelectComponentBase";
import LayoutRegister from "@/src/Components/Register/LayoutRegister";

import styles from "@/styles/Registro.module.css"; // Importamos los estilos
import { useEffect, useState } from "react";

export default function Descuentos() {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    whatsapp: "",
    email: "",
    pais: 'Colombia',
    ciudad: '',
    lat: '',
    lng: '',
    categorias: [],
    horario: "",
    indicativo: "+57",
    tipo: "",
    descuento: '10%',
    fotoperfil:''

  });
  const handleChangePage = (e) => {
    localStorage.setItem("registroTaller", JSON.stringify(formData));
  };
  useEffect(() => {
    const savedData = localStorage.getItem("registroTaller");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
    }
  }, []);
  console.log(formData);

  return (
    <LayoutRegister handleChangePage={handleChangePage}>
      <div style={{
        width: "90%",
        height: "90vh", // Para centrar en toda la pantalla
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Centrado vertical
        gap: "16px",
        margin: "0 auto",
        maxWidth: "800px",
      }}>
        <div style={{marginBottom:'32px', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
          <h1 style={{textAlign:'start'}} className={styles.title}>Agrega un descuento</h1>
          <p style={{ fontSize: '16px', textBalance:'center' }}>Destaca tu taller para conseguir mas clientes y aumentar tus ventas.</p>
        </div>
        <article
          className={styles.cardContainerTipo} >
          <SelectComponentBase options={[{ value: '5%', label: '5%' }, { value: '10%', label: '10%' }, { value: '15%', label: '15%' }, { value: '20%', label: '20%' }]} form={formData} value={formData.descuento} setForm={setFormData} width='100px' name={'descuento'} />
          <div style={{ display: 'flex', width: '80%', margin: '0 auto', flexDirection: 'column', flex: 1 }}>
            <h2 >Nuevo promocion del anuncio</h2>
            <p >Aplica un descuento del {formData.descuento || '0%'} en el primer diagnóstico para atraer más clientes.</p>
          </div>
        </article>
      </div>
    </LayoutRegister>
  )
}