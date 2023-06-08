import { GET_ALL_GASTOS } from '@/graphql/queries'
import styles from '@/styles/Dashboard.module.css'
import { ModalLoading } from '@/utils/Modales'
import { useLazyQuery } from '@apollo/client'
import { useEffect, useLayoutEffect, useState } from 'react'
import CardAnalytics from './CardAnalytics'
import CardBalance from './CardBalance'
import CardGastosManteni from './CardGastosManteni'
import CardPremium from './CardPremium'


export default function IndexDashboardCar({ car, setCar, setGetCars }) {
  const [idCar, setIdCar] = useState(null)

  const [getAll, { loading, data, error }] = useLazyQuery(GET_ALL_GASTOS)
  const [gastos, setGastos] = useState(null)
  const [gastosArray, setGastosArray] = useState(null)
  const [selectTipoGasto, setSelectTipoGasto] = useState('Todos')
  const [totalGastadoAño, setTotalGastadoAño] = useState(0)
  let gastosArra = []

  const separarGastosPorMesYTipo = (gastos, year, tipoGasto) => {
    const gastosPorMesYTipo = {};

    gastos?.forEach((gasto) => {
      const fecha = new Date(gasto.fecha);
      const gastoYear = fecha.getFullYear();

      if (gastoYear === year && (!tipoGasto || gasto.tipo === tipoGasto)) {
        const month = fecha.getMonth();

        if (!gastosPorMesYTipo[month]) {
          gastosPorMesYTipo[month] = {
            gastos: [],
            total: 0,
          };
        }
        gastosArra.push(gasto)
        gastosPorMesYTipo[month].gastos.push(gasto);
        gastosPorMesYTipo[month].total += Number(gasto.dineroGastado);
        if (selectTipoGasto === 'Todos' && totalGastadoAño === 0) {
          setTotalGastadoAño((prev) => prev += Number(gasto.dineroGastado))
        }
      }
      setGastosArray(gastosArra.reverse())
    });
    for (let i = 0; i < 12; i++) {
      if (!gastosPorMesYTipo[i]) {
        gastosPorMesYTipo[i] = {
          gastos: [],
          total: 0,
        };
      }
    }

    return gastosPorMesYTipo;
  };
  useEffect(() => {
    const gastos = data?.getAllGastos
    let tipoGasto = selectTipoGasto !== 'Todos' ? selectTipoGasto : null
    const gastosPorMes = separarGastosPorMesYTipo(gastos, 2023, tipoGasto);
    setGastos(gastosPorMes)

  }, [data, selectTipoGasto])
  useLayoutEffect(() => {
    setSelectTipoGasto('Todos')
    setTotalGastadoAño(0)


    if (idCar) {
      getAll({ variables: { id: idCar } })
    }
  }, [idCar])
  return (
    <>
      {loading && <ModalLoading title={'Cargando datos...'} />}

      <CardBalance setIdCar={setIdCar} setCar={setCar} car={car} setGetCars={setGetCars} totalGastadoAño={totalGastadoAño} />
      <CardPremium gastos={data?.getAllGastos} />
      {/* <CardPerfil/> */}
      <CardAnalytics idCar={idCar} gastosArray={gastosArray} setSelectTipoGasto={setSelectTipoGasto} selectTipoGasto={selectTipoGasto} gastos={gastos} totalGastadoAño={totalGastadoAño} />
      <CardGastosManteni idCar={idCar} />
      <div className={styles.cotizaciones}>
        <h6 className={styles.subtitle}>Quarks</h6>
      </div>
    </>
  )
}