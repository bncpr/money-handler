import { Box } from "@chakra-ui/layout"
import { Portal, Spinner, useDisclosure } from "@chakra-ui/react"
import { onAuthStateChanged } from "@firebase/auth"
import { DataSnapshot } from "firebase/database"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { shallowEqual } from "react-redux"
import { Route, Switch, useLocation } from "react-router"
import { Redirect } from "react-router-dom"
import { auth, getEntriesObserver } from "./api/firebase/firebase"
import { About } from "./components/About/About"
import { ErrorModal } from "./components/ErrorModal/ErrorModal"
import { Home } from "./components/Home/Home"
import { MotionContentVariant } from "./components/Motion/MotionContentVariant/MotionContentVariant"
import { NavigationItems } from "./components/Navigation/NavigationItems/NavigationItems"
import { Toolbar } from "./components/Navigation/Toolbar/Toolbar"
import { Entries } from "./containers/Entries/Entries"
import { LoginForm } from "./containers/Login/LoginForm"
import {
  useAppDispatch,
  useAppSelector,
} from "./hooks/reduxTypedHooks/reduxTypedHooks"
import { useColors } from "./hooks/useColors/useColors"
import { useFilters } from "./hooks/useFilters/useFilters"
import { signIn, signOut } from "./store/slices/authenticationSlice"
import { hideError } from "./store/slices/errorSlice"
import { setLoadingOff, setLoadingOn } from "./store/slices/loadingSlice"
import { processEntries } from "./store/thunks/processEntries/processEntries"
import { getRandomData } from "./utility/getRandomData"
import { WelcomeModal } from "./components/UI/Modal/WelcomeModal/WelcomeModal"

const [currentYear, currentMonth] = new Date().toJSON().slice(0, 11).split("-")
console.log(currentYear, currentMonth)

export const App = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.loading.isLoading)
  const isLoadingFilter = useAppSelector(state => state.loading.isLoadingFilter)

  const signedIn = useAppSelector(state => state.authentication.signedIn)
  const touchedAuth = useAppSelector(state => state.authentication.touched)
  const uid = useAppSelector(state => state.authentication.uid)

  const location = useLocation()

  useEffect(() => {
    dispatch(setLoadingOn())
    const unsubscribe = onAuthStateChanged(auth, user => {
      dispatch(
        user ? signIn({ uid: user.uid, email: user.email || "" }) : signOut(),
      )
    })
    return () => unsubscribe()
  }, [dispatch])

  const [isEmptyEntries, setIsEmptyEntries] = useState(false)

  useEffect(() => {
    const unsubscribe = getEntriesObserver(uid, (snapshot: DataSnapshot) => {
      setIsEmptyEntries(snapshot.exists() ? false : true)
      dispatch(processEntries({ entries: snapshot.val() || {} }))
      setTimeout(() => {
        dispatch(setLoadingOff())
      }, 0)
    })
    return () => unsubscribe()
  }, [uid, dispatch])

  const { entries, groupedTree, fields } = useAppSelector(
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
    if (!signedIn && touchedAuth) {
      dispatch({ type: "app/makingRandomData" })
      dispatch(processEntries({ entries: getRandomData() }))
      setTimeout(() => {
        dispatch(setLoadingOff())
      }, 0)
    }
  }, [touchedAuth, signedIn, dispatch, resetFilters, resetColors])

  const pathname = location.pathname

  const error = useAppSelector(state => state.error.error)
  const errorMessage = useAppSelector(state => state.error.errorMessage)

  useEffect(() => {
    if (!window.localStorage.getItem("didWelcome")) {
      console.log("check")
      onOpen()
    }
  })

  const { isOpen, onClose, onOpen } = useDisclosure()
  const onCloseWelcome = () => {
    onClose()
    window.localStorage.setItem("didWelcome", "true")
  }

  return (
    <Box id='app'>
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
        <Toolbar bgColor='purple.500' spacing={[1, 3]}>
          <NavigationItems signedIn={signedIn} pathname={pathname} />
        </Toolbar>
        {!isLoading && (
          <WelcomeModal isOpen={isOpen} onClose={onCloseWelcome} />
        )}
      </Portal>

      <Box as='main' pt='46px' id='content'>
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
                  categoryColors={colors.categoryColors}
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
