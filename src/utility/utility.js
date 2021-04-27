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

export const extractMonthsOfYear = R.curry(year =>
  R.pipe(R.prop(year), R.prop("months"), R.values)
)

export const extractEntriesOfYear = R.curry(year =>
  R.pipe(
    extractMonthsOfYear(year),
    R.map(R.pipe(R.prop("entries"), R.values)),
    R.flatten
  )
)

export const entriesLensWithoutSetter = R.curry(setLens =>
  R.lens(R.pipe(R.prop("entries"), R.values), setLens)
)
export const entriesLensOver = R.curry((setterLens, fn, obj) =>
  R.over(entriesLensWithoutSetter(setterLens), fn, obj)
)
export const extractSum = R.pipe(R.map(R.prop("value")), R.sum)
export const addSum = entriesLensOver(R.assoc("sum"), extractSum)

const extractPropFromYear = prop =>
  R.pipe(
    R.prop("months"),
    R.values,
    R.map(R.pipe(R.prop("entries"), R.values)),
    R.flatten,
    R.map(R.prop(prop)),
    R.uniq
  )

export const extractPayersFromYear = extractPropFromYear("payer")
export const extractCategoriesFromYear = extractPropFromYear("category")

const extractPayersFromMonth = R.pipe(R.map(R.prop("payer")), R.uniq)
const extractCategoriesFromMonth = R.pipe(R.map(R.prop("category")), R.uniq)

export const addPayers = entriesLensOver(
  R.assoc("payers"),
  extractPayersFromMonth
)
export const addCategories = entriesLensOver(
  R.assoc("categories"),
  extractCategoriesFromMonth
)

const extractPropSum = R.curry((prop, propValue, obj) => {
  return R.pipe(
    R.prop("entries"),
    R.values,
    R.filter(o => o[prop] === propValue),
    R.map(R.prop("value")),
    R.sum
  )(obj)
})

const extractPayerSum = extractPropSum("payer")
const extractCategorySum = extractPropSum("category")

const extractPropsSums = R.curry((prop, fn, obj) =>
  R.zipObj(obj[prop], R.map(fn(R.__, obj), obj[prop]))
)

const extractPayersSums = extractPropsSums("payers", extractPayerSum)
const extractCategoriesSums = extractPropsSums("categories", extractCategorySum)

export const addPayersSums = R.curry(obj =>
  R.over(R.lens(R.identity, R.assoc("payersSums")), extractPayersSums, obj)
)

export const addCategoriesSums = R.curry(obj =>
  R.over(
    R.lens(R.identity, R.assoc("categoriesSums")),
    extractCategoriesSums,
    obj
  )
)

const average = R.converge(R.divide, [R.sum, R.length])
export const extractAverageSum = R.pipe(R.map(R.prop("sum")), average)

const flattenPath = R.curry((path, obj) =>
  R.merge(obj, R.pathOr({}, path, obj))
)
export const flattenProp = R.curry((prop, obj) => flattenPath(R.of(prop), obj))
