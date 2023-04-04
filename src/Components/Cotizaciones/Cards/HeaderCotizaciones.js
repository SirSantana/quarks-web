import { GET_AVATAR_USER } from '@/graphql/queries';
import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import styles from '@/styles/Cotizaciones.module.css'
import useAuth from '@/hooks/useAuth';

let preguntas = [
  '¿Cómo funciona?',
  '¿Problemas con el vendedor?',
  'Contactanos'
]
export default function HeaderCotizaciones({ id, setDataVendedor, setVisibleAllData, precio }) {
  const [getAvatar, { loading, data, error }] = useLazyQuery(GET_AVATAR_USER)
  // const [visibleModal, setVisibleModal] = useState(false)


  useEffect(() => {
    if (data) {
      setDataVendedor({ celular:data?.getAvatar?.celular,ciudad:data?.getAvatar?.ciudad,almacen:data?.getAvatar?.almacen, direccion:data?.getAvatar?.direccion})
    }
  }, [data])
  useEffect(() => {
    if (id) {
      getAvatar({ variables: { id: id } })
    }
  }, [id])
  console.log(data);
  return (
    <section onClick={() => setVisibleAllData(prev => prev ? false : true)} style={{ display: 'flex', cursor: 'pointer', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', }}>
          <div style={{ width: '40px', height: '40px', alignSelf: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', borderRadius: '50%', fontSize: '14px', backgroundColor: 'purple', color: 'white', marginRight: '16px' }}>
            {data?.getAvatar?.avatar
              ? <img alt={'imagenperfil'} src={data?.getAvatar?.avatar} style={{ objectFit: 'contain', height: '50px', width: '50px', backgroundColor: 'white', borderRadius: '25px' }} />
              : <h3 style={{ fontWeight: '400', fontSize: '18px' }}>{data?.getAvatar?.name.slice(0, 1)}</h3>
            }
          </div>
          <div>
            <h2 style={{ color: 'gray', fontSize: '16px', margin: 0, fontWeight: 400 }}>Almacen {data?.getAvatar?.almacen} </h2>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ color: '#373737', fontSize: '18px', margin: 0, fontWeight: 600 }}>$ {precio}  </h4>
              {/* <h6 style={{ color: 'green', margin: 0,marginLeft:'5px', fontWeight: 400, fontSize: '13px' }}>{envio&& 'Envio Gratis'}</h6> */}
            </div>
          </div>
        </div>
        <img alt={'dropdown'} src={'../../arrowDown.svg'} style={{ height: '22px', width: '22px', }} />
      </div>
      {/* <button onClick={()=> {setVisibleModal(true),window.scrollTo({ top: 0, behavior: 'smooth' });}} style={{  display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: '30px', border: 'none', borderRadius: '5px', fontSize: '16px', backgroundColor: 'inherit',  cursor: 'pointer' }}>
      <img alt={'menu'} src={'/menu.svg'}  />
      </button> */}
      {/* {visibleModal && <ModalMenu preguntas={preguntas} setVisibleModal={setVisibleModal} />} */}

    </section>


  )
}