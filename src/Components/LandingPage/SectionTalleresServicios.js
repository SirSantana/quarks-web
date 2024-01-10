import styles2 from '@/styles/Landing.module.css'
import styles from '@/styles/Faq.module.css'
import { categorias } from './SliderTiposTalleres'
import Link from 'next/link'
import Text, { TextAlignment, TextAs, TextWeight } from '../Text/Text'



export default function SectionTalleresServicios() {
  return (
    <section className={styles2.containerListTalleres}>
      <Text style={{ marginBottom: '32px' }} fontWeight={TextWeight[600]} As={TextAs.h2} alignment={TextAlignment.center} >
        ¿Que servicio estas buscando?
      </Text>
      {/* <h2 style={{ marginBottom: '32px' }} className={styles2.title2}>¿Que servicio estas buscando?</h2> */}
      <p className={styles.pSubtitle}>Los mejores talleres de carros para el servicio que estas buscando</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '32px' }}>

        {categorias.map(el => (
          <Link href={`/servicios-automotriz/${el.url.replace(/ /g, '-')}`} key={el.nombre} className={styles.cardServicioHome}>
            <h3 style={{ marginBottom: '4px', fontWeight: '500', lineHeight: '1.1', overflow: 'hidden', textOverflow: 'ellipsis', }}>{el.nombre}</h3>
            <img
              src={`/${el.img}.png`}
              style={{
                width: '100px',
                position: 'absolute',
                bottom: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
              alt={el.nombre}
            />
          </Link>
        ))}
      </div>

    </section>

  )
}