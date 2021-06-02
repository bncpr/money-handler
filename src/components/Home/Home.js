import { Box, Code, Container, Text, Wrap } from "@chakra-ui/layout"
import { Select } from "@chakra-ui/select"
import * as R from "ramda"
import { useEffect, useState } from "react"
import { shallowEqual, useSelector } from "react-redux"
import { Filters } from "../Filters/Filters"
import { createSelector } from "@reduxjs/toolkit"

const initialFilters = {
  year: "",
  payer: "",
  category: "",
  month: "",
}

const groupByProp = prop => R.groupBy(R.prop(prop))
const groupEntriesOfProp = prop =>
  R.pipe(groupByProp(prop), R.map(R.objOf("entries")))

const getPath = stack => R.unnest(stack)

const getEntriesAtPath = (path, tree) =>
  R.path(path.concat("entries"), tree) || []

const getEntriesFromStack = (stack, tree) =>
  getEntriesAtPath(getPath(stack), tree)

const groupEntriesOfPropAtPath = (path, prop, tree) => {
  const entries = getEntriesAtPath(path, tree)
  return R.assocPath(
    path.concat(prop),
    groupEntriesOfProp(prop)(entries),
    tree
  )
}

const getKeysValuesOfProp = prop =>
  R.pipe(R.prop(prop), R.keys, R.objOf("values"))

const getKeysOfMonthAtPath = (path, tree) =>
  R.pipe(R.path(path.concat("month")), R.keys)(tree)

const getKeysOfMonthFromStack = (stack, tree) =>
  getKeysOfMonthAtPath(getPath(stack), tree)

const getInitialGroupedTree = R.applySpec({
  year: groupEntriesOfProp("year"),
  payer: groupEntriesOfProp("payer"),
  category: groupEntriesOfProp("category"),
})

const getInitialFilterablesValues = R.applySpec({
  year: getKeysValuesOfProp("year"),
  payer: getKeysValuesOfProp("payer"),
  category: getKeysValuesOfProp("category"),
})

const isNoFilterables = R.pipe(
  R.map(R.prop("value")),
  R.values,
  R.all(R.isEmpty)
)

const getUpdatedGroupedTree = R.curry((path, stack, tree) => {
  if (R.isEmpty(stack)) return tree

  const nextFilter = R.head(stack)
  const nextPath = path.concat(nextFilter)

  if (!R.path(nextPath, tree)) {
    const filterKey = R.head(nextFilter)
    const updatedTree = groupEntriesOfPropAtPath(path, filterKey, tree)
    return getUpdatedGroupedTree(nextPath, R.tail(stack), updatedTree)
  }
  return getUpdatedGroupedTree(nextPath, R.tail(stack), tree)
})

const isLastFilterYear = stack =>
  R.isEmpty(stack)
    ? false
    : R.pipe(R.last, R.head, R.equals("year"))(stack)

const isYearInStack = stack => stack.some(R.propEq(0, "year"))

const groupMonthOfYear = (tree, stack) => {
  const path = getPath(stack)
  return groupEntriesOfPropAtPath(path, "month", tree)
}

const isMonthAtPath = (path, tree) => R.path(path.concat("month"), tree)

const updateMonths = R.curry((stack, tree) =>
  isLastFilterYear(stack) ? groupMonthOfYear(tree, stack) : tree
)

const isFilterInStack = (stack, filter) => stack.some(R.propEq(0, filter))

const appendFilter = (key, value, stack) => R.append([key, value], stack)
const removeFilter = (key, stack) => R.reject(R.propEq(0, key), stack)

const getEntriesSelector = createSelector(
  state => state.data.entries,
  entries => R.values(entries)
)
// TODO: setFilter
// TODO: filterOptions
// TODO: addReservedWords to Form
export const Home = () => {
  const entries = useSelector(getEntriesSelector)
  const [initialStack, setInitialStack] = useState([])
  const [filterStack, setFilterStack] = useState([])
  const [groupedTree, setGroupedTree] = useState({})
  const [filters, setFilters] = useState(initialFilters)
  const [filterables, setFilterables] = useState({
    year: { values: [] },
    month: { values: [] },
    category: { values: [] },
    payer: { values: [] },
  })
  const [filteredEntries, setFilteredEntries] = useState([])

  useEffect(() => {
    console.log("INIT")
    const initGroupedTree = R.pipe(
      getInitialGroupedTree,
      getUpdatedGroupedTree([], initialStack),
      updateMonths(initialStack)
    )(entries)
    setFilterStack(initialStack)
    setGroupedTree(initGroupedTree)
    setFilterables(
      R.mergeRight(
        filterables,
        getInitialFilterablesValues(initGroupedTree)
      )
    )
  }, [entries, initialStack])

  useEffect(() => {
    console.log(filterables)
  }, [filterables])

  useEffect(() => {
    if (!R.isEmpty(groupedTree)) {
      setGroupedTree(
        R.pipe(
          getUpdatedGroupedTree([], filterStack),
          updateMonths(filterStack)
        )(groupedTree)
      )
    }
  }, [filterStack])

  useEffect(() => {
    setFilteredEntries(
      R.isEmpty(filterStack)
        ? entries
        : getEntriesFromStack(filterStack, groupedTree)
    )

    console.log(filterables)
    setFilterables(
      R.assocPath(
        ["month", "values"],
        isYearInStack(filterStack)
          ? getKeysOfMonthFromStack(filterStack, groupedTree)
          : [],
        filterables
      )
    )
  }, [groupedTree, filterStack])

  useEffect(() => {
    console.log(filterStack, filters, groupedTree)
  }, [filterStack, filters, groupedTree])

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

  return (
    <Wrap>
      <Box width='max'>
        <Filters
          filters={filters}
          filterables={filterables}
          setFilter={setFilter}
        />
      </Box>

      {filteredEntries.map(value => (
        <Text>{JSON.stringify(value)}</Text>
      ))}
    </Wrap>
  )
}
