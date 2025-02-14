import styles2 from '@/styles/Landing.module.css'
import Link from 'next/link'

const tagsSearch = [
  {
    title: 'Taller Electrico',
    img: '/mecanico.webp',
    href: '/explore/talleres/carro/electricos/bogota'
  },
  {
    title: 'Cambio Aceite',
    img: '/servicio-cambio-aceite.webp',
    href: '/explore/talleres/carro/cambio-de-aceite/bogota'
  },
  {
    title: 'Revision Tecnico mecanica',
    img: '/servicio-motor.webp',
    href: '/explore/talleres/carro/cda/bogota'
  }
]

export default function SectionTagsSearch() {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '48px' }}>
      {/* <h5 style={{ color: '#A6AEC1', fontWeight: '500', fontSize: '20px' }}>Encuentra lo mejor para tu auto</h5> */}
      <div className={styles2.containerTagsSearch} >
        {tagsSearch.map(({ title, img, href }) => (
          <Link className={styles2.tagSearch} href={href} key={title}>
            <img alt={title} width={20} height={20} src={img} />
            {title}
          </Link>
        ))}
      </div>
    </section>
  )
}