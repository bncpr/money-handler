import { scaleBand, scaleOrdinal } from "d3-scale"
import { stack } from "d3-shape"
import { Mark as StyledMark } from "../styles"

const subScaleRange = (scale, accessor) => [
  scale(accessor),
  scale(accessor) + scale.bandwidth(),
]

export const StackedMarks = ({
  data,
  xScale,
  yScale,
  payers,
  tooltipFormat,
  colors,
}) => {
  const stacked = stack().keys(payers)(data)
  console.log(stacked)
  return stacked.map(payer =>
    payer.map(month => {
      let [y1, y2] = month
      if (isNaN(y1) || isNaN(y2)) return null
      const x = month.data.month
      return (
        <rect
          key={payer.key + month}
          x={xScale(x)}
          y={yScale(y2)}
          width={xScale.bandwidth()}
          height={yScale(y1) - yScale(y2)}
          fill={colors[payer.key]}
        >
          <title>{payer.key}</title>
        </rect>
      )
    })
  )
}
