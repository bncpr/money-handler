import { useMemo, useEffect } from 'react'
import { stringSorter } from '../../../../utility/utility'

export function SelectFilter({ column: { preFilteredRows, setFilter, filterValue, id } }) {

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