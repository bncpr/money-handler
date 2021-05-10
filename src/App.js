import { Layout } from "./components/Layout/Layout"
import { Login } from "./containers/Login/Login"
import { Route, Switch } from "react-router"
import Dashboard from "./containers/Dashboard/Dashboard"
import { ErrorModal } from "./components/UI/Modal/ErrorModal/ErrorModal"
import { Profile } from "./components/Profile/Profile"
import { Home } from "./components/Home/Home"

export const App = () => {
  return (
    <Layout>
      <ErrorModal />
      <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/profile' component={Profile} />
        <Route path='/login' component={Login} />
        <Route path='/' exact component={Home} />
      </Switch>
    </Layout>
  )
}
