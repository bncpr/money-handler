import * as R from "ramda"
import { useEffect, useState } from "react"
import {
  getFilteredEntries,
  getCounts,
  isFilterInStack,
  appendFilter,
  removeFilter,
} from "./modules/modules"

const initialFilters = {
  year: "",
  payer: "",
  category: "",
  month: "",
}

export const useFilters = ({ groupedTree, entries }) => {
  const [filterStack, setFilterStack] = useState([])
  const [filters, setFilters] = useState(initialFilters)
  const [filteredEntries, setFilteredEntries] = useState([])
  const [counts, setCounts] = useState({})

  useEffect(() => {
    setFilteredEntries(
      getFilteredEntries(filterStack, groupedTree, entries)
    )
  }, [filterStack, entries, groupedTree])

  useEffect(() => {
    setCounts(getCounts(filteredEntries, filterStack, groupedTree))
  }, [filteredEntries, filterStack, groupedTree])

  const setFilter = key => value => {
    // TODO: refactor
    if (!isFilterInStack(filterStack, key)) {
      setFilterStack(appendFilter(key, value, filterStack))
    } else {
      const newStack = removeFilter(key, filterStack)
      if (key === "year") {
        const withoutMonth = removeFilter("month", newStack)
        setFilterStack(
          value === ""
            ? withoutMonth
            : appendFilter(key, value, withoutMonth)
        )
      } else {
        setFilterStack(
          value === "" ? newStack : appendFilter(key, value, newStack)
        )
      }
    }
    setFilters(
      key === "year"
        ? R.pipe(R.assoc(key, value), R.assoc("month", ""))(filters)
        : R.assoc(key, value, filters)
    )
  }
  return { setFilter, counts, filteredEntries, filters }
}
