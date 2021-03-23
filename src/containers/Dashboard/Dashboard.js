import { Component } from 'react';
import axios from '../../axios'
import DataTable from '../../components/visualization/DataTable/DataTable';
import { ContentBox } from '../../components/UI/ContentBox/ContentBox';
import styles from './Dashboard.module.css'
import { EntryForm } from './EntryForm/EntryForm';

class Dashboard extends Component {
  state = {
    headers: null,
    rows: null,
    subs: []
  }
  componentDidMount() {
    axios.get('/entries.json')
      .then(res => {
        const headers = res.data['headers']
        const entries = Object.values(res.data['entry'])
        const rows = this.getRows(headers, entries);
        const subs = res.data['subcategories']
        this.setState({
          headers,
          rows,
          subs
        })
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
        let sub = entry[header];
        if (header === 'subcategories') {
          row.push(
            sub
              ? Object.keys(sub)
                .map(key => sub[key] ? key : null)
              : null
          )
        } else {
          row.push(sub ? sub : null)
        }
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
        <EntryForm subs={this.state.subs} />
      </ContentBox>
    )
  }
}

export default Dashboard