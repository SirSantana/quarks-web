import Link from 'next/link'
import styles from './styles.module.css'

let logos = [
    {logo:'InstagramLogo', url:"https://www.instagram.com/quarks_app/"},
    {logo:'FacebookLogo', url:"https://www.facebook.com/COlmotors"},
    {logo:'WhatsappLogo', url:"#"},
    {logo:'TwitterLogo', url:"#"}
]

export default function Footer(){
    return(
        <div style={{flexDirection:'row', justifyContent:'space-between'}} className={styles.container}>
           
            <div style={{display:'flex', flexDirection:'row', gap:'10px',alignItems:'center'}}>
           <img src="/Logo.png" alt="colMotors Logo" style={{width:"20px" ,height:"20px"}} />
            <Link href={'/'} style={{fontSize:'26px',fontWeight:'600', color:'white'}}>Quarks</Link>
            <Link href={'https://www.privacypolicies.com/live/09cd59af-1d7b-47b5-9dde-2e78d4dc9770'}><h4 style={{fontSize:'18px', color:'white'}} className={styles.subtitleRed}>Politica de privacidad </h4></Link>
            </div>
            <div>
                <div style={{gap:'10px', display:'flex', flexDirection:'row'}}>
                {logos.map(logo=>(
                    <Link href={logo.url}>
            <img  src={`/${logo.logo}.png`} alt={logo + "logo"} style={{width:"30px" ,height:"30px"}} />
                    </Link>
                ))}
                </div>
                
            
            </div>
            
        </div>
    )
}