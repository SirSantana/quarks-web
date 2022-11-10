
import { Theme } from '../../styles/Theme'
import styles from './Navbar.module.css'
import Link from 'next/link'
export default function Navbar(){
    return(
    
        <div style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",height:'70px', width:'100%',padding:'0 20px 0 20px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <div style={{display:'flex',justifyContent:'center',gap:'20px', flexDirection:'row', alignItems:'center'}}>
            <div style={{display:'flex', flexDirection:'row', gap:'10px', alignItems:'center'}}>
            <img src="/Logo.png" alt="colMotors Logo" style={{width:"20px" ,height:"20px"}} />
            <Link href={'/'} className={styles.title}>Quarks</Link>
            </div>
            <Link href='/talleres' className={styles.subtitle}>Talleres</Link>
            <Link href='/almacenes' className={styles.subtitle}>Almacenes</Link>
            <Link href='/productos' className={styles.subtitle}>Productos</Link>

            </div>
            <div style={{display:'flex',justifyContent:'center',gap:'20px',  flexDirection:'row', alignItems:'center'}}>
           
            <button style={Theme.buttons.primaryOutlined}>¿No tienes una cuenta? Registrate</button>
            <button style={Theme.buttons.primary}>Iniciar Sesion</button>

            </div>

        </div>
    )
}