import Button, { ButtonVariant } from "../Button/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/V3.module.css";
import Icon, { IconCatalog } from "../Icon/Icon";
import InputHomeV3 from "../MenuSelects/InputHomeV3";


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
export default function BuscadorBasico({ size = 'large' }) {
  const [service, setService] = useState({ new: false, value: '' })
  const router = useRouter()
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!service.value){
      return alert('Completa el campo de búsqueda')
    }
    if (service.new) {
      router.push(`/servicios/${service.value.replaceAll(' ', '-')}`)
    } else {
      router.push(`/explore/talleres/carro/${service.value.replaceAll(' ', '-')}/bogota`)
    }
    // router.push(`/servicios/${service.value.replaceAll(' ', '-')}`)
    // router.push(`/explore/talleres/carro/${service.value.replaceAll(' ', '-')}/bogota`)
    // router.push(`/servicios/${service}`)
  }
  
  const handleChange = (e) => {
    if (e?.index) {
      setInputValue(e?.value.toLowerCase())
      setService({ new: false, value: e?.index.toLowerCase() })

      // router.push(`/servicios/${e.index}`)
    } else {
      setInputValue(e?.value.toLowerCase())
      setService({ new: true, value: e?.value.toLowerCase() })
      // router.push(`/catalogo-pastas-freno?busqueda=${e.value}`)
    }
  }
  const onInputChange = (inputValue, event) => {
    if (event.action === 'input-change') {
      setService({ new: true, value: inputValue.toLowerCase() })
      setInputValue(inputValue.toLowerCase())
    }
  }

  return (
    <search style={{ width:'100%'}}>
      <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 0 }} className={size === 'large' ? styles.formV3 : styles.formV3Small}>
    <div style={{ width: '81%', margin: 0, padding: 0, flex: 1 }}>
      <InputHomeV3 handleChange={handleChange} inputValue={service.new ? service.value : inputValue} onInputChange={onInputChange} />
    </div>
    <Button className={'desktopButton'} style={{ margin: '0',backgroundColor: '#407BFF' }}>Buscar</Button>
    <Button className={'mobileButton'} style={{ margin: '0', padding: '12px', backgroundColor: '#407BFF' }} icon={IconCatalog.searchOutline} iconColor="white" />
  </form>
    </search>
  )
}