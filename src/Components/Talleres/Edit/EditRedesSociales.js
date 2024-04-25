import { useRouter } from "next/router";
import Icon, { IconCatalog } from "../../Icon/Icon";
import { useMutation } from "@apollo/client";
import { EDIT_NEGOCIO_VDOS_REDES } from "@/graphql/mutations";
import Input from "../../Input/Input";
import Button, { ButtonVariant } from "../../Button/Button";
import { useEffect, useState } from "react";
import { ModalError, ModalLoading, ModalSuccessfull } from "@/utils/Modales";
import {  GET_ONE_NEGOCIOVDOS } from "@/graphql/queries";


let initialForm = {
  facebook: '',
  instagram: '',
  paginaweb: '',
  email: ''
}

export default function EditRedesSociales({ data, email }) {
  const router = useRouter()
  const [editNegocioVDosRedes, result] = useMutation(EDIT_NEGOCIO_VDOS_REDES, {refetchQueries:[GET_ONE_NEGOCIOVDOS, {variables: { userName: data?.userName } }]})

  const [form, setForm] = useState(() => {
    if (data) {
      return Object.keys(initialForm).reduce((acc, key) => {
        if (data.hasOwnProperty(key)) {
          acc[key] = data[key];
        }
        return acc;
      }, {});
    } else {
      return initialForm;
    }
  })
  let disabled = form.facebook === data?.facebook && form?.instagram === data?.instagram  && form?.paginaweb === data?.paginaweb
  const handleSubmit = (e) => {
    e.preventDefault()
    if(disabled)return
    if (data.email === email) {
      editNegocioVDosRedes({ variables: form })
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
        <p style={{ fontSize: '16px', fontWeight: '600' }}>Redes Sociales</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
        <Icon name={IconCatalog.logoFacebook} size="lg" style={{ color: '#0080FF', fontSize: '32px' }} />
        <Input style={{ flex: 1 }} value={form.facebook} placeholder={data?.facebook ? data?.facebook : 'Url de tu perfil de facebook'} onChange={(e) => setForm({ ...form, facebook: e.target.value })} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
        <Icon name={IconCatalog.logoInstagram} size="lg" style={{ color: '#EB4264', fontSize: '32px' }} />
        <Input style={{ flex: 1 }} value={form.instagram} placeholder={data?.instagram ? data?.instagram : '@nombre de usuario'} onChange={(e) => setForm({ ...form, instagram: e.target.value })} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
        <Icon name={IconCatalog.earthOutline} size="lg" style={{ color: '#373737', fontSize: '32px' }} />
        <Input style={{ flex: 1 }} value={form.paginaweb} placeholder={data?.paginaweb ? data?.paginaweb : 'Url de tu pagina web'} onChange={(e) => setForm({ ...form, paginaweb: e.target.value })} />
      </div>

      <Button disable={disabled}  onClick={handleSubmit} size='lg' variant={ButtonVariant.secondary}>
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