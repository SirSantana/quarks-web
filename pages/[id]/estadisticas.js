import Layout from "@/src/Components/Layout";



export default function Estadisticas() {
  return (
    <Layout title={'Estadisticas'} visibleNavbar={false}>
      <div style={{ maxWidth: '400px', width: '90%', margin: '0 auto', display: 'flex', flexDirection: 'column', padding: '16px 0', boxSizing: 'border-box', gap: '40px' }}>

        <header style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
            <p style={{ flex: 1, fontWeight: '500', alignSelf: 'center', textAlign: 'center', fontSize: '14px' }}>Visitantes al Perfil</p>
            <h2>32</h2>
          </div>
          <div style={{ width: '100%', backgroundColor: '#f1f1f1', height: '1px' }} />
        </header>

        
      </div>
    </Layout>

  )
}