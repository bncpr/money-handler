import { ContentBox } from '../../components/UI/ContentBox/ContentBox';
import { DataTable } from './DataTable/DataTable'
import { getEntries } from '../../store/actions/data'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import styles from './Dashboard.module.css'
import { EntryForm } from './EntryForm/EntryForm';

export const Dashboard = () => {
  const dispatch = useDispatch()
  const entries = useSelector(state => state.data.entries)
  useEffect(() => {
    if (entries.length === 0) { dispatch(getEntries()) }
  })

  return (
    <ContentBox className={styles.dashboard}>
      <DataTable />
      <EntryForm />
    </ContentBox>
  )

}

export default Dashboard