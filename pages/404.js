import Layout from '@/src/Components/Layout'
import styles from '@/styles/Landing.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import talleres from '../pages/servicios-automotriz/talleres.json'


export default function Page404() {
  const router = useRouter()

  useEffect(() => {
    const partes = router?.asPath?.split("/");
    const idParte = partes[partes.length - 1];
    const id = idParte.split("-")[0];
    const taller = talleres?.talleres.find(el => el.id === id)
    router.replace(`/${taller?.userName}`)
  }, [])

  return (
    <Layout title={'Pagina no encontrada 404'}>
      <div style={{ marginTop: '32px' }} className={styles.containerListTalleres}>
        <div className={styles.containerVariedadTalleres}>
          <div style={{ display: 'flex', gap: '40px', flexDirection: 'column', alignItems: 'center' }}>
            <img src='/carespejo.svg' className={styles.imgPrincipal} />
            <a style={{ fontSize: '14px', }} href="https://storyset.com/transport">Illustrations by Storyset</a>
          </div>
          <div style={{ display: 'flex', gap: '40px', flexDirection: 'column' }}>
            <h2 className={styles.title2}>404 Ops</h2>
            <h4 className={styles.subtitle2}>No encontramos esta pagina, tenemos algunos problemas de congestion lo sentimos.<br /> Te sugerimos regresar al inicio</h4>
            <Link className={styles.button} href={'/'} style={{ textDecoration: 'none', fontSize: '14px', color: 'white' }}>
              Regresar al inicio
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}




