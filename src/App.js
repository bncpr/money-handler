import { Box, Spacer } from "@chakra-ui/layout"
import {
  Icon,
  LinkBox,
  LinkOverlay,
  Portal,
  Spinner,
  Tooltip
} from "@chakra-ui/react"
import { onAuthStateChanged } from "@firebase/auth"
import { AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { GoMarkGithub } from "react-icons/go"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Route, Switch, useLocation } from "react-router"
import { Redirect } from "react-router-dom"
import { auth, getEntriesObserver } from "./api/firebase/firebase"
import { About } from "./components/About/About"
import { ErrorModal } from "./components/ErrorModal/ErrorModal"
import { Home } from "./components/Home/Home"
import { MotionContentVariant } from "./components/Motion/MotionContentVariant/MotionContentVariant"
import { NavigationItem } from "./components/Navigation/NavigationItems/NavigationItem/NavigationItem"
import { Toolbar } from "./components/Navigation/Toolbar/Toolbar"
import { ProfilePopover } from "./components/Profile/ProfilePopover/ProfilePopover"
import { Entries } from "./containers/Entries/Entries"
import { LoginForm } from "./containers/Login/LoginForm"
import { useColors } from "./hooks/useColors/useColors"
import { useFilters } from "./hooks/useFilters/useFilters"
import { signIn, signOut } from "./store/slices/authenticationSlice"
import { hideError } from "./store/slices/errorSlice"
import { updateEntries } from "./store/slices/groupedEntriesSlice/groupedEntriesSlice"
import { setLoadingOff, setLoadingOn } from "./store/slices/loadingSlice"
import { getRandomData } from "./utility/getRandomData"

const [currentYear, currentMonth] = new Date().toJSON().slice(0, 11).split("-")
console.log(currentYear, currentMonth)

export const App = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.loading.isLoading)
  const isLoadingFilter = useSelector(state => state.loading.isLoadingFilter)

  const signedIn = useSelector(state => state.authentication.signedIn)
  const uid = useSelector(state => state.authentication.uid)

  const headerRef = useRef()
  const top = headerRef.current?.clientHeight

  const location = useLocation()

  useEffect(() => {
    dispatch(setLoadingOn())
    onAuthStateChanged(auth, user => {
      dispatch(user ? signIn({ uid: user.uid, email: user.email }) : signOut())
    })
  }, [dispatch])

  const [isEmptyEntries, setIsEmptyEntries] = useState(false)

  useEffect(() => {
    const unsubscribe = getEntriesObserver(uid, snapshot => {
      setIsEmptyEntries(snapshot.exists() ? false : true)
      dispatch(updateEntries({ entries: snapshot.val() || {} }))
      setTimeout(() => {
        dispatch(setLoadingOff())
      }, 0)
    })
    return () => unsubscribe()
  }, [uid, dispatch])

  const { entries, groupedTree, fields } = useSelector(
    state => state.groupedEntries,
    shallowEqual,
  )

  const {
    setFilter,
    counts,
    filteredEntries: surfaceData,
    filters,
    resetFilters,
    filterStack,
  } = useFilters({
    entries,
    groupedTree,
  })

  const { colors, resetColors } = useColors({
    payers: fields.payer,
    categories: fields.category,
  })

  useEffect(() => {
    resetColors()
    resetFilters({ year: currentYear, month: currentMonth })
    setIsEmptyEntries(true)
    if (!uid && signedIn !== undefined) {
      dispatch({ type: "app/makingRandomData" })
      dispatch(updateEntries({ entries: getRandomData() }))
      dispatch(setLoadingOff())
    }
  }, [uid, signedIn, dispatch, resetFilters, resetColors])

  const pathname = location.pathname

  const error = useSelector(state => state.error.error)
  const errorMessage = useSelector(state => state.error.errorMessage)

  return (
    <Box>
      <Portal>
        {(isLoading || isLoadingFilter) && (
          <Spinner
            pos='fixed'
            top='40%'
            left='50%'
            size='xl'
            color='purple.400'
            thickness='5px'
            emptyColor='gray.200'
            zIndex='tooltip'
          />
        )}
        <ErrorModal
          isOpen={error}
          onClose={() => dispatch(hideError())}
          errorMessage={errorMessage}
        />
        <Toolbar bgColor='purple.500' spacing={3} ref={headerRef}>
          <NavigationItem path='/' current={pathname} label='HOME' ml={3} />
          <NavigationItem path='/entries' current={pathname} label='ENTRIES' />
          <NavigationItem path='/about' current={pathname} label='ABOUT' />
          <Spacer />
          {signedIn !== undefined && (
            <Tooltip label='Go to GitHub repository'>
              <LinkBox>
                <Icon as={GoMarkGithub} h={6} w={6} color='white' />
                <LinkOverlay
                  href='https://github.com/bncpr/money-handler'
                  target='_blank'
                  rel='noreferrer noopener'
                />
              </LinkBox>
            </Tooltip>
          )}
          {signedIn ? (
            <ProfilePopover
              variant='subtle'
              colorScheme='purple'
              color='purple.800'
            />
          ) : (
            signedIn !== undefined && (
              <NavigationItem
                path='/login'
                current={pathname}
                label='LOGIN'
                px={6}
              />
            )
          )}
        </Toolbar>
      </Portal>

      <Box mt={`${top}px`}>
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.key}>
            <Route path='/about'>
              <MotionContentVariant>
                <About />
              </MotionContentVariant>
            </Route>
            <Route path='/entries'>
              <MotionContentVariant>
                <Entries
                  surfaceData={surfaceData}
                  fields={fields}
                  filters={filters}
                  counts={counts}
                  setFilter={setFilter}
                  signedIn={signedIn}
                  isEmptyEntries={isEmptyEntries}
                  isLoading={isLoading || isLoadingFilter}
                  filterStack={filterStack}
                  categoryColors={colors.categoryColors || {}}
                />
              </MotionContentVariant>
            </Route>
            <Route path='/login'>
              <MotionContentVariant>
                <LoginForm />
              </MotionContentVariant>
            </Route>
            <Route path='/' exact>
              <MotionContentVariant>
                <Home
                  groupedTree={groupedTree}
                  subField={fields.category}
                  colors={colors}
                  isSignedIn={signedIn}
                  isEmptyEntries={isEmptyEntries}
                />
              </MotionContentVariant>
            </Route>
            <Route>
              <Redirect to='/' />
            </Route>
          </Switch>
        </AnimatePresence>
      </Box>
    </Box>
  )
}
