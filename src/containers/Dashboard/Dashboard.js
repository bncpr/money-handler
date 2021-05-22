import { TabsBar } from "../../components/UI/Tabs/TabsBar/TabsBar"
import { BarChart } from "../../components/DataViz/BarChart/BarChart"
import { useEntries } from "../../hooks/useEntries/useEntries"
import { useYears } from "../../hooks/useYears/useYears"
import { useChartControls } from "../../hooks/useChartControls/useChartControls"
import { useLoading } from "../../hooks/useLoading/useLoading"
import { Box, HStack } from "@chakra-ui/layout"
import { Switch } from "@chakra-ui/switch"
import { Select } from "@chakra-ui/select"
import { Tab, TabList, Tabs } from "@chakra-ui/tabs"
import { useEffect } from "react"

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
    <Box>
      <TabsBar tabs={years} current={year} onChange={setYear} />
      <BarChart
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

        <label>Show by:</label>
        <Select
          value={showBy}
          onChange={onChangeShowByHandler}
          w='1xs'
          padding='2'
          variant='flushed'>
          <option value='month'>month</option>
          <option value='category'>category</option>
          <option value='payer'>payer</option>
        </Select>
      </HStack>
    </Box>
  )
}
