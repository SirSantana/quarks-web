
import styles from '@/styles/HomeArticulos.module.css'
import Link from 'next/link'


export default function ArticuloPrincipal() {
  return (
    <article className={styles.articuloHome}>
      <img src='https://azurequarks.blob.core.windows.net/repuestos/calcularcilindrajedeunvehiculomotor.png' className={styles.imgPrincipal} />
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '16px' }}>
        <p className={styles.subtitleCategory}>Motor</p>
        <p className={styles.subtitleHeader}>8 de Junio 2023</p>
      </div>
      <div>
        <Link style={{ textDecoration: 'none' }} href='https://www.quarks.com.co/articulos/Cilindrada-de-un-vehiculo-:-Todo-lo-que-tienes-que-saber-64860ae7bf99b4c49795114b'>
          <h2 className={styles.question}>Cilindrada de un vehiculo: Todo lo que tienes que saber</h2>
        </Link>
        <p className={styles.response}>La cilindrada es el volumen total de los pistones dentro de los cilindros de un motor...</p>
      </div>
    </article>
  )
}