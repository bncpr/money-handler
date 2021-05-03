import * as R from "ramda"
import * as d3 from "d3"
const propMonth = R.map(R.prop("month"))
const propSum = R.map(R.prop("sum"))
const propCategoryValues = R.map(R.pipe(R.prop("byCategory"), R.values))
const propPayerValues = R.map(R.pipe(R.prop("byPayer"), R.values))
export const maxSumMonth = R.pipe(propSum, d3.max)
export const maxCategorySum = R.pipe(propCategoryValues, R.flatten, d3.max)
export const maxPayerSum = R.pipe(propPayerValues, R.flatten, d3.max)
export const getSortedMonths = R.pipe(propMonth, R.sortBy(R.identity))

export const choosePayerColors = colors => colors.payerColors
export const chooseCategoryColors = colors => colors.categoryColors

const getStack = R.curry((propKey, keys, data) =>
  d3
    .stack()
    .keys(keys)
    .value((d, key) => d[propKey][key])
    .order(d3.stackOrderDescending)(data)
)

export const getCategoryStack = getStack("byCategory")
export const getPayerStack = getStack("byPayer")
export const getSubScale = (series, x, bandwidth) =>
  d3
    .scaleBand()
    .domain(series)
    .range([x, x + bandwidth])
const getSeriesKeysDescending = R.curry((seriesKey, month) => {
  const seriesObj = month[seriesKey]
  return R.pipe(R.keys, R.sort(R.descend(key => seriesObj[key])))(seriesObj)
})
export const getSeriesCategoriesDescending = getSeriesKeysDescending(
  "byCategory"
)
export const getSeriesPayersDescending = getSeriesKeysDescending("byPayer")
