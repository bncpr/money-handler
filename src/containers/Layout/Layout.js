import { Toolbar } from "../../components/Navigation/Toolbar/Toolbar"
import { Spinner } from "../../components/UI/Spinner/Spinner"
import { ContentBox } from "../ContentBox/ContentBox"
import styles from './Layout.module.css'



export const Layout = ({ children }) => {
    return (
        <>
            <Toolbar />
            <main className={styles.Content}>
                <ContentBox>{children}</ContentBox>
            </main>
        </>
    )
}