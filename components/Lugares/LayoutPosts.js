import styles from "../../styles/Talleres.module.css";
import { Loader } from "../../utils/loader";


export default function LayoutPostCharge(){
    return(
        <>
        <div className={styles.cardLoader}><Loader/></div>
        <div className={styles.cardLoader}><Loader/></div>
        <div className={styles.cardLoader}><Loader/></div>
        </>
    )
}