export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  export const handleFileUpload = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    return base64
    // setForm({ ...form, imagen: base64 });
  };