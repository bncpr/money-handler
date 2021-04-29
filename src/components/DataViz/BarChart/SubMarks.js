
export const SubMarks = ({
  data,
  height,
  yScale,
  subScales,
  tooltipFormat,
  xAccessor,
  colors,
}) => {
  if (!subScales) return null
  return data.map(d => {
    const xSubScale = subScales[d.month]
    return xSubScale.domain().map(key => (
      <rect
        key={xAccessor(d) + key}
        x={xSubScale(key)}
        y={yScale(d.sums[key])}
        height={height - yScale(d.sums[key])}
        width={xSubScale.bandwidth()}
        fill={colors[key]}
      >
        <title>{`${key}: ${tooltipFormat(d.sums[key])}`}</title>
      </rect>
    ))
  })
}
