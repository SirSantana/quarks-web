import styles from '@/styles/ServiciosAutomotriz.module.css'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { MagicMotion } from 'react-magic-motion';
import WidgetComplete from '../Icon/WidgetComplete';
import { IconCatalog } from '../Icon/Icon';
import { useMutation } from '@apollo/client';
import { CREATE_ACCION } from '@/graphql/mutations';


const DatosImportantes = forwardRef(({ data, onClick }, ref) => {
  const [createAccion, result] = useMutation(CREATE_ACCION)
  const myRef = useRef(null);
  const handleCall = () => {
    if (process.env.NODE_ENV === 'production') {
      createAccion({ variables: { almacen: data?.id, tipo: 'btn-llamar', estado: 'production' } });
    }
    return `tel:+57${data?.telefono}`;
  }
  const handleMap = () => {
    if (process.env.NODE_ENV === 'production') {
      return createAccion({ variables: { almacen: data?.id, tipo: 'btn-direccion', estado: 'production' } });
    }
  }
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
        <WidgetComplete name={'tienda'} withBorder={false} text={data?.tipo === 'Mecanico a Domicilio' ? 'Mecanico a Domicilio' : data?.tipo === 'Almacen' ? 'Almacen de Repuestos' : 'Taller Automotriz'} icon={IconCatalog.storefrontOutline} style={{ color: '#5c5c5c' }} />
      }
      {loading ? (
        // Muestra el esqueleto mientras se carga
        <div
          className={styles.skeleton}
        />
      ) :
        <WidgetComplete name={'telefono'} withBorder={false} text={data?.telefono} icon={IconCatalog.callOutline} icon2={IconCatalog.callOutline} style={{ color: '#5c5c5c', }} badge={'Telefono'} onClickBadge={handleCall} />
      }
      {loading ? (
        // Muestra el esqueleto mientras se carga
        <div
          className={styles.skeleton}
        />
      ) :
        <WidgetComplete name={'direccion'} onClick={onClick} withBorder={false} text={data?.direccion == 'Servicio a Domicilio' ? 'Zona de cobertura. Bogota y alrededores' : data?.direccion} onClickBadge={handleMap} icon={IconCatalog.compassOutline} badge={'Direccion'}  style={{ color: '#5c5c5c' }} />
      }
      {/* {loading ? (
        // Muestra el esqueleto mientras se carga
        <div
          className={styles.skeleton}
        />
      ) :
        <WidgetComplete name={'revisiones'} onClick={onClick} withBorder={false} text={'2 Solicitudes de revision'} icon={IconCatalog.readerOutline}  style={{ color: '#5c5c5c' }} />
      } */}

    </MagicMotion>
  )
})
export default DatosImportantes;