
import { client } from '@/client';
import { GET_ARTICULOS_BLOG } from '@/graphql/queries';
import Layout from '@/src/Components/Layout'
import styles from '@/styles/Articulos.module.css'
import Link from 'next/link';

export default function ArticulosHome({ data }) {
  return (
    <Layout title={'Novedades del Mundo Automotor'} >
      <div className={styles.containerBlog}>
        <h1 style={{ textAlign: 'center' }} className={styles.title}>Novedades del mundo automotor</h1>
        <h4 style={{ textAlign: 'center', lineHeight: '20px' }} className={styles.response}>Descubre las noticias mas relevantes del sector automotriz, como novedades tecnologias, reseñas y mas.</h4>

        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: '24px', marginTop: '48px' }}>
          <Link href={'/pico-y-placa-hoy-bogota'} style={{ textDecoration: 'none', color: '#373737', width: '280px', borderRadius: '10px', padding: '8px', margin: '32px 0', backgroundColor: '#FFC003', height: '100px' }} >
            <div style={{ backgroundColor: 'transparent', border: '4px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
              <h4 style={{ fontSize: '32px', fontFamily: 'fantasy', letterSpacing: '6px', fontWeight: '100' }}>PICO Y PLACA</h4>
            </div>
          </Link>
          <Link href={'/calculadora-de-cilindraje-de-un-vehiculo'} style={{ textDecoration: 'none', color: 'white', width: '280px', borderRadius: '10px', padding: '16px', margin: '32px 0', backgroundColor: '#373737', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
            <h4 style={{ fontSize: '48px', }}>1600cc</h4>
            <p style={{ color: 'white', fontSize: '14px', textAlign: 'end', alignSelf: 'flex-end' }}>Calcula tu cilindrada aquí</p>
          </Link>
          <Link href={'/engine-displacement-calculator'} style={{ textDecoration: 'none', color: 'white', width: '280px', borderRadius: '10px', padding: '16px', margin: '32px 0', backgroundColor: '#373737', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
            <h4 style={{ fontSize: '48px', }}>1600cc</h4>
            <p style={{ color: 'white', fontSize: '14px', textAlign: 'end', alignSelf: 'flex-end' }}>Displacement Engine calculator</p>
          </Link>
          <Link href={'/calculadora-de-combustible'} style={{ textDecoration: 'none', color: 'white', width: '280px', borderRadius: '10px', padding: '16px', margin: '32px 0', backgroundColor: '#f50057', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
            <h4 style={{ fontSize: '48px', }}>6.82 <b style={{ fontSize: '18px', fontWeight: '400' }}>/ gl</b></h4>
            <p style={{ color: 'white', fontSize: '14px', textAlign: 'end', alignSelf: 'flex-end' }}>Calcula el consumo de combustible</p>
          </Link>
          {data?.map(articulo => {
            const fechaFormateada = new Date(articulo.fecha).toLocaleDateString('es-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            return (
              <Link href={`/articulos/${articulo.tituloPrincipal.replace(/ /g, "-")}-${articulo.id}`} className={styles.containerCardArticulo}>
                <img style={{ borderRadius: '8px', width: '100%', objectFit: 'cover', height: '180px' }} src={articulo?.imgPrincipal} />
                <div style={{ padding: '8px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h6 style={{ fontSize: '12px', color: '#f50057', fontWeight: '600' }}>{articulo.tema}</h6>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', alignItems: 'center' }}>
                      <ion-icon style={{ color: '#5C5C5C', fontSize: '16px' }} name="eye-outline"></ion-icon>
                      <p style={{ fontSize: '12px', color: '#5C5C5C' }}>{articulo.vistas}</p>
                    </div>

                  </div>
                  <h2 style={{ fontWeight: '600', fontSize: '16px' }}>{articulo.tituloPrincipal}</h2>
                  <p style={{ fontSize: '12px', color: '#c5c5c5' }}>{fechaFormateada}</p>

                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const { data } = await client.query(
    {
      query: GET_ARTICULOS_BLOG,
    }
  )
  return {
    props: {
      data: data?.getArticulosBlog,
    },
  };
}