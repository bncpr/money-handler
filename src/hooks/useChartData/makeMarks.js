import { createRef } from "react"
import { format } from "d3"

export const singleSumsMarks = (data, year, height, xScale, yScale, color) =>
  data.map(m => {
    const { month, sum } = m
    const y = yScale(sum)
    return {
      props: {
        key: year + month,
        x: xScale(month),
        y,
        height: height - y,
        width: xScale.bandwidth(),
        ref: createRef(),
        fill: color,
      },
      tooltip: format("d")(sum),
      month,
    }
  })

export const stackedMarks = (stackedData, year, xScale, yScale, colors) => {
  const marks = []
  stackedData.forEach(series =>
    series.forEach(m => {
      const [y1, y2] = m
      if (isNaN(y1) || isNaN(y2)) return null
      const month = m.data.month
      const key = series.key
      const y = yScale(y2)
      marks.push({
        props: {
          key: year + month + key,
          x: xScale(month),
          y,
          width: xScale.bandwidth(),
          height: yScale(y1) - y,
          fill: null,
          ref: createRef(),
        },
        tooltip: `${key}: ${format("~s")(m.data.sums[key])}`,
        month,
      })
    })
  )
  return marks
}
