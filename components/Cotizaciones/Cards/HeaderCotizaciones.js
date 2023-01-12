import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router';
import { useEffect } from 'react'
import { GET_AVATAR_USER } from '../../../graphql/queries'
import styles from '../../../styles/Talleres.module.css'
import { Loader } from '../../../utils/loader';

export default function HeaderCotizaciones({ id }) {
  const router = useRouter()
  const [getAvatar, { loading, data, error }] = useLazyQuery(GET_AVATAR_USER)
  useEffect(() => {
    if (id) {
      getAvatar({ variables: { id: id } })
    }
  }, [id])
  if(loading){
    return<Loader/>
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
      <div onClick={()=>router.push(`/vendedor/perfil/${id}`)} style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', borderRadius: '50%', fontSize: '14px', backgroundColor: 'purple', color: 'white', cursor: 'pointer' }}>
        {data?.getAvatar?.avatar
          ? <img alt={'imagenperfil'} src={data?.getAvatar?.avatar} style={{ objectFit: 'contain', height: '50px', width: '50px', backgroundColor: 'white', borderRadius: '25px' }} />
          : <h2 className={styles.letraInicial}>V</h2>
        }
      </div>
      <div>
        <h3 style={{ color: '#1b333d', fontSize: '18px', margin: 0, fontWeight: 600 }}>{data?.getAvatar?.name}</h3>
        <h3 style={{ color: 'gray', fontSize: '14px', margin: 0, fontWeight: 400 }}>Vendedor</h3>

      </div>
    </div>


  )
}