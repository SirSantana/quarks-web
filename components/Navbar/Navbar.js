import useAuth from "../../hooks/useAuth"

import styles from './Navbar.module.css'
import Link from 'next/link'
import MarcasMenu from "../../utils/marcasMenu"
import AvatarMenu from "../../utils/avatarMenu"
export default function Navbar() {
  const { user } = useAuth()
  return (

    <div className={styles.container}>
      <div className={styles.div1}>
      <Link href={'/'} className={styles.title}>
        <div className={styles.div2}>
          <img src="/Logo.png" alt="colMotors Logo" style={{ width: "20px", height: "20px" }} />
          Quarks
        </div>
        </Link>
        {/* <Link href='/talleres' className={styles.subtitle}>Talleres</Link> */}
        <Link href='/cotizaciones' className={styles.subtitle}>Cotizaciones</Link>
        <Link href='/vendedor' className={styles.subtitle}>¿Eres vendedor?</Link>


      </div>
      {user && <AvatarMenu/>}


    </div>
  )
}