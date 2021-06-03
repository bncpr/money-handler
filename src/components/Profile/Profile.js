import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"
import styled from "styled-components"
import { auth } from "../../firebase"

export const Profile = () => {
  const { uid, email, signedIn } = useSelector(
    state => state.authentication,
    shallowEqual
  )
  const dispatch = useDispatch()
  console.log(uid)
  return (
    <Div>
      email: {signedIn ? email : <Redirect to='/login' />}
      <button onClick={() => auth.signOut()}>Log Out</button>
    </Div>
  )
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
`
