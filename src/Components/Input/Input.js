
import styles from './Input.module.css'


export default function Input({ label, placeholder, type, value, onChange, error, name, required = true, disabled = false, min, max, inputMode, style }) {
  return (
    <div className={styles.containerInput} style={style}>
      <label>{label}</label>
      <input
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
        name={name}
        required={required}
        min={min}
        max={max}
        inputMode={inputMode}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  )
}