
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useRouter } from 'next/router';


export default function CardPerfil({ data }) {
  const router = useRouter()

  const sendMessageWha = () => {
    createVisitaWhatsapp({ variables: { id: data?.id } })
    let url = `https://api.whatsapp.com/send?phone=57${data?.whatsapp}`;
    url += `&text=${encodeURI(`Buenos dia, vi su negocio en https://quarks.com.co${router?.asPath}, estoy interesado en...`)}&app_absent=0`
    window.open(url);
  }
  return (
    <div style={{ height: '80vh', backgroundColor: 'white', border: '1px solid #d6d6d6', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', boxSizing: 'border-box', margin: '0 auto', borderRadius: '16px', width: '90%', maxWidth: '600px', justifyContent: 'space-between' }}>
      <div style={{display:'flex', flexDirection:'column', width:'100%', alignItems:'center'}}>
        {data?.fotoperfil ?
          <img style={{ borderRadius: '50%', border: '1px solid #f1f1f1', width: '160px', height: '160px', }} src={data?.fotoperfil} alt={`Taller automotriz ${data?.nombre}`} className={styles.imgPrincipalLugarMobile} />
          : <ion-icon style={{ fontSize: '72px' }} className={styles.imgPrincipalLugarMobile} name="storefront-outline"></ion-icon>
        }
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h1 style={{ fontSize: '28px', lineHeight: '1.1', alignSelf: 'center', textAlign: 'center' }} className={styles.titleNegocio}>{data?.nombre} </h1>
        <h3 style={{ fontSize: '16px', fontWeight: '400', alignSelf: 'center', textAlign: 'center' }}>cra27a ·64a-59. Bogota, Colombia</h3>
      </div>
      {data?.tipo === 'Almacen'
        &&
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', }}>
          {data?.marcasAutos.map(el => (
            <img style={{ width: '40px', height: '40px', borderRadius: '10px' }} src={`${el}.png`} alt={`Taller automotriz ${data?.nombre}`} className={styles.imgPrincipalLugarMobile} />
          ))}
        </div>
      }
      <button style={{ width: '100%', gap: '16px', borderRadius: '12px', fontSize: '16px' }} onClick={sendMessageWha} className={styles.buttonPrimaryMobile}><ion-icon style={{ color: 'white', fontSize: '20px' }} name="logo-whatsapp"></ion-icon>Contactar ahora</button>

    </div >
  )
}