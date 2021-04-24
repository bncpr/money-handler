import { Chart as StyledChart } from "./styles";

export const Chart = ({ children, width, height, marLeft, marTop }) => {
  return (
    <StyledChart width={width} height={height}>
      <g transform={`translate(${marLeft},${marTop})`}>{children}</g>
    </StyledChart>
  );
};
