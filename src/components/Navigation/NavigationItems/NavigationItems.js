import { useSelector } from 'react-redux'
import { NavigationItem } from './NavigationItem/NavigationItem'
import styles from './NavigationItems.module.css'


export const NavigationItems = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem path='/'>Home</NavigationItem>
      <NavigationItem path='/user'>User</NavigationItem>
      { isAuthenticated ? <NavigationItem path='/logout'>Logout</NavigationItem> : null}
    </ul>
  )
}