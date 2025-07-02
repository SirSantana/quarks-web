// pages/index.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Send,
  Loader,
  AlertTriangle,
  LogIn,
  ChevronRight,
  Search,
  CheckCircle,
  Database,
} from 'lucide-react';
import { useAuth } from '@/Context/AuthContext';
import LayoutV2 from '@/src/Components/LayoutV2';
import Link from 'next/link';


const IndexPage = () => {
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [etapaAnalisis, setEtapaAnalisis] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { user, loading: load, signOut } = useAuth();
  // Mensajes de feedback por etapas
  const mensajesAnalisis = [
    "Analizando el problema...",
    "Identificando síntomas principales...",
    "Consultando base de datos de diagnósticos...",
    "Verificando posibles causas...",
    "Calculando estimados de reparación...",
    "Preparando el diagnóstico final..."
  ];

  const styles = {
    pageWrapper: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    },
    menuButton: {
      position: 'fixed',
      top: '1rem',
      left: '1rem',
      zIndex: 30,
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      padding: '0.75rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s ease'
    },
    menuButtonHover: {
      backgroundColor: '#2563eb'
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: sidebarOpen ? '0' : '0',
      transition: 'margin-left 0.3s ease',
      paddingTop:'48px'
    },
    container: {
      fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
      maxWidth: '640px',
      width: '100%',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    header: {
      marginBottom: '0.5rem'
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1f2937',
      textAlign: 'left',
      marginBottom: '0.25rem',
      marginTop: '0',
      lineHeight: '1.25'
    },
    subtitle: {
      fontSize: '0.95rem',
      color: '#6b7280',
      marginTop: '0',
      lineHeight: '1.5'
    },
    alert: {
      backgroundColor: '#fee2e2',
      color: '#b91c1c',
      padding: '1rem',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontSize: '0.95rem',
      lineHeight: '1.5'
    },
    alertIcon: {
      flexShrink: 0,
      color: '#ef4444'
    },
    alertContent: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    loginPrompt: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      cursor: 'pointer',
      color: '#b91c1c',
      fontWeight: '500'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    textareaWrapper: {
      position: 'relative',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      transition: 'all 0.2s ease',
      backgroundColor: '#fff'
    },
    textarea: {
      width: '100%',
      padding: '1rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '0.95rem',
      color: '#1f2937',
      resize: 'none',
      minHeight: '120px',
      outline: 'none',
      fontFamily: 'inherit',
      lineHeight: '1.5'
    },
    textareaDisabled: {
      backgroundColor: '#f9fafb',
      color: '#9ca3af',
      cursor: 'not-allowed'
    },
    button: {
      width: '100%',
      padding: '0.875rem 1.25rem',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
    },
    buttonDisabled: {
      backgroundColor: '#e5e7eb',
      color: '#9ca3af',
      cursor: 'not-allowed',
      boxShadow: 'none'
    },
    examplePrompts: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
    },
    examplesTitle: {
      fontSize: '0.9rem',
      color: '#6b7280',
      marginBottom: '0.25rem'
    },
    exampleButton: {
      backgroundColor: '#f3f4f6',
      border: 'none',
      borderRadius: '8px',
      padding: '0.75rem 1rem',
      fontSize: '0.875rem',
      color: '#4b5563',
      textAlign: 'left',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      justifyContent: 'space-between',
      textDecoration: 'none',
      alignItems: 'center',
      fontFamily: 'Poppins, system-ui, -apple-system, sans-serif',
    },
    footer: {
      fontSize: '0.8rem',
      color: '#9ca3af',
      textAlign: 'center',
      marginTop: '1rem'
    },
    loadingContainer: {
      backgroundColor: '#f0f9ff',
      borderRadius: '8px',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      transition: 'all 0.3s ease',
      border: '1px solid #bfdbfe'
    },
    loadingHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#1d4ed8'
    },
    loadingTitle: {
      fontWeight: '600',
      fontSize: '1rem',
      marginBottom: '0'
    },
    progressBar: {
      height: '6px',
      backgroundColor: '#dbeafe',
      borderRadius: '3px',
      overflow: 'hidden',
      position: 'relative'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#3b82f6',
      borderRadius: '3px',
      transition: 'width 0.5s ease'
    },
    etapaInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginTop: '0.5rem'
    },
    etapaIcon: {
      backgroundColor: '#dbeafe',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0
    },
    etapaText: {
      fontSize: '0.95rem',
      color: '#1e40af',
      fontWeight: '500'
    }
  };

  // Ejemplos de problemas comunes
  const ejemplosProblemas = [
    "Mi carro hace un ruido extraño al frenar",
    "El motor se apaga cuando esta en ralenti",
    "El aire acondicionado no enfria lo suficiente"
  ];


  // Avanzar progresivamente por las etapas durante la carga
  useEffect(() => {
    let intervalId;
    if (cargando) {
      setEtapaAnalisis(0);
      intervalId = setInterval(() => {
        setEtapaAnalisis(prevEtapa => {
          if (prevEtapa >= mensajesAnalisis.length - 1) {
            clearInterval(intervalId);
            return mensajesAnalisis.length - 1;
          }
          return prevEtapa + 1;
        });
      }, 1200);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [cargando]);


  const enviarProblema = async () => {
    setCargando(true);

    try {
      const apiPromise = fetch('/api/asistente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: mensaje.trim(), userId: user ? user.id : null }),
      });
      
      const minDelay = new Promise(resolve => setTimeout(resolve, 4000));
      
      const [res] = await Promise.all([apiPromise, minDelay]);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al procesar la solicitud en la API.');
      }

      const data = await res.json();
      const slug = data.slug;
      
      if (slug) {
        router.push(`/diagnostico/${slug.replaceAll(' ', '-').toLowerCase()}`);
      } else {
        throw new Error('La API no devolvió un identificador válido.');
      }

    } catch (error) {
      alert(`Ocurrió un error: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  const seleccionarEjemplo = (ejemplo) => {
    setMensaje(ejemplo);
  };

  const getIconoEtapa = (index) => {
    switch (index) {
      case 0: return <Search size={18} color="#3b82f6" />;
      case 1: return <CheckCircle size={18} color="#3b82f6" />;
      case 2: return <Database size={18} color="#3b82f6" />;
      default: return <Loader size={18} color="#3b82f6" />;
    }
  };


  return (
   <LayoutV2  onNavigate={router.push}>

      {/* Contenido principal */}
      <div style={styles.mainContent}>
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={styles.titleContainer}>
              <svg width="48" height="48" viewBox="0 0 108 120" fill="#3B82F6" xmlns="http://www.w3.org/2000/svg">
            <path d="M85.6473 0.693939C80.7556 2.24751 78.5224 4.55107 74.5878 12.1046C73.5244 14.2475 71.6634 17.0868 70.4936 18.4261C68.2605 20.9975 61.7736 26.7297 61.1356 26.7297C60.9229 26.7297 60.2849 25.444 59.7 23.944C57.7858 19.0154 53.9575 17.5154 49.3849 19.8725C47.258 20.9975 46.1415 22.3904 45.3971 24.6939C45.1844 25.4439 44.5463 25.6582 42.579 25.6582C37.9532 25.6582 33.9122 29.0868 33.9122 32.9439C33.9122 34.4439 33.6995 34.7654 32.8488 34.7654C30.9878 34.7654 27.5317 36.8547 26.4683 38.6761C25.8834 39.6404 25.4049 41.3547 25.4049 42.5868C25.4049 44.4618 25.1922 44.8904 24.1819 45.1582C20.0346 46.1761 17.6419 52.3368 19.8219 56.1939C20.2473 56.9439 20.5663 57.8011 20.6195 58.1225C20.6195 58.4439 18.2268 60.7475 15.3556 63.3189C11.5805 66.5868 9.45365 68.0868 7.75218 68.5154C6.2634 68.9439 4.72145 69.9082 3.23267 71.4618C-0.648792 75.5332 -1.07416 81.8547 2.16926 86.3011C6.31657 91.9797 16.6849 91.2832 20.0878 85.0689C21.2044 82.9797 28.1697 76.0154 29.1268 76.0154C29.3395 76.0154 29.818 76.8189 30.2966 77.7297C30.7751 78.6939 32.2639 80.9439 33.5932 82.7118L36.0922 85.8725L35.9858 96.9082L35.9327 107.89L39.761 110.89C41.8346 112.551 45.9819 115.283 48.8532 116.998C53.6917 119.783 54.2234 119.998 55.0741 119.248C55.5527 118.765 58.2644 116.998 61.0293 115.283C63.7941 113.569 67.4629 111.212 69.1112 110.033L72.1419 107.89L72.3015 92.3547L72.461 76.8189L75.0132 70.1225C81.4468 53.3011 81.5 53.0332 76.7146 45.6939L73.2585 40.3904L74.8536 38.9975C79.2136 35.2475 85.3283 33.1582 91.8683 33.1582C94.0483 33.1582 96.8132 32.8904 97.9297 32.5689C100.695 31.8189 105.267 27.1582 107.022 23.3011C108.617 19.8189 109.308 15.8011 108.404 15.2654C108.085 15.0511 105.852 16.0689 103.406 17.5154C96.4941 21.7475 95.6434 22.0689 94.6863 21.3189C94.261 20.9439 92.8254 19.1225 91.5493 17.2475C89.4756 14.3547 89.2097 13.7118 89.4756 12.0511C89.6883 11.0332 90.22 10.0689 90.6985 9.85464C92.8254 9.05107 100.907 3.53321 100.907 2.89036C100.907 2.03321 98.8336 1.17607 95.1117 0.479644C91.3897 -0.216784 88.4122 -0.163204 85.6473 0.693939ZM91.0707 2.56893C90.7517 2.83679 89.6351 3.31893 88.5717 3.64036C87.5083 4.01536 85.7005 4.97965 84.5307 5.78322C78.8414 9.96179 79.4795 18.6939 85.86 24.6939C90.539 29.0332 96.0156 29.5154 100.854 26.0332C104.044 23.7297 104.417 24.1047 101.599 26.8368C98.8336 29.4618 97.7171 29.9439 94.4736 29.9439C90.3263 29.9439 87.7741 28.9261 84.6371 26.0332C75.3854 17.5689 76.9273 5.19393 87.4551 2.67607C90.22 2.03321 91.6556 1.97965 91.0707 2.56893ZM74.3751 21.5868C71.8229 24.2118 71.7697 23.8904 75.3854 28.4975C77.8844 31.6582 78.7351 32.0868 80.4897 30.7475C81.0215 30.3189 82.1912 29.9439 83.0419 29.9439C85.0093 29.9439 84.318 30.6404 81.6063 31.5511C80.4366 31.9261 77.9907 33.2654 76.0766 34.6046C73.2054 36.5868 72.5141 36.8546 71.8229 36.2654C71.1317 35.7296 71.3444 35.3547 73.2585 33.6939L75.5449 31.7118L73.5776 28.7118C72.5141 26.9975 71.6634 25.3904 71.6634 25.1225C71.6634 24.1582 71.0254 24.5868 67.0376 28.0689C63.2624 31.3904 61.9332 32.0868 61.3483 31.0689C61.1888 30.8547 63.4219 28.5511 66.3463 25.9797C69.2707 23.4618 72.5673 20.1939 73.6839 18.7475L75.6512 16.1761L76.1297 17.7297C76.5551 19.1225 76.3956 19.4975 74.3751 21.5868ZM55.7122 22.1761C56.3502 22.9797 59.0088 31.0689 58.6897 31.3904C58.4771 31.6582 50.2356 29.8904 49.2785 29.3547C47.258 28.2832 47.9493 23.4618 50.2888 22.2297C52.1497 21.1582 54.8615 21.1582 55.7122 22.1761ZM45.3439 29.6225C46.0351 30.6939 46.0883 31.2832 45.5566 33.2654C44.6527 36.6939 45.2907 39.2654 47.8429 42.0511C49.0658 43.3368 49.9166 44.5154 49.8102 44.5689C49.2254 45.0511 44.5995 47.6225 44.3868 47.6225C44.0146 47.6225 39.4419 40.1225 37.7405 36.8011C36.039 33.4261 36.4112 30.9082 38.8571 29.4082C41.3029 27.9082 44.2805 28.0154 45.3439 29.6225ZM53.6162 33.7476C54.6162 34.2476 53.8496 33.7119 55.1162 34.2476C58.9977 35.5868 58.6162 35.2476 59.6162 35.2476C60.1162 34.7476 60.4444 34.7654 62.5712 34.7654C66.0805 34.7654 66.8249 35.5154 72.4078 44.3546C76.0234 50.0332 76.9805 51.9618 76.9805 53.5154C76.9805 54.6404 75.5449 59.3547 73.7902 64.1761C70.1214 74.1939 69.5897 75.2654 67.7288 77.0332C66.559 78.1582 65.8146 78.3725 62.9966 78.3189C58.3176 78.2654 55.978 76.8725 53.2132 72.4797C52.6815 71.6225 52.6815 71.7832 53.0536 73.2832C53.9575 76.5511 57.52 79.2297 61.0293 79.2297C61.9863 79.2297 62.5712 79.4439 62.3585 79.7654C61.8268 80.6225 58.4771 80.4082 56.4034 79.3904C55.3932 78.9082 53.8512 77.5689 53.0005 76.3904C51.6712 74.5689 51.4585 73.7118 51.4585 70.9261C51.4585 64.5511 53.9044 59.4618 58.5834 56.1939C60.6039 54.8547 61.1888 54.6404 62.0927 55.1225C63.5815 55.9261 68.8985 56.8368 69.5366 56.4618C69.8556 56.2475 68.6858 55.1761 66.9844 54.0511C65.2297 52.9261 63.6346 51.6939 63.3688 51.2654C63.0497 50.7297 63.1561 50.7297 63.8473 51.3189C65.3361 52.4975 65.4956 51.5868 64.2195 49.5511L63.1029 47.6225L64.4322 45.8546C66.24 43.4975 66.1868 43.2297 63.9537 44.1939C61.4546 45.2118 58.9024 45.1582 55.7122 43.9261C49.2785 41.4618 46.2478 36.6939 48.9063 33.2654C49.8102 32.1404 52.6162 33.2476 53.6162 33.7476ZM36.0922 39.6939C38.219 42.6939 42.9512 50.5689 42.9512 51.1582C42.9512 51.9618 35.9858 55.3368 35.6136 54.7475C35.401 54.4797 33.9122 52.3368 32.2639 49.9797C28.2229 44.2475 27.9039 43.5511 28.3293 41.3547C28.5419 40.0689 29.18 39.2118 30.3497 38.5154C33.0083 36.8547 34.2312 37.1225 36.0922 39.6939ZM29.5522 50.6761C32.2107 54.3725 33.5932 56.7297 33.2741 56.9439C31.679 58.1761 28.0102 60.4797 27.638 60.4797C27.3722 60.4797 25.9366 59.0332 24.4478 57.2118C22.3741 54.7475 21.6829 53.5154 21.6829 52.2297C21.6829 49.6047 23.7566 47.2475 26.3088 47.1404C26.6278 47.0868 28.0634 48.6939 29.5522 50.6761ZM20.9385 64.9261L17.3761 68.0868L19.5561 70.4439C20.7258 71.7297 21.6829 73.1225 21.6829 73.6047C21.6829 74.8904 22.4805 74.5689 26.2556 71.6761C29.0205 69.5868 30.0839 69.0511 30.8283 69.4261C31.679 69.8011 31.2536 70.3368 27.7444 73.3368C21.8956 78.3725 22.2146 78.3189 21.4702 74.8368C20.9917 72.6404 18.7054 70.2832 16.1 69.2654L13.7073 68.3547L16.2063 66.1582C21.5234 61.4439 22.9058 60.4797 23.7034 61.1761C24.2883 61.6582 23.7566 62.3547 20.9385 64.9261ZM47.5771 70.9261C47.7366 74.1404 48.481 76.2297 50.5546 78.9082C52.4156 81.3189 52.2029 82.0689 49.0127 83.8904C46.62 85.2832 43.2171 85.4975 40.6649 84.3725C38.219 83.3547 34.4439 78.9082 34.4439 77.0868C34.4439 76.2832 34.9756 75.1582 35.72 74.4618C37.2088 73.0689 46.1946 68.0332 46.939 68.2475C47.258 68.3011 47.5239 69.5332 47.5771 70.9261ZM15.8873 71.8904C17.1634 72.6939 19.5561 77.3547 19.5561 79.1225C19.5561 79.8189 19.0775 81.5332 18.4395 82.9797C17.5356 85.0689 16.8975 85.8189 14.9834 86.6761C12.0058 88.1225 9.7195 88.0689 6.79511 86.5689C4.66828 85.5511 4.29609 85.0154 3.23267 82.1225L2.11609 78.9082L3.23267 75.9618C4.24291 73.5511 4.77462 72.8547 6.79511 71.8368C8.76243 70.8189 9.7195 70.6582 12.0058 70.8725C13.5478 71.0868 15.3024 71.5154 15.8873 71.8904ZM68.9517 95.6225C68.9517 100.926 68.739 105.533 68.5263 105.908C68.3136 106.283 67.8883 106.337 67.4097 106.015C66.7717 105.64 66.559 103.658 66.2932 96.9618C66.1336 92.2475 65.8678 88.2297 65.7083 88.0689C65.3893 87.6939 61.1356 88.6047 60.6039 89.1404C60.3912 89.3547 60.1785 93.4261 60.0722 98.3011C59.9127 107.033 59.9127 107.087 58.6897 107.087C57.5732 107.087 57.4136 106.765 57.1478 103.444C56.9351 101.462 56.7756 98.4618 56.7756 96.7475C56.7756 92.4618 55.8717 92.9439 55.4463 97.4439C54.8615 103.498 54.1171 101.194 54.1171 93.1582C54.1171 84.5868 53.3195 85.5511 60.7102 84.5868C63.0497 84.2654 65.6551 83.6225 66.559 83.0868L68.2073 82.1225L68.5795 83.9975C68.7922 85.0689 68.9517 90.2654 68.9517 95.6225Z" fill="#3B82F6" />
            <path d="M6.869 73.1785C5.38022 73.8214 4.689 74.5714 3.83827 76.6071C2.77486 79.1249 2.77486 79.3392 3.57242 81.5356C4.63583 84.3214 5.11437 84.8035 7.61339 85.6071C9.26169 86.1964 10.0592 86.1428 12.4519 85.4464C15.2168 84.6428 15.3231 84.5356 16.2802 81.6964C17.2373 78.9106 17.2373 78.7499 16.2802 76.6606C15.7485 75.4821 14.951 74.1428 14.4724 73.7678C13.09 72.5356 9.10217 72.2678 6.869 73.1785ZM13.8875 77.0356C14.7383 78.9106 14.7914 79.4464 14.1534 81.2678C13.6217 82.8749 13.1431 83.3571 11.7607 83.6249C9.58071 84.1071 6.44364 83.1428 6.44364 82.0178C6.44364 81.5356 6.07144 80.6249 5.64608 79.9821C5.00803 79.0178 4.95486 78.7499 5.59291 78.2678C6.01827 77.8928 6.49681 77.0356 6.65632 76.3392C6.97534 74.9999 8.03876 74.6249 11.1758 74.7856C12.6646 74.8392 13.09 75.1606 13.8875 77.0356Z" fill="#3B82F6" />
          </svg>
              {/* <h1 style={styles.title}>¿Tu carro está fallando?</h1> */}
              <h1 style={styles.title}>DiagnostiCar</h1>

            </div>
            <p style={styles.subtitle}>Bienvenido {user?.user_metadata?.name}. Describe el problema que tiene tu carro y recibe un diagnóstico instantáneo junto con estimados de reparación.</p>
          </div>

          {bloqueado && (
            <div style={styles.alert}>
              <AlertTriangle size={24} style={styles.alertIcon} />
              <div style={styles.alertContent}>
                <span>Has alcanzado tu límite de consultas gratuitas.</span>
                <div
                  style={styles.loginPrompt}
                  onClick={() => router.push('/login')}
                  onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  <LogIn size={16} />
                  <span>Inicia sesión o regístrate para continuar</span>
                </div>
              </div>
            </div>
          )}

          {/* Estado de análisis */}
          {cargando && (
            <div style={styles.loadingContainer}>
              <div style={styles.progressBar}>
                <div 
                  style={{
                    ...styles.progressFill,
                    width: `${((etapaAnalisis + 1) / mensajesAnalisis.length) * 100}%`
                  }}
                ></div>
              </div>
              <div style={styles.etapaInfo}>
                <div style={styles.etapaIcon}>
                  {getIconoEtapa(etapaAnalisis)}
                </div>
                <span style={styles.etapaText}>
                  {mensajesAnalisis[etapaAnalisis]}
                </span>
              </div>
            </div>
          )}

          <div style={styles.formGroup}>
            <div
              style={{
                ...styles.textareaWrapper,
                boxShadow: mensaje ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none',
                borderColor: mensaje ? '#3b82f6' : '#e5e7eb',
                ...(bloqueado || cargando ? { borderColor: '#d1d5db', backgroundColor: '#f9fafb' } : {})
              }}
              onMouseOver={(e) => {
                if (!bloqueado && !cargando) e.currentTarget.style.borderColor = '#3b82f6';
              }}
              onMouseOut={(e) => {
                if (!bloqueado && !cargando && !mensaje) e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <textarea
                style={{
                  ...styles.textarea,
                  ...(bloqueado || cargando ? styles.textareaDisabled : {})
                }}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Ej: Mi Chevrolet Optra 1.8 2009 hace un ruido al frenar..."
                disabled={bloqueado || cargando}
              ></textarea>
            </div>
          </div>

          <button
            style={
              mensaje.trim() && !bloqueado && !cargando
                ? styles.button
                : { ...styles.button, ...styles.buttonDisabled }
            }
            onClick={enviarProblema}
            disabled={!mensaje.trim() || cargando || bloqueado}
            onMouseOver={(e) => {
              if (mensaje.trim() && !bloqueado && !cargando) {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }
            }}
            onMouseOut={(e) => {
              if (mensaje.trim() && !bloqueado && !cargando) {
                e.currentTarget.style.backgroundColor = '#3b82f6';
              }
            }}
          >
            {cargando ? (
              <>
                <Loader size={20} className="animate-spin" />
                <span>Analizando...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Analizar problema</span>
              </>
            )}
          </button>

          {!bloqueado && !cargando && (
            <div style={styles.examplePrompts}>
              <p style={styles.examplesTitle}>O prueba con uno de estos ejemplos:</p>
              {ejemplosProblemas.map((ejemplo, idx) => (
                <Link
                  key={idx}
                  href={`/diagnostico/${ejemplo.replaceAll(' ', '-').toLowerCase()}`}
                  style={styles.exampleButton}
                  onClick={() => seleccionarEjemplo(ejemplo)}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                >
                  <span>{ejemplo}</span>
                  <ChevronRight size={16} color="#6b7280" />
                </Link>
              ))}
            </div>
          )}

          <div style={styles.footer}>
            Mecánico Virtual &copy; {new Date().getFullYear()} — Diagnósticos de carro rápidos y confiables
          </div>
        </div>
      </div>
    </LayoutV2>
  );
};

export default IndexPage;