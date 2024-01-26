import styles from '@/styles/Landing.module.css'
import CardNewTaller from './CardNewTaller'
import talleres from '@/pages/servicios-automotriz/talleres.json'
import { useRouter } from 'next/router'

export default function SectonFilters({ data }) {
  const router = useRouter()
  // const levenshteinDistance = (s1, s2) => {
  //   const m = s1.length;
  //   const n = s2.length;

  //   // Inicializar una matriz m × n con 0
  //   const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  //   // Llenar la matriz con los valores de distancia
  //   for (let i = 0; i <= m; i++) {
  //     for (let j = 0; j <= n; j++) {
  //       if (i === 0) {
  //         dp[i][j] = j;
  //       } else if (j === 0) {
  //         dp[i][j] = i;
  //       } else if (s1[i - 1] === s2[j - 1]) {
  //         dp[i][j] = dp[i - 1][j - 1];
  //       } else {
  //         dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  //       }
  //     }
  //   }

  //   return dp[m][n];
  // };
  // let categoria = 'Alineación y balanceo'
  // const filteredItems = talleres.talleres.filter(item =>
  //   item.categorias.some(categoriaa => categoriaa.toLowerCase().includes(categoria.toLowerCase())) ||
  //   levenshteinDistance(item.nombre.toLowerCase(), categoria.toLowerCase()) < 5 // Valor umbral de similitud
  // );
  return (
    <div style={{marginTop:router?.pathname === '/' && '0px'}} className={styles.containerGridTalleres}>
      <section className={styles.headerTalleres} >
        {router?.pathname !== '/'
          && <h1 className={styles.title2}>Taller automotriz de {router?.query?.id ? router?.query?.id.replace(/-/g, ' ') : router.query.busqueda} </h1>
        }
        {router?.pathname !== '/'
          &&
          <h4 style={{ textAlign: 'left' }} className={styles.subtitle2}>Se encontraron {data?.length} talleres mecanicos de {router?.query?.id ? router?.query?.id.replace(/-/g, ' ') : router.query.busqueda} cerca a mi en Bogota</h4>
        }
        {/* {router?.pathname !== '/' && <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', gap: '16px', }}>
          <Select onChange={handleChange2} options={options2} styles={customStyles} defaultValue={options2[0]} />
        </div>} */}
      </section>
      <section className={styles.gridCardTalleres} >
        {/* {data?.length <= 0 && router.pathname !== '/' ? <h2 style={{ fontSize: '14px', fontWeight: '500', color: '#6D6D6D' }}>No se encontraron resultados...</h2>
          :
          data?.length > 0 ? data?.map(el => (
            <CardNewTaller key={el.nombre} taller={el} />
          ))
            : filteredItems?.map(el => (
              <CardNewTaller key={el.nombre} taller={el} />
            ))
        } */}
        {data?.length <= 0 && router.pathname !== '/'
          ? <h2 style={{ fontSize: '14px', fontWeight: '500', color: '#6D6D6D' }}>No se encontraron resultados...</h2>
          :
          data?.length > 0 && router.pathname !== '/' ?
            data?.map(el => (
              <CardNewTaller key={el.nombre} taller={el} />
            ))
            :
            data?.slice(0, 10).map(el => (
              <CardNewTaller key={el.nombre} taller={el} />
            ))
        }
      </section>
    </div>
  )
}