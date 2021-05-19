import { isEmpty } from "ramda"
import styled from "styled-components"

export const StyledRect = styled.rect`
  fill: ${({ fill }) => (isEmpty(fill) ? "#5c8100" : fill)};
  cursor: pointer;
`