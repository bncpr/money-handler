import * as R from "ramda"
import * as d3 from "d3"
import { createRef } from "react"
import { getCategoryStack, getPayerStack } from "../utility/utilityFns"

const getRects = R.curry(
  (propKey, propName, xScale, yScale, colors) => series =>
    series.map(month => {
      const [y1, y2] = month
      if (isNaN(y1) || isNaN(y2)) {
        console.log("NaN FOUND")
        return null
      }
      const x = month.data.month
      const key = series.key
      return {
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
      }
    })
)

const getRectsPayers = getRects("byPayer", "payer")
const getRectCategories = getRects("byCategory", "category")

const stackRects = R.curry(
  (stackFn, getRects, keys, chartData, xScale, yScale, colors) => {
    return R.pipe(stackFn, R.chain(getRects(xScale, yScale, colors)))(
      keys,
      chartData
    )
  }
)
export const stackPayerRectsNew = stackRects(getPayerStack, getRectsPayers)
export const stackCategoryRectsNew = stackRects(
  getCategoryStack,
  getRectCategories
)
