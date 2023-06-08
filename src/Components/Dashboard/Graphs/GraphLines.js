import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { GraphTorta } from './GraphTorta';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);



export function GraphLines({ monthData, tipoGrafico }) {
  const labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const [options, setOptions] = useState(null)
  const [data, setData] = useState(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const optionss = {
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          
        },
        aspectRatio: 1.5,
        responsive: true,
        plugins: {
          legend: {
            display: false
          },

        },
        maintainAspectRatio: false,

      };
      const dataa = {
        labels: labels,
        datasets: [
          {
            label: 'Gastos',
            data: labels.map((el, index)=> monthData?.[index.toString()]?.total),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: '#FFD4DA',
            borderRadius:8,
            fill: true,
            lineTension: 0.3,
          },
        ],
      };
      setData(dataa)
      setOptions(optionss)
    }

  }, [monthData])
  return (
    data && options && <>
         {tipoGrafico ===0 &&<Bar options={options} data={data} />}
        {tipoGrafico ===1 &&<Line options={options} data={data} />}
        {tipoGrafico ===2 &&<GraphTorta gastosMes={monthData}/>}
    </>
  )
}
