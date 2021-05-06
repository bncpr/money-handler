import { scaleBand } from "d3-scale"

export const getXScale = (keys, width) =>
  scaleBand().domain(keys).range([0, width]).padding(0.1)
