import styles from './Button.module.css'

export const Button = ({ children, onClick, value, className }) => {
  return (
    <button
      value={value}
      className={`${styles.Button} ${className}`}
      onClick={onClick}>
      {children}
    </button>
  )
}