import { useDispatch, useSelector } from 'react-redux'
import { hideError } from '../../../store/errorSlice'
import styles from './Modal.module.css'

export const Modal = () => {
  const { error, errorMessage } = useSelector(state => state.error)
  const dispatch = useDispatch()
  const onClick = () => dispatch(hideError())
  return (
    <div className={`${error ? styles.show : ''} ${styles.modal}`}>
      <div className={`${error ? styles.show : ''} ${styles.backdrop}`} onClick={onClick} />
      <div className={styles.content}>
        <span className={styles.close} onClick={onClick}>&times;</span>
        <h1>Error</h1>
        <p>{errorMessage}</p>
      </div>
    </div>
  )
}