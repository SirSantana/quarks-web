

import useAuth from "@/hooks/useAuth";
import Layout from "@/src/Components/Layout";
import LoginFormVendedor from "@/src/Components/Vendedor/LoginForm";
import styles from '@/styles/Vendedor.module.css'
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";


export default function LoginVendedor() {
  const router = useRouter()
  const { user } = useAuth();
  useEffect(()=>{
    if(user){
      router.replace(`/vendedor/perfil/${user?.id}`)
    }
  },[user])
  return (
    <Layout title={'Iniciar Sesion vendedor | Quarks'}>
      <div className={styles.container}>
        <h1 className={styles.title}>Bienvenido vendedor</h1>
        <div className={styles.container2}>
          <LoginFormVendedor/>
        </div>
      </div>
    </Layout>
  )
}