import { Layout } from "./components/Layout/Layout"
import { Login } from "./containers/Login/Login"
import { Route, Switch } from "react-router"
import Dashboard from "./containers/Dashboard/Dashboard"
import { ErrorModal } from "./components/UI/Modal/ErrorModal/ErrorModal"

export const App = () => {
  return (
    <Layout>
      <ErrorModal />
      <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/login' component={Login} />
        <Route path='/' exact component={null} />
      </Switch>
    </Layout>
  )
}
