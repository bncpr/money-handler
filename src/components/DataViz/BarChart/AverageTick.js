export function AverageTick({ width, average }) {
  if (!average) return null
  return (
    <g transform={`translate(0,${average})`}>
      <line stroke='#E3BA22' strokeWidth='2px' x2={width} />
    </g>
  )
}
