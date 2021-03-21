import { connect } from 'react-redux'
import { NavigationItem } from './NavigationItem/NavigationItem'
import styles from './NavigationItems.module.css'


const NavigationItems = ({ isAuthenticated }) => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem path='/'>Home</NavigationItem>
            <NavigationItem path='/user'>User</NavigationItem>
            { isAuthenticated ? <NavigationItem path='/login'>Login</NavigationItem> : null }
        </ul>
    )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated
  }
}

export default connect(mapStateToProps)(NavigationItems)