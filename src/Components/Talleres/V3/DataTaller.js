import Image from "next/image";
import { useEffect, useState } from "react";
import styles from '@/styles/Faq.module.css'

export default function DataTaller({ data, mobile}) {
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
    <div  className={mobile?styles.containerDataTallerMob: styles.containerDataTaller} >
      <Image
        width={32}
        height={32}
        src={data?.fotoperfil}
        priority={true}
        loading="eager"
        alt={`Taller mecanico ${data?.nombre} Bogota`}
        style={{borderRadius:'50%', objectFit:'cover'}}
      />
      <div style={{width:'90%',}}>
        <h1 className={styles.textTitle} style={{lineHeight:'1.2', marginBottom:'4px', whiteSpace: isSticky ? 'nowrap' : 'normal', maxWidth: isSticky ? '90%' : 'none'}}>{data?.nombre}</h1>
        <h2 className={styles.textDireccion}>{data?.direccion}</h2>
        <p className={styles.textTipo}>{data?.tipo === 'Mecanico a Domicilio' ? 'Mecanico a Domicilio' : data?.tipo === 'Almacen' ? 'Almacen de Repuestos' : 'Taller Automotriz'}</p>
      </div>
    </div>
  );
}