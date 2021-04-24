import styled from "styled-components";

export const Chart = styled.svg`
  background-color: #f5f3f2;
  border-radius: 5px;
  box-shadow: 4px 4px 4px rgb(200, 200, 200);
  & text {
    fill: #8e8883;
  }
`;

export const Text = styled.text`
  fill: #8e8883;
`;

export const TickLine = styled.line`
  stroke: #635f5d;
`;

export const Mark = styled.rect`
  fill: #0F8C79;
`;