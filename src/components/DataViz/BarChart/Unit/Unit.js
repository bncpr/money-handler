import { keys } from "ramda"
import { StyledRect } from "./styles"
import { useRects } from "../../../../hooks/useRects/useRects"
import { useInitialBarsAnimationEffect } from "../../../../hooks/useInitialBarsAnimationEffect/useInitialBarsAnimationEffect"

export const Unit = ({ unit, xScale, yScale, height, colors }) => {
  const rects = useRects({ unit, xScale, yScale, height, colors })

  useInitialBarsAnimationEffect(rects)

  return (
    <g>
      {keys(rects).map(key => {
        const props = { ...rects[key].props, y: yScale(0), height: 0 }
        return (
          <StyledRect {...props}>
            <title>{rects[key].tooltip}</title>
          </StyledRect>
        )
      })}
    </g>
  )
}