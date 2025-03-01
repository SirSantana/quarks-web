import LayoutRegister from "@/src/Components/Register/LayoutRegister";
import styles from "@/styles/Registro.module.css"; // Importamos los estilos
import { useEffect, useState } from "react";

let data = [
  {
    nombre: 'Tengo un taller mecanico',
    descripcion: 'Brindo servicios en un taller especializado.',
    img: '/taller-ilustration.webp',
    tipo: 'Taller mecánico'
  },
  {
    nombre: 'Soy mecánico a domicilio',
    descripcion: 'Brindo servicios a domicilio.',
    img: '/mecanico.webp',
    tipo: 'Mecánico a domicilio'
  },
]

export default function TipoServicio() {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    whatsapp: "",
    email: "",
    lat:'',
    lng:'',
    servicios: [],
    horarios: "",
    indicativo: "+57", 
    tipoServicio: "", 
  });

  // Cargar datos desde localStorage al iniciar
   const [selectedIndex, setSelectedIndex] = useState(null);

  // Cargar datos desde localStorage al iniciar
  useEffect(() => {
    const savedData = localStorage.getItem("registroTaller");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
    }
  }, []);

  // Actualizar `selectedIndex` cuando `formData.tipoServicio` cambie
  useEffect(() => {
    if (formData.tipoServicio) {
      const index = data.findIndex((el) => el.tipo === formData.tipoServicio);
      setSelectedIndex(index);
    }
  }, [formData.tipoServicio]);

  // Actualizar el tipo de servicio y guardar en localStorage
  const handleSelect = (index) => {
    setSelectedIndex(index);
    const updatedFormData = { ...formData, tipoServicio: data[index].tipo };
    setFormData(updatedFormData);
    localStorage.setItem("registroTaller", JSON.stringify(updatedFormData));
  };
  return (
    <LayoutRegister >
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
        <h1 style={{textAlign:'start'}} className={styles.title}>¿Qué tipo de servicio ofreces?</h1>

        <div className={styles.containerCardsTipos}>
          {data.map((el, index) => (
            <article key={el.nombre}
            className={`${styles.cardContainerTipo} ${selectedIndex === index ? styles.selected : ""}`}
            onClick={() => handleSelect(index)}>
              <img src={el.img} alt={el.nombre} style={{ width: '64px', objectFit: 'contain' }} />
              <div>
                <h2 >{el.nombre}</h2>
                <p >{el.descripcion}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </LayoutRegister>
  )
} 