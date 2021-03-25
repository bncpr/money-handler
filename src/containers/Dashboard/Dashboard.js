import { ContentBox } from '../../components/UI/ContentBox/ContentBox';
import { EntryForm } from './EntryForm/EntryForm';
import { DataTable } from '../../components/visualization/DataTable/DataTable';
import { getData } from '../../store/actions/data'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

export const Dashboard = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  useEffect(() => {dispatch(getData())}, [dispatch])

  return   (
    <ContentBox>
      <DataTable data={data.data} />
      <EntryForm subs={data.subs} />
    </ContentBox>
  )

}

export default Dashboard