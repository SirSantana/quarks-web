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
            Encuentra tus repuestos, con{" "}
            <b style={{ color: "#f50057" }}>garantia </b> incluida y{" "}
            <b style={{ color: "#f50057" }}>envíos</b> {" "}
            GRATIS!
          </h1>
          <div style={{display:'flex', flexDirection:'row', gap:'10px', margin:'20px 0 5px 0'}}>
          <img src='/check.svg' style={{width:'25px', width:'25px'}}/><h2 style={{fontSize:'18px', color:'#1b333d'}} className={styles.subtitleRed}>Productos con envios GRATIS a toda Colombia</h2>
          </div>
          <div style={{display:'flex', flexDirection:'row', gap:'10px', marginBottom:'5px'}}>
          <img src='/check.svg' style={{width:'25px', width:'25px'}}/><h2 style={{fontSize:'18px', color:'#1b333d'}} className={styles.subtitleRed}>Vendedores 100% seguros</h2>
          </div>
          <div style={{display:'flex', flexDirection:'row', gap:'10px', marginBottom:'5px'}}>
          <img src='/check.svg' style={{width:'25px', width:'25px'}}/><h2 style={{fontSize:'18px', color:'#1b333d'}} className={styles.subtitleRed}>Garantía dependiendo el repuesto</h2>
          </div>
          <div style={{display:'flex', flexDirection:'row', gap:'10px', marginBottom:'5px'}}>
          <img src='/check.svg' style={{width:'25px', width:'25px'}}/><h2 style={{fontSize:'18px', color:'#1b333d'}} className={styles.subtitleRed}>Cotiza con distintos vendedores sin salir de casa</h2>
          </div>
          <div style={{display:'flex', flexDirection:'row', gap:'10px'}}>
          <img src='/check.svg' style={{width:'25px', width:'25px'}}/><h2 style={{fontSize:'18px', color:'#1b333d'}} className={styles.subtitleRed}>En 2 a 24 horas recibirás tu(s) cotización(es)</h2>
          </div>

        </div>
      </div>
    </div>
  );
}
