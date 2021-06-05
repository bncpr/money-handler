import { IconButton } from "@chakra-ui/button"
import { useDisclosure } from "@chakra-ui/hooks"
import { HamburgerIcon, QuestionIcon } from "@chakra-ui/icons"
import { Box, Code } from "@chakra-ui/layout"
import { onAuthStateChanged } from "@firebase/auth"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Switch } from "react-router"
import { Home } from "./components/Home/Home"
import { NavigationItem } from "./components/Navigation/NavigationItems/NavigationItem/NavigationItem"
import { Toolbar } from "./components/Navigation/Toolbar/Toolbar"
import { Profile } from "./components/Profile/Profile"
import { ProfilePopover } from "./components/Profile/ProfilePopover/ProfilePopover"
import { Dashboard } from "./containers/Dashboard/Dashboard"
import { Entries } from "./containers/Entries/Entries"
import { LoginForm } from "./containers/Login/LoginForm"
import { auth } from "./firebase"
import { signIn, signOut } from "./store/slices/authenticationSlice"

export const App = () => {
  const dispatch = useDispatch()
  const { signedIn, email } = useSelector(state => state.authentication)
  const { isOpen, onToggle, onOpen } = useDisclosure({ defaultIsOpen: true })
  const headerRef = useRef()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(signIn({ uid: user.uid, email: user.email }))
      } else {
        dispatch(signOut())
      }
    })
  }, [auth, dispatch])

  const top = headerRef.current?.clientHeight

  return (
    <Box>
      <Toolbar
        bgColor='purple.400'
        p={3}
        spacing={8}
        align='center'
        ref={headerRef}
      >
        <IconButton
          variant='subtle'
          colorScheme='purple'
          color='purple'
          fontSize='3xl'
          icon={<HamburgerIcon />}
          _focus={{ boxShadow: "none" }}
          onClick={onToggle}
        />

        <NavigationItem path='/'>HOME</NavigationItem>
        <NavigationItem path='/dashboard'>DASHBOARD</NavigationItem>
        {signedIn && <NavigationItem path='/entries'>ENTRIES</NavigationItem>}
        <NavigationItem path='/about' flexGrow='1'>
          ABOUT
        </NavigationItem>
        {signedIn || <NavigationItem path='/login'>LOGIN</NavigationItem>}
        {signedIn && (
          <ProfilePopover
            variant='subtle'
            colorScheme='purple'
            color='purple.800'
            onClick={() => auth.signOut()}
          >
            Signed in as:
            <Code m={2} p={1}>
              {email}
            </Code>
          </ProfilePopover>
        )}
      </Toolbar>
      <Box mt={`${top}px`}>
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/profile' component={Profile} />
          <Route path='/entries'>
            <Entries isOpenSide={isOpen} onOpenSide={onOpen} top={top} />
          </Route>
          <Route path='/login' component={LoginForm} />
          <Route path='/' exact component={Home} />
        </Switch>
      </Box>
    </Box>
  )
}
