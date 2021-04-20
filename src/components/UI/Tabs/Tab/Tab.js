import styles from './Tab.module.css'

export const Tab = ({ value, current, onClick }) => {
  return (
    <div 
      className={`${styles.tab} ${value === current ? styles.current : ''}`}
      onClick={onClick}
    >
      {'\'' + value}
    </div>
  )
}