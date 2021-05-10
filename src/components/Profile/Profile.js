import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"
import styled from "styled-components"
import { auth } from "../../firebase"
import { signOut } from "../../store/authenticationSlice"

export const Profile = () => {
  const { user } = useSelector(state => state.authentication)
  const dispatch = useDispatch()
  console.log(user)
  return (
    <Div>
      email: {user ? user.email : <Redirect to="/login" />}
      <button onClick={() => auth.signOut()}>Log Out</button>
    </Div>
  )
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
`