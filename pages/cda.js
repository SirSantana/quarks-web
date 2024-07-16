import dynamic from 'next/dynamic'
import Layout from '@/src/Components/Layout';
import { useState } from 'react';
import Loader from '@/src/Components/Loaders/CardLoader';
import ModalNegocioV3 from '@/src/Components/Talleres/ModalNegocioV3';
import { client } from '@/client';
import { GET_NEGOCIOSVDOS_BY_TIPO } from '@/graphql/queries';
import HeaderNavTags from '@/src/Components/Gasolineras/HeaderNavTags';
import BuscadorBasico from '@/src/Components/LandingPage/BuscadorBasico';
// import MapV3 from '@/src/Components/Talleres/MapV3';
const MapV3= dynamic(() => import('@/src/Components/Talleres/MapV3'),
  { ssr: false, loading: () => <Loader /> })



export default function CDA({data}) {
  const [negocioCheck, setNegocioCheck] = useState(null)
  const [visibleModal, setVisibleModal] = useState(false)
  return (
    <Layout icon={'/logoterpel.png'} image={'/logoterpel.png'} title={'Mapa de Gasolineras en Bogota'} visibleNavbar={false} >
      {!data
        ?
        <div style={{ height: '100vh', width: '100vw', backgroundColor: '#d9d9d9', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: '24px', textAlign: 'center' }}>Estamos teniendo algunos problemas. Regresa pronto</p>
        </div>
        :
        <div style={{ width: '100%', height: '100%', boxSizing: 'border-box', margin: '0', padding: '0', position: 'relative' }}>
          <MapV3 data={data} negocioCheck={negocioCheck} setVisibleModal={setVisibleModal} setNegocioCheck={setNegocioCheck} />
          {/* <Sidebar
            isOpen={isSidebarOpen}
            onClose={toggleSidebar}
            header={<h2 style={{ fontSize: '18px', marginRight: '24px', fontWeight: '500' }}>Quarks</h2>}
            body={<p>This is the body content of the sidebar.</p>}
            footer={<button onClick={toggleSidebar}>Close Sidebar</button>}
          /> */}
          {/* <div onClick={() => setVisibleModalPicoyPlaca(true)} style={{ cursor: 'pointer', backgroundColor: '#FFC003', padding: '2px', borderRadius: '8px', margin: '16px auto 0px auto', position: 'absolute', bottom: '40px', right: '16px', zIndex: 1 }}>
            <div style={{ backgroundColor: 'transparent', border: '2px solid black', borderRadius: '8px', height: '100%', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', padding: '8px' }}>
              <p style={{ color: 'black', fontSize: '16px', fontFamily: 'Impact', fontWeight: '100' }}>Pico y Placa</p>
            </div>
          </div> */}
          <div style={{ zIndex: 2, position: 'absolute', top: '3%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'row', gap: '24px', width: '100%', transition: 'height 0.3s ease' }}>
            <BuscadorBasico size='small' />
          </div>
          <HeaderNavTags/>

        </div>}

        {visibleModal &&
        <ModalNegocioV3 data={negocioCheck} setVisibleModal={setVisibleModal}  />}
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const { data } = await client.query(
    {
      query: GET_NEGOCIOSVDOS_BY_TIPO,
      variables:{tipo:'CDA'}
    }
  )
  return{
    props:{
      data:data?.getNegociosVDosByTipo
    }
  }
}