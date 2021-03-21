import styles from './NavigationItem.module.css'

export const NavigationItem = ({ children }) => {
    return (
        <li className={styles.NavigationItem}>
            <a href='/'>{children}</a>
        </li>
    )
}