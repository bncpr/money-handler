

export const StackedMarks = ({
  stacked,
  xScale,
  yScale,
  tooltipFormat,
  colors,
}) => {
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
