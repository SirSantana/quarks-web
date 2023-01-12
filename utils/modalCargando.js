import { useEffect, useState } from 'react'
import styles from '../styles/Cotizar.module.css'
import { Loader } from './loader'


export default function ModalCargando({ mensaje, description }) {
    const [tiempoLoading, setTiempoLoading] = useState(0)
    const [messageTime, setMessageTime] = useState({ message: '', description: '' })

    let time = setTimeout(() => (
        setTiempoLoading(tiempoLoading + 1)
    ), 1000)


    useEffect(() => {
        if (tiempoLoading > 5) {
            clearTimeout(time)
            setMessageTime({ ...messageTime, message: 'Esta tardando mas de lo normal', description: 'Por favor revisa tu conexion' })
        }
    }, [tiempoLoading])
    return (
        <div className={styles.darkBG}>
            <div className={styles.centered}>

                <div className={styles.modal}>

                    <Loader />
                    <h2 style={{ color: '#1b333d', fontSize: '18px', margin: 0, textAlign: 'center' }}>{messageTime.message ? messageTime.message : mensaje}</h2>
                    <h4 style={{ textAlign: 'center' }} className={styles.subtitle}>{messageTime.description ? messageTime.description : description} </h4>

                </div>
            </div>

        </div>
    )
}