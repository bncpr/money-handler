import styles from './Button.module.css'

export const Button = ({ children, onClick }) => {
  return (
    <button
      className={styles.Button}
      onClick={onClick}>
      {children}
    </button>
  )
}