import { cloneElement } from "react";
import styles from './RadioGroup.module.css'

export const RadioGroup = ({ children, onChange, selected }) => {
  return (
    <div className={styles.radioGroup}>
      {children.map(child => cloneElement(child, {selected, onChange}))}
    </div>
  )
}