
import styles from './Navbar.module.css'
import Link from 'next/link'
export default function Navbar(){
    return(
    
        <div className={styles.container}>
            <div className={styles.div1}>
            <div className={styles.div2}>
            <img src="/Logo.png" alt="colMotors Logo" style={{width:"20px" ,height:"20px"}} />
            <Link href={'/'} className={styles.title}>Quarks</Link>
            </div>
            {/* <Link href='/talleres' className={styles.subtitle}>Talleres</Link> */}
            <Link href='/cotizaciones' className={styles.subtitle}>Cotizaciones</Link>


            </div>
           

        </div>
    )
}