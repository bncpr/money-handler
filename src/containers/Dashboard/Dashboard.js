import { Component } from 'react';
import axios from '../../axios'
import { ContentBox } from '../../components/UI/ContentBox/ContentBox';
import styles from './Dashboard.module.css'
import { EntryForm } from './EntryForm/EntryForm';
import { DataTable } from '../../components/visualization/DataTable/DataTable';
import { Spinner } from '../../components/UI/Spinner/Spinner'

class Dashboard extends Component {
  state = {
    subs: [],
    data: []
  }
  componentDidMount() {
    axios.get('/entries.json')
      .then(res => {
        const subs = res.data['subcategories']
        const data = Object.values(res.data['entries'])
        this.setState({ subs, data })
        console.log('[Dashboard]', subs)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <ContentBox>
        <DataTable data={this.state.data} />
        <EntryForm subs={this.state.subs} />
      </ContentBox>
    )
  }
}

export default Dashboard