import { useEffect, useState } from "react"
import * as R from "ramda"
import { getUpdatedFilteredStack } from "./modules/getUpdatedFilteredStack"
import { getUpdatedFilterables } from "./modules/getUpdatedFilterables"
import { shallowEqual, useSelector } from "react-redux"

const getInitFilterables = (categories, payers, years) => ({
  category: { values: categories },
  year: { values: years },
  month: { values: [] },
  payer: { values: payers },
})

export const useFilters = entries => {
  const { years, categories, payers } = useSelector(
    state => state.data,
    shallowEqual
  )
  const [surfaceData, setSurfaceData] = useState([])
  const [filteredStack, setFilteredStack] = useState([])
  const [filters, setFilters] = useState({
    year: "",
    month: "",
    category: "",
    payer: "",
  })
  const [filterables, setFilterables] = useState({
    year: { values: [] },
    month: { values: [] },
    category: { values: [] },
    payer: { values: [] },
  })
  const setFilter = R.curry((key, event) => {
    setFilters({ ...filters, [key]: event.target.value })
    const newStackedData = getUpdatedFilteredStack(
      key,
      event.target.value,
      entries,
      filteredStack
    )
    setFilteredStack(newStackedData)
    setSurfaceData(
      R.pipe(R.last, R.prop("entries"))(newStackedData) || entries
    )
  })

  useEffect(() => {
    setFilterables(
      getUpdatedFilterables(
        getInitFilterables(categories, payers, years),
        filteredStack
      )
    )
  }, [categories, payers, years, filteredStack])

  useEffect(() => {
    if (
      R.isEmpty(filteredStack) &&
      R.isEmpty(surfaceData) &&
      !R.isEmpty(entries)
    ) {
      const initFilter = years.reduce(R.max, "")
      setFilters({ ...filters, year: initFilter })
      const initSurfaceData = entries.filter(R.propEq("year", initFilter))
      setSurfaceData(initSurfaceData)
      const initStack = [
        { key: "year", value: initFilter, entries: initSurfaceData },
      ]
      setFilteredStack(initStack)
    }
  }, [filteredStack, surfaceData, entries])
  return { surfaceData, filters, setFilter, filterables }
}
