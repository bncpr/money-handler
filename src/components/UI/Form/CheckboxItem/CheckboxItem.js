import styles from '../../../../utility/Bubble.module.css'

export const CheckboxItem = ({ text, onTick, name, checked }) => {
  return (
      <div
        className={`${styles.bubble} ${checked ? styles.selected : ''}`}
        name={name}
        onClick={() => onTick(name, checked)}>
        {text}
      </div>
  )
}

// const CheckBoxGroup = ({ children})