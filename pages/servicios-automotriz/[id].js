import Layout from "@/src/Components/Layout";
import { useRouter } from "next/router";
import styles from '@/styles/ServiciosAutomotriz.module.css'
import Select from 'react-select';
import Link from "next/link";
import talleres from './talleres.json'
import { useEffect, useState } from "react";
import { options, options2 } from "@/src/Components/Main/Main";
import CardNegocioPrev from "@/src/Components/Index/CardNegocioPrev";
import { client } from "@/client";
import { CREATE_IMPRESION_ALMACEN } from "@/graphql/mutations";
import SliderTiposTalleres from "@/src/Components/LandingPage/SliderTiposTalleres";
import SectonFilters from "@/src/Components/LandingPage/SectionFilters";


export default function ServicioAutomotriz({ data }) {
  const router = useRouter()
  const parts = router?.query?.id?.split("-");
  return (
    <Layout title={`Los mejores talleres mecanicos de ${parts?.[0]} cerca a mi en ${parts?.[1]}`} description={`Talleres de carros para ${parts?.[0]} en ${parts?.[1]}, encuentra el taller ideal para tu carro, conoce horarios, calificaciones, contacto y mas informacion util para ti y tu vehiculo.`} image={'https://azurequarks.blob.core.windows.net/negocios/bannertalleresquarks.png'} url={router?.asPath} keywords={`Talleres de carros en bogota,  ${options.map(el => " taller de " + el.value + " en " + parts?.[1])}`} visibleSlider={true}>
        <div  style={{marginTop:'8%'}}>
        <SectonFilters data={data}/>
        </div>


      
      {/* <div className={styles.container2}>

        <div className={styles.section1}>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#6D6D6D' }}>{parts?.[0]}{" > "} {parts?.[1]}</p>
          <div className={styles.containerHeaderText}>
            <h1 className={styles.titleHeader}>Los mejores talleres mecanicos de {parts?.[0]} cerca a mi en {parts?.[1]}</h1>
            <div className={styles.containerFiltersBasic}>
             
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <p className={styles.subtitleHeader}>Filtrar:</p>
                <Select onChange={handleChange} options={options} isSearchable={false} styles={customStyles} defaultValue={options[servicioFiltrado?.index]} />
                <Select onChange={handleChange2} options={options2} isSearchable={false} styles={customStyles} defaultValue={options2[servicioFiltrado2?.index]} />

              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: '1px', marginTop: '24px', backgroundColor: '#d9d9d9' }} />



          {data?.length > 0 ?
            <>
              <h2 style={{ fontSize: '14px', fontWeight: '500', color: '#6D6D6D', marginTop: '16px' }}>Se encontraron {data?.length} talleres</h2>
              {data.map(
                el => {
                  const horariosSeparados = el?.horario.split(',');
                  return (
                    <>
                      <CardNegocioPrev el={el} horariosSeparados={horariosSeparados} />
                    </>
                  )
                })}
            </>
            : <h2 style={{ fontSize: '14px', fontWeight: '500', color: '#6D6D6D' }}>Proximamente...</h2>

          }
        </div>

      </div> */}

    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const parts = query?.id?.split("-");
  let categoria = parts[0];
  let localidad = parts[1]?.split(".")[0]
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

  const filterData = (text) => {
    const categoriaNormalized = normalizeString(categoria.toLowerCase())
    // Realizamos el filtrado por nombre y categorías
    const filteredItems = talleres.talleres.filter(item =>
      item.nombre.toLowerCase().includes(categoriaNormalized.toLowerCase()) ||
      item.categorias.some(categoriaa => 
        categoriaa.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(categoriaNormalized.toLowerCase())) ||
      levenshteinDistance(item.nombre.toLowerCase(), categoriaNormalized.toLowerCase()) < 10 // Valor umbral de similitud
    );
    return filteredItems
  };
  function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  let resultados = filterData()

  if (localidad && localidad !== 'Bogota, Colombia') {
    resultados = resultados.filter((taller) => {
      const coincideLocalidad = taller?.localidad?.toLowerCase().includes(localidad.toLowerCase());
      return coincideLocalidad;
    });
  }
  resultados.map(el => {
    const result = client.mutate(
      {
        mutation: CREATE_IMPRESION_ALMACEN,
        variables: { id: el?.id }
      }
    )
  }
  )
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const resultados2 = shuffleArray(resultados);
  return {
    props: {
      data: resultados2
    },
  };
}