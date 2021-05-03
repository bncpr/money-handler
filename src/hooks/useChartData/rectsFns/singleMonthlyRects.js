import { format } from "d3"
import { createRef } from "react"

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
