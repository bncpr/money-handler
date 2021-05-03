import { getCategories } from "../processData/processData"
import {
  seriesPayerStackCategoryRects,
  stackPayerRects,
  stackCategoryRects,
  seriesCategoryRects,
  singleMonthlyRects,
  seriesPayerRects
} from "../rectsFns/rectsFns"
import { getYScale, processDataAndXScale } from "../scalesFns/scalesFns"
import {
  maxPayerSum,
  maxSumMonth,
  chooseCategoryColors,
  choosePayerColors,
  maxCategorySum
} from "../utility/utilityFns"
import { getPayers } from "../processData/processData"

import * as R from "ramda"

export const singleMonthlySumsBars = (entries, innerWidth, innerHeight) => {
  const { chartData, xScale } = processDataAndXScale(entries, innerWidth)
  const yScale = getYScale(innerHeight, maxSumMonth(chartData))
  const rects = singleMonthlyRects(chartData, xScale, yScale, innerHeight)
  return { chartData, xScale, yScale, rects }
}
const seriesPropSumsBars = R.curry(
  (maxFn, rectsFn, colorChooser, entries, innerWidth, innerHeight, colors) => {
    const pickedColors = colorChooser(colors)
    const { chartData, xScale } = processDataAndXScale(entries, innerWidth)
    const yScale = getYScale(innerHeight, maxFn(chartData))
    const rects = rectsFn(chartData, xScale, yScale, innerHeight, pickedColors)
    return { chartData, xScale, yScale, rects }
  }
)
export const seriesCategorySumsBars = seriesPropSumsBars(
  maxCategorySum,
  seriesCategoryRects,
  chooseCategoryColors
)
export const seriesPayerSumsBars = seriesPropSumsBars(
  maxPayerSum,
  seriesPayerRects,
  choosePayerColors
)
const stackPropSumsBars = R.curry(
  (
    maxFn,
    rectsFn,
    keysFn,
    colorChooser,
    entries,
    innerWidth,
    innerHeight,
    colors
  ) => {
    const pickedColors = colorChooser(colors)
    const { chartData, xScale } = processDataAndXScale(entries, innerWidth)
    const yScale = getYScale(innerHeight, maxFn(chartData))
    const rects = rectsFn(
      keysFn(entries),
      chartData,
      xScale,
      yScale,
      pickedColors
    )
    return { chartData, xScale, yScale, rects }
  }
)
export const stackPayerSumsBars = stackPropSumsBars(
  maxSumMonth,
  stackPayerRects,
  getPayers,
  choosePayerColors
)
export const stackCategorySumsBars = stackPropSumsBars(
  maxSumMonth,
  stackCategoryRects,
  getCategories,
  chooseCategoryColors
)

export const seriesPayerStackCategory = (
  entries,
  innerWidth,
  innerHeight,
  { categoryColors }
) => {
  const { chartData, xScale } = processDataAndXScale(entries, innerWidth)
  const yScale = getYScale(innerHeight, maxPayerSum(chartData))
  const rects = seriesPayerStackCategoryRects(
    chartData,
    xScale,
    yScale,
    getCategories(entries),
    categoryColors
  )
  return { chartData, xScale, yScale, rects }
}
const chartOptionsMap = new Map([
  ["000", singleMonthlySumsBars],
  ["001", seriesCategorySumsBars],
  ["100", seriesPayerSumsBars],
  ["011", stackCategorySumsBars],
  ["110", stackPayerSumsBars],
  ["111", seriesPayerStackCategory],
  ["101", null], // should always be stacked ^
  ["010", null], // nothing to stack
])

const getOptionsType = ({ withPayers, withStacks, withCategories }) => {
  const type = `${+withPayers}${+withStacks}${+withCategories}`
  if (type === "010") return "000"
  return type === "101" ? "111" : type
}

export const getProcessFunction = options =>
  chartOptionsMap.get(getOptionsType(options))
