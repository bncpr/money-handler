import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import styles from "./Dashboard.module.css"
import { getYearThunk, initData } from "../../store/thunks"
import { TabsBar } from "../../components/UI/Tabs/TabsBar/TabsBar"
import {
  changeYear,
  toggleWithCategories,
  toggleWithPayers,
  toggleWithStacks,
} from "../../store/dashboardSlice"
import { BarChart } from "../../components/DataViz/BarChart/BarChart"
import { keys } from "ramda"

export const Dashboard = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  const {
    year,
    withPayers,
    payerColors,
    categoryColors,
    withStacks,
    withCategories,
  } = useSelector(state => state.dashboard)

  const onChangeYearHandler = val => dispatch(changeYear(val))
  const onTogglePayersHandler = () => dispatch(toggleWithPayers())
  const onToggleStacksHandler = () => dispatch(toggleWithStacks())
  const onToggleCategoriesHandler = () => dispatch(toggleWithCategories())

  useEffect(() => {
    if (year === null) {
      dispatch(initData())
    } else if (!(data[year] instanceof Object)) {
      dispatch(getYearThunk(year))
    }
  }, [year])

  return (
    <div className={styles.dashboard}>
      <TabsBar tabs={keys(data)} current={year} onClick={onChangeYearHandler} />
      <BarChart
        data={data}
        year={year}
        chartType='barChart'
        withPayers={withPayers}
        payerColors={payerColors}
        categoryColors={categoryColors}
        withStacks={withStacks}
        withCategories={withCategories}
      />
      <button onClick={onTogglePayersHandler}>Payers</button>
      <button onClick={onToggleStacksHandler}>Stack</button>
      <button onClick={onToggleCategoriesHandler}>Categories</button>
    </div>
  )
}

export default Dashboard
