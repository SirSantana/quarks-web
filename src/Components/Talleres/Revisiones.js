import Box from "../Box/Box";
import Icon, { IconCatalog } from "../Icon/Icon";
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { categorias2 } from "./ServiciosOfrecidos";
import { useQuery } from "@apollo/client";
import { GET_REVISIONES } from "@/graphql/queries";
import Revision from "./Revision";
import Divider from "../Box/Divider";



export default function Revisiones({id}) {
  const {data, loading, error} = useQuery(GET_REVISIONES, {variables:{id:id}})
  console.log(data, id);
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600', display: 'flex', gap: '16px' }} className={styles.titleNegocio}><Icon name={IconCatalog.readerOutline} size='lg' />Solicitudes Revision </h2>
      <Box>
        {data?.getRevisiones?.map(revision=> <><Revision data={revision}/> <div style={{width:'100%', height:'1px', backgroundColor:'#c5c5c5'}}/></>)}
      </Box>
    </>

  )
}