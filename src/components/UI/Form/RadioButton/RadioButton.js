import styles from '../../../../utility/Bubble.module.css'

export const RadioButton = ({ text, onChange, name, value, selected }) => {
  return (
    <div
      className={`${styles.bubble} ${value === selected ? styles.selected : ''}`}
      name={name}
      value={value}
      onClick={() => onChange(name, value)}>
      {text}
    </div>
  )
}