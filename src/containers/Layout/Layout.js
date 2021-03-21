import { connect } from "react-redux"
import { Toolbar } from "../../components/Navigation/Toolbar/Toolbar"
import styles from './Layout.module.css'

export const Layout = ({ children }) => {
  return (
    <>
      <Toolbar />
      <main className={styles.Content}>
        {children}
      </main>
    </>
  )
}


