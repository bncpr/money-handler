import * as styled from "../styles"

export const LeftAxis = ({ yScale, width, tickFormat }) => {
  if (!yScale) return null
  return yScale.ticks().map(tick => (
    <g key={tick} transform={`translate(0,${yScale(tick)})`}>
      <styled.TickLine x2={width} />
      <text x={-4} dy='0.30em' textAnchor='end'>
        {tickFormat(tick)}
      </text>
    </g>
  ))
}
