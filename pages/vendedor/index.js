import FormCreateVendedor from "../../components/Cotizaciones/Form/FormCreateVendedor";
import styles from '../../components/Home/styles.module.css'
import Layout from "../../components/Layout";
import Link from 'next/link'
import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";

let marcas = ['Chevrolet', 'Mazda', 'Ford', 'Renault']
export default function VendedorPage() {
  const { user } = useAuth()
  const router = useRouter()
  useEffect(()=>{
    if(user){
      router.push('/cotizaciones')
    }
  },[user])

  return (
    <Layout title={'Vendedores - Quarks'} type='website' description={'Cotiza repuestos para vehiculos facil y rapido en colombia'}>
      <div className={styles.container} style={{ marginTop: '80px' }}>

        <div className={styles.containerManual} style={{ alignItems: 'flex-start', padding: '0 10px' }}>

          <div className={styles.containerManual2} >
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              {marcas.map(marca => (
                <img src={`/${marca}.png`} style={{ width: '50px', height: '50px' }} alt={`Logo ${marca}`} />
              ))}
            </div>
            <h1 style={{ margin: '10px 0' }} className={styles.titleBlue}>Empieza a cotizar <b style={{ color: '#f50057' }}> gratis!</b>  </h1>
            <div style={{ disply: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <img src='/check.svg' style={{ width: '25px', width: '25px' }} /><h4 style={{ fontSize: '18px', color: '#1b333d', fontWeight: 400, margin: '10px 0' }}>Recibe día a día cotizaciones de clientes potenciales de todo Colombia</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <img src='/check.svg' style={{ width: '25px', width: '25px' }} /><h4 style={{ fontSize: '18px', color: '#1b333d', fontWeight: 400, margin: '10px 0' }}>Cotiza fácil y sencillo desde tu celular</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <img src='/check.svg' style={{ width: '25px', width: '25px' }} /><h4 style={{ fontSize: '18px', color: '#1b333d', fontWeight: 400, margin: '10px 0' }}> Ellos podran contactar directamente contigo!</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <img src='/check.svg' style={{ width: '25px', width: '25px' }} /><h4 style={{ fontSize: '18px', color: '#1b333d', fontWeight: 400, margin: '10px 0' }} > Nosotros verificaremos y activaremos tu cuenta en menos de 24 horas</h4>
              </div>
            </div>
            <Link href={'/user/login'} ><button style={{ width: '100%', marginTop: '20px' }} className={styles.button}>¿Ya eres vendedor? Inicia Sesion</button></Link>
          </div>
          <FormCreateVendedor />
        </div>
      </div>
    </Layout>
  );
}
