import { useState } from "react";
import HeaderTalleresAlmacenes from "../../components/HeaderTalleresAlmacenes";
import Layout from "../../components/Layout";
import TalleresRender from "../../components/Talleres/Talleres";
import styles from "../../styles/Talleres.module.css";

export default function TalleresPage() {
  const [busqueda, setBusqueda] = useState(null);
  return (
    <Layout title={"Talleres"}>
      <HeaderTalleresAlmacenes
        tipo={"Talleres"}
        setBusqueda={setBusqueda}
        busqueda={busqueda}
      />
      
      <div className={styles.grid}>
        <TalleresRender busqueda={busqueda} />
      </div>
    </Layout>
  );
}
