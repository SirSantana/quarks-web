import LayoutRegister from "@/src/Components/Register/LayoutRegister";
import { categorias, categoriasChoose } from "@/src/data/Categorias";
import styles from "@/styles/Registro.module.css"; // Importamos los estilos
import { useEffect, useState } from "react";

export default function ServiciosOfrecidos() {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    whatsapp: "",
    email: "",
    lat: '',
    lng: '',
    tipoServicio: "",
    servicios: [],
    horarios: "",
    indicativo: "+57", // Se actualizará dinámicamente
    });

    // Cargar datos desde localStorage al iniciar

    useEffect(() => {
      const savedData = localStorage.getItem("registroTaller");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      }
    }, []);
  
    // Manejar selección/deselección de servicios
    const handleSelect = (index) => {
      const servicioSeleccionado = categoriasChoose[index].nombre;
  
      setFormData((prev) => {
        const alreadySelected = prev?.servicios?.includes(servicioSeleccionado);
  
        const updatedServicios = alreadySelected
          ? prev.servicios.filter((servicio) => servicio !== servicioSeleccionado) // Quitar si ya estaba
          : [...prev?.servicios, servicioSeleccionado]; // Agregar si no estaba
  
        const updatedFormData = { ...prev, servicios: updatedServicios };
  
        localStorage.setItem("registroTaller", JSON.stringify(updatedFormData));
  
        return updatedFormData;
      });
    };

    
  return (
    <LayoutRegister>
      <div style={{
        width: "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Centrado vertical
        gap: "16px",
        margin: "0 auto",
        maxWidth: "800px",
        marginTop: '64px'
      }}>
        <h1 style={{ textAlign: 'start', margin:0 }} className={styles.title}>Que servicios ofreces?</h1>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', flexWrap: 'wrap',  marginTop: '32px' }}>
          {categoriasChoose.map((el, index) => (
            <article onClick={()=> handleSelect(index)} key={el.nombre} 
            className={`${styles.cardServicioChoose} ${
              formData?.servicios?.includes(el.nombre) ? styles.selectedSer : ""
            }`}
          >
              <img src={'/' + el.img} alt={el.nombre} style={{ width: '24px', objectFit: 'contain' }} />
              <div>
                <p >{el.nombre}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </LayoutRegister>
  )
}