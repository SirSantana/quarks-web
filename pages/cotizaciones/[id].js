import { useRouter } from 'next/router'
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from 'react';
import Layout from '@/src/Components/Layout';
import { GET_COTIZACIONES, GET_ONE_PREGUNTA } from '@/graphql/queries';
import CardCotizacionCliente from '@/src/Components/Cotizaciones/Cards/CardCotizacionCliente';
import styles from '@/styles/Cotizaciones.module.css'
import CardCotizacionVendedor from '@/src/Components/Cotizaciones/Cards/CardCotizacionVendedor';
import { Loader } from '@/utils/loader';



export default function Cotizacion() {
  const [getPregunta, { data, loading, error }] = useLazyQuery(GET_ONE_PREGUNTA);
  const [getCotizaciones, result] = useLazyQuery(GET_COTIZACIONES)

  const router = useRouter()
  const id = router.query.id

  let query = id?.substring(0, id?.indexOf(' '))
  useEffect(() => {
    if (query) {
      getPregunta({ variables: { id: query } })
    }
  }, [query])
  useEffect(() => {
    if (data?.getOnePregunta) {
      getCotizaciones({ variables: { id: data?.getOnePregunta.id } })
    }
  }, [data?.getOnePregunta])

  return (
    <Layout title={`${data?.getOnePregunta?.referencia} ${data?.getOnePregunta?.titulo} | Quarks`} type='product' keywords={`${data?.getOnePregunta?.marca} ${data?.getOnePregunta?.referencia} ${data?.getOnePregunta?.titulo}`} description={`${data?.getOnePregunta?.marca} ${data?.getOnePregunta?.referencia} ${data?.getOnePregunta?.titulo}`}>
      <div className={styles.container2}>

        <div className={styles.parentCotizacion}>
          <h1 style={{ margin: '32px 0' }} className={styles.title2}>Cotizacion  </h1>
          <div className={styles.containerOneCotizacion}>
            {loading && <Loader />}
            {data &&
              <CardCotizacionCliente el={data?.getOnePregunta} />
            }
          </div>
        </div>

        <div className={styles.parentCotizacion}>
          <h1 style={{ margin: '32px 0' }} className={styles.title2}>Cotizaciones  </h1>
          <div className={styles.containerOneCotizacion}>
            {result?.loading && <Loader />}
            {result?.data?.getCotizaciones &&
              result?.data?.getCotizaciones.map(el => (
                <>
                  <CardCotizacionVendedor data={el} pregunta={data?.getOnePregunta?.marca + " " + data?.getOnePregunta?.referencia + " " + data?.getOnePregunta?.titulo} idPregunta={router.query.id} />
                  <div style={{ height: '1px', backgroundColor: 'lightGray', margin: '10px 0' }} />
                </>

              ))
            }
            {result?.data?.getCotizaciones.length <= 0 &&
              <p className={styles.subtitle}>Aún no hay cotizaciones, regresa mas tarde</p>
            }

          </div>
        </div>

      </div>


    </Layout>
  )
}