import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTable, useSortBy, useFilters } from 'react-table';
import { isEmptyObj } from '../../../utility/utility';
import styles from './DataTable.module.css'



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

function getFirstMonth(datesObj, year) {
  return Object.keys(datesObj[year]).sort((a, b) => a - b)[0]
}

function DateSelector({ column: { preFilteredRows, setFilter, id } }) {

  const dateTypes = useMemo(() => {
    const dateTypes = {}
    preFilteredRows.forEach(row => {
      const [year, month, day] = row.values[id].split('-')
      if (!(year in dateTypes)) dateTypes[year] = {}
      if (!(month in dateTypes[year])) dateTypes[year][month] = {}
    })
    return dateTypes
  }, [preFilteredRows])

  const [year, setYear] = useState()
  const [month, setMonth] = useState()

  function onChangeYear(event) {
    const year = event.target.value
    const defaultMonth = getFirstMonth(dateTypes, year)
    setYear(year)
    setMonth(defaultMonth)
    setFilter(year + '-' + defaultMonth)
  }

  function onChangeMonth(event) {
    const value = event.target.value
    setMonth(value)
    setFilter(year + '-' + value)
  }

  useEffect(() => {
    if (!isEmptyObj(dateTypes)) {
      const latestYear = '' + Math.max(...Object.keys(dateTypes))
      const firstMonth = getFirstMonth(dateTypes, latestYear)
      setYear(latestYear)
      setMonth(firstMonth)
      setFilter(latestYear + '-' + firstMonth)
    }
  }, [dateTypes])
  

  return (
    <>
      <select onChange={onChangeYear} value={year}>
        {Object.keys(dateTypes).map(year => <option key={year} value={year}>{year}</option>)}
      </select>
      <select onChange={onChangeMonth} value={month} defaultValue=''>
        <option key='none' value=''>all</option>
        {year && Object.keys(dateTypes[year]).map(month => <option key={month} value={month}>{month}</option>)}
      </select>
      <button onClick={() => setFilter()}>reset</button>
    </>
  )
}

function filterDates(rows, id, filterValue) {
  return rows.filter(row => {
    // slice the necessary part of the date string, year/+month
    const value = row.values[id].slice(0, filterValue.length)
    return value === filterValue
  })
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
  let data = useSelector(state => state.data.entries)
  data = useMemo(() => data, [data])
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
        disableFilters: true
      },
      {
        Header: 'Category',
        accessor: 'category',
        disableFilters: true
      },
      {
        Header: 'Subcategories',
        accessor: 'subcategories',
        disableFilters: true,
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