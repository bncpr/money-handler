import * as R from "ramda"
import { useEffect, useState } from "react"
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
  }, [entries, entriesStack])

  useEffect(() => {
    const rest = getRest(initialFilters, entriesStack)
    setCounts(getUpdatedCounts(groupedTree, entriesStack, rest))
  }, [groupedTree, entriesStack])

  // useEffect(() => {
  //   console.log(filterStack)
  // }, [filterStack])

  const setFilter = key => value => {
    setFilterStack(updateFilterStack(key, value, filterStack))
    setFilters(updateFilters(key, value, filters))
  }
  return { setFilter, counts, filteredEntries, filters }
}
