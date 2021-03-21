import { Component } from 'react';
import { Spinner } from '../../components/UI/Spinner/Spinner'
import axios from '../../axios'
import DataTable from '../../components/visualization/DataTable/DataTable';

class Dashboard extends Component {
  state = {
    headers: null,
    rows: null
  }
  componentDidMount() {
    axios.get('/entries.json')
      .then(res => {
        // console.log(res)
        // const dataArray = Object.keys(res.data).map(key => res.data[key])
        console.log(res.data)
        const headers = res.data['headers']
        const entries = res.data['entry']
        const rows = this.getRows(headers, entries);
        this.setState({ headers: headers, rows: rows})
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
    const dataTable = this.state.rows && this.state.headers
      ? <DataTable headers={this.state.headers} rows={this.state.rows} />
      : <Spinner />
    return dataTable
  }
}

export default Dashboard