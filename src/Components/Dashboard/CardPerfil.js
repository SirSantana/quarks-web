
import styles from '@/styles/Dashboard.module.css'


export default function CardPerfil(){
    return(
      <div className={styles.perfil}>
      <div style={{display:'flex', flexDirection:'column', width:'100%', alignItems:'center'}}>
        <div style={{height:'50px', width:'50px', borderRadius:'50%', backgroundColor:'#f1f1fb'}}/>
        <h3 style={{ margin: '8px 0 16px 0' }} className={styles.subtitle3}>Miguel Salazar</h3>
        <button style={{marginBottom:'16px', width:'80%'}} className={styles.button}>Editar perfil</button>
        <div style={{display:'flex',flexDirection:'row', alignItems:'center', gap:'16px', justifyContent:'flex-end'}}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <img alt={'Cotiza tus repuestos logo'} src={'/heart-outline.svg'} style={{ height: '24px', width: '24px', }} />
            <p className={styles.parrafo}>54</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
            <img alt={'Cotiza tus repuestos logo'} src={'/chatbubble-outline.svg'} style={{ height: '20px', width: '20px', }} />
            <p className={styles.parrafo}>15</p>
          </div>
        </div>
      </div>
    </div>
    )
}