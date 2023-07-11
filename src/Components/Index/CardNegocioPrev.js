import Link from "next/link";
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useQuery } from "@apollo/client";
import { GET_CALIFICACION_OPINIONES } from "@/graphql/queries";

const Star = ({ index, stars, tamaño }) => {
  return (
    <img src={stars < index + 1 ? `../../star-outline.svg` : `../../star.svg`} style={{ height: `${tamaño}px`, width: `${tamaño}px` }} />
  )
}
let estrellas = [1, 2, 3, 4, 5]

export default function CardNegocioPrev({ el, horariosSeparados }) {
  const numeroDia = new Date().getDay();
  const indiceDia = numeroDia !== 0 ? numeroDia - 1 : 6;
  const result = useQuery(GET_CALIFICACION_OPINIONES, { variables: { id: el?.id } })

  return (
    <Link href={`/servicios-automotriz/negocio/${el?.id}-${el?.nombre}`} className={styles.containerCardLugar}>

      <div className={styles.containerHeaderCardMobile}>
        {el?.fotoperfil ?
          <img src={el?.fotoperfil} className={styles.imgPrincipalLugarMobile} />
          :
          <ion-icon style={{ fontSize: '72px' }} class={styles.imgPrincipalLugarMobile} name="storefront-outline"></ion-icon>
        }
        <div>
          <div className={styles.containerHeaderText}>
            <h2 style={{ alignItems: 'center', display: 'flex', gap: '8px' }} className={styles.titleLugar}>{el.nombre}{el?.nivelnegocio > 0 && <ion-icon style={{ color: '#f50057' }} name="shield-checkmark"></ion-icon>}</h2>
            <p className={styles.subtitleLugar}>Hoy {horariosSeparados[indiceDia]}</p>
          </div>
          {result?.data?.getCalificacionOpiniones?.length > 0 &&
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '12px' }}>
              {estrellas.map((el, index) => (
                <div id={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
                  <Star index={index} stars={result?.data?.getCalificacionOpiniones} tamaño={'16'} />
                </div>
              ))}
              <p className={styles.textCategory} >{result?.data?.getCalificacionOpiniones.length} calificaciones</p>
            </div>}
        </div>
      </div>

      {el?.fotoperfil ?
        <img src={el?.fotoperfil} className={styles.imgPrincipalLugarDesktop} />
        :
        <ion-icon style={{ fontSize: '128px', }} class={styles.imgPrincipalLugarDesktop} name="storefront-outline"></ion-icon>
      }
      <div style={{ width: '100%' }}>
        <div className={styles.containerHeaderCardDesktop}>
          <div className={styles.containerHeaderText}>
            <h2 style={{ alignItems: 'center', display: 'flex', gap: '8px' }} className={styles.titleLugar}>{el.nombre}{el?.nivelnegocio > 0 && <ion-icon style={{ color: '#f50057' }} name="shield-checkmark"></ion-icon>}</h2>
            <p className={styles.subtitleLugar}>Hoy {horariosSeparados[indiceDia]}</p>
          </div>
          {result?.data?.getCalificacionOpiniones?.length > 0 &&
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '12px' }}>
              {estrellas.map((el, index) => (
                <div id={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
                  <Star index={index} stars={result?.data?.getCalificacionOpiniones} tamaño={'16'} />
                </div>
              ))}
              <p className={styles.textCategory}  >{result?.data?.getCalificacionOpiniones.length} </p>
            </div>}
        </div>
        <div className={styles.containerCategory}>
          {
            el.nivelnegocio <= 0
              ? el.categorias.slice(0, 2).map((categoria) => (
                <div className={styles.cardCategoryLugar}>
                  <p className={styles.textCategory}>{categoria}</p>
                </div>
              ))
              : el.categorias.map((categoria) => (
                <div className={styles.cardCategoryLugar}>
                  <p className={styles.textCategory}>{categoria}</p>
                </div>
              ))
          }
        </div>
        <div className={styles.containerBottomCard}>
          {/* <div className={styles.containerPrevComment}>
            <ion-icon className={styles.icons} name="chatbox-outline"></ion-icon>
            <p style={{ width: '90%' }} className={styles.textCategory}>“Mi esposa se encargó de hacer un cambio de aceite
              (Mazda 3 2013) según la ubicación y las reseñas de
              Yelp...” más
            </p>
          </div> */}
          <div className={styles.containerPrevComment}>
            <ion-icon className={styles.icons} name="location-outline"></ion-icon>
            <p className={styles.subtitleLugar}>{el?.direccion}. {el?.localidad}, {el?.ciudad}</p>

          </div>

        </div>
      </div>

    </Link>
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
  // const result = await client.mutate(
  //   {
  //     mutation: CREATE_VISTA_ARTICULO,
  //     variables: { id: id }
  //   }
  // )

  return {
    props: {
      data: data?.getOneNegocioVDos,
    },
  };
}