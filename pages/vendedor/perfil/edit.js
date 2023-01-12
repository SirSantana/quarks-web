import Layout from "../../../components/Layout";

import FormEditProfile from "../../../components/Cotizaciones/Venderdor/FormEditProfile";


export default function EditProfile() {

  return (
    <Layout title={'Editar perfil | Quarks'} description={'Cambia los datos de tu cuenta de vendedor'}>
      <FormEditProfile/>
    </Layout>
  )
}