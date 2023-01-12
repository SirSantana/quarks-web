import { useRouter } from 'next/router'
import useAuth from '../hooks/useAuth';
import styles from '../styles/Talleres.module.css'

export default function AvatarMenu({}){
    const router = useRouter()
    const { user, logout } = useAuth();

  const handleCloseSesion=()=>{
    logout()
    localStorage.clear()
    router.push('/')

  }
return(
    <div style={{top:'15px'}} className={styles.dropdown}>
             <div style={{width:'40px',height:'40px', display:'flex', justifyContent:'center', alignItems:'center',border:'none',borderRadius:'50%',fontSize:'14px', backgroundColor:'purple',color:'white', cursor:'pointer'}}>
             {user?.avatar 
              ?<img alt={user?.name} src={user?.avatar} style={{objectFit:'contain',height:'50px', width:'50px', backgroundColor:'white', borderRadius:'25px'}} />
              :<h2 className={styles.letraInicial}>{user?.name[0]}</h2>
              }
             </div>
             <div className={styles.dropdownContent}>
             <a onClick={()=>router.push(`/vendedor/perfil/${user?.id}`)}>Mi perfil</a>
             <a onClick={()=>router.push('/cotizaciones')}>Cotizaciones</a>
             <a onClick={handleCloseSesion}>Cerrar Sesion</a>
             </div>
           </div>
)
}