


import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Icon, { IconCatalog } from '../Icon/Icon'
import Button, { ButtonVariant } from '../Button/Button'
import { getLocalizacion } from '@/utils/scripts'

let combustibles = {
  corriente: true,
  extra: false,
  cercanas: false
}

export default function ModalFiltrosGasolineras({ setVisibleModalFiltros, setUserLocation, userLocation }) {
  const router = useRouter()
  const queryString = router?.query?.combustible || '';
  const queryString2 = router?.query?.ordernar || '';

  const corriente = queryString.includes('corriente');
  const extra = queryString.includes('extra');
  const precio = queryString2.includes('precio');
  const cerca = queryString2.includes('cerca');

  console.log(queryString2);
  const [ordernar, setOrdenar] = useState({
    precio: precio || (!router?.query?.precio ? true : false && !cerca),
    cerca: cerca
  })

  const [combustible, setCombustible] = useState({
    corriente: corriente || !router?.query?.combustible ? true : false,
    extra: extra,
  });

  const handleToggleCombustible = (tipo) => {
    setCombustible({ ...combustible, [tipo]: !combustible[tipo] });
  };
  const handleToggleOrdenar = (tipo) => {
    setOrdenar((prevOrdenar) => {
      const updatedOrdenar = {};
      Object.keys(prevOrdenar).forEach((key) => {
        updatedOrdenar[key] = key === tipo ? true : false;
      });
      if (tipo === 'cerca' && userLocation[0] === 0) {
        console.log('hii');
        getLocalizacion(setUserLocation)
      }
      return updatedOrdenar;
    });
  };
  const handleSubmit = () => {
    const queryParams = Object.entries(combustible)
      .filter(([_, value]) => value)
      .map(([key, _]) => key)
      .join(',');
    const queryParams2 = Object.entries(ordernar)
      .filter(([_, value]) => value)
      .map(([key, _]) => key)
      .join(',');
    if (router?.query?.slug?.length > 0) {
      router.push({
        pathname: '/gasolineras/[...slug]',
        query: { slug: router?.query?.slug[0], combustible: queryParams, ordernar: queryParams2 }
      });
    } else {
      router.push(`?combustible=${queryParams}&ordernar=${queryParams2}`);

    }
    setVisibleModalFiltros(false)
  };

  const [triedGettingLocation, setTriedGettingLocation] = useState(false);

  useEffect(() => {
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      setUserLocation(JSON.parse(storedLocation));
    } else if (!triedGettingLocation) {
      getLocalizacion(setUserLocation);
      setTriedGettingLocation(true);
    }
  }, [triedGettingLocation]);

  return (
    <div onClick={() => setVisibleModalFiltros(false)} className={styles.modal} >
      <div onClick={(e) => e.stopPropagation()} className={styles.modalContainer} style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <p style={{ margin: '0', textAlign: 'center', flex: 1, fontSize: '18px', fontWeight: '600' }}>Filtrar y ordenar</p>
          <Icon onClick={() => setVisibleModalFiltros(false)} name={IconCatalog.closeOutline} />
        </div>

        <div style={{ margin: '32px 0 16px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <p style={{ margin: '0', fontSize: '16px', fontWeight: '500' }}>Filtrar</p>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <p style={{ margin: '0', fontSize: '14px' }}>Gasolina Corriente</p>
            {combustible.corriente
              ? <Icon onClick={() => handleToggleCombustible('corriente')} name={IconCatalog.checkbox} style={{ color: '#373737' }} />
              : <div onClick={() => handleToggleCombustible('corriente')} style={{ cursor: 'pointer', borderRadius: '4px', width: '16.5px', marginRight: '2px', height: '16.5px', border: '1px solid black' }} />
            }
          </div>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <p style={{ margin: '0', fontSize: '14px' }}>Gasolina Extra</p>
            {combustible.extra
              ? <Icon onClick={() => handleToggleCombustible('extra')} name={IconCatalog.checkbox} style={{ color: '#373737' }} />
              : <div onClick={() => handleToggleCombustible('extra')} style={{ cursor: 'pointer', borderRadius: '4px', width: '16.5px', marginRight: '2px', height: '16.5px', border: '1px solid black' }} />
            }
          </div>

        </div>

        <div style={{ margin: '16px 0 32px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <p style={{ margin: '0', fontSize: '16px', fontWeight: '500' }}>Ordenar</p>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <p style={{ margin: '0', fontSize: '14px' }}>De menor a mayor precio</p>
            {ordernar.precio
              ? <Icon onClick={() => handleToggleOrdenar('precio')} name={IconCatalog.checkbox} style={{ color: '#373737' }} />
              : <div onClick={() => handleToggleOrdenar('precio')} style={{ cursor: 'pointer', borderRadius: '4px', width: '16.5px', marginRight: '2px', height: '16.5px', border: '1px solid black' }} />
            }
          </div>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <p style={{ margin: '0', fontSize: '14px' }}>Gasolineras mas cerca</p>
            {ordernar.cerca
              ? <Icon onClick={() => handleToggleOrdenar('cerca')} name={IconCatalog.checkbox} style={{ color: '#373737' }} />
              : <div onClick={() => handleToggleOrdenar('cerca')} style={{ cursor: 'pointer', borderRadius: '4px', width: '16.5px', marginRight: '2px', height: '16.5px', border: '1px solid black' }} />
            }
          </div>
        </div>

        <Button onClick={handleSubmit} variant={ButtonVariant.secondary} fullWidth>
          Aplicar filtros
        </Button>
      </div>

    </div>

  )
}