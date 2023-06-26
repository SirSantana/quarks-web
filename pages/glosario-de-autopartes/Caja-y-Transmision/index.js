import HeaderHome from '@/src/Components/Index/HeaderHome';
import Layout from '@/src/Components/Layout';
import data from '@/utils/repuestos.json'
import { useRouter } from 'next/router';
import styles from '@/styles/Diccionario.module.css'
import { useState } from 'react';
import SwiperAutopartes from '@/src/Components/Home/SwiperAutopartes';
import Link from 'next/link';
import { ModalShareArticulo } from '@/utils/Modales';

let description = 'Conoce las partes del sistema de frenado de un vehiculo en el glosario automotriz. La sección de frenos de vehículos ofrece una amplia variedad de partes y componentes esenciales para el sistema de frenado de un automóvil. Descubre discos de freno, pastillas, pinzas, tambores, cilindros, mangueras y más. Asegura la seguridad y el rendimiento de tu vehículo con piezas de calidad y conoce consejos de mantenimiento y diagnóstico de problemas. Explora nuestra sección de frenos y obtén todo lo necesario para mantener un sistema de frenado confiable y eficiente en tu vehículo.'
let keywords = 'frenos, partes de frenos, discos de freno, pastillas de freno, pinzas de freno, tambores de freno, cilindros de freno, mangueras de freno, sistema de frenado, seguridad en frenos, mantenimiento de frenos, diagnóstico de frenos, rendimiento de frenos, repuestos de frenos, automóvil.'
export default function FrenosSeccion() {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleShareArticulo, setVisibleShareArticulo] = useState(false)
  const router = useRouter()

  const articulosFiltrados = Object.values(data).flatMap((seccion) =>
    seccion.filter((articulo) => articulo.description === 'Caja y Transmision')
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
    <Layout title={'Autopartes de frenos | Glosario Automotriz'} description={description} keywords={keywords} type='article' image={'../../Caja y Transmision.png'} url={router?.asPath}>
      <div className={styles.container}>
        <HeaderHome />

        <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h1 className={styles.title2}>Autopartes Caja y Transmision</h1>
          <img src={'../../Caja y Transmision.png'} className={styles.icon} alt="Glosario de repuestos de carro" />
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

        <SwiperAutopartes quantity={2} select={'Caja y Transmision'} imgPath={true} />

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
      {visibleShareArticulo && <ModalShareArticulo setVisibleShareArticulo={setVisibleShareArticulo} url={`https://www.quarks.com.co${router?.asPath}`} />}

    </Layout>
  )
}