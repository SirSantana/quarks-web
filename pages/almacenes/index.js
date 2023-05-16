import { GET_ALMACENES_REPUESTOS, GET_BUSQUEDA_ALMACENES } from "@/graphql/queries";
import Almacen from "@/src/Components/Almacenes/Almacen";
import AlmacenesByCategoria from "@/src/Components/Almacenes/AlmacenesByCategoria";
import BuscadorAlmacenes from "@/src/Components/Almacenes/Buscador";
import AlmacenesRecomendados from "@/src/Components/Almacenes/RecomendadosAlmacenes";
import Layout from "@/src/Components/Layout";
import styles from '@/styles/Almacenes.module.css'
import { ModalError, ModalLoading } from "@/utils/Modales";
import { useLazyQuery, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const initialForm = {
  marca: '',
  categoria: ''
}
const categorias = ['Motor', 'Frenado', 'Correas']

export default function AlmacenesPage() {
  const { loading, data, error } = useQuery(GET_ALMACENES_REPUESTOS)
  const [formBusqueda, setFormBusqueda] = useState(initialForm)
  const [getBusquedaAlmacenes, result] = useLazyQuery(GET_BUSQUEDA_ALMACENES)
  const ref = useRef(null)

  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };
  const handleChangePestaña = (almacen) => {
    window.open(`/almacenes/${almacen?.id}-${almacen?.nombre?.split(" ").join('-')}`);
  }
  useEffect(() => {
    if (formBusqueda.categoria !== '', formBusqueda.marca !== '') {
      getBusquedaAlmacenes({ variables: { marca: formBusqueda.marca, categoria: formBusqueda.categoria } })
      handleScroll(ref.current)
    }
  }, [formBusqueda])
  return (
    <Layout title={'Almacenes | Quarks'}>
      <div className={styles.container}>
        {/* <h1 className={styles.title}>Buscar Almacenes</h1> */}
        <BuscadorAlmacenes setFormBusqueda={setFormBusqueda} />
        {formBusqueda.categoria === '' &&
          <>
            <h1 ref={ref} className={styles.title2} style={{ marginTop: '32px' }}>Almacenes Recomendados</h1>
            <AlmacenesRecomendados data={data} />

            {categorias.map(el => (
              <>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '32px' }}>
                  <img src={`../${el}.png`} style={{ height: '32px', width: '32px', marginRight: '8px' }} />
                  <h1 ref={ref} className={styles.title2} >Almacenes de {el}</h1>
                </div>
                <AlmacenesByCategoria categoria={el} />
              </>
            ))}</>
        }
        {result?.data?.getBusquedaAlmacenes?.length > 0 &&
          <>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '32px' }}>
              <img src={`../${formBusqueda.categoria}.png`} style={{ height: '32px', width: '32px', marginRight: '8px' }} />
              <h1 ref={ref} className={styles.title2} >Almacenes de {formBusqueda.categoria}</h1>
            </div>
            <div className={styles.gridCotizaciones}>
              {result?.data?.getBusquedaAlmacenes.map(almacen => (
                <Link href={'#'} onClick={() => handleChangePestaña(almacen)} style={{ outline: 'none', color: 'white' }}>
                  <div className={styles.card}>
                    <Almacen almacen={almacen} />
                  </div>
                </Link>
              ))}
            </div>
          </>
        }


        {result?.data?.getBusquedaAlmacenes?.length <= 0 && formBusqueda?.categoria !== '' &&
          <h3 className={styles.subtitle} style={{ marginTop: '32px', }}>No hay almacenes de este tipo, lo sentimos</h3>
        }

      </div>
      {loading &&
        <ModalLoading title={'Cargando almacenes...'} />}
      {error &&
        <ModalError title={'Ha ocurrido un error'} subtitle={error?.message} />
      }
    </Layout>
  )
}