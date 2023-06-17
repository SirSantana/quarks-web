import useAuth from '@/hooks/useAuth'
import CardConversaciones from '@/src/Components/Dashboard/CardConversaciones'
import IndexDashboardCar from '@/src/Components/Dashboard/IndexDashboardCar'
import styles from '@/styles/Dashboard.module.css'
import { ModalChooseCar, ModalCreateGasto,  } from '@/utils/Modales'
import { useState } from 'react'
import LayoutDashboard from '../../src/Components/Dashboard/layoutDashboard'


export default function Dashboard() {
  const { user } = useAuth();
  const [visibleModalCar, setVisibleModalCar] = useState(false)
  const [visibleCreateGasto, setVisibleCreateGasto] = useState(false)

  const [getCars, setGetCars] = useState(null)
  const [car, setCar] = useState(null)
  
  return (
    <LayoutDashboard title={'Dashboard | Quarks'}>
      <section className={styles.container}>
        {user &&
          <>
            <div className={styles.dashboardHeader}>
              <h1 className={styles.titleDashboard}>Dashboard</h1>
              <div className={styles.divHeaderButtons}>
                <div onClick={()=> setVisibleModalCar(true)}  style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #5B0221', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', cursor: 'pointer', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                    <img className={styles.logo}src={`./${car?.marca}.png`} />
                    <h6 className={styles.subtitleMarca}>{car?.referencia}</h6>
                  </div>
                  <img src={'/arrowDown.svg'} style={{ width: '16px', }} />
                </div>
                <div onClick={()=> setVisibleCreateGasto(true)} style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: '#f50057', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', cursor: 'pointer', gap: '16px' }}>
                  <ion-icon style={{ color: 'white', fontSize: '24px' }} name="add-sharp"></ion-icon>
                  <h6 style={{ color: 'white' }} className={styles.subtitleButton}>Agregar gasto</h6>
                </div>
              </div>
            </div>

            <div className={styles.gridComponents}>
              <IndexDashboardCar car={car} setCar={setCar} setGetCars={setGetCars}/>
              <CardConversaciones />
            </div>
            {visibleModalCar &&
              <ModalChooseCar setVisibleModalCar={setVisibleModalCar} data={getCars} setCar={setCar} />
            }
            {visibleCreateGasto &&
              <ModalCreateGasto setVisibleCreateGasto={setVisibleCreateGasto} />
            }
          </>
        }
      </section>
    </LayoutDashboard>

  )
}