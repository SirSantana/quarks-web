import styles2 from '@/styles/Landing.module.css'
import styles from '@/styles/Faq.module.css'
import { categorias } from './SliderTiposTalleres'
import Link from 'next/link'
import Text, { TextAlignment, TextAs, TextWeight } from '../Text/Text'
import Image from 'next/image'



export default function SectionTalleresServicios() {
  return (
    <section className={styles2.containerListTalleres}>
      <Text fontWeight={TextWeight[600]} As={TextAs.h2} alignment={TextAlignment.center} >
        ¿Que servicio estas buscando?
      </Text>
      <p style={{textAlign:'center', marginBottom:'40px', marginTop:'16px'}} className={styles2.subtitle2}>Los mejores talleres de carros para el servicio que estas buscando</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '32px' }}>

        {categorias.map(el => (
          <Link href={`/servicios-automotriz/${el.url.replace(/ /g, '-')}`} key={el.nombre} className={styles.cardServicioHome}>
            <h3 style={{ marginBottom: '4px', fontWeight: '500', lineHeight: '1.1', overflow: 'hidden', textOverflow: 'ellipsis', }}>{el.nombre}</h3>
            <Image
              src={`/${el.img}.png`}
              width={100}
              height={100}
              style={{
                width: '100px',
                position: 'absolute',
                bottom: '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
              alt={`Talleres de ${el.nombre} cerca a mi en Bogotá`}
            />
          </Link>
        ))}
      </div>

    </section>

  )
}