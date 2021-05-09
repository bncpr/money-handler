import * as R from "ramda"
import { getXScale } from "./getXScale"
import { getYScale } from "./getYScale"

const getKeys = R.curry(sort => R.pipe(sort, R.map(R.prop("unit"))))
const getKeysAlphanumericSort = getKeys(R.sortBy(R.prop("unit")))
const getKeysSumsSort = getKeys(R.sort(R.descend(R.prop("sum"))))

const getMaxSeries = R.pipe(
  R.chain(R.pipe(R.prop("series"), R.values)),
  R.reduce(R.max, 0)
)
const getMaxSum = R.pipe(R.map(R.prop("sum")), R.reduce(R.max, 0))

const scalesFn = R.curry((getKeys, getMaxProp, data, width, height) => ({
  xScale: getXScale(getKeys(data), width),
  yScale: getYScale(getMaxProp(data), height),
}))

const scalesShowByMonthSeries = scalesFn(getKeysAlphanumericSort, getMaxSeries)
const scalesShowByMonthUnit = scalesFn(getKeysAlphanumericSort, getMaxSum)
const scalesShowByAnyUnit = scalesFn(getKeysSumsSort, getMaxSum)

export const getScales = (
  chartData,
  showBy,
  series,
  innerWidth,
  innerHeight
) => {
  return showBy === "month"
    ? series
      ? scalesShowByMonthSeries(chartData, innerWidth, innerHeight)
      : scalesShowByMonthUnit(chartData, innerWidth, innerHeight)
    : scalesShowByAnyUnit(chartData, innerWidth, innerHeight)
}
