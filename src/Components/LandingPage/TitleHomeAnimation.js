import { useEffect, useState } from "react";
import styles2 from '@/styles/Landing.module.css';
import { useRouter } from "next/router";

export default function TitleHomeAnimation() {
  const router = useRouter();
  const [word, setWord] = useState('taller');
  const [isVisible, setIsVisible] = useState(true); 
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setWord((prevWord) => (prevWord === 'taller' ? 'mecánico' : 'taller'));
        setIsVisible(true); // Vuelve a mostrar la palabra con la nueva animación
      }, 500); // Debe coincidir con el tiempo de la animación de salida
    }, 3000); // Cambiar cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ margin: '0 0 48px 0' }}>
      <h1 className={styles2.title2} >
        {!router.query.id
          ? router.pathname === "/servicios/tecnicomecanica"
            ? 'Encuentra los mejores Centros de Diagnóstico Automotor (CDA) en Bogotá'
            : <>
                Encuentra el mejor <span className={`${styles2.transitionWord} ${isVisible ? styles2.fadeIn : styles2.fadeOut}`}>{word}</span> para tu carro
              </>
          : router.query.id === 'cda'
            ? 'Mejores CDA cerca a mi en Bogotá'
            : `Mejores talleres y mecanicos de ${router.query.id.replace(/-/g, ' ')} cerca a mi en Bogotá`
        }
      </h1>
    </div>
  );
}