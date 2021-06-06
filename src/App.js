import { FormLabel } from "@chakra-ui/form-control"
import { useDisclosure } from "@chakra-ui/hooks"
import { Box, Flex, Heading, Spacer, VStack } from "@chakra-ui/layout"
import { Radio, RadioGroup } from "@chakra-ui/radio"
import { onAuthStateChanged } from "@firebase/auth"
import * as R from "ramda"
import { useEffect, useRef, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Route, Switch, useLocation } from "react-router"
import { BarChart } from "./components/DataViz/BarChart/BarChart"
import { Legend } from "./components/DataViz/Legend/Legend"
import { Filters } from "./components/Filters/Filters"
import { Home } from "./components/Home/Home"
import { NavigationItem } from "./components/Navigation/NavigationItems/NavigationItem/NavigationItem"
import { Toolbar } from "./components/Navigation/Toolbar/Toolbar"
import { ProfilePopover } from "./components/Profile/ProfilePopover/ProfilePopover"
import { ToolbarBurgerButton } from "./components/UI/Button/ToolbarHamburgerButton/ToolbarBurgerButton"
import { PermanentDrawer } from "./components/UI/Drawer/PermanentDrawer/PermanentDrawer"
import { PermanentDrawerContent } from "./components/UI/Drawer/PermanentDrawer/PermanentDrawerContent"
import { TabsBar } from "./components/UI/Tabs/TabsBar/TabsBar"
import { Entries } from "./containers/Entries/Entries"
import { LoginForm } from "./containers/Login/LoginForm"
import { auth } from "./firebase"
import { useChartControls } from "./hooks/useChartControls/useChartControls"
import { useColors } from "./hooks/useColors/useColors"
import { useFilters } from "./hooks/useFilters/useFilters"
import { useInitialPick } from "./hooks/useInitialPick/useInitialPick"
import { signIn, signOut } from "./store/slices/authenticationSlice"
import { capitalizeFirstChar } from "./utility/utility"

const doShowLegend = (showBy, series, value) =>
  (showBy === "month" && series === value) || showBy === value

export const App = () => {
  const dispatch = useDispatch()
  const signedIn = useSelector(state => state.authentication.signedIn)
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

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

  const [chartYear, setChartYear] = useState("")
  useInitialPick(fields.year, setChartYear)

  const { showBy, series, chartType, changeShowBy, changeOrToggleSeries } =
    useChartControls()

  const colors = useColors({
    payers: fields.payer,
    categories: fields.category,
  })

  return (
    <Box>
      <Toolbar bgColor='purple.500' spacing={8} ref={headerRef}>
        <ToolbarBurgerButton onClick={onToggle} color='purple.800' />
        <NavigationItem path='/' current={pathname}>
          HOME
        </NavigationItem>
        <NavigationItem path='/charts' current={pathname}>
          CHARTS
        </NavigationItem>
        <NavigationItem path='/entries' current={pathname}>
          ENTRIES
        </NavigationItem>
        <NavigationItem path='/about' current={pathname}>
          ABOUT
        </NavigationItem>
        {signedIn || (
          <NavigationItem path='/login' current={pathname}>
            LOGIN
          </NavigationItem>
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
            <PermanentDrawerContent>
              <Switch>
                <Route path='/entries'>
                  <FormLabel fontSize='xl'>Filters</FormLabel>
                  <Filters
                    filters={filters}
                    counts={counts}
                    fields={fields}
                    setFilter={setFilter}
                    px={3}
                  />
                </Route>
                <Route path='/charts'>
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
                      <Radio value='' isDisabled={showBy !== "month"}>
                        None
                      </Radio>
                      <Radio value='category' isDisabled={showBy !== "month"}>
                        Category
                      </Radio>
                      <Radio value='payer' isDisabled={showBy !== "month"}>
                        Payer
                      </Radio>
                    </VStack>
                  </RadioGroup>
                </Route>
              </Switch>
            </PermanentDrawerContent>
          </PermanentDrawer>
        )}
        <Box ml={isOpen ? "320px" : "0"} transition='all ease-out 200ms'>
          <Switch>
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
                  colors={colors}
                />
                <Heading p={6} mx='auto'>
                  {capitalizeFirstChar(showBy)}
                </Heading>
                {doShowLegend(showBy, series, "payer") && (
                  <Legend
                    array={fields.payer}
                    colors={colors.payerColors || {}}
                  />
                )}
                {doShowLegend(showBy, series, "category") && (
                  <Legend
                    array={fields.category}
                    colors={colors.categoryColors || {}}
                  />
                )}
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
