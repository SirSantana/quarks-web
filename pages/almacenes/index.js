import { useState } from "react";
import AlmacenesRender from "../../components/Almacenes/Almacenes";
import HeaderTalleresAlmacenes from "../../components/HeaderTalleresAlmacenes";
import Layout from "../../components/Layout";
import styles from "../../styles/Talleres.module.css";

export default function AlmacenesPage() {
  const [busqueda, setBusqueda] = useState(null);
  const [valueSplit, setValueSplit] = useState(10)

  return (
    <Layout title={"Almacenes"}>
      <HeaderTalleresAlmacenes
        tipo={"Almacenes"}
        setBusqueda={setBusqueda}
        busqueda={busqueda}
      />
      
      <div className={styles.grid}>
        <AlmacenesRender busqueda={busqueda} valueSplit={valueSplit} />
      </div>
      {/* <button className={styles.button} style={{justifyContent:'center', display:'flex', flexDirection:'row', alignItems:'center', margin:'0 auto'}} onClick={()=>setValueSplit(valueSplit + 10)}>Cargar mas resultados</button> */}

    </Layout>
  );
}
