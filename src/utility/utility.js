import * as R from "ramda"

export const capitalizeFirstChar = string =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`
export const updateObj = (obj, newObj) => {
  return { ...obj, ...newObj }
}
export const isEmptyObj = obj => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

export function getMinKey(obj) {
  return "" + Math.min(...Object.keys(obj))
}

export function getMaxKey(obj) {
  return "" + Math.max(...Object.keys(obj))
}

export function sortStrings(array) {
  return array.sort(stringSorter)
}

export function stringSorter(operand = 1) {
  // -1 == reverse order
  return (a, b) => {
    if (a > b) return 1 * operand
    if (a < b) return -1 * operand
  }
}

const extractPropFromYear = prop =>
  R.pipe(
    R.prop("months"),
    R.values,
    R.chain(R.pipe(R.prop("entries"), R.values)),
    R.map(R.prop(prop)),
    R.uniq
  )

export const extractPayersFromYear = extractPropFromYear("payer")
export const extractCategoriesFromYear = extractPropFromYear("category")

const average = R.converge(R.divide, [R.sum, R.length])
export const extractAverageSum = R.pipe(R.map(R.prop("sum")), average)

const flattenPath = R.curry((path, obj) =>
  R.merge(obj, R.pathOr({}, path, obj))
)
export const flattenProp = R.curry((prop, obj) => flattenPath(R.of(prop), obj))

export const didFetchYear = (data, year) =>
  data && year && data[year] instanceof Object

export const withDefaultArrays = obj =>
  R.map(val => (R.isNil(val) ? [] : val), obj)
