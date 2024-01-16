import React, { useState } from 'react';
import Link from 'next/link';
import { categorias2 } from '../Talleres/ServiciosOfrecidos';
import Icon, { IconCatalog } from '../Icon/Icon';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CALIFICACION_OPINIONES } from '@/graphql/queries';
import ButtonsFooter from '../Talleres/ButtonsFooter';
// Asegúrate de importar el archivo de estilos
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { CREATE_CLICK_COMPARTIDO, CREATE_CLICK_MAPA, CREATE_VISITA_WHATSAPP } from '@/graphql/mutations';
import { useRouter } from 'next/router';

let servicios = [
  {
    nombre: 'Baterias',
    img: 'servicio-bateria.png'
  },
  {
    nombre: 'Cambio Aceite',
    img: 'servicio-cambio-aceite.png'
  },
  {
    nombre: 'Clutch',
    img: 'servicio-clutch.png'
  }
]
const PlaceCard = ({ data }) => {
  const result = useQuery(GET_CALIFICACION_OPINIONES, { variables: { id: data?.id } })

  const [scrolled, setScrolled] = useState(false);
  const router = useRouter()
  const [createClickMapaDireccion] = useMutation(CREATE_CLICK_MAPA)

  const [createVisitaWhatsapp, { loading }] = useMutation(CREATE_VISITA_WHATSAPP)

  const sendMessageWha = () => {
    router.push(`${data?.userName}/solicitar-revision?ide=${data?.id}`);

    // createVisitaWhatsapp({ variables: { id: data?.id } })
    // let url = `https://api.whatsapp.com/send?phone=57${data?.whatsapp}`;
    // url += `&text=${encodeURI(`Buenos dia, vi su negocio en https://quarks.com.co${router?.asPath}, estoy interesado en...`)}&app_absent=0`
    // window.open(url);
  }
  // http://localhost:3000/talleres_padilla/solicitar-revision?ide=64b81326cbf32fcc68b63590
  // http://localhost:3000/talleres_padilla/solicitar-revision?ide=64b81326cbf32fcc68b63590
  const abrirGoogleMaps = (direccion) => {
    const direccionFormatoURL = encodeURIComponent(direccion);
    const url = `https://www.google.com/maps/search/?api=1&query=${direccionFormatoURL}`;
    window.open(url, '_blank');
  };
  const handleClickMapa = (data) => {
    createClickMapaDireccion({ variables: { id: data?.id } })
    abrirGoogleMaps(data?.direccion)
  }
  return (
    <Link href={`/${data?.userName}`} style={{ width: '100%', textDecoration: 'none', color: '#373737' }}>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '8px', margin: '16px 0 8px 0', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', width:'85%' }}>
          {data?.fotoperfil
            ?
            <img style={{ height: '48px', width: '48px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #f1f1f1' }} src={data?.fotoperfil} alt="Nombre del lugar" />
            :
            <img style={{ height: '48px', width: '48px', borderRadius: '8px', objectFit: 'contain', }} src={'/EmojiTaller.png'} alt="Nombre del lugar" />

          }
          <div style={{overflow:'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>
            <h3 style={{ fontSize: data?.nombre.length > 20 ? '14px' : data?.nombre.length > 15 ? '16px' : '18px', fontWeight: '600',overflow: 'hidden', textOverflow: 'ellipsis',whiteSpace: 'nowrap', }}>{data?.nombre}</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#929292' }}>{data?.direccion}</p>
          </div>
        </div>
        {result?.data?.getCalificacionOpiniones > 0 &&
          <div style={{ display: 'flex', marginTop: '2px', flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: '4px' }}>
            <ion-icon style={{ color: '#FBBC04' }} name="star"></ion-icon>
            <p style={{ fontSize: '12px', margin: 0, color: '#464646' }}>{result?.data?.getCalificacionOpiniones}</p>
          </div>
        }
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '6px', width: '100%' }}>
        <p style={{ fontSize: '12px', margin: 0, color: '#464646', width:'100%', fontWeight:'600' }}>{data?.nombre === 'Corsa Motors' ?'Almacen de Repuestos':'Taller Mecanico'}</p>
        {data?.categorias.slice(0,2).map(el => {
          const category = categorias2?.find(cat => cat.db.toLocaleLowerCase() == el.toLocaleLowerCase())
          return (
            <div style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', borderRadius: '24px', padding: '4px 4px 4px 0px', }}>
              {category?.img && <img src={`./${category?.img}.png`} style={{ width: '20px', height: '20px' }} alt={el} />}
              <p style={{ margin: 0, fontSize: '12px', color: '#464646' }}>{category?.db}</p>
            </div>
          )
        })}

        {data?.categorias.length > 2 &&
          <div style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', border: '1px solid #c6c6c6', borderRadius: '24px', padding: '4px 12px', }}>
            <p style={{ margin: 0, fontSize: '12px', color: '#464646' }}>+{data?.categorias.length - 2}</p>
          </div>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', marginTop: '16px' }}>
        <button style={{ height: '40px', fontSize: '12px',  borderRadius: '8px' }} className={styles.buttonFixedBlack} onClick={(e) => {
          e.preventDefault();
          sendMessageWha();
        }} >{data?.userName === 'corsa-motors'?'Contactar':'Solicitar Revisión'} <Icon name={IconCatalog.logoWhatsapp} style={{ color: 'white' }} size='sm' />
        </button>
        <button style={{ height: '40px', width: '40px', borderRadius: '8px' }} className={styles.buttonFixedBlack2} onClick={(e) => { e.stopPropagation(); handleClickMapa(data); }} ><Icon name={IconCatalog.earthOutline} style={{ color: '#373737' }} size='sm' /> </button>
      </div>
    </Link>
  );
};

export default PlaceCard;