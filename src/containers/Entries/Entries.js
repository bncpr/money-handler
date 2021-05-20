import { useEffect } from "react"
import { useEntries } from "../../hooks/useEntries/useEntries"
import { useFilters } from "../../hooks/useFilters/useFilters"
import * as R from "ramda"

const entryStr = (date, payer, value, category) =>
  `date: ${date} payer: ${payer} category: ${category} value: ${value}`

const createSelect = (statePath, onChange, array, count) => (
  <select value={statePath} onChange={onChange}>
    <option value=''>--</option>
    {array.map(year => (
      <option key={year} value={year}>
        {year + `(${count?.[year] ?? ""})`}
      </option>
    ))}
  </select>
)
const createSelectH = (filters, onChange, filterables, value) =>
  createSelect(
    filters[value],
    onChange(value),
    filterables[value].values,
    filterables[value].count
  )

export const Entries = () => {
  const entries = useEntries()
  const { surfaceData, setFilter, filters, filterables } =
    useFilters(entries)

  useEffect(() => {
    // console.log(surfaceData, filters, filterables)
  }, [surfaceData, filters, filterables])

  return (
    <div>
      {createSelectH(filters, setFilter, filterables, "year")}
      {!R.isEmpty(filterables.month.values) &&
        createSelectH(filters, setFilter, filterables, "month")}
      {createSelectH(filters, setFilter, filterables, "payer")}
      {createSelectH(filters, setFilter, filterables, "category")}
      {surfaceData.map(({ date, payer, value, category, id }) => (
        <p key={id}>{entryStr(date, payer, value, category)}</p>
      ))}
    </div>
  )
}
