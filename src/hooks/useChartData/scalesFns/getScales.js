import * as R from "ramda";
import { getXScale } from "./getXScale";
import { getYScale } from "./getYScale";

export const getScales = (chartData, showBy, series, innerWidth, innerHeight) => {
  if (showBy === "month") {
    const keys = R.pipe(R.map(R.prop("unit")), R.sortBy(R.identity))(chartData);
    const xScale = getXScale(keys, innerWidth);
    if (series) {
      const maxDomain = R.pipe(
        R.chain(R.pipe(R.prop("series"), R.values)),
        R.reduce(R.max, 0)
      )(chartData);
      const yScale = getYScale(maxDomain, innerHeight);
      return { xScale, yScale };
    } else {
      const maxDomain = R.pipe(
        R.map(R.prop("sum")),
        R.reduce(R.max, 0)
      )(chartData);
      const yScale = getYScale(maxDomain, innerHeight);
      return { xScale, yScale };
    }
  }
};
