

import styles from '@/styles/Dashboard.module.css'


export default function CardConversaciones() {
  return (
    <div className={styles.conversaciones}>
      <div>
        <h2 className={styles.subtitle2}>Conversaciones</h2>
        <h3 style={{ margin: '8px 0 4px 0' }} className={styles.subtitle3}>Jaime Rodriguez - Mazda 2</h3>
        <p style={{ marginBottom: '8px' }} className={styles.parrafo}>Por que cuando estoy andando a las 5000 rpm,
          empieza a sonar el motor?</p>
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
        <div style={{width:'90%',height:'2px', margin:'16px 0', backgroundColor:'#f1f1f1'}}/>
        <h3 style={{ margin: '8px 0 4px 0' }} className={styles.subtitle3}>Jaime Rodriguez - Mazda 2</h3>
        <p style={{ marginBottom: '8px' }} className={styles.parrafo}>Por que cuando estoy andando a las 5000 rpm,
          empieza a sonar el motor?</p>
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