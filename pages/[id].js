import Layout from "@/src/Components/Layout"
import { useRouter } from "next/router"
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useEffect, useRef, useState, } from "react"
import talleres from '../pages/servicios-automotriz/talleres.json'
import { GET_CALIFICACION_OPINIONES, GET_ONE_NEGOCIOVDOS, } from "@/graphql/queries"
import { client } from "@/client"
import { ModalShareArticulo, ModalTelefono } from "@/utils/Modales"
import ModalCreateOpinion from "@/src/Components/Almacenes/ModalCreateOpinion"
import Opiniones from "@/src/Components/Almacenes/Opiniones"
import { useMutation, useQuery } from "@apollo/client"
import { CREATE_CLICK_COMPARTIDO, CREATE_CLICK_MAPA, CREATE_CLICK_TELEFONO, CREATE_VISITA_ALMACEN, CREATE_VISITA_WHATSAPP } from "@/graphql/mutations"
import Link from "next/link"
import AlmacenesSugeridos from "@/src/Components/Almacenes/AlmacenesSugeridos"
import Horario from "@/src/Components/Talleres/Horario"
import DatosImportantes from "@/src/Components/Talleres/DatosImportantes"
import ServidosOfrecidos from "@/src/Components/Talleres/ServiciosOfrecidos"
import MapaUbicacion from "@/src/Components/Talleres/MapaUbicacion"
import Galeria from "@/src/Components/Talleres/Galeria"
import Reseñas from "@/src/Components/Talleres/Reseñas"
import CardPerfil from "@/src/Components/Talleres/CardPerfil"
import HeaderHorario from "@/src/Components/Talleres/HeaderHorario"
import VUnoTallerDesktop from "@/src/Components/Talleres/V1TallerDesktop"
import ButtonsFooter from "@/src/Components/Talleres/ButtonsFooter"
import RedesSociales from "@/src/Components/Talleres/RedesSociales"


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
export default function Negocio({ data, }) {
  const router = useRouter()
  const [taller, setTaller] = useState(null)
  const [talleresSimilares, setTalleresSimilares] = useState([])
  const [visibleModalTelefono, setVisibleModalTelefono] = useState(false)
  const [visibleShareArticulo, setVisibleShareArticulo] = useState(false)
 
  const [visibleFullHorario, setVisibleFullHorario] = useState(false)
  const reff = useRef(null)
  const horariosSeparados = data?.horario.split(',');

  const handleScroll = () => {
    reff?.current?.scrollToRef();
  };
 
  const handleVisibleHorario = () => {
    setVisibleFullHorario(!visibleFullHorario)
  }

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
  console.log(data?.fotossecundarias);

  let descripcionTaller = `Taller especializado en${data?.categorias.map(el => " " + el)}. Estamos ubicados en la ${data?.direccion}. ${data?.localidad}, ${data?.ciudad}. Consulta disponibilidad aqui o al ${data?.telefono} - ${data?.whatsapp}`
  let descripcionAlmacen = `Almacen de repuestos especializado en${data?.marcasAutos?.map(el => " " + el)}. Estamos ubicados en la ${data?.direccion}. ${data?.localidad}, ${data?.ciudad}. Consulta disponibilidad aqui o al ${data?.telefono} - ${data?.whatsapp}`
  return (
    <Layout title={`${data?.nombre} `} description={data?.tipo === 'Almacen' ? descripcionAlmacen:descripcionTaller} image={data?.fotoperfil ? data?.fotoperfil : 'https://azurequarks.blob.core.windows.net/negocios/fotostoredefault.png'} url={router?.asPath} keywords={`${data?.categorias.map(el => " Talleres de " + el + " en " + data?.ciudad)}`} tags={data?.categorias} icon={data?.fotoperfil} visibleSlider={false}>
      <div className={styles.containerMobile} >

        <HeaderHorario handleScroll={handleScroll} visibleFullHorario={visibleFullHorario} setVisibleFullHorario={setVisibleFullHorario} horario={data?.horario}/>

        <CardPerfil data={data} />

        <ServidosOfrecidos data={data} />

        <DatosImportantes data={data} ref={reff} setVisibleModalTelefono={setVisibleModalTelefono} />

        <Horario horariosSeparados={horariosSeparados} handleVisibleHorario={handleVisibleHorario} visibleFullHorario={visibleFullHorario} handleScroll={handleScroll} />

        {data?.facebook && <RedesSociales data={data}/>}
        <MapaUbicacion taller={taller} />

        {data?.fotossecundarias.length>1 && <Galeria data={data} />}

        {/* <Reseñas id={data?.id} numeroCalificacionesMaps={data?.numerocalificacionesmaps} /> */}

        <ButtonsFooter data={data}/>


      </div>

      <VUnoTallerDesktop data={data}/>

      {visibleShareArticulo && <ModalShareArticulo setVisibleShareArticulo={setVisibleShareArticulo} url={`https://www.quarks.com.co${router?.asPath}`} />}
      {visibleModalTelefono && <ModalTelefono taller={data?.nombre} telefono={data?.telefono} setVisibleModalTelefono={setVisibleModalTelefono} />}
    </Layout >

  )
}

export async function getServerSideProps({ query, res }) {
  const parts = query?.id;
  const { data } = await client.query(
    {
      query: GET_ONE_NEGOCIOVDOS,
      variables: { id: parts }
    }
  )
  const result = await client.mutate(
    {
      mutation: CREATE_VISITA_ALMACEN,
      variables: { id: parts }
    }
  )

  if (!data?.getOneNegocioVDos) {
    res.setHeader('Location', '/404'); // Cambia '/nueva-ruta' a la ruta deseada
    res.statusCode = 302; // Código de estado 302 para redirección temporal
    res.end();
    return { props: {} };
  }

  return {
    props: {
      data: data?.getOneNegocioVDos,
    },
  };
}