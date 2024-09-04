import dynamic from 'next/dynamic'
import Layout from '@/src/Components/Layout';
import { useState } from 'react';
import ModalFiltrosGasolineras from '@/src/Components/Gasolineras/ModalFiltros';
import { useRouter } from 'next/router';
import ModalPicoYPlaca from '@/src/Components/Gasolineras/ModalPicoYPlaca';
import { calcularDistancia } from '@/utils/scripts';
import ModalGasolinera from '@/src/Components/Gasolineras/ModalGasolinera';
import Loader from '@/src/Components/Loaders/CardLoader';
import Sidebar from '@/src/Components/Sidebar/Sidebar';
import DrawerGasolineras from '@/src/Components/Gasolineras/DrawerGasolineras';
import HeaderNavTags from '@/src/Components/Gasolineras/HeaderNavTags';
import BuscadorBasico from '@/src/Components/LandingPage/BuscadorBasico';
import SelectCiudad from '@/src/Components/Gasolineras/SelectCiudad';
import SelectTipoCombustible from '@/src/Components/Gasolineras/SelectTipoCombustible';
import SelectOrderBy from '@/src/Components/Gasolineras/SelectOrderBy';

const Map = dynamic(() => import('@/src/Components/Gasolineras/Map'),
  { ssr: false, loading: () => <Loader /> })

export default function Gasolineras({ data }) {
  const router = useRouter()
  const [estacionCheck, setEstacionCheck] = useState(null)
  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleModalFiltros, setVisibleModalFiltros] = useState(false)
  const [visibleModalPicoyPlaca, setVisibleModalPicoyPlaca] = useState(false)

  const [userLocation, setUserLocation] = useState([0, 0]);
  let filteredData = data?.filter(el => el.price !== null && el.ciudad === 'Bogotá D.C.').sort((a, b) => a.price - b.price)
  let filteredDataExtra = data?.filter(el => el.priceDos !== null).sort((a, b) => a.priceDos - b.priceDos)

  const filtros = router.query?.combustible?.split(',');
  const gasolineraEncontrada = data?.find(gasolinera => gasolinera.nombre === estacionCheck);


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


  let res = data?.sort((a, b) => a.distancia - b.distancia);
  // setEstacionesOrdenadasCerca(res)

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Layout icon={'/logoterpel.png'} image={'/logoterpel.png'} title={'Mapa de Gasolineras en Bogota'} visibleNavbar={false} description={'Descubre y compara precios con mas de 85 bombas de gasolina en Bogota. Colombia. Estaciones de gasolina cerca con ubicacion y precios.'} keywords={'Gasolineras, Estaciones de Servicio, gasolineras cerca, bombas de gasolina, gasolinera cerca de mi, estacion de gasolina cerca, estación de servicio más cercana, bombas de gasolina cerca'}>

      {/* {!data
        ?
        <div style={{ height: '100vh', width: '100vw', backgroundColor: '#d9d9d9', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: '24px', textAlign: 'center' }}>Estamos teniendo algunos problemas. Regresa pronto</p>
        </div>
        :
        <div style={{ width: '100%', height: '100%', boxSizing: 'border-box', margin: '0', padding: '0', position: 'relative' }}>
          <Map data={data} estacionCheck={estacionCheck} setVisibleModal={setVisibleModal} setEstacionCheck={setEstacionCheck} filtros={filtros} averagePrice={averagePrice} />
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={toggleSidebar}
            header={<h2 style={{ fontSize: '18px', marginRight: '24px', fontWeight: '500' }}>Quarks</h2>}
            body={<p>This is the body content of the sidebar.</p>}
            footer={<button onClick={toggleSidebar}>Close Sidebar</button>}
          />
          <div style={{ zIndex: 2, position: 'absolute', top: '3%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'row', gap: '24px', width: '100%', transition: 'height 0.3s ease' }}>
            <BuscadorBasico size='small' />
          </div>
          <HeaderNavTags />
          <DrawerGasolineras setVisibleModalFiltros={setVisibleModalFiltros} filtros={filtros} filteredData={filteredData} setVisibleModal={setVisibleModal} res={res} setEstacionCheck={setEstacionCheck} filteredDataExtra={filteredDataExtra} />
          <div onClick={() => setVisibleModalPicoyPlaca(true)} style={{ cursor: 'pointer', backgroundColor: '#FFC003', padding: '2px', borderRadius: '8px', margin: '16px auto 0px auto', position: 'absolute', bottom: '40px', right: '16px', zIndex: 1 }}>
            <div style={{ backgroundColor: 'transparent', border: '2px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
              <p style={{ color: 'black', fontSize: '16px', fontFamily: 'Impact', fontWeight: '100' }}>Pico y Placa</p>
            </div>
          </div>
        </div>} */}

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
        <h1 style={{ color: '#182537' }}>Precio Gasolineras Terpel en Bogotá</h1>
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
        maxWidth: '1200px',
        overflowX: 'auto',
        height: 'fit-content',
        padding: '16px 0'  // Añadir un poco de padding para mantener el diseño consistente
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', color: '#6C788E', fontWeight: '500' }}>Ciudad</label>
          <SelectCiudad />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', color: '#6C788E', fontWeight: '500' }}>Tipo de Combustible</label>
          <SelectTipoCombustible />
        </div>
        {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', color: '#6C788E', fontWeight: '500' }}>Orden por</label>
          <SelectOrderBy />
        </div> */}
      </div>
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
          {/* <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width:'100%', maxWidth:'340px', marginTop:'16px' }}>
            <p style={{ fontSize: '12px', color: '#6C788E', fontWeight: '400', lineHeight: '18px' }}><strong>¡Atención!</strong> <br />Algunos precios en el mapa pueden estar desactualizados. Si conoces el precio correcto, por favor, actualízalo para ayudar a la comunidad.</p>
          </div> */}
        </div>


        <Map data={data} estacionCheck={estacionCheck} setVisibleModal={setVisibleModal} setEstacionCheck={setEstacionCheck} filtros={filtros} averagePrice={averagePrice} />
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
    const filteredData = data.filter(obj => obj.ciu === 'Bogotá D.C.');
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
    return {
      props: {
        data: null // Puedes devolver null u otro valor predeterminado en caso de error
      }
    };
  }
}