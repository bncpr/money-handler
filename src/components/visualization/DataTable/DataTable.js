import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useTable, useSortBy } from 'react-table';
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

const Subcategories = ({ values }) => {
  return (
    <div className={styles.subcategories}>
      {values.map((value, idx) => {
        return (
          <span key={idx} className={styles.Subcategory}>
            {value}
          </span>
        )
      })}
    </div>
  )
}

export const DataTable = () => {
  const data = useSelector(state => state.data.entries)
  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date'
      },
      {
        Header: 'Value',
        accessor: 'value'
      },
      {
        Header: 'Paid',
        accessor: 'payer'
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Subcategories',
        accessor: 'subcategories',
        Cell: ({ cell: { value } }) => {
          return value ? <Subcategories values={value} /> : null
        }
      }
    ], []
  )
  return (
    <div className={styles.DataTable}>
      <h1>Entries</h1>
      <Table columns={columns} data={data} />
    </div>
  )
}