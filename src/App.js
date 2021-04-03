import { Layout } from './components/Layout/Layout'
import { Login } from './containers/Login/Login'
import { Route, Switch } from 'react-router';
import { ContentBox } from './components/UI/ContentBox/ContentBox';
import Dashboard from './containers/Dashboard/Dashboard'
import { ErrorModal } from './components/UI/Modal/ErrorModal/ErrorModal';

const Welcome = () => {
  return <ContentBox>Welcome</ContentBox>
}

export const App = () => {
  return (
    <Layout>
      <ErrorModal />
      <Switch>
        <Route path='/user' component={Dashboard} />
        <Route path='/login' component={Login} />
        <Route path='/' exact component={Welcome} />
      </Switch>
    </Layout>
  );
}
