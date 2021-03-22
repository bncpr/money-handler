import { render } from "@testing-library/react";
import { Component } from "react";
import { ContentBox } from "../../../containers/ContentBox/ContentBox"
import { capitalizeFirstChar } from "../../../utility/utility"
import styles from './DataTable.module.css'

class DataTable extends Component {
  render() {
    return (
      <div className={styles.DataTable}>
        <h1>Entries</h1>
        <table>
          <thead>
            <tr>
              {this.props.headers.map(header => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.props.rows.map(row => <tr key={row.id}>{row.map(td => <td>{td}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default DataTable