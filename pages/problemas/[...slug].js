import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import {
  ArrowLeft,
  Wrench,
  DollarSign,
  MapPin,
  MessageCircle,
  AlertCircle,
  Star,
  Loader,
  Phone,
  ChevronRight,
  Clock
} from 'lucide-react';

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

  // Estilos en línea mejorados
  const styles = {
    container: {
      maxWidth: '36rem',
      margin: '0 auto',
      padding: '2rem 1.5rem',
      backgroundColor: '#ffffff',
      fontFamily: 'Poppins, -apple-system, sans-serif',
      minHeight: '100vh'
    },
    headerContainer: {
      marginBottom: '2rem',
      position: 'relative'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      background: 'none',
      border: 'none',
      color: '#64748b',
      cursor: 'pointer',
      padding: '0.5rem 0',
      fontSize: '0.95rem',
      marginBottom: '1.5rem',
      transition: 'color 0.2s ease'
    },
    iconMarginRight: {
      marginRight: '0.5rem'
    },
    title: {
      fontSize: '1.75rem',
      fontWeight: '600',
      color: '#0f172a',
      marginBottom: '0.75rem',
      lineHeight: '1.2'
    },
    problemCard: {
      padding: '1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      marginBottom: '2rem'
    },
    problemLabel: {
      fontSize: '0.875rem',
      color: '#64748b',
      marginBottom: '0.5rem',
      fontWeight: '500'
    },
    problemText: {
      fontSize: '1rem',
      color: '#334155',
      lineHeight: '1.5',
      // fontStyle: 'italic',
      fontWeight: '500'
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 0'
    },
    loadingText: {
      color: '#64748b',
      marginTop: '1.25rem',
      fontSize: '1rem'
    },
    loadingSpinner: {
      animation: 'spin 1s linear infinite'
    },
    errorContainer: {
      marginTop: '2rem',
      padding: '1.25rem',
      backgroundColor: '#fef2f2',
      borderRadius: '12px',
      border: '1px solid #fee2e2'
    },
    errorFlex: {
      display: 'flex',
      alignItems: 'flex-start'
    },
    errorIcon: {
      color: '#ef4444',
      marginRight: '0.75rem',
      marginTop: '0.25rem'
    },
    errorTitle: {
      fontWeight: '600',
      color: '#b91c1c',
      fontSize: '1.125rem',
      marginBottom: '0.5rem'
    },
    errorMessage: {
      fontSize: '0.975rem',
      color: '#7f1d1d',
      lineHeight: '1.5'
    },
    errorDetails: {
      marginTop: '0.75rem',
      fontSize: '0.875rem',
      color: '#ef4444',
      padding: '0.75rem',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderRadius: '6px'
    },
    retryButton: {
      marginTop: '1.25rem',
      padding: '0.75rem 1.25rem',
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '0.95rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    navContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 20,
      padding: '0.75rem 0',
      marginBottom: '2rem'
    },
    navButton: {
      padding: '0.75rem 1rem',
      fontSize: '0.95rem',
      fontWeight: '500',
      color: '#64748b',
      cursor: 'pointer',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      backgroundColor: 'transparent',
      border: 'none',
      textAlign: 'center',
      flex: '1'
    },
    navButtonActive: {
      color: '#2563eb',
      backgroundColor: '#f0f9ff',
      fontWeight: '600'
    },
    sectionAnchor: {
      scrollMarginTop: '4.5rem',
    },
    resultContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '3rem'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1.25rem'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#0f172a'
    },
    sectionIconContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '10px',
      marginRight: '0.75rem'
    },
    diagnosticoCard: {
      padding: '1.5rem',
      backgroundColor: '#f0f9ff',
      borderRadius: '12px',
      color: '#0c4a6e',
      fontSize: '1rem',
      lineHeight: '1.6',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    },
    priceContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    },
    priceItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem 1.25rem',
      flexDirection: 'column',
      gap: '0.5rem',
      borderBottom: '1px solid #e2e8f0'
    },
    priceItemLast: {
      borderBottom: 'none'
    },
    priceItemHighlighted: {
      backgroundColor: '#f8fafc'
    },
    priceLabel: {
      color: '#334155',
      fontWeight: '400'
    },
    priceValue: {
      fontWeight: '500',
      color: '#0f172a'
    },
    priceTotalLabel: {
      color: '#0f172a',
      fontWeight: '400'
    },
    priceTotalValue: {
      fontWeight: '500',
      color: '#0f172a',
    },
    emptyText: {
      color: '#64748b',
      fontSize: '0.95rem',
      backgroundColor: '#f8fafc',
      padding: '1.25rem',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      textAlign: 'center'
    },
    tallerContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    tallerCard: {
      padding: '1.25rem',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.2s ease, border-color 0.2s ease'
    },
    tallerHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem'
    },
    tallerInfo: {
      flex: '1'
    },
    tallerName: {
      fontWeight: '600',
      color: '#0f172a',
      fontSize: '1.1rem',
      marginBottom: '0.5rem'
    },
    tallerMetaContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      marginTop: '0.75rem'
    },
    tallerMeta: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.875rem',
      color: '#64748b'
    },
    ratingBadge: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#fef9c3',
      padding: '0.35rem 0.75rem',
      borderRadius: '9999px'
    },
    ratingText: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#854d0e'
    },
    tallerContact: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid #e2e8f0'
    },
    tallerContactButton: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 0.75rem',
      backgroundColor: '#e0f2fe',
      color: '#0284c7',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    tallerDetailButton: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 0.75rem',
      backgroundColor: '#f8fafc',
      color: '#64748b',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '500',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    ctaButton: {
      width: '100%',
      marginTop: '1rem',
      padding: '1rem 1.25rem',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(37, 99, 235, 0.2)',
      transition: 'background-color 0.2s ease, transform 0.1s ease'
    },
    ctaButtonFixed: {
      position: 'sticky',
      bottom: '1.5rem',
      zIndex: 10,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 5px rgba(37, 99, 235, 0.2)'
    },
    ctaContainer: {
      marginTop: '2rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid #e2e8f0'
    }
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
              setErrorDiagnostico({ message: 'Diagnóstico no encontrado.', details: `El problema con el slug "${problemaSlug}" no fue encontrado.` });
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
            message: err.message || 'No se pudo cargar el diagnóstico para este problema.',
            details: err.message // Detalles técnicos del error
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
        message: 'URL inválida.',
        details: 'No se especificó un problema (slug) en la URL.'
      });
      // !!! CAMBIO: Usamos el estado de carga renombrado !!!
      setCargandoDiagnostico(false);
    }
    // Dependencias: El efecto se re-ejecuta si el slug de la URL cambia o cuando el router está listo.
  }, [problemaSlug, router.isReady]);


  // Segundo useEffect: Buscar talleres UNA VEZ que el diagnóstico se ha cargado y tiene ciudad/servicios
  useEffect(() => {
    if (diagnosticoData && diagnosticoData.city  && talleresActuales === null && !cargandoTalleres) {
      const fetchTalleres = async () => {
        setCargandoTalleres(true); // Inicia carga de talleres
        setErrorTalleres(null); // Limpia errores previos de talleres

        try {
          const city = diagnosticoData.city;
          // Asegura que diagnosticoData.servicios es un array antes de join
          const servicios = Array.isArray(diagnosticoData.servicios) ? diagnosticoData.servicios.join(',') : '';
          const slug = diagnosticoData.slug; // Obtiene el slug del diagnóstico cargado

          const res = await fetch(`/api/talleres?city=${encodeURIComponent(city)}&services=${encodeURIComponent(servicios)}&slug=${encodeURIComponent(slug)}`);

          if (!res.ok) {
            const errorData = await res.json(); // Intenta leer el cuerpo del error
            throw new Error(errorData.error || `Error HTTP: ${res.status}`); // Lanza un error si no fue exitosa
          }

          const talleresData = await res.json();
          setTalleresActuales(talleresData); // Guarda la lista ACTUAL de talleres

        } catch (err) {
          // Captura cualquier error durante el fetch o parseo de talleres
          setErrorTalleres({
            message: 'No se pudieron cargar los talleres recomendados.',
            details: err.message // Detalles técnicos del error
          });
          setTalleresActuales([]); // Dejar la lista vacía en caso de error al cargar talleres
        } finally {
          // Esto se ejecuta siempre al finalizar el fetch de talleres
          setCargandoTalleres(false); // Finaliza carga de talleres
        }
      };

      fetchTalleres(); // Ejecuta la función de fetch de talleres
    }
  }, [diagnosticoData?.slug, diagnosticoData?.city, diagnosticoData?.servicios]);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Si el diagnóstico cargó pero es null (ej. 404 del API /api/diagnostico/[slug])
  // if (!diagnosticoData) {
  //   return (
  //     <div style={styles.container}>
  //       <button style={{ ...styles.backButton, marginBottom: '20px' }} onClick={() => router.push('/')}>← Volver</button> {/* Usar backButton style */}
  //       <div style={styles.errorContainer}> {/* Usar el estilo errorContainer */}
  //         <div style={styles.errorFlex}>
  //           <AlertCircle size={24} style={styles.errorIcon} /> {/* Usar errorIcon */}
  //           <div>
  //             <h2 style={styles.errorTitle}>Diagnóstico no encontrado.</h2> {/* Usar errorTitle */}
  //             {/* Usar problemaSlug que viene de la URL */}
  //             <p style={styles.errorMessage}>El problema con el identificador "{problemaSlug}" no fue encontrado en nuestra base de datos.</p> {/* Usar errorMessage */}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }


  return (
    <div style={styles.container}>
      {/* Botón para volver a la página principal */}
      {/* Usar tu estilo backButton */}
      <button
        onClick={() => router.back()} // Usar router.back() es mejor para ir a la página anterior
        style={styles.backButton}
        onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'} // Mantener efectos hover si quieres
        onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}
      >
        <ArrowLeft size={16} style={styles.iconMarginRight} />
        <span>Volver</span>
      </button>


      <header style={styles.headerContainer}> {/* Usar headerContainer */}
        <p style={styles.title}>Detalles del Diagnóstico:</p> {/* Usar style.title */}

        {diagnosticoData?.mensaje_usuario && (
          <div style={styles.problemCard}> {/* Usar el estilo problemCard que tenías */}
            {/* Usar style.problemText */}
            <h1 style={styles.problemText}>"{diagnosticoData.mensaje_usuario}"</h1> {/* Usar dato de DB */}
          </div>
        )}
       {(diagnosticoData?.car_make || diagnosticoData?.car_model || diagnosticoData?.car_year) && (
            <p style={{...styles.subtitle, marginTop: '-1rem', marginBottom: '1rem', fontStyle: 'italic'}}>
                Vehículo:
                {diagnosticoData.car_make && ` ${diagnosticoData.car_make}`}
                {diagnosticoData.car_model && ` ${diagnosticoData.car_model}`}
                {diagnosticoData.car_year && ` Año ${diagnosticoData.car_year}`}
            </p>
        )}
        {(diagnosticoData?.city || diagnosticoData?.country) && (
          <p style={styles.locationText}>Ubicación: {diagnosticoData.city}{diagnosticoData.city && diagnosticoData.country && ', '}{diagnosticoData.country}</p>
        )}
      </header>


      {/* Puedes descomentar los botones de navegación si quieres */}
      {/* { <div style={styles.navContainer}> ... </div> } */}


      <div style={styles.resultContainer}> {/* Usar resultContainer */}
        {/* Diagnóstico */}
        <section ref={diagnosticoRef} style={styles.sectionAnchor}> {/* Usar ref y sectionAnchor */}
          <div style={styles.sectionHeader}> {/* Usar sectionHeader */}
            <div style={{ ...styles.sectionIconContainer, backgroundColor: '#e0f2fe' }}> {/* Usar sectionIconContainer */}
              <Wrench size={20} style={{ color: '#0284c7' }} /> {/* Icono */}
            </div>
            <h2 style={styles.sectionTitle}>Posible causa del problema</h2> {/* Usar sectionTitle */}
          </div>
          <div style={styles.diagnosticoCard}> {/* Usar diagnosticoCard */}
            {/* Muestra el diagnóstico guardado */}
            {/* !!! Usamos diagnosticoData?.diagnostico - nombre correcto y optional chaining !!! */}
            {diagnosticoData?.diagnostico}
          </div>
        </section>


        <section ref={preciosRef} style={styles.sectionAnchor}> {/* Usar ref y sectionAnchor */}
          <div style={styles.sectionHeader}> {/* Usar sectionHeader */}
            <div style={{ ...styles.sectionIconContainer, backgroundColor: '#ecfdf5' }}> {/* Usar sectionIconContainer */}
              <DollarSign size={20} style={{ color: '#059669' }} /> {/* Icono */}
            </div>
            <h3 style={styles.sectionTitle}>Estimado de precios</h3> {/* Usar sectionTitle */}
          </div>

          {diagnosticoData?.precios && Array.isArray(diagnosticoData.precios) && diagnosticoData.precios.length > 0 ? (
            <div style={styles.priceContainer}> {/* Usar priceContainer */}
              {/* !!! Iteramos sobre diagnosticoData.precios !!! */}
              {diagnosticoData.precios.map((precioItem, index) => (
                <div
                  key={index}
                  // !!! Usamos diagnosticoData.precios.length para saber si es el último !!!
                  style={index === diagnosticoData.precios.length - 1 ? { ...styles.priceItem, ...styles.priceItemLast } : styles.priceItem} // Mantener estilos de item
                >
                  {/* !!! Las propiedades internas item y precio son correctas (vienen de Gemini/API) !!! */}
                  <span style={styles.priceLabel}>{precioItem.item}</span>
                  <span style={styles.priceValue}>{precioItem.precio}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyText}> {/* Usar emptyText */}
              No se pudo obtener una estimación de precios detallada para este registro.
            </div>
          )}
        </section>


        {/* Talleres Recomendados */}
        <section ref={talleresRef} style={styles.sectionAnchor}> {/* Usar ref y sectionAnchor */}
          <div style={styles.sectionHeader}> {/* Usar sectionHeader */}
            <div style={{ ...styles.sectionIconContainer, backgroundColor: '#fef2f2' }}> {/* Usar sectionIconContainer */}
              <MapPin size={20} style={{ color: '#dc2626' }} /> {/* Icono */}
            </div>
            {/* !!! Usamos diagnosticoData?.city o .country para el título dinámico !!! */}
            <h3 style={styles.sectionTitle}>Talleres recomendados en {diagnosticoData?.city || diagnosticoData?.country || 'tu ubicación'}</h3> {/* Título dinámico */}
          </div>


          {/* Indicador de carga para talleres */}
          {cargandoTalleres && <p style={styles.loading}>Buscando talleres cercanos...</p>} {/* Usar estilo loading */}

          {/* Mostrar error de talleres */}
          {errorTalleres && (
            <div style={styles.errorContainer}> {/* Usar estilo errorContainer */}
              <div style={styles.errorFlex}> {/* Usar estilo errorFlex */}
                <AlertCircle size={24} style={styles.errorIcon} /> {/* Icono */}
                <div>
                  <p style={styles.errorMessage}>{errorTalleres.message}</p> {/* Usar errorMessage */}
                  {errorTalleres.details && <p style={styles.errorDetails}>{errorTalleres.details}</p>} {/* Usar errorDetails */}
                </div>
              </div>
            </div>
          )}

          {/* Mostrar lista de talleres si no está cargando Y no hubo error de talleres */}
          {!cargandoTalleres && !errorTalleres && (
            talleresActuales && Array.isArray(talleresActuales) && talleresActuales.length > 0 ? ( // Si hay talleres en la lista...
              <div style={styles.tallerContainer}> {/* Usar tallerContainer */}
                {/* Muestra la lista de talleres ACTUALES */}
                {talleresActuales.map((taller, index) => (
                  <div
                    key={index}
                    style={styles.tallerCard} // Usar tallerCard
                    // Mantener efectos hover si quieres
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.borderColor = '#cbd5e1';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <div style={styles.tallerHeader}> {/* Usar tallerHeader */}
                      <div style={styles.tallerInfo}> {/* Usar tallerInfo */}
                        <h3 style={styles.tallerName}>{taller.nombre}</h3> {/* Usar tallerName */}
                        <div style={styles.tallerMetaContainer}> {/* Usar tallerMetaContainer */}
                          <div style={styles.tallerMeta}> {/* Usar tallerMeta */}
                            <MapPin size={14} style={{ ...styles.iconMarginRight, color: '#94a3b8' }} /> {/* Icono */}
                            <span>{taller.ubicacion}</span>
                          </div>
                          <div style={styles.tallerMeta}> {/* Usar tallerMeta */}
                            <Clock size={14} style={{ ...styles.iconMarginRight, color: '#94a3b8' }} /> {/* Icono */}
                            <span>Abierto hasta 20:00</span> {/* Dato simulado */}
                          </div>
                        </div>
                      </div>
                      <div style={styles.ratingBadge}> {/* Usar ratingBadge */}
                        <Star size={14} style={{ ...styles.iconMarginRight, color: '#eab308', fill: '#eab308' }} /> {/* Icono */}
                        <span style={styles.ratingText}>{taller.calificacion}</span> {/* Usar ratingText */}
                      </div>
                    </div>

                    <div style={styles.tallerContact}> {/* Usar tallerContact */}
                      <button
                        style={styles.tallerContactButton} // Usar tallerContactButton
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#bae6fd'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e0f2fe'}
                      >
                        <Phone size={16} style={styles.iconMarginRight} /> {/* Icono */}
                        <span>Llamar ahora</span>
                      </button>
                      <button
                        style={styles.tallerDetailButton} // Usar tallerDetailButton
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                      >
                        <span>Ver detalles</span>
                        <ChevronRight size={16} style={{ marginLeft: '0.25rem' }} /> {/* Icono */}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : ( // Si la lista de talleres está vacía (y no hubo error de carga)
              <div style={styles.emptyText}> {/* Usar emptyText */}
                No se encontraron talleres recomendados para este problema en la ubicación especificada actualmente.
              </div>
            )
          )}
        </section>
      </div>


      <div style={styles.ctaContainer}> {/* Usar ctaContainer */}
        <button
          style={styles.ctaButton} // Usar ctaButton
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#1d4ed8';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <MessageCircle size={18} style={styles.iconMarginRight} />
          <span>Recibir ofertas de talleres cercanos</span> {/* Texto del botón */}
        </button>
      </div>

      {/* Opcional: Mostrar el slug para referencia/depuración fuera del bloque principal si quieres que se vea siempre */}
      {/* !!! CAMBIO: Usamos diagnosticoData?.slug !!! */}
      {diagnosticoData?.slug && <p style={{ ...styles.slugText, marginTop: '20px' }}>Slug de este diagnóstico: {diagnosticoData.slug}</p>} {/* Usar style.slugText */}

    </div>
  );
};


export default ResultadosPage;