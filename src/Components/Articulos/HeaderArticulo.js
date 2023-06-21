import styles from '@/styles/Articulos.module.css'


export default function HeaderArticulo({ autor, tema, fecha }) {
  const fechaObjeto = new Date(fecha);

  const opcionesFecha = { day: "numeric", month: "long", year: "numeric" };
  const fechaFormateada = fechaObjeto.toLocaleDateString("es-ES", opcionesFecha);
  return (
    <header className={styles.containerHeader}>
      <p className={styles.subtitleCategory}>{tema}</p>
      <p className={styles.subtitleHeader}>{fechaFormateada} · por grupo de mecanicos CO</p>
    </header>
  )
}