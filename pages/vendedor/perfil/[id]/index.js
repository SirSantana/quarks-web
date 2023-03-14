import { GET_ONE_USER } from "@/graphql/queries";
import useAuth from "@/hooks/useAuth";
import Layout from "@/src/Components/Layout";
import styles from '@/styles/Vendedor.module.css'
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import HandleBar from "@/src/Components/Vendedor/HandleBar";
import MiPerfilVendedor from "@/src/Components/Vendedor/Perfil";
import CotizacionesVendedor from "@/src/Components/Vendedor/cotizaciones";



export default function PerfilVendedor() {
  const router = useRouter()
  const [section, setSection] = useState(true)
  const [getOneUser, { loading, data, error }] = useLazyQuery(GET_ONE_USER)
  const {user} = useAuth()

  useEffect(() => {
    if (router?.query?.id) {
      getOneUser({ variables: { id: router?.query?.id } })
    }
  }, [router?.query?.id])
  
  useEffect(() => {
    if (data && user) {
      if (user?.id !== data?.getOneUser?.id) {
        router.replace('/')
      }
    }
  }, [data])
  //PASAR ID DEL USUARIO ACTUAL Y COMPARAR QUE SEA EL MISMO ID DE LA URL
  return (
    <Layout title={'Perfil Vendedor | Quarks'} description={'Perfil de cotizaciones de repuestos de carros en colombia'}>
      <div className={styles.container}>
        <HandleBar setSection={setSection} section={section} data={data}/>
        {section
          ? <MiPerfilVendedor />
          : <CotizacionesVendedor section={section}/>
        }
      </div>
    </Layout>
  )
}