import { map, pipe, prop } from "ramda"
import { average } from "../../../utility/utility"
import { Mark as StyledMark } from "../styles"

export const Marks = ({
  data,
  height,
  xScale,
  yScale,
  tooltipFormat,
  xAccessor,
  yAccessor,
}) => {
  if (!xScale || !yScale) return null
  return data.map(d => (
    <StyledMark
      key={xAccessor(d)}
      x={xScale(xAccessor(d))}
      y={yScale(yAccessor(d))}
      height={(height - yScale(yAccessor(d))) || 0}
      width={xScale.bandwidth()}
    >
      <title>{tooltipFormat(yAccessor(d))}</title>
    </StyledMark>
  ))
}