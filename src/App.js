import { onAuthStateChanged } from "@firebase/auth"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Switch } from "react-router"
import { Home } from "./components/Home/Home"
import { Layout } from "./components/Layout/Layout"
import { Profile } from "./components/Profile/Profile"
import { ErrorModal } from "./components/UI/Modal/ErrorModal/ErrorModal"
import { Dashboard } from "./containers/Dashboard/Dashboard"
import { Entries } from "./containers/Entries/Entries"
import { LoginForm } from "./containers/Login/LoginForm"
import { auth } from "./firebase"
import { signIn, signOut } from "./store/slices/authenticationSlice"



export const App = () => {
  const dispatch = useDispatch()
  const { signedIn } = useSelector(state => state.authentication)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(signIn({ uid: user.uid, email: user.email }))
      } else {
        dispatch(signOut())
      }
    })
  }, [auth, dispatch])

  return (
    <Layout>
      <ErrorModal />
      <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/profile' component={Profile} />
        <Route path='/entries' component={Entries} />
        <Route path='/login' component={LoginForm} />
        <Route path='/' exact component={Home} />
      </Switch>
    </Layout>
  )
}
