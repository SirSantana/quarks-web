import { useState } from "react";
import AlmacenesRender from "../../components/Almacenes/Almacenes";
import HeaderTalleresAlmacenes from "../../components/HeaderTalleresAlmacenes";
import Layout from "../../components/Layout";
import styles from "../../styles/Talleres.module.css";

export default function AlmacenesPage() {
  const [busqueda, setBusqueda] = useState(null);
  return (
    <Layout title={"Almacenes"}>
      <HeaderTalleresAlmacenes
        tipo={"Almacenes"}
        setBusqueda={setBusqueda}
        busqueda={busqueda}
      />
      
      <div className={styles.grid}>
        <AlmacenesRender busqueda={busqueda} />
      </div>
    </Layout>
  );
}
