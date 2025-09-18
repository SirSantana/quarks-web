import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import styles2 from "@/styles/Landing.module.css";
import dynamic from "next/dynamic";
import talleres from "@/src/data/talleres.json";
const MapTalleresHome = dynamic(
  () => import("@/src/Components/LandingPage/MapTalleresHome"),
  {
    ssr: false,
    loading: () => (
      <div className={styles2.containerMapHome}>
        <div
          className={styles2.cardNewTallerSkeleton}
          style={{ position: "relative", width: "100%", height: "90vh" }}
        />
      </div>
    ),
  }
);
const PreciosSection = dynamic(
  () => import("@/src/Components/AsistantMechanic/PreciosSection"),
  {
    ssr: false,
    loading: () => (
      <div className={styles2.containerMapHome}>
        <div
          className={styles2.cardNewTallerSkeleton}
          style={{ position: "relative", width: "100%", height: "90vh" }}
        />
      </div>
    ),
  }
);
import {
  ArrowLeft,
  Wrench,
  DollarSign,
  MapPin,
  MessageCircle,
  AlertCircle,
  Star,
  Phone,
  ChevronRight,
  Clock,
  Car,
  Map,
  MapPinCheck,
  List,
} from "lucide-react";
import { useAuth } from "@/Context/AuthContext";
import LayoutV2 from "@/src/Components/LayoutV2";

const ResultadosPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const problemaSlug = Array.isArray(slug) ? slug[0] : slug;

  const [diagnosticoData, setDiagnosticoData] = useState(null);
  const [cargandoDiagnostico, setCargandoDiagnostico] = useState(true); // Empezamos cargando el diagnóstico
  const [errorDiagnostico, setErrorDiagnostico] = useState(null);

  const [talleresActuales, setTalleresActuales] = useState(null);
  const [cargandoTalleres, setCargandoTalleres] = useState(false); // Empezamos SIN cargar talleres
  const [errorTalleres, setErrorTalleres] = useState(null);

  const diagnosticoRef = useRef(null);
  const preciosRef = useRef(null);
  const talleresRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { loading: load, signOut } = useAuth();

  // Estilos en línea mejorados
  const styles = {
    pageWrapper: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
    },
    menuButton: {
      position: "fixed",
      top: "1rem",
      left: "1rem",
      zIndex: 30,
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "0.5rem",
      padding: "0.75rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "all 0.2s ease",
    },
    menuButtonHover: {
      backgroundColor: "#2563eb",
    },
    mainContent: {
      flex: 1,
      display: "flex",
      paddingTop: "48px",
      justifyContent: "center",
      marginLeft: sidebarOpen ? "0" : "0",
      transition: "margin-left 0.3s ease",
      marginBottom: "500px",
    },
    container: {
      fontFamily: "Poppins, system-ui, -apple-system, sans-serif",
      maxWidth: "1400px",
      width: "100%",
      borderRadius: "16px",
      display: "flex",
      flexDirection: "row",
      marginTop: "48px",
      gap: "20%",
      backgroundColor: "#f9fafb",
    },
    vehicleInfoItem2: {
      display: "flex",
      alignItems: "center",
      backdropFilter: "blur(10px)",
      borderRadius: "0.75rem",
      padding: "0.5rem 0.75rem",
      border: "1px solid rgb(226, 232, 240)",
      backgroundColor: "white",
    },
    vehicleInfoContainer2: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      fontSize: "14px",
      marginTop: "24px",
      color: "#64748b",
      gap: "0.5rem",
      backgroundColor: "rgb(248, 250, 252)",
    },
    vehicleInfoItem: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "white",
      backdropFilter: "blur(10px)",
      borderRadius: "0.75rem",
      padding: "0.5rem 0.75rem",
      border: "5px solid rgba(226, 232, 240, 0.5) !important",
    },
    vehicleInfoText: {
      marginLeft: "0.5rem",
      color: "#64748b",
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      background: "none",
      border: "none",
      color: "#64748b",
      cursor: "pointer",
      fontSize: "0.95rem",
      transition: "color 0.2s ease",
      fontFamily: "Poppins ",
    },
    iconMarginRight: {
      marginRight: "0.5rem",
    },
    title: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#0f172a",
      marginBottom: "0.75rem",
      lineHeight: "1.2",
    },
    problemCard: {
      padding: "24px",
      // backgroundColor: "#f8fafc",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      marginBottom: "2rem",
      marginTop: "16px",
    },
    problemLabel: {
      fontSize: "0.875rem",
      color: "#64748b",
      marginBottom: "0.5rem",
      fontWeight: "500",
    },
    problemText: {
      fontSize: "1rem",
      color: "#334155",
      lineHeight: "1.5",
      // fontStyle: 'italic',
      fontWeight: "500",
      textAlign: "start",
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 0",
    },
    loadingText: {
      color: "#64748b",
      marginTop: "1.25rem",
      fontSize: "1rem",
    },
    loadingSpinner: {
      animation: "spin 1s linear infinite",
    },
    errorContainer: {
      marginTop: "2rem",
      padding: "1.25rem",
      backgroundColor: "#fef2f2",
      borderRadius: "12px",
      border: "1px solid #fee2e2",
    },
    errorFlex: {
      display: "flex",
      alignItems: "flex-start",
    },
    errorIcon: {
      color: "#ef4444",
      marginRight: "0.75rem",
      marginTop: "0.25rem",
    },
    errorTitle: {
      fontWeight: "600",
      color: "#b91c1c",
      fontSize: "1.125rem",
      marginBottom: "0.5rem",
    },
    errorMessage: {
      fontSize: "0.975rem",
      color: "#7f1d1d",
      lineHeight: "1.5",
    },
    errorDetails: {
      marginTop: "0.75rem",
      fontSize: "0.875rem",
      color: "#ef4444",
      padding: "0.75rem",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      borderRadius: "6px",
    },
    retryButton: {
      marginTop: "1.25rem",
      padding: "0.75rem 1.25rem",
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "0.95rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    navContainer: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #e2e8f0",
      position: "sticky",
      top: 0,
      zIndex: 20,
      padding: "0.75rem 0",
      marginBottom: "2rem",
    },
    navButton: {
      padding: "0.75rem 1rem",
      fontSize: "0.95rem",
      fontWeight: "500",
      color: "#64748b",
      cursor: "pointer",
      borderRadius: "8px",
      transition: "all 0.2s ease",
      backgroundColor: "transparent",
      border: "none",
      textAlign: "center",
      flex: "1",
    },
    navButtonActive: {
      color: "#2563eb",
      backgroundColor: "#f0f9ff",
      fontWeight: "600",
    },
    sectionAnchor: {
      scrollMarginTop: "4.5rem",
      marginBottom: "48px",
    },
    resultContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "3rem",
    },
    sectionHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1.25rem",
    },
    sectionTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#0f172a",
    },
    sectionIconContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "2.5rem",
      height: "2.5rem",
      borderRadius: "10px",
      marginRight: "0.75rem",
    },
    diagnosticoCard: {
      // padding: "1.5rem",
      // backgroundColor: "#f0f9ff",
      borderRadius: "12px",
      color: "#0c4a6e",
      fontSize: "1rem",
      lineHeight: "1.6",
      // boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    priceContainer: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      overflow: "hidden",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    },
    priceItem: {
      display: "flex",
      justifyContent: "space-between",
      padding: "1rem 1.25rem",
      flexDirection: "column",
      gap: "0.5rem",
      borderBottom: "1px solid #e2e8f0",
    },
    priceItemLast: {
      borderBottom: "none",
    },
    priceItemHighlighted: {
      backgroundColor: "#f8fafc",
    },
    priceLabel: {
      color: "#334155",
      fontWeight: "400",
    },
    priceValue: {
      fontWeight: "500",
      color: "#0f172a",
    },
    priceTotalLabel: {
      color: "#0f172a",
      fontWeight: "400",
    },
    priceTotalValue: {
      fontWeight: "500",
      color: "#0f172a",
    },
    emptyText: {
      color: "#64748b",
      fontSize: "0.95rem",
      backgroundColor: "#f8fafc",
      padding: "1.25rem",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      textAlign: "center",
    },
    tallerContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    tallerCard: {
      padding: "1.25rem",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      transition: "transform 0.2s ease, border-color 0.2s ease",
    },
    tallerHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "1rem",
    },
    tallerInfo: {
      flex: "1",
    },
    tallerName: {
      fontWeight: "600",
      color: "#0f172a",
      fontSize: "1.1rem",
      marginBottom: "0.5rem",
    },
    tallerMetaContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "0.75rem",
      marginTop: "0.75rem",
    },
    tallerMeta: {
      display: "flex",
      alignItems: "center",
      fontSize: "0.875rem",
      color: "#64748b",
    },
    ratingBadge: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#fef9c3",
      padding: "0.35rem 0.75rem",
      borderRadius: "9999px",
    },

    ratingText: {
      fontSize: "0.875rem",
      fontWeight: "600",
      color: "#854d0e",
    },
    tallerContact: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "1rem",
      paddingTop: "1rem",
      borderTop: "1px solid #e2e8f0",
    },
    tallerContactButton: {
      display: "flex",
      alignItems: "center",
      padding: "0.5rem 0.75rem",
      backgroundColor: "#e0f2fe",
      color: "#0284c7",
      borderRadius: "8px",
      fontSize: "0.875rem",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
    tallerDetailButton: {
      display: "flex",
      alignItems: "center",
      padding: "0.5rem 0.75rem",
      backgroundColor: "#f8fafc",
      color: "#64748b",
      borderRadius: "8px",
      fontSize: "0.875rem",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
    ctaButton: {
      width: "100%",
      marginTop: "1rem",
      padding: "1rem 1.25rem",
      backgroundColor: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontSize: "1.1rem",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow:
        "0 1px 3px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(37, 99, 235, 0.2)",
      transition: "background-color 0.2s ease, transform 0.1s ease",
    },
    ctaButtonFixed: {
      position: "sticky",
      bottom: "1.5rem",
      zIndex: 10,
      boxShadow:
        "0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 5px rgba(37, 99, 235, 0.2)",
    },
    ctaContainer: {
      marginTop: "2rem",
      paddingTop: "1.5rem",
      borderTop: "1px solid #e2e8f0",
    },
    vehicleInfoContainer: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      fontSize: "14px",
      marginTop: "8px",
      color: "#64748b",
    },
    vehicleInfoItem: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      borderRadius: "0.75rem",
      padding: "0.5rem 0.75rem",
    },
    vehicleInfoText: {
      marginLeft: "0.5rem",
    },
  };
  const [isExpanded, setIsExpanded] = useState(false);


   const [viewMode, setViewMode] = useState('map'); // 'map' o 'list'
  
  const talleresData = talleres.talleres.slice(20, 25).reverse();

  const toggleView = () => {
    setViewMode(viewMode === 'map' ? 'list' : 'map');
  };

  useEffect(() => {
    // !!! CAMBIO: Usamos problemaSlug del router query, no 'slug' ni 'problemaOriginal' !!!
    if (router.isReady && problemaSlug) {
      const fetchDiagnostico = async () => {
        setCargandoDiagnostico(true);
        setErrorDiagnostico(null);
        try {
          const res = await fetch(`/api/diagnostico/${problemaSlug}`);

          // Verificar si la respuesta HTTP fue exitosa
          if (!res.ok) {
            const errorData = await res.json(); // Intenta leer el cuerpo del error del API
            // Maneja el caso específico de "No encontrado" (HTTP 404)
            if (res.status === 404) {
              // !!! CAMBIO: Usamos el estado de error renombrado !!!
              setErrorDiagnostico({
                message: "Diagnóstico no encontrado.",
                details: `El problema con el slug "${problemaSlug}" no fue encontrado.`,
              });
            } else {
              // Lanza un error para otros códigos de estado HTTP no exitosos
              throw new Error(errorData.error || `Error HTTP: ${res.status}`);
            }
            // !!! CAMBIO: Usamos el estado de datos renombrado y lo ponemos a null en caso de error !!!
            setDiagnosticoData(null);
          } else {
            const data = await res.json();
            setDiagnosticoData(data);
          }
        } catch (err) {
          setErrorDiagnostico({
            message:
              err.message ||
              "No se pudo cargar el diagnóstico para este problema.",
            details: err.message, // Detalles técnicos del error
          });
          setDiagnosticoData(null);
        } finally {
          setCargandoDiagnostico(false); // Finaliza carga del diagnóstico
        }
      };

      fetchDiagnostico(); // Ejecuta la función de fetch del diagnóstico
    } else if (router.isReady && !problemaSlug) {
      // Este caso maneja si alguien navega a /resultados/ sin un slug (aunque la ruta dinámica [slug].js lo hace difícil)
      // !!! CAMBIO: Usamos el estado de error renombrado !!!
      setErrorDiagnostico({
        message: "URL inválida.",
        details: "No se especificó un problema (slug) en la URL.",
      });
      // !!! CAMBIO: Usamos el estado de carga renombrado !!!
      setCargandoDiagnostico(false);
    }
    // Dependencias: El efecto se re-ejecuta si el slug de la URL cambia o cuando el router está listo.
  }, [problemaSlug, router.isReady]);

  // Segundo useEffect: Buscar talleres UNA VEZ que el diagnóstico se ha cargado y tiene ciudad/servicios
  useEffect(() => {
    if (
      diagnosticoData &&
      diagnosticoData.city &&
      talleresActuales === null &&
      !cargandoTalleres
    ) {
      const fetchTalleres = async () => {
        setCargandoTalleres(true); // Inicia carga de talleres
        setErrorTalleres(null); // Limpia errores previos de talleres

        try {
          const city = diagnosticoData.city;
          // Asegura que diagnosticoData.servicios es un array antes de join
          const servicios = Array.isArray(diagnosticoData.servicios)
            ? diagnosticoData.servicios.join(",")
            : "";
          const slug = diagnosticoData.slug; // Obtiene el slug del diagnóstico cargado

          const res = await fetch(
            `/api/talleres?city=${encodeURIComponent(
              city
            )}&services=${encodeURIComponent(
              servicios
            )}&slug=${encodeURIComponent(slug)}`
          );

          if (!res.ok) {
            const errorData = await res.json(); // Intenta leer el cuerpo del error
            throw new Error(errorData.error || `Error HTTP: ${res.status}`); // Lanza un error si no fue exitosa
          }

          const talleresData = await res.json();
          setTalleresActuales(talleresData); // Guarda la lista ACTUAL de talleres
        } catch (err) {
          // Captura cualquier error durante el fetch o parseo de talleres
          setErrorTalleres({
            message: "No se pudieron cargar los talleres recomendados.",
            details: err.message, // Detalles técnicos del error
          });
          setTalleresActuales([]); // Dejar la lista vacía en caso de error al cargar talleres
        } finally {
          // Esto se ejecuta siempre al finalizar el fetch de talleres
          setCargandoTalleres(false); // Finaliza carga de talleres
        }
      };

      fetchTalleres(); // Ejecuta la función de fetch de talleres
    }
  }, [
    diagnosticoData?.slug,
    diagnosticoData?.city,
    diagnosticoData?.servicios,
  ]);

  return (
    <LayoutV2 onNavigate={router.push} ads={false}>
      <div style={styles.mainContent}>
        <div style={styles.container}>
          {/* <button
            onClick={() => router.back()} 
            style={styles.backButton}
            onMouseOver={(e) => (e.currentTarget.style.color = "#2563eb")} 
            onMouseOut={(e) => (e.currentTarget.style.color = "#64748b")}
          >
            <ArrowLeft size={16} style={styles.iconMarginRight} />
            <span>Volver</span>
          </button> */}
          <div>
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                marginBottom: "48px",
              }}
            >
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "600",
                  color: "#0f172a",
                }}
              >
                🚗 {diagnosticoData?.car_make} {diagnosticoData?.car_model} {diagnosticoData?.car_year}
              </p>
              {/* <span style={{ color: "#64748b" }}>
                {diagnosticoData?.city}, {diagnosticoData?.country}
              </span> */}
            </section>
            <p style={styles.sectionTitle}>Detalles del problema:</p>{" "}
            {/* Usar headerContainer */}
            {/* Usar style.title */}
            {diagnosticoData?.mensaje_usuario && (
              <div style={styles.problemCard}>
                {" "}
                {/* Usar el estilo problemCard que tenías */}
                {/* Usar style.problemText */}
                <h1
                  style={{
                    fontSize: "16px",
                    color: "#64748b",
                    fontWeight: "400",
                    lineHeight: "1.6",
                  }}
                >
                  "{diagnosticoData.mensaje_usuario}"
                </h1>{" "}
                {/* <div style={styles.vehicleInfoContainer2}>
                  {(diagnosticoData?.car_make ||
                    diagnosticoData?.car_model ||
                    diagnosticoData?.car_year) && (
                    <div style={styles.vehicleInfoItem2}>
                      <Car size={16} style={{ color: "#64748b" }} />
                      <span style={styles.vehicleInfoText}>
                        {diagnosticoData.car_make} {diagnosticoData.car_model}{" "}
                        {diagnosticoData.car_year}
                      </span>
                    </div>
                  )}

                  {(diagnosticoData?.city || diagnosticoData?.country) && (
                    <div style={styles.vehicleInfoItem2}>
                      <MapPin size={16} style={{ color: "#64748b" }} />
                      <span style={styles.vehicleInfoText}>
                        {diagnosticoData.city}, {diagnosticoData.country}
                      </span>
                    </div>
                  )}
                </div> */}
                {/* Usar dato de DB */}
              </div>
            )}
            <section ref={diagnosticoRef} style={styles.sectionAnchor}>
              {" "}
              {/* Usar ref y sectionAnchor */}
              <div style={styles.sectionHeader}>
                {" "}
                <h2 style={styles.sectionTitle}>
                  Posible causa del problema
                </h2>{" "}
                {/* Usar sectionTitle */}
              </div>
              {/* <div style={styles2.diagnosticoCard}>
                {" "}
                
              </div> */}
              <div className={styles2.diagnosticoCard}>
                <div
                  className={`${styles2.diagnosticoText} ${
                    isExpanded ? styles2.expanded : ""
                  }`}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <p>{diagnosticoData?.diagnostico} </p>
                </div>
              </div>
            </section>
            <h2 style={styles.sectionTitle}>Costo total estimado</h2>{" "}
            {diagnosticoData?.precios && (
              <PreciosSection diagnosticoData={diagnosticoData} />
            )}
          </div>
          {/* Puedes descomentar los botones de navegación si quieres */}
          {/* { <div style={styles.navContainer}> ... </div> } */}

          {/* <div
            className={styles2.containerMapHome}
            style={{
              width: "100%",
              margin: "32px 0",
              maxHeight: "700px",
              maxWidth: "600px",
            }}
          >
            <MapTalleresHome data={talleres.talleres.slice(20, 25).reverse()} />
          </div> */}

          <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      {/* Header con título y toggle */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        marginBottom: "24px" 
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <MapPinCheck style={{ width: "20px", height: "20px", color: "#2563eb" }} />
          <h2 style={{ 
            fontSize: "20px", 
            fontWeight: "600", 
            color: "#111827",
            margin: 0
          }}>
            Talleres especializados
          </h2>
        </div>
        
        {/* Toggle Button */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          backgroundColor: "#f3f4f6", 
          borderRadius: "8px", 
          padding: "4px", 
          
        }}>
          <button
            onClick={() => setViewMode('map')}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              backgroundColor: viewMode === 'map' ? "white" : "transparent",
              color: viewMode === 'map' ? "#407BFF" : "#6b7280",
              boxShadow: viewMode === 'map' ? "0 1px 3px rgba(0, 0, 0, 0.1)" : "none"
            }}
          >
            <Map style={{ width: "16px", height: "16px" }} />
            Mapa
          </button>
          <button
            onClick={() => setViewMode('list')}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              backgroundColor: viewMode === 'list' ? "white" : "transparent",
              color: viewMode === 'list' ? "#2563eb" : "#6b7280",
              boxShadow: viewMode === 'list' ? "0 1px 3px rgba(0, 0, 0, 0.1)" : "none"
            }}
          >
            <List style={{ width: "16px", height: "16px" }} />
            Lista
          </button>
        </div>
      </div>

      {/* Contenido condicional */}
      {viewMode === 'map' ? (
        <div style={{
          width: "100%",
          margin: "0",
          maxHeight: "700px",
          maxWidth: "600px",
        }}>
          <MapTalleresHome data={talleres.talleres.slice(20, 25).reverse()} />
        </div>
      ) : (
        <div style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb"
        }}>
          {talleresData.map((taller, index) => (
            <div
              key={taller.id || index}
              style={{
                padding: "16px",
                borderBottom: index !== talleresData.length - 1 ? "1px solid #f3f4f6" : "none",
                cursor: "pointer",
                transition: "background-color 0.15s ease"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#f9fafb"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#3b82f6",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <MapPin style={{ width: "20px", height: "20px", color: "white" }} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: "16px", 
                    fontWeight: "600", 
                    color: "#111827",
                    margin: "0 0 4px 0"
                  }}>
                    {taller.nombre || `Taller ${index + 1}`}
                  </h3>
                  <p style={{ 
                    fontSize: "14px", 
                    color: "#6b7280",
                    margin: "0 0 8px 0"
                  }}>
                    {taller.direccion || taller.ubicacion || "Ubicación no disponible"}
                  </p>
                  {taller.telefono && (
                    <p style={{ 
                      fontSize: "14px", 
                      color: "#374151",
                      margin: 0
                    }}>
                      📞 {taller.telefono}
                    </p>
                  )}
                  {taller.distancia && (
                    <span style={{
                      display: "inline-block",
                      marginTop: "8px",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#059669",
                      backgroundColor: "#d1fae5",
                      padding: "2px 8px",
                      borderRadius: "12px"
                    }}>
                      {taller.distancia} km
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
          {/* Talleres Recomendados */}
          {/* <section ref={talleresRef} style={styles.sectionAnchor}>
          {" "}
          <div style={styles.sectionHeader}>
            {" "}
            <div
              style={{
                ...styles.sectionIconContainer,
                backgroundColor: "#fef2f2",
              }}
            >
              {" "}
              <MapPin size={20} style={{ color: "#dc2626" }} /> 
            </div>
            <h3 style={styles.sectionTitle}>
              Talleres recomendados en{" "}
              {diagnosticoData?.city ||
                diagnosticoData?.country ||
                "tu ubicación"}
            </h3>{" "}
          </div>
          {cargandoTalleres && (
            <p style={styles.loading}>Buscando talleres cercanos...</p>
          )}{" "}
          {errorTalleres && (
            <div style={styles.errorContainer}>
              {" "}
              <div style={styles.errorFlex}>
                {" "}
                <AlertCircle size={24} style={styles.errorIcon} /> 
                <div>
                  <p style={styles.errorMessage}>{errorTalleres.message}</p>{" "}
                  {errorTalleres.details && (
                    <p style={styles.errorDetails}>{errorTalleres.details}</p>
                  )}{" "}
                </div>
              </div>
            </div>
          )}
          {!cargandoTalleres &&
            !errorTalleres &&
            (talleresActuales &&
            Array.isArray(talleresActuales) &&
            talleresActuales.length > 0 ? ( // Si hay talleres en la lista...
              <div style={styles.tallerContainer}>
                {" "}
                {talleresActuales.map((taller, index) => (
                  <div
                    key={index}
                    style={styles.tallerCard} // Usar tallerCard
                    // Mantener efectos hover si quieres
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.borderColor = "#cbd5e1";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                    }}
                  >
                    <div style={styles.tallerHeader}>
                      {" "}
                      <div style={styles.tallerInfo}>
                        {" "}
                        <h3 style={styles.tallerName}>{taller.nombre}</h3>{" "}
                        <div style={styles.tallerMetaContainer}>
                          {" "}
                          <div style={styles.tallerMeta}>
                            {" "}
                            <MapPin
                              size={14}
                              style={{
                                ...styles.iconMarginRight,
                                color: "#94a3b8",
                              }}
                            />{" "}
                            <span>{taller.ubicacion}</span>
                          </div>
                          <div style={styles.tallerMeta}>
                            {" "}
                            <Clock
                              size={14}
                              style={{
                                ...styles.iconMarginRight,
                                color: "#94a3b8",
                              }}
                            />{" "}
                            <span>Abierto hasta 20:00</span>{" "}
                          </div>
                        </div>
                      </div>
                      <div style={styles.ratingBadge}>
                        {" "}
                        <Star
                          size={14}
                          style={{
                            ...styles.iconMarginRight,
                            color: "#eab308",
                            fill: "#eab308",
                          }}
                        />{" "}
                        <span style={styles.ratingText}>
                          {taller.calificacion}
                        </span>{" "}
                      </div>
                    </div>

                    <div style={styles.tallerContact}>
                      {" "}
                      <button
                        style={styles.tallerContactButton} // Usar tallerContactButton
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#bae6fd")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "#e0f2fe")
                        }
                      >
                        <Phone size={16} style={styles.iconMarginRight} />{" "}
                        <span>Llamar ahora</span>
                      </button>
                      <button
                        style={styles.tallerDetailButton} // Usar tallerDetailButton
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f1f5f9")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f8fafc")
                        }
                      >
                        <span>Ver detalles</span>
                        <ChevronRight
                          size={16}
                          style={{ marginLeft: "0.25rem" }}
                        />{" "}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={styles.emptyText}>
                {" "}
                No se encontraron talleres recomendados para este problema en la
                ubicación especificada actualmente.
              </div>
            ))}
        </section> */}
          {/* <div style={styles.ctaContainer}>
        {" "}
        <button
          style={styles.ctaButton} 
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#1d4ed8";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#2563eb";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <MessageCircle size={18} style={styles.iconMarginRight} />
          <span>Recibir ofertas de talleres cercanos</span>{" "}
        </button>
      </div> */}
          {/* Opcional: Mostrar el slug para referencia/depuración fuera del bloque principal si quieres que se vea siempre */}
          {/* !!! CAMBIO: Usamos diagnosticoData?.slug !!! */}
          {/* {diagnosticoData?.slug && (
        <p style={{ ...styles.slugText, marginTop: "20px" }}>
          Slug de este diagnóstico: {diagnosticoData.slug}
        </p>
      )}{" "} */}
          {/* Usar style.slugText */}
        </div>
      </div>
    </LayoutV2>
  );
};

export default ResultadosPage;
