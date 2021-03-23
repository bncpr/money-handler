import styles from './ContentBox.module.css'

export const ContentBox = ({ children, className }) => {
  return (
    <div className={styles.ContentBox}>
      <div className={className}>
        {children}
      </div>
    </div>
  )
}