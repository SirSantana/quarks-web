import Button, { ButtonVariant } from "../Button/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/V3.module.css";
import Icon, { IconCatalog } from "../Icon/Icon";
import InputBuscador from "./InputBuscador";

export default function BuscadorRepuestos({ size = "large" }) {
  const [service, setService] = useState({ new: false, value: "" });
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!service.value) {
      return alert("Completa el campo de búsqueda");
    }
    if (service.new) {
      router.push(`/repuesto/${service.value.replaceAll(" ", "-")}`);
    } else {
      router.push(`/repuesto/${service.value.replaceAll(" ", "-")}`);
    }
    // router.push(`/servicios/${service.value.replaceAll(' ', '-')}`)
    // router.push(`/explore/talleres/carro/${service.value.replaceAll(' ', '-')}/bogota`)
    // router.push(`/servicios/${service}`)
  };

  const handleChange = (e) => {
    console.log(e);

    if (e?.index) {
      setInputValue(e?.value.toLowerCase());
      setService({ new: false, value: e?.index.toLowerCase() });

      // router.push(`/servicios/${e.index}`)
    } else {
      setInputValue(e?.value.toLowerCase());
      setService({ new: true, value: e?.value.toLowerCase() });
      // router.push(`/catalogo-pastas-freno?busqueda=${e.value}`)
    }
  };
  const onInputChange = (inputValue, event) => {
    if (event.action === "input-change") {
      setService({ new: true, value: inputValue.toLowerCase() });
      setInputValue(inputValue.toLowerCase());
    }
  };

  return (
    <search style={{ width: "100%" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 0,
        }}
        className={styles.formV3Small}
      >
        <div style={{ width: "100%", margin: 0, padding: 0}}>
          <InputBuscador
            handleChange={handleChange}
            inputValue={service.new ? service.value : inputValue}
            onInputChange={onInputChange}
          />
        </div>
        <Button
          className={"desktopButton"}
          style={{ margin: "0", backgroundColor: "#407BFF" }}
        >
          Buscar
        </Button>
        <Button
          className={"mobileButton"}
          style={{ margin: "0", padding: "12px", backgroundColor: "#407BFF" }}
          icon={IconCatalog.searchOutline}
          iconColor="white"
        />
      </form>
    </search>
  );
}
