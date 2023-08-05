import Buscador from "@/src/Components/Buscador/Buscador";
import SwiperAutopartes from "@/src/Components/Home/SwiperAutopartes";
import HeaderHome from "@/src/Components/Index/HeaderHome";
import Layout from "@/src/Components/Layout";
import styles from '@/styles/Diccionario.module.css'
import { useState } from "react";
import data from '@/utils/repuestos.json'
import Link from "next/link";
import { useRouter } from "next/router";
import { ModalShareArticulo } from "@/utils/Modales";
import AsideGlosario from "@/src/Components/Articulos/AsideGlosario";

let keywords = "autopartes, repuestos de automóviles, componentes de vehículos, terminología de autopartes, glosario de repuestos, piezas de automóviles, accesorios para autos, mecánica automotriz, vocabulario de autopartes, diccionario de repuestos, explicación de componentes de automóviles, significado de las partes de un automóvil, guía de autopartes, descripción de repuestos de vehículos, nomenclatura de autopartes, jerga de la industria automotriz, explicación técnica de piezas de automóviles, conceptos básicos de autopartes, mecánica automotriz."
let descripcion = 'El glosario de autopartes es una completa guía que te brinda un amplio vocabulario y explicación detallada de los diferentes componentes y repuestos que conforman un automóvil. Desde los elementos básicos hasta los más técnicos, este glosario te permite entender y familiarizarte con la terminología utilizada en el mundo de las autopartes. Explora nuestras definiciones claras y concisas, descubre el significado y la función de cada pieza, y adquiere el conocimiento necesario para comprender mejor tu vehículo y realizar reparaciones o mantenimiento de manera más informada. ¡Empodérate con el diccionario de repuestos y mejora tu experiencia en el ámbito de la mecánica automotriz!'
export default function DiccionarioDeAutopartes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleShareArticulo, setVisibleShareArticulo] = useState(false)

  const router = useRouter()

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const filteredData = Object.entries(data).reduce((acc, [key, values]) => {

    const filteredValues = values.filter((item) => {
      const itemName = item.name.toLowerCase();
      return itemName.includes(searchTerm.toLowerCase());
    });

    if (filteredValues.length > 0) {
      acc[key] = filteredValues;
    }
    return acc;
  }, {});

  return (
    <Layout title={'Glosario de Autopartes | Quarks automotriz'} description={descripcion} keywords={keywords} type='article' image={'../Motor.png'} url={router?.asPath}>
      <div className={styles.containerGridAside}>
        {/* <AsideGlosario /> */}


        <div className={styles.container}>
          {/* <HeaderHome /> */}

          <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h1 className={styles.title2}>Glosario de Autopartes</h1>
            <img src={'../Motor.png'} className={styles.icon} alt="Glosario de repuestos de carro" />
          </section>

          <section className={styles.containerBottomHeaderInfo}>
            <div className={styles.containerButtonsHeader}>
              <div className={styles.divHeaderText}>
                <div className={styles.divIconHeader}>
                  <ion-icon name="eye-outline"></ion-icon>
                </div>
                <p className={styles.subtitleHeader}>11332 vistas</p>
              </div>
              <div className={styles.divHeaderText}>
                <div className={styles.divIconHeader}>
                  <ion-icon name="build-outline"></ion-icon>
                </div>
                <p className={styles.subtitleHeader}>36 autopartes</p>
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setVisibleShareArticulo(true)} className={styles.divIconHeader}>
                <ion-icon name="arrow-redo-outline"></ion-icon>
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.container1}>
                <span className={styles.icon}><i className="fa fa-search"></i></span>
                <form >
                  <input onKeyDown={handleKeyDown} type="text" className={styles.input} value={searchTerm} onChange={handleSearch} placeholder="Buscar autoparte..." />
                </form>
              </div>
            </div>

          </section>

          <div style={{ width: '100%', backgroundColor: '#bababa', height: '1px', margin: '0 0 32px 0' }} />

          <SwiperAutopartes quantity={2} />

          {Object.entries(filteredData ? filteredData : data).map(([key, values]) => (
            <div key={key}>
              <h1 className={styles.title}>{key}</h1>
              <ul>
                {values.map((item) => {
                  const itemName = Object.values(item)[1]; // Obtener el nombre del elemento
                  const itemId = itemName.split(" ").join('-'); // Obtener el ID del elemento
                  return (
                    <Link key={itemId} href={`/glosario-de-autopartes/${itemId}-${Object.values(item)[0]}`} style={{ textDecoration: 'none' }}>
                      <li style={{ margin: '16px 0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ lineHeight: '16px' }} className={styles.subtitleCategory}>{Object.values(item)[2]}</p>
                          <h2 className={styles.question}>{Object.values(item)[1]}</h2>
                        </div>
                        <p className={styles.subtitleCategory}>Ver detalle</p>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          ))}

        </div>
        
        
      </div>


      {visibleShareArticulo && <ModalShareArticulo setVisibleShareArticulo={setVisibleShareArticulo} url={`https://www.quarks.com.co${router?.asPath}`} />}

    </Layout>
  )
}