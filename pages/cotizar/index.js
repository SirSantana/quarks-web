import FormPregunta from "../../components/Cotizaciones/Form/FormPregunta";
import Layout from "../../components/Layout";
import styles from '../../components/Home/styles.module.css'
let marcas = ['Chevrolet', 'Mazda', 'Ford', 'Renault']


export default function CotizarPage() {
  return (
    <Layout title={'Cotiza tus repuestos | Quarks'} type='website' description={'Encuentra los repuestos para tu vehiculo facil y rapido en colombia'}>
      <section className={styles.container} style={{ marginTop: '80px' }}>
        <div className={styles.containerManual}>
          <div className={styles.containerManual2}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
              {marcas.map(marca => (
                <img src={`/${marca}.png`} style={{ width: '50px', height: '50px' }} alt={`Repuestos para ${marca}`} />
              ))}
            </div>
            <h1 style={{ margin: '15px 0', lineHeight:'35px' }} className={styles.titleBlue}>Cotiza tus repuestos <b style={{ color: '#f50057' }}>manualmente</b>  </h1>
            <h2 style={{ fontSize: '18px', color: '#1b333d' }} className={styles.subtitleRed}>Si no encontraste tu(s) repuesto(s) en el buscador, también puedes cotizarlos manualmente.<br /> Completa el siguiente formulario, y nosotros te enviaremos la cotización a tu Whatsapp en un plazo de 2 a 24 horas.</h2>
          </div>
          <FormPregunta />
        </div>
      </section>
    </Layout>
  )
}