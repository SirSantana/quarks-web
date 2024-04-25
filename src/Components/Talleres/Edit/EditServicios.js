import { MagicMotion } from "react-magic-motion";
import Icon, { IconCatalog } from "../../Icon/Icon";
import { categorias2 } from "../ServiciosOfrecidos";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button, { ButtonVariant } from "../../Button/Button";
import Input from "../../Input/Input";
import { EDIT_NEGOCIO_VDOS_REDES } from "@/graphql/mutations";
import { GET_ONE_NEGOCIOVDOS } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import { ModalError, ModalLoading, ModalSuccessfull } from "@/utils/Modales";

export default function EditServicios({data, email}) {
  const [editNegocioVDosRedes, result] = useMutation(EDIT_NEGOCIO_VDOS_REDES, {refetchQueries:[GET_ONE_NEGOCIOVDOS, {variables: { userName: data?.userName } }]})
  const [addCategory, setAddCategory] = useState('')
  const [otherCategorias, setOtherCategorias] = useState([])
  const router = useRouter()
  const [categorias, setCategorias] = useState(data?.categorias)
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
  const handleSubmit=(e)=>{
    e.preventDefault()
    setCategorias(categorias.concat(otherCategorias))
    if (data.email === email) {
      editNegocioVDosRedes({ variables: {categorias, email:data?.email} })
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
        <p style={{ fontSize: '16px', fontWeight: '600' }}>Servicios Ofrecidos </p>
        </div>

        <MagicMotion>
      <div style={{ margin: '0px 0 64px 0', display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'flex-end', boxSizing: 'border-box', maxWidth: '600px', width: '100%' }}>
        <ul
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', gap: '20px', marginTop: '32px', width: '100%', justifyContent: 'space-between' }}
        >
          {categorias2.map(category => (
            <div key={category.nombre} onClick={() => handleChange(category.db)} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
              <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {category?.img ? <img src={`/${category?.img}.png`} style={{ width: '30px', height: '30px' }} /> : <ion-icon name="settings-outline" style={{ fontSize: '20px' }}></ion-icon>}
              </div>
              <p style={{ fontSize: '14px', flex: 1 }}>{category.nombre}</p>
              {categorias?.includes(category.db)
                ? <ion-icon style={{ fontSize: '24px', cursor: 'pointer', color: '#373737' }} name="checkbox"></ion-icon>
                : <div style={{ borderRadius: '4px', width: '18px', height: '18px', border: '1px solid black', margin: '2px' }}>
                </div>
              }

            </div>
          ))}
        </ul>
        {otherCategorias.length > 0 &&
          <ul
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', gap: '20px', marginTop: '12px', width: '100%', justifyContent: 'space-between' }}
          >
            {otherCategorias.map(category => (
              <div key={category} onClick={() => handleChange2(category)} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center' }}>
                <div style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ion-icon name="settings-outline" style={{ fontSize: '20px' }}></ion-icon>
                </div>
                <p style={{ fontSize: '14px', flex: 1 }}>{category}</p>
                {otherCategorias.includes(category)
                  ? <ion-icon style={{ fontSize: '24px', cursor: 'pointer', color: '#373737' }} name="checkbox"></ion-icon>
                  : <div style={{ borderRadius: '4px', width: '19.5px', height: '19.5px', border: '1px solid black' }}>
                  </div>
                }
              </div>
            ))}
          </ul>
        }
        <form onSubmit={handleSubmitCategory} style={{ display: 'flex', flexDirection: 'row', gap: '16px', width: '100%', alignItems: 'center', marginTop: '12px', marginBottom: '32px', }}>
          <div onClick={() => handleChange2(addCategory)} style={{ border: '1px solid #c5c5c5', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ion-icon name="add-outline" style={{ fontSize: '20px' }}></ion-icon>
          </div>
          <Input style={{flex:1}} type={'text'} name={'categoria'} placeholder={'Agregar otro servicio. Ej: Tapiceria'} onChange={(e) => setAddCategory(e.target.value)} value={addCategory} />
          {otherCategorias.includes(addCategory)
            ? <button type='submit'>
              <ion-icon style={{ fontSize: '24px', cursor: 'pointer', }} name="checkbox"></ion-icon>
            </button>
            : <div onClick={() => handleChange2(addCategory)} style={{ borderRadius: '4px', width: '19.5px', height: '19.5px', border: '1px solid black' }}>
            </div>
          }
        </form>
        <Button size='lg' onClick={handleSubmit} variant={ButtonVariant.secondary}>
          Guardar Cambios
        </Button>
      </div>
      {result?.loading &&
        <ModalLoading title={'Editando perfil...'} />
      }
      {result?.error &&
        <ModalError title={'Ha ocurrido un error'} subtitle={result?.error?.message} />
      }
      {result?.data &&
        <ModalSuccessfull title={'Perfecto'} subtitle={'Tu perfil ha sido editado correctamente. Los cambios tardaran unos minutos en efectuarse.'} />
      }
    </MagicMotion>
    </>
  )
}