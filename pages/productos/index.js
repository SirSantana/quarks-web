import { useState } from "react";
import HeaderTalleresAlmacenes from "../../components/HeaderTalleresAlmacenes";
import Layout from "../../components/Layout";
import ProductosRender from "../../components/Productos/Productos";
import styles from "../../styles/Talleres.module.css";



export default function ProductosPage(){
  const [busqueda, setBusqueda] = useState(null);

    return(
        <Layout>
            <HeaderTalleresAlmacenes
        tipo={"Productos"}
        setBusqueda={setBusqueda}
        busqueda={busqueda}
      />
      
      <div className={styles.grid}>
        <ProductosRender />
      </div>
        </Layout>
    )
}