import { ContentBox } from '../../components/UI/ContentBox/ContentBox';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import { getYearThunk, initData } from '../../store/thunks'
import { TabsBar } from '../../components/UI/Tabs/TabsBar/TabsBar';
import { getMaxKey } from '../../utility/utility';
import { changeYear } from '../../store/dashboardSlice';
import _ from 'lodash'
import * as R from 'ramda'

const mapObjWith = R.curry((fn, obj) => R.zipWith(fn, R.keys(obj), R.values(obj)))
const flatMonth = mapObjWith((key, entries) => ({ month: key, entries }))
const entriesLensSet = R.curry((set, fn, obj) => {
  return R.over(
    R.lens(
      R.pipe(
        R.prop('entries'),
        R.values
      ),
      R.assoc(set)
    ), fn, obj
  )
})

export const Dashboard = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  const { year } = useSelector(state => state.dashboard)


  useEffect(() => {
    if (year === null) {
      dispatch(initData())
    } else if (!(data[year] instanceof Object)) {
      dispatch(getYearThunk(year))
    }
  }, [year])

  useEffect(() => {
    if (data[year] instanceof Object) {
      console.log('do stuff')
    }
  }, [data, year])


  return (
    <div className={styles.dashboard}>
      <TabsBar
        tabs={Object.keys(data)}
        current={year}
        onClick={val => dispatch(changeYear(val))}
      />
      <svg className={styles.content}>
        content
      </svg>
    </div>

  )
}

export default Dashboard