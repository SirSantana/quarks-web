
import styles from '@/styles/HomeArticulos.module.css'
import Link from 'next/link'


export default function DiccionarioHome() {
  return (
    <>
      <section className={styles.containerRepuestos} style={{ marginBottom: '32px' }}>
        <Link href={'/glosario-de-autopartes/Caja-de-cambios-6491b9b021ba69c72ecb4295'} style={{ textDecoration: 'none', }} className={styles.flexItemRepuesto}>
          <img src='https://azurequarks.blob.core.windows.net/repuestos/cajadecambios200623.jpg' className={styles.imgRepuesto2} />
          <div style={{ padding: '8px' }}>
            <h4 className={styles.question} style={{ margin: 0, lineHeight: '20px', fontSize: '14px', color: '#5b0221' }}>Caja de cambios</h4>
            <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}>Es la encargada de transmitir la potencia del motor a las ruedas...</p>
          </div>
        </Link>
        <Link href={'/glosario-de-autopartes/Caja-de-direccion-6491c73921ba69c72ecb4297'} style={{ textDecoration: 'none', }} className={styles.flexItemRepuesto}>
          <img src='https://azurequarks.blob.core.windows.net/repuestos/cajadedireccion20062023.png' className={styles.imgRepuesto2} />
          <div style={{ padding: '8px' }}>
            <h4 className={styles.question} style={{ margin: 0, lineHeight: '20px', fontSize: '14px', color: '#5b0221' }}>Caja de direccion</h4>
            <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}>Es el componente encargado de convertir el movimiento del volante...</p>
          </div>
        </Link>
        <Link href={'/glosario-de-autopartes/Caja-de-transferencia-6491cfd621ba69c72ecb4298'} style={{ textDecoration: 'none', }} className={styles.flexItemRepuesto}>
          <img src='https://azurequarks.blob.core.windows.net/repuestos/cajadetransferencia20062023.png' className={styles.imgRepuesto2} />
          <div style={{ padding: '8px' }}>
            <h4 className={styles.question} style={{ margin: 0, lineHeight: '20px', fontSize: '14px', color: '#5b0221' }}>Caja de transferencia</h4>
            <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}>Es un componente de los vehículos de tracción a las 4 ruedas...</p>
          </div>
        </Link>
        <Link href={'/glosario-de-autopartes/Caja-y-Transmision'} style={{ textDecoration: 'none', }} className={styles.flexMoreRepuestos}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', alignItems: 'center', padding: '16px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
              <h3 style={{ margin: 0, fontSize: '22px', width: '60%' }} className={styles.triviaTitle}>Ver más</h3>
              <ion-icon style={{ fontSize: '32px', color: 'white' }} name="arrow-forward-circle-sharp"></ion-icon>
            </div>
          </div>
        </Link>

      </section>


      <h2 style={{ margin: '8px 0 16px 0', fontSize: '16px' }} className={styles.question}>Electricos</h2>

      <section className={styles.containerRepuestos} style={{ marginBottom: '32px' }}>
        <Link href={'/glosario-de-autopartes/Alternador-648de2b0821d58598a34a5c0'} style={{ textDecoration: 'none', }} className={styles.flexItemRepuesto}>
          <img src='https://azurequarks.blob.core.windows.net/repuestos/alternadorrepuesto17062023.jpg' className={styles.imgRepuesto2} />
          <div style={{ padding: '8px' }}>
            <h4 className={styles.question} style={{ margin: 0, lineHeight: '20px', fontSize: '14px', color: '#5b0221' }}>Alternador</h4>
            <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}>Es un generador de corriente eléctrica, es el encargado de convertir...</p>
          </div>
        </Link>
        <Link href={'/glosario-de-autopartes/Bateria-648e2e60821d58598a34a5c2'} style={{ textDecoration: 'none', }} className={styles.flexItemRepuesto}>
          <img src='https://azurequarks.blob.core.windows.net/repuestos/bateriasrepuestos17052023.jpg' className={styles.imgRepuesto2} />
          <div style={{ padding: '8px' }}>
            <h4 className={styles.question} style={{ margin: 0, lineHeight: '20px', fontSize: '14px', color: '#5b0221' }}>Bateria</h4>
            <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}>Se encarga de arrancar el motor, y de apoyo para...</p>
          </div>
        </Link>
        <Link href={'/glosario-de-autopartes/Bobina-de-encendido-648e48bb821d58598a34a5c3'} style={{ textDecoration: 'none', }} className={styles.flexItemRepuesto}>
          <img src='https://azurequarks.blob.core.windows.net/repuestos/bobinadeencendido17062023.png' className={styles.imgRepuesto2} />
          <div style={{ padding: '8px' }}>
            <h4 className={styles.question} style={{ margin: 0, lineHeight: '20px', fontSize: '14px', color: '#5b0221' }}>Bobina de encendido</h4>
            <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}>Es un componente del sistema de encendido del vehículo...</p>
          </div>
        </Link>
        <Link href={'/glosario-de-autopartes/Electricos'} style={{ textDecoration: 'none', }} className={styles.flexMoreRepuestos}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', alignItems: 'center', padding: '16px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
              <h3 style={{ margin: 0, fontSize: '22px', width: '60%' }} className={styles.triviaTitle}>Ver más</h3>
              <ion-icon style={{ fontSize: '32px', color: 'white' }} name="arrow-forward-circle-sharp"></ion-icon>
            </div>
          </div>
        </Link>

      </section>

      <h2 style={{ margin: '8px 0 16px 0', fontSize: '16px' }} className={styles.question}>Motor</h2>

      <section className={styles.containerRepuestos} style={{ marginBottom: '32px' }}>

        <Link href={'/glosario-de-autopartes/Árbol-de-levas---Eje-de-levas-648df299821d58598a34a5c1'} style={{ textDecoration: 'none', }} className={styles.flexItemRepuesto}>
          <img src='https://azurequarks.blob.core.windows.net/repuestos/arboldelevasrepuestos17062023.png' className={styles.imgRepuesto2} />
          <div style={{ padding: '8px' }}>
            <h4 className={styles.question} style={{ margin: 0, lineHeight: '20px', fontSize: '14px', color: '#5b0221' }}>Arbol de levas / Eje de levas</h4>
            <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}>Es el encargado de manejar la apertura y cierre... </p>
          </div>
        </Link>
        <Link href={'/glosario-de-autopartes/Bomba-de-gasolina-648e714dae5cde6b95562cef'} style={{ textDecoration: 'none', }} className={styles.flexItemRepuesto}>
          <img src='https://azurequarks.blob.core.windows.net/repuestos/bombagasolia260623.jpeg' className={styles.imgRepuesto2} />
          <div style={{ padding: '8px' }}>
            <h4 className={styles.question} style={{ margin: 0, lineHeight: '20px', fontSize: '14px', color: '#5b0221' }}>Bomba de gasolina</h4>
            <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}>Se encarga de proporcionar un flujo constante de combustible...</p>
          </div>
        </Link>
        <Link href={'/glosario-de-autopartes/Bomba-de-aceite-648e8ea6ae5cde6b95562cf2'} style={{ textDecoration: 'none', }} className={styles.flexItemRepuesto}>
          <img src='https://azurequarks.blob.core.windows.net/repuestos/bombaaceite260623.jpeg' className={styles.imgRepuesto2} />
          <div style={{ padding: '8px' }}>
            <h4 className={styles.question} style={{ margin: 0, lineHeight: '20px', fontSize: '14px', color: '#5b0221' }}>Bomba de aceite</h4>
            <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}>Es la encargada de mantener un flujo constante del lubricante...</p>
          </div>
        </Link>
        <Link href={'/glosario-de-autopartes/Motor'} style={{ textDecoration: 'none', }} className={styles.flexMoreRepuestos}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', alignItems: 'center', padding: '16px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
              <h3 style={{ margin: 0, fontSize: '22px', width: '60%' }} className={styles.triviaTitle}>Ver más</h3>
              <ion-icon style={{ fontSize: '32px', color: 'white' }} name="arrow-forward-circle-sharp"></ion-icon>
            </div>
          </div>
        </Link>

      </section>

      <h2 style={{ margin: '8px 0 16px 0', fontSize: '16px' }} className={styles.question}>Frenado</h2>

      <section className={styles.containerRepuestos} style={{ marginBottom: '32px' }}>

        <Link href={'/glosario-de-autopartes/Bomba-de-freno-648e8821ae5cde6b95562cf1'} style={{ textDecoration: 'none', }} className={styles.flexItemRepuesto}>
          <img src='https://azurequarks.blob.core.windows.net/repuestos/bombadefreno260623.jpeg' className={styles.imgRepuesto2} />
          <div style={{ padding: '8px' }}>
            <h4 className={styles.question} style={{ margin: 0, lineHeight: '20px', fontSize: '14px', color: '#5b0221' }}>Bomba de freno</h4>
            <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}>Se encarga de activar los frenos y detener el vehículo... </p>
          </div>
        </Link>
        <Link href={'/glosario-de-autopartes/Campana-de-freno-64947e6a787958e84ce45a14'} style={{ textDecoration: 'none', }} className={styles.flexItemRepuesto}>
          <img src='https://azurequarks.blob.core.windows.net/repuestos/campanadefreno220623.jpg' className={styles.imgRepuesto2} />
          <div style={{ padding: '8px' }}>
            <h4 className={styles.question} style={{ margin: 0, lineHeight: '20px', fontSize: '14px', color: '#5b0221' }}>Campana de freno</h4>
            <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}>Es un componente de los frenos de tambor, funciona...</p>
          </div>
        </Link>
        <Link href={'/glosario-de-autopartes/Disco-de-freno-64961276abfa94222079afb1'} style={{ textDecoration: 'none', }} className={styles.flexItemRepuesto}>
          <img src='https://azurequarks.blob.core.windows.net/repuestos/discofreno260623.jpeg' className={styles.imgRepuesto2} />
          <div style={{ padding: '8px' }}>
            <h4 className={styles.question} style={{ margin: 0, lineHeight: '20px', fontSize: '14px', color: '#5b0221' }}>Disco de freno</h4>
            <p className={styles.response} style={{ color: '#626262', fontWeight: '400', margin: 0, fontSize: '12px' }}>Es un medio de frenado eficaz y seguro en los vehículos....</p>
          </div>
        </Link>
        <Link href={'/glosario-de-autopartes/Frenado'} style={{ textDecoration: 'none', }} className={styles.flexMoreRepuestos}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', alignItems: 'center', padding: '16px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
              <h3 style={{ margin: 0, fontSize: '22px', width: '60%' }} className={styles.triviaTitle}>Ver más</h3>
              <ion-icon style={{ fontSize: '32px', color: 'white' }} name="arrow-forward-circle-sharp"></ion-icon>
            </div>
          </div>
        </Link>

      </section>
    </>

  )
}