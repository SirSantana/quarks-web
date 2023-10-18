
import styles from '@/styles/Landing.module.css'
import Link from 'next/link';
import { useEffect, useState } from 'react';

let imagesTalleres = [
  { src: 'logopelaezhermanos80723.jpg', nombre: 'Pelaez Hermanos', id: '64aa2e5de3b051b0053a31ff', taller: 'Pelaez Hermanos - Siete de Agosto',userName:'pelaez_hermanos_7_de_agosto' },
  { src: 'tullantalogo80723.jpg', nombre: 'Tullanta.com', id: '64aa313ce3b051b0053a3200', taller: 'Tu Llanta - Siete de Agosto',userName:'tu_llanta_7_de_agosto' },
  { src: 'tallerseikulogo100723.png', nombre: 'Seiku', id: '64abffd94af55626ad913245', taller: 'Taller Mecánico Seikou',userName:'seikou' },
  { src: 'MathAutos190723.jpg', nombre: 'Math Autos', id: '64b7d28ccbf32fcc68b63589', taller: 'Math autos',userName:'math_autos' },
  { src: 'Optraclub190723.jpg', nombre: 'Optra club', id: '64b7e788cbf32fcc68b6358c', taller: 'Taller Optra Club Colombia',userName:'optra_club_colombia' },
  { src: 'oilfilters7agosto190723.png', nombre: 'Oil Filters', id: '64b816a0cbf32fcc68b63591', taller: 'Oil Filter´s 7 DE AGOSTO',userName:'oil_filters_7_de_agosto' },
  { src: 'solofrenosdelnorte210723.jpg', nombre: 'Solo frenos del norte', id: '64ba77866368741f9887b13b', taller: 'Solo frenos del norte',userName:'solofrenos_del_norte' },
  { src: 'saeautomotriz.png', nombre: 'Sae Automotriz', id: '64c1280e1cff353830519062', taller: 'SAE AUTOMOTRIZ',userName:'sae_automotriz' },
  { src: 'motorshop270723).png', nombre: 'Motorshop', id: '64c130681cff353830519066', taller: 'Taller automotriz Motorshop',userName:'motorshop' },
  { src: 'samamotors270723.png', nombre: 'Sama motors', id: '64c135be1cff353830519069', taller: 'TALLER MECÁNICO SAMA MOTORS',userName:'sama_motors' }
]
export default function ListTalleresLanding() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <section className={styles.containerListTalleres}>
      <h2 className={styles.title2} style={{ textAlign: 'center', color: '#373737' }}>
        Los Mejores Talleres de carros en un solo Lugar
      </h2>
      <div className={styles.containerImgTalleres}>
        {imagesTalleres.map((el, index) => (
          <Link
            href={`/${el?.userName}`}
            className={styles.imageWrapper}
            key={index}
          >
            {isLoading ? (
              <div className={styles.skeletonLoader} />
            ) : (
              <img
              loading='lazy'
                className={styles.imgFotoTaller}
                src={`https://azurequarks.blob.core.windows.net/negocios/${el.src}`}
                alt={el.alt}
              />
            )}
            <div className={styles.tooltip}>{el.nombre}</div>
          </Link>
        ))}
      </div>
      <Link
        href={'/servicios-automotriz/Taller mecanico-Bogota, Colombia'}
        className={styles.button}
        style={{ textDecoration: 'none', fontSize: '14px', color: 'white' }}
      >
        Explora Más Talleres
        <ion-icon name="arrow-forward-outline"></ion-icon>
      </Link>
    </section>

  )
}