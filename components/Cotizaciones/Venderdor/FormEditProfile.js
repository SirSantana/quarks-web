import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import useAuth from "../../../hooks/useAuth";
import styles from '../../../styles/vendedor.module.css'
import { useEffect, useState } from "react";
import { EDIT_VENDEDOR } from "../../../graphql/mutations";
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { useMutation } from '@apollo/client'
import ModalCargando from "../../../utils/modalCargando";
import ModalSuccesfull from "../../../utils/modalSuccesfull";
import ModalError from "../../../utils/modalError";
const initialForm = {
  avatar: '',
  name: '',
  almacen: '',
  direccion: '',
  ciudad: '',
  pais: '',
  celular: ''
}
const containerName = process.env.NEXT_PUBLIC_CONTAINER_NAME_PERFIL;
const sasToken = process.env.NEXT_PUBLIC_SAS_TOKEN
const storageAccountName = process.env.NEXT_PUBLIC_STORAGE_ACCOUNT_NAME

export default function FormEditProfile() {
  const { user } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState(initialForm)
  const [editVendedor, { data, loading, error }] = useMutation(EDIT_VENDEDOR)
  const [avatarExpire, setAvatarExpire] = useState('')
  const [visibleModalImage, setVisibleModalImage] = useState(false)
  const [visibleModal, setVisibleModal] = useState(true)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    for (let property in form) {
      if (form[property].length === 0) {
        delete form[property]
      }
    }
    setVisibleModal(true)

    editVendedor({ variables: form })
    router.back()
  }
  const createBlobInContainer = async (containerClient, file) => {
    const date = new Date().toISOString()
    setForm({ ...form, avatar: `https://${storageAccountName}.blob.core.windows.net/${containerName}/${date}${file.name}` })
    const blobClient = containerClient.getBlockBlobClient(`${date}${file.name}`);
    const options = { blobHTTPHeaders: { blobContentType: file.type } };
    await blobClient.uploadData(file, options)

  }
  const handleImage = async (e) => {
    const blobService = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );
    const containerClient = blobService.getContainerClient(containerName);
    let file = e.target.files[0]
    setAvatarExpire(URL.createObjectURL(e.target.files[0]))
    // upload file
    await createBlobInContainer(containerClient, file);
  }
  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user])
  useEffect(() => {
    if (form.avatar) {
      setVisibleModal(false)
    }
  }, [form.avatar])
  if(error){
    return <ModalError mensaje={'Ha ocurrido un error'} description={'Revisa tu conexion'} />
  }
  return (
    <Layout title={'Editar perfil | Quarks'} description={'Cambia los datos de tu cuenta de vendedor'}>
      <div className={styles.container} >
        <div className={styles.containerInput}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div onClick={() => setVisibleModalImage(true)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', gap: '20px', marginBottom: '20px' }}>
              <div style={{ width: '50px', height: '50px', }} className={styles.avatar}>
                {user?.avatar && !avatarExpire
                  ? <img alt={user?.name} src={user?.avatar} style={{ objectFit: 'contain', height: '50px', width: '50px', backgroundColor: 'white', borderRadius: '50%' }} />
                  : avatarExpire ? <img alt={user?.name} src={avatarExpire} style={{ objectFit: 'contain', height: '50px', width: '50px', backgroundColor: 'white', borderRadius: '50%' }} />
                    : <h2 style={{ fontSize: '14px' }} className={styles.letraInicial}>{user?.name[0]}</h2>
                }

              </div>
              <div style={{ justifyContent: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 500, color: '#464646', margin: '2px 0' }}>Quarks</h2>

                <h2 style={{ fontSize: '16px', fontWeight: 400, color: '#f50057', margin: '0' }}>Cambiar foto de perfil</h2>
              </div>
            </div>

            <div style={{ marginBottom: '10px', width: '100%' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 400, color: 'gray', margin: '5px 0 2px 0' }}>Nombre</h2>
              <input placeholder={user?.name} name='name' onChange={handleChange} className={styles.input} type={'text'} value={form.name} />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 400, color: 'gray', margin: '5px 0 2px 0' }}>Almacén</h2>
              <input placeholder={user?.almacen} onChange={handleChange} name='almacen' className={styles.input} type={'text'} value={form.almacen} />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 400, color: 'gray', margin: '5px 0 2px 0' }}>Ciudad</h2>
              <input placeholder={user?.ciudad} onChange={handleChange} name='ciudad' className={styles.input} type={'text'} value={form.ciudad} />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 400, color: 'gray', margin: '5px 0 2px 0' }}>País</h2>
              <input placeholder={user?.pais} onChange={handleChange} name='pais' className={styles.input} type={'text'} value={form.pais} />
            </div>

            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 400, color: 'gray', margin: '5px 0 2px 0' }}>Dirección</h2>
              <input placeholder={user?.direccion} onChange={handleChange} name='direccion' className={styles.input} type={'text'} value={form.direccion} />
            </div>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 400, color: 'gray', margin: '5px 0 2px 0' }}>Celular</h2>
              <input placeholder={user?.celular} onChange={handleChange} name='celular' className={styles.input} type={'number'} value={form.celular} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={handleSubmit} className={styles.button}>Guardar Cambios</button>
            </div>
          </div>
        </div>


      </div>
      {visibleModalImage && <div className={styles.darkBG}>
        <div className={styles.centered}>
          <div className={styles.modal}>
            <input onChange={handleImage} accept="image/*" id='imagen' name='imagen' style={{ color: 'gray', display: 'flex', flexDirection: 'column' }} type={'file'} />
            <button onClick={() => setVisibleModalImage(false)} className={styles.button}>Regresar</button>
          </div>
        </div>
      </div>}
      {loading &&
        <ModalCargando mensaje={'Editando perfil...'} description={'Espera un momento'} />
      }
      {data && visibleModal &&
        <ModalSuccesfull mensaje={'Usuario Editado'} description={'Se ha editado tu perfil correctamente'} />
      }
      {/* {error && visibleModal &&
        } */}
    </Layout>
  )
}