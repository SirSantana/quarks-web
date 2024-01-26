import { EDIT_NEGOCIO_VDOS, INTERESADO_ALMACEN, INTERESADO_ANUNCIO } from '@/graphql/mutations'
import CreateGasto from '@/src/Components/Dashboard/Gastos/CreateGasto'
import styles from '@/styles/Main.module.css'
import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import sendMessage from './fetching'
import Link from 'next/link'
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, ViberShareButton, WhatsappIcon, WhatsappShareButton, } from 'react-share'
import AddHorario from '@/src/Components/Register/AddHorario'
import { categorias2 } from '@/src/Components/Talleres/ServiciosOfrecidos'
import { MagicMotion } from 'react-magic-motion'
import AddServicios from '@/src/Components/Register/AddServicios'
import WidgetComplete from '@/src/Components/Icon/WidgetComplete'
import { IconCatalog } from '@/src/Components/Icon/Icon'



export function ModalSuccessfull({ title, subtitle }) {
  return (
    <div className={styles.modal} >
      <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', flexDirection: 'column', justifyContent: 'left', gap: '16px', }} className={styles.modalContent}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',gap:'8px' }}>
          <ion-icon style={{ color: '#4EDD76', fontSize: '20px' }} name="checkmark-circle"></ion-icon>
          <p style={{ fontSize: '16px', fontWeight: '700', color: '#4EDD76', margin: 0 }}>{title}</p>
        </div>
        <p style={{ fontSize: '14px', color: '#373737', margin: 0, textAlign:'center' }}>{subtitle} </p>

      </div>
    </div>
  )
}


export function ModalLoading({ title }) {
  return (
    <div className={styles.modal} >
      <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'left', gap: '16px', padding: '8px 16px', borderRadius: '8px' }} className={styles.modalContent}>
        <ion-icon style={{ color: '#ffA500', fontSize: '24px' }} name="construct"></ion-icon>
        <p style={{ fontSize: '14px', fontWeight: '700', color: '#ffA500', margin: 0 }}>{title}</p>
      </div>
    </div>
  )
}

export function ModalError({ title, subtitle }) {
  return (
  
    <div className={styles.modal} >
    <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px', flexDirection: 'column', justifyContent: 'left', gap: '16px', }} className={styles.modalContent}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',gap:'8px' }}>
        <ion-icon style={{ color: '#f50057', fontSize: '20px' }} name="close-circle"></ion-icon>
        <p style={{ fontSize: '16px', fontWeight: '700', color: '#f50057', margin: 0 }}>{title}</p>
      </div>
      <p style={{ fontSize: '14px', color: '#373737', margin: 0, textAlign:'center' }}>{subtitle} </p>

    </div>
  </div>
  )
}

const initialForm = {
  name: '',
  celular: ''
}
export function ModalContactMe({ setVisibleModalContactMe, vendedor, urlPregunta }) {
  const [form, setForm] = useState(initialForm)
  const [visibleSuccesfull, setVisibleSuccesfull] = useState(false)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.celular) {
      return alert('Debes completar tus datos')
    }
    let frase = `🚗¡El cliente ${form.name} esta interesado en tu cotizacion! \n🧑 Contacta con él, al siguiente numero ${form.celular} \n✍️ Link de la cotizacion: \n` + urlPregunta
    sendMessage({ titulo: frase, number: `57${vendedor?.celular}` })
      .then(res =>
        setVisibleSuccesfull(true))
    setTimeout(() => {
      setVisibleSuccesfull(false)
      setVisibleModalContactMe(false)
    }, 2000)
  }

  return (
    <div className={styles.modal} >
      <div style={{ width: '300px', padding: '32px 16px', borderRadius: '8px' }} className={styles.modalContent}>
        <section style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
          <p style={{ fontSize: '18px', fontWeight: '700', color: '#5B0221', margin: 0 }}>Quiero que me contacten </p>
          <p style={{ fontSize: '14px', color: '#373737', margin: 0 }}>Para que el almacen {vendedor?.almacen} te contacte, debes llener los siguiente datos </p>

        </section>
        <form className={styles.form}>
          <input value={form.name} required onChange={handleChange} placeholder="Tú nombre" name='name' id='name' className={styles.inputContact} type={'text'} />
          <input value={form.celular} required onChange={handleChange} placeholder="Tú celular" name='celular' id='celular' className={styles.inputContact} type={'number'} />

        </form>
        <div style={{ width: '100%', display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '32px' }}>
          <button onClick={() => setVisibleModalContactMe(false)} style={{ width: '40%', fontSize: '14px', fontWeight: '400', borderRadius: '4px', height: '40px', color: '#f50057', backgroundColor: 'white', border: '1px solid #f50057' }} className={styles.button}>Cancelar</button>
          <button onClick={handleSubmit} style={{ width: '40%', fontSize: '14px', fontWeight: '400', borderRadius: '4px', height: '40px' }} className={styles.button}>Enviar datos</button>
        </div>
      </div>
      {visibleSuccesfull &&
        <ModalSuccessfull title={'Enviado correctamente'} subtitle={'El vendedor te contactara pronto'} />}
    </div>
  )
}

const initialFormAlmacen = {
  name: '',
  celular: '',
  almacen: '',
}
export function ModalContactAlmacen({ setVisibleModalContactAlmacen, almacen, tipo }) {
  const [form, setForm] = useState(initialFormAlmacen)
  const [visibleSuccesfull, setVisibleSuccesfull] = useState(false)
  const [interesadoAlmacen, { data, loading, error }] = useMutation(INTERESADO_ALMACEN)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.celular) {
      return alert('Debes completar tus datos')
    }

    // let frase = `🚗¡El cliente ${form.name} esta interesado en tu cotizacion! \n🧑 Contacta con él, al siguiente numero ${form.celular} \n✍️ Link de la cotizacion: \n` + urlPregunta
    //     sendMessage({ titulo: frase, number: `57${vendedor?.celular}` })
    //     .then(res=>  
    //       setVisibleSuccesfull(true))
    //       setTimeout(() => {
    //         setVisibleSuccesfull(false)
    //         setVisibleModalContactAlmacen(false)
    //       }, 2000)
  }

  return (
    <div className={styles.modal} >
      <div style={{ width: '300px', padding: '32px 16px', borderRadius: '8px' }} className={styles.modalContent}>
        <section style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
          <p style={{ fontSize: '18px', fontWeight: '700', color: '#5B0221', margin: 0 }}>
            {tipo === 'Telefono'
              ? 'Ver telefono'
              : 'Contactar por whatsapp'
            }
          </p>
          <p style={{ fontSize: '14px', color: '#373737', margin: 0 }}>Para contactarte por WhatsApp o ver el telefono de contacto llena los siguientes datos:</p>

        </section>
        <form className={styles.form}>
          <input value={form.name} required onChange={handleChange} placeholder="Tú nombre" name='name' id='name' className={styles.inputContact} type={'text'} />
          <input value={form.celular} required onChange={handleChange} placeholder="Tú celular" name='celular' id='celular' className={styles.inputContact} type={'number'} />

        </form>
        <div style={{ width: '100%', display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '32px' }}>
          <button onClick={() => setVisibleModalContactMe(false)} style={{ width: '40%', fontSize: '14px', fontWeight: '400', borderRadius: '4px', height: '40px', color: '#f50057', backgroundColor: 'white', border: '1px solid #f50057' }} className={styles.button}>Cancelar</button>
          <button onClick={handleSubmit} style={{ width: '40%', fontSize: '14px', fontWeight: '400', borderRadius: '4px', height: '40px' }} className={styles.button}>Enviar datos</button>
        </div>
      </div>
      {visibleSuccesfull &&
        <ModalSuccessfull title={'Enviado correctamente'} subtitle={'El vendedor te contactara pronto'} />}
    </div>
  )
}
export function ModalVisibleTelefonoAlmacen({ celular, setVisibleModalContactAlmacen }) {
  return (
    <div onClick={() => setVisibleModalContactAlmacen(false)} className={styles.modal} >
      <div style={{ width: '300px', padding: '16px', borderRadius: '8px' }} className={styles.modalContent}>
        <p style={{ fontSize: '16px', color: '#373737', margin: 0 }}>Para contactarte con este almacen, comunicate al {celular}</p>

      </div>
    </div>
  )
}


const initialFormAnuncio = {
  name: '',
  celular: '',
}
export function ModalInteresadoAnuncio({ setVisibleModalInteresado, }) {
  const [form, setForm] = useState(initialFormAnuncio)
  const [visibleSuccesfull, setVisibleSuccesfull] = useState(false)
  const [interesadoAnuncio, { data, loading, error }] = useMutation(INTERESADO_ANUNCIO)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.celular) {
      return alert('Debes completar tus datos')
    }
    interesadoAnuncio({ variables: form })
  }
  useEffect(() => {
    if (data) {
      setVisibleSuccesfull(true)
      setTimeout(() => {
        setVisibleSuccesfull(false)
        setVisibleModalInteresado(false)
      }, 2000)
    }
  }, [data])
  return (
    <div style={{ zIndex: '999' }} className={styles.modal} >
      <div style={{ width: '300px', padding: '32px 16px', borderRadius: '8px' }} className={styles.modalContent}>
        <section style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
          <p style={{ fontSize: '18px', fontWeight: '700', color: '#5B0221', margin: 0 }}>
            Anuncia con nosotros
          </p>
          <p style={{ fontSize: '14px', color: '#373737', margin: 0 }}>Para anunciarte, completa tus datos, nosotros nos pondremos en contacto contigo para ayudarte a vender mas!</p>

        </section>
        <form className={styles.form}>
          <input value={form.name} required onChange={handleChange} placeholder="Tú nombre" name='name' id='name' className={styles.inputContact} type={'text'} />
          <input value={form.celular} required onChange={handleChange} placeholder="Tú celular" name='celular' id='celular' className={styles.inputContact} type={'number'} />

        </form>
        <div style={{ width: '100%', display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '32px' }}>
          <button disabled={loading} onClick={() => setVisibleModalInteresado(false)} style={{ width: '40%', fontSize: '14px', fontWeight: '400', borderRadius: '4px', height: '40px', color: '#f50057', backgroundColor: 'white', border: '1px solid #f50057' }} className={styles.button}>Cancelar</button>
          <button disabled={loading} onClick={handleSubmit} style={{ width: '40%', fontSize: '14px', fontWeight: '400', borderRadius: '4px', height: '40px' }} className={styles.button}>Enviar datos</button>
        </div>
      </div>
      {visibleSuccesfull &&
        <ModalSuccessfull title={'Enviado correctamente'} subtitle={'Te contactaremos pronto'} />}
      {loading &&
        <ModalLoading title={'Enviando...'} />
      }
      {error &&
        <ModalError title={'Ha ocurrido un error'} subtitle={error?.message} />
      }

    </div>
  )
}


export function ModalChooseCar({ setVisibleModalCar, data, setCar }) {
  return (
    <div onClick={() => setVisibleModalCar(false)} className={styles.modal}>
      <div style={{ gap: '16px' }} className={styles.modalContent}>
        {data?.map(el => (
          <div onClick={() => setCar(el)} style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', cursor: 'pointer', alignItems: 'center', gap: '16px', width: '100%', padding: '8px 16px', boxSizing: 'border-box', backgroundColor: '#FBF6F6', borderRadius: '8px' }}>
            <img key={el} style={{ height: '36px', width: '36px', }} src={`./${el?.marca}.png`} />
            <p style={{ fontSize: '14px', color: '#373737', margin: 0 }}>{el?.referencia} · {el?.modelo}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

let tiposGastos = ['Tanqueada', 'Mantenimiento', 'Lavada', 'Repuestos', 'Parqueadero', 'Peajes', 'Multa', 'Otros', 'Todos']
export function ModalChooseTipoGasto({ setVisibleModalGasto, setSelectTipoGasto, selectTipoGasto, createGasto }) {
  return (
    <div onClick={() => setVisibleModalGasto(false)} className={styles.modal}>
      <div style={{ gap: '16px' }} className={styles.modalContent}>
        <p style={{ fontSize: '16px', fontWeight: '700', color: '#5B0221', margin: 0 }}>
          {createGasto ? 'Selecciona uno' : 'Filtrar'}
        </p>
        {tiposGastos.map(el => (
          createGasto && el === 'Todos'
            ? null
            :
            <div key={el} onClick={() => setSelectTipoGasto(el)} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', cursor: 'pointer' }}>
              <p style={{ fontSize: '14px', color: '#373737', margin: 0 }}>{el}</p>
              <img style={{ height: '24px', width: '24px', }} src={selectTipoGasto === el ? `./ellipse.svg` : `./ellipse-outline.svg`} />
            </div>
        ))}
      </div>
    </div>
  )
}

let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 2023]
export function ModalChooseDate({ setVisibleModalDate, date, setDate }) {
  return (
    <div onClick={() => setVisibleModalDate(false)} className={styles.modal}>
      <div style={{ gap: '16px' }} className={styles.modalContent}>
        <p style={{ fontSize: '16px', fontWeight: '700', color: '#5B0221', margin: 0 }}>
          Filtrar
        </p>
        {months.map((el, index) => (
          <div key={el} onClick={() => setDate(index)} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', cursor: 'pointer' }}>
            <p style={{ fontSize: '14px', color: '#373737', margin: 0 }}>{el}</p>
            <img style={{ height: '24px', width: '24px', }} src={date === index ? `./ellipse.svg` : `./ellipse-outline.svg`} />
          </div>
        ))}
      </div>
    </div>
  )
}

// export function ModalCreateGasto({ setVisibleCreateGasto, }) {
//   return (
//     <div className={styles.modal}>
//       <CreateGasto />
//     </div>
//   )
// }


export function ModalShareArticulo({ setVisibleShareArticulo, url, otherUrl }) {
  const handleCopy = () => {
    const currentURL = window.location.href;

    // Verificar si el navegador es compatible con la API Clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(otherUrl ? url : currentURL)
        .then(() => {
          alert('URL copiada al portapapeles');
        })
        .catch((error) => {
          alert('Error al copiar la URL', error);
        });
    } else {
      // Si el navegador no es compatible, muestra un mensaje de error o una alternativa
      alert('El navegador no es compatible con la API Clipboard');
    }
  }
  const urlEncoded = url.replace(/ /g, '%20')
  return (
    <div onClick={() => setVisibleShareArticulo(false)} className={styles.modal}>
      <div style={{ gap: '16px', cursor: 'pointer', alignItems: 'flex-start', padding: '20px' }} className={styles.modalContent}>
        <h3 style={{ fontWeight: '600', marginBottom: '8px', fontSize: '20px' }}>Compartir perfil</h3>
        <div onClick={handleCopy} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
          <ion-icon style={{ width: '24px', height: '24px', borderRadius: '50%' }} name="share-social-outline"></ion-icon>
          <p style={{ fontSize: '14px' }}>Copiar link</p>
        </div>
        <FacebookShareButton style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }} url={urlEncoded} ><FacebookIcon style={{ width: '24px', height: '24px', borderRadius: '50%' }} /><p style={{ fontSize: '14px' }}>Facebook</p></FacebookShareButton>
        <TwitterShareButton style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }} url={urlEncoded} ><TwitterIcon style={{ width: '24px', height: '24px', borderRadius: '50%' }} /><p style={{ fontSize: '14px' }}>Twitter</p></TwitterShareButton>
        <WhatsappShareButton style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }} url={urlEncoded}><WhatsappIcon style={{ width: '24px', height: '24px', borderRadius: '50%' }} /><p style={{ fontSize: '14px' }}>WhatsApp</p></WhatsappShareButton>
        <EmailShareButton style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }} url={urlEncoded}><EmailIcon style={{ width: '24px', height: '24px', borderRadius: '50%' }} /> <p style={{ fontSize: '14px' }}>Email</p></EmailShareButton>
        {/* <a style={{ fontSize: '12px' }} href={urlEncoded}>Ver perfil de mi taller</a> */}
      </div>
    </div>

  )
}

export function ModalTelefono({ telefono, taller, setVisibleModalTelefono }) {
  return (
    <div onClick={() => setVisibleModalTelefono(false)} className={styles.modal} >
      <div style={{ gap: '16px', borderRadius: '8px', padding: '24px' }} className={styles.modalContent} >
        <h3>Telefono / celular</h3>
        <p style={{ fontSize: '14px', fontWeight: '400', color: '#373737', margin: 0 }}>
          Comunicate con el taller {taller}, diles que viste su anuncio en quarks.com.co
        </p>
        <p style={{ fontSize: '20px', fontWeight: '700', color: '#373737', margin: 0 }}>{telefono}</p>

      </div>
    </div>
  )
}

export function ModalEditHorario({ setVisibleModalEditHorario, horarioActual }) {
  const initialFormHorario = {
    horario: horarioActual
  }
  const [dataImportante, setDataImportante] = useState(initialFormHorario)
  const [editNegocioVDos, { loading, data, error }] = useMutation(EDIT_NEGOCIO_VDOS)
  const [visibleSuccesfull, setVisibleSuccesfull] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    editNegocioVDos({ variables: dataImportante })
  }
  const handleClose = () => {
    setVisibleModalEditHorario(false)
  }
  useEffect(() => {
    if (data) {
      setVisibleSuccesfull(true)
      setTimeout(() => {
        setVisibleModalEditHorario(false)
      }, 2000)
    }
  }, [data])
  return (
    <div className={styles.modal} style={{ zIndex: '10000' }}>
      <div style={{ gap: '16px', cursor: 'pointer', alignItems: 'flex-start', padding: '20px', width: 'fit-content' }} className={styles.modalContent}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px', }}>
            <ion-icon style={{ fontSize: '20px' }} name="calendar-number-outline"></ion-icon>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', }}>Horario</p>
            </div>
          </div>
          <ion-icon onClick={handleClose} style={{ fontSize: '20px' }} name={"close-outline"}></ion-icon>
        </div>

        <AddHorario dataImportante={dataImportante} setDataImportante={setDataImportante} />
        <button disabled={loading} onClick={handleSubmit} style={{ fontSize: '14px', fontWeight: '400', height: '40px', backgroundColor: '#f50057', }} className={styles.button}>Guardar cambios</button>

      </div>
      {
        visibleSuccesfull &&
        <ModalSuccessfull title={'Informacion actualizada!'} />
      }
      {loading &&
        <ModalLoading title={'Actualizando horario...'} />
      }
    </div>
  )
}


export function ModalEditServicios({ setVisibleModalEditServicios, setCategorias, addCategory, setAddCategory, categorias, otherCategorias, setOtherCategorias }) {
  const handleChange = (category) => {
    setCategorias((prevCategorias) => {
      if (prevCategorias.includes(category)) {
        // Si existe, elimínalo del array
        return prevCategorias.filter((item) => item !== category);
      } else {
        // Si no existe, agrégalo al array
        return [...prevCategorias, category];
      }
    });
  }
  const handleChange2 = (category) => {
    setAddCategory('')
    setOtherCategorias((prevCategorias) => {
      if (prevCategorias.includes(category)) {
        // Si existe, elimínalo del array
        return prevCategorias.filter((item) => item !== category);
      } else {
        // Si no existe, agrégalo al array
        return [...prevCategorias, category];
      }
    });
  }

  const handleSubmitCategory = (e) => {
    e.preventDefault()
    setOtherCategorias((prevCategorias) => {
      if (prevCategorias.includes(addCategory)) {
        // Si existe, elimínalo del array
        return prevCategorias.filter((item) => item !== addCategory);
      } else {
        // Si no existe, agrégalo al array
        return [...prevCategorias, addCategory];
      }
    });
    setAddCategory('')

  }
  return (
    <div style={{ height: 'fit-content', }} className={styles.modal}  >
      <div style={{ gap: '16px', cursor: 'pointer', alignItems: 'flex-start', padding: '20px', width: '90%', height: '90%', overflow: 'auto' }} className={styles.modalContent}>
        <AddServicios setCategorias={setCategorias} addCategory={addCategory} setAddCategory={setAddCategory} categorias={categorias} otherCategorias={otherCategorias} setOtherCategorias={setOtherCategorias} />
      </div>
      {/* {
        visibleSuccesfull &&
        <ModalSuccessfull title={'Informacion actualizada!'} />
      }
      {loading &&
        <ModalLoading title={'Actualizando horario...'} />
      } */}
    </div >
  )
}