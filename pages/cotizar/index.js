import FormPregunta from "../../components/Cotizaciones/Form/FormPregunta";
import Layout from "../../components/Layout";
import styles from '../../styles/Cotizar.module.css'


export default function CotizarPage(){
    return(
        <Layout title={'Cotiza tus repuestos'}>
            <div className={styles.container2}>
                <div className={styles.container}>
                <img src="/StoreScreen.png" alt="FondoRepuestosCarros" className={styles.image} />

                </div>

                <div className={styles.container3}>
                <FormPregunta/>
                </div>
                
            </div>
        </Layout>
    )
}