import { CREATE_NEGOCIO_VDOS, CREATE_TALLER } from "@/graphql/mutations";
import AddFotoPerfil from "@/src/Components/Register/AddFotoPerfil";
import AddHorario from "@/src/Components/Register/AddHorario";
import { useMutation } from "@apollo/client";
import dynamic from "next/dynamic";
import { useState } from "react"

const MapDireccion = dynamic(() => import('@/src/Components/Register/MapDireccion'), { ssr: false });



let initialForm = {
  direccion: '', // String
  ciudad: '',    // String
  pais: '',      // String
  whatsapp: '',  // String
  telefono: '',  // String
  horario: 'Lun 08:00 AM - 6:00 PM,Mar 08:00 AM - 6:00 PM,Mié 08:00 AM - 6:00 PM,Jue 08:00 AM - 6:00 PM,Vie 08:00 AM - 6:00 PM,Sáb 08:00 AM - 3:00 PM,Dom Cerrado',  // String
  fotoperfil: '',// String
  categorias: [],// [String]
  nombre: '',    // String
  email: '',     // String
  indicativo: '+57',// String
  tipo: 'Taller',      // String
  vehiculo: 'Moto',  // String
  lat: '',
  lng: '',
  userName: ''   // String
}
export default function adminRegister() {
  let [form, setForm] = useState(initialForm)
  const [{ loading, error }, createTaller] = useMutation(CREATE_TALLER);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(form);

    setForm({ ...form, [name]: value });
  };

  const handleArrayChange = (e, fieldName) => {
    const values = e.target.value.split(',');
    setForm({ ...form, [fieldName]: values });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', form);
  };
  const handleMultiSelectChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);

    setForm({ ...form, categorias: [...form.categorias, options].flat() });
  };
  console.log(form);

  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '600px', margin: '0 auto', marginTop: '64px' }} onSubmit={handleSubmit}>
        <label>
          Dirección:
          <input
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
          />
        </label>

        <label>
          Ciudad:
          <input
            type="text"
            name="ciudad"
            value={form.ciudad}
            onChange={handleChange}
          />
        </label>

        <label>
          País:
          <input
            type="text"
            name="pais"
            value={form.pais}
            onChange={handleChange}
          />
        </label>

        <label>
          WhatsApp:
          <input
            type="text"
            name="whatsapp"
            value={form.whatsapp}
            onChange={handleChange}
          />
        </label>

        <label>
          Teléfono:
          <input
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />
        </label>

        <label>
          Horario:
          <AddHorario setDataImportante={setForm} dataImportante={form} />
        </label>

        <label>
          Foto de perfil:
         <AddFotoPerfil setDataImportante={setForm} dataImportante={form} />
        </label>

        <label>
          Categorías:
          <select
            name="categorias"
            multiple
            value={form.categorias}
            onChange={handleMultiSelectChange}
          >
            <option value="Automotriz">Automotriz</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Salud">Salud</option>
            <option value="Educación">Educación</option>
            <option value="Deportes">Deportes</option>
          </select>
        </label>

        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
        </label>


        <label>
          Tipo:
          <input
            type="text"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
          />
        </label>

        <label>
          Vehículo:
          <input
            type="text"
            name="vehiculo"
            value={form.vehiculo}
            onChange={handleChange}
          />
        </label>

        <label>Ubicacion</label>
        <MapDireccion setDataImportante={setForm} dataImportante={form} />


        <label>
          Nombre de usuario:
          <input
            type="text"
            name="userName"
            value={form.userName}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Enviar</button>
      </form>
    </div>
  )

}