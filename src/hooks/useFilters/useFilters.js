import * as R from "ramda"
import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setLoadingFilter } from "../../store/slices/loadingSlice"
import {
  getEntriesStack,
  getRest,
  getUpdatedCounts,
  updateFilters,
  updateFilterStack,
} from "./modules/modules"

const initialFilters = {
  year: "",
  payer: "",
  category: "",
  month: "",
}

export const useFilters = ({ groupedTree, entries }) => {
  const dispatch = useDispatch()
  const [filterStack, setFilterStack] = useState([])
  const [entriesStack, setEntriesStack] = useState([])
  const [filters, setFilters] = useState(initialFilters)
  const [filteredEntries, setFilteredEntries] = useState([])
  const [counts, setCounts] = useState({})

  useEffect(() => {
    setEntriesStack(getEntriesStack(groupedTree, filterStack, entriesStack))
    // eslint-disable-next-line
  }, [groupedTree, filterStack])

  useEffect(() => {
    setFilteredEntries(
      R.isEmpty(entriesStack)
        ? entries
        : R.prop("entries", R.last(entriesStack)),
    )

    const t = setTimeout(() => {
      dispatch(setLoadingFilter(false))
    }, 0)

    return () => clearTimeout(t)
  }, [entries, entriesStack, dispatch])

  useEffect(() => {
    const rest = getRest(initialFilters, entriesStack)
    setCounts(getUpdatedCounts(groupedTree, entriesStack, rest))
  }, [groupedTree, entriesStack])

  const setFilter = R.curry((key, value) => {
    dispatch(setLoadingFilter(true))
    setFilters(updateFilters(key, value, filters))
    setTimeout(() => {
      setFilterStack(updateFilterStack(key, value, filterStack))
    }, 0)
  })

  const resetFilters = useCallback(
    filters => {
      dispatch(setLoadingFilter(true))
      setFilters(R.mergeRight(initialFilters, filters))
      setFilterStack(R.toPairs(filters) || [])
    },
    [dispatch],
  )

  return {
    setFilter,
    counts,
    filteredEntries,
    filters,
    resetFilters,
    filterStack,
  }
}
