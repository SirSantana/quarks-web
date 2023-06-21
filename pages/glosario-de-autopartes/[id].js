import { client } from "@/client";
import { CREATE_VISTA_ARTICULO } from "@/graphql/mutations";
import { GET_ARTICULO } from "@/graphql/queries";
import ArticulosRelacionados from "@/src/Components/Articulos/ArticulosRelacionados";
import BottomArticulo from "@/src/Components/Articulos/BottomArticulo";
import BottomHeaderInfo from "@/src/Components/Articulos/BottomHeaderInfo";
import HeaderDiccionario from "@/src/Components/Articulos/HeaderDiccionario";
import OtrosArticulos from "@/src/Components/Articulos/OtrosArticulos";
import SeccionPrincipalArticulo from "@/src/Components/Articulos/Secciones/SeccionPrincipalArticulo";
import SeccionSecundaria from "@/src/Components/Articulos/Secciones/SeccionSecundaria";
import HeaderHome from "@/src/Components/Index/HeaderHome";
import Layout from "@/src/Components/Layout";
import styles from '@/styles/Diccionario.module.css'
import { useRouter } from "next/router";
import { useEffect } from "react";
import VanillaTilt from 'vanilla-tilt';
import parse from 'html-react-parser';

let texto = 'La cilindrada, también conocida como desplazamiento del motor, es el volumen combinado de barrido de los pistones dentro de los'



export default function Repuesto({ data }) {
  const router = useRouter()
  useEffect(() => {
    const element = document.querySelector('[data-tilt]');
    VanillaTilt.init(element);
  }, []);
  return (
    <Layout title={data?.tituloPrincipal} description={data?.descripcion} keywords={data?.keywords} type='article' fecha={data?.fecha} image={data?.imgPrincipal} tags={data?.palabrasClave} url={router?.asPath}>
      <div className={styles.container}>
        <HeaderHome />
        <HeaderDiccionario tema={data?.tema} tiempo={data?.tiempoLectura} id={data?.id} img={data?.imgPrincipal} titulo={data?.subtituloPrincipal} />

        <div className={styles.containerGrid}>
          <div data-tilt className={styles.foto}>
            <img src={data?.imgPrincipal} className={styles.imgRepuesto}  />

          </div>
          <div className={styles.seccion1}>
            <ion-icon style={{ fontSize: '24px' , marginBottom:'8px'}} name="cog-outline"></ion-icon>

            <h2 className={styles.question}>{data.tituloParrafoUno}</h2>
            <p style={{ fontSize: '12px', lineHeight: '20px', marginTop: '8px' }} className={styles.response}>{parse(data?.parrafoUno)} </p>

          </div>
          <div className={styles.seccion3}>
            <ion-icon style={{ fontSize: '24px', marginBottom:'8px' }} name="construct-outline"></ion-icon>
            <h2 className={styles.question}>{data.tituloParrafoCinco}</h2>
            <p style={{ fontSize: '12px', lineHeight: '20px', marginTop: '8px' }} className={styles.response}>{parse(data?.parrafoCinco)}</p>


          </div>
          <div  className={styles.seccion2}>
            <ion-icon style={{ fontSize: '24px', marginBottom:'8px'}} name="extension-puzzle-outline"></ion-icon>

            <h2 className={styles.question}>{data.tituloParrafoTres}</h2>
            <div style={{listStyle:'none', fontSize: '12px', lineHeight: '20px', marginTop: '8px' }}>
              {parse(data?.parrafoTres)}
            </div>
            {/* <p style={{fontSize:'12px', lineHeight:'20px', marginTop:'8px'}}className={styles.response}>{texto}</p> */}

          </div>
          <div className={styles.seccion5}>
            <ion-icon style={{ fontSize: '24px', marginBottom:'8px' }} name="build-outline"></ion-icon>
            <h2 className={styles.question}>{data.tituloParrafoCuatro}</h2>
            <p style={{ fontSize: '12px', lineHeight: '20px', marginTop: '8px' }} className={styles.response}>{parse(data?.parrafoCuatro)}</p>
          </div>
          <div className={styles.seccion4}>
            <ion-icon style={{ fontSize: '24px', }} name="settings-outline"></ion-icon>
            <h2 className={styles.question}>{data.tituloParrafoDos}</h2>
            <p style={{ fontSize: '12px', lineHeight: '20px', marginTop: '8px' }} className={styles.response}>{parse(data?.parrafoDos)}</p>


          </div>
        </div>


        <div style={{ width: '100%', backgroundColor: '#bababa', height: '1px', margin: '0' }} />
        {/* <SeccionPrincipalArticulo titulo={data?.tituloPrincipal} tituloParrafo={data.tituloParrafoUno} parrafoUno={data?.parrafoUno} parrafoDos={data?.parrafoUnoDos} parrafoTres={data?.parrafoUnoTres} video={data?.videoUrlUno} />

        {data?.tituloParrafoDos && <SeccionSecundaria img={data?.imgParrafoDos} tituloParrafo={data.tituloParrafoDos} parrafoUno={data?.parrafoDos} parrafoDos={data?.parrafoDosDos} parrafoTres={data?.parrafoDosTres} video={data?.videoUrlDos} />}

        {data?.tituloParrafoTres && <SeccionSecundaria img={data?.imgParrafoTres} tituloParrafo={data.tituloParrafoTres} parrafoUno={data?.parrafoTres} parrafoDos={data?.parrafoTresDos} parrafoTres={data?.parrafoTresTres} video={data?.videoUrlTres} />}

        {data?.tituloParrafoCuatro && <SeccionSecundaria img={data?.imgParrafo} tituloParrafo={data.tituloParrafoCuatro} parrafoUno={data?.parrafoCuatro} parrafoDos={data?.parrafoCuatroDos} parrafoTres={data?.parrafoCuatroTres} video={data?.videoUrlCuatro} />}

        {data?.tituloParrafoCinco && <SeccionSecundaria img={data?.imgParrafoCinco} tituloParrafo={data.tituloParrafoCinco} parrafoUno={data?.parrafoCinco} parrafoDos={data?.parrafoCincoDos} parrafoTres={data?.parrafoCincoTres} video={data?.videoUrlCinco} />}

        {data?.tituloParrafoSeis && <SeccionSecundaria img={data?.imgParrafoSeis} tituloParrafo={data.tituloParrafoSeis} parrafoUno={data?.parrafoSeis} parrafoDos={data?.parrafoSeisDos} parrafoTres={data?.parrafoSeisTres} video={data?.videoUrlSeis} />} */}
        {/* <OtrosArticulos img={data?.imgPrincipal} /> */}

        <ArticulosRelacionados />
        <BottomArticulo palabras={data?.palabrasClave} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const parts = query?.id?.split('-');
  const id = parts[parts.length - 1];
  const { data } = await client.query(
    {
      query: GET_ARTICULO,
      variables: { id: id }
    }
  )
  const result = await client.mutate(
    {
      mutation: CREATE_VISTA_ARTICULO,
      variables: { id: id }
    }
  )

  return {
    props: {
      data: data?.getArticulo,
    },
  };
}