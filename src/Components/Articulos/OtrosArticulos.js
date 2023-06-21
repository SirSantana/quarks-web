import styles from '@/styles/Articulos.module.css'
import Link from 'next/link'



export default function OtrosArticulos({ img }) {
  return (
    <article style={{ marginTop: '8px' }}>
      <h2 className={styles.question}>Otros Articulos</h2>

      <section className={styles.gridContainer}>

        <Link style={{textDecoration:'none'}} href={'/articulos/Cilindrada-de-un-vehiculo-:-Todo-lo-que-tienes-que-saber-64860ae7bf99b4c49795114b'}>
          <img src={img}  className={styles.imgOtroArticulos} />
          <h3 className={styles.response} style={{ color: '#5B0221', fontWeight: '700', margin: 0 }}>Motor</h3>
          <h4 className={styles.response} style={{ margin: 0, lineHeight:'20px' }}>Cilindrada de un vehiculo : Todo lo que tienes que saber</h4>
        </Link>

        <Link style={{textDecoration:'none'}} href={'/glosario-de-autopartes/Amortiguador-648d069fa78195fbadfa31e2'}>
          <img src={img} className={styles.imgOtroArticulos} />
          <h3 className={styles.response} style={{ color: '#5B0221', fontWeight: '700', margin: 0 }}>Direccion y Suspension</h3>
          <h4 className={styles.response} style={{ margin: 0, lineHeight:'20px' }}>Amortiguador: Definicion, funcionamiento y fallas</h4>
        </Link>

        <Link style={{textDecoration:'none'}} href={'/glosario-de-autopartes/Bomba-de-gasolina-648e714dae5cde6b95562cef'}>
          <img src={img}  className={styles.imgOtroArticulos} />
          <h3 className={styles.response} style={{ color: '#5B0221', fontWeight: '700', margin: 0 }}>Motor</h3>
          <h4 className={styles.response} style={{ margin: 0, lineHeight:'20px' }}>Bomba de gasolina: Definicion, funcionamiento y fallas</h4>
        </Link>

        <Link style={{textDecoration:'none'}} href={'/glosario-de-autopartes/Caja-de-fusibles-6491c14e21ba69c72ecb4296'}>
          <img src={img}  className={styles.imgOtroArticulos} />
          <h3 className={styles.response} style={{ color: '#5B0221', fontWeight: '700', margin: 0 }}>Electrico</h3>
          <h4 className={styles.response} style={{ margin: 0, lineHeight:'20px' }}>Caja de fusibles: Para que sirve en un carro?</h4>
        </Link>

      </section>
      <div style={{ width: '100%', backgroundColor: '#bababa', height: '1px' }} />
    </article>
  )
}