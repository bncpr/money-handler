import { useDispatch, useSelector } from "react-redux"
import { ContentBox } from "../../components/UI/ContentBox/ContentBox"
import { changeInputValue } from "../../store/loginSlice"
import styles from "./Login.module.css"

export const Login = () => {
  const { userName, password } = useSelector(state => state.login)
  const dispatch = useDispatch()

  const onChangeHandler = key => event =>
    dispatch(changeInputValue({ key, value: event.target.value }))

  const onSubmitHandler = event => {
    event.preventDefault()
  }

  return (
    <ContentBox>
      <form className={styles.Login} onSubmit={onSubmitHandler}>
        <h1>Login</h1>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={userName}
          onChange={onChangeHandler("username")}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={onChangeHandler("password")}
        />
        <button>Login</button>
      </form>
    </ContentBox>
  )
}
