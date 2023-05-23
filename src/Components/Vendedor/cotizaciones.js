import { GET_COTIZACIONES_USER, GET_ONE_PREGUNTA } from '@/graphql/queries'
import useAuth from '@/hooks/useAuth'
import styles from '@/styles/Cotizaciones.module.css'
import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'


export default function CotizacionesVendedor() {
  const router = useRouter()
  const { user } = useAuth()
  const [getCotizacionesUser, { loading, data, error }] = useLazyQuery(GET_COTIZACIONES_USER)
  const [getPregunta, result] = useLazyQuery(GET_ONE_PREGUNTA)

  const [split, setSplit] = useState(10)
  const refMore = useRef(null)

  const handleVisiblePregunta = (id) => {
    getPregunta({ variables: { id: id } })
  }
  useEffect(() => {
    if (result?.data) {
      router.push(`/cotizaciones/${result?.data?.getOnePregunta.id}-${result?.data?.getOnePregunta.titulo.split(" ").join('-')}`)
    }
  }, [result?.data])

  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
      if(data?.getCotizacionesUser.length<=0){
        router.reload()
      }
      getCotizacionesUser({ variables: { id: user?.id, limit: split } })
      handleScroll(refMore.current)

  }, [split])
  return (
    < >
      <h1 className={styles.title}>Cotizaciones</h1>
      <section style={{ marginTop: '32px' }} className={styles.gridCotizaciones1}>


        {data?.getCotizacionesUser?.length>0 && data?.getCotizacionesUser.map(el => (
          <div className={styles.card}>
            <div style={{ height: '100%' }} className={styles.containerCotizaciones2}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end', marginBottom: '8px', }}>

                <div style={{ width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                      <span style={{ color: '#373737', fontSize: '24px', margin: 0, fontWeight: 700 }}>$ {el.precio}</span>
                      {el?.envio && <h4 style={{ color: 'green', fontSize: '18px', margin: 0, marginLeft: '10px', fontWeight: 600 }}>Envio Gratis!</h4>}
                    </div>
                    {/* <h6 style={{ color: 'gray', fontSize: '12px', margin: 0, fontWeight: 400 }}>Precio sujeto a cambios en el tiempo*</h6> */}
                  </div>
                  <div>

                    <div style={{ display: 'flex', margin: '16px 0', gap: '16px', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ margin: 0, fontSize: '14px', color: 'gray' }} className={styles.subtitle}>Descripción  </h3>
                      <h3 style={{ margin: 0, }} className={styles.subtitle}> {el?.descripcion}</h3>
                    </div>
                    <div style={{ height: '1px', backgroundColor: 'lightGray', margin: '10px 0' }} />

                  </div>
                  <div style={{ display: 'flex', margin: '16px 0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '14px', color: 'gray' }} className={styles.subtitle}>Estado  </h3>
                    <h3 style={{ margin: 0 }} className={styles.subtitle}> {el?.estado}</h3>
                  </div>

                  <div style={{ display: 'flex', margin: '16px 0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '14px', color: 'gray' }} className={styles.subtitle}>Garantía  </h3>
                    <h3 style={{ margin: 0 }} className={styles.subtitle}> {el?.garantia?.length > 0 ? el?.garantia + ' mes(es)' : 'Sin garantía'}</h3>
                  </div>

                  <div style={{ display: 'flex', margin: '16px 0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '14px', color: 'gray' }} className={styles.subtitle}>Marca / origen  </h3>
                    <h3 style={{ margin: 0, }} className={styles.subtitle}> {el?.marca}</h3>
                  </div>
                  <h6 style={{ color: '#f50057', margin: 0, fontWeight: 400, fontSize: '14px' }}>Precio sujeto a cambios en el tiempo*</h6>
                </div>

              </div>
              <button onClick={() => handleVisiblePregunta(el.pregunta)} className={styles.button}>Ver pregunta</button>

            </div>

          </div>

        ))
        }

      </section>
      {split <= data?.getCotizacionesUser.length &&
        <div ref={refMore} style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '32px', }}>
          <button style={{ width: '300px', backgroundColor: 'white', color: '#f50057', border: '1px solid #f50057' }} onClick={() => setSplit(split + 8)} className={styles.button} >Cargar mas resultados</button>
        </div>
      }

    </>
  )
}