import { GET_GASTOS_MONTH, GET_VEHICLES } from '@/graphql/queries'
import styles from '@/styles/Dashboard.module.css'
import PriceFormat from '@/utils/priceFormat'
import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'


export default function CardBalance({ setIdCar, setCar, car, setGetCars, totalGastadoAño }) {
  const [getGastosMonth, result] = useLazyQuery(GET_GASTOS_MONTH)
  const [isShowingMonth, setIsShowingMonth] = useState(true);
  const { loading, data, error } = useQuery(GET_VEHICLES)

  let dineroTotalGastado = 0;
  if (result?.data?.getGastosMonth) {
    for (let i = 0; i <= result?.data?.getGastosMonth?.length - 1; i++) {
      dineroTotalGastado += Number(result?.data?.getGastosMonth[i]?.dineroGastado)
    }
  }
  let gastosSeparados = [0, 0, 0, 0, 0, 0, 0, 0,]
  let numeroGastosSeparados = [0, 0, 0, 0, 0, 0, 0, 0,]
  if (result?.data?.getGastosMonth) {
    for (let i = 0; i < result?.data?.getGastosMonth?.length; i++) {
      switch (result?.data?.getGastosMonth[i].tipo) {
        case 'Tanqueada': { gastosSeparados[0] += Number(result?.data?.getGastosMonth[i].dineroGastado), numeroGastosSeparados[0]++ }
          break;
        case 'Mantenimiento': { gastosSeparados[1] += Number(result?.data?.getGastosMonth[i].dineroGastado), numeroGastosSeparados[1]++ }
          break;
        case 'Lavada': { gastosSeparados[2] += Number(result?.data?.getGastosMonth[i].dineroGastado), numeroGastosSeparados[2]++ }
          break;
        case 'Repuestos': { gastosSeparados[3] += Number(result?.data?.getGastosMonth[i].dineroGastado), numeroGastosSeparados[3]++ }
          break;
        case 'Parqueadero': { gastosSeparados[4] += Number(result?.data?.getGastosMonth[i].dineroGastado), numeroGastosSeparados[4]++ }
          break;
        case 'Peaje': { gastosSeparados[5] += Number(result?.data?.getGastosMonth[i].dineroGastado), numeroGastosSeparados[5]++ }
          break;
        case 'Multa': { gastosSeparados[6] += Number(result?.data?.getGastosMonth[i].dineroGastado), numeroGastosSeparados[6]++ }
          break;
        case 'Otros': { gastosSeparados[7] += Number(result?.data?.getGastosMonth[i].dineroGastado), numeroGastosSeparados[7]++ }
          break;
      }
    }
  }
  useEffect(() => {
    getGastosMonth({ variables: { id: car?.id } })
    setIdCar(car?.id)
  }, [car])
  useEffect(() => {
    if (data) {
      setCar(data?.getCars[0])
      setIdCar(data?.getCars[0].id)
      setGetCars(data?.getCars)
    }
  }, [data])
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsShowingMonth((prevIsShowingMonth) => !prevIsShowingMonth);
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className={styles.cardcar}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height:'100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height:'100%' ,justifyContent: 'space-between', }}>
          <h2 className={`${styles.subtitle2}`}>{isShowingMonth ? 'Balance este mes' : 'Balance este año'}</h2>

          <h3 className={`${styles.textprice}`}>$ {isShowingMonth ? PriceFormat({ price: dineroTotalGastado?.toString() }) : PriceFormat({ price: totalGastadoAño?.toString() })}</h3>

        </div>


      </div>
    </div>
  )
}