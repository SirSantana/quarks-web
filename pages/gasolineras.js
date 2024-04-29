import dynamic from 'next/dynamic'
import gasolineras from '@/pages/gasolineras.json'
import Image from 'next/image';
import Icon, { IconCatalog } from '@/src/Components/Icon/Icon';
import Layout from '@/src/Components/Layout';
import { useState } from 'react';
import { ModalGasolineraCard } from '@/utils/Modales';
import PriceFormat from '@/utils/priceFormat';
import Button, { ButtonVariant } from '@/src/Components/Button/Button';

const Map = dynamic(() => import('@/src/Components/Gasolineras/Map'),
  { ssr: false })

const Star = ({ index, stars, tamaño, }) => {
  return (
    // <img src={stars < index + 1 ? `../../star-outline.svg` : `../../star.svg`} style={{ height: `${tamaño}px`, width: `${tamaño}px` }} />
    <Icon size='sm' name={IconCatalog.star} style={{ color: stars < index + 1 ? '#c5c5c5' : '#FBBC04', fontSize: '12px' }} />

  )
}
let estrellas = [0, 1, 2, 3, 4]
let tagsFix = ['Gasolineras', 'Estaciones de Servicio', 'gasolineras cerca', 'bombas de gasolina', 'gasolinera cerca de mi', 'estación de servicio más cercana', 'bombas de gasolina cerca', 'bombas de gasolina cerca de mi', 'bombas gasolina cerca', 'gasolinera terpel']

export default function Gasolineras({ data }) {
  const [visibleData, setVisibleData] = useState(true)
  const [estacionCheck, setEstacionCheck] = useState(null)
  const [visibleModal, setVisibleModal] = useState(false)
  const [filter, setFilter] = useState('marca')
  let filteredData = data.filter(el => el.price !== null).sort((a, b) => a.price - b.price)

  const gasolineraEncontrada = data.find(gasolinera => gasolinera.nombre === estacionCheck);

  return (
    <Layout title={'Mapa de Gasolineras en Bogota'} visibleNavbar={false} description={'Descubre y compara precios con mas de 85 bombas de gasolina en Bogota. Colombia. Estaciones de gasolina cerca con ubicacion y precios.'} keywords={'Gasolineras, Estaciones de Servicio, gasolineras cerca, bombas de gasolina, gasolinera cerca de mi, estacion de gasolina cerca, estación de servicio más cercana, bombas de gasolina cerca'}>

      <div style={{ width: '100%', height: '100%', boxSizing: 'border-box', margin: '0', padding: '0', position: 'relative' }}>
        <Map data={data} estacionCheck={estacionCheck} setVisibleModal={setVisibleModal} setEstacionCheck={setEstacionCheck} />
        <div style={{ zIndex:2, position: 'absolute', top: 24, left: 24, display: 'flex', flexDirection: 'column', gap: '24px', height: '100vh', }}>

          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #d9d9d9' }}>
            <h1>Gasolineras</h1>
            <h2 style={{ fontSize: '16px', fontWeight: '400' }}>Gasolineras cerca a mi en Bogotá</h2>
            {/* <p onClick={() => setVisibleData(!visibleData)} style={{ fontSize: '14px', padding: '4px 8px', backgroundColor: '#f1f1f1', marginTop: '8px', cursor: 'pointer' }}>{visibleData ? 'Ocultar listado' : 'Mostrar listado'}</p> */}
            <Button onClick={() => setVisibleData(!visibleData)}  variant={ButtonVariant.outlined} size='sm' style={{margin:'0', alignSelf: 'flex-end', fontSize: '12px', padding: '4px 8px', borderRadius: '4px',  marginTop: '8px', fontWeight: '600' }}>
                {visibleData ? 'Ocultar lista' : 'Mostrar lista'}
              </Button>
          </div>
          {visibleData
            &&
            <div style={{ height: '500px', overflowY: 'auto', backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #d9d9d9', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', width: '390px', scrollbarWidth: 'thin', scrollbarColor: '#ccc transparent' }}>
              {/* <p  style={{alignSelf:'flex-end', fontSize: '12px', padding: '4px 8px', borderRadius:'4px', backgroundColor: '#373737', marginTop: '8px', cursor: 'pointer', color:'white', fontWeight:'600' }} ></p> */}
              <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%', gap:'16px', alignItems:'center'}}>
              <Button variant={ButtonVariant.secondary} size='sm' style={{margin:'0', alignSelf: 'flex-end', fontSize: '12px', padding: '4px 8px', borderRadius: '4px', backgroundColor: '#373737', marginTop: '8px', color: 'white', fontWeight: '600' }}>
                De menor a mayor precio
              </Button>
              
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', }}>
                {filteredData?.map(el => (
                  <div onClick={() => { setEstacionCheck(el.nombre), setVisibleModal(true) }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', borderRadius: '8px', border: '1px solid #d9d9d9', width: '160px', justifyContent: 'space-between' }}>
                    <Image
                      width={48}
                      height={48}
                      src={`/${el.img}.png`}
                      alt={`Gasolinera ${el.empresa} ubicado en ${el.direccion}`}
                    />
                    <h4 style={{ fontSize: '22px', fontWeight: '600', margin: '8px 0' }}>{el.empresa}</h4>
                    <p style={{ fontSize: '14px', color: '#333333', margin: '4px 0 8px 0' }}>{el.direccion}</p>
                    {/* <span style={{ padding: '4px 8px', backgroundColor: '#EAEAEA', borderRadius: '12px', fontSize: '12px', color: '#7C7C7C', fontWeight: '700' }}>{el.ciu}</span> */}
                    <span style={{ padding: '4px 8px', backgroundColor: '#D3FFD7', margin: '4px 0 0 0', borderRadius: '12px', fontSize: '14px', color: '#2D6600', fontWeight: '700' }}>${PriceFormat({ price: el?.price?.toString() })}</span>
                    {/* <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <p style={{ fontSize: '12px', fontWeight: '600' }}>{el?.calificacion?.puntuacion} <span style={{ fontWeight: '400' }}>({el.calificacion.numero_resenas} votos)</span></p>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', }}>
                    {estrellas.map((index) =>
                    (
                      <Star index={index} stars={Math.round(el?.calificacion?.puntuacion)} tamaño={'16'} />
                    ))
                    }
                  </div>
                </div>
              </div> */}
                  </div>
                ))
                }
                <section style={{ display: 'flex', margin: '0 auto', marginBottom: '64px', maxWidth: '900px', gap: '8px', width: '90%', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center' }}>
                  {tagsFix.map(tag => (
                    <h3 key={tag} style={{ fontSize: '14px', fontWeight: '500', padding: '4px 12px', border: '1px solid #c5c5c5', borderRadius: '16px', backgroundColor: 'white' }}>{tag}</h3>
                  ))}
                </section>
              </div>
            </div>

          }

        </div>

      </div>

      {visibleModal &&
        <ModalGasolineraCard data={gasolineraEncontrada} setVisibleModal={setVisibleModal} precioAlto={filteredData[filteredData.length - 1]} />}
    </Layout>

  )
}

export async function getServerSideProps({ query }) {
  // const response = await fetch('https://www.terpel.com/api/map_points/eds');
  // console.log(response);
  // return {
  //   props: {
  //     data:
  //       gasolineras.gasolineras
  //   }

  // }
  try {
    // Realizar la solicitud a la URL de la API
    const response = await fetch('https://www.terpel.com/api/map_points/eds');
    // const responseShell = await fetch('https://shellretaillocator.geoapp.me/api/v2/locations/nearest_to?lat=4.710989&lng=-74.072092&limit=50&locale=es_CO');



    // Verificar si la solicitud fue exitosa (código de estado 200)
    if (!response.ok) {
      throw new Error('No se pudo obtener los datos de la API');
    }

    // Convertir la respuesta a formato JSON
    const data = await response.json();
    // const dataShell = await responseShell.json()


    const filteredData = data.filter(obj => obj.ciu === 'Bogotá D.C.');
    // const dataShell2 = dataShell?.locations?.filter(obj => obj.city === 'BOGOTA D.C.');


    let dataFormat = filteredData.map(item => ({
      price: item.price.find(ele => ele.id == 1)?.retailPrice ? item.price.find(ele => ele.id == 1)?.retailPrice : null,
      direccion: item.dir,
      ciudad: item.ciu,
      lat: item?.lat,
      lng: item.lon,
      nombre: item?.nom,
      img: 'logoterpel',
      empresa: 'Terpel' // Puedes establecer un valor predeterminado o eliminar esta propiedad si no la necesitas
    }));

    // let dataFormat2 = dataShell2.map(item => ({
    //   price: null,
    //   direccion: item.address,
    //   ciudad: 'Bogotá D.C.',
    //   lat: item?.lat,
    //   lng: item.lng,
    //   img: 'logoshell',
    //   nombre: item?.name,
    //   empresa: 'Shell' // Puedes establecer un valor predeterminado o eliminar esta propiedad si no la necesitas
    // }));

    // Devolver los datos obtenidos como props
    return {
      props: {
        data: dataFormat
      }
    };
  } catch (error) {
    // Manejar errores si la solicitud falla
    console.error('Error al obtener los datos:', error);
    return {
      props: {
        data: null // Puedes devolver null u otro valor predeterminado en caso de error
      }
    };
  }
}