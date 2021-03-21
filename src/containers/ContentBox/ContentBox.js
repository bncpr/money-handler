import styles from './ContentBox.module.css'

export const ContentBox = ({ children }) => {
    return (
        <div className={styles.ContentBox}>
            {children}
        </div>
    )
}