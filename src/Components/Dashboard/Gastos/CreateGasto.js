import styles from '@/styles/Gastos.module.css'
import { ModalChooseTipoGasto } from '@/utils/Modales'
import { useState } from 'react'

const tipoGasto = {
  Lavada: <svg xmlns="http://www.w3.org/2000/svg" style={{marginRight:'8px'}} width={24} fill={'#f50057'} viewBox="0 0 24 24"><title>car-wash</title><path d="M5,13L6.5,8.5H17.5L19,13M17.5,18A1.5,1.5 0 0,1 16,16.5A1.5,1.5 0 0,1 17.5,15A1.5,1.5 0 0,1 19,16.5A1.5,1.5 0 0,1 17.5,18M6.5,18A1.5,1.5 0 0,1 5,16.5A1.5,1.5 0 0,1 6.5,15A1.5,1.5 0 0,1 8,16.5A1.5,1.5 0 0,1 6.5,18M18.92,8C18.72,7.42 18.16,7 17.5,7H6.5C5.84,7 5.28,7.42 5.08,8L3,14V22A1,1 0 0,0 4,23H5A1,1 0 0,0 6,22V21H18V22A1,1 0 0,0 19,23H20A1,1 0 0,0 21,22V14M7,5A1.5,1.5 0 0,0 8.5,3.5C8.5,2.5 7,0.8 7,0.8C7,0.8 5.5,2.5 5.5,3.5A1.5,1.5 0 0,0 7,5M12,5A1.5,1.5 0 0,0 13.5,3.5C13.5,2.5 12,0.8 12,0.8C12,0.8 10.5,2.5 10.5,3.5A1.5,1.5 0 0,0 12,5M17,5A1.5,1.5 0 0,0 18.5,3.5C18.5,2.5 17,0.8 17,0.8C17,0.8 15.5,2.5 15.5,3.5A1.5,1.5 0 0,0 17,5Z" /></svg>,
  Tanqueada: <svg width={24} fill={'#f50057'} style={{marginRight:'8px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>gas-station</title><path d="M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M12,10H6V5H12M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14C17,12.89 16.1,12 15,12H14V5C14,3.89 13.1,3 12,3H6C4.89,3 4,3.89 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23Z" /></svg>,
  Parqueadero: <svg width={24} fill={'#f50057'} style={{marginRight:'8px'}}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>car-brake-parking</title><path d="M12,3C7,3 3,7 3,12C3,17 7,21 12,21C17,21 21,17 21,12C21,7 17,3 12,3M12,19C8.1,19 5,15.9 5,12C5,8.1 8.1,5 12,5C15.9,5 19,8.1 19,12C19,15.9 15.9,19 12,19M20.5,20.5C22.7,18.3 24,15.3 24,12C24,8.7 22.7,5.7 20.5,3.5L19.4,4.6C21.3,6.5 22.5,9.1 22.5,12C22.5,14.9 21.3,17.5 19.4,19.4L20.5,20.5M4.6,19.4C2.7,17.5 1.5,14.9 1.5,12C1.5,9.1 2.7,6.5 4.6,4.6L3.5,3.5C1.3,5.7 0,8.7 0,12C0,15.3 1.3,18.3 3.5,20.5L4.6,19.4M9.5,7V17H11.5V13H13.5A2,2 0 0,0 15.5,11V9A2,2 0 0,0 13.5,7H9.5M11.5,9H13.5V11H11.5V9Z" /></svg>,
  Repuestos: <svg width={24} fill={'#f50057'} style={{marginRight:'8px'}}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>car-wrench</title><path d="M20.96 16.45C20.97 16.3 21 16.15 21 16V16.5L20.96 16.45M11 16C11 16.71 11.15 17.39 11.42 18H6V19C6 19.55 5.55 20 5 20H4C3.45 20 3 19.55 3 19V11L5.08 5C5.28 4.42 5.84 4 6.5 4H17.5C18.16 4 18.72 4.42 18.92 5L21 11V16C21 13.24 18.76 11 16 11S11 13.24 11 16M8 13.5C8 12.67 7.33 12 6.5 12S5 12.67 5 13.5 5.67 15 6.5 15 8 14.33 8 13.5M19 10L17.5 5.5H6.5L5 10H19M22.87 21.19L18.76 17.08C19.17 16.04 18.94 14.82 18.08 13.97C17.18 13.06 15.83 12.88 14.74 13.38L16.68 15.32L15.33 16.68L13.34 14.73C12.8 15.82 13.05 17.17 13.93 18.08C14.79 18.94 16 19.16 17.05 18.76L21.16 22.86C21.34 23.05 21.61 23.05 21.79 22.86L22.83 21.83C23.05 21.65 23.05 21.33 22.87 21.19Z" /></svg>,
  Mantenimiento:<svg width={24} fill={'#f50057'} style={{marginRight:'8px'}}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>car-cog</title><path d="M6.5 5C5.84 5 5.28 5.42 5.08 6L3 12V20A1 1 0 0 0 4 21H5A1 1 0 0 0 6 20V19H11.3A7 7 0 0 1 11 17A7 7 0 0 1 14.41 11H5L6.5 6.5H17.5L18.68 10.03A7 7 0 0 1 20.47 10.46L18.92 6C18.72 5.42 18.16 5 17.5 5H6.5M17 12C16.87 12 16.76 12.09 16.74 12.21L16.55 13.53C16.25 13.66 15.96 13.82 15.7 14L14.46 13.5C14.35 13.5 14.22 13.5 14.15 13.63L13.15 15.36C13.09 15.47 13.11 15.6 13.21 15.68L14.27 16.5C14.25 16.67 14.24 16.83 14.24 17C14.24 17.17 14.25 17.33 14.27 17.5L13.21 18.32C13.12 18.4 13.09 18.53 13.15 18.64L14.15 20.37C14.21 20.5 14.34 20.5 14.46 20.5L15.7 20C15.96 20.18 16.24 20.35 16.55 20.47L16.74 21.79C16.76 21.91 16.86 22 17 22H19C19.11 22 19.22 21.91 19.24 21.79L19.43 20.47C19.73 20.34 20 20.18 20.27 20L21.5 20.5C21.63 20.5 21.76 20.5 21.83 20.37L22.83 18.64C22.89 18.53 22.86 18.4 22.77 18.32L21.7 17.5C21.72 17.33 21.74 17.17 21.74 17C21.74 16.83 21.73 16.67 21.7 16.5L22.76 15.68C22.85 15.6 22.88 15.47 22.82 15.36L21.82 13.63C21.76 13.5 21.63 13.5 21.5 13.5L20.27 14C20 13.82 19.73 13.65 19.42 13.53L19.23 12.21C19.22 12.09 19.11 12 19 12H17M6.5 13A1.5 1.5 0 0 1 8 14.5A1.5 1.5 0 0 1 6.5 16A1.5 1.5 0 0 1 5 14.5A1.5 1.5 0 0 1 6.5 13M18 15.5C18.83 15.5 19.5 16.17 19.5 17C19.5 17.83 18.83 18.5 18 18.5C17.16 18.5 16.5 17.83 16.5 17C16.5 16.17 17.17 15.5 18 15.5Z" /></svg>,
  Peajes: <svg width={24} fill={'#f50057'} style={{marginRight:'8px'}}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>highway</title><path d="M10,2L8,8H11V2H10M13,2V8H16L14,2H13M2,9V10H4V11H6V10H18L18.06,11H20V10H22V9H2M7,11L3.34,22H11V11H7M13,11V22H20.66L17,11H13Z" /></svg>,
  Multa:<svg width={24} fill={'#f50057'} style={{marginRight:'8px'}}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>police-badge</title><path d="M22 4L20 2C18.85 2.64 17.4 3 16 3C14.6 3 13.14 2.63 12 2C10.86 2.63 9.4 3 8 3C6.6 3 5.15 2.64 4 2L2 4C2 4 4 6 4 8S2 14 2 16C2 20 12 22 12 22S22 20 22 16C22 14 20 10 20 8S22 4 22 4M15.05 16.45L11.97 14.59L8.9 16.45L9.72 12.95L7 10.61L10.58 10.3L11.97 7L13.37 10.29L16.95 10.6L14.23 12.94L15.05 16.45Z" /></svg>,
  Otros:<svg width={24} fill={'#f50057'} style={{marginRight:'8px'}}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>

}



export default function CreateGasto() {
  const [visibleModalGasto, setVisibleModalGasto] = useState(false)
  const [selectTipoGasto, setSelectTipoGasto] = useState('Tanqueada')
  return (
    <div style={{ gap: '16px' }} className={styles.modalContent}>
      <div>
        <h2 className={styles.subtitle3}>Añade tu gasto</h2>
        <p className={styles.parrafo}>Completa los datos</p>
      </div>


      <form style={{ display: 'flex', flexDirection: 'column', gap: '8px',marginTop:'16px' }}>
        <label onClick={()=> setVisibleModalGasto(true)}  className={styles.inputContainer}>
          {tipoGasto[selectTipoGasto]}
          <input type="text" className={styles.inputField} value={selectTipoGasto} placeholder={'Tipo gasto'}/>
          <ion-icon name="caret-down-outline"></ion-icon>
        </label>

        <label className={styles.inputContainer}>
          <ion-icon style={{color:'#f50057',  fontSize: '20px', marginRight: '8px' }} name="calendar-number-outline"></ion-icon>
          <input type="date" className={styles.inputField} placeholder={'Fecha'}/>
        </label>

        <label className={styles.inputContainer}>
        <ion-icon style={{color:'#f50057',  fontSize: '20px', marginRight: '8px' }} name="cash-outline"></ion-icon>
          <input type="number" className={styles.inputField} placeholder={'Dinero gastado'}/>
        </label>

      </form>
      {visibleModalGasto &&
      <ModalChooseTipoGasto setVisibleModalGasto={setVisibleModalGasto} setSelectTipoGasto={setSelectTipoGasto} selectTipoGasto={selectTipoGasto} createGasto={true}/>}

    </div>
  )
}