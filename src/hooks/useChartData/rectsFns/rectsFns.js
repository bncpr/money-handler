import { format, scaleBand } from "d3"
import { curry, sort, descend, keys, pipe } from "ramda"
import { createRef } from "react"
import * as R from "ramda"
import * as d3 from "d3"
import { getCategoryStack, getPayerStack } from "../utility/utilityFns"

export const singleMonthlyRects = (chartData, xScale, yScale, innerHeight) =>
  chartData.map(m => {
    const { month, sum } = m
    return {
      props: {
        key: month,
        x: xScale(month),
        y: yScale(sum),
        width: xScale.bandwidth(),
        height: innerHeight - yScale(sum),
        ref: createRef(),
      },
      month,
      tooltip: `${month}: ${format(",d")(sum)}`,
    }
  })
const getSeriesKeysDescending = curry((seriesKey, month) => {
  const seriesObj = month[seriesKey]
  return pipe(keys, sort(descend(key => seriesObj[key])))(seriesObj)
})
const getSeriesCategoriesDescending = getSeriesKeysDescending("byCategory")
const getSeriesPayersDescending = getSeriesKeysDescending("byPayer")
const getSubScale = (series, x, bandwidth) =>
  scaleBand()
    .domain(series)
    .range([x, x + bandwidth])

const seriesRects = curry(
  (
    seriesKey,
    seriesName,
    getKeys,
    chartData,
    xScale,
    yScale,
    innerHeight,
    colors
  ) => {
    const rects = []
    chartData.forEach(m => {
      const { month } = m
      const series = getKeys(m)
      const subScale = getSubScale(series, xScale(month), xScale.bandwidth())
      series.forEach(prop => {
        const sum = m[seriesKey][prop]
        const y = yScale(sum)
        rects.push({
          props: {
            key: month + prop,
            x: subScale(prop),
            y,
            width: subScale.bandwidth(),
            height: innerHeight - y,
            fill: colors[prop],
            ref: createRef(),
          },
          month,
          [seriesName]: prop,
          tooltip: `${prop}: ${format(",d")(sum)}`,
        })
      })
    })
    return rects
  }
)

export const seriesCategoryRects = seriesRects(
  "byCategory",
  "category",
  getSeriesCategoriesDescending
)

export const seriesPayerRects = seriesRects(
  "byPayer",
  "payer",
  getSeriesPayersDescending
)
const arrangeDataByPayerAndCategory = R.pipe(
  R.prop("byPayerAndCategory"),
  R.mapObjIndexed((val, key) => ({
    name: key,
    values: val,
  })),
  R.values
)
const stackByPayerAndCategory = R.curry((data, keys) => {
  return d3
    .stack()
    .keys(keys)
    .value((d, key) => d.values[key])
    .order(d3.stackOrderDescending)(arrangeDataByPayerAndCategory(data))
})

export const seriesPayerStackCategoryRects = (
  chartData,
  xScale,
  yScale,
  stackKeys,
  colors
) => {
  const rects = []
  chartData.forEach(m => {
    const { month } = m
    const series = getSeriesPayersDescending(m)
    const subScale = getSubScale(series, xScale(month), xScale.bandwidth())
    const stacked = stackByPayerAndCategory(m, stackKeys)
    console.log(stacked)
    stacked.forEach(stack => {
      const category = stack.key
      stack.forEach(s => {
        const [y1, y2] = s
        if (isNaN(y1) || isNaN(y2)) return null
        const payer = s.data.name
        rects.push({
          props: {
            key: month + payer + category,
            x: subScale(payer),
            y: yScale(y2),
            width: subScale.bandwidth(),
            height: yScale(y1) - yScale(y2),
            fill: colors[category],
            ref: createRef(),
          },
          month,
          category,
          payer,
          tooltip: `${category}: ${d3.format(",d")(
            s.data.values[category]
          )} (${payer})`,
        })
      })
    })
  })
  return rects
}

const stackRects = R.curry(
  (stackFn, propKey, propName, keys, chartData, xScale, yScale, colors) => {
    const rects = []
    const stacked = stackFn(keys, chartData)
    stacked.forEach(series => {
      series.forEach(month => {
        const [y1, y2] = month
        if (isNaN(y1) || isNaN(y2)) return null
        const x = month.data.month
        const key = series.key
        rects.push({
          props: {
            key: x + key,
            x: xScale(x),
            y: yScale(y2),
            width: xScale.bandwidth(),
            height: yScale(y1) - yScale(y2),
            fill: colors[key],
            ref: createRef(),
          },
          month: x,
          [propName]: key,
          tooltip: `${key}: ${d3.format(",d")(month.data[propKey][key])}`,
        })
      })
    })
    return rects
  }
)
export const stackPayerRects = stackRects(getPayerStack, "byPayer", "payer")
export const stackCategoryRects = stackRects(
  getCategoryStack,
  "byCategory",
  "category"
)