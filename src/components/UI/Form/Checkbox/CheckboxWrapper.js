import styles from './InputGroup.module.css'

export const CheckboxWrapper = ({ children, text, className }) => {
  return (
    <div className={className}>
      <label>{text}</label>
      <div className={styles.inputGroup}>
        {children}
      </div>
    </div>
  )
}