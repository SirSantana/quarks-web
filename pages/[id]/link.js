import { client } from '@/client';
import { GET_ONE_NEGOCIOVDOS } from '@/graphql/queries';
import Image from 'next/image';
import dynamic from "next/dynamic";
import styles from '@/styles/Negocio.module.css'
import { getLatLng } from '@/utils/scripts';

const MapaUbicacion = dynamic(() => import('@/src/Components/Talleres/MapaUbicacion'),
  { ssr: false, loading: () => <div className={styles.skeletonMap} /> })
const MapaCobertura = dynamic(() => import('@/src/Components/Talleres/MapaBogotaCobertura'),
  { ssr: false, loading: () => <div className={styles.skeletonMap} /> })
export default function TallerLink ({data}) {
const position = getLatLng({ data: data });
  return (

    <div
      style={{
        padding: '20px',
        fontFamily: "'Poppins', sans-serif",
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        gap: '20px',
        paddingTop:'15%'
      }}
    >

      {/* <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -10,
          height: '100%',
          width: '100%',
          background: 'radial-gradient(125% 125% at 50% 10%, #fff 40%, #407BFF 100%)',
          backgroundColor: '#ffffff', // Fondo blanco como base
        }}
      ></div> */}
      <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -10,
        height: '100%',
        width: '100%',
        background: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
        backgroundSize: '16px 16px',
        backgroundColor: '#ffffff', // Asegura el fondo blanco
      }}
    ></div>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Image
            src={data?.fotoperfil} // Cambia a la ruta correcta de tu logo
            alt={data?.nombre}
            width={200}
            height={200}
            style={{ borderRadius: '50%', border: '2px solid #e0e0e0', objectFit: 'cover', width: '200px', height: '200px' }}
          />
        </div>
        
      </div>
      <h2 style={{ fontSize: '14px', color: '#007BFF', fontWeight:'500' }}>
      {data?.tipo == 'Almacen' ? "Almacén de Autopartes" : data?.tipo == 'Mecanico a Domicilio' ? "Mecánico a domicilio" : "Taller Mecánico"}
        </h2>
      <h1
        style={{
          fontSize: '28px',
          fontWeight: '600',
          lineHeight: '1.2',
          color: '#333',
        }}
      >
        {data?.nombre}
      </h1>
      <p style={{ fontSize: '14px', color: '#666'}}>
        Taller enfocado en la calidad de nuestro servicio, con garantía, confiabilidad y empeño
      </p>
      <p style={{ fontSize: '14px', color: '#007BFF', marginBottom: '20px' }}>
        📍 <span>{data?.ciudad}, {data?.pais}</span>
      </p>
      {data.tipo === 'Mecanico a Domicilio'
                  ?
                  <MapaCobertura coordenadas={data?.coordenadas ? data?.coordenadas : position} img={data?.fotoperfil} direccion={data
                    ? `${data.direccion || ''} ${data.localidad ? data.localidad + ' ' : ''}${data.ciudad || ''}. ${data.pais || ''}`
                    : ''} nombre={data?.nombre} />
                  :
                  <MapaUbicacion ubicacion={data?.ubicacionmaps} username={data?.userName} idNegocio={data?.id} nombre={data?.nombre} direccion={data
                    ? `${data.direccion || ''} ${data.localidad ? data.localidad + ' ' : ''}${data.ciudad || ''}. ${data.pais || ''}`
                    : ''} coordenadas={data?.coordenadas ? data?.coordenadas : position} img={data?.fotoperfil} />
                }
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '5px',
          marginBottom: '20px',
        }}
      >
        <span style={{ color: '#FFC107' }}>⭐⭐⭐⭐⭐</span>
        <span style={{ fontSize: '12px', color: '#666' }}>(210 reviews)</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '20px',
        }}
      >
        <a href="#">
          <Image src="/icons/linkedin.svg" alt="LinkedIn" width={30} height={30} />
        </a>
        <a href="#">
          <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={30} height={30} />
        </a>
        <a href="#">
          <Image src="/icons/instagram.svg" alt="Instagram" width={30} height={30} />
        </a>
        <a href="#">
          <Image src="/icons/email.svg" alt="Email" width={30} height={30} />
        </a>
      </div>

    </div>
  );
};
export async function getServerSideProps({ query, res }) {
  const parts = query?.id;
  
  const { data, error, loading } = await client.query(
    {
      query: GET_ONE_NEGOCIOVDOS,
      variables: { userName: parts.replace(/&/g, '') },
      fetchPolicy: 'cache-first', // Evita consultas repetidas usando la caché
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
