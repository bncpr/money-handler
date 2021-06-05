import { Button } from "@chakra-ui/button"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { Flex, HStack } from "@chakra-ui/layout"
import {
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/menu"
import { Switch } from "@chakra-ui/switch"
import { shallowEqual, useSelector } from "react-redux"
import { BarChart } from "../../components/DataViz/BarChart/BarChart"
import { TabsBar } from "../../components/UI/Tabs/TabsBar/TabsBar"
import { useChartControls } from "../../hooks/useChartControls/useChartControls"
import { useInitialPick } from "../../hooks/useInitialPick/useInitialPick"
import { useLoading } from "../../hooks/useLoading/useLoading"
import { useYears } from "../../hooks/useYears/useYears"
import { capitalizeFirstChar } from "../../utility/utility"

export const Dashboard = () => {
  const data = useSelector(state => state.groupedEntries.entries, shallowEqual)

  const { years, year, setYear } = useYears()
  
  useInitialPick(years, setYear)

  const { isLoading, turnLoadingOffHandler, withActivateLoading } = useLoading()

  const { showBy, series, chartType, changeShowBy, changeOrToggleSeries } =
    useChartControls("month", false, "bar")

  const onChangeShowByHandler = withActivateLoading(changeShowBy)
  const onChangeOrToggleSeriesHandler =
    withActivateLoading(changeOrToggleSeries)

  return (
    <Flex direction='column' width='min' margin='auto'>
      <TabsBar tabs={years} current={year} onChange={setYear} />
      <BarChart
        style={{ margin: "auto" }}
        turnLoadingOff={turnLoadingOffHandler}
        isLoading={isLoading}
        data={data}
        year={year}
        chartType={chartType}
        showBy={showBy}
        series={series}
      />
      <HStack margin='1'>
        <label>Payers</label>
        <Switch
          margin='2'
          onChange={() => onChangeOrToggleSeriesHandler("payer")}
          isDisabled={showBy !== "month"}
          isChecked={series === "payer"}
        />
        <label>Categories</label>
        <Switch
          margin='2'
          onChange={() => onChangeOrToggleSeriesHandler("category")}
          isDisabled={showBy !== "month"}
          isChecked={series === "category"}
        />

        <Menu closeOnBlur={true}>
          <MenuButton
            as={Button}
            variant='unstyled'
            rightIcon={<ChevronDownIcon />}
            padding='2'
            _focus={{ boxShadow: "none" }}
          >
            {capitalizeFirstChar(showBy)}
          </MenuButton>
          <MenuList>
            <MenuOptionGroup
              defaultValue='month'
              type='radio'
              onChange={onChangeShowByHandler}
            >
              <MenuItemOption value='month'>Month</MenuItemOption>
              <MenuItemOption value='category'>Category</MenuItemOption>
              <MenuItemOption value='payer'>Payer</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  )
}
