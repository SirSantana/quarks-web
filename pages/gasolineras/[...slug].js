import dynamic from 'next/dynamic'
import gasolineras from '@/pages/gasolineras.json'
import Image from 'next/image';
import Icon, { IconCatalog } from '@/src/Components/Icon/Icon';
import Layout from '@/src/Components/Layout';
import { useState } from 'react';
import PriceFormat from '@/utils/priceFormat';
import Button, { ButtonVariant } from '@/src/Components/Button/Button';
import { ModalGasolineraCard } from '@/src/Components/Gasolineras/ModalCardGasolinera';
import ModalFiltrosGasolineras from '@/src/Components/Gasolineras/ModalFiltros';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SelectCiudad from '@/src/Components/Gasolineras/SelectCiudad';

const Map = dynamic(() => import('@/src/Components/Gasolineras/Map'),
  { ssr: false, loading: () => <div style={{ height: '100vh', width: '100vw', backgroundColor: '#d9d9d9' }} /> })

const Star = ({ index, stars, tamaño, }) => {
  return (
    // <img src={stars < index + 1 ? `../../star-outline.svg` : `../../star.svg`} style={{ height: `${tamaño}px`, width: `${tamaño}px` }} />
    <Icon size='sm' name={IconCatalog.star} style={{ color: stars < index + 1 ? '#c5c5c5' : '#FBBC04', fontSize: '12px' }} />

  )
}
let estrellas = [0, 1, 2, 3, 4]
let tagsFix = ['Gasolineras', 'Estaciones de Servicio', 'gasolineras cerca', 'bombas de gasolina', 'gasolinera cerca de mi', 'estación de servicio más cercana', 'bombas de gasolina cerca', 'bombas de gasolina cerca de mi', 'bombas gasolina cerca', 'gasolinera terpel']

export default function Gasolineras({ data }) {
  const { query, } = useRouter()
  const [visibleData, setVisibleData] = useState(true)
  const [estacionCheck, setEstacionCheck] = useState(null)
  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleModalFiltros, setVisibleModalFiltros] = useState(false)
  const [filter, setFilter] = useState('marca')
  let filteredData = data?.filter(el => el.price !== null).sort((a, b) => a.price - b.price)
  let filteredDataExtra = data?.filter(el => el.priceDos !== null).sort((a, b) => a.priceDos - b.priceDos)

  const filtros = query?.combustible?.split(',');
  const gasolineraEncontrada = data?.find(gasolinera => gasolinera.nombre === estacionCheck);

  return (
    <Layout title={`Mapa de Gasolineras en ${query?.slug?.[0].length>0?query?.slug?.[0]:'Bogota'}`} visibleNavbar={false} description={'Descubre y compara precios con mas de 85 bombas de gasolina en Bogota. Colombia. Estaciones de gasolina cerca con ubicacion y precios.'} keywords={'Gasolineras, Estaciones de Servicio, gasolineras cerca, bombas de gasolina, gasolinera cerca de mi, estacion de gasolina cerca, estación de servicio más cercana, bombas de gasolina cerca'}>

      <div style={{ width: '100%', height: '100%', boxSizing: 'border-box', margin: '0', padding: '0', position: 'relative' }}>
        {data &&
          <Map data={data} estacionCheck={estacionCheck} setVisibleModal={setVisibleModal} setEstacionCheck={setEstacionCheck} filtros={filtros} />

        }
        <div style={{ zIndex: 1, position: 'absolute', top: 24, left: 24, display: 'flex', flexDirection: 'column', gap: '24px', }}>

          <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #d9d9d9', maxWidth: '390px', minWidth: '300px', width: '95%', }}>
            <h1>Gasolineras</h1>
            <h2 style={{ fontSize: '14px', fontWeight: '400' }}>Gasolineras cerca a mi en {query?.slug?.[0]}</h2>
            {/* <p onClick={() => setVisibleData(!visibleData)} style={{ fontSize: '14px', padding: '4px 8px', backgroundColor: '#f1f1f1', marginTop: '8px', cursor: 'pointer' }}>{visibleData ? 'Ocultar listado' : 'Mostrar listado'}</p> */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: '16px', gap: '16px' }}>

              <SelectCiudad />
              <Button onClick={() => setVisibleData(!visibleData)} variant={ButtonVariant.outlined} size='sm' style={{ margin: '0', alignSelf: 'flex-end', fontSize: '12px', padding: '4px 8px', borderRadius: '4px', marginTop: '8px', fontWeight: '600' }}>
                {visibleData ? 'Ocultar lista' : 'Mostrar lista'}
              </Button>
            </div>

          </div>
          {visibleData
            &&
            <div style={{ height: '500px', overflowY: 'auto', backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #d9d9d9', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', maxWidth: '390px', width: '95%', scrollbarWidth: 'thin', scrollbarColor: '#ccc transparent' }}>
              {/* <p  style={{alignSelf:'flex-end', fontSize: '12px', padding: '4px 8px', borderRadius:'4px', backgroundColor: '#373737', marginTop: '8px', cursor: 'pointer', color:'white', fontWeight:'600' }} ></p> */}
              <Button onClick={() => setVisibleModalFiltros(true)} variant={ButtonVariant.secondary} size='sm' style={{ margin: '0', fontSize: '14px', padding: '4px 8px', borderRadius: '4px', backgroundColor: '#373737', marginTop: '8px', color: 'white', fontWeight: '500' }} sizeIcon='sm' icon={IconCatalog.optionsOutline}>
                Filtrar
              </Button>
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', }}>
                {(filtros?.includes('corriente') || filtros === undefined) && filteredData?.map(el => (
                  <div key={el.nombre} onClick={() => { setEstacionCheck(el.nombre), setVisibleModal(true) }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', borderRadius: '8px', border: '1px solid #d9d9d9', width: '140px', justifyContent: 'space-between' }}>
                    <Image
                      width={48}
                      height={48}
                      src={`/${el.img}.png`}
                      alt={`Gasolinera ${el.empresa} ubicado en ${el.direccion}`}
                    />
                    <h4 style={{fontSize: '18px', fontWeight: '600', margin: '8px 0', textAlign:'center'}}>{el.ciudad}</h4>
                    <p style={{ fontSize: '12px', color: '#333333', margin: '4px 0 8px 0', textAlign: 'center' }}>{el.direccion}</p>
                    {/* <span style={{ padding: '4px 8px', backgroundColor: '#EAEAEA', borderRadius: '12px', fontSize: '12px', color: '#7C7C7C', fontWeight: '700' }}>{el.ciu}</span> */}
                    <span style={{ padding: '4px 8px', backgroundColor: '#D3FFD7', margin: '4px 0 0 0', borderRadius: '12px', fontSize: '14px', color: '#2D6600', fontWeight: '700' }}>${PriceFormat({ price: el?.price?.toString() })}</span>
                  </div>
                ))
                }
                {filtros?.includes('extra') && filteredDataExtra?.map(el => (
                  <div key={el.nombre} onClick={() => { setEstacionCheck(el.nombre), setVisibleModal(true) }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', borderRadius: '8px', border: '1px solid #d9d9d9', width: '140px', justifyContent: 'space-between' }}>
                    <Image
                      width={48}
                      height={48}
                      src={`/${el.img}.png`}
                      alt={`Gasolinera ${el.empresa} ubicado en ${el.direccion}`}
                    />
                    <h4 style={{ fontSize: '22px', fontWeight: '600', margin: '8px 0' }}>{el.empresa}</h4>
                    <p style={{ fontSize: '14px', color: '#333333', margin: '4px 0 8px 0' }}>{el.direccion}</p>
                    {/* <span style={{ padding: '4px 8px', backgroundColor: '#EAEAEA', borderRadius: '12px', fontSize: '12px', color: '#7C7C7C', fontWeight: '700' }}>{el.ciu}</span> */}
                    <span style={{ padding: '4px 8px', backgroundColor: '#D3FFD7', margin: '4px 0 0 0', borderRadius: '12px', fontSize: '14px', color: '#2D6600', fontWeight: '700' }}>${PriceFormat({ price: el?.priceDos?.toString() })}</span>
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
      <div style={{ width: '90%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '32px', margin: '64px auto', }}>
        <section>
          <h2>Bombas de Gasolina</h2>
          <p>Encuentra fácilmente las bombas de gasolina más cercanas a ti. Nuestra plataforma te proporciona información detallada sobre las diferentes bombas de gasolina disponibles, sus ubicaciones exactas, horarios de atención y servicios adicionales que ofrecen.</p>
        </section>

        <section>
          <h2>Gasolineras</h2>
          <p>Explora nuestra extensa red de gasolineras en Bogotá y sus alrededores. Desde gasolina regular hasta combustibles premium, nuestras gasolineras están diseñadas para satisfacer las necesidades de cada conductor. Encuentra aquí información sobre las gasolineras disponibles, sus servicios y promociones actuales.</p>
        </section>

        <section>
          <h2>Gasolineras Terpel</h2>
          <p>Descubre las ventajas de abastecer tu vehículo en las gasolineras Terpel. Con una amplia cobertura en todo el país, las estaciones de servicio ofrecen combustibles de alta calidad y una experiencia de atención al cliente excepcional. Encuentra aquí todas las gasolineras Terpel disponibles en tu área, junto con detalles sobre sus servicios y ubicaciones.</p>
        </section>

        <section>
          <h2>Estaciones de Servicio</h2>
          <p>Encuentra aquí todas las estaciones de servicio disponibles en nuestra plataforma. Desde gasolineras convencionales hasta puntos de carga para vehículos eléctricos, te ofrecen una amplia variedad de opciones para abastecer tu vehículo y disfrutar de una experiencia de conducción sin preocupaciones. Explora las estaciones de servicio y encuentra la más cercana a ti.</p>
        </section>
      </div>
      {visibleModal &&
        <ModalGasolineraCard data={gasolineraEncontrada} setVisibleModal={setVisibleModal} precioAlto={filteredData[filteredData.length - 1]} precioAltoExtra={filteredDataExtra[filteredDataExtra.length - 1]} />}
      {visibleModalFiltros && <ModalFiltrosGasolineras setVisibleModalFiltros={setVisibleModalFiltros} />}

    </Layout>

  )
}

export async function getServerSideProps({ query }) {
  console.log(query);

  try {
    const response = await fetch('https://www.terpel.com/api/map_points/eds');
    if (!response.ok) {
      throw new Error('No se pudo obtener los datos de la API');
    }
    const data = await response.json();
    const filteredData = data.filter(obj => obj?.ciu?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") == query?.slug[0]?.toLowerCase());
    let dataFormat = filteredData.map(item => ({
      price: item.price.find(ele => ele.id == 1)?.retailPrice ? item.price.find(ele => ele.id == 1)?.retailPrice : null,
      priceDos: item.price.find(ele => ele.id == 2)?.retailPrice ? item.price.find(ele => ele.id == 2)?.retailPrice : null,
      priceTres: item.price.find(ele => ele.id == 3)?.retailPrice ? item.price.find(ele => ele.id == 3)?.retailPrice : null,
      priceCuatro: item.price.find(ele => ele.id == 4)?.retailPrice ? item.price.find(ele => ele.id == 4)?.retailPrice : null,
      priceCinco: item.price.find(ele => ele.id == 5)?.retailPrice ? item.price.find(ele => ele.id == 5)?.retailPrice : null,
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
    console.error('Error al obtener los datos:', error);
    return {
      props: {
        data: null // Puedes devolver null u otro valor predeterminado en caso de error
      }
    };
  }
}