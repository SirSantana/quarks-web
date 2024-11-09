import { GET_ONE_NEGOCIOVDOS } from '@/graphql/queries'
import Layout from '@/src/Components/Layout'
import DataTaller from '@/src/Components/Talleres/V3/DataTaller'
import styles from '@/styles/Faq.module.css'
import { useQuery } from '@apollo/client'
import Image from 'next/image'
import { useRouter } from 'next/router'



export default function PerfilCreado() {
  const router = useRouter()
  const {loading,data, error} = useQuery(GET_ONE_NEGOCIOVDOS, {variables:{ userName: router.query.id}})
  return (
    <Layout title={'Perfil creado exitosamente'} visibleNavbar={false}>
      <div className={styles.containerAcceso} >
        <h1>Genial! Tu perfil ha sido creado!</h1>
        <div style={{width:'300px', position:'relative', marginTop:'64px'}} className={styles.divDesktopCard}>
          <Image
            sizes="100vw"
            width={300}
            height={380}
            style={{borderRadius:'12px', objectFit:'cover'}}
            src={data?.getOneNegocioVDos?.fotoperfil}
            priority={true}
            loading="eager"
            onClick={() => setVisibleModalImage(true)}
            alt={`Taller mecanico ${data?.nombre} Bogota`}
          />
          <div
          style={{width:'100%', borderRadius:'12px'}}
            className={styles.opacityImg}
          />
          <div className={styles.cardDataDesktop} >
            <DataTaller data={data?.getOneNegocioVDos} />
          </div>
        </div>
      </div>

    </Layout>

  )
}