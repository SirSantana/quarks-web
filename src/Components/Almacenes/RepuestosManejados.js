import styles from '@/styles/Almacenes.module.css'

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


export default function RepuestosManejados({almacen}){
    return(
        <>
        <h2 style={{ fontSize: '16px', marginBottom: '16px' }} className={styles.title2}>Repuestos manejados</h2>
        {almacen?.categorias?.map(categoria => (
        <div id={categoria} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '16px' }}>
          <img src={`../${categoria}.png`} style={{ height: '32px', width: '32px', marginRight: '8px' }} />
          <h6 className={styles.subtitle} style={{ marginRight: '8px' }}> · </h6>
          <h6 className={styles.subtitle} style={{ margin: 0, fontSize: '14px', fontWeight:'600' }}>{categoria}</h6>
        </div>
      ))}
            <h6 style={{marginTop:'8px',fontSize: '14px'}} className={styles.title3}>{almacen?.categorias.map(categoria => (
          subCategorias[categoria]?.map(categoria => categoria + " · ")
        ))}
        </h6>
        
        </>
    )
}