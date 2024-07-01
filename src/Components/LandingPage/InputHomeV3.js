import CreatableSelect from "react-select/creatable";
import Button, { ButtonVariant } from "../Button/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/V3.module.css";
import Icon, { IconCatalog } from "../Icon/Icon";

export const categorias2 = [
  { nombre: 'Centro Diagnostico Automotriz (CDA)', img: 'taller-ilustration', url: 'cda', db: 'Cda' },
  { nombre: 'Talleres Chevrolet', img: 'Chevrolet', url: 'chevrolet', db: 'Chevrolet' },
  { nombre: 'Talleres Mazda', img: 'Mazda', url: 'mazda', db: 'Mazda' },
  { nombre: 'Talleres Renault', img: 'Renault', url: 'renault', db: 'Renault' },
  { nombre: 'Talleres Ford', img: 'Ford', url: 'ford', db: 'Ford' },
  { nombre: 'Talleres Honda', img: 'Honda', url: 'honda', db: 'Honda' },
  { nombre: 'Talleres Nissan', img: 'Nissan', url: 'nissan', db: 'Nissan' },
  { nombre: 'Talleres Toyota', img: 'Toyota', url: 'toyota', db: 'Toyota' },
  { nombre: 'Talleres Volkswagen', img: 'Volkswagen', url: 'volkswagen', db: 'Volkswagen' },
  { nombre: 'Talleres Suzuki', img: 'Suzuki', url: 'suzuki', db: 'Suzuki' },
  { nombre: 'Talleres Volvo', img: 'Volvo', url: 'volvo', db: 'Volvo' },
  { nombre: 'Talleres Peugeot', img: 'Peugeot', url: 'peugeot', db: 'Peugeot' },
  { nombre: 'Talleres Kia', img: 'Kia', url: 'kia', db: 'Kia' },
  { nombre: 'Talleres Mitsubishi', img: 'Mitsubishi', url: 'mitsubishi', db: 'Mitsubishi' },
  { nombre: 'Talleres Audi', img: 'Audi', url: 'audi', db: 'Audi' },
  { nombre: 'Talleres BMW', img: 'BMW', url: 'bmw', db: 'BMW' },
  { nombre: 'Accesorios y Lujos', img: 'servicio-lujos', url: 'lujos', db: 'Servicio de Accesorios y Lujos' },
  { nombre: 'Aire acondicionado', img: 'servicio-aire', url: 'Aire acondicionado', db: 'Servicio de Aire acondicionado' },
  { nombre: 'Alineación y balanceo', img: 'servicio-llantas', url: 'Alineación y balanceo', db: 'Alineación y balanceo' },
  { nombre: 'Baterias', img: 'servicio-bateria', url: 'bateria', db: 'Servicio de Baterias' },
  { nombre: 'Caja y transmisión', img: 'servicio-cajas', url: 'Cajas', db: 'Servicio de Cajas' },
  { nombre: 'Cambio de aceite', img: 'servicio-cambio-aceite', url: 'Cambio de aceite', db: 'Cambio de Aceite' },
  { nombre: 'Clutch', img: 'servicio-clutch', url: 'Clutch', db: 'Servicio de Clutch' },
  { nombre: 'Correas', img: 'servicio-motor', url: 'Motor', db: 'Servicio de Correas' },
  { nombre: 'Direccion y suspension', img: 'servicio-suspension', url: 'Suspensión', db: 'Servicio de Suspensión' },
  { nombre: 'Eléctricos', img: 'servicio-electrico', url: 'Eléctricos', db: 'Servicio de Eléctricos' },
  { nombre: 'Electronica', img: 'servicio-electronico', url: 'Electronica', db: 'Servicio de Electronica' },
  { nombre: 'Frenos', img: 'servicio-frenos', url: 'Frenos', db: 'Servicio de Frenos' },
  { nombre: 'Inyeccion', img: 'servicio-inyeccion', url: 'Inyeccion', db: 'Servicio Inyeccion' },
  { nombre: 'Latonería y pintura', img: 'servicio-carroceria', url: 'Latoneria y pintura', db: 'Servicio de Latonería y pintura' },
  { nombre: 'Mecanico a domicilio', img: 'mecanico', url: 'Mecanico a Domicilio', db: 'Mecanico a Domicilio' },
  { nombre: 'Motor', img: 'servicio-motor', url: 'Motor', db: 'Servicio de Motor' },
  { nombre: 'Peritaje', img: 'peritaje', url: 'Peritaje', db: 'Peritaje' },
  { nombre: 'Sincronización', img: 'Sincronizacion', url: 'Sincronizacion', db: 'Sincronizacion' },
  { nombre: 'Técnico Mecánica', img: 'taller-ilustration', url: 'Tecnico mecanica', db: 'Técnico Mecánica' },
  { nombre: 'Taller Mecanico', img: 'taller-mecanico', url: '', db: 'Taller mecanico' },
  { nombre: 'Mecanica Basica', img: 'mecanica-basica', url: '', db: 'Mecanica Basica' },
  { nombre: 'Mecanica Avanzada', img: 'mecanica-avanzada', url: '', db: 'Mecanica Avanzada' },
];

export const customStyles = {
  control: (provided) => ({
    ...provided,
    border: 'none', // Quitar el borde
    boxShadow: 'none',
    // fontSize: '18px',
    fontWeight: '500',
    color: '#929292',
    width: '100%',
    flex: 1,
    backgroundColor: '#F9F9F9',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: 'none', // Ocultar el icono de flecha
  }),
  indicatorSeparator: () => ({
    display: 'none', // Ocultar la línea horizontal
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'white' : 'white', // Cambiar el color de fondo de la opción seleccionada
    color: state.isSelected ? 'white' : 'black', // Cambiar el color de texto de la opción seleccionada
    ':hover': {
      backgroundColor: '#f1f1f1', // Cambiar el color de fondo cuando se realiza un hover
      color: 'black', // Cambiar el color de texto cuando se realiza un hover
    },
    fontSize: '18px',
    color: '#5c5c5c',
    zIndex: '999'
  }),
};
const servicioWithOptions = categorias2.map((servicio) => {
  return ({
    value: servicio.nombre,
    label: (
      <div style={{ display: 'flex', cursor: 'pointer', flexDirection: 'row', alignItems: 'center', gap: '8px', padding: '4px 0', justifyContent: 'space-between', }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', }}>
          <img src={`/${servicio.img}.png`} alt={servicio.nombre} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
          <p style={{ fontSize: '18px', fontWeight: '500' }}>{servicio.nombre}</p>
        </div>
      </div>
    ),
    index: servicio.url,
  })
});
const placeholders = [
  '🚗 Busca talleres por marca o servicio',
  '🛠️ Encuentra el mejor taller cerca de ti',
  '🗜️ Busca por tipo de servicio o nombre',
  '👨‍🔧 Encuentra mecánicos especializados',
  '🔧 Busca y compara talleres'
];


export default function InputHomeV3({ handleChange }) {
  const router = useRouter()

  const formatCreateLabel = (inputValue) => `Buscar por "${inputValue}"`;
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const targetPlaceholder = placeholders[placeholderIndex];

    const typingInterval = setInterval(() => {
      if (currentIndex <= targetPlaceholder.length) {
        setCurrentPlaceholder(targetPlaceholder.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
        }, 1000); // Espera 1 segundo antes de cambiar al siguiente placeholder
      }
    }, 100); // Ajusta este valor para cambiar la velocidad de "escritura"

    return () => clearInterval(typingInterval);
  }, [placeholderIndex]);
  
  return (
    <CreatableSelect
      onChange={handleChange}
      options={servicioWithOptions}
      styles={customStyles}
      placeholder={currentPlaceholder}
      formatCreateLabel={formatCreateLabel}
      isSearchable
      isClearable
      className={styles.control}
    />
  )
}