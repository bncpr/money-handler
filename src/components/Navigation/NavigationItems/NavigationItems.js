import { NavigationItem } from './NavigationItem/NavigationItem'
import styles from './NavigationItems.module.css'


export const NavigationItems = ({ children }) => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem>Home</NavigationItem>
            <NavigationItem>Login</NavigationItem>
        </ul>
    )
}