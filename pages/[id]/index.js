import { client } from "@/client";
import { GET_ONE_NEGOCIOVDOS } from "@/graphql/queries";
import Layout from "@/src/Components/Layout";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import styles from "@/styles/Negocio.module.css";
import dynamic from "next/dynamic";
import sendWhatsappMessage, { getLatLng } from "@/utils/scripts";
import { ModalImagePerfil } from "@/utils/Modales";
import renderStars from "@/utils/renderStars";
import {
  ExternalLink,
  MapPin,
  Clock,
  Phone,
  Globe,
  MessageCircle,
  Search,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import ComparisonQuoteBanner from "@/src/Components/Talleres/V3/ComparissonQuoteBanner";
import sendMessage from "@/utils/fetching";
import CallModal from "@/src/Components/Talleres/V3/CallModal";

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

const SectionDataSeo = dynamic(
  () => import("@/src/Components/Talleres/V3/SectionDataSeo"),
  { ssr: false }
);

export default function NegocioVDos({ data, loading }) {
  const router = useRouter();
  const [visibleModalImage, setVisibleModalImage] = useState(false);
  const [visibleModalSolicitarServicio, setVisibleModalSolicitarServicio] =useState(false);
 const [isCallModalOpen, setIsCallModalOpen] = useState(false);

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

  const position = getLatLng({ data: data });

  const openModal = () => {
    router.push(`${router.asPath}?modalSolicitar=${data.id}`, undefined, {
      shallow: true,
      scroll: false,
    });
    setVisibleModalSolicitarServicio(true);
  };
  const handleCompareClick = () => {
    router.push(`${router.asPath}/cotizar`);
  };
  const sections = [
    { id: "ubicacion", label: "Ubicación" },
    { id: "servicios", label: "Servicios" },
    { id: "horarios", label: "Horarios" },
    { id: "contacto", label: "Contacto" },
    { id: "resenas", label: "Reseñas" },
    { id: "preguntas", label: "Preguntas" },
    { id: "acerca", label: "Acerca de" },
  ];

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
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left: Image and Basic Info */}
            <div className="flex flex-col sm:flex-row gap-6 flex-1 w-full">
              {/* Profile Image */}
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <img
                  src={data?.fotoperfil}
                  alt={`${data?.nombre}`}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover cursor-pointer transition-all duration-300 hover:shadow-xl border-4 border-white shadow-lg"
                  onClick={() => setVisibleModalImage(true)}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="inline-block bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider mb-3">
                  {data?.tipo == "Almacen"
                    ? "Almacén de Autopartes"
                    : data?.tipo == "Mecanico a Domicilio"
                    ? "Mecánico a domicilio"
                    : "Taller Mecánico"}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                  {data?.nombre}
                </h1>

                <div className="flex items-start gap-2 text-gray-600 mb-4 justify-center sm:justify-start">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-base font-medium">
                    {data?.direccion}, {data?.ciudad}
                  </p>
                </div>

                {data?.promediocalificacionesmaps > 0 && (
                  <div className="flex items-center gap-3 justify-center sm:justify-start mb-4">
                    <div className="flex gap-1">
                      {renderStars(Number(data?.promediocalificacionesmaps))}
                    </div>
                    <span className="font-bold text-gray-900 text-lg">
                      {data?.promediocalificacionesmaps}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({data?.numerocalificacionesmaps || 1} reseñas)
                    </span>
                  </div>
                )}

                {/* Quick Contact Info */}
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  {data?.telefono && (
                    <button
                    onClick={() => setIsCallModalOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="hidden sm:inline">Llamar</span>
                    </button>
                  )}
                  {data?.whatsapp && (
                    <button
                      onClick={()=>sendWhatsappMessage({ numero: data?.whatsapp, path: router?.asPath })}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </button>
                  )}
                  {data?.paginaweb && (
                    <a
                      href={data.paginaweb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      <span className="hidden sm:inline">Sitio web</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <SliderTab sections={sections} />
        </div>
      </section>

      {/* Mobile CTA Card - Sticky below tabs */}
      {data?.whatsapp && (
        <section className="lg:hidden sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="p-4">
            <CardSolicitarServicio
              visibleModalSolicitarServicio={visibleModalSolicitarServicio}
              setVisibleModalSolicitarServicio={
                setVisibleModalSolicitarServicio
              }
              openModal={openModal}
            />
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="w-full bg-gray-50">
        <div className="max-w-7xl mx-auto px-0 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Ubicación Section */}
              <section
                id={sections[0].id}
                className="scroll-mt-24 bg-white border border-gray-200 p-6 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-50 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Ubicación
                  </h2>
                </div>

                <div className="mb-6">
                  {data.tipo === "Mecanico a Domicilio" ? (
                    <MapaCobertura
                      coordenadas={data?.coordenadas || position}
                      img={data?.fotoperfil}
                      nombre={data?.nombre}
                    />
                  ) : (
                    <MapaUbicacion
                      ubicacion={data?.ubicacionmaps}
                      username={data?.userName}
                      idNegocio={data?.id}
                      nombre={data?.nombre}
                      coordenadas={data?.coordenadas || position}
                      img={data?.fotoperfil}
                    />
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-50 border border-gray-200">
                  <div className="flex items-start gap-3 flex-1">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">
                        {data?.direccion}
                      </p>
                      <p className="text-sm text-gray-600">
                        {data?.localidad && `${data.localidad}, `}
                        {data?.ciudad}
                      </p>
                    </div>
                  </div>

                  {data?.urltallermaps && (
                    <a
                      href={data.urltallermaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors whitespace-nowrap"
                    >
                      <span>Abrir en Maps</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </section>

              {/* Servicios Section */}
              <section id={sections[1].id} className="scroll-mt-24">
                <SectionCategorias data={data} />
              </section>

              {/* Horarios Section */}
              <section
                id={sections[2].id}
                className="scroll-mt-24 bg-white border border-gray-200 p-6 sm:p-8"
              >
                <Horario horariosSeparados={horariosSeparados} />
              </section>

              {/* Contacto Section */}
              {(data?.facebook ||
                data?.instagram ||
                data?.whatsapp ||
                data?.paginaweb) && (
                <section
                  id={sections[3].id}
                  className="scroll-mt-24 bg-white border border-gray-200 p-6 sm:p-8"
                >
                  <RedesSociales data={data} />
                </section>
              )}

              {/* Reseñas Section */}
              <section
                id={sections[4].id}
                className="scroll-mt-24 bg-white border border-gray-200 p-6 sm:p-8"
              >
                <Reseñas
                  id={data?.id}
                  ctdCalificaciones={data?.numerocalificacionesmaps}
                  urlMaps={data.urltallermaps}
                  nombre={data?.nombre}
                  promCalificacion={data?.promediocalificacionesmaps}
                />
              </section>

              {/* Revisiones */}
              <section className="bg-white border border-gray-200 p-6 sm:p-8">
                <Revisiones id={data?.id} />
              </section>

              {/* Preguntas Frecuentes */}
              <section
                id={sections[5].id}
                className="scroll-mt-24 bg-white border border-gray-200 p-6 sm:p-8"
              >
                <SectionPreguntasFrecuentes data={data} />
              </section>

              {/* Acerca de */}
              <section
                id={sections[6].id}
                className="scroll-mt-24 bg-white border border-gray-200 p-6 sm:p-8"
              >
                <SectionDescription data={data} />
              </section>

              {/* SEO Data */}
              <section className="bg-white border border-gray-200 p-6 sm:p-8">
                <SectionDataSeo data={data} />
              </section>

              {/* Recomienda el taller */}
              <section className="bg-white border border-gray-200 p-6 sm:p-8">
                <RecomiendasTaller
                  onClick={handleClickReseñasSection}
                  nombre={data?.nombre}
                />
              </section>
              {/* <div className="w-full bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-6 md:p-8 rounded-xl shadow-lg transition duration-300">
      <div className="flex flex-col gap-6">

        <div className="flex items-center gap-4">
          
          <div className="w-10 h-10 bg-blue-600 flex items-center justify-center rounded-lg shadow-md flex-shrink-0">
            <Search className="w-5 h-5 text-white" /> 
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
            ¿Quieres **comparar precios**?
          </h3>
        </div>

        <div className="flex-1 pl-0 md:pl-14"> 
            <p className="text-gray-700 mb-4 text-base">
                Recibe cotizaciones de hasta **5 talleres verificados** en Bogotá. Compara y elige la mejor opción.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">Gratis y sin compromiso</span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">Respuesta en pocas horas</span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">Talleres verificados</span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">Ahorra hasta 30%</span>
                </div>
            </div>
        </div>

        <div className="w-full md:pl-14 pt-4 md:pt-0"> 
          <button
            onClick={handleCompareClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 transition-colors flex items-center justify-center gap-2 whitespace-nowrap rounded-lg shadow-lg hover:shadow-xl"
          >
            <span>Comparar Precios Ahora</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div> */}
            </div>

            {/* Sidebar (Desktop) - Sticky Card */}
            {data?.whatsapp && (
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <CardSolicitarServicio
                    visibleModalSolicitarServicio={
                      visibleModalSolicitarServicio
                    }
                    setVisibleModalSolicitarServicio={
                      setVisibleModalSolicitarServicio
                    }
                    openModal={openModal}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile CTA Button - REMOVED, now sticky card above */}
      {/* Card is now sticky below navigation in mobile */}

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
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
      <CallModal 
  isOpen={isCallModalOpen}
  onClose={() => setIsCallModalOpen(false)}
  taller={data}
/>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const parts = params?.id?.replace(/&/g, "");

  try {
    const { data } = await client.query({
      query: GET_ONE_NEGOCIOVDOS,
      variables: { userName: parts },
      fetchPolicy: "network-only",
    });

    if (parts === "s&i_master_paint") {
      return {
        redirect: {
          destination: "/si_master_paint",
          permanent: false,
        },
      };
    }

    if (!data?.getOneNegocioVDos) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data: data.getOneNegocioVDos,
      },
    };
  } catch (error) {
    console.error("Error en getStaticProps:", error);
    return {
      notFound: true,
    };
  }
}
