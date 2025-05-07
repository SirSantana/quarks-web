import Input from "@/src/Components/Input/Input";
import SelectPhoneNumber from "@/src/Components/MenuSelects/SelectPhoneNumber";
import LayoutRegister from "@/src/Components/Register/LayoutRegister";
import styles from "@/styles/Registro.module.css";
import { useEffect, useState } from "react";

function formatearHorario(horarios) {
  const diasAbreviados = {
    Lunes: "Lun",
    Martes: "Mar",
    Miércoles: "Mié",
    Jueves: "Jue",
    Viernes: "Vie",
    Sábado: "Sáb",
    Domingo: "Dom",
  };

  return Object.entries(horarios)
    .map(([dia, { apertura, cierre, abierto }]) => {
      if (!abierto) return `${diasAbreviados[dia]} Cerrado`;
      return `${diasAbreviados[dia]} ${convertirHora(apertura)} - ${convertirHora(cierre)}`;
    })
    .join(", ");
}

function convertirHora(hora) {
  if (!hora) return "";
  const [hora24, minutos] = hora.split(":");
  const hora12 = ((hora24 % 12) || 12) + ":" + minutos;
  const amPm = hora24 >= 12 ? "PM" : "AM";
  return `${hora12} ${amPm}`;
}

export default function Informacion() {
  const horariosPorDefecto = {
    Lunes: { apertura: "08:00", cierre: "18:00", abierto: true },
    Martes: { apertura: "08:00", cierre: "18:00", abierto: true },
    Miércoles: { apertura: "08:00", cierre: "18:00", abierto: true },
    Jueves: { apertura: "08:00", cierre: "18:00", abierto: true },
    Viernes: { apertura: "08:00", cierre: "18:00", abierto: true },
    Sábado: { apertura: "09:00", cierre: "15:00", abierto: true },
    Domingo: { apertura: "", cierre: "", abierto: false },
  };

  const [horarios, setHorarios] = useState(horariosPorDefecto);
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    whatsapp: "",
    email: "",
    lat: "",
    lng: "",
    pais: "Colombia",
    ciudad: "",
    tipo: "",
    categorias: [],
    indicativo: "+57",
    horario: formatearHorario(horariosPorDefecto),
    descuento: "10%",
    fotoperfil: "",
  });

  // Cargar datos de localStorage al inicio
  useEffect(() => {
    const savedData = localStorage.getItem("registroTaller");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
    }
  }, []);

  // Guardar en localStorage cada vez que formData cambie
  useEffect(() => {
    if (typeof window !== "undefined" && (formData.nombre.length > 1 || formData.whatsapp.length > 1)) {
      localStorage.setItem("registroTaller", JSON.stringify(formData));
    }
  }, [formData]);

  // Actualizar horarios en formData cuando cambian en el estado
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      horarios: formatearHorario(horarios),
    }));
  }, [horarios]);

  const diasSemana = Object.keys(horariosPorDefecto);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeHorario = (dia, campo, valor) => {
    setHorarios((prev) => ({
      ...prev,
      [dia]: { ...prev[dia], [campo]: valor },
    }));
  };

  const handleChangePage = (e) => {
    if (formData.horarios.length === 0) {
      alert("Por favor selecciona los horarios de servicio");
      return "Error";
    } else {
      localStorage.setItem("registroTaller", JSON.stringify(formData));
    }
  };

  return (
    <LayoutRegister handleChangePage={handleChangePage}>
      <div
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "16px",
          margin: "0 auto",
          maxWidth: "800px",
          marginBottom: "100px",
          marginTop: "64px",
        }}
      >
        <h1 style={{ textAlign: "start" }} className={styles.title}>
          Información Básica de tu Taller
        </h1>

        <div
          style={{
            maxWidth: "600px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            margin: "16px 0",
          }}
        >
          <label>Nombre de tu taller</label>
          <Input
            style={{ width: "100%" }}
            stylesInput={{ paddingLeft: "16px" }}
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            name="nombre"
          />

          <label style={{ marginTop: "32px" }}>Número de Whatsapp</label>
          <SelectPhoneNumber
            width={"120px"}
            handleChange={(e) => setFormData({ ...formData, indicativo: e.value })}
            handlePhoneNumber={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            form={formData}
            number={formData.whatsapp}
          />

          <label style={{ marginTop: "32px" }}>Horarios de Atención</label>
          {diasSemana.map((dia) => (
            <div key={dia} className={styles.containerHorarios}>
              <span style={{ width: "80px", color: "#6C788E" }}>{dia}:</span>
              <div className={styles.horariosInput}>
                <input
                  type="time"
                  value={horarios[dia].apertura}
                  onChange={(e) => handleChangeHorario(dia, "apertura", e.target.value)}
                  disabled={!horarios[dia].abierto}
                />
                <span>-</span>
                <input
                  type="time"
                  value={horarios[dia].cierre}
                  onChange={(e) => handleChangeHorario(dia, "cierre", e.target.value)}
                  disabled={!horarios[dia].abierto}
                />
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  checked={horarios[dia].abierto}
                  onChange={(e) => handleChangeHorario(dia, "abierto", e.target.checked)}
                />
                {horarios[dia].abierto ? "Abierto" : "Cerrado"}
              </label>
            </div>
          ))}
        </div>
      </div>
    </LayoutRegister>
  );
}
