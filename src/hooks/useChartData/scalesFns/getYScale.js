import { scaleLinear } from "d3-scale"

export const getYScale = (maxDomain, height) =>
  scaleLinear().domain([0, maxDomain]).range([height, 0])
