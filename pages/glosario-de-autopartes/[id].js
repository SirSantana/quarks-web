import { client } from "@/client";
import { CREATE_VISTA_ARTICULO } from "@/graphql/mutations";
import { GET_ARTICULO } from "@/graphql/queries";
import ArticulosRelacionados from "@/src/Components/Articulos/ArticulosRelacionados";
import BottomArticulo from "@/src/Components/Articulos/BottomArticulo";
import HeaderDiccionario from "@/src/Components/Articulos/HeaderDiccionario";
import OtrosArticulos from "@/src/Components/Articulos/OtrosArticulos";
import SeccionPrincipalArticulo from "@/src/Components/Articulos/Secciones/SeccionPrincipalArticulo";
import SeccionSecundaria from "@/src/Components/Articulos/Secciones/SeccionSecundaria";
import Layout from "@/src/Components/Layout";
import styles from '@/styles/Diccionario.module.css'
import { useRouter } from "next/router";
import parse from 'html-react-parser';
import AsideGlosario from "@/src/Components/Articulos/AsideGlosario";
import LayoutGlosario from "@/src/Components/Articulos/Layout";

export default function Repuesto({ data }) {
  const router = useRouter()

  let productoMarcado = {
    titulo: data?.parrafoSeisDos ? data?.parrafoSeisDos : data?.tituloPrincipal,
    image: data?.imgPrincipal,
    url:  router.asPath,
    fecha:data?.fecha
  }

  return (
    <Layout title={data?.parrafoSeisDos ? data?.parrafoSeisDos:data?.tituloPrincipal} productoMarcado={productoMarcado} description={data?.descripcion} keywords={data?.keywords} type='article' fecha={data?.fecha} image={data?.imgPrincipal} tags={data?.palabrasClave} url={router?.asPath}>

      <LayoutGlosario >

        <div className={styles.container} style={{alignItems:'center', display:'flex', flexDirection:'column', justifyContent:'center'}}>
          {/* <HeaderHome /> */}
          <HeaderDiccionario tema={data?.tema} tiempo={data?.tiempoLectura} id={data?.id} img={data?.imgPrincipal} titulo={data?.parrafoSeisDos ? data?.parrafoSeisDos : data?.subtituloPrincipal} />
          {data?.parrafoSeis ?
            <div className={styles.parentOldGlosario}>
              {parse(data?.parrafoSeis)}
              </div>
            :
            <>
              <div className={styles.containerGrid}>
                  <img src={data?.imgPrincipal} style={{maxWidth:'100px', maxHeight:'100px'}} />
                <div className={styles.seccion1}>
                  <ion-icon style={{ fontSize: '24px', marginBottom: '8px' }} name="cog-outline"></ion-icon>

                  <h2 className={styles.question}>{data.tituloParrafoUno}</h2>
                  <p style={{ fontSize: '12px', lineHeight: '20px', marginTop: '8px', }} className={styles.response}>{parse(data?.parrafoUno)} </p>

                </div>
                <div className={styles.seccion3}>
                  <ion-icon style={{ fontSize: '24px', marginBottom: '8px' }} name="construct-outline"></ion-icon>
                  <h2 className={styles.question}>{data.tituloParrafoCinco}</h2>
                  <p style={{ fontSize: '12px', lineHeight: '20px', marginTop: '8px' }} className={styles.response}>{parse(data?.parrafoCinco)}</p>


                </div>
                <div className={styles.seccion2}>
                  <ion-icon style={{ fontSize: '24px', marginBottom: '8px' }} name="extension-puzzle-outline"></ion-icon>

                  <h2 className={styles.question}>{data.tituloParrafoTres}</h2>
                  <div style={{ listStyle: 'none', fontSize: '12px', lineHeight: '20px', marginTop: '8px' }}>
                    {parse(data?.parrafoTres)}
                  </div>

                </div>
                <div className={styles.seccion5}>
                  <ion-icon style={{ fontSize: '24px', marginBottom: '8px' }} name="build-outline"></ion-icon>
                  <h2 className={styles.question}>{data.tituloParrafoCuatro}</h2>
                  <p style={{ fontSize: '12px', lineHeight: '20px', marginTop: '8px' }} className={styles.response}>{parse(data?.parrafoCuatro)}</p>
                </div>
                <div className={styles.seccion4}>
                  <ion-icon style={{ fontSize: '24px', }} name="settings-outline"></ion-icon>
                  <h2 className={styles.question}>{data.tituloParrafoDos}</h2>
                  <p style={{ fontSize: '12px', lineHeight: '20px', marginTop: '8px' }} className={styles.response}>{parse(data?.parrafoDos)}</p>


                </div>
              </div>


              <div style={{ width: '100%', backgroundColor: '#bababa', height: '1px', margin: '0 0 32px 0' }} />
              <SeccionPrincipalArticulo titulo={data?.tituloPrincipal} tituloParrafo={data.tituloParrafoUno} parrafoUno={data?.parrafoUno} parrafoDos={data?.parrafoUnoDos} parrafoTres={data?.parrafoUnoTres} video={data?.videoUrlUno} />

              {data?.tituloParrafoDos && <SeccionSecundaria img={data?.imgParrafoDos} tituloParrafo={data.tituloParrafoDos} parrafoUno={data?.parrafoDos} parrafoDos={data?.parrafoDosDos} parrafoTres={data?.parrafoDosTres} video={data?.videoUrlDos} />}

              {data?.tituloParrafoTres && <SeccionSecundaria img={data?.imgParrafoTres} tituloParrafo={data.tituloParrafoTres} parrafoUno={data?.parrafoTres} parrafoDos={data?.parrafoTresDos} parrafoTres={data?.parrafoTresTres} video={data?.videoUrlTres} />}

              {data?.tituloParrafoCuatro && <SeccionSecundaria img={data?.imgParrafo} tituloParrafo={data.tituloParrafoCuatro} parrafoUno={data?.parrafoCuatro} parrafoDos={data?.parrafoCuatroDos} parrafoTres={data?.parrafoCuatroTres} video={data?.videoUrlCuatro} />}

              {data?.tituloParrafoCinco && <SeccionSecundaria img={data?.imgParrafoCinco} tituloParrafo={data.tituloParrafoCinco} parrafoUno={data?.parrafoCinco} parrafoDos={data?.parrafoCincoDos} parrafoTres={data?.parrafoCincoTres} video={data?.videoUrlCinco} />}

              {data?.tituloParrafoSeis && <SeccionSecundaria img={data?.imgParrafoSeis} tituloParrafo={data.tituloParrafoSeis} parrafoUno={data?.parrafoSeis} parrafoDos={data?.parrafoSeisDos} parrafoTres={data?.parrafoSeisTres} video={data?.videoUrlSeis} />}

              {data?.videoUrlUno && !data?.parrafoDosDos &&
                <iframe className={styles.imgPrincipal} style={{ maxHeight: '315px', maxWidth: '560px' }} src={data?.videoUrlUno} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              }
              {
                data?.parrafoDosDos &&
                <div>
                  <h3 style={{ fontSize: '20px' }} className={styles.question}>Preguntas frecuentes</h3>
                  <div style={{ margin: '32px 0' }}>
                    <h2 className={styles.question}>{data?.parrafoDosDos}</h2>
                    <p style={{ marginTop: '8px', }} className={styles.response}>{parse(data?.parrafoDosTres)} </p>
                    {data?.videoUrlUno &&
                      <iframe className={styles.imgPrincipal} style={{ maxHeight: '315px', maxWidth: '560px' }} src={data?.videoUrlUno} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    }
                  </div>
                  <div style={{ margin: '40px 0' }}>
                    <h2 className={styles.question}>{data?.parrafoTresDos}</h2>
                    <p style={{ marginTop: '8px' }} className={styles.response}>{parse(data?.parrafoTresTres)} </p>
                  </div>
                  <div style={{ margin: '40px 0' }}>
                    <h2 className={styles.question}>{data?.parrafoCuatroDos}</h2>
                    <p style={{ marginTop: '8px' }} className={styles.response}>{parse(data?.parrafoCuatroTres)} </p>
                  </div>
                </div>

              }
              <OtrosArticulos img={data?.imgPrincipal} />

            </>
          }









          <ArticulosRelacionados />
          <BottomArticulo palabras={data?.palabrasClave} />
      </div>
</LayoutGlosario>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  // Extraer el ID desde `params.id`
  const parts = params?.id ? params.id.split('-') : [];
  const id = parts.length > 0 ? parts[parts.length - 1] : null;

  // Si no hay ID válido, retornar un 404
  if (!id) {
    return {
      notFound: true,
    };
  }

  try {
    // Consultar el artículo
    const { data } = await client.query({
      query: GET_ARTICULO,
      variables: { id },
    });

    // Si el artículo no existe, retornar 404
    if (!data?.getArticulo) {
      return { notFound: true };
    }

    return {
      props: {
        data: data.getArticulo,
      },
    };
  } catch (error) {
    console.error("Error cargando artículo:", error);
    return {
      notFound: true, // En caso de error, devolver 404
    };
  }
}

export async function getStaticPaths() {
  return {
    paths: [], // No pre-generamos rutas, se generan bajo demanda
    fallback: "blocking", // Si la página no existe, se genera en el primer request
  };
}