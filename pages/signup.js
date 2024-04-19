
import Layout from '@/src/Components/Layout'
import AddDatosImportantes from '@/src/Components/Register/AddDatosImportantes'
import AddEmailAndPassword from '@/src/Components/Register/AddEmailAndPassword'
import AddServicios from '@/src/Components/Register/AddServicios'
import CreateAccountHome from '@/src/Components/Register/CreateAccountHome'
import ProgressBar from '@/src/Components/Register/ProgressBar'
import VerifyUsername from '@/src/Components/Register/VerifyUsername'
import TipoNegocio from '@/src/Components/Register/TipoNegocio'
import styles from '@/styles/Faq.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

let initialForm = {
  username: '',
  email: '',
  password: '',
  checked: false,
  pageCheck: 0
}
let secondForm = {
  direccion: '', // String
  ciudad: '',    // String
  pais: '',      // String
  whatsapp: '',  // String
  telefono: '',  // String
  horario: 'Lun 08:00 AM - 6:00 PM,Mar 08:00 AM - 6:00 PM,Mié 08:00 AM - 6:00 PM,Jue 08:00 AM - 6:00 PM,Vie 08:00 AM - 6:00 PM,Sáb 08:00 AM - 3:00 PM,Dom Cerrado',  // String
  fotoperfil: '',// String
  categorias: [],// [String]
  nombre: '',    // String
  email: '',     // String
  indicativo: '',// String
  tipo: '',      // String
  vehiculo: '',  // String
  coordenadas: [],// [String]
  userName: ''   // String
}
export default function SignUp() {
  const [page, setPage] = useState(-1)
  const [form, setForm] = useState(initialForm)
  const [categorias, setCategorias] = useState([])
  const [dataRegistro, setDataRegistro] = useState(null);
  const [dataImportante, setDataImportante] = useState(dataRegistro ? dataRegistro : secondForm)
  const router = useRouter()

  useEffect(() => {
    // Verificar si estamos en el navegador antes de acceder al localStorage
    if (typeof window !== 'undefined') {
      // Obtener el dato del localStorage
      const dataRegistroString = localStorage.getItem('dataRegistro');
      if (dataRegistroString) {
        // Parsear el dato si existe
        const dataRegistroParse = JSON.parse(dataRegistroString);
        setDataRegistro(dataRegistroParse);
      }
    }
  }, []);
  return (
    <Layout title={'Obten acceso temprano'} visibleNavbar={false}>
      {/* <button onClick={() => signIn('google')}>Iniciar sesion</button> */}

      {!router.query.page && !router?.query?.isCreated
        ?
        <CreateAccountHome setPage={setPage} router={router} />
        :
        <div className={styles.containerAcceso} >
          {!router.query?.isCreated && <ProgressBar page={page} setPage={setPage} form={form} router={router} />}
          {
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', margin: '0 auto', alignItems: 'center', height: '100%' }}>
              {/* <img src="./Card-almacen.png" className={styles.imgCard} alt="Crea tu perfil" /> */}
              {/* {page === 0 && <CreateAccountHome/>} */}
              {router.query.page == 0 && <TipoNegocio setPage={setPage} setDataImportante={setDataImportante} dataImportante={dataImportante} router={router} />}
              {router.query.page == 1 && <VerifyUsername setPage={setPage} setForm={setForm} form={form} setDataImportante={setDataImportante} dataImportante={dataImportante} router={router} />}
              {router.query.page == 2 && <AddServicios setPage={setPage} setCategorias={setCategorias} categorias={categorias} setForm={setForm} form={form} setDataImportante={setDataImportante} dataImportante={dataImportante} router={router} />}
              {router.query.page == 3 && <AddDatosImportantes setPage={setPage} setDataImportante={setDataImportante} dataImportante={dataImportante} setForm={setForm} form={form} router={router} />}
              {(router.query.page == 4 || router?.query?.isCreated) && <AddEmailAndPassword setForm={setForm} form={form} setPage={setPage} dataImportante={dataImportante} router={router} />}

            </div>
          }
        </div>
      }

    </Layout >
  )
}

