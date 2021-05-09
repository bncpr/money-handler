import { getUniqueProps } from "../utility/getUniqueProps"
import * as R from "ramda"

export const getSumsOfSeries = (showBy, series, entries) => {
  const units = getUniqueProps(showBy, entries)
  const seriesKeys = getUniqueProps(series, entries)
  return units.map(item => ({
    unit: item,
    series: R.zipObj(
      seriesKeys,
      seriesKeys.map(key =>
        R.pipe(
          R.filter(R.whereEq({ [showBy]: item, [series]: key })),
          R.map(R.prop("value")),
          R.sum
        )(entries)
      )
    ),
  }))
}
