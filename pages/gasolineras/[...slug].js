import dynamic from 'next/dynamic'
import gasolineras from '@/pages/gasolineras.json'
import Image from 'next/image';
import Icon, { IconCatalog } from '@/src/Components/Icon/Icon';
import Layout from '@/src/Components/Layout';
import { useState } from 'react';
import PriceFormat from '@/utils/priceFormat';
import Button, { ButtonVariant } from '@/src/Components/Button/Button';
import ModalFiltrosGasolineras from '@/src/Components/Gasolineras/ModalFiltros';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SelectCiudad from '@/src/Components/Gasolineras/SelectCiudad';
import ModalPicoYPlaca from '@/src/Components/Gasolineras/ModalPicoYPlaca';
import { calcularDistancia, priceToCheck } from '@/utils/scripts';
import ModalGasolinera from '@/src/Components/Gasolineras/ModalGasolinera';
import Loader from '@/src/Components/Loaders/CardLoader';
import DrawerGasolineras from '@/src/Components/Gasolineras/DrawerGasolineras';
import SelectOrderBy from '@/src/Components/Gasolineras/SelectOrderBy';
import SelectTipoCombustible from '@/src/Components/Gasolineras/SelectTipoCombustible';

const Map = dynamic(() => import('@/src/Components/Gasolineras/Map'),
  { ssr: false, loading: () => <Loader /> })

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
  const [visibleData, setVisibleData] = useState(false)
  const [estacionCheck, setEstacionCheck] = useState(null)
  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleModalFiltros, setVisibleModalFiltros] = useState(false)
  const [filter, setFilter] = useState('marca')
  const [userLocation, setUserLocation] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleListado, setVisibleListado] = useState(false)
  let filteredData = data?.filter(el => el.price !== null).sort((a, b) => a.price - b.price)
  let filteredDataExtra = data?.filter(el => el.priceDos !== null).sort((a, b) => a.priceDos - b.priceDos)
  const [visibleModalPicoyPlaca, setVisibleModalPicoyPlaca] = useState(false)

  const filtros = query?.combustible?.split(',');
  const gasolineraEncontrada = data?.find(gasolinera => gasolinera.nombre === estacionCheck);

  const queryString2 = query?.ordernar || '';
  const cerca = queryString2.includes('cerca');


  data?.forEach(estacion => {
    estacion.distancia = calcularDistancia(userLocation[0], userLocation[1], estacion.lat, estacion.lng);
  });
  const validPrices = data?.filter(gasolinera => {
    if (filtros?.includes('extra')) {
      return gasolinera.priceDos !== null && typeof gasolinera.priceDos === 'number';
    }
    if (filtros?.includes('corriente')) {
      return gasolinera.price !== null && typeof gasolinera.price === 'number';
    }
    if (filtros?.includes('diesel')) {
      return gasolinera.priceCinco !== null && typeof gasolinera.priceCinco === 'number';
    }
    // Si no hay filtros, usar 'corriente' por defecto
    return gasolinera.price !== null && typeof gasolinera.price === 'number';
  });

  // Ordenar los datos filtrados por precio según el filtro seleccionado
  const sortedData = validPrices?.sort((a, b) => {
    if (filtros?.includes('extra')) {
      return a.priceDos - b.priceDos;
    }
    if (filtros?.includes('corriente')) {
      return a.price - b.price;
    }
    if (filtros?.includes('diesel')) {
      return a.priceCinco - b.priceCinco;
    }
    // Si no hay filtros, usar 'corriente' por defecto
    return a.price - b.price;
  });

  // Sumar todos los precios válidos según el filtro seleccionado
  const totalPrice = validPrices?.reduce((accumulator, gasolinera) => {
    if (filtros?.includes('extra')) {
      return accumulator + gasolinera.priceDos;
    }
    if (filtros?.includes('corriente')) {
      return accumulator + gasolinera.price;
    }
    if (filtros?.includes('diesel')) {
      return accumulator + gasolinera.priceCinco;
    }
    // Si no hay filtros, usar 'corriente' por defecto
    return accumulator + gasolinera.price;
  }, 0);

  // Calcular el precio promedio
  const averagePrice = validPrices?.length > 0 ? totalPrice / validPrices.length : 0;

  return (
    <Layout title={`Mapa de Gasolineras en ${query?.slug?.[0].length > 0 ? query?.slug?.[0] : 'Bogota'}`} visibleNavbar={false} description={'Descubre y compara precios con mas de 85 bombas de gasolina en Bogota. Colombia. Estaciones de gasolina cerca con ubicacion y precios.'} keywords={'Gasolineras, Estaciones de Servicio, gasolineras cerca, bombas de gasolina, gasolinera cerca de mi, estacion de gasolina cerca, estación de servicio más cercana, bombas de gasolina cerca'}>
      <section style={{
        backgroundColor: 'white', // Fondo blanco
        margin: '0px auto 0 auto',
        padding: '24px 0 8px 0',
        width: '90%',
        maxWidth: '1200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <h1 style={{ color: '#182537' }}>Precio Gasolineras Terpel en {query?.slug?.[0].length > 0 ? query?.slug?.[0] : 'Bogota'}</h1>
      </section>
      <div style={{
        position: 'sticky',
        top: '0',  // Mantiene el div en la parte superior mientras se hace scroll
        backgroundColor: 'white',  // Asegura que el fondo sea blanco mientras se desplaza
        zIndex: 3,  // Asegura que el div se mantenga por encima de otros elementos
        display: 'flex',
        flexDirection: 'row',
        gap: '24px',
        margin: '0px auto 0 auto',
        alignItems: 'center',
        width: '90%',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        overflowX: 'auto',
        height: 'fit-content',
        padding: '16px 0'  // Añadir un poco de padding para mantener el diseño consistente
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', color: '#6C788E', fontWeight: '500' }}>Ciudad</label>
            <SelectCiudad setIsLoading={setIsLoading} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', color: '#6C788E', fontWeight: '500' }}>Tipo de Combustible</label>
            <SelectTipoCombustible />
          </div>
        </div>
        <button onClick={() => setVisibleListado(!visibleListado)} style={{
          cursor: 'pointer', border: '1px solid #6C788E', padding: '8px 12px', borderRadius: '4px', fontSize: '12px', color: '#6C788E', backgroundColor: 'white', fontWeight: '500', marginTop: '16px', whiteSpace: 'nowrap', // Asegura que el texto no se rompa en varias líneas
          display: 'inline-block'
        }}>
          {visibleListado ? 'Ver Mapa' : 'Ver Lista'}
        </button>
        {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', color: '#6C788E', fontWeight: '500' }}>Orden por</label>
          <SelectOrderBy />
        </div> */}
      </div>
      {isLoading ?
        <div style={{
          width: '90%',
          maxWidth: '1200px',
          border: '1px solid #CFD5E1',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          backgroundColor: "#f3f3f3",
          margin: '32px auto',
          position: 'relative',
          height: '70vh'
        }} />
        :
        <div style={{
          width: '90%',
          maxWidth: '1200px',
          border: '1px solid #CFD5E1',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          margin: '32px auto',
          position: 'relative',
        }}>
          {visibleListado && <div style={{ border: '1px solid #CFD5E1', boxShadow: '', position: 'absolute', height: '90%', top: '16px', left: '16px', bottom: '16px', backgroundColor: 'white', width: '300px', padding: '16px 0px 16px 16px', borderRadius: '8px', zIndex: 2 }}>
            <ul
              style={{ listStyleType: 'none', transition: 'overflow 1s ease-in-out', padding: 0, paddingRight: '16px', scrollbarWidth: 'thin', overflowY: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', gap: '32px' }}
              onMouseEnter={(e) => { e.currentTarget.style.overflowY = 'auto', e.currentTarget.style.padding = '0 4.8px 0 0' }} // Muestra el scroll al hacer hover
              onMouseLeave={(e) => { e.currentTarget.style.overflowY = 'hidden', e.currentTarget.style.padding = '0 16px 0 0' }}
            >
              {data.map(el => {
                let price = priceToCheck({ price: el, filtros });
                return (
                  <li style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between', gap: '8px' }}>
                    <p style={{ fontSize: '14px', color: '#182537', fontWeight: '500' }}>{el.nombre}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                      <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '14px', color: '#6C788E' }}>Precio:</p><p style={{ fontSize: '14px', color: '#6C788E', fontWeight: '500' }}>${PriceFormat({ price: price?.toString() })}</p>
                      </div>
                      {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '14px', color: '#6C788E' }}>Distancia:</p><p style={{ fontSize: '14px', color: '#6C788E', fontWeight: '500' }}>{el?.distancia}</p>
                    </div> */}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>}
          <div style={{ position: 'absolute', bottom: '0px', right: '0px', backgroundColor: 'white', padding: '16px', borderRadius: '4px', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', padding: '3px', borderRadius: '50%', border: '1px solid white', color: 'white', backgroundColor: '#FF0000', }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 244l144-144 144 144M256 120v292" /></svg>
              </div>
              <p style={{ fontSize: '14px', color: '#6C788E', fontWeight: '500' }}>Precio mas ALTO del promedio</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', padding: '3px', borderRadius: '50%', border: '1px solid white', color: 'white', backgroundColor: '#FFA500', }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M128 256h256" /></svg>
              </div>
              <p style={{ fontSize: '14px', color: '#6C788E', fontWeight: '500' }}>Precio promedio</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', padding: '3px', borderRadius: '50%', border: '1px solid white', color: 'white', backgroundColor: '#00A83E', }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 268l144 144 144-144M256 392V100" /></svg>
              </div>
              <p style={{ fontSize: '14px', color: '#6C788E', fontWeight: '500' }}>Precio mas BAJO del promedio</p>
            </div>

          </div>
          <Map data={data} estacionCheck={estacionCheck} setVisibleModal={setVisibleModal} setEstacionCheck={setEstacionCheck} filtros={filtros} averagePrice={averagePrice} />
        </div>
      }
      <div style={{ width: '90%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '32px', margin: '64px auto', }}>
        <section>
          <h2>Bombas de Gasolina {query?.slug?.[0]}</h2>
          <p>Encuentra fácilmente las bombas de gasolina más cercanas a ti. Nuestra plataforma te proporciona información detallada sobre las diferentes bombas de gasolina disponibles, sus ubicaciones exactas, horarios de atención y servicios adicionales que ofrecen.</p>
        </section>

        <section>
          <h2>Gasolineras </h2>
          <p>Explora nuestra extensa red de gasolineras cerca en {query?.slug?.[0]} y sus alrededores. Desde gasolina regular hasta combustibles premium, nuestras gasolineras están diseñadas para satisfacer las necesidades de cada conductor. Encuentra aquí información sobre las gasolineras disponibles, sus servicios y promociones actuales.</p>
        </section>

        <section>
          <h2>Gasolineras cerca</h2>
          <p>Descubre las ventajas de abastecer tu vehículo en las gasolineras Terpel. Con una amplia cobertura en todo el país, las estaciones de servicio ofrecen combustibles de alta calidad y una experiencia de atención al cliente excepcional. Encuentra aquí todas las gasolineras Terpel disponibles en tu área, junto con detalles sobre sus servicios y ubicaciones.</p>
        </section>

        <section>
          <h2>Estaciones de Servicio {query?.slug?.[0]}</h2>
          <p>Encuentra aquí todas las estaciones de servicio disponibles en nuestra plataforma. Desde gasolineras convencionales hasta puntos de carga para vehículos eléctricos, te ofrecen una amplia variedad de opciones para abastecer tu vehículo y disfrutar de una experiencia de conducción sin preocupaciones. Explora las estaciones de servicio y encuentra la más cercana a ti. Gasolinera cerca de mi.</p>
        </section>
      </div>
      {visibleModal &&
        <ModalGasolinera data={gasolineraEncontrada} setVisibleModal={setVisibleModal} precioAlto={filteredData[filteredData.length - 1]} precioAltoExtra={filteredDataExtra[filteredDataExtra.length - 1]} />}
      {visibleModalFiltros && <ModalFiltrosGasolineras setVisibleModalFiltros={setVisibleModalFiltros} setUserLocation={setUserLocation} userLocation={userLocation} />}
      {visibleModalPicoyPlaca && <ModalPicoYPlaca setVisibleModalPicoyPlaca={setVisibleModalPicoyPlaca} />}

    </Layout>

  )
}

export async function getServerSideProps({ query }) {
  try {
    const response = await fetch('https://www.terpel.com/api/map_points/eds');
    if (!response.ok) {
      throw new Error('No se pudo obtener los datos de la API');
    }
    const data = await response.json();
    const filteredData = data.filter(obj => obj?.ciu?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") == query?.slug[0]?.toLowerCase() || obj?.dep?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") == query?.slug[0]?.toLowerCase());
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