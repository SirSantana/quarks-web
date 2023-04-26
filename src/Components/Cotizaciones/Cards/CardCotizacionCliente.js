import { GET_AVATAR_USER } from '@/graphql/queries';
import useAuth from '@/hooks/useAuth'
import styles from '@/styles/Cotizaciones.module.css'
import { timeSince } from "@/utils/dateEs";
import Marcas from "@/utils/marcas";
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FormCotizar from '../FormCotizar';

let initialDataVendedor ={
  ciudad:'',
  direccion:'',
  almacen:'',
  celular:''
}

export default function CardCotizacionCliente({ el }) {
  const { user } = useAuth()
  const router = useRouter()
  const { id } = router?.query
  const { asPath } = router
  const [formCotizacion, setFormCotizacion] = useState(false)
  const [getAvatar, {data, error, loading}] = useLazyQuery(GET_AVATAR_USER)
  const [dataVendedor, setDataVendedor] = useState(initialDataVendedor)


  const handleCotizar=()=>{
    let seconds = Math.floor((new Date() - new Date(el?.fecha)) / 1000);
    let interval = seconds / 86400;
    if(el?.cotizaciones?.length>4){
      return alert('Esta cotizacion ya obtuve 5 cotizaciones, no se puede cotizar mas. ')
    }
    if(interval>1){
      return alert('Ya no puedes cotizar. Las preguntas con mas de 24 horas no puedes cotizarlas.')
    }
    if(id){
      return setFormCotizacion(true)
    }
  }
  const handleSendMessageVendedor = () => {
      let link = `quarks.com.co${asPath}`
      let url = `https://api.whatsapp.com/send?phone=57${3138562763}`;
      url += `&text=${encodeURI(`😁 Haz recibido una cotizacion! \n🚘 ${el?.titulo} \n✍️ Cotiza en el siguiente link: `+link)}&app_absent=0`
      window.open(url);
  }
  useEffect(() => {
    if (data) {
      setDataVendedor({ celular:data?.getAvatar?.celular,ciudad:data?.getAvatar?.ciudad,almacen:data?.getAvatar?.almacen, direccion:data?.getAvatar?.direccion})
    }
  }, [data])
  useEffect(() => {
    if (id) {
      getAvatar({ variables: { id: user?.id } })
    }
  }, [id])
  return (

    <div style={{ height: '100%' }} className={styles.containerCotizaciones2}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', alignItems: 'flex-end', marginBottom: '8px', }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
          {el?.imagen && <img alt={el?.titulo} src={el?.imagen} style={{ width: '100%', objectFit: 'contain', height: 'auto', maxHeight: '400px', marginBottom: '8px' }} />}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <div>
            <h1 className={styles.title2}>{el?.referencia}</h1>
            <h6 style={{ color: 'gray', margin: 0, fontWeight: 400, fontSize: '13px' }}>hace {timeSince(el?.fecha)}</h6>
          </div>
          <Marcas marca={el?.marca} />
        </div>
      </div>
      <h4 className={styles.subtitle}>{el?.titulo}</h4>
      {user?.role === 'Vendedor' || user?.role === 'Admin'? <button onClick={handleCotizar}  className={styles.button}>Cotizar</button>
        : <button className={styles.button}>Ver cotizaciones</button>
      }
      {user?.email === process.env.NEXT_PUBLIC_EMAIL && <button onClick={handleSendMessageVendedor}>Avisar vendedor</button>}

      {formCotizacion &&
          <FormCotizar setFormCotizacion={setFormCotizacion} celular={el?.celular} long={el?.cotizaciones?.length} dataVendedor={dataVendedor}/>
      }
    </div>

  )
}