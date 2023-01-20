import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { GET_AVATAR_USER } from '../../../graphql/queries'
import styles from '../../../styles/Talleres.module.css'
import { Loader } from '../../../utils/loader';
import ModalMenu from '../../../utils/modalMenu';

let preguntas = [
  '¿Cómo funciona?',
  '¿Problemas con el vendedor?',
  'Contactanos'
]
export default function HeaderCotizaciones({ id, setCiudad, setCelularVendedor }) {
  const router = useRouter()
  const [getAvatar, { loading, data, error }] = useLazyQuery(GET_AVATAR_USER)
  const [visibleModal, setVisibleModal] = useState(false)
  useEffect(() => {
    if (id) {
      getAvatar({ variables: { id: id } })
    }
  }, [id])
  if(loading){
    return<Loader/>
  }
  setCiudad(data?.getAvatar?.ciudad)
  setCelularVendedor(data?.getAvatar?.celular)
  return (
    <section style={{ display: 'flex', flexDirection: 'row',justifyContent:'space-between', alignItems:'center'}}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
      <div onClick={()=>router.push(`/vendedor/perfil/${id}`)} style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', borderRadius: '50%', fontSize: '14px', backgroundColor: 'purple', color: 'white', cursor: 'pointer' }}>
        {data?.getAvatar?.avatar
          ? <img alt={'imagenperfil'} src={data?.getAvatar?.avatar} style={{ objectFit: 'contain', height: '50px', width: '50px', backgroundColor: 'white', borderRadius: '25px' }} />
          : <h2 className={styles.letraInicial}>V</h2>
        }
      </div>
      <div>
        <h2 style={{ color: '#1b333d', fontSize: '18px', margin: 0, fontWeight: 600 }}>{data?.getAvatar?.name} </h2>
        <h4 style={{ color: 'gray', fontSize: '14px', margin: 0, fontWeight: 400 }}>Vendedor en {data?.getAvatar.ciudad}</h4>
      </div>
      </div>
      <button onClick={()=> {setVisibleModal(true),window.scrollTo({ top: 0, behavior: 'smooth' });}} style={{  display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: '30px', border: 'none', borderRadius: '5px', fontSize: '16px', backgroundColor: 'inherit',  cursor: 'pointer' }}>
      <img alt={'menu'} src={'/menu.svg'}  />
      </button>
      {visibleModal && <ModalMenu preguntas={preguntas} setVisibleModal={setVisibleModal}/>}

    </section>


  )
}