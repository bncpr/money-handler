import { ContentBox } from '../../components/UI/ContentBox/ContentBox';
import { EntryForm } from './EntryForm/EntryForm';
import { DataTable } from '../../components/visualization/DataTable/DataTable';
import { getData } from '../../store/actions/data'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Spinner } from '../../components/UI/Spinner/Spinner';

export const Dashboard = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  const isLoaded = useSelector(state => state.data.isLoaded)
  useEffect(() => {dispatch(getData())}, [dispatch])

  return   (
    <ContentBox>
      { isLoaded ? <DataTable data={data.data} /> : <Spinner /> }
      <EntryForm subs={data.subs} />
    </ContentBox>
  )

}

export default Dashboard