
import { CHECK_VERIFY_USERNAME } from '@/graphql/queries'
import Layout from '@/src/Components/Layout'
import styles from '@/styles/Faq.module.css'
import { useLazyQuery, useQuery } from '@apollo/client'
import Image from 'next/image'
import { useState } from 'react'


export default function VerifyUsername({ setPage, setForm, form }) {
  const [verifyAccountCheck, { loading, data, error }] = useLazyQuery(CHECK_VERIFY_USERNAME)
  // const [form, setForm] = useState(initialForm)
  const handleSubmit = (e) => {
    e.preventDefault()
    if(data?.verifyAccountCheck || form?.checked){
      setPage(1)
      setForm({...form, checked:true})      
    }
  }
  const handleChange = (e) => {
    // setForm({ ...form, [e.target.name]: e.target.value.replace(/\s/g, '-').replace(/[^a-zA-Z0-9-]/g, ''), checked:false })
    setForm({ ...form, [e.target.name]: e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''), checked:false })
    
    if (e.target.value.replace(/\s/g, '').length >= 3) {
      verifyAccountCheck({ variables: { username: e.target.value.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim() } })
    }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'flex-end', boxSizing: 'border-box' }}>
      <p style={{ fontSize: '14px', color: '#4EDD76', fontWeight: '600', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}><ion-icon style={{ color: '#4EDD76', fontSize: '24px' }} name="ribbon-outline"></ion-icon>+50 talleres y almacenes registrados</p>
      <h1 className={styles.titleAccess}>Empecemos por el nombre de tu negocio!</h1>
      <p style={{ margin: '8px 0 32px 0', color: '#5c5c5c' }}>
        Crea tú perfil en linea personalizado <span style={{ fontWeight: '700' }}>gratis</span> por tiempo limitado.
      </p>
      <form onSubmit={handleSubmit}>
        <div className={styles.containerInputAcceso}>
          <input
            onChange={handleChange}
            name="username"
            required
            type="text"
            placeholder="Nombre del Negocio"
            value={form.username}
            className={styles.inputAcceso}
          />
          {loading && <Image src="/loader.svg" alt="loader" width={24} height={24} />}
          {((data?.verifyAccountCheck && form.username.length >= 3)|| form?.checked) && (
            <ion-icon
              style={{ color: '#4EDD76', fontSize: '20px' }}
              name="checkmark-circle"
            ></ion-icon>
          )}
          {data?.verifyAccountCheck === false && (
            <ion-icon
              onClick={()=> setForm({...form, username:'', checked:false})}
              style={{ color: '#5c5c5c', fontSize: '20px', alignSelf:'center' }}
              name="close"
            ></ion-icon>
          )}
        </div>
        {!data?.verifyAccountCheck && <div style={{ height: '82px' }}></div>}
        {(data?.verifyAccountCheck || form?.checked) && (
          <button type="submit" className={styles.button2}>
            Crear perfil
          </button>
        )}
        {data?.verifyAccountCheck === false && (
          <p
            style={{
              color: '#f50057',
              fontSize: '14px',
              marginTop: '16px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <ion-icon style={{ fontSize: '20px' }} name="alert-circle"></ion-icon>
            Este nombre ya está en uso, prueba otro nombre
          </p>
        )}
      </form>
    </div>
  )
}