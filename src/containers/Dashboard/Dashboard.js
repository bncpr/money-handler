import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import styles from "./Dashboard.module.css"
import { getYearThunk, initData } from "../../store/thunks"
import { TabsBar } from "../../components/UI/Tabs/TabsBar/TabsBar"
import {
  changeYear,
  toggleWithCategories,
  toggleWithPayers,
  turnLoadingOff,
  turnLoadingOn,
} from "../../store/dashboardSlice"
import { BarChart } from "../../components/DataViz/BarChart/BarChart"
import { keys } from "ramda"
import { didFetchYear } from "../../utility/utility"

export const Dashboard = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  const {
    isLoading,
    year,
    payerColors,
    categoryColors,
    withPayers,
    withStacks,
    withCategories,
    showBy,
    series,
    chartType
  } = useSelector(state => state.dashboard)

  const onChangeYearHandler = val => {
    dispatch(turnLoadingOn())
    dispatch(changeYear(val))
  }
  const onTogglePayersHandler = () => {
    dispatch(turnLoadingOn())
    dispatch(toggleWithPayers())
  }
  const onToggleCategoriesHandler = () => {
    dispatch(turnLoadingOn())
    dispatch(toggleWithCategories())
  }
  const turnLoadingOnHandler = () => dispatch(turnLoadingOn())
  const turnLoadingOffHandler = () => dispatch(turnLoadingOff())

  useEffect(() => {
    if (year === null) {
      dispatch(initData())
    } else if (!didFetchYear(data, year)) {
      dispatch(getYearThunk(year))
    }
  }, [year, dispatch])

  return (
    <div className={styles.dashboard}>
      <TabsBar tabs={keys(data)} current={year} onClick={onChangeYearHandler} />
      <BarChart
        turnLoadingOff={turnLoadingOffHandler}
        turnLoadingOn={turnLoadingOnHandler}
        isLoading={isLoading}
        data={data}
        year={year}
        chartType={chartType}
        colors={{ payerColors, categoryColors }}
        options={{ withPayers, withStacks, withCategories }}
        withPayers={withPayers}
        withStacks={withStacks}
        withCategories={withCategories}
        showBy={showBy}
        series={series}
      />
      <button
        onClick={onTogglePayersHandler}
        disabled={withCategories}
      >
        Payers
      </button>
      {/* <button
        onClick={onToggleStacksHandler}
        disabled={
          (!withPayers && !withCategories) || (withPayers && withCategories)
        }
      >
        Stack
      </button> */}
      <button
        onClick={onToggleCategoriesHandler}
        disabled={withPayers}
      >
        Categories
      </button>
    </div>
  )
}

export default Dashboard
