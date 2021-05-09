import * as R from "ramda"
import { getSumsOfSeries } from "./getSumsOfSeries"
import { getSumsOfUnits } from "./getSumsOfUnits"

export const parseData = R.curry((showBy, series, entries) => {
  if (series && showBy === "month") {
    return getSumsOfSeries(showBy, series, entries)
  } else {
    return getSumsOfUnits(showBy, entries)
  }
})
