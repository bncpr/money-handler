import { useDispatch, useSelector } from "react-redux"
import { changeInputValue, toggleSignMode } from "../../store/slices/loginSlice"

import { Redirect } from "react-router"
import * as styles from "./styles"
import {
  createUserThunk,
  signInUserThunk,
} from "../../store/authThunks/authThunks"

const labelTern = signIn => (signIn ? "Sign In" : "Create New User")
const modeTern = signIn => `Switch to ${signIn ? "Sign Up" : "Log In"}`
const errorCircuit = error => error && <styles.Error>{error}</styles.Error>
const authSubmitHandler = (thunk, dispatch) => (email, password) => event => {
  event.preventDefault()
  dispatch(thunk({ email, password }))
}
const changeHandler = (key, dispatch) => event =>
  dispatch(changeInputValue({ key, value: event.target.value }))

export const Login = () => {
  const { signIn, email, password, errors } = useSelector(state => state.login)
  const { signedIn } = useSelector(state => state.authentication)

  const dispatch = useDispatch()

  const changeModeHandler = () => dispatch(toggleSignMode())
  const createUserHandler = authSubmitHandler(createUserThunk, dispatch)
  const signInUserHandler = authSubmitHandler(signInUserThunk, dispatch)
  const emailChangeHandler = changeHandler("email", dispatch)
  const passwordChangeHandler = changeHandler("password", dispatch)

  return (
    <styles.Login>
      {signedIn && <Redirect to='/profile' />}
      <form
        onSubmit={
          signIn
            ? signInUserHandler(email, password)
            : createUserHandler(email, password)
        }
      >
        <h1>{labelTern(signIn)}</h1>
        {errorCircuit(errors.email)}
        <input
          required
          type='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={emailChangeHandler}
        />
        {errorCircuit(errors.password)}
        <input
          required
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={passwordChangeHandler}
        />
        {errorCircuit(errors.other)}
        <button>{labelTern(signIn)}</button>
        <p onClick={changeModeHandler}>{modeTern(signIn)}</p>
      </form>
    </styles.Login>
  )
}
