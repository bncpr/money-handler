import * as d3 from "d3"
import * as R from "ramda"
import { createRef } from "react"
import {
  getSubScale,
  getSeriesPayersDescending,
} from "../utility/utilityFns"

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
