import Layout from "@/src/Components/Layout"
import { useRouter } from "next/router"
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useEffect, useRef, useState } from "react"
import talleres from '../talleres.json'
import { GET_CALIFICACION_OPINIONES, GET_ONE_NEGOCIOVDOS,  } from "@/graphql/queries"
import { client } from "@/client"
import { ModalShareArticulo, ModalTelefono } from "@/utils/Modales"
import ModalCreateOpinion from "@/src/Components/Almacenes/ModalCreateOpinion"
import Opinion from "@/src/Components/Index/Opinion"
import Opiniones from "@/src/Components/Almacenes/Opiniones"
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { CREATE_CLICK_COMPARTIDO, CREATE_CLICK_MAPA, CREATE_CLICK_TELEFONO, CREATE_VISITA_ALMACEN, CREATE_VISITA_WHATSAPP } from "@/graphql/mutations"
import Link from "next/link"

const Star = ({ index, stars, tamaño, }) => {
  return (
    <img src={stars < index + 1 ? `../../star-outline.svg` : `../../star.svg`} style={{ height: `${tamaño}px`, width: `${tamaño}px` }} />
  )
}
let estrellas = [1, 2, 3, 4, 5]
export default function Negocio({ data }) {
  const router = useRouter()
  const parts = router?.query?.id?.split("-");
  const [scrolled, setScrolled] = useState(false);
  const [taller, setTaller] = useState(null)
  const [visibleModalTelefono, setVisibleModalTelefono] = useState(false)
  const [visibleShareArticulo, setVisibleShareArticulo] = useState(false)
  const result = useQuery(GET_CALIFICACION_OPINIONES, { variables: { id: parts?.[0] } })
  const [createVisitaWhatsapp, { loading }] = useMutation(CREATE_VISITA_WHATSAPP)
  const [createClickTelefono]= useMutation(CREATE_CLICK_TELEFONO)
  const [createClickCompartido] = useMutation(CREATE_CLICK_COMPARTIDO)
  const [createClickMapaDireccion] = useMutation(CREATE_CLICK_MAPA)
  const [numCalificaciones, setNumCalificaciones] = useState(0)

  const [visibleOpinion, setVisibleOpinion] = useState(false)
  const [calificated, setCalificated] = useState(false)
  const reff = useRef(null)

  // Obtener el día actual en la zona horaria de Colombia
  const numeroDia = new Date().getDay();
  const indiceDia = numeroDia !== 0 ? numeroDia - 1 : 6;
  const horariosSeparados = data?.horario.split(',');

  const sendMessageWha = () => {
    createVisitaWhatsapp({ variables: { id: parts[0] } })
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
  const handleClickTelefono=(modal)=>{
    if(modal){
      setVisibleModalTelefono(true)
    }
    createClickTelefono({ variables: { id: parts[0] } })
  }
  const handleClickCompartir=()=>{
    setVisibleShareArticulo(true)
    createClickCompartido({ variables: { id: parts[0] } })
  }
  const handleClickMapa=(data)=>{
    createClickMapaDireccion({ variables: { id: parts[0] } })
    abrirGoogleMaps(data?.direccion)
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && window.scrollY < 900) {
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
    const taller1 = talleres.talleres.find(el => el.id === parts?.[0])
    setTaller(taller1)
  }, [router])

  return (
    <Layout title={`${data?.nombre} - Talleres en Bogota`} description={`Taller especializado en${data?.categorias.map(el => " " + el)}. Estamos ubicados en la ${data?.direccion}. ${data?.localidad}, ${data?.ciudad}. Consulta disponibilidad aqui o al ${data?.telefono} - ${data?.whatsapp}`} image={data?.fotoperfil? data?.fotoperfil: 'https://azurequarks.blob.core.windows.net/negocios/fotostoredefault.png'} url={router?.asPath} keywords={`${data?.categorias.map(el => " Talleres de " + el + " en " + data?.ciudad)}`} tags={data?.categorias} icon={data?.fotoperfil}>
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
                        <Star index={index} stars={result?.data?.getCalificacionOpiniones} tamaño={'20'} />
                      </div>
                    ))}
                    <p className={styles.textCategory} >{numCalificaciones} calificaciones</p>
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
                  {data?.nivelnegocio > 1 && <ion-icon style={{ color: '#f50057', fontSize: '24px', width: '10%' }} name="shield-checkmark"></ion-icon>}
                </div>
                {result?.data?.getCalificacionOpiniones?.length > 0 &&
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '12px' }}>
                    {estrellas.map((el, index) => (
                      <div id={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
                        <Star index={index} stars={result?.data?.getCalificacionOpiniones} tamaño={'20'} />
                      </div>
                    ))}
                    <p className={styles.textCategory} >{numCalificaciones} calificaciones</p>
                  </div>
                }

              </div>

              <div className={styles.containerCategory}>
                {data?.categorias.slice(0, 5).map(categoria => (
                  <div className={styles.cardCategoryLugar}>
                    <p className={styles.textCategory}>{categoria}</p>
                  </div>
                ))}
                {data?.categorias.length > 5 && <div className={styles.cardCategoryLugar}>
                  <p className={styles.textCategory}>+ {data?.categorias.length} categorias</p>
                </div>}
              </div>
              <div className={styles.containerButtonsCA}>
                <button onClick={handleScroll} className={styles.buttonPrimary}><ion-icon style={{ color: 'white', fontSize: '24px' }} name="star-outline"></ion-icon>Agregar reseña</button>
                <button onClick={handleClickCompartir} className={styles.buttonSecondary}><ion-icon style={{ fontSize: '24px' }} name="share-outline"></ion-icon>Compartir</button>
                {/* <button>Get Stadistics</button> */}
              
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
                <div onClick={()=>handleClickTelefono(true)} className={styles.containerButtonMobile}>
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

          <div>
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

          <h2 className={styles.titleLugar}>Datos relevantes</h2>
          <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
            {data?.telefono &&
              <div onClick={handleClickTelefono} style={{ display: 'flex',cursor:'pointer', flexDirection: 'row', gap: '16px', alignItems: 'center', marginTop: '8px' }}>
                <ion-icon style={{ fontSize: '24px' }} name="call-outline"></ion-icon>
                <h6 style={{ fontSize: '14px', fontWeight: '400' }} className={styles.textCategory}>{data?.telefono}</h6>
              </div>}
            {data?.whatsapp &&
              <div onClick={sendMessageWha}  style={{ display: 'flex', flexDirection: 'row', gap: '16px',cursor:'pointer', alignItems: 'center' }}>
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
            {/* <input placeholder='Agrega tu opinion del almacen' type={'text'} className={styles.input} /> */}

            <Opiniones almacen={parts[0]} setNumCalificaciones={setNumCalificaciones} numCalificaciones={numCalificaciones}/>

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
              <div  onClick={handleClickTelefono} style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', cursor:'pointer' }}>
                <ion-icon style={{ fontSize: '24px' }} name="call-outline"></ion-icon>
                <h6 style={{ fontSize: '14px', fontWeight: '400' }} className={styles.textCategory}>{data?.telefono}</h6>
              </div>}

            <div style={{ backgroundColor: '#d9d9d9', width: '100%', height: '1px', margin: '16px 0' }} />

            {data?.whatsapp &&
              <div onClick={sendMessageWha} style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', cursor:'pointer' }}>
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
    </Layout >

  )
}

export async function getServerSideProps({ query }) {
  const parts = query?.id?.split('-');
  const id = parts?.[0];
  const { data } = await client.query(
    {
      query: GET_ONE_NEGOCIOVDOS,
      variables: { id: id }
    }
  )
  const result = await client.mutate(
    {
      mutation: CREATE_VISITA_ALMACEN,
      variables: { id: id }
    }
  )

  return {
    props: {
      data: data?.getOneNegocioVDos,
    },
  };
}