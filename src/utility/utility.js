import * as R from "ramda"

export const capitalizeFirstChar = string =>
  string ? `${string.charAt(0).toUpperCase()}${string.slice(1)}` : ""


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
export const flattenProp = R.curry((prop, obj) =>
  flattenPath(R.of(prop), obj)
)

export const didFetchYear = (data, year) =>
  data && year && data[year] instanceof Object

export const withDefaultArrays = obj =>
  R.map(val => (R.isNil(val) ? [] : val), obj)

export const filterData = R.curry((key, value, data) =>
  R.filter(R.propEq(key, value), data)
)

export const applyFilters = R.curry((filtersObj, data) =>
  R.filter(filtersObj, data)
)

export const withoutEmpties = R.whereEq(R.filter(R.complement(R.isEmpty)))

export const applyFiltersWithoutEmpties = R.curry((filtersObj, data) =>
  applyFilters(withoutEmpties(filtersObj), data)
)
