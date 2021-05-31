import { useCallback, useEffect, useState } from "react"
import { getUpdatedFilteredStack } from "./modules/getUpdatedFilteredStack"
import { getUpdatedFilterables } from "./modules/getUpdatedFilterables"
import { shallowEqual, useSelector } from "react-redux"
import * as R from "ramda"

// REFACTOR: use grouping and memoization instead of filtering

const getInitFilterables = (categories, payers, years) => ({
  category: { values: categories },
  year: { values: years },
  month: { values: [] },
  payer: { values: payers },
})

const didNotInit = (filteredStack, surfaceData, entries) =>
  R.isEmpty(filteredStack) && R.isEmpty(surfaceData) && !R.isEmpty(entries)

export const useFilters = () => {
  const entriesObj = useSelector(state => state.data.entries, shallowEqual)
  const {
    year: years,
    category: categories,
    payer: payers,
  } = useSelector(state => state.data.fields, shallowEqual)

  const [entries, setEntries] = useState([])
  useEffect(() => {
    setEntries(R.values(entriesObj))
  }, [entriesObj])

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

  useEffect(() => {
    if (didNotInit(filteredStack, surfaceData, entries)) {
      const initFilter = years.reduce(R.max, "")
      setFilters({ ...filters, year: initFilter })
      const initSurfaceData = entries.filter(R.propEq("year", initFilter))
      setSurfaceData(initSurfaceData)
      const initStack = [
        { entries },
        { key: "year", value: initFilter, entries: initSurfaceData },
      ]
      setFilteredStack(initStack)
    } else {
      const newFilteredStack = [{ entries }]
      filteredStack.slice(1).forEach(({ key, value }) => {
        const entries = R.last(newFilteredStack).entries
        newFilteredStack.push({
          key,
          value,
          entries: entries.filter(R.propEq(key, value)),
        })
      })
      setFilteredStack(newFilteredStack)
    }
  }, [entries])

  useEffect(() => {
    setSurfaceData(R.pipe(R.last, R.prop("entries"))(filteredStack) || [])
  }, [filteredStack])

  useEffect(() => {
    setFilterables(
      getUpdatedFilterables(
        getInitFilterables(categories, payers, years),
        filteredStack
      )
    )
  }, [categories, payers, years, filteredStack])

  const setFilter = useCallback(
    R.curry((key, value) => {
      setFilters({ ...filters, [key]: value })
      setFilteredStack(getUpdatedFilteredStack(key, value, filteredStack))
    }),
    [
      setFilters,
      filters,
      setFilteredStack,
      getUpdatedFilteredStack,
      filteredStack,
    ]
  )

  const removeEntryFromStack = id => {
    setFilteredStack(
      filteredStack.map(
        R.over(
          R.lensProp("entries"),
          R.filter(R.complement(R.propEq("id", id)))
        )
      )
    )
  }

  return {
    surfaceData,
    filters,
    setFilter,
    filterables,
    removeEntryFromStack,
  }
}
