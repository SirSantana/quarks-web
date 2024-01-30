import Button, { ButtonVariant } from "@/src/Components/Button/Button";
import Icon, { IconCatalog } from "@/src/Components/Icon/Icon";
import Layout from "@/src/Components/Layout";
import styles from '@/styles/Faq.module.css'
import Image from "next/image";



export default function Planes() {
  const sendMessage = ({nivel}) => {
    let url = `https://api.whatsapp.com/send?phone=573114754394`;
    url += `&text=${encodeURI(`👋 Buen dia, estoy interesado en anunciar mi taller con el plan ${nivel}🚀`)}&app_absent=0`
    window.open(url);
  }
  return (
    <Layout title={'Planes | Quarks'}>
      <div style={{ marginTop: '32px', marginBottom: '32px' }} className={styles.container}>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '32px' }}>
          <h1 className={styles.title}>Planes</h1>
          <p className={styles.response}>Tenemos 3 planes para hacer crecer tu taller!</p>
        </div>

        <div className={styles.containerPlan}>
          <div className={styles.containerOnePlan}>
            <h3>Basico</h3>
            <p style={{ marginTop: '0', fontSize: '14px' }} className={styles.response}>Visibilidad hasta <span style={{ fontWeight: '600' }}>500</span> clientes potenciales</p>
            <h2 style={{ fontSize: '40px', margin: '16px 0 48px 0' }}>$0</h2>

            <ul style={{ gap: '16px', display: 'flex', flexDirection: 'column', marginBottom: '32px' }}>
              <li style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className={styles.onePlanList}>
                  <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                  <p className={styles.onePlanP}>Bajo alcance en el mapa</p>
                </div>
                <Image
                  sizes="100vw"
                  width={220}
                  height={140}
                  style={{ aspectRatio: '11/7' }}
                  src={'/Mapa-plan-basico.jpg'}
                />
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Una foto de perfil</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Horario</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Servicios ofrecidos</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Reseñas</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Mapa de ubicacion</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Telefonos de contacto</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Boton de contacto simple</p>
              </li>
            </ul>
            <Button link href={'/acceso'} variant={ButtonVariant.outlined} fullWidth>
              Crear perfil
            </Button>
          </div>


          <div className={styles.containerOnePlan}>
            <h3>Pro</h3>
            <p style={{ marginTop: '0', fontSize: '14px' }} className={styles.response}>Visibilidad entre <span style={{ fontWeight: '600' }}>500 a 3.000</span> clientes potenciales</p>
            <h2 style={{ fontSize: '40px', margin: '16px 0 48px 0' }}>$19.990<span style={{ fontSize: '12px', fontWeight: '500' }}>/mes</span></h2>

            <ul style={{ gap: '16px', display: 'flex', flexDirection: 'column', marginBottom: '32px' }}>
              <li style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className={styles.onePlanList}>
                  <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                  <p className={styles.onePlanP}>Medio alcance en el mapa</p>
                </div>
                <Image
                  sizes="100vw"
                  width={220}
                  height={140}
                  style={{ aspectRatio: '345/172' }}
                  src={'/Mapa-plan-medio.jpg'}
                />
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Hasta 5 fotos</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Horario</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Servicios ofrecidos</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Reseñas</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Mapa de ubicacion</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Telefonos de contacto</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Boton de contacto simple</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Link redes sociales</p>
              </li>
            </ul>
            <Button onClick={()=>sendMessage({nivel:'Pro'})} variant={ButtonVariant.outlined} fullWidth>
              Estoy interesado
            </Button>
          </div>



          <div style={{ backgroundColor: '#f1f1f1', border: '1px solid #c5c5c5', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)' }} className={styles.containerOnePlan}>
            <div className={styles.tooltipOnePlanMaster}>
              <p style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>Recomendado</p>
            </div>
            <h3>Master</h3>
            <p style={{ marginTop: '0', fontSize: '14px' }} className={styles.response}>Visibilidad entre <span style={{ fontWeight: '600' }}>3.000 a 10.000</span> clientes potenciales</p>
            <h2 style={{ fontSize: '40px', margin: '16px 0 48px 0' }}>$29.990<span style={{ fontSize: '12px', fontWeight: '500' }}>/mes</span></h2>

            <ul style={{ gap: '16px', display: 'flex', flexDirection: 'column', marginBottom: '32px' }}>
              <li style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                  <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                  <p className={styles.onePlanP}>Alto alcance en el mapa</p>
                </div>
                <Image
                  sizes="100vw"
                  width={220}
                  height={140}
                  style={{ aspectRatio: '327/163' }}
                  src={'/Mapa-plan-alto.jpg'}
                />
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p style={{ fontWeight: '500', fontSize: '14px', }}>+5 fotos</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Horario</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Servicios ofrecidos</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Reseñas</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Mapa de ubicacion</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Telefonos de contacto</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Boton de contacto con mensaje personalizado (Master)</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Sin publicidad de otros talleres en tu perfil</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Taller visible en perfiles de otros talleres</p>
              </li>
              <li className={styles.onePlanList}>
                <Icon style={{ color: '#0CC572' }} name={IconCatalog.checkmarkCircle} />
                <p className={styles.onePlanP}>Analiticas</p>
              </li>
            </ul>
            <Button onClick={()=>sendMessage({nivel:'Master'})} variant={ButtonVariant.secondary} fullWidth>
              Estoy interesado
            </Button>
          </div>
        </div>
      </div>

    </Layout>

  )
}