import { useEffect, useState } from "react";
import Button, { ButtonVariant } from "../Button/Button";
import Layout from "../Layout";
import styles from "@/styles/Registro.module.css"; // Importamos los estilos
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useMutation } from "@apollo/client";
import { COMPLETE_REGISTRATION_NEGOCIO_VDOS } from "@/graphql/mutations";

export default function LayoutRegister({ children, handleChangePage }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const {data:session} = useSession()
  const [completeRegistrationNegocioVDos, {loading, data, error}]=useMutation(COMPLETE_REGISTRATION_NEGOCIO_VDOS,{
    onCompleted:(result)=>{
      router.push(`/${result?.completeRegistrationNegocioVDos.userName}`)
    }
  })
  console.log(loading, data, error);
  
  const steps = [
    "tipo-servicio",
    "pais-ciudad",
    "mapa-direccion",
    "servicios-ofrecidos",
    "informacion",
    "descuentos",
    "revisa-tu-perfil",
  ];

  // Cargar `step` desde localStorage en el primer render
  useEffect(() => {
    const savedStep = localStorage.getItem("registroStep");
    if (savedStep) {
      setStep(parseInt(savedStep));
    }
  }, []);

  // Función para navegar entre pasos
  const navigateToStep = (newStep) => {
    if (newStep < 1 || newStep > steps.length) return;
    
    setStep(newStep);
    localStorage.setItem("registroStep", newStep);
    console.log(step);
    
    router.push(`/registro/${router.query.id}/${steps[newStep - 1]}`);
  };

  // Función para avanzar de paso
  const handleNext = () => {
    if(step===7 && session?.user){
      const savedData = localStorage.getItem("registroTaller");
      const parsedData = JSON.parse(savedData);
      parsedData.email=session?.user.email
      console.log(savedData);
      
      completeRegistrationNegocioVDos({variables:parsedData})
    }
    if (handleChangePage() === "Error") return;
    navigateToStep(step + 1);
  };

  // Función para retroceder de paso
  const handleBack = () => {
    console.log(step);
    
    navigateToStep(step - 1);
  };
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
          <div className={styles.progressBar} style={{ width: `${(step / steps.length) * 100}%` }} />
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