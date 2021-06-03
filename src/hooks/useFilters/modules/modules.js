import * as R from "ramda"

const countByProp = prop => R.countBy(R.prop(prop))

export const isFilterInStack = (stack, filter) =>
  stack.some(R.propEq(0, filter))

export const appendFilter = (key, value, stack) =>
  R.append([key, value], stack)

export const removeFilter = (key, stack) =>
  R.reject(R.propEq(0, key), stack)

export const getFilteredEntries = (stack, tree, entries) => {
  if (R.isEmpty(stack)) return entries
  return R.pipe(
    R.path(stack[0]),
    R.filter(R.whereEq(R.fromPairs(stack)))
  )(tree)
}

export const getCounts = (entries, stack, tree) => {
  if (R.isEmpty(stack)) return R.map(R.map(R.length), tree)
  return R.applySpec({
    year: countByProp("year"),
    payer: countByProp("payer"),
    category: countByProp("category"),
    month: countByProp("month"),
  })(entries)
}
