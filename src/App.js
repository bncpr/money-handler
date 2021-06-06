import { IconButton } from "@chakra-ui/button"
import { useDisclosure } from "@chakra-ui/hooks"
import { HamburgerIcon } from "@chakra-ui/icons"
import { Box, Flex, Heading, VStack } from "@chakra-ui/layout"
import { onAuthStateChanged } from "@firebase/auth"
import * as R from "ramda"
import { useEffect, useRef, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Route, Switch, useLocation } from "react-router"
import { Home } from "./components/Home/Home"
import { NavigationItem } from "./components/Navigation/NavigationItems/NavigationItem/NavigationItem"
import { Toolbar } from "./components/Navigation/Toolbar/Toolbar"
import { Profile } from "./components/Profile/Profile"
import { ProfilePopover } from "./components/Profile/ProfilePopover/ProfilePopover"
import { PermanentDrawer } from "./components/UI/Drawer/PermanentDrawer/PermanentDrawer"
import { Dashboard } from "./containers/Dashboard/Dashboard"
import { Entries } from "./containers/Entries/Entries"
import { LoginForm } from "./containers/Login/LoginForm"
import { EntriesDrawer } from "./components/UI/Drawer/EntriesDrawer/EntriesDrawer"
import { auth } from "./firebase"
import { useFilters } from "./hooks/useFilters/useFilters"
import { useInitialPick } from "./hooks/useInitialPick/useInitialPick"
import { signIn, signOut } from "./store/slices/authenticationSlice"
import { useChartControls } from "./hooks/useChartControls/useChartControls"
import { BarChart } from "./components/DataViz/BarChart/BarChart"
import { TabsBar } from "./components/UI/Tabs/TabsBar/TabsBar"
import { SelectMenu } from "./components/UI/Menu/SelectMenu"
import { FormLabel } from "@chakra-ui/form-control"
import { Radio, RadioGroup } from "@chakra-ui/radio"

export const App = () => {
  const dispatch = useDispatch()
  const signedIn = useSelector(state => state.authentication.signedIn)
  const { isOpen, onToggle, onOpen } = useDisclosure({ defaultIsOpen: true })

  const headerRef = useRef()
  const top = headerRef.current?.clientHeight

  const location = useLocation()

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

  const [chartYear, setChartYear] = useState("")
  useInitialPick(fields.year, setChartYear)

  const { showBy, series, chartType, changeShowBy, changeOrToggleSeries } =
    useChartControls()

  return (
    <Box>
      <Toolbar bgColor='purple.400' spacing={8} ref={headerRef}>
        {location.pathname === "/about" || (
          <IconButton
            variant='subtle'
            colorScheme='purple'
            color='purple'
            fontSize='3xl'
            icon={<HamburgerIcon />}
            _focus={{ boxShadow: "none" }}
            onClick={onToggle}
          />
        )}

        <NavigationItem path='/'>HOME</NavigationItem>
        <NavigationItem path='/charts'>CHARTS</NavigationItem>
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
          />
        )}
      </Toolbar>
      <Box mt={`${top}px`}>
        {isOpen && (
          <PermanentDrawer
            isOpen={isOpen}
            top={`${top}px`}
            p={9}
            width='320px'
            align='stretch'
          >
            <Switch>
              <Route path='/entries'>
                <EntriesDrawer
                  filters={filters}
                  counts={counts}
                  fields={fields}
                  setFilter={setFilter}
                />
              </Route>
              <Route path='/charts'>
                <VStack align='flex-start' spacing={3}>
                  <RadioGroup onChange={changeShowBy} value={showBy} size='lg'>
                    <FormLabel fontSize='xl'>Show By</FormLabel>
                    <VStack align='flex-start' px={3}>
                      <Radio value='month'>Month</Radio>
                      <Radio value='category'>Category</Radio>
                      <Radio value='payer'>Payer</Radio>
                    </VStack>
                  </RadioGroup>
                  <RadioGroup
                    onChange={changeOrToggleSeries}
                    value={series}
                    size='lg'
                  >
                    <FormLabel fontSize='xl'>Series</FormLabel>
                    <VStack align='flex-start' px={3}>
                      <Radio value='category' isDisabled={showBy !== "month"}>
                        Category
                      </Radio>
                      <Radio value='payer' isDisabled={showBy !== "month"}>
                        Payer
                      </Radio>
                    </VStack>
                  </RadioGroup>
                </VStack>
              </Route>
            </Switch>
          </PermanentDrawer>
        )}
        <Box ml={isOpen ? "320px" : "0"} transition='all ease-out 200ms'>
          <Switch>
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/charts'>
              <Flex direction='column' width='min' margin='auto' pt={3}>
                <TabsBar
                  tabs={fields.year}
                  current={chartYear}
                  onChange={setChartYear}
                  colorScheme='green'
                  variant='soft-rounded'
                />
                <BarChart
                  data={entries}
                  year={chartYear}
                  chartType={chartType}
                  showBy={showBy}
                  series={series}
                />
              </Flex>
            </Route>
            <Route path='/entries'>
              <Entries
                surfaceData={surfaceData}
                fields={fields}
                filters={filters}
              />
            </Route>
            <Route path='/login' component={LoginForm} />
            <Route path='/' exact component={Home} />
          </Switch>
        </Box>
      </Box>
    </Box>
  )
}
