// import { handleFileUpload } from "@/utils/base64";
// import imageCompression from 'browser-image-compression';
// import { useEffect, useState } from "react";
// import Icon, { IconCatalog } from "../Icon/Icon";
// import styles from '@/styles/Negocio.module.css'


// export default function AddFotoPerfil({ setDataImportante, dataImportante, setEditMode,  fotoActual=null, setPrevImage=null, fotoRegister = false, error }) {
//   const [selectedFile, setSelectedFile] = useState()
//   const [preview, setPreview] = useState()
//   const onSelectFile = async (e) => {
//     if (e.target?.files && e.target.files.length > 0) {
//       // Se seleccionó un archivo
//       const maxSizeInBytes = 2 * 1024 * 1024;

//       if (e.target.files[0].size > maxSizeInBytes) {
//         // El archivo excede el tamaño máximo permitido.
//         alert('La imagen es demasiado grande. Por favor, selecciona una imagen más pequeña.');
//         // Borra el valor del input para que el usuario pueda seleccionar otro archivo.
//         e.target.value = null;
//       } else {
//         const options = {
//           maxSizeMB: 1, // Tamaño máximo permitido en megabytes
//           maxWidthOrHeight: 720, // Ancho o alto máximo permitido
//         };
//         const compressedFile = await imageCompression(e.target.files[0], options);
//         setSelectedFile(compressedFile);
//         handleFileUpload({ e: null, compressedFile: compressedFile }).then((res) => setDataImportante({ ...dataImportante, fotoperfil: res }));
//       }
//     } else {
//       // No se seleccionó ningún archivo
//       // Aquí puedes manejar este caso según tus necesidades
//       console.log('No se seleccionó ningún archivo');
//     }
//   };

//   const editModeChose = (e) => {
//     if (setEditMode) {
//       setEditMode(true)
//     }
//   }


//   useEffect(() => {
//     if (!selectedFile) {
//       setPreview(undefined)
//       return
//     }
//     const objectUrl = URL.createObjectURL(selectedFile)
//     setPreview(objectUrl)
//     if (setPrevImage) {
//       setPrevImage(objectUrl)
//     }
//     return () => URL.revokeObjectURL(objectUrl)
//   }, [selectedFile])
//   return (
//     <label onClick={editModeChose} style={fotoRegister ? { display: 'flex', flexDirection: 'column', height: '160px', borderRadius: '50%', alignItems: 'center', justifyContent: 'center', border: '1px solid #d9d9d9', width: '160px', borderColor: error ? '#f50057' : '#d9d9d9' } : null}>
//       <div style={{ alignItems: 'center', cursor: 'pointer', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
//         <input id='image' style={{ display: 'none', }} onChange={onSelectFile} type='file' accept="image/png,image/jpeg" />
//         {preview || fotoActual ?
//           <img src={preview || fotoActual}className={styles.imgCardTaller} style={{  objectFit:'cover', aspectRatio:'14/9' }} />
//           :
//           <>
//             <Icon name={IconCatalog.storefrontOutline} style={{ fontSize: '48px', opacity: 0.5 }} />
//             <p style={{ fontSize: '16px', fontWeight: '600', alignSelf: 'center', textAlign: 'center', color: '#5c5c5c' }}>Agregar Foto</p>
//           </>
//         }

//       </div>


//     </label>
//   )
// }

import { useEffect, useState, useCallback } from "react";
import imageCompression from "browser-image-compression";
import { handleFileUpload } from "@/utils/base64";
import Icon, { IconCatalog } from "../Icon/Icon";
import styles from "@/styles/Registro.module.css";


export default function AddFotoPerfil({
  setDataImportante,
  dataImportante,
  setEditMode,
  fotoActual = null,
  setPrevImage = null,
  fotoRegister = false,
  error,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(fotoActual || null);
  const [hover, setHover] = useState(false); // Estado para mostrar el botón de editar

  const handleError = (message) => {
    console.error(message);
    // Aquí podrías agregar un mensaje en la UI en lugar de alertas
  };

  const onSelectFile = useCallback(async (e) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    const maxSizeInBytes = 2 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      handleError("La imagen es demasiado grande. Selecciona una imagen más pequeña.");
      e.target.value = null;
      return;
    }

    try {
      const options = { maxSizeMB: 1, maxWidthOrHeight: 720 };
      const compressedFile = await imageCompression(file, options);
      setSelectedFile(compressedFile);

      const base64Image = await handleFileUpload({ e: null, compressedFile });
      setDataImportante((prev) => ({ ...prev, fotoperfil: base64Image }));
    } catch (error) {
      handleError("Error al procesar la imagen.");
    }
  }, [setDataImportante]);

  useEffect(() => {
    if (!selectedFile) return;

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setPrevImage?.(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, setPrevImage]);

  return (
    <label
      onClick={() => setEditMode?.(true)}
      className={`${styles.fotoContainer} ${fotoRegister ? styles.fotoRegister : ""}`}
      style={fotoRegister ? { borderColor: error ? "#f50057" : "#d9d9d9" } : {}}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <input id="image" type="file" accept="image/png,image/jpeg" hidden onChange={onSelectFile} />

      {preview ? (
        <div className={styles.imageWrapper}>
          <img src={preview} className={styles.imgPerfil} alt="Foto de perfil" />
          {hover && (
            <div className={styles.editOverlay}>
              {/* <Icon name={IconCatalog.camera} className={styles.editIcon} /> */}
              <Icon name={IconCatalog.createOutline} className={styles.editIcon}  />
              <span>Cambiar Foto</span>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.placeholder}>
          <Icon name={IconCatalog.storefrontOutline} className={styles.icon} />
          <p className={styles.text}>Agregar Foto</p>
        </div>
      )}
    </label>
  );
}

AddFotoPerfil.defaultProps = {
  setEditMode: null,
  fotoActual: null,
  setPrevImage: null,
  fotoRegister: false,
  error: false,
};

