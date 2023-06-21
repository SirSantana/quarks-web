
import styles from '@/styles/Articulos.module.css'
import Link from 'next/link'


export default function ArticulosRelacionados() {
  return (
    <article style={{ margin: '16px 0' }}>
        <h2 className={styles.question}>Leé otros articulos relacionados:</h2>
        <div className={styles.containerArticulosRelacionados}>
          <Link  style={{textDecoration:'none'}} href={'/articulos/Cilindrada-de-un-vehiculo-:-Todo-lo-que-tienes-que-saber-64860ae7bf99b4c49795114b'}className={styles.containerArticuloRelacionado}>
          <ion-icon style={{fontSize:'24px',color:'#5B0221'}} name="link-outline"></ion-icon>
          <p style={{color:'#5B0221'}}>Cilindrada de un vehiculo : Todo lo que tienes que saber</p>
          </Link>
          <Link style={{textDecoration:'none'}} href={'/glosario-de-autopartes/Amortiguador-648d069fa78195fbadfa31e2'}className={styles.containerArticuloRelacionado}>
          <ion-icon style={{fontSize:'24px',color:'#5B0221'}} name="link-outline"></ion-icon>
          <p style={{color:'#5B0221'}}>Amortiguador: Definicion, funcionamiento y fallas</p>
          </Link>
          <Link style={{textDecoration:'none'}} href={'/glosario-de-autopartes/Bomba-de-gasolina-648e714dae5cde6b95562cef'} className={styles.containerArticuloRelacionado}>
          <ion-icon style={{fontSize:'24px',color:'#5B0221'}} name="link-outline"></ion-icon>
          <p style={{color:'#5B0221'}}>Bomba de gasolina: Definicion, funcionamiento y fallas</p>
          </Link>
          <Link style={{textDecoration:'none'}} href={'/glosario-de-autopartes/Caja-de-fusibles-6491c14e21ba69c72ecb4296'} className={styles.containerArticuloRelacionado}>
          <ion-icon style={{fontSize:'24px',color:'#5B0221'}}name="link-outline"></ion-icon>
          <p style={{color:'#5B0221'}}>Caja de fusibles: Para que sirve en un carro?</p>
          </Link>
        </div>
    </article>
    )
}