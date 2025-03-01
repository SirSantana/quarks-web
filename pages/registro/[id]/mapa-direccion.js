import LayoutRegister from "@/src/Components/Register/LayoutRegister";
import { useEffect, useState } from "react";
import styles from "@/styles/Registro.module.css"; // Importamos los estilos
import Icon, { IconCatalog } from "@/src/Components/Icon/Icon";
import dynamic from "next/dynamic";
import * as Nominatim from "nominatim-browser";

const MapDireccion = dynamic(() => import('@/src/Components/Register/MapDireccion'), { ssr: false, loading: () => <div className={styles.skeletonMap} /> })

export default function MapaDireccion() {
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
    indicativo: "+57",
  });
  const [direccion, setDireccion] = useState("");
  const [posicion, setPosicion] = useState({ lat: 4.711, lng: -74.0721 });

  const buscarDireccion = async () => {
    if (!direccion) return;
    
    try {
      const resultados = await Nominatim.geocode({ q: direccion, format: "json" });
      
      if (resultados.length > 0) {
        const { lat, lon } = resultados[0];
        setPosicion({ lat: parseFloat(lat), lng: parseFloat(lon) });
        setFormData({...formData, lat: parseFloat(lat), lng: parseFloat(lon)});
        const updatedFormData = { ...formData, lat: parseFloat(lat), lng: parseFloat(lon) };
        console.log('hi');
                localStorage.setItem("registroTaller", JSON.stringify(updatedFormData));
      } else {
        alert("No se encontró la dirección");
      }
    } catch (error) {
      console.error("Error obteniendo coordenadas:", error);
    }
  };
  
  useEffect(() => {
    const savedData = localStorage.getItem("registroTaller");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

  }, []);
  

  return (
    <LayoutRegister>

      <div style={{
        width: "90%",
        height: "90vh", // Para centrar en toda la pantalla
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Centrado vertical
        alignItems: "center", // Centrado horizontal
        gap: "16px",
        margin: "0 auto",
        maxWidth: "800px",
      }}>
        <h1 style={{ textAlign: 'start' }} className={styles.title}>Donde se encuentra tu taller?</h1>


        <div style={{ width: '90%' }} className={styles.mapContainer}>
          {/* Contenedor del buscador */}
          <form onSubmit={(e) => { e.preventDefault(); buscarDireccion(); }} className={styles.searchBar}>
            <Icon  onClick={buscarDireccion} name={IconCatalog.searchOutline} className={styles.icon} size="lg" />
            <div style={{marginLeft:'8px'}} className={styles.location}>
              <input
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Ingresa la dirección de tu taller"
                style={{ padding: "8px", width: "300px", border:'none', fontSize:'16px', fontWeight:'500', color:'#182537' }}
              />
            </div>
          </form>

          {/* Mapa */}
          <MapDireccion dataImportante={formData} setDataImportante={setFormData}posicion={posicion} />
        </div>
      </div>
    </LayoutRegister>

  )
}