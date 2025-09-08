import React, { useState } from "react";
import { User, MapPin, Globe, DollarSign, Save } from "lucide-react";
import styles from "@/styles/AsistantMechanic.module.css";
import Layout from "@/src/Components/Layout";
import LayoutV2 from "@/src/Components/LayoutV2";
import { useAuth } from "@/Context/AuthContext";

const ProfilePage = () => {
    const { user, loading: load, signOut } = useAuth();
  console.log(user);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    country: "",
    currency: "",
  });

  const countries = [
    { code: "AR", name: "Argentina" },
    { code: "BR", name: "Brasil" },
    { code: "CL", name: "Chile" },
    { code: "CO", name: "Colombia" },
    { code: "CR", name: "Costa Rica" },
    { code: "EC", name: "Ecuador" },
    { code: "GT", name: "Guatemala" },
    { code: "HN", name: "Honduras" },
    { code: "MX", name: "México" },
    { code: "NI", name: "Nicaragua" },
    { code: "PA", name: "Panamá" },
    { code: "PE", name: "Perú" },
    { code: "PY", name: "Paraguay" },
    { code: "SV", name: "El Salvador" },
    { code: "UY", name: "Uruguay" },
    { code: "VE", name: "Venezuela" },
    { code: "US", name: "Estados Unidos" },
    { code: "ES", name: "España" },
  ];

  const currencies = [
    { code: "USD", name: "Dólar estadounidense (USD)" },
    { code: "EUR", name: "Euro (EUR)" },
    { code: "COP", name: "Peso colombiano (COP)" },
    { code: "MXN", name: "Peso mexicano (MXN)" },
    { code: "ARS", name: "Peso argentino (ARS)" },
    { code: "BRL", name: "Real brasileño (BRL)" },
    { code: "CLP", name: "Peso chileno (CLP)" },
    { code: "PEN", name: "Sol peruano (PEN)" },
    { code: "UYU", name: "Peso uruguayo (UYU)" },
    { code: "VES", name: "Bolívar venezolano (VES)" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Perfil actualizado:", formData);
    alert("Perfil actualizado exitosamente");
  };

  return (
    <LayoutV2>
    <div className={styles.mainContent}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.iconWrapper}>
            <User size={32} color="#ffffff" />
          </div>
          <h1 className={styles.title}>Mi Perfil</h1>
          <p className={styles.subtitle}>
            Actualiza tu información personal y preferencias de ubicación
          </p>
        </header>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                <User size={16} />
                Nombre completo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Ingresa tu nombre completo"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="country" className={styles.label}>
                <Globe size={16} />
                País *
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={styles.select}
                required
              >
                <option value="">Selecciona tu país</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="city" className={styles.label}>
                <MapPin size={16} />
                Ciudad *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Ingresa tu ciudad"
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="currency" className={styles.label}>
              <DollarSign size={16} />
              Moneda preferida *
            </label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className={styles.select}
              required
            >
              <option value="">Selecciona tu moneda</option>
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className={`${styles.button} ${styles.buttonHover}`}>
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
    </LayoutV2>
  );
};

export default ProfilePage;
