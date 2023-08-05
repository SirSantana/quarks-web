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
import articulos from '../../utils/articulosrepuestos.json'
import AsideGlosario from "@/src/Components/Articulos/AsideGlosario";

export default function Repuesto({ data }) {
  const router = useRouter()
  useEffect(() => {
    const element = document.querySelector('[data-tilt]');
    VanillaTilt.init(element);
  }, []);
  return (
    <Layout title={data?.parrafoSeisDos ? data?.parrafoSeisDos:data?.tituloPrincipal} description={data?.descripcion} keywords={data?.keywords} type='article' fecha={data?.fecha} image={data?.imgPrincipal} tags={data?.palabrasClave} url={router?.asPath}>

      <div className={styles.containerGridAside}>
        {/* <AsideGlosario /> */}

        <div className={styles.container}>
          {/* <HeaderHome /> */}
          <HeaderDiccionario tema={data?.tema} tiempo={data?.tiempoLectura} id={data?.id} img={data?.imgPrincipal} titulo={data?.parrafoSeisDos ? data?.parrafoSeisDos : data?.subtituloPrincipal} />
          {data?.parrafoSeis ?
            parse(data?.parrafoSeis)
            :
            <>
              <div className={styles.containerGrid}>
                <div data-tilt className={styles.foto}>
                  <img src={data?.imgPrincipal} className={styles.imgRepuesto} />

                </div>
                <div className={styles.seccion1}>
                  <ion-icon style={{ fontSize: '24px', marginBottom: '8px' }} name="cog-outline"></ion-icon>

                  <h2 className={styles.question}>{data.tituloParrafoUno}</h2>
                  <p style={{ fontSize: '12px', lineHeight: '20px', marginTop: '8px' }} className={styles.response}>{parse(data?.parrafoUno)} </p>

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


// <img src='https://azurequarks.blob.core.windows.net/repuestos/alternadorrepuesto17062023.jpg' alt='¿Que es el alternador de un carro?' className={{styles.imgRepuesto}}/> <br/><br/>

// <br><br>

// <h2>¿Qué es el alternador de un carro?</h2>
// <br>
// <p  style="line-height: 1.8;">El alternador de un carro es un pequeño generador eléctrico que se encuentra en el compartimiento del motor. Su función principal es convertir la energía mecánica generada por el motor en energía eléctrica. <br> <br> ¿Por qué es esto importante? Porque esta energía es la que alimenta todos los dispositivos eléctricos de tu vehículo mientras estás en movimiento. <br/><br> Desde las luces y la radio hasta los sistemas más avanzados, como la computadora de abordo y el sistema de navegación, todos dependen del suministro de energía del alternador.</p>
// <br><br>

// <h2>¿Para qué sirve el alternador de un carro?</h2><br>
// <p style="line-height: 1.8;">El alternador de carro tiene un papel vital que desempeñar en el sistema eléctrico de tu vehículo. Sus funciones más importantes son:</p><br>
// <ul>
//     <li style="line-height: 1.8;">Suministrar energía a todos los dispositivos eléctricos del carro.</li><br>
//     <li style="line-height: 1.8;">Recargar la batería del carro para que siempre esté lista para arrancar el motor.</li><br>
//     <li style="line-height: 1.8;">Mantener el funcionamiento del motor al proporcionar la energía necesaria para su operación.</li>
// </ul>
// <br><br>

// <h2>¿Cuánto dura un alternador de un auto?</h2><br>
// <p style="line-height: 1.8;">La vida útil de un alternador de carro puede variar según diversos factores, como la marca y la calidad del componente, así como las condiciones de uso y mantenimiento.<br/><br>  En promedio, un alternador bien cuidado puede durar entre 8 y 12 años. Sin embargo, es esencial estar atento a señales de desgaste o problemas para poder realizar un reemplazo a tiempo y evitar daños mayores en el sistema eléctrico del vehículo.</p>
// <br><br>

// <h2>¿Cuáles son las fallas más comunes del alternador?</h2> <br/>
// <p style="line-height: 1.8;">Aunque el alternador es una pieza duradera, con el tiempo, puede experimentar desgaste y fallas. Algunas de las fallas más comunes incluyen:</p> 
// <br/><ul> <li style="line-height: 1.8;"><strong>Falla en el regulador de voltaje:</strong> Puede provocar fluctuaciones en la energía eléctrica suministrada al sistema, lo que afecta el funcionamiento de los dispositivos eléctricos.</li> <br/> <li style="line-height: 1.8;"><strong>Desgaste de los rodamientos:</strong> Provoca ruidos anormales, como chirridos o zumbidos, que indican la necesidad de revisión o reemplazo del alternador.</li> <br/> <li style="line-height: 1.8;"><strong>Correas desgastadas o rotas:</strong> Si las correas que conectan el alternador con el motor están en mal estado, el alternador no funcionará correctamente.</li> <br/> <li style="line-height: 1.8;"><strong>Escobillas desgastadas:</strong> Las escobillas son componentes internos del alternador que pueden desgastarse y provocar problemas en su funcionamiento.</li> </ul> 
// <br>


// <br><br>
// <h2>Partes del alternador:</h2>
// <ul><br>
// <li style="line-height: 1.8;"><b>Rotor:</b> Bobina de alambre de cobre</li><br>
// <li style="line-height: 1.8;"><b>Estator:</b> Formado por un conjunto de bobinas de alambre de cobre alrededor del rotor</li><br>
// <li style="line-height: 1.8;"><b>Puente rectificador:</b> Convierte la corriente alterna, en corriente continua, para ser utilizada por los componentes electricos del vehiculo</li><br>
// <li style="line-height: 1.8;"><b>Regulador de voltaje:</b> Controla la cantidad de energía generada, y se asegura de mantener los niveles indicados.</li>
// </ul>
// <br><br>
// <h2>¿Qué pasa cuando se daña el alternador de un carro?</h2><br>
// <p style="line-height: 1.8;">Cuando el alternador de un carro se daña o deja de funcionar adecuadamente, pueden ocurrir varias situaciones problemáticas:</p><br>
// <ul>
//     <li style="line-height: 1.8;">Descarga de la batería: Sin el suministro de energía del alternador, la batería del auto se agotará y el vehículo no podrá arrancar.</li><br>
//     <li  style="line-height: 1.8;">Problemas eléctricos: Los dispositivos eléctricos del carro, como luces y radio, pueden dejar de funcionar correctamente.</li><br>
//     <li  style="line-height: 1.8;">Fallo del motor: El vehículo puede detenerse repentinamente mientras está en movimiento debido a la falta de energía eléctrica para mantener el motor funcionando.</li><br>
// </ul>
// <br><br>

// <h2>Conclusión:</h2><br>
// <p style="line-height: 1.8;">El alternador de carro es un componente esencial que desempeña un papel crucial en el sistema eléctrico y el funcionamiento general del vehículo. <br/><br> Como conductor responsable, es importante estar atento a cualquier señal de falla y realizar un mantenimiento adecuado para prolongar la vida útil del alternador.<br><br>Si alguna vez te encuentras con problemas eléctricos en tu carro, no dudes en acudir a un mecánico de confianza para realizar una revisión y posible reparación del alternador.</p>
// <br><br>


//    <img src='https://azurequarks.blob.core.windows.net/repuestos/cajadedireccion20062023.png' alt='¿Por qué se daña la cremallera de un carro?' className={{styles.imgRepuesto}}/> <br/><br/>
// <h2 >¿Qué es la Cremallera de Dirección?</h2><br/>
//     <p style="line-height: 1.8;">La <b>cremallera de dirección</b> es una pieza mecánica que forma parte del sistema de dirección del vehículo. <br/><br/>Es una barra de metal dentada que se encuentra en el extremo de la columna de dirección y está conectada a las ruedas delanteras del automóvil. <br/><br/>Cuando giras el volante, la cremallera de dirección convierte ese movimiento en un movimiento lineal que permite que las ruedas cambien de dirección y te permitan conducir el vehículo en la dirección deseada.</p>
//     <br/><br/>
//     <h2 >¿Cómo Funciona la Cremallera de Dirección?</h2><br/>
//     <p style="line-height: 1.8;">La cremallera de dirección funciona mediante un sistema de piñón y cremallera.<br/><br/> Cuando giras el volante, el piñón, que es una pieza dentada en el extremo de la columna de dirección, engrana con la cremallera, que también es dentada. <br/><br/>A medida que giras el volante, la cremallera se desplaza hacia adelante o hacia atrás, lo que a su vez mueve las ruedas delanteras para cambiar la dirección del vehículo.</p>
//     <br/><br/>
//     <h2 >¿Qué Pasa Cuando Falla la Cremallera de Dirección?</h2><br/>
//     <p style="line-height: 1.8;">Cuando la <b>cremallera de dirección</b> falla, pueden ocurrir problemas graves en el manejo del vehículo. Algunos síntomas de una cremallera de dirección defectuosa incluyen:</p>
//     <ul style="line-height: 1.8;"><br/>
//         <li><b>Dificultad para Girar el Volante:</b> Si notas que el volante está más duro de lo normal o requiere un esfuerzo excesivo para girar, puede ser un signo de un problema con la cremallera de dirección.</li><br/>
//         <li><b>Ruidos Extraños:</b> Ruidos de chirrido o rechinamiento al girar el volante pueden indicar desgaste o daños en la cremallera.</li><br/>
//         <li><b>Fugas de Aceite:</b> Si ves que la cremallera de dirección está goteando aceite, puede ser un indicio de una falla interna.</li>
//     </ul>
//     <br/><br/>
//     <h2 >¿Qué Hacer si la Cremallera de Dirección Tira Aceite?</h2><br/>
//     <p style="line-height: 1.8;">Si notas una fuga de aceite proveniente de la <b>cremallera de dirección</b>, es importante que acudas a un taller mecánico de confianza lo antes posible. <br/><br/>Las fugas de aceite pueden afectar el rendimiento y la vida útil de la cremallera, y si no se aborda a tiempo, puede llevar a problemas más graves en la dirección del vehículo.</p>
//     <br/><br/>
//     <h2 >¿Cómo Saber si la Cremallera de Dirección Está Dañada?</h2><br/>
//     <p style="line-height: 1.8;">Si sospechas que la <b>cremallera de dirección</b> está dañada, es fundamental que la revises con prontitud. Algunos indicios de que puede estar dañada incluyen:</p>
//     <ul style="line-height: 1.8;">
//         <li><b>Vibraciones en el Volante:</b> Si el volante tiembla o vibra anormalmente al conducir, podría ser un síntoma de una cremallera de dirección dañada.</li><br/>
//         <li><b>Juego Excesivo en el Volante:</b> Si sientes que el volante tiene un juego excesivo, es decir, se mueve más de lo normal antes de que las ruedas respondan, puede ser un indicio de una cremallera desgastada.</li><br/>
//         <li><b>Desgaste Irregular de los Neumáticos:</b> Si los neumáticos muestran un desgaste desigual o irregular, puede ser consecuencia de un problema en la dirección.</li>
//     </ul>
//     <br/><br/>
//     <h2 >¿Qué Tipos de Cremalleras de Dirección Existen?</h2><br/>
//     <p style="line-height: 1.8;">Existen diferentes tipos de cremalleras de dirección, incluyendo cremalleras hidráulicas y eléctricas.<br/><br/> Las cremalleras hidráulicas utilizan un sistema de fluido para facilitar el movimiento, mientras que las cremalleras eléctricas utilizan un motor eléctrico.<br/><br/> Cada tipo tiene sus ventajas y desventajas, y la elección dependerá del fabricante y modelo del vehículo.</p>
//     <br/><br/>
//   <h2 >Donde cambiar o revisar la cremallera de la direccion de un carro en Bogota?</h2><br/>
//   <p><a href="/">Aquí</a> encuentras mas de 100 talleres al servicio de tu carro, visita algunos los mejores talleres para tu carro <a href="/servicios-automotriz/Servicio%20de%20Suspensión-Bogota,%20Colombia">aquí</a></p> <br/><br/>
  // <p style="line-height: 1.8;">En conclusión, el <b>cigüeñal</b> es una pieza vital para el funcionamiento del motor y, por ende, del vehículo en su totalidad. </p>


