import styles from './Backdrop.module.css'

export const Backdrop = ({ show, onClick, style }) => {
  return (
    show ? <div className={styles.backdrop} onClick={onClick} style={style} /> : null
  )
}