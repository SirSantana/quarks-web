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
  const { problemaSlug, problemaOriginal } = router.query;

  const [respuesta, setRespuesta] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const diagnosticoRef = useRef(null);
  const preciosRef = useRef(null);
  const talleresRef = useRef(null);
  
  const hasFetched = useRef(false);

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
    if (router.isReady && problemaOriginal && !hasFetched.current) {
      hasFetched.current = true;
  
      const fetchResultados = async () => {
        setCargando(true);
        setError(null);
  
        try {
          const { data: { user }, error: userError } = await supabase.auth.getUser();
  
          const { data: existing, error: selectError } = await supabase
            .from('diagnostics')
            .select('*')
            .ilike('mensaje_usuario', decodeURIComponent(problemaOriginal))
  
          if (selectError) throw selectError;
          
          if (existing.length > 0) {
            setRespuesta({
              diagnostico: existing[0].diagnostico,
              estimacionPrecios: existing[0].precios,
              talleres: existing[0].talleres,
            });
            return;
          }
  
          // No existe, así que hacemos la solicitud
          const res = await fetch('/api/asistente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mensaje: problemaOriginal }),
          });
  
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.detalle || `Error HTTP: ${res.status}`);
          }
  
          const respuestaData = await res.json();
          setRespuesta(respuestaData);
  
          const { error: insertError } = await supabase.from('diagnostics').insert([{
            mensaje_usuario: decodeURIComponent(problemaOriginal),
            diagnostico: respuestaData.diagnostico,
            precios: respuestaData.estimacionPrecios,
            talleres: respuestaData.talleres,
            user_id: user?.id || null,
          }]);
  
          if (insertError) {
            console.error('Error al guardar en Supabase:', insertError);
          }
  
        } catch (err) {
          console.error('Error al obtener resultados:', err);
          setError({
            message: 'Ocurrió un error al obtener el diagnóstico y los resultados.',
            details: err.message,
          });
        } finally {
          setCargando(false);
        }
      };
  
      fetchResultados();
    } else if (router.isReady && !problemaOriginal) {
      setError({
        message: 'No se encontró la descripción original del problema en la URL.',
        details: 'Por favor, intente buscar desde la página principal.',
      });
    }
  }, [router.isReady, problemaOriginal]);

  // Función para hacer scroll a la sección seleccionada
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.headerContainer}>
        <button 
          onClick={() => router.back()}
          style={styles.backButton}
          onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'}
          onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}
        >
          <ArrowLeft size={16} style={styles.iconMarginRight} />
          <span>Volver</span>
        </button>

        <p style={styles.title}>Problema Reportado:</p>
        
        {problemaOriginal && (
          <div style={styles.problemCard}>
            {/* <p style={styles.problemLabel}>Problema reportado:</p> */}
            <h1 style={styles.problemText}>"{decodeURIComponent(problemaOriginal)}"</h1>
          </div>
        )}
      </header>

      {cargando && (
        <div style={styles.loadingContainer}>
          <Loader size={36} style={{color: '#2563eb', ...styles.loadingSpinner}} />
          <p style={styles.loadingText}>Analizando tu problema...</p>
        </div>
      )}

      {error && (
        <div style={styles.errorContainer}>
          <div style={styles.errorFlex}>
            <AlertCircle size={24} style={styles.errorIcon} />
            <div>
              <h2 style={styles.errorTitle}>Ha ocurrido un error</h2>
              <p style={styles.errorMessage}>{error.message}</p>
              {error.details && <p style={styles.errorDetails}>{error.details}</p>}
            </div>
          </div>
          {problemaOriginal && (
            <button 
              onClick={() => window.location.reload()}
              style={styles.retryButton}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
            >
              <Loader size={16} style={{...styles.iconMarginRight, ...styles.loadingSpinner}} />
              <span>Intentar nuevamente</span>
            </button>
          )}
        </div>
      )}

      {respuesta && !error && (
        <>
          {/* <div style={styles.navContainer}>
            <button 
              style={styles.navButton}
              onClick={() => scrollToSection(diagnosticoRef)}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Diagnóstico
            </button>
            <button 
              style={styles.navButton}
              onClick={() => scrollToSection(preciosRef)}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Precios
            </button>
            <button 
              style={styles.navButton}
              onClick={() => scrollToSection(talleresRef)}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Talleres
            </button>
          </div> */}

          <div style={styles.resultContainer}>
            <section ref={diagnosticoRef} style={styles.sectionAnchor}>
              <div style={styles.sectionHeader}>
                <div style={{...styles.sectionIconContainer, backgroundColor: '#e0f2fe'}}>
                  <Wrench size={20} style={{color: '#0284c7'}} />
                </div>
                <h2 style={styles.sectionTitle}>Diagnóstico técnico</h2>
              </div>
              <div style={styles.diagnosticoCard}>
                {respuesta.diagnostico}
              </div>
            </section>

            <section ref={preciosRef} style={styles.sectionAnchor}>
              <div style={styles.sectionHeader}>
                <div style={{...styles.sectionIconContainer, backgroundColor: '#ecfdf5'}}>
                  <DollarSign size={20} style={{color: '#059669'}} />
                </div>
                <h2 style={styles.sectionTitle}>Estimado de precios</h2>
              </div>
              
              {respuesta.estimacionPrecios && respuesta.estimacionPrecios.length > 0 ? (
                <div style={styles.priceContainer}>
                  {respuesta.estimacionPrecios.map((item, index) => (
                    <div 
                      key={index}
                      style={
                        index === respuesta.estimacionPrecios.length - 1 
                          ? {...styles.priceItem, ...styles.priceItemLast, ...styles.priceItemHighlighted} 
                          : styles.priceItem
                      }
                    >
                      <span style={
                        index === respuesta.estimacionPrecios.length - 1 
                          ? styles.priceTotalLabel 
                          : styles.priceLabel
                      }>
                        {item.item}
                      </span>
                      <span style={
                        index === respuesta.estimacionPrecios.length - 1 
                          ? styles.priceTotalValue 
                          : styles.priceValue
                      }>
                        {item.precio}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={styles.emptyText}>
                  No se pudo obtener una estimación de precios detallada en este momento.
                </div>
              )}
            </section>

            <section ref={talleresRef} style={styles.sectionAnchor}>
              <div style={styles.sectionHeader}>
                <div style={{...styles.sectionIconContainer, backgroundColor: '#fef2f2'}}>
                  <MapPin size={20} style={{color: '#dc2626'}} />
                </div>
                <h2 style={styles.sectionTitle}>Talleres recomendados</h2>
              </div>
              
              {respuesta.talleres && respuesta.talleres.length > 0 ? (
                <div style={styles.tallerContainer}>
                  {respuesta.talleres.map((taller, index) => (
                    <div 
                      key={index}
                      style={styles.tallerCard}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.borderColor = '#cbd5e1';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                      }}
                    >
                      <div style={styles.tallerHeader}>
                        <div style={styles.tallerInfo}>
                          <h3 style={styles.tallerName}>{taller.nombre}</h3>
                          <div style={styles.tallerMetaContainer}>
                            <div style={styles.tallerMeta}>
                              <MapPin size={14} style={{...styles.iconMarginRight, color: '#94a3b8'}} />
                              <span>{taller.ubicacion}</span>
                            </div>
                            <div style={styles.tallerMeta}>
                              <Clock size={14} style={{...styles.iconMarginRight, color: '#94a3b8'}} />
                              <span>Abierto hasta 20:00</span>
                            </div>
                          </div>
                        </div>
                        <div style={styles.ratingBadge}>
                          <Star size={14} style={{...styles.iconMarginRight, color: '#eab308', fill: '#eab308'}} />
                          <span style={styles.ratingText}>{taller.calificacion}</span>
                        </div>
                      </div>
                      
                      <div style={styles.tallerContact}>
                        <button 
                          style={styles.tallerContactButton}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#bae6fd'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e0f2fe'}
                        >
                          <Phone size={16} style={styles.iconMarginRight} />
                          <span>Llamar ahora</span>
                        </button>
                        <button 
                          style={styles.tallerDetailButton}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                        >
                          <span>Ver detalles</span>
                          <ChevronRight size={16} style={{marginLeft: '0.25rem'}} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={styles.emptyText}>
                  No se encontraron talleres recomendados para este servicio.
                </div>
              )}
            </section>
          </div>
          
          <div style={styles.ctaContainer}>
            <button 
              style={styles.ctaButton}
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
              <span>Recibir ofertas de talleres cercanos</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultadosPage;