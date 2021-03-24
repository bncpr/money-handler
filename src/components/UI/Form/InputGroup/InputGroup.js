import styles from './InputGroup.module.css'

export const InputGroup = ({ children, className }) => {
  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {children}
    </div>
  )
}