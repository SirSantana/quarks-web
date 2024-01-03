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
import parse from 'html-react-parser';
import articulos from '../../utils/articulosrepuestos.json'
import AsideGlosario from "@/src/Components/Articulos/AsideGlosario";

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

      <div className={styles.containerGridAside}>
        <AsideGlosario />

        <div className={styles.container}>
          {/* <HeaderHome /> */}
          <HeaderDiccionario tema={data?.tema} tiempo={data?.tiempoLectura} id={data?.id} img={data?.imgPrincipal} titulo={data?.parrafoSeisDos ? data?.parrafoSeisDos : data?.subtituloPrincipal} />
          {data?.parrafoSeis ?
            parse(data?.parrafoSeis)
            :
            <>
              <div className={styles.containerGrid}>
                <div  className={styles.foto}>
                  <img src={data?.imgPrincipal} className={styles.imgRepuesto} />

                </div>
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


  //   <img src='https://azurequarks.blob.core.windows.net/repuestos/inyector260623.jpeg' alt='Por qué deja de funcionar un inyector?' className={{styles.imgRepuesto}}/> <br/><br/>
  //   <h2 >¿Qué es el Inyector de Combustible?</h2><br/>
  // <p style="line-height: 1.8;">Los inyectores de combustible son componentes esenciales en los sistemas de inyección de combustible de los vehículos. <br/><br/>Su función principal es suministrar la cantidad precisa de combustible al motor en el momento adecuado para asegurar una combustión eficiente. <br/><br/>En otras palabras, son como los "rociadores" de gasolina que alimentan el motor de tu automóvil.</p>

  // <br/><br/>

  // <h2 >¿Cómo funciona el Inyector de Combustible?</h2><br/>
  // <p style="line-height: 1.8;">El funcionamiento del inyector de combustible es bastante ingenioso y preciso.<br/><br/> Estos pequeños dispositivos cuentan con una boquilla de pulverización que rocía el combustible directamente en la cámara de combustión del motor.<br/><br/> La cantidad de combustible que se inyecta se regula electrónicamente mediante el sistema de control del vehículo.</p><br/><br/>
  // <p style="line-height: 1.8;">El <b>inyector de combustible</b> recibe una señal eléctrica de la ECU (Unidad de Control Electrónico) del automóvil.<br/><br/> Cuando se activa, se abre una válvula que permite que el combustible a alta presión salga a través de la boquilla en forma de aerosol fino. <br/><br/>Este aerosol se mezcla con el aire en la cámara de combustión, creando una mezcla homogénea que se quema eficientemente en el motor.</p>

  // <br/><br/>

  // <h2 >¿Cómo saber si los inyectores están mal?</h2><br/>
  // <p style="line-height: 1.8;">Detectar un inyector de combustible defectuoso puede ser un desafío, pero hay algunos síntomas comunes a los que debes estar atento. Algunos de ellos incluyen:</p><br/>
  // <ul style="line-height: 1.8;">
  //   <li><b>Marcha irregular</b>: Si el motor de tu vehículo comienza a temblar o vibrar de manera irregular, podría ser un indicio de problemas con uno o más inyectores de combustible.</li><br/>
  //   <li><b>Aumento del consumo de combustible</b>: Si notas que el rendimiento de combustible ha disminuido drásticamente, es posible que tengas inyectores defectuosos que no están suministrando la cantidad adecuada de combustible.</li><br/>
  //   <li><b>Humo oscuro del escape</b>: Un inyector defectuoso puede causar una combustión incompleta, lo que provoca la emisión de humo oscuro y sucio desde el escape.</li>
  // </ul>

  // <br/><br/>

  // <h2 >¿Por qué deja de funcionar un inyector?</h2><br/>
  // <p style="line-height: 1.8;">El mal funcionamiento de un inyector de combustible puede deberse a varias razones, entre las cuales se incluyen:</p><br/>
  // <ul style="line-height: 1.8;">
  //   <li><b>Suciedad o depósitos</b>: A lo largo del tiempo, los inyectores pueden obstruirse debido a la acumulación de suciedad o depósitos de combustible que impiden su correcto funcionamiento.</li><br/>
  //   <li><b>Daño eléctrico</b>: Las fluctuaciones de voltaje o problemas eléctricos pueden afectar el circuito del inyector, provocando su falla.</li><br/>
  //   <li><b>Desgaste mecánico</b>: Los inyectores están sometidos a un uso constante y pueden desgastarse con el tiempo, afectando su capacidad de rociar el combustible de manera adecuada.</li>
  // </ul>

  // <br/><br/>

  // <h2 >Cuál es la vida útil de un inyector de gasolina?</h2><br/>
  // <p style="line-height: 1.8;">La vida útil de un inyector de combustible puede variar dependiendo de varios factores, incluyendo la calidad del combustible utilizado, el mantenimiento del vehículo y las condiciones de conducción. <br/><br/>En condiciones ideales, los inyectores pueden durar entre 50,000 y 100,000 kilómetros.</p><br/><br/>
  // <p style="line-height: 1.8;">Para prolongar la vida útil de los inyectores, es importante mantener el vehículo en buen estado, utilizar combustibles de calidad y seguir las recomendaciones de mantenimiento del fabricante.</p>

  // <br/><br/>

  // <h2 >Cuáles son las partes de un inyector?</h2><br/>
  // <p style="line-height: 1.8;">Un inyector de combustible está compuesto por varias partes importantes, entre las cuales se encuentran:</p><br/>
  // <ul style="line-height: 1.8;">
  //   <li><b>Bobina solenoide</b>: Es la encargada de abrir y cerrar la válvula del inyector para permitir el paso del combustible.</li><br/>
  //   <li><b>Boquilla de pulverización</b>: Es la parte que rocía el combustible en forma de aerosol en la cámara de combustión.</li><br/>
  //   <li><b>Filtro</b>: Algunos inyectores cuentan con un filtro que evita la entrada de partículas de suciedad y protege la boquilla.</li><br/>
  //   <li><b>Válvula de aguja</b>: Regula el flujo de combustible y evita posibles goteos o fugas.</li><br/>
  //   <li><b>Conector eléctrico</b>: Es el punto de conexión entre el inyector y la ECU del vehículo, donde recibe la señal eléctrica.</li>
  // </ul>

  //   <br/><br/>
  // <h2 >Donde hacer la revision o cambio de los inyectores de un carro en Bogota?</h2><br/>
  //  <p><a href="/">Aquí</a> encuentras mas de 100 talleres al servicio de tu carro, visita algunos los mejores talleres para tu carro <a href="/servicios-automotriz/Servicio%20de%20Motor-Bogota,%20Colombia">aquí</a></p> <br/><br/>
  //   // <p>En conclusión, el <b>filtro de aceite de un vehículo</b> es un componente vital para garantizar el buen funcionamiento del motor y protegerlo de daños. <br/><br/>Cambiar el filtro de aceite regularmente es esencial para mantener el motor limpio y bien lubricado. Recuerda seguir las recomendaciones del fabricante y cambiar el filtro de aceite cada vez que realices un cambio de aceite.</p>

