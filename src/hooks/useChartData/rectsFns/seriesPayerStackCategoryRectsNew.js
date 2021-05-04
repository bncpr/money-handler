import * as d3 from "d3"
import * as R from "ramda"
import { createRef } from "react"
import { getSubScale, getSeriesPayersDescending } from "../utility/utilityFns"

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

const getSeriesAndSubScale = (xScale, month) => {
  const series = getSeriesPayersDescending(month)
  return {
    series,
    subScale: getSubScale(series, xScale(month.month), xScale.bandwidth()),
  }
}
const extractData = (xScale, stackKeys) => month => ({
  month: month.month,
  ...getSeriesAndSubScale(xScale, month),
  stacked: stackByPayerAndCategory(month, stackKeys),
})

const getRects = (yScale, colors) => monthObj => {
  const month = monthObj.month
  return R.chain(stack => {
    const category = stack.key
    return stack.map(s => {
      const [y1, y2] = s
      if (isNaN(y1) || isNaN(y2)) {
        console.log("NaN FOUND")
        return null
      }
      const payer = s.data.name
      return {
        props: {
          key: month + payer + category,
          x: monthObj.subScale(payer),
          y: yScale(y2),
          width: monthObj.subScale.bandwidth(),
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
      }
    })
  }, monthObj.stacked)
}

export const seriesPayerStackCategoryRectsNew = (
  chartData,
  xScale,
  yScale,
  stackKeys,
  colors
) => {
  return R.pipe(
    R.map(extractData(xScale, stackKeys)),
    R.chain(getRects(yScale, colors))
  )(chartData)
}
