import Image from "next/image";
import { useEffect, useState } from "react";
import styles from '@/styles/Faq.module.css'

export default function DataTaller({ data, mobile, sizes }) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleSticky = () => {
      setIsSticky(window.scrollY > 0); // Cambia el estado a true cuando el usuario comienza a hacer scroll
    };

    window.addEventListener('scroll', handleSticky);

    return () => {
      window.removeEventListener('scroll', handleSticky);
    };
  }, []);

  return (
    <div className={styles.containerDataTaller} >
      <Image
        width={32}
        height={32}
        src={data?.fotoperfil}
        priority={true}
        loading="eager"
        alt={`Taller mecanico ${data?.nombre} Bogota`}
        className={sizes ? styles.imgFPerfilDataDesk : styles.imgFPerfilData}
      />
      <div style={{ width: '90%', }}>
        <h1 className={sizes ? styles.textTitleDesk : styles.textTitle} style={{ color: mobile ? 'white' : 'initial', whiteSpace: isSticky ? 'nowrap' : 'normal', maxWidth: isSticky ? '90%' : 'none', }}>{data?.nombre}</h1>
        <p style={{ color: mobile ? 'white' : 'initial' }} className={styles.textTipo}>{data?.tipo === 'Mecanico'?`Mecanico de ${data?.vehiculo}`: data?.tipo === 'Mecanico a Domicilio' ? 'Mecanico a Domicilio' : data?.tipo === 'Almacen' ? 'Almacen de Repuestos' : 'Taller Automotriz'}</p>
        <h2 style={{ color: mobile ? 'white' : 'initial', }} className={styles.textDireccion}>{data?.direccion}</h2>

      </div>
    </div>
  );
}