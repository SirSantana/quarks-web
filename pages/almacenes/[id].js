import { GET_ALMACEN_REPUESTOS } from "@/graphql/queries";
import Layout from "@/src/Components/Layout";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from '@/styles/Almacenes.module.css'
import HeaderAlmacen from "@/src/Components/Almacenes/HeaderAlmacen";
import CardAlmacen from "@/src/Components/Almacenes/CardAlmacen";
import { Loader } from "@/utils/loader";
import { ModalError, ModalLoading } from "@/utils/Modales";
import Opiniones from "@/src/Components/Almacenes/Opiniones";
import { CREATE_VISITA_ALMACEN } from "@/graphql/mutations";
import RepuestosManejados from "@/src/Components/Almacenes/RepuestosManejados";

const subCategorias = {
  Accesorios: ['Accesorios', 'Alarma', 'Pito', 'Plumillas', 'Parasoles', 'Antena', 'Tapizados', 'Emblemas', 'Tapetes'],
  Baterias: ['Baterias'],
  Clutch: ['Balinera', 'Prensa', 'Kit Clutch', 'Balibomba', 'Guaya', 'Discos', 'Horquilla'],
  "Caja y Transmision": ['Bronces', 'Trenfijo', 'Reten', 'Guaya cambios', 'Corona', 'Palanca cambios',],
  Carroceria: ['Vidrio', 'Capot', 'Boceles', 'Espejos', 'Manijas', 'Bomper', 'Frontales', 'Puertas', 'Guardafango'],
  Correas: ['Distribucion', 'Alternador', 'Aire acondicionado'],
  "Direccion y suspension": ['Amortiguadores', 'Bocines', 'Axiales', 'Rotulas', 'Terminales', 'Espirales', 'Rodamientos', 'Tijeras', 'Ejes', 'Puntas de eje', 'Muñecos', '+2'],
  Electricos: ['Sensores', 'Bobinas', 'Computadores', 'Switch', 'Cables alta', 'Bujias', 'Motores'],
  Filtros: ['Aceite', 'Motor', 'Aire', 'Gasolina'],
  Lubricantes: ['Aceites'],
  Frenado: ['Bomba de freno', 'Mordazas', 'Campanas', 'Pastas', 'Discos', 'Manguera', 'Cilindro', 'Bandas', 'Palanca'],
  Iluminacion: ['Farolas', 'Bombillos', 'Stop', 'Direccional', 'Exploradoras'],
  Motor: ['Anillos', 'Pistones y bielas', 'Balancines', 'Casquetes', 'B. Aceite', 'Piñones', 'Carter', 'Valvulas', 'Kit distribucion', 'Inyectores', 'Soportes', '+5'],
  Refrigeracion: ['B. Agua', 'Ventilador', 'Refrigerador', 'Radiador', 'Termostato', 'Depositos', 'Compresor', '+3']
}

export default function Almacen() {
  const router = useRouter()
  const [getAlmacenRepuestos, { loading, data, error }] = useLazyQuery(GET_ALMACEN_REPUESTOS)
  const [createVisitaAlmacen, result] =useMutation(CREATE_VISITA_ALMACEN)
  const [loadingImage, setLoadingImage] = useState(true);
  const ref = useRef(null)
  const { id } = router.query
  let query = id?.substring(0, id?.indexOf('-'))
  const handleScroll = (ref) => {
    console.log('hola', ref);
    window.scrollTo({
      top: ref?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    getAlmacenRepuestos({ variables: { id: query } })
    createVisitaAlmacen({variables:{id:query}})
  }, [query])
  return (
    <Layout title={`Almacen ${data?.getAlmacenRepuestos?.nombre}`} description={'Almacen en ' + data?.getAlmacenRepuestos?.direccion + " " + data?.getAlmacenRepuestos?.barrio + " " + data?.getAlmacenRepuestos?.ciudad + " repuestos para " + data?.getAlmacenRepuestos?.marcas?.map(el => "" + el) + " repuestos de " + data?.getAlmacenRepuestos?.categorias?.map(el => " " + el) + " " + data?.getAlmacenRepuestos?.categorias?.map(categoria => subCategorias[categoria]?.map(categoria => categoria + " · "))}>
      <div className={styles.container}>
        <div onClick={() => handleScroll(ref?.current)} style={{ cursor: 'pointer' }}>
          <HeaderAlmacen almacen={data?.getAlmacenRepuestos} />
        </div>

        <div className={styles.containerDataAlmacen}>
          <div className={styles.containerFoto}>
            {loadingImage && <Loader />}
            <img onLoad={() => setLoadingImage(false)}
              src={data?.getAlmacenRepuestos?.fotoperfil} className={styles.imgPerfil} alt={data?.getAlmacenRepuestos?.nombre} style={{ margin: 0, objectFit:'cover', display: loadingImage ? 'none' : 'block', alignSelf: 'center' }} />
          </div>
          <CardAlmacen almacen={data?.getAlmacenRepuestos} />
          
          <div className={styles.containerDescripcion}>
            <h2 style={{ fontSize: '16px', marginBottom: '8px' }} className={styles.title2}>Descripción</h2>
            <h3 className={styles.title3} style={{fontSize: '14px',}}>{data?.getAlmacenRepuestos?.descripcion ? data?.getAlmacenRepuestos?.descripcion:'Este almacen no tiene descripcion'}</h3>
          </div>
          <div  className={styles.containerRepuestos}>
            <RepuestosManejados almacen={data?.getAlmacenRepuestos}/>

          </div>
          <div className={styles.containerOpiniones}>
            <Opiniones almacen={data?.getAlmacenRepuestos?.id}/>
          </div>
          <div ref={ref} className={styles.containerUbicacion}>
            <h2 style={{ fontSize: '16px', marginBottom: '16px' }} className={styles.title2}>Ubicación</h2>

            <iframe className={styles.mapsImage} src={data?.getAlmacenRepuestos?.ubicacionmaps} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>

        </div>

      </div>
      {/* {loading &&
        <ModalLoading title={'Espera un momento...'} />} */}
      {error &&
        <ModalError title={'Ha ocurrido un error'} subtitle={error?.message} />
      }

    </Layout>
  )
}