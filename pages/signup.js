
import useAuth from '@/hooks/useAuth'
import Layout from '@/src/Components/Layout'
import AddDatosImportantes from '@/src/Components/Register/AddDatosImportantes'
import AddEmailAndPassword from '@/src/Components/Register/AddEmailAndPassword'
import AddServicios from '@/src/Components/Register/AddServicios'
import VerifyUsername from '@/src/Components/Register/VerifyUsername'
import styles from '@/styles/Faq.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

let initialForm = {
  username: '',
  email: '',
  password: '',
  checked: false
}
let secondForm = {
  ciudad: '',
  pais: '',
  whatsapp: '',
  telefono: '',
  direccion: '',
  facebook: '',
  instagram: '',
  horario: 'Lun 08:00 AM - 6:00 PM,Mar 08:00 AM - 6:00 PM,Mié 08:00 AM - 6:00 PM,Jue 08:00 AM - 6:00 PM,Vie 08:00 AM - 6:00 PM,Sáb 08:00 AM - 3:00 PM,Dom Cerrado',
  fotoperfil: '',
  categorias: [],
  username:'',
  id:''
}
export default function SignUp() {
  const [page, setPage] = useState(0)
  const [form, setForm] = useState(initialForm)
  const { user } = useAuth()
  const [categorias, setCategorias] = useState([])
  const [addCategory, setAddCategory] = useState('')
  const [otherCategorias, setOtherCategorias] = useState([])
  const [dataImportante, setDataImportante] = useState(secondForm)
  const router = useRouter()
  useEffect(() => {
    if (page === 3) {
      setDataImportante({ ...dataImportante, categorias: categorias.concat(otherCategorias) })
    }
  }, [page])
  useEffect(()=>{
    if(user?.categorias){
       router.replace(`/${user.userName}`)
    }
    if(!user?.categorias && user){
      setPage(2)
    }
  },[user])

  return (
    <Layout title={'Obten acceso temprano'} visibleNavbar={false}>
      <div  className={styles.containerAcceso} >

        {
          <>
            <img src="./Card-almacen.png" className={styles.imgCard} alt="Crea tu perfil" />
            {page === 0 && <VerifyUsername setPage={setPage} setForm={setForm} form={form} />}
            {page === 1 && <AddEmailAndPassword setForm={setForm} form={form} setPage={setPage} />}
            {page === 2 && <AddServicios setPage={setPage} setCategorias={setCategorias} categorias={categorias} setAddCategory={setAddCategory} addCategory={addCategory} otherCategorias={otherCategorias} setOtherCategorias={setOtherCategorias} />}
            {page === 3 && <AddDatosImportantes setPage={setPage} setDataImportante={setDataImportante} dataImportante={dataImportante} />}
          </>
        }
      </div>
    </Layout >
  )
}

