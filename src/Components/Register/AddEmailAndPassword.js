
import { EDIT_NEGOCIO_VDOS } from '@/graphql/mutations'
import styles from '@/styles/Faq.module.css'
import { useMutation, } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Button, { ButtonVariant } from '../Button/Button'
import Image from 'next/image'
import { signIn, signOut, useSession, } from 'next-auth/react'
import ConfettiExplosion from 'react-confetti-explosion'
import Link from 'next/link'
import { ModalLoading } from '@/utils/Modales'


export default function AddEmailAndPassword({ setForm, form, setPage, page, dataImportante, }) {
  const [editNegocioVDos, { loading, data, error }] = useMutation(EDIT_NEGOCIO_VDOS,)
  const router = useRouter()

  const { data: session } = useSession()

  let dataRegistroString = localStorage.getItem('dataRegistro');
  let dataRegistroParse = JSON.parse(dataRegistroString);
  let verify = (
    dataRegistroParse.direccion.length > 0 &&
    dataRegistroParse.ciudad.length > 0 &&
    dataRegistroParse.pais.length > 0 &&
    dataRegistroParse.whatsapp.length > 0 &&
    dataRegistroParse.telefono.length > 0 &&
    dataRegistroParse.horario.length > 0 &&
    dataRegistroParse.fotoperfil.length > 0 &&
    dataRegistroParse.categorias.length > 0 &&
    dataRegistroParse.nombre.length > 0 &&
    dataRegistroParse.indicativo.length > 0 &&
    dataRegistroParse.tipo.length > 0 &&
    dataRegistroParse.vehiculo.length > 0 &&
    dataRegistroParse.coordenadas.length > 0 &&
    dataRegistroParse.userName.length > 0
  );
  const handleSub = (e) => {
    e.preventDefault()
    if (session?.user?.email && verify) {
      let dataRegistro = { ...dataRegistroParse, email: form.email ? form.email : session.user.email }
      editNegocioVDos({ variables: dataRegistro })
    } else {
      router.push('/signup?page=3')
    }
  }
  // console.log(verify);
  useEffect(() => {
    if (session?.user?.email) {
      setForm({ ...form, email: session?.user?.email })
    }
  }, [session])
  useEffect(() => {
    if (data) {
      router.push(`/signup?isCreated=true`)
    }
  }, [data])
  return (
    <div style={{ margin: '32px 0 64px 0', display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'flex-end', boxSizing: 'border-box', maxWidth: '600px', width: '100%' }}>
      {/* <ion-icon style={{ fontSize: '20px', }} onClick={() => setPage(0)} name="chevron-back-outline"></ion-icon> */}
      {router?.query?.isCreated
        ?
        <>
          <h1 style={{ textAlign: 'center' }}>Genial! Tu perfil ha sido creado!</h1>
          <ConfettiExplosion duration={3000} style={{ margin: '0 auto' }} particleSize={16} />
          <Link href={`/${data?.editNegocioVDos.userName}`} className={styles.cardPerfilCreated}>
            <Image
              sizes="100vw"
              width={300}
              height={380}
              style={{ borderRadius: '12px', objectFit: 'cover' }}
              src={data?.editNegocioVDos?.fotoperfil ? data?.editNegocioVDos.fotoperfil : 'https://azurequarks.blob.core.windows.net/negocios/atiempocars210723.jpg'}
              priority={true}
              loading="eager"
              alt={`Taller mecanico ${data?.nombre} Bogota`}
            />
            <div
              style={{ width: '100%', borderRadius: '12px', marginBottom: '6px', bottom: 0, height: '180px' }}
              className={styles.opacityImg}
            />
            <div
              style={{ border: '1px solid #d9d9d9', padding: '4px 8px', borderRadius: '4px', backgroundColor: 'white', position: 'absolute', right: '12px', top: '12px' }}
            >
              <p style={{ fontWeight: '600' }}>Ver Perfil</p>
            </div>
            <div className={styles.cardDataDesktop} >
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '8px' }}>
                <Image
                  width={32}
                  height={32}
                  src={data?.editNegocioVDos.fotoperfil}
                  priority={true}
                  loading="eager"
                  alt={`Taller mecanico ${data?.editNegocioVDos?.nombre} Bogota`}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ width: '100%', flex: 1 }}>
                  <h2 className={styles.textTitle} style={{ color: 'white', fontSize: '20px' }}>{data?.editNegocioVDos?.nombre}</h2>
                  <h3 style={{ color: 'white' }} className={styles.textDireccion}>{data?.editNegocioVDos?.direccion}</h3>
                  <p style={{ color: 'white' }} className={styles.textTipo}>{data?.editNegocioVDos?.tipo === 'Mecanico' ? 'Mecanico Automotriz' : data?.tipo === 'Almacen' ? 'Almacen de Repuestos' : 'Taller Automotriz'}</p>
                </div>
              </div>
            </div>
            {/* <ButtonsHeader data={data} /> */}
          </Link>
        </>
        : session?.user?.name
          ?
          <>
            <h2 style={{ textAlign: 'center' }} className={styles.titleAccess}>Confirma tu correo, con este ingresaras a tu perfil</h2>

            <div style={{ display: 'flex', margin: '32px auto 64px auto', flexDirection: 'column', gap: '32px', width: '300px', padding: '16px', borderRadius: '12px', backgroundColor: '#f1f1f1', border: '1px solid #d9d9d9' }}>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', }}>
                <Image
                  width={32}
                  height={32}
                  src={session?.user?.image}
                  priority={true}
                  loading="eager"
                  alt={`Usuario ${session?.user?.name}`}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ flex: 1, }}>
                  <h2 className={styles.textTitle} style={{ lineHeight: '1.3', color: '#373737', fontSize: '16px' }}>{session?.user?.name}</h2>
                  <p style={{ color: '#373737', fontWeight: '400' }} className={styles.textTipo}>{session?.user?.email}</p>
                </div>
              </div>
              <div >

                <Button onClick={handleSub} fullWidth size='sm' variant={ButtonVariant.secondary}>
                  Confirmar Cuenta
                </Button>
                <Button onClick={signOut} fullWidth size='sm' variant={ButtonVariant.terciary}>
                  Cambiar Cuenta
                </Button>
              </div>
            </div>

          </>
          :
          <>
            <h2 className={styles.titleAccess}>Registrate con tu cuenta de Google y listo!</h2>
            <form className={styles.containerForm}>
              {session && <p onClick={() => signOut()}>Cerrar Sesion</p>}

            </form>
          </>
      }
      {!session?.user.email &&
        <>
          <button onClick={() => signIn('google')} style={{ cursor: 'pointer', borderRadius: '4px', color: 'white', alignItems: 'center', display: 'flex', gap: '16px', marginTop: '16px', width: '100%', display: 'flex', justifyContent: 'center', height: '48px', padding: '8px 16px', boxSizing: 'border-box', border: 'none', backgroundColor: '#D0463B' }}>
            <ion-icon style={{ fontSize: '24px', color: 'white' }} name="logo-google"></ion-icon>
            Continuar con google
          </button>
          {/* <button onClick={() => signIn('facebook')} style={{ cursor: 'pointer', borderRadius: '4px', color: 'white', alignItems: 'center', display: 'flex', gap: '16px', width: '100%', display: 'flex', justifyContent: 'center', height: '48px', padding: '8px 16px', boxSizing: 'border-box', border: 'none', backgroundColor: '#3b5998' }}>
            <ion-icon style={{ fontSize: '24px', color: 'white' }} name="logo-facebook"></ion-icon>
            Continuar con facebook
          </button> */}
        </>
      }
      {loading &&
        <ModalLoading title={'Estamos creando tu perfil...'} />
      }
    </div>

  )
}