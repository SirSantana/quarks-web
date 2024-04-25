
import SelectIndicativo from "@/src/Components/Register/SelectIndicativo";
import Input from "@/src/Components/Input/Input";
import Button, { ButtonVariant } from "@/src/Components/Button/Button";
import AddHorario from "@/src/Components/Register/AddHorario";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from '@/styles/Faq.module.css'
import AddFotoPerfil from "@/src/Components/Register/AddFotoPerfil";
import Icon, { IconCatalog } from "@/src/Components/Icon/Icon";
import { useMutation } from "@apollo/client";
import { EDIT_NEGOCIO_VDOS_REDES } from "@/graphql/mutations";
import { GET_ONE_NEGOCIOVDOS } from "@/graphql/queries";
import { useRouter } from "next/router";
import { ModalError, ModalLoading, ModalSuccessfull } from "@/utils/Modales";

const MapDireccion = dynamic(
  () => import('@/src/Components/Register/MapDireccion'), 
  { ssr: false } 
)
const MapCobertura = dynamic(
  () => import('@/src/Components/Register/MapCobertura'), 
  { ssr: false } 
)

let secondForm = {
  direccion: '',
  ciudad: '',
  pais: '',
  whatsapp: '',
  telefono: '',
  horario: 'Lun 08:00 AM - 6:00 PM,Mar 08:00 AM - 6:00 PM,Mié 08:00 AM - 6:00 PM,Jue 08:00 AM - 6:00 PM,Vie 08:00 AM - 6:00 PM,Sáb 08:00 AM - 3:00 PM,Dom Cerrado',  // String
  fotoperfil: '',
  nombre: '',
  indicativo: '',
  coordenadas: [],
  email:''
}
export default function EditDataImportante({data, email}) {
  const [editNegocioVDosRedes, result] = useMutation(EDIT_NEGOCIO_VDOS_REDES, {refetchQueries:[GET_ONE_NEGOCIOVDOS, {variables: { userName: data?.userName } }]})
  const router = useRouter()
  const [dataImportante, setDataImportante] = useState(() => {
    if (data) {
      return Object.keys(secondForm).reduce((acc, key) => {
        if (data.hasOwnProperty(key)) {
          acc[key] = data[key];
        }
        return acc;
      }, {});
    } else {
      return secondForm;
    }
  });
  const handleChange = (e) => {
    setDataImportante({ ...dataImportante, [e?.target?.name]: e?.target?.value })
    if (e.target.name === 'telefono') {
      setDataImportante({ ...dataImportante, whatsapp: e?.target?.value, telefono: e?.target?.value, })
    }
  }
  const handleChangeIndicativo = (e) => {
    setDataImportante({ ...dataImportante, [e?.target?.name ? e.target.name : e.index]: e?.target?.value ? e?.target?.value : e?.value })
  }
  let disabled = dataImportante.direccion === data?.direccion && dataImportante?.ciudad === data?.ciudad  && dataImportante?.pais === data?.pais && dataImportante?.whatsapp === data?.whatsapp&& dataImportante?.horario === data?.horario&& dataImportante?.nombre === data?.nombre&& dataImportante?.indicativo === data?.indicativo

  const handleSubmit = (e) => {
    e.preventDefault()
    if(disabled)return
    if (data.email === email) {
      const modifiedData = {email:data?.email};
      Object.keys(dataImportante).forEach((key) => {
        if ((dataImportante[key] !== data[key])) {
          modifiedData[key] = dataImportante[key];
        }
      });
      editNegocioVDosRedes({ variables: modifiedData })
    } else {
      router.push('/')
    }

  }
  useEffect(() => {
    if (result?.data) {
      setTimeout(() => {
        router.back()
      }, 3000)
    }
  }, [result?.data])
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', margin: '0px 0 16px 0' }}>
        <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={IconCatalog.readerOutline} size='md' />
        </div>
        <p style={{ fontSize: '16px', fontWeight: '600' }}>Datos Basicos</p>
      </div>
      <AddFotoPerfil setDataImportante={setDataImportante} dataImportante={dataImportante} fotoRegister={true} fotoActual={data?.fotoperfil} />

      <div className={styles.containerInputsRegister}>
        <SelectIndicativo handleChange={handleChangeIndicativo} name={'indicativo'} value={dataImportante.indicativo} setDataImportante={setDataImportante} dataImportante={dataImportante} />
        <Input type={'number'} name={'telefono'} placeholder={'Tú movil'} onChange={handleChange} value={dataImportante.telefono} inputMode={'numeric'} />
      </div>

      <div className={styles.containerInputsRegister} >
        <Input type={'text'} name={'ciudad'} placeholder={'Agregar ciudad'} onChange={handleChange} value={dataImportante.ciudad} />
        <SelectIndicativo handleChange={handleChangeIndicativo} name={'pais'} value={dataImportante.pais} setDataImportante={setDataImportante} dataImportante={dataImportante} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', marginTop: '48px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={IconCatalog.calendarOutline} size='md' />
          </div>
          <p style={{ fontSize: '16px', fontWeight: '600' }}>Horario</p>
        </div>
        <AddHorario setDataImportante={setDataImportante} dataImportante={dataImportante} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', margin: '32px 0 32px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={IconCatalog.globeOutline} size='md' />
          </div>
          <p style={{ fontSize: '16px', fontWeight: '600' }}>{data.tipo === 'Taller' ? 'Direccion y Ubicacion' : 'Zona de cobertura'}</p>
        </div>
        <Input type={'text'} name={'direccion'} placeholder={data.tipo === 'Taller' ? 'Agregar direccion' : 'Ejemplo: Bogota y alrededores...'} onChange={handleChange} value={dataImportante.direccion} />
        <p style={{ fontSize: '14px', marginTop: '8px', fontWeight: '600', color: data.coordenadas?.length <= 1 && '#f50057' }}>{data.tipo === 'Taller' ? 'Ubica el punto en el mapa. Esta sera ubicacion que veran los demas' : 'Ajusta tu posicion y el rango de disponibilidad de tus servicios.'}</p>

        {data.tipo === 'Taller'
          ?
          <MapDireccion setDataImportante={setDataImportante} dataImportante={dataImportante} />
          :
          <MapCobertura setDataImportante={setDataImportante} dataImportante={dataImportante} />
        }
      </div>

      <Button disable={disabled} onClick={handleSubmit} size='lg' variant={ButtonVariant.secondary}>
        Guardar Cambios
      </Button>

      {result?.loading &&
        <ModalLoading title={'Editando perfil...'} />
      }
      {result?.error &&
        <ModalError title={'Ha ocurrido un error'} subtitle={result?.error?.message} />
      }
      {result?.data &&
        <ModalSuccessfull title={'Perfecto'} subtitle={'Tu perfil ha sido editado correctamente. Los cambios tardaran unos minutos en efectuarse.'} />
      }
    </>
  )
}