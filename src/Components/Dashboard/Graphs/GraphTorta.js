import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export function GraphTorta({ gastosMes }) {
  const [options, setOptions] = useState(null)
  const [data, setData] = useState(null)
  let labels = ['Tanqueada', 'Mantenimiento', 'Lavada', 'Repuesto', 'Parqueadero', 'Peajes', 'Multa', 'Otros']
  let labelsAño = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const optionss = {
        responsive: true,
        plugins: {
          legend: {
            position: 'left',
            width: 5
          },

        },
        cutout: 60,
        radius: 70,
        weight: 60,
        borderWidth: 0,
        layout: {
          padding: 0 // Establecer el padding/margen a 0
        },
        aspectRatio: 2,



      };
      const width = window.innerWidth

      const dataa = {
        labels: '',
        datasets: [
          {
            label: '$ gastado',
            data: '',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(155, 129, 64, 0.2)',

            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(155, 129, 64, 1)',

            ],
            borderWidth: 1,
            data: gastosMes
          },
        ],
      };
      if (width <= 900) {
        if(Object.keys(gastosMes).length>8){
          optionss["plugins"]["legend"]["display"] = 'left'
          optionss["aspectRatio"] = 1.6
        }else{
          optionss["plugins"]["legend"]["display"] = false
          optionss["aspectRatio"] = 1.1
        }
      }
      if(Object.keys(gastosMes).length>8){
        const filteredLabels = labelsAño.filter((label, index) => gastosMes?.[index.toString()]?.total !== 0);
        dataa["labels"] = filteredLabels
        dataa["datasets"][0]["data"]= labelsAño.map((el, index)=> gastosMes?.[index.toString()]?.total)

      }else{
        const filteredLabels = labels.filter((label, index) => gastosMes[index] !== 0);
        dataa["labels"] = filteredLabels
      }
      setOptions(optionss)
      setData(dataa)
    }
  }, [gastosMes]);
  return (
    data && options && <Doughnut data={data} options={options} />
  )
}
