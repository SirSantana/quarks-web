import { useState } from 'react';
import Image from 'next/image';

const Avatar = ({
  src,
  alt = 'User Avatar',
  size = 80,
  borderColor = '#ccc',
  borderWidth = 0,
  defaultImage = '/default-avatar.png',
  showInitials = true,
  userName = 'User',
  backgroundColor = '#f0f0f0',
  textColor = '#333',
  fontSize = 20,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

  // Extrae las iniciales del nombre de usuario
  const getInitials = (name) => {
    const nameParts = name.split(' ');
    return nameParts.length === 1
      ? nameParts[0].charAt(0).toUpperCase()
      : `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
  };

  return (
    <>
      {/* Mostrar la imagen solo si no ha fallado la carga */}
      {src && !isImageError ? (
        <Image
          src={src}
          alt={alt}
          width={48}
          height={48}
          quality={100}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
          onLoadingComplete={() => setIsImageLoaded(true)}
          loading='lazy'
        />
      ) : (
        // Fallback a la imagen por defecto o iniciales
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          {showInitials && userName
            ? getInitials(userName) // Mostrar iniciales
            : <Image src={defaultImage} alt={alt} width={size} height={size} layout="fixed" loading='lazy' />}
        </div>
      )}

      {/* Mostrar un loader mientras la imagen está cargando */}
      {/* {!isImageLoaded && !isImageError && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>Loading...</span>
        </div>
      )} */}
    </>

  );
};

export default Avatar;