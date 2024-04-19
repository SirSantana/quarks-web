
import { CHECK_VERIFY_USERNAME } from '@/graphql/queries'
import styles from '@/styles/Faq.module.css'
import { useLazyQuery } from '@apollo/client'
import Image from 'next/image'
import Button, { ButtonVariant } from '../Button/Button'
import Input from '../Input/Input'
import { useEffect } from 'react'


export default function VerifyUsername({ setPage, setForm, form,setDataImportante, dataImportante, router }) {
  const [verifyAccountCheck, { loading, data, error }] = useLazyQuery(CHECK_VERIFY_USERNAME)
 
  const handleChange = (e) => {
    setForm({ ...form, nombre:e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''), userName: e.target.value, checked: false, pageCheck:1})
    
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.userName?.replace(/\s/g, '').length >= 3) {
      setForm({...form, checked:true, nombre:form.nombre.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim()})
      verifyAccountCheck({ variables: { userName: form.userName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim() } })
    }
  }
  let changePage =()=>{
    router.push(`/signup?page=2`)
  }
  useEffect(()=>{
    if (!data?.verifyAccountCheck && form.checked) {
      setPage(2)
      changePage()
      setForm({ ...form, pageCheck: 2, checked:false  })
      setDataImportante({...dataImportante, nombre:form.nombre, userName:form.userName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim().replace(/\s/g, '-').toLowerCase()})
    }
  },[data])
  console.log(form);
  return (
    <div style={{ margin: '32px 0 64px 0', display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'flex-end', boxSizing: 'border-box', maxWidth: '600px', width: '100%' }}>
      {/* <p style={{ fontSize: '14px', color: '#4EDD76', fontWeight: '600', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><ion-icon style={{ color: '#4EDD76', fontSize: '24px' }} name="ribbon-outline"></ion-icon>+50 talleres y almacenes registrados</p> */}
      <h2 className={styles.titleAccess}>{form.tipo === 'Taller' ? 'Empecemos por el nombre de tu taller!' : 'Empecemos por tu nombre!'}</h2>
      <p style={{ margin: '8px 0 32px 0', color: '#5c5c5c' }}>
        Este sera el nombre con el que seras conocido por los demas.
      </p>
      <form >
        <div style={{ marginBottom: '64px' }} className={styles.containerInputAcceso}>
          <Input type={'text'} name={'nombre'} value={form.nombre} placeholder={'Tu nombre / Nombre del Taller'} onChange={handleChange} error={data?.verifyAccountCheck && 'Este nombre ya está en uso, prueba otro nombre'} required />
        </div>

        {form.userName?.length >= 3 &&!loading && (
          <Button onClick={handleSubmit} size='lg' style={{ backgroundColor: loading ? '#d9d9d9' : '#373737' }} variant={ButtonVariant.secondary}>
            {loading ? <Image src="/loader.svg" alt="loader" width={24} height={24} /> : 'Siguiente'}
          </Button>
        )}
        {loading && (
          <Button size='lg' variant={ButtonVariant.secondary}>
            <Image src="/loader.svg" alt="loader" width={24} height={24} />
          </Button>
        )}

      </form>
    </div>
  )
}