import * as d3 from "d3"
import { getSortedMonths } from "../utility/utilityFns"

export const getXScaleForMonths = (chartData, innerWidth) =>
  d3
    .scaleBand()
    .domain(getSortedMonths(chartData))
    .range([0, innerWidth])
    .padding(0.1)

export const getYScale = (innerHeight, maxDomain) =>
  d3.scaleLinear().domain([0, maxDomain]).range([innerHeight, 0])