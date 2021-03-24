import styles from './Checkbox.module.css'
import { useState } from 'react'

export const Checkbox = ({ labelText, onChange, name }) => {

  const [checked, setChecked] = useState(false)
  const onChecked = event => {
    setChecked(event.target.checked)
  }

  return (
      <label className={styles.checkBox} onClick={onChange}>

        <input
          name={name}
          type='checkbox'
          checked={checked}
          onChange={onChecked} />

        <span className={
          checked
            ? styles.checked
            : styles.notChecked
        }>{labelText}</span>
        
      </label>
  )
}