import dynamic from 'next/dynamic';
import Layout from '@/src/Components/Layout';
import { useState } from 'react';
import ModalFiltrosGasolineras from '@/src/Components/Gasolineras/ModalFiltros';
import { useRouter } from 'next/router';
import ModalPicoYPlaca from '@/src/Components/Gasolineras/ModalPicoYPlaca';
import { calcularDistancia, priceToCheck } from '@/utils/scripts';
import ModalGasolinera from '@/src/Components/Gasolineras/ModalGasolinera';
import Loader from '@/src/Components/Loaders/CardLoader';
import SelectCiudad from '@/src/Components/Gasolineras/SelectCiudad';
import SelectTipoCombustible from '@/src/Components/Gasolineras/SelectTipoCombustible';
import PriceFormat from '@/utils/priceFormat';
import { List, Map as MapIcon } from 'lucide-react';

const Map = dynamic(() => import('@/src/Components/Gasolineras/Map'), {
  ssr: false,
  loading: () => <Loader />,
});

export default function Gasolineras({ data }) {
  const router = useRouter();
  const [estacionCheck,          setEstacionCheck]          = useState(null);
  const [visibleModal,           setVisibleModal]           = useState(false);
  const [visibleModalFiltros,    setVisibleModalFiltros]    = useState(false);
  const [visibleModalPicoyPlaca, setVisibleModalPicoyPlaca] = useState(false);
  const [userLocation,           setUserLocation]           = useState([0, 0]);
  const [isLoading,              setIsLoading]              = useState(false);
  const [visibleListado,         setVisibleListado]         = useState(false);

  const filtros = router.query?.combustible?.split(',');

  data?.forEach(estacion => {
    estacion.distancia = calcularDistancia(userLocation[0], userLocation[1], estacion.lat, estacion.lng);
  });

  const filteredData      = data?.filter(el => el.price    !== null && el.ciudad === 'Bogotá D.C.').sort((a, b) => a.price    - b.price);
  const filteredDataExtra = data?.filter(el => el.priceDos !== null).sort((a, b) => a.priceDos - b.priceDos);
  const gasolineraEncontrada = data?.find(g => g.nombre === estacionCheck);

  const validPrices = data?.filter(g => {
    if (filtros?.includes('extra'))    return g.priceDos   !== null && typeof g.priceDos   === 'number';
    if (filtros?.includes('diesel'))   return g.priceCinco !== null && typeof g.priceCinco === 'number';
    return g.price !== null && typeof g.price === 'number';
  });

  const sortedData = [...(validPrices ?? [])].sort((a, b) => {
    if (filtros?.includes('extra'))  return a.priceDos   - b.priceDos;
    if (filtros?.includes('diesel')) return a.priceCinco - b.priceCinco;
    return a.price - b.price;
  });

  const totalPrice   = validPrices?.reduce((acc, g) => {
    if (filtros?.includes('extra'))  return acc + g.priceDos;
    if (filtros?.includes('diesel')) return acc + g.priceCinco;
    return acc + g.price;
  }, 0) ?? 0;
  const averagePrice = validPrices?.length > 0 ? totalPrice / validPrices.length : 0;
  const res          = data?.sort((a, b) => a.distancia - b.distancia);

  return (
    <Layout
      icon="/logoterpel.png"
      image="/logoterpel.png"
      title="Mapa de Gasolineras en Bogotá"
      visibleNavbar={false}
      description="Descubre y compara precios con más de 85 bombas de gasolina en Bogotá. Estaciones de gasolina cerca con ubicación y precios."
      keywords="Gasolineras, Estaciones de Servicio, gasolineras cerca, bombas de gasolina, gasolinera cerca de mi"
    >
      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <div className="border-b border-gray-100 bg-white relative" style={{ zIndex: 10 }}>
        <div className="max-w-[1200px] mx-auto px-6 pt-8 pb-0 max-sm:px-4">
          <p className="text-[11px] font-semibold uppercase tracking-[1px] text-[#407BFF] mb-2">
            Bogotá D.C.
          </p>
          <h1 className="text-[26px] sm:text-[30px] font-bold text-gray-950 tracking-tight leading-snug mb-1">
            Precio Gasolineras Terpel
          </h1>
          <p className="text-[14px] text-gray-400 mb-5">
            Precios en tiempo real de combustible en Bogotá.
          </p>

          {/* ── Controls bar ── */}
          <div className="flex items-end gap-6 pb-0 overflow-x-auto scrollbar-hide">
            <div className="flex items-end gap-5 shrink-0">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.5px] text-gray-400 mb-1.5">
                  Ciudad
                </label>
                <SelectCiudad setIsLoading={setIsLoading} />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.5px] text-gray-400 mb-1.5">
                  Combustible
                </label>
                <SelectTipoCombustible />
              </div>
            </div>

            {/* Avg price pill */}
            {averagePrice > 0 && (
              <div className="shrink-0 ml-auto pb-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.8px] text-gray-400 mb-0.5 text-right">
                  Precio promedio
                </p>
                <p className="text-[22px] font-bold text-gray-900 leading-none tracking-tight">
                  ${PriceFormat({ price: Math.round(averagePrice).toString() })}
                  <span className="text-[12px] font-normal text-gray-400 ml-1">COP/gal</span>
                </p>
              </div>
            )}

            {/* Toggle view */}
            <button
              onClick={() => setVisibleListado(!visibleListado)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-2 mb-1 text-[12px] font-medium rounded-lg border transition-colors ${
                visibleListado
                  ? 'border-[#407BFF] text-[#407BFF] bg-[#eef2ff]'
                  : 'border-gray-200 text-gray-500 bg-gray-50 hover:bg-white'
              }`}
            >
              {visibleListado
                ? <><MapIcon className="w-3.5 h-3.5" /> Ver mapa</>
                : <><List className="w-3.5 h-3.5" /> Ver lista</>
              }
            </button>
          </div>
        </div>
      </div>

      {/* ── MAP / LIST AREA ─────────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 py-5 max-sm:px-4">
        {isLoading ? (
          <div className="w-full h-[70vh] bg-gray-100 rounded-2xl animate-pulse" />
        ) : (
          <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200" style={{ height: '70vh' }}>

            {/* ── Sliding station list ── */}
            {visibleListado && (
              <div className="absolute top-3 left-3 bottom-3 w-[280px] bg-white rounded-xl border border-gray-200 shadow-sm z-[2] flex flex-col overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 shrink-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-gray-400">
                    {sortedData.length} estaciones
                  </p>
                </div>
                <ul className="flex-1 overflow-y-auto divide-y divide-gray-100 scrollbar-thin">
                  {sortedData.map((el, i) => {
                    const price = priceToCheck({ price: el, filtros });
                    return (
                      <li
                        key={i}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => { setEstacionCheck(el.nombre); setVisibleModal(true); }}
                      >
                        <p className="text-[13px] font-semibold text-gray-800 leading-tight mb-1 truncate">
                          {el.nombre}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-[12px] text-gray-400">{el.distancia}</span>
                          <span className="text-[13px] font-bold text-gray-900">
                            ${PriceFormat({ price: price?.toString() })}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* ── Legend ── */}
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 px-4 py-3 z-[2] shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.5px] text-gray-400 mb-2">Referencia</p>
              {[
                {
                  color: '#00A83E',
                  label: 'Precio más BAJO del promedio',
                  svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-3 h-3"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 268l144 144 144-144M256 392V100"/></svg>,
                },
                {
                  color: '#FFA500',
                  label: 'Precio promedio',
                  svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-3 h-3"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M128 256h256"/></svg>,
                },
                {
                  color: '#FF0000',
                  label: 'Precio más ALTO del promedio',
                  svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-3 h-3"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 244l144-144 144 144M256 120v292"/></svg>,
                },
              ].map(({ color, label, svg }) => (
                <div key={label} className="flex items-center gap-2 mb-1.5 last:mb-0">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white" style={{ backgroundColor: color }}>
                    {svg}
                  </div>
                  <span className="text-[12px] text-gray-500">{label}</span>
                </div>
              ))}
            </div>

            {/* ── Pico y Placa ── */}
            {/* <button
              onClick={() => setVisibleModalPicoyPlaca(true)}
              className="absolute bottom-3 left-3 z-[2] bg-amber-400 text-black text-[11px] font-bold uppercase tracking-[0.5px] px-3 py-2 rounded-lg border-2 border-black hover:bg-amber-300 transition-colors"
              style={{ display: visibleListado ? 'none' : 'block' }}
            >
              Pico y Placa
            </button> */}

            <Map
              data={data}
              estacionCheck={estacionCheck}
              setVisibleModal={setVisibleModal}
              setEstacionCheck={setEstacionCheck}
              filtros={filtros}
              averagePrice={averagePrice}
            />
          </div>
        )}
      </div>

      {/* ── SEO CONTENT ─────────────────────────────────────────────────── */}
      <div className="max-w-[800px] mx-auto px-6 py-12 max-sm:px-4 border-t border-gray-100">

        {[
          {
            title: 'Bombas de Gasolina',
            body: 'Encuentra fácilmente las bombas de gasolina más cercanas a ti. Nuestra plataforma te proporciona información detallada sobre las diferentes bombas de gasolina disponibles, sus ubicaciones exactas, horarios de atención y servicios adicionales que ofrecen.',
          },
          {
            title: 'Gasolineras en Bogotá',
            body: 'Explora nuestra extensa red de gasolineras en Bogotá y sus alrededores. Desde gasolina regular hasta combustibles premium, nuestras gasolineras están diseñadas para satisfacer las necesidades de cada conductor. Encuentra aquí información sobre las gasolineras disponibles, sus servicios y promociones actuales.',
          },
          {
            title: 'Gasolineras Terpel',
            body: 'Descubre las ventajas de abastecer tu vehículo en las gasolineras Terpel. Con una amplia cobertura en todo el país, las estaciones de servicio ofrecen combustibles de alta calidad y una experiencia de atención al cliente excepcional. Encuentra todas las gasolineras Terpel disponibles en tu área.',
          },
          {
            title: 'Estaciones de Servicio',
            body: 'Encuentra todas las estaciones de servicio disponibles en nuestra plataforma. Desde gasolineras convencionales hasta puntos de carga para vehículos eléctricos, te ofrecemos una amplia variedad de opciones para abastecer tu vehículo y disfrutar de una experiencia de conducción sin preocupaciones.',
          },
        ].map(({ title, body }, i, arr) => (
          <section key={title} className={`py-8 ${i < arr.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <h2 className="text-[17px] font-bold text-gray-900 mb-2 tracking-tight">{title}</h2>
            <p className="text-[14px] text-gray-500 leading-[1.75]">{body}</p>
          </section>
        ))}
      </div>

      {/* ── Modals ──────────────────────────────────────────────────────── */}
      {visibleModal && (
        <ModalGasolinera
          data={gasolineraEncontrada}
          setVisibleModal={setVisibleModal}
          precioAlto={filteredData[filteredData.length - 1]}
          precioAltoExtra={filteredDataExtra[filteredDataExtra.length - 1]}
        />
      )}
      {visibleModalFiltros && (
        <ModalFiltrosGasolineras
          setVisibleModalFiltros={setVisibleModalFiltros}
          setUserLocation={setUserLocation}
          userLocation={userLocation}
        />
      )}
      {visibleModalPicoyPlaca && (
        <ModalPicoYPlaca setVisibleModalPicoyPlaca={setVisibleModalPicoyPlaca} />
      )}
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const response = await fetch('https://www.terpel.com/api/map_points/eds');
    if (!response.ok) throw new Error('No se pudo obtener los datos de la API');
    const data = await response.json();
    const filteredData = data.filter(obj => obj.ciu === 'Bogotá D.C.');
    const dataFormat = filteredData.map(item => ({
      price:      item.price.find(e => e.id == 1)?.retailPrice ?? null,
      priceDos:   item.price.find(e => e.id == 2)?.retailPrice ?? null,
      priceTres:  item.price.find(e => e.id == 3)?.retailPrice ?? null,
      priceCuatro:item.price.find(e => e.id == 4)?.retailPrice ?? null,
      priceCinco: item.price.find(e => e.id == 5)?.retailPrice ?? null,
      direccion:  item.dir,
      ciudad:     item.ciu,
      lat:        item.lat,
      lng:        item.lon,
      nombre:     item.nom,
      img:        'logoterpel',
      empresa:    'Terpel',
    }));
    return { props: { data: dataFormat } };
  } catch {
    return { props: { data: null } };
  }
}