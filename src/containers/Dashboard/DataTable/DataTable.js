import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTable, useFilters, usePagination } from 'react-table';
import { Spinner } from '../../../components/UI/Spinner/Spinner';
import styles from './DataTable.module.css'
import { DateSelector } from '../../../components/Form/Filters/DateSelector/DateSelector'
import { SelectFilter } from '../../../components/Form/Filters/SelectFilter/SelectFilter'



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



function Table({ columns, data }) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 15 }
    },
    useFilters,
    usePagination
  )

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(
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
      <hr />
      <div> {/* pagination */}
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 15, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}


export function DataTable() {
  const data = useSelector(state => state.data.entries)
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
      {data.length === 0 ? <Spinner /> : <Table columns={columns} data={data} />}
    </div>
  )
}