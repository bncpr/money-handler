import * as R from "ramda"

export const getTopStackEntries = R.pipe(R.last, R.prop("entries"))

const findIndexWithKey = (key, stack) =>
  R.findIndex(R.propEq("key", key), stack)

const removeAndSplitAt = (i, stack) =>
  R.pipe(R.remove(i, 1), R.splitAt(i))(stack)

const removeAndSplitAtKey = (key, stack) => {
  const i = findIndexWithKey(key, stack)
  return removeAndSplitAt(i, stack)
}

const createNewFilteredLayer = (key, value, entries) => {
  const filteredEntries = entries.filter(R.propEq(key, value))
  return { key, value, entries: filteredEntries }
}

const appendNewFilteredLayer = R.curry(
  (key, value, defaultEntries, stack) => {
    const prevEntries = getTopStackEntries(stack) || defaultEntries
    return stack.concat(createNewFilteredLayer(key, value, prevEntries))
  }
)

const updateStackIteratorWithDefault = defaultEntries => (acc, val) => {
  const prevEntries = getTopStackEntries(acc) || defaultEntries
  const { key, value } = val
  return acc.concat({
    ...val,
    entries: prevEntries.filter(R.propEq(key, value)),
  })
}

const unsetFilter = R.curry((key, defaultEntries, stack) => {
  const [head, tail] = removeAndSplitAtKey(key, stack)
  const iterator = updateStackIteratorWithDefault(defaultEntries)
  return R.reduce(iterator, head, tail)
})

const unsetFilterAndAppendNewLayer = R.curry(
  (key, value, defaultEntries, stack) =>
    R.pipe(
      unsetFilter(key, defaultEntries),
      appendNewFilteredLayer(key, value, defaultEntries)
    )(stack)
)
const keyNotInStack = (key, stack) => R.none(R.propEq("key", key), stack)

export const getUpdatedFilteredStack = (
  key,
  value,
  defaultEntries,
  stack
) => {
  return keyNotInStack(key, stack)
    ? appendNewFilteredLayer(key, value, defaultEntries, stack)
    : R.isEmpty(value)
    ? unsetFilter(key, defaultEntries, stack)
    : unsetFilterAndAppendNewLayer(key, value, defaultEntries, stack)
}
