import Box from "../Box/Box";
import Icon, { IconCatalog } from "../Icon/Icon";

import styles from '@/styles/ServiciosAutomotriz.module.css'


export default function SectionAcercaDe({ nombre, texto }) {
  return (
    <>
      <h2 style={{ fontSize: '18px', marginLeft: '36px', alignSelf: 'flex-start', marginTop: '32px', fontWeight: '600', display: 'flex', gap: '16px' }} className={styles.titleNegocio}><Icon name={IconCatalog.peopleOutline} size='lg' /> Acerca del negocio </h2>
      <Box style={{alingItems:'left'}}>

        <p style={{ fontSize: '14px', fontWeight: '400', }}>Vemos todas las marcas, pero soy especialista en cajas automáticas de Optra y Chevrolet Vivant ZF-4HP16. Además, soy super especialista en:</p>

        <ul style={{ fontSize: '14px', fontWeight: '400', marginLeft:'24px' }}>
          <li>Optra 🚗</li>
          <li>4 Runner Gasolina ⛽</li>
          <li>FJ Gasolina ⛽</li>
          <li>Fortunner Gasolina ⛽</li>
          <li>Ford Escape 🚙</li>
          <li>Ford Fusion 🚗</li>
          <li>Entre otras marcas, soy mecánico en general.</li>

        </ul>

        <p style={{ fontSize: '14px', fontWeight: '400', }}> Soy un profesional calificado, honesto y trabajo con Auto Data para obtener información técnica de miles de marcas. Esto me permite ejecutar los trabajos de manera profesional. 🛠️</p>
      </Box>
    </>
  )
}