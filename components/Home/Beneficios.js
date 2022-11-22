import styles from "./styles.module.css";

export default function Beneficios() {
  return (
    <div className={styles.container}>
      <div style={{gap:'50px'}} className={styles.containerManual}>
        <img
          src="/StoreScreen.png"
          alt="Tienda repuestos de automoviles"
          className={styles.imageDespachos}
        />
        <div style={{justifyContent:'left'}} className={styles.containerManual2}>
          <h1
            className={styles.titleBlueBeneficios}
          >
            Compra 100% segura, con{" "}
            <b style={{ color: "#f50057" }}>garantia </b> incluida y{" "}
            <b style={{ color: "#f50057" }}>envíos</b> {" "}
            GRATIS!
          </h1>
          <div style={{display:'flex', flexDirection:'row', gap:'10px', margin:'20px 0 5px 0'}}>
          <img src='/check.svg' style={{width:'25px', width:'25px'}}/><h4 style={{fontSize:'18px', color:'#1b333d'}} className={styles.subtitleRed}>Envios GRATIS a toda Colombia</h4>
          </div>
          <div style={{display:'flex', flexDirection:'row', gap:'10px', marginBottom:'5px'}}>
          <img src='/check.svg' style={{width:'25px', width:'25px'}}/><h4 style={{fontSize:'18px', color:'#1b333d'}} className={styles.subtitleRed}>Compras 100% seguras</h4>
          </div>
          <div style={{display:'flex', flexDirection:'row', gap:'10px', marginBottom:'5px'}}>
          <img src='/check.svg' style={{width:'25px', width:'25px'}}/><h4 style={{fontSize:'18px', color:'#1b333d'}} className={styles.subtitleRed}>Garantía dependiendo el repuesto</h4>
          </div>
          <div style={{display:'flex', flexDirection:'row', gap:'10px', marginBottom:'5px'}}>
          <img src='/check.svg' style={{width:'25px', width:'25px'}}/><h4 style={{fontSize:'18px', color:'#1b333d'}} className={styles.subtitleRed}>Responderemos todas tus dudas</h4>
          </div>
          <div style={{display:'flex', flexDirection:'row', gap:'10px'}}>
          <img src='/check.svg' style={{width:'25px', width:'25px'}}/><h4 style={{fontSize:'18px', color:'#1b333d'}} className={styles.subtitleRed}>En 2 a 24 horas recibirás tu cotización</h4>
          </div>

        </div>
      </div>
    </div>
  );
}
