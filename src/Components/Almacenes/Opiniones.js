
import styles from '@/styles/Almacenes.module.css'
import { useEffect, useState } from 'react'
import ModalCreateOpinion from './ModalCreateOpinion'
import Opinion from './Opinion'
import ModalLoginFacebook from './ModalLoginFacebook'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'


const Star = ({ index, stars, tamaño }) => {
  return (
    <img src={stars < index + 1 ? `../../star-outline.svg` : `../../star.svg`} style={{ height: `${tamaño}px`, width: `${tamaño}px` }} />
  )
}
let estrellas = [1, 2, 3, 4, 5]


export default function Opiniones({ almacen }) {
  const [visibleOpinion, setVisibleOpinion] = useState(false)
  const [stars, setStars] = useState(0)
  const [calificated, setCalificated] = useState(false)
  const [visibleModalLogin, setVisibleModalLogin] = useState(false)
  const {data:session}= useSession()
  const router = useRouter()

  const handlerLoginOpinion=(index)=>{
    setStars(index + 1)
    router.push(router?.asPath + '?modal-visible')
    if(session){
      return setVisibleOpinion(true)
    }else{
      return setVisibleModalLogin(true)
    }
  }
  
  useEffect(() => {
    if (!visibleOpinion) {
      setStars(0)
    }
  }, [visibleOpinion])
  useEffect(()=>{
    const modal = router.asPath.split('?')[1]
    if(modal && session){
      return setVisibleOpinion(true)
    }
  },[session])

  return (
    <>
      <div className={styles.containerInputOpinion}>
        <h6 className={styles.title3} style={{ margin: '4px 0', fontSize: '14px', color: '#373737', alignSelf: 'flex-start' }}>{calificated ? 'Ya compartiste tu opinion' : 'Comparte tu experiencia para ayudar a otros usuarios'} </h6>


        {/* <input placeholder='Agrega tu opinion del almacen' type={'text'} className={styles.input} /> */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {!calificated &&
            estrellas.map((el, index) => (
              <div id={index} style={{ marginRight: '8px', cursor: 'pointer' }} onClick={() => handlerLoginOpinion(index)} >
                <Star index={index} stars={stars} tamaño={'24'} />
              </div>
            ))}


        </div>

        {/* <input title='Opinar' onClick={() => setVisibleOpinion(true)} type={'submit'} className={styles.button2} /> */}
        {visibleOpinion &&
          <div className={styles.modal}>
            <ModalCreateOpinion setVisibleOpinion={setVisibleOpinion} setCalificated={setCalificated} setVisibleModalLogin={setVisibleModalLogin} />
          </div>}
        {visibleModalLogin &&
          <div className={styles.modal}>
            <ModalLoginFacebook  setVisibleModalLogin={setVisibleModalLogin}/>
          </div>
        }
        <Opinion almacen={almacen} setCalificated={setCalificated} />

      </div>
    </>

  )
}