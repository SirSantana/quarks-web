import useAuth from '@/hooks/useAuth'
import styles from '@/styles/Cotizaciones.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import HeaderCotizaciones from './HeaderCotizaciones'



export default function CardCotizacionVendedor({ data, pregunta, idPregunta }) {
  const router = useRouter()
  const { user } = useAuth()
  const [ciudad, setCiudad] = useState(null)

  const [celularVendedor, setCelularVendedor] = useState(null)
  const [visibleAllData, setVisibleAllData] = useState(false)


  const urlPregunta = `https://www.quarks.com.co${router.asPath}`
  const sendMessage = () => {
    let url = `https://api.whatsapp.com/send?phone=57${celularVendedor}`;
    url += `&text=${encodeURI(`😁 Hola, quiero saber si tienen disponibilidad de la cotizacion N°${data.id} \n ✍️ Descripcion: ${pregunta} \n 📌 Link de la pregunta: ${urlPregunta}`)}&app_absent=0`
    window.open(url);
  }
  return (
    <div className={styles.containerCotizaciones2}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end', marginBottom: '8px', }}>
        <HeaderCotizaciones id={data?.user} setCiudad={setCiudad} setCelularVendedor={setCelularVendedor} setVisibleAllData={setVisibleAllData} precio={data?.precio} envio={data?.envio} />
        {/* <div style={{ height: '1px', backgroundColor: 'lightGray', margin: '10px 0' }} /> */}

        {visibleAllData &&
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                {/* <span style={{ color: '#373737', fontSize: '24px', margin: 0, fontWeight: 700 }}>$ {data.precio}</span> */}
                {data?.envio && <h4 style={{ color: 'green', fontSize: '18px', margin: 0, marginLeft: '10px', fontWeight: 600 }}>Envio Gratis!</h4>}
              </div>
              {/* <h6 style={{ color: 'gray', fontSize: '12px', margin: 0, fontWeight: 400 }}>Precio sujeto a cambios en el tiempo*</h6> */}
            </div>
            <div>

              <div style={{ display: 'flex', margin: '16px 0', gap: '16px', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0,fontSize:'14px', color:'gray' }} className={styles.subtitle}>Descripción  </h3>
                <h3 style={{ margin: 0, }} className={styles.subtitle}> {data?.descripcion}</h3>
              </div>
              <div style={{ height: '1px', backgroundColor: 'lightGray', margin: '10px 0' }} />

            </div>
            <div style={{ display: 'flex', margin: '16px 0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize:'14px', color:'gray' }} className={styles.subtitle}>Estado  </h3>
              <h3 style={{ margin: 0 }} className={styles.subtitle}> {data?.estado}</h3>
            </div>

            <div style={{ display: 'flex', margin: '16px 0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize:'14px', color:'gray'}} className={styles.subtitle}>Garantía  </h3>
              <h3 style={{ margin: 0 }} className={styles.subtitle}> {data?.garantia?.length > 0 ? data?.garantia + ' mes(es)' : 'Sin garantía'}</h3>
            </div>
            <div style={{ display: 'flex', margin: '16px 0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0,fontSize:'14px', color:'gray' }} className={styles.subtitle}>Ubicación  </h3>
              <h3 style={{ margin: 0 }} className={styles.subtitle}> {ciudad}</h3>
            </div>
            <div style={{ display: 'flex', margin: '16px 0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize:'14px', color:'gray'  }} className={styles.subtitle}>Marca / origen  </h3>
              <h3 style={{ margin: 0,}} className={styles.subtitle}> {data?.marca}</h3>
            </div>
            <h6 style={{ color: '#f50057', margin: 0,  fontWeight: 400, fontSize: '14px' }}>Precio sujeto a cambios en el tiempo*</h6>


            {user?.id === data?.user
              ? <button className={styles.button}>Tu cotizacion</button>
              : <button style={{ marginTop: '10px', }} onClick={sendMessage} className={styles.button}>Contactar disponibilidad</button>
            }
          </div>

        }



      </div>
    </div>
  )
}