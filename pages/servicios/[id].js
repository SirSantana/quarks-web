import BuscadorBasico from "@/src/Components/LandingPage/BuscadorBasico"
import SectionFixedServicios from "@/src/Components/LandingPage/SectionFixedServicios"
import Layout from "@/src/Components/Layout"
import Text, { TextAs, TextWeight } from "@/src/Components/Text/Text"
import { useRouter } from "next/router"
import styles2 from '@/styles/Landing.module.css'
import CardNewTaller from "@/src/Components/LandingPage/CardNewTaller"
import Icon, { IconCatalog } from "@/src/Components/Icon/Icon"
import { client } from "@/client"
import { GET_NEGOCIOSVDOS_BY_SERVICIO } from "@/graphql/queries"
import { useQuery } from "@apollo/client"
import { useEffect, useRef } from "react"


export default function Servicio() {
  const router = useRouter()
  const resultsRef = useRef(null)
  const { loading, data, error } = useQuery(GET_NEGOCIOSVDOS_BY_SERVICIO, {
    variables: { tipo: router?.query?.id?.replace(/-/g, ' ') },
    onCompleted: () => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
  // useEffect(() => {
  //   if (resultsRef.current) {
  //     resultsRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [data]);
  return (
    <Layout visibleNavbar={false} title={`Talleres de  ${router?.query?.id?.replace(/-/g, ' ')} cerca a mi en Bogota, Colombia`} >
      <SectionFixedServicios />
      <section  className={styles2.containerListTalleres} >
        <div ref={resultsRef} style={{ marginBottom: '32px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <p>{router?.query?.id ? `Se encontraron ${data?.getNegociosVDosByServicio.length} talleres mecanicos de ${router.query.id.replace(/-/g, ' ')} cerca a mi en Bogota` : 'Se encontraron +100 talleres en Bogota'}</p>

          <div>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '8px 12px', width: 'fit-content', alignItems: 'center', gap: '8px', border: '1px solid #D5D5D5', borderRadius: '4px' }}>
              <Icon name={IconCatalog.optionsOutline} />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Filtrar</span>
            </div>
          </div>
        </div>


        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start', justifyContent: 'space-between' }} >
          {loading
            ?
            <>
              <div className={styles2.cardNewTallerSkeleton} />
              <div className={styles2.cardNewTallerSkeleton} />
              <div className={styles2.cardNewTallerSkeleton} />
              <div className={styles2.cardNewTallerSkeleton} />
            </>

            :
            data?.getNegociosVDosByServicio?.map((taller, index) => (
              <CardNewTaller key={taller.nombre} taller={taller} />
            ))}
        </div>
      </section>
    </Layout>
  )
}
// export async function getServerSideProps({ query }) {
//   const { data, error, loading } = await client.query(
//     {
//       query: GET_NEGOCIOSVDOS_BY_SERVICIO,
//       variables: { tipo: query.id.replace(/-/g, ' ') }
//     }
//   )
//   return {
//     props: {
//       data: data.getNegociosVDosByServicio,
//     },
//   };
// }