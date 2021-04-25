import { scaleBand, scaleLinear } from "d3-scale";
import { Mark as StyledMark } from "../styles";

export const Marks = ({ data, height, xScale, yScale, tooltipFormat }) =>
  data.map((d) => {
    const subScale = scaleBand()
      .domain(d.payers)
      .range([xScale(d.month), xScale(d.month) + xScale.bandwidth()])
      .paddingInner(0.05);
    return (
      <>
        {subScale.domain().map((payer) => (
          <StyledMark
            key={d.month + payer}
            x={subScale(payer)}
            y={yScale(d.payersSums[payer])}
            height={height - yScale(d.payersSums[payer])}
            width={subScale.bandwidth()}
          >
            <title>{tooltipFormat(d.payersSums[payer])}</title>
          </StyledMark>
        ))}
      </>
    );
  });
