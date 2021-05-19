import styles from "./Dashboard.module.css"
import { TabsBar } from "../../components/UI/Tabs/TabsBar/TabsBar"
import { BarChart } from "../../components/DataViz/BarChart/BarChart"
import { useEntries } from "../../hooks/useEntries/useEntries"
import { useYears } from "../../hooks/useYears/useYears"
import { useChartControls } from "../../hooks/useChartControls/useChartControls"
import { useLoading } from "../../hooks/useLoading/useLoading"

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
    <div className={styles.dashboard}>
      <TabsBar tabs={years} current={year} onClick={setYear} />
      <BarChart
        turnLoadingOff={turnLoadingOffHandler}
        isLoading={isLoading}
        data={data}
        year={year}
        chartType={chartType}
        showBy={showBy}
        series={series}
      />
      <button
        onClick={() => onChangeOrToggleSeriesHandler("payer")}
        disabled={showBy !== "month"}>
        Payers
      </button>
      <button
        onClick={() => onChangeOrToggleSeriesHandler("category")}
        disabled={showBy !== "month"}>
        Categories
      </button>
      <label>Show by:</label>
      <select value={showBy} onChange={onChangeShowByHandler}>
        <option value='month'>month</option>
        <option value='category'>category</option>
        <option value='payer'>payer</option>
      </select>
    </div>
  )
}
