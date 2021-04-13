import { useMemo, useEffect, useState } from "react"
import { updateObj, stringSorter } from '../../../../utility/utility'

const currentDate = new Date().toJSON().slice(0, 10)
const [currentYear, currentMonth] = currentDate.split('-')
console.log(currentDate)

export function DateSelector({ column: { preFilteredRows, setFilter, filterValue, id } }) {

  const dateTypes = useMemo(() => {
    const dateTypes = {}
    preFilteredRows.forEach(row => {
      const [year, month] = row.values[id].split('-')
      if (!(year in dateTypes)) dateTypes[year] = {}
      if (!(month in dateTypes[year])) dateTypes[year][month] = {}
    })
    return dateTypes
  }, [preFilteredRows, id])

  const [state, setState] = useState({
    year: currentYear,
    month: currentMonth
  })

  useEffect(() => {
    setFilter(currentYear + '-' + currentMonth)
  }, [])

  useEffect(() => {
    if (filterValue) {
      const [year] = filterValue.split('-')
      if (!(year in dateTypes)) {
        console.log('RESET DATE FILTER')
        setState(Object.assign(state, {year: '', month: ''}))
        setFilter()
      }
    }
  }, [filterValue, dateTypes])

  function onChangeYear(event) {
    const year = event.target.value
    if (year) {
      const month = ''
      setState({ ...state, year, month })
      setFilter(year)
    } else {
      setState(updateObj(state, {year: '', month: ''}))
      setFilter()
    }
  }

  function onChangeMonth(event) {
    const month = event.target.value
    setState({ ...state, month })
    setFilter(state.year + '-' + month)
  }

  return (
    <>
      <select onChange={onChangeYear} value={state.year}>
        <option value=''>--</option>
        {Object.keys(dateTypes).sort(stringSorter(-1)).map(year => <option key={year} value={year}>{year}</option>)}
      </select>
      <select onChange={onChangeMonth} value={state.month}>
        <option value=''>--</option>
        {state.year && state.year in dateTypes && Object.keys(dateTypes?.[state.year]).sort(stringSorter(-1)).map(month => <option key={month} value={month}>{month}</option>)}
      </select>
    </>
  )
}