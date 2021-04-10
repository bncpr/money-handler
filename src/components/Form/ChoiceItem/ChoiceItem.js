import { Button } from '../../UI/Button/Button'
import styles from './ChoiceItem.module.css'


export const ChoiceItem = ({ children, className, text, name, value, stateValue, onChange, onShow, onKey }) => {  
  return (
    <div className={`${styles.inputItem} ${className || ''}`}>
      <label>{text}</label>
      <div className={styles.inputGroup}>
        {children}
        {stateValue === name
          ?
          <div className={styles.hiddenBox}>
            <input
              autoFocus
              className={styles.hiddenInput}
              value={value}
              onChange={onChange}
              onKeyDown={event => onKey(event, name, value)}
              onBlur={(event) => onShow(event, name)}
            />
            <span>Press enter to add.</span>
          </div>
          : null}
      </div>
      <Button onClick={(event) => onShow(event, name)}>+</Button>
    </div>
  )
}