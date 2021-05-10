import { useDispatch, useSelector } from "react-redux"
import { changeInputValue } from "../../store/loginSlice"

import { signInUser } from "../../firebase"
import styled from "styled-components"
import { useEffect } from "react"
import { Redirect } from "react-router"

export const Login = () => {
  const { signIn, signUp, email, password } = useSelector(state => state.login)
  const { signedIn } = useSelector(state => state.authentication)
  const dispatch = useDispatch()

  const onChangeHandler = key => event =>
    dispatch(changeInputValue({ key, value: event.target.value }))

  const onSubmitHandler = (email, password) => event => {
    event.preventDefault()
    signInUser(email, password)
  }

  return (
    <StyledLogin>
      {signedIn && <Redirect to='/profile' />}
      <form onSubmit={onSubmitHandler(email, password)}>
        <h1>{signIn ? "Sign In" : "Sign Up"}</h1>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={onChangeHandler("email")}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={onChangeHandler("password")}
        />
        <button>{signIn ? "Log In" : "Sign Up"}</button>
        <p>{`Switch to ${signIn ? "sign up" : "Log In"}`}</p>
      </form>
    </StyledLogin>
  )
}

const StyledLogin = styled.div`
  background-color: #fbfaf9;
  border-radius: 5px;
  box-shadow: 4px 4px 4px rgb(200, 200, 200);
  padding: 10px 25px;
  & form {
    display: flex;
    flex-direction: column;
  }
  & input {
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
  }
  & button {
    padding: 10px;
    margin-top: 8px;
    background-color: #eee;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  & p {
    font-size: 0.9em;
    cursor: pointer;
  }
`
