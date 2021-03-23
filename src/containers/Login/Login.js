import { Component } from 'react'
import { ContentBox } from '../../components/UI/ContentBox/ContentBox'
import styles from './Login.module.css'

export class Login extends Component {
  state = {
    userName: null,
    password: null,
  }

  componentDidUpdate() {
    // console.log(this.state)
  }

  inputChangeHandler(event, id) {
    this.setState({[id]: event.target.value})
  }
  render() {

    return (
      <ContentBox>
        <form className={styles.Login}>
          <h1>Login</h1>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={this.props.userName}
            onChange={(event) => this.inputChangeHandler(event, 'userName')} />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={this.props.password}
            onChange={(event) => this.inputChangeHandler(event, 'password')} />
          <button>Login</button>
        </form>
      </ContentBox>
    )
  }
}