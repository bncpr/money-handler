import * as R from "ramda";
import { getSubScale } from "../../utility/utilityFns";

export function addSubScale(xScale) {
  return monthObj => R.assoc(
    "subScale",
    getSubScale(monthObj.series, xScale(monthObj.month), xScale.bandwidth()),
    monthObj
  );
}
