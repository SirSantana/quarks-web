
import Input from "@/src/Components/Input/Input";
import CardTaller from "@/src/Components/LandingPage/CardTaller";
import SelectComponentBase from "@/src/Components/MenuSelects/SelectComponentBase";
import SelectServicio from "@/src/Components/MenuSelects/SelectServicio";
import LayoutRegister from "@/src/Components/Register/LayoutRegister";
import { Countries } from "@/src/data/Categorias";

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
    tipoServicio: "",
    categorias: [],
    horarios: "",
    descuento: '10%',
    indicativo: "+57",
    fotoperfil: ''
  });
  const handleChangePage = (e) => {
    if (formData.pais === '' || formData.ciudad === '') {
      alert('Por favor selecciona un país y una ciudad');
      return 'Error'
    } else {
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
        <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h1 style={{ textAlign: 'start' }} className={styles.title}>Revisa tu perfil</h1>
          <p style={{ fontSize: '16px' }}>Esto es lo que mostraremos a nuestros usuarios. Agrega una foto para destacar tu taller.</p>
        </div>
        <div>
       <CardTaller key={formData.nombre} taller={formData} />
        </div>
      </div>
    </LayoutRegister>
  )
}