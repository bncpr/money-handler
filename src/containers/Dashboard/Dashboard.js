import { TabsBar } from "../../components/UI/Tabs/TabsBar/TabsBar"
import { BarChart } from "../../components/DataViz/BarChart/BarChart"
import { useEntries } from "../../hooks/useEntries/useEntries"
import { useYears } from "../../hooks/useYears/useYears"
import { useChartControls } from "../../hooks/useChartControls/useChartControls"
import { useLoading } from "../../hooks/useLoading/useLoading"
import { Flex, HStack } from "@chakra-ui/layout"
import { Switch } from "@chakra-ui/switch"
import {
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/menu"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/button"
import { capitalizeFirstChar } from "../../utility/utility"

export const Dashboard = () => {
  const data = useEntries()
  const { isLoading, turnLoadingOffHandler, withActivateLoading } =
    useLoading()
  const { years, year, setYear } = useYears()
  const { showBy, series, chartType, changeShowBy, changeOrToggleSeries } =
    useChartControls("month", false, "bar")

  const onChangeShowByHandler = withActivateLoading(changeShowBy)
  const onChangeOrToggleSeriesHandler = withActivateLoading(
    changeOrToggleSeries
  )

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
            _focus={{ boxShadow: "none" }}>
            {capitalizeFirstChar(showBy)}
          </MenuButton>
          <MenuList>
            <MenuOptionGroup
              defaultValue='month'
              type='radio'
              onChange={onChangeShowByHandler}>
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
