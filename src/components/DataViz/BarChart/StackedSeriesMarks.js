export const StackedSeriesMarks = ({
  data,
  stackedSeries,
  subScales,
  yScale,
  tooltipFormat,
  colors,
}) => {
  if (data.length === 0) return null
  return stackedSeries.map((m, i) => {
    const month = data[i].month
    const subScale = subScales[month]
    return m.map(series => {
      const stackLevel = series.key
      return series.map(series => {
        const seriesName = series.data.name
        const [y1, y2] = series
        if (isNaN(y1) || isNaN(y2)) return null
        return (
          <rect
            key={month + stackLevel + seriesName}
            x={subScale(seriesName)}
            y={yScale(y2)}
            width={subScale.bandwidth()}
            height={yScale(y1) - yScale(y2)}
            fill={colors[stackLevel]}
          >
            <title>{`${stackLevel}: ${tooltipFormat(
              series.data.sums[stackLevel]
            )} (${seriesName})`}</title>
          </rect>
        )
      })
    })
  })
}
