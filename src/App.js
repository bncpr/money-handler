import { Box, Spacer } from "@chakra-ui/layout"
import { Portal, Spinner } from "@chakra-ui/react"
import { onAuthStateChanged } from "@firebase/auth"
import { current } from "@reduxjs/toolkit"
import { AnimatePresence } from "framer-motion"
import * as R from "ramda"
import { useState } from "react"
import { useEffect, useRef } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Route, Switch, useLocation } from "react-router"
import { Redirect, useHistory } from "react-router-dom"
import { ErrorModal } from "./components/ErrorModal/ErrorModal"
import { Home } from "./components/Home/Home"
import { MotionContentVariant } from "./components/Motion/MotionContentVariant/MotionContentVariant"
import { NavigationItem } from "./components/Navigation/NavigationItems/NavigationItem/NavigationItem"
import { Toolbar } from "./components/Navigation/Toolbar/Toolbar"
import { ProfilePopover } from "./components/Profile/ProfilePopover/ProfilePopover"
import { Entries } from "./containers/Entries/Entries"
import { LoginForm } from "./containers/Login/LoginForm"
import { auth, getEntriesObserver } from "./firebase"
import { useColors } from "./hooks/useColors/useColors"
import { useFilters } from "./hooks/useFilters/useFilters"
import { signIn, signOut } from "./store/slices/authenticationSlice"
import { hideError } from "./store/slices/errorSlice"
import { updateEntries } from "./store/slices/groupedEntriesSlice/groupedEntriesSlice"
import { setLoadingOff, setLoadingOn } from "./store/slices/loadingSlice"
import { getRandomData } from "./utility/getRandomData"

const [currentYear, currentMonth] = new Date().toJSON().slice(0, 11).split("-")
console.log(currentYear, currentMonth)

const useInitialFilters = ({
  groupedMonths,
  yearField,
  uid,
  isEmptyEntries,
  resetFilters,
}) => {
  const [initializedForUid, setInitializedForUid] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      uid &&
      uid !== initializedForUid &&
      !isEmptyEntries &&
      !R.isEmpty(yearField)
    ) {
      const lastYear = yearField.reduce(R.max, "")
      const lastMonth = R.pipe(
        R.prop(lastYear),
        R.keys,
        R.reduce(R.max, ""),
      )(groupedMonths)
      resetFilters({ year: lastYear, month: lastMonth })
      setInitializedForUid(uid)
    }
  }, [groupedMonths, yearField, uid, initializedForUid, isEmptyEntries])
}

export const App = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.loading.isLoading)
  const isLoadingFilter = useSelector(state => state.loading.isLoadingFilter)

  const signedIn = useSelector(state => state.authentication.signedIn)
  const uid = useSelector(state => state.authentication.uid)

  const headerRef = useRef()
  const top = headerRef.current?.clientHeight

  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    dispatch(setLoadingOn())
    onAuthStateChanged(auth, user => {
      dispatch(user ? signIn({ uid: user.uid, email: user.email }) : signOut())
    })
  }, [auth, dispatch])

  useEffect(() => {
    console.log("UID_CHANGE", uid)
    resetColors()
    resetFilters({ year: currentYear, month: currentMonth })
    setIsEmptyEntries(true)
    if (!uid && signedIn !== undefined) {
      dispatch({ type: "app/makingRandomData" })
      dispatch(updateEntries({ entries: getRandomData() }))
      dispatch(setLoadingOff())
    }
  }, [uid, signedIn])

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
    resetFilters,
  } = useFilters({
    entries,
    groupedTree,
  })

  const { colors, resetColors } = useColors({
    payers: fields.payer,
    categories: fields.category,
  })

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
      </Portal>
      <ErrorModal
        isOpen={error}
        onClose={() => dispatch(hideError())}
        errorMessage={errorMessage}
      />
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
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.key}>
            <Route path='/entries'>
              <MotionContentVariant>
                <Entries
                  surfaceData={surfaceData}
                  fields={fields}
                  filters={filters}
                  counts={counts}
                  setFilter={setFilter}
                  signedIn={signedIn}
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
