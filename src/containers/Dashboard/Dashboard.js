import { Component } from 'react';
import axios from '../../axios'
import { ContentBox } from '../../components/UI/ContentBox/ContentBox';
import styles from './Dashboard.module.css'
import { EntryForm } from './EntryForm/EntryForm';
import { DataTable } from '../../components/visualization/DataTable/DataTable';
import { Spinner } from '../../components/UI/Spinner/Spinner'

class Dashboard extends Component {
  state = {
    headers: null,
    rows: null,
    subcategories: []
  }
  componentDidMount() {
    axios.get('/entries.json')
      .then(res => {
        const headers = res.data['headers']
        const entries = res.data['entry']
        const rows = this.getRows(headers, entries);
        const subcategories = res.data['subcategories']
        this.setState({
          headers,
          rows,
          subcategories,
        })
        this.setState({ data: res.data['entry'] })
        this.setState({ headers: headers, rows: rows })
      })
      .catch(err => {
        console.log(err)
      })
  }

  getRows = (headers, entries) => {
    const rows = [];
    entries.forEach(entry => {
      let row = [];
      row.id = entries.indexOf(entry);
      headers.forEach(header => {
        row.push(entry[header] ? entry[header] : null)
      })
      rows.push(row)
    })
    return rows
  }

  render() {
    const dataTable = this.state.rows && this.state.headers && this.state.data
      ? <DataTable headers={this.state.headers} rows={this.state.rows} data={this.state.data} />
      : <Spinner />
    return (
      <ContentBox>
        {dataTable}
        <EntryForm subcategories={this.state.subcategories} />
      </ContentBox>
    )
  }
}

export default Dashboard