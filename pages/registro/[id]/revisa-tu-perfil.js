import CardPreviewRegister from "@/src/Components/Register/CardPreviewRegister";
import LayoutRegister from "@/src/Components/Register/LayoutRegister";
import styles from "@/styles/Registro.module.css"; // Importamos los estilos
import { useEffect, useState } from "react";
export default function RevisaTuPerfil() {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    whatsapp: "",
    email: "",
    pais: 'Colombia',
    ciudad: '',
    lat: '',
    lng: '',
    tipo: "",
    categorias: [],
    horario: "",
    descuento: '10%',
    indicativo: "+57",
    fotoperfil: ''
  });
  const handleChangePage = (e) => {
    // if (formData.fotoperfil === '') {
    //   alert('Por favor agrega una foto de perfil');
    //   return 'Error'
    // } else {
    //   localStorage.setItem("registroTaller", JSON.stringify(formData));
    // }
    localStorage.setItem("registroTaller", JSON.stringify(formData));

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
      <div className={styles.containerRevisaTuPerfil}>
        <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h1 style={{ textAlign: 'start', color:'#407BFF'}} className={styles.title}>Genial! <br/><span style={{color:'#182537'}}>Revisa tu perfil</span></h1>
          <p style={{ fontSize: '16px', textWrap:'balance', marginTop:'16px' }}>Esto es lo que mostraremos a nuestros usuarios. Agrega una foto para destacar tu taller.</p>
        </div>
       <CardPreviewRegister key={formData.nombre} taller={formData}  setFormData={setFormData} />
      </div>
    </LayoutRegister>
  )
}