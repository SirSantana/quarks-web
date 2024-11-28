import { useQuery } from "@apollo/client";
import { GET_REVISIONES } from "@/graphql/queries";
import Revision from "./Revision";
import styles from '@/styles/Negocio.module.css'
import CardSolicitudServicio from "./V3/CardSolicitudServicio";


export default function Revisiones({ id }) {
  const { data, loading, error } = useQuery(GET_REVISIONES, { variables: { id: id } })
  return (
    <>
      <h2 style={{ fontSize: '20px', alignSelf: 'flex-start', fontWeight: '600', display: 'flex', gap: '16px', marginBottom: '24px' }}>Otras personas han solicitado:</h2>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', margin: '0 auto', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {data?.getRevisiones?.map(el => <CardSolicitudServicio revision={el} key={el.id} />)}
      </div>
    </>

  )
}