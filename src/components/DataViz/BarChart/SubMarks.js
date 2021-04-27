import { scaleBand, scaleOrdinal } from "d3-scale"
import { stack } from "d3-shape"
import { Mark as StyledMark } from "../styles"

const subScaleRange = (scale, accessor) => [
  scale(accessor),
  scale(accessor) + scale.bandwidth(),
]

export const SubMarks = ({
  data,
  height,
  xScale,
  yScale,
  tooltipFormat,
  xAccessor,
  yAccessor,
  colors,
  series
}) => {
  console.log(data)
  return data.map(d => {
    const xSubScale = scaleBand()
      .domain(d[series] || [])
      .range(subScaleRange(xScale, xAccessor(d)))
      .paddingInner(0.02)
    console.log(xSubScale.domain())
    return xSubScale.domain().map(payer => (
      <rect
        key={xAccessor(d) + payer}
        x={xSubScale(payer)}
        y={yScale(yAccessor(d, payer))}
        height={height - yScale(yAccessor(d, payer))}
        width={xSubScale.bandwidth()}
        fill={colors[payer]}
      >
        <title>{`${payer}: ${tooltipFormat(yAccessor(d, payer))}`}</title>
      </rect>
    ))
  })
}
