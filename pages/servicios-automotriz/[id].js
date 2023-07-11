import Layout from "@/src/Components/Layout";
import { useRouter } from "next/router";
import styles from '@/styles/ServiciosAutomotriz.module.css'
import Select from 'react-select';
import Link from "next/link";
import talleres from './talleres.json'
import { useEffect, useState } from "react";
import { options, options2 } from "@/src/Components/Main/Main";
import CardNegocioPrev from "@/src/Components/Index/CardNegocioPrev";

// const options2 = [
//   { value: 'Recomendado', label: 'Recomendado' },
//   { value: 'Mas votado', label: 'Mas votado' },
//   { value: 'Mas visitado', label: 'Mas visitado' }
// ];
const customStyles = {
  control: (provided,) => ({
    ...provided,
    border: 'none',
    boxShadow: 'none',
    fontSize: '14px',
    fontWeight: '700',
    width: '140px'
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

export default function ServicioAutomotriz({ data }) {
  const router = useRouter()
  const parts = router?.query?.id?.split("-");
  
  const handleChange = (e) => {
    router.push(`/servicios-automotriz/${e.value}-${parts[1]}`)
  }
  const handleChange2 = (e) => {
    router.push(`/servicios-automotriz/${parts[0]}-${e.value}`)
  }

  const servicioFiltrado = options.find(el => el.value === parts?.[0])
  const servicioFiltrado2 = options2.find(el => el.value === parts?.[1])

  return (
    <Layout title={`Los mejores ${parts?.[0]} en ${parts?.[1]}`}>
      <div className={styles.container2}>

        <div className={styles.section1}>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#6D6D6D' }}>{parts?.[0]}{" > "} {parts?.[1]}</p>
          <div className={styles.containerHeaderText}>
            <h1 className={styles.titleHeader}>Los mejores talleres de carros para {parts?.[0]} en {parts?.[1]}</h1>
            <div className={styles.containerFiltersBasic}>
              {/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <p className={styles.subtitleHeader}>Ordenar:</p>
                <Select options={options2} isSearchable={false} styles={customStyles} defaultValue={options2[0]} />
              </div> */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <p className={styles.subtitleHeader}>Filtrar:</p>
                <Select onChange={handleChange} options={options} isSearchable={false} styles={customStyles} defaultValue={options[servicioFiltrado.index]} />
                <Select onChange={handleChange2} options={options2} isSearchable={false} styles={customStyles} defaultValue={options2[servicioFiltrado2.index]} />

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
            // : <h2 style={{ fontSize: '14px', fontWeight: '500', color: '#6D6D6D' }}>No se encontraron talleres de carros para {parts?.[0]} en {parts?.[1]} </h2>
            : <h2 style={{ fontSize: '14px', fontWeight: '500', color: '#6D6D6D' }}>Proximamente...</h2>

          }
        </div>
        {/* <div className={styles.section2}>
          <h2>Mapa</h2>
        </div> */}

      </div>

    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const parts = query?.id?.split("-");
  let categoria = parts[0];
  let localidad = parts[1].split(".")[0]
  let resultados = talleres?.talleres.filter((taller) => {
    const coincideCategoria = taller?.categorias.includes(categoria);
    return coincideCategoria;
  });
  if (localidad && localidad !== 'Bogota, Colombia') {
    resultados = resultados.filter((taller) => {
      const coincideLocalidad = taller?.localidad?.toLowerCase().includes(localidad.toLowerCase());
      return coincideLocalidad;
    });
  }

  return {
    props: {
      data: resultados
    },
  };
}