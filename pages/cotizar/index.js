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
                <div className={styles.container4}>
                <h1 className={styles.title2}>Cotiza tus repuestos</h1>
                <h3 className={styles.subtitle}>Completa los campos y recibe la cotizacion a tu celular</h3>
                
                <form style={{display:'flex', flexDirection:'column', marginTop:'40px', gap:'10px'}}>
                    <label htmlFor="marca" className={styles.label}>Marca</label>
                    <input id='marca' className={styles.input} type={'text'} placeholder='Chevrolet'/>

                    <label htmlFor="referencia" className={styles.label}>Referencia</label>
                    <input id='referencia' className={styles.input}type={'text'}placeholder='Aveo'/>
                    
                    <label htmlFor="repuestos" className={styles.label}>Repuestos</label>
                    <input id='repuestos' className={styles.input}type={'text'}placeholder='Eje de levas'/>
                    
                    <label htmlFor="celular" className={styles.label}>Celular</label>
                    <input id='celular' className={styles.input}type={'text'}placeholder='312355****'/>
                    
                    <input className={styles.button} type={'submit'} value='Enviar Cotizacion'/>
                </form>
                
                </div>

                

                </div>
                
            </div>
        </Layout>
    )
}