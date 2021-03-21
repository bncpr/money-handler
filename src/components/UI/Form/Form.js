import styles from './Form.module.css'

export const Form = ({ children }) => {
    return (
        <form className={styles.Form}>
            {children}
        </form>
    )
}