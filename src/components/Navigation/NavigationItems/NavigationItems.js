import { useSelector } from "react-redux"
import { NavigationItem } from "./NavigationItem/NavigationItem"
import styles from "./NavigationItems.module.css"

export const NavigationItems = () => {
  const { signedIn } = useSelector(state => state.authentication)
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem path='/'>Home</NavigationItem>
      <NavigationItem path='/dashboard'>Dashboard</NavigationItem>
      {!signedIn && <NavigationItem path='/login'>Login</NavigationItem>}
      {signedIn && (
        <>
          <NavigationItem path='entries'>Entries</NavigationItem>
          <NavigationItem path='/profile'>Profile</NavigationItem>
        </>
      )}
    </ul>
  )
}
