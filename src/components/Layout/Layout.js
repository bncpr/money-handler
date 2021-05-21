import { Center } from "@chakra-ui/layout"
import { NavigationItems } from "../Navigation/NavigationItems/NavigationItems"
import { Toolbar } from "../Navigation/Toolbar/Toolbar"

export const Layout = ({ children }) => {
  return (
    <>
      <Toolbar>
        <NavigationItems />
      </Toolbar>
      <Center as='main' pt='45px'>
        {children}
      </Center>
    </>
  )
}
