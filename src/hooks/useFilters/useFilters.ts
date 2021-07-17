import { useCallback, useEffect, useState } from "react"
import * as R from "remeda"
import { setLoadingFilter } from "../../store/slices/loadingSlice"
import { Entry } from "../../types/Entry"
import { GroupedTree } from "../../types/GroupedTree"
import { useAppDispatch } from "../reduxTypedHooks/reduxTypedHooks"
import { getCounts } from "./modules/getCounts"
import { getEntriesStack } from "./modules/getEntriesStack"
import { updateFilters } from "./modules/updateFilters"
import { updateFilterStack } from "./modules/updateFilterStack"

const initialFilters = {
  year: "",
  payer: "",
  category: "",
  month: "",
}

export type FiltersType = typeof initialFilters
export type FilterField = keyof FiltersType
export type FilterStack = [FilterField, string][]
export type EntriesStack = {
  key: FilterField
  value: string
  entries: Entry[]
}[]

const initialCounts = {
  year: {} as Record<string, number>,
  month: {} as Record<string, number>,
  payer: {} as Record<string, number>,
  category: {} as Record<string, number>,
}

export type Counts = typeof initialCounts
export type SetFilter = (key: FilterField, value: string) => void

export const useFilters = ({
  groupedTree,
  entries,
}: {
  groupedTree: GroupedTree
  entries: Entry[]
}) => {
  const dispatch = useAppDispatch()
  const [filterStack, setFilterStack] = useState<FilterStack>([])
  const [entriesStack, setEntriesStack] = useState<EntriesStack>([])
  const [filters, setFilters] = useState(initialFilters)
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([])
  const [counts, setCounts] = useState(initialCounts)

  useEffect(() => {
    setEntriesStack(getEntriesStack(groupedTree, filterStack))
  }, [groupedTree, filterStack])

  useEffect(() => {
    if (entriesStack.length === 0) {
      setFilteredEntries(entries)
    } else {
      setFilteredEntries(R.last(entriesStack)!.entries)
    }
    const t = setTimeout(() => {
      dispatch(setLoadingFilter(false))
    }, 0)
    return () => clearTimeout(t)
  }, [entries, entriesStack, dispatch])

  useEffect(() => {
    setCounts(getCounts(groupedTree, entriesStack, initialFilters))
  }, [groupedTree, entriesStack])

  const setFilter = (key: FilterField, value: string) => {
    dispatch(setLoadingFilter(true))
    setFilters(updateFilters(filters, key, value))
    setFilterStack(updateFilterStack(filterStack, key, value))
  }

  const resetFilters = useCallback(
    (filters: Partial<FiltersType>) => {
      dispatch(setLoadingFilter(true))
      setFilters(R.merge(initialFilters, filters))
      setFilterStack((R.toPairs(filters) as FilterStack) || [])
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
