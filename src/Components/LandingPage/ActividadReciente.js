
import styles from '@/styles/Landing.module.css'
import Image from 'next/image';
import Link from 'next/link';

const Star = ({ index, stars, tamaño, }) => {
  return (
    <img src={stars < index + 1 ? `../star-outline.svg` : `../star.svg`} style={{ height: `${tamaño}px`, width: `${tamaño}px` }} alt={`Calificacion ${stars} del taller`} />
  )
}
let estrellas = [1, 2, 3, 4, 5]
export default function ActividadReciente() {
  return (
    <section className={styles.containerListTalleres}>
      <h2 style={{ textAlign: 'center' }} className={styles.title2}>Actividad Reciente</h2>
      <div className={styles.containerGrid}>
        <article>
          <Link href={'/servicios-automotriz/negocio/64c13e7e1cff35383051906e-Mecánica%20-%20DJC%20Los%20Boyacos'} className={styles.containerCardOpinion}>
            <div style={{ padding: '16px', display: 'flex', gap: '16px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '25px', backgroundColor: '#f1f1f1' }}>
                <Image
                  alt='Taller mecanico cerca de mi'
                  width={50}
                  height={50}
                  loading='lazy'
                  style={{ borderRadius: '25px', backgroundColor: '#f1f1f1' }}
                  src='https://lh3.googleusercontent.com/a/AAcHTtfUhL85w74kHRxBuMqdxpXlQr62My4xf7Hp-oMUKC_L2Q=s96-c'
                />
              </div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: '600' }}>Liseth Fonseca</p>
                <p style={{ fontSize: '12px' }}>Agregó una reseña</p>
              </div>
            </div>
            <img
            loading='lazy'
              alt='Taller automotriz djc los boyacos bogota'
              className={styles.imgTaller}
              src={`https://azurequarks.blob.core.windows.net/negocios/djclosboyacos270723.jpg`}
            />
            <div style={{ padding: '16px', display: 'flex', gap: '4px', flexDirection: 'column', justifyContent: 'center' }}>
              <p>Mecánica - DJC Los Boyacos</p>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '12px', marginBottom: '4px' }}>
                {estrellas.map((el, index) => (
                  <div key={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
                    <Star index={index} stars={5} tamaño={'14'} />
                  </div>
                ))}
              </div>
              <p className={styles.subtitle3}>
                Buen taller,me ayudaron en lo q necesitaba
              </p>

            </div>
          </Link>
        </article>
        <article>
          <Link href={'/servicios-automotriz/negocio/64aa313ce3b051b0053a3200-Tu%20Llanta%20-%20Siete%20de%20Agosto'} className={styles.containerCardOpinion}>
            <div style={{ padding: '16px', display: 'flex', gap: '16px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '25px', backgroundColor: '#f1f1f1' }}>
                <Image
                  alt='taller mecanico automotriz en Bogota reseña'
                  width={50}
                  height={50}
                  style={{ borderRadius: '25px', backgroundColor: '#f1f1f1' }}
                  src='https://azurequarks.blob.core.windows.net/avatares/imgprofileuser2.png'
                />
              </div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: '600' }}>Harrison Alvarez</p>
                <p style={{ fontSize: '12px' }}>Agregó una reseña</p>
              </div>
            </div>
            <img
            loading='lazy'

              alt='Taller automotriz tu llanta bogota'
              className={styles.imgTaller}
              src={`https://azurequarks.blob.core.windows.net/avatares/tullanta.png`}
            />
            <div style={{ padding: '16px', display: 'flex', gap: '4px', flexDirection: 'column', justifyContent: 'center' }}>
              <p>Tu Llanta - Siete de Agosto</p>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '12px', marginBottom: '4px' }}>
                {estrellas.map((el, index) => (
                  <div key={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
                    <Star index={index} stars={4} tamaño={'14'} />
                  </div>
                ))}
              </div>
              <p className={styles.subtitle3}>
                Ofrecen un gran surtido, permiten pedidos en línea...
              </p>

            </div>
          </Link>
        </article>

        <article>
          <Link href={'/servicios-automotriz/negocio/64b816a0cbf32fcc68b63591-Oil%20Filter´s%207%20DE%20AGOSTO'} className={styles.containerCardOpinion}>
            <div style={{ padding: '16px', display: 'flex', gap: '16px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '25px', backgroundColor: '#f1f1f1' }}>
                <Image
                  alt='tallermecanico en Bogota'
                  width={50}
                  height={50}
                  style={{ borderRadius: '25px', backgroundColor: '#f1f1f1' }}
                  src='https://azurequarks.blob.core.windows.net/avatares/imgprofileuser.jpg'
                />
              </div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: '600' }}>Abel Rojas</p>

                <p style={{ fontSize: '12px' }}>Agregó una reseña</p>
              </div>
            </div>

            <img
            loading='lazy'
              className={styles.imgTaller}
              alt='Taller automotriz oil filters bogota'
              src={`https://azurequarks.blob.core.windows.net/avatares/oildentro.png`}
            />

            <div style={{ padding: '16px', display: 'flex', gap: '4px', flexDirection: 'column', justifyContent: 'center' }}>
              <p>Oil Filter´s 7 DE AGOSTO</p>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '12px', marginBottom: '4px' }}>
                {estrellas.map((el, index) => (
                  <div key={index} id={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
                    <Star index={index} stars={5} tamaño={'14'} />
                  </div>
                ))}
              </div>
              <p className={styles.subtitle3}>
                El servicio es excepcional y altamente recomendable personal...
              </p>

            </div>
          </Link>
        </article>

      </div>
    </section>
  )
}