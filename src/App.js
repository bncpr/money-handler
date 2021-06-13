import { useDisclosure } from "@chakra-ui/hooks"
import { Box, Spacer } from "@chakra-ui/layout"
import { onAuthStateChanged } from "@firebase/auth"
import * as R from "ramda"
import { useEffect, useRef } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Route, Switch, useLocation } from "react-router"
import { Home } from "./components/Home/Home"
import { EntriesDrawerContent } from "./components/Layout/DrawerContent/EntriesDrawerContent/EntriesDrawerContent"
import { NavigationItem } from "./components/Navigation/NavigationItems/NavigationItem/NavigationItem"
import { Toolbar } from "./components/Navigation/Toolbar/Toolbar"
import { ProfilePopover } from "./components/Profile/ProfilePopover/ProfilePopover"
import { ToolbarBurgerButton } from "./components/UI/Button/ToolbarHamburgerButton/ToolbarBurgerButton"
import { PermanentDrawer } from "./components/UI/Drawer/PermanentDrawer/PermanentDrawer"
import { Entries } from "./containers/Entries/Entries"
import { LoginForm } from "./containers/Login/LoginForm"
import { auth } from "./firebase"
import { useColors } from "./hooks/useColors/useColors"
import { useFilters } from "./hooks/useFilters/useFilters"
import { useInitialPick } from "./hooks/useInitialPick/useInitialPick"
import { signIn, signOut } from "./store/slices/authenticationSlice"

const [currentYear, currentMonth] = new Date().toJSON().slice(0, 11).split("-")
console.log(currentYear, currentMonth)

export const App = () => {
  const dispatch = useDispatch()
  const signedIn = useSelector(state => state.authentication.signedIn)
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false })

  const headerRef = useRef()
  const top = headerRef.current?.clientHeight

  const { pathname } = useLocation()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(signIn({ uid: user.uid, email: user.email }))
      } else {
        
        dispatch(signOut())
      }
    })
  }, [auth, dispatch])

  const { entries, groupedTree, fields } = useSelector(
    state => state.groupedEntries,
    shallowEqual,
  )

  const {
    setFilter,
    counts,
    filteredEntries: surfaceData,
    filters,
  } = useFilters({
    entries,
    groupedTree,
  })

  useInitialPick(fields.year, setFilter("year"))
  useInitialPick(R.keys(counts.month), setFilter("month"))

  const colors = useColors({
    payers: fields.payer,
    categories: fields.category,
  })

  return (
    <Box>
      <Toolbar bgColor='purple.500' spacing={8} ref={headerRef}>
        <ToolbarBurgerButton onClick={onToggle} color='purple.800' />
        <NavigationItem path='/' current={pathname} label='HOME' />
        <NavigationItem path='/entries' current={pathname} label='ENTRIES' />
        <NavigationItem path='/about' current={pathname} label='ABOUT' />
        {!signedIn && (
          <NavigationItem path='/login' current={pathname} label='LOGIN' />
        )}
        <Spacer />
        {signedIn && (
          <ProfilePopover
            variant='subtle'
            colorScheme='purple'
            color='purple.800'
          />
        )}
      </Toolbar>

      <Box mt={`${top}px`}>
        {isOpen && (
          <PermanentDrawer isOpen={isOpen} top={`${top}px`} width='320px'>
            <Switch>
              <Route path='/entries'>
                <EntriesDrawerContent
                  filters={filters}
                  counts={counts}
                  fields={fields}
                  setFilter={setFilter}
                />
              </Route>
            </Switch>
          </PermanentDrawer>
        )}
        <Box ml={isOpen ? "10%" : "0"}>
          <Switch>
            <Route path='/entries'>
              <Entries
                surfaceData={surfaceData}
                fields={fields}
                filters={filters}
              />
            </Route>
            <Route path='/login' component={LoginForm} />
            <Route path='/' exact>
              <Home
                groupedTree={groupedTree}
                subField={fields.category}
                colors={colors}
              />
            </Route>
          </Switch>
        </Box>
      </Box>
    </Box>
  )
}
