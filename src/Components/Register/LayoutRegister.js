import { useEffect, useState } from "react";
import Button, { ButtonVariant } from "../Button/Button";
import Layout from "../Layout";
import styles from "@/styles/Registro.module.css"; // Importamos los estilos
import { useRouter } from "next/router";

export default function LayoutRegister({ children, handleChangePage }) {
  const [step, setStep] = useState(1);
  const router = useRouter();
  useEffect(() => {
    // Cargar el paso actual desde localStorage si existe
    const savedStep = localStorage.getItem("registroStep");
    if (savedStep) {
      setStep(parseInt(savedStep));
    }
  }, []);
  console.log(router);

  const handleNext = () => {
     // Guardar el paso actual
    let res = handleChangePage(); // Guardar los datos del formulario

    if(res === 'Error'){
      return
    }
    const nextStep = step + 1;
    setStep(nextStep);
    localStorage.setItem("registroStep", nextStep);
    // Cambiar de URL según el paso actual
    if (nextStep === 1) {
      router.push(`/registro/${router.query.id}/mapa-direccion`);
    }
    else if (nextStep === 2) {
      router.push(`/registro/${router.query.id}/pais-ciudad`);
    }
    else if (nextStep === 3) {
      router.push(`/registro/${router.query.id}/mapa-direccion`);
    } else if (nextStep === 4) {
      router.push(`/registro/${router.query.id}/servicios-ofrecidos`);
    } else if (nextStep === 5) {
      router.push(`/registro/${router.query.id}/informacion`);
    } else {
      router.push("/registro/completado");
    }}

  const handleBack = () => {
    if (step > 1) {
      const prevStep = step - 1;
      setStep(prevStep);
      localStorage.setItem("registroStep", prevStep);
      if (prevStep === 1) {
        router.push(`/registro/${router.query.id}/tipo-servicio`);
      }else if (prevStep === 2) {
        router.push(`/registro/${router.query.id}/pais-ciudad`);
      }
       else if (prevStep === 3) {
        router.push(`/registro/${router.query.id}/mapa-direccion`);
      } else if (prevStep === 4) {
        router.push(`/registro/${router.query.id}/servicios-ofrecidos`);
      } else if (prevStep === 5) {
        router.push(`/registro/${router.query.id}/informacion`);  }
    };
  }

    let progress = (step / 5) * 100;
    return (
      <>
        <header>

        </header>
        <Layout visibleNavbar={false} footer={false}>
          {children}
        </Layout>
        <footer className={styles.footer}>
          {/* Barra de progreso */}
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Botones */}
          <div className={styles.footerContent}>
            <Button variant={ButtonVariant.gray} style={{ margin: '0' }} onClick={handleBack}>
              Atrás
            </Button>
            <Button variant={ButtonVariant.primary} style={{ margin: '0' }} onClick={handleNext}>
              Siguiente
            </Button>
          </div>
        </footer>
      </>
    )
  }