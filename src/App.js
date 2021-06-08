import { useDisclosure } from "@chakra-ui/hooks"
import { Box, Flex, Heading, Spacer } from "@chakra-ui/layout"
import { onAuthStateChanged } from "@firebase/auth"
import * as R from "ramda"
import { useEffect, useRef, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { Route, Switch, useLocation } from "react-router"
import { BarChart } from "./components/DataViz/BarChart/BarChart"
import { Legend } from "./components/DataViz/Legend/Legend"
import { Home } from "./components/Home/Home"
import { ChartDrawerContent } from "./components/Layout/DrawerContent/ChartsDrawerConent/ChartDrawerContent"
import { EntriesDrawerContent } from "./components/Layout/DrawerContent/EntriesDrawerContent/EntriesDrawerContent"
import { NavigationItem } from "./components/Navigation/NavigationItems/NavigationItem/NavigationItem"
import { Toolbar } from "./components/Navigation/Toolbar/Toolbar"
import { ProfilePopover } from "./components/Profile/ProfilePopover/ProfilePopover"
import { ToolbarBurgerButton } from "./components/UI/Button/ToolbarHamburgerButton/ToolbarBurgerButton"
import { PermanentDrawer } from "./components/UI/Drawer/PermanentDrawer/PermanentDrawer"
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

const isShownLegend = (showBy, series, value) =>
  (showBy === "month" && series === value) || showBy === value

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
        <NavigationItem path='/' current={pathname} label='HOME' />
        <NavigationItem path='/charts' current={pathname} label='CHARTS' />
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
              <Route path='/charts'>
                <ChartDrawerContent
                  showBy={showBy}
                  series={series}
                  onChangeShowBy={changeShowBy}
                  onChangeSeries={changeOrToggleSeries}
                />
              </Route>
            </Switch>
          </PermanentDrawer>
        )}
        <Box ml={isOpen ? "10%" : "0"}>
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
                {isShownLegend(showBy, series, "payer") && (
                  <Legend
                    array={fields.payer}
                    colors={colors.payerColors || {}}
                  />
                )}
                {isShownLegend(showBy, series, "category") && (
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
