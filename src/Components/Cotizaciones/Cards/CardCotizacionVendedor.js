import useAuth from '@/hooks/useAuth'
import styles from '@/styles/Cotizaciones.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import HeaderCotizaciones from './HeaderCotizaciones'



export default function CardCotizacionVendedor({ data, pregunta, idPregunta, celular }) {
  const router = useRouter()
  const [ciudad, setCiudad] = useState(null)

  const [visibleAllData, setVisibleAllData] = useState(false)
  
  
  return (
    <div className={styles.containerCotizaciones2}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end', marginBottom: '8px', }}>
        <HeaderCotizaciones id={data?.user} setCiudad={setCiudad}  setVisibleAllData={setVisibleAllData} cotizacion={data} visibleAllData={visibleAllData} pregunta={pregunta} celular={celular} ciudad={ciudad}/>
        {/* <div style={{ height: '1px', backgroundColor: 'lightGray', margin: '10px 0' }} /> */}

        {visibleAllData &&
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                {/* <span style={{ color: '#373737', fontSize: '24px', margin: 0, fontWeight: 700 }}>$ {data.precio}</span> */}
                {/* {data?.envio && <h4 style={{ color: 'green', fontSize: '18px', margin: 0, marginLeft: '10px', fontWeight: 600 }}>Envio Gratis!</h4>} */}
              </div>
              {/* <h6 style={{ color: 'gray', fontSize: '12px', margin: 0, fontWeight: 400 }}>Precio sujeto a cambios en el tiempo*</h6> */}
            </div>
            <div>

              <div style={{ display: 'flex', margin: '8px 0', gap: '8px', flexDirection: 'column', justifyContent: 'space-between',  }}>
                <h3 style={{ margin: 0,fontSize:'18px', color:'#373737', fontWeight:'700', }} className={styles.subtitle}>Descripción  </h3>
                <h3 style={{ margin: 0,fontSize:'14px',color:'#929090'  }} className={styles.subtitle}>{data?.descripcion ? data?.descripcion: 'No hay ninguna descripción'} </h3>
              </div>

            </div>
            <h3 style={{ margin: '16px 0 8px 0',fontSize:'18px', color:'#373737', fontWeight:'700', }} className={styles.subtitle}>Detalles  </h3>

            <div style={{ display: 'flex', margin: '16px 0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize:'14px', color:'gray' }} className={styles.subtitle}>Estado  </h3>
              <h3 style={{ margin: 0, fontSize:'14px', fontWeight:'700' }} className={styles.subtitle}> {data?.estado}</h3>
            </div>
            <div style={{ display: 'flex', margin: '16px 0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize:'14px', color:'gray'}} className={styles.subtitle}>Garantía  </h3>
              <h3 style={{ margin: 0, fontSize:'14px', fontWeight:'700' }} className={styles.subtitle}> {data?.garantia?.length > 0 ? data?.garantia + ' mes(es)' : 'Sin garantía'}</h3>
            </div>

            <div style={{ display: 'flex', margin: '16px 0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0,fontSize:'14px', color:'gray' }} className={styles.subtitle}>Ubicación  </h3>
              <h3 style={{ margin: 0, fontSize:'14px', fontWeight:'700' }} className={styles.subtitle}> {data?.ciudad}</h3>
            </div>

            <div style={{ display: 'flex', margin: '16px 0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize:'14px', color:'gray'  }} className={styles.subtitle}>Marca / origen  </h3>
              <h3 style={{ margin: 0,  fontSize:'14px',fontWeight:'700'}} className={styles.subtitle}> {data?.marca}</h3>
            </div>
            <h6 style={{ color: '#f50057', margin: 0,  fontWeight: 400, fontSize: '14px' }}>Precio sujeto a cambios en el tiempo*</h6>


            
          </div>

        }



      </div>
    </div>
  )
}