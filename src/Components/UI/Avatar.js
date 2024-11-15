import { useState } from 'react';
import Image from 'next/image';

const Avatar = ({
  src,
  alt = 'User Avatar',
  size = 80,
  borderColor = '#ccc',
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
  console.log(src);

  return (
    <>
      {src ?
        <img
          src={src}
          alt={alt}
          style={{ borderRadius: '50%', objectFit: 'cover', width: '48px', height: '48px' }}
          onLoadingComplete={() => setIsImageLoaded(true)}
          loading='lazy'
        />
        :
        <img
          src={'/taller-ilustration.webp'}
          alt={alt}
          style={{ borderRadius: '50%', objectFit: 'cover', width: '48px', height: '48px' }}
          loading='lazy'
        />
      }
    </>

  );
};

export default Avatar;