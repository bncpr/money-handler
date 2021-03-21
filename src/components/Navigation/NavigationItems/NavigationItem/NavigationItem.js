import { Link } from 'react-router-dom'
import styles from './NavigationItem.module.css'

export const NavigationItem = ({ children, path }) => {
  return (
    <li className={styles.NavigationItem}>
      <Link to={path}>
        {children}
      </Link>
    </li>
  )
}