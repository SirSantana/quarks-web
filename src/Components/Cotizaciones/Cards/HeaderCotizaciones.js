import { GET_AVATAR_USER } from '@/graphql/queries';
import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import styles from '@/styles/Cotizaciones.module.css'
import useAuth from '@/hooks/useAuth';

let preguntas = [
  '¿Cómo funciona?',
  '¿Problemas con el vendedor?',
  'Contactanos'
]
export default function HeaderCotizaciones({ id, setCiudad, setVisibleAllData, cotizacion, visibleAllData, pregunta, celular, ciudad, }) {
  const router = useRouter()
  const [getAvatar, { loading, data, error }] = useLazyQuery(GET_AVATAR_USER)
  const { user } = useAuth()
  const [celularVendedor, setCelularVendedor] = useState(null)
  console.log(cotizacion?.precio);
  let total = (Number(cotizacion?.precio) + Number(cotizacion?.precio * 0.10)).toString()

  const urlPregunta = `quarks.com.co${router.asPath}`
  const sendMessage = () => {
    let url = `https://api.whatsapp.com/send?phone=573203393232`;
    url += `&text=${encodeURI(`😁 Hola, quiero saber si tienen disponibilidad de la cotizacion N°${cotizacion.id} \n ✍️ Descripcion: ${pregunta} \n 📌 Link de la pregunta: \n` + urlPregunta)}&app_absent=0`
    window.open(url);
  }

  const alertCliente = () => {
    let url = `https://api.whatsapp.com/send?phone=57${celular}`;
    url += `&text=${encodeURI(`😁 Hola, tienes una nueva cotizacion por tu repuesto! \n🧑 $.${total} en marca / origen ${cotizacion?.marca} \n✍️ Para ver la(s) cotización al detalle, ve al link en la parte de arriba`)}&app_absent=0`
    window.open(url)
  }
  useEffect(() => {
    if (data) {
      setCelularVendedor(data?.getAvatar?.celular)
      setCiudad(data?.getAvatar?.ciudad)
    }
  }, [data])
  useEffect(() => {
    if (id) {
      getAvatar({ variables: { id: id } })
    }
  }, [id])
  return (
    <section onClick={() => setVisibleAllData(prev => prev ? false : true)} style={{ display: 'flex', cursor: 'pointer', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '8px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '40%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', }}>
          {/* <div style={{ width: '40px', height: '40px', alignSelf: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', borderRadius: '50%', fontSize: '14px', backgroundColor: 'purple', color: 'white', marginRight: '16px' }}>
            {data?.getAvatar?.avatar
              ? <img alt={'imagenperfil'} src={data?.getAvatar?.avatar} style={{ objectFit: 'contain', height: '40px', width: '40px', backgroundColor: 'white', borderRadius: '25px' }} />
              : <h3 style={{ fontWeight: '400', fontSize: '18px' }}>{data?.getAvatar?.name.slice(0, 1)}</h3>
            }
          </div> */}
          <div>
            {/* <h2 style={{ color: 'gray', fontSize: '16px', margin: 0, fontWeight: 400 }}>{data?.getAvatar?.name.split(' ', 1)} en {data?.getAvatar.ciudad} </h2> */}
            <h4 style={{ color: '#5B0221', fontSize: '22px', margin: ' 0 0 8px 0', fontWeight: 700 }}>$ {total?.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}  </h4>
            <h4 style={{ color: '#9D9D9D', fontSize: '14px', margin: 0, lineHeight: '12px', fontWeight: 400 }}>Marca / Origen </h4>
            <h6 style={{ color: '#373737', margin: 0, fontSize: '16px', fontWeight: 600, }}>{cotizacion?.marca}</h6>
          </div>
        </div>
      </div>

      <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        {user?.id === cotizacion?.user
          ? <button style={{ width: '100%' }} className={styles.button}>Tu cotizacion</button>
          : <button style={{ width: '100%' }} onClick={sendMessage} className={styles.button}>Contactar</button>
        }
        {user?.role === 'Admin'
          && <button onClick={alertCliente} style={{ width: '100%', marginTop: '16px', padding: '8px' }}>Mensaje Cliente</button>
        }
        <button style={{ color: '#9D9D9D', display: 'flex', gap: '4px', backgroundColor: 'inherit', border: 'none', fontSize: '700', justifyContent: 'center', alignItems: 'center', margin: 0 }} className={styles.button}>
          Ver detalle
          {
            visibleAllData ?
              <img alt={'dropdown'} src={'../../arrowDown.svg'} style={{ height: '22px', width: '22px', rotate: '180deg' }} />
              :
              <img alt={'dropdown'} src={'../../arrowDown.svg'} style={{ height: '22px', width: '22px', }} />
          }
        </button>
      </div>

      {/* <button onClick={()=> {setVisibleModal(true),window.scrollTo({ top: 0, behavior: 'smooth' });}} style={{  display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: '30px', border: 'none', borderRadius: '5px', fontSize: '16px', backgroundColor: 'inherit',  cursor: 'pointer' }}>
      <img alt={'menu'} src={'/menu.svg'}  />
      </button> */}

    </section>


  )
}