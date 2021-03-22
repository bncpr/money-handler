import { Component } from 'react';
import { Spinner } from '../../components/UI/Spinner/Spinner'
import axios from '../../axios'
import DataTable from '../../components/visualization/DataTable/DataTable';
import { ContentBox } from '../ContentBox/ContentBox';
import styles from './Dashboard.module.css'
import { Button } from '../../components/UI/Button/Button';

class Dashboard extends Component {
  state = {
    headers: null,
    rows: null
  }
  componentDidMount() {
    axios.get('/entries.json')
      .then(res => {
        const headers = res.data['headers']
        const entries = res.data['entry']
        const rows = this.getRows(headers, entries);
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

  addEntryHandler() {
    console.log('hello')
  }

  render() {
    let dataTable = null;
    if (this.state.rows && this.state.headers) {
      dataTable = <DataTable headers={this.state.headers} rows={this.state.rows} />
    }

    return (
      <ContentBox className={styles.Dashboard}>
        {dataTable}
        <Button onClick={this.addEntryHandler}>ADD</Button>
        {/* TODO: move button */}
      </ContentBox>
    )
  }
}

export default Dashboard