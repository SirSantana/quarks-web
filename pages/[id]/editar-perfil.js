import Layout from "@/src/Components/Layout";
import { useRouter } from "next/router";
import { client } from "@/client";
import { GET_ONE_NEGOCIOVDOS } from "@/graphql/queries";
import EditDataImportante from "@/src/Components/Talleres/Edit/EditDataImportante";
import EditServicios from "@/src/Components/Talleres/Edit/EditServicios";
import EditRedesSociales from "@/src/Components/Talleres/Edit/EditRedesSociales";
import { useSession } from "next-auth/react";

export default function EditarPerfil({ data }) {
  const router = useRouter()
  const {data:user} =useSession()

  return (
    <Layout title={'Editar perfil'} visibleNavbar={false}>
      <div style={{ maxWidth: '400px', width: '90%', margin: '0 auto', display: 'flex', flexDirection: 'column', padding: '16px 0', boxSizing: 'border-box', gap: '40px' }}>
        <section style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
            <p style={{ flex: 1, fontWeight: '500', alignSelf: 'center', textAlign: 'center', fontSize: '14px' }}>Editar Perfil</p>
            <ion-icon onClick={() => router.back()} style={{ fontSize: '24px', alignSelf: 'flex-end', cursor: 'pointer' }} name="close-outline"></ion-icon>
          </div>
          <div style={{ width: '100%', backgroundColor: '#f1f1f1', height: '1px' }} />
        </section>

        {router?.query?.section === 'datosimportantes' &&
          <EditDataImportante data={data} email={user?.user?.email}/>
        }
        {router?.query?.section === 'servicios' &&
          <EditServicios data={data} email={user?.user?.email}/>
        }
         {router?.query?.section === 'redes' &&
          <EditRedesSociales data={data} email={user?.user?.email}/>
        }
      </div>
    </Layout >
  )
}

export async function getServerSideProps({ query, res }) {
  console.log(query);
  const { data, error, loading } = await client.query(
    {
      query: GET_ONE_NEGOCIOVDOS,
      variables: { userName: query?.id }
    }
  )

  if (query?.id == 's&i_master_paint') {
    res.setHeader('Location', '/si_master_paint');
    res.statusCode = 302; // Código de estado 302 para redirección temporal
    res.end();
    return {
      props: {
        data: data?.getOneNegocioVDos,

      },
    };
  }

  if (!data?.getOneNegocioVDos) {
    res.setHeader('Location', '/404'); // Cambia '/nueva-ruta' a la ruta deseada
    res.statusCode = 302; // Código de estado 302 para redirección temporal
    res.end();
    return { props: {} };
  }

  return {
    props: {
      data: data?.getOneNegocioVDos,

    },
  };
}
