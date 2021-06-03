import { Button } from "@chakra-ui/button"
import { Box, Code } from "@chakra-ui/layout"
import { shallowEqual, useSelector } from "react-redux"
import { Redirect } from "react-router"
import { auth } from "../../firebase"

export const Profile = () => {
  const { uid, email, signedIn } = useSelector(
    state => state.authentication,
    shallowEqual
  )
  console.log(uid)
  return (
    <Box p={5}>
      {!signedIn && <Redirect to='/login' />}
      <Box>
        Email:
        <Code m={2} p={1}>
          {email}
        </Code>{" "}
      </Box>

      <Button size="sm" colorScheme='red' onClick={() => auth.signOut()}>
        Log Out
      </Button>
    </Box>
  )
}
