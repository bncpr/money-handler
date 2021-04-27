import { monthsMap } from '../../../utility/maps'

export const BottomAxis = ({ xScale, height, yOffset }) => (
  <>
    {xScale.domain().map(tick => (
      <text
        key={tick}
        x={xScale(tick) + xScale.bandwidth() / 2}
        y={height + yOffset}
        textAnchor='middle'
      >
        {monthsMap.get(tick)}
      </text>
    ))}
  </>
)


