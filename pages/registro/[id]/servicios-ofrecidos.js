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
    pais:'Colombia',
    ciudad:'',
    tipoServicio: "",
    categorias: [],
    horarios: "",
    descuento: '10%',
    indicativo: "+57",
    fotoperfil:''

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
        const alreadySelected = prev?.categorias?.includes(servicioSeleccionado);
  
        const updatedServicios = alreadySelected
          ? prev.categorias.filter((servicio) => servicio !== servicioSeleccionado) // Quitar si ya estaba
          : [...prev?.categorias, servicioSeleccionado]; // Agregar si no estaba
  
        const updatedFormData = { ...prev, categorias: updatedServicios };
  
        return updatedFormData;
      });
    };
    const handleChangePage = (e) => {
      if(formData.categorias.length === 0){
        alert('Por favor selecciona al menos un servicio');
        return 'Error'
      }else{
        localStorage.setItem("registroTaller", JSON.stringify(formData));
      }
    };
    
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
        marginTop: '64px',
        marginBottom: "100px",
      }}>
        <h1 style={{ textAlign: 'start', margin:0 }} className={styles.title}>Que servicios ofreces?</h1>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', flexWrap: 'wrap',  marginTop: '32px' }}>
          {categoriasChoose.map((el, index) => (
            <article onClick={()=> handleSelect(index)} key={el.nombre} 
            className={`${styles.cardServicioChoose} ${
              formData?.categorias?.includes(el.nombre) ? styles.selectedSer : ""
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