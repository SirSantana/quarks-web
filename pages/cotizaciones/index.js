import { useState } from "react";
import CotizacionesRender from "../../components/Cotizaciones/Cotizaciones";
import HeaderTalleresAlmacenes from "../../components/HeaderTalleresAlmacenes";
import Layout from "../../components/Layout";
import ProductosRender from "../../components/Productos/Productos";
import styles from "../../styles/Talleres.module.css";



export default function ProductosPage(){
  const [busqueda, setBusqueda] = useState(null);

    return(
        <Layout title={'Cotizaciones'}>
            <HeaderTalleresAlmacenes
        tipo={"Cotizaciones"}
        setBusqueda={setBusqueda}
        busqueda={busqueda}
      />
      
      <div className={styles.grid}>
        <CotizacionesRender busqueda={busqueda}/>
        {/* <ProductosRender busqueda={busqueda}/> */}
      </div>
        </Layout>
    )
}