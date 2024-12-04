
import styles from '@/styles/Modales.module.css'
import Icon, { IconCatalog } from '../../Icon/Icon'
import SelectBrand from '../../MenuSelects/SelectBrand'
import SelectServicioProfile from '../../MenuSelects/SelectServicioProfile'
import Button, { ButtonVariant } from '../../Button/Button'
import SelectPhoneNumber from '../../MenuSelects/SelectPhoneNumber'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_OPINION, CREATE_SOLICITUD_SERVICIO } from '@/graphql/mutations'
import { GET_CALIFICACION_OPINIONES, GET_OPINIONES, GET_WHATSAPP_NEGOCIO } from '@/graphql/queries'
import { useRouter } from 'next/router'
import { ModalError, ModalLoading, ModalSuccessfull } from '@/utils/Modales'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import ModalLoginFacebook from '../../Almacenes/ModalLoginFacebook'


let initialForm = {
  email: '',
  descripcion: '',
  calificacion: 0,
  almacen: '',
  nombre: '',
  foto: '',
  servicios: ['Electricos'],
  marca: 'Chevrolet',
  referencia: ''
}
const Star = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "#407BFF" : "#EDEDF2"} // Relleno dinámico según la calificación
    style={{ cursor: "pointer" }}
  >
    <path d="M12 .587l3.668 7.568L24 9.423l-6 5.834 1.419 8.243L12 18.897l-7.419 4.603L6 15.257 0 9.423l8.332-1.268z" />
  </svg>
);

export default function ModalCreateReseña({ id, ide }) {
  const router = useRouter()
  const [form, setForm] = useState(initialForm)
  const [visibleModalLogin, setVisibleModalLogin] = useState(false)
  const { data: session } = useSession()
  const labels = ["Malo", "", "", "", "Excelente"];
  const closeModal = () => {
    router.push(`/${router.query.id}/prev`, undefined, { shallow: true, scroll: false });
  }
  const [createOpinion, { data, error, loading }] = useMutation(CREATE_OPINION,  {
    update: (cache, result) => {
      // Intentar leer los datos de la cache
      const existingOpinions = cache.readQuery({
        query: GET_OPINIONES,
        variables: { id: ide },
      });
      // Verificar si los datos existen y tienen la propiedad 'getOpiniones'
      if (existingOpinions && existingOpinions.getOpiniones) {
        const newOpinion = result?.data.createOpinion;

        // Actualizar la cache
        cache.writeQuery({
          query: GET_OPINIONES,
          variables: { id: ide },
          data: {
            getOpiniones: [newOpinion, ...existingOpinions.getOpiniones],
          },
        });
      }
    },
    refetchQueries:[{query:GET_CALIFICACION_OPINIONES, variables:{id:ide}}],
    onCompleted: () => {
      setTimeout(() => {
        closeModal();
      }, 4000);
    }
  }, );
  const handleSubmit = (e) => {
    e.preventDefault()
   
    if (form.descripcion.length < 12 || form.servicios.length === 0 || form.referencia === '' || form.marca === '') {
      return alert('Cuentanos mas sobre tu experiencia!')
    }
    else{
      if (form.email !== '' && form.descripcion!== '' && form.referencia !== '' && form.servicios.length> 0 && form.almacen !== '') {
        createOpinion({ variables: form })
        // setCalificated(true)
      } else {
        return alert('Completa los campos')
      }
    }

  }

  useEffect(() => {
    if (!session) {
      return setVisibleModalLogin(true)
    }
    setForm({ ...form, almacen: ide, nombre: session?.user?.name, foto: session?.user?.image, email: session?.user?.email })
    setVisibleModalLogin(false)
  }, [session]);

  return (
    <div onClick={closeModal} className={styles.modal}  >
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', width: '90%', padding: '24px', borderRadius: '16px', margin: '0 auto', backgroundColor: 'white' }}>
        {visibleModalLogin
          ?
          <>
            <header style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', flex:1 }}>
                <p style={{ margin: '0', textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>Ingresa con Google para verificar tu cuenta</p>
              </div>
              <Icon size='lg' onClick={() => setVisibleModalLogin(false)} name={IconCatalog.closeOutline} style={{ color: '#6C788E' }} />
            </header>
            <Button style={{marginTop:'32px'}} onClick={() =>  signIn('google') } variant={ButtonVariant.outlined}>
              <svg width="24" height="24" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>
              Ingresa con google
            </Button>
            {session &&
              <button style={{ border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600', margin: '16px 0', backgroundColor: 'white', color: '#373737' }} onClick={() => { signOut(), setVisibleModalLogin(false) }}>
                Cerrar sesion
              </button>
            }
          </>
          :
          <>
            <header style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center' }}>
                <p style={{ margin: '0', textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>Comparte tu experiencia en...</p>
              </div>
              <Icon size='lg' onClick={closeModal} name={IconCatalog.closeOutline} style={{ color: '#6C788E' }} />
            </header>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', margin: '32px 0 16px 0', }}>
              <label style={{ fontWeight: '500', fontSize: '14px', color: '#182537' }}>¿Que servicio tomaste?</label>
              <SelectServicioProfile handleChange={(e) => setForm({ ...form, servicios: [e.label] })} width={'100%'} defaultInitial={form.servicios[0]} form={form} />
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', margin: '16px 0', }}>
              <label style={{ fontWeight: '500', fontSize: '14px', color: '#182537' }}>Marca y modelo de tu Vehículo</label>
              <SelectBrand width={'80px'} handleChange={(e) => setForm({ ...form, marca: e.value })} handleChangeModelo={(e) => setForm({ ...form, referencia: e.target.value })} form={form}/>
            </div>

            <section style={{ width: '100%', gap: '8px', display: 'flex', flexDirection: 'column' }}>

              <label style={{ fontWeight: '500', fontSize: '14px', color: '#182537' }}>Cuenta Tú experiencia</label>

              <div style={{ border: '1px solid #d9d9d9', borderRadius: '4px', width: '100%', boxSizing: 'border-box', padding: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '8px' }}>
                  <div style={{ marginRight: '8px', cursor: 'pointer', display: 'flex', gap: '4px', flexDirection: 'row' }}  >
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <div key={index} >
                          <div
                            onClick={() => setForm({ ...form, calificacion: index + 1 })}
                            style={{ display: "inline-block", cursor: "pointer" }}
                          >
                            <Star filled={index < form.calificacion} />
                          </div>
                          {/* Etiqueta "Malo" en la primera estrella y "Excelente" en la última */}
                          {/* {index === 0 && <span >Malo</span>} */}
                          {/* {index === 4 && <span >Excelente</span>} */}
                        </div>
                      ))}
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#CFD5E1' }} className={styles.subtitle2}>{form.calificacion == 1 && 'Mala'} {form.calificacion == 2 && 'Regular'}{form.calificacion == 3 && 'Aceptable'} {form.calificacion == 4 && 'Bueno'}{form.calificacion == 5 && 'Excelente'}</p>
                </div>
                <textarea required onChange={(e) => setForm({ ...form, descripcion: e.target.value })} name='descripcion' rows="5" value={form?.descripcion} style={{ width: '100%', fontSize: '14px', border: 'none', outline: 'none', padding: '0', resize: 'none', margin: 0, fontFamily: 'Poppins' }} type={'text'} placeholder={'Comparte detalles de tu experiencia'} className={styles.input} />
              </div>
            </section>
            <footer style={{ display: 'flex', alignItems: 'end', width: '100%', marginTop: '16px', justifyContent: 'flex-end' }}>
              <button style={{ border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '600', margin: '16px 0', backgroundColor: 'white', color: '#373737' }} onClick={() => { signOut(), setVisibleModalLogin(false) }}>
                Cerrar sesion
              </button>
              <Button onClick={handleSubmit} className={'desktopButton'} style={{ alignSelf: 'flex-end', margin: '24px 0 0 0', backgroundColor: '#407BFF', whiteSpace: 'noWrap' }} >Confirmar Reseña</Button>
            </footer>
          </>
        }
      </div>
      {data &&
        <ModalSuccessfull  title={'Reseña compartida!'} subtitle={'Gracias por compartir tu experiencia, esto ayudará a la comunidad a encontrar mejores talleres'} />
      }
      {loading &&
        <ModalLoading title={'Publicando...'}  />
      }
      {error &&
        <ModalError title={'Ha ocurrido un error, reintentalo mas tarde'} subtitle={error?.message} />
      }
    </div>

  )
}