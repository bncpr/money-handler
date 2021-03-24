import styles from './InputGroup.module.css'

export const InputGroup = ({ children }) => {
  return (
    <div className={styles.inputGroup}>
      {children}
    </div>
  )
}