import CreatableSelect from "react-select/creatable";
import Button, { ButtonVariant } from "../Button/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/V3.module.css";
import Icon, { IconCatalog } from "../Icon/Icon";
import InputHomeV3 from "./InputHomeV3";


let cardsBussiness = [
  [{ nombre: 'Lucho Garagoa', img: 'https://azurequarks.blob.core.windows.net/negocios/luchogaragoa230424.jpg', direccion: 'Cra. 26 #75a-20 Bogotá. Colombia', db: 'Cda' },
  { nombre: 'World on Wheels', img: 'https://azurequarks.blob.core.windows.net/negocios/worldonwheels240424.jpg', direccion: 'Cl. 153 #7h - 92 Bogotá. Colombia', db: 'Chevrolet' },
  { nombre: 'Serviteca Gaitán', img: 'https://azurequarks.blob.core.windows.net/negocios/servitecagaitan230424.jpg', direccion: 'Cl. 69b #70C-04 Bogotá. Colombia', db: 'Mazda' },
  ],
  [{ nombre: 'S&I Master Paint', img: 'https://azurequarks.blob.core.windows.net/negocios/Taller-S&I-Master-Paint160124.jpg', direccion: 'Carrera 76 bis #67-23 Bogotá. Colombia', db: 'Honda' },
  { nombre: 'EVOLVE • PERFORMANCE', img: 'https://azurequarks.blob.core.windows.net/negocios/evolveperformance220424.jpg', direccion: 'Cll 116 N 70F-16 Bogotá. Colombia', db: 'Nissan' },
  { nombre: 'Fapipe Store', img: 'https://azurequarks.blob.core.windows.net/negocios/papipestore080324.webp', direccion: 'Cl. 63c #28-22 Bogotá. Colombia', db: 'Nissan' },
  ],
  [{ nombre: 'Lucho Garagoa', img: 'https://azurequarks.blob.core.windows.net/negocios/luchogaragoa230424.jpg', direccion: 'Cra. 26 #75a-20 Bogotá. Colombia', db: 'Cda' },
  { nombre: 'World on Wheels', img: 'https://azurequarks.blob.core.windows.net/negocios/worldonwheels240424.jpg', direccion: 'Cl. 153 #7h - 92 Bogotá. Colombia', db: 'Chevrolet' },
  { nombre: 'Serviteca Gaitán', img: 'https://azurequarks.blob.core.windows.net/negocios/servitecagaitan230424.jpg', direccion: 'Cl. 69b #70C-04 Bogotá. Colombia', db: 'Mazda' },
  ],
  [{ nombre: 'S&I Master Paint', img: 'https://azurequarks.blob.core.windows.net/negocios/Taller-S&I-Master-Paint160124.jpg', direccion: 'Carrera 76 bis #67-23 Bogotá. Colombia', db: 'Honda' },
  { nombre: 'EVOLVE • PERFORMANCE', img: 'https://azurequarks.blob.core.windows.net/negocios/evolveperformance220424.jpg', direccion: 'Cll 116 N 70F-16 Bogotá. Colombia', db: 'Nissan' },
  { nombre: 'Fapipe Store', img: 'https://azurequarks.blob.core.windows.net/negocios/papipestore080324.webp', direccion: 'Cl. 63c #28-22 Bogotá. Colombia', db: 'Nissan' },
  ],
  [{ nombre: 'Lucho Garagoa', img: 'https://azurequarks.blob.core.windows.net/negocios/luchogaragoa230424.jpg', direccion: 'Cra. 26 #75a-20 Bogotá. Colombia', db: 'Cda' },
  { nombre: 'World on Wheels', img: 'https://azurequarks.blob.core.windows.net/negocios/worldonwheels240424.jpg', direccion: 'Cl. 153 #7h - 92 Bogotá. Colombia', db: 'Chevrolet' },
  { nombre: 'Serviteca Gaitán', img: 'https://azurequarks.blob.core.windows.net/negocios/servitecagaitan230424.jpg', direccion: 'Cl. 69b #70C-04 Bogotá. Colombia', db: 'Mazda' },
  ],
]
export default function BuscadorBasico() {
  const [service, setService] = useState({ new: false, value: '' })
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/servicios/${service.value.replaceAll(' ', '-')}`)
    // router.push(`/servicios/${service}`)

  }
  const handleChange = (e) => {
    console.log('hola');
    if (e?.index) {
      setService({ new: false, value: e?.index.toLowerCase() })
      // router.push(`/servicios/${e.index}`)
    } else {
      setService({ new: true, value: e?.value.toLowerCase() })
      // router.push(`/catalogo-pastas-freno?busqueda=${e.value}`)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.formV3} >
        <div  style={{ flexGrow: 1, }} >

         <InputHomeV3 handleChange={handleChange} />
        </div>

        <Button className={'desktopButton'}  style={{ margin: '0' }} >Buscar</Button>
        <Button className={'mobileButton'} style={{ margin: '0', padding:'12px' }}  icon={IconCatalog.searchOutline} iconColor="white"/>

      </form>
      {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', width: '90%', maxWidth: '800px', margin: '0 auto', marginTop: '32px', justifyContent: 'space-between', alignItems: 'center' }}>
        {cardsBussiness[currentPlaceholderIndex]?.map((bussiness, index) => (
          <div className={`${styles.cardBussiness}`}>
            <img src={bussiness.img} alt={bussiness.nombre} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
            <div>
              <p style={{ fontSize: '16px', fontWeight: '500' }}>{bussiness.nombre}</p>
              <p style={{ fontSize: '12px', color: '#929292' }}>{bussiness.direccion}</p>
            </div>
          </div>
        ))}
      </div> */}

    </>
  )
}