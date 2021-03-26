import { ContentBox } from '../../components/UI/ContentBox/ContentBox';
import { EntryForm } from './EntryForm/EntryForm';
import { DataTable } from '../../components/visualization/DataTable/DataTable';
import { getEntries } from '../../store/actions/data'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

export const Dashboard = () => {
  const dispatch = useDispatch()
  const didReqEntries = useSelector(state => state.data.didReqEntries)
  useEffect(() => {
    if (!didReqEntries) { dispatch(getEntries()) }
  }, [didReqEntries])

  return (
    <ContentBox>
      <DataTable />
      <EntryForm />
    </ContentBox>
  )

}

export default Dashboard