import { format, scaleBand } from "d3";
import { useEffect, useState, createRef } from "react";
import * as R from "ramda";

export const useRects = ({ unit, xScale, yScale, height, colors }) => {
  const [rects, setRects] = useState({});
  useEffect(() => {
    console.log("UseEffect", unit.unit);
    if (unit.series) {
      const seriesKeys = R.pipe(
        R.toPairs,
        R.sort(R.descend(R.prop(1))),
        R.map(R.prop(0))
      )(unit.series);
      const subScale = scaleBand()
        .domain(seriesKeys)
        .range([xScale(unit.unit), xScale(unit.unit) + xScale.bandwidth()]);
      setRects(
        R.mapObjIndexed(
          (val, key) => ({
            props: {
              key: unit.unit + key,
              x: subScale(key),
              y: yScale(val),
              width: subScale.bandwidth(),
              height: height - yScale(val),
              fill: colors[key],
              ref: createRef(),
            },
            tooltip: `${key}: ${format(",d")(val)}`,
          }),
          unit.series
        )
      );
    } else {
      const key = unit.unit;
      const y = yScale(unit.sum);
      setRects({
        [key]: {
          props: {
            key,
            x: xScale(key),
            y,
            width: xScale.bandwidth(),
            height: height - y,
            fill: "#5C8100",
            ref: createRef(),
          },
          tooltip: `${format(",d")(unit.sum)}`,
        },
      });
    }
  }, [unit, colors, height, xScale, yScale]);

  return rects;
};
