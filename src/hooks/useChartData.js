import { useState, useEffect } from "react";
import * as R from 'ramda'

import { extractMonthsOfYear, addSum, addPayers, extractPayerSum, extractPayersSums, addPayersSums } from "../utility/utility";
import { curry, map, pipe, prop, sortBy } from "ramda";
import { scaleBand, scaleLinear, max } from "d3";

const chartPipes = {
  barChart: curry((data, year) =>
    pipe(
      extractMonthsOfYear(year),
      sortBy(prop("month")),
      map(pipe(addSum, addPayers, addPayersSums))
    )(data)
  ),
};
const extractData = curry((chartType, data, year, setState) => {
  setState(chartPipes[chartType](data, year));
});

const chartScales = {
  barChart: curry((data, width, height) => {
    return {
      xScale: scaleBand()
        .domain(data.map(prop("month")))
        .range([0, width])
        .paddingInner(0.2)
        .paddingOuter(0.05),
      yScale: scaleLinear()
        .domain([0, max(data, prop("sum"))])
        .range([height, 0]),
    };
  }),
};

const getChartScales = curry((chartType, data, width, height) =>
  chartScales[chartType](data, width, height)
);

export const useChartData = ({
  data,
  year,
  width,
  height,
  margin,
  chartType,
}) => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && year && data[year] instanceof Object) {
      extractData(chartType, data, year, setChartData);
    }
  }, [data, year, chartType]);

  useEffect(() => {
    console.log(chartData)
  }, [chartData])

  const { xScale, yScale } = getChartScales(
    chartType,
    chartData,
    innerWidth,
    innerHeight
  );

  return { chartData, xScale, yScale, innerHeight, innerWidth };
};
