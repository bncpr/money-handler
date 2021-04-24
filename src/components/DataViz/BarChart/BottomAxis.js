export const BottomAxis = ({ xScale, height, yOffset }) =>
  <>
    {xScale.domain().map(tick => (
      <text
        key={tick}
        x={xScale(tick) + xScale.bandwidth() / 2}
        y={height + yOffset}
        textAnchor='start'>{tick}
      </text>
    ))}
  </>