import { useMemo, useEffect, useState } from "react"
import { isEmptyObj, getMaxKey, getMinKey, updateObj, stringSorter } from '../../../../utility/utility'

function getFirstMonth(obj) {
  let month = getMinKey(obj)
  if (month.length == 1) month = '0' + month
  return month
}

function getLastMonth(obj) {
  let month = getMaxKey(obj)
  if (month.length == 1) month = '0' + month
  return month
}

const currentDate = new Date().toJSON().slice(0, 10)
const [year, month, _] = currentDate.split('-')
console.log(currentDate)

export function DateSelector({ column: { preFilteredRows, setFilter, id } }) {

  const dateTypes = useMemo(() => {
    const dateTypes = {}
    preFilteredRows.forEach(row => {
      const [year, month, _] = row.values[id].split('-')
      if (!(year in dateTypes)) dateTypes[year] = {}
      if (!(month in dateTypes[year])) dateTypes[year][month] = {}
    })
    return dateTypes
  }, [preFilteredRows, id])

  const [state, setState] = useState({
    year: year,
    month: month
  })

  useEffect(() => {
    setFilter(year + '-' + month)
  }, [year, month])

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
        {state.year && Object.keys(dateTypes[state.year]).sort(stringSorter(-1)).map(month => <option key={month} value={month}>{month}</option>)}
      </select>
    </>
  )
}