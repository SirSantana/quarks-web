import SwiperAutopartes from "@/src/Components/Home/SwiperAutopartes";
import Layout from "@/src/Components/Layout";
import styles from '@/styles/Diccionario.module.css'
import { useState } from "react";
import data from '@/utils/repuestos.json'
import Link from "next/link";
import { useRouter } from "next/router";
import { ModalShareArticulo } from "@/utils/Modales";
import Button, { ButtonVariant } from "@/src/Components/Button/Button";

let keywords = "autopartes, repuestos de automóviles, componentes de vehículos, terminología de autopartes, glosario de repuestos, piezas de automóviles, accesorios para autos, mecánica automotriz, vocabulario de autopartes, diccionario de repuestos, explicación de componentes de automóviles, significado de las partes de un automóvil, guía de autopartes, descripción de repuestos de vehículos, nomenclatura de autopartes, jerga de la industria automotriz, explicación técnica de piezas de automóviles, conceptos básicos de autopartes, mecánica automotriz."
let descripcion = 'El glosario de autopartes es una completa guía que te brinda un amplio vocabulario y explicación detallada de los diferentes componentes y repuestos que conforman un automóvil. Desde los elementos básicos hasta los más técnicos, este glosario te permite entender y familiarizarte con la terminología utilizada en el mundo de las autopartes. Explora nuestras definiciones claras y concisas, descubre el significado y la función de cada pieza, y adquiere el conocimiento necesario para comprender mejor tu vehículo y realizar reparaciones o mantenimiento de manera más informada. ¡Empodérate con el diccionario de repuestos y mejora tu experiencia en el ámbito de la mecánica automotriz!'

const items = [
  {
    nombre: "Filtros",
    descripcion: "Aprende sobre los filtros de aire, aceite, gasolina y más.",
    cantidad: 7,
    img: '/filtro-aire-glosario.webp'
  },
  {
    nombre: "Dirección y Suspensión",
    descripcion: "Descubre los componentes clave para la estabilidad y el control del vehículo.",
    cantidad: 5,
    img: 'https://res.cloudinary.com/db3veuotr/image/upload/v1739022738/cremallera-direccion-glosario_vz7j7d.webp'

  },
  {
    nombre: "Eléctricos",
    descripcion: "Explora el sistema eléctrico, desde baterías hasta sistemas de encendido.",
    cantidad: 6,
    img: '/bujia-glosario.webp'

  },
  {
    nombre: "Motor",
    descripcion: "Conoce a fondo las piezas esenciales del motor y cómo funcionan.",
    cantidad: 8,
    img: '/piston-glosario.webp'

  },
  {
    nombre: "Refrigeración",
    descripcion: "Aprende sobre el sistema de refrigeración y cómo mantenerlo eficiente.",
    cantidad: 4,
    img: 'https://res.cloudinary.com/db3veuotr/image/upload/v1739055209/bomba-agua-glosario_lehwxk.webp'

  },
  {
    nombre: "Frenos",
    descripcion: "Entiende el funcionamiento de los sistemas de frenos y sus componentes.",
    cantidad: 6,
    img: '/frenos-glosario.webp'

  },
  {
    nombre: "Caja y Transmisión",
    descripcion: "Descubre cómo operan las cajas de cambio y los sistemas de transmisión.",
    cantidad: 5,
    img: '/caja-direccion-glosario.webp'

  },
  {
    nombre: "Correas",
    descripcion: "Aprende sobre la importancia de las correas y su mantenimiento.",
    cantidad: 3,
    img: 'https://azurequarks.blob.core.windows.net/repuestos/correarep240623.png'

  },
  {
    nombre: "Embrague",
    descripcion: "Explora los sistemas de embrague y cómo funcionan en los vehículos.",
    cantidad: 4,
    img: 'https://res.cloudinary.com/db3veuotr/image/upload/v1739055351/clutch-plate-glosario_zywfe9.webp'

  },
  {
    nombre: "Accesorios",
    descripcion: "Descubre accesorios útiles y complementarios para tu vehículo.",
    cantidad: 7,
    img: 'https://res.cloudinary.com/db3veuotr/image/upload/v1739023432/plumilla-limpiabrisas-glosario_k6g7gb.webp'

  },
];


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
     <div className={styles.backFondo}/>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroTextContainer}>
            <h1 className={styles.heroTitle}>
              La <span className={styles.highlight}>guía</span> para entender tu auto
            </h1>
            <p className={styles.heroSubtitle}>
              Encuentre artículos de más de 30 autopartes, con su significado, preguntas frecuentes y más!
            </p>
            <Button style={{ marginTop: '24px' }} link='/glosario-terminos/Amortiguador-648d069fa78195fbadfa31e2' href={'/glosario-terminos/Amortiguador-648d069fa78195fbadfa31e2'} variant={ButtonVariant.primary} >Empieza a aprender!</Button>
          </div>
          <div className={styles.heroImageContainer}>
            <img
              src="/conocetuauto.webp"
              alt="Autoparte"
              className={styles.heroImage}
            />

          </div>
        </section>

        {/* Categories Section */}
        <section className={styles.categoriesSection}>
          <h2 className={styles.categoriesTitle}>
            Bienvenido, sobre qué tema te gustaría aprender?
          </h2>
          <div className={styles.cardsContainer}>

            {items.map((item, index) => (
              <div key={index} className={styles.card}>
                <img
                  src={item.img}
                  alt="Autoparte"
                  className={styles.cardImage}
                />
                <section style={{display:'flex', flexDirection:'column', gap:'8px'}}><h3 className={styles.cardTitle}>{item.nombre}</h3>
                  <p className={styles.cardDescription}>{item.descripcion}</p>
                  <span className={styles.cardFooter}>Articulos · {item.cantidad}</span></section>
              </div>
            ))}
          </div>

        </section>
      </div>

    </Layout>
  )
}