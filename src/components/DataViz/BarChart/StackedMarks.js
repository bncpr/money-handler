import { stack } from "d3-shape"
import { prop } from "ramda"

export const StackedMarks = ({
  data,
  stacked,
  xScale,
  yScale,
  tooltipFormat,
  colors,
}) => {
  console.log("StackedMarks", data)
  console.log(stacked)
  return stacked.map(series =>
    series.map(month => {
      const [y1, y2] = month
      if (isNaN(y1) || isNaN(y2)) return null
      const x = month.data.month
      const key = series.key
      return (
        <rect
          key={key + month}
          x={xScale(x)}
          y={yScale(y2)}
          width={xScale.bandwidth()}
          height={yScale(y1) - yScale(y2)}
          fill={colors[key]}
        >
          <title>{`${key}: ${tooltipFormat(month.data.sums[key])}`}</title>
        </rect>
      )
    })
  )
}
