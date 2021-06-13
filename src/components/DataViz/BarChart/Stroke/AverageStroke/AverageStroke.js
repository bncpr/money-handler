export const AverageStroke = ({ y, stroke, width }) => {
  return (
    <g transform={`translate(0,${y})`}>
      <line x2={width} strokeWidth='2px' stroke={stroke} />
    </g>
  )
}
