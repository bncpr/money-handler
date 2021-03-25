import { useSelector } from 'react-redux';
import { Layout } from './components/Layout/Layout'
import { Login } from './containers/Login/Login'
import { Route, Switch } from 'react-router';
import { ContentBox } from './components/UI/ContentBox/ContentBox';
import Dashboard from './containers/Dashboard/Dashboard'

const Welcome = () => {
  return <ContentBox>Welcome</ContentBox>
}

export const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  return (
    <Layout>
      {!isAuthenticated ? <Login /> : null}
      <Switch>
        <Route path='/user' component={Dashboard} />
        <Route path='/login' component={Login} />
        <Route path='/' exact component={Welcome} />
      </Switch>
    </Layout>
  );
}
