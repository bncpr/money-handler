import { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from './components/Layout/Layout'
import { Login } from './containers/Login/Login'
import { Route, Switch } from 'react-router';
import { ContentBox } from './components/UI/ContentBox/ContentBox';
import Dashboard from './containers/Dashboard/Dashboard'

const Welcome = () => {
  return <ContentBox>Welcome</ContentBox>
}

class App extends Component {
  render() {
    return (
      <Layout>
        {!this.props.isAuthenticated ? <Login /> : null}
        <Switch>
          <Route path='/user' component={Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/' exact component={Welcome} />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.isAuthenticated
  }
}


export default connect(mapStateToProps)(App);
