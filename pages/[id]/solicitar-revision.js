import Layout from "@/src/Components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { customStyles, customStyles2, formatOptionLabel, marcas, marcasWithOptions, repuestosWithOptions } from "./crear-resena";
import Select from 'react-select';
import styles from '@/styles/Almacenes.module.css'
import { categorias2 } from "@/src/Components/Talleres/ServiciosOfrecidos";
import Icon, { IconCatalog } from "@/src/Components/Icon/Icon";
import { CREATE_SOLICITUD_SERVICIO, CREATE_VISITA_WHATSAPP } from "@/graphql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { GET_WHATSAPP_NEGOCIO } from "@/graphql/queries";
import Button, { ButtonVariant } from "@/src/Components/Button/Button";
import { ModalError, ModalLoading, ModalSuccessfull } from "@/utils/Modales";


let initialForm = {
  descripcion: '',
  almacen: '',
  servicios: [],
  marca: 'Chevrolet',
  referencia: '',
  nombre: '',
  celular: ''
}
export const formatOptionLabel2 = ({ value, index, label }, { selectValue }) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', justifyContent: 'space-between', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
        <img src={`../${categorias2[index].img}.png`} style={{ width: '30px', height: '30px' }} alt={categorias2[index].img} />
        <p style={{ fontSize: '12px', }}>{categorias2[index].nombre}</p>
      </div>
    </div>
  );
}
export default function SolicitarRevision() {
  const [form, setForm] = useState(initialForm)
  const router = useRouter()
  const [email, setEmail] = useState(null)
  const { id, ide, contactme } = router.query
  const [createVisitaWhatsapp] = useMutation(CREATE_VISITA_WHATSAPP)
  const [createSolicitudServicio, { loading, data, error }] = useMutation(CREATE_SOLICITUD_SERVICIO)
  const result = useQuery(GET_WHATSAPP_NEGOCIO, { variables: { id: ide } })


  const whatsapp = result?.data?.getWhatsappNegocio
  const handleChangeServices = (selectedOptions) => {
    setForm({ ...form, servicios: selectedOptions.label });
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })

  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (form.descripcion.length < 12) {
      return alert('Cuentanos mas sobre el problema de tu vehiculo!')
    }
    if (form.referencia !== '' && form.servicios.length > 0 && whatsapp) {
      createVisitaWhatsapp({ variables: { id: ide } })
      createSolicitudServicio({ variables: { ...form, almacen: ide } })
      if (!contactme) {
        const message = `¡Hola! Estoy interesado en sus servicios.

        🛠️  *Descripción del Problema:* ${form.descripcion} 
        ⚙️  *Servicio:* ${form.servicios} 
        🚗  *Marca del Vehículo:* ${form.marca} 
        🔍  *Referencia del Vehículo:* ${form.referencia} 
        
  Quedo atento a tu pronta respuesta. ¡Gracias! 👍`;
        let url = `https://api.whatsapp.com/send?phone=57${whatsapp?.replace(/\s/g, '')}`;

        url += `&text=${encodeURIComponent(message)}&app_absent=0`;
        window.open(url);
      }

    } else {
      return alert('Completa los campos')
    }

  }
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        router.back()
      }, 3000)
    }
  }, [data])
  return (
    <Layout title={'Crear reseña'} visibleNavbar={false}>
      <div style={{ maxWidth: '400px', width: '90%', margin: '0 auto', display: 'flex', flexDirection: 'column', padding: '16px 0', boxSizing: 'border-box', gap: '40px' }}>

        <header style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
            <p style={{ flex: 1, fontWeight: '500', alignSelf: 'center', textAlign: 'center', fontSize: '14px' }}>Solicitar Revisión</p>
            <ion-icon onClick={() => router.push(`/${id}`)} style={{ fontSize: '24px', alignSelf: 'flex-end', cursor: 'pointer' }} name="close-outline"></ion-icon>
          </div>
          <div style={{ width: '100%', backgroundColor: '#f1f1f1', height: '1px' }} />
        </header>

        {contactme &&
          <div style={{ width: '100%', gap: '8px', height: 'fitContent', display: 'flex', flexDirection: 'column' }}>
            <h4 style={{ fontSize: '16px', color: '#373737', fontWeight: '700' }}>Tus datos</h4>
            <div style={{ display: 'flex', width: '100%', gap: '8px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <input required id="nombre" type='text' onChange={handleChange} name='nombre' value={form.nombre} className={styles.inputChooseMarca} style={{ width: '48%' }} placeholder='Andres Garcia' />
              <input required id="celular" type='text' onChange={handleChange} name='celular' value={form.celular} className={styles.inputChooseMarca} placeholder='Celular (3143903***)' />
            </div>
          </div>
        }

        <div style={{ width: '100%', gap: '8px', height: 'fitContent', display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ fontSize: '16px', color: '#373737', fontWeight: '700' }}>¿Qué servicio necesita tu vehículo?</h4>
          <Select isSearchable={false} formatOptionLabel={formatOptionLabel2} onChange={handleChangeServices} options={repuestosWithOptions} styles={customStyles} placeholder='Seleccionar servicio' noOptionsMessage={() => 'No se encontro ningun repuesto'} />
        </div>


        <div style={{ width: '100%', gap: '8px', display: 'flex', flexDirection: 'column', }}>
          <h4 style={{ fontSize: '16px', color: '#373737', fontWeight: '700' }}>Tú vehículo</h4>
          <div style={{ display: 'flex', width: '100%', gap: '8px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Select onChange={(e) => setForm({ ...form, marca: e.value })} options={marcasWithOptions} isSearchable={false} styles={customStyles2} placeholder={<img src={marcas[0].img} style={{ width: '30px', height: '30px', marginTop: '4px' }} />} defaultValue={marcas[0].img} />
            <input required id="referencia" type='text' onChange={handleChange} name='referencia' value={form.referencia} className={styles.inputChooseMarca} placeholder='Modelo - Cilindraje - Año' />
          </div>
        </div>

        <div style={{ width: '100%', gap: '8px', display: 'flex', flexDirection: 'column' }}>

          <h4 style={{ fontSize: '16px', color: '#373737', fontWeight: '700' }}>Describe el problema o situacion</h4>

          <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px', width: '100%', boxSizing: 'border-box', padding: '16px' }}>
            <textarea required onChange={handleChange} name='descripcion' rows="5" value={form?.descripcion} style={{ width: '100%', fontSize: '14px', border: 'none', outline: 'none', padding: '0', resize: 'none', margin: 0 }} type={'text'} placeholder={'Ejemplo: El auto presenta problemas con la transmisión o hace un ruido extraño al arrancar.'} className={styles.input} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', margin: '16px 0 16px 0', gap: '16px' }}>
          <Button onClick={handleSubmit} fullWidth variant={ButtonVariant.primary}>
            Solicitar revision
          </Button>
          {/* <button onClick={() => { setVisibleOpinion(false), setForm(initialForm) }} style={{ width: '100%', fontSize: '14px', backgroundColor: 'white', border: '1px solid #f50057', color: '#f50057', }} className={styles.button}>Regresar</button> */}
        </div>
      </div>


      {loading &&
        <ModalLoading title={'Enviando... '} />
      }
      {error &&
        <ModalError title={'Ha ocurrido un error'} subtitle={error?.message} />
      }
      {data &&
        <ModalSuccessfull title={'Genial'} subtitle={'Tu solicitud ha sido enviada al negocio. Se pondran en conctacto contigo pronto!'} />
      }
    </Layout>
  )
}