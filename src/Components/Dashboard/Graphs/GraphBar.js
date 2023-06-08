import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      display: false,
      grid: {
        display: false
      }
    }
  },
  barPercentage: 0.5,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      anchor: 'end',
      align: 'end',
      offset: 0,
      formatter: function (value, context) {
        if (context.active) {
          // Etiqueta cuando se hace hover sobre la barra
          return `Parqueadero (Hover)`;
        } else {
          // Etiqueta inferior predeterminada
          return `P (Default)`;
        }
      }
    }
  },
};


const labels = ['Tanqueada','Manteni', 'Lavada', 'Repuesto','Parque', 'Peajes','Multa', 'Otros'];

export const data = {
  labels:'',
  datasets: [
    {
      label: 'Gastos',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderRadius: 8,
      data: ''
    },
  ],
};

export function GraphBar({ gastosMes }) {
  const [visible, setVisible] = useState(false)
  useLayoutEffect(() => {
    if (gastosMes) {
      const filteredLabels = labels.filter((label, index) => gastosMes[index] !== 0);
      data["labels"]= filteredLabels
      data?.datasets?.map(el => el.data = gastosMes)
      setVisible(true)
    }
  }, [gastosMes, data])
  return (
     visible && data?.datasets[0].data  && <Bar options={options} data={data} />

  )
}
