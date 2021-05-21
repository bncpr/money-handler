import { Stack } from "@chakra-ui/layout"
import { useSelector } from "react-redux"
import { NavigationItem } from "./NavigationItem/NavigationItem"

export const NavigationItems = () => {
  const { signedIn } = useSelector(state => state.authentication)
  return (
    <Stack direction={["column", "row"]}>
      <NavigationItem path='/'>Home</NavigationItem>
      <NavigationItem path='/dashboard'>Dashboard</NavigationItem>
      {!signedIn && <NavigationItem path='/login'>Login</NavigationItem>}
      {signedIn && (
        <>
          <NavigationItem path='entries'>Entries</NavigationItem>
          <NavigationItem path='/profile'>Profile</NavigationItem>
        </>
      )}
    </Stack>
  )
}
