import { Box, Spacer } from "@chakra-ui/layout"
import { onAuthStateChanged } from "@firebase/auth"
import * as R from "ramda"
import { useEffect, useRef } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Route, Switch, useLocation } from "react-router"
import { Home } from "./components/Home/Home"
import { NavigationItem } from "./components/Navigation/NavigationItems/NavigationItem/NavigationItem"
import { Toolbar } from "./components/Navigation/Toolbar/Toolbar"
import { ProfilePopover } from "./components/Profile/ProfilePopover/ProfilePopover"
import { Entries } from "./containers/Entries/Entries"
import { LoginForm } from "./containers/Login/LoginForm"
import { auth, getEntriesObserver } from "./firebase"
import { useColors } from "./hooks/useColors/useColors"
import { useFilters } from "./hooks/useFilters/useFilters"
import { useInitialPick } from "./hooks/useInitialPick/useInitialPick"
import { signIn, signOut } from "./store/slices/authenticationSlice"
import { updateEntries } from "./store/slices/groupedEntriesSlice/groupedEntriesSlice"
import { getRandomData, getRandomMonthData } from "./utility/getRandomData"

const [currentYear, currentMonth] = new Date().toJSON().slice(0, 11).split("-")
console.log(currentYear, currentMonth)

export const App = () => {
  const dispatch = useDispatch()
  const signedIn = useSelector(state => state.authentication.signedIn)
  const uid = useSelector(state => state.authentication.uid)

  const headerRef = useRef()
  const top = headerRef.current?.clientHeight

  const { pathname } = useLocation()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      resetColors()
      if (user) {
        dispatch(signIn({ uid: user.uid, email: user.email }))
      } else {
        dispatch(signOut())
        dispatch(updateEntries({ entries: getRandomData() }))
      }
    })
  }, [auth, dispatch])

  useEffect(() => {
    const unsubscribe = getEntriesObserver(uid, snapshot => {
      dispatch(updateEntries({ entries: snapshot.val() }))
    })
    return () => unsubscribe()
  }, [uid])

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

  const { colors, resetColors } = useColors({
    payers: fields.payer,
    categories: fields.category,
  })

  return (
    <Box>
      <Toolbar bgColor='purple.500' spacing={6} ref={headerRef}>
        <NavigationItem path='/' current={pathname} label='HOME' ml={3} />
        <NavigationItem path='/entries' current={pathname} label='ENTRIES' />
        <NavigationItem path='/about' current={pathname} label='ABOUT' />
        {signedIn === false && (
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
        <Switch>
          <Route path='/entries'>
            <Entries
              surfaceData={surfaceData}
              fields={fields}
              filters={filters}
              counts={counts}
              setFilter={setFilter}
              signedIn={signedIn}
            />
          </Route>
          <Route path='/login' component={LoginForm} />
          <Route path='/' exact>
            <Home
              groupedTree={groupedTree}
              subField={fields.category}
              colors={colors}
              signedIn={signedIn}
            />
          </Route>
        </Switch>
      </Box>
    </Box>
  )
}
