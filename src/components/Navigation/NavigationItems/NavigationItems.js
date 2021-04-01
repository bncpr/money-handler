import { NavigationItem } from './NavigationItem/NavigationItem'
import styles from './NavigationItems.module.css'


export const NavigationItems = () => {
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem path='/'>Home</NavigationItem>
      <NavigationItem path='/user'>User</NavigationItem>
      <NavigationItem path='/logout'>Logout</NavigationItem>
    </ul>
  )
}