import styles from '@/styles/ServiciosAutomotriz.module.css'
import talleres from '@/pages/servicios-automotriz/talleres.json'
import Link from 'next/link';
import { categorias2 } from './ServiciosOfrecidos';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function SliderTalleresSugeridos() {

  const talleresRecomendados = talleres.talleres.filter(taller => taller.nivel > 2).slice(0, 6)

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 2000,
    arrows:false
  };
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600' }} className={styles.titleNegocio}>Talleres sugeridos </h2>

      <Slider className={styles.slider}  {...settings}>

        {talleresRecomendados.map(taller => (

          <Link href={`/${taller.userName}`} className={styles.slide} >
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '8px', margin: '0 0 16px 0', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                {taller?.fotoperfil
                  ?
                  <img style={{ height: '48px', width: '48px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #f1f1f1' }} src={taller?.fotoperfil} alt="Nombre del lugar" />
                  :
                  <img style={{ height: '48px', width: '48px', borderRadius: '8px', objectFit: 'contain', }} src={'/EmojiTaller.png'} alt="Nombre del lugar" />

                }
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
                  <h3 style={{ fontSize: taller?.nombre.length > 20 ? '14px' : taller?.nombre.length > 15 ? '16px' : '18px', fontWeight: '600' }}>{taller?.nombre}</h3>
                  <p style={{ margin: 0, fontSize: '12px', color: '#929292' }}>{taller?.direccion}</p>
                </div>
              </div>

            </div>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '6px', width: '100%' }}>
              <p style={{ fontSize: '12px', margin: 0, color: '#464646', width: '100%', fontWeight: '600' }}>{taller?.nombre === 'Corsa Motors' ? 'Almacen de Repuestos' : 'Taller Mecanico'}</p>
              {taller?.categorias.slice(0, 2).map(el => {
                const category = categorias2?.find(cat => cat.db.toLocaleLowerCase() == el.toLocaleLowerCase())
                return (
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', borderRadius: '24px', padding: '4px 4px 4px 0px', }}>
                    {category?.img ? <img src={`./${category?.img}.png`} style={{ width: '20px', height: '20px' }} alt={el} /> : <ion-icon name="settings-outline" style={{ fontSize: '20px' }}></ion-icon>}
                    <p style={{ margin: 0, fontSize: '12px', color: '#464646' }}>{category?.nombre}</p>
                  </div>
                )
              })}

              {taller?.categorias.length > 2 &&
                <div style={{ display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center', border: '1px solid #c6c6c6', borderRadius: '24px', padding: '4px 12px', }}>
                  <p style={{ margin: 0, fontSize: '12px', color: '#464646' }}>+{taller?.categorias.length - 2}</p>
                </div>}
            </div>

          </Link>

        ))}

      </Slider>


    </>
  )
}