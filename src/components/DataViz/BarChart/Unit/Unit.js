import { keys } from "ramda"
import { StyledRect } from "./styles"
import { useRects } from "../../../../hooks/useRects/useRects"
import { useInitialBarsAnimationEffect } from "../../../../hooks/useInitialBarsAnimationEffect/useInitialBarsAnimationEffect"
import styled from "styled-components"

export const Unit = ({
  unit,
  xScale,
  yScale,
  height,
  colors,
  onMouseEnter,
  onMouseOut,
  focused,
}) => {
  const rects = useRects({ unit, xScale, yScale, height, colors })
  
  useInitialBarsAnimationEffect(rects)

  return (
    <StyledGroup
      onMouseOver={onMouseEnter}
      onMouseOut={onMouseOut}
      unit={unit.unit}
      focused={focused}>
      {keys(rects).map(key => {
        const props = { ...rects[key].props, y: yScale(0), height: 0 }
        return (
          <StyledRect {...props}>
            <title>{rects[key].tooltip}</title>
          </StyledRect>
        )
      })}
    </StyledGroup>
  )
}

const StyledGroup = styled.g`
  opacity: ${({ unit, focused }) =>
    focused ? (unit === focused ? "1" : "0.7") : "1"};
  transition: opacity 500ms linear 100ms;
`
