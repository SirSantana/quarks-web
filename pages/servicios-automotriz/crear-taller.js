import { CREATE_TALLER } from "@/graphql/mutations";
import Layout from "@/src/Components/Layout";
import { options } from "@/src/Components/Main/Main";
import ModalCreateTaller from "@/src/Components/Main/ModalCreateTaller";
import styles from '@/styles/ServiciosAutomotriz.module.css'
import { useMutation } from "@apollo/client";
import { useState } from "react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
const initialForm = {
  direccion: '',
  nombre: '',
  localidad: '',
  categorias: [],
  horario: 'Lun 08:00 AM - 6:00 PM,Mar 08:00 AM - 6:00 PM,Mié 08:00 AM - 6:00 PM,Jue 08:00 AM - 6:00 PM,Vie 08:00 AM - 6:00 PM,Sáb 08:00 AM - 3:00 PM,Dom Cerrado',
  telefono: '',
  whatsapp: ''
}
export const optionsLocalidades = [
  { value: 'Bogota, Colombia', label: 'Bogota, Colombia', index: 0 },
  { value: 'Barrios Unidos. Bogota, Colombia', label: 'Barrios Unidos', index: 1 },
  { value: 'Bosa. Bogota, Colombia', label: 'Bosa', index: 2 },
  { value: 'CiudadBolivar. Bogota, Colombia', label: 'CiudadBolivar', index: 3 },
  { value: 'Engativa. Bogota, Colombia', label: 'Engativa', index: 4 },
  { value: 'Fontibon. Bogota, Colombia', label: 'Fontibon', index: 5 },
  { value: 'Kennedy. Bogota, Colombia', label: 'Kennedy', index: 6 },
  { value: 'Martires. Bogota, Colombia', label: 'Martires', index: 7 },
  { value: 'PuenteAranda. Bogota, Colombia', label: 'PuenteAranda', index: 8 },
  { value: 'Suba. Bogota, Colombia', label: 'Suba', index: 9 },
  { value: 'Teusaquillo. Bogota, Colombia', label: 'Teusaquillo', index: 10 },
  { value: 'Tunjuelito. Bogota, Colombia', label: 'Tunjuelito', index: 11 },
  { value: 'Usaquen. Bogota, Colombia', label: 'Usaquen', index: 12 },
  { value: 'Usme. Bogota, Colombia', label: 'Usme', index: 13 },
  { value: 'Santafe. Bogota, Colombia', label: 'Santafe', index: 14 },
]

const animatedComponents = makeAnimated();
const customStyles = {
  control: (provided) => ({
    ...provided,
    padding: '8px',
    fontSize: '14px',
    borderRadius: '8px'
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#f50057' : 'white', // Cambiar el color de fondo de la opción seleccionada
    color: state.isSelected ? 'white' : 'black', // Cambiar el color de texto de la opción seleccionada
    ':hover': {
      backgroundColor: '#ffefef', // Cambiar el color de fondo cuando se realiza un hover
      color: 'black', // Cambiar el color de texto cuando se realiza un hover
    },
    zIndex: '999',
  }),
};
export default function CrearTaller() {
  const [form, setForm] = useState(initialForm)
  const [page, setPage] = useState(1)
  const defaultOpeningTime = '08:00'; // Hora de apertura por defecto
  const defaultClosingTime = '18:00';
  const [weekHours, setWeekHours] = useState([
    { day: 'Lun', isOpen: true, openingTime: defaultOpeningTime, closingTime: defaultClosingTime },
    { day: 'Mar', isOpen: true, openingTime: defaultOpeningTime, closingTime: defaultClosingTime },
    { day: 'Mié', isOpen: true, openingTime: defaultOpeningTime, closingTime: defaultClosingTime },
    { day: 'Jue', isOpen: true, openingTime: defaultOpeningTime, closingTime: defaultClosingTime },
    { day: 'Vie', isOpen: true, openingTime: defaultOpeningTime, closingTime: defaultClosingTime },
    { day: 'Sáb', isOpen: true, openingTime: defaultOpeningTime, closingTime: '15:00' },
    { day: 'Dom', isOpen: false, openingTime: '', closingTime: '' },
  ]);
  const [createTaller, { loading, data, error }] = useMutation(CREATE_TALLER)

  const handleOpenCheckboxChange = (index) => (event) => {
    const updatedWeekHours = [...weekHours];
    updatedWeekHours[index].isOpen = event.target.checked;
    setWeekHours(updatedWeekHours);
  };

  const handleOpeningTimeChange = (index) => (event) => {
    const updatedWeekHours = [...weekHours];
    updatedWeekHours[index].openingTime = event.target.value;
    setWeekHours(updatedWeekHours);
  };

  const handleClosingTimeChange = (index) => (event) => {
    const updatedWeekHours = [...weekHours];
    updatedWeekHours[index].closingTime = event.target.value;
    setWeekHours(updatedWeekHours);
  };
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    let formattedTime = '';

    if (Number(hours) > 12) {
      formattedTime += `${Number(hours) - 12}:${minutes} PM`;
    } else if (Number(hours) === 12) {
      formattedTime += `12:${minutes} PM`;
    } else {
      formattedTime += `${hours}:${minutes} AM`;
    }
    return formattedTime;
  };
  const formatHoursString = () => {
    return weekHours
      .map((day) => {
        if (day.isOpen) {
          const formattedOpeningTime = formatTime(day.openingTime);
          const formattedClosingTime = formatTime(day.closingTime);
          return `${day.day} ${formattedOpeningTime} - ${formattedClosingTime}`;
        } else {
          return `${day.day} Cerrado`;
        }
      })
      .join(',');
  };
  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    const uniqueValues = [...new Set([...form.categorias, ...selectedValues])];
    const horarioFormateado = formatHoursString()
    setForm({ ...form, categorias: uniqueValues, horario: horarioFormateado });

  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    createTaller({ variables: form })
    setPage(page + 1)
  }
  const handlePageSubmit = (e) => {
    e.preventDefault()
    if (form.localidad.length > 0 && form.nombre.length > 0 && form.direccion.length > 0) {
      setPage(page + 1)
    } else {
      return alert('Debes completar todos los campos, nombre, direccion y localidad')
    }
  }
  const handlePageSubmit2 = (e) => {
    e.preventDefault()
    if (form.whatsapp.length > 0 && form?.telefono.length > 0) {
      setPage(page + 1)
    } else {
      return alert('Debes completar todos los datos, whatsapp y telefono')
    }
  }
  return (
    <Layout title={'Ingresa tu taller al directorio de talleres de Bogota gratis!'} image={"https://azurequarks.blob.core.windows.net/negocios/bannertalleresquarks.png"} >
      <div className={styles.containerVendedor}>
        <img src="https://azurequarks.blob.core.windows.net/negocios/bannertalleresquarks.png" className={styles.imgRegisterTaller} />
        <div className={styles.containerFormTaller}>
          <h1 style={{ fontSize: '28px', lineHeight: '26px', marginBottom: '8px', width: '100%' }} className={styles.titleHeader}>Crea tu anuncio Gratis!</h1>
          <h3 style={{ fontWeight: '400', marginTop: '0px' }} className={styles.titleSections}>Completa los siguientes datos de tu taller y consigue
            nuevos clientes para tu taller!</h3>

          <div style={{ backgroundColor: '#F5F5F5', marginTop: '32px', borderRadius: '8px', flexDirection: 'row', display: 'flex', justifyContent: 'space-between', padding: '16px 32px 0px 32px' }}>
            <div style={{ cursor: 'pointer' }} onClick={() => page > 1 && setPage(1)} >
              <h4 style={{ marginBottom: '16px', fontWeight: page === 1 ? '700' : '400' }}> Datos</h4>
              {page === 1 && <div style={{ backgroundColor: '#373737', height: '2px', width: '100%' }} />}
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => page > 1 && setPage(2)}>
              <h4 style={{ marginBottom: '16px', fontWeight: page === 2 ? '700' : '400' }}>Contacto</h4>
              {page === 2 && <div style={{ backgroundColor: '#373737', height: '2px', width: '100%' }} />}

            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => page > 2 && setPage(3)}>
              <h4 style={{ marginBottom: '16px', fontWeight: page === 3 ? '700' : '400' }}>Servicios</h4>
              {page === 3 && <div style={{ backgroundColor: '#373737', height: '2px', width: '100%' }} />}

            </div>
          </div>

          <form style={{ width: '100%', boxSizing: 'border-box', marginTop: '32px' }}>
            {page === 1 &&
              <>
                <input id='nombre' name='nombre' required placeholder="Nombre del taller" className={styles.input} type={'text'} onChange={handleChange} value={form?.nombre} />
                <input id='direccion' name='direccion' required placeholder="Direccion del taller" className={styles.input} type={'text'} onChange={handleChange} value={form?.direccion} />
                <Select onChange={(e) => setForm({ ...form, localidad: e.value })} options={optionsLocalidades} styles={customStyles} placeholder={form.localidad ? form.localidad : 'Selecciona la localidad'} value={form?.localidad} />
                <input id='ciudad' name='ciudad' disabled placeholder="Bogota (Por el momento solo esta disponible Bogotá)" className={styles.input} type={'text'} />
                <input onClick={handlePageSubmit} type='submit' style={{ width: '160px', display: 'flex', margin: '0 auto', marginTop: '16px', alignItems: 'center', justifyContent: 'center' }} className={styles.buttonPrimary} value={'Siguiente'} />
              </>}
            {page === 2 &&
              <>
                <input id='telefono' name='telefono' onChange={handleChange} placeholder="Numero de telefono" className={styles.input} type={'text'} />
                <input id='whatsapp' name='whatsapp' onChange={handleChange} placeholder="Numero de WhatsApp" className={styles.input} type={'text'} />
                {/* <input id='email' name='email' placeholder="Correo" className={styles.input} type={'email'} /> */}
                <div style={{ marginTop: '16px' }}>
                  <h6 style={{ fontSize: '14px', marginBottom: '16px' }}>Horario de atencion</h6>
                  {weekHours.map((day, index) => (
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginBottom: '16px' }} key={index}>
                      <label htmlFor={`open-checkbox-${index}`}>{day.day}:</label>
                      <input
                        type="checkbox"
                        id={`open-checkbox-${index}`}
                        checked={day.isOpen}
                        onChange={handleOpenCheckboxChange(index)}
                      />

                      {day.isOpen && (
                        <>
                          <label htmlFor={`opening-time-${index}`}>Aper:</label>
                          <input
                            type="time"
                            id={`opening-time-${index}`}
                            value={day.openingTime}
                            onChange={handleOpeningTimeChange(index)}
                          />

                          <label htmlFor={`closing-time-${index}`}>Cie:</label>
                          <input
                            type="time"
                            id={`closing-time-${index}`}
                            value={day.closingTime}
                            onChange={handleClosingTimeChange(index)}
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
                {/* <p>Horarios seleccionados: {formatHoursString()}</p> */}
                <input onClick={handlePageSubmit2} type='submit' style={{ width: '160px', display: 'flex', margin: '0 auto', marginTop: '16px', alignItems: 'center', justifyContent: 'center' }} className={styles.buttonPrimary} value={'Siguiente'} />

              </>
            }
            {page === 3 &&
              <>
                <h6 style={{ fontSize: '14px', marginBottom: '16px' }}>Selecciona los servicios que ofrece tu taller</h6>
                <Select
                  onChange={handleSelectChange}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={[options[0]]}
                  isMulti
                  options={options}
                // value={form?.categorias.length > 0 ? form?.categorias : options[0]}
                />

                <input disabled={form?.categorias.length < 1 ? true : false} onClick={handleSubmit} type='submit' style={{ backgroundColor: form?.categorias.length < 1 ? '#d9d9d9' : '#f50057', width: '160px', display: 'flex', margin: '0 auto', marginTop: '48px', alignItems: 'center', justifyContent: 'center' }} className={styles.buttonPrimary} value={'Crear anuncio!'} />

              </>
            }

          </form>
          {page === 4 &&
            <ModalCreateTaller data={data} loading={loading} error={error} />
          }
        </div>
      </div>
    </Layout>

  )
}