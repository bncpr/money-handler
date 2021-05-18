import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFilter } from "../../store/slices/dataSlice"
import * as R from "ramda"

const entryStr = (date, payer, value, category) =>
  `date: ${date} payer: ${payer} category: ${category} value: ${value}`

export const Entries = () => {
  const { surfaceData } = useSelector(state => state.data)
  const { years, categories, payers, filters, filterables } = useSelector(
    state => state.data
  )
  const dispatch = useDispatch()

  return (
    <div>
      <select
        value={filters.year}
        onChange={event =>
          dispatch(setFilter({ key: "year", value: event.target.value }))
        }>
        <option value=''>--</option>
        {years.map(year => (
          <option key={year} value={year}>
            {year +
              `(${R.path(["year", "count", year], filterables) ?? ""})`}
          </option>
        ))}
      </select>
      {!R.isEmpty(filterables.month.values) && (
        <select
          value={filters.month}
          onChange={event =>
            dispatch(
              setFilter({ key: "month", value: event.target.value })
            )
          }>
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
      <select
        value={filters.payer}
        onChange={event =>
          dispatch(setFilter({ key: "payer", value: event.target.value }))
        }>
        <option value=''>--</option>
        {payers.map(payer => (
          <option value={payer} key={payer}>
            {payer +
              `(${R.path(["payer", "count", payer], filterables) ?? ""})`}
          </option>
        ))}
      </select>
      <select
        value={filters.category}
        onChange={event =>
          dispatch(
            setFilter({ key: "category", value: event.target.value })
          )
        }>
        <option value=''>--</option>
        {categories.map(category => (
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
