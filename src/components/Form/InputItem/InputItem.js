import styles from './InputItem.module.css'

export const InputItem = ({ text, type, name, value, onChange, placeholder }) => {
  return (
    <div className={styles.inputItem}>
      <label>{text}</label>
      <input
        className={styles.input}
        type={type} name={name} value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}