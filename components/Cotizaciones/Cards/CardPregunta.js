import styles from '../../../styles/Talleres.module.css'
import CardsPreguntas from './CardsPreguntas'
import useAuth from '../../../hooks/useAuth'
import FormCotizar from '../Venderdor/FormCotizar'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GET_AVATAR_USER, GET_COTIZACIONES } from '../../../graphql/queries'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import CardCotizacion from './CardCotizacion'
import ModalError from '../../../utils/modalError'
import LayoutPostCharge from '../../Lugares/LayoutPosts'

export default function CardPregunta({ data, setPrice }) {
  const { user } = useAuth()
  const [getCotizaciones, result] = useLazyQuery(GET_COTIZACIONES)
  const router = useRouter()
  const cotizacionesRef = useRef()
  const [tiempoLoading, setTiempoLoading] = useState(0)
  const [visibleModal, setVisibleModal] = useState(false)

  let time;
  if (visibleModal) {
    time = setTimeout(() => (
      setTiempoLoading(tiempoLoading + 1)
    ), 1000)
  }
  useEffect(() => {
    if (result) {
      window.scrollTo({
        top: cotizacionesRef.current.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
    if (result?.data?.getCotizaciones.length <= 0) {
      setVisibleModal(true)

    }
  }, [result])

  useEffect(() => {
    if (tiempoLoading > 3) {
      clearTimeout(time)
      setVisibleModal(false)
    }
  }, [tiempoLoading])

  const id = router.query.id
  let query = id?.substring(0, id?.indexOf(' '))
  useEffect(() => {
    if (id) {
      getCotizaciones({ variables: { id: query } })
    }
  }, [id])

  return (
    <>
      <div className={styles.containerCotizaciones}>
        <div className={styles.containerCotizaciones2}>
          <img src="/user-solid.svg" alt="User icon" style={{ width: '30px', height: '30px', margin: '5px' }} />
          <h4 style={{ color: 'black', margin: '0 0 10px 0', fontWeight: 500 }}>Pregunta</h4>
          <div style={{ backgroundColor: 'white', padding: '20px', width: '90%', boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 8px" }}>
            <CardsPreguntas el={data} />
          </div>
        </div>
        {user?.role === 'Vendedor' && <div style={{ padding: 0 }} className={styles.containerCotizaciones2}> <img src="/file-pen-solid.svg" alt="Cotizacion icon" style={{ width: '30px', height: '30px', margin: '5px' }} />
          <h4 style={{ color: 'black', margin: '0 0 10px 0', fontWeight: 500 }}>Cotizacion</h4><FormCotizar celular={data?.celular} /></div>
        }
      </div>
      <div style={{ height: '1px', backgroundColor: 'gray', margin: '20px 0' }} />
      <h4 style={{ color: 'black', margin: '20px', fontWeight: 500 }}>{result?.data?.getCotizaciones.length > 0 ? 'Cotizacion(es)' : 'Aun no hay cotizaciones'}</h4>
      <div ref={cotizacionesRef} className={styles.grid}>
        {result?.loading && <LayoutPostCharge />}
        {result?.data?.getCotizaciones.length > 0 ?
          result?.data?.getCotizaciones.map(el => (
            <CardCotizacion setPrice={setPrice} data={el} userId={user?.id} pregunta={data?.marca + " " + data?.referencia + " " + data?.titulo} idPregunta={router.query.id} />
          ))
          : visibleModal && user?.role !== 'Vendedor' && <ModalError description={'Aún no hay cotizacio(es)'} mensaje={'Lo sentimos, vuelve pronto'} />
        }
        {result?.error && <ModalError mensaje={'Ha ocurrido un error'} description={result?.error?.mensaje} />}
      </div>
    </>
  )
}