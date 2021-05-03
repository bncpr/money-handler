import { format } from "d3"
import { curry } from "ramda"
import { createRef } from "react"
import { getSubScale,
  getSeriesCategoriesDescending,
  getSeriesPayersDescending, } from "../utility/utilityFns"

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
