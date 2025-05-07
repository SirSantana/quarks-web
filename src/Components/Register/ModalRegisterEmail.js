
import styles from '@/styles/Modales.module.css'
import { signIn, signOut, useSession } from 'next-auth/react'
import Button, { ButtonVariant } from '../Button/Button'
import Icon, { IconCatalog } from '../Icon/Icon'
import SelectPhoneNumber from '../MenuSelects/SelectPhoneNumber'
import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { SIGNUP_NEGOCIO_VDOS } from '@/graphql/mutations'
import { useRouter } from 'next/router'

let initialForm={
  email:'',
  indicativo:'+57',
  whatsapp:'',
  nombre:''
}
export default function ModalRegisterEmail({ setVisibleModalRegister }) {
  const [form, setForm] = useState(initialForm);
  const { data: session } = useSession();
  const router = useRouter();

  const [signUpNegocioVDos] = useMutation(SIGNUP_NEGOCIO_VDOS, {
    onCompleted: (data) => {
      console.log(data);
        router.push(`${router.asPath}/${data.signUpNegocioVDos}/tipo-servicio`);
    },
    onError: (error) => {
      console.error("Error en el registro:", error.message);
    }
  });


  const handleSubmit = () => {
    if(form.email.length > 0 || form.whatsapp.length > 0){
      signUpNegocioVDos({variables:form});
    }else{
      alert("Por favor, rellena todos los campos")
    }
  };
  
  useEffect(() => {
    if (session?.user) {
      const { email, name } = session.user;

      signUpNegocioVDos({
        variables: {
          email,
          nombre: name,
          whatsapp: "",
          indicativo: "+57"
        }
      });
    }
  }, [session, signUpNegocioVDos]);
  
  return (
    <div className={styles.modal}  style={{ zIndex: '100000000000' }} >
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', width: '90%', padding: '24px', borderRadius: '16px', margin: '0 auto', backgroundColor: 'white' }}>
        <header style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', flex: 1 }}>
            <p style={{ margin: '0', textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>Registrate o Inicia Sesion</p>
          </div>
          <Icon size='lg' onClick={() => setVisibleModalRegister(false)} name={IconCatalog.closeOutline} style={{ color: '#6C788E' }} />
        </header>

        <form  style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', margin: '48px 0 24px 0' }}>
          {/* <label style={{ color: '#6C788E' }}>Numero de teléfono</label> */}
          <SelectPhoneNumber width={'120px'} handleChange={(e) => setForm({ ...form, indicativo: e.value })} handlePhoneNumber={(e) => setForm({ ...form, whatsapp: e.target.value })} form={form} />
        <Button onClick={()=>handleSubmit()}  fullWidth variant={ButtonVariant.primary}>
          Continuar
        </Button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}>
      <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ddd' }} />
      <span style={{ margin: '0 12px', color: '#6C788E', fontSize: '14px', fontWeight: '500' }}>
        o ingresa con
      </span>
      <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ddd' }} />
    </div>
        <Button style={{ marginTop: '32px' }} onClick={() => signIn('google')} fullWidth variant={ButtonVariant.outlined}>
          <svg width="24" height="24" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>
          Continuar con google
        </Button>
        <button onClick={()=>signOut('google')}>Cerrar</button>

        <footer style={{ display: 'flex', alignItems: 'end', width: '100%', marginTop: '16px', justifyContent: 'flex-end' }}>

          {/* <Button onClick={handleSubmit} style={{ alignSelf: 'flex-end', margin: '24px 0 0 0', backgroundColor: '#407BFF', whiteSpace: 'noWrap' }} >Confirmar Reseña</Button> */}
        </footer>
      </div>
      {/* {data &&
        <ModalSuccessfull title={'Reseña compartida!'} subtitle={'Gracias por compartir tu experiencia, esto ayudará a la comunidad a encontrar mejores talleres'} />
      }
      {loading &&
        <ModalLoading title={'Publicando...'} />
      }
      {error &&
        <ModalError title={'Ha ocurrido un error, reintentalo mas tarde'} subtitle={error?.message} />
      } */}
    </div>

  )
}