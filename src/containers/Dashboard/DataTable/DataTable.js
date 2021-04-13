import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTable, useFilters } from 'react-table';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import { stringSorter } from '../../../utility/utility';
import styles from './DataTable.module.css'
import { DateSelector } from '../../../components/Form/Filters/DateSelector/DateSelector'



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

function filterDates(rows, id, filterValue) {
  return rows.filter(row => {
    // slice the necessary part of the date string, year/+month and compare
    const value = row.values[id].slice(0, filterValue.length)
    return value === filterValue
  })
}

function SelectFilter({ column: { preFilteredRows, setFilter, filterValue, id } }) {

  const options = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      const items = row.values[id]
      if (items instanceof Array) {
        items.map(item => options.add(item))
      } else items && options.add(items)
    })
    return [...options.values()].sort(stringSorter())
  }, [id, preFilteredRows])

  useEffect(() => {
    if (filterValue && options.indexOf(filterValue) === -1) {
      console.log('reset select', id)
      setFilter()
    }
  })

  return (
    <select onChange={e => setFilter(e.target.value || undefined)}>
      <option key='none' value=''>--</option>
      {options.map(option => (
        <option key={id + option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

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
    useFilters,
  )

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              // Add the sorting props to control sorting. For this example
              // we can add them into the header props
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
                <div>{column.canFilter ? column.render('Filter') : null}</div>
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


export function DataTable() {
  const data = useSelector(state => state.data.entries)
  const memData = useMemo(() => data, [data])
  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Filter: DateSelector,
        filter: filterDates
      },
      {
        Header: 'Value',
        accessor: 'value',
        disableFilters: true
      },
      {
        Header: 'Paid',
        accessor: 'payer',
        Filter: SelectFilter,
        filter: 'equals'
      },
      {
        Header: 'Category',
        accessor: 'category',
        Filter: SelectFilter,
        filter: 'equals'
      },
      {
        Header: 'Subcategories',
        accessor: 'subcategories',
        Filter: SelectFilter,
        filter: 'equals',
        Cell: ({ cell: { value } }) => {
          return value ? <Subcategories values={value} /> : null
        }
      }
    ], []
  )

  return (
    <div className={styles.DataTable}>
      <h1>Entries</h1>
      {data.length === 0 ? <Spinner /> : <Table columns={columns} data={memData} />}
    </div>
  )
}