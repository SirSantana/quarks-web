import { CREATE_PREGUNTA } from '@/graphql/mutations'
import styles from '@/styles/Main.module.css'
import { handleFileUpload } from '@/utils/base64'
import  { ModalSuccessfull,ModalError, ModalLoading } from '@/utils/Modales'
import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'

const marcas = ['Mazda', 'Chevrolet', 'Renault', 'Ford']

const initialForm = {
  celular: '',
  marca: 'Chevrolet',
  referencia: '',
  titulo: '',
  imagen: ''
}

export default function Main() {
  const [visibleMarca, setVisibleMarca] = useState(false)
  const [marca, setMarca] = useState('Chevrolet')
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [form, setForm] = useState(initialForm)
  const [createPregunta, { data, error, loading }] = useMutation(CREATE_PREGUNTA)
  const [visibleCotizado, setVisibleCotizado] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.celular.length !== 10 ) {
      return alert('Tu numero de celular debe tener 10 digitos')
    }
    createPregunta({ variables: form })
    setForm(initialForm)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const cancelImage = () => {
    setForm({ ...form, imagen: '' })
    setSelectedFile()
    setPreview()
  }

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(e.target.files[0])
    handleFileUpload(e).then(res => setForm({ ...form, imagen: res }))
  }
  useEffect(() => {
    if (data) {
      setVisibleCotizado(true)
      setTimeout(() => {
        setVisibleCotizado(false)
      }, 2000)
    }
  }, [data])
  return (
    <section className={styles.home} >
      <div className={styles.secContainer}>
        <div className={styles.homeText} style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10%' }}>
          <h1 className={styles.title}>
            Cotiza tus <b style={{ color: '#5B0221' }}>repuestos</b> con vendedores de toda Colombia!
          </h1>
          {/* <img src='./Croquis2.png' style={{width:'30%', height:'250px'}}/> */}
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.homeCard}>
        <div onClick={() => setVisibleMarca(true)} className={styles.locationDivMarca}>
          <label htmlFor='marca' className={styles.label}>Marca</label>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <img src={`./${marca}.png`} style={{ height: '40px', width: '40px' }} />
            <img src='/arrowDown.svg' style={{ height: '25px', width: '25px' }} />
          </div>
        </div>

        <div className={styles.locationDivRef}>
          <label htmlFor='referencia' className={styles.label}>Referencia / Cilindraje / Modelo</label>
          <input required id="referencia" className={styles.input} type='text' onChange={handleChange} name='referencia' placeholder='Corsa 1.4 2004' value={form.referencia} />
        </div>

        <div className={styles.locationDivRep}>
          <label htmlFor='repuestos' className={styles.label}>Repuestos</label>
          <input required id='repuestos' className={styles.input} type='text' onChange={handleChange} name='titulo' placeholder='Bomba de agua, balancines...' value={form.titulo}/>
        </div>

        <div className={styles.locationDivCel}>
          <label htmlFor='celular' className={styles.label}>Tu celular</label>
          <input required id='celular' className={styles.input} type='number' onChange={handleChange} name='celular' placeholder='3214560210' value={form.celular}/>
        </div>
        <div className={styles.locationImg}>
          <input  id='image' style={{ display: 'none', height: 0, }} onChange={onSelectFile} type='file' accept="image/png, image/gif, image/jpeg" />
          <label className={styles.labelImage} htmlFor='image'>
            {selectedFile ?
              <div className={styles.containerImageSelected}>
                <img src={preview} style={{ width: '50px', height: '50px' }} />
                <img onClick={cancelImage} src={'/trash.svg'} style={{ width: '25px', height: '25px', cursor:'pointer' }} />
              </div >
              : <img src='/image.svg' style={{ width: '25px', height: '25px',cursor:'pointer' }} />}

          </label>
        </div>

        <input type={'submit'} className={styles.button} value='Cotizar' />


      </form>

      {visibleMarca &&
        <div onClick={() => setVisibleMarca(visibleMarca ? false : true)} className={styles.modal}>
          <div className={styles.modalContent}>
            {marcas.map(el => (<img key={el} onClick={() => {setMarca(el), setForm({...form, marca:el})}} style={{ height: '40px', width: '40px', cursor: 'pointer' }} src={`./${el}.png`} />))}
          </div>
        </div>
      }
      {visibleCotizado &&
        <ModalSuccessfull title={'Tu cotización ha sido enviada!'} subtitle={'Te avisaremos por whatsapp las cotizaciones'}/>
      }
      {loading &&
        <ModalLoading title={'Enviando Cotizacion ... '}/>
      }
      {error &&
        <ModalError title={'Ha ocurrido un error'} subtitle={error?.message}/>
      }


    </section>
  )
}