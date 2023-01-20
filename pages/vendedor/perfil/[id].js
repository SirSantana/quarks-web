import { useRouter } from "next/router";
import CotizacionesVendedor from "../../../components/Cotizaciones/Venderdor/Cotizaciones";
import Layout from "../../../components/Layout";
import useAuth from "../../../hooks/useAuth";
import styles from '../../../styles/vendedor.module.css'
import { useLazyQuery } from '@apollo/client'
import { GET_ONE_USER } from "../../../graphql/queries";
import { useEffect } from "react";

export default function PerfilVendedor() {
  const router = useRouter()
  const [getOneUser, { loading, data, error }] = useLazyQuery(GET_ONE_USER)
  const { user } = useAuth()
  useEffect(() => {
    if (router?.query?.id) {
      getOneUser({ variables: { id: router?.query?.id } })
    }
  }, [router?.query?.id])
  
  return (
    <Layout title={'Perfil Vendedor | Quarks'} description={'Perfil de cotizaciones de repuestos de carros en colombia'}>
      <section className={styles.container}>
        <div className={styles.containerDataPerfil}>
          <div className={styles.avatarContainer}>
            <div >
              {data?.getOneUser?.avatar 
              ?<img alt={data?.getOneUser?.name} src={data?.getOneUser?.avatar} style={{objectFit:'contain',height:'70px', width:'70px', backgroundColor:'white', borderRadius:'50%'}} />
              :<h1 className={styles.avatar}>{data?.getOneUser?.name[0]}</h1>
              }
            
            </div>
            <div className={styles.divLogos}>
              {data?.getOneUser?.marcas.map(marca => (
                <img key={marca} src={`/${marca}.png`} style={{ width: '30px', height: '30px' }} alt={`Repuestos de ${marca}`} />
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '65%' }}>
            <div className={styles.containerHeader1}>
              <h2 style={{ margin: 0, color: '#464646', fontSize: '20px', fontWeight: '500' }}>{data?.getOneUser?.almacen}</h2>
              {user?.id === data?.getOneUser?.id && <button onClick={()=> router.push('/vendedor/perfil/edit')} style={{ margin: 0, height: '30px', color: '#1b333d', border: 'lightGray 1px solid', cursor: 'pointer', backgroundColor: 'white', fontWeight: 600 }}>Editar Perfil</button>}
            </div>

            {/* <div className={styles.containerHeader1}>
              <h2 style={{ margin: 0, color: '#464646', fontSize: '16px', fontWeight: '400' }}><b>22</b> Cotizaciones</h2>
            </div> */}

            <div className={styles.containerHeader2}>
              <h2 style={{ margin: 0, color: '#464646', fontSize: '18px', marginBottom: '5px', fontWeight: 'bold' }}>{data?.getOneUser?.name}</h2>
              <h3 style={{ margin: 0, color: 'gray', fontSize: '16px', marginBottom: '5px', fontWeight: '400' }}>Vendedor</h3>
              <h3 style={{ margin: 0, color: '#464646', fontSize: '16px', fontWeight: '400' }}>{data?.getOneUser?.ciudad},{data?.getOneUser?.pais}</h3>
            </div>


          </div>

        </div>
        <div style={{ width: '100%', height: '1px', backgroundColor: 'gray' }}><h2 style={{ color: '#464646', margin:'10px' }}>Cotizaciones</h2>
          <CotizacionesVendedor user={user} />

        </div>
      </section>
    </Layout>
  )
}