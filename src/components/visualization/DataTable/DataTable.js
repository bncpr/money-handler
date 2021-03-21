import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { ContentBox } from '../../../containers/ContentBox/ContentBox';
import styles from './DataTable.module.css'


function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              // Add the sorting props to control sorting. For this example
              // we can add them into the header props
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                {/* Add a sort direction indicator */}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(
          (row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  )
                })}
              </tr>
            )
          }
        )}
      </tbody>
    </table>
  )
}

export const DataTable = ({ data, headers }) => {
  const _columns = () =>
    headers.map(header => {
      return {
        Header: header,
        accessor: header
      }
    })

  const columns = React.useMemo(
    _columns, []
  )
  return (
    <ContentBox className={styles.DataTable}>
      <h1>Table</h1>
      <Table columns={columns} data={data} />
    </ContentBox>
  )
}