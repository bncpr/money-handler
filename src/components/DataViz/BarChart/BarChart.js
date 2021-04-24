import { format } from "d3";

import { Chart } from "../Chart";
import { LeftAxis } from "./LeftAxis";
import { BottomAxis } from "./BottomAxis";
import { Marks } from "./Marks";

import { useChartData } from "../../../hooks/useChartData";

export const BarChart = ({ data, year }) => {
  const [width, height] = [960, 500];
  const margin = { top: 40, right: 20, bottom: 40, left: 40 };

  const { chartData, innerHeight, innerWidth, yScale, xScale } = useChartData({
    data,
    year,
    width,
    height,
    margin,
    chartType: "barChart",
  });

  return (
    <Chart
      width={width}
      height={height}
      marLeft={margin.left}
      marTop={margin.top}
    >
      <LeftAxis yScale={yScale} width={innerWidth} tickFormat={format("~s")} />
      <BottomAxis
        xScale={xScale}
        height={innerHeight}
        yOffset={margin.bottom / 2}
      />
      <Marks
        data={chartData}
        height={innerHeight}
        yScale={yScale}
        xScale={xScale}
        tooltipFormat={format(",d")}
      />
    </Chart>
  );
};
