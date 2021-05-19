import * as R from "ramda"

const uniqMonths = R.pipe(R.map(R.prop("month")), R.uniq)

const addMonthsIfYear = R.curry((key, entries, filterables) =>
  key === "year"
    ? R.assocPath(["month", "values"], uniqMonths(entries), filterables)
    : filterables
)

const updatePredicate = (value, key, acc, compareKey) =>
  !R.includes(key, acc) && // if did not already see (in acc)
  key !== compareKey && // if not self
  (key !== "month" || !R.isEmpty(value.values)) // update months only if year

const countByKey = (key, entries) => R.countBy(R.prop(key))(entries)

const addCount = (key, entries, value) =>
  R.assoc("count", countByKey(key, entries), value)

const addCounts = (compareKey, entries, acc) =>
  R.mapObjIndexed((value, key) =>
    updatePredicate(value, key, acc, compareKey)
      ? addCount(key, entries, value)
      : value
  )

const updateFn = (key, entries, acc, filterables) =>
  R.pipe(
    addMonthsIfYear(key, entries),
    addCounts(key, entries, acc)
  )(filterables)

const updateFilterablesRec = (filterables, acc, stack) => {
  if (R.isEmpty(stack)) return filterables
  const { key, entries } = R.head(stack)
  const nFilterables = updateFn(key, entries, acc, filterables)
  return updateFilterablesRec(nFilterables, acc.concat(key), R.tail(stack))
}

export const getUpdatedFilterables = (filterables, stack) =>
  updateFilterablesRec(filterables, [], stack)
