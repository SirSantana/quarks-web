import { useState } from 'react';
import Image from 'next/image';

const Avatar = ({
  src,
  alt = 'User Avatar',
  size = 'md',
  borderColor = '#f1f1f1',
  borderWidth = 0,
  defaultImage = '/taller-ilustration.wepb',
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
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{ borderRadius: '50%', objectFit: 'cover', width:size === 'sm' ? '40px' : '48px', height:size === 'sm' ? '40px' : '48px',  border:'1px solid #f1f1f1' }}
          onLoadingComplete={() => setIsImageLoaded(true)}
          loading='lazy'
        />
      ) : (
           <img
          src={'/taller-ilustration.webp'}
          alt={alt}
          style={{ borderRadius: '50%', objectFit: 'cover', width:'48px', height:'48px',  border:'1px solid #f1f1f1' }}
          onLoadingComplete={() => setIsImageLoaded(true)}
          loading='lazy'
        />
      )}
    </>

  );
};

export default Avatar;