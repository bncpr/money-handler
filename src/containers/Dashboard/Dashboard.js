import { ContentBox } from '../../components/UI/ContentBox/ContentBox';
import { EntryForm } from './EntryForm/EntryForm';
import { DataTable } from '../../components/visualization/DataTable/DataTable';
import { getEntries } from '../../store/actions/data'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Spinner } from '../../components/UI/Spinner/Spinner';

export const Dashboard = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data.entries)
  const gotEntries = useSelector(state => state.data.gotEntries)
  useEffect(() => {
    if (!gotEntries) dispatch(getEntries())
  })

  return   (
    <ContentBox>
      { gotEntries ? <DataTable data={data} /> : <Spinner /> }
      <EntryForm subs={data.subs} />
    </ContentBox>
  )

}

export default Dashboard