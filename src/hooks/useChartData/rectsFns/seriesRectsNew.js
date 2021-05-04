import { format } from "d3"
import * as R from "ramda"
import { curry } from "ramda"
import { createRef } from "react"
import {
  getSeriesCategoriesDescending,
  getSeriesPayersDescending,
} from "../utility/utilityFns"
import { addSubScale } from "./modules/addSubScale"

const extractSeries = R.curry((seriesKey, getKeys) => {
  return monthObj => ({
    month: monthObj.month,
    series: getKeys(monthObj),
    values: monthObj[seriesKey],
  })
})

const extractPayersSeries = extractSeries("byPayer", getSeriesPayersDescending)
const extractCategoriesSeries = extractSeries(
  "byCategory",
  getSeriesCategoriesDescending
)

const extractRect = R.curry((seriesName, yScale, height, colors) => {
  return monthObj =>
    monthObj.series.map(seriesKey => {
      const sum = monthObj.values[seriesKey]
      const y = yScale(sum)
      return {
        props: {
          key: monthObj.month + seriesKey,
          x: monthObj.subScale(seriesKey),
          y,
          width: monthObj.subScale.bandwidth(),
          height: height - y,
          fill: colors[seriesKey],
          ref: createRef(),
        },
        month: monthObj.month,
        [seriesName]: seriesKey,
        tooltip: `${seriesKey}: ${format(",d")(sum)}`,
      }
    })
})
const extractPayerRect = extractRect("payer")
const extractCategoryRect = extractRect("category")

const seriesRects = curry(
  (
    extractSeries,
    extractRect,
    chartData,
    xScale,
    yScale,
    innerHeight,
    colors
  ) =>
    R.pipe(
      R.map(R.pipe(extractSeries, addSubScale(xScale))),
      R.chain(extractRect(yScale, innerHeight, colors))
    )(chartData)
)

export const seriesCategoryRectsNew = seriesRects(
  extractCategoriesSeries,
  extractCategoryRect
)
export const seriesPayerRectsNew = seriesRects(
  extractPayersSeries,
  extractPayerRect
)
