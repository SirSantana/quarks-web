
import { client } from '@/client';
import { GET_ARTICULOS_BLOG } from '@/graphql/queries';
import Layout from '@/src/Components/Layout'
import styles from '@/styles/Articulos.module.css'
import Link from 'next/link';

export default function ArticulosHome({ data }) {
  return (
    <Layout title={'Novedades del Mundo Automotor'}>
      <div className={styles.containerBlog}>
        <h1 style={{ textAlign: 'center' }} className={styles.title}>Novedades del mundo automotor</h1>
        <h4 style={{ textAlign: 'center', lineHeight: '20px' }} className={styles.response}>Descubre las noticias mas relevantes del sector automotriz, como novedades tecnologias, reseñas y mas.</h4>

        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: '24px', marginTop: '48px' }}>
          {data?.map(articulo => {
            const fechaFormateada = new Date(articulo.fecha).toLocaleDateString('es-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            return (
              <Link href={`/articulos/${articulo.tituloPrincipal.replace(/ /g, "-")}-${articulo.id}`} style={{color:'#373737', textDecoration:'none', width: '300px', display: 'flex', flexDirection: 'column' }}>
                <img style={{ borderRadius: '8px', width: '100%', objectFit: 'cover', height: '180px' }} src={articulo?.imgPrincipal} />
                <div style={{ padding: '8px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems:'center' }}>
                    <h6 style={{ fontSize: '12px', color: '#f50057', fontWeight: '600' }}>{articulo.tema}</h6>
                    <div style={{display:'flex', flexDirection:'row', gap:'4px', alignItems:'center'}}>
                    <ion-icon style={{color:'#5C5C5C', fontSize:'16px'}} name="eye-outline"></ion-icon>
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