import { useDispatch, useSelector } from 'react-redux'
import { hideError } from '../../../../store/errorSlice'
import { Backdrop } from '../Backdrop/Backdrop'
import styles from './ErrorModal.module.css'

export const ErrorModal = () => {
  const { error, errorMessage } = useSelector(state => state.error)
  const dispatch = useDispatch()
  const onClick = () => dispatch(hideError())
  return (
    error ?
      <div className={styles.modal}>
        <Backdrop show={error} onClick={onClick} />
        <div className={styles.content}>
          <span className={styles.close} onClick={onClick}>&times;</span>
          <h1>Error</h1>
          <p>{errorMessage}</p>
        </div>
      </div>
    : null
  )
}