import Layout from "@/src/Components/Layout";
import styles from '@/styles/Faq.module.css'

const initialForm = {
  nombre:'',
  email:'',
  mensaje:''
} 
export default function ContactUs() {
  const sendMessage = () => {
    let to = 'quarkscolombia@gmail.com'
    let subject = 'Sugerencias, reportes, problemas, etc.'
    let body = 'Estoy interesado en adquirir el nivel premium...'
    Linking.openURL(`mailto:${to}?subject=${subject}&body=${body}`)

    let url = `mailto:${to}?subject=${subject}&body=${body}`;
    url += `&text=${encodeURI(problema)}&app_absent=0`
    window.open(url);
  }
  return (
    <Layout title={'Contactanos | Quarks'}>
      <div className={styles.container}>
        <h1 className={styles.title}>Contáctanos</h1>
        <p className={styles.response}>Puedes escribirnos por nuestras redes sociales</p>
        {/* <p className={styles.response}>Cuentanos si tienes alguna sugerencia, reporte o problema con algun vendedor. <br />
          Sientete libre de contarnos lo que quieras, nos pondremos en contacto contigo lo mas pronto posible.</p>
        <form className={styles.form}>
          <input placeholder="Tú nombre" className={styles.input} type={'text'} />
          <input placeholder="Tú email" className={styles.input} type={'email'} />
          <textarea placeholder="Tú mensaje" className={styles.input} style={{height:'100px', resize:'none'}} rows="5" type={'text'} />
          <button className={styles.button}>
            Enviar mensaje
          </button>
        </form> */}
      </div>
    </Layout>
  )
}