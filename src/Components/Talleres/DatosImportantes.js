import { CREATE_CLICK_MAPA, CREATE_CLICK_TELEFONO } from '@/graphql/mutations';
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useMutation } from '@apollo/client';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { MagicMotion } from 'react-magic-motion';
import WidgetComplete from '../Icon/WidgetComplete';
import Icon, { IconCatalog } from '../Icon/Icon';
import Divider from '../Box/Divider';


const DatosImportantes = forwardRef(({ data, }, ref) => {
  const myRef = useRef(null);
  const [createClickTelefono] = useMutation(CREATE_CLICK_TELEFONO)
  const [createClickMapaDireccion] = useMutation(CREATE_CLICK_MAPA)

  const handleClickTelefono = (modal) => {
    createClickTelefono({ variables: { id: data?.id } })
  }
  const abrirGoogleMaps = (direccion) => {
    const direccionFormatoURL = encodeURIComponent(direccion);
    const url = `https://www.google.com/maps/search/?api=1&query=${direccionFormatoURL}`;
    window.open(url, '_blank');
  };
  const handleClickMapa = (data) => {
    createClickMapaDireccion({ variables: { id: data?.id } })
    abrirGoogleMaps(data?.direccion)
  }

  // Permite al componente padre acceder a la función scrollToRef
  useImperativeHandle(ref, () => ({
    scrollToRef: () => {
      if (myRef.current) {
        window.scrollTo({
          top: myRef.current.offsetTop,
          behavior: 'smooth',
        });
      }
    },
  }));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos una demora de 2 segundos para cargar los iconos
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Limpieza del temporizador en caso de que el componente se desmonte antes de que termine la carga simulada
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <MagicMotion>
       {loading ? (
        // Muestra el esqueleto mientras se carga
        <div
          className={styles.skeleton}
        />
      ) :
        <WidgetComplete name={'tienda'}  withBorder={false} text={data?.userName === 'corsa-motors' ? 'Almacen de Repuestos' : 'Taller Automotriz'} icon={IconCatalog.storefrontOutline}  style={{ color: '#5c5c5c' }} />
      }
      {loading ? (
        // Muestra el esqueleto mientras se carga
        <div
          className={styles.skeleton}
        />
      ) :
        <WidgetComplete name={'telefono'} onClick={handleClickTelefono} withBorder={false} text={data?.telefono} icon={IconCatalog.callOutline} icon2={IconCatalog.callOutline} style={{ color: '#5c5c5c' }} />
      }
      {loading ? (
        // Muestra el esqueleto mientras se carga
        <div
          className={styles.skeleton}
        />
      ) :
        <WidgetComplete name={'direccion'} onClick={() => handleClickMapa(data)} withBorder={false} text={data?.direccion} icon={IconCatalog.compassOutline} icon2={IconCatalog.openOutline} style={{ color: '#5c5c5c' }} />
      }
      

    </MagicMotion>
  )
})
export default DatosImportantes;