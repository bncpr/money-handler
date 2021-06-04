import * as R from "ramda"

const countByProp = prop => R.countBy(R.prop(prop))

const isFilterInStack = R.curry((filter, stack) =>
  R.any(R.propEq(0, filter), stack),
)

const appendFilter = R.curry((key, value, stack) =>
  R.append([key, value], stack),
)

const removeFilter = R.curry((key, stack) => R.reject(R.propEq(0, key), stack))

const removeFilters = R.curry((keys, stack) =>
  R.reject(R.propSatisfies(R.includes(R.__, keys), 0), stack),
)

const removeFiltersAndAppend = (keys, key, value, stack) =>
  R.pipe(removeFilters(keys), appendFilter(key, value))(stack)

const removeAndAppend = R.curry((key, value, stack) =>
  R.pipe(
    removeFilter(key),
    appendFilter(key, value),
    R.tap(console.log),
  )(stack),
)

const getKeyValPair = R.props(["key", "value"])

const filterNext = (key, value, prevEntries) =>
  R.pipe(R.prop("entries"), R.filter(R.propEq(key, value)))(prevEntries)

const getNextEntries = ([key, value], prevEntries) => ({
  key,
  value,
  entries: filterNext(key, value, prevEntries),
})

const getUpdatedEntriesStack = (accStack, filterStack, entriesStack) => {
  const nextFilter = R.head(filterStack)
  const nextEntries = R.head(entriesStack)
  const prevEntries = R.last(accStack)

  if (!nextFilter) return accStack

  if (nextEntries && R.equals(getKeyValPair(nextEntries), nextFilter))
    return getUpdatedEntriesStack(
      accStack.concat(nextEntries),
      R.tail(filterStack),
      R.tail(entriesStack),
    )

  return getUpdatedEntriesStack(
    accStack.concat(getNextEntries(nextFilter, prevEntries)),
    R.tail(filterStack),
    R.tail(entriesStack),
  )
}

export const getEntriesStack = (tree, filterStack, entriesStack) => {
  const nextFilter = R.head(filterStack)
  if (!nextFilter) return []
  const [key, value] = nextFilter
  return getUpdatedEntriesStack(
    [{ key, value, entries: R.path(nextFilter, tree) }],
    R.tail(filterStack),
    R.tail(entriesStack),
  )
}

export const getUpdatedCounts = (tree, entriesStack, rest) => {
  const counts = R.map(R.map(R.length), tree)

  R.forEach(
    ([entries, key]) => (counts[key] = countByProp(key)(entries)),
    R.zip(
      R.map(R.prop("entries"), entriesStack),
      R.map(R.prop("key"), R.tail(entriesStack)),
    ),
  )
  const entries = R.prop("entries", R.last(entriesStack)) || []
  rest.forEach(key => (counts[key] = countByProp(key)(entries)))
  return counts
}

export const getRest = (filters, stack) =>
  R.pipe(
    R.toPairs,
    R.map(R.prop(0)),
    R.reject(key => stack.some(R.propEq("key", key))),
    R.ifElse(R.includes("year"), R.reject(R.equals("month")), R.identity),
  )(filters)

export const updateFilters = (key, value, filters) =>
  R.pipe(
    R.assoc(key, value),
    R.ifElse(R.always(key === "year"), R.assoc("month", ""), R.identity),
  )(filters)

export const updateFilterStack = (key, value, stack) =>
  value === ""
    ? key === "year"
      ? removeFilters(["year", "month"], stack)
      : removeFilter(key, stack)
    : isFilterInStack(key, stack)
    ? key === "year"
      ? removeFiltersAndAppend(["year", "month"], "year", value, stack)
      : removeAndAppend(key, value, stack)
    : appendFilter(key, value, stack)
