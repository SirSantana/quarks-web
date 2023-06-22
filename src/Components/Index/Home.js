import { client } from "@/client";
import { GET_ALL_ARTICULOS } from "@/graphql/queries";
import styles from '@/styles/HomeArticulos.module.css'
import Link from "next/link";
import SwiperAutopartes from "../Home/SwiperAutopartes";
import HeaderHome from "./HeaderHome";
import ArticuloPrincipal from "./ArticuloPrincipal";
import ArticulosSecundarios from "./ArticulosSecundarios";
import DiccionarioHome from "./DiccionarioHome";



export default function HomeArticulos() {
  return (
    <div className={styles.container}>
      <HeaderHome />

      <section className={styles.containerHomeArticulos}>
        <ArticuloPrincipal />
        <ArticulosSecundarios />

      </section>

      <div style={{ width: '100%', backgroundColor: '#bababa', height: '1px', margin: '32px 0' }} />

      <Link href={'/glosario-de-autopartes'} style={{ textDecoration: 'none' }}>
        <h2 style={{ marginBottom: '16px' }} className={styles.question}>Glosario de Autopartes</h2>
      </Link>

      <SwiperAutopartes />


      <h2 style={{ margin: '32px 0 16px 0', fontSize: '16px' }} className={styles.question}>Caja y Transmision</h2>

      <DiccionarioHome />



      {/* <div>
        <div style={{ width: '100%', backgroundColor: '#bababa', height: '1px', margin: '32px 0' }} />

        <h2 className={styles.question}>¿Qué quieres hacer?</h2>

        <article className={styles.cardTriviaAuto}>
          <section style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <h3 style={{ margin: 0 }} className={styles.triviaTitle}>Trivias del mundo automotriz</h3>
            <button className={styles.buttonTrivias}>
              Jugar
            </button>
          </section>
          <ion-icon style={{ fontSize: '96px' }} name="dice-outline"></ion-icon>
        </article>

      </div> */}
    </div>
  )
}


