import { Mark as StyledMark } from '../styles'

export const Marks = ({ data, height, xScale, yScale, tooltipFormat }) =>
  data.map(d => (
    <StyledMark
      key={d.month}
      x={xScale(d.month)}
      y={yScale(d.sum)}
      height={height - yScale(d.sum)}
      width={xScale.bandwidth()}
    >
      <title>{tooltipFormat(d.sum)}</title>
    </StyledMark>
  ))