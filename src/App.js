import { useEffect } from "react"
import { Route, Switch } from "react-router"
import { useDispatch, useSelector } from "react-redux"

import { signIn, signOut } from "./store/slices/authenticationSlice"
import { onAuthStateChanged } from "@firebase/auth"
import { auth, getUserEntries } from "./firebase"

import { Layout } from "./components/Layout/Layout"
import { Login } from "./containers/Login/Login"
import { Dashboard } from "./containers/Dashboard/Dashboard"
import { ErrorModal } from "./components/UI/Modal/ErrorModal/ErrorModal"
import { Profile } from "./components/Profile/Profile"
import { Home } from "./components/Home/Home"
import { Entries } from "./containers/Entries/Entries"

export const App = () => {
  const dispatch = useDispatch()
  const { signedIn } = useSelector(state => state.authentication)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // getUserEntries(user.uid)
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
        <Route path='/login' component={Login} />
        <Route path='/' exact component={Home} />
      </Switch>
    </Layout>
  )
}
