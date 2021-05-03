import * as R from "ramda"
import * as d3 from "d3"
import { createRef } from "react"
import { getCategoryStack, getPayerStack } from "../utility/utilityFns"

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
