import styles from '@/styles/Navbar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'


export default function Nav() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const [width, setWidth] = useState(0);


  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, []);
  return (
    <div className={open && styles.modal} >

      <header ref={ref} className={styles.header2}>

        <Link style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }} href={'/'}>
          <img alt={'Cotiza tus repuestos logo'} src={'/logoquarks200623.png'} className={styles.logo} />
          <h1 style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none' }} className={styles.titleNav}>Quarks</h1>
        </Link>

        <ul className={styles.navv}>
          <li className={styles.li}><Link style={{ textDecoration: 'none', color: router?.pathname === '/servicios-automotriz/Taller mecanico-Bogota, Colombia' && '#5B0221' }} className={styles.subtitle} href={'/servicios-automotriz/Taller mecanico-Bogota, Colombia'}>Talleres</Link></li>
          <li className={styles.li}><Link style={{ textDecoration: 'none', color: router?.pathname === '/glosario-de-autopartes' && '#5B0221' }} className={styles.subtitle} href={'/glosario-de-autopartes'}>Glosario</Link></li>

          {/* <li className={styles.li}><Link style={{ textDecoration: 'none',color:router?.pathname === '/cotizaciones' && '#5B0221' }}className={styles.subtitle} href={'/cotizaciones'}>Cotizaciones</Link></li> */}
          {/* <li className={styles.li}><Link style={{ textDecoration: 'none',color:router?.pathname === '/blog' && '#5B0221' }}className={styles.subtitle}href={'/'}>Blog</Link></li> */}
          {/* <li className={styles.li}><Link style={{ textDecoration: 'none',color:router?.pathname === '/almacenes' && '#5B0221' }}className={styles.subtitle} href={'/almacenes'}>Almacenes</Link></li> */}
          {/* <li className={styles.li}><Link style={{ textDecoration: 'none',color:router?.pathname === '/vendedor' && '#5B0221' }}className={styles.subtitle}href={'/vendedor'}>Ingresar</Link></li> */}
        </ul>
      </header>
    </div >

  )
}



<main className={styles.main}>
  <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }} className={open && styles.modal}>
    <div ref={ref} className={` ${styles.header}`}>
      <div className={styles.navDiv}>
        <Link style={{ textDecoration: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }} href={'/'}>
          <img alt={'Cotiza tus repuestos logo'} src={'/logoquarks200623.png'} className={styles.logo} />
          <h1 style={{ cursor: 'pointer', textDecoration: 'none', outline: 'none', color: '#373737' }} className={styles.titleNav}>Quarks</h1>
        </Link>
        <form onSubmit={handleSubmit} className={styles2.homeCard}>
          <div className={styles2.select1}>
            <CreatableSelect isClearable
              styles={customStyles2}
              placeholder="Buscar..."
              onChange={(e) => setForm({ ...form, servicio: e?.value })}
              noOptionsMessage={() => null}
            />
          </div>
          <div className={styles2.select2}>
            <Select onChange={(e) => setForm({ ...form, localidad: e.value })} options={options2} styles={customStyles} defaultValue={options2[0]} />
          </div>
          <div onClick={handleSubmit} style={{ cursor: 'pointer' }} className={styles2.buttonSearch}>
            <ion-icon style={{ color: 'white', fontSize: '24px' }} name="search-outline"></ion-icon>
          </div>
        </form>
        <ul className={styles.navv}>
          <div className={styles.talleres}>
            <li style={{ listStyle: 'none', cursor: 'pointer', textDecoration: 'none', color: router?.pathname === '/servicios-automotriz/Taller mecanico-Bogota, Colombia' ? '#373737' : '#373737' }} className={styles.subtitle}>Talleres</li>
            <div className={styles.tooltip}>
              <ul className={styles.ulTipos}>
                {categorias.map(el => (
                  <li style={{ color: '#373737' }} className={styles.liCategory} onClick={() => router.push(`/servicios-automotriz/${el.url}-Bogota,%20Colombia`)} key={el.nombre}>
                    <img src={router.pathname === '/' ? `./${el.img}.png` : `../../${el.img}.png`} style={{ height: '20px', width: '20px' }} />
                    {categoriaRouter === el.nombre || (router?.pathname === '/' && el.nombre === 'Alineación y balanceo') ?
                      <p className={styles.textCategoriaTallerA}>{el.nombre}</p>
                      :
                      <p className={styles.textCategoriaTaller}>{el.nombre}</p>
                    }
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <li className={styles.li}><Link style={{ textDecoration: 'none', color: router?.pathname === '/glosario-de-autopartes' ? '#373737' : '#373737' }} className={styles.subtitle} href={'/glosario-de-autopartes'}>Glosario</Link></li>
        </ul>
      </div>

    </div>
    <FirstNewScreen />
  </header>

  <section className={styles.containerGridTalleres}>
    <div className={styles.headerTalleres} >
      <div >
        {router?.pathname !== '/'
          && <h1 style={{ textAlign: 'left', }} className={styles.title2}>Taller automotriz de {parts?.[0]} </h1>
        }
        {router?.pathname !== '/'
          ?
          <h4 style={{ textAlign: 'left' }} className={styles.subtitle2}>Se encontraron {data?.length} taller de carro de {parts?.[0]} cerca a mi en {parts?.[1]}</h4>
          :
          <h4 style={{ textAlign: 'left' }} className={styles.subtitle2}>Mas de 100 talleres mecanicos cerca a mi</h4>
        }
      </div>
      {router?.pathname !== '/' && <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', gap: '16px', }}>
        <Select onChange={handleChange2} options={options2} styles={customStyles} defaultValue={options2[0]} />
      </div>}
    </div>
    <div className={styles.gridCardTalleres} >
      {data?.length <= 0 && router.pathname !== '/' ? <h2 style={{ fontSize: '14px', fontWeight: '500', color: '#6D6D6D' }}>No se encontraron resultados...</h2>
        :
        data?.length > 0 ? data?.map(el => (
          <CardNewTaller taller={el} />
        ))
          : filteredItems?.map(el => (
            <CardNewTaller taller={el} />
          ))
      }
    </div>
  </section>

  <section className={styles.containerListTalleres}>
    <h2 className={styles.title2} style={{ textAlign: 'center', color: '#373737' }}>
      Los Mejores Talleres de carros en un solo Lugar
    </h2>
    <div className={styles.containerImgTalleres}>
      {imagesTalleres.map((el, index) => (
        <Link
          href={`/servicios-automotriz/negocio/${el.id}-${el?.taller}`}
          className={styles.imageWrapper}
          key={index}
        >
          {isLoading ? (
            <div className={styles.skeletonLoader} />
          ) : (
            <img
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

  <section className={styles.containerListTalleres}>
    <h2 style={{ textAlign: 'center' }} className={styles.title2}>Actividad Reciente</h2>
    <div className={styles.containerGrid}>
      <Link href={'/servicios-automotriz/negocio/64c13e7e1cff35383051906e-Mecánica%20-%20DJC%20Los%20Boyacos'} className={styles.containerCardOpinion}>
        <div style={{ padding: '16px', display: 'flex', gap: '16px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '25px', backgroundColor: '#f1f1f1' }}>
            <img
              style={{ width: '50px', height: '50px', borderRadius: '25px', backgroundColor: '#f1f1f1' }}
              src='https://lh3.googleusercontent.com/a/AAcHTtfUhL85w74kHRxBuMqdxpXlQr62My4xf7Hp-oMUKC_L2Q=s96-c'
            />
          </div>
          <div>
            <h4>Liseth Fonseca</h4>
            <p style={{ fontSize: '12px' }}>Agregó una reseña</p>
          </div>
        </div>
        <img
          className={styles.imgTaller}
          src={`https://azurequarks.blob.core.windows.net/negocios/djclosboyacos270723.jpg`}
        />
        <div style={{ padding: '16px', display: 'flex', gap: '4px', flexDirection: 'column', justifyContent: 'center' }}>
          <h4>Mecánica - DJC Los Boyacos</h4>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '12px', marginBottom: '4px' }}>
            {estrellas.map((el, index) => (
              <div id={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
                <Star index={index} stars={5} tamaño={'14'} />
              </div>
            ))}
          </div>
          <p className={styles.subtitle3}>
            Buen taller,me ayudaron en lo q necesitaba
          </p>
        </div>
      </Link>
      <Link href={'/servicios-automotriz/negocio/64aa313ce3b051b0053a3200-Tu%20Llanta%20-%20Siete%20de%20Agosto'} className={styles.containerCardOpinion}>
        <div style={{ padding: '16px', display: 'flex', gap: '16px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '25px', backgroundColor: '#f1f1f1' }}>
            <img
              style={{ width: '50px', height: '50px', borderRadius: '25px', backgroundColor: '#f1f1f1' }}
              src='https://azurequarks.blob.core.windows.net/avatares/imgprofileuser2.png'
            />
          </div>
          <div>
            <h4>Harrison Alvarez</h4>
            <p style={{ fontSize: '12px' }}>Agregó una reseña</p>
          </div>
        </div>
        <img
          className={styles.imgTaller}
          src={`https://azurequarks.blob.core.windows.net/avatares/tullanta.png`}
        />
        <div style={{ padding: '16px', display: 'flex', gap: '4px', flexDirection: 'column', justifyContent: 'center' }}>
          <h4>Tu Llanta - Siete de Agosto</h4>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '12px', marginBottom: '4px' }}>
            {estrellas.map((el, index) => (
              <div id={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
                <Star index={index} stars={4} tamaño={'14'} />
              </div>
            ))}
          </div>
          <p className={styles.subtitle3}>
            Ofrecen un gran surtido, permiten pedidos en línea...
          </p>
        </div>
      </Link>
      <Link href={'/servicios-automotriz/negocio/64b816a0cbf32fcc68b63591-Oil%20Filter´s%207%20DE%20AGOSTO'} className={styles.containerCardOpinion}>
        <div style={{ padding: '16px', display: 'flex', gap: '16px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '25px', backgroundColor: '#f1f1f1' }}>
            <img
              style={{ width: '50px', height: '50px', borderRadius: '25px', backgroundColor: '#f1f1f1' }}
              src='https://azurequarks.blob.core.windows.net/avatares/imgprofileuser.jpg'
            />
          </div>
          <div>
            <h4>Abel Rojas</h4>
            <p style={{ fontSize: '12px' }}>Agregó una reseña</p>
          </div>
        </div>
        <img
          className={styles.imgTaller}
          src={`https://azurequarks.blob.core.windows.net/avatares/oildentro.png`}
        />
        <div style={{ padding: '16px', display: 'flex', gap: '4px', flexDirection: 'column', justifyContent: 'center' }}>
          <h4>Oil Filter´s 7 DE AGOSTO</h4>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', lineHeight: '12px', marginBottom: '4px' }}>
            {estrellas.map((el, index) => (
              <div id={index} style={{ marginRight: '8px', cursor: 'pointer', }} >
                <Star index={index} stars={5} tamaño={'14'} />
              </div>
            ))}
          </div>
          <p className={styles.subtitle3}>
            El servicio es excepcional y altamente recomendable personal...
          </p>
        </div>
      </Link>
    </div>
  </section>


</main>