import { useRouter } from "next/router"
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useEffect, useRef, useState, } from "react"
import talleres from '../../../pages/servicios-automotriz/talleres.json'
import { ModalShareArticulo, ModalTelefono } from "@/utils/Modales"
import ModalCreateOpinion from "@/src/Components/Almacenes/ModalCreateOpinion"
import Opiniones from "@/src/Components/Almacenes/Opiniones"
import { useMutation, useQuery } from "@apollo/client"
import { CREATE_CLICK_COMPARTIDO, CREATE_CLICK_MAPA, CREATE_CLICK_TELEFONO, CREATE_VISITA_ALMACEN, CREATE_VISITA_WHATSAPP } from "@/graphql/mutations"
import Link from "next/link"
import AlmacenesSugeridos from "@/src/Components/Almacenes/AlmacenesSugeridos"
import { GET_CALIFICACION_OPINIONES } from "@/graphql/queries"

const Star = ({ index, stars, tamaño, }) => {
  return (
    <img src={stars < index + 1 ? `../../star-outline.svg` : `../../star.svg`} style={{ height: `${tamaño}px`, width: `${tamaño}px` }} />
  )
}
let estrellas = [1, 2, 3, 4, 5]
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function getRandomItems(items, maxResults) {
  // Shuffle the items
  const shuffledItems = [...items];
  shuffleArray(shuffledItems);

  // Return the first `maxResults` items from the shuffled array
  return shuffledItems.slice(0, maxResults);
}
export default function VUnoTallerDesktop({data}) {
  const router = useRouter()
  const parts = router?.query?.id?.split("-");
  const [scrolled, setScrolled] = useState(false);
  const [taller, setTaller] = useState(null)
  const [talleresSimilares, setTalleresSimilares] = useState([])
  const [visibleModalTelefono, setVisibleModalTelefono] = useState(false)
  const [visibleShareArticulo, setVisibleShareArticulo] = useState(false)
  const result = useQuery(GET_CALIFICACION_OPINIONES, { variables: { id: data?.id } })
  const [createVisitaWhatsapp, { loading }] = useMutation(CREATE_VISITA_WHATSAPP)
  const [createClickTelefono] = useMutation(CREATE_CLICK_TELEFONO)
  const [createClickCompartido] = useMutation(CREATE_CLICK_COMPARTIDO)
  const [createClickMapaDireccion] = useMutation(CREATE_CLICK_MAPA)
  const [numCalificaciones, setNumCalificaciones] = useState(0)

  const [visibleOpinion, setVisibleOpinion] = useState(false)
  const [calificated, setCalificated] = useState(false)
  const reff = useRef(null)

  const numeroDia = new Date().getDay();
  const indiceDia = numeroDia !== 0 ? numeroDia - 1 : 6;
  const horariosSeparados = data?.horario.split(',');

  const sendMessageWha = () => {
    createVisitaWhatsapp({ variables: { id: data?.id } })
    let url = `https://api.whatsapp.com/send?phone=57${data?.whatsapp}`;
    url += `&text=${encodeURI(`Buenos dia, vi su negocio en https://quarks.com.co${router?.asPath}, estoy interesado en...`)}&app_absent=0`
    window.open(url);
  }
  const abrirGoogleMaps = (direccion) => {
    const direccionFormatoURL = encodeURIComponent(direccion);
    const url = `https://www.google.com/maps/search/?api=1&query=${direccionFormatoURL}`;
    window.open(url, '_blank');
  };
  const handleScroll = () => {
    window.scrollTo({
      top: reff?.current?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };
  const handleClickTelefono = (modal) => {
    if (modal) {
      setVisibleModalTelefono(true)
    }
    createClickTelefono({ variables: { id: data?.id } })
  }
  const handleClickCompartir = () => {
    setVisibleShareArticulo(true)
    createClickCompartido({ variables: { id: data?.id } })
  }
  const handleClickMapa = (data) => {
    createClickMapaDireccion({ variables: { id: data?.id } })
    abrirGoogleMaps(data?.direccion)
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && window.scrollY < 1600) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    const taller1 = talleres.talleres.find(el => el.id === data?.id)
    setTaller(taller1)
    const filteredItems = talleres.talleres.filter(item =>
      item.categorias.some(categoriaa => categoriaa.toLowerCase().includes(data?.categorias[0].toLowerCase()))
    )
    let filterWithoutCreator = filteredItems.filter(item => item.id !== data?.id)
    const randomResults = getRandomItems(filterWithoutCreator, 3);
    setTalleresSimilares(randomResults)

  }, [router])
  return (
    <>
    <div className={styles.container}>
      <div className={styles.sectionOneNegocio}>
        <div className={styles.headerNegocio}>
          <div className={styles.containerHeaderCardMobile}>
            {data?.fotoperfil ?
              <img src={data?.fotoperfil} alt={`Taller automotriz ${data?.nombre}`} className={styles.imgPrincipalLugarMobile} />
              : <ion-icon style={{ fontSize: '72px' }} className={styles.imgPrincipalLugarMobile} name="storefront-outline"></ion-icon>
            }
            <div>
              <div className={styles.containerHeaderText}>
                <p className={styles.subtitleLugar}>Hoy {horariosSeparados?.[indiceDia]}</p>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', marginBottom: '8px' }}>
                  <h1 style={{ width: '90%' }} className={styles.titleNegocio}>{data?.nombre} </h1>
                  {data?.nivelnegocio > 0 && <ion-icon style={{ color: '#f50057', fontSize: '24px', width: '10%' }} name="shield-checkmark"></ion-icon>}
                </div>
              </div>
              {result?.data?.getCalificacionOpiniones?.length > 0 &&
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '12px' }}>
                  {estrellas.map((el, index) => (
                    <div id={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
                      <Star index={index} stars={Math.round(result?.data?.getCalificacionOpiniones)} tamaño={'20'} />
                    </div>
                  ))}
                  <p className={styles.textCategory} >{result?.data?.getCalificacionOpiniones} ({Number(data?.numerocalificacionesmaps) + Number(numCalificaciones)} reseñas)</p>
                </div>
              }

            </div>
          </div>

          {data?.fotoperfil ?
            <img src={data?.fotoperfil} alt={`Taller ${data?.nombre}`} className={styles.imgPrincipalLugarDesktop} />
            : <ion-icon style={{ fontSize: '128px' }} class={styles.imgPrincipalLugarDesktop} name="storefront-outline"></ion-icon>
          }
          <div className={styles.headerNegocioText}>
            <div className={styles.containerHeaderCardDesktop}>
              <p className={styles.subtitleLugar}>Hoy {horariosSeparados?.[indiceDia]}</p>

              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', marginBottom: '8px' }}>
                <h1 style={{ width: '90%' }} className={styles.titleNegocio}>{data?.nombre}</h1>
                {data?.nivelnegocio >= 1 && <ion-icon style={{ color: '#f50057', fontSize: '24px', width: '10%' }} name="shield-checkmark"></ion-icon>}
              </div>
              {result?.data?.getCalificacionOpiniones?.length > 0 &&
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '12px' }}>
                  {estrellas.map((el, index) => (
                    <div id={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
                      <Star index={index} stars={Math.round(result?.data?.getCalificacionOpiniones)} tamaño={'20'} />
                    </div>
                  ))}
                  <p className={styles.textCategory} >{result?.data?.getCalificacionOpiniones} ({Number(data?.numerocalificacionesmaps) + Number(numCalificaciones)} reseñas)</p>
                </div>
              }

            </div>

            <div className={styles.containerButtonsCA}>
              <button onClick={handleScroll} className={styles.buttonPrimary}><ion-icon style={{ color: 'white', fontSize: '24px' }} name="star-outline"></ion-icon>Agregar reseña</button>
              <button onClick={handleClickCompartir} className={styles.buttonSecondary}><ion-icon style={{ fontSize: '24px' }} name="share-outline"></ion-icon>Compartir</button>
            </div>
            <div className={styles.containerButtonsMobile}>
              <div onClick={handleScroll} className={styles.containerButtonMobile}>
                <ion-icon style={{ fontSize: '24px' }} name="star-outline"></ion-icon>
                <p className={styles.textCategory}>Agregar reseña</p>
              </div>
              <div onClick={() => handleClickMapa(data)} className={styles.containerButtonMobile}>
                <ion-icon style={{ fontSize: '24px' }} name="location-outline"></ion-icon>
                <p className={styles.textCategory}>Ubicacion</p>
              </div>
              <div onClick={() => handleClickTelefono(true)} className={styles.containerButtonMobile}>
                <ion-icon style={{ fontSize: '24px' }} name="call-outline"></ion-icon>
                <p className={styles.textCategory}>Telefono</p>
              </div>
              <div onClick={handleClickCompartir} className={styles.containerButtonMobile}>
                <ion-icon style={{ fontSize: '24px' }} name="share-outline"></ion-icon>
                <p className={styles.textCategory}>Compartir</p>
              </div>
            </div>
            <button onClick={sendMessageWha} className={styles.buttonPrimaryMobile}><ion-icon style={{ color: 'white', fontSize: '24px' }} name="logo-whatsapp"></ion-icon>Contactar ahora</button>
            {data?.visitaswhatsapp > 0 &&
              <p style={{ marginTop: '4px' }} className={styles.textCategoryMobile}>{data?.visitaswhatsapp} personas solicitaron una cotización recientemente </p>
            }
          </div>

        </div>

        <div style={{ backgroundColor: '#d9d9d9', width: '100%', height: '1px', margin: '16px 0 16px 0' }} />

        <div style={{ margin: '48px 0' }}>
          <h2 className={styles.titleLugar}>Servicios ofrecidos</h2>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '16px 0' }}>
            {data?.categorias.map(categoria => (
              <h5 style={{ width: '50%', fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>{categoria}</h5>
            ))}
          </div>
        </div>
        <div style={{ backgroundColor: '#d9d9d9', width: '100%', height: '1px', margin: '16px 0 32px 0' }} />

        <h2 className={styles.titleLugar}>Ubicacion y horarios</h2>

        <div className={styles.containerHorariosUbicacion}>
          <div>
            <iframe className={styles.mapsImage} src={taller?.ubicacionmaps} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <h6 style={{ fontSize: '14px', fontWeight: '700' }} className={styles.textCategory}>{data?.direccion}. {data?.localidad}, {data?.ciudad}</h6>
          </div>

          <div >
            {horariosSeparados?.map(horario => {
              const primeraTresLetras = horario.substring(0, 3);
              const restoHorario = horario.substring(3);
              return (
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', margin: '16px 0' }}>
                  <h5 style={{ fontSize: '16px', fontWeight: '700', }}>{primeraTresLetras}</h5>
                  <p style={{ fontSize: '16px', fontWeight: '400', }}>{restoHorario}</p>
                </div>
              )
            }
            )}
          </div>
        </div>

        <div style={{ backgroundColor: '#d9d9d9', width: '100%', height: '1px', margin: '32px 0 32px 0' }} />

        <AlmacenesSugeridos talleresSimilares={talleresSimilares} />

        <div style={{ backgroundColor: '#d9d9d9', width: '100%', height: '1px', margin: '32px 0 32px 0' }} />

        <h2 className={styles.titleLugar}>Datos relevantes</h2>
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
          {data?.telefono &&
            <div onClick={handleClickTelefono} style={{ display: 'flex', cursor: 'pointer', flexDirection: 'row', gap: '16px', alignItems: 'center', marginTop: '8px' }}>
              <ion-icon style={{ fontSize: '24px' }} name="call-outline"></ion-icon>
              <h6 style={{ fontSize: '14px', fontWeight: '400' }} className={styles.textCategory}>{data?.telefono}</h6>
            </div>}
          {data?.whatsapp &&
            <div onClick={sendMessageWha} style={{ display: 'flex', flexDirection: 'row', gap: '16px', cursor: 'pointer', alignItems: 'center' }}>
              <ion-icon style={{ fontSize: '24px' }} name="logo-whatsapp"></ion-icon>
              <h6 style={{ fontSize: '14px', fontWeight: '400' }} className={styles.textCategory}>{data?.whatsapp}</h6>
            </div>}
          <div onClick={() => handleClickMapa(data)} style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', cursor: 'pointer' }}>
            <ion-icon style={{ fontSize: '24px' }} name="arrow-redo-outline"></ion-icon>
            <h6 style={{ fontSize: '14px', fontWeight: '400' }} className={styles.textCategory}>{data?.direccion}</h6>
          </div>
          {data?.paginaweb &&
            <Link style={{ display: 'flex', flexDirection: 'row', color: '#373737', gap: '16px', alignItems: 'center', cursor: 'pointer', textDecoration: 'none' }} href={`https://${data?.paginaweb}`}>
              <ion-icon style={{ fontSize: '24px' }} name="compass-outline"></ion-icon>
              <h6 style={{ fontSize: '14px', fontWeight: '400' }} className={styles.textCategory}>{data?.paginaweb}</h6>
            </Link>
          }


        </div>
        <div style={{ backgroundColor: '#d9d9d9', width: '100%', height: '1px', margin: '32px 0 32px 0' }} />

        <h2 className={styles.titleLugar}>Agregar reseña</h2>

        <div ref={reff}>
          {visibleOpinion &&
            <div className={styles.modal}>
              <ModalCreateOpinion setVisibleOpinion={setVisibleOpinion} setCalificated={setCalificated} />
            </div>}
          <Opiniones almacen={data?.id} setNumCalificaciones={setNumCalificaciones} numCalificaciones={numCalificaciones} calificacionMaps={data?.numerocalificacionesmaps} urltallermaps={data?.urltallermaps} />

        </div>

      </div>
      <div className={` ${scrolled ? styles.sectionTwoNegocioFixed : styles.sectionTwoNegocio}`}>
        {data?.whatsapp &&
          <div className={styles.sectionTwoUno}>
            <h4 className={styles.titleLugar}>Obten precios y disponibilidad</h4>
            <button onClick={sendMessageWha} style={{ width: '100%', justifyContent: 'center', fontSize: '16px', margin: '16px 0 8px 0' }} className={styles.buttonPrimary}><ion-icon style={{ color: 'white', fontSize: '24px' }} name="logo-whatsapp"></ion-icon>Contactar ahora</button>
            {data?.visitaswhatsapp > 0 &&
              <p className={styles.textCategory}>{data?.visitaswhatsapp} personas solicitaron una cotización recientemente </p>
            }
          </div>}

        <div className={styles.sectionTwoTwo}>
          {data?.telefono &&
            <div onClick={handleClickTelefono} style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', cursor: 'pointer' }}>
              <ion-icon style={{ fontSize: '24px' }} name="call-outline"></ion-icon>
              <h6 style={{ fontSize: '14px', fontWeight: '400' }} className={styles.textCategory}>{data?.telefono}</h6>
            </div>}

          <div style={{ backgroundColor: '#d9d9d9', width: '100%', height: '1px', margin: '16px 0' }} />

          {data?.whatsapp &&
            <div onClick={sendMessageWha} style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', cursor: 'pointer' }}>
              <ion-icon style={{ fontSize: '24px' }} name="logo-whatsapp"></ion-icon>
              <h6 style={{ fontSize: '14px', fontWeight: '400' }} className={styles.textCategory}>{data?.whatsapp}</h6>
            </div>}

          <div style={{ backgroundColor: '#d9d9d9', width: '100%', height: '1px', margin: '16px 0' }} />

          <div onClick={() => handleClickMapa(data)} style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', cursor: 'pointer' }}>
            <ion-icon style={{ fontSize: '24px' }} name="arrow-redo-outline"></ion-icon>
            <h6 style={{ fontSize: '14px', fontWeight: '400' }} className={styles.textCategory}>{data?.direccion}</h6>
          </div>

          <div style={{ backgroundColor: '#d9d9d9', width: '100%', height: '1px', margin: '16px 0' }} />

          {data?.paginaweb &&
            <Link style={{ display: 'flex', flexDirection: 'row', color: '#373737', gap: '16px', alignItems: 'center', cursor: 'pointer', textDecoration: 'none' }} href={`https://${data?.paginaweb}`} target="_blank">
              <ion-icon style={{ fontSize: '24px' }} name="compass-outline"></ion-icon>
              <h6 style={{ fontSize: '14px', fontWeight: '400' }} className={styles.textCategory}>{data?.paginaweb}</h6>
            </Link>
          }


        </div>
      </div>

    </div>
    {visibleShareArticulo && <ModalShareArticulo setVisibleShareArticulo={setVisibleShareArticulo} url={`https://www.quarks.com.co${router?.asPath}`} />}
    {visibleModalTelefono && <ModalTelefono taller={data?.nombre} telefono={data?.telefono} setVisibleModalTelefono={setVisibleModalTelefono} />}
  </>
    )
}