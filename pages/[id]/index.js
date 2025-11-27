import { client } from "@/client";
import { GET_ONE_NEGOCIOVDOS } from "@/graphql/queries";
import Layout from "@/src/Components/Layout";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import styles from "@/styles/Negocio.module.css";
import Image from "next/image";
import dynamic from "next/dynamic";
import SectionDataSeo from "@/src/Components/Talleres/V3/SectionDataSeo";
import Button from "@/src/Components/Button/Button";
import { getLatLng } from "@/utils/scripts";
import { ModalImagePerfil } from "@/utils/Modales";
import renderStars from "@/utils/renderStars";
import { ExternalLink, MapPin } from "lucide-react";
import AIAssistantBubble from "@/src/Components/Talleres/V3/AiAssitantBubble";

const RedesSociales = dynamic(
  () => import("@/src/Components/Talleres/RedesSociales"),
  { ssr: false }
);

const SectionPreguntasFrecuentes = dynamic(
  () => import("@/src/Components/Talleres/V3/SectionPreguntasFrecuentes"),
  { ssr: false }
);
const SectionDescription = dynamic(
  () => import("@/src/Components/Talleres/V3/SectionDescription"),
  { ssr: false }
);
const Revisiones = dynamic(
  () => import("@/src/Components/Talleres/Revisiones"),
  { ssr: false }
);

const SectionCategorias = dynamic(
  () => import("@/src/Components/Talleres/V3/SectionCategorias"),
  { ssr: false }
);
const CardSolicitarServicio = dynamic(
  () => import("@/src/Components/Talleres/V3/CardSolicitarServicio"),
  { ssr: false }
);

const RecomiendasTaller = dynamic(
  () => import("@/src/Components/Talleres/RecomiendasTaller"),
  { ssr: false }
);
const SliderTab = dynamic(
  () => import("@/src/Components/Talleres/V3/SliderTab"),
  { ssr: false, loading: () => <div className={styles.skeletonSlider} /> }
);
const Horario = dynamic(() => import("@/src/Components/Talleres/V3/Horario"), {
  ssr: false,
});
const Reseñas = dynamic(() => import("@/src/Components/Talleres/Reseñas"), {
  ssr: false,
});

const MapaUbicacion = dynamic(
  () => import("@/src/Components/Talleres/MapaUbicacion"),
  { ssr: false, loading: () => <div className={styles.skeletonMap} /> }
);
const MapaCobertura = dynamic(
  () => import("@/src/Components/Talleres/MapaBogotaCobertura"),
  { ssr: false, loading: () => <div className={styles.skeletonMap} /> }
);

const servicios = [
  "Cambio de Aceite",
  "Alineación y Balanceo",
  "Revisión de frenos",
  "Cambio de filtros",
  "Reparación de suspensión",
  "Revisión de batería",
  "Diagnóstico electrónico",
  "Cambio de llantas",
];
export default function NegocioVDos({ data, loading }) {
  const router = useRouter();
  const [visibleModalImage, setVisibleModalImage] = useState(false);
  const [visibleModalSolicitarServicio, setVisibleModalSolicitarServicio] =
    useState(false);
  let descripcionTaller = `Taller ubicado en ${data?.direccion}. ${
    data?.localidad
  }, ${data?.ciudad}. Consulta disponibilidad aqui o al ${data?.telefono} - ${
    data?.whatsapp
  }. Taller especializado en${data?.categorias?.map(
    (el) => " " + el
  )}. Horario ${data?.horario}.`;
  let descripcionMecanico = `Mecanico a domicilio, zona de cobertura Bogota y alrededores. Consulta disponibilidad aqui o al ${
    data?.telefono
  } - ${data?.whatsapp}. Servicio especializado en${data?.categorias?.map(
    (el) => " " + el
  )}. Horario ${data?.horario}.`;
  let descripcionAlmacen = `Almacen de repuestos especializado en${data?.marcasAutos?.map(
    (el) => " " + el
  )}. Estamos ubicados en la ${data?.direccion}. ${data?.localidad}, ${
    data?.ciudad
  }. Consulta disponibilidad aqui o al ${data?.telefono} - ${data?.whatsapp}`;

  const horariosSeparados = data?.horario?.split(",");
  const mapSectionRef = useRef(null);
  const refServicios = useRef(null);
  const refHorarios = useRef(null);
  const refReseñas = useRef(null);
  const refAcercaDe = useRef(null);
  const refRedes = useRef(null);

  const handleClickReseñasSection = () => {
    router.push(`${router.asPath}/crear-resena?ide=${data?.id}`);
  };
  const handleChangeSection = ({ ref }) => {
    if (!ref.current) {
      return;
    }
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  const position = getLatLng({ data: data });
  const openModal = () => {
    router.push(`${router.asPath}?modalSolicitar=${data.id}`, undefined, {
      shallow: true,
      scroll: false,
    });
    setVisibleModalSolicitarServicio(true);
  };
  console.log(data);
  const sections = [
    { id: "ubicacion", label: "Ubicación" },
    { id: "servicios", label: "Servicios" },
    { id: "horarios", label: "Horarios" },
    { id: "contacto", label: "Contacto" },
    { id: "resenas", label: "Reseñas" },
    { id: "preguntas", label: "Preguntas" },
    { id: "acerca", label: "Acerca de" },
  ];
  // if(loading){return <h1>Cargando...</h1>}

  return (
    <Layout
      title={`${data?.nombre} - ${data?.ciudad}`}
      negocio={true}
      description={
        data?.tipo === "Almacen"
          ? descripcionAlmacen
          : data?.tipo === "Mecanico a Domicilio"
          ? descripcionMecanico
          : descripcionTaller
      }
      image={
        data?.fotoperfil
          ? data?.fotoperfil
          : "https://azurequarks.blob.core.windows.net/negocios/fotostoredefault.png"
      }
      url={router?.asPath}
      keywords={`${
        data?.categorias?.map(
          (el) => " Talleres de " + el + " en " + data?.ciudad
        ) +
        ", " +
        data?.nombre
      }`}
      tags={data?.categorias}
      icon={data?.fotoperfil}
      visibleSlider={false}
      visibleNavbar={false}
      ads={false}
    >
      <section className="w-full max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 lg:p-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8">
          {/* Profile Info */}
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 flex-1">
            {/* Profile Image */}
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <img
                src={data?.fotoperfil}
                alt={`${data?.nombre}`}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover cursor-pointer transition-transform duration-300 hover:scale-105 border border-gray-200"
                onClick={() => setVisibleModalImage(true)}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
             <div className="inline-block bg-gray-100 border border-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider mb-3">
                {data?.tipo == "Almacen"
                  ? "Almacén de Autopartes"
                  : data?.tipo == "Mecanico a Domicilio"
                  ? "Mecánico a domicilio"
                  : "Taller Mecánico"}{" "}
                de {data?.vehiculo ? data?.vehiculo : "Carros"}
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight leading-tight">
                {data?.nombre}
              </h1>
              
              <div className="flex items-start gap-2 text-gray-600 mb-3 justify-center sm:justify-start">
                <span className="text-lg mt-0.5">📍</span>
                <p className="text-sm sm:text-base font-medium">
                  {data?.direccion}. {data?.ciudad}
                </p>
              </div>

              {data?.promediocalificacionesmaps > 0 && (
                <div className="flex items-center gap-2 text-sm sm:text-base justify-center sm:justify-start">
                  <div className="flex gap-0.5 text-lg">
                    {renderStars(Number(data?.promediocalificacionesmaps))}
                  </div>
                  <span className="font-semibold text-gray-900">
                    {data?.promediocalificacionesmaps}
                  </span>
                  <span className="text-gray-500">
                    ({data?.numerocalificacionesmaps || 1} reseñas)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* CTA Button */}
          {/* <button
            onClick={openModal}
            className="w-full lg:w-auto lg:self-start bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 whitespace-nowrap text-base"
          >
            Solicitar Revisión
          </button> */}
        </div>
      </div>

      {/* Modal Image */}
      {visibleModalImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setVisibleModalImage(false)}
        >
          <div className="relative max-w-4xl w-full">
            <button 
              className="absolute -top-12 right-0 text-white text-4xl font-light hover:text-gray-300 transition-colors"
              onClick={() => setVisibleModalImage(false)}
            >
              ×
            </button>
            <img
              src={data?.fotoperfil}
              alt={data?.nombre}
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      )}
    </section>

      <section style={{marginTop:'5%'}} className={styles.sectionContent}>
        <div ref={mapSectionRef} className={styles.contentContainer}>
          <SliderTab sections={sections} />
          <section className={styles.sectionMainContent}>
            <div className={styles.mapSection}>
              <section id={sections[0].id} className="scroll-mt-20 py-12 sm:py-16">
                {/* Title */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-lg bg-[#407BFF]/10 flex items-center justify-center">
                    <MapPin size={18} className="text-[#407BFF]" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Ubicación de {data?.nombre}
                  </h2>
                </div>

                {/* Map Component */}
                <div className="relative mb-5">
                  {data.tipo === "Mecanico a Domicilio" ? (
                    <MapaCobertura
                      coordenadas={data?.coordenadas || position}
                      img={data?.fotoperfil}
                      // direccion={fullAddress}
                      nombre={data?.nombre}
                    />
                  ) : (
                    <MapaUbicacion
                      ubicacion={data?.ubicacionmaps}
                      username={data?.userName}
                      idNegocio={data?.id}
                      nombre={data?.nombre}
                      // direccion={fullAddress}
                      coordenadas={data?.coordenadas || position}
                      img={data?.fotoperfil}
                    />
                  )}
                </div>

                {/* Address Card */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#407BFF]/10 flex items-center justify-center shrink-0">
                      <MapPin size={22} className="text-[#407BFF]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-base mb-1">
                        {data?.direccion}
                      </p>
                      <p className="text-sm text-gray-600">
                        {data?.localidad && `${data.localidad}, `}
                        {data?.ciudad}
                      </p>
                    </div>
                  </div>
<AIAssistantBubble tallerName="TALLER MEKAUTOS" />
                  {/* Button to open in Maps */}
                  {data?.urltallermaps && (
                    <a
                      href={data.urltallermaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#407BFF] hover:bg-[#3668d9] text-white rounded-lg text-sm font-semibold transition-all whitespace-nowrap shadow-lg shadow-[#407BFF]/20 hover:shadow-xl hover:shadow-[#407BFF]/30"
                    >
                      <span>Abrir en Maps</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </section>

              <div
                ref={refServicios}
                id={sections[1].id}
                style={{
                  width: "100%",
                  backgroundColor: "#CFD5E1",
                  height: "1px",
                  margin: "16px 0 48px 0",
                }}
              />

              <SectionCategorias data={data} />
              <section className={styles.sectionCardContainer}>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#CFD5E1",
                    height: "1px",
                    margin: "48px 0 48px 0",
                  }}
                />
                <CardSolicitarServicio
                  visibleModalSolicitarServicio={visibleModalSolicitarServicio}
                  setVisibleModalSolicitarServicio={
                    setVisibleModalSolicitarServicio
                  }
                  openModal={openModal}
                />
              </section>

              <div
                style={{
                  width: "100%",
                  backgroundColor: "#CFD5E1",
                  height: "1px",
                  margin: "48px 0 48px 0",
                }}
              />

              <RecomiendasTaller
                onClick={handleClickReseñasSection}
                nombre={data?.nombre}
              />

              <section
                style={{
                  display: "flex",
                  gap: "8px",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <SectionDataSeo data={data} />
              </section>

              <div
                ref={refHorarios}
                id={sections[2].id}
                style={{
                  width: "100%",
                  backgroundColor: "#CFD5E1",
                  height: "1px",
                  margin: "48px 0 48px 0",
                }}
              />
              <Horario horariosSeparados={horariosSeparados} />

              {(data?.facebook ||
                data?.instagram ||
                data?.whatsapp ||
                data?.paginaweb) && (
                <>
                  <div
                    ref={refRedes}
                    id={sections[3].id}
                    style={{
                      width: "100%",
                      backgroundColor: "#CFD5E1",
                      height: "1px",
                      margin: "48px 0",
                    }}
                  />
                  <RedesSociales data={data} />
                </>
              )}

              <div
                style={{
                  width: "100%",
                  backgroundColor: "#CFD5E1",
                  height: "1px",
                  margin: "48px 0 48px 0",
                }}
              />

              <section
                style={{
                  display: "flex",
                  gap: "32px",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Revisiones id={data?.id} />
              </section>

              <div
                ref={refReseñas}
                id={sections[4].id}
                style={{
                  width: "100%",
                  backgroundColor: "#CFD5E1",
                  height: "1px",
                  margin: "48px 0 48px 0",
                }}
              />

              <section
                style={{
                  display: "flex",
                  gap: "32px",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Reseñas
                  id={data?.id}
                  ctdCalificaciones={data?.numerocalificacionesmaps}
                  urlMaps={data.urltallermaps}
                  nombre={data?.nombre}
                  promCalificacion={data?.promediocalificacionesmaps}
                />
              </section>

              <div
                style={{
                  width: "100%",
                  backgroundColor: "#CFD5E1",
                  height: "1px",
                  margin: "48px 0 48px 0",
                }}
              />

              <section
                style={{
                  display: "flex",
                  gap: "32px",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <SectionPreguntasFrecuentes data={data} />
              </section>
              <section
                style={{
                  display: "flex",
                  gap: "32px",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <SectionDescription data={data} />
              </section>
            </div>
            <aside className={styles.stickyAside}>
              <CardSolicitarServicio
                visibleModalSolicitarServicio={visibleModalSolicitarServicio}
                setVisibleModalSolicitarServicio={
                  setVisibleModalSolicitarServicio
                }
                openModal={openModal}
              />
            </aside>
          </section>
        </div>
        <section className={styles.containerButtonsMobile}>
          <Button onClick={openModal} className={"mobileButton"}>
            Solicitar Revision
          </Button>
        </section>
      </section>

      {visibleModalImage && (
        <ModalImagePerfil
          img={data?.fotoperfil}
          setVisibleModalImage={setVisibleModalImage}
        />
      )}
      {/* {visibleModalSolicitarServicio && <ModalSolicitarServicio setVisibleModalSolicitarServicio={setVisibleModalSolicitarServicio} />} */}
    </Layout>
  );
}

export async function getStaticPaths() {
  // Si puedes obtener todas las rutas en build time, agrégalas aquí
  return {
    paths: [], // Puedes pre-generar algunas rutas si lo deseas
    fallback: "blocking", // Si no está pre-generado, intentará generarlo en la petición
  };
}

export async function getStaticProps({ params }) {
  const parts = params?.id?.replace(/&/g, "");

  try {
    const { data } = await client.query({
      query: GET_ONE_NEGOCIOVDOS,
      variables: { userName: parts },
      fetchPolicy: "network-only", // Para asegurar datos frescos en cada build
    });

    if (parts === "s&i_master_paint") {
      return {
        redirect: {
          destination: "/si_master_paint",
          permanent: false, // Se usa 302 en lugar de 301
        },
      };
    }

    if (!data?.getOneNegocioVDos) {
      return {
        notFound: true, // Muestra la página 404 de Next.js
      };
    }

    return {
      props: {
        data: data.getOneNegocioVDos,
      },
      // revalidate: 100000000000000,
    };
  } catch (error) {
    console.error("Error en getStaticProps:", error);
    return {
      notFound: true,
    };
  }
}
