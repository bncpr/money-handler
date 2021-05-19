import { useEffect } from "react"
import { useEntries } from "../../hooks/useEntries/useEntries"
import { useFilters } from "../../hooks/useFilters/useFilters"
import * as R from "ramda"

const entryStr = (date, payer, value, category) =>
  `date: ${date} payer: ${payer} category: ${category} value: ${value}`

export const Entries = () => {
  const entries = useEntries()
  const { surfaceData, setFilter, filters, filterables } =
    useFilters(entries)

  useEffect(() => {
    // console.log(surfaceData, filters, filterables)
  }, [surfaceData, filters, filterables])

  return (
    <div>
      <select value={filters.year} onChange={setFilter("year")}>
        <option value=''>--</option>
        {filterables.year.values.map(year => (
          <option key={year} value={year}>
            {year +
              `(${R.path(["year", "count", year], filterables) ?? ""})`}
          </option>
        ))}
      </select>
      {!R.isEmpty(filterables.month.values) && (
        <select value={filters.month} onChange={setFilter("month")}>
          <option value=''>--</option>
          {filterables.month.values.map(month => (
            <option key={month} value={month}>
              {month +
                `(${
                  R.path(["month", "count", month], filterables) ?? ""
                })`}
            </option>
          ))}
        </select>
      )}
      <select value={filters.payer} onChange={setFilter("payer")}>
        <option value=''>--</option>
        {filterables.payer.values.map(payer => (
          <option value={payer} key={payer}>
            {payer +
              `(${R.path(["payer", "count", payer], filterables) ?? ""})`}
          </option>
        ))}
      </select>
      <select value={filters.category} onChange={setFilter("category")}>
        <option value=''>--</option>
        {filterables.category.values.map(category => (
          <option value={category} key={category}>
            {category +
              `(${
                R.path(["category", "count", category], filterables) ?? ""
              })`}
          </option>
        ))}
      </select>
      {surfaceData.map(({ date, payer, value, category, id }) => (
        <p key={id}>{entryStr(date, payer, value, category)}</p>
      ))}
    </div>
  )
}
