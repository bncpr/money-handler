import { ContentBox } from '../../components/UI/ContentBox/ContentBox';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import { initData } from '../../store/thunks'
import { TabsBar } from '../../components/UI/Tabs/TabsBar/TabsBar';
import { getMaxKey } from '../../utility/utility';
import { changeYear } from '../../store/dashboardSlice';

export const Dashboard = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  const { year } = useSelector(state => state.dashboard)
  
  useEffect(() => {
    dispatch(initData())
  }, [])

  return (
    <ContentBox className={styles.dashboard}>
      <TabsBar
        tabs={Object.keys(data)}
        current={year}
        onClick={val => dispatch(changeYear(val))}
      />
    </ContentBox>
  )
}

export default Dashboard