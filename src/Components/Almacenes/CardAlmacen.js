
import styles from '@/styles/Almacenes.module.css'
import { ModalContactAlmacen, ModalVisibleTelefonoAlmacen } from '@/utils/Modales'
import { useState } from 'react'

const subCategorias = {
  Accesorios: ['Accesorios', 'Alarma', 'Pito', 'Plumillas', 'Parasoles', 'Antena', 'Tapizados', 'Emblemas', 'Tapetes'],
  Baterias: ['Baterias'],
  Clutch: ['Balinera', 'Prensa', 'Kit Clutch', 'Balibomba', 'Guaya', 'Discos', 'Horquilla'],
  "Caja y Transmision": ['Bronces', 'Trenfijo', 'Reten', 'Guaya cambios', 'Corona', 'Palanca cambios',],
  Carroceria: ['Vidrio', 'Capot', 'Boceles', 'Espejos', 'Manijas', 'Bomper', 'Frontales', 'Puertas', 'Guardafango'],
  Correas: ['Distribucion', 'Alternador', 'Aire acondicionado'],
  "Direccion y suspension": ['Amortiguadores', 'Bocines', 'Axiales', 'Rotulas', 'Terminales', 'Espirales', 'Rodamientos', 'Tijeras', 'Ejes', 'Puntas de eje', 'Muñecos', '+2'],
  Electricos: ['Sensores', 'Bobinas', 'Computadores', 'Switch', 'Cables alta', 'Bujias', 'Motores'],
  Filtros: ['Aceite', 'Motor', 'Aire', 'Gasolina'],
  Lubricantes: ['Aceites'],
  Frenado: ['Bomba de freno', 'Mordazas', 'Campanas', 'Pastas', 'Discos', 'Manguera', 'Cilindro', 'Bandas', 'Palanca'],
  Iluminacion: ['Farolas', 'Bombillos', 'Stop', 'Direccional', 'Exploradoras'],
  Motor: ['Anillos', 'Pistones y bielas', 'Balancines', 'Casquetes', 'B. Aceite', 'Piñones', 'Carter', 'Valvulas', 'Kit distribucion', 'Inyectores', 'Soportes', '+5'],
  Refrigeracion: ['B. Agua', 'Ventilador', 'Refrigerador', 'Radiador', 'Termostato', 'Depositos', 'Compresor', '+3']
}
export default function CardAlmacen({ almacen }) {
  const [visibleCategorias, setVisibleCategorias] = useState(false)
  const [visibleModalContactAlmacen, setVisibleModalContactAlmacen] = useState(false)
  const [tipo, setTipo] = useState(null)

  const sendMessageWha =()=>{
    let url = `https://api.whatsapp.com/send?phone=57${almacen?.celular}`;
    url += `&text=${encodeURI(`Hola buenos dia, vi su almacen en Quarks, estoy averiguando...`)}&app_absent=0`
    window.open(url);
  }


  return (
    <div className={styles.cardDataAlmacen}>

      <h4 style={{ marginBottom: 0 }} className={styles.title2}>Marcas comercializadas</h4>
      {almacen?.marcas.map(marca => (
        <img id={marca} src={`../${marca}.png`} style={{ height: '32px', width: '32px', marginRight: '8px' }} />
      ))}

      <h4 style={{ margin: '4px 0 8px 0' }} className={styles.title2}>Repuestos Manejados</h4>
      {almacen?.categorias?.map(categoria => (
        <div id={categoria} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '8px' }}>
          <img src={`../${categoria}.png`} style={{ height: '24px', width: '24px', marginRight: '8px' }} />
          <h6 className={styles.subtitle} style={{ marginRight: '8px' }}> · </h6>
          <h6 className={styles.subtitle} style={{ margin: 0, fontSize: '14px' }}>{categoria}</h6>
        </div>
      ))}

      {/* <h4 style={{ margin: '8px 0' }} className={styles.title2}>Calidad repuestos</h4> */}

      <button onClick={sendMessageWha} style={{ width: '100%', fontSize: '14px', margin: '8px 0' }} className={styles.button}>Contactar por WhatsApp</button>
      <button onClick={() => setVisibleModalContactAlmacen(true)} style={{ width: '100%', fontSize: '14px', backgroundColor: 'white', border: '1px solid #f50057', color: '#f50057', marginBottom: '8px' }} className={styles.button}>Ver telefono</button>

      <div style={{ backgroundColor: '#bababa', height: '1px', width: '100%', margin: '16px 0' }} />

      <div onClick={() => setVisibleCategorias(visibleCategorias ? false : true)} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: '0px 0 8px 0' }} className={styles.title2}>Categorias repuestos</h4>
        <img src='/arrowDown.svg' style={{ height: '20px', width: '20px', marginLeft: '8px' }} />
      </div>

      {visibleCategorias &&
        <h6 className={styles.subtitle} style={{ margin: 0, fontSize: '14px' }}>{almacen?.categorias.map(categoria => (
          subCategorias[categoria]?.map(categoria => categoria + " · ")
        ))}
        </h6>
      }
      {/* {
        visibleModalContactAlmacen &&
        <ModalContactAlmacen almacen={almacen} setVisibleModalContactAlmacen={setVisibleModalContactAlmacen} tipo={tipo} />
      } */}
      {
        visibleModalContactAlmacen &&
        <ModalVisibleTelefonoAlmacen celular={almacen?.celular} setVisibleModalContactAlmacen={setVisibleModalContactAlmacen}/>
      }
    </div>
  )
}