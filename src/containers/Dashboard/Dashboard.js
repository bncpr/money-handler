import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import styles from './Dashboard.module.css'
import { getYearThunk, initData } from '../../store/thunks'
import { TabsBar } from '../../components/UI/Tabs/TabsBar/TabsBar';
import { changeYear } from '../../store/dashboardSlice';
import { BarChart } from '../../components/DataViz/BarChart/BarChart';

export const Dashboard = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  const { year } = useSelector(state => state.dashboard)

  const onChangeYearHandler = val => dispatch(changeYear(val))

  useEffect(() => {
    if (year === null) {
      dispatch(initData())
    } else if (!(data[year] instanceof Object)) {
      dispatch(getYearThunk(year))
    }
  }, [year])

  return (
    <div className={styles.dashboard}>
      <TabsBar
        tabs={Object.keys(data)}
        current={year}
        onClick={onChangeYearHandler}
      />
      <BarChart data={data} year={year} />
    </div>

  )
}

export default Dashboard