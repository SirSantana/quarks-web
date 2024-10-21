import { useQuery } from "@apollo/client";
import { GET_REVISIONES } from "@/graphql/queries";
import Revision from "./Revision";
import styles from '@/styles/Negocio.module.css'


export default function Revisiones({ id }) {
  const { data, loading, error } = useQuery(GET_REVISIONES, { variables: { id: id } })
  return (
    <>
      <h2 style={{ fontSize: '20px', alignSelf: 'flex-start', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '24px' }}>Otras personas han solicitado:</h2>
      <div
        className={styles.gridRevisiones}
      >
        {data?.getRevisiones?.map(revision => <Revision data={revision} key={revision.id} />)}
      </div>
    </>

  )
}