import styles from './Toolbar.module.css'
import { NavigationItems } from '../NavigationItems/NavigationItems'

export const Toolbar = () => {
    return (
        <header className={styles.Toolbar}>
            <nav className={styles.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}