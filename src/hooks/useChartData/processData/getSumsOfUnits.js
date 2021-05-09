import { getUniqueProps } from "../utility/getUniqueProps"
import * as R from "ramda"

export const getSumsOfUnits = (showBy, entries) => {
  console.log(showBy)
  const units = getUniqueProps(showBy, entries)
  return units.map(item => ({
    unit: item,
    sum: R.pipe(
      R.filter(R.propEq(showBy, item)),
      R.map(R.prop("value")),
      R.sum
    )(entries),
  }))
}