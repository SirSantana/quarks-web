import HeaderHome from '@/src/Components/Index/HeaderHome';
import Layout from '@/src/Components/Layout';
import data from '@/utils/repuestos.json'
import { useRouter } from 'next/router';
import styles from '@/styles/Diccionario.module.css'
import { useState } from 'react';
import SwiperAutopartes from '@/src/Components/Home/SwiperAutopartes';
import Link from 'next/link';
import { ModalShareArticulo } from '@/utils/Modales';
import AsideGlosario from '@/src/Components/Articulos/AsideGlosario';

let description = 'Conoce las partes del sistema de motor de un vehiculo en el glosario automotriz. La sección de motor de vehículos ofrece una amplia variedad de partes y componentes esenciales para el sistema de motor de un automóvil. motor de combustión interna, motor de gasolina, motor diésel, motor de cuatro tiempos, motor de dos tiempos, cilindros del motor, pistones, árbol de levas, bielas, cigüeñal, sistema de distribución, sistema de admisión, sistema de escape, sistema de lubricación, sistema de refrigeración, sistema de inyección de combustible, sistema de encendido, sistema de control de emisiones, sistema de escape, sistema de alimentación de aire, sistema de combustible, sistema de aceite, sistema de refrigerante, motor eficiente, motor potente, motor de alta cilindrada, motor de baja cilindrada, rendimiento del motor, mantenimiento del motor, averías del motor, reparación del motor, ajuste del motor, reemplazo de piezas del motor.'
let keywords = 'motor de combustión interna, motor de gasolina, motor diésel, motor de cuatro tiempos, motor de dos tiempos, cilindros del motor, pistones, árbol de levas, bielas, cigüeñal, sistema de distribución, sistema de admisión, sistema de escape, sistema de lubricación, sistema de refrigeración, sistema de inyección de combustible, sistema de encendido, sistema de control de emisiones, sistema de escape, sistema de alimentación de aire, sistema de combustible, sistema de aceite, sistema de refrigerante, motor eficiente, motor potente, motor de alta cilindrada, motor de baja cilindrada, rendimiento del motor, mantenimiento del motor, averías del motor, reparación del motor, ajuste del motor, reemplazo de piezas del motor.'
export default function FrenosSeccion() {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleShareArticulo, setVisibleShareArticulo] = useState(false)
  const router = useRouter()

  const articulosFiltrados = Object.values(data).flatMap((seccion) =>
    seccion.filter((articulo) => articulo.description === 'Motor')
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };
  let filteredData;
  let articulos = []

  if (articulosFiltrados) {
    articulos.push(articulosFiltrados)
    filteredData = Object.entries(articulos).reduce((acc, [key, values]) => {

      const filteredValues = values?.filter((item) => {
        const itemName = item.name.toLowerCase();
        return itemName.includes(searchTerm.toLowerCase());
      });
      if (filteredValues.length > 0) {
        acc[key] = filteredValues;
      }
      return acc;
    }, {});
  }

  return (
    <Layout title={'Autopartes de Motor | Glosario Automotriz'} description={description} keywords={keywords} type='article' image={'../Motor.png'} url={router?.asPath}>
      <div className={styles.containerGrid}>
        <AsideGlosario/>

        <div className={styles.container}>
          {/* <HeaderHome /> */}

          <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h1 className={styles.title2}>Autopartes Motor</h1>
            <img src={'../../Motor.png'} className={styles.icon} alt="Glosario de repuestos de carro" />
          </section>

          <section className={styles.containerBottomHeaderInfo}>
            <div className={styles.containerButtonsHeader}>
              <div className={styles.divHeaderText}>
                <div className={styles.divIconHeader}>
                  <ion-icon name="eye-outline"></ion-icon>
                </div>
                <p className={styles.subtitleHeader}>2300 vistas</p>
              </div>
              <div className={styles.divHeaderText}>
                <div className={styles.divIconHeader}>
                  <ion-icon name="build-outline"></ion-icon>
                </div>
                <p className={styles.subtitleHeader}>{articulosFiltrados?.length} autopartes</p>
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

          <SwiperAutopartes quantity={2} select={'Motor'} imgPath={true} />

          {Object.entries(filteredData ? filteredData : articulos).map(([key, values]) => (
            <div key={key}>
              {/* <h1 className={styles.title}>Frenos</h1> */}
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