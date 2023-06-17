import { GET_ALMACENES_REPUESTOS, GET_BUSQUEDA_ALMACENES } from "@/graphql/queries";
import Almacen from "@/src/Components/Almacenes/Almacen";
import AlmacenesByCategoria from "@/src/Components/Almacenes/AlmacenesByCategoria";
import BuscadorAlmacenes from "@/src/Components/Almacenes/Buscador";
import AlmacenesRecomendados from "@/src/Components/Almacenes/RecomendadosAlmacenes";
import Layout from "@/src/Components/Layout";
import styles from '@/styles/Almacenes.module.css'
import { ModalError, ModalInteresadoAnuncio, ModalLoading } from "@/utils/Modales";
import { useLazyQuery, useQuery } from "@apollo/client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@/utils/loader";

import CardCategorias from "@/src/Components/Almacenes/CardCategorias";
import { useRouter } from "next/router";

const initialForm = {
  marca: 'Chevrolet',
  categoria: ''
}
const categorias = ['Motor', 'Frenado', 'Correas']

export default function AlmacenesPage() {
  const { loading, data, error } = useQuery(GET_ALMACENES_REPUESTOS)
  const [formBusqueda, setFormBusqueda] = useState(initialForm)
  const [getBusquedaAlmacenes, result] = useLazyQuery(GET_BUSQUEDA_ALMACENES)
  const [visibleModalInteresado,setVisibleModalInteresado] = useState(false)
  const router = useRouter()
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
        {loading && <Loader />}

        {formBusqueda.categoria === '' &&
          <>
            <h1 className={styles.title2} style={{ marginTop: '32px' }}>Categorias de repuestos</h1>
            <CardCategorias setFormBusqueda={setFormBusqueda} formBusqueda={formBusqueda} />
            <h2 className={styles.title2} style={{ marginTop: '32px' }}>Almacenes Recomendados</h2>
            <AlmacenesRecomendados />
          </>
        }

        {result?.loading && <Loader />}

        {result?.data?.getBusquedaAlmacenes?.length > 0 &&
          <>
            <div ref={ref} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '32px' }}>
              <img src={`../${formBusqueda.categoria}.png`} style={{ height: '32px', width: '32px', marginRight: '8px' }} />
              <h2  className={styles.title2} >Almacenes de {formBusqueda.categoria}</h2>
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
            <button style={{ alignSelf: 'flex-start', margin: '16px 0' }} className={styles.button} onClick={() => setFormBusqueda(initialForm)}>Regresar</button>

          </>
        }
        {result?.data?.getBusquedaAlmacenes?.length <= 0 && formBusqueda?.categoria !== '' &&
          <>
            <h3 className={styles.subtitle} style={{ marginTop: '32px', }}>No hay almacenes de este tipo, lo sentimos</h3>
            <button style={{ alignSelf: 'flex-start', margin: '16px 0' }} className={styles.button} onClick={() => setFormBusqueda(initialForm)}>Regresar</button>
          </>

        }
        <div>
          <h2 className={styles.title2}>Servicios Quarks.com.co</h2>
          <div className={styles.containerServicios} >
            <div onClick={()=> setVisibleModalInteresado(true)} className={styles.cardServicios}>
              <h2 style={{ fontSize: '24px', margin:'0 0 16px 0'}} className={styles.title2}>Anuncia tu almacen</h2>
              <button style={{ alignSelf: 'flex-start', backgroundColor: '#FFF4F0', color: '#5B0221', fontWeight: '600', width:'50%', maxWidth:'200px' }} className={styles.button} >Contactar</button>

              <img src={'../storefront-outline.svg'} style={{ height: '100px', width: '100px', justifySelf: 'flex-end', alignSelf: 'flex-end' }} />
            </div>
            <div className={styles.cardServicios2}>
              <h2 style={{ fontSize: '24px', margin:'0 0 16px 0' }} className={styles.title2}>Cotiza tus repuestos</h2>
              <button onClick={() => router.push('/')} style={{ alignSelf: 'flex-start',  fontWeight: '600', width:'50%', maxWidth:'200px' }} className={styles.button} >Cotizar</button>

              <img src={'../Frenado.png'} style={{ height: '100px', width: '100px', justifySelf: 'flex-end', alignSelf: 'flex-end' }} />
            </div>
          </div>
        </div>

        

      </div>
      {/* {loading &&
        <ModalLoading title={'Cargando almacenes...'} />} */}
      {error &&
        <ModalError title={'Ha ocurrido un error'} subtitle={error?.message} />
      }
      {visibleModalInteresado &&
        <ModalInteresadoAnuncio setVisibleModalInteresado={setVisibleModalInteresado}/>
      }
    </Layout>
  )
}