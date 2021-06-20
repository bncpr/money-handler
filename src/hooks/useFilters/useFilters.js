import * as R from "ramda"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setLoadingFilter, setLoadingOn } from "../../store/slices/loadingSlice"
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
  }, [entries, entriesStack])

  useEffect(() => {
    const rest = getRest(initialFilters, entriesStack)
    setCounts(getUpdatedCounts(groupedTree, entriesStack, rest))
  }, [groupedTree, entriesStack])

  useEffect(() => {
    console.log(groupedTree)
  }, [groupedTree])

  const setFilter = R.curry((key, value) => {
    console.log("SET_FILTER", key, value)
    dispatch(setLoadingFilter(true))
    setFilterStack(updateFilterStack(key, value, filterStack))
    setFilters(updateFilters(key, value, filters))
  })
  return { setFilter, counts, filteredEntries, filters }
}
