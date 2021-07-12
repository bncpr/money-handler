export const AverageStroke = ({
  y,
  stroke,
  width,
}: {
  y: number
  stroke: string
  width: number
}) => {
  return (
    <g transform={`translate(0,${y})`}>
      <line x2={width} strokeWidth='2px' stroke={stroke} />
    </g>
  )
}
