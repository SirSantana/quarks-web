import styles from '@/styles/Landing.module.css'
import CardNewTaller from './CardNewTaller'
import talleres from '@/pages/servicios-automotriz/talleres.json'
import Select from 'react-select'
import { options2 } from '../Main/Main'
import { useRouter } from 'next/router'

const customStyles = {
  control: (provided,) => ({
    ...provided,
    border: 'none',
    boxShadow: 'none',
    fontSize: '14px',
    fontWeight: '700',
    width: '200px'
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '14px',
    backgroundColor: state.isSelected ? '#f50057' : 'white',
    color: state.isSelected ? 'white' : 'black',
    ':hover': {
      backgroundColor: '#ffefef',
      color: 'black',
    },
  }),
};

export default function SectonFilters({ data }) {
  const router = useRouter()
  const parts = router?.query?.id?.split("-");

  const handleChange2 = (e) => {
    router.push(`/servicios-automotriz/${parts[0]}-${e.value}`)
  }
  const levenshteinDistance = (s1, s2) => {
    const m = s1.length;
    const n = s2.length;

    // Inicializar una matriz m × n con 0
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Llenar la matriz con los valores de distancia
    for (let i = 0; i <= m; i++) {
      for (let j = 0; j <= n; j++) {
        if (i === 0) {
          dp[i][j] = j;
        } else if (j === 0) {
          dp[i][j] = i;
        } else if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }
    }

    return dp[m][n];
  };
  let categoria = 'Alineación y balanceo'
  const filteredItems = talleres.talleres.filter(item =>
    item.categorias.some(categoriaa => categoriaa.toLowerCase().includes(categoria.toLowerCase())) ||
    levenshteinDistance(item.nombre.toLowerCase(), categoria.toLowerCase()) < 5 // Valor umbral de similitud
  );
  return (
    <section className={styles.containerGridTalleres}>
      <div className={styles.headerTalleres} >
        <div >
          {router?.pathname !== '/'
            && <h1 style={{ textAlign: 'left', }} className={styles.title2}>Taller automotriz de {parts?.[0]} </h1>
          }
          {router?.pathname !== '/'
            ?
            <h4 style={{ textAlign: 'left' }} className={styles.subtitle2}>Se encontraron {data?.length} taller de carro de {parts?.[0]} cerca a mi en {parts?.[1]}</h4>
            :
            <h4 style={{ textAlign: 'left' }} className={styles.subtitle2}>Mas de 100 talleres mecanicos cerca a mi</h4>
          }
        </div>
        {router?.pathname !== '/' && <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', gap: '16px', }}>
          <Select onChange={handleChange2} options={options2} styles={customStyles} defaultValue={options2[0]} />
        </div>}
      </div>
      <div className={styles.gridCardTalleres} >
        {data?.length <= 0 && router.pathname !== '/' ? <h2 style={{ fontSize: '14px', fontWeight: '500', color: '#6D6D6D' }}>No se encontraron resultados...</h2>
          :
          data?.length > 0 ? data?.map(el => (
            <CardNewTaller taller={el} />
          ))
            : filteredItems?.map(el => (
              <CardNewTaller taller={el} />
            ))
        }
      </div>
    </section>
  )
}