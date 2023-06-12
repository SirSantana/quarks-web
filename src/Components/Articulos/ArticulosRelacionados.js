
import styles from '@/styles/Articulos.module.css'


export default function ArticulosRelacionados() {
  return (
    <article style={{ margin: '32px 0' }}>
        <h2 className={styles.question}>Leé otros articulos relacionados:</h2>
        <div className={styles.containerArticulosRelacionados}>
          <div className={styles.containerArticuloRelacionado}>
          <ion-icon style={{fontSize:'24px',color:'#5B0221'}} name="link-outline"></ion-icon>
          <p style={{color:'#5B0221'}}>Calcula tu cilindraje Aqui!</p>
          </div>
          <div className={styles.containerArticuloRelacionado}>
          <ion-icon style={{fontSize:'24px',color:'#5B0221'}} name="link-outline"></ion-icon>
          <p style={{color:'#5B0221'}}>Malos usos del motor de tu carro</p>
          </div>
          <div className={styles.containerArticuloRelacionado}>
          <ion-icon style={{fontSize:'24px',color:'#5B0221'}} name="link-outline"></ion-icon>
          <p style={{color:'#5B0221'}}>La importancia del cuidado del chasis</p>
          </div>
          <div className={styles.containerArticuloRelacionado}>
          <ion-icon style={{fontSize:'24px',color:'#5B0221'}}name="link-outline"></ion-icon>
          <p style={{color:'#5B0221'}}>Por que pierde potencia un auto?</p>
          </div>
        </div>
    </article>
    )
}