import { ContentBox } from '../../components/UI/ContentBox/ContentBox';
import { DataTable } from './DataTable/DataTable'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import styles from './Dashboard.module.css'
import { EntryForm } from './EntryForm/EntryForm';
import { getEntriesThunk } from '../../store/dataSlice'

export const Dashboard = () => {
  const dispatch = useDispatch()
  const entries = useSelector(state => state.data.entries)
  const { attemptedFetch } = useSelector(state => state.error)
  useEffect(() => {
    if (entries.length === 0 && !attemptedFetch) { dispatch(getEntriesThunk()) }
  })

  return (
    <ContentBox className={styles.dashboard}>
      <DataTable />
      <EntryForm />
    </ContentBox>
  )

}

export default Dashboard