

import { CREATE_VENDEDOR } from "@/graphql/mutations";
import Layout from "@/src/Components/Layout";
import styles from '@/styles/Vendedor.module.css'
import { ModalError, ModalSuccessfull } from "@/utils/Modales";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useEffect, useState } from "react";

let marcas = ['Chevrolet', 'Mazda', 'Ford', 'Renault']
const initialForm = {
  celular: '',
  marcas: [],
  name: '',
  almacen: '',
  direccion: '',
  email: '',
  ciudad: '',
  verified: false,
  password: ''
}
export default function Vendedor() {
  const [checkedState, setCheckedState] = useState(new Array(marcas.length).fill(false));
  const [form, setForm] = useState(initialForm)
  const [createVendedor, {loading, data, error}] = useMutation(CREATE_VENDEDOR)
  const [visibleSend, setVisibleSend] = useState(false)

  const handleChecked = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    )
    setCheckedState(updatedCheckedState);
    setForm({ ...form, marcas: updatedCheckedState })
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setForm(initialForm)
    createVendedor({variables:form})
    setCheckedState(new Array(marcas.length).fill(false))
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  useEffect(() => {
    if (data) {
      setVisibleSend(true)
      setTimeout(() => {
        setVisibleSend(false)
      }, 2000)
    }
  }, [data])
  return (
    <Layout title={'Vendedor | Quarks'}>
      <div className={styles.container}>
        <h1 className={styles.title}>Bienvenido vendedor</h1>
        <div className={styles.container2}>

          <div className={styles.containerBeneficios}>

            <div className={styles.beneficio}>
              <div className={styles.containerIcon}>
                <img src='/newspaper-sharp.svg' width={'24px'} height={'24px'} />
              </div>
              <p className={styles.subtitle}>Recibe día a día cotizaciones de clientes potenciales de todo Colombia.</p>
            </div>

            <div className={styles.beneficio}>
              <div className={styles.containerIcon}>
                <img src='/call-sharp.svg' width={'24px'} height={'24px'} />
              </div>
              <p className={styles.subtitle}>Cotiza fácil y sencillo desde tu celular.</p>
            </div>


            <div className={styles.beneficio}>
              <div className={styles.containerIcon}>
                <img src='/time-sharp.svg' width={'24px'} height={'24px'} />
              </div>
              <p className={styles.subtitle}>Nosotros verificaremos y activaremos tu cuenta en menos de 24 horas</p>
            </div>

            <div className={styles.beneficio}>
              <div className={styles.containerIcon}>
                <img src='/cash-sharp.svg' width={'24px'} height={'24px'} />
              </div>
              <p className={styles.subtitle}>Finaliza la compra por otros medios, sin comisiones.</p>
            </div>
            <Link href={'/vendedor/login'}>
              <button style={{ width: '100%', }} className={styles.button}>
                Ya eres vendedor? Inicia Sesion
              </button>
            </Link>

          </div>

          <form onSubmit={handleSubmit} className={styles.form}>

            <input value={form.name} required onChange={handleChange} placeholder="Tú nombre" name='name' id='name' className={styles.input} type={'text'} />
            <input value={form.almacen} required onChange={handleChange} placeholder="Nombre del Almacen" name='almacen' id='almacen' className={styles.input} type={'text'} />
            <input value={form.direccion} required onChange={handleChange} placeholder="Direccion de Contacto" id='direccion' name='direccion' className={styles.input} type={'text'} />
            <input value={form.ciudad} required onChange={handleChange} placeholder="Ciudad" id='ciudad' name='ciudad' className={styles.input} type={'text'} />
            <input value={form.celular} required onChange={handleChange} placeholder="Tu celular" id='celular' name='celular' className={styles.input} type={'text'} />
            <input value={form.email} required onChange={handleChange} placeholder="Tú email" id='email' name='email' className={styles.input} type={'email'} />
            <input value={form.password} required onChange={handleChange} placeholder="Crea tu contraseña" id='password' name='password' className={styles.input} type={'password'} />
            <label style={{margin:'8px 0'}} className={styles.subtitle}>¿Cuáles marcas comercializas?</label>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 0 }}>
              {marcas.map((el, index) => {
                return (
                  <div >
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={el}
                      value={el}
                      checked={checkedState[index]}
                      onChange={() => handleChecked(index)}
                      className={styles.checkInput}
                    />
                    <label style={{ margin: '0 0 0 8px' }} className={styles.subtitle} htmlFor={index}>{el}</label>
                  </div>
                );
              })}
            </div>
            <button className={styles.button}>
              Registrate
            </button>
          </form>
        </div>

      </div>
      {visibleSend &&
        <ModalSuccessfull title={'Tu solicitud ha sido enviada!'} subtitle={'Validaremos tu cuenta pronto'}/>
      }
      
      {error &&
        <ModalError title={'Ha ocurrido un error'} subtitle={error?.message}/>
      }
    </Layout>
  )
}