import { handleFileUpload } from "@/utils/base64";
import imageCompression from 'browser-image-compression';
import { useEffect, useState } from "react";
import Icon, { IconCatalog } from "../Icon/Icon";


export default function AddFotoPerfil({ setDataImportante, dataImportante, setEditMode, editMode, fotoActual, setPrevImage, fotoRegister = false, error }) {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const onSelectFile = async (e) => {
    if (e.target?.files && e.target.files.length > 0) {
      // Se seleccionó un archivo
      const maxSizeInBytes = 2 * 1024 * 1024;

      if (e.target.files[0].size > maxSizeInBytes) {
        // El archivo excede el tamaño máximo permitido.
        alert('La imagen es demasiado grande. Por favor, selecciona una imagen más pequeña.');
        // Borra el valor del input para que el usuario pueda seleccionar otro archivo.
        e.target.value = null;
      } else {
        const options = {
          maxSizeMB: 1, // Tamaño máximo permitido en megabytes
          maxWidthOrHeight: 720, // Ancho o alto máximo permitido
        };
        const compressedFile = await imageCompression(e.target.files[0], options);
        setSelectedFile(compressedFile);
        handleFileUpload({ e: null, compressedFile: compressedFile }).then((res) => setDataImportante({ ...dataImportante, fotoperfil: res }));
      }
    } else {
      // No se seleccionó ningún archivo
      // Aquí puedes manejar este caso según tus necesidades
      console.log('No se seleccionó ningún archivo');
    }
  };

  const editModeChose = (e) => {
    if (setEditMode) {
      setEditMode(true)
    }
  }


  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
    if (setPrevImage) {
      setPrevImage(objectUrl)
    }
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])
  return (
    <label onClick={editModeChose} style={fotoRegister ? { display: 'flex', flexDirection: 'column', height: '160px', borderRadius: '50%', alignItems: 'center', justifyContent: 'center', border: '1px solid #d9d9d9', width: '160px', borderColor: error ? '#f50057' : '#d9d9d9' } : null}>
      <div style={{ alignItems: 'center', cursor: 'pointer', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <input id='image' style={{ display: 'none', }} onChange={onSelectFile} type='file' accept="image/png,image/jpeg" />
        {preview || fotoActual ?
          <img src={preview || fotoActual} style={{ width: '160px', height: '160px', objectFit:'cover' }} />
          :
          <>
            <Icon name={IconCatalog.storefrontOutline} style={{ fontSize: '48px', opacity: 0.5 }} />
            <p style={{ fontSize: '16px', fontWeight: '600', alignSelf: 'center', textAlign: 'center', color: '#5c5c5c' }}>Agregar Foto</p>
          </>
        }

      </div>


    </label>
  )
}