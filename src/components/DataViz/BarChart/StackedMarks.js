import { stack } from "d3-shape"

export const StackedMarks = ({
  data,
  xScale,
  yScale,
  stacks,
  tooltipFormat,
  colors,
}) => {
  const stacked = stack().keys(stacks)(data)
  return stacked.map(brick =>
    brick.map(month => {
      let [y1, y2] = month
      if (isNaN(y1) || isNaN(y2)) return null
      const x = month.data.month
      const key = brick.key
      return (
        <rect
          key={key + month}
          x={xScale(x)}
          y={yScale(y2)}
          width={xScale.bandwidth()}
          height={yScale(y1) - yScale(y2)}
          fill={colors[key]}
        >
          <title>{`${key}: ${tooltipFormat(month.data[key])}`}</title>
        </rect>
      )
    })
  )
}
