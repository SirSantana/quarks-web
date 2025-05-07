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
    tipo: "",
    categorias: [],
    horario: "",
    indicativo: "+57",
    pais: 'Colombia',
    ciudad: '',
    descuento: '10%',
    fotoperfil:''

  });
  const [posicion, setPosicion] = useState({ lat: 4.711, lng: -74.0721 });

  const buscarDireccion = async () => {
    if (!formData.direccion) return;
    try {
      const resultados = await Nominatim.geocode({ q: formData.direccion + ' '+ formData.ciudad + ' '+ formData.pais, format: "json" });
      
      if (resultados.length > 0) {
        const { lat, lon } = resultados[0];
        setPosicion({ lat: String(lat), lng: String(lon) });
        setFormData({...formData, lat: String(lat), lng: String(lon)});
        const updatedFormData = { ...formData, lat: String(lat), lng: String(lon) };
                localStorage.setItem("registroTaller", JSON.stringify(updatedFormData));
      } else {
        alert("No se encontró la dirección");
      }
    } catch (error) {
      console.error("Error obteniendo coordenadas:", error);
    }
  };
  const handleChangePage = (e) => {
    if(!formData.lat || !formData.lng){
      alert('Por favor ajuste el pin en el mapa para ubicar tu dirección');
      return 'Error'
    }else{
      localStorage.setItem("registroTaller", JSON.stringify(formData));
    }
  };
  useEffect(() => {
    const savedData = localStorage.getItem("registroTaller");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

  }, []);
  

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
        <h1 style={{ textAlign: 'start' }} className={styles.title}>Ajusta el pin en el mapa para ubicar tu dirección</h1>


        <div  className={styles.mapContainer}>
          {/* Contenedor del buscador */}
          <form onSubmit={(e) => { e.preventDefault(); buscarDireccion(); }} className={styles.searchBar}>
            <Icon  onClick={buscarDireccion} name={IconCatalog.searchOutline} className={styles.icon} size="lg" />
            <div style={{marginLeft:'8px'}} className={styles.location}>
              <input
                type="text"
                value={formData.direccion}
                name="direccion"
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                placeholder="Ingresa la dirección de tu taller"
                style={{ padding: "8px",border:'none', minWidth:'300px', fontSize:'16px', fontWeight:'500', color:'#182537', borderRadius:'16px', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap', width:'100%' }}
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